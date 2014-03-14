/**
 * @module Slide
 * @class SlideOptionsBoxView
 * @extends Backbone.View
 */

define([], function() {
	"use strict";
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
			"click #btn-delete-slide" : "deleteSlide"
		},

		editSlide : function() {
			app.views.navigation_mode.exitMode();
			app.views.edit_mode.enterMode();
		},

		scaleSlide : function(event) {
			var scale = event.target.value,
				style = app.clicked_slide.style[app.css_transform];

			style = style.replace(/scale\(.+?\)/g, "scale(" + scale + ")");
			app.clicked_slide.style[app.css_transform] = style;
			app.clicked_slide.dataset.scale = scale;
		},

		saveScaleSlide : function() {
			var scale = document.getElementById(app.selected_slide).dataset.scale,
				slide = document.getElementById(app.selected_slide);

			console.log(scale);
			slide.dataset.scale = scale;
			impress().initStep(slide);
			app.slides.get(app.selected_slide).set("scale", scale);
		},

		rotateSlideZ : function(event) {
			var degreesZ = event.target.value,
				slide = app.clicked_slide,
				style = slide.style[app.css_transform];

			style = style.replace(/rotateZ\(.+?\)/g, "rotateZ(" + degreesZ + "deg)");
			slide.style[app.css_transform] = style;
			slide.dataset.rotateZ = degreesZ;
		},

		saveRotateSlideZ : function() {
			var degrees = parseInt(document.getElementById(app.selected_slide).dataset.rotateZ, 10),
				slide = document.getElementById(app.selected_slide);

			slide.dataset.rotateZ = degrees;
			impress().initStep(slide);
			app.slides.get(app.selected_slide).set("rotation_z", degrees);
		},

		rotateSlideX : function(event) {
			var degreesX = event.target.value,
				slide = app.clicked_slide,
				style = slide.style[app.css_transform];

			style = style.replace(/rotateX\(.+?\)/g, "rotateX(" + degreesX + "deg)");
			slide.style[app.css_transform] = style;
			slide.dataset.rotateX = degreesX;
		},

		saveRotateSlideX : function() {
			var degrees = parseInt(document.getElementById(app.selected_slide).dataset.rotateX, 10),
				slide = document.getElementById(app.selected_slide);

			slide.dataset.rotateX = degrees;
			impress().initStep(slide);
			app.slides.get(app.selected_slide).set("rotation_x", degrees);
		},

		rotateSlideY : function(event) {
			var degreesY = event.target.value,
				slide = document.getElementById(app.selected_slide),
				style = slide.style[app.css_transform];

			style = style.replace(/rotateY\(.+?\)/g, "rotateY(" + degreesY + "deg)");
			slide.style[app.css_transform] = style;
			slide.dataset.rotateY = degreesY;
		},

		saveRotateSlideY : function() {
			var degrees = parseInt(document.getElementById(app.selected_slide).dataset.rotateY, 10),
				slide = document.getElementById(app.selected_slide);

			slide.dataset.rotateY = degrees;
			impress().initStep(slide);
			app.slides.get(app.selected_slide).set("rotation_y", degrees);
		},

		deleteSlide : function(event) {
			event.stopPropagation();

			//Remove slide-mini
			$("#" + app.clicked_slide.id).remove();
			$("#slide-" + app.clicked_slide.id).remove();

			this.hide();
			app.slides.get(app.clicked_slide.id).destroy();
		}
	});
});
