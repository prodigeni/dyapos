define([], function() {
	"use strict";
	return Backbone.View.extend({
		tagName : "div",

		template : document.getElementById("template-text-component").innerHTML,

		attributes : function() {
			var style = "";

			for (var attr_name in this.model.attributes) {
				var value = this.model.attributes[attr_name];

				switch(attr_name) {
					case "bold":
						if (value === true) {
							style += "font-weight:bold;";
						}
						break;
					case "italic":
						if (value === true) {
							style += "font-style:italic;";
						}
						break;
					case "underlined":
						if (value === true) {
							style += "text-decoration:underline;";
						}
						break;
					case "color":
						style += "color:" + value + ";";
						break;
					case "font_size":
						style += "font-size:" + value + "em;";
						break;
				}
			}
			
			return {
				"style" : style,
				"class" : "component-preview text " + this.model.get("text_type"),
			};
		},		

		events : {
			"blur .text-content" : "exitTextEditor",
		},
		
		initialize : function() {
			this.model.on("change", function() {
				this.render();
				
				// Updates its tag attributes (css)
				this.$el.attr(this.attributes());
			}, this);
		},

		render : function() {
			var template = Mustache.render(this.template, this.model.toJSON());
			this.$el.html(template);
			return this;
		},
		
		exitTextEditor : function() {
			console.log("Exit text editor");
			if(this.model.get("content") !== this.$el.find(".text-content")[0].innerHTML.trim()){
				console.log("text changed");
				this.model.set("content", this.$el.find(".text-content")[0].innerHTML.trim());
			}
		},
	});
});
