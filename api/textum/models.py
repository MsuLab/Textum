import os

from django.db import models

from model_utils.models import TimeStampedModel
from pytils import translit


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
    image = models.ImageField(upload_to=media_file_path)
    page_number = models.IntegerField(blank=True, null=True)

    def get_path_parts(self):
        return 'text_image', self.id
