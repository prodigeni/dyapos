define([], function() {
	return Backbone.View.extend({
		tagName : "div",

		className : "toolbox",

		template : document.getElementById("template-text-toolbox").innerHTML,

		events : {
			"click .btn-increase-font" : "increaseFont",
			"click .btn-decrease-font" : "decreaseFont",
			"click .bold-btn" : "toggleBold",
			"click .underlined-btn" : "toggleUnderlined",
			"click .italic-btn" : "toggleItalic",
			"click .link-btn" : "addLink",
			"click .color-btn" : "openColorPicker",
		},

		render : function() {
			this.$el.append(this.template);
			return this;
		},

		increaseFont : function() {
			console.log("increaseFont");
			console.log(this.model);
		},

		decreaseFont : function() {
			console.log("decreaseFont");
		},

		toggleBold : function() {
			console.log("toggleBold");
		},

		toggleUnderlined : function() {
			console.log("toggleUnderlined");
		},

		toggleItalic : function() {
			console.log("toggleItalic");
		},

		addLink : function() {
			console.log("addLink");
		},

		openColorPicker : function() {
			console.log("openColorPicker");
		},
	});
});
