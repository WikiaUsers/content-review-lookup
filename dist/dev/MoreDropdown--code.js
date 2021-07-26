/**
 * @author Thundercraft5 
 * @name MoreDropdown
 * @version 0.1.2
 * @use Adds a dropdown with page tools to a page
*/
;(function($, mw, window) {
    //Global Variables
    var page_name = mw.html.escape(mw.config.get("wgPageName")),
        token = mw.user.tokens.values.editToken,
        fullpage = mw.html.escape(mw.config.get("wgPageName")),
        pagename = mw.html.escape(mw.config.get("wgTitle")),
        namespace = mw.config.get("wgNamespaceNumber"),
        usergroups = mw.config.get("wgUserGroups"),
        url = window.location.pathname,
        username = mw.html.escape(mw.config.get("wgTitle")).replace(/(?:message[_ ]wall|contrib(?:utions|s)|user[_ ]talk|UserProfileActivity|user|user[_ ]blog)[:\/]?/gmi, ''),
        query = {
	        "action": "query",
	        "format": "json",
	        "meta": "allmessages",
	        "ammessages": "user-identity-box-group-blocked",
        },
        api = new mw.Api();
    
    function main() {
    // open message api
    api.post(query).done(function(data) {
        
    //constants
    const CAN_DELETE = /sysop|content-moderator|soap|staff|helper|content-volunteer|wiki-specialist|wiki-representative/.test(usergroups.join()),
         CAN_BLOCK = /sysop|soap|staff|helper|global-discussions-moderator|wiki-representative/.test(usergroups.join()),
         IS_BLOCKED = $('.tag').text() === data.query.allmessages[0]["*"],
         PAGE_PATHNAME = mw.config.get('wgArticlePath').replace('$1', ''),
         IS_UCP = mw.config.get('wgVersion') !== "1.19.24";
    
    if (namespace === -1 && !pagename.match("/") || window.moreDropdownloaded) {
        return;
    }

    window.moreDropdownloaded = true;
    
    $('.page-header__contribution, .page-header__actions').after(
        "<div class=\"wds-dropdown\" style=\"" 
        	+ "margin-top: -12px;"
			+ "position: absolute;"
			+ "right: 10px;"
			+ "top: 14px;"
		+ "\" id=\"more-dropdown-button\">" + 
            "<div class=\"wds-dropdown__toggle\">" + 
                "<span>More</span>" + 
                "<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" viewBox=\"0 0 12 12\" class=\"wds-icon wds-icon-tiny wds-dropdown__toggle-chevron\" id=\"wds-icons-dropdown-tiny\">" + 
                    "<defs>" + 
                        "<path id=\"dropdown-tiny-a\" d=\"M6.0001895,8.80004571 C5.79538755,8.80004571 5.5905856,8.72164496 5.43458411,8.56564348 L2.23455364,5.365613 C2.00575146,5.13681083 1.93695081,4.79280755 2.06095199,4.4936047 C2.18415316,4.19440185 2.47695595,4 2.80015903,4 L9.20021997,4 C9.52342305,4 9.81542583,4.19440185 9.93942701,4.4936047 C10.0634282,4.79280755 9.99462754,5.13681083 9.76582536,5.365613 L6.56579489,8.56564348 C6.4097934,8.72164496 6.20499145,8.80004571 6.0001895,8.80004571 Z\">" + 
                        "</path>" + 
                    "</defs>" + 
                    "<use fill-rule=\"evenodd\" xlink:href=\"#dropdown-tiny-a\"></use>" + 
                "</svg>" + 
            "</div>" + 
            "<div class=\"wds-dropdown__content wds-is-not-scrollable wds-is-right-aligned\">" + 
                "<ul class=\"wds-list wds-is-linked\" id=\"more-dropdown\">" + 
                    "<li id=\"md-pageinfo\"><a href=\"" + PAGE_PATHNAME + fullpage + "?action=info\">Page info</a></li>" +
                    "<li id=\"md-subpages\"><a href=\"" + PAGE_PATHNAME + "Special:PrefixIndex/" + fullpage + "/\">Subpages</a></li>" +
                    "<li id=\"md-purge\"><a href=\"" + PAGE_PATHNAME + fullpage + "?action=purge\">Purge</a></li>" +
                    "<li id=\"md-latest-diff\"><a href=\"" + PAGE_PATHNAME + fullpage + "?diff=cur\">Latest Edit</a></li>" +
                    "<li id=\"md-page-logs-dropdown\" class=\"wds-is-sticked-to-parent wds-dropdown-level-2\">" + 
                        "<a href=\"" + PAGE_PATHNAME + "Special:Log?page=" + fullpage + "\" class=\"wds-dropdown-level-2__toggle\">" + 
                            "<span>Page Logs</span>" + 
                            "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 12 12\" class=\"wds-icon wds-icon-tiny wds-dropdown-chevron\" id=\"wds-icons-menu-control-tiny\">" + 
                                "<path d=\"M11.707 3.293a.999.999 0 0 0-1.414 0L6 7.586 1.707 3.293A.999.999 0 1 0 .293 4.707l5 5a.997.997 0 0 0 1.414 0l5-5a.999.999 0 0 0 0-1.414\" fill-rule=\"evenodd\"></path>" + 
                            "</svg>" + 
                        "</a>" + 
                        "<div class=\"wds-is-not-scrollable wds-dropdown-level-2__content\">" + 
                            "<ul class=\"wds-list wds-is-linked\">" + 
                                "<li><a href=\"" + PAGE_PATHNAME + "Special:Log/delete?page=" + fullpage + "\">Deletion Log</a></li>" + 
                                "<li><a href=\"" + PAGE_PATHNAME + "Special:Log/move?page=" + fullpage + "\">Move Log</a></li>" + 
                                "<li><a href=\"" + PAGE_PATHNAME + "Special:Log/protect?page=" + fullpage + "\">Protection Log</a></li>" + 
                                "<li><a href=\"" + PAGE_PATHNAME + "Special:AbuseLog?wpSearchTitle=" + fullpage + "\">Filter Log</a></li>" + 
                            "</ul>" + 
                        "<div>" + 
                    "</li>" + 
                    "<li id=\"md-whl\"><a href=\"" + PAGE_PATHNAME + "Special:WhatLinksHere/" + fullpage + "\">What links here</a></li>" +
                    (CAN_DELETE?"<li id=\"md-del-revs\"><a href=\"" + PAGE_PATHNAME + "Special:Undelete/" + fullpage + "\">Del. Revisions</a></li>":"") +
                "</ul>" + 
            "</div>" + 
        "</div>"
    );
    

        $(IS_UCP?'user-identity-social__icon wds-dropdown':'.masthead-info').prepend(
            "<ul class=\"user-identity-box-edit\" style=\"bottom: 0;margin: 15px;\" id=\"more-dropdown-button\">" + 
                "<li>" + 
                    "<div class=\"wds-dropdown\">" + 
                        "<div class=\"wds-dropdown__toggle\">" + 
                            "<span>More</span>" + 
                                "<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" viewBox=\"0 0 12 12\" class=\"wds-icon wds-icon-tiny wds-dropdown__toggle-chevron\" id=\"wds-icons-dropdown-tiny\">" + 
                                    "<defs>" + 
                                        "<path id=\"dropdown-tiny-a\" d=\"M6.0001895,8.80004571 C5.79538755,8.80004571 5.5905856,8.72164496 5.43458411,8.56564348 L2.23455364,5.365613 C2.00575146,5.13681083 1.93695081,4.79280755 2.06095199,4.4936047 C2.18415316,4.19440185 2.47695595,4 2.80015903,4 L9.20021997,4 C9.52342305,4 9.81542583,4.19440185 9.93942701,4.4936047 C10.0634282,4.79280755 9.99462754,5.13681083 9.76582536,5.365613 L6.56579489,8.56564348 C6.4097934,8.72164496 6.20499145,8.80004571 6.0001895,8.80004571 Z\">" + 
                                        "</path>" + 
                                    "</defs>" + 
                                    "<use fill-rule=\"evenodd\" xlink:href=\"#dropdown-tiny-a\"></use>" + 
                                "</svg>" + 
                            "</div>" + 
                            "<div class=\"wds-dropdown__content wds-is-not-scrollable wds-is-right-aligned\">" + 
                                "<ul class=\"wds-list wds-is-linked\" id=\"more-dropdown\">" + 
                                    "<li id=\"md-pageinfo\"><a href=\"" + PAGE_PATHNAME + fullpage + "?action=info\">Page info</a></li>" +
                                    "<li id=\"md-subpages\"><a href=\"" + PAGE_PATHNAME + "Special:PrefixIndex/" + ((namespace === 3 || namespace === 2)?fullpage:"User:" + username) + "/\" title=\"View Subpages of this page\">Subpages</a></li>" + 
                                    "<li id=\"md-purge\"><a href=\"" + PAGE_PATHNAME + fullpage + "?action=purge\">Purge</a></li>" +
                                    "<li id=\"md-page-logs-dropdown\" class=\"wds-dropdown-level-2\">" + 
                                        "<a href=\"" + PAGE_PATHNAME + "Special:Log?page=User:" + username + "\" class=\"wds-dropdown-level-2__toggle\">" + 
                                            "<span>Page Logs</span>" + 
                                            "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 12 12\" class=\"wds-icon wds-icon-tiny wds-dropdown-chevron\" id=\"wds-icons-menu-control-tiny\">" + 
                                                "<path d=\"M11.707 3.293a.999.999 0 0 0-1.414 0L6 7.586 1.707 3.293A.999.999 0 1 0 .293 4.707l5 5a.997.997 0 0 0 1.414 0l5-5a.999.999 0 0 0 0-1.414\" fill-rule=\"evenodd\"></path>" + 
                                            "</svg>" + 
                                        "</a>" + 
                                        "<div class=\"wds-is-not-scrollable wds-dropdown-level-2__content\">" + 
                                            "<ul class=\"wds-list wds-is-linked\">" + 
                                                "<li><a href=\"" + PAGE_PATHNAME + "Special:AbuseLog?wpSearchTitle=" + username + "\">Filter Log</a></li>" + 
                                                "<li><a href=\"" + PAGE_PATHNAME + "Special:Log/delete?page=User:" + username + "\">Deletion Log</a></li>" + 
                                                "<li><a href=\"" + PAGE_PATHNAME + "Special:Log/move?page=User:" + username + "\">Move Log</a></li>" + 
                                                "<li><a href=\"" + PAGE_PATHNAME + "Special:Log/protect?page=User:" + username + "\">Protection Log</a></li>" + 
                                                "<li><a href=\"" + PAGE_PATHNAME + "Special:Log/rights?page=User:" + username + "\">User Rights Log</a></li>" + 
                                                "<li><a href=\"" + PAGE_PATHNAME + "Special:Log/block?page=User:" + username + "\">Block Log</a></li>" +
                                        "</ul>" + 
                                    "<div>" + 
                                "</li>" +
                                (CAN_BLOCK?(IS_BLOCKED?
                                "<li id=\"md-page-block-ops-dropdown\" class=\"wds-is-sticked-to-parent wds-dropdown-level-2\">" + 
                                    "<a href=\"" + PAGE_PATHNAME + "Special:Log/block?page=User:" + username + "\" class=\"wds-dropdown-level-2__toggle\">" +                                             
                                    "<span>Block Tools</span>" + 
                                        "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 12 12\" class=\"wds-icon wds-icon-tiny wds-dropdown-chevron\" id=\"wds-icons-menu-control-tiny\">" + 
                                            "<path d=\"M11.707 3.293a.999.999 0 0 0-1.414 0L6 7.586 1.707 3.293A.999.999 0 1 0 .293 4.707l5 5a.997.997 0 0 0 1.414 0l5-5a.999.999 0 0 0 0-1.414\" fill-rule=\"evenodd\"></path>" + 
                                        "</svg>" + 
                                    "</a>" + 
                                    "<div class=\"wds-is-not-scrollable wds-dropdown-level-2__content\">" + 
                                        "<ul class=\"wds-list wds-is-linked\">" + 
                                            "<li><a href=\"" + PAGE_PATHNAME + "Special:Unblock/" + username + "\">Unblock</a></li>" + 
                                            "<li><a href=\"" + PAGE_PATHNAME + "Special:Block/" + username + "\">Change block</a></li>" + 
                                            "<li><a href=\"" + PAGE_PATHNAME + "Special:BlockList?wpTarget=" + username + "\">View Block</a></li>" +
                                        "</ul>" + 
                                    "<div>" + 
                                "</li>":"<li id=\"md-block\"><a href=\"" + PAGE_PATHNAME + "Special:Block/" + username + "\">Block</a></li>"):"")
                                 + ((CAN_DELETE && window.NukeLoaded)?
                                    "<li id=\"md-nuke\"><a href=\"" + PAGE_PATHNAME + "Special:BlankPage?blankspecial=nuke&nukeuser=" + username + "\">Nuke</a></li>": "") + 
                           "</ul>" + 
                        "</div>" + 
                    "</div>" +
                "</li>" + 
            "</ul>"
        );
    
    if ($(IS_UCP?"#userProfileApp":'#UserProfileMasthead').length) {
        $('#more-dropdown-button').after(
        "<ul class=\"user-identity-box-edit\" style=\"bottom: 0;margin: 15px; right: 60px;\" id=\"user-more-dropdown-button\">" + 
                "<li>" + 
                    "<div class=\"wds-dropdown\">" + 
                        "<div class=\"wds-dropdown__toggle\">" + 
                            "<span>User</span>" + 
                                "<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" viewBox=\"0 0 12 12\" class=\"wds-icon wds-icon-tiny wds-dropdown__toggle-chevron\" id=\"wds-icons-dropdown-tiny\">" + 
                                    "<defs>" + 
                                        "<path id=\"dropdown-tiny-a\" d=\"M6.0001895,8.80004571 C5.79538755,8.80004571 5.5905856,8.72164496 5.43458411,8.56564348 L2.23455364,5.365613 C2.00575146,5.13681083 1.93695081,4.79280755 2.06095199,4.4936047 C2.18415316,4.19440185 2.47695595,4 2.80015903,4 L9.20021997,4 C9.52342305,4 9.81542583,4.19440185 9.93942701,4.4936047 C10.0634282,4.79280755 9.99462754,5.13681083 9.76582536,5.365613 L6.56579489,8.56564348 C6.4097934,8.72164496 6.20499145,8.80004571 6.0001895,8.80004571 Z\">" + 
                                        "</path>" + 
                                    "</defs>" + 
                                    "<use fill-rule=\"evenodd\" xlink:href=\"#dropdown-tiny-a\"></use>" + 
                                "</svg>" + 
                            "</div>" + 
                            "<div class=\"wds-dropdown__content wds-is-not-scrollable wds-is-right-aligned\">" + 
                                "<ul class=\"wds-list wds-is-linked\" id=\"user-more-dropdown\">" + 
                                    "<li id=\"user-md-logs-dropdown\" class=\"wds-dropdown-level-2\">" + 
                                        "<a href=\"" + PAGE_PATHNAME + "Special:Log/" + username + "\" class=\"wds-dropdown-level-2__toggle\">" + 
                                            "<span>Logs</span>" + 
                                            "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 12 12\" class=\"wds-icon wds-icon-tiny wds-dropdown-chevron\" id=\"wds-icons-menu-control-tiny\">" + 
                                                "<path d=\"M11.707 3.293a.999.999 0 0 0-1.414 0L6 7.586 1.707 3.293A.999.999 0 1 0 .293 4.707l5 5a.997.997 0 0 0 1.414 0l5-5a.999.999 0 0 0 0-1.414\" fill-rule=\"evenodd\"></path>" + 
                                            "</svg>" + 
                                        "</a>" + 
                                        "<div class=\"wds-is-not-scrollable wds-dropdown-level-2__content\">" + 
                                            "<ul class=\"wds-list wds-is-linked\">" + 
                                                "<li><a href=\"" + PAGE_PATHNAME + "Special:Log/" + username + "?type=abusefilter\">Filter Modification Log</a></li>" + 
                                                "<li><a href=\"" + PAGE_PATHNAME + "Special:Log/" + username + "?type=delete\">Deletion Log</a></li>" + 
                                                "<li><a href=\"" + PAGE_PATHNAME + "Special:Log/" + username + "?type=move\">Move Log</a></li>" + 
                                                "<li><a href=\"" + PAGE_PATHNAME + "Special:Log/" + username + "?type=protect\">Protection Log</a></li>" + 
                                                "<li><a href=\"" + PAGE_PATHNAME + "Special:Log/" + username + "?type=rights\">User Rights Log</a></li>" + 
                                                "<li><a href=\"" + PAGE_PATHNAME + "Special:Log/" + username + "?type=block\">Block Log</a></li>" +
                                        "</ul>" + 
                                    "<div>" + 
                                "</li>" + 
                                "<li id=\"user-md-contribs\"><a href=\"" + PAGE_PATHNAME + "Special:Contributions/" + username +"\">Contributions</a></li>" + 
                                (CAN_DELETE?"<li id=\"user-md-del-contribs\"><a href=\"" + "PAGE_PATHNAME + Special:DeletedContributions/" + username + "\">Del. Contribs</a></li>":"") + 
                                "<li id=\"user-md-uploads\"><a href=\"" + PAGE_PATHNAME + "Special:Log/" + username + "?type=upload\">Uploads</a></li>" + 
                                "<li id=\"user-md-abuselog\"><a href=\"" + PAGE_PATHNAME + "Special:AbuseLog?wpSearchUser=" + username + "\">Abuse log</a></li>" + 
                                "<li id=\"user-md-abusefilter-examine\"><a href=\"" + PAGE_PATHNAME + "Special:AbuseFilter/examine?wpSearchUser=" + username + "&submit=1\">Examine Edits</a></li>" + 
                           "</ul>" + 
                        "</div>" + 
                    "</div>" +
                "</li>" + 
            "</ul>"
        );
    }
    });
    
    }
    
    var inter = setInterval(function() {
        if ($('.user-identity-box__info').length && (namespace === -1 || namespace === 2)) {
            clearInterval(inter);
            main();
        } else {
            clearInterval(inter);
            main();
        }
    }, 50);
    
})(jQuery, mediaWiki, window);