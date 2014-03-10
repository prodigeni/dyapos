define(["VideoCompModel"], function(VideoCompModel) {
	return Backbone.View.extend({
		el : document.getElementById("add-video-box"),
		events : {
			"click #btn-add-video-link" : "addVideo",
		},
		addVideo : function() {
			var link = document.getElementById("video-link").value;
			console.log(link);
			var url_id = link.split("v=");
			url_id = url_id[1].split("&");
			url_id = url_id[0];
			$("#add-video-box").foundation("reveal", "close");
			new VideoCompModel({
				"type" : "video",
				"website" : "youtube",
				"url_id" : url_id,
				// "pos_x" : clicked_inside_slide_point.left,
				// "pos_y" : clicked_inside_slide_point.top,
				"pos_x" : 0,
				"pos_y" : 0,
				"slide" : app.slides.get(app.selected_slide),
			});
			// Component.insert({
				// "type" : "video",
				// "website" : "youtube",
				// "url_id" : url_id,
				// // "pos_x" : clicked_inside_slide_point.left,
				// // "pos_y" : clicked_inside_slide_point.top,
				// "pos_x" : 0,
				// "pos_y" : 0,
			// });
		},
	});
});
