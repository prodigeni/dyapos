define(["TextCompModel",
		"ImageCompModel",
		"VideoCompModel"], function(TextCompModel, ImageCompModel, VideoCompModel) {

    //Insert a new component on the selected slide
    var insert = function(data) {
		if(typeof(data.slide_id) == "undefined"){
			// When a new component is created and doesn't have a slide_id
			// when the component is created from client side (not fetched from server side)
			data.slide = slides.get(selected_slide);
		}
		
		var component = null;

		switch(data.type) {
			case "text":
				component = new TextCompModel(data);
				break;
			case "image":
				component = new ImageCompModel(data);
				break;
			case "video":
				component = new VideoCompModel(data);
				break;
		}
        
        if(component.isNew() && !is_anonymous){
			component.save();
        }
    };
    
    return {
		insert : insert
    };
});
