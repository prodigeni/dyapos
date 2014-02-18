define(["Slide", "Mode"], function(Slide, Mode) {
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
			Slide.insert(null);
		},
		
		goToNavigationEditMode : function() {
			Mode.goToNavigationEditMode();
		},
		
		previewPresentation : function() {
			Mode.goToPreviewMode();
		},
		
		exitFromPreviewMode : function() {
			Mode.exitFromPreviewMode();
		},
	});
});
