// DateInsert
// Pretty simple script to add a button to insert a date to current document using Visual Editor insert drop down
(function (mw, $, ve) {
	"use strict";
	function addDate(){
		var surfaceModel = ve.init.target.getSurface().getModel();
		var selection = surfaceModel.getSelection();
		// If selection is an instance of ve.dm.LinearSelection (as opposed to NullSelection or TableSelection)
		// you can get a range (start and end offset) using:
		var range = selection.getRange();
		// range of text to replace (omit the end parameter to just insert at 'start')
		var rangeToRemove = new ve.Range(range.from);
		var fragment = surfaceModel.getLinearFragment(rangeToRemove);
		var jsonDate = (new Date()).toJSON();
		var formatedDate = jsonDate.substring(0, 10);
		fragment.insertContent(formatedDate);
	}
	mw.hook("ve.activationComplete").add(function () {
		$('<a class="oo-ui-tool-link" tabindex="0" role="button"><span class="oo-ui-iconElement-icon oo-ui-icon-table-insert"></span><span class="oo-ui-tool-title ve-custom-insertdate">Current date</span><span class="oo-ui-tool-accel" dir="ltr" lang="en"></span></a>').insertAfter(".oo-ui-tool-name-insertTable");
		$(".ve-custom-insertdate").on("click", function () {
			addDate();
		});
	});
    //Works when a keyboard shortcut ctrl + alt + d is pressed
	$(window).keydown(function(event) {
		if (event.which == 68 && event.ctrlKey && event.altKey && $(".ve-custom-insertdate").length && !$('.oo-ui-dialog:visible').length ) {
			addDate();
		}
	});
})(mediaWiki, jQuery, ve);