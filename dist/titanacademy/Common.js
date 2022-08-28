/* For icon templates, such as [[Template:IconFA]] */
$(function () {
	var icons = $('#icons');
    if (icons.length) {
        $('.page-header__meta').after(icons);
        icons.show();
    }
});