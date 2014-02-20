define(["SlideMiniView", "Slide"], function(SlideMiniView, Slide) {
	return Backbone.View.extend({
		el : document.getElementById("slides-list"),

		initialize : function() {
			this.collection.on("add", function() {
				console.log("Called from SlidesListView");
				this.appendSlideMini(this.collection.last());
			}, this);

			$(this.el).sortable({
				distance : 20,
				stop : function(event, ui) {
					Slide.updateSlidesOrder();
				}
			});
		},

		render : function() {
			for (var i = 0; i < this.collection.length; i++) {
				this.appendSlideMini(this.collection.at(i));
			}
			return this;
		},

		appendSlideMini : function(slide_model) {
			var slide_mini = new SlideMiniView({
				model : slide_model
			});
			this.$el.append(slide_mini.render().$el);
		}
	});
});
