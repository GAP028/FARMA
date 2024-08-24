from django.apps import AppConfig
from django.db.models.signals import post_migrate

class EcomedConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'Ecomed'

    def ready(self):
        from django.contrib.auth.models import Group, Permission  # Assurez-vous de l'importer ici

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

        post_migrate.connect(create_user_groups, sender=self)

