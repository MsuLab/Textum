'use strict';

TextumApp.factory('SampleResource', function($resource){
    var SampleResource = $resource("http://127.0.0.1:8000/api/sample/");

    return SampleResource;
});