define(["Component"], function(Component) {

	var increaseSize = function(cid) {
		console.log("increase image");
		var component = document.getElementById(cid);
		var size = parseInt(component.style.width.replace("%", ""), 10);
		size = size + 2;
		component.style.width = size + "%";
		slides.getComponent(cid).set("size", size);
	};

	var decreaseSize = function(cid) {
		console.log("increase image");
		var component = document.getElementById(cid);
		var size = parseInt(component.style.width.replace("%", ""), 10);
		size = size - 2;
		component.style.width = size + "%";
		slides.getComponent(cid).set("size", size);
	};

	var setSize = function(cid, size) {
		console.log("set size");
		var component = document.getElementById(cid);
		component.style.width = parseInt(size, 10) + "%";
		slides.getComponent(cid).set("size", size);
	};

	// Event functions

	var onClickBtnIncrease = function(event) {
		event.stopPropagation();
		increaseSize(selected_component);
	};

	var onClickBtnDecrease = function(event) {
		event.stopPropagation();
		decreaseSize(selected_component);
	};

	return {
		increaseSize : increaseSize,
		decreaseSize : decreaseSize,
		onClickBtnIncrease : onClickBtnIncrease,
		onClickBtnDecrease : onClickBtnDecrease,
	};
});
