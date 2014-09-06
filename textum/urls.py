# -*- coding:utf-8 -*-
from django.conf import settings
from django.conf.urls import patterns, include, url

from api import urls as api_urls

from web.views import FrontView
from web import urls as web_urls


urlpatterns = patterns(
    '',
    url(r'^$', FrontView.as_view(), name='front'),
    url(r'^web/', include(web_urls, namespace='web')),

    url(r'^api/', include(api_urls, namespace='api_urls')),

    # url(r'^upload/', include(upload, namespace='upload')),
)

if settings.DEBUG:
    urlpatterns += patterns(
        '',
        (r'^media/(?P<path>.*)$', 'django.views.static.serve', {'document_root': settings.MEDIA_ROOT}))
