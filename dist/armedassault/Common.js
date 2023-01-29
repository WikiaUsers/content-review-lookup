$(function() {
    var rights = {};
    rights["Dimas535"] = ["BUREAUCRAT", "ADMINISTRATOR"];

    if (typeof rights[wgTitle] != "undefined") {
        $('.UserProfileMasthead .masthead-info span.tag').remove();
 
        for (var i = 0, len = rights[wgTitle].length; i < len; i++) {
            $('<span class="tag">' + rights[wgTitle][i] + '</span>' + '<span>' + '&nbsp;' + '</span>').appendTo('.masthead-info hgroup');
        }
    }
});

// #################################################################################################################################################### //

var hasClass = (function () {
    var reCache = {};
    return function (element, className) {
        return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
    };
})();

var autoCollapse = 1;
var collapseCaption = "hide";
var expandCaption = "show";
 
function collapseTable(tableIndex)
{
    var Button = document.getElementById("collapseButton" + tableIndex);
    var Table = document.getElementById("collapsibleTable" + tableIndex);
 
    if (!Table || !Button) {
        return false;
    }
 
    var Rows = Table.rows;
 
    if (Button.firstChild.data == collapseCaption) {
        for (var i = 1; i < Rows.length; i++) {
            Rows[i].style.display = "none";
        }
        Button.firstChild.data = expandCaption;
    } else {
        for (var i = 1; i < Rows.length; i++) {
            Rows[i].style.display = Rows[0].style.display;
        }
        Button.firstChild.data = collapseCaption;
    }
}
 
function createCollapseButtons() {
    var tableIndex = 0;
    var collapseIndex = 0;
    var NavigationBoxes = new Object();
    var Tables = document.getElementsByTagName("table");
 
    for (var i = 0; i < Tables.length; i++) {
        if (hasClass(Tables[i], "collapsible")) {
            var HeaderRow = Tables[i].getElementsByTagName("tr")[0];
            if (!HeaderRow) continue;
            var Header = HeaderRow.getElementsByTagName("th")[0];
            if (!Header) continue;
 
            NavigationBoxes[tableIndex] = Tables[i];
            Tables[i].setAttribute("id", "collapsibleTable" + tableIndex);
 
            var Button = document.createElement("span");
            var ButtonLink = document.createElement("a");
            var ButtonText = document.createTextNode(collapseCaption);
 
            Button.style.styleFloat = "right";
            Button.style.cssFloat = "right";
            Button.style.fontWeight = "normal";
            Button.style.textAlign = "right";
            Button.style.width = "6em";
            Button.style.marginRight = "5px";
            Button.style.color = "white";
            Button.className = "t_show_hide";
 
            ButtonLink.style.color = "white";
            ButtonLink.setAttribute("id", "collapseButton" + tableIndex);
            ButtonLink.setAttribute("href", "javascript:collapseTable(" + tableIndex + ");");
            ButtonLink.appendChild(ButtonText);
 
            Button.appendChild(document.createTextNode("["));
            Button.appendChild(ButtonLink);
            Button.appendChild(document.createTextNode("]"));
 
            Header.insertBefore(Button, Header.childNodes[0]);
 
            if (!hasClass(Tables[i], "nocount")) {
		collapseIndex++;
	    }
            tableIndex++;
        }
    }
 
    for (var i = 0; i < tableIndex; i++) {
        if (hasClass( NavigationBoxes[i], "collapsed") || (collapseIndex >= autoCollapse && hasClass(NavigationBoxes[i], "autocollapse"))) {
            collapseTable(i);
        } 
        else if (hasClass(NavigationBoxes[i], "innercollapse")) {
            var element = NavigationBoxes[i];
            while (element = element.parentNode) {
                if (hasClass(element, "outercollapse")) {
                    collapseTable (i);
                    break;
                }
            }
        }
    }
}
 
addOnloadHook(createCollapseButtons);

// #################################################################################################################################################### //

$(function() {
 
    'use strict';
 
    var $textarea = $('#wpSummary');
 
    if (!$textarea.length || document.getElementById('stdSummaries')) return;
 
    var templateLoader = $.get('/wiki/Template:Edit Description?action=raw');
 
    $textarea.attr('tabindex', '3'); //set tabindex for summaries text area
    $('#wpMinoredit').attr('tabindex', '4'); //set tabindex for minor edit checkbox
    $('#wpSave').attr('tabindex', '5'); //set tabindex for publish button
 
    var $summary = $('#wpSummaryEnhanced');
    if (!$summary.length) $summary = $textarea;
 
    $('head').append('<style type="text/css">#stdSummaries {padding: 1px 2px; width: 265px} .editpage-sourcewidemode-on.mode-source #stdSummaries {left: -17px; position: relative; top: 25px; width: 278px; }</style>');
 
    var $combo = $('<select id="stdSummaries" tabindex="2"></select>')
    .insertAfter($textarea)
    .change(function() {
        var val = $summary.val();
        $summary.val(val + (val.length ? '; ' : '') + $(this).val());
    });
 
    templateLoader
    .done(function (data) {
        var lines = data.split(/\r\n|\n|\r/),
            options = '', selected = ' selected',
            ignore = { ':': 1, '*': 1,  '<': 1 };
        for (var i = 0; i < lines.length; i++, selected = '') {
            if (!lines[i].length || ignore[lines[i][0]]) {
                continue; // lines beginning with these characters: : * < are ignored
            }
            if (lines[i].substring(0, 3) === '-- ') {
                var contents = lines[i].substring(3);
                options += '<option value="' + contents + '"' +
                    selected + '>&nbsp;&nbsp;' + contents + '</option>';
            } else {
                options += '<option value="" disabled' +
                    selected + '>' + lines[i] + '</option>';
            }
        }
        $combo.append(options);
    });
});

// ================================================================
// BEGIN - Username replace function ([[Template:USERNAME]])
// * Description: Inserts user name into <span class="insertusername"></span>
// * Maintainers: [[User:Splarka]] (original), [[User:Spang]] (current)
// ================================================================

$(document).ready( function () {
   if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
   $('span.insertusername').each(function() {
       $(this).text(wgUserName);
   });
});

// ================================================================
// END - Username replace function ([[Template:USERNAME]])
// ================================================================