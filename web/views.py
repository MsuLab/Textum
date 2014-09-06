# -*- coding:utf-8 -*-
from django.http import HttpResponse

from django.views.generic import View
from django.views.generic.base import TemplateView


class FrontView(TemplateView):
    template_name = 'front/base.html'


# Templates:
class SampleView(TemplateView):
    template_name = 'front/sample/sample.html'