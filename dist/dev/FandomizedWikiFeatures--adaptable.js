/* FandomizedWikiFeatures/adaptable.js
 * Changes color of toggles to adapt to a wiki's theme.
 * Dependent on FandomizedWikiFeatures.
 */
$(function() {
    if (window.FandomizedWikiFeaturesLoaded) {
        return;
    }
    window.FandomizedWikiFeaturesLoaded = true;
    // Adaptable Toggles
    var config = mw.config.get('wgSassParams');
    var colorButtons = config['color-buttons'];
    var colorLinks = config['color-links'];
    $('.WikiFeatures .features .feature .actions .slider.on').css('background-color', colorButtons);
    $('.WikiFeatures .features .feature .actions .slider.on .button').css({'background-color': colorButtons, 'filter':'brightness(150%)'});
    $('.WikiFeatures .features .feature .actions .feedback').css({'border-color': colorLinks, 'color': colorLinks});
    // Import dependencies
    importArticle({
        type: 'style',
        article: 'u:dev:MediaWiki:FandomizedWikiFeatures.css'
    });
});