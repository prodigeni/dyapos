define(["SlideView"], function(SlideView) {
	return Backbone.View.extend({
		el : document.getElementById("slides"),

		events : {
		},

		initialize : function() {
			this.collection.on("add", function() {
				console.log("called from SlidesMapView");
				this.appendSlide(this.collection.last());
			}, this);
		},

		render : function() {
			for (var i = 0; i < this.collection.length; i++) {
				this.appendSlide(this.collection.at(i));
			}
			return this;
		},

		appendSlide : function(slide_model) {
			var slide = new SlideView({
				model : slide_model
			});
			this.$el.append(slide.render().$el);
			
			impress().initStep(document.getElementById(slide.model.cid));
		},
	
	});
});
