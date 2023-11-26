(function($) {
	var wikiname="ff14rp";
	console.log("喵喵页面数",$('#mw-pages ul li, .category-page__members .category-page__member > a').length);
	$('#mw-pages ul li a, .category-page__members .category-page__member > a').each(function() {
		//console.log("喵喵尝试获取标题",this,$(this).text());
		$.get("https://"+wikiname+".fandom.com/zh/api.php?format=json&action=query&prop=pageimages&titles="+$(this).text(),function(data){
			//console.log("喵喵看看能搞个什么鬼东西",data);
			for(var id in data.query.pages) {
				var title=data.query.pages[id].title;
				//console.log("喵喵应该是图片地址了",title,data.query.pages[id].thumbnail.source);
				$("a[title="+title+"]").first().html("<img src='"+data.query.pages[id].thumbnail.source+"' class='cicon-image2'><span>"+title+"</span>");
			}
		});
	});
}(jQuery));