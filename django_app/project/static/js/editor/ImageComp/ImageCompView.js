define([], function() {
	return Backbone.View.extend({
		tagName : "div",
		
		className : "image component-preview",
		
		template : document.getElementById("template-image-component").innerHTML,
		
		render : function() {
			this.template = Mustache.render(this.template, this.model.toJSON());
			this.$el.html(this.template);
			return this;
		},
	});
});
