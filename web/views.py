# -*- coding:utf-8 -*-
from django.http import HttpResponse

from django.views.generic import View
from django.views.generic.base import TemplateView


class FrontView(TemplateView):
    template_name = 'base.html'


# Templates:
class SampleView(TemplateView):
    template_name = 'app/sample/sample.tpl.html'


class State1View(TemplateView):
    template_name = 'app/sample/sample.tpl.state1.html'

class State1ListView(TemplateView):
    template_name = 'app/sample/sample.tpl.state1.list.html'

class State2View(TemplateView):
    template_name = 'app/sample/sample.tpl.state2.html'

class State2ListView(TemplateView):
    template_name = 'app/sample/sample.tpl.state2.list.html'

class MultiView(TemplateView):
    template_name = 'app/sample/sample.tpl.multi.html'