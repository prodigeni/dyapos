define([], function() {
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
			selected_slide = this.model.cid;
			slide_options_box_view.hide();
			impress().goto(selected_slide);
		},
		
		clickDelete : function(event) {
			event.stopPropagation();
			console.log("remove slide");
			selected_slide = null;
			slide_options_box_view.hide();
			this.model.destroy();
		},
	});
});
