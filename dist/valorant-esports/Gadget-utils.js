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

window.displayOutputText = function(str, highlight) {
	var el = document.createElement('textarea');
	el.value = str;
	$(el).css('height', '200px')
		.attr('readonly', '')
		.attr('id', 'gadget-output-display');
	$(el).insertAfter('#contentSub');
	if (highlight) {
		el.select();
	}
}

window.clearOutputText = function() {
	$('#gadget-output-display').detach();
}

window.ucfirst = function(str) {
	return str[0].toUpperCase() + str.slice(1)
}

window.reportError = function(text) {
	var el = document.createElement('div');
	$(el).html(text).insertAfter($('#firstHeading'));
}