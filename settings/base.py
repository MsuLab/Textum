# -*- coding:utf-8 -*-
import os

BASE_DIR = os.path.dirname(os.path.dirname(__file__))

SECRET_KEY = '+tc&yxvwe^$i+)h(9v6(1y(d-sp)g7ms3&@id(a+o__l40-@)-'

DEBUG = True
TEMPLATE_DEBUG = DEBUG

ALLOWED_HOSTS = ['*']

ROOT_URLCONF = 'textum.urls'

WSGI_APPLICATION = 'textum.wsgi.application'

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True

INSTALLED_APPS = (
    # 'django.contrib.admin',
    # 'django.contrib.auth',
    'django.contrib.contenttypes',
    # 'django.contrib.sessions',
    # 'django.contrib.messages',
    'django.contrib.staticfiles',

    'djangobower',
    'compressor',

    'rest_framework',

    'api',
    'api.textum',

    'web',
)

SPA_ROOT = os.path.join(BASE_DIR, 'web/client/')

MEDIA_ROOT = os.path.join(os.path.dirname(__file__), '..', 'media')
MEDIA_URL = '/media/'

STATIC_ROOT = os.path.join(os.path.dirname(__file__), '..', 'static') + '/'
STATIC_URL = '/static/'


MIDDLEWARE_CLASSES = (
    # 'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    # 'django.middleware.csrf.CsrfViewMiddleware',
    # 'django.contrib.auth.middleware.AuthenticationMiddleware',
    # 'django.contrib.auth.middleware.SessionAuthenticationMiddleware',
    # 'django.contrib.messages.middleware.MessageMiddleware',
    # 'django.middleware.clickjacking.XFrameOptionsMiddleware',
)

STATICFILES_DIRS = (SPA_ROOT,)

STATICFILES_FINDERS = (
    'django.contrib.staticfiles.finders.FileSystemFinder',
    'django.contrib.staticfiles.finders.AppDirectoriesFinder',
    # 'compressor.finders.CompressorFinder',

    'compressor.finders.CompressorFinder',
)

TEMPLATE_DIRS = (SPA_ROOT,)

TEMPLATE_LOADERS = (
    'django.template.loaders.filesystem.Loader',
    'django.template.loaders.app_directories.Loader',
)


# Djnago Rest Framework settings:

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.TokenAuthentication',
    ),
   'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.AllowAny',
        # 'rest_framework.permissions.DjangoModelPermissionsOrAnonReadOnly'
    ),
}


# Bower settings:

STATICFILES_FINDERS += (
    'djangobower.finders.BowerFinder',
)

BOWER_COMPONENTS_ROOT = SPA_ROOT

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


# Logging settings:

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'filters': {
        'require_debug_false': {
            '()': 'django.utils.log.RequireDebugFalse'
        }
    },
    'handlers': {
        'mail_admins': {
            'level': 'ERROR',
            'filters': ['require_debug_false'],
            'class': 'django.utils.log.AdminEmailHandler'
        }
    },
    'loggers': {
        'django.request': {
            'handlers': ['mail_admins'],
            'level': 'ERROR',
            'propagate': True,
        },
    }
}

try:
    from .local_dev import *
except ImportError:
    pass