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
    model = TextImage

    @detail_route(methods=['patch'])
    def update_page_number(self, request, pk=None):
        obj = self.model.objects.get(pk=pk)
        obj.page_number = request.DATA["page_number"]
        obj.save()

        serializer = self.serializer_class(obj)
        return Response(serializer.data)
