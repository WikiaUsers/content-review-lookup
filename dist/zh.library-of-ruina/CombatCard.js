var page = document.getElementsByClassName('mw-parser-output')[0];
//var combatcards = document.getElementsByClassName('combatcard-main');
combatcards = document.getElementsByClassName('test-combatpage-main');

//const
var defaultTop = -140;		//tooltip的默认top属性值
if (document.getElementsByClassName('mw-references-wrap').length != 0) {
	var extraDistance = 30;	//页面有注释时在底部额外空出30px距离
}
else {
	var extraDistance = 10;	//没有注释时也应空出10px
}

function FixTooltipPosition(main) {
	var tooltip = main.children[1];
	var tooltipHeight = 227;	//tooltip高度
	var tooltipWidth;		//tooltip宽度
	var leftExtra = 0;
	if (tooltip.childElementCount == 1) {	//无详情信息
		tooltipWidth = 204;
	}
	else if (tooltip.childElementCount == 2) {	//有详情信息
		tooltipWidth = 372;
	}
	else if (tooltip.childElementCount == 3) {	//有详情信息和关键字
		tooltipWidth = 576;
		leftExtra = 204;
		var keywordCount = tooltip.children[2].childElementCount;	//关键字数量
		if (keywordCount >= 4) {
			tooltipHeight = 68 * keywordCount + 20;
		}
		else {
			tooltipHeight = 235;	//227 + 8
		}
	}

	//获取parser-output的位置
	var pagePosition = page.getBoundingClientRect();
	var pageLeft = pagePosition.left;
	var pageRight = pagePosition.right;
	var pageTop = pagePosition.top;
	var pageBottom = pagePosition.bottom;

	var combatcardPosition = main.getBoundingClientRect();
	var mainWidth = main.getBoundingClientRect().width;
	var distance;	//相对位置
	//左
	distance = (combatcardPosition.left - tooltipWidth + leftExtra) - pageLeft;
	if (distance < 0) {
		tooltip.style.left = mainWidth + 'px';
		distance = (combatcardPosition.left + mainWidth + tooltipWidth) - pageRight;
		if (distance > 0) {
			tooltip.style.left = (mainWidth - distance) + 'px';
		}
	}
	else {
		tooltip.style.left = (- tooltipWidth + leftExtra) + 'px';
		distance = (combatcardPosition.left + leftExtra) - pageRight;
		if (distance > 0) {
			tooltip.style.left = (- tooltipWidth + leftExtra - distance) + 'px';
		}
	}
	var flag = true;	//标记其没有触及上下边界
	//上
	distance = (combatcardPosition.top + defaultTop) - pageTop;
	if (distance < 0) {
		flag = false;
		tooltip.style.top = (defaultTop - distance) + 'px';
	}
	//下
	distance = (combatcardPosition.top + tooltipHeight + defaultTop + extraDistance) - pageBottom;
	if (distance > 0) {
		flag = false;
		tooltip.style.top = (defaultTop - distance) + 'px';
	}
	//不触及边界
	if (flag) {
		tooltip.style.top = defaultTop + 'px';
	}
}
function FixAllTooltipsPosition() {
	for (var index = 0; index < combatcards.length; index++) {
		if (combatcards[index].top != 0) {	//只修改可见的元素
			FixTooltipPosition(combatcards[index]);
		}
	}
}

//监测元素是否可见
var observer = new IntersectionObserver(function (entries, observe) {
	entries.forEach(function (entry) {
		if (entry.isIntersecting) {
			FixTooltipPosition(entry.target);
		}
	});
}, { threshold: 0 });	//即一旦元素可见就触发
for (var index = 0; index < combatcards.length; index++) {
	observer.observe(combatcards[index]);
}

//窗口变化时重新调整所有可见元素
window.addEventListener('resize', FixAllTooltipsPosition);