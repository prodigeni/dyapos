/**
 * @module Slide
 */

/**
 * View for Slide mini-previews located at slides list.
 * @class SlideMiniView
 * @extends Backbone.View
 */

define([], function() {
	"use strict";
	return Backbone.View.extend({
		/**
		 * Tag name: li
		 * @property tagName
		 * @type String
		 */
		tagName : "li",

		/**
		 * Class name: slide-mini
		 * @property className
		 * @type String
		 */
		className : "slide-mini",

		/**
		 * Template: #template-slide-mini
		 * @property template
		 * @type String
		 */
		template : document.getElementById("template-slide-mini").innerHTML,

		events : {
			/**
			 * Calls goThere()
			 * @event click
			 */
			"click" : "goThere",
			/**
			 * Calls clickDelete
			 * @event click .btn-delete
			 */
			"click .btn-delete" : "clickDelete"
		},

		/**
		 * Runs when the class is instantiated
		 * @method initialize
		 */
		initialize : function() {
			// When the its model is destroyed, remove this view
			this.model.on("destroy", this.remove, this);
		},

		/**
		 * Renders the view
		 * @method render
		 * @return View object
		 */
		render : function() {
			var template = Mustache.render(this.template, this.model.toJSON());
			this.$el.html(template);
			return this;
		},

		/**
		 * Go to the clicked slide-mini to edit
		 * @param {Object} event Click event
		 */
		goThere : function(event) {
			event.stopPropagation();
			console.log("event: click on mini-slide");

			// Set the clicked slide-mini as the currently selected slide
			app.selected_slide = this.model.cid;

			// Exit from navigation mode in case the user is there.
			app.views.navigation_mode.exitMode();
			app.views.edit_mode.enterMode();
		},

		/**
		 * Update the image thumbnail from the slide
		 * @method generateThumbnail
		 */
		generateThumbnail : function() {

		},

		/**
		 * When the user clicks on the delete button
		 * @method clickDelete
		 * @param {Object} event Click event
		 */
		clickDelete : function(event) {
			event.stopPropagation();
			console.log("remove slide");
			app.selected_slide = null;
			app.views.slide_options_box.$el.hide();
			this.model.destroy();
		}
	});
});
