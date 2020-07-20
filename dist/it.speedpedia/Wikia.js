/* <pre> */
/* Any JavaScript here will be loaded for all users on every page load. */

/**** Main Page tabs ****/

// prototype functions
function $A(a) {
var r = [];
for (var i = 0, len = a.length; i < len; ++i) r.push(a[i]);
return r;
}

Function.prototype.bind = function() {
var __method = this, args = $A(arguments), object = args.shift();
return function() { return __method.apply(object, args.concat($A(arguments))) };
}

// portal switch
var pspans;
var cTab = 1;
function doPortals() {
tabs = document.getElementById("mptabs");
if (tabs) {
pspans = tabs.getElementsByTagName("span");
for (x=0;x<pspans.length;x++) {
if (pspans[x].className == "activetab" || pspans[x].className == "inactivetab") {
pspans[x].parentNode.onclick = switchTab.bind(pspans[x].parentNode,x/2);
if (pspans[x].parentNode.tagName.toLowerCase() == "a") { 
pspans[x].parentNode.setAttribute("href", "javascript:;"); 
} else {
pspans[x].parentNode.style.cursor = "pointer";
}
if (pspans[x].className == "activetab") cTab = (x/2)+1;
}
}
}
}
function switchTab(x) {
pspans[2*(cTab-1)].className = "inactivetab";
document.getElementById("portal"+cTab).style.display = "none";
cTab = x+1;
pspans[2*x].className = "activetab";
document.getElementById("portal"+cTab).style.display = "";
}

if (wgCanonicalNamespace == "Portal") addOnloadHook(doPortals);

/**** Remove Main Page title ****/

if(document.title.indexOf("Main Page - ") == 0) {
   document.write('<style type="text/css">/*<![CDATA[*/ #lastmod, #siteSub, #contentSub, h1.firstHeading { display: none !important; } /*]]>*/</style>');
}

//Tooltip Code

var $tfb;

// hides the tooltip
function hideTip() {
$tfb.html("").removeClass("tooltip-ready").addClass("hidden").css("visibility","hidden"); 
}

// displays the tooltip
function displayTip(e) {
$tfb.not(":empty").removeClass("hidden").addClass("tooltip-ready");
moveTip(e);
$tfb.not(":empty").css("visibility","visible");
}

// moves the tooltip
function moveTip(e) {
var newTop = e.clientY + ((e.clientY > ($(window).height()/2)) ? -($tfb.not(".hidden").innerHeight()+20):20);
var newLeft = e.clientX + ((e.clientX > ($(window).width()/2)) ? -($tfb.not(".hidden").innerWidth()+20):20);
$tfb.not(".hidden").css({"position":"fixed","top":newTop + "px","left":newLeft + "px"});
}

// AJAX tooltips
function showTip(e) {
$t=$(this);
$p=$t.parent();
if ($p.hasClass("selflink")==false) {
$t.removeAttr("title");
$p.removeAttr("title");
$tfb.load("/wiki/"+$t.data("tt").replace(/ /g,"_").replace(/\?/g,"%3F")+"?action=render div.tooltip-content",function () {
if ($tfb.html() == "") $tfb.html('<div class="tooltip-content"><b>Error</b><br />This target either has no tooltip<br />or was not intended to have one.</div>');
$tfb.find(".tooltip-content").css("display","");
displayTip(e);
});
}
}

function bindTT() {
$t=$(this);
$p=$t.parent();
if ($p.hasClass("selflink") == false) $t.data("tt", $p.attr("title").replace(" (page does not exist)","").replace("?","%3F")).mouseover(showTip).mouseout(hideTip).mousemove(moveTip);
}

// check to see if it is active then do it
$(function() {
$("#bodyContent").mouseover(hideTip);
$("#bodyContent").append('<div id="tfb" class="htt"></div>');
$tfb = $("#tfb");
$("#bodyContent span.ajaxttlink").each(bindTT);
});


/* collapsible tables */

var autoCollapse = 2;
var collapseCaption = "hide";
var expandCaption = "show";
 
function collapseTable(i) {
var Button = $("#collapseButton" + i);
var Table = $("#collapsibleTable" + i);
if (Table.length<1 || Button.length<1) return false;
if (Button.text() == collapseCaption) {
Table.find("tr").not(":has('#collapseButton"+i+"')").hide();
setCookie("hideTable-" + wgArticleId + "-" + i,1,30);
Button.text(expandCaption);
} else {
Table.find("tr").not(":has('#collapseButton"+i+"')").show();
setCookie("hideTable-" + wgArticleId + "-" + i,0,30);  
Button.text(collapseCaption);
}
}
 
function createCollapseButtons() {
var tch = $("table.collapsible tr th");
tch.each(function (i) {
$(this).closest("table").attr("id", "collapsibleTable" + i);
$(this).prepend('<span style="float:right; font-weight:normal; text-align:right; width:6em">[<a href="javascript:collapseTable('+i+');" style="color:'+$(this).css("color")+';" id="collapseButton'+i+'">'+collapseCaption+'</a>]</span>');
if ($(this).closest("table").hasClass("collapsed") || (getCookie("hideTable-" + wgArticleId + "-" + i) == 1) || (tch.length >= autoCollapse && $(this).closest("table").hasClass("autocollapse"))) collapseTable(i);
});
}

var nbh = '['+collapseCaption+']';
var nbs = '['+expandCaption+']';
function toggleNavigationBar(i) {
var NavToggle = $("#NavToggle" + i);
var NavFrame = $("#NavFrame" + i);
if (NavFrame.length<1 || NavToggle.length<1) return false; 
ncd=(NavToggle.text()==nbh)?'none':'block';
NavFrame.children(".NavPic,.NavContent").css("display",ncd);
nct=(NavToggle.text()==nbh)?nbs:nbh;
NavToggle.text(nct);
}
 
// adds show/hide-button to navigation bars
function createNavigationBarToggleButton() {
$("div.NavFrame").each(function (i) {
NavToggleText = ($(this).children(".NavPic:visible,.NavContent:visible").length>0)?nbh:nbs;
$(this).children(".NavHead").append('<a href="javascript:toggleNavigationBar('+i+');" id="NavToggle'+i+'" class="NavToggle">'+NavToggleText+'</a>');
$(this).attr("id","NavFrame"+i);
});
}