/**
 * @module Slide
 */

/**
 * Map view where the slides are shown
 * @class SlidesMapView
 * @extends Backbone.View
 */

define(["Slide/SlideModel",
		"Slide/SlideView"], function(SlideModel, SlideView) {
	"use strict";
	return Backbone.View.extend({
		/**
		 * Element: #slides
		 * @property el
		 * @type DOM Object
		 */
		el : document.getElementById("slides"),

		/**
		 * Runs when the class is instantiated
		 * @method initialize
		 */
		initialize : function() {
			// When a new slide is added to the collection, calls appendSlide()
			this.collection.on("add", function() {
				console.log("called from SlidesMapView");
				this.appendSlide(this.collection.last());
			}, this);

			this.collection.on("reset", function() {
				console.log("called from SlidesMapView");
				this.render();
			}, this);
		},

		/**
		 * Renders the view
		 * @method render
		 */
		render : function() {
			for (var i = 0; i < this.collection.length; i = i + 1) {
				// Append every slide found on the collection to the view
				this.appendSlide(this.collection.at(i));
			}
			return this;
		},

		/**
		 * Appends a new slide to the view
		 * @method appendSlide
		 * @param {Object} slide_model Model of the slide to render
		 */
		appendSlide : function(slide_model) {
			var slide = new SlideView({
				model : slide_model
			});
			this.$el.append(slide.render().$el);

			// Init the new slide to Impress.js
			impress().initStep(document.getElementById(slide.model.cid));
		}
	});
});
