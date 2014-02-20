define(["TextCompView", "ImageCompView", "VideoCompView", "TextToolboxView"], function(TextCompView, ImageCompView, VideoCompView, TextToolboxView) {
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
				style : "top: " + this.model.get("pos_y") + "px;" + "left: " + this.model.get("pos_x") + "px;",
			};
		},

		initialize : function() {
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
					video_comp = new VideoCompView({
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

			new_component_box_view.$el.hide();
			this.$el.find(".component-options").show();
			selected_component = this.model;
			
			switch(this.model.get("type")){
				case "text": text_toolbox_view.show();
							break;
				case "image": image_toolbox_view.show();
							break;
				case "video": video_toolbox_view.show();
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
			selected_component = null;                
			this.model.destroy();
			
			// //Patch, when a component is deleted, its tooltip remains visible
			// $(".tooltip").css("display","none");			
		},
	});
});
