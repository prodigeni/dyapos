define([], function() {
	return Backbone.View.extend({
		el : document.body,

		enterMode : function() {
			views.new_component_box.$el.hide();
			$(".toolbox").hide();
			$(".component-options").hide();

			$("body").addClass("non-selectable-text");
			$(".step").addClass("hoverable");
			$(".component").removeClass("hoverable");

			if ($(".component").draggable("option", "disabled") === false) {
				$(".component").draggable("disable");
			}

			document.getElementById(selected_slide).classList.add("selected-slide");

			// Center rotation
			$map = document.getElementById("impress").children[0];
			var map_style = $map.style[css_transform];
			map_style = map_style.replace(/rotateZ\(.+?\)/g, "rotateZ(0deg)");
			map_style = map_style.replace(/rotateX\(.+?\)/g, "rotateX(0deg)");
			map_style = map_style.replace(/rotateY\(.+?\)/g, "rotateY(0deg)");
			$map.style[css_transform] = map_style;

			// Zoomout to 0.6
			document.getElementById("impress").style.transition = "all 300ms ease-in-out 50ms";
			document.getElementById("impress").style[css_transition] = "all 300ms ease-in-out 50ms";
			document.getElementById("impress").style[css_transform] = "scale(0.4)";

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
			selected_slide = event.target.id;
			$("#" + selected_slide).addClass("selected");
			$(".step").removeClass("active");
			$("#" + selected_slide).addClass("active");
			views.slide_options_box.show();
		},

		onMousedownSlide : function(event) {
			event.stopPropagation();
			if (event.target.classList[0] == "step") {
				$(".step").removeClass("selected");
				clicked_slide = event.target;
				clicked_slide.classList.add("selected");
				console.log("mousedown on slide");
				last_x = event.clientX;
				last_y = event.clientY;
				transform_style = event.target.style[css_transform];
				slide_trans3d = event.target.style[css_transform].split("translate3d");
				slide_trans3d = slide_trans3d[slide_trans3d.length - 1];
				slide_trans3d = translate3DToArray(slide_trans3d);

				$(document).on("mousemove", this.onMoveSlide);
				$(document).on("mouseup", this.onMouseupSlide);
			}
		},

		onMoveSlide : function(event) {
			event.stopPropagation();
			var movement = 7;

			//get the difference from last position to this position
			var deltaX = last_x - event.clientX;
			var deltaY = last_y - event.clientY;

			//check which direction had the highest amplitude and then figure out direction by checking if the value is greater or less than zero

			if (deltaX > 0) {
				// If the movement is to left
				slide_trans3d[0] = parseInt(slide_trans3d[0], 10) - movement;
			} else if (deltaX < 0) {
				// If the movement is to right
				slide_trans3d[0] = parseInt(slide_trans3d[0], 10) + movement;
			}

			if (deltaY > 0) {
				// If the movement is to up
				slide_trans3d[1] = parseInt(slide_trans3d[1], 10) - movement;
			} else if (deltaY < 0) {
				// If the movement is to down
				slide_trans3d[1] = parseInt(slide_trans3d[1], 10) + movement;
			}

			last_x = event.clientX;
			last_y = event.clientY;

			// apply movement to CSS style
			transform_style = transform_style.replace(/translate3d\(.+?\)/g, "translate3d(" + slide_trans3d[0] + "px," + slide_trans3d[1] + "px,0px)");
			clicked_slide.style[css_transform] = transform_style;
		},

		onMouseupSlide : function(event) {
			event.stopPropagation();
			console.log("mouseup slide");
			clicked_slide.dataset.x = slide_trans3d[0];
			clicked_slide.dataset.y = slide_trans3d[1];

			slides.get(clicked_slide.id).set({
				"pos_x" : clicked_slide.dataset.x,
				"pos_y" : clicked_slide.dataset.y
			});
			
			impress().initStep(clicked_slide);

			$(document).off("mousemove", this.onMoveSlide);
			$(document).off("mouseup", this.onMouseupSlide);						
		},

		onMousedownMap : function(event) {
			event.stopPropagation();
			if (event.target.isEqualNode(document.body)) {
				console.log("mousedown on map");

				last_x = event.clientX;
				last_y = event.clientY;
				$map = document.getElementById("impress").children[0];
				transform_style = $map.style[css_transform];
				map_trans3d = $map.style[css_transform].split("translate3d");
				map_trans3d = map_trans3d[map_trans3d.length - 1];
				map_trans3d = translate3DToArray(map_trans3d);

				// Remove transition animation for freely move on the map
				// (transition will be set again when call impress().goto())
				$map.style.transition = null;
				$map.style[css_transition] = null;

				$(document).on("mousemove", this.onMoveMap);
				$(document).on("mouseup", this.onMouseupMap);
			}
		},

		onMoveMap : function(event) {
			event.stopPropagation();
			var movement = 7;

			//get the difference from last position to this position
			var deltaX = last_x - event.clientX;
			var deltaY = last_y - event.clientY;

			//check which direction had the highest amplitude and then figure out direction by checking if the value is greater or less than zero

			if (deltaX > 0) {
				// If the movement is to left
				console.log("left");
				map_trans3d[0] = parseInt(map_trans3d[0], 10) - movement;
			} else if (deltaX < 0) {
				// If the movement is to right
				console.log("right");
				map_trans3d[0] = parseInt(map_trans3d[0], 10) + movement;
			}

			if (deltaY > 0) {
				// If the movement is to up
				console.log("up");
				map_trans3d[1] = parseInt(map_trans3d[1], 10) - movement;
			} else if (deltaY < 0) {
				// If the movement is to down
				console.log("down");
				map_trans3d[1] = parseInt(map_trans3d[1], 10) + movement;
			}

			last_x = event.clientX;
			last_y = event.clientY;

			// apply move to CSS style
			transform_style = transform_style.replace(/translate3d\(.+?\)/g, "translate3d(" + map_trans3d[0] + "px," + map_trans3d[1] + "px,0px)");
			$map.style[css_transform] = transform_style;
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

			if (slide_edit_mode === true) {
				//Change to navigation edit mode
				views.navigation_mode.enterMode();
			}
			// Decrease a little the transition time, for freely moving on the map
			document.getElementById("impress").style.transition = "all 300ms ease-in-out 50ms";
			document.getElementById("impress").style[css_transition] = "all 300ms ease-in-out 50ms";
			var currentZoom = getTransformValue(document.getElementById("impress"), "scale");

			var newZoom = currentZoom - 0.02;
			if (newZoom >= 0) {
				document.getElementById("impress").style[css_transform] = "scale(" + newZoom + ")";
			}
		},

		zoomIn : function() {
			// Decrease a little the transition time, for freely moving on the map
			document.getElementById("impress").style.transition = "all 300ms ease-in-out 50ms";
			document.getElementById("impress").style[css_transition] = "all 300ms ease-in-out 50ms";
			var currentZoom = getTransformValue(document.getElementById("impress"), "scale");
			var newZoom = currentZoom + 0.02;
			document.getElementById("impress").style[css_transform] = "scale(" + newZoom + ")";
		},
	});
});
