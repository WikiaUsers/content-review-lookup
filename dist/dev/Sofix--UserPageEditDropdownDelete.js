$(function () {
	mw.user.getRights().then(function (array) {
	    if (array.includes('deleteprofilev3')) {
	        $('.page-header__contribution-buttons .wds-list li').has('#ca-protect, #ca-unprotect').after(
	            $('<li>', {
	                append: $('<a>', {
	                    href: mw.config.get('wgArticlePath').replace('$1', mw.config.get('wgPageName') + '?action=delete'),
	                    text: 'Delete'
	                })
	            })
	        );
	    }
	});
});