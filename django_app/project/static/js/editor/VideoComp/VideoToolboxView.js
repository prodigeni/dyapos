define([], function() {
	return Backbone.View.extend({

		el : document.getElementById("toolbox-image"),

		events : {
			"click #btn-increase-image-size" : "increaseSize",
			"click #btn-decrease-image-size" : "decreaseSize",
		},

		show : function() {
			$(".toolbox").hide();
			this.$el.show();
		},

		increaseSize : function() {
			console.log("increase image");
			selected_component.set("size", parseInt(selected_component.get("size"), 10) + 2);
		},

		decreaseSize : function() {
			console.log("decrease image");
			selected_component.set("size", parseInt(selected_component.get("size"), 10) - 2);
		},
	});
});
