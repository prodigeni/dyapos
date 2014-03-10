define([], function() {
	"use strict";
	return Backbone.View.extend({
		tagName : "li",
		
		className : "slide-mini",
		
		template : document.getElementById("template-slide-mini").innerHTML,
		
		events : {
			"click" : "goThere",
			"click .btn-delete" : "clickDelete",
		},
		
		initialize : function() {
			this.model.on("destroy", this.remove, this);
		},
		
		render : function() {
			var template = Mustache.render(this.template, this.model.toJSON());
			this.$el.html(template);
			return this;
		},
		
		goThere : function(event) {
			event.stopPropagation();
			console.log("event: click on mini-slide");
			app.selected_slide = this.model.cid;
			app.views.slide_options_box.$el.hide();
			impress().goto(app.selected_slide);
		},
		
		generateThumbnail : function() {
			
		},
		
		clickDelete : function(event) {
			event.stopPropagation();
			console.log("remove slide");
			app.selected_slide = null;
			app.views.slide_options_box.hide();
			this.model.destroy();
		},
	});
});
