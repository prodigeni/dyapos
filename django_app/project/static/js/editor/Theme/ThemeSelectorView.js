/**
 * @module Theme
 */

/**
 * Theme selector window view
 * @class ThemeSelectorView
 * @extends Backbone.View
 */

define([], function () {
	"use strict";
	return Backbone.View.extend({
		/**
		 * Element: #themes-window
		 * @property el
		 * @type String
		 */
		el: document.getElementById("themes-window"),

		events: {
			/**
			 * Calls onClickTheme
			 * @event click .theme-link
			 */
			"click .theme-link": "onClickTheme"
		},

		/**
		 * Runs when the class is instantiated
		 * @method initialize
		 */
		initialize: function () {
			this.loadList();

			// If a theme was set and the user is anonymous, load the theme from local web storage
			if (localStorage.theme !== undefined) {
				this.set(localStorage.theme);
			} else {
				localStorage.theme = "theme_1";
			}
			$("#loading-screen").fadeOut(800);
		},

		/**
		 * Loads the theme list from server
		 * @method loadList
		 */
		loadList: function () {
			var url = "/theme/load-list",
				template = document.getElementById("template-theme").innerHTML,
				view;

			// Send an Ajax request to get the theme list
			$.post(url, function (data) {
				data = {
					themes: JSON.parse(data)
				};
				view = Mustache.render(template, data);
				document.getElementById("themes-list").innerHTML = view;
			});
		},

		/**
		 * Set the selected theme and show it
		 * @param {Object} name Name of the selected theme
		 */
		set: function (name) {
			var currentStyleSheet = document.getElementById("theme-stylesheet"),
				currentStylesheetURL = currentStyleSheet.href.split("/"),
				url = "/theme/set",
				theme_id = name.split("_"),
				i;

			console.log("theme changed");
			currentStylesheetURL[currentStylesheetURL.length - 1] = name + ".css";
			currentStylesheetURL = currentStylesheetURL.join();
			currentStylesheetURL = currentStylesheetURL.replace(/,/g, "/");
			currentStyleSheet.href = currentStylesheetURL;

			theme_id = theme_id[theme_id.length - 1];
			if (!app.is_anonymous) {
				// If the user is connected as a non-anonymous user, save it to the database
				$.post(url, {
					"theme_id": theme_id,
					"presentation_id": app.p_id
				});
			} else {
				//Otherwise save it to the Local Web Storage of the browser
				localStorage.theme = name;
			}

			// Wait for 1 second because the stylesheet has not been loaded completely yet
			setTimeout(function () {
				// Set the default background color on the selected theme
				for (i = 0; i < currentStyleSheet.sheet.cssRules.length; i = i + 1) {
					if (currentStyleSheet.sheet.cssRules[i].selectorText === "body") {
						app.theme_background_color = currentStyleSheet.sheet.cssRules[i].style.backgroundColor;
					}
				}
				// Update thumbnails according to the new selected theme
				app.slides.each(function (slide) {
					slide.mini_view.generateThumbnail();
				});
			}, 1000);
		},

		/**
		 * When the user clicks on a theme from the theme selector window
		 * @param {Object} event Click event
		 */
		onClickTheme: function (event) {
			var name = event.currentTarget.id;
			//Set the theme
			this.set(name);
			//Close the theme selector window
			$("#themes-window").foundation("reveal", "close");
		}
	});
});