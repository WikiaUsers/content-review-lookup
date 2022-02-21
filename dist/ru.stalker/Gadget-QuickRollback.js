//<nowiki>
//Modified from [[wikipedia:User:BenjaminWillJS/AjaxRollback.js]]
//Copied from [[wikipedia:User:Abelmoschus Esculentus/AjaxRollback.js]]
function ajaxrollback() {
	$('span.mw-rollback-link').click(function(e) {
		e.preventDefault();
		var $rblink = $(this);
		var href = this.getElementsByTagName('a')[0].href;
		this.innerHTML = '<img src="https://upload.wikimedia.org/wikipedia/commons/4/42/Loading.gif" style="vertical-align: baseline;" height="10" width="10" border="0" alt="Rollingback..." />';
		$.ajax({
			url: href,
			success: function() {
				$rblink.text(function (i, val) {return val + '✓';});
			},
			error: function() {
				$rblink.text(function (i, val) {return val + '✗';});
			}
		});
	});
}

$.when($.ready).then(function () {
	mw.hook('wikipage.content').add(ajaxrollback);
});