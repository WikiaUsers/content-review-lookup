/* Any JavaScript here will be loaded for all users on every page load. */
$(function () {
    var ns = mw.config.get('wgNamespaceNumber');
    var pageName = mw.config.get('wgTitle'); 
    
    if (ns !== 0 && ns !== 1) return;
    if ($('.js-talk-header-added').length) return;

    // --- UNIVERSAL DARK MODE DETECTION ---
    var isDark = false;
    var bgColor = window.getComputedStyle(document.body).backgroundColor;
    if (bgColor) {
        var rgb = bgColor.match(/\d+/g);
        if (rgb) {
            var brightness = (parseInt(rgb[0]) + parseInt(rgb[1]) + parseInt(rgb[2])) / 3;
            isDark = brightness < 128;
        }
    }
    if ($('html').hasClass('skin-theme-clientpref-dark') || $('body').hasClass('skin-darkmode')) {
        isDark = true;
    }

    // --- DEFINE UNIVERSAL COLORS ---
var textCol = isDark ? '#ffffff' : '#3a3a3a';
    var linkCol = isDark ? '#ffffff' : '#3a3a3a';
    var redCol  = isDark ? '#ffffff' : '#3a3a3a'; 
    
    var borderCol = isDark ? '#ffffff' : '#aaaaaa';
    var bottomLine = isDark ? '#000000' : '#ffffff';

    var containerStyle = 'display:flex; border-bottom:2px solid ' + borderCol + '; font-size:95%; margin:0; line-height:1;';
    var activeTab      = 'padding:4px 10px; font-weight:bold; border:1px solid ' + borderCol + '; border-bottom:2px solid ' + bottomLine + '; margin-bottom:-2px; background:transparent; color:' + textCol + ' !important;';
    var inactiveTab    = 'padding:4px 10px; font-weight:normal; border:1px solid transparent; border-bottom:none; background:transparent; color:' + linkCol + ' !important; text-decoration:none;';

    var articleHTML, talkHTML;
    var articleLink = mw.util.getUrl(pageName);
    var talkLink = mw.util.getUrl('Talk:' + pageName);

    if (ns === 1) { 
        articleHTML = '<a href="' + articleLink + '" style="' + inactiveTab + '">Article</a>';
        talkHTML    = '<div style="' + activeTab + '">Talk</div>';
    } else { 
        articleHTML = '<div style="' + activeTab + '">Article</div>';
        // We give the Talk link the ID so the universal red fix can find it
        talkHTML    = '<a href="' + talkLink + '" id="custom-talk-link" style="' + inactiveTab + '">Talk</a>';
    }

    var header = '<div class="js-talk-header-added" style="' + containerStyle + '">' + articleHTML + talkHTML + '</div>';
    $('.page-header').after(header);

    // --- UNIVERSAL FIX FOR RED LINK ---
    if (ns === 0) {
        new mw.Api().get({
            action: 'query',
            titles: 'Talk:' + pageName,
            format: 'json'
        }).done(function (data) {
            if (data.query && data.query.pages && data.query.pages["-1"]) {
                // If missing, apply the light red (#ff6666) if dark, or deep red (#ba0000) if light
                $('#custom-talk-link').css('cssText', inactiveTab + ' color: ' + redCol + ' !important;');
            }
        });
    }
});