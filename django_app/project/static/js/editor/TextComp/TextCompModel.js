define(["ComponentModel"], function(ComponentModel) {

	var model = ComponentModel.extend({
		defaults : {
			type : "text",
			text_type : null,
			content : null,
			font_size : null,
			color : null,
			bold : false,
			italic : false,
			underlined : false,
		},
	});
	_.extend(model.prototype.defaults, ComponentModel.prototype.defaults);

	return model;

});
