from django.db import models


class Order(models.Model):

    STATUS_CHOICES = (
        ('waiting', 'waiting'),
        ('ready', 'ready'),
    )
    name = models.CharField(max_length=255, blank=False)
    status = models.CharField(
        max_length=20, choices=STATUS_CHOICES, default='waiting')
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name}"


class Ingredient(models.Model):
    order = models.ManyToManyField(Order, related_name='order')
    name = models.CharField(max_length=255, unique=True, verbose_name="Name")

    def __str__(self):
        return self.name
