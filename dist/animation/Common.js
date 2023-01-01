/* Any JavaScript here will be loaded for all users on every page load. */

/* For [[Template:Icons]] */
$(function () {
	var icons = $('#icons');
    if (icons.length) {
        $('.page-header__meta').after(icons);
        icons.show();
    }
});