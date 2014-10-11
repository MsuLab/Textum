# -*- coding:utf-8 -*-
from django.conf.urls import patterns, url

from web.views import SampleView, State1View, State1ListView, State2View, State2ListView, MultiView


urlpatterns = patterns(
    '',
    url(r'^tpl/sample/$', SampleView.as_view(), name='web_sample'),

    url(r'^tpl/sample/state1$', State1View.as_view()),
    url(r'^tpl/sample/state1/list$', State1ListView.as_view()),
    url(r'^tpl/sample/state2$', State2View.as_view()),
    url(r'^tpl/sample/state2/list$', State2ListView.as_view()),

    url(r'^tpl/sample/multi$', MultiView.as_view()),
)
