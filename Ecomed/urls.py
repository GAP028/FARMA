from django.urls import path
from django.conf.urls.static import static
from django.conf import settings
from .views import site_settings

from .views import (
    home_view,edit_site_settings,
    login_view, signup_view, users_list_view, 
    admin_dashboard_view, add_user_view, edit_user_view, 
    delete_user_view, user_details_view, change_password_view, 
    add_product_view, edit_product_view, delete_product_view,
    edit_order_view, sales_report, user_report, stock_report,
    products_list_view, orders_list_view, client_products_view,
    client_cart_view, client_order_history_view, client_profile_view,
    add_to_cart_view, remove_from_cart_view, checkout_view,
)

urlpatterns = [
    path('', home_view, name='home'),  # Route pour la page d'accueil
    path('login/', login_view, name='login'),
    path('signup/', signup_view, name='signup'),
    path('users/', users_list_view, name='users_list'),
    path('admin_dashboard/', admin_dashboard_view, name='admin_dashboard'),
    path('add_user/', add_user_view, name='add_user'),
    path('edit_user/<int:user_id>/', edit_user_view, name='edit_user'),
    path('delete_user/<int:user_id>/', delete_user_view, name='delete_user'),
    path('user_details/<int:user_id>/', user_details_view, name='user_details'),
    path('profile/change_password/', change_password_view, name='change_password'),
    path('products/add/', add_product_view, name='add_product'),
    path('products/edit/<int:product_id>/', edit_product_view, name='edit_product'),
    path('products/delete/<int:product_id>/', delete_product_view, name='delete_product'),
    path('orders/edit/<int:order_id>/', edit_order_view, name='edit_order'),
    path('sales_report/', sales_report, name='sales_report'),
    path('user_report/', user_report, name='user_report'),
    path('stock_report/', stock_report, name='stock_report'),
    path('site_settings/', site_settings, name='site_settings'),
    path('products/', products_list_view, name='products_list'),
    path('orders/', orders_list_view, name='orders_list'),
    path('client/products/', client_products_view, name='client_products'),
    path('client/cart/', client_cart_view, name='client_cart'),
    path('client/orders/', client_order_history_view, name='client_order_history'),
    path('client/profile/', client_profile_view, name='client_profile'),
    path('edit_site_settings/', edit_site_settings, name='edit_site_settings'),  # Ajoutez cette ligne
    path('client/add_to_cart/<int:product_id>/', add_to_cart_view, name='add_to_cart'),
    path('client/remove_from_cart/<int:order_id>/', remove_from_cart_view, name='remove_from_cart'),
    path('client/checkout/', checkout_view, name='checkout'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
