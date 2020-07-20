/**
 * @name            AddBlockUserTag
 * @version         v1.4
 * @author          TheGoldenPatrik1
 * @description     Adds a "block user" tag.
 */
(function () {
    if (
        !/sysop|staff|helper|vstf|global-discussions-moderator|wiki-manager/.test(mw.config.get('wgUserGroups').join()) ||
        !$('#UserProfileMasthead').exists() ||
        window.AddBlockUserTagLoaded
    ) {
        return;
    }
    window.AddBlockUserTagLoaded = true;
    /**
     * @method button
     * @description Creates the button
     * @param {String} text - The button text
     * @returns {void}
     */
    function button (text) {
        $('.UserProfileMasthead hgroup').append(
            $('<a>', {
                css: {
                    float: 'right',
                    color: 'inherit',
                    marginTop: '15px',
                    marginRight: '-15px',
                    textTransform: 'uppercase'
                },
                href:
                    mw.util.getUrl(
                        'Special:Block/' + $('.masthead-info h1').text()
                    ),
                text: text
            })
        );
    }
    /**
     * @method init
     * @description Loads Fetch
     * @param {Function} fetch - Variable for Fetch
     * @returns {void}
     */
    function init (fetch) {
        fetch('block').then(button);
    }
    mw.hook('dev.fetch').add(init);
    importArticle({
        type: 'script',
        article: 'u:dev:MediaWiki:Fetch.js'
    });
})();