import json

from django.test import TestCase
from django.urls import reverse
from orders.models import Order
from rest_framework import status
from rest_framework.test import APIClient

ORDER_URL = reverse('orders')


class OrderApiTests(TestCase):
    """Test pizza order actions"""

    def setUp(self):
        self.client = APIClient()

    def test_create_order_success(self):
        """Test creating pizza order"""
        payload = {
            'name': 'Top',
            'status': 'waiting',
        }
        res = self.client.post(ORDER_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        order = Order.objects.get(id=res.data['id'])
        for key in payload.keys():
            self.assertEqual(payload[key], getattr(order, key))

    def test_create_order_default_status(self):
        """Test creating pizza order"""
        payload = {
            'name': 'Top',
        }
        res = self.client.post(ORDER_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        order = Order.objects.get(id=res.data['id'])
        self.assertEqual(str(order.status), 'waiting')

    def test_create_order_fail(self):
        """Test creating pizza order"""
        payload = {
            'name': '',
        }
        res = self.client.post(ORDER_URL, payload)
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(res.data, {
            "name": [
                "This field may not be blank."
            ]
        })

    def test_create_order_status_fail(self):
        """Test creating pizza order with wrong status"""
        payload = {
            'name': 'pa pizza',
            'status': "wrong"
        }
        res = self.client.post(ORDER_URL, payload)
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(res.data, {
            "status": [
                "\"wrong\" is not a valid choice."
            ]
        })

    def test_create_order_with_ingredients(self):
        """Test creating order with ingredients"""
        ingredient1 = {"name": "cheese"}
        ingredient2 = {"name": "bacon"}
        payload = {
            'name': 'Free',
            'ingredients': [ingredient1, ingredient2],
        }

        res = self.client.post(ORDER_URL, json.dumps(
            payload), content_type='application/json')

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(res.data['name'], payload['name'])
        self.assertEqual(len(res.data['ingredients']), 2)
