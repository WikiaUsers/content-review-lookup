/* Any JavaScript here will be loaded for all users on every page load. */
AjaxRCRefreshText = 'Auto-Refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
window.ajaxSpecialPages = ["Recentchanges", "WikiActivity", "Log", "AbuseLog"];
abuseLogRC_users = ['', ''];
abuseLogRC_collapsible = true;
abuseLogRC_entries = 5;
 
importArticles({
    type: 'script',
    articles: [
        'u:monchbox:MediaWiki:Torus.js',
        'u:kocka:MediaWiki:SiderailSpoilerWarning/code.js'
    ]
});
 
/**
 * Loading UserTags from a page with JSON
 */
$.get(mw.util.wikiScript('load'), {
    mode: 'articles',
    articles: 'MediaWiki:Custom-user-tags',
    only: 'styles'
}, function(d) {
    window.UserTagsJS = JSON.parse(d.replace(/\/\*.*\*\//g, ''));
});
 
$(function() {
    // Allows the entire box on Help:Contents to be clickable
    // Taken from Community Central
    if (mw.config.get('wgPageName') === 'Help:Contents') {
        $('.centralhelpbox').click(function() {
            window.location.href = '/wiki/Help:' + $(this).attr('data-link');
        });
    }
 
    // Snippet for Template:Username
    if(mw.config.get('wgUserName')) {
        $('.insertusername').html(mw.config.get('wgUserName'));
    }
 
    // When people tell me to open RP boards -_-
    if(mw.config.get('wgCanonicalSpecialPageName') === 'Forum') {
        $.get(mw.util.wikiScript('index'), {
            title: 'MediaWiki:Custom-roleplaying-board',
            action: 'render'
        }, function(d) {
            $('.boards').append(d);
        });
    }
});