define(["Mode"], function(Mode) {
	return Backbone.View.extend({
		el : document.body,

		onKeyUp : function(event) {
			event.stopPropagation();

			switch( event.keyCode ) {
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
					this.exitFromPreviewMode();
					break;
			}

			event.preventDefault();
		},

		goNext : function() {
			console.log("Go to next");
			var next = slides.get(selected_slide).get("number") + 1;
			next = next < slides.length ? slides.where({number:next})[0].cid : slides.where({number:0})[0].cid;
			selected_slide = next;
			impress().goto(next);
		},

		goPrevious : function() {
			console.log("Go to previous");
			var previous = slides.get(selected_slide).get("number") - 1;
			previous = previous >= 0 ? slides.where({number:previous})[0].cid : slides.where({number:slides.length-1})[0].cid;
			selected_slide = previous;
			impress().goto(previous);
		},

		enterMode : function() {
			console.log("enter preview mode");

			impress().goto(selected_slide);

			new_component_box_view.$el.hide();
			$(".toolbox").hide();
			$(".component").removeClass("selected-component");
			$(".component-options").hide();

			$("body").addClass("non-selectable-text");
			$(".component").removeClass("hoverable");
			$(".step").addClass("borderless");

			if ($(".component").draggable("option", "disabled") === false) {
				$(".component").draggable("disable");
			}

			$("#slides-bar, #right-panel, #btn-add-slide, #btn-navigation-mode").slideToggle();
			$("#btn-exit-preview-mode").show();

			this.delegateEvents({
				"keyup" : "onKeyUp",
			});
		},

		exitMode : function() {
			this.undelegateEvents();

			currentMode = null;
			console.log("exit from preview mode");

			$("#btn-exit-preview-mode").hide();
			$("#slides-bar, #right-panel, #btn-add-slide, #btn-navigation-mode").slideToggle();

			Mode.goToSlideEditMode();
		},
	});
});
