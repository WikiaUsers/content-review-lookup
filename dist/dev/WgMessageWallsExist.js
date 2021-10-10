/**
 * wgMessageWallsExist
 * 
 * This script provides a new wgVariable that provides information on whether
 * or not the current wiki provides MessageWalls.
 * 
 * This is done by making an AJAX request to a Wikia controller or falling back
 * to selectors if that cannot be done.
 * 
 * @NOTE:
 *     This variable returns a Promise which means it cannot be used like the
 *     rest of the other config variables. Please see the usage below for more
 *     information on how to use this.
 * 
 * @Contributors:
 *     - KockaAdmiralac
 *     - Speedit
 *     - Colouratura
 * 
 * @Usage:
 *     mw.config.get('wgMessageWallsExist').then(
 *         function () {
 *             // Message walls do exist on this wiki
 *         },
 *         function () {
 *             // Message walls do not exist on this wiki
 *         }
 *     );
 */
mw.loader.using([ 'mediawiki.util', 'mediawiki.user' ]).then(function() {
    function useCssSelectorToCheckForWall(resolve, reject) {
        var wall = '.wds-global-navigation__user-menu a[data-tracking-label="account.message-wall"]';

        if ($(wall).length === 0) {
            reject();
        } else {
            resolve();
        }
    }
    
    if (mw.config.get('wgMessageWallsExist') !== null) {
        return;
    }
    
    mw.config.set('wgMessageWallsExist', new Promise(function (resolve, reject) {
        $.get(mw.util.wikiScript('wikia'), {
            controller: 'UserProfile',
            method: 'getUserData',
            format: 'json',
            // We assume User:Fandom will continue to exist for some time.
            userId: 4403388
        }).done(function (d) {
            if (d && d.userData && d.userData.messageWallUrl) {
                resolve();
            } else {
                reject();
            }
        }).fail(function () {
            useCssSelectorToCheckForWall(resolve, reject);
        });
    }));

    mw.hook('dev.enablewallext')
        .fire(mw.config.get('wgMessageWallsExist'));
});