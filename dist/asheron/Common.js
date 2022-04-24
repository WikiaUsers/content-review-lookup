/* Any JavaScript here will be loaded for all users on every page load. */

/* --- Tooltips --- */
// default setting to turn tooltips on
var tooltipsOn = true;

var $tfb, $ttfb, $htt;
activeHoverLink = null;
tipCache = {};

// hides the tooltip
function hideTip() {
	$tfb.removeClass("tooltip-ready").addClass("hidden").css("visibility","hidden"); 
	$tfb.children().remove();
	if ($(this).data('ahl-id') == activeHoverLink) activeHoverLink = null;
}

// displays the tooltip
function displayTip(e) {
	$htt.not(":empty").removeClass("hidden").addClass("tooltip-ready");
	moveTip(e);
	$htt.not(":empty").css("visibility","visible");
	moveTip(e);
}

// moves the tooltip
function moveTip(e) {
	$ct = $htt.not(":empty");
	var eh = $ct.innerHeight() + 20, wh = $(window).height();
	var newTop = e.clientY + ((e.clientY > (wh/2)) ? -eh : 20);
	var newLeft = e.clientX + ((e.clientX > ($(window).width()/2)) ? -($ct.innerWidth()+20):20);
	newTop = Math.max(0, Math.min(wh - eh, newTop));

	$ct.css({"position":"fixed","top":newTop + "px","left":newLeft + "px"});
}

// AJAX tooltips
function showTipFromCacheEntry(e, url, tag) {
	var h = tipCache[url + " " + tag];
	if (!h) {
		h = tipCache[url].find(tag);
		if (h.length) tipCache[url + " " + tag] = h;
	}
	if (!h.length) {
		$tfb.html('<div class="tooltip-content"><b>Error</b><br />This target either has no tooltip<br />or was not intended to have one.</div>');
	} else {
		h.css("display", "").addClass("tooltip-content");
		$tfb.html(h);
	}
	displayTip(e);
}
function showTip(e) {
	var $t = $(this);
	$p = $t.parent();
	if ($p.hasClass("selflink") == false) {
                $t.removeAttr("title");
                $p.removeAttr("title");
		var tooltipIdentifier = "div.tooltip-content", tooltipTag = $t.attr("class").match(/taggedttlink(-[^\s]+)/)
		if ($t.hasClass("versionsttlink")) tooltipIdentifier += activeVersionTag;
		else if (tooltipTag) tooltipIdentifier += tooltipTag[1];
		var url = "/index.php?title=" + encodeURIComponent(decodeURIComponent($t.data("tt"))) + "&action=render " + 'div[class*="tooltip-content"]';
		var tipId = url + " " + tooltipIdentifier;
		activeHoverLink = tipId;
		$t.data('ahl-id', tipId);
		if (tipCache[url] != null) return showTipFromCacheEntry(e, url, tooltipIdentifier);
		$('<div style="display: none"/>').load(url, function(text) {
			if (text == "") return; // Occurs when navigating away from the page cancels the XHR
			tipCache[url] = $(this);
			if (tipId != activeHoverLink) return;
			showTipFromCacheEntry(e, url, tooltipIdentifier);
		});
	}
}

// quick tooltips
function hideTemplateTip() {
	$ttfb.html("").removeClass("tooltip-ready").addClass("hidden"); 
}

function showTemplateTip(e) {
	$ttfb.html('<div class="tooltip-content">' + $(this).next().html() + '</div>');
	displayTip(e);
}

// add the tooltip calls to the page
function bindTT() {
	$t=$(this);
	$p=$t.parent();
	if ($p.hasClass("selflink") == false) {
		$t.data("tt", $p.attr("title").replace(" (page does not exist)","").replace("?","%3F")).hover(showTip,hideTip).mousemove(moveTip);
	}
}

function tooltipsInit(root) {
	if (!tooltipsOn) return;
	if ($tfb == null) {
		$(article).append('<div id="tfb" class="htt"></div><div id="templatetfb" class="htt"></div>');
		$tfb = $("#tfb");
		$ttfb = $("#templatetfb");
		$htt = $("#tfb,#templatetfb");
	}
	root.find(".ajaxoutertt > a").wrapInner('<span class="ajaxttlink" />');
	root.find(".ajaxoutertt, .ajaxoutertt-soft").each(function() {
		var cn = this.className.replace(/(?:^|\s)ajaxoutertt[^\s]*/, "").replace(/^\s+|\s+$/g, "");
		if (cn) $(this).find("span.ajaxttlink").addClass(cn);
	});
	root.find("span.ajaxttlink").each(bindTT);
	root.find("span.tttemplatelink").hover(showTemplateTip,hideTemplateTip).mousemove(moveTip);
}

$(function() {
  if(skin=='oasis') { article = '#WikiaMainContent'; }
  else { article = '#bodyContent'; }
tooltipsInit($(article));
});


/** Collapsible tables *********************************************************
 *
 *  Description: Allows tables to be collapsed, showing only the header. See
 *                         http://www.mediawiki.org/wiki/Manual:Collapsible_tables.
 *  Maintainers: [[en:User:R. Koot]]
 */
 
var autoCollapse = 2;
var collapseCaption = 'hide';
var expandCaption = 'show';
 
function collapseTable( tableIndex ) {
        var Button = document.getElementById( 'collapseButton' + tableIndex );
        var Table = document.getElementById( 'collapsibleTable' + tableIndex );
 
        if ( !Table || !Button ) {
                return false;
        }
 
        var Rows = Table.rows;
 
        if ( Button.firstChild.data == collapseCaption ) {
                for ( var i = 1; i < Rows.length; i++ ) {
                        Rows[i].style.display = 'none';
                }
                Button.firstChild.data = expandCaption;
        } else {
                for ( var i = 1; i < Rows.length; i++ ) {
                        Rows[i].style.display = Rows[0].style.display;
                }
                Button.firstChild.data = collapseCaption;
        }
}
 
function createCollapseButtons() {
        var tableIndex = 0;
        var NavigationBoxes = new Object();
        var Tables = document.getElementsByTagName( 'table' );
 
        for ( var i = 0; i < Tables.length; i++ ) {
                if ( hasClass( Tables[i], 'collapsible' ) ) {
 
                        /* only add button and increment count if there is a header row to work with */
                        var HeaderRow = Tables[i].getElementsByTagName( 'tr' )[0];
                        if ( !HeaderRow ) {
                                continue;
                        }
                        var Header = HeaderRow.getElementsByTagName( 'th' )[0];
                        if ( !Header ) {
                                continue;
                        }
 
                        NavigationBoxes[tableIndex] = Tables[i];
                        Tables[i].setAttribute( 'id', 'collapsibleTable' + tableIndex );
 
                        var Button = document.createElement( 'span' );
                        var ButtonLink = document.createElement( 'a' );
                        var ButtonText = document.createTextNode( collapseCaption );
 
                        Button.className = 'collapseButton'; // Styles are declared in [[MediaWiki:Common.css]]
 
                        ButtonLink.style.color = Header.style.color;
                        ButtonLink.setAttribute( 'id', 'collapseButton' + tableIndex );
                        ButtonLink.setAttribute( 'href', "javascript:collapseTable(" + tableIndex + ");" );
                        ButtonLink.appendChild( ButtonText );
 
                        Button.appendChild( document.createTextNode( '[' ) );
                        Button.appendChild( ButtonLink );
                        Button.appendChild( document.createTextNode( ']' ) );
 
                        Header.insertBefore( Button, Header.childNodes[0] );
                        tableIndex++;
                }
        }
 
        for ( var i = 0;  i < tableIndex; i++ ) {
                if ( hasClass( NavigationBoxes[i], 'collapsed' ) || ( tableIndex >= autoCollapse && hasClass( NavigationBoxes[i], 'autocollapse' ) ) ) {
                        collapseTable( i );
                } else if ( hasClass( NavigationBoxes[i], 'innercollapse' ) ) {
                        var element = NavigationBoxes[i];
                        while ( element = element.parentNode ) {
                                if ( hasClass( element, 'outercollapse' ) ) {
                                        collapseTable( i );
                                        break;
                                }
                        }
                }
        }
}


/* --- Calculate PXP --- */

function xp_at_level(level)
{
    if (level < 2)
        return 0;

    if (level == 2)
        return 1000;

    if (level <= 126)
        return Math.ceil((Math.pow((level + 5), 5) - Math.pow(6, 5)) / 9.0);

    return Math.round((Math.pow((level + 5), 5) - Math.pow(6, 5)) / 9.0);
}

function xp_to_next_level(level)
{
    if (level < 0 || level > 274)
        return 0;

    return xp_at_level(level + 1) - xp_at_level(level);
}

function percent_xp_to_next_level(level, percent)
{
    return Math.floor(xp_to_next_level(level) * percent / 100.0);
}

function format_xp(mystring)
{
    var result;
    var pos;

    mystring += '';
    if (mystring.length <= 3) {
        result = mystring;
    } else {
        var count = 0;
        result = "";
        for (pos = mystring.length - 3; pos >= 0 && count < 20; pos -= 3, count++) {
            if (result.length == 0)
                result = mystring.substr(pos, 3);
            else
                result = mystring.substr(pos, 3) + "," + result;
        }
        if (pos > -3)
            result = mystring.substr(0, 3+pos) + "," + result;
    }

    return result;
}

function calc_and_display_pxp(index)
{
    var level = parseInt($('#pxp_level_input_' + index).val());
    var percent = parseFloat($('#pxp_percent_input_' + index).val());

    $('#pxp_result_' + index).html(' = ' + format_xp(percent_xp_to_next_level(level, percent)));

    return false;
}

function createPXPCalculationForms()
{
    $('p.calc-pxp').each(function(offset) {
        var form = $("<div>");
        var input1 = $("<input>");
        var input2 = $("<input>");
        var input3 = $("<input>");
        var span = $("<span>");
        form.data('pxp-form',offset);

        input1.attr("size", "6");
        input1.val('200');
        input1.attr("id", "pxp_level_input_" + offset);

        input2.attr("size", "6");
        input2.val("10");
        input2.attr("id", "pxp_percent_input_" + offset);

        input3.attr("type", "submit");
        input3.val("Calculate PXP");

        span.attr("id", "pxp_result_" + offset);
        span.html("??? xp");

        form.append("Level: ");
        form.append(input1);
        form.append(" Percent: ");
        form.append(input2);
        form.append(input3);
        form.append(span);
        form.find('input').on('change click keyup',function(event) {
            var index = parseInt($(this).parent().data('pxp-form'));
            var level = parseInt($('#pxp_level_input_' + index).val());
            var percent = parseFloat($('#pxp_percent_input_' + index).val());

            $('#pxp_result_' + index).html(' = ' + format_xp(percent_xp_to_next_level(level, percent)));
        });
        $(this).append(form);
    });
}

$(createPXPCalculationForms);


/** Test if an element has a certain class **************************************
 *
 * Description: Uses regular expressions and caching for better performance.
 * Maintainers: [[User:Mike Dillon]], [[User:R. Koot]], [[User:SG]]
 *
 * @deprecated:  Use $(element).hasClass() instead.
 */
 
var hasClass = ( function() {
        var reCache = {};
        return function( element, className ) {
                return ( reCache[className] ? reCache[className] : ( reCache[className] = new RegExp( "(?:\\s|^)" + className + "(?:\\s|$)" ) ) ).test( element.className );
        };
})();
 
 
/** Alternating table rows 
 *
 */
 
/* alternating colors for table rows. */
function setAlternateRows(tbl, parseClass) {
    rows = tbl.getElementsByTagName("tr");
    for (k = 1; k < rows.length; k++) {
        rows[k].className = (k % 2 == 0 ? "even" : "odd");
    }
    return;
}
/* To add a "pallet" for a table, simply modify the CASE argument and add the name
   of the CSS class that you want colors for. */
function alternateRows() {
    tbls = document.getElementsByTagName("table");
    for (i = 0; i < tbls.length; i++) {
        tbl = tbls[i];
        parseClasses = tbl.className.split(" ");
        for (j = 0; j < parseClasses.length; j++) {
            parseClass = parseClasses[j];
            switch( parseClass ) {
                case "altRows":
                    setAlternateRows( tbl, parseClass );
                    break;
                case "altRowsMed":
                    setAlternateRows( tbl, parseClass );
                    break;
                case "altRowsMed2":
                    setAlternateRows( tbl, parseClass );
                    break;
                case "altRowsSmall":
                    setAlternateRows( tbl, parseClass );
                    break;
                case "altRowsMP":
                    setAlternateRows( tbl, parseClass );
                    break;
                default:
                    break;
            }
        }
    }
}
 
 
/* This code is executed on a pages after loading has finished */
$(function() {
	createCollapseButtons();
	alternateRows();
});