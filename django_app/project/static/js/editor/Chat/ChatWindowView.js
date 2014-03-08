define([], function() {
	return Backbone.View.extend({
		el : document.getElementById("chat"),

		events : {
			"submit #chat-form" : "sendMessage",
		},
		
		initialize : function(){
			if(!app.is_anonymous){
				app.socket.on("receive_chat_message", this.appendMessage);
			}
		},

		sendMessage : function(event) {
			var text_box = event.target.querySelector("#message-text"), message = text_box.value;
			//If message is not empty
			if (message !== "" && message !== null) {
				app.socket.emit("send_chat_message", message);
				text_box.value = "";
			}
			event.preventDefault();
		},

		appendMessage : function(data) {
			var view = Mustache.render(document.getElementById("template-chat-message").innerHTML, {
				'first_name' : data.first_name,
				'last_name' : data.last_name,
				'message' : data.message
			});
			document.getElementById("message-list").innerHTML += view;
		},
	});
});
