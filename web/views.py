# -*- coding:utf-8 -*-
from django.http import HttpResponse
from django.views.generic import View


class TestView(View):
    def get(self, request):
        return HttpResponse("Web. It works!")


class FrontView(View):
    def get(self, request):
        return HttpResponse("Front page. It works!")