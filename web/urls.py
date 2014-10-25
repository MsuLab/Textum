# -*- coding:utf-8 -*-
from django.conf.urls import patterns, url

from web.views import SampleView, State1View, State1ListView, State2View, State2ListView, MultiView
from web.views import TextumView, TextumBaseView, TextumEditorView, TextumViewerView


urlpatterns = patterns(
    '',
    url(r'^tpl/sample/$', SampleView.as_view(), name='web_sample'),

    url(r'^tpl/sample/state1$', State1View.as_view()),
    url(r'^tpl/sample/state1/list$', State1ListView.as_view()),
    url(r'^tpl/sample/state2$', State2View.as_view()),
    url(r'^tpl/sample/state2/list$', State2ListView.as_view()),

    url(r'^tpl/sample/multi$', MultiView.as_view()),

    url(r'^tpl/textum/base$', TextumBaseView.as_view()),
    url(r'^tpl/textum/editor$', TextumEditorView.as_view()),
    url(r'^tpl/textum/viewer$', TextumViewerView.as_view()),
)
