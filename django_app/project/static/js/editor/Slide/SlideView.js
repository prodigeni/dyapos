define(["ComponentView"], function(ComponentView) {"use strict";
	return Backbone.View.extend({
		tagName : "div",

		className : "step",

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
			"click" : "clickInsideSlide"
		},

		initialize : function() {
			// When the slide is destroyed
			this.model.on("destroy", this.remove, this);

			// When a new component is added to the slide
			this.model.get("components").on("add", function() {
				this.appendComponent(this.model.get("components").last());
			}, this);
		},

		render : function() {
			var components = this.model.get("components");
			for (var i = 0; i < components.length; i = i + 1) {
				this.appendComponent(components.at(i));
			}
			return this;
		},

		appendComponent : function(component_model) {
			var component = new ComponentView({
				model : component_model
			});
			this.$el.append(component.render().$el);
		},

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

			app.views.new_component_box.$el.show();
		}
	});
});