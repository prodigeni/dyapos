define([], function() {
	"use strict";
	return Backbone.View.extend({
		tagName : "div",

		className : "image component-preview",

		template : document.getElementById("template-image-component").innerHTML,

		attributes : function() {
			var style = "",
				attr_name,
				value;

			for (attr_name in this.model.attributes) {
				if (this.model.attributes.hasOwnProperty(attr_name)) {
					value = this.model.attributes[attr_name];

					switch(attr_name) {
						case "size":
							style += "width:" + value + "%;";
							break;
					}
				}
			}

			return {
				"style" : style
			};
		},

		initialize : function() {
			this.model.on("change", function() {
				this.render();

				// Updates its tag attributes (css)
				this.$el.attr(this.attributes());
			}, this);
		},

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
		}
	});
});