# -*- coding:utf-8 -*-
from django.conf.urls import patterns, url, include

from rest_framework import routers

from api.sample.views import SampleApiView
from api.textum import views


router = routers.DefaultRouter()
router.register(r'text-documents', views.TextDocumentViewSet)
router.register(r'text-images', views.TextImageViewSet)

urlpatterns = patterns(
    '',
    url(r'^sample/$', SampleApiView.as_view(), name='sample'),
)
