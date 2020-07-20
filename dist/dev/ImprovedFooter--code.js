/* Improved Fandom footer
 * @author Monochromatic Bunny
 * PERSONAL USE ONLY
*/
(function ($, mw) {
    if (window.ImprovedFooterLoaded) {
        return;
    }
    window.ImprovedFooterLoaded = true;

    importArticle({
        type: 'style', 
        article: 'u:dev:MediaWiki:ImprovedFooter.css'
    });
    
    // move bottom bar to the top
    var elm = $('.wds-global-footer__bottom-bar');
    $('.wds-global-footer').prepend(elm);
    
    // change Community link so that the user's preferences can determine which page they land on first
    $('a.wds-global-footer__link[data-tracking-label="community.community-central"]').prop('href', 'https://community.fandom.com');
    
    // change Support link to direct user towards current wiki's S:C page
    $('a.wds-global-footer__link[data-tracking-label="company-overview.contact"]').prop('href', mw.config.get('wgScriptPath') + '/wiki/Special:Contact');
})(jQuery, mediaWiki);