from rest_framework import serializers

from .models import Ingredient, Order


class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = ['id', 'name']


class OrderSerializer(serializers.ModelSerializer):

    ingredients = serializers.SerializerMethodField('get_ingredients')

    def get_ingredients(self, order):
        try:
            order_ingredients = Ingredient.objects.filter(order__id=order.id)
            return IngredientSerializer(order_ingredients, many=True).data
        except Ingredient.DoesNotExist:
            return []

    def create(self, validated_data):
        """
        Create function for orders and associated ingredients
        """
        ingredients_data = validated_data.pop("ingredients")
        order = Order.objects.create(**validated_data)

        # Assign ingredients if they are present in the body
        if ingredients_data:
            for ingredient_dict in ingredients_data:
                ingredient_name = ingredient_dict["name"].lower()
                try:
                    ingredient = Ingredient.objects.get(name=ingredient_name)
                    ingredient.order.add(order)
                except Ingredient.DoesNotExist:
                    ingredient = Ingredient(name=ingredient_name)
                    ingredient.save()
                    ingredient.order.add(order)
        return order

    class Meta:
        model = Order
        fields = ['id', 'name', 'status', 'ingredients']
