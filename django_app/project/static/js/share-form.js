var addCollaborator = function() {
	var template = $("#template-collaborator-row").html();
	var view = Mustache.render(template, {
		'id' : Math.random()
	});
	$("#collaborators").append(view);
};

$("#add-collaborator-btn").on("click", function() {
	var empty_form = $("#empty-form").html();
	var total_forms = parseInt($('#id_form-TOTAL_FORMS').val());
	empty_form = empty_form.replace(/__prefix__/g, total_forms);
	$('#id_form-TOTAL_FORMS').val(total_forms + 1);
	$("#collaborators").append(empty_form);
});

$(".btn-unshare").on("click", function(event) {
	event.preventDefault();
	$(this).parent().parent().hide();
	$.post(this.href);
});
