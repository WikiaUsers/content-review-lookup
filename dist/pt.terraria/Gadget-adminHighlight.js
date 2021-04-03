// By Equazcion: http://terraria.gamepedia.com/User:Equazcion

var urlPre = 'https://terraria-pt.gamepedia.com';
var adminListPage = 'MediaWiki:AdminList.json';
var request1 = {
	action:"query",
	prop:"revisions",
	titles:adminListPage,
	rvprop:"content",
	formatversion:"2"
}
$.getJSON(urlPre + '/api.php?format=json', request1, function(data){
	var $json = $.parseJSON(data.query.pages[0].revisions[0].content);
	var admins = $json.list.split(",");
	$('#bodyContent a[title]').each(function(){
		var $this = $(this);
		var user = $this.attr('title').replace(/User:/, '');
		if ($.inArray(user, admins) > -1) {
			$this.addClass('admin-highlight');
			$this.css('background-color','#CCF2F1')
		}
	});
});