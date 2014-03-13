define(["SlideModel", "ComponentModel", "ImageUploadFormView", "VideoUploadFormView", "ColorPickerView", "ThemeSelectorView", "ChatWindowView", "AddLinkWindowView", "NewComponentBoxView", "SlideOptionsBoxView", "EditorView", "SlidesListView", "SlideMiniView", "SlidesMapView", "TextToolboxView", "ImageToolboxView", "VideoToolboxView", "EditModeView", "NavigationModeView", "PreviewModeView"], function(SlideModel, ComponentModel, ImageUploadFormView, VideoUploadFormView, ColorPickerView, ThemeSelectorView, ChatWindowView, AddLinkWindowView, NewComponentBoxView, SlideOptionsBoxView, EditorView, SlidesListView, SlideMiniView, SlidesMapView, TextToolboxView, ImageToolboxView, VideoToolboxView, EditModeView, NavigationModeView, PreviewModeView) {"use strict";
	Mustache.tags = ["[[", "]]"];

	// GLOBAL FUNCTION

	app.getTransformValue = function(element, property) {
		var values = element.style[app.css_transform].split(")"),
			key,
			val,
			prop;

		for (key in values) {
			if (values.hasOwnProperty(key)) {
				val = values[key];
				prop = val.split("(");
				if (prop[0].trim() === property) {
					return parseFloat(prop[1]);
				}
			}
		}
		return false;
	};

	app.translate3DToArray = function(value) {
		value = value.toString();
		var pattern = /([0-9-]+)+(?![3d]\()/gi;
		return value.match(pattern);
	};

	app.getSupportedCSSProp = function(proparray) {
		var root = document.documentElement,
			i;

		//reference root element of document
		for (i = 0; i < proparray.length; i = i + 1) {//loop through possible properties
			if (proparray[i] in root.style) {//if property exists on element (value will be string, empty string if not set)
				return proparray[i];
			}
		}
	};

	app.saveAllToLocalStorage = function() {
		setTimeout(function() {
			localStorage.slides = JSON.stringify(app.slides.toJSON());
			app.saveAllToLocalStorage();
		}, 5000);
	};

	app.deselectAllComponents = function() {
		$(".component-options").hide();
		$(".component").removeClass("selected-component hoverable");
		$(".toolbox").hide();
		app.selected_component = null;
	};

	// GLOBAL VARIABLES

	//Get CSS prefixes according to the browser render engine
	app.css_transform = app.getSupportedCSSProp(["webkitTransform", "MozTransform", "OTransform"]);
	app.css_transition = app.getSupportedCSSProp(["webkitTransition", "MozTransition", "OTransition"]);
	//This stores the current selected color on the ColorPicker
	app.selected_color = null;

	//Variables for Navigation mode
	app.nav = {
		map : document.getElementById("impress").children[0],
		transform_style : null,
		map_trans3d : null,
		slide_trans3d : null,
		last_x_ : null,
		last_y : null
	};

	app.selected_slide = null;
	app.selected_component = null;

	// Set a variable that controls whether last change was made from server or not
	app.updatedFromServer = false;

	//Connect to socket.io
	if (!app.is_anonymous) {
		Object.defineProperty(app, "socket", {
			value : io.connect(app.nodejs_url),
		});

		app.socket.emit("collaborator_connect", {
			presentation_id : app.p_id,
			user_data : {
				"first_name" : app.user_first_name,
				"last_name" : app.user_last_name,
				"username" : app.user_username
			}
		});
	}

	//Define a collection to store the slide objects
	app.SlideCollection = Backbone.Collection.extend({
		model : SlideModel,
		url : "slides",
		getComponent : function(cid) {
			for (var i = 0; i < app.slides.length; i = i + 1) {
				if (app.slides.models[i].get("components").get(cid) !== undefined) {
					return app.slides.models[i].get("components").get(cid);
				}
			}

			// In case it's not found
			return undefined;
		},
		getComponentsWhere : function(values) {
			var results = [],
				result,
				i,
				j;

			for (i = 0; i < app.slides.length; i = i + 1) {
				result = app.slides.models[i].get("components").where(values);
				if (result.length > 0) {
					for (j = 0; j < result.length; j = j + 1) {
						results.push(result[j]);
					}
				}
			}
			return results;
		}
	});

	//Define a collection to store the component objects
	app.ComponentCollection = Backbone.Collection.extend({
		model : ComponentModel,
		url : "components"
	});

	$(document).ready(function() {
		// Instantiate Backbone.js Views
		app.views = {};
		app.views.editor = new EditorView();
		app.views.image_upload_form = new ImageUploadFormView();
		app.views.video_upload_form = new VideoUploadFormView();
		app.views.colorpicker = new ColorPickerView();
		app.views.theme_selector = new ThemeSelectorView();
		app.views.chat_window = new ChatWindowView();
		app.views.add_link_window = new AddLinkWindowView();
		app.views.new_component_box = new NewComponentBoxView();
		app.views.slide_options_box = new SlideOptionsBoxView();
		app.views.text_toolbox = new TextToolboxView();
		app.views.image_toolbox = new ImageToolboxView();
		app.views.video_toolbox = new VideoToolboxView();
		app.views.slides_map = new SlidesMapView();
		app.views.edit_mode = new EditModeView();
		app.views.navigation_mode = new NavigationModeView();
		app.views.preview_mode = new PreviewModeView();
	});

	impress().init();

	if (app.is_anonymous) {
		app.saveAllToLocalStorage();
	}

});
