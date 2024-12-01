$(function () {
	var globalNavigationWidth = 66;	//左侧导航栏宽度
	var scrollbarWidth = 14;	//滚动条宽度

	//tooltip-left和tooltip-right
	var tooltipLeftWidth = 450;
	var tooltipLeftHeight = 317;
	var tooltipRightWidth = 0;
	var tooltipLeftRightDistance = -39;	
	var tooltipRightExtraHeight = 5;	


	var page = $("body");		//页面主元素
	var mains = $(".Keypage");	//核心书页主元素
	mains.find("a").removeAttr("title");
	mains.one("mouseenter", function () {
		var main = $(this);
		if (main.attr("data-pageid") != undefined) {
			appendTooltip(main);
		}
		else {
			adjustTooltipPosition(main);
			adjustEffectHeight(main);
		}
	});
	mains.mouseenter(function () {
		adjustTooltipPosition($(this));
	});
	
	function appendTooltip(main) {
		var ID = main.attr("data-pageid");
		if (ID == undefined) return;
		$.ajax({
			url: "/zh/api.php",
			data: {
				action: 'parse',
				text: "{{#invoke:Keypages|keypageTooltip|ID=" + ID + "}}",
				format: 'json'
			},
			dataType: 'jsonp',
			success: function (data) {
				var templateContent = data.parse.text['*'];
				var tooltip = $(templateContent).children().eq(0).children().eq(0);
				main.append(tooltip);
				//回调
				adjustTooltipPosition(main);
			}
		});
	}
	function adjustTooltipPosition(main) {
		var tooltipMain = main.children().eq(1);	//tooltip主元素

		var width;	//tooltip宽度
		var height;	//tooltip高度
		var extraTopHeight;		//tooltip上方额外高度
		var extraBottomHeight;	//tooltip下方额外高度
		var extraLeft;	//left属性补正
		switch (tooltipMain.children().length) {
			case 1:	
				width = tooltipLeftWidth;
				height = tooltipLeftHeight;
				extraTopHeight = 0;
				extraBottomHeight = 0;
				extraLeft = 0;
				break;
			case 2:	
				width = tooltipLeftWidth + tooltipLeftRightDistance + tooltipRightWidth;
				height = tooltipLeftHeight + tooltipRightExtraHeight;
				extraTopHeight = 0;
				extraBottomHeight = tooltipRightExtraHeight;
				extraLeft = 0;
				break;
			case 3:	
				width = tooltipLeftWidth + tooltipLeftRightDistance + tooltipRightWidth;
				height = tooltipLeftHeight + tooltipRightExtraHeight;
				extraLeft = 0;
				break;
			default:
				break;
		}

		var pagePosition = page.offset();
		var mainPosition = main.offset();

		var pageLeft = pagePosition.left + globalNavigationWidth;
		var pageRight = pagePosition.left + page.outerWidth() - scrollbarWidth;

		var mainLeft = mainPosition.left;
		var mainRight = mainLeft + main.outerWidth();

		//正常显示时tooltip各边界相对page各边界的相对距离
		//按惯例，这里的right和bottom不是到页面右和下边界的距离，而是到左和上边界距离加上宽度和高度
		var leftDistance = (mainLeft - width + extraLeft) - pageLeft;
		var rightDistance = (mainLeft + extraLeft) - pageRight;	

		//左右
		if (leftDistance > 0) {	//左侧空间足够
			if (rightDistance < 0) {	//右侧空间足够
				tooltipMain.css("left", (- width + extraLeft) + "px");	//正常显示在左侧
			}
			else {	//右侧空间不足
				tooltipMain.css("left", ((- width + extraLeft) - rightDistance) + "px");
			}
		}
		else {	//左侧空间不足，准备显示在右侧
			rightDistance = (mainRight + width) - pageRight;
			if (rightDistance < 0) {	//右侧空间足够
				tooltipMain.css("left", "initial");	//显示在右侧
			}
			else {	//右侧空间亦不足
				tooltipMain.css("left", ((- width + extraLeft) - leftDistance) + "px");
			}
		}
	}
});