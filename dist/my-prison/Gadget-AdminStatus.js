/*
 * Checks whether admins were active within the last 55 days
 * and updates the element on the page.
 */
(function ($, mw) {
    'use strict';

    const PAGE = 'My_Prison_Wiki:Staff';
    if (mw.config.get('wgPageName') !== PAGE) { 
    	console.warn(`[AdminStatus] The title of the current page (${mw.config.get('wgPageName')}) does not match the expected page (${PAGE}); script interrupted.`);
    	return;
    }

    if (mw.config.get('wgAction') !== 'view') return;

    const DAYS_LIMIT = 55;
    const api = new mw.Api();

    function cutoffDate() {
        const d = new Date();
        d.setDate(d.getDate() - DAYS_LIMIT);
        return d;
    }

    function lastEdit(user) {
        return api.get({
            action: 'query',
            list: 'usercontribs',
            ucuser: user,
            uclimit: 1,
            ucprop: 'timestamp'
        }).then(function (data) {
            const contribs = data.query && data.query.usercontribs;
            return (contribs && contribs.length) ? new Date(contribs[0].timestamp) : null;
        });
    }

    // Latest log action by the user: blocks, deletions, protections, rights changes, etc
    function lastLogAction(user) {
        return api.get({
            action: 'query',
            list: 'logevents',
            leprop: 'timestamp',
            leuser: user,
            lelimit: 1
        }).then(function (data) {
            const events = data.query && data.query.logevents;
            return (events && events.length) ? new Date(events[0].timestamp) : null;
        });
    }

    function checkUser(user) {
        return $.when(lastEdit(user), lastLogAction(user))
            .then(function (edit, log) {
                const dates = [edit, log].filter(Boolean);
                if (!dates.length) return false;
                const mostRecent = new Date(Math.max.apply(null, dates));
                return mostRecent > cutoffDate();
            });
    }

    // Group elements to avoid repeating API calls
    const byUser = {};
    $('.user-status').each(function () {
        const $el = $(this);
        const user = $el.data('user');
        if (!user) return;

        $el.addClass('status-loading').text('Loading...');

        if (!byUser[user]) byUser[user] = [];
        byUser[user].push($el);
    });

    Object.keys(byUser).forEach(function (user) {
        const $elements = byUser[user];

        checkUser(user).done(function (isActive) {
            $elements.forEach(function ($el) {
                $el.removeClass('status-loading')
                    .addClass(isActive ? 'status-active' : 'status-inactive')
                    .text(isActive ? 'Active' : 'Inactive');
            });
        }).fail(function () {
            $elements.forEach(function ($el) {
                $el.removeClass('status-loading')
                    .addClass('status-error')
                    .text('Error');
            });
        });
    });

})(jQuery, mediaWiki);