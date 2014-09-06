# -*- coding:utf-8 -*-
from django.views.generic import View
from django.http import HttpResponse


class TestView(View):
    def get(self, request):
        return HttpResponse("Api. It works!")