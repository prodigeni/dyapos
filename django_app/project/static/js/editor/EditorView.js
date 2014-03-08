define(["SlideModel"], function(SlideModel) {
	return Backbone.View.extend({
		el : document.body,
		
		events : {
			"click #btn-add-slide" : "addSlide",
			"click #btn-navigation-mode" : "goToNavigationEditMode",
			"click #btn-preview-presentation" : "previewPresentation",
			"click #btn-exit-preview-mode" : "exitFromPreviewMode",			
		},
		
		addSlide : function() {			
			if (slides.length === 0) {
				slides.add(new SlideModel());
			} else {
				// If it isn't the first slide, calculate coordinates based on the last slide
				slides.add(new SlideModel({
					pos_x : parseInt(slides.at(slides.length - 1).get("pos_x"), 10) + 1000,
					pos_y : parseInt(slides.at(slides.length - 1).get("pos_y"), 10),
					number : slides.length
				}));
			}
			
			position = slides.length - 1;
			cid = slides.at(position).cid;
	
			if (!is_anonymous) {
				slides.last().save();
			}
	
			selected_slide = slides.last().cid;
			views.slide_options_box.hide();
			impress().goto(selected_slide);
		},
		
		goToNavigationEditMode : function() {
			views.navigation_mode.enterMode();
		},
		
		previewPresentation : function() {
			views.preview_mode.enterMode();
		},
		
		exitFromPreviewMode : function() {
			views.preview_mode.exitMode();
		},
	});
});
