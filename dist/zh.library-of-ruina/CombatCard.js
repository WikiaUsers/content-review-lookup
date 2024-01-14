var page = document.getElementsByClassName('mw-parser-output')[0];
//var combatcards = document.getElementsByClassName('combatcard-main');
combatcards = document.getElementsByClassName('test-combatpage-main');

//const
var defaultTop = -140;		//tooltip的默认top属性值
var extraBottomDistance;	//tooltip在底部的额外距离
if (document.getElementsByClassName('mw-references-wrap').length != 0) {
	extraBottomDistance = 30;	//页面有注释时在底部额外空出30px距离
}
else {
	extraBottomDistance = 10;	//没有注释时也应空出10px
}
var effectMaxHeight = [178, 130, 82, 34];	//战斗书页使用时效果的最大高度

function adjustEffectHeight() {	//调整tooltip中战斗书页描述部分高度
	var elements = document.getElementsByClassName('test-combatpage-tooltip-right-content');
	for (var index = 0; index < elements.length; index++) {
		var element = elements[index];
		var maxHeight = effectMaxHeight[element.childElementCount - 2];
		var effect = element.children[0];
		if (effect.scrollHeight > maxHeight){
			effect.style.height = maxHeight + 'px';
		}
	}
}
function adjustTextSize() {	//Powered by ChatGPT
	var maxSize = 14; // 最大字体大小
	//var minSize = 10; // 最小字体大小
	var step = 1; // 调整的步长

	var elements = document.getElementsByClassName('test-combatpage-text');
	for (var index = 0; index < elements.length; index++) {
		var element = elements[index];
		if (element.classList.contains("test-combatpage-tooltip-right-content-dice-num")) {
			maxSize = 17;
		}
		else {
			maxSize = 14;
		}
		element.style.fontSize = maxSize + "px";
		var fontSize = maxSize;
		while (element.scrollHeight > element.clientHeight) {
			fontSize = fontSize - step;
			element.style.fontSize = fontSize + "px";
		}
	}
}
function fixTooltipPosition(main) {
	var tooltip = main.children[1];
	var tooltipHeight = 277;	//tooltip高度
	var tooltipWidth;		//tooltip宽度
	var leftExtra = 0;
	if (tooltip.childElementCount == 1) {	//无详情信息
		tooltipWidth = 204;
	}
	else if (tooltip.childElementCount == 2) {	//有详情信息
		tooltipWidth = 369;
	}
	else if (tooltip.childElementCount == 3) {	//有详情信息和关键字
		tooltipWidth = 573;
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
	distance = (combatcardPosition.top + tooltipHeight + defaultTop + extraBottomDistance) - pageBottom;
	if (distance > 0) {
		flag = false;
		tooltip.style.top = (defaultTop - distance) + 'px';
	}
	//不触及边界
	if (flag) {
		tooltip.style.top = defaultTop + 'px';
	}
}
function fixAllTooltipsPosition() {
	for (var index = 0; index < combatcards.length; index++) {
		if (combatcards[index].top != 0) {	//只修改可见的元素
			fixTooltipPosition(combatcards[index]);
		}
	}
}

//监测元素是否可见
var observer = new IntersectionObserver(function (entries, observe) {
	entries.forEach(function (entry) {
		if (entry.isIntersecting) {
			fixTooltipPosition(entry.target);
		}
	});
}, { threshold: 0 });	//即一旦元素可见就触发
for (var index = 0; index < combatcards.length; index++) {
	observer.observe(combatcards[index]);
}

//窗口变化时重新调整所有可见元素
window.addEventListener('resize', fixAllTooltipsPosition);

adjustEffectHeight();
adjustTextSize();