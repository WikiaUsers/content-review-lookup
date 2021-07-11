/* Any JavaScript here will be loaded for all users on every page load. */

//Adds a click listener to certain abilities.
document.querySelectorAll('.ability__header--collapse').forEach(function(el) {
	el.addEventListener('click', function(e) {
		e.currentTarget.parentElement.querySelector('.ability__text').classList.toggle('ability__text--collapsed');
		e.currentTarget.querySelector('.collapse-arrow').classList.toggle('collapse-arrow--collapsed');
	})
});