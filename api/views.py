# -*- coding:utf-8 -*-
import abc

from django.views.generic import View
from django.http import HttpResponse

from braces.views import JSONResponseMixin


class ApiView(JSONResponseMixin, View):
    """
    100 => 'Continue',
    101 => 'Switching Protocols',

    200 => 'OK',
    201 => 'Created',
    202 => 'Accepted',
    203 => 'Non-Authoritative Information',
    204 => 'No Content',
    205 => 'Reset Content',
    206 => 'Partial Content',

    300 => 'Multiple Choices',
    301 => 'Moved Permanently',
    302 => 'Found',
    303 => 'See Other',
    304 => 'Not Modified',
    305 => 'Use Proxy',
    307 => 'Temporary Redirect',

    400 => 'Bad Request',
    401 => 'Unauthorized',
    402 => 'Payment Required',
    403 => 'Forbidden',
    404 => 'Not Found',
    405 => 'Method Not Allowed',
    406 => 'Not Acceptable',
    407 => 'Proxy Authentication Required',
    408 => 'Request Timeout',
    409 => 'Conflict',
    410 => 'Gone',
    411 => 'Length Required',
    412 => 'Precondition Failed',
    413 => 'Request Entity Too Large',
    414 => 'Request-URI Too Long',
    415 => 'Unsupported Media Type',
    416 => 'Requested Range Not Satisfiable',
    417 => 'Expectation Failed',

    500 => 'Internal Server Error',
    501 => 'Not Implemented',
    502 => 'Bad Gateway',
    503 => 'Service Unavailable',
    504 => 'Gateway Timeout',
    505 => 'HTTP Version Not Supported',
    """

    __metaclass__ = abc.ABCMeta
    http_method_names = ['get', 'post', 'put', 'delete', 'head', 'options', 'trace', 'patch']

    def dispatch_init(self, request):
        for method in ('put', 'patch',):
            self._coerce_method_post(request, method)

    def dispatch(self, request, *args, **kwargs):
        result = self.dispatch_init(request)
        return result if isinstance(result, HttpResponse) else super(ApiView, self).dispatch(request, *args, **kwargs)

    def response_unauthorized(self):
        return HttpResponse(status=401)

    def response_limits(self):
        return HttpResponse(status=402)

    def response_forbidden(self):
        return HttpResponse(status=403)

    def response_conflict(self, data):
        return self.render_json_response(data, 409)

    def options(self, request, *args, **kwargs):
        return self.http_method_not_allowed(request, *args, **kwargs)

    def _coerce_method_post(self, request, method):
        """
        Django doesn't particularly understand REST.
        In case we send data over PUT, Django won't
        actually look at the data and load it. We need
        to twist its arm here.

        The try/except abominiation here is due to a bug
        in mod_python. This should fix it.
        """
        method_name = method.upper()
        if request.method == method_name:
            # Bug fix: if _load_post_and_files has already been called, for
            # example by middleware accessing request.POST, the below code to
            # pretend the request is a POST instead of a PUT will be too late
            # to make a difference. Also calling _load_post_and_files will result
            # in the following exception:
            # AttributeError: You cannot set the upload handlers after the upload has been processed.
            # The fix is to check for the presence of the _post field which is set
            # the first time _load_post_and_files is called (both by wsgi.py and
            # modpython.py). If it's set, the request has to be 'reset' to redo
            # the query value parsing in POST mode.
            if hasattr(request, '_post'):
                del request._post
                del request._files

            try:
                request.method = "POST"
                request._load_post_and_files()
                request.method = method_name
            except AttributeError:
                request.META['REQUEST_METHOD'] = 'POST'
                request._load_post_and_files()
                request.META['REQUEST_METHOD'] = method_name

            setattr(request, method_name, request.POST)