from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import authenticate, login
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.decorators import login_required, user_passes_test
from django.contrib.auth import get_user_model, update_session_auth_hash
from django.contrib.auth.forms import PasswordChangeForm
from .forms import OrderAddressForm
from pathlib import Path
from django.utils import timezone
from .models import Product, Category
from django.db.models import Sum, Avg, Count, F
from .models import SiteSettings, Product, Order, CustomUser
from .forms import CustomUserCreationForm, UserChangeForm, ProductForm, OrderForm, SiteSettingsForm, OrderFilterForm
from django.http import HttpResponse
from django.templatetags.static import static
from django.conf import settings
import os
from .models import ChangeLog
from django.shortcuts import render
import csv
from django.contrib import messages


User = get_user_model()

def home_view(request):
    return render(request, 'Ecomed/accueil.html')  # Chemin vers votre fichier HTML dans le dossier templates

def login_view(request):
    if request.method == 'POST':
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            user = authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)
                if user.is_admin:
                    return redirect('admin_dashboard')
                elif user.is_manager:
                    return redirect('users_list')
                return redirect('home')
            else:
                form.add_error(None, 'Nom d\'utilisateur ou mot de passe incorrect.')
    else:
        form = AuthenticationForm()
    return render(request, 'registration/login.html', {'form': form})

def signup_view(request):
    if request.method == 'POST':
        form = CustomUserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            if user.is_admin:
                return redirect('admin_dashboard')
            elif user.is_manager:
                return redirect('users_list')
            return redirect('home')
    else:
        form = CustomUserCreationForm()
    return render(request, 'registration/signup.html', {'form': form})

@login_required
def users_list_view(request):
    users = CustomUser.objects.all()
    total_users = users.count()
    return render(request, 'Ecomed/users_list.html', {'users': users, 'total_users': total_users})


@login_required
@user_passes_test(lambda u: u.is_admin)
def add_user_view(request):
    if request.method == 'POST':
        form = CustomUserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('users_list')
    else:
        form = CustomUserCreationForm()
    return render(request, 'Ecomed/add_user.html', {'form': form})

@login_required
@user_passes_test(lambda u: u.is_admin)
def edit_user_view(request, user_id):
    user = get_object_or_404(CustomUser, id=user_id)
    if request.method == 'POST':
        form = UserChangeForm(request.POST, instance=user)
        if form.is_valid():
            form.save()
            # Enregistrer dans le log
            ChangeLog.objects.create(
                user=request.user,
                action=f"Modification de l'utilisateur {user.username}",
                timestamp=timezone.now(),
                object_type='user',  # Assurez-vous que 'object_type' est défini dans votre modèle
                object_id=user.id     # Assurez-vous que 'object_id' est défini dans votre modèle
            )
            return redirect('admin_dashboard')
    else:
        form = UserChangeForm(instance=user)
    return render(request, 'Ecomed/edit_user.html', {'form': form, 'user': user})


@login_required
@user_passes_test(lambda u: u.is_admin)
def delete_user_view(request, user_id):
    user = get_object_or_404(User, id=user_id)
    if request.method == 'POST':
        user.delete()
        return redirect('users_list')
    return render(request, 'Ecomed/delete_user.html', {'user': user})

@login_required
@user_passes_test(lambda u: u.is_admin)
def user_details_view(request, user_id):
    user = get_object_or_404(User, id=user_id)
    return render(request, 'Ecomed/user_details.html', {'user': user})

@login_required
def change_password_view(request):
    if request.method == 'POST':
        form = PasswordChangeForm(user=request.user, data=request.POST)
        if form.is_valid():
            user = form.save()
            update_session_auth_hash(request, user)  # Important pour ne pas déconnecter l'utilisateur
            return redirect('client_profile')  # Rediriger vers la page de profil après changement
    else:
        form = PasswordChangeForm(user=request.user)
    return render(request, 'Ecomed/change_password.html', {'form': form})

@login_required
@user_passes_test(lambda u: u.is_admin)
def admin_dashboard_view(request):
    users = CustomUser.objects.all()
    products = Product.objects.all()
    orders = Order.objects.all()

    if request.method == 'POST':
        for key, value in request.POST.items():
            if key.startswith('deadline_'):
                order_id = key[len('deadline_'):]
                try:
                    order = Order.objects.get(id=order_id)
                    order.delivery_deadline = value
                    order.save()
                except Order.DoesNotExist:
                    continue
        return redirect('admin_dashboard')

    return render(request, 'Ecomed/admin_dashboard.html', {
        'users': users,
        'products': products,
        'orders': orders
    })

@login_required
@user_passes_test(lambda u: u.is_admin)
def add_product_view(request):
    if request.method == 'POST':
        form = ProductForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return redirect('admin_dashboard')
    else:
        form = ProductForm()
    return render(request, 'Ecomed/add_product.html', {'form': form})

@login_required
@user_passes_test(lambda u: u.is_admin)
def edit_product_view(request, product_id):
    product = get_object_or_404(Product, id=product_id)
    if request.method == 'POST':
        form = ProductForm(request.POST, request.FILES, instance=product)
        if form.is_valid():
            form.save()
            # Enregistrer dans le log
            ChangeLog.objects.create(
                user=request.user,
                action=f"Modification du produit {product.name}",
                timestamp=timezone.now(),
                object_type='product',
                object_id=product.id
            )
            return redirect('admin_dashboard')
    else:
        form = ProductForm(instance=product)
    return render(request, 'Ecomed/edit_product.html', {'form': form})


@login_required
@user_passes_test(lambda u: u.is_admin)
def delete_product_view(request, product_id):
    product = get_object_or_404(Product, id=product_id)
    if request.method == 'POST':
        product.delete()
        return redirect('admin_dashboard')
    return render(request, 'Ecomed/delete_product.html', {'product': product})

@login_required
@user_passes_test(lambda u: u.is_admin or u.is_manager)
def edit_order_view(request, order_id):
    order = get_object_or_404(Order, id=order_id)

    if request.method == 'POST':
        order_form = OrderForm(request.POST, instance=order)
        address_form = OrderAddressForm(request.POST, instance=order)

        if order_form.is_valid() and address_form.is_valid():
            order_form.save()
            address_form.save()
            # Enregistrer dans le log
            ChangeLog.objects.create(
                user=request.user,
                action=f"Modification de la commande {order.id}",
                timestamp=timezone.now(),
                object_type='order',
                object_id=order.id
            )
            return redirect('orders_list')
    else:
        order_form = OrderForm(instance=order)
        address_form = OrderAddressForm(instance=order)

    return render(request, 'Ecomed/edit_order.html', {
        'order_form': order_form,
        'address_form': address_form
    })

def sales_report(request):
    # Filtrer les commandes complètes pour les statistiques financières
    completed_orders = Order.objects.filter(status='delivered')  # Supposons que 'delivered' est le statut complet
    
    # Filtrer toutes les commandes
    all_orders = Order.objects.all()

    # Calcul du nombre total de commandes complètes
    total_completed_orders = completed_orders.count()
    
    # Calcul du nombre total de toutes les commandes
    total_orders = all_orders.count()

    # Calcul du chiffre d'affaires total pour les commandes complètes
    total_revenue_completed = completed_orders.aggregate(Sum('total_price'))['total_price__sum'] or 0

    # Calcul du chiffre d'affaires total pour toutes les commandes
    total_revenue_all = all_orders.aggregate(Sum('total_price'))['total_price__sum'] or 0

    # Calcul du panier moyen pour les commandes complètes
    average_cart_value_completed = completed_orders.aggregate(Avg('total_price'))['total_price__avg'] or 0

    # Calcul du panier moyen pour toutes les commandes
    average_cart_value_all = all_orders.aggregate(Avg('total_price'))['total_price__avg'] or 0

    # Répartition des commandes par statut
    orders_by_status = all_orders.values('status').annotate(total=Count('status'))

    # Calcul du taux de rétention
    total_customers = Order.objects.values('user_id').distinct().count()
    retained_customers = Order.objects.values('user_id').annotate(order_count=Count('id')).filter(order_count__gt=1).count()
    retention_rate = (retained_customers / total_customers) * 100 if total_customers > 0 else 0

    # Si l'export en CSV est demandé
    if request.GET.get('export') == 'csv':
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename="rapport_de_ventes.csv"'

        writer = csv.writer(response)
        
        # Écrire les stats globales dans le CSV
        writer.writerow(['Statistique', 'Valeur'])
        writer.writerow(['Total de Commandes Complétées', total_completed_orders])
        writer.writerow(['Chiffre d\'Affaires des Commandes Complétées', total_revenue_completed])
        writer.writerow(['Panier Moyen des Commandes Complétées', average_cart_value_completed])
        writer.writerow(['Total de Toutes les Commandes', total_orders])
        writer.writerow(['Chiffre d\'Affaires Total', total_revenue_all])
        writer.writerow(['Panier Moyen de Toutes les Commandes', average_cart_value_all])
        writer.writerow(['Taux de Rétention', f'{retention_rate}%'])

        writer.writerow([])  # Ligne vide pour séparer les sections
        
        # Écrire les commandes complètes dans le CSV
        writer.writerow(['ID', 'Produit', 'Utilisateur', 'Quantité', 'Prix Total', 'Date de création'])
        for order in completed_orders:
            writer.writerow([order.id, order.product.name, order.user.username, order.quantity, order.total_price, order.created_at])

        writer.writerow([])  # Ligne vide pour séparer les sections
        
        # Écrire la répartition des commandes par statut dans le CSV
        writer.writerow(['Statut', 'Nombre de commandes'])
        for status in orders_by_status:
            writer.writerow([status['status'], status['total']])

        writer.writerow([])  # Ligne vide pour séparer les sections
        
        # Écrire toutes les commandes dans le CSV
        writer.writerow(['ID', 'Produit', 'Utilisateur', 'Quantité', 'Prix Total', 'Date de création'])
        for order in all_orders:
            writer.writerow([order.id, order.product.name, order.user.username, order.quantity, order.total_price, order.created_at])

        return response

    # Contexte pour le rendu HTML
    context = {
        'completed_orders': completed_orders,
        'total_completed_orders': total_completed_orders,
        'total_orders': total_orders,
        'total_revenue_completed': total_revenue_completed,
        'total_revenue_all': total_revenue_all,
        'average_cart_value_completed': average_cart_value_completed,
        'average_cart_value_all': average_cart_value_all,
        'orders_by_status': orders_by_status,
        'retention_rate': retention_rate,
        'all_orders': all_orders,
    }

    return render(request, 'Ecomed/sales_report.html', context)

def user_report(request):
    role_filter = request.GET.get('role')  # Récupérer le filtre du rôle depuis les paramètres GET
    users = CustomUser.objects.all()

    # Appliquer le filtre basé sur le rôle sélectionné
    if role_filter == 'admin':
        users = users.filter(is_admin=True)
    elif role_filter == 'manager':
        users = users.filter(is_manager=True)
    elif role_filter == 'client':
        users = users.filter(is_client=True)

    # Calcul des statistiques
    total_users = users.count()
    total_duration = sum((timezone.now() - user.date_joined).total_seconds() for user in users)
    average_duration = total_duration / total_users if total_users > 0 else 0

    # Exporter en CSV si demandé
    if request.GET.get('export') == 'csv':
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename="rapport_des_utilisateurs.csv"'

        writer = csv.writer(response)
        writer.writerow(['ID', 'Nom d\'utilisateur', 'Email', 'Rôles', 'Dernière connexion', 'Date d\'inscription'])

        for user in users:
            roles = []
            if user.is_admin:
                roles.append('Admin')
            if user.is_manager:
                roles.append('Manager')
            if user.is_client:
                roles.append('Client')
            roles_str = ', '.join(roles)
            writer.writerow([user.id, user.username, user.email, roles_str, user.last_login, user.date_joined])

        return response

    context = {
        'users': users,
        'total_users': total_users,
        'average_duration': average_duration,
        'role_filter': role_filter,  # Passer le filtre actif au template
    }
    return render(request, 'Ecomed/user_report.html', context)

def stock_report(request):
    # Récupérer tous les produits
    products = Product.objects.all()

    # Récupérer toutes les catégories pour le filtre
    categories = Category.objects.all()

    # Filtrage des produits par catégorie ou seuil de stock
    category_id = request.GET.get('category')
    min_stock = request.GET.get('min_stock')

    if category_id:
        products = products.filter(category_id=category_id)  # Filtrer par catégorie

    if min_stock is not None:
        min_stock = int(min_stock)  # Convertir en entier pour filtrer
        products = products.filter(stock__gte=min_stock)

    # Exporter en CSV si demandé
    if request.GET.get('export') == 'csv':
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename="rapport_des_stocks.csv"'

        writer = csv.writer(response)
        writer.writerow(['ID', 'Nom du produit', 'Description', 'Prix', 'Quantité disponible'])

        for product in products:
            writer.writerow([product.id, product.name, product.description, product.price, product.stock])

        return response

    context = {
        'products': products,
        'categories': categories,  # Ajouter les catégories au contexte
    }
    return render(request, 'Ecomed/stock_report.html', context)


def edit_site_settings(request):
    settings = SiteSettings.objects.first()
    if request.method == 'POST':
        form = SiteSettingsForm(request.POST, instance=settings)
        if form.is_valid():
            form.save()
            return redirect('site_settings')  # Redirige vers la vue des paramètres du site
    else:
        form = SiteSettingsForm(instance=settings)
    return render(request, 'edit_site_settings.html', {'form': form})

@login_required
@user_passes_test(lambda u: u.is_manager)
def products_list_view(request):
    products = Product.objects.all()
    return render(request, 'Ecomed/products_list.html', {'products': products})

@login_required
@user_passes_test(lambda u: u.is_manager)
def orders_list_view(request):
    orders = Order.objects.all()

    # Filtrage par statut et recherche par utilisateur
    status = request.GET.get('status')
    user_query = request.GET.get('user')

    if status:
        orders = orders.filter(status=status)

    if user_query:
        orders = orders.filter(user__username__icontains=user_query)

    # Exportation des commandes en CSV
    if 'export' in request.GET:
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename="orders.csv"'
        writer = csv.writer(response)
        writer.writerow([
            'ID', 'Produit', 'Utilisateur', 'Rue', 'Adresse', 'Ville', 
            'Code Postal', 'Statut', 'Date de création', 'Délai de livraison'
        ])
        for order in orders:
            writer.writerow([
                order.id, order.product.name, order.user.username, order.street,
                order.address, order.city, order.postal_code, order.status,
                order.created_at, order.delivery_deadline or 'Pas défini'
            ])
        return response

    return render(request, 'Ecomed/orders_list.html', {'orders': orders})

@login_required
@user_passes_test(lambda u: u.is_client)
def client_products_view(request):
    search_query = request.GET.get('search', '')
    products = Product.objects.filter(name__icontains=search_query)
    return render(request, 'Ecomed/client_products.html', {'products': products})

@login_required
@user_passes_test(lambda u: u.is_client)
def client_cart_view(request):
    orders = Order.objects.filter(user=request.user, status='cart')

    if request.method == 'POST':
        if 'update_quantity' in request.POST:
            order_id = request.POST.get('order_id')
            new_quantity = int(request.POST.get('quantity'))
            order = get_object_or_404(Order, id=order_id, user=request.user, status='cart')

            # Vérifiez si la nouvelle quantité dépasse le stock disponible
            if new_quantity > order.product.stock:
                new_quantity = order.product.stock  # Limiter à la quantité en stock

            # Mettre à jour la quantité et le prix total
            order.quantity = new_quantity
            order.total_price = order.product.price * new_quantity
            order.save()

            return redirect('client_cart')  # Rafraîchir la page pour voir les changements
        
        # Traitement des informations de livraison
        form = OrderAddressForm(request.POST)
        if form.is_valid():
            address = form.cleaned_data['address']
            city = form.cleaned_data['city']
            postal_code = form.cleaned_data['postal_code']
            street = form.cleaned_data['street']
            
            # Mettre à jour les informations de livraison et changer le statut en 'pending'
            orders.update(address=address, city=city, postal_code=postal_code, street=street, status='pending')
            return redirect('checkout')  # Rediriger vers la page de commande
    else:
        form = OrderAddressForm()

    return render(request, 'Ecomed/client_cart.html', {'orders': orders, 'form': form})

@login_required
@user_passes_test(lambda u: u.is_client)
def client_order_history_view(request):
    user = request.user
    orders = Order.objects.filter(user=user).exclude(status='cart')
    return render(request, 'Ecomed/client_order_history.html', {'orders': orders})

@login_required
@user_passes_test(lambda u: u.is_client)
def client_profile_view(request):
    user = request.user
    if request.method == 'POST':
        form = UserChangeForm(request.POST, instance=user)
        if form.is_valid():
            form.save()
            # Enregistrer dans le log
            ChangeLog.objects.create(
                user=request.user,
                action="Modification du profil client",
                timestamp=timezone.now(),
                object_type='user',
                object_id=user.id
            )
            messages.success(request, "Profil mis à jour avec succès.")
            return redirect('client_profile')
    else:
        form = UserChangeForm(instance=user)
    return render(request, 'Ecomed/client_profile.html', {'form': form})


@login_required
@user_passes_test(lambda u: u.is_client)
def add_to_cart_view(request, product_id):
    product = get_object_or_404(Product, id=product_id)
    
    if request.method == 'POST':
        quantity = int(request.POST.get('quantity', 1))
        
        # Vérifiez si une commande existe déjà pour ce produit et utilisateur
        order, created = Order.objects.get_or_create(
            user=request.user,
            product=product,
            status='cart',
            defaults={'quantity': quantity}
        )
        
        if not created:
            # Si l'ordre existe déjà, mettez à jour la quantité et le prix total
            order.quantity += quantity
            if order.quantity > product.stock:
                order.quantity = product.stock  # Limite à la quantité en stock
            order.save()  # La méthode save mettra à jour total_price

    return redirect('client_cart')  # Redirige vers la page du panier

@login_required
@user_passes_test(lambda u: u.is_client)
def remove_from_cart_view(request, order_id):
    order = get_object_or_404(Order, id=order_id, user=request.user, status='cart')
    order.delete()
    return redirect('client_cart')


@login_required
@user_passes_test(lambda u: u.is_client)
def checkout_view(request):
    orders = Order.objects.filter(user=request.user, status='Cart')
    for order in orders:
        order.status = 'Ordered'
        order.save()
    return redirect('client_order_history')

def site_settings(request):
    settings = SiteSettings.objects.first()
    if request.method == 'POST':
        form = SiteSettingsForm(request.POST, request.FILES, instance=settings)
        if form.is_valid():
            form.save()
            # Enregistrement dans les logs
            ChangeLog.objects.create(
                user=request.user,
                action="Modification des paramètres du site",
                timestamp=timezone.now()
            )
            messages.success(request, "Les paramètres ont été sauvegardés avec succès.")
            return redirect('site_settings')
        else:
            messages.error(request, "Erreur lors de la sauvegarde des paramètres.")
    else:
        form = SiteSettingsForm(instance=settings)
        
    # Récupérer l'historique des modifications
    history = ChangeLog.objects.all().order_by('-timestamp')

    return render(request, 'Ecomed/site_settings.html', {'form': form, 'history': history})

