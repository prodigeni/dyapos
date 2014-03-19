/**
 * @module Component
 * @submodule Video
 */

/**
 * Video view
 * @class VideoView
 * @extends Backbone.View
 */

define([], function() {
	"use strict";
	return Backbone.View.extend({
		/**
		 * Tag name: div
		 * @property tagName
		 * @type String
		 */
		tagName : "div",

		/**
		 * Class name: video component-preview
		 * @property className
		 * @type String
		 */
		className : "video component-preview",

		/**
		 * Template: #template-video-component
		 * @property template
		 * @type String
		 */
		template : document.getElementById("template-video-component").innerHTML,

		/**
		 * Extra attributes for the view
		 * @attribute attributes
		 * @type Object
		 */
		attributes : function() {
			// var style = "";
//
			// for (var attr_name in this.model.attributes) {
				// var value = this.model.attributes[attr_name];
//
				// switch(attr_name) {
					// case "size":
						// style += "width:" + value + "%;";
						// break;
				// }
			// }

			return {
				"style" : "position:relative;padding-bottom:56.25%;padding-top:30px;height:0;overflow:hidden;display:block;"
			};
		},

		/**
		 * Runs when the class is instantiated
		 * @method initialize
		 */
		initialize : function() {
			this.model.on("change", function() {
				this.render();

				// Updates its tag attributes (css)
				this.$el.attr(this.attributes());
			}, this);
		},

		/**
		 * Renders the view
		 * @method render
		 * @return View object
		 */
		render : function() {
			//Get the link from the url_ID
			var url = "www.youtube.com/embed/" + this.model.get("url_id"),
				template = Mustache.render(this.template, { "url": url });

			this.$el.html(template);
			return this;
		}

	});
});