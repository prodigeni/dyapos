define([], function() {
	return Backbone.View.extend({

		el : document.getElementById("toolbox-text"),

		events : {
			"click #btn-increase-font" : "increaseFont",
			"click #btn-decrease-font" : "decreaseFont",
			"click #bold-btn" : "toggleBold",
			"click #underlined-btn" : "toggleUnderlined",
			"click #italic-btn" : "toggleItalic",
			"click #link-btn" : "openLinkDialog",
			"click #color-btn" : "openColorPicker",
		},

		show : function() {
			$(".toolbox").hide();
			this.$el.show();
		},

		increaseFont : function() {
			console.log("increaseFont");
			var size = parseFloat(app.selected_component.get("font_size"));
			size = size + 0.2;
			app.selected_component.set("font_size", size);
		},

		decreaseFont : function() {
			console.log("decreaseFont");
			var size = parseFloat(app.selected_component.get("font_size"));
			size = size - 0.2;
			app.selected_component.set("font_size", size);
		},

		toggleBold : function() {
			console.log("toggleBold");
			if (app.selected_component.get("bold") === true) {
				app.selected_component.set("bold", false);
			} else {
				app.selected_component.set("bold", true);
			}
		},

		toggleUnderlined : function() {
			console.log("toggleUnderlined");
			if (app.selected_component.get("underlined") === true) {
				app.selected_component.set("underlined", false);
			} else {
				app.selected_component.set("underlined", true);
			}
		},

		toggleItalic : function() {
			console.log("toggleItalic");
			if (app.selected_component.get("italic") === true) {
				app.selected_component.set("italic", false);
			} else {
				app.selected_component.set("italic", true);
			}
		},

		openLinkDialog : function() {
			console.log("addLink");
			$("#add-link-box").foundation("reveal","open");
		},

		openColorPicker : function() {
			console.log("openColorPicker");
			app.views.colorpicker.toggle();
		},
	});
});
