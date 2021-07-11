// Reload page with level specification
// Author: Gako

$(function () {
	function APIthing() {
		// If we ever use this gadget outside of the "main" namespace then we don't want to precede the name of the page with a ':'
		// So if current namespace number is 0 (i.e. main) then add a ':' before the pageName, otherwise don't
		var includePage = mw.config.get('wgNamespaceNumber') === 0 ? ':' + mw.config.get('wgPageName') : mw.config.get('wgPageName');
		var text = "{{#vardefine:mygamestage|" + inputValue + "}}{{" + includePage + "}}";
		var api = new mw.Api();
		api.get({
			action : "parse",
			title: mw.config.get('wgPageName'),
			text : text,
			prop : "text"
		}).then(function(data){
			var result = data.parse.text['*'];
			// define the container as a variable cos we'll use it twice
			var $container = $("#mw-content-text .mw-parser-output .mw-parser-output");
			$container.html(result);
			// this line of code makes the wiki reload the code that makes a table sortable after we replace the content of the page
			mw.hook('wikipage.content').fire($container);
		});
	}
	$("#level-entry-submit").click(function (event) {
		var checkValue = $("#level-entry-level").val();
		var inputVal;
		if (isNaN(checkValue) || checkValue>999999 || checkValue<0) {
			inputValue = 1
		} else {
			inputValue = $("#level-entry-level").val();
		}
		event.preventDefault();
		// we'll always show the current game stage on the page as part of the header, so that people know it starts out as 1
		$('#level-entry-current').html(inputValue);
		APIthing();
	});
});