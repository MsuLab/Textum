# -*- coding:utf-8 -*-
from django.http import HttpResponse

from django.views.generic import View
from django.views.generic.base import TemplateView


class TestView(View):
    def get(self, request):
        return HttpResponse("Web. It works!")


class FrontView(TemplateView):
    template_name = 'front/base.html'