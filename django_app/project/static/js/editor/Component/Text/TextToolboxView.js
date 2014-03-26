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
			"click #color-btn" : "toggleColorPicker",
            /**
             * Calls changeColor()
             * @event change #text-color
             */
            "change #text-color" : "changeColor"
		},

		/**
		 * Shows the view
		 * @method show
		 */
		show : function() {
			$(".toolbox").hide();
            this.$el.find("#text-color").hide();
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
		 * @method toggleColorPicker
		 */
		toggleColorPicker : function() {
			console.log("toggleColorPicker");
            this.$el.find("#text-color").toggle().focus();
		},
        
        changeColor : function(event) {
            console.log("color changed");
            // Hide the color input
            /*this.$el.find("#text-color").hide();*/
/*            // Delete the colorpicker frame. It doesn't have an Id or Class, so I have to reference it on the lastChild of body, because it's created there.
            document.body.lastChild.remove();*/
            
            app.selected_component.set("color", event.target.value);
        }
	});
});
