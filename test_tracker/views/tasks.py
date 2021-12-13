"""
TODO: Add Description Here

This file was created on December 12, 2021
"""
from django.shortcuts import render

from test_tracker.models.test_task import TestTask


def task_list(request):
    context = {}

    tasks = TestTask.objects.all()

    context['tasks'] = tasks

    if request.user:
        context['assigned_tasks'] = tasks.filter(assigned_to=request.user)
        context['review_tasks'] = tasks.filter(reviewer=request.user)

    return render(request, "test_tracker/task_list.html", context)


def task_details(request, pk):
    context = {
        'task_id': pk,
    }
    return render(request, "test_tracker/task_details.html", context)
