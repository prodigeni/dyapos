define(["Slide", 
		"Component", 
		"SlideModel", 
		"ComponentModel", 
		"Mode", 
		"ImageUploadFormView", 
		"VideoUploadFormView", 
		"ColorPickerView", 
		"ThemeSelectorView", 
		"ChatWindowView", 
		"AddLinkWindowView" , 
		"NewComponentBoxView", 
		"SlideOptionsBoxView", 
		"EditorView", 
		"SlidesListView", 
		"SlideMiniView", 
		"SlidesMapView", 
		"TextToolboxView", 
		"ImageToolboxView", 
		"VideoToolboxView"], function(Slide, 
									Component, 
									SlideModel, 
									ComponentModel, 
									Mode, 
									ImageUploadFormView, 
									VideoUploadFormView, 
									ColorPickerView, 
									ThemeSelectorView, 
									ChatWindowView, 
									AddLinkWindowView, 
									NewComponentBoxView, 
									SlideOptionsBoxView, 
									EditorView, 
									SlidesListView, 
									SlideMiniView, 
									SlidesMapView, 
									TextToolboxView, 
									ImageToolboxView, 
									VideoToolboxView) {

	// Patch, it is the only way I found to access the subModelTypes models inside the ComponentModel
	// It's a problem with Require.js, so I declared these variables as global
	TextCompModel = require("TextCompModel");
	ImageCompModel = require("ImageCompModel");
	VideoCompModel = require("VideoCompModel");

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
	
	//Create a slide collection
	slides = new SlideCollection();

	//Create a component collection
	components = new ComponentCollection();
	
	// Instantiate Backbone.js Views
	editor_view = new EditorView();
	image_upload_form_view = new ImageUploadFormView();
	video_upload_form_view = new VideoUploadFormView();
	colorpicker_view = new ColorPickerView();
	theme_selector_view = new ThemeSelectorView();
	chat_window_view = new ChatWindowView();
	add_link_window_view = new AddLinkWindowView();
	new_component_box_view = new NewComponentBoxView();
	slide_options_box_view = new SlideOptionsBoxView();
	text_toolbox_view = new TextToolboxView();
	image_toolbox_view = new ImageToolboxView();
	video_toolbox_view = new VideoToolboxView();

	impress().init();

	Slide.loadAll();

	if (is_anonymous) {
		Slide.saveAllToLocalStorage();
	}
});
