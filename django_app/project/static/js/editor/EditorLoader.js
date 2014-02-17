define(["Collaborative", "Slide", "Component", "SlideModel", "ComponentModel", "ImageComp", "TextEdit", "Mode", "ImageUploadFormView", "VideoUploadFormView", "ColorPickerView", "ThemeSelectorView", "ChatWindowView", "AddLinkWindowView" , "NewComponentBoxView", "SlideOptionsBoxView"], function(Collaborative, Slide, Component, SlideModel, ComponentModel, ImageComp, TextEdit, Mode, ImageUploadFormView, VideoUploadFormView, ColorPickerView, ThemeSelectorView, ChatWindowView, AddLinkWindowView, NewComponentBoxView, SlideOptionsBoxView) {

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
	
	image_upload_form_view = new ImageUploadFormView();
	video_upload_form_view = new VideoUploadFormView();
	colorpicker_view = new ColorPickerView();
	theme_selector_view = new ThemeSelectorView();
	chat_window_view = new ChatWindowView();
	add_link_window_view = new AddLinkWindowView();
	new_component_box_view = new NewComponentBoxView();
	slide_options_box_view = new SlideOptionsBoxView();

	//Create a slide collection
	slides = new SlideCollection();

	//Create a component collection
	components = new ComponentCollection();

	if (!is_anonymous) {
		// Start listening websocket events from server to client
		Collaborative.initWebsocketEvents();
		Slide.initWebsocketEvents();
		Component.initWebsocketEvents();
	}

	impress().init();

	Slide.loadAll();

	if (is_anonymous) {
		Slide.saveAllToLocalStorage();
	}

	//EVENTS

	$("#slides-list").sortable({
		distance : 20,
	});

	$("#slides-list").sortable({
		stop : function(event, ui) {
			Slide.updateSlidesOrder();
		}
	});

	$("#slides-list").on("click", ".slide-mini", function(event) {
		event.stopPropagation();
		console.log("event: click on mini-slide");
		Slide.changeSelected(event.currentTarget.id.replace("slide-", ""));
	});

	$("#slides-list").on("click", ".btn-delete", Slide.onClickDeleteBtnSlideMini);

	$("#btn-add-slide").on("click", function(event) {
		event.stopPropagation();
		Slide.insert(null);
	});

	$("#image_url").on("change", function(event) {
		document.getElementById("image").value = "";
	});
	$("#image").on("change", function(event) {
		document.getElementById("image_url").value = "";
	});

	$("#btn-increase-font").on("click", TextEdit.onClickBtnIncreaseFont);
	$("#btn-decrease-font").on("click", TextEdit.onClickBtnDecreaseFont);
	$("#bold-btn").on("click", TextEdit.onClickBtnBold);
	$("#underlined-btn").on("click", TextEdit.onClickBtnUnderlined);
	$("#italic-btn").on("click", TextEdit.onClickBtnItalic);
	$("#link-btn").on("click", TextEdit.onClickBtnLink);
	$("#color-btn").on("click", colorpicker_view.toggle);

	$("#btn-increase-image-size").on("click", ImageComp.onClickBtnIncrease);
	$("#btn-decrease-image-size").on("click", ImageComp.onClickBtnDecrease);

	$("#btn-navigation-mode").on("click", Mode.goToNavigationEditMode);

	$("#btn-preview-presentation").on("click", Mode.goToPreviewMode);
	$("#btn-exit-preview-mode").on("click", Mode.exitFromPreviewMode);
});
