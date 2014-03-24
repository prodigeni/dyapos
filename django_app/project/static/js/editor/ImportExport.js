/**
 * @module Editor
 */

/**
 * This class manages export and import functions
 * @class ImportExport
 * @static
 */

define([], function () {
    "use strict";
    return Backbone.View.extend({
        el: document.getElementById("import-export-window"),

        events: {
            "submit #form-export": "exportPresentation",
            "submit #form-import": "importPresentation",
        },

        exportPresentation: function (event) {
            event.preventDefault();
            console.log("Export presentation");
            $(event.target).find("[name=theme]").val(localStorage.theme);
            $(event.target).find("[name=slides]").val(JSON.stringify(app.slides.toJSON()));
            event.target.submit();
        },

        importPresentation: function (event) {
            event.preventDefault();
            console.log("Import presentation");
            var file = event.target.querySelector("[name=presentation_file]").files[0],
                form_data = new FormData();

            form_data.append("presentation_file", file);
            $.ajax({
                url: "presentation/import",
                type: "POST",
                contentType: false,
                data: form_data,
                processData: false,
                cache: false
            }).done(function (result) {
                result = JSON.parse(result);
                console.log(result);
                app.slides.reset(result.slides);
                app.views.theme_selector.set(result.theme);
                $("#import-export-window").foundation("reveal", "close");
            });
        },
    });
});