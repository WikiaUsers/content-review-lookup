/* Any JavaScript here will be loaded for all users on every page load. */
// Import scripts from Wikia Developers' Wiki
importArticles({
    type: 'script',
    articles: ['u:dev:ArchiveTool/code.js', 'u:dev:PurgeButton/code.js', 'u:dev:ShowHide/code.js']
});

/* Catch {{USERNAME}} */
function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);

/* Toggles the display of elements on a page  */
/* Author/contact: Austin Che http://openwetware.org/wiki/User:Austin_J._Che */
/* See http://openwetware.org/wiki/OpenWetWare:Toggle for examples and documentation */
 
// indexed array of toggler ids to array of associated toggle operations
// each operation is a two element array, the first being the type, the second a class name or array of elements
// operation types are strings like "_reset" or "" for the default toggle operation
var togglers = new Array();     
var allClasses = new Object(); // associative map of class names to page elements
 
function toggler(id)
{
    var toBeToggled = togglers[id];
    if (!toBeToggled)
        return;
 
    // if some element is in list more than once, it will be toggled multiple times
    for (var i = 0; i < toBeToggled.length; i++)
    {
        // get array of elements to operate on
        var toggles = toBeToggled[i][1];
        if (typeof(toggles) == "string")
        {
            if (toggles.charAt(0) == '-')
            {
                // treat as an element ID, not as class
                toggles = document.getElementById(toggles.substring(1));
                if (toggles)
                    toggles = new Array(toggles);
            }
            else
                toggles = allClasses[toggles];
        }
        if (!toggles || !toggles.length)
            continue;
 
        var op = toBeToggled[i][0]; // what the operation will be
 
        switch (op)
        {
            case "_reset":
                for (var j in toggles)
                    toggles[j].style.display = toggles[j]._toggle_original_display;
                break;
            case "_show":
                for (var j in toggles)
                    toggles[j].style.display = '';
                break;
            case "_hide":
                for (var j in toggles)
                    toggles[j].style.display = 'none';
                break;
            case "":
            default:
                // Toggle
                for (var j in toggles)
                    toggles[j].style.display = ((toggles[j].style.display == 'none') ? '' : 'none');
                break;
        }
    }
}
 
function createTogglerLink(toggler, id)
{
    var toggle = document.createElement("a");
    toggle.className = 'toggler-link';
    toggle.setAttribute('id', 'toggler' + id);
    toggle.setAttribute('href', 'javascript:toggler("' + id + '");');
    var child = toggler.firstChild;
    toggler.removeChild(child);
    toggle.appendChild(child);
    toggler.insertBefore(toggle, toggler.firstChild);
}
 
function toggleInit()
{
    var togglerElems = new Array();
    var toggleGroup = new Array();
 
    // initialize/clear any old information
    togglers = new Array();     
    allClasses = new Object();
    allClasses.watch = undefined;
    allClasses.unwatch = undefined;
 
 
    // make list of all document classes
    var elems = document.getElementsByTagName("*");
    var numelems = elems.length;
    for (var i = 0; i < elems.length; i++)
    {
        var elem = elems[i];
        if (!elem.className)
            continue;
 
        elem._toggle_original_display = elem.style.display;
        var togglerID = -1;
        var elemClasses = elem.className.split(' '); // get list of classes
        for (var j = 0; j < elemClasses.length; j++)
        {
            var elemClass = elemClasses[j];
            if (! allClasses[elemClass])
                allClasses[elemClass] = new Array();
            allClasses[elemClass].push(elem);
 
            // all the special classes begin with _toggle
            if (elemClass.substring(0, 7) != "_toggle")
                continue;
 
            if (elemClass == "_togglegroup")
                toggleGroup = new Array();
            else if (elemClass == "_toggle")
                toggleGroup.push(elem);
            else if (elemClass.substring(0, 12) == "_toggle_init")
            {
                // set initial value for display (ignore the original CSS set value)
                // understands _toggle_initshow and _toggle_inithide
                var disp = elemClass.substring(12);
                if (disp == "show")
                    elem.style.display = '';
                else if (disp == "hide")
                    elem.style.display = 'none';
                elem._toggle_original_display = disp;
            }
            else if (elemClass.substring(0, 8) == "_toggler")
            {
                if (togglerID == -1)
                {
                    togglerID = togglers.length;
                    togglers[togglerID] = new Array();
                    togglerElems[togglerID] = elem;
                }
 
                // all classes are of form _toggler_op-CLASS
                // figure out what class we're toggling
                // if none is specified, then we use the current toggle group
                var toBeToggled;
                var hyphen = elemClass.indexOf('-');
                if (hyphen != -1)
                    toBeToggled = elemClass.substring(hyphen+1);
                else
                {
                    toBeToggled = toggleGroup;
                    hyphen = elemClass.length;
                }
 
                var op = elemClass.substring(8, hyphen);
                togglers[togglerID].push(new Array(op, toBeToggled));
            }
        }
    }
 
    // add javascript links to all toggler elements
    for (var i = 0; i < togglerElems.length; i++)
        createTogglerLink(togglerElems[i], i);
}
 
 
function owwsitesearch(f){
    f.q.value='site:http://openwetware.org/wiki/'+
        f.base.value+'++'+f.qfront.value
}
 
 
addOnloadHook(toggleInit);
 
// Tabber (credits to TAWOG Wiki)
var Tabs = {
    switchDuration: 400,
    selectorDuration: 200,
    inactiveOpacity: 0.25,
    hoverOpacity: 0.6,
    tab1: null,
    tab2: null,
    tab3: null,
    tab4: null,
    tab5: null,
    tab6: null,
    tab7: null,
    tab8: null,
    tab9: null,
    tab10: null,
    tab1Selector: null,
    tab2Selector: null,
    tab3Selector: null,
    tab4Selector: null,
    tab5Selector: null,
    tab6Selector: null,
    tab7Selector: null,
    tab8Selector: null,
    tab9Selector: null,
    tab10Selector: null,
    selected: 1,
    hoverTab: function (tab) {
        "use strict";
        if (tab === Tabs.selected) {
            return;
        }
        if (tab === 1) {
            Tabs.tab1Selector.animate({
                opacity: Tabs.hoverOpacity
            }, Tabs.selectorDuration);
        }
        if (tab === 2) {
            Tabs.tab2Selector.animate({
                opacity: Tabs.hoverOpacity
            }, Tabs.selectorDuration);
        }
        if (tab === 3) {
            Tabs.tab3Selector.animate({
                opacity: Tabs.hoverOpacity
            }, Tabs.selectorDuration);
        }
        if (tab === 4) {
            Tabs.tab4Selector.animate({
                opacity: Tabs.hoverOpacity
            }, Tabs.selectorDuration);
        }
        if (tab === 5) {
            Tabs.tab5Selector.animate({
                opacity: Tabs.hoverOpacity
            }, Tabs.selectorDuration);
        }
        if (tab === 6) {
            Tabs.tab6Selector.animate({
                opacity: Tabs.hoverOpacity
            }, Tabs.selectorDuration);
        }
        if (tab === 7) {
            Tabs.tab7Selector.animate({
                opacity: Tabs.hoverOpacity
            }, Tabs.selectorDuration);
        }
        if (tab === 8) {
            Tabs.tab8Selector.animate({
                opacity: Tabs.hoverOpacity
            }, Tabs.selectorDuration);
        }
        if (tab === 9) {
            Tabs.tab9Selector.animate({
                opacity: Tabs.hoverOpacity
            }, Tabs.selectorDuration);
        }
        if (tab === 10) {
            Tabs.tab10Selector.animate({
                opacity: Tabs.hoverOpacity
            }, Tabs.selectorDuration);
        }
    },
    unhoverTab: function (tab) {
        "use strict";
        if (tab === Tabs.selected) {
            return;
        }
        if (tab === 1) {
            Tabs.tab1Selector.animate({
                opacity: Tabs.inactiveOpacity
            }, Tabs.selectorDuration);
        }
        if (tab === 2) {
            Tabs.tab2Selector.animate({
                opacity: Tabs.inactiveOpacity
            }, Tabs.selectorDuration);
        }
        if (tab === 3) {
            Tabs.tab3Selector.animate({
                opacity: Tabs.inactiveOpacity
            }, Tabs.selectorDuration);
        }
        if (tab === 4) {
            Tabs.tab4Selector.animate({
                opacity: Tabs.inactiveOpacity
            }, Tabs.selectorDuration);
        }
        if (tab === 5) {
            Tabs.tab5Selector.animate({
                opacity: Tabs.inactiveOpacity
            }, Tabs.selectorDuration);
        }
        if (tab === 6) {
            Tabs.tab6Selector.animate({
                opacity: Tabs.inactiveOpacity
            }, Tabs.selectorDuration);
        }
        if (tab === 7) {
            Tabs.tab7Selector.animate({
                opacity: Tabs.inactiveOpacity
            }, Tabs.selectorDuration);
        }
        if (tab === 8) {
            Tabs.tab8Selector.animate({
                opacity: Tabs.inactiveOpacity
            }, Tabs.selectorDuration);
        }
        if (tab === 9) {
            Tabs.tab9Selector.animate({
                opacity: Tabs.inactiveOpacity
            }, Tabs.selectorDuration);
        }
        if (tab === 10) {
            Tabs.tab10Selector.animate({
                opacity: Tabs.inactiveOpacity
            }, Tabs.selectorDuration);
        }
    },
    changeTab: function (tab) {
        "use strict";
        if (tab === Tabs.selected) {
            return;
        }
        if (Tabs.selected === 1) {
            Tabs.tab1.hide(Tabs.switchDuration);
            Tabs.tab1Selector.animate({
                opacity: Tabs.inactiveOpacity
            }, Tabs.selectorDuration);
        }
        if (Tabs.selected === 2) {
            Tabs.tab2.hide(Tabs.switchDuration);
            Tabs.tab2Selector.animate({
                opacity: Tabs.inactiveOpacity
            }, Tabs.selectorDuration);
        }
        if (Tabs.selected === 3) {
            Tabs.tab3.hide(Tabs.switchDuration);
            Tabs.tab3Selector.animate({
                opacity: Tabs.inactiveOpacity
            }, Tabs.selectorDuration);
        }
        if (Tabs.selected === 4) {
            Tabs.tab4.hide(Tabs.switchDuration);
            Tabs.tab4Selector.animate({
                opacity: Tabs.inactiveOpacity
            }, Tabs.selectorDuration);
        }
        if (Tabs.selected === 5) {
            Tabs.tab5.hide(Tabs.switchDuration);
            Tabs.tab5Selector.animate({
                opacity: Tabs.inactiveOpacity
            }, Tabs.selectorDuration);
        }
        if (Tabs.selected === 6) {
            Tabs.tab6.hide(Tabs.switchDuration);
            Tabs.tab6Selector.animate({
                opacity: Tabs.inactiveOpacity
            }, Tabs.selectorDuration);
        }
        if (Tabs.selected === 7) {
            Tabs.tab7.hide(Tabs.switchDuration);
            Tabs.tab7Selector.animate({
                opacity: Tabs.inactiveOpacity
            }, Tabs.selectorDuration);
        }
        if (Tabs.selected === 8) {
            Tabs.tab8.hide(Tabs.switchDuration);
            Tabs.tab8Selector.animate({
                opacity: Tabs.inactiveOpacity
            }, Tabs.selectorDuration);
        }
        if (Tabs.selected === 9) {
            Tabs.tab9.hide(Tabs.switchDuration);
            Tabs.tab9Selector.animate({
                opacity: Tabs.inactiveOpacity
            }, Tabs.selectorDuration);
        }
        if (Tabs.selected === 10) {
            Tabs.tab10.hide(Tabs.switchDuration);
            Tabs.tab10Selector.animate({
                opacity: Tabs.inactiveOpacity
            }, Tabs.selectorDuration);
        }
        Tabs.selected = tab;
        if (tab === 1) {
            Tabs.tab1.show(Tabs.switchDuration);
            Tabs.tab1Selector.animate({
                opacity: 1
            }, Tabs.selectorDuration);
        }
        if (tab === 2) {
            Tabs.tab2.show(Tabs.switchDuration);
            Tabs.tab2Selector.animate({
                opacity: 1
            }, Tabs.selectorDuration);
        }
        if (tab === 3) {
            Tabs.tab3.show(Tabs.switchDuration);
            Tabs.tab3Selector.animate({
                opacity: 1
            }, Tabs.selectorDuration);
        }
        if (tab === 4) {
            Tabs.tab4.show(Tabs.switchDuration);
            Tabs.tab4Selector.animate({
                opacity: 1
            }, Tabs.selectorDuration);
        }
        if (tab === 5) {
            Tabs.tab5.show(Tabs.switchDuration);
            Tabs.tab5Selector.animate({
                opacity: 1
            }, Tabs.selectorDuration);
        }
        if (tab === 6) {
            Tabs.tab6.show(Tabs.switchDuration);
            Tabs.tab6Selector.animate({
                opacity: 1
            }, Tabs.selectorDuration);
        }
        if (tab === 7) {
            Tabs.tab7.show(Tabs.switchDuration);
            Tabs.tab7Selector.animate({
                opacity: 1
            }, Tabs.selectorDuration);
        }
        if (tab === 8) {
            Tabs.tab8.show(Tabs.switchDuration);
            Tabs.tab8Selector.animate({
                opacity: 1
            }, Tabs.selectorDuration);
        }
        if (tab === 9) {
            Tabs.tab9.show(Tabs.switchDuration);
            Tabs.tab9Selector.animate({
                opacity: 1
            }, Tabs.selectorDuration);
        }
        if (tab === 10) {
            Tabs.tab10.show(Tabs.switchDuration);
            Tabs.tab10Selector.animate({
                opacity: 1
            }, Tabs.selectorDuration);
        }
    },
    init: function () {
        "use strict";
        Tabs.tab1 = $('#content-1');
        Tabs.tab1Selector = $('#selector-1').click(function () {
            Tabs.changeTab(1);
            return false;
        }).css('opacity', 1);
        Tabs.tab1Selector.hover(function () {
            Tabs.hoverTab(1);
        }, function () {
            Tabs.unhoverTab(1);
        });
        Tabs.tab2 = $('#content-2');
        Tabs.tab2Selector = $('#selector-2').click(function () {
            Tabs.changeTab(2);
            return false;
        }).css('opacity', Tabs.inactiveOpacity);
        Tabs.tab2Selector.hover(function () {
            Tabs.hoverTab(2);
        }, function () {
            Tabs.unhoverTab(2);
        });
        Tabs.tab3 = $('#content-3');
        Tabs.tab3Selector = $('#selector-3').click(function () {
            Tabs.changeTab(3);
            return false;
        }).css('opacity', Tabs.inactiveOpacity);
        Tabs.tab3Selector.hover(function () {
            Tabs.hoverTab(3);
        }, function () {
            Tabs.unhoverTab(3);
        });
        Tabs.tab4 = $('#content-4');
        Tabs.tab4Selector = $('#selector-4').click(function () {
            Tabs.changeTab(4);
            return false;
        }).css('opacity', Tabs.inactiveOpacity);
        Tabs.tab4Selector.hover(function () {
            Tabs.hoverTab(4);
        }, function () {
            Tabs.unhoverTab(4);
        });
        Tabs.tab5 = $('#content-5');
        Tabs.tab5Selector = $('#selector-5').click(function () {
            Tabs.changeTab(5);
            return false;
        }).css('opacity', Tabs.inactiveOpacity);
        Tabs.tab5Selector.hover(function () {
            Tabs.hoverTab(5);
        }, function () {
            Tabs.unhoverTab(5);
        });
        Tabs.tab6 = $('#content-6');
        Tabs.tab6Selector = $('#selector-6').click(function () {
            Tabs.changeTab(6);
            return false;
        }).css('opacity', Tabs.inactiveOpacity);
        Tabs.tab6Selector.hover(function () {
            Tabs.hoverTab(6);
        }, function () {
            Tabs.unhoverTab(6);
        });
        Tabs.tab7 = $('#content-7');
        Tabs.tab7Selector = $('#selector-7').click(function () {
            Tabs.changeTab(7);
            return false;
        }).css('opacity', Tabs.inactiveOpacity);
        Tabs.tab7Selector.hover(function () {
            Tabs.hoverTab(7);
        }, function () {
            Tabs.unhoverTab(7);
        });
        Tabs.tab8 = $('#content-8');
        Tabs.tab8Selector = $('#selector-8').click(function () {
            Tabs.changeTab(8);
            return false;
        }).css('opacity', Tabs.inactiveOpacity);
        Tabs.tab8Selector.hover(function () {
            Tabs.hoverTab(8);
        }, function () {
            Tabs.unhoverTab(8);
        });
        Tabs.tab9 = $('#content-9');
        Tabs.tab9Selector = $('#selector-9').click(function () {
            Tabs.changeTab(9);
            return false;
        }).css('opacity', Tabs.inactiveOpacity);
        Tabs.tab9Selector.hover(function () {
            Tabs.hoverTab(9);
        }, function () {
            Tabs.unhoverTab(9);
        });
        Tabs.tab10 = $('#content-10');
        Tabs.tab10Selector = $('#selector-10').click(function () {
            Tabs.changeTab(10);
            return false;
        }).css('opacity', Tabs.inactiveOpacity);
        Tabs.tab10Selector.hover(function () {
            Tabs.hoverTab(10);
        }, function () {
            Tabs.unhoverTab(10);
        });
    }
};
Tabs.init();
 
//////////////////////////////////////////////////////////////////////
//Global Show/Hide
//Author: Princess Platinum
 
$(function() {
    $('#collapse-global').html('<a class="wikia-button" onclick="for (var i=0; i < 50; i++) { collapseTable([i]); }">Show/Hide All</a>');
});

/********************************************************************************/
/* sliders using jquery by Dragon Age wiki User:Tierrie */
/********************************************************************************/
 
//wsl.loadScript("http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js");
 
mw.loader.using( ['jquery.ui.tabs'], function() { 
$(document).ready(function() {
  var $tabs = $("#portal_slider").tabs({ fx: {opacity:'toggle', duration:100} } );
  $("[class^=portal_sliderlink]").click(function() { // bind click event to link
    $tabs.tabs('select', this.className.replace("portal_sliderlink_", ""));
    return false;
  });
  $('#portal_next').click(function() {
    $tabs.tabs('select', ($tabs.tabs('option', 'selected') == ($tabs.tabs('length'))-1) ? 0 : $tabs.tabs('option', 'selected') + 1 ); // switch to next tab
    return false;
  });
  $('#portal_prev').click(function() { // bind click event to link
    $tabs.tabs('select', ($tabs.tabs('option', 'selected') == 0) ? ($tabs.tabs('length')-1) : $tabs.tabs('option', 'selected') - 1 ); // switch to previous tab
    return false;
  });
});
});

////////////////////////////////////////////////////////////////////////////////
// START OF TOOLTIP CODE
// This tooltip code was written by Pcj
// Updated to work with Wikia skin by Uberfuzzy
 
article = "";
 
var tooltipsOn = true;
 
var $tfb;
 
var $ttfb;
 
var $htt;
 
var activeHoverLink = null;
 
var tipCache = new Object;
 
function hideTip() {
    $tfb.html("").removeClass("tooltip-ready").addClass("hidden").css("visibility", "hidden");
    activeHoverLink = null;
}
 
function displayTip(e) {
    $htt.not(":empty").removeClass("hidden").addClass("tooltip-ready");
    moveTip(e);
    $htt.not(":empty").css("visibility", "visible");
    moveTip(e);
}
 
function moveTip(e) {
    $ct = $htt.not(":empty");
    var newTop = e.clientY + (e.clientY > $(window).height() / 2 ? -($ct.innerHeight() + 20) : 20);
    var newLeft = e.clientX + (e.clientX > $(window).width() / 2 ? -($ct.innerWidth() + 20) : 20);
    $ct.css({
        position: "fixed",
        top: newTop + "px",
        left: newLeft + "px"
    });
}
 
function showTip(e) {
    var $t = $(this);
    activeHoverLink = $t;
    $p = $t.parent();
    if ($p.hasClass("selflink") == false) {
        $t.removeAttr("title");
        $p.removeAttr("title");
        var url = "/index.php?title=" + $t.data("tt").replace(/ /g, "_").replace(/\?/g, "%3F") + "&action=render div.tooltip-content";
        if (tipCache[url] != null) {
            $tfb.html(tipCache[url]);
            displayTip(e);
            return;
        }
        $tfb.load(url, function() {
            if ($t != activeHoverLink) return;
            if ($tfb.html() == "") $tfb.html('<div class="tooltip-content module" style="background:#000000 !important; color:#ffffff"><b>Error</b><br />This target either has no tooltip<br />or was not intended to have one.</div>');
            $tfb.find(".tooltip-content").css("display", "");
            tipCache[url] = $tfb.html();
            displayTip(e);
        });
    }
}
 
function hideTemplateTip() {
    $ttfb.html("").removeClass("tooltip-ready").addClass("hidden");
}
 
function showTemplateTip(e) {
    $ttfb.html('<div class="tooltip-content">' + $(this).next().html() + "</div>");
    displayTip(e);
}
 
function bindTT() {
    $t = $(this);
    $p = $t.parent();
    if ($p.hasClass("selflink") == false) {
        $t.data("tt", $p.attr("title").replace(" (page does not exist)", "").replace("?", "%3F")).hover(showTip, hideTip).mousemove(moveTip);
    }
}
 
function ttMouseOver() {
    if (tooltipsOn) {
        $(article).append('<div id="tfb" class="htt"></div><div id="templatetfb" class="htt"></div>');
        $tfb = $("#tfb");
        $ttfb = $("#templatetfb");
        $htt = $("#tfb,#templatetfb");
        $(article + " span.ajaxttlink").each(bindTT);
        $(article + " span.tttemplatelink").hover(showTemplateTip, hideTemplateTip).mousemove(moveTip);
    }
}
 
 
// check to see if it is active then do it
$( function() {
	if(skin=='oasis') {
		article = "#WikiaArticle";
	} else {
		article = "#bodyContent";
	}
 
        ttMouseOver();
});
// END OF TOOLTIP CODE
////////////////////////////////////////////////////////////////////////////////