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
		
		cancelColor : function() {
			alert("Cancel color");
		},
		
		applyColor : function() {
			alert("Apply color");
		},
		
	});
});