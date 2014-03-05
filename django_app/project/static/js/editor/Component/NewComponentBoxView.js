define(["TextCompModel", "ImageCompModel", "VideoCompModel"], function(TextCompModel, ImageCompModel, VideoCompModel) {
	return Backbone.View.extend({
		el : document.getElementById("new-component-box"),

		events : {
			"click #btn-add-title" : "addTitle",
			"click #btn-add-subtitle" : "addSubtitle",
			"click #btn-add-body" : "addBody",
			"click #btn-add-image" : "addImage",
			"click #btn-add-video" : "addVideo",
		},

		addTitle : function() {
			var component = new TextCompModel({
				"type" : "text",
				"text_type" : "title",
				"font_size" : 3,
				// "pos_x" : clicked_inside_slide_point.left,
				// "pos_y" : clicked_inside_slide_point.top,
				"pos_x" : 0,
				"pos_y" : 0,
				"content" : title_default_text,
				"slide" : slides.get(selected_slide),				
			});
			
			if(!is_anonymous){
				component.save();
			}
		},

		addSubtitle : function() {
			var component = new TextCompModel({
				"type" : "text",
				"text_type" : "subtitle",
				"font_size" : 2,
				// "pos_x" : clicked_inside_slide_point.left,
				// "pos_y" : clicked_inside_slide_point.top,
				"pos_x" : 0,
				"pos_y" : 0,
				"content" : subtitle_default_text,
				"slide" : slides.get(selected_slide),
			});

			if(!is_anonymous){
				component.save();
			}			
		},

		addBody : function() {
			var component = new TextCompModel({
				"type" : "text",
				"text_type" : "body",
				"font_size" : 1,
				// "pos_x" : clicked_inside_slide_point.left,
				// "pos_y" : clicked_inside_slide_point.top,
				"pos_x" : 0,
				"pos_y" : 0,
				"content" : body_default_text,
				"slide" : slides.get(selected_slide),
			});
			
			if(!is_anonymous){
				component.save();
			}
		},
		
		addImage : function(){
			$("#add-image-box").foundation("reveal", "open");
			new_component_box_view.$el.hide();
		},
		
		addVideo : function(){
			$("#add-video-box").foundation("reveal", "open");
			new_component_box_view.$el.hide();			
		},
	});
});
