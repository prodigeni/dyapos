/**
 * @module Mode
 */

/**
 * Navigation mode view for slides. Here you can navigate through slides, apply zooming, edit position, scale and rotate slides.
 * @class EditModeView
 * @extends Backbone.View
 */

define([], function() {
	"use strict";
	return Backbone.View.extend({
		/**
		 * Element: body
		 * @property el
		 * @type DOM Object
		 */
		el : document.body,

		/**
		 * Enters to this mode. Here the events are defined and the user interface is prepared
		 * @method enterMode
		 */
		enterMode : function() {
			var map_style = app.nav.map.style[app.css_transform];

			$("body").addClass("non-selectable-text");
			$(".step").addClass("hoverable");
			$("#" + app.selected_slide).addClass("selected-slide");
			$("#btn-navigation-mode").hide();

			// Center rotation to 0 degrees if rotated
			map_style = map_style.replace(/rotateZ\(.+?\)/g, "rotateZ(0deg)");
			map_style = map_style.replace(/rotateX\(.+?\)/g, "rotateX(0deg)");
			map_style = map_style.replace(/rotateY\(.+?\)/g, "rotateY(0deg)");
			app.nav.map.style[app.css_transform] = map_style;

			// Zoomout to 0.6
			document.getElementById("impress").style.transition = "all 300ms ease-in-out 50ms";
			document.getElementById("impress").style[app.css_transition] = "all 300ms ease-in-out 50ms";
			document.getElementById("impress").style[app.css_transform] = "scale(0.4)";

			this.delegateEvents({
				"click .step" : "onClickSlide",
				"mousedown .step" : "onMousedownSlide",
				"mousedown" : "onMousedownMap",
				"mousewheel" : "onMouseWheel",
				"DOMMouseScroll" : "onMouseWheel2" //For Firefox
			});
		},

		/**
		 * It's the oppossite of enterMode()
		 * @method enterMode
		 */
		exitMode : function() {
			app.views.slide_options_box.$el.hide();

			this.undelegateEvents();
		},

		onClickSlide : function(event) {
			console.log("event: slide click");
			app.selected_slide = event.target.id;
			$("#" + app.selected_slide).addClass("selected");
			$(".step").removeClass("active");
			$("#" + app.selected_slide).addClass("active");
			app.views.slide_options_box.$el.show();
		},

		onMousedownSlide : function(event) {
			event.stopPropagation();
			if (event.target.classList[0] === "step") {
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
			var movement = 7,
				//get the difference from last position to this position
				deltaX = app.nav.last_x - event.clientX,
				deltaY = app.nav.last_y - event.clientY;

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
			var movement = 7,
				//get the difference from last position to this position
				deltaX = app.nav.last_x - event.clientX,
				deltaY = app.nav.last_y - event.clientY;

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
			var currentZoom,
				newZoom;

			//Change to navigation edit mode
			app.views.navigation_mode.enterMode();
			// Decrease a little the transition time, for freely moving on the map
			document.getElementById("impress").style.transition = "all 300ms ease-in-out 50ms";
			document.getElementById("impress").style[app.css_transition] = "all 300ms ease-in-out 50ms";
			currentZoom = app.getTransformValue(document.getElementById("impress"), "scale");

			newZoom = currentZoom - 0.02;
			if (newZoom >= 0) {
				document.getElementById("impress").style[app.css_transform] = "scale(" + newZoom + ")";
			}
		},

		zoomIn : function() {
			var currentZoom,
				newZoom;

			// Decrease a little the transition time, for freely moving on the map
			document.getElementById("impress").style.transition = "all 300ms ease-in-out 50ms";
			document.getElementById("impress").style[app.css_transition] = "all 300ms ease-in-out 50ms";
			currentZoom = app.getTransformValue(document.getElementById("impress"), "scale");
			newZoom = currentZoom + 0.02;
			document.getElementById("impress").style[app.css_transform] = "scale(" + newZoom + ")";
		}
	});
});
