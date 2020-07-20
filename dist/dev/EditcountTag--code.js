/**
 * EditcountTag.js
 *
 * Adds editcount tags to the masthead
 * @author: [[w:User:Slyst]]
 */
(function() {
    if (!$('#UserProfileMasthead').exists() || window.EditcountTagLoaded) {
        return;
    }
    window.EditcountTagLoaded = true;
    function init(text) {
        $('<a>', {
            css: {
                float: 'right',
                color: 'inherit',
                marginTop: '15px',
                marginRight: '-15px',
                textTransform: 'uppercase'
            },
            href: mw.util.getUrl('Special:Editcount/' + $('.masthead-info h1').text()),
            text: text
        }).appendTo('.UserProfileMasthead hgroup');
    }
    mw.hook('dev.fetch').add(function(fetch) {
        fetch('editcount').then(init);
    });
    importArticle({
        type: 'script',
        article: 'u:dev:MediaWiki:Fetch.js'
    });
})();