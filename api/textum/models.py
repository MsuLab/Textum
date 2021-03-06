import os

from django.db import models

from model_utils.models import TimeStampedModel
from pytils import translit
from imagekit.models import ImageSpecField
from pilkit.processors import ResizeToFit


def media_file_path(instance, filename):
    """
    Path is <kind>/<media_id/digits>/file_name
    """
    name, ext = os.path.splitext(filename)
    kind, media_id = instance.get_path_parts()
    print os.path.join(kind, os.path.join(*list(str(media_id))), translit.slugify(name)) + ext
    return os.path.join(kind, os.path.join(*list(str(media_id))), translit.slugify(name)) + ext


class TextDocument(TimeStampedModel):
    document = models.FileField(upload_to=media_file_path)

    def get_path_parts(self):
        return 'text_document', self.id


class TextImage(TimeStampedModel):
    page_number = models.FloatField(blank=True, null=True)
    image = models.ImageField(upload_to=media_file_path)

    image_medium = ImageSpecField((ResizeToFit(150, 150),), format='JPEG', options={'quality': 90}, source='image')
    image_small = ImageSpecField((ResizeToFit(101, 101),), format='JPEG', options={'quality': 90}, source='image')

    def get_path_parts(self):
        return 'text_image', self.id
