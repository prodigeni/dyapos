define([], function() {
	"use strict";
	return Backbone.View.extend({
		el : document.body,

		enterMode : function() {
			$("#btn-navigation-mode").show();
			$(".component").addClass("hoverable");
			$("body").removeClass("non-selectable-text");
			$(".step").removeClass("hoverable borderless selected");
			if ($(".component").draggable("option", "disabled") === true) {
				$(".component").draggable("enable");
			}

			// Delegate events to each SlideView object
			app.slides.each(function(slide){
				slide.view.delegateEvents();

				// Delegate events to each ComponentView object within this slide
				slide.get("components").each(function(component){
					component.view.delegateEvents();
				});
			});

			// Set all divs class="text-content" as editable
			$(".text-content").attr("contenteditable", true);

			impress().goto(app.selected_slide);
		},

		exitMode : function() {
			app.deselectAllComponents();
			app.views.new_component_box.$el.hide();
			if ($(".component").draggable("option", "disabled") === false) {
				$(".component").draggable("disable");
			}

			// Undelegate events to each SlideView object
			app.slides.each(function(slide){
				slide.view.undelegateEvents();

				// Undelegate events to each ComponentView object within this slide
				slide.get("components").each(function(component){
					component.view.undelegateEvents();
				});
			});

			// Set all divs class="text-content" as non-editable
			$(".text-content").attr("contenteditable", false);
		}
	});
});
