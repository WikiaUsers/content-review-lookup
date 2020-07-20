/**** Main Page tabs ****/
// prototype functions
function $A(a) {
    var r = [];
    for (var i = 0, len = a.length; i < len; ++i) r.push(a[i]);
    return r;
}

Function.prototype.bind = function() {
    var __method = this,
        args = $A(arguments),
        object = args.shift();
    return function() {
        return __method.apply(object, args.concat($A(arguments)));
    };
};

// portal switch
var pspans;
var cTab = 1;

function doPortals() {
    tabs = document.getElementById("mptabs");
    if (tabs) {
        pspans = tabs.getElementsByTagName("span");
        for (x = 0; x < pspans.length; x++) {
            if (pspans[x].className == "activetab" || pspans[x].className == "inactivetab") {
                pspans[x].parentNode.onclick = switchTab.bind(pspans[x].parentNode, x / 2);
                if (pspans[x].parentNode.tagName.toLowerCase() == "a") {
                    pspans[x].parentNode.setAttribute("href", "javascript:;");
                } else {
                    pspans[x].parentNode.style.cursor = "pointer";
                }
                if (pspans[x].className == "activetab") cTab = (x / 2) + 1;
            }
        }
    }
}

function switchTab(x) {
    pspans[2 * (cTab - 1)].className = "inactivetab";
    document.getElementById("portal" + cTab).style.display = "none";
    cTab = x + 1;
    pspans[2 * x].className = "activetab";
    document.getElementById("portal" + cTab).style.display = "";
}

if (wgCanonicalNamespace == "Portal") addOnloadHook(doPortals);

/* collapsible tables */
var autoCollapse = 2;
var collapseCaption = "hide";
var expandCaption = "show";

function collapseTable(i) {
    var Button = $("#collapseButton" + i);
    var Table = $("#collapsibleTable" + i);
    if (Table.length < 1 || Button.length < 1) return false;
    if (Button.text() == collapseCaption) {
        Table.find("tr").not(":has('#collapseButton" + i + "')").hide();
        setCookie("hideTable-" + wgArticleId + "-" + i, 1, 30);
        Button.text(expandCaption);
    } else {
        Table.find("tr").not(":has('#collapseButton" + i + "')").show();
        setCookie("hideTable-" + wgArticleId + "-" + i, 0, 30);
        Button.text(collapseCaption);
    }
}

function createCollapseButtons() {
    var tch = $("table.collapsible tr th");
    tch.each(function(i) {
        $(this).closest("table").attr("id", "collapsibleTable" + i);
        $(this).prepend('<span style="float:right; font-weight:normal; text-align:right; width:6em">[<a href="javascript:collapseTable(' + i + ');" style="color:' + $(this).css("color") + ';" id="collapseButton' + i + '">' + collapseCaption + '</a>]</span>');
        if ($(this).closest("table").hasClass("collapsed") || (getCookie("hideTable-" + wgArticleId + "-" + i) == 1) || (tch.length >= autoCollapse && $(this).closest("table").hasClass("autocollapse"))) collapseTable(i);
    });
}

var nbh = '[' + collapseCaption + ']';
var nbs = '[' + expandCaption + ']';

function toggleNavigationBar(i) {
    var NavToggle = $("#NavToggle" + i);
    var NavFrame = $("#NavFrame" + i);
    if (NavFrame.length < 1 || NavToggle.length < 1) return false;
    ncd = (NavToggle.text() == nbh) ? 'none' : 'block';
    NavFrame.children(".NavPic,.NavContent").css("display", ncd);
    nct = (NavToggle.text() == nbh) ? nbs : nbh;
    NavToggle.text(nct);
}

// adds show/hide-button to navigation bars
function createNavigationBarToggleButton() {
    $("div.NavFrame").each(function(i) {
        NavToggleText = ($(this).children(".NavPic:visible,.NavContent:visible").length > 0) ? nbh : nbs;
        $(this).children(".NavHead").append('<a href="javascript:toggleNavigationBar(' + i + ');" id="NavToggle' + i + '" class="NavToggle">' + NavToggleText + '</a>');
        $(this).attr("id", "NavFrame" + i);
    });
}

$(function gameIconsOasis() {
    if ($('.wds-community-header').length) {
        $('#PageHeader').prepend(
            $('#burnoutgames').css({
                position: 'absolute',
                right: '0'
            })
        );
    }
});