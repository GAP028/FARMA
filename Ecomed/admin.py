# Ecomed/admin.py
from django.contrib.auth.models import Group, Permission
from django.db.models.signals import post_migrate
from django.dispatch import receiver
# admin.py
from django.contrib import admin
from .models import CustomUser, Product, Order, SiteSettings

@admin.register(CustomUser)
class CustomUserAdmin(admin.ModelAdmin):
    list_display = ('username', 'email', 'is_admin', 'is_manager', 'is_client', 'date_joined')
    search_fields = ('username', 'email')

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'stock', 'category')
    search_fields = ('name', 'category__name')

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('user', 'product', 'status')
    search_fields = ('user__username', 'product__name')

@admin.register(SiteSettings)
class SiteSettingsAdmin(admin.ModelAdmin):
    list_display = ('payment_options', 'delivery_fees')

@receiver(post_migrate)
def create_user_groups(sender, **kwargs):
    if sender.name == 'Ecomed':
        manager_group, created = Group.objects.get_or_create(name='Manager')
        client_group, created = Group.objects.get_or_create(name='Client')
        
        if created:
            manager_permissions = Permission.objects.filter(codename__in=[
                'add_product', 'change_product', 'delete_product'])
            manager_group.permissions.add(*manager_permissions)
            
            client_permissions = Permission.objects.filter(codename='view_product')
            client_group.permissions.add(*client_permissions)
