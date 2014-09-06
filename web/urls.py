# -*- coding:utf-8 -*-
from django.conf.urls import patterns, url

from web.views import TestView


urlpatterns = patterns(
    '',
    url(r'^$', TestView.as_view(), name='web_test'),
)
