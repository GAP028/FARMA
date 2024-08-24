from django.db.models.signals import post_save
from django.dispatch import receiver
from django.core.mail import send_mail
from django.conf import settings
from .models import Order, CustomUser

@receiver(post_save, sender=Order)
def notify_managers_and_admins(sender, instance, created, **kwargs):
    if created:  # Si une nouvelle commande est créée
        managers_and_admins = CustomUser.objects.filter(is_manager=True) | CustomUser.objects.filter(is_admin=True)
        email_list = [user.email for user in managers_and_admins if user.email]
        
        send_mail(
            'Nouvelle commande passée',
            f'Une nouvelle commande a été passée par {instance.user.username}.',
            settings.DEFAULT_FROM_EMAIL,
            email_list,
            fail_silently=False,
        )
