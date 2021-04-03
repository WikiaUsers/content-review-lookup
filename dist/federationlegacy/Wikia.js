/* Insert page header icons */

if(mw.config.get('wgVersion') !== '1.19.24' && $('#canon').length) {
	$('.page-header__contribution > div').first().append('<div id="header-icons"></div>').show();
	$('#header-icons').append($('#canon'));
    //$('#PageHeader').prepend('<div id="header-icons"></div>').show();
}

/* RevealAnonIP (dev wiki) */

window.RevealAnonIP = {
    permissions : ['rollback', 'sysop', 'bureaucrat']
};

/* Disabling "breadcrumb" tiered links for subpages in main namespace.
** Article titles there should be considered "flat", even if containing slashes.
** By: Bobogoobo of Memory Alpha */

$(function() {
    var $h2 = $('.WikiaPageHeader h2'), ismain = (mw.config.get('wgNamespaceNumber') === 0);
    if (ismain && $h2.children('a').length > 1) {
        $h2.html($h2[0].innerHTML.substring($h2[0].innerHTML.indexOf('|') + 1));
    } else if (ismain && $h2.text().indexOf('<') === 0) {
        $h2.remove();
    }
});