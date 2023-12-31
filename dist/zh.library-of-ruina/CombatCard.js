var page = document.getElementsByClassName("mw-parser-output")[0];	//所有页面内容的父元素
var pagePosition = page.getBoundingClientRect();	//用于计算相对位置
var pageLeft = pagePosition.left;
var pageTop = pagePosition.top;
var pageBottom = pagePosition.bottom;
var combatcards = document.getElementsByClassName("combatcard-tooltips-main");

function ChangeTooltipsPosition() {
	for (var index = 0; index < combatcards.length; index++) {
		var combatcardPosition = combatcards[index].getBoundingClientRect();
		var distant;	//相对位置
		distant = combatcardPosition.left - pageLeft;	//计算左侧相对位置
		if (distant < 0)	//即超出页面范围
		{
			combatcards[index].style.left = 'initial';
			combatcards[index].style.right = '-285px';
		}
		else
		{
			combatcards[index].style.left = '-255px';
			combatcards[index].style.right = 'initial';
		}
		distant = combatcardPosition.top - pageTop;
		if (distant < 0)
		{
			combatcards[index].style.top = (combatcards[index].style.top - distant - 150) + 'px';
		}
		distant = combatcardPosition.bottom - pageBottom;
		if (distant > 0)
		{
			combatcards[index].style.top = (combatcards[index].style.top - distant - 155) + 'px';
		}
	}
}
window.addEventListener('resize', ChangeTooltipsPosition);
ChangeTooltipsPosition();