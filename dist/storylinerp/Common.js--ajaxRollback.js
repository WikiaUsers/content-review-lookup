/* Any JavaScript here will be loaded for all users on every page load. */
// From Monchoman45
/* Rollback with Ajax - stolen from Grunny (see above) */
function SetAjaxRollback() {
	$('.mw-rollback-link').click(function(e) {
		e.preventDefault();
		var $rblink = $(this);
		var href = this.getElementsByTagName('a')[0].href;
		this.innerHTML = ' <img src="https://images.wikia.nocookie.net/dev/images/8/82/Facebook_throbber.gif" style="vertical-align: baseline;" border="0" alt="Rollbacking..." />';
		$.ajax({
			url: href,
			success: function() {
				$rblink.text(function (i, val) {return val + ' [success]';});
				loadPageData();
			},
			error: function() {
				$rblink.text(function (i, val) {return val + ' [failed]';});
				loadPageData();
			}
		});
	});
}
 
addOnloadHook(SetAjaxRollback);