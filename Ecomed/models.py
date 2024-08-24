from django.conf import settings
from django.contrib.auth.models import AbstractUser, Group
from django.db import models
from django.contrib.auth import get_user_model

class CustomUser(AbstractUser):
    is_manager = models.BooleanField(default=False)
    is_client = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    code = models.CharField(max_length=100, blank=True, null=True)
    date_joined = models.DateTimeField(null=True, blank=True, auto_now_add=True)

    def __str__(self):
        return self.username

class Manager(Group):
    class Meta:
        proxy = True

    def save(self, *args, **kwargs):
        if not self.pk:
            self.name = 'Manager'
        super().save(*args, **kwargs)

class Client(Group):
    class Meta:
        proxy = True

    def save(self, *args, **kwargs):
        if not self.pk:
            self.name = 'Client'
        super().save(*args, **kwargs)

class Admin(Group):
    class Meta:
        proxy = True

    def save(self, *args, **kwargs):
        if not self.pk:
            self.name = 'Admin'
        super().save(*args, **kwargs)

class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name

class Product(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    stock = models.PositiveIntegerField(default=0)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True)
    image = models.ImageField(upload_to='products/', blank=True, null=True, default='path/to/default/image.jpg')
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.name

class Order(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('shipped', 'Shipped'),
        ('delivered', 'Delivered'),
        ('cancelled', 'Cancelled'),
        ('cart', 'Cart'),
    ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)  # Ajout de ce champ
    total_price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)  # Ajout de ce champ
    address = models.CharField(max_length=255, blank=True, null=True)  # Ajout de l'adresse
    city = models.CharField(max_length=100, blank=True, null=True)  # Ajouter le champ pour la ville
    postal_code = models.CharField(max_length=20, blank=True, null=True)  # Ajouter le champ pour le code postal
    street = models.CharField(max_length=255, blank=True, null=True)  # Ajouter le champ pour la rue
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='cart')  # Modification de la valeur par défaut
    delivery_deadline = models.DateTimeField(blank=True, null=True)  # Ajout du champ délai de livraison
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if not self.pk:  # Si l'instance est nouvelle
            self.total_price = self.product.price * self.quantity
        else:
            self.total_price = self.product.price * self.quantity
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Order {self.id} by {self.user.username}"

class SiteSettings(models.Model):
    payment_options = models.TextField()
    delivery_fees = models.TextField()
    logo = models.ImageField(upload_to='logos/', null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return "Paramètres du site"
    
class ChangeLog(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True)
    action = models.CharField(max_length=255)
    timestamp = models.DateTimeField()
    object_type = models.CharField(max_length=50, default="Unknown")  # Ajout de la valeur par défaut
    object_id = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"{self.user} - {self.action} - {self.timestamp}"


