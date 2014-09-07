# -*- coding:utf-8 -*-
from django.conf.urls import patterns, url

from api.sample.views import SampleApiView


urlpatterns = patterns(
    '',
    url(r'^sample/$', SampleApiView.as_view(), name='sample'),
)
