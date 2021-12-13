import datetime

from django.http import JsonResponse
from django.template.loader import render_to_string

from test_tracker.models.test_result import TestResult
from test_tracker.models.test_case import TestCase


def async_update_results(request, pk):
    import datetime
    print(datetime.datetime.now())
    data = dict()
    if request.method == 'GET':
        result = TestResult.objects.get(id=pk)
        testcase = {'case': result.testcase, 'results': result.testcase.get_results_for_last_n_days()}
        # asyncSettings.dataKey = 'result'
        data['result'] = render_to_string(
            'test_tracker/_dashboard_table_result.html',
            {'result': result, 'product': result.testcase.product},
            request=request
        )
        print(datetime.datetime.now())
        return JsonResponse(data)


def async_update_testcase_in_table(request, pk, num_days):
    data = dict()
    print(datetime.datetime.now())
    if request.method == 'GET':
        testcase = TestCase.objects.get(id=pk)
        test = {'case': testcase, 'results': testcase.get_results_for_last_n_days(num_days)}

        dates = [datetime.date.today() - (i * datetime.timedelta(days=1))
                 for i in range(num_days)]

        dates_copy = dates.copy()
        for date in dates_copy:
            if date in dates:
                results = TestResult.objects.filter(date=date)
                if len(results) <= 0:
                    dates.remove(date)

        data['result'] = render_to_string(
            'test_tracker/_dashboard_table_result_new.html',
            {'test': test, 'product': testcase.product, 'dates': dates},
            request=request
        )
        print(datetime.datetime.now())
        return JsonResponse(data)


def async_update_case():
    pass
