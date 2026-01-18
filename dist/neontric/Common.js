/* ######################################################################## */
/* ### JavaScript here will be loaded for all users on every page load. ### */
/* ######################################################################## */
// ============================================================
 
/* Please see MediaWiki:ImportJS for imported JS */
 
/*** Collapsible trs v2 ***************************************************
 * Allows associated table rows to collapse under another
 * Uses class "collapsibletr" to set collapsibility
 * Class "collapsed" makes it collapsed by default
 * Collapses all rows underneath it until another tr has
 * the class "collapsibletr", or a tr has the class "uncollapsibletr"
 ****************************************************************************/
$('tr.collapsibletr').each(function(){
     $(this).nextUntil('.collapsibletr, .uncollapsible').hide();
}).click(function(){
     $(this).toggleClass('collapsed').nextUntil('.collapsibletr, .uncollapsible').toggle();
});

/*** Scrollable tables v2 **************************************************
 * Allows a table to scroll vertically, retaining table header
 * Uses class "scrollable" to allow scrolling header
 * Requires create tHead
 ****************************************************************************/
mw.util.addCSS('.scrollable-process th, .scrollable-process td {border-width: 0 !important}');
document.querySelectorAll("table.scrollable").forEach(function (table) {
  createTHead(table);
  var $table = $(table);
  $table.addClass('scrollable-process scrollable-active');
  $table.find('thead tr th').each(function(i, v) {
    var $this = $(this),
        dataWidth = $($table.find('tbody tr:first').children().get(i)).width(),
        headWidth = $this.width();
    if (headWidth > dataWidth) {
        $($table.find('tbody tr:first').children().get(i)).width(headWidth);
        $this.width(headWidth);// needed in case of pre-existed inline-styling
    } else {
        $this.width(dataWidth);
    }
  });
  $table.removeClass('scrollable-process');
});

/* create tHead helper function
 * Takes header rows from tables and puts them in tHead element
 * Uses rows at beginning of table containing only THs
 * Stops at row with TDs or row with "first-row" class*/
function createTHead(table) {
    var thead = table.tHead;
    if (thead) return thead;
    thead = document.createElement("thead");
    var tbody = table.tBodies[0];
    table.insertBefore(thead, tbody);
    for (var i = 0; i < tbody.rows.length; i++) {
        var tbodyrow = tbody.rows[0];
        if (tbodyrow.querySelectorAll("td").length !== 0 || tbodyrow.classList.contains("first-row")) break;
        thead.appendChild(tbodyrow);
    }
    return thead;
}

/*** Mix X-2 generator ******************************************************
 * Creates a generator for Mixes in X-2 for use on "Mix (Final Fantasy X-2)"
 * Written by JBed of FFWiki
 ****************************************************************************/
if (mw.config.get("wgArticleId") === 41081 || mw.config.get("wgArticleId") === 334755) {
  importScriptPage("MediaWiki:X2mix.js");
}

/*** Special:Upload template preload *************************************
 * Automatically fills Special:Upload with {{infobox file}}
 ****************************************************************************/
/* --- Special:Upload template preload --- */

var matches = window.location.href.match(/wpForReUpload/);

if( matches && matches.length ) {
	var mwct;
} else {
	$("#mw-content-text #mw-upload-form fieldset #mw-htmlform-description tbody .mw-htmlform-field-HTMLTextAreaField .mw-input #wpUploadDescription").html("{{infobox file\n|description = \n|source      = \n}}\n\n[[Category:]]");
	$("#mw-upload-form fieldset table#mw-htmlform-description tbody tr.mw-htmlform-field-Licenses").hide();
}

mw.config.set('UMFBypassLicenseCheck',true);
 
/*** Article info box *******************************************************
 * Creates and displays article info box (if page has something to display)
 * Adds sideicons in the given order
 ****************************************************************************/
$(function(){
    var icons = document.getElementsByClassName('sideicon');
    if (icons.length > 0) {
        $('<section class="rail-module" id="sideiconrail"><h2>Article information:</h2></section>').appendTo('#WikiaRail');
        var artinf = document.getElementById("sideiconrail");
        if (artinf) {
            var j = icons.length;
            for (i = 0; i < j; i++) artinf.appendChild(icons[0]);
        }
    }
    
    $(".sideicon").show();
});
 
/*** Refocus {{A}} **********************************************************
 * Takes {{A}} uses in tables and relocates them to the cell ID
 * Means it focuses on the cell instead of v-centered text
 ****************************************************************************/
$(".table th .attach, .table td .attach").each(function (_, $element) {
    var $ancestor = $element.closest("th, td");
 
    if (!$ancestor.id) {
        $ancestor.id = $element.id;
        $element.id = "";
    }
});


/*** Etymology **************************************************************
 * Create list of pages using etymology
 ****************************************************************************/
if (mw.config.get("wgNamespaceNumber") === 114) {
    mw.loader.using("mediawiki.api", function () {
        var query = {
            action: "query",
            list: "embeddedin",
            eititle: mw.config.get("wgPageName"),
            einamespace: 0,
            eilimit: 500
        };
 
        function addEtymologyUsageList(data) {
            var summary = document.getElementById("etymologyUsageSummary");
            var pages = data.query.embeddedin;
 
            if (!summary) {
                console.warn("No element with id `etymologyUsageSummary`.");
 
                return;
            }
 
            if (!pages.length) {
                summary.textContent = "This term is not used on any articles.";
 
                return;
            }
 
            var usageList = document.createElement("ul");
 
            pages
                .sort(function (a, b) {
                    return a.title.localeCompare(b.title);
                })
                .forEach(function (page) {
                    var target = mw.util.getUrl(page.title);
                    var link = document.createElement("a");
                    var text = document.createTextNode(page.title);
                    var listItem = document.createElement("li");
 
                    link.setAttribute("href", target);
                    link.setAttribute("title", page.title);
                    link.appendChild(text);
                    listItem.appendChild(link);
                    usageList.appendChild(listItem);
                });
 
            summary.textContent = "This term is used on the following articles:";
            summary.parentNode.insertBefore(usageList, summary.nextSibling);
        }
 
        new mw.Api().get(query).done(addEtymologyUsageList);
    });
}