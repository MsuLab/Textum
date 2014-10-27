# -*- coding:utf-8 -*-
from django.http import HttpResponse

from django.views.generic import View
from django.views.generic.base import TemplateView


class TextumView(TemplateView):
    template_name = 'app/textum/main.html'


class TextumBaseView(TemplateView):
    template_name = 'app/textum/base.tpl.html'

class TextumEditorView(TemplateView):
    template_name = 'app/textum/editor/editor.tpl.html'

class TextumViewerView(TemplateView):
    template_name = 'app/textum/viewer/viewer.tpl.html'
