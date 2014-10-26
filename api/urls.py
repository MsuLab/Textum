# -*- coding:utf-8 -*-
from django.conf.urls import patterns, url, include

from api.textum.urls import textum_router


api_urls = textum_router.urls

api_urls += patterns(
    '',
    url(r'^auth/', include('rest_framework.urls', namespace='rest_framework')),
)