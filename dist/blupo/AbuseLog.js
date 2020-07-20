// AbuseLog
// View abuse log entries
// Based on AbuseLogRC: https://dev.wikia.com/wiki/AbuseLogRC
(function () {
    "use strict";
 
    if (window.abuseLogActive) {
        console.log("AbuseLog: Already running");
        return;
    }
    window.abuseLogActive = true;
 
    var mwData = mw.config.get([
        "wgCanonicalSpecialPageName",
        "wgUserGroups",
        "wgUserLanguage",
    ]);
    var userGroups = mwData.wgUserGroups.join(" ");
 
    if (!/user/.test(userGroups)) { return }
    if (mwData.wgCanonicalSpecialPageName != "Recentchanges") { return }
 
    var config = {
        "autoRefreshInterval": window.abuseLog_autoRefreshInterval || 60,
        "entries": window.abuseLog_entries || 10,
        "autoRefresh": (typeof window.abuseLog_autoRefresh !== "undefined") ? window.abuseLog_autoRefresh : false,
        "urgencyIntervals" : window.abuseLog_urgencyIntervals || [2, 12, 24],
    };
    config.urgencyIntervals.sort(function(a, b) { return a - b });
 
    var isSysop = /sysop/.test(userGroups);
    var refreshTimer = null;
    var loadLock = false;
 
    function sentenceCase(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
 
    function clamp(num, min, max) {
        return num <= min ? min : num >= max ? max : num;
    }
 
    mw.loader.using(["mediawiki.api", "mediawiki.jqueryMsg"], function() {
        var Api = new mw.Api();
 
        function apiQuery(data) {
            data.action = "query";
            data.format = "json";
 
            return Api.get(data);
        }
 
        // https://www.mediawiki.org/wiki/Manual:Messages_API#Getting_the_messages_to_the_client
        function loadMessages(messages) {
            return apiQuery({
                meta: "allmessages",
                ammessages: messages.join("|"),
                amlang: mwData.wgUserLanguage,
            }).then(function(data) {
                $.each(data.query.allmessages, function(i, message) {
                    if (message.missing !== "") {
                        mw.messages.set(message.name, message["*"]);
                    }
                });
            });
        }
 
        function urgencyClass(timeDiff) {
            for (var i in config.urgencyIntervals) {
                var interval = config.urgencyIntervals[i] * 3600 * 1000;
                var urgencyLevel = Number(i) + 1;
 
                if (timeDiff <= interval) {
                    return "abUrgency" + urgencyLevel;
                }
            }
 
            return "abNonUrgent";
        }
 
        function loadCompleted() {
            if (config.autoRefresh && !refreshTimer) {
                refreshTimer = window.setTimeout(loadData, config.autoRefreshInterval * 1000);
            }
 
            $("#ab-lastRefreshed").text("Updated at " + (new Date()).toLocaleTimeString());
            $("#ab-forceRefresh").prop("disabled", false);
            $("#abLoader").hide();
        }
 
        function localiseABAction(action) {
            if (action == "noactions") {
                return mw.msg("abusefilter-log-noactions");
            }
 
            return mw.msg("abusefilter-action-" + action);
        }
 
        function makeUI() {
            var filterIdInput = "<tr>" +
            "<td class='mw-label'><label id='abInput-filterIdLabel' for='abInput-filter'>" + mw.msg("abusefilter-log-search-filter") + "</label></td>" +
            "<td class='mw-input'><input type='text' id='abInput-filterId' name='abInput-filterId'></td>" +
            "<td id='abInput-filterIdText'>" + (config.filterId ? "(" + config.filterId + ")" : "") + "</td>" +
            "</tr>";
 
            var abInputsTable = "<form><table><tbody>" +
            "<tr>" +
            "<td class='mw-label'><label id='abInput-autoRefreshIntervalLabel' for='abInput-autoRefreshInterval'>Auto-refresh interval" +
            "<span class='explain' title='Takes effect after the next refresh'>*</span>" +
            ":</label></td>" +
            "<td class='mw-input'><input type='text' id='abInput-autoRefreshInterval' name='abInput-autoRefreshInterval'></td>" +
            "<td id='abInput-autoRefreshIntervalText'>(" + mw.msg("seconds", config.autoRefreshInterval) + ")</td>" +
            "</tr><tr>" +
            "<td class='mw-label'><label id='abInput-numEntriesLabel' for='abInput-numEntries'>Number of entries:</label></td>" +
            "<td class='mw-input'><input type='text' id='abInput-numEntries' name='abInput-numEntries'></td>" +
            "<td id='abInput-numEntriesText'>(" + config.entries + ")</td>" +
            "</tr><tr>" +
            "<td class='mw-label'><label id='abInput-userLabel' for='abInput-user'>" + mw.msg("abusefilter-log-search-user") + "</label></td>" +
            "<td class='mw-input'><input type='text' id='abInput-user' name='abInput-User'></td>" +
            "<td id='abInput-userText'>" + (config.user ? "(" + config.user + ")" : "") + "</td>" +
            "</tr>" + (isSysop ? filterIdInput : "") + "<tr>" +
            "<td class='mw-label'><label id='abInput-titleLabel' for='abInput-title'>" + mw.msg("abusefilter-log-search-title") + "</label></td>" +
            "<td class='mw-input'><input type='text' id='abInput-title' name='abInput-title'></td>" +
            "<td id='abInput-titleText'>" + (config.title ? "(" + config.title + ")" : "") + "</td>" +
            "</tr></tbody></table>" +
            "<input type='button' id='ab-updateInputs' value='Update'> " +
            "<input type='button' id='ab-clearInputs' value='Clear'> " +
            "<input type='button' id='ab-forceRefresh' value='Refresh'> " +
            "</form>";
 
            var abTools = "<div>" +
                "<img id='abLoader' src='//images.wikia.com/common/skins/common/images/ajax.gif' width='16' height='16' />" +
                "<span id='ab-lastRefreshed'></span> | " +
                "<span>Turn <a id='ab-autoRefreshToggle'>" + (config.autoRefresh ? "off" : "on") + "</a> auto-refresh</span> | " +
                "<a href='" + mw.util.getUrl("Special:AbuseFilter") + "' title='Special:AbuseFilter'>" + mw.msg("abusefilter") + "</a> | " +
                "<a href='" + mw.util.getUrl("Special:AbuseLog") + "' title='Special:AbuseLog'>" + mw.msg("abusefilter-topnav-log") + "</a>" +
                "</div>";
 
            var abFieldset = "<fieldset class='collapsible'><legend>" + mw.msg("abusefilter-log-search") + "</legend>" + abInputsTable + abTools + "</fieldset>";
            var container = "<div id='abLog-options'>" + abFieldset + "</div><div id='abLog-content'><h4>" + mw.msg("abusefilter-log") + "</h4><ul id='abLog-list'></ul></div>";
            $('#mw-content-text').before(container);
        }
 
        function loadData() {
            if (loadLock) { return; } else { loadLock = true; }
            refreshTimer = null;
 
            $("#abLog-list").empty();
            $("#abLoader").show();
            $("#ab-forceRefresh").prop("disabled", true);
 
            var itemQuery = {
                "afllimit": config.entries,
                "afldir": "older",
                "list": "abuselog",
                "aflprop": "ids|user|title|action|result|filter|timestamp|hidden"
            };
            if (config.user) { itemQuery.afluser = config.user; }
            if (config.filterId) { itemQuery.aflfilter = config.filterId; }
            if (config.title) { itemQuery.afltitle = config.title; }
 
            apiQuery(itemQuery).done(function(response) {
                if (!response.error) {
                    if (response.query.abuselog.length > 0) {
                        for (var i in response.query.abuselog) {
                            var item = response.query.abuselog[i];
 
                            var now = new Date();
                            var then = new Date(item.timestamp);
 
                            var results = item.result ? item.result.split(",") : ["noactions"];
                            results = results.map(localiseABAction);
 
                            var timeStr = "<span class='" + urgencyClass(now.getTime() - then.getTime()) + "'>" + then.toLocaleString(mwData.wgUserLanguage) + "</span>";
                            var userLink = "<a class='mw-userlink' target='_blank' href='" + mw.util.getUrl('User:' + item.user) + "' title='User:" + item.user + "'>" + item.user + "</a>";
                            var userTools = "<span class='mw-usertoollinks'>(" +
                                "<a target='_blank' href='" + mw.util.getUrl('Message Wall:' + item.user) + "' title='Message Wall:" + item.user + "'>" + mw.msg("wall-message-wall-shorten") + "</a>" + mw.msg("pipe-separator") +
                                "<a target='_blank' href='" + mw.util.getUrl('Special:Contributions/' + item.user) + "' title='Special:Contributions/" + item.user + "'>" + mw.msg("contribslink") + "</a>" +
                                (isSysop ? 
                                mw.msg("pipe-separator") + "<a target='_blank' href='" + mw.util.getUrl('Special:Block/' + item.user) + "' title='Special:Block/" + item.user + "'>" + mw.msg("blocklink") + "</a>" :
                                ""
                                ) +
                                ")</span>";
                            var filter = "<a target='_blank'" +
                                " href='" + mw.util.getUrl('Special:AbuseFilter/' + item.filter_id) +
                                "' title='Special:AbuseFilter/" + item.filter_id + "'>" + mw.msg("abusefilter-log-detailedentry-local", item.filter_id) +
                                "</a>";
                            var pageLink = "<a id='entry-" + item.id + "' target='_blank' href='" + mw.util.getUrl(item.title) + "' title='" + item.title + "'>" +  item.title + "</a>";
                            var filterTools = "<a target='_blank' href='" + mw.util.getUrl('Special:AbuseLog/' + item.id) + "' title='Special:AbuseLog/" + item.id + "'>" + mw.msg("abusefilter-log-detailslink") + "</a>" + mw.msg("pipe-separator") +
                                "<a target='_blank' href='" + mw.util.getUrl('Special:AbuseFilter/examine/log/' + item.id) + "' title='Special:AbuseFilter/examine/log/" + item.id + "'>" + mw.msg("abusefilter-changeslist-examine") + "</a>";
 
                            var entry;
                            if (isSysop) {
                                entry = mw.msg("abusefilter-log-detailedentry-meta", timeStr, userLink + " " + userTools, filter, item.action, pageLink, results.join(", "), item.filter, filterTools);
                            } else {
                                entry = mw.msg("abusefilter-log-entry", timeStr, userLink + " " + userTools, item.action, pageLink, results.join(", "), item.filter);
                            }
 
                            $("#abLog-list").append("<li id='abLog-entry'>" + entry + "</li>");
                        }
                    } else {
                        $("#abLog-list").append("<li>No results</li>");
                    }
                } else {
                    new BannerNotification(response.error, "error").show();
                }
 
                loadCompleted();
                loadLock = false;
            });
        }
 
        apiQuery({
            meta: "siteinfo",
            siprop: "extensions",
        }).done(function(response) {
            if (!response.error) {
                var o = response.query.extensions;
                var found = false;
                
                if ($.isArray(o)) {
                    for (var i = 0; i < o.length && !found; ++i) {
                        found = o[i].name === "Abuse Filter";
                    }
                }
                
                if (!found) {
                    console.log("AbuseLog: Abuse Filter is not enabled");
                    return;
                } else {
                    loadMessages([
                        "abusefilter",
                        "abusefilter-log",
                        "abusefilter-topnav-log",
                        "abusefilter-log-search",
                        "abusefilter-log-search-filter",
                        "abusefilter-log-search-title",
                        "abusefilter-log-search-user",
                        "abusefilter-log-entry",
                        "abusefilter-log-detailedentry-meta",
                        "abusefilter-action-block",
                        "abusefilter-action-blockautopromote",
                        "abusefilter-action-degroup",
                        "abusefilter-action-disallow",
                        "abusefilter-action-rangeblock",
                        "abusefilter-action-tag",
                        "abusefilter-action-throttle",
                        "abusefilter-action-warn",
                        "abusefilter-log-noactions",
                        "abusefilter-log-detailedentry-local",
                        "abusefilter-changeslist-examine",
                        "abusefilter-log-detailslink",
                        "wall-message-wall-shorten",
                        "talkpagelinktext",
                        "contribslink",
                        "blocklink",
                        "pipeseparator",
                        "seconds",
                    ]).then(makeUI).then(function() {
                        $("#ab-clearInputs").click(function() {
                            config.user = null;
                            config.filterId = null;
                            config.title = null;
             
                            $("#abInput-userText").text("");
                            $("#abInput-titleText").text("");
             
                            $("#abInput-user").prop("value", "");
                            $("#abInput-title").prop("value", "");
                            $("#abInput-autoRefreshInterval").prop("value", "");
                            $("#abInput-numEntries").prop("value", "");
                            
                            if (isSysop) {
                                $("#abInput-filterIdText").text("");
                                $("#abInput-filterId").prop("value", "");
                            }
                        });
                        
                        $("#ab-updateInputs").click(function() {
                            var newRefreshInterval = Number(parseInt($("#abInput-autoRefreshInterval").val(), 10));
                            var newEntries = Number(parseInt($("#abInput-numEntries").val(), 10));
                            var user = $("#abInput-user").val();
                            var filterId = isSysop ? $("#abInput-filterId").val() : null;
                            var title = $("#abInput-title").val();
                            
                            newRefreshInterval = (typeof newRefreshInterval == "number") ? newRefreshInterval : config.autoRefreshInterval;
                            newEntries = (typeof newEntries == "number") ? newEntries : config.entries;
                            
                            newRefreshInterval = !isNaN(newRefreshInterval) ? newRefreshInterval : config.autoRefreshInterval;
                            newEntries = !isNaN(newEntries) ? newEntries : config.entries;
                            
                            config.autoRefreshInterval = (newRefreshInterval >= 5) ? newRefreshInterval : 5;
                            config.entries = clamp(newEntries, 1, 500);
                            config.user = user || null;
                            config.filterId = filterId || null;
                            config.title = title || null;
                            
                            $("#abInput-autoRefreshIntervalText").text("(" + mw.msg("seconds", config.autoRefreshInterval) + ")");
                            $("#abInput-numEntriesText").text("(" + config.entries + ")");
                            $("#abInput-userText").text(config.user ? "(" + config.user + ")" : "");
                            if (isSysop) { $("#abInput-filterIdText").text(config.filterId ? "(" + config.filterId + ")" : ""); }
                            $("#abInput-titleText").text(config.title ? "(" + config.title + ")" : "");
                        });
                        
                        $("#ab-autoRefreshToggle").click(function () {
                            config.autoRefresh = !config.autoRefresh;
                            
                            if (config.autoRefresh) {
                                if (!refreshTimer) {
                                    refreshTimer = window.setTimeout(loadData, config.autoRefreshInterval * 1000);
                                }
                            } else {
                                if (refreshTimer) {
                                    window.clearTimeout(refreshTimer);
                                    refreshTimer = null;
                                }
                            }
                            
                            $(this).text(config.autoRefresh ? "off" : "on");
                        });
                        
                        $("#ab-forceRefresh").click(loadData);
                    }).then(loadData);
                }
            } else {
                console.log("AbuseLog: Could not determine if Abuse Filter is enabled");
                return;
            }
        });
    });
})();