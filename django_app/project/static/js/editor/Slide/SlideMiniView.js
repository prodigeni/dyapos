define(["Slide"], function(Slide) {
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
			this.template = Mustache.render(this.template, this.model.toJSON());
			this.$el.html(this.template);
			return this;
		},
		
		goThere : function(event) {
			event.stopPropagation();
			console.log("event: click on mini-slide");
			Slide.changeSelected(this.model.cid);			
		},
		
		clickDelete : function() {
			$(".tooltip").css("display", "none");
			Slide.deleteSlide(this.model.cid);
		},
	});
});
