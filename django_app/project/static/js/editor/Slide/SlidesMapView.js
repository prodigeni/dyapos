/**
 * @module Slide
 */

/**
 * Map view where the slides are shown
 * @class SlidesMapView
 * @extends Backbone.View
 */

define(["Slide/SlideModel",
		"Slide/SlideView",
		"Slide/SlidesListView"], function(SlideModel, SlideView, SlidesListView) {
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
			if (!app.is_anonymous) {
				//Load the slides from the server
				app.slides.sync("read", app.slides, {
					success : function(data) {
						//When the data has arriven
						console.log("Data received from server: ");
						console.log(data);
						//If presentation doesn't have any slides (first time opened)
						if (data.length === 0) {
							//Insert first slide
							app.slides = new app.SlideCollection();
							app.slides.add(new SlideModel());
						} else {
							app.slides = new app.SlideCollection(JSON.parse(data));
						}
						//Assign the collection of slides to this view's collection
						this.collection = app.slides;
						this.render();

						// When a new slide is added to the collection, calls appendSlide()
						this.collection.on("add", function() {
							console.log("called from SlidesMapView");
							this.appendSlide(this.collection.last());
						}, this);

						// Instantiate the slide list view with the same data as collection
						app.views.slides_list = new SlidesListView({
							collection : app.slides
						});
						// Render the listview
						app.views.slides_list.render();
					}
				});
			} else {
				//Load from local web storage
				if (localStorage.slides === undefined || localStorage.slides === "[]") {
					// If it is the first time the editor is opened, so create a first slide
					app.slides = new app.SlideCollection();
					app.slides.add(new SlideModel());
				} else {
					app.slides = new app.SlideCollection(JSON.parse(localStorage.slides));
				}
				//Assign the collection of slides to this view's collection
				this.collection = app.slides;
				this.render();

				// When a new slide is added to the collection, calls appendSlide()
				this.collection.on("add", function() {
					console.log("called from SlidesMapView");
					this.appendSlide(this.collection.last());
				}, this);

				// Instantiate the slide list view with the same data as collection
				app.views.slides_list = new SlidesListView({
					collection : app.slides
				});
				// Render the listview
				app.views.slides_list.render();
			}
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
