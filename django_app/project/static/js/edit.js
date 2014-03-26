require.config({
	paths : {
		"jquery" : "jquery-2.0.0",
		"jqueryui" : "jquery-ui-1.10.3.custom",
		"touchpunch" : "jquery.ui.touch-punch",
		"mustache" : "mustache",
		"impress" : "impress",
		"impress_custom" : "editor/impress_custom",
		"html2canvas" : "html2canvas",
		"colorpicker" : "colorpicker.min",
		"underscore" : "underscore",
		"backbone" : "backbone",
		"backbone_relational" : "backbone-relational",
		"iobind" : "backbone.iobind",
		"iosync" : "backbone.iosync",
		"modernizr" : "modernizr",
		"foundation" : "foundation.min",

		"App"									: "editor/App",
		"Collaborative/ChatWindowView"			: "editor/Collaborative/ChatWindowView",
		"Collaborative/User"					: "editor/Collaborative/User",
		"Component/ComponentModel"				: "editor/Component/ComponentModel",
		"Component/ComponentView"				: "editor/Component/ComponentView",
		"Component/Image/ImageModel"			: "editor/Component/Image/ImageModel",
		"Component/Image/ImageToolboxView"		: "editor/Component/Image/ImageToolboxView",
		"Component/Image/ImageUploadFormView"	: "editor/Component/Image/ImageUploadFormView",
		"Component/Image/ImageView"				: "editor/Component/Image/ImageView",
		"Component/NewComponentBoxView"			: "editor/Component/NewComponentBoxView",
		"Component/Text/AddLinkWindowView"		: "editor/Component/Text/AddLinkWindowView",
		"Component/Text/TextModel"				: "editor/Component/Text/TextModel",
		"Component/Text/TextToolboxView"		: "editor/Component/Text/TextToolboxView",
		"Component/Text/TextView"				: "editor/Component/Text/TextView",
		"Component/Video/VideoModel"			: "editor/Component/Video/VideoModel",
		"Component/Video/VideoToolboxView"		: "editor/Component/Video/VideoToolboxView",
		"Component/Video/VideoUploadFormView"	: "editor/Component/Video/VideoUploadFormView",
		"Component/Video/VideoView"				: "editor/Component/Video/VideoView",
		"EditorView"							: "editor/EditorView",
		"ImportExport"							: "editor/ImportExport",
		"Mode/EditModeView"						: "editor/Mode/EditModeView",
		"Mode/NavigationModeView"				: "editor/Mode/NavigationModeView",
		"Mode/PreviewModeView"					: "editor/Mode/PreviewModeView",
		"Slide/SlideMiniView"					: "editor/Slide/SlideMiniView",
		"Slide/SlideModel"						: "editor/Slide/SlideModel",
		"Slide/SlideOptionsBoxView"				: "editor/Slide/SlideOptionsBoxView",
		"Slide/SlidesListView"					: "editor/Slide/SlidesListView",
		"Slide/SlidesMapView"					: "editor/Slide/SlidesMapView",
		"Slide/SlideView"						: "editor/Slide/SlideView",
		"Theme/ThemeSelectorView"				: "editor/Theme/ThemeSelectorView"
	},

	shim : {
		"jquery" : {
			exports : "$"
		},
		"jqueryui" : {
			deps : ["jquery"]
		},
		"touchpunch" : {
			deps : ["jqueryui"]
		},
		"underscore" : {
			exports : "_"
		},
		"backbone" : {
			deps : ["underscore"],
			exports : "Backbone"
		},
		"backbone_relational" : {
			deps : ["backbone"]
		},
		"iosync" : {
			deps : ["underscore", "backbone"]
		},
		"iobind" : {
			deps : ["underscore", "backbone", "iosync"]
		}
	}
});

// Here the application starts
require(["edit", "App"]);
