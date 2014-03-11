require.config({
	paths : {
		jquery : "jquery-2.0.0",
		jqueryui : "jquery-ui-1.10.3.custom",
		touchpunch : "jquery.ui.touch-punch",
		mustache : "mustache",
		impress : "impress",
		impress_custom : "editor/impress_custom",
		html2canvas : "html2canvas",
		colorpicker : "colorpicker.min",
		underscore : "underscore",
		backbone : "backbone",
		backbone_relational : "backbone-relational",
		iobind : "backbone.iobind",
		iosync : "backbone.iosync",
		modernizr : "modernizr",
		foundation : "foundation.min",

		//Modules
		EditorLoader : "editor/EditorLoader",
		Collaborator : "editor/Collaborator/Collaborator",
		ComponentModel : "editor/Component/ComponentModel",
		ImageCompModel : "editor/ImageComp/ImageCompModel",
		SlideModel : "editor/Slide/SlideModel",
		TextCompModel : "editor/TextComp/TextCompModel",
		VideoCompModel : "editor/VideoComp/VideoCompModel",
		//Views
		EditorView : "editor/EditorView",
		ImageUploadFormView : "editor/ImageComp/ImageUploadFormView",
		VideoUploadFormView : "editor/VideoComp/VideoUploadFormView",
		ColorPickerView : "editor/TextComp/ColorPickerView",
		ThemeSelectorView : "editor/Theme/ThemeSelectorView",
		ChatWindowView : "editor/Chat/ChatWindowView",
		AddLinkWindowView : "editor/TextComp/AddLinkWindowView",
		NewComponentBoxView : "editor/Component/NewComponentBoxView",
		SlideOptionsBoxView : "editor/Slide/SlideOptionsBoxView",
		SlidesListView : "editor/Slide/SlidesListView",
		SlideMiniView : "editor/Slide/SlideMiniView",
		SlidesMapView : "editor/Slide/SlidesMapView",
		SlideView : "editor/Slide/SlideView",
		ComponentView : "editor/Component/ComponentView",
		TextCompView : "editor/TextComp/TextCompView",
		ImageCompView : "editor/ImageComp/ImageCompView",
		VideoCompView : "editor/VideoComp/VideoCompView",
		TextToolboxView : "editor/TextComp/TextToolboxView",
		ImageToolboxView : "editor/ImageComp/ImageToolboxView",
		VideoToolboxView : "editor/VideoComp/VideoToolboxView",
		EditModeView : "editor/Mode/EditModeView",
		NavigationModeView : "editor/Mode/NavigationModeView",
		PreviewModeView : "editor/Mode/PreviewModeView"
	},

	shim : {
		jquery : {
			exports : "$"
		},
		jqueryui : {
			deps : ["jquery"]
		},
		touchpunch : {
			deps : ["jqueryui"]
		},
		underscore : {
			exports : "_"
		},
		backbone : {
			deps : ["underscore"],
			exports : "Backbone"
		},
		backbone_relational : {
			deps : ["backbone"]
		},
		iosync : {
			deps : ["underscore", "backbone"]
		},
		iobind : {
			deps : ["underscore", "backbone", "iosync"]
		}
	}
});

// Here the application starts
require(["edit", "EditorLoader"]);
