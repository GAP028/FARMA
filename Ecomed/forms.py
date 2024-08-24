from django import forms
from django.contrib.auth.forms import UserCreationForm, UserChangeForm as BaseUserChangeForm
from django.utils.translation import gettext_lazy as _
from django.utils import timezone
from .models import Product, Order, Category, SiteSettings
from django.contrib.auth import get_user_model
from django.forms import DateInput, Textarea
from django.core.exceptions import ValidationError

CustomUser = get_user_model()

class CustomUserCreationForm(UserCreationForm):
    email = forms.EmailField(
        required=True,
        widget=forms.TextInput(attrs={'class': 'form-control'})
    )
    first_name = forms.CharField(
        required=True,
        max_length=30,
        label="Prénom",
        widget=forms.TextInput(attrs={'class': 'form-control'})
    )
    last_name = forms.CharField(
        required=True,
        max_length=30,
        label="Nom",
        widget=forms.TextInput(attrs={'class': 'form-control'})
    )
    code = forms.CharField(
        required=False,
        max_length=10,
        label="Code (si applicable)",
        widget=forms.TextInput(attrs={'class': 'form-control'})
    )

    class Meta:
        model = CustomUser
        fields = ('username', 'email', 'first_name', 'last_name', 'password1', 'password2', 'code')
        widgets = {
            'username': forms.TextInput(attrs={'class': 'form-control'}),
            'password1': forms.PasswordInput(attrs={'class': 'form-control'}),
            'password2': forms.PasswordInput(attrs={'class': 'form-control'}),
        }

    def save(self, commit=True):
        user = super().save(commit=False)
        user.email = self.cleaned_data['email']
        user.first_name = self.cleaned_data['first_name']
        user.last_name = self.cleaned_data['last_name']
        code = self.cleaned_data.get('code')

        if code == 'ecomed28':
            user.is_manager = True
            user.is_client = False
            user.is_admin = False
        elif code == 'ecomed11':
            user.is_admin = True
            user.is_manager = False
            user.is_client = False
        else:
            user.is_client = True
            user.is_manager = False
            user.is_admin = False

        if commit:
            user.save()
        return user 

class UserChangeForm(BaseUserChangeForm):
    date_joined_display = forms.CharField(
        label="Date d'inscription",
        required=False,
        widget=forms.TextInput(attrs={'readonly': 'readonly', 'class': 'form-control'})
    )
    is_admin = forms.BooleanField(
        label="Admin",
        required=False
    )
    is_manager = forms.BooleanField(
        label="Manager",
        required=False
    )
    is_client = forms.BooleanField(
        label="Client",
        required=False
    )

    class Meta(BaseUserChangeForm.Meta):
        model = CustomUser
        fields = ('username', 'email', 'first_name', 'last_name', 'is_admin', 'is_manager', 'is_client')

    def __init__(self, *args, **kwargs):
        super(UserChangeForm, self).__init__(*args, **kwargs)
        if self.instance.pk and self.instance.date_joined:
            local_time = self.instance.date_joined.astimezone(timezone.get_current_timezone())
            self.fields['date_joined_display'].initial = local_time.strftime('%Y-%m-%d %H:%M:%S')

class ProductForm(forms.ModelForm):
    new_category = forms.CharField(
        max_length=100,
        required=False,
        label="Nouvelle catégorie",
        widget=forms.TextInput(attrs={'class': 'form-control'})
    )
    
    class Meta:
        model = Product
        fields = ['name', 'description', 'price', 'stock', 'category', 'image']
        widgets = {
            'description': forms.Textarea(attrs={'rows': 4, 'class': 'form-control'}),
            'price': forms.NumberInput(attrs={'class': 'form-control'}),
            'stock': forms.NumberInput(attrs={'class': 'form-control'}),
            'category': forms.Select(attrs={'class': 'form-control'}),
            'image': forms.ClearableFileInput(attrs={'class': 'form-control'}),
        }

    def save(self, commit=True):
        new_category_name = self.cleaned_data.get('new_category')
        if new_category_name:
            # Créez une nouvelle catégorie si elle n'existe pas déjà
            category, created = Category.objects.get_or_create(name=new_category_name)
            self.instance.category = category
        return super().save(commit=commit)
    
class OrderForm(forms.ModelForm):
    class Meta:
        model = Order
        fields = ['user', 'product', 'status', 'delivery_deadline']  # Inclure le délai de livraison
        widgets = {
            'delivery_deadline': DateInput(attrs={'type': 'datetime-local', 'class': 'form-control'}),
            'user': forms.Select(attrs={'class': 'form-control'}),
            'product': forms.Select(attrs={'class': 'form-control'}),
            'status': forms.Select(attrs={'class': 'form-control'}),
        }

class SiteSettingsForm(forms.ModelForm):
    logo = forms.ImageField(
        required=False,
        label="Logo du site",
        widget=forms.FileInput(attrs={'class': 'form-control'})
    )

    class Meta:
        model = SiteSettings
        fields = ['payment_options', 'delivery_fees', 'logo']
        widgets = {
            'payment_options': Textarea(attrs={'rows': 4, 'class': 'form-control'}),
            'delivery_fees': Textarea(attrs={'rows': 4, 'class': 'form-control'}),
        }
        
    def clean_logo(self):
        logo = self.cleaned_data.get('logo')
        if logo and logo.size > 5 * 1024 * 1024:  # Limite de 5 Mo
            raise ValidationError("Le fichier image est trop grand. La taille maximale est de 5 Mo.")
        return logo

class OrderFilterForm(forms.Form):
    status_choices = [
        ('cart', 'Panier'),
        ('completed', 'Complétée'),
        ('cancelled', 'Annulée')
    ]
    status = forms.ChoiceField(
        choices=status_choices,
        required=False,
        label="Statut",
        widget=forms.Select(attrs={'class': 'form-control'})
    )
    user = forms.CharField(
        max_length=100,
        required=False,
        label="Utilisateur",
        widget=forms.TextInput(attrs={'class': 'form-control'})
    )

class ProductFilterForm(forms.Form):
    category_choices = [(c.id, c.name) for c in Category.objects.all()]
    category = forms.ChoiceField(
        choices=[('', 'Toutes les catégories')] + category_choices,
        required=False,
        label="Catégorie",
        widget=forms.Select(attrs={'class': 'form-control'})
    )
    min_stock = forms.IntegerField(
        required=False,
        label="Quantité minimale",
        widget=forms.NumberInput(attrs={'class': 'form-control'})
    )

class OrderAddressForm(forms.ModelForm):
    city = forms.CharField(
        label="Ville",
        required=True,
        widget=forms.TextInput(attrs={'class': 'form-control'})
    )
    postal_code = forms.CharField(
        label="Code Postal",
        required=True,
        widget=forms.TextInput(attrs={'class': 'form-control'})
    )
    street = forms.CharField(
        label="Rue",
        required=True,
        widget=forms.TextInput(attrs={'class': 'form-control'})
    )

    class Meta:
        model = Order
        fields = ['address', 'city', 'postal_code', 'street']
        widgets = {
            'address': forms.Textarea(attrs={'rows': 2, 'class': 'form-control'}),
        }
