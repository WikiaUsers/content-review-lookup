/* Any JavaScript here will be loaded for all users on every page load. */
//<nowiki>

// some scripts (especially ones from RS3 wiki) need this
window.rswiki = { loaded: {} };

// AjaxRC - http://dev.wikia.com/wiki/AjaxRC
// Imported in MediaWiki:ImportJS
window.AjaxRCRefreshText = 'Auto-refresh';
window.ajaxPages = [
    "Special:RecentChanges",
    "Special:Watchlist",
    "Special:Log",
    "Special:Contributions",
    "Forum:Watercooler",
    "Special:AbuseLog",
    "Special:NewFiles",
    "Category:Speedy_deletion_candidates",
    "Category:Speedy_move_candidates",
    "Special:Statistics",
    "Special:NewPages",
    "Special:ListFiles",
    "Special:Log/move"
];

var scripts = [
    'MediaWiki:Common.js/compare.js',
    'u:dev:DISPLAYTITLE/code.js',
    'MediaWiki:Common.js/youtube.js',
    'MediaWiki:Wikia.js/sidebar.js',
    'MediaWiki:Common.js/gemwupdate.js',
    'u:dev:MediaWiki:Countdown/code.js',
];

//Switch Infobox
if ($('.switch-infobox').length) {
   scripts.push('u:runescape:User:-Matt/SwitchInfobox.js');
   importStylesheetPage('User:-Matt/SwitchInfobox.css', 'runescape');
}

// AWB (In browser)
importScriptURI('//en.wikipedia.org/w/index.php?title=User:Joeytje50/AWB.js/load.js&action=raw&ctype=text/javascript');

//Highlight tables
if ($( '.lighttable' ).length) {
  scripts.push('u:runescape:MediaWiki:Common.js/highlightTable.js');
}

// Automatic file fixing
if (wgPageName.indexOf("Special:MovePage/File:") != -1 || (wgCanonicalNamespace == "File" && Storage)){
   window.LIRoptions = {
    bottomMessage: 'This appears below the buttons on Special:MovePage',
    editSummary: 'Updating file link (automatic)',
    singleButtonText: 'Rename and replace',
        queueButtonText: 'Rename and add to queue'
   };

   scripts.push('u:dev:FileUsageAuto-update/code.js');
}

// Unchecks redirects when moving files
if (wgPageName.indexOf("Special:MovePage/File:") != -1) {
    $('input#wpLeaveRedirect').removeAttr('checked');
}

if ((wgUserGroups||[]).indexOf('sysop')!=-1) {
    window.autoWelcomeText = '{{subst:Welcome|~~~~}}';
    window.autoWelcomeSummary = '';
    scripts.push('u:runescape:User:Quarenon/autowelcome.js');
}

//calc.js import from main RSWiki
if ($('.jcConfig').length) {
    scripts.push('u:runescape:MediaWiki:Common.js/calc.js');
    importStylesheetPage('MediaWiki:Common.css/calc.css', 'rs');
}

//autosort script from main RSWiki
//see http://rs.wikia.com/?oldid=11201653 for usage
if ($('.sortable').length) {
	window.rswiki.autosort = function(){
		mw.loader.using('jquery.tablesorter', function () {
			$('.sortable[class*="autosort="]').each(function () {
	            var $this = $(this),
	                matched = (' ' + $(this).attr( 'class') + ' ')
	                    .match(/autosort=(\d+)[,-]{1}(a|d)/),
	                $sortCol = $this
	                    .find('> thead th:nth-child(' + matched[1] + ')');
	
	            if (matched[2] === 'd') {
	                // descending
	                $sortCol.click().click();
	            } else {
	                // ascending
	                $sortCol.click();
	            }
	        });
	    });
	};
	$(window.rswiki.autosort);
}

/**
* Moves topright icons from [[Template:External]] to be inserted into Wikia pageheader
* Requires additional CSS in [[MediaWiki:Common.css]]
*
* @author The 888th Avatar (Avatar Wiki)
* @author Cqm
* @author Joeytje50
*/
if ($('.topright-icon').length) {
    (function () {
        var $icons = $('<div>').attr('id', 'rs-header-icons');

        // there's no class on this div, but it should end up after the language
        // dropdown if it's present or where the dropdown would be if not
        $('.page-header__contribution > div').first().append($icons);

        $('.topright-icon').each(function () {
            $icons.append($(this).html());
        });
    })();
}

var util = {
        /**
         * Adds commas to a number string
         *
         * @example 123456.78 -> 123,456.78
         *
         * @param num {number|string} A number to add commas to
         *
         * @returns {string} The number with commas
         */
        addCommas: function (num) {
            num += '';

            var x = num.split('.'),
                x1 = x[0],
                x2 = x.length > 1
                    ? '.' + x[1]
                    : '',
                rgx = /(\d+)(\d{3})/;

            while (rgx.test(x1)) {
                x1 = x1.replace(rgx, '$1,$2');
            }

            return x1 + x2;
        }
};

if($('#XPEach, #GEPrice, #killXP').length) {
    scripts.push('MediaWiki:Common.js/monstercalc.js');
}

// GE Price charts
if($('.GEdatachart').length) {
    scripts.push('MediaWiki:Common.js/GECharts.js');
}

/**
 * Makes the disambiguation parenthesis grey
 */
if (
    wgNamespaceNumber === 0
    && wgTitle.lastIndexOf('(') > -1
    && !$('.no-parenthesis-style').length
   ) {
    (function () {
        var title = $('.page-header__title, h1#firstHeading').text(),
            start = title.lastIndexOf('('),
            end = title.substring(start, title.length).lastIndexOf(')');

        // add offset here
        end += start + 1;

        // wikia skin, monobook skin
        $('.page-header__title, h1#firstHeading')
            .empty()
            .append(
                title.substring(0, start),
                $('<span>')
                    .addClass('title-parenthesis')
                    .text(title.substring(start, end)),
                title.substring(end, title.length)
            );
    })();
}

importArticles({
    type: 'script',
    articles: scripts
});