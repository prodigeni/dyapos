define([], function() {
	return Backbone.View.extend({
		el : document.getElementById("add-link-box"),

		events : {
			"click #btn-add-text-link" : "addLink",
		},

		addLink : function(event) {
			var link = document.getElementById("text-link").value;
			var component = document.getElementById(selected_component).getElementsByClassName("component-preview")[0];
			var content = component.children[0].innerHTML;
			var template = document.getElementById("template-link").innerHTML;
			var data = {
				"link" : link,
				"content" : content
			};
			var view = Mustache.render(template, data);
			component.children[0].innerHTML = view;
			slides.getComponent(selected_component).set("content", view);
			$("#add-link-box").foundation("reveal", "close");
		}
	});
});
