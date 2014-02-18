define(["Slide"], function(Slide) {
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
			this.model.on("destroy", this.remove, this);
		},

		render : function() {
			return this;
		},
	});
});
