define(["config", "SlideModel", "ComponentModel", "ImageUploadFormView", "VideoUploadFormView", "ColorPickerView", "ThemeSelectorView", "ChatWindowView", "AddLinkWindowView", "NewComponentBoxView", "SlideOptionsBoxView", "EditorView", "SlidesListView", "SlideMiniView", "SlidesMapView", "TextToolboxView", "ImageToolboxView", "VideoToolboxView", "EditModeView", "NavigationModeView", "PreviewModeView"], function(config, SlideModel, ComponentModel, ImageUploadFormView, VideoUploadFormView, ColorPickerView, ThemeSelectorView, ChatWindowView, AddLinkWindowView, NewComponentBoxView, SlideOptionsBoxView, EditorView, SlidesListView, SlideMiniView, SlidesMapView, TextToolboxView, ImageToolboxView, VideoToolboxView, EditModeView, NavigationModeView, PreviewModeView) {
	Mustache.tags = ["[[", "]]"];

	// GLOBAL FUNCTIONS

	getTransformValue = function(element, property) {
		var values = element.style[css_transform].split(")");
		for (var key in values) {
			var val = values[key];
			var prop = val.split("(");
			if (prop[0].trim() == property)
				return parseFloat(prop[1]);
		}
		return false;
	};

	translate3DToArray = function(value) {
		value = value.toString();
		var pattern = /([0-9-]+)+(?![3d]\()/gi;
		return value.match(pattern);
	};

	getSupportedCSSProp = function(proparray) {
		var root = document.documentElement;
		//reference root element of document
		for (var i = 0; i < proparray.length; i++) {//loop through possible properties
			if (proparray[i] in root.style) {//if property exists on element (value will be string, empty string if not set)
				return proparray[i];
			}
		}
	};

	saveAllToLocalStorage = function() {
		setTimeout(function() {
			localStorage.slides = JSON.stringify(slides.toJSON());
			saveAllToLocalStorage();
		}, 5000);
	};

	// GLOBAL VARIABLES

	//Get CSS prefixes according to the browser render engine
	css_transform = getSupportedCSSProp(["webkitTransform", "MozTransform", "OTransform"]);
	css_transition = getSupportedCSSProp(["webkitTransition", "MozTransition", "OTransition"]);

	selected_component = null;

	// Set a variable that controls whether last change was made from server or not
	updatedFromServer = false;

	//Connect to socket.io
	if (!is_anonymous) {
		socket = io.connect(nodejs_url);

		socket.emit("collaborator_connect", {
			presentation_id : p_id,
			user_data : {
				"first_name" : user_first_name,
				"last_name" : user_last_name,
				"username" : user_username,
			}
		});
	}

	//Define a collection to store the slide objects
	SlideCollection = Backbone.Collection.extend({
		model : SlideModel,
		url : "slides",
		getComponent : function(cid) {
			for ( i = 0; i < slides.length; i++) {
				if (slides.models[i].get("components").get(cid) !== undefined) {
					return slides.models[i].get("components").get(cid);
				}
			}

			// In case it's not found
			return undefined;
		},
		getComponentsWhere : function(values) {
			var results = [];
			for ( i = 0; i < slides.length; i++) {
				var result = slides.models[i].get("components").where(values);
				if (result.length > 0) {
					for ( j = 0; j < result.length; j++) {
						results.push(result[j]);
					}
				}
			}
			return results;
		},
	});

	//Define a collection to store the component objects
	ComponentCollection = Backbone.Collection.extend({
		model : ComponentModel,
		url : "components",
	});

	$(document).ready(function(){
		// Instantiate Backbone.js Views
		views = {};
		views.editor = new EditorView();
		views.image_upload_form = new ImageUploadFormView();
		views.video_upload_form = new VideoUploadFormView();
		views.colorpicker = new ColorPickerView();
		views.theme_selector = new ThemeSelectorView();
		views.chat_window = new ChatWindowView();
		views.add_link_window = new AddLinkWindowView();
		views.new_component_box = new NewComponentBoxView();
		views.slide_options_box = new SlideOptionsBoxView();
		views.text_toolbox = new TextToolboxView();
		views.image_toolbox = new ImageToolboxView();
		views.video_toolbox = new VideoToolboxView();
		views.slides_map = new SlidesMapView();
		views.edit_mode = new EditModeView();
		views.navigation_mode = new NavigationModeView();
		views.preview_mode = new PreviewModeView();		
	});

	impress().init();

	if (is_anonymous) {
		saveAllToLocalStorage();
	}
});
