from api.views import ApiView


class SampleApiView(ApiView):
    def post(self, request):
        return self.render_json_response({'api_post': 'It works!'})

    def get(self, request):
        return self.render_json_response({'api_get': 'It works!'})

    def patch(self, request):
        return self.render_json_response({'api_patch': 'It works!'})

    def delete(self, request):
        return self.render_json_response({'api_delete': 'It works!'})

    def options(self, request):
        return self.render_json_response({'api_options': 'It works!'})