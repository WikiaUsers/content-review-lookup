// By Equazcion: http://terraria.gamepedia.com/User:Equazcion

var urlPre = 'http://terraria-fr.gamepedia.com';
var adminListPage = 'MediaWiki:AdminList.js';
mw.util.addCSS('a.admin-highlight { background-color: #CCF2F1; }');
$.get(urlPre + '/index.php?action=raw&ctype=application/json&title=' + adminListPage, function(data){
	var admins = data.split(",");
	$('#bodyContent a').each(function(){
		var $this = $(this);
		var user = $this.attr('href').replace(/\/User:/, '');
		if ($.inArray(user, admins) > -1) {
			$this.addClass('admin-highlight');
		}
	});
});