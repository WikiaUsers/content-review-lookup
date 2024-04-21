// ======================
//      AbuseLog in RC
// ======================
/*  Originally created by "User:Suppa chuppa" on https://runescape.fandom.com/wiki/User:Suppa_chuppa/abuselog.js
    Edited and improved by User:leviathan_89
    api documentation: /api.php?query=list
    example: https://community.fandom.com/api.php?action=query&list=abuselog&afllimit=4&afldir=older&aflprop=ids|filter|user|title|result|timestamp|details|hidden&format=jsonfm
    (remove "|details" from the query if you do not have the rights)

    thnx Nanaki for the help!
*/

mw.loader.using(['jquery.makeCollapsible'], function() {
    var config, i18n,                                    // configuration
        refreshTimer, refreshCycle, itemSince, itemIds;  // state

    //
    // Functions
    //

    // Call API
    function callAPI(data, callback) {
        data.format = 'json'; // add the format to the given data query
        data.action = 'query';

        $.getJSON(mw.util.wikiScript('api'), data)
            .done(function(response) {
                if (response.error) {
                    $('#abErrorsLog ul')
                        .empty()   // clears errors log
                        .append($('<li>', {
                            text: new Date().toLocaleTimeString() + ' - ' +
                                  i18n.msg('apiError').plain() + ' ' +
                                  response.error.info
                        }));
                    $('#abAutoRefresh').prop('checked', false);
                    loadComplete();
                } else {
                    callback(response);
                }
            })
            .fail(function(xhr, error) {
                $('#abErrorsLog ul')
                    .empty()      // clears errors log
                    .append($('<li>', {
                        text: new Date().toLocaleTimeString() + ' - ' +
                              i18n.msg('ajaxError').plain() + ' ' +
                              error
                    }));
                $('#abAutoRefresh').prop('checked', false);
                loadComplete();
            });
    }

    // Converts number of seconds in time string
    function secondsToString(seconds , mode){
        var d = (Math.floor(seconds / 86400) > 0) ? Math.floor(seconds / 86400) + 'd ' : '',
            h = (Math.floor((seconds % 86400) / 3600) > 0) ? Math.floor((seconds % 86400) / 3600) + 'h ' : '',
            m = (Math.floor(((seconds % 86400) % 3600) / 60) > 0) ? Math.floor(((seconds % 86400) % 3600) / 60) + 'm ' : '',
            s = ((seconds % 86400) % 3600) % 60 + 's';

        if (seconds < 300 && mode != 'timestamp'){
            return i18n.msg('newAccount').escape();
        } else {
            return  d + h + m + s;
        }
    }

    // Change table sorting
    function changeOrder(){
        if (config.order == 'older') {
            // Change to 'newer'
            config.order = 'newer';
            $('#abSorting').empty().text('↓');
            refreshData();
        } else {
            // Change to 'older'
            config.order = 'older';
            $('#abSorting').empty().text('↑');
            refreshData();
        }
    }

    // Add urgency class
    function urgencyClass(timeNew, timeOld) {
        timeDifference = timeNew - timeOld;

        if (timeDifference <= config.timeFrame1) {
            return 'abUrgency1';
        } else {
            if (timeDifference <= config.timeFrame2) {
                return 'abUrgency2';
            } else {
                if (timeDifference <= config.timeFrame3) {
                    return 'abUrgency3';
                } else {
                    return 'abUrgency4';
                }
            }
        }
    }

    // Change number of entries
    function updateEntriesNumber(number) {
        if ( !isNaN(number) ) {
            config.entries = Math.max(1, number);
            refreshData();
        }
    }

    // load Complete - sets the auto-refresh time interval
    function loadComplete() {
        if ($('#abAutoRefresh:checked').length) {
            window.clearTimeout(refreshTimer);
            refreshTimer = window.setTimeout(loadData, config.interval * 1000);
        }
        // Update last update status
        $('#ab_update .mw-ajax-loader').hide();
        $('#abLastUpdate').text((new Date()).toLocaleTimeString());
    }

    // Change auto-refresh time interval
    function updateIntervalTime(number) {
        if ( !isNaN(number) ) {
            // Change interval
            config.interval = Math.max(5, number);

            // Update text
            $('#abAutoRefreshText').text(i18n.msg('autoRefresh', config.interval).plain());

            // Restart cycle
            loadData();
        }
    }

    // Refresh Data - clears the table and reset everything
    function refreshData(){
        $('#abHeader').nextAll().remove();      // clears table rows
        $('#abErrorsLog ul').empty();           // clears errors log
        refreshCycle = 0;                       // reset refresh cycle control
        itemIds = [];
        itemSince = null;
        loadData();
    }

    // loadData - load new data for the table
    function loadData() {
        // After some auto-refresh do an hard refresh to update the HTML if there weren't any new items in a while
        if ( refreshCycle >= 60 ) {
            refreshData();
            return;
        }

        // Show loading image
        $('#ab_update .mw-ajax-loader').show();

        // Define query
        var itemQuery;
        if ( config.userRights.canViewAFLDetails && config.userInfo ) {
            itemQuery = {
                'afllimit': config.entries,
                'afldir': 'older',
                'action': 'query',
                'list': 'abuselog',
                'aflprop': 'ids|user|title|action|result|filter|timestamp|details|hidden'
            };
        } else {
            itemQuery = {
                'afllimit': config.entries,
                'afldir': 'older',
                'action': 'query',
                'list': 'abuselog',
                'aflprop': 'ids|user|title|action|result|filter|timestamp|hidden'
            };
        }


        // Select only new items
        if (itemSince) {
            itemQuery.itemend = itemSince;
        }
        // Get data
        callAPI(itemQuery, function(response) {
            for (var i in response.query.abuselog) {
                var item = response.query.abuselog[i];

                // Remove duplicates which may occur during autorefresh
                if ($.inArray(item.id, itemIds) > -1) {
                    continue;
                }
                if(itemIds.length >= config.entries) {
                    refreshData();
                }
                itemIds.push(item.id);

                // Time
                // query timestamps are UTC in ISO format
                var now  = new Date(),
                    then = new Date(item.timestamp),
                    date = then.toLocaleDateString(),
                    time = then.toLocaleTimeString();

                // Set time limit for next requests
                itemSince = item.timestamp;

                // Create item details if viewer has permission, checks with personal configuration and item is not an anon
                var tableUserExtraLinks = '';

                // NB: UCP doesn't always give us the user's groups, so we'll heuristically assume that any username that _doesn't_ look like an IP address is probably a user.
                if ( config.userRights.canViewAFLDetails && config.userInfo && ((!mw.util.isIPAddress(item.user)) || /(user)/.test(item.details.user_groups)) ) {
                    var userExtraLinks = [];

                    if (item.details.user_editcount != null) {
                        // NB: UCP wikis provide an inaccurate edit count.
                        userExtraLinks.push(
                            '<span title="' + i18n.msg('ucpGlobalEditsTooltip').escape() + '">' + i18n.msg('globalEdits').escape() + '&nbsp;&ge;&nbsp;' + item.details.user_editcount + '</span>'
                        );
                    }

                    // UCP wikis no longer seem to provide this variable. Bug or intentional, who knows?
                    if (item.details.user_age != null) {
                        var userAge = secondsToString(item.details.user_age);
                        userExtraLinks.push('<span title="' + mw.msg('abusefilter-edit-builder-vars-user-age') + '">' + i18n.msg('age').escape() + '&nbsp;' + userAge + '</span>');
                    }

                    if (userExtraLinks.length) {
                        tableUserExtraLinks = '<span class="abExtraLinks">(' + userExtraLinks.join(' &bull; ') + ')</span>';
                    }
                }

                // Create cells HTML
                var alUrl = mw.util.getUrl('Special:AbuseLog');
                var tableCellTime = '<td rowspan="2" class="abItemTime" >' + date + '<br/>' + time + '</td>';
                var tableCellPage =
                        '<td class="abItemPage">' +
                            '<a href="' + mw.util.getUrl(item.title) + '" target="_blank">' + item.title + '</a>' + '&nbsp;' +
                            '<span class="abExtraLinks" style="text-transform:lowercase;">(' +
                                (config.userRights.canViewAFLDetails ? ('<a href="' + alUrl + '/' + item.id + '" target="_blank">' +  mw.msg('abusefilter-log-detailslink') + '</a> &bull; ') : '') +
                                mw.msg('abusefilter-edit-warn-actions') + '&nbsp;' + mw.msg('abusefilter-action-' + item.result) + ')' +
                            '</span>' +
                        '</td>';

                var tableCellUser =
                        '<td class="abItemUser">' +
                            '<a href="' + mw.util.getUrl('User:' + item.user) + '" target="_blank">' + item.user + '</a> ' + tableUserExtraLinks +
                        '</td>';

                var tableCellFilter =
                        '<td class="abItemFilterID">' +
                            (config.userRights.canViewAFLDetails ? ('<a href="' + alUrl + '?wpSearchFilter=' + item.filter_id + '" title="' + mw.msg('abusefilter-log-summary') + '" target="_blank">') : '') + i18n.msg('triggeredFilter').escape() + '&nbsp;' + item.filter_id + (config.userRights.canViewAFLDetails ? '</a>' : '') +
                            ' - ' +
                            (config.userRights.canViewAF ? ('<a href="' + mw.util.getUrl('Special:AbuseFilter') + '/' + item.filter_id + '" title="' + mw.msg('abusefilter-history-public') + '" target="_blank">') : '') + item.filter + (config.userRights.canViewAF ? '</a>' : '') +
                        '</td>';

                var tableCellTools =
                        '<td class="abItemTools">&raquo; ' +
                            '<a href="' + mw.util.getUrl('User_talk:' + item.user) + '" target="_blank">' + mw.msg('talkpagelinktext') + '</a> &bull; ' +
                            '<a href="' + mw.util.getUrl('Special:Contributions/' + item.user) + '" target="_blank">' + mw.msg('contribslink') + '</a> &bull; ' +
                            '<a href="' + alUrl + '?wpSearchUser=' + item.user + '" title="' + mw.msg('abusefilter-log-linkoncontribs-text') + '" target="_blank">' + mw.msg('abusefilter-log-linkoncontribs') + '</a> &bull; ' +
                            '<a href="//soap.fandom.com/wiki/" target="_blank" title="' + i18n.msg('soapTooltip').escape() + '">SOAP</a>' +
                            (config.userRights.canBlock ? (' &bull; <a href="' + mw.util.getUrl('Special:Block/' + item.user) + '" target="_blank">' + mw.msg('blocklink') + '</a>') : '') +
                        '</td>';

                // Create table row HTML
                var urgency = urgencyClass(now.getTime(), then.getTime()),
                    timeDiff = Math.floor( (now.getTime() - then.getTime()) / 1000 ), // debugging purpose
                    tableRow =
                        '<tr class="abItemRow abItemRowReport abItemRowFilter' + item.filter_id + ' ' + urgency + '" data-time-ago="' + secondsToString(timeDiff , 'timestamp') + '">' +
                            tableCellTime + tableCellPage + tableCellUser +
                        '</tr>' +
                        '<tr class="abItemRow abItemRowDetails abItemRowFilter' + item.filter_id + ' ' + urgency + '">' +
                            tableCellFilter + tableCellTools +
                        '</tr>';

                // Insert row in table
                if (config.order == 'older') {
                    $('#abHeader').after(tableRow);
                } else {
                    $('#abData').append(tableRow);
                }
            }
            refreshCycle++;
            loadComplete();
        });
    }

    // CreateHTML body
    function createTableHTML() {

        // Create table container and place it
        var container = '<div id="ab_options"></div><div id="ab_main"></div>';

        if (config.position == 'after') {
            $('#mw-content-text').after(container);
        } else {
            $('#mw-content-text').before(container);
        }

        // Table options
        $('#ab_options').empty().append(
            '<fieldset class="collapsible">' +
                '<legend>' + i18n.msg('optionsHeader').escape() + '</legend>' +
                '<form>' +
                    '<div class="abRefresh">' +
                        '<input type="checkbox" id="abAutoRefresh" checked="checked" /> <label for="abAutoRefresh" id="abAutoRefreshText">' + i18n.msg('autoRefresh', config.interval).parse() + '</label>' +
                        '&nbsp;<input type="text" name="abIntervalTime" id="abIntervalTime" style="width:50px;">&nbsp;' +
                        '<input type="button" id="abSetIntervalButton" value="' + i18n.msg('changeButton').escape() + '">' +
                        '<input type="button" id="abRefresh" title="' + i18n.msg('refreshButtonDesc').escape() + '" value="' + i18n.msg('refreshButton').escape() + '" style="margin-left:5px;">' +
                        '<div id="ab_update" style="float:right;">' +
                            '<span class="mw-ajax-loader"></span> ' +
                            '<span style="font-weight:bold;">' + i18n.msg('lastUpdate').escape() + '</span>&nbsp;<span id="abLastUpdate"></span>' +
                        '</div>' +
                    '</div>' +
                '</form>' +
                '<form>' +
                    '<div class="abEntries"">' +
                        i18n.msg('changeNumber').escape() +
                        '&nbsp;<input type="text" name="abEntriesNumber" id="abEntriesNumber" style="width:50px;">&nbsp;' +
                        '<input type="button" id="abSetEntriesButton" value="' + i18n.msg('changeButton').escape() + '">' +
                        '<div class="abDocumentation" style="float:right; font-size:10px;"><a href="' + mw.util.getUrl('Special:AbuseLog') + '" target="_blank">' + mw.msg('abusefilter-topnav-log') + '</a> &bull; <a href="//dev.fandom.com/wiki/AbuseLogRC" target="_blank">' + i18n.msg('devLink').escape() + '</a></div>' +
                    '</div>' +
                '</form>' +
                '<div id="abErrorsLog" style="display:block;"><ul></ul></div>' +
            '</fieldset>'
        );

        // Insert table in container
        $('#ab_main').empty().append(
            '<table id="abData" class="wikitable mw-collapsible" style="width:100%; font-size:14px;">' +
                '<tr id="abHeader">' +
                    '<th style="cursor:pointer;"><span id="abSorting"></span>&nbsp;' + mw.msg('abusefilter-history-timestamp') + '</th>' +
                    '<th>' + mw.msg('listfiles_name') + '</th>' +
                    '<th>' + mw.msg('abusefilter-history-user') + '</th>' +
                '</tr>' +
            '</table>'
        );

        // Add sorting icon
        if (config.order == 'older') {
            $('#abSorting').text('↑');
        } else {
            $('#abSorting').text('↓');
        }

        // Bind functions
        $('#abRefresh').click(refreshData);                     // refresh button
        $('#abSetEntriesButton').click(function() {
                var newNumber = $('#abEntriesNumber').val();
                updateEntriesNumber(newNumber);
            }
        );                                                      // entries button
        $('#abSetIntervalButton').click(function() {
                var newTime = $('#abIntervalTime').val();
                updateIntervalTime(newTime);
            }
        );                                                      // refresh interval button
        $('#abHeader th:first').click(changeOrder);             // sorting options

        // Make table collapsible
        if ( config.collapsible ) {
            $('#ab_main table.mw-collapsible').makeCollapsible();
        }

        // Get data
        loadData();
    }

    function performCombinedQueryAPICall() {
        var combinedParams = {
                action: 'query',
                meta: [],
            },
            dones = [],
            fails = [],
            promises = [];
        $.each(arguments, function (i, def) {
            $.each(def.params, function (k, v) {
                if (!combinedParams.hasOwnProperty(k)) {
                    combinedParams[k] = v;
                    return;
                }
                if (k === 'meta') {
                    if (combinedParams.meta.indexOf(v) === -1) {
                        combinedParams.meta.push(v);
                        return;
                    }
                    throw new Error('Encountered attempt to make a second meta=' + v + ' call');
                }
                throw new Error('Encountered attempt to redefine "' + k + '" param from "' + encodeURIComponent(combinedParams[k]) + '" to "' + encodeURIComponent(v) + '"');
            });
            dones.push(def.done);
            fails.push(def.fail);
            promises.push(def.promise);
        });
        combinedParams.meta = combinedParams.meta.join('|');

        function reject() {
            $.each(fails, function (i, fail) {
                fail();
            });
        }
        mw.loader.using('mediawiki.api').done(function () {
            new mw.Api().get(combinedParams).done(function (response) {
                if (!(response && response.query)) {
                    reject();
                    return;
                }
                $.each(dones, function (i, done) {
                    done(response.query);
                });
            }).fail(reject);
        });

        return $.when.apply($, promises);
    }

    function checkIsAFEnabled() {
        var deferred = $.Deferred();
        function reject() {
            console.log('[AbuseLogRC]: failed to determine whether AbuseFilter is enabled.');
            deferred.reject();
        }
        return {
            params: {
                meta: 'siteinfo',
                siprop: 'extensions',
            },
            done: function (query) {
                if (!$.isArray(query.extensions)) {
                    reject();
                    return;
                }
                var extensions = query.extensions;
                for (var i = 0; i < extensions.length; ++i) {
                    if (extensions[i].name === 'Abuse Filter') {
                        deferred.resolve(true);
                        return;
                    }
                }
                deferred.resolve(false);
            },
            fail: reject,
            promise: deferred.promise(),
        };
    }

    function getUserRights(mwRightsToAliases) {
        var deferred = $.Deferred(),
            rights = {},
            mwRightsToCheck = 0;
        $.each(mwRightsToAliases, function (mwRights, alias) {
            rights[alias] = false;
            ++mwRightsToCheck;
        });
        function reject() {
            console.log('[AbuseLogRC]: failed to get user rights.');
            deferred.reject();
        }
        return {
            params: {
                meta: 'userinfo',
                uiprop: 'rights',
            },
            done: function (query) {
                if (!(query.userinfo && $.isArray(query.userinfo.rights))) {
                    reject();
                    return;
                }
                var mwRights = query.userinfo.rights;
                for (var i = 0; (mwRightsToCheck > 0) && (i < mwRights.length); ++i) {
                    if (mwRightsToAliases.hasOwnProperty(mwRights[i])) {
                        rights[mwRightsToAliases[mwRights[i]]] = true;
                        --mwRightsToCheck;
                    }
                }
                deferred.resolve(rights);
            },
            fail: reject,
            promise: deferred.promise(),
        };
    }

    function loadI18nMessages() {
        var deferred = $.Deferred();
        mw.hook('dev.i18n').add(function (i18njs) {
            i18njs.loadMessages('AbuseLogRC').done(function (i18nMessages) {
                i18n = i18nMessages;
                deferred.resolve();
            });
            // NB: As of v0.5.6 (revision 109482), I18n-js never rejects its returned promise.
            //     If its XHR fails, we can't (easily) handle this, and our returned promise will never complete.
        });
        importArticle({
            type: 'script',
            article: 'u:dev:MediaWiki:I18n-js/code.js',
        });
        return deferred.promise();
    }

    function loadMWMessages(lang, messages) {
        var deferred = $.Deferred();
        function reject() {
            console.log('[AbuseLogRC]: failed to load MediaWiki messages.');
            deferred.reject();
        }
        return {
            params: {
                meta: 'allmessages',
                ammessages: messages.join('|'),
                amlang: lang,
            },
            done: function (query) {
                if (!$.isArray(query.allmessages)) {
                    reject();
                    return;
                }
                $.each(query.allmessages, function (i, message) {
                    if (message.missing !== '') {
                        mw.messages.set(message.name, message['*']);
                    }
                });
                deferred.resolve();
            },
            fail: reject,
            promise: deferred.promise(),
        };
    }

    function bootstrap() {
        var mwConfig, showToGroups, showToGroupsRE, userGroups, isCustomUser;

        // Guard against double-loading
        if (window.abuseLogRCactive !== undefined) {
            return;
        }
        // Speculatively load all the MediaWiki configuration values we'll need
        mwConfig = mw.config.get([
           'debug',
           'wgCanonicalSpecialPageName',
           'wgUserGroups',
           'wgUserLanguage',
           'wgUserName',
           'wgVersion',
        ]);
        // Ensure we're on the right page
        if (mwConfig.wgCanonicalSpecialPageName !== 'Recentchanges') {
            if (mwConfig.debug) {
                console.log('[AbuseLogRC]: page is not RecentChanges.');
            }
            return;
        }
        // Preliminary run conditions met
        window.abuseLogRCactive = true;
        console.log('[AbuseLogRC]: version 1.07 - 26/10/2020.');

        // Check whether the user is permitted to view AbuseLogRC
        showToGroups = ['sysop', 'staff', 'wiki-specialist', 'soap'];
        $.each($.isArray(window.abuseLogRC_showTo) ? window.abuseLogRC_showTo : [
            (window.abuseLogRC_showTo === 'all') ? 'user' : window.abuseLogRC_showTo
        ], function (i, group) {
            if (typeof group !== 'string') {
                return;
            }
            // Sanitize literal; implementation stolen from <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#Using_special_characters>
            group = group.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            if (showToGroups.indexOf(group) === -1) {
                showToGroups.push(group);
            }
        });
        showToGroupsRE = new RegExp('^(' + showToGroups.join('|') + ')$', 'm');
        userGroups = mwConfig.wgUserGroups.join('\n');
        isCustomUser = window.abuseLogRC_users &&
                       window.abuseLogRC_users instanceof Array &&
                       window.abuseLogRC_users.indexOf(mwConfig.wgUserName) > -1;
        if (!(showToGroupsRE.test(userGroups) || isCustomUser)) {
            console.log('[AbuseLogRC]: user is not allowed to view AbuseLogRC.');
            return;
        }

        // Perform final (expensive) checks, and speculatively/opportunistically load required MediaWiki messages
        performCombinedQueryAPICall(checkIsAFEnabled(), getUserRights({
            'abusefilter-log': 'canViewAFL',
            'abusefilter-log-detail': 'canViewAFLDetails',
            'abusefilter-view': 'canViewAF',
            'block': 'canBlock',
        }), loadMWMessages(mwConfig.wgUserLanguage, [
            'abusefilter-action-block',
            'abusefilter-action-blockautopromote',
            'abusefilter-action-degroup',
            'abusefilter-action-disallow',
            'abusefilter-action-rangeblock',
            'abusefilter-action-tag',
            'abusefilter-action-throttle',
            'abusefilter-action-warn',
            'abusefilter-edit-builder-vars-user-age',
            'abusefilter-edit-warn-actions',
            'listfiles_name',
            'abusefilter-history-public',
            'abusefilter-history-timestamp',
            'abusefilter-history-user',
            'abusefilter-topnav-log',
            'abusefilter-log-detailslink',
            'abusefilter-log-linkoncontribs',
            'abusefilter-log-linkoncontribs-text',
            'abusefilter-log-summary',
            'blocklink',
            'contribslink',
            'talkpagelinktext',
        ])).done(function (isAFEnabled, userRights) {
            if (!isAFEnabled) {
                console.log('[AbuseLogRC]: AbuseFilter is not enabled.');
                return;
            }
            if (!userRights.canViewAFL) {
                console.log('[AbuseLogRC]: user is not allowed to view AbuseLog.');
                return;
            }

            // All checks passed; prepare configuration, and load required i18n messages
            config = {
                interval: (typeof abuseLogRC_interval === 'number') ? Math.max(5, abuseLogRC_interval) : 60,
                entries: (typeof abuseLogRC_entries === 'number') ? Math.max(1, abuseLogRC_entries) : 3,
                order: (typeof abuseLogRC_order === 'string' ) ? abuseLogRC_order : 'newer',
                timeFrame1: (typeof abuseLogRC_timeFrame1 === 'number') ? (abuseLogRC_timeFrame1 * 3600000) : (2 * 3600000),
                timeFrame2: (typeof abuseLogRC_timeFrame2 === 'number') ? (abuseLogRC_timeFrame2 * 3600000) : (12 * 3600000),
                timeFrame3: (typeof abuseLogRC_timeFrame3 === 'number') ? (abuseLogRC_timeFrame3 * 3600000) : (24 * 3600000),
                position: (typeof abuseLogRC_position === 'string') ? abuseLogRC_position : 'before',
                collapsible: (typeof abuseLogRC_collapsible === 'boolean') ? abuseLogRC_collapsible : true,
                userInfo: (typeof abuseLogRC_userInfo === 'boolean') ? abuseLogRC_userInfo : true,
                userRights: userRights,
            };
            $.when(loadI18nMessages(), $.ready).done(function () {
                // Initialize state
                refreshTimer = null;
                refreshCycle = 0;
                itemSince = null;
                itemIds = [];

                // Get this party started
                createTableHTML();
            });
        });
    }

    //
    // End functions
    //

    bootstrap();
});