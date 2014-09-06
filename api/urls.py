# -*- coding:utf-8 -*-
from django.conf.urls import patterns, url

from api.sample.views import SampleApiView


urlpatterns = patterns(
    '',
    url(r'^$', SampleApiView.as_view(), name='api_sample'),
)
