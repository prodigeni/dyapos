define(["Mode", "SlidesListView", "SlidesMapView", "module", "exports"], function(Mode, SlidesListView, SlidesMapView, module, exports) {

	// var goNext = function() {
		// console.log("Go to next");
		// var next = slides.get(selected_slide).get("number") + 1;
		// next = next < slides.length ? slides.where({number:next})[0].cid : slides.where({number:0})[0].cid;
		// selected_slide = next;
		// impress().goto(next);
	// };
// 
	// var goPrevious = function() {
		// console.log("Go to previous");
		// var previous = slides.get(selected_slide).get("number") - 1;
		// previous = previous >= 0 ? slides.where({number:previous})[0].cid : slides.where({number:slides.length-1})[0].cid;
		// selected_slide = previous;
		// impress().goto(previous);
	// };

	// Event functions

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

	// var onKeyup = function(event) {
		// event.stopPropagation();
// 
		// switch( event.keyCode ) {
			// case 33:
			// // pg up
			// case 37:
			// // left
			// case 38:
				// // up
				// goPrevious();
				// break;
			// case 9:
			// // tab
			// case 32:
			// // space
			// case 34:
			// // pg down
			// case 39:
			// // right
			// case 40:
				// // down
				// goNext();
				// break;
			// case 27:
				// //Escape
				// Mode.exitFromPreviewMode();
				// break;
		// }
// 
		// event.preventDefault();
// 
	// };
	
	// exports.goNext = goNext;
	// exports.goPrevious = goPrevious;
	exports.onClick = onClick;
	exports.onMousedown = onMousedown;
	exports.onMove = onMove;
	// exports.onKeyup = onKeyup;

});
