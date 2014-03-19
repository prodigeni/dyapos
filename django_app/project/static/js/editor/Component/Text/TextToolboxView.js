/**
 * @module Component
 * @submodule Text
 */

/**
 * Toolbox for text components
 * @class TextToolboxView
 * @extends Backbone.View
 */

define([], function() {
	"use strict";
	return Backbone.View.extend({
		/**
		 * Element: #toolbox-text
		 * @property el
		 * @type DOM Object
		 */
		el : document.getElementById("toolbox-text"),

		events : {
			/**
			 * Calls increaseFont()
			 * @event click #btn-increase-font
			 */
			"click #btn-increase-font" : "increaseFont",
			/**
			 * Calls decreaseFont()
			 * @event click #btn-decrease-font
			*/
			"click #btn-decrease-font" : "decreaseFont",
			/**
			 * Calls toggleBold()
			 * @event click #bold-btn
			 */
			"click #bold-btn" : "toggleBold",
			/**
			 * Calls toggleUnderlined()
			 * @event click #underlined-btn
			 */
			"click #underlined-btn" : "toggleUnderlined",
			/**
			 * Calls toggleItalic()
			 * @event click #italic-btn
			 */
			"click #italic-btn" : "toggleItalic",
			/**
			 * Calls openLinkDialog()
			 * @event click #link-btn
			 */
			"click #link-btn" : "openLinkDialog",
			/**
			 * Calls openColorPicker()
			 * @event click #color-btn
			 */
			"click #color-btn" : "openColorPicker"
		},

		/**
		 * Shows the view
		 * @method show
		 */
		show : function() {
			$(".toolbox").hide();
			this.$el.show();
		},

		/**
		 * Increases the font size
		 * @method increaseFont
		 */
		increaseFont : function() {
			console.log("increaseFont");
			var size = parseFloat(app.selected_component.get("font_size"));
			size = size + 0.2;
			app.selected_component.set("font_size", size);
		},

		/**
		 * Decreases the font size
		 * @method decreaseFont
		 */
		decreaseFont : function() {
			console.log("decreaseFont");
			var size = parseFloat(app.selected_component.get("font_size"));
			size = size - 0.2;
			app.selected_component.set("font_size", size);
		},

		/**
		 * Toggles the text to bold
		 * @method toggleBold
		 */
		toggleBold : function() {
			console.log("toggleBold");
			if (app.selected_component.get("bold") === true) {
				app.selected_component.set("bold", false);
			} else {
				app.selected_component.set("bold", true);
			}
		},

		/**
		 * Toggles the text to underlined
		 * @method toggleUnderlined
		 */
		toggleUnderlined : function() {
			console.log("toggleUnderlined");
			if (app.selected_component.get("underlined") === true) {
				app.selected_component.set("underlined", false);
			} else {
				app.selected_component.set("underlined", true);
			}
		},

		/**
		 * Toggles the text to italic
		 * @method toggleItalic
		 */
		toggleItalic : function() {
			console.log("toggleItalic");
			if (app.selected_component.get("italic") === true) {
				app.selected_component.set("italic", false);
			} else {
				app.selected_component.set("italic", true);
			}
		},

		/**
		 * Opens a dialog form to set a link for the text component
		 * @method openLinkDialog
		 */
		openLinkDialog : function() {
			console.log("addLink");
			$("#add-link-box").foundation("reveal","open");
		},

		/**
		 * Opens the colorpicker view for changing the text color
		 * @method openColorPicker
		 */
		openColorPicker : function() {
			console.log("openColorPicker");
			app.views.colorpicker.toggle();
		}
	});
});
