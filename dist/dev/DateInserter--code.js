// DateInsert
// Pretty simple script to add a button to insert a date to current document using Visual Editor insert drop down
(function (mw, $, ve) {
	'use strict';
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
	mw.hook('ve.activationComplete').add(function () {
		var iconCSS = 'url(\'data:image/svg+xml,%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 width%3D%2218%22 height%3D%2218%22 viewBox%3D%220 0 18 18%22%3E%3Ctitle%3Edate-insert%3C%2Ftitle%3E%3Cpath d%3D%22M12.294 15.059h2.824v-1.883h-2.824v1.883zm-9.412 0h2.824v-1.883H2.882v1.883zM5.706 3.765v.94a.94.94 0 1 0 1.882 0v-.94h2.824v.94a.94.94 0 1 0 1.882 0v-.94h2.824v3.764H2.882V3.765h2.824zm6.588 7.53h2.824V9.411h-2.824v1.882zm-9.412 0h2.824V9.411H2.882v1.882zm4.706 3.764h2.824v-1.883H7.588v1.883zm0-3.765h2.824V9.412H7.588v1.882zm8.47-9.412h-3.764v-.94a.94.94 0 1 0-1.882 0v.94H7.588v-.94a.94.94 0 1 0-1.882 0v.94H1.94a.94.94 0 0 0-.94.942V16c0 .52.422.941.941.941H16.06A.94.94 0 0 0 17 16V2.824a.94.94 0 0 0-.941-.942z%22%2F%3E%3C%2Fsvg%3E\') no-repeat center';
		$('<span class="oo-ui-widget oo-ui-iconElement oo-ui-tool oo-ui-widget-enabled oo-ui-tool-name-insertDate" style="user-select: none"><a tabindex="0" aria-disabled="false" class="oo-ui-tool-link" role="button"><span class="oo-ui-tool-checkIcon oo-ui-widget oo-ui-widget-enabled oo-ui-iconElement oo-ui-iconElement-icon oo-ui-icon-check oo-ui-labelElement-invisible oo-ui-iconWidget" aria-disabled="false"></span><span class="oo-ui-iconElement-icon" style="-webkit-mask: ' + iconCSS + '; mask: ' + iconCSS +'"></span><span class="oo-ui-tool-title ve-custom-insertdate">Current date</span><span class="oo-ui-tool-accel" dir="ltr" lang="en"></span></a></span>').insertAfter('.oo-ui-tool-name-insertTable');
		$('.oo-ui-tool-name-insertDate').on('click', function () {
			addDate();
		});
	});
    // Works when a keyboard shortcut ctrl + alt + d is pressed
	$(window).keydown(function(event) {
		if (event.which == 68 && event.ctrlKey && event.altKey && $('.oo-ui-tool-name-insertDate').length && !$('.oo-ui-dialog:visible').length ) {
			addDate();
		}
	});
})(mediaWiki, jQuery, ve);