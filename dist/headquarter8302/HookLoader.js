/**
 * @name HookLoader
 * @author Headquarter8302
 * @description Interface for loading multiple MediaWiki Hooks using a single promise
 * @version 1.0.0
 */
;(function (window, mw) {
    "use strict";
    window.dev = window.dev || {};
    window.dev.hooker = window.dev.hooker || { hasRan: false };
    if (window.dev.hooker.hasRan)
        return;
    window.dev.hooker.hasRan = true;
    const version = "1.0.0";
    console.log(`[HookLoader] Alive! version: ${version}`);
    mw.hook("dev.hookLoader").fire(Object.assign(window.dev.hooker, {
        /**
         * The version of the script
         * @type {string}
         * @constant
         */
        version: version,
        /**
         * All the hooks that have been given to the script. Please don't modify
         * @readonly
         * @type {string[]}
         */
        hooks: [],
        /**
         * Loads the given hooks and returns a promise that was in the input
         * @async
         * @param hooksToLoad An array of hooks to load and expect
         * @returns An object with the keys being the hook's name, and the values being said hook's respective output. `null` is reserved for hooks that return nothing
         */
        loadHooks: (hooksToLoad) => {
            console.time('[HookLoader/loadHooks]');
            console.debug(`[HookLoader] Reading hooks...`);
            window.dev.hooker.hooks = window.dev.hooker.hooks.concat(hooksToLoad);
            if (hooksToLoad.length === 1)
                console.warn(`[HookLoader] really? 1?`);
            const promises = hooksToLoad.map(hookName => {
                console.debug(`[HookLoader] Adding ${hookName}`);
                return new Promise((resolve, _reject) => {
                    mw.hook(hookName).add((hookData) => {
                        console.debug(`[HookLoader] ${hookName} added!`);
                        resolve(hookData === undefined ? null : hookData);
                    });
                });
            });
            return Promise.all(promises).then(hookResults => {
                console.log(`[HookLoader] All hooks loaded. Collecting results...`);
                const resultsObject = {};
                hooksToLoad.forEach((hookName, index) => {
                    console.debug(`[HookLoader] ${hookName} added to collection`);
                    resultsObject[hookName] = hookResults[index];
                });
                console.debug(`[HookLoader] Adieu!`);
                console.timeEnd('[HookLoader/loadHooks]');
                return resultsObject;
            });
        }
    }));
})(this, window.mediaWiki);