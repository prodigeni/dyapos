/**
 * @module Mode
 */

/**
 * Preview presentation mode view. Here you can see the presentation in execution
 * @class PreviewModeView
 * @extends Backbone.View
 */

define([], function() {
	"use strict";
	return Backbone.View.extend({
		/**
		 * Element: body
		 * @property el
		 * @type DOM Object
		 */
		el : document.body,

		/**
		 * When the user hits a key
		 * @method onKeyUp
		 * @param {Object} event Keyup event
		 */
		onKeyUp : function(event) {
			event.stopPropagation();

			switch(event.keyCode) {
				case 33:
				// pg up
				case 37:
				// left
				case 38:
					// up
					this.goPrevious();
					break;
				case 9:
				// tab
				case 32:
				// space
				case 34:
				// pg down
				case 39:
				// right
				case 40:
					// down
					this.goNext();
					break;
				case 27:
					//Escape
					this.exitMode();
					break;
			}

			event.preventDefault();
		},

		/**
		 * Move to the next slide, if you're on the last one, it will move to the first one
		 * @method goNext
		 */
		goNext : function() {
			console.log("Go to next");
			var next = app.slides.get(app.selected_slide).get("number") + 1;
			next = next < app.slides.length ? app.slides.where({number:next})[0].cid : app.slides.where({number:0})[0].cid;
			app.selected_slide = next;
			impress().goto(next);
		},

		/**
		 * Move to the preview slide, if you're on the first one, it will move to the last one
		 * @method goPrevious
		 */
		goPrevious : function() {
			console.log("Go to previous");
			var previous = app.slides.get(app.selected_slide).get("number") - 1;
			previous = previous >= 0 ? app.slides.where({number:previous})[0].cid : app.slides.where({number: app.slides.length-1})[0].cid;
			app.selected_slide = previous;
			impress().goto(previous);
		},

		/**
		 * Enters to this mode. Here the events are defined and the user interface is prepared
		 * @method enterMode
		 */
		enterMode : function() {
			console.log("enter preview mode");
			$("body").addClass("non-selectable-text");
			$(".step").addClass("borderless");
			$("#slides-bar, #right-panel").slideToggle();
			$("#btn-add-slide, #btn-navigation-mode, #btn-slide-background-color, #btn-slide-notes").hide();
			$("#btn-exit-preview-mode").show();
			impress().goto(app.selected_slide);
			this.delegateEvents({
				"keyup" : "onKeyUp"
			});
		},

		/**
		 * It's the oppossite of enterMode()
		 * @method enterMode
		 */
		exitMode : function() {
			console.log("exit from preview mode");
			$("#btn-exit-preview-mode").hide();
			$("#slides-bar, #right-panel, #btn-add-slide").slideToggle();
			this.undelegateEvents();
			app.views.edit_mode.enterMode();
		}
	});
});
