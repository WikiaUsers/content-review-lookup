/* Re-add proper namespace prefix to titles where it has been removed "by design" */
$('.ns-5 .page-header__title').prepend('Memory Alpha ');
$('.ns-6 .page-header__title').prepend('File:');
$('.ns-7 .page-header__title').prepend('File ');
$('.ns-8 .page-header__title').prepend('MediaWiki:');
$('.ns-9 .page-header__title').prepend('MediaWiki ');
$('.ns-10 .page-header__title').prepend('Template:');
$('.ns-11 .page-header__title').prepend('Template ');
$('.ns-13 .page-header__title').prepend('Help ');
$('.ns-14 .page-header__title').prepend('Category:');
$('.ns-15 .page-header__title').prepend('Category ');

/* Disabling "breadcrumb" tiered links for subpages in main namespace.
** Article titles there should be considered "flat", even if containing slashes.
** See: [[Memory Alpha talk:Subpages]]. By: [[User:Bobogoobo]]. */
/**
$(function() {
    var $h2 = $('.WikiaPageHeader h2'), ismain = (mw.config.get('wgNamespaceNumber') === 0);
    if (ismain && $h2.children('a').length > 1) {
        $h2.html($h2[0].innerHTML.substring($h2[0].innerHTML.indexOf('|') + 1));
    } else if (ismain && $h2.text().indexOf('<') === 0) {
        $h2.remove();
    }
});
**/