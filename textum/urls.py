# -*- coding:utf-8 -*-
from django.conf import settings
from django.conf.urls import patterns, include, url
from django.contrib import admin

from api.urls import api_urls

from web.views import TextumView
from web import urls as web_urls


urlpatterns = patterns(
    '',
    # API Routes
    url(r'^api/', include(api_urls)),
    url(r'^web/', include(web_urls, namespace='web')),

    # Single Page Application Landing Page
    url(r'^$', TextumView.as_view()),
    url(r'^textum/', TextumView.as_view(), name='textum'),
)

if settings.DEBUG:
    urlpatterns += patterns(
        '',
        (r'^media/(?P<path>.*)$', 'django.views.static.serve', {'document_root': settings.MEDIA_ROOT}))
