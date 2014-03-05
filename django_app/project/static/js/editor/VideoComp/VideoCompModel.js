define(["ComponentModel"], function(ComponentModel) {

	var model = ComponentModel.extend({
		defaults : {
			type : "video",
			website : null,
			url_id : null,
			size : 40, //Default 40% in relation to the slide container
		},
	});
	_.extend(model.prototype.defaults, ComponentModel.prototype.defaults);

	return model;

});
