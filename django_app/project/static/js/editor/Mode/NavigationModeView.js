define([], function() {
	"use strict";
	return Backbone.View.extend({
		el : document.body,

		enterMode : function() {
			app.views.new_component_box.$el.hide();
			$(".toolbox").hide();
			$(".component-options").hide();

			$("body").addClass("non-selectable-text");
			$(".step").addClass("hoverable");
			$(".component").removeClass("hoverable");

			if ($(".component").draggable("option", "disabled") === false) {
				$(".component").draggable("disable");
			}

			document.getElementById(app.selected_slide).classList.add("selected-slide");

			// Center rotation
			var map_style = app.nav.map.style[app.css_transform];
			map_style = map_style.replace(/rotateZ\(.+?\)/g, "rotateZ(0deg)");
			map_style = map_style.replace(/rotateX\(.+?\)/g, "rotateX(0deg)");
			map_style = map_style.replace(/rotateY\(.+?\)/g, "rotateY(0deg)");
			app.nav.map.style[app.css_transform] = map_style;

			// Zoomout to 0.6
			document.getElementById("impress").style.transition = "all 300ms ease-in-out 50ms";
			document.getElementById("impress").style[app.css_transition] = "all 300ms ease-in-out 50ms";
			document.getElementById("impress").style[app.css_transform] = "scale(0.4)";

			// Hide the navigation mode button
			document.getElementById("btn-navigation-mode").style.display = "none";

			this.delegateEvents({
				"click .step" : "onClickSlide",
				"mousedown .step" : "onMousedownSlide",
				"mousedown" : "onMousedownMap",
				"mousewheel" : "onMouseWheel",
				"DOMMouseScroll" : "onMouseWheel2", //For Firefox
			});
		},

		exitMode : function() {
			this.undelegateEvents();
		},

		onClickSlide : function(event) {
			console.log("event: slide click");
			app.selected_slide = event.target.id;
			$("#" + app.selected_slide).addClass("selected");
			$(".step").removeClass("active");
			$("#" + app.selected_slide).addClass("active");
			app.views.slide_options_box.show();
		},

		onMousedownSlide : function(event) {
			event.stopPropagation();
			if (event.target.classList[0] == "step") {
				$(".step").removeClass("selected");
				app.clicked_slide = event.target;
				app.clicked_slide.classList.add("selected");
				console.log("mousedown on slide");
				app.nav.last_x = event.clientX;
				app.nav.last_y = event.clientY;
				app.nav.transform_style = event.target.style[app.css_transform];
				app.nav.slide_trans3d = event.target.style[app.css_transform].split("translate3d");
				app.nav.slide_trans3d = app.nav.slide_trans3d[app.nav.slide_trans3d.length - 1];
				app.nav.slide_trans3d = app.translate3DToArray(app.nav.slide_trans3d);

				$(document).on("mousemove", this.onMoveSlide);
				$(document).on("mouseup", this.onMouseupSlide);
			}
		},

		onMoveSlide : function(event) {
			event.stopPropagation();
			var movement = 7;

			//get the difference from last position to this position
			var deltaX = app.nav.last_x - event.clientX;
			var deltaY = app.nav.last_y - event.clientY;

			//check which direction had the highest amplitude and then figure out direction by checking if the value is greater or less than zero

			if (deltaX > 0) {
				// If the movement is to left
				app.nav.slide_trans3d[0] = parseInt(app.nav.slide_trans3d[0], 10) - movement;
			} else if (deltaX < 0) {
				// If the movement is to right
				app.nav.slide_trans3d[0] = parseInt(app.nav.slide_trans3d[0], 10) + movement;
			}

			if (deltaY > 0) {
				// If the movement is to up
				app.nav.slide_trans3d[1] = parseInt(app.nav.slide_trans3d[1], 10) - movement;
			} else if (deltaY < 0) {
				// If the movement is to down
				app.nav.slide_trans3d[1] = parseInt(app.nav.slide_trans3d[1], 10) + movement;
			}

			app.nav.last_x = event.clientX;
			app.nav.last_y = event.clientY;

			// apply movement to CSS style
			app.nav.transform_style = app.nav.transform_style.replace(/translate3d\(.+?\)/g, "translate3d(" + app.nav.slide_trans3d[0] + "px," + app.nav.slide_trans3d[1] + "px,0px)");
			app.clicked_slide.style[app.css_transform] = app.nav.transform_style;
		},

		onMouseupSlide : function(event) {
			event.stopPropagation();
			console.log("mouseup slide");
			app.clicked_slide.dataset.x = app.nav.slide_trans3d[0];
			app.clicked_slide.dataset.y = app.nav.slide_trans3d[1];

			app.slides.get(app.clicked_slide.id).set({
				"pos_x" : app.clicked_slide.dataset.x,
				"pos_y" : app.clicked_slide.dataset.y
			});
			
			impress().initStep(app.clicked_slide);

			$(document).off("mousemove", this.onMoveSlide);
			$(document).off("mouseup", this.onMouseupSlide);						
		},

		onMousedownMap : function(event) {
			event.stopPropagation();
			if (event.target.isEqualNode(document.body)) {
				console.log("mousedown on map");

				app.nav.last_x = event.clientX;
				app.nav.last_y = event.clientY;
				app.nav.map = document.getElementById("impress").children[0];
				app.nav.transform_style = app.nav.map.style[app.css_transform];
				app.nav.map_trans3d = app.nav.map.style[app.css_transform].split("translate3d");
				app.nav.map_trans3d = app.nav.map_trans3d[app.nav.map_trans3d.length - 1];
				app.nav.map_trans3d = app.translate3DToArray(app.nav.map_trans3d);

				// Remove transition animation for freely move on the map
				// (transition will be set again when call impress().goto())
				app.nav.map.style.transition = null;
				app.nav.map.style[app.css_transition] = null;

				$(document).on("mousemove", this.onMoveMap);
				$(document).on("mouseup", this.onMouseupMap);
			}
		},

		onMoveMap : function(event) {
			event.stopPropagation();
			var movement = 7;

			//get the difference from last position to this position
			var deltaX = app.nav.last_x - event.clientX;
			var deltaY = app.nav.last_y - event.clientY;

			//check which direction had the highest amplitude and then figure out direction by checking if the value is greater or less than zero

			if (deltaX > 0) {
				// If the movement is to left
				console.log("left");
				app.nav.map_trans3d[0] = parseInt(app.nav.map_trans3d[0], 10) - movement;
			} else if (deltaX < 0) {
				// If the movement is to right
				console.log("right");
				app.nav.map_trans3d[0] = parseInt(app.nav.map_trans3d[0], 10) + movement;
			}

			if (deltaY > 0) {
				// If the movement is to up
				console.log("up");
				app.nav.map_trans3d[1] = parseInt(app.nav.map_trans3d[1], 10) - movement;
			} else if (deltaY < 0) {
				// If the movement is to down
				console.log("down");
				app.nav.map_trans3d[1] = parseInt(app.nav.map_trans3d[1], 10) + movement;
			}

			app.nav.last_x = event.clientX;
			app.nav.last_y = event.clientY;

			// apply move to CSS style
			app.nav.transform_style = app.nav.transform_style.replace(/translate3d\(.+?\)/g, "translate3d(" + app.nav.map_trans3d[0] + "px," + app.nav.map_trans3d[1] + "px,0px)");
			app.nav.map.style[app.css_transform] = app.nav.transform_style;
		},

		onMouseupMap : function(event) {
			event.stopPropagation();
			console.log("event: mouseup map");
			$(document).off("mousemove", this.onMoveMap);
			$(document).off("mouseup", this.onMouseupMap);
		},

		onMouseWheel : function(event) {
			event.stopPropagation();
			console.log("event: onmousewheel");
			console.log(event);
			if (event.originalEvent.wheelDelta === 120) {
				console.log("event: mousein");
				this.zoomIn();
			}
			if (event.originalEvent.wheelDelta === -120) {
				console.log("event: mouseout");
				this.zoomOut();
			}
		},

		// For Mozilla
		onMouseWheel2 : function(event) {
			console.log("event: onmousewheel");
			console.log(event);
			if (event.originalEvent.detail < 0) {
				console.log("event: mousein");
				this.zoomIn();
			}
			if (event.originalEvent.detail > 0) {
				console.log("event: mouseout");
				this.zoomOut();
			}
		},

		zoomOut : function() {
			//Change to navigation edit mode
			app.views.navigation_mode.enterMode();
			// Decrease a little the transition time, for freely moving on the map
			document.getElementById("impress").style.transition = "all 300ms ease-in-out 50ms";
			document.getElementById("impress").style[app.css_transition] = "all 300ms ease-in-out 50ms";
			var currentZoom = app.getTransformValue(document.getElementById("impress"), "scale");

			var newZoom = currentZoom - 0.02;
			if (newZoom >= 0) {
				document.getElementById("impress").style[app.css_transform] = "scale(" + newZoom + ")";
			}
		},

		zoomIn : function() {
			// Decrease a little the transition time, for freely moving on the map
			document.getElementById("impress").style.transition = "all 300ms ease-in-out 50ms";
			document.getElementById("impress").style[app.css_transition] = "all 300ms ease-in-out 50ms";
			var currentZoom = app.getTransformValue(document.getElementById("impress"), "scale");
			var newZoom = currentZoom + 0.02;
			document.getElementById("impress").style[app.css_transform] = "scale(" + newZoom + ")";
		},
	});
});
