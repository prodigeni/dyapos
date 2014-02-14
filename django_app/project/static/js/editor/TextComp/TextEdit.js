define([], function() {
    var toggleBold = function(cid) {
        console.log("Toggle bold");
        var component = document.getElementById(cid).getElementsByClassName("component-preview")[0];
        var status = component.style.fontWeight;
        if (status != "bold") {
            component.style.fontWeight = "bold";
            slides.getComponent(cid).set("bold", true);
        } else {
            component.style.fontWeight = "400";
            slides.getComponent(cid).set("bold", false);
        }
    };

    var toggleItalic = function(cid) {
        console.log("Toggle italic");
        var component = document.getElementById(cid).getElementsByClassName("component-preview")[0];
        var status = component.style.fontStyle;
        if (status != "italic") {
            component.style.fontStyle = "italic";
            slides.getComponent(cid).set("italic", true);
        } else {
            component.style.fontStyle = "normal";
            slides.getComponent(cid).set("italic", false);
        }
    };

    var toggleUnderlined = function(cid) {
        console.log("Toggle underlined");
        var component = document.getElementById(cid).getElementsByClassName("component-preview")[0];
        var status = component.style.textDecoration;
        if (status != "underline") {
            component.style.textDecoration = "underline";
            slides.getComponent(cid).set("underlined", true);
        } else {
            component.style.textDecoration = "none";
            slides.getComponent(cid).set("underlined", false);
        }
    };

    var toggleColorPicker = function() {
        var colorpicker = document.getElementById("colorpicker");
        status = colorpicker.style.display;
        if (status == "none") {
            colorpicker.style.display = "block";
            previous_color = document.getElementById(selected_component).getElementsByClassName("component-preview")[0].style.color;
        } else {
            colorpicker.style.display = "none";
        }
    };

    var cancelColor = function(event) {
        event.stopPropagation();
        console.log("cancel color");

        document.getElementById(selected_component).getElementsByClassName("component-preview")[0].style.color = previous_color;
        previous_color = selected_color = null;
        toggleColorPicker();
    };

    var changeColor = function(cid, color) {
        console.log("Change color");

        var text = document.getElementById(cid).getElementsByClassName("component-preview")[0];
        text.style.color = color;

        slides.getComponent(cid).set({
            "color" : color
        });
    };

    var increaseFont = function(cid) {
        console.log("increase font");
        var component = document.getElementById(cid).getElementsByClassName("component-preview")[0];
        var size = parseFloat(component.style.fontSize.replace("em", ""));
        size = size + 0.2;
        console.log(size);
        component.style.fontSize = size + "em";
        slides.getComponent(cid).set("font_size", size);
    };

    var decreaseFont = function(cid) {
        console.log("decrease font");
        var component = document.getElementById(cid).getElementsByClassName("component-preview")[0];
        var size = parseFloat(component.style.fontSize.replace("em", ""));
        size = size - 0.2;
        console.log(size);
        component.style.fontSize = size + "em";
        slides.getComponent(cid).set("font_size", size);
    };

    var setFontSize = function(cid, size) {
        console.log("set font size");
        var component = document.getElementById(cid).getElementsByClassName("component-preview")[0];
        size = parseFloat(size);
        console.log(size);
        component.style.fontSize = size + "em";
        slides.getComponent(cid).set("font_size", size);
    };

    var changeContent = function(cid, content) {
        console.log("Change content");
        var component = document.getElementById(cid).querySelector(".component-content");
        component.innerHTML = content;
        slides.getComponent(cid).set("content", content);        
    };
        
    var addLink = function(link){
        var component = document.getElementById(selected_component).getElementsByClassName("component-preview")[0];
		var content = component.children[0].innerHTML;
		var template = document.getElementById("template-link").innerHTML;
		var data = {
			"link": link,
			"content": content
		};
		var view = Mustache.render(template, data);
		component.children[0].innerHTML = view;
		slides.getComponent(selected_component).set("content", view);
		$("#add-link-box").foundation("reveal","close");		
    };

    // Event functions
    var onClickBtnIncreaseFont = function(event) {
        event.stopPropagation();
        increaseFont(selected_component);
    };

    var onClickBtnDecreaseFont = function(event) {
        event.stopPropagation();
        decreaseFont(selected_component);
    };

    var onClickBtnApplyColor = function(event) {
        event.stopPropagation();
        changeColor(selected_component, selected_color);
        previous_color = selected_color = null;
        toggleColorPicker();
    };

    var onClickBtnBold = function(event) {
        event.stopPropagation();
        toggleBold(selected_component);
    };

    var onClickBtnItalic = function(event) {
        event.stopPropagation();
        toggleItalic(selected_component);
    };

    var onClickBtnUnderlined = function(event) {
        event.stopPropagation();
        toggleUnderlined(selected_component);
    };
    
    var onClickBtnLink = function(event) {
        event.stopPropagation();
		$("#add-link-box").foundation("reveal","open");
    };    
    
    var onClickAddTextLinkBtn = function(event){
		var link = document.getElementById("text-link").value;
		addLink(link);
    };

    return {
        toggleBold : toggleBold,
        toggleItalic : toggleItalic,
        toggleUnderlined : toggleUnderlined,
        toggleColorPicker : toggleColorPicker,
        cancelColor : cancelColor,
        changeColor : changeColor,
        increaseFont : increaseFont,
        decreaseFont : decreaseFont,
        setFontSize : setFontSize,
        changeContent : changeContent,
        addLink : addLink,
        onClickBtnIncreaseFont : onClickBtnIncreaseFont,
        onClickBtnDecreaseFont : onClickBtnDecreaseFont,
        onClickBtnApplyColor : onClickBtnApplyColor,
        onClickBtnBold : onClickBtnBold,
        onClickBtnItalic : onClickBtnItalic,
        onClickBtnUnderlined : onClickBtnUnderlined,
        onClickBtnLink : onClickBtnLink,
        onClickAddTextLinkBtn : onClickAddTextLinkBtn,
    };

});
