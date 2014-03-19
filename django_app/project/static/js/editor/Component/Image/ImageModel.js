/**
 * @module Component
 * @submodule Image
 */

/**
 * Image model
 * @class ImageModel
 * @extends ComponentModel
 */

define(["Component/ComponentModel"], function(ComponentModel) {
	"use strict";
	var model = ComponentModel.extend({
		/**
		 * Default attributes for the model
		 * @attribute defaults
		 * @type Object
		 */
		defaults : {
			type : "image",
			file : null,
			external_url : null,
			size : 40 //Default 40% in relation to the slide container
		}
	});
	_.extend(model.prototype.defaults, ComponentModel.prototype.defaults);

	return model;

});
