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
require(['wikia.nirvana', 'jquery', 'mw'], function (nirvana, $, mw) {
    function useCssSelectorToCheckForWall(resolve, reject) {
        var wall = '.wds-global-navigation__dropdown-link[data-tracking-label="account.message-wall"]';

        if ($(wall).length === 0) {
            reject();
        } else {
            resolve();
        }
    }
    
    if (mw.config.get('wgMessageWallsExist') !== null) {
        return;
    }
    
    // Anons do not have access to WikiFeaturesController
    if (mw.user.anonymous()) {
        mw.config.set('wgMessageWallsExist', new Promise(useCssSelectorToCheckForWall));
        return;
    }

    mw.config.set('wgMessageWallsExist', new Promise(function (resolve, reject) {
        nirvana
            .getJson('WikiFeaturesSpecialController', 'index')
            .done(function (d) {
                var disabled =
                    d.features.filter(function (t) {
                        return t.name === 'wgEnableWallExt' && t.enabled;
                    }).length === 0;

                if (disabled) {
                    reject();
                } else {
                    resolve();
                }
            })
            .error(function () {
                useCssSelectorToCheckForWall(resolve, reject);
            });
    }));

    mw.hook('dev.enablewallext')
        .fire(mw.config.get('wgMessageWallsExist'));
});