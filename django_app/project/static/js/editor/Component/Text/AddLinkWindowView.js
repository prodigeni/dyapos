define([], function() {
	"use strict";
	return Backbone.View.extend({
		el : document.getElementById("add-link-box"),

		events : {
			"click #btn-add-text-link" : "addLink"
		},

		addLink : function() {
			app.selected_component.set("link", document.getElementById("text-link").value);
			$("#add-link-box").foundation("reveal", "close");
		}
	});
});
