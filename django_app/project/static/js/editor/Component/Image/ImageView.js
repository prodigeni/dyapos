/**
 * @module Component
 * @submodule Image
 */

/**
 * Image view
 * @class ImageView
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
		 * Class name: image component-preview
		 * @property className
		 * @type String
		 */
		className : "image component-preview",

		/**
		 * Template: #template-image-component
		 * @property template
		 * @type String
		 */
		template : document.getElementById("template-image-component").innerHTML,

		/**
		 * Extra attributes for the view
		 * @attribute attributes
		 * @type Object
		 */
		attributes : function() {
			var style = "",
				attr_name,
				value;

			for (attr_name in this.model.attributes) {
				if (this.model.attributes.hasOwnProperty(attr_name)) {
					value = this.model.attributes[attr_name];
					switch(attr_name) {
						case "size":
							style += "width:" + value + "px;";
							break;
					}
				}
			}

			return {
				"style" : style
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
			var url = null,
				template;

			// if an image file is already set
			if (this.model.get("file") !== null) {
				url = app.media_url + "images/" + this.model.get("file");
			} else {
				url = this.model.get("external_url");
			}

			template = Mustache.render(this.template, { "url": url });

			this.$el.html(template);
			return this;
		},

		// showResizable : function(){
			// this.$el.resizable();
		// }
	});
});