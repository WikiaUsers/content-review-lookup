/* Das folgende JavaScript wird für alle Benutzer geladen. */
window.railWAM = {
    logPage         : 'Project:WAM Log',
    autoLogForUsers : ['Harry granger', 'Agent Zuri']
};

function setSpecialUploadTemplate() {
    var editbox = $('#wpUploadDescription');
    if (!editbox || editbox.val() !== '') return;
    editbox.val("{{Dateiinfo\n" +
                  "|Beachten=\n" +
                  "|Beschreibung=\n" +
                  "|Quelle=\n" +
                  "|Autor=\n" +
                  "|Dateispezis=\n" +
                  "|Lizenz=\n" +
                  "|Andere Versionen=\n" +
                  "|Kategorien=\n" +
                  "}}");
}
addOnloadHook(setSpecialUploadTemplate);

///////////////////////////////////////////////////////////////////////////////////////////////////////////

// ADVANCED AJAX AUTO-REFRESHING ARTICLES
// Code originally by "pcj" of Wowpedia
// Maintenance, cleanup, style and bug fixes by Grunny (http://starwars.wikia.com/wiki/User:Grunny)

///////////////////////////////////////////////////////////////////////////////////////////////////////////

var ajaxIndicator = 'https://images.wikia.nocookie.net/dev/images/8/82/Facebook_throbber.gif',
    ajaxTimer,
    ajaxRefresh = 60000,
    AjaxRCRefreshText = 'Auto-Aktualisierung',
    refreshText = 'Auto-Aktualisierung',
    refreshHover = 'Enable auto-refreshing page loads',
    doRefresh = true;

if (!window.ajaxPages) {
    var ajaxPages = [
        //en, de, cannonical
        'Special:WikiActivity', 'Spezial:WikiActivity', 'WikiActivity',
        'Special:RecentChanges', 'Spezial:Letzte Änderungen', 'RecentChanges',
        'Special:Watchlist', 'Spezial:Beobachtungsliste', 'Watchlist',
        'Special:Log', 'Spezial:Logbuch', 'Log',
        'Special:NewFiles', 'Spezial:Bilder', 'NewFiles'
    ];
}
if (!window.ajaxCallAgain) {
    var ajaxCallAgain = [];
}
if (typeof AjaxRCRefreshText == "string") {
    refreshText = AjaxRCRefreshText;
}
if (typeof AjaxRCRefreshHoverText == "string") {
    refreshHover = AjaxRCRefreshHoverText;
}

/**
 * Sets the cookie
 * @param c_name string Name of the cookie
 * @param value string 'on' or 'off'
 * @param expiredays integer Expiry time of the cookie in days
 */
function setCookie(c_name, value, expiredays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = c_name + "=" + escape(value) + ((expiredays === null) ? "" : ";expires=" + exdate.toGMTString());
}

/**
 * Gets the cookie
 * @param c_name string Cookie name
 * @return The cookie name or empty string
 */
function getCookie(c_name) {
    if (document.cookie.length > 0) {
        var c_start = document.cookie.indexOf(c_name + "=");
        if (c_start !== -1) {
            c_start = c_start + c_name.length + 1;
            var c_end = document.cookie.indexOf(";", c_start);
            if (c_end === -1) {
                c_end = document.cookie.length;
            }
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
}

/**
 * Main function to start the Auto-refresh process
 */
function preloadAJAXRL() {
    var _cookie = getCookie("ajaxload-" + wgPageName);
    var ajaxRLCookie = _cookie == "on";
    var appTo;
    
    if($('#WikiaPageHeader').exists()) {
        appTo = $('#WikiaPageHeader');
    }
    else if($('#AdminDashboardHeader').exists()) {
        appTo = $('#AdminDashboardHeader > h1');
    }
    else {
        appTo = $('.firstHeading');
    }
    
    appTo.append('&nbsp;',
        $('<span />',{id: 'ajaxRefresh'}).css({
            'font-size': 'xx-small',
            'line-height': '100%'
        }).append(
            $('<span />',{id: 'ajaxToggleText'}).css({
                'border-bottom': '1px dotted',
                'cursor': 'help'
            }).attr('title',refreshHover).text(refreshText + ':'),
            $('<input />',{id: 'ajaxToggle'}).css({
                'margin-bottom': 0  
            }).attr('type','checkbox'),
            $('<span />',{id: 'ajaxLoadProgress'})
                .css('display','none')
                .html(
                    $('<img />').attr('src',ajaxIndicator).css({
                        'vertical-align': 'baseline',
                        'float': 'none',
                        'border': 'none'
                    }).attr('alt','Refreshing page')
                )
        )
    );
    
    $('#ajaxLoadProgress').ajaxSend(function (event, xhr, settings) {
        if (location.href == settings.url) {
            $(this).show();
        }
    }).ajaxComplete(function (event, xhr, settings) {
        if (location.href == settings.url) {
            $(this).hide();
            for (var i in ajaxCallAgain) {
                ajaxCallAgain[i]();
            }
        }
    });
    $('#ajaxToggle').click(toggleAjaxReload);
    $('#ajaxToggle').attr('checked', ajaxRLCookie);
    if (ajaxRLCookie) {
        loadPageData();
    }
}

/**
 * Turn refresh on and off by toggling the checkbox
 */
function toggleAjaxReload() {
    if ($('#ajaxToggle').prop('checked') === true) {
        setCookie("ajaxload-" + wgPageName, "on", 30);
        doRefresh = true;
        loadPageData();
    } else {
        setCookie("ajaxload-" + wgPageName, "off", 30);
        doRefresh = false;
        clearTimeout(ajaxTimer);
    }
}

/**
 * Does the actual refresh
 */
function loadPageData() {
    var cC = ($('#WikiaArticle').length) ? '#WikiaArticle' : '#bodyContent';
    $(cC).load(location.href + " " + cC + " > *", function (data) {
        if (doRefresh) {
            ajaxTimer = setTimeout(loadPageData, ajaxRefresh);
        }
    });
}

/**
 * Load the script on specific pages
 */
$(function () {
    for (var x in ajaxPages) {
        if (wgPageName == ajaxPages[x] && $('#ajaxToggle').length === 0) {
            preloadAJAXRL();
        }
    }
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////

// END OF AJAX AUTO-REFRESH

///////////////////////////////////////////////////////////////////////////////////////////////////////////
 
// **************************************************
//  - end -  Experimental javascript countdown timer
// **************************************************


/* Replaces {{BENUTZERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */
 
function UserNameReplace() {
    if (typeof (disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").html(wgUserName);
}
mw.hook('wikipage.content').add(UserNameReplace);
 
/* End of the {{BENUTZERNAME}} replacement */