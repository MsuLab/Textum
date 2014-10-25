from django.contrib.auth.models import User, Group

from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import detail_route


from api.textum.serializers import TextDocumentSerializer, TextImageSerializer
from api.textum.models import TextDocument, TextImage


class TextDocumentViewSet(viewsets.ModelViewSet):
    """
    """
    queryset = TextDocument.objects.all()
    serializer_class = TextDocumentSerializer


class TextImageViewSet(viewsets.ModelViewSet):
    """
    """
    queryset = TextImage.objects.all()
    serializer_class = TextImageSerializer

    @detail_route(methods=['patch'])
    def set_page_number(self, request, pk=None):
        serializer = self.serializer_class(TextImage.objects.get(pk=pk))
        return Response(serializer.data)
