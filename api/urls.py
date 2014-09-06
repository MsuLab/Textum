# -*- coding:utf-8 -*-
from django.conf.urls import patterns, url

from api.views import TestView


urlpatterns = patterns(
    '',
    url(r'^$', TestView.as_view(), name='api_test'),
)
