define([], function() {
	return Backbone.View.extend({
		tagName : "div",
		
		className : "video component-preview",
		
		template : document.getElementById("template-video-component").innerHTML,
		
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
				"style" : "position:relative;padding-bottom:56.25%;padding-top:30px;height:0;overflow:hidden;display:block;",
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
			//Get the link from the url_ID
			var url = "www.youtube.com/embed/" + this.model.get("url_id");
			
			var template = Mustache.render(this.template, { "url": url });
						
			this.$el.html(template);
			return this;
		},
				
	});
});