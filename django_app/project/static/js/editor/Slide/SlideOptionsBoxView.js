define([], function() {
	return Backbone.View.extend({
		el : document.getElementById("slide-options"),

		events : {
			"click #btn-edit-presentation" : "editSlide",
			"change #input-scale" : "scaleSlide",
			"mouseup #input-scale" : "saveScaleSlide",
			"change #input-rotation-z" : "rotateSlideZ",
			"mouseup #input-rotation-z" : "saveRotateSlideZ",
			"change #input-rotation-x" : "rotateSlideX",
			"mouseup #input-rotation-x" : "saveRotateSlideX",
			"change #input-rotation-y" : "rotateSlideY",
			"mouseup #input-rotation-y" : "saveRotateSlideY",
			"click #btn-delete-slide" : "deleteSlide",
		},

		editSlide : function() {
			slide_options_box_view.hide();
			impress().goto(selected_slide);
		},

		scaleSlide : function(event) {
			var scale = event.target.value;
			var style = clicked_slide.style[css_transform];
			style = style.replace(/scale\(.+?\)/g, "scale(" + scale + ")");
			clicked_slide.style[css_transform] = style;
			clicked_slide.dataset.scale = scale;
		},

		saveScaleSlide : function() {
			var scale = document.getElementById(selected_slide).dataset.scale;
			console.log(scale);
			var slide = document.getElementById(selected_slide);
			slide.dataset.scale = scale;
			impress().initStep(slide);
			slides.get(selected_slide).set("scale", scale);
		},

		rotateSlideZ : function(event) {
			var degreesZ = event.target.value;
			var slide = clicked_slide;
			var style = slide.style[css_transform];
			style = style.replace(/rotateZ\(.+?\)/g, "rotateZ(" + degreesZ + "deg)");
			slide.style[css_transform] = style;
			slide.dataset.rotateZ = degreesZ;
		},

		saveRotateSlideZ : function() {
			var degrees = parseInt(document.getElementById(selected_slide).dataset.rotateZ, 10);
			var slide = document.getElementById(selected_slide);
			slide.dataset.rotateZ = degrees;
			impress().initStep(slide);
			slides.get(selected_slide).set("rotation_z", degrees);
		},

		rotateSlideX : function(event) {
			var degreesX = event.target.value;
			var slide = clicked_slide;
			var style = slide.style[css_transform];
			style = style.replace(/rotateX\(.+?\)/g, "rotateX(" + degreesX + "deg)");
			slide.style[css_transform] = style;
			slide.dataset.rotateX = degreesX;
		},

		saveRotateSlideX : function() {
			var degrees = parseInt(document.getElementById(selected_slide).dataset.rotateX, 10);
			var slide = document.getElementById(selected_slide);
			slide.dataset.rotateX = degrees;
			impress().initStep(slide);
			slides.get(selected_slide).set("rotation_x", degrees);
		},

		rotateSlideY : function(event) {
			var degreesY = event.target.value;
			var slide = document.getElementById(selected_slide);
			var style = slide.style[css_transform];
			style = style.replace(/rotateY\(.+?\)/g, "rotateY(" + degreesY + "deg)");
			slide.style[css_transform] = style;
			slide.dataset.rotateY = degreesY;
		},

		saveRotateSlideY : function() {
			var degrees = parseInt(document.getElementById(selected_slide).dataset.rotateY, 10);
			var slide = document.getElementById(selected_slide);
			slide.dataset.rotateY = degrees;
			impress().initStep(slide);
			slides.get(selected_slide).set("rotation_y", degrees);
		},

		deleteSlide : function(event) {
			event.stopPropagation();

			//Remove slide-mini
			$("#" + clicked_slide.id).remove();
			$("#slide-" + clicked_slide.id).remove();

			this.hide();
			slides.get(clicked_slide.id).destroy();
		},

		show : function() {
			$slide_options.style.display = "block";
		},

		hide : function() {
			$slide_options.style.display = "none";
		},
	});
});
