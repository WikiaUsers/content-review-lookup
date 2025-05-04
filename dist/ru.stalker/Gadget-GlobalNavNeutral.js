/* Fix of unclickable navigation menu for gadget */
window.addEventListener('load', function() {
	document.getElementById('community-navigation').removeAttribute('inert');
});