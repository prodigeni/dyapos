define(["Slide", "ComponentView"], function(Slide, ComponentView) {
	return Backbone.View.extend({
		tagName : "div",

		className : "step",

		attributes : function(){
			return {
				'id' : this.model.cid,
				'data-x' : parseInt(this.model.get("pos_x"), 10),
				'data-y' : parseInt(this.model.get("pos_y"), 10),
				'data-scale' : parseFloat(this.model.get("scale")),
				'data-rotate-z' : parseInt(this.model.get("rotation_z"), 10),
				'data-rotate-x' : parseInt(this.model.get("rotation_x"), 10),
				'data-rotate-y' : parseInt(this.model.get("rotation_y"), 10)
			};
		},


		events : {
			"click" : "",
		},

		initialize : function() {
			// When the slide is destroyed
			this.model.on("destroy", this.remove, this);
			
			// When a new component is added to the slide
			this.model.get("components").on("add", function(){
				this.appendComponent(this.model.get("components").last());
			}, this);
		},

		render : function() {
			var components = this.model.get("components");
			for(var i = 0; i < components.length; i++){
				this.appendComponent(components.at(i));
			}
			return this;
		},
		
		appendComponent : function(component_model) {
			component = new ComponentView({ model: component_model });
			this.$el.append(component.render().$el);
		},
	});
});
