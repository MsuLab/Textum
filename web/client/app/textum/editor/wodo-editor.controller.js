(function () {
    'use strict';

    angular
        .module('TextumApp')
        .controller("WodoEditorController", WodoEditorController);

    WodoEditorController.$inject = ['$scope', '$rootScope', 'paginationService'];

    function WodoEditorController ($scope, $rootScope, paginationService) {
        var wodo = this,
            KmarksQueryStr = ".annotationConnector.horizontal",
            KwrapperQueryStr = "#webodfeditor-canvascontainer1";

        wodo.pages = [];
        wodo.editor = null;
        wodo.wrapperJQ = null;

        wodo.menuHeight = 21;

        wodo.docUrl = '/static/app/textum/editor/wodo/welcome.odt';
        wodo.loadedFilename = null;

        // ToDo: Disable unused operations.
        wodo.editorOptions = {
            loadCallback: load,
            saveCallback: save,
            allFeaturesEnabled: true,
            hyperlinkEditingEnabled: false,
            imageEditingEnabled: false
        };

        activate();
        ////////////////////////////////////////

        function activate () {
            Wodo.createTextEditor('editorContainer', wodo.editorOptions, onEditorCreated);
        }

        function initScopeAndListeners () {
            /* Scope */
            wodo.wrapperJQ = angular.element(KwrapperQueryStr);


            /* Listeners */
            $scope.$on("wodo/scrollToPage", function (event, pageNum) {
                angular.forEach(wodo.pages, function (page, i) {
                    if(page.num == pageNum)
                        wodo.wrapperJQ.scrollTop(page.top);
                })
            });
            $scope.$on("wodo/parseAnnotations", parseAnnotations);


            /* Extra */

            // jq extension for scrolling up to element.
            angular.element.fn.goTo = function () {
                wodo.wrapperJQ.animate({
                    scrollTop: $(this).offset().top + 'px'
                }, 'fast');
                return this; // for chaining...
            };

            // jq extension for getting text only from adjusted element, not from child.
            angular.element.fn.getElementText = function() {
                return $(this).clone()
                        .children()
                        .remove()
                        .end()
                        .text();
            };
        }

        function startEditing() {
            initScopeAndListeners();
            parseAnnotations();
        }

        // ToDo: create wodo page service.
        // ToDo: this should be called on annotation create event...
        function parseAnnotations() {
            // drop pages
            wodo.pages = [];

            // drop wrapper scroll for correct page offset evaluation
            wodo.wrapperJQ.scrollTop(0);

            // iterate through all wodo annotations and parse them.
            angular.element(KmarksQueryStr).each(function (i, element) {
                var elementJQ = $(element);

                wodo.pages.push({
                    "el": elementJQ,
                    "num": paginationService.decode(elementJQ.parent().find("p").getElementText()),
                    "top": elementJQ.offset().top - wodo.wrapperJQ.offset().top - wodo.menuHeight
                });
            });
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

            wodo.loadedFilename = wodo.docUrl.replace(/^.*[\\\/]/, '');

            wodo.editor.openDocumentFromUrl(wodo.docUrl, startEditing);
        }
    }
})();