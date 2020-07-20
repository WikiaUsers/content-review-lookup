/* Re-add proper namespace prefix to titles where it has been removed "by design" */
$('.ns-5 .WikiaPageHeader h1').prepend('Memory Alpha ');
$('.ns-6 .WikiaPageHeader h1').prepend('File:');
$('.ns-7 .WikiaPageHeader h1').prepend('File ');
$('.ns-8 .WikiaPageHeader h1').prepend('MediaWiki:');
$('.ns-9 .WikiaPageHeader h1').prepend('MediaWiki ');
$('.ns-10 .WikiaPageHeader h1').prepend('Template:');
$('.ns-11 .WikiaPageHeader h1').prepend('Template ');
$('.ns-13 .WikiaPageHeader h1').prepend('Help ');
$('.ns-14 .WikiaPageHeader h1').prepend('Category:');
$('.ns-15 .WikiaPageHeader h1').prepend('Category ');

/* Disabling "breadcrumb" tiered links for subpages in main namespace.
** Article titles there should be considered "flat", even if containing slashes.
** See: [[Memory Alpha talk:Subpages]]. By: [[User:Bobogoobo]]. */
$(function() {
    var $h2 = $('.WikiaPageHeader h2'), ismain = (mw.config.get('wgNamespaceNumber') === 0);
    if (ismain && $h2.children('a').length > 1) {
        $h2.html($h2[0].innerHTML.substring($h2[0].innerHTML.indexOf('|') + 1));
    } else if (ismain && $h2.text().indexOf('<') === 0) {
        $h2.remove();
    }
});

/* Dată şi oră */
importArticle({type:'script', article:'w:c:dev:DisplayTimer/code.js'});