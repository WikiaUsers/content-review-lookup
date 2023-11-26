//来源: https://ff14rp.fandom.com/zh/wiki/MediaWiki:CategoryIcon.js
(function($) {
	var wikiname="yuriworks";
	console.log("喵喵页面数",$('#mw-pages ul li').length);
	$('#mw-pages ul li a').each(function() {
		//console.log("喵喵尝试获取标题",this,$(this).text());
		$.get("https://"+wikiname+".fandom.com/zh/api.php?format=json&action=query&prop=pageimages&pithumbsize=100&titles="+$(this).text(),function(data){
			//console.log("喵喵看看能搞个什么鬼东西",data);
			for(var id in data.query.pages) {
				var title=data.query.pages[id].title;
				//console.log("喵喵应该是图片地址了",title,data.query.pages[id].thumbnail.source);
				$("a[title="+title+"]").first().html("<div class='cicon-image-mask'></div><img src='"+data.query.pages[id].thumbnail.source+"' class='cicon-image2'><span>"+title+"</span>");
			}
		});
	});
}(jQuery));