define(["Mode",
		"TextEdit",
		"TextCompModel",
		"ImageCompModel",
		"VideoCompModel",
		"ImageComp",
		"Slide",
		"module",
		"exports",		
		], function(Mode, TextEdit, TextCompModel, ImageCompModel, VideoCompModel, ImageComp, Slide, module, exports) {

    var initWebsocketEvents = function() {

//DO NOT DELETE
        // //Receive a new component from server
        // socket.on("broadcast_add_component", function(data) {
            // console.log("received new component:");
            // console.log(data);
            // insert(data);
        // });
// 
        // //Receive a component removal from server
        // socket.on("broadcast_delete_component", function(data) {
            // console.log("received delete component");
            // console.log(data);
            // var cid = slides.getComponentsWhere({"_id": data})[0].cid;
            // deleteComponent(cid, false);
        // });
// 
        // //Receive a component update from server
        // socket.on("broadcast_update_component", function(data) {
            // console.log("received update component");
            // console.log(data);
            // updatedFromServer = true;
            // // To avoid updating to server
            // var cid = slides.getComponentsWhere({"_id": data._id})[0].cid;
            // var component = slides.getComponent(cid);
// 
            // // Determine what property has changed
// 
            // var changedPosition = parseInt(data.pos_x) !== parseInt(component.get("pos_x")) || parseInt(data.pos_y) !== parseInt(component.get("pos_y"));
// 
            // if (data.type == "text") {
                // // If component is a text
                // var changedFontSize = parseFloat(data.font_size) !== parseFloat(component.get("font_size"));
                // var changedColor = data.color !== component.get("color");
                // var changedBold = data.bold !== component.get("bold");
                // var changedItalic = data.italic !== component.get("italic");
                // var changedUnderlined = data.underlined !== component.get("underlined");
                // var changedFont = data.font !== component.get("font");
                // var changedContent = data.content !== component.get("content");
            // } else if (data.type == "image") {
                // // If component is an image
                // var changedImageFile = data.file !== component.get("file");
                // var changedImageSize = parseInt(data.size) !== parseInt(component.get("size"));
            // } else if (data.type == "video") {
                // // If component is a video
            // }
// 
            // //Check what properties have changed
            // if (changedPosition) {
                // console.log("Position changed");
                // changePosition(cid, data.pos_x, data.pos_y);
            // } else if (changedFontSize) {
                // console.log("Font size changed");
                // TextEdit.setFontSize(cid, data.font_size);
            // } else if (changedColor) {
                // console.log("Color changed");
                // TextEdit.changeColor(cid, data.color);
            // } else if (changedBold) {
                // console.log("Bold changed");
                // TextEdit.toggleBold(cid);
            // } else if (changedItalic) {
                // console.log("Italic changed");
                // TextEdit.toggleItalic(cid);
            // } else if (changedUnderlined) {
                // console.log("Underlined changed");
                // TextEdit.toggleUnderlined(cid);
            // } else if (changedFont) {
                // console.log("Font changed");
            // } else if (changedContent) {
                // console.log("Content changed");
                // TextEdit.changeContent(cid, data.content);
            // } else if (changedImageFile) {
                // console.log("Image file changed");
                // ImageComp.load(cid, data.file);
            // } else if (changedImageSize) {
                // console.log("Image size changed");
                // ImageComp.setSize(cid, data.size);
            // }
// 
        // });
    };

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

		//Render the component to HTML
		component.toHTML();
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

    var showMenu = function(cid) {
        document.getElementById(cid).getElementsByClassName("component-options")[0].style.display = "block";
    };

    var hideMenu = function(cid) {
        document.getElementById(cid).getElementsByClassName("component-options")[0].style.display = "none";
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

    var deselectAll = function() {
        console.log("deselect component");        

		// if a previous component was selected
		if(selected_component !== null) {
			// If the edit-text-mode was active
			if(Mode.getCurrentMode() === "text-edit"){
				Mode.exitFromEditTextMode();
			}
			$(".component").removeClass("selected-component");			
			hideToolbox();			
			hideMenu(selected_component);
            selected_component = null;        
        }
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
    
	exports.initWebsocketEvents = initWebsocketEvents;
	exports.loadAll = loadAll;
	exports.insert = insert;
	exports.showNewComponentBox = showNewComponentBox;
	exports.hideNewComponentBox = hideNewComponentBox;
	exports.showToolbox = showToolbox;
	exports.hideToolbox = hideToolbox;        
	exports.showMenu = showMenu;
	exports.hideMenu = hideMenu;
	exports.select = select;
	exports.deselectAll = deselectAll;
	exports.onClick = onClick;
	exports.onClickBtnEditText = onClickBtnEditText;

});
