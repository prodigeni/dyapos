define([], function() {
	return Backbone.View.extend({
		tagName : "div",
		
		className : "video component-preview",
		
		template : document.getElementById("template-video-component").innerHTML,
		
		render : function() {
			this.template = Mustache.render(this.template, this.model.toJSON());
			this.$el.html(this.template);
			return this;
		},
	});
});
