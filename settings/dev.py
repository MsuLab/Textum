# -*- coding:utf-8 -*-
from .base import *


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.7/howto/static-files/
# Absolute filesystem path to the directory that will hold user-uploaded files.
# Example: "/var/www/example.com/media/"
MEDIA_ROOT = os.path.join(os.path.dirname(__file__), '..', 'media')

# URL that handles the media served from MEDIA_ROOT. Make sure to use a
# trailing slash.
# Examples: "http://example.com/media/", "http://media.example.com/"
MEDIA_URL = '/media/'

# Absolute path to the directory static files should be collected to.
# Don't put anything in this directory yourself; store your static files
# in apps' "static/" subdirectories and in STATICFILES_DIRS.
# Example: "/var/www/example.com/static/"
STATIC_ROOT = os.path.join(os.path.dirname(__file__), '..', 'static') + '/'

# URL prefix for static files.
# Example: "http://example.com/static/", "http://static.example.com/"
STATIC_URL = '/static/'


# Database
# https://docs.djangoproject.com/en/1.7/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}


INSTALLED_APPS += (
    'djangobower',
    'compressor',
)

STATICFILES_FINDERS += (
    'djangobower.finders.BowerFinder',
    'compressor.finders.CompressorFinder',
)

SPA_ROOT = os.path.join(BASE_DIR, 'web/client/')

BOWER_COMPONENTS_ROOT = SPA_ROOT

STATICFILES_DIRS = (
    SPA_ROOT,
)

TEMPLATE_DIRS = (
    SPA_ROOT,
)


BOWER_INSTALLED_APPS = (
    'angular#v1.3.0-rc.0',
    'angular-resource#v1.3.0-rc.0',
    'angular-route#v1.3.0-rc.0',
    'angular-cookies#v1.3.0-rc.0',
    'angular-sanitize#v1.3.0-rc.0',
    'angular-animate#v1.3.0-rc.0',

    'angular-ui-router#0.2.11',
    # 'angular-file-upload#v1.1.1',
    'angular-loading-bar#v0.5.2',
    'ngDialog#0.2.13',
    'blueimp-file-upload#v9.8.0',

    'bootstrap#v3.2.0',
    'html5shiv#v3.7.2',
    'respond#1.4.2',
)
