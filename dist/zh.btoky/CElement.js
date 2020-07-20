$().ready(function(){
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "http://www.telize.com/jsonip?callback=checkIp";
    document.getElementsByTagName("head")[0].appendChild(script);
    createLeftMeun();
});
 
function createLeftMeun() {
	var div = document.createElement("div");
	$(div).attr("class", "leftMenu");
	$("#mw-content-text").prepend(div);
 
	var handBookDiv = document.createElement("div");
	$(handBookDiv).attr("class", "petsearch");
	$(handBookDiv).appendTo(div);
 
	var questDiv = document.createElement("div");
	$(questDiv).attr("class", "friend");
	$(questDiv).appendTo(div);
 
	var friendDiv = document.createElement("div");
	$(friendDiv).attr("class", "guild");
	$(friendDiv).appendTo(div);
 
	getMenuImage("\u53ec\u559a\u7378\u641c\u5c0bi.png", "\u53ec\u559a\u7378\u641c\u5c0b\u5668", "petsearch");
	getMenuImage("\u4ee3\u8868\u641c\u5c0bi.png", "\u4ee3\u8868\u641c\u5c0b\u5668", "friend");
	getMenuImage("\u516c\u6703\u641c\u5c0bi.png", "\u516c\u6703\u641c\u5c0b\u5668", "guild");
}
 
function getMenuImage(fileName, link, node) {
	$.get(mw.util.wikiScript('api'), {
		format: 'json',
		action: 'parse',
		text: decodeURI('%5B%5Bfile%3A' + fileName + '%7Clink=' + link + '%5D%5D')
	}, function (data) {
		var content = $(data.parse.text['*']).children();
		$(content).children().attr('width', '').attr('height', '');
		$("div.leftMenu ." + node).append(content);
	}, 'json');
}