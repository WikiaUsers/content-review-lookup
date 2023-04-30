/************************************************************************/
/* Any JavaScript here will be loaded for all users on every page load. */
/************************************************************************/
window.addEventListener('load', function(e) {
	for (var i = 0; i < document.getElementsByClassName('user-identity-header__tag').length; i++) {
		if (document.getElementsByClassName('user-identity-header__tag')[i].innerHTML === 'Bureaucrat')document.getElementsByClassName('user-identity-header__tag')[i].innerHTML = 'A Class Personnel';
		}
});