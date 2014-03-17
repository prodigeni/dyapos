/**
 * @module Component
 * @class ComponentView
 * @extends Backbone.View
 */

define(["Component/Text/TextView",
		"Component/Image/ImageView",
		"Component/Text/TextView"], function(TextCompView, ImageCompView, VideoCompView) {
	"use strict";
	return Backbone.View.extend({
		tagName : "div",

		className : "component hoverable",

		events : {
			"click" : "clickComponent",
			"dragstop" : "dragStopComponent",
			"click .btn-delete-component" : "deleteComponent"
		},

		template : document.getElementById("template-component").innerHTML,

		attributes : function() {
			return {
				id : this.model.cid,
				style : "top: " + this.model.get("pos_y") + "px;" + "left: " + this.model.get("pos_x") + "px;"
			};
		},

		initialize : function() {
			// When the component es destroyed
			this.model.on("destroy", this.remove, this);

			this.$el.draggable({
				handle : ".btn-move-component"
			});

			// Hack: Add a reverse view relationship to the model, so that way you can access to the view object from the model
			this.model.view = this;
		},

		render : function() {
			var comp_view;

			this.$el.append(this.template);

			switch(this.model.get("type")) {
				case "text" :
					comp_view = new TextCompView({
						model : this.model
					});
					break;
				case "image" :
					comp_view = new ImageCompView({
						model : this.model
					});
					break;
				case "video" :
					comp_view = new VideoCompView({
						model : this.model
					});
					break;
			}
			this.$el.append(comp_view.render().el);

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
		}
	});
});
