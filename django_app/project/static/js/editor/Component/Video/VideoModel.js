/**
 * @module Component
 * @submodule Video
 */

/**
 * Video model
 * @class VideoModel
 * @extends ComponentModel
 */

define(["Component/ComponentModel"], function(ComponentModel) {
	"use strict";
	var model = ComponentModel.extend({
		/**
		 * Default attributes
		 * @attribute defaults
		 * @type Object
		 */
		defaults : {
			type : "video",
			website : null,
			url_id : null,
			size : 40 //Default 40% in relation to the slide container
		}
	});
	_.extend(model.prototype.defaults, ComponentModel.prototype.defaults);

	return model;

});
