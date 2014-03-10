define([], function() {
	"use strict";
	return Backbone.View.extend({
		el : document.getElementById("themes-window"),

		events : {
			"click .theme-link" : "onClickTheme",
		},

		initialize : function() {
			this.loadList();

			// // If a theme was set and the user is anonymous, load the theme from local web storage
			// if (localStorage.theme !== undefined) {
				// this.set(localStorage.theme);
			// }
		},

		loadList : function() {
			var url = "/theme/load-list";
			$.post(url, function(data) {
				data = {
					themes : JSON.parse(data)
				};
				var template = document.getElementById("template-theme").innerHTML;
				var view = Mustache.render(template, data);
				document.getElementById("themes-list").innerHTML = view;
			});
		},

		set : function(name) {
			console.log("theme changed");
			var currentStyleSheet = document.getElementById("theme-stylesheet");
			var currentStylesheetURL = currentStyleSheet.href.split("/");
			currentStylesheetURL[currentStylesheetURL.length - 1] = name + ".css";
			currentStylesheetURL = currentStylesheetURL.join();
			currentStylesheetURL = currentStylesheetURL.replace(/,/g, "/");
			currentStyleSheet.href = currentStylesheetURL;
			//Save to database
			var url = "/theme/set";
			var theme_id = name.split("_");
			theme_id = theme_id[theme_id.length - 1];
			if (!app.is_anonymous) {
				$.post(url, {
					"theme_id" : theme_id,
					"presentation_id" : app.p_id
				});
			} else {
				localStorage.theme = name;
			}

			// Update thumbnails according to the new selected theme
			// Slide.loadThumbnails();
		},

		onClickTheme : function(event) {
			var name = event.currentTarget.id;
			this.set(name);
			$("#themes-window").foundation("reveal", "close");
		},
	});
});
