# -*- coding:utf-8 -*-
from django.conf.urls import patterns, url

from web.views import TextumView, TextumBaseView, TextumEditorView, TextumViewerView


urlpatterns = patterns(
    '',
    url(r'^tpl/textum/base$', TextumBaseView.as_view()),
    url(r'^tpl/textum/editor$', TextumEditorView.as_view()),
    url(r'^tpl/textum/viewer$', TextumViewerView.as_view()),
)
