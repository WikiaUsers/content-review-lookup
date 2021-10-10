// page that contains the list of admins on this wiki:
var adminListPage = 'MediaWiki:Gadget-adminHighlight/AdminList.json';

// load array of admins
$.getJSON(mw.config.get('wgServer') + '/' + adminListPage + '?action=raw', {}, function(data) {
	// add 'User:' to each admin name
	var admins = data.map(function(username) { return 'User:' + username; });
	// for each link with a title attribute:
	$('#mw-content-text a[title]').each(function() {
		var $this = $(this);
		var thisuser = $this.attr('title');
		// check if the title attribute is in the list of admins
		if ($.inArray(thisuser, admins) > -1) {
			$this.addClass('admin-highlight');
		}
	});
});