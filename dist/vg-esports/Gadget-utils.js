window.displayColor = function(colorclass, id) {
	if (! id) id = 'p-cactions';
    $("#" + id).addClass(colorclass);
    return;
}

window.clearDisplayColor = function(id) {
	if (! id) id = 'p-cactions';
	$("#" + id).removeClass("gadget-action-fail gadget-action-incomplete gadget-action-success");
}

window.displayResultStatus = function(displayClass, $el) {
	$el.addClass(displayClass);
	setTimeout(function() {
		$el.removeClass(displayClass);
	}, 5000);
}

window.startSpinner = function(el) {
	var spinner = document.createElement('div');
	$(spinner).addClass('loading-circle').attr('id', 'wip-spinner');
	$(spinner).insertAfter(el);
	return spinner;
}

window.startSpinnerChild = function(el) {
	var spinner = document.createElement('div');
	$(spinner).addClass('loading-circle').attr('id', 'wip-spinner');
	$(el).append(spinner);
	return spinner;
}

window.endSpinner = function() {
	$('#wip-spinner').remove();
}