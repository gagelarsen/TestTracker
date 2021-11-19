from django import forms
from test_tracker.models.test_result import TestResult
from bootstrap_modal_forms.forms import BSModalModelForm


class TestResultForm(BSModalModelForm):
    class Meta:
        model = TestResult
        fields = ['date', 'status', 'author', 'testcase', 'note']
