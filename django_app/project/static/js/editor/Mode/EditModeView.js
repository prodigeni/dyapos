define([], function() {
	"use strict";
	return Backbone.View.extend({
		el : document.body,

		enterMode : function() {
			app.views.navigation_mode.exitMode();
			
			$("body").removeClass("non-selectable-text");
			$(".step").removeClass("hoverable");
			$(".step").removeClass("borderless");
			if ($(".component").draggable("option", "disabled") === true) {
				$(".component").draggable("enable");
			}
			$(".component").addClass("hoverable");
			$(".step").removeClass("selected");
	
			document.getElementById("btn-navigation-mode").style.display = "block";
		},

		exitMode : function() {
			
		},
	});
});
