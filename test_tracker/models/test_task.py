"""
********************************************************************************
* Name: test_task.py
* Author: Gage Larsen
* Created On: December 12, 2021
* Copyright: (c) GLD
********************************************************************************
"""
import datetime
import logging

from django.contrib.auth.models import User
from django.db import models

log = logging.getLogger('test_tracker.' + __name__)


class TestTask(models.Model):
    date_created = models.DateField(default=datetime.date.today)
    assigned_to = models.ForeignKey(User, on_delete=models.PROTECT, related_name='reviewer')
    reviewer = models.ForeignKey(User, on_delete=models.PROTECT, related_name='assigned_to')
    task = models.TextField()
    notes = models.TextField()
    complete = models.BooleanField(default=False)

    def __str__(self):
        return f'<{"Complete - " if self.complete else ""}{self.task} - {self.assigned_to}>'
