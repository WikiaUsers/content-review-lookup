/**
 * <nowiki>
 * Dashboard for Global Discussions Moderators
 * 
 * @author Noreplyz
 */

;(function (window, $) {
    if (window.GDMDashboardLoaded) return;
    if ($('#gdm-dashboard').length === 0) return;
    var groups = mw.config.get('wgUserGroups');
    if (groups.indexOf('staff') < 0 && groups.indexOf('vstf') < 0 &&
        groups.indexOf('helper') < 0 && groups.indexOf('global-discussions-moderator') < 0) {
        $('#gdm-dashboard').append('You do not have sufficient rights to use this tool.');
    }
    window.GDMDashboardLoaded = true;

    var GDMD = {};

    /* Pages */
    GDMD.PAGES = {
        OVERVIEW: 'Data:Overview/',
        IGNORE: 'Data:Dashboard/ignore'
    };
    GDMD.MONTHS = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];
    GDMD.LANGUAGES = [
        'de',
        'en',
        'es',
        'fr',
        'id',
        'it',
        'ja',
        'ko',
        'nl',
        'pl',
        'pt',
        'pt-br',
        'ru',
        'vi',
        'zh',
        'zh-hk'
    ];
    GDMD.wikis = [];

    GDMD.discussionAPI = 'https://services.fandom.com/discussion/';

    /* View */
    GDMD.templates = {};

    GDMD.templates.search = 
        '<div class="gdm-dashboard-search">' +
            '<p class="tag">Search for a Community:</p>' +
            '<input type="text" id="gdm-dashboard-search-input" placeholder="Community url">' +
            '<a class="wds-button" id="gdm-dashboard-search-button" value="Search">' +
                '<img src="data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D" class="sprite search" height="17" width="21">' +
            '</a> ' +
            '<a class="wds-button" id="gdm-dashboard-clear-search" style="display:none"><span>Clear search</span></a>' +
        '</div>';
    GDMD.templates.filters =
        '<p class="tag">Filter:</p>' +
        '<div id="filter-languages" class="wds-dropdown">' +
            '<div class="gdm-dashboard-filter wds-button wds-is-secondary wds-dropdown__toggle">' +
                'Lang:&nbsp;<span class="filter-default">All</span>' +
                '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 12 12" class="wds-icon wds-icon-tiny wds-dropdown__toggle-chevron" id="wds-icons-dropdown-tiny"><defs><path id="dropdown-tiny-a" d="M6.0001895,8.80004571 C5.79538755,8.80004571 5.5905856,8.72164496 5.43458411,8.56564348 L2.23455364,5.365613 C2.00575146,5.13681083 1.93695081,4.79280755 2.06095199,4.4936047 C2.18415316,4.19440185 2.47695595,4 2.80015903,4 L9.20021997,4 C9.52342305,4 9.81542583,4.19440185 9.93942701,4.4936047 C10.0634282,4.79280755 9.99462754,5.13681083 9.76582536,5.365613 L6.56579489,8.56564348 C6.4097934,8.72164496 6.20499145,8.80004571 6.0001895,8.80004571 Z"></path></defs><use fill-rule="evenodd" xlink:href="#dropdown-tiny-a"></use></svg>' +
            '</div>' +
            '<div class="wds-dropdown__content wds-is-left-aligned wds-is-right-aligned">' +
                '<ul class="wds-list wds-is-linked" style="margin:0;">' +
                    '<li><label class="filter-language" data-cat="all"><input type="checkbox" checked/>all</label></li>' +
                    '{{#languages}}<li><label class="filter-language" data-cat="{{.}}"><input type="checkbox" />{{.}}</label></li>{{/languages}}' +
                '</ul>' +
            '</div>' +
        '</div>' +
        '&nbsp;<div id="filter-hubs" class="wds-dropdown">' +
            '<div class="gdm-dashboard-filter wds-button wds-is-secondary wds-dropdown__toggle">' +
                'Hub:&nbsp;<span class="filter-default">All</span>' +
                '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 12 12" class="wds-icon wds-icon-tiny wds-dropdown__toggle-chevron" id="wds-icons-dropdown-tiny"><defs><path id="dropdown-tiny-a" d="M6.0001895,8.80004571 C5.79538755,8.80004571 5.5905856,8.72164496 5.43458411,8.56564348 L2.23455364,5.365613 C2.00575146,5.13681083 1.93695081,4.79280755 2.06095199,4.4936047 C2.18415316,4.19440185 2.47695595,4 2.80015903,4 L9.20021997,4 C9.52342305,4 9.81542583,4.19440185 9.93942701,4.4936047 C10.0634282,4.79280755 9.99462754,5.13681083 9.76582536,5.365613 L6.56579489,8.56564348 C6.4097934,8.72164496 6.20499145,8.80004571 6.0001895,8.80004571 Z"></path></defs><use fill-rule="evenodd" xlink:href="#dropdown-tiny-a"></use></svg>' +
            '</div>' +
            '<div class="wds-dropdown__content wds-is-left-aligned">' +
                '<ul class="wds-list wds-is-linked" style="margin:0;">' +
                    '<li><label class="filter-hub" data-cat="all"><input type="checkbox" checked />All</label></li>' +
                    '{{#hubs}}<li><label class="filter-hub" data-cat="{{.}}"><input type="checkbox" />{{.}}</label></li>{{/hubs}}' +
                '</ul>' +
            '</div>' +
        '</div>';
    GDMD.templates.dashboardTable = 
        '<table class="article-table sortable">' +
            '<thead>' +
                '<th>Wiki </th>' +
                '<th>Language </th>' +
                '<th>Hub </th>' +
                '<th>Local mod actions </th>' +
                '<th>Global mod actions </th>' +
                '<th>Unreviewed reports </th>' +
            '</thead>' +
            '<tbody>' +
                '{{#wikis}}' +
                    '<tr>' +
                        '{{#exists}}' +
                            '<td><a href="//{{url}}/d" target="_blank">{{wikiname}}</a> (<a href="//{{url}}/Special:ListUsers/sysop,bureaucrat,threadmoderator" target="_blank">mods</a>)</td>' + 
                            '<td>{{lang}}</td>' + 
                            '<td>{{hub}}</td>' + 
                            '<td><a href="//{{url}}/d/m/insights/moderations" target="_blank">{{modCount}}</a></td>' + 
                            '<td>{{nonModCount}}</td>' + 
                            '<td><a href="//{{url}}/d/reported" target="_blank">{{totalReports}}</a></td>' + 
                        '{{/exists}}' +
                    '</tr>' +
                '{{/wikis}}' +
                '{{#nowikis}}<tr><td colspan="6" style="text-align:center">No wikis found with the filters/search.</td></tr>{{/nowikis}}' +
            '</tbody>' +
        '</table>';

    /**
     * Get a page's wikitext
     * @param {String} page the page to get wikitext from
     * @return {Promise} jQuery Promise
     */
    GDMD.getPageContents = function (page) {
        return $.ajax({
            url: '/api.php',
            type: 'GET',
            format: 'json',
            data: {
                action: 'query',
                prop: 'revisions',
                titles: page,
                rvprop: 'content',
                cb: Math.random(),
                format: 'json'
            }
        }).then(function(data) {
            if (!data.query || !data.query.pages) {
                console.warn('Could not get page ' + page);
                return null;
            }
            for (var pageid in data.query.pages) {
                if (!data.query.pages[pageid] || !data.query.pages[pageid].revisions ||
                    !data.query.pages[pageid].revisions.length) {
                        console.warn('Could not get page ' + page);
                        return null;
                    }
                return data.query.pages[pageid].revisions[0]['*'];
            }
        });
    };

    /**
     * Use api.php to get a wiki's URL
     * @param {String} input a 'partial' (e.g. es.witcher) or a full URL (es.witcher.wikia.com)
     * @return {Deferred} object returning the wiki ID if found, null otherwise
     */
    GDMD.getWikiData = function (input) {
        var lang = '';
        var domain = 'fandom.com';
        input = input.replace(/(^\s*|\s*$)/g, '');
        var wiki = input;

        if (input.match(/\.(wikia|fandom)\.(org|com)/i)) {
            input = input.replace(/(https?:)?\/\//g, '');
            input = input.replace(/$/g, '/').replace(/\/+$/g, '/');
            if (input.match(/fandom\.com/g)) {
                // Grab <wiki>.fandom.com/<lang>
                var fcomponents = input.match(/^([^\.]*)\.fandom\.com\/([^\/]*)\/{0,1}.*/i);
                if (fcomponents) {
                    wiki = fcomponents[1];
                    lang = fcomponents[2];
                }
            } else if (input.match(/wikia\.org/g)) {
                // Grab <wiki>.wikia.org/<lang>
                var ocomponents = input.match(/^([^\.]*)\.wikia\.org\/([^\/]*)\/{0,1}.*/i);
                if (ocomponents) {
                    wiki = ocomponents[1];
                    lang = ocomponents[2];
                    domain = 'wikia.org';
                }
            } else if (input.match(/wikia\.com/g)) {
                // Grab <lang>.<wiki>.wikia.com
                var wcomponents = input.match(/^([^\.]*?)\.*([^\.]*)\.wikia\.com.*/i);
                if (wcomponents) {
                    wiki = wcomponents[2];
                    lang = wcomponents[1];
                    domain = 'wikia.com';
                }
            }
        } else {
            var pcomponents = input.match(/^(.+)\.(.+)$/i);
            if (pcomponents) {
                lang = pcomponents[1];
                wiki = pcomponents[2];
            }
        }
        var url = 'https://' + wiki + '.' + domain + '/';
        if (lang !== '') {
            url += lang + '/';
        }
        return $.ajax({
            url: url + 'api.php',
            type: 'GET',
            timeout: 5000,
            format: 'json',
            dataType: 'jsonp',
            crossDomain: 'true',
            xhrFields: {
                withCredentials: true
            },
            data: {
                action: 'query',
                meta: 'siteinfo',
                siprop: ['general', 'variables', 'category'].join('|'),
                format: 'json'
            }
        }).then(function(data) {
            var wikiid = $.grep(data.query.variables, function (e) {
                return e.id === 'wgCityId';
            })[0]['*'];
            return {
                wikiid: wikiid,
                url: data.query.general.server.replace(/https?:\/\//g, '') + data.query.general.scriptpath,
                wikiname: data.query.general.sitename,
                hub: data.query.category.catname ? data.query.category.catname : '',
                lang: data.query.general.lang,
                modCount: 0,
                nonModCount: 0,
                totalReports: 0,
                exists: true
            };
        }, function() {
            console.log('Failed to find wiki ' + input);
            return null;
        });
    };

    /**
     * Gets a list of reported posts for a wiki's Discussions
     */
    GDMD.getReportedPosts = function(id) {
        return $.ajax({
            url: GDMD.discussionAPI + id + '/posts',
            type: 'GET',
            format: 'json',
            crossDomain: 'true',
            xhrFields: {
                withCredentials: true
            },
            data: {
                reported: true
            }
        });
    };

    /**
     * Gets a list of moderator actions for a wiki's Discussions
     */
    GDMD.getModActions = function (id, days) {
        return $.ajax({
            url: GDMD.discussionAPI + id + '/leaderboard/moderator-actions',
            type: 'GET',
            format: 'json',
            crossDomain: 'true',
            xhrFields: {
                withCredentials: true
            },
            data: {
                days: days
            }
        });
    };

    GDMD.showWikis = function(wikis) {
        if (!wikis) wikis = GDMD.wikis;
        // Get filters for language
        var languageFilters = [];
        var noLanguageFilters = true;
        $('#filter-languages input:checkbox').each(function() {
            if ($(this).attr('checked') && $(this).parent().attr('data-cat') !== 'all') {
                languageFilters.push($(this).parent().attr('data-cat'));
                noLanguageFilters = false;
            }
        });

        // Get filters for hub
        var hubFilters = [];
        var noHubFilters = true;
        $('#filter-hubs input:checkbox').each(function () {
            if ($(this).attr('checked') && $(this).parent().attr('data-cat') !== 'all') {
                if ($(this).parent().attr('data-cat') === 'None') {
                    hubFilters.push("");
                }
                hubFilters.push($(this).parent().attr('data-cat'));
                noHubFilters = false;
            }
        });

        var shownWikis = wikis.filter(function(wiki) {
            if (noLanguageFilters && noHubFilters) return true;
            if (noLanguageFilters) {
                return (hubFilters.indexOf(wiki.hub) >= 0);
            }
            else if (noHubFilters) {
                return (languageFilters.indexOf(wiki.lang) >= 0);
            } else {
                return (hubFilters.indexOf(wiki.hub) >= 0) && (languageFilters.indexOf(wiki.lang) >= 0);
            }
        });
        var table = $(Mustache.render(GDMD.templates.dashboardTable, {
            wikis: shownWikis,
            nowikis: shownWikis.length === 0 ? true : false
        }));
        $('#gdm-dashboard').empty().append(table);
        mw.loader.using('jquery.tablesorter', function () {
            table.tablesorter();
        });
    };
    
    GDMD.searchWiki = function(wiki) {
        GDMD.getWikiData(wiki).then(function(wiki) {
            $.when(GDMD.getReportedPosts(wiki.wikiid), GDMD.getModActions(wiki.wikiid, 30)).then(function(reports, actions) {
                wiki.totalReports = reports[0].postCount;
                var totalCount = 0;
                var modCount = {
                    'badge:threadmoderator': 0,
                    'badge:sysop': 0,
                    'badge:vstf': 0,
                    'badge:global-discussions-moderator': 0,
                    'badge:staff': 0,
                    'badge:helper': 0
                };
                actions[0].users.forEach(function(user) {
                    totalCount += parseInt(user.totalCount);
                    if (user.userInfo.badgePermission == '') return;
                    modCount[user.userInfo.badgePermission] += user.totalCount;
                });
                wiki.modCount = modCount['badge:threadmoderator'] + modCount['badge:sysop'];
                wiki.nonModCount = totalCount - wiki.modCount;
                GDMD.showWikis([wiki]);
                $('#gdm-dashboard-loading').hide();
            }, function() {
                $('#gdm-dashboard-loading').hide();
                GDMD.showWikis([]);
            });
        }, function() {
            $('#gdm-dashboard-loading').hide();
            GDMD.showWikis([]);
        });
    };

    GDMD.init = function () {
        $('#gdm-dashboard-search').empty().append(Mustache.render(GDMD.templates.search));
        var year = new Date().getUTCFullYear();
        var month = new Date().getUTCMonth();
        $.when(GDMD.getPageContents(GDMD.PAGES.OVERVIEW + '2021 April')).then(function(content) {
            var badDatePromise = $.Deferred().resolve(content);
            var ignoreWikisPromise = GDMD.getPageContents(GDMD.PAGES.IGNORE);
            if (content === null) {
                month = month === 0 ? 11 : month - 1;
                if (month == 11) year -= 1;
                badDatePromise = GDMD.getPageContents(GDMD.PAGES.OVERVIEW + year + ' ' + GDMD.MONTHS[month]);
            }
            $.when(badDatePromise, ignoreWikisPromise).then(function (content, ignoreContent) {
            	// Obtain wikis to ignore
            	ignoreContent = ignoreContent.split('\n').filter(function(line) {
            		return line[0] === '*';
            	});
            	ignoreContent = ignoreContent.map(function(line) {
            		return line.slice(1).trim();
            	});
            	// Obtain list of wikis
                var wikis = content.split('\n');
                var hubs = [];
                wikis.forEach(function (wiki, i) {
                    var logComponents = wiki.split('|');
                    if (!logComponents[0].startsWith('*') || ignoreContent.indexOf(logComponents[1]) >= 0) {
                        wikis[i] = {
                            exists: false
                        };
                        return;
                    }
                    wikis[i] = {
                        wikiid: logComponents[0].replace('*\s?', ''),
                        url: logComponents[1],
                        wikiname: logComponents[2],
                        hub: logComponents[3] == 'None' ? '' : logComponents[3],
                        lang: logComponents[4],
                        modCount: logComponents[5],
                        nonModCount: logComponents[6],
                        totalReports: logComponents[7],
                        exists: true
                    };
                    if (hubs.indexOf(logComponents[3]) < 0) {
                        hubs.push(logComponents[3]);
                    }
                });
                $('#gdm-dashboard-loading').hide();
                $('#gdm-dashboard-search').append(Mustache.render(GDMD.templates.filters, {
                    languages: GDMD.LANGUAGES,
                    hubs: hubs
                }));
                GDMD.addFilterEvents();
                GDMD.addSearchEvents();
                GDMD.wikis = wikis;
                GDMD.wikis.sort(function (a, b) {
                    return parseInt(b.totalReports) - parseInt(a.totalReports);
                });
                GDMD.showWikis();
            });
        });
    };

    GDMD.addFilterEvents = function() {
        $('#gdm-dashboard-search').on('change', '.wds-dropdown__content label[data-cat="all"] input:checkbox', function () {
            if (!this.checked) {
                $(this).closest('.wds-dropdown').find('input:checkbox').removeAttr('checked');
            } else {
                $(this).closest('.wds-dropdown').find('input:checkbox').removeAttr('checked');
                $(this).attr('checked', 'checked');
            }
        });
        $('#gdm-dashboard-search').on('change', '.wds-dropdown__content label[data-cat!="all"] input:checkbox', function () {
            if ($(this).closest('.wds-dropdown').find('label[data-cat="all"] input:checkbox').attr('checked')) {
                $(this).closest('.wds-dropdown').find('input:checkbox').removeAttr('checked');
                $(this).attr('checked', 'checked');
            }
        });
        $('#gdm-dashboard-search').on('change', '.wds-dropdown__content input:checkbox', function () {
            var languageFilters = [];
            $('#filter-languages input:checkbox').each(function () {
                if ($(this).attr('checked')) {
                    languageFilters.push($(this).parent().attr('data-cat'));
                }
            });
            $('#filter-languages .filter-default').text(languageFilters.join(', '));
            var hubFilters = [];
            $('#filter-hubs input:checkbox').each(function () {
                if ($(this).attr('checked')) {
                    hubFilters.push($(this).parent().attr('data-cat'));
                }
            });
            $('#filter-hubs .filter-default').text(hubFilters.join(', '));
            GDMD.showWikis();
        });
    };

    GDMD.addSearchEvents = function () {
        $('#gdm-dashboard-clear-search').on('click', function() {
            $('#gdm-dashboard-search-input').val('');
            $('#gdm-dashboard-search-button').click();
        });
        $('#gdm-dashboard-search-button').on('click', function () {
            var wiki = $('#gdm-dashboard-search-input').val();
            if (wiki === '') {
                GDMD.showWikis();
                $('#gdm-dashboard-clear-search').hide();
            } else {
                $('#gdm-dashboard-clear-search').show();
                $('#gdm-dashboard-loading').show();
                $('#gdm-dashboard').empty();
                GDMD.searchWiki(wiki);
            }
        });
        $('#gdm-dashboard-search-input').keyup(function(e) {
            if (e.keyCode === 13) {
                $('#gdm-dashboard-search-button').click();
            }
        });
    };

    mw.loader.using(['mediawiki.template.mustache', 'mediawiki.api'], function() {
        GDMD.init();
    });

    window.GDMD = GDMD;

})(window, jQuery);