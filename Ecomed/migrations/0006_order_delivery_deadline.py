# Generated by Django 5.0.6 on 2024-08-04 23:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Ecomed', '0005_order_city_order_postal_code_order_street'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='delivery_deadline',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]
