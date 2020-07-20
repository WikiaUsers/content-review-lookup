/**
 * AddUserRightsTag.js
 *
 * Adds easy way to add user rights on the masthead
 * @author: [[w:User:Algorithmz]]
 * fork of EditcountTag
 */
(function() {
    var config = mw.config.get([
        'wgUserGroups',
        'wgUserLanguage'
    ]);
    if (
        !/bureaucrat|sysop|staff|helper/.test(mw.config.get('wgUserGroups').join()) ||
        !$('#UserProfileMasthead').exists() ||
        window.AddUserRightsTagLoaded
    ) {
        return;
    }
    window.AddUserRightsTagLoaded = true;
    function init(text) {
        $('<a>', {
            css: {
                float: 'right',
                color: 'inherit',
                marginTop: '15px',
                marginRight: '-15px',
                textTransform: 'uppercase'
            },
            href: mw.util.getUrl('Special:UserRights/' + $('.masthead-info h1').text()),
            text: text
        }).appendTo('.UserProfileMasthead hgroup');
    }
    mw.hook('dev.fetch').add(function(fetch) {
        fetch('userrights').then(init);
    });
    importArticle({
        type: 'script',
        article: 'u:dev:MediaWiki:Fetch.js'
    });
})();