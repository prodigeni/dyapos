/**
 * @class EditorView
 * @extends Backbone.View
 */

define(["SlideModel"], function(SlideModel) {"use strict";
	return Backbone.View.extend({
		el : document.body,

		events : {
			"click #btn-add-slide" : "addSlide",
			"click #btn-navigation-mode" : "goToNavigationEditMode",
			"click #btn-preview-presentation" : "previewPresentation",
			"click #btn-exit-preview-mode" : "exitFromPreviewMode"
		},

		addSlide : function() {
			if (app.slides.length === 0) {
				app.slides.add(new SlideModel());
			} else {
				// If it isn't the first slide, calculate coordinates based on the last slide
				app.slides.add(new SlideModel({
					pos_x : parseInt(app.slides.at(app.slides.length - 1).get("pos_x"), 10) + 1000,
					pos_y : parseInt(app.slides.at(app.slides.length - 1).get("pos_y"), 10),
					number : app.slides.length
				}));
			}

			if (!app.is_anonymous) {
				app.slides.last().save();
			}

			app.selected_slide = app.slides.last().cid;
			app.views.edit_mode.exitMode();
			app.views.edit_mode.enterMode();
		},

		goToNavigationEditMode : function() {
			app.views.edit_mode.exitMode();
			app.views.navigation_mode.enterMode();
		},

		previewPresentation : function() {
			app.views.edit_mode.exitMode();
			app.views.navigation_mode.exitMode();
			app.views.preview_mode.enterMode();
		},

		exitFromPreviewMode : function() {
			app.views.preview_mode.exitMode();
		}
	});
});
