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

    // Event functions
    var onClickBtnIncreaseFont = function(event) {
        event.stopPropagation();
        increaseFont(selected_component);
    };

    var onClickBtnDecreaseFont = function(event) {
        event.stopPropagation();
        decreaseFont(selected_component);
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

    return {
        toggleBold : toggleBold,
        toggleItalic : toggleItalic,
        toggleUnderlined : toggleUnderlined,
        increaseFont : increaseFont,
        decreaseFont : decreaseFont,
        setFontSize : setFontSize,
        onClickBtnIncreaseFont : onClickBtnIncreaseFont,
        onClickBtnDecreaseFont : onClickBtnDecreaseFont,
        onClickBtnBold : onClickBtnBold,
        onClickBtnItalic : onClickBtnItalic,
        onClickBtnUnderlined : onClickBtnUnderlined,
        onClickBtnLink : onClickBtnLink,
    };

});
