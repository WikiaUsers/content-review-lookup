/*
 * @module          dynamicOldNav.js
 * @description     Hides global navigation bar and shows it on hover/panning.
 * @author          Polymeric
 * @license         CC-BY-SA 3.0
 * @todo            Add a clear hint of the existence of the global nav bar,
 *                  such as a button in the sticky nav bar.
*/

;(function(mw) {
    'use strict';

    // Double run protection.
    if (window.dynamicOldNavLoaded) return;

    window.dynamicOldNavLoaded = true;

    importArticle({ article: 'u:dev:MediaWiki:dynamicOldNav.css' });

    const head = document.head;
    const body = document.body;
    const globalNavBar = document.querySelector('.global-navigation');
    var pointerType = window.matchMedia('(pointer: coarse)');

    // First pointer check upon script execution.
    if (globalNavBar && matchMedia('(pointer: coarse)').matches) {
        dynamicOldNavInit();
    }

    // Subsequent pointer checks in case the user changes their pointer type in
    // the page (e.g. using devTools).
    pointerType.onchange = function (e) {
        if (e.matches) {
            dynamicOldNavInit();

            if (window.dynamicOldNavDebug) {
                console.log('[dev:dynamicOldNav] Touch controls are enabled!');
            }
        } else {
            if (window.dynamicOldNavDebug) {
                console.log('[dev:dynamicOldNav] Touch controls are disabled!');
            }

            return;
        }
    };

    function dynamicOldNavInit() {

        if (window.dynamicOldNavDebug) {
            console.log('[dev:dynamicOldNav] Debug mode is enabled!');

            const debugCSS = '<style id="DON-debug-css">\nbody.skin-fandomdesktop > .global-navigation::before {\n    background-color: orange;\n}\n\nbody.global-navigation-is-visible > .global-navigation::before {\n    background-color: lime;\n}\n\n@media only screen and (pointer: fine) {\n	body.skin-fandomdesktop > .global-navigation:hover::before {\n		background-color: lime;\n	}\n}\n\n.global-navigation::after {\n    background-color: hotpink;\n}\n</style>';

            head.insertAdjacentHTML('beforeend', debugCSS);
        }

        globalNavBar.addEventListener('pointerdown', toggleNavBar);

        function toggleNavBar() {
            body.classList.toggle('global-navigation-is-visible');
        }
    }
}(window.mediaWiki));