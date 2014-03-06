define(["Map", "Slide"], function(Map, Slide) {
	return Backbone.View.extend({
		el : document.body,

		enterMode : function() {
			$("body").removeClass("non-selectable-text");
			$(".step").removeClass("hoverable");
			$(".step").removeClass("borderless");
			if ($(".component").draggable("option", "disabled") === true) {
				$(".component").draggable("enable");
			}
			$(".component").addClass("hoverable");
			$(".step").removeClass("selected");
			$(document).off("mousedown", Map.onMousedown);
			$("#slides").off("mousedown", ".step", Slide.onMousedown);
			$("#slides").off("click", ".step", Slide.onClick);
	
			// Remove mousewheel events for zooming
			// For Chrome
			document.removeEventListener("mousewheel", Map.onMouseWheel);
	
			// For Firefox (if onmousewheel doesn't work)
			document.removeEventListener("DOMMouseScroll", Map.onMouseWheel2);
	
			document.getElementById("btn-navigation-mode").style.display = "block";
		},

		exitMode : function() {

		},
	});
});
