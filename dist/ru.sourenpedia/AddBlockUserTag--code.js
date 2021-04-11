/**
 * @name            AddBlockUserTag
 * @version         v1.4
 * @author          TheGoldenPatrik1
 * @description     Adds a "block user" tag.
 */
(function () {
    if (
        !/sysop|staff|helper|global-discussions-moderator|wiki-manager|soap/.test(mw.config.get('wgUserGroups').join()) ||
        $('#UserProfileMasthead, #userProfileApp').length === 0 ||
        window.AddBlockUserTagLoaded
    ) {
        return;
    }
    window.AddBlockUserTagLoaded = true;
    /**
     * @method findContainer
     * @description Finds the tag container to append the button to
     * @returns {$.Deferred} Promise to be resolved when the container is found
     */
    function findContainer() {
        var promise = $.Deferred(),
            interval = setInterval(function() {
                var $element = $('#userProfileApp .user-identity-header__attributes, #UserProfileMasthead hgroup');
                if ($element.length) {
                    clearInterval(interval);
                    promise.resolve($element);
                }
            }, 300);
        return promise;
    }
    /**
     * @method button
     * @description Creates the button
     * @param {String} text - The button text
     * @returns {void}
     */
    function button (text, $container) {
        var username = mw.config.get('profileUserName') ||
                       $('.masthead-info h1').text();
        $container.append(
            $('<a>', {
                'class': 'tag user-identity-header__tag',
                'css': {
                    float: 'right',
                    color: 'inherit',
                    marginTop: '15px',
                    marginRight: '-15px'
                },
                'href':
                    mw.util.getUrl(
                        'Special:Block/' + username
                    ),
                'text': text
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
        $.when(fetch('block'), findContainer())
            .then(button);
    }
    mw.hook('dev.fetch').add(init);
    importArticle({
        type: 'script',
        article: 'u:dev:MediaWiki:Fetch.js'
    });
})();