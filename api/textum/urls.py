# -*- coding:utf-8 -*-
from rest_framework import routers

from api.textum import views


textum_router = routers.DefaultRouter()
textum_router.register(r'text-documents', views.TextDocumentViewSet)
textum_router.register(r'text-images', views.TextImageViewSet)