from django.test import TestCase
from orders import models


class ModelTests(TestCase):

    def test_ingredient_str(self):
        """create ingredient string representation"""

        incredient = models.Ingredient.objects.create(name='salt')
        self.assertEqual(str(incredient), incredient.name)

    def test_order_str(self):
        """Test pizza order string representation"""
        order = models.Order.objects.create(name='my pizza')
        self.assertEqual(str(order), order.name)
