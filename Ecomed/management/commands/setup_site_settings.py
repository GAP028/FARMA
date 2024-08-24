from django.core.management.base import BaseCommand
from Ecomed.models import SiteSettings

class Command(BaseCommand):
    help = 'Configure initial site settings'

    def handle(self, *args, **kwargs):
        if not SiteSettings.objects.exists():
            SiteSettings.objects.create(
                payment_options='Carte de crédit, PayPal',
                delivery_fees=5.00
            )
            self.stdout.write(self.style.SUCCESS('Site settings initialized'))
        else:
            self.stdout.write(self.style.SUCCESS('Site settings already exist'))
