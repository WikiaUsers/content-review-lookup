// By Equazcion: http://terraria.gamepedia.com/User:Equazcion

var urlPre = 'https://terraria-de.gamepedia.com';
var adminListPage = 'MediaWiki:AdminList.js';
$.get(urlPre + '/index.php?action=raw&ctype=application/json&title=' + adminListPage, function(data){
	var admins = data.split(",");
	$('#bodyContent a[href]').each(function(){
		var $this = $(this);
		var user = $this.attr('href').replace(/\/Benutzer:/, '');
		if ($.inArray(user, admins) > -1) {
			$this.addClass('admin-highlight');
		}
	});
});