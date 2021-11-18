"""
TODO: Add Description Here

This file was created on November 17, 2021
"""
import datetime

from django.shortcuts import render
from django.template.defaultfilters import register

from test_tracker.models.product import Product
from test_tracker.models.test_status import TestStatus
from test_tracker.models.test_case import TestCase
from test_tracker.models.test_result import TestResult
from test_tracker.models.test_category import TestCategory
from test_tracker.models.test_subcategory import TestSubcategory


@register.filter
def get_item(dictionary, key):
    return dictionary.get(key, None)


def new_dashboard(request, name, version):
    context = {
        'errors': [],
        'name': name,
        'version': version,
        'number_of_days': 6
    }

    # Get Product
    try:
        product = Product.objects.get(name=name, version=version)
    except Product.DoesNotExist:
        context['errors'].append(f'{name} {version} is not a tested product...')
        return render(request, "test_tracker/new_dashboard.html", context)

    # Get Testcases
    test_cases = TestCase.objects.filter(product=product)
    context['tests'] = [{'case': case, 'results': case.get_results_for_last_n_days(context['number_of_days'])}
                        for case in test_cases]

    # Get Dates
    context['dates'] = [datetime.date.today() - (i * datetime.timedelta(days=1))
                        for i in range(context['number_of_days'])]

    return render(request, "test_tracker/new_dashboard.html", context)

