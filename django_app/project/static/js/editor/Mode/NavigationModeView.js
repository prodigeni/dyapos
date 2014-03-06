define(["Map", "Slide"], function(Map, Slide) {
	return Backbone.View.extend({
		el : document.body,

		enterMode : function() {
			new_component_box_view.$el.hide();
			$(".toolbox").hide();
			$(".component-options").hide();

			$("body").addClass("non-selectable-text");
			$(".step").addClass("hoverable");
			$(".component").removeClass("hoverable");

			if ($(".component").draggable("option", "disabled") === false) {
				$(".component").draggable("disable");
			}

			document.getElementById(selected_slide).classList.add("selected-slide");
			// $(".step").off("drag", ".component", Component.hideNewComponentBox);
			// $(".step").off("dragstop", ".component", Component.onDragStop);
			$(document).on("mousedown", Map.onMousedown);
			$("#slides").on("mousedown", ".step", Slide.onMousedown);
			$("#slides").on("click", ".step", Slide.onClick);

			// Add mousewheel events for zooming
			// For Chrome
			document.addEventListener("mousewheel", Map.onMouseWheel);

			// For Firefox (if onmousewheel doesn't work)
			document.addEventListener("DOMMouseScroll", Map.onMouseWheel2);

			// Center rotation
			$map = $impress.children[0];
			var map_style = $map.style[css_transform];
			map_style = map_style.replace(/rotateZ\(.+?\)/g, "rotateZ(0deg)");
			map_style = map_style.replace(/rotateX\(.+?\)/g, "rotateX(0deg)");
			map_style = map_style.replace(/rotateY\(.+?\)/g, "rotateY(0deg)");
			$map.style[css_transform] = map_style;

			// Zoomout to 0.6
			$impress.style.transition = "all 300ms ease-in-out 50ms";
			$impress.style[css_transition] = "all 300ms ease-in-out 50ms";
			$impress.style[css_transform] = "scale(0.4)";

			// Hide the navigation mode button
			document.getElementById("btn-navigation-mode").style.display = "none";
		},

		exitMode : function() {

		},
	});
});