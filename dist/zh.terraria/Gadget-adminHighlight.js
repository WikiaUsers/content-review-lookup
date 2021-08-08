// By Equazcion: http://terraria.fandom.com/User:Equazcion

var server = mw.config.get("wgServer");
var adminListPage = 'MediaWiki:Gadget-adminHighlight/AdminList.json';

$.getJSON(server + '/' + adminListPage + '?action=raw', {}, function(data) {
	var admins = data.list.split(",");
	$('#mw-content-text a[title]').each(function() {
		var $this = $(this);
		var user = $this.attr('title').replace(/User:/, '');
		if ($.inArray(user, admins) > -1) {
			$this.addClass('admin-highlight');
		}
	});
});