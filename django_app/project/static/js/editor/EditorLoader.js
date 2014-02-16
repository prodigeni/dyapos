define(["Collaborative", "Slide", "Component", "SlideModel", "ComponentModel", "ImageComp", "TextEdit", "Mode", "ImageUploadFormView", "VideoUploadFormView", "ColorPickerView", "ThemeSelectorView", "ChatWindowView"], function(Collaborative, Slide, Component, SlideModel, ComponentModel, ImageComp, TextEdit, Mode, ImageUploadFormView, VideoUploadFormView, ColorPickerView, ThemeSelectorView, ChatWindowView) {

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
	
	var image_upload_form_view = new ImageUploadFormView();
	var video_upload_form_view = new VideoUploadFormView();
	var colorpicker_view = new ColorPickerView();
	var theme_selector_view = new ThemeSelectorView();
	var chat_window_view = new ChatWindowView();

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

	$("#btn-delete-slide").on("click", Slide.onClickDeleteBtn);

	$("#btn-edit-presentation").on("click", Slide.onClickEditBtn);

	$input_scale.addEventListener("change", Slide.onScale);
	$input_rotation_z.addEventListener("change", Slide.onRotateZ);
	$input_rotation_x.addEventListener("change", Slide.onRotateX);
	$input_rotation_y.addEventListener("change", Slide.onRotateY);
	$input_scale.addEventListener("mouseup", function() {
		var scale = document.getElementById(selected_slide).dataset.scale;
		Slide.changeScale(selected_slide, parseFloat(scale));
	});

	$input_rotation_z.addEventListener("mouseup", function() {
		var degrees = document.getElementById(selected_slide).dataset.rotateZ;
		Slide.changeRotationZ(selected_slide, parseInt(degrees, 10));
	});

	$input_rotation_x.addEventListener("mouseup", function() {
		var degrees = document.getElementById(selected_slide).dataset.rotateX;
		Slide.changeRotationX(selected_slide, parseInt(degrees, 10));
	});

	$input_rotation_y.addEventListener("mouseup", function() {
		var degrees = document.getElementById(selected_slide).dataset.rotateY;
		Slide.changeRotationY(selected_slide, parseInt(degrees, 10));
	});

	//Add new title
	$("#btn-add-title").on("click", function(event) {
		Component.insert({
			"type" : "text",
			"text_type" : "title",
			"pos_x" : clicked_inside_slide_point.left,
			"pos_y" : clicked_inside_slide_point.top,
			"content" : title_default_text,
		});
	});

	//Add new subtitle
	$("#btn-add-subtitle").on("click", function() {
		Component.insert({
			"type" : "text",
			"text_type" : "subtitle",
			"pos_x" : clicked_inside_slide_point.left,
			"pos_y" : clicked_inside_slide_point.top,
			"content" : subtitle_default_text,
		});
	});

	//Add new body
	$("#btn-add-body").on("click", function() {
		Component.insert({
			"type" : "text",
			"text_type" : "body",
			"pos_x" : clicked_inside_slide_point.left,
			"pos_y" : clicked_inside_slide_point.top,
			"content" : body_default_text,
		});
	});

	//Add new image
	$("#btn-add-image").on("click", function() {
		$("#add-image-box").foundation("reveal", "open");
		Component.hideNewComponentBox();
	});

	//Add new video
	$("#btn-add-video").on("click", function() {
		$("#add-video-box").foundation("reveal", "open");
		Component.hideNewComponentBox();
	});

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

	$("#btn-add-text-link").on("click", TextEdit.onClickAddTextLinkBtn);

	$("#btn-color-ok").on("click", TextEdit.onClickBtnApplyColor);
	$("#btn-color-cancel").on("click", TextEdit.cancelColor);

	$("#btn-increase-font").on("click", TextEdit.onClickBtnIncreaseFont);
	$("#btn-decrease-font").on("click", TextEdit.onClickBtnDecreaseFont);
	$("#bold-btn").on("click", TextEdit.onClickBtnBold);
	$("#underlined-btn").on("click", TextEdit.onClickBtnUnderlined);
	$("#italic-btn").on("click", TextEdit.onClickBtnItalic);
	$("#link-btn").on("click", TextEdit.onClickBtnLink);
	$("#color-btn").on("click", TextEdit.toggleColorPicker);

	$("#btn-increase-image-size").on("click", ImageComp.onClickBtnIncrease);
	$("#btn-decrease-image-size").on("click", ImageComp.onClickBtnDecrease);

	$("#btn-navigation-mode").on("click", Mode.goToNavigationEditMode);

	$("#btn-preview-presentation").on("click", Mode.goToPreviewMode);
	$("#btn-exit-preview-mode").on("click", Mode.exitFromPreviewMode);
});
