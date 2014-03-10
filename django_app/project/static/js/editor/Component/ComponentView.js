define(["TextCompView", "ImageCompView", "VideoCompView"], function(TextCompView, ImageCompView, VideoCompView) {
	"use strict";
	return Backbone.View.extend({
		tagName : "div",

		className : "component hoverable",

		events : {
			"click" : "clickComponent",
			"dragstop" : "dragStopComponent",
			"click .btn-delete-component" : "deleteComponent",
		},

		template : document.getElementById("template-component").innerHTML,

		attributes : function() {
			return {
				id : this.model.cid,
				style : "top: " + this.model.get("pos_y") + "px;" + "left: " + this.model.get("pos_x") + "px;",
			};
		},

		initialize : function() {
			// When the component es destroyed
			this.model.on("destroy", this.remove, this);
			
			this.$el.draggable({
				handle : ".btn-move-component",
			});
		},

		render : function() {			
			this.$el.append(this.template);
			
			switch(this.model.get("type")) {
				case "text" :
					var text_comp = new TextCompView({
						model : this.model
					});
					this.$el.append(text_comp.render().el);
					break;
				case "image" :
					var image_comp = new ImageCompView({
						model : this.model
					});
					this.$el.append(image_comp.render().el);
					break;
				case "video" :
					var video_comp = new VideoCompView({
						model : this.model
					});
					this.$el.append(video_comp.render().el);
					break;
			}
	
			return this;
		},
		
		clickComponent : function(event) {
			event.stopPropagation();			
			console.log("click component");

			app.views.new_component_box.$el.hide();
			this.$el.find(".component-options").show();
			app.selected_component = this.model;
			this.$el.addClass("selected-component");
			
			switch(this.model.get("type")){
				case "text": app.views.text_toolbox.show();
							break;
				case "image": app.views.image_toolbox.show();
							break;
				case "video": app.views.video_toolbox.show();
							break;
			}
		},
		
		dragStopComponent : function(event, ui) {
			console.log("Change position");
			
			this.model.set({
				"pos_x" : ui.position.left,
				"pos_y" : ui.position.top
			});
		},
		
		deleteComponent : function(event) {
			event.stopPropagation();
			console.log("remove component");
			app.selected_component = null;                
			this.model.destroy();	
		},
	});
});
