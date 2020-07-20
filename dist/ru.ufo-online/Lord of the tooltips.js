/*
   ITEMTOOLTIPS

   This is an awesome script from http://www.wowpedia.org/User:Pcj with enhancements by me (EoD)

   A rough idea how it works (stuff in brackets should be removed later on):
   -Add mouseover behaviour to all ajaxttlink classes
   -Add 2 divs (with the ids #tfbx, #ttfbx) at the end of the page which are actually hidden
   -On mouse over, check if the link has already been loaded
    -true: put the cached content into #tfbx
    -false: load the page into #tfbx but only the part inside of <div class="tooltip-content">...</div>
   -when loading has finished cache the content
   -if mouse is still on the link: display the (now) cached content, but move it to the mouse-pointer so it can be displayed
   -if mouse is moved off the link: do nothing

Some tags you might want to know:
   <span class="ajaxttlink">This one uses the title of the parent tag and creates a popup out of it</span>
   <span class="disablett">If used *inside* an ajaxttlink, it will disable the popup</span>

   <span class="tttemplatelink">This creates a popup, with this text and</span><span style="display:none;">with this popup text</span>
     This might change a bit in the future

   If autoItemTooltipsOn is enabled:
     <a href="http://www.example.com/index.php/Item:XXX">An A-tag with a href containing the value "index.php/Item:" will automatically add an ajaxttlink inside</a>

*/

article = "";

// See [[Help:Tooltips]]
// default setting to turn tooltips on
var lordTooltipsOn = true;
var autoItemTooltipsOn = true;
var offsetY = 10;
var offsetX = offsetY;

// This checks if the script is included on another page outside of lotro-wiki.com
var external = window.location.hostname == "lotro-wiki.com" ? false : true;
/*
 * The url where mediawiki's index.php is located.
 * If unsure, set the following variable to ""
 *
 * Examples:
 *    If your wiki is on the domain www.example.com and your script isn't:
 *        If http://www.example.com/index.php:         extURL = "http://www.example.com";
 *        If http://www.example.com/wiki/index.php:    extURL = "http://www.example.com/wiki";
 *    If your wiki AND the script is on 'www.example.org':
 *        If http://www.example.org/index.php:         extURL = "";
 *        If http://www.example.org/wiki/index.php:    extURL = "/wiki";
 */
var extURL = external ? "http://lotro-wiki.com" : "";

/*
 * Allow users to specify an external db to change links to.
 * Expects a path where the wiki pagename can be appended.
 *
 * Examples:
 *    If you use plain mediawiki paths:       extDB = "/index.php?title="
 *    If you use wikipedia-like paths:        extDB = "/index.php/"
 *
 */
var extDB = extURL + (external ? "/index.php/" : "/index.php/");


var $tfb; //this is the actual displayed frame, it contains the content between two "tooltip-content" tags.
var $ttfb; //called "template tfb" used for quicktemplates, it automatically adds the "tooltip-content" tags so they can be displayed
var $htt; //called "hidden tooltip"
var activeHoverLink = null;
//We disable caching on external fetching (caching feature still missing)
var tipCache = external ? null : new Object();



/*
 * Error messages
 */

var INTERNAL_ERROR = '<div class="tooltip-content tooltip-error"><b>Error</b><br /><i>"DATA"</i><br />This target either has no tooltip<br />or was not intended to have one.</div>'
var INTERNAL_LOADING = '<div class="tooltip-error" style="position:fixed; top: CLIENT_Ypx; left: CLIENT_Xpx; visibility: visible;">Loading...</div>';
var EXTERNAL_LOADING = '<div class="tooltip-error" style="position:fixed; top: CLIENT_Ypx; left: CLIENT_Xpx; visibility: visible;">Loading from ' + extURL + '...</div>';

// hides the tooltip
function hideTip() {
    $tfb.html("").removeClass("tooltip-ready").addClass("hidden").css("visibility", "hidden");
    activeHoverLink = null;
}

// displays the tooltip

function displayTip(e) {
    $htt.not(":empty").removeClass("hidden").addClass("tooltip-ready");
    moveTip(e);
    $htt.not(":empty").css("visibility", "visible");
    moveTip(e);
}

// moves the tooltip

function moveTip(e) {
    $ct = $htt.not(":empty");
    var newTop = e.clientY + ((e.clientY > ($(window).height() / 2)) ? -($ct.innerHeight()) : offsetY);
    var newLeft = e.clientX + ((e.clientX > ($(window).width() / 2)) ? -($ct.innerWidth() + offsetX) : offsetX);
    if (newTop < 0) {
        newTop = 0;
    }
    else if (newTop + $ct.innerHeight() + offsetY > $(window).height()) {
        newTop = $(window).height() - ($ct.innerHeight() + offsetY);
        //we want to prioritizes the top of the popup being in the window, instead of the bottom
        if (newTop < 0) {
            newTop = 0;
        }
    }
    $ct.css({
        "position": "fixed",
        "top": newTop + "px",
        "left": newLeft + "px"
    });
}

// AJAX tooltips

function showTip(e) {
    var $t = $(this);
    activeHoverLink = $t;
    $p = $t.parent();
    if ($p.hasClass("selflink") == false) {
        $t.removeAttr("title");
        $p.removeAttr("title");
        //First decode all encoded characters and then re-encode everything. This allows mixed en/decoded links.
        var url = extURL + "/index.php?title=" + encodeURIComponent(decodeURIComponent($t.data("tt").replace(/ /g, "_")));
        //There is no caching for external sites implemented (yet)!
        if (external) {
            $tfb.html(EXTERNAL_LOADING);

            fullurl = url + '&action=view&printable=yes';
            //We have registered an event handler for the loading event
            //so we just change the src to trigger that event
            $tfb.attr('src', fullurl);
            //Remove caching after 10s of loading.
        } else if (tipCache[url] != null) {
            $tfb.html(tipCache[url]);
            console.log('Lord of the tooltips.js: Found cached entry: ' + tipCache[url]);
            displayTip(e);
        } else {
            $tfb.html(INTERNAL_LOADING.replace("CLIENT_X", e.clientX).replace("CLIENT_Y", e.clientY));
            //We put the "Loading..." into the cache, to avoid multiple fetchings
            tipCache[url] = $tfb.html();

            fullurl = url + '&action=render div.tooltip-content';
            $tfb.load(fullurl, function(responseText, textStatus, XMLHttpRequest) {
                if (textStatus == "timeout") {
                    //Fetching has timed out, so we remove the cached "Loading..." entry (hence enable another try)
                    clearCache(url);
                } else if ($tfb.html() == "" || textStatus != "success") {
                    //we want to use the same position value as the parent tooltip div (fixes the problem of a very long black box)
                    tipCache[url] = INTERNAL_ERROR.replace("DATA", decodeURIComponent($t.data("tt")));
                } else {
                    $tfb.find(".tooltip-content").css("display", "");
                    tipCache[url] = $tfb.html();
                }
                if ($t == activeHoverLink) {
                    $tfb.html(tipCache[url]);
                    displayTip(e);
                }
            });
        }
    }
}

//This function removes a cached "Loading" entry.

function clearCache(url) {
    if (tipCache[url] != null) {
        //Cache is not empty, let's see if we are still loading.
        if (tipCache[url].indexOf("Loading") != -1) {
            tipCache[url] = null;
        }
    }
}

function itfb_request() {
    if ($tfb.attr("src") != null) {
        //alert('Requesting the tooltip-content from "'+$tfb.attr("src")+'"');
        //$tfb[0].contentWindow.postMessage('give me the tooltip-content!', $tfb.attr("src"));
        console.log('Lord of the tooltips.js: Requesting "'+$tfb.attr("src")+'" to loose weight');
        $tfb[0].contentWindow.postMessage('loose weight!', $tfb.attr("src"));
    }
}

function itfb_receiver(e) {
    //alert("Receiver: " + e.origin);
    if (e.origin != extURL) {
        return;
    }

    console.log("Lord of the tooltips.js: Received e.data: " + (e.data === null ? "null" : e.data) );
    if (e.data.substring(0, 8) == "height: ") {
        //alert("resizing to: "+e.data.replace(/height: (.*)/, "$1"));
        $tfb.height(e.data.replace(/height: (.*)/, "$1") + "px");
    } else {
        //This is not used (yet)!
        $tfb.html(e.data);
        tipCache[$tfb.attr("src").replace(/&action=view&printable=yes/, "")] = $tfb.html();
    }
    displayTip(e);
}

// quick tooltips

function hideTemplateTip() {
    $ttfb.html("").removeClass("tooltip-ready").addClass("hidden");
}

function showTemplateTip(e) {
    $ttfb.html('<div class="tooltip-content">' + $(this).next().html() + '</div>');
    displayTip(e);
}

function bindTT() {
    $t = $(this);
    $p = $t.parent();
    if ($p.hasClass("selflink") == false) {
        $t.data("tt", encodeURIComponent(decodeURIComponent($p.attr("title").replace(" (page does not exist)", "").replace(/ /g, "_") )) ).hover(showTip, hideTip).mousemove(moveTip);
        fullextURL = extDB + $t.data("tt");
        $p.attr("href", fullextURL);
    }
}

function addTT() {
    $(this).wrapInner('<span class="ajaxttlink" />');
    $(this).attr("title", $(this).attr("href").replace(/.*\/(Item:.*)/, "$1"));
}

// check to see if it is active then do it

function ttMouseOver() {
    if (lordTooltipsOn) {
        //we are using tfbx instead of tfb to avoid collisions with Eleazaros itemtooltip
        //if we have external popups we use an iframe inside of tfbx
        if (external) {
            $(article).append('<iframe id="tfbx" scrolling=no frameborder=0 class="htt"></iframe><div id="templatetfbx" class="htt"></div>');
            $("#tfbx").load(itfb_request); //We register an event for "iframe loading has finished"
            window.addEventListener('message', itfb_receiver, false);
        } else {
            $(article).append('<div id="tfbx" class="htt"></div><div id="templatetfbx" class="htt"></div>');
        }

        $tfb = $("#tfbx");
        $ttfb = $("#templatetfbx");
        $htt = $("#tfbx,#templatetfbx");


        //execute addTT on those links which link to "Item:" and (have not any descendent object or have not any descendent with an ajaxttlink class)
        if (autoItemTooltipsOn) $(article + " a[href*='index.php/Item:']:not(:has(span.ajaxttlink))").each(addTT);
        $(article + " span.ajaxttlink:not(:has(span.disablett))").each(bindTT);
        $(article + " span.tttemplatelink").hover(showTemplateTip, hideTemplateTip).mousemove(moveTip);
    }
}

$(function() {
    article = "#bodyContent";
    ttMouseOver();
});

/* END OF ITEMTOOLTIPS */