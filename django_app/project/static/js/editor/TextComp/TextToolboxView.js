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
			var size = parseFloat(selected_component.get("font_size"));
			size = size + 0.2;
			selected_component.set("font_size", size);
		},

		decreaseFont : function() {
			console.log("decreaseFont");
			var size = parseFloat(selected_component.get("font_size"));
			size = size - 0.2;
			selected_component.set("font_size", size);
		},

		toggleBold : function() {
			console.log("toggleBold");
			if (selected_component.get("bold") === true) {
				selected_component.set("bold", false);
			} else {
				selected_component.set("bold", true);
			}
		},

		toggleUnderlined : function() {
			console.log("toggleUnderlined");
			if (selected_component.get("underlined") === true) {
				selected_component.set("underlined", false);
			} else {
				selected_component.set("underlined", true);
			}
		},

		toggleItalic : function() {
			console.log("toggleItalic");
			if (selected_component.get("italic") === true) {
				selected_component.set("italic", false);
			} else {
				selected_component.set("italic", true);
			}
		},

		openLinkDialog : function() {
			console.log("addLink");
			$("#add-link-box").foundation("reveal","open");
		},

		openColorPicker : function() {
			console.log("openColorPicker");
			colorpicker_view.toggle();
		},
	});
});
