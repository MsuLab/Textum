from django.contrib.auth.models import User, Group
from rest_framework import serializers

from api.textum.models import TextDocument, TextImage


class TextDocumentSerializer(serializers.HyperlinkedModelSerializer):
    document_url = serializers.SerializerMethodField('get_image_url')

    class Meta:
        model = TextDocument
        fields = ('id', 'document', 'document_url',)

    def get_image_url(self, obj):
        return obj.document.url


class TextImageSerializer(serializers.HyperlinkedModelSerializer):
    image_url = serializers.SerializerMethodField('get_image_url')

    class Meta:
        model = TextImage
        fields = ('id', 'image', 'image_url', 'page_number',)

    def get_image_url(self, obj):
        return obj.image.url
