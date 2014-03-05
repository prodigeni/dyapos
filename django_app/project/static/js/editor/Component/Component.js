define(["Mode",
		"TextCompModel",
		"ImageCompModel",
		"VideoCompModel",
		"Slide",
		"module",
		"exports",		
		], function(Mode, TextCompModel, ImageCompModel, VideoCompModel, Slide, module, exports) {

var loadAll = function() {
	if(!is_anonymous){
		components.sync("read", components, {
			success : function(data) {
				for ( i = 0; i < data.length; i++) {
					insert(data[i]);
				}
				
				// Move to first slide
				Slide.changeSelected(slides.at(0).cid);
	
				// Wait 3 seconds before rendering thumbails canvas, because it looks ugly while loading
				setTimeout(function(){ Slide.loadThumbnails(); }, 3000);
			}
        });			
	}
};

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

    var showNewComponentBox = function() {
        $new_component_box.style.display = "block";
    };

    var hideNewComponentBox = function() {
        $new_component_box.style.display = "none";
    };
    
    var showToolbox = function(){
		$("#toolbox-container").css("display","block");
    
		switch(slides.getComponent(selected_component).get("type")){
			case "text": $("#toolbox-text").css("display","block");
						break;
			case "image":
			case "video":
						$("#toolbox-image").css("display","block");
						break;
		}
    };
    
    var hideToolbox = function(){
		$("#toolbox-container").css("display","none");
		$(".toolbox").css("display","none");
    };

    var select = function(cid) {
		console.log(cid);

        var component = document.getElementById(cid);
        component.classList.add("selected-component");

		// Show component toolbox
		showToolbox();

		// Show component menu
		showMenu(cid);
    };

    // Event functions
    
    var onClick = function(event){
        event.stopPropagation();
        console.log("select component");
        
        // If the component has a link, avoid redirecting when click on it
        event.preventDefault();
        
        // only if not editing text
        if (Mode.getCurrentMode() !== "text-edit") {
            document.getElementById("new-component-box").style.display = "none";
			deselectAll();
            selected_component = this.id;
            select(selected_component);
        }
    };

    
    var onClickBtnEditText = function(event){
		event.stopPropagation();
		Mode.goToEditTextMode();
    };
    
	exports.loadAll = loadAll;
	exports.insert = insert;
	exports.showNewComponentBox = showNewComponentBox;
	exports.hideNewComponentBox = hideNewComponentBox;
	exports.showToolbox = showToolbox;
	exports.hideToolbox = hideToolbox;        
	exports.select = select;
	exports.onClick = onClick;
	exports.onClickBtnEditText = onClickBtnEditText;

});
