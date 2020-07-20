function checkWidthTimer() {
	window.setTimeout('checkWidth()',1000);
};
function checkWidth() {
	if (window.innerWidth<1000) {
		$(function () {
			$('#WikiaRail').addClass('WikiaRail-closed');
			$('#WikiaMainContent').addClass('WikiaMainContent-wide');
			$('#WikiHeader .buttons').addClass('buttons-closed');
		});
	}
	if (window.innerWidth>1000) {
		$(function () {
			$('#WikiaRail').removeClass('WikiaRail-closed');
			$('#WikiaMainContent').removeClass('WikiaMainContent-wide');
			$('#WikiHeader .buttons').removeClass('buttons-closed');
		});
	}
	checkWidthTimer();
}
window.onload=checkWidthTimer()