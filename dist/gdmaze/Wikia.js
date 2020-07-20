window.AddRailModule = [{maxAge: 0}];

mw.hook('wikipage.content').add(function ($elem) {
    var $polls = $elem.filter('section.railModule.rail-module').find('.ajax-poll>form');
    if (!$polls.exists()) {
        return;
    }
    if (!window.AjaxPoll) {
        // AjaxPoll has not yet loaded.
        // Loading `ext.wikia.ajaxpoll` only gets us the CSS, and not the JS; see <https://github.com/Wikia/app/blob/release-868.001/extensions/wikia/AjaxPoll/AjaxPoll.php#L29-L33>.
        // Instead, we'll use JSSnippets; see <https://github.com/Wikia/app/blob/release-868.001/extensions/wikia/AjaxPoll/AjaxPoll_body.php#L234-L242>.
        JSSnippetsStack.push({
            dependencies: [
                "/extensions/wikia/AjaxPoll/css/AjaxPoll.scss",
                "/extensions/wikia/AjaxPoll/js/AjaxPoll.js",
            ],
            callback: function () {
                window.AjaxPoll.init();
            },
            id: "AjaxPoll.init",
        });
    } else if (window.AjaxPoll.initialized) {
        // AjaxPoll has already loaded, but we're not sure if _our_ polls have been wired up.
        // We'll manually wire ourselves up if we think it's necessary; see <https://github.com/Wikia/app/blob/release-869.001/extensions/wikia/AjaxPoll/js/AjaxPoll.js#L63-L82>.
        $polls.each(function () {
            var events = $._data(this, 'events');
            if (!events || !events.submit) {
                $(this).submit(window.AjaxPoll.submit);
            }
        });
    }
});