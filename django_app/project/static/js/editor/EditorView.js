define(["Slide", "SlideModel"], function(Slide, SlideModel) {
	return Backbone.View.extend({
		el : document.body,
		
		events : {
			"click #btn-add-slide" : "addSlide",
			"click #btn-navigation-mode" : "goToNavigationEditMode",
			"click #btn-preview-presentation" : "previewPresentation",
			"click #btn-exit-preview-mode" : "exitFromPreviewMode",			
		},
		
		addSlide : function(event) {
			event.stopPropagation();
			
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
			slide_options_box_view.hide();
			impress().goto(selected_slide);
		},
		
		goToNavigationEditMode : function() {
			navigation_mode_view.enterMode();
		},
		
		previewPresentation : function() {
			preview_mode_view.enterMode();
		},
		
		exitFromPreviewMode : function() {
			preview_mode_view.exitMode();
		},
	});
});
