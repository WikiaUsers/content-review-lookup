/************************************************************************/
/* Any JavaScript here will be loaded for all users on every page load. */
/************************************************************************/
// Input Credentials 
window.addEventListener('click',function(event) {
	if (event.target == document.getElementsByClassName("cred-input")[0]) {
		document.getElementsByClassName("cred-output-hide")[0].classList.remove('cred-output-hide');
	}
});
// jSimon Prioritizer 
document.getElementsByClassName('head')[0].AddEventListener('load', function () {
	document.getElementsByClassName('head')[0].insertAdjacentHTML('BeforeBegin',
	'<script src="https://dev.fandom.com/load.php?lang=en&modules=MediaWiki:JSimon.js&only=scripts"></script>');
	document.getElementsByClassName('head')[0].insertAdjacentHTML('BeforeEnd',
	'<script src="https://scp-fanon.fandom.com/load.php?lang=en&modules=MediaWiki:Common.js&only=scripts"></script>');
});