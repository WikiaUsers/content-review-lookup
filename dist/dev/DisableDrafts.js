/* DisableDrafts
 *
 * Completely disables draft saving, and always clears all drafts from localStorage
 * Obviously, it's for personal use
 * I'm sure staff would love to know why you use this and what does the extension lack that drives people to using this kinda stuff
 * But hey, I'm a script hog, not a feedback giver
 * 
 * @author Dorumin
 */

(function() {
    // Remove all saved drafts regardless of whether you're editing or not
    Object.keys(localStorage).forEach(function(key) {
        // Sure hope nobody else uses this naming scheme
        if (key.slice(-6) == '-draft') {
            localStorage.removeItem(key);
        }
    });

    if (!['edit', 'submit'].includes(mw.config.get('wgAction'))) return;

    // Define the module again.
    // This won't override the previously defined module, but will catch message walls
    // They have wgAction === "edit" but don't have the module defined
    // A try..catch around the require call doesn't do the trick, async?
    // Or I dunno, the module could be renamed/deleted, you never know ¯\_(ツ)_/¯
    define('EditDraftSaving', $.noop);

    require(['EditDraftSaving'], function(eds) {
        // Check for our previous mock module that returns undefined
        // We didn't actually use define.mock 'cause it sucks
        if (eds) {
            eds.storeDraft = $.noop;
        }

        // I mean, all keys should have been removed so no actual load attempts could've passed
        // But while we're at it, why not?
        $('#draft-restore-message #discard').click();
    });
})();