from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from drf_yasg2.utils import swagger_auto_schema
import asyncio

from . import serializers
from .models import Order


async def get_orders():
    return Order.objects.all()


class Orders(APIView):
    @swagger_auto_schema(
        operation_summary="an endpoint to list all orders",
        operation_description="returns list of orders",
        responses={'200': 'Success', '400': 'Bad Request.'},
        tags=['Order creation']
    )
    def get(self, request):
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        orders = loop.run_until_complete(get_orders())
        loop.close()
        serializer = serializers.OrderSerializer(orders, many=True)
        return Response(serializer.data)

    @swagger_auto_schema(
        request_body=serializers.OrderSerializer,
        operation_summary="an endpoint to create an order",
        operation_description="endpoint takes a name to create an ordeer",
        responses={'201': 'Create Order', '400': 'Bad Request.'},
        tags=['Order creation']
    )
    def post(self, request):

        serializer = serializers.OrderSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(ingredients=request.data.get("ingredients"))
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
