define(["SlideView", "SlidesListView"], function(SlideView, SlidesListView) {
	return Backbone.View.extend({
		el : document.getElementById("slides"),

		events : {
		},

		initialize : function() {
			if (!is_anonymous) {
				//Load from server
	
				slides.sync("read", slides, {
					success : function(data) {
						console.log("Data received from server: ");
						console.log(data);
						//If presentation doesn't have any slides (first time opened)
						if (data.length === 0) {
							//Insert first slide

						} else {
							slides = new SlideCollection(JSON.parse(localStorage.slides));
							this.collection = slides;
							this.render();
							
							this.collection.on("add", function() {
								console.log("called from SlidesMapView");
								this.appendSlide(this.collection.last());
							}, this);					
							
							slides_list_view = new SlidesListView({ collection : slides });
							slides_list_view.render();
						}
					}
				});
			} else {
				//Load from local web storage
				if (localStorage.slides === undefined || localStorage.slides === "[]") {
					// If it is the first time the editor is opened, so create a first slide
					
				} else {
					slides = new SlideCollection(JSON.parse(localStorage.slides));
					this.collection = slides;
					this.render();
					
					this.collection.on("add", function() {
						console.log("called from SlidesMapView");
						this.appendSlide(this.collection.last());
					}, this);					
					
					slides_list_view = new SlidesListView({ collection : slides });
					slides_list_view.render();
				}
			}
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