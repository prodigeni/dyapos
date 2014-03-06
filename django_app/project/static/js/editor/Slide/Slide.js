define(["SlidesListView", "SlidesMapView", "module", "exports"], function(SlidesListView, SlidesMapView, module, exports) {

	var onClick = function(event) {
		console.log("event: slide click");
		selected_slide = event.target.id;
		$("#" + selected_slide).addClass("selected");
		$(".step").removeClass("active");
		$("#" + selected_slide).addClass("active");
		slide_options_box_view.show();
	};

	var onMousedown = function(event) {
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

			document.addEventListener("mousemove", onMove);
			document.addEventListener("mouseup", onMouseup);
		}
	};

	var onMove = function(event) {
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
	};

	var onMouseup = function(event) {
		event.stopPropagation();
		console.log("mouseup slide");
		document.removeEventListener("mousemove", onMove);
		document.removeEventListener("mouseup", onMouseup);
		clicked_slide.dataset.x = slide_trans3d[0];
		clicked_slide.dataset.y = slide_trans3d[1];
		impress().initStep(clicked_slide);
	
		var slide = document.getElementById(clicked_slide.cid);
		slide.dataset.x = clicked_slide.dataset.x;
		slide.dataset.y = clicked_slide.dataset.y;
		impress().initStep(document.getElementById(clicked_slide.cid));

		slides.get(cid).set({
			"pos_x" : slide.dataset.x,
			"pos_y" : slide.dataset.y
		});
	};

	exports.onClick = onClick;
	exports.onMousedown = onMousedown;
	exports.onMove = onMove;

});
