from django import forms
from test_tracker.models.test_result import TestResult
from bootstrap_modal_forms.mixins import PopRequestMixin, CreateUpdateAjaxMixin
from bootstrap_datepicker_plus import DatePickerInput


class TestResultForm(PopRequestMixin, CreateUpdateAjaxMixin, forms.ModelForm):
    class Meta:
        model = TestResult
        fields = ['date', 'status', 'author', 'testcase', 'note']
