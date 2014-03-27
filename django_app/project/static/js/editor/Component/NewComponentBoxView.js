/**
 * @module Component
 */

/**
 * Panel view where you can add a new component
 * @class NewComponentBoxView
 * @extends Backbone.View
 */

define(["Component/Text/TextModel"], function(TextCompModel) {
	"use strict";
	return Backbone.View.extend({
		/**
		 * Element: #new-component-box
		 * @property el
		 * @type DOM Object
		 */
		el : document.getElementById("new-component-box"),

		events : {
			/**
			 * Calls addTitle
			 * @event click #btn-add-title
			 */
			"click #btn-add-title" : "addTitle",
			/**
			 * Calls addSubtitle
			 * @event click #btn-add-subtitle
			 */
			"click #btn-add-subtitle" : "addSubtitle",
			/**
			 * Calls addBody
			 * @event click #btn-add-body
			 */
			"click #btn-add-body" : "addBody",
			/**
			 * Calls addImage
			 * @event click #btn-add-image
			 */
			"click #btn-add-image" : "addImage",
			/**
			 * Calls addVideo
			 * @event click #btn-add-video
			 */
			"click #btn-add-video" : "addVideo"
		},

		/**
		 * Adds a new title
		 * @method addTitle
		 */
		addTitle : function() {
			var component = new TextCompModel({
				"type" : "text",
				"text_type" : "title",
				"font_size" : 3,
				"pos_x" : 200,
				"pos_y" : 50,
				"slide" : app.slides.get(app.selected_slide),
				"content" : app.title_default_text
			});

			if(!app.is_anonymous){
				component.save();
			}
		},

		/**
		 * Adds a new Subtitle
		 * @method addSubtitle
		 */
		addSubtitle : function() {
			var component = new TextCompModel({
				"type" : "text",
				"text_type" : "subtitle",
				"font_size" : 2,
				"pos_x" : 200,
				"pos_y" : 50,
				"slide" : app.slides.get(app.selected_slide),
				"content" : app.subtitle_default_text
			});

			if(!app.is_anonymous){
				component.save();
			}
		},

		/**
		 * Adds a new Body
		 * @method addBody
		 */
		addBody : function() {
			var component = new TextCompModel({
				"type" : "text",
				"text_type" : "body",
				"font_size" : 1,
				"pos_x" : 200,
				"pos_y" : 50,
				"slide" : app.slides.get(app.selected_slide),
				"content" : app.body_default_text
			});

			if(!app.is_anonymous){
				component.save();
			}
		},

		/**
		 * Opens a form for adding a new image
		 * @method addImage
		 */
		addImage : function(){
			console.log(app.slides.at(0).get("components").length);
			$("#add-image-box").foundation("reveal", "open");
		},

		/**
		 * Opens a form for adding a new video
		 * @method addVideo
		 */
		addVideo : function(){
			$("#add-video-box").foundation("reveal", "open");
		}
	});
});
