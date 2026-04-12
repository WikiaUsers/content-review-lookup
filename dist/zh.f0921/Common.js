//为什么这么久了还没有F0921的人员发现MediaWiki有common.js这个玩意啊（悲）
//design: Stellux
//made by: Maxmaaaaaaaaaa
//如果不知道javascript怎么写请别tm动这些瞎jb写的鬼东西行吗
$(function(){//这段是搞“竞赛”的那个byd东西的效果的
	$('#title-competition').click(function(e) {
		e.preventDefault();
		$('#competition-content').toggle();
	});
})();