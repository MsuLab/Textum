# -*- coding:utf-8 -*-
from django.conf import settings
from django.conf.urls import patterns, include, url

from api import urls as api_urls

from web.views import FrontView, TextumView
from web import urls as web_urls


urlpatterns = patterns(
    '',
    # Single Page Application Landing Page
    url(r'^$', FrontView.as_view()),
    url(r'^site/', FrontView.as_view(), name='client'),
    url(r'^textum/', TextumView.as_view(), name='textum'),

    # Web Templates
    url(r'^web/', include(web_urls, namespace='web')),

    # API Routes
    url(r'^api/', include(api_urls, namespace='api')),

    # Uploads
    # url(r'^upload/', include(upload, namespace='upload')),
)

if settings.DEBUG:
    urlpatterns += patterns(
        '',
        (r'^media/(?P<path>.*)$', 'django.views.static.serve', {'document_root': settings.MEDIA_ROOT}))
