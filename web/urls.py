# -*- coding:utf-8 -*-
from django.conf.urls import patterns, url

from web.views import SampleView


urlpatterns = patterns(
    '',
    url(r'^tpl/sample/$', SampleView.as_view(), name='web_sample'),
)
