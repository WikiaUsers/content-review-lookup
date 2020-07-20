/* Any JavaScript here will be loaded for all users on every page load. */
importScriptPage('BackToTopButton/code.js', 'dev');

//<source lang="javascript">



function onloadhookcustom() {
	var replace = document.getElementById("JRChatReplace");
	if (null != replace) {
		replace.innerHTML='<iframe width="670" height="800" scrolling="no" src="http://widget.mibbit.com/?settings=43ea784413839f98229eab44e44c8842&server=irc.mibbit.net&channel=%23MHwikichatroom"></iframe>';
		if (window.attachEvent) window.attachEvent("onbeforeunload",confirmexitjrchat);
		else window.onbeforeunload = confirmexitjrchat;
 
	}
	//alert(document.getElementById("JRChatReplace").innerHTML);
 
}
 
if (window.addEventListener) window.addEventListener("load",onloadhookcustom,false);
else if (window.attachEvent) window.attachEvent("onload",onloadhookcustom);










if(typeof WikiaScriptLoader === 'undefined') {
var WikiaScriptLoader=WikiaScriptLoader?WikiaScriptLoader:function(){var b=navigator.userAgent.toLowerCase();this.useDOMInjection=b.indexOf("opera")!=-1||b.indexOf("firefox")!=-1&&b.indexOf("/4.0b")==-1;this.isIE=b.indexOf("opera")==-1&&b.indexOf("msie")!=-1;this.headNode=document.getElementsByTagName("HEAD")[0]}; WikiaScriptLoader.prototype={loadScript:function(b,c){this.useDOMInjection?this.loadScriptDOMInjection(b,c):this.loadScriptDocumentWrite(b,c)},loadScriptDOMInjection:function(b,c){var a=document.createElement("script");a.type="text/javascript";a.src=b;var d=function(){a.onloadDone=true;typeof c=="function"&&c()};a.onloadDone=false;a.onload=d;a.onreadystatechange=function(){a.readyState=="loaded"&&!a.onloadDone&&d()};this.headNode.appendChild(a)},loadScriptDocumentWrite:function(b,c){document.write('<script src="'+ b+'" type="text/javascript"><\/script>');var a=function(){typeof c=="function"&&c()};typeof c=="function"&&this.addHandler(window,"load",a)},loadScriptAjax:function(b,c){var a=this,d=this.getXHRObject();d.onreadystatechange=function(){if(d.readyState==4){var e=d.responseText;if(a.isIE)eval(e);else{var f=document.createElement("script");f.type="text/javascript";f.text=e;a.headNode.appendChild(f)}typeof c=="function"&&c()}};d.open("GET",b,true);d.send("")},loadCSS:function(b,c){var a=document.createElement("link"); a.rel="stylesheet";a.type="text/css";a.media=c||"";a.href=b;this.headNode.appendChild(a)},addHandler:function(b,c,a){if(window.addEventListener)window.addEventListener(c,a,false);else window.attachEvent&&window.attachEvent("on"+c,a)},getXHRObject:function(){var b=false;try{b=new XMLHttpRequest}catch(c){for(var a=["Msxml2.XMLHTTP.6.0","Msxml2.XMLHTTP.3.0","Msxml2.XMLHTTP","Microsoft.XMLHTTP"],d=a.length,e=0;e<d;e++){try{b=new ActiveXObject(a[e])}catch(f){continue}break}}return b}};window.wsl=new WikiaScriptLoader;
}



/********************************************************************************/
/* sliders using jquery by Dragon Age wiki User:Tierrie . All credit goes to him*/
/********************************************************************************/
 
//wsl.loadScript("http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js");
//wsl.loadScript("http://monsterhunter.wikia.com/index.php?title=MediaWiki:Jquery-ui.min.js&action=raw&ctype=text/javascript");

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
















/* displayTimer */
importScript('MediaWiki:Common.js/displayTimer.js');





/** Collapsible tables *********************************************************
  *
  *  Description: Allows tables to be collapsed, showing only the header. See
  *               [[Wikipedia:NavFrame]].
  *  Maintainer on Wikipedia: [[User:R. Koot]]
  */
 
var autoCollapse = 2;
var collapseCaption = "hide";
var expandCaption = "show";
 
function hasClass( element, className ) {
  var Classes = element.className.split( " " );
  for ( var i = 0; i < Classes.length; i++ ) {
    if ( Classes[i] == className ) {
      return ( true );
    }
  }
  return ( false );
}
 
function collapseTable( tableIndex )
{
     var Button = document.getElementById( "collapseButton" + tableIndex );
     var Table = document.getElementById( "collapsibleTable" + tableIndex );
 
     if ( !Table || !Button ) {
         return false;
     }
 
     var Rows = Table.getElementsByTagName( "tr" ); 
 
     if ( Button.firstChild.data == collapseCaption ) {
         for ( var i = 1; i < Rows.length; i++ ) {
             Rows[i].style.display = "none";
         }
         Button.firstChild.data = expandCaption;
     } else {
         for ( var i = 1; i < Rows.length; i++ ) {
             Rows[i].style.display = Rows[0].style.display;
         }
         Button.firstChild.data = collapseCaption;
     }
}
 
function createCollapseButtons()
{
     var tableIndex = 0;
     var NavigationBoxes = new Object();
     var Tables = document.getElementsByTagName( "table" );
 
     for ( var i = 0; i < Tables.length; i++ ) {
         if ( hasClass( Tables[i], "collapsible" ) ) {
             NavigationBoxes[ tableIndex ] = Tables[i];
             Tables[i].setAttribute( "id", "collapsibleTable" + tableIndex );
 
             var Button     = document.createElement( "span" );
             var ButtonLink = document.createElement( "a" );
             var ButtonText = document.createTextNode( collapseCaption );
 
             Button.style.styleFloat = "right";
             Button.style.cssFloat = "right";
             Button.style.fontWeight = "normal";
             Button.style.textAlign = "right";
             Button.style.width = "6em";
 
             ButtonLink.setAttribute( "id", "collapseButton" + tableIndex );
             ButtonLink.setAttribute( "href", "javascript:collapseTable(" + tableIndex + ");" );
             ButtonLink.appendChild( ButtonText );
 
             Button.appendChild( document.createTextNode( "[" ) );
             Button.appendChild( ButtonLink );
             Button.appendChild( document.createTextNode( "]" ) );
 
             var Header = Tables[i].getElementsByTagName( "tr" )[0].getElementsByTagName( "th" )[0];
             /* only add button and increment count if there is a header row to work with */
             if (Header) {
                 Header.insertBefore( Button, Header.childNodes[0] );
                 tableIndex++;
             }
         }
     }
 
     for ( var i = 0;  i < tableIndex; i++ ) {
         if ( hasClass( NavigationBoxes[i], "collapsed" ) || ( tableIndex >= autoCollapse && hasClass( NavigationBoxes[i], "autocollapse" ) ) ) {
             collapseTable( i );
         }
     }
}
 
addOnloadHook( createCollapseButtons );

/* odd floating code - causing JS errors
{
	saveButton.value = 'Save page (use preview first)';
	saveButton.style.fontWeight = 'normal';
} */


/* kill read more headings on pages with elements that have id="noreadmore" */
function NoReadMore() {
	if($('#noreadmore')) {
		$('.RelatedPagesModule').css({"display": 'none'});
	}
}

addOnloadHook(NoReadMore);







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
        var url = "/index.php?title=" + $t.data("tt").replace(/ /g, "_").replace(/\?/g, "%3F").replace(/\+/g, "%2B") + "&action=render div.tooltip-content";
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


//Global Show/Hide
//Author: Princess Platinum
 
$(function() {
    $('#collapse-global').html('<a class="wikia-button" onclick="for (var i=0; i < 500; i++) { collapseTable([i]); }" style="color:#ffffff;">Show All / Hide All</a>');
});


////////////////////////////////////////////////////////////////////////////////
// Custom User Tags
window.UserTagsJS = {
	modules: {},
	tags: {
	bureaucrat: { order: 1, link:'Monster Hunter Wiki:Administrators', },
	sysop: { order: 1, link:'Monster Hunter Wiki:Administrators',},
	rollback: { u: 'Rollback', order: 1, link:'Monster Hunter Wiki:Administrators',},
	chatmoderator: { order: 2, link:'Monster Hunter Wiki:Administrators',},
// Custom Tags
	hunterl: { u: 'Viva La Hunterlution' },
	b: { u: 'Bow User' },
	cb: { u: 'Charge Blade User' },
	drex1: { u: 'Janitor' },
	drex2: { u: 'God-Tier Swag' },
	ds: { u: 'Dual Sword User' },
	gl: { u: 'Gunlance User' },
        gobul: { u: 'Deputy' },
	gs: { u: 'Great Sword User' },
	h: { u: 'Hammer User' },
	hbg: { u: 'Heavy Bowgun User' },
	hh: { u: 'Hunting Horn User' },
	ig: { u: 'Insect Glaive User' },
        kogath: { u: 'Dream Stomper' },
	l: { u: 'Lance User' },
	lbg: { u: 'Light Bowgun User' },
	ls: { u: 'Long Sword User' },
	mbg: { u: 'Medium Bowgun User' },
        rt: { u: 'Hammer Master Race' },
	sa: { u: 'Switch Axe User' },
	sns: { u: 'Sword and Shield User' },
	TVJ: { u: 'YOLO Master' },
	wolf: { u: 'The Queen' },
	}
};
UserTagsJS.modules.custom = {
        '- MHCaboose -': ['rollback',],
	'Azo369': ['h',],
	'Chimera-gui': ['hh', 'ig',],
	'Darksoulwolf': ['ds',],
	'Democide': ['b',],
	'Dracosaurian': ['rollback',],
	'Drexzen': ['rollback', 'sns', 'drex1', 'drex2',],
        'GobulPower': ['gobul',],
	'Kogath': ['kogath', 'gs',],
	'Mckrongs': ['gl', 'hunterl',],
	'Mr TR011': ['gs',],
	'Pike-The-Ninja': ['rollback',],
        'RampagingTigrex': ['hunterl', 'rt',],
	'Setheo': ['l',],
        'Slifer-The-Sky-Dragon': ['h',],
	'The Void Joker': ['h', 'TVJ',],
	'WolfQueen': ['l', 'wolf',],
	'Youla': ['gs',],
};
UserTagsJS.modules.mwGroups = ['bureaucrat', 'chatmoderator', 'patroller', 'rollback', 'sysop', 'bannedfromchat']
UserTagsJS.modules.inactive = {
	days: 180,
	namespaces: [0, 'Talk', 'User talk', 'Forum'] // Edits must be to articles or talk pages or user talk pages or the forum to count, others don't count
};
UserTagsJS.modules.metafilter = {
	'inactive': ['sysop', 'bureaucrat'], // Remove inactive from all bureaucrats and sysops
	'sysop': ['bureaucrat'], // Remove "Admin" tag from bureaucrats
	// Remove chat moderator from admins as well as users who have BOTH patroller AND rollback
	'chatmoderator': ['sysop', ['patroller', 'rollback']]
};
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});



//Reduce category page listings to one column by Bobogoobo
$(function() {
    if (mw.config.get('wgCanonicalNamespace') !== 'Category') {
        return;
    }
 
    var html = '';
    for (var i = 0; i < 3; i++) {
        html += $('#mw-pages table:first td')[i].innerHTML;
    }
    html = html.replace(/\<\/ul\>.*cont\.\<\/h3\>\n\<ul\>/g, '');
    $('#mw-pages table tr:first').html('<td style="width:100%;">' + html + '</td>');
});

importArticles({
 type:'script',
 articles:[
  "w:c:dev:Countdown/code.js",
  "MediaWiki:Sm2.js", //Extension:SoundManager2Button
 ]
});