(function () {
    'use strict';

    angular
        .module('TextumApp')
        .controller("WodoEditorController", WodoEditorController);

    WodoEditorController.$inject = ['$scope', '$rootScope'];

    function WodoEditorController ($scope, $rootScope) {
        var wodo = this;

        wodo.docUrl = '/static/app/textum/editor/wodo/welcome.odt';

        wodo.editor = null;
        wodo.loadedFilename = null;
        wodo.editorOptions = {
            loadCallback: load,
            saveCallback: save,
            allFeaturesEnabled: true
        };

        wodo.pages = [];

        activate();
        ////////////////////////////////////////

        function activate () {
            Wodo.createTextEditor('editorContainer', wodo.editorOptions, onEditorCreated);

            angular.element.fn.goTo = function () {
                angular.element('#webodfeditor-canvascontainer1').animate({
                    scrollTop: $(this).offset().top + 'px'
                }, 'fast');
                return this; // for chaining...
            };

            $scope.$on("editor/scrollToPage", function (event, pageNum) {
                angular.forEach(wodo.pages, function (page, i) {
                    if(page.num == pageNum)
                        page.el.goTo();
                })
            })
        }

        function parseAnnotations() {
            var marksJQ = angular.element(".annotationConnector.horizontal");

            marksJQ.each(function (i, element) {
                wodo.pages.push({
                    "el": $(element),
                    "num": parseInt($(element).parent().find("p").text())
                });
            });
        }

        function startEditing() {
            parseAnnotations()
        }

        function fileSelectHandler(evt) {
            var file, files, reader;
            files = (evt.target && evt.target.files) ||
                (evt.dataTransfer && evt.dataTransfer.files);
            function onLoadEnd() {
                if (reader.readyState === 2) {
                    runtime.registerFile(file.name, reader.result);
                    wodo.loadedFilename = file.name;
                    wodo.editor.openDocumentFromUrl(wodo.loadedFilename, startEditing);
                }
            }

            if (files && files.length === 1) {
                wodo.editor.closeDocument(function () {
                    file = files[0];
                    reader = new FileReader();
                    reader.onloadend = onLoadEnd;
                    reader.readAsArrayBuffer(file);
                });
            } else {
                alert("File could not be opened in this browser.");
            }
        }

        function enhanceRuntime() {
            console.log("enhanceRuntime");
            var openedFiles = {},
                readFile = runtime.readFile;
            runtime.readFile = function (path, encoding, callback) {
                var array;
                if (openedFiles.hasOwnProperty(path)) {
                    array = new Uint8Array(openedFiles[path]);
                    callback(undefined, array);
                } else {
                    return readFile(path, encoding, callback);
                }
            };
            runtime.registerFile = function (path, data) {
                openedFiles[path] = data;
            };
        }

        function createFileLoadForm() {
            console.log("enhanceRuntime");
            var form = document.createElement("form"),
                input = document.createElement("input");

            function internalHandler(evt) {
                if (input.value !== "") {
                    fileSelectHandler(evt);
                }
                // reset to "", so selecting the same file next time still trigger the change handler
                input.value = "";
            }

            form.appendChild(input);
            form.style.display = "none";
            input.id = "fileloader";
            input.setAttribute("type", "file");
            input.addEventListener("change", internalHandler, false);
            document.body.appendChild(form);
        }

        function load() {
            console.log("load");
            var form = document.getElementById("fileloader");
            if (!form) {
                enhanceRuntime();
                createFileLoadForm();
                form = document.getElementById("fileloader");
            }
            form.click();
        }

        function save() {
            console.log("load");
            function saveByteArrayLocally(err, data) {
                if (err) {
                    alert(err);
                    return;
                }
                // TODO: odfcontainer should have a property mimetype
                var mimetype = "application/vnd.oasis.opendocument.text",
                    filename = wodo.loadedFilename || "doc.odt",
                    blob = new Blob([data.buffer], {type: mimetype});
                saveAs(blob, filename);
            }

            wodo.editor.getDocumentAsByteArray(saveByteArrayLocally);
        }

        function onEditorCreated(err, editor) {
            if (err) {
                // something failed unexpectedly
                alert(err);
                return;
            }
            $rootScope.$broadcast("editor/onEditorCreated");

            wodo.editor = editor;
            wodo.editor.setUserData({
                fullName: "Textum",
                color: "black"
            });
            console.log(editor )

            wodo.loadedFilename = wodo.docUrl;


            wodo.editor.openDocumentFromUrl(wodo.docUrl, startEditing);
        }
    }
})();