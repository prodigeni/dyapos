/**
 * @module Editor
 */

/**
 * This class manages export and import functions
 * @class ImportExport
 * @static
 */

define([], function(){
	"use strict";
	return Backbone.View.extend({
		el : document.getElementById("import-export-window"),

		events : {
			"submit #form-export" : "exportPresentation",
			"submit #form-import" : "importPresentation",
		},

		exportPresentation : function(event) {
			event.preventDefault();
			// var presentation_data = $(event.target).serialize() + "&slides=" + JSON.stringify(app.slides.toJSON()) + "&theme=" + localStorage.theme;
			// event.target.appendChild('<input type="hidden" name="slides" value="' + JSON.stringify(app.slides.toJSON()) + '">');
			// event.target.appendChild("<input type='hidden' name='theme' value='" + localStorage.theme + "'>");
			console.log("Export presentation");
			$(event.target).find("[name=theme]").val(localStorage.theme);
			$(event.target).find("[name=slides]").val(JSON.stringify(app.slides.toJSON()));
			// $.post("/presentation/export", presentation_data, function(response) {
				// console.log(response);
			// });
			event.target.submit();
		},

		importPresentation : function(event) {
			event.preventDefault();
			console.log("Import presentation");
		},
	});
});
