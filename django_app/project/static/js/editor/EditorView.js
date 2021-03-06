/**
 * @module Editor
 * @main
 */

/**
 * Main view that involves the whole page.
 * It contains the main actions such as "add slide" button, "preview" button, etc.
 * @class EditorView
 * @extends Backbone.View
 */

define(["Slide/SlideModel"], function (SlideModel) {
	"use strict";
	return Backbone.View.extend({
		/**
		 * Element: body
		 * @property el
		 * @type DOM Object
		 */
		el: document.body,

		events: {
			/**
			 * Calls addSlide()
			 * @event click #btn-add-slide
			 */
			"click #btn-add-slide": "addSlide",
			/**
			 * Calls goToNavigationEditMode()
			 * @event click #btn-navigation-mode
			 */
			"click #btn-navigation-mode": "goToNavigationEditMode",
			/**
			 * Calls previewPresentation()
			 * @event click #btn-preview-presentation
			 */
			"click #btn-preview-presentation": "previewPresentation",
			/**
			 * Calls toggleColorPicker()
			 * @event click #btn-slide-background-color
			 */
			"click #btn-slide-background-color": "toggleColorPicker",
			/**
			 * Calls changeSlideBackgroundColor()
			 * @event change #btn-slide-background-color
			 */
			"change #btn-slide-background-color": "changeSlideBackgroundColor",
			/**
			 * Calls exitFromPreviewMode()
			 * @event click #btn-exit-preview-mode
			 */
			"click #btn-exit-preview-mode": "exitFromPreviewMode"
		},

		/**
		 * Adds a new slide to the presentation
		 * @method addSlide
		 */
		addSlide: function () {
			if (app.slides.length === 0) {
				// If it is the first slide
				app.slides.add(new SlideModel());
			} else {
				// If it isn't the first slide, calculate coordinates based on the last slide
				app.slides.add(new SlideModel({
					pos_x: parseInt(app.slides.last().get("pos_x"), 10) + 1000,
					pos_y: parseInt(app.slides.last().get("pos_y"), 10),
					number: app.slides.length
				}));
			}

			if (!app.is_anonymous) {
				// If you aren't in anonymous mode, save it to the server
				app.slides.last().save();
			}

			// Set the last saved slide as the currently selected slide
			app.selected_slide = app.slides.last().cid;

			// Go to the new slide
			app.views.edit_mode.exitMode();
			app.views.edit_mode.enterMode();
		},

		/**
		 * Go to the navigation mode where you can manage the slide properties such as position, rotation, size, etc.
		 * In this mode you can also make zooming with the mousewheel.
		 * @method goToNavigationEditMode
		 */
		goToNavigationEditMode: function () {
			app.views.edit_mode.exitMode();
			app.views.navigation_mode.enterMode();
		},

		/**
		 * Toggles the colorpicker for the slide background color
		 * @method toggleColorPicker
		 */
		toggleColorPicker: function () {
			console.log("toggle color picker");
			$("#slide-background-color").toggle().focus();
		},

		/**
		 * Changes the slide background color from the colorpicker
		 * @method changeSlideBackgroundColor
		 */
		changeSlideBackgroundColor: function (event) {
			console.log("Change slide background color");
			var selected_color = event.target.value,
				slide = app.slides.get(app.selected_slide);
			slide.set("background_color", selected_color);
			slide.view.el.dataset.backgroundColor = selected_color;
			document.body.style.backgroundColor = selected_color;
			slide.mini_view.generateThumbnail();
		},

		/**
		 * Go to the presentation preview mode where you can play the the presentation.
		 * In this mode you can you can step between slides with arrow keys and go back to the editor mode with Esc key
		 * @method previewPresentation
		 */
		previewPresentation: function () {
			app.views.edit_mode.exitMode();
			app.views.navigation_mode.exitMode();
			app.views.preview_mode.enterMode();
		},

		/**
		 * Exit from the preview mode and continue editing
		 * @method exitFromPreviewMode
		 */
		exitFromPreviewMode: function () {
			app.views.preview_mode.exitMode();
		}
	});
});