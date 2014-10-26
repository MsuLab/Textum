# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('textum', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='textimage',
            name='page_number',
            field=models.FloatField(null=True, blank=True),
        ),
    ]
