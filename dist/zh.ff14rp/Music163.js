mw.hook("wikipage.content").add(function($content) {
	var music163 = document.getElementsByClassName("music163");//div列表
	if (music163.length==0) return;
	for (var i = 0; i < music163.length; i++) {
		console.log("开始处理网易云音乐",music163[i]);
		var id = music163[i].textContent;
		var iframe = document.createElement("iframe");
		iframe.frameborder = "no";
		iframe.border = "0";
		iframe.marginwidth = "0";
		iframe.marginheight = "0";
		iframe.width=330;
		iframe.height=86;
		iframe.src = "//music.163.com/outchain/player?type=2&id="+id+"&auto=0&height=66";
		var parent = music163[i].parentNode;
		parent.replaceChild(iframe, music163[i]);
	}
});