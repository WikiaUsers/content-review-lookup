/* Any JavaScript here will be loaded for all users on every page load. */

/*
    The Purpose of Common.js (JavaScript)
    1. Some scripts need configuration to work properly because they have default properties that you might want to change.
    1B. Check script documentation to understand and see what you can configure.
    2. Create your own features and functions (or just use ImportJS)

    Example

    window.ConfigNameFromAScript = {
    option: true,
    something: "blue"
    }

    window.HelloIAmJavaScriptConfigProperty = 8340;
*/

/* dev:UTCClock/code.js */
window.DisplayClockJS = {
    format: '%2H:%2M:%2S %{Sunday;Monday;Tuesday;Wednesday;Thursday;Friday;Saturday}w, %b %d (UTC)',
}

/* dev:LockOldComments.js */
window.lockOldComments = (window.lockOldComments || {});
window.lockOldComments.limit = 180;

/* dev:SpoilerTags.js */
window.spoilerTags = {
	unspoil: false,
    selection: true,
    tooltipText: "Reveal?",
    imageButtonText: "Spoiler"
};