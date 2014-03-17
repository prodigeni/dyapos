/**
 * @module Slide
 */

/**
 * View for the slide element
 * @class SlideView
 * @extends Backbone.View
 */

define(["Component/ComponentView"], function(ComponentView) {"use strict";
	return Backbone.View.extend({
		/**
		 * Tag name: div
		 * @property tagName
		 * @type String
		 */
		tagName : "div",

		/**
		 * Class name: step
		 * @property className
		 * @type String
		 */
		className : "step",

		/**
		 * Extra attributes for the view
		 * @property attributes
		 * @type Object
		 */
		attributes : function() {
			return {
				"id" : this.model.cid,
				"data-x" : parseInt(this.model.get("pos_x"), 10),
				"data-y" : parseInt(this.model.get("pos_y"), 10),
				"data-scale" : parseFloat(this.model.get("scale")),
				"data-rotate-z" : parseInt(this.model.get("rotation_z"), 10),
				"data-rotate-x" : parseInt(this.model.get("rotation_x"), 10),
				"data-rotate-y" : parseInt(this.model.get("rotation_y"), 10)
			};
		},

		events : {
			/**
			 * Calls clickInsideSlide()
			 * @event click
			 */
			"click" : "clickInsideSlide"
		},

		/**
		 * Runs when the class is instantiated
		 * @method initialize
		 */
		initialize : function() {
			// When the model is destroyed
			this.model.on("destroy", this.remove, this);

			// When a new component is added to the slide
			this.model.get("components").on("add", function() {
				this.appendComponent(this.model.get("components").last());
			}, this);

			// Hack: Add a reverse view relationship to the model, so that way you can access to the view object from the model
			this.model.view = this;
		},

		/**
		 * Renders the view
		 * @method render
		 */
		render : function() {
			var components = this.model.get("components"),
				i;

			for (i = 0; i < components.length; i = i + 1) {
				// Append every component found on the slide to be visible on the redered view
				this.appendComponent(components.at(i));
			}
			return this;
		},

		/**
		 * Appends a new component to the slide view
		 * @method appendComponent
		 * @params {Object} component_model Model of the component to be rendered
		 */
		appendComponent : function(component_model) {
			var component = new ComponentView({
				model : component_model
			});
			this.$el.append(component.render().$el);
		},

		/**
		 * When the user clicks on the slide
		 * @method clickInsideSlide
		 * @param {Object} event Click event
		 */
		clickInsideSlide : function(event) {
			event.stopPropagation();
			console.log("event: click inside slide");
			// var offSet = $(this).offset();

			// Set a global variable to store the inside point where the slide was clicked
			// clicked_inside_slide_point = {
			// "left" : parseFloat(event.clientX - $(this).offset().left),
			// "top" : parseFloat(event.clientY - $(this).offset().top),
			// };
			// console.log("Clicked on point: " + clicked_inside_slide_point.left + " " + clicked_inside_slide_point.top);

			// if a previous component was selected
			if (app.selected_component !== null) {
				$(".component").removeClass("selected-component");
				$(".component-options").hide();
				app.views.text_toolbox.$el.hide();
				app.selected_component = null;
			}

			// Show the new component box
			app.views.new_component_box.$el.show();
		}
	});
});