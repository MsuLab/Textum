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
    url = serializers.SerializerMethodField('get_image_url')
    medium_url = serializers.Field('image_medium.url')
    small_url = serializers.Field('image_small.url')

    class Meta:
        model = TextImage
        fields = ('id', 'image', 'url', 'page_number', 'medium_url', 'small_url',)

    def get_image_url(self, obj):
        return obj.image.url
