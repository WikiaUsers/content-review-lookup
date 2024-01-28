$(function () {
	//consts
	//页面
	var globalNavigationWidth = 66;	//左侧导航栏宽度
	var scrollbarWidth = 14;	//滚动条宽度

	//tooltip整体
	//var tooltipDefaultTop = -140;	//tooltip的默认top属性值

	//tooltip-left和tooltip-right
	var tooltipLeftWidth = 204;
	var tooltipLeftHeight = 277;
	var tooltipRightWidth = 204;
	//var tooltipRightHeight = 277;	//tooltip-left和tooltip-right的高度和宽度（一样，为可读性分离）
	var tooltipLeftRightDistance = -39;	//tooltip-left和tooltip-right之间的间距（为负）
	var tooltipRightExtraHeight = 5;	//因tooltip-right的top属性值（5px）额外添加的高度

	//tooltip-right-content
	var tooltipRightContentRowMax = 5;	//战斗书页右侧content内的最大行数
	var tooltipRightContentRowHeight = 48;	//战斗书页右侧content内每一行的高度

	//tooltip-keywords
	var tooltipKeywordsWidth = 260;	//tooltip-keywords宽度
	var tooltipRightKeywordsDistance = -12;	//tooltip-right和tooltip-keywords之间的间距（为负）
	var tooltipKeywordsExtraTopHeight = 10;	//因tooltip-keywords额外在顶部添加的高度
	var tooltipKeywordsKeywordHeight = 88;	//tooltip-keywords-keyword的高度
	var tooltipKeywordsKeywordDistance = -10;	//tooltip-keywords-keyword之间的间距

	//main start
	var page = $("body");		//页面主元素
	var mains = $(".combatpage-main");	//战斗书页主元素
	mains.find("a").removeAttr("title");
	mains.one("mouseenter", function () {
		var main = $(this);
		if (main.attr("data-pageid") != undefined) {
			appendTooltip(main);
			//adjustTooltipPosition(main);	//在appendTooltip内作为回调函数执行
			//adjustEffectHeight(main);
			//adjustTextSize(main);
		}
		else {
			adjustTooltipPosition(main);
			adjustEffectHeight(main);
			adjustTextSize(main);
		}
	});
	mains.mouseenter(function () {
		adjustTooltipPosition($(this));
	});
	//main end

	//functions
	//向页面添加悬浮窗
	//main是combatpage-main的jQuery对象
	function appendTooltip(main) {
		var ID = main.attr("data-pageid");
		if (ID == undefined) return;
		$.ajax({
			url: "/zh/api.php",
			data: {
				action: 'parse',
				text: "{{#invoke:Sandbox|combatPageTooltip|ID=" + ID + "}}",
				format: 'json'
			},
			dataType: 'jsonp',
			success: function (data) {
				var templateContent = data.parse.text['*'];
				var tooltip = $(templateContent).children().eq(0).children().eq(0);
				main.append(tooltip);
				//回调
				adjustTooltipPosition(main);
				adjustEffectHeight(main);
				adjustTextSize(main);
			}
		});
	}

	//调整combatpage-main内的tooltip位置使其不超出边界显示
	//main是combatpage-main的jQuery对象
	function adjustTooltipPosition(main) {
		var tooltipMain = main.children().eq(1);	//tooltip主元素

		var width;	//tooltip宽度
		var height;	//tooltip高度
		var extraTopHeight;		//tooltip上方额外高度
		var extraBottomHeight;	//tooltip下方额外高度
		var extraLeft;	//left属性补正
		switch (tooltipMain.children().length) {
			case 1:	//只有tooltip-left
				width = tooltipLeftWidth;
				height = tooltipLeftHeight;
				extraTopHeight = 0;
				extraBottomHeight = 0;
				extraLeft = 0;
				break;
			case 2:	//有tooltip-left和tooltip-right
				width = tooltipLeftWidth + tooltipLeftRightDistance + tooltipRightWidth;
				height = tooltipLeftHeight + tooltipRightExtraHeight;
				extraTopHeight = 0;
				extraBottomHeight = tooltipRightExtraHeight;
				extraLeft = 0;
				break;
			case 3:	//有tooltip-left、tooltip-left和tooltip-keywords
				width = tooltipLeftWidth + tooltipLeftRightDistance + tooltipRightWidth + tooltipRightKeywordsDistance + tooltipKeywordsWidth;
				var keywordNum = tooltipMain.children().eq(2).children().length;	//关键字数量
				if (keywordNum < 4) {
					height = tooltipLeftHeight + tooltipRightExtraHeight + tooltipKeywordsExtraTopHeight;
					extraTopHeight = tooltipKeywordsExtraTopHeight;
					extraBottomHeight = tooltipRightExtraHeight;
				}
				else {
					height = tooltipKeywordsKeywordHeight * keywordNum + tooltipKeywordsKeywordDistance * (keywordNum - 1);
					extraTopHeight = tooltipKeywordsExtraTopHeight;
					extraBottomHeight = height - extraTopHeight - tooltipLeftHeight;
				}
				extraLeft = tooltipRightKeywordsDistance + tooltipKeywordsWidth;
				break;
			default:
				break;
		}
		if (page.outerWidth() - globalNavigationWidth < width || page.outerHeight() < height) {
			tooltipMain.css("display", "none");
			return;
		}
		else {
			tooltipMain.css("display", "inline-block");
		}

		var pagePosition = page.offset();
		var mainPosition = main.offset();

		var pageLeft = pagePosition.left + globalNavigationWidth;
		var pageRight = pagePosition.left + page.outerWidth() - scrollbarWidth;
		//var pageTop = pagePosition.top;
		//var pageBottom = pageTop + page.outerHeight();

		var mainLeft = mainPosition.left;
		var mainRight = mainLeft + main.outerWidth();
		//var mainTop = mainPosition.top;
		//var mainBottom = mainTop + main.outerHeight();

		//正常显示时tooltip各边界相对page各边界的相对距离
		//按惯例，这里的right和bottom不是到页面右和下边界的距离，而是到左和上边界距离加上宽度和高度
		var leftDistance = (mainLeft - width + extraLeft) - pageLeft;												//在边界内时 > 0
		var rightDistance = (mainLeft + extraLeft) - pageRight;														//在边界内时 < 0
		//var topDistance = (mainTop + tooltipDefaultTop - extraTopHeight) - pageTop;									//在边界内时 > 0
		//var bottomDistance = (mainTop + tooltipLeftHeight + extraBottomHeight + tooltipDefaultTop) - pageBottom;	//在边界内时 < 0

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
		////上下
		//tooltipMain.css("top", tooltipDefaultTop + "px");
		////上
		//if (topDistance < 0) {
		//	tooltipMain.css("top", (tooltipDefaultTop - topDistance) + "px");
		//}
		////下
		//if (bottomDistance > 0) {
		//	tooltipMain.css("top", (tooltipDefaultTop - bottomDistance) + "px");
		//}
	}

	//调整一个combatpage-main内combatpage-right-content-effect的高度
	//main是combatpage-main的jQuery对象
	function adjustEffectHeight(main) {
		var content = main.children().eq(1).children().eq(1).children().eq(0);
		var effect = content.children().eq(0);
		if (effect.hasClass("combatpage-tooltip-right-content-effect") == false) return;

		var diceNum = content.children().length - 1;	//骰子总数
		var effectRowNum = Math.ceil(effect.prop("scrollHeight") / tooltipRightContentRowHeight);	//在以正常大小显示时，effect所占行数

		if (diceNum + effectRowNum > tooltipRightContentRowMax) {
			effectRowNum = Math.max(tooltipRightContentRowMax - diceNum, 1);	//压缩描述文字所用的行数，最小为一行
		}
		effect.css("height", effectRowNum * tooltipRightContentRowHeight + "px");
	}

	//调整一个combatpage-main内的所有combatpage-text文字大小，使其不超出特定大小的元素
	//main是combatpage-main的jQuery对象
	function adjustTextSize(main) {
		var texts = main.find(".combatpage-text");
		texts.each(function () {
			var text = $(this);
			var maxSize;		//最大font-size大小
			var minSize = 1;	//最小font-size大小
			if (text.hasClass("combatpage-tooltip-right-content-dice-num")) {
				maxSize = 17;
			}
			else {
				maxSize = 13.5;
			}
			var step = 1;	//步长
			var fontSize = maxSize;	//当前文字大小
			do {
				text.css("font-size", fontSize + "px");
				fontSize = fontSize - step;
			} while (text.prop("scrollHeight") > text.prop("clientHeight") || fontSize < minSize);
		});
	}
});