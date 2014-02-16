define([], function() {
	return Backbone.View.extend({
		el : document.getElementById("colorpicker"),

		initialize : function() {
			ColorPicker.fixIndicators(document.getElementById('slider-indicator'), document.getElementById('picker-indicator'));

			ColorPicker(document.getElementById('slider'), document.getElementById('picker'), function(hex, hsv, rgb, pickerCoordinate, sliderCoordinate) {
				selected_color = hex;
				ColorPicker.positionIndicators(document.getElementById('slider-indicator'), document.getElementById('picker-indicator'), sliderCoordinate, pickerCoordinate);
				document.getElementById(selected_component).getElementsByClassName("component-preview")[0].style.color = hex;
			});
		},

		events : {
			"click #btn-color-cancel" : "cancelColor",
			"click #btn-color-ok" : "applyColor"
		},

		cancelColor : function(event) {
			event.stopPropagation();
			console.log("cancel color");

			document.getElementById(selected_component).getElementsByClassName("component-preview")[0].style.color = previous_color;
			previous_color = selected_color = null;
			this.toggle();
		},

		applyColor : function(event) {
			event.stopPropagation();
			console.log("Change color");

			var text = document.getElementById(selected_component).getElementsByClassName("component-preview")[0];
			text.style.color = selected_color;

			slides.getComponent(selected_component).set({
				"color" : selected_color
			});
			previous_color = selected_color = null;
			this.toggle();
		},

		toggle : function() {
			var colorpicker = document.getElementById("colorpicker");
			status = colorpicker.style.display;
			if (status == "none") {
				colorpicker.style.display = "block";
				previous_color = document.getElementById(selected_component).getElementsByClassName("component-preview")[0].style.color;
			} else {
				colorpicker.style.display = "none";
			}
		},
	});
});
