define([], function() {
	return Backbone.View.extend({
		tagName : "div",
		
		className : "image component-preview",
		
		template : document.getElementById("template-image-component").innerHTML,
		
		attributes : function() {
			var style = "";

			for (var attr_name in this.model.attributes) {
				var value = this.model.attributes[attr_name];

				switch(attr_name) {
					case "size":
						style += "width:" + value + "%;";
						break;
				}
			}
			
			return {
				"style" : style,
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
			var url = null;
			// if an image file is already set
			if (this.model.get("file") !== null) {
				url = media_url + "images/" + this.model.get("file");
			} else {
				url = this.model.get("external_url");
			}		
			
			var template = Mustache.render(this.template, { "url": url });
						
			this.$el.html(template);
			return this;
		},
				
	});
});