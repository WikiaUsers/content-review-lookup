$('#WikiaRail').prependTo('#WikiaArticle');

function checkWidthTimer() {
	window.setTimeout('checkWidth()',1000);
};
function checkWidth() {
	if (window.innerWidth<1000) {
		$(function () {
			$('#WikiaRail').addClass('WikiaRail-closed');
		});
	}
	if (window.innerWidth>1000) {
		$(function () {
			$('#WikiaRail').removeClass('WikiaRail-closed');
		});
	}
	checkWidthTimer();
}
window.onload=checkWidthTimer()