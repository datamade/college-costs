# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('paying_for_college', '0006_program_completion_cohort'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='program',
            name='completion_cohorts',
        ),
    ]
