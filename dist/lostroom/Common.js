importScriptPage('MediaWiki:Functions.js', 'starwars');

// onload stuff
var firstRun = true;

function loadFunc() {
	if( firstRun )
		firstRun = false;
	else
		return;

	initFunctionsJS();

	addHideButtons();

	substUsername();
}

function addHideButtons() {
	var hidables = getElementsByClass('hidable');
    
	for( var i = 0; i < hidables.length; i++ ) {
		var box = hidables[i];
		var button = getElementsByClass('hidable-button', box, 'span');
        
		if( button != null && button.length > 0 ) {
			button = button[0];
            
			button.onclick = toggleHidable;
			button.appendChild( document.createTextNode('[Hide]') );

			if( new ClassTester('start-hidden').isMatch(box) )
				button.onclick('bypass');
		}
	}
}

function toggleHidable(bypassStorage) {
	var parent = getParentByClass('hidable', this);
	var content = getElementsByClass('hidable-content', parent);
	var nowShown;
    
	if( content != null && content.length > 0 ) {
		content = content[0];
        
		if( content.style.display == 'none' ) {
			content.style.display = content.oldDisplayStyle;
			this.firstChild.nodeValue = '[Hide]';
			nowShown = true;
		} else {
			content.oldDisplayStyle = content.style.display;
			content.style.display = 'none';
			this.firstChild.nodeValue = '[Show]';
			nowShown = false;
		}
        
		if( window.storagePresent && ( typeof( bypassStorage ) == 'undefined' || bypassStorage != 'bypass' ) ) {
			var page = window.pageName.replace(/\W/g, '_');
			var items = getElementsByClass('hidable');
			var item = -1;
            
			for( var i = 0; i < items.length; i++ ) {
				if( items[i] == parent ) {
					item = i;
					break;
				}
			}
            
			if( item == -1 ) {
				return;
			}
        
			var storage = globalStorage[window.location.hostname];
			storage.setItem('hidableshow-' + item + '_' + page, nowShown);
		}
	}
}

addOnloadHook( loadFunc );

// Wikia's own WikiaScriptLoader isn't automatically included in other skins such as monobook.
// Presumably this is because they no longer support them. This checks to see if WikiaScriptLoader 
// function reference has been declared, and if it has not, it creates it. Backwards compatibility
// for everybody! - Blame User:Tierrie @ DA Wiki if this works. Blame someone else if it breaks.
if(typeof WikiaScriptLoader === 'undefined') {
  var WikiaScriptLoader=WikiaScriptLoader?WikiaScriptLoader:function(){var b=navigator.userAgent.toLowerCase();this.useDOMInjection=b.indexOf("opera")!=-1||b.indexOf("firefox")!=-1&&b.indexOf("/4.0b")==-1;this.isIE=b.indexOf("opera")==-1&&b.indexOf("msie")!=-1;this.headNode=document.getElementsByTagName("HEAD")[0]}; WikiaScriptLoader.prototype={loadScript:function(b,c){this.useDOMInjection?this.loadScriptDOMInjection(b,c):this.loadScriptDocumentWrite(b,c)},loadScriptDOMInjection:function(b,c){var a=document.createElement("script");a.type="text/javascript";a.src=b;var d=function(){a.onloadDone=true;typeof c=="function"&&c()};a.onloadDone=false;a.onload=d;a.onreadystatechange=function(){a.readyState=="loaded"&&!a.onloadDone&&d()};this.headNode.appendChild(a)},loadScriptDocumentWrite:function(b,c){document.write('<script src="'+ b+'" type="text/javascript"><\/script>');var a=function(){typeof c=="function"&&c()};typeof c=="function"&&this.addHandler(window,"load",a)},loadScriptAjax:function(b,c){var a=this,d=this.getXHRObject();d.onreadystatechange=function(){if(d.readyState==4){var e=d.responseText;if(a.isIE)eval(e);else{var f=document.createElement("script");f.type="text/javascript";f.text=e;a.headNode.appendChild(f)}typeof c=="function"&&c()}};d.open("GET",b,true);d.send("")},loadCSS:function(b,c){var a=document.createElement("link"); a.rel="stylesheet";a.type="text/css";a.media=c||"";a.href=b;this.headNode.appendChild(a)},addHandler:function(b,c,a){if(window.addEventListener)window.addEventListener(c,a,false);else window.attachEvent&&window.attachEvent("on"+c,a)},getXHRObject:function(){var b=false;try{b=new XMLHttpRequest}catch(c){for(var a=["Msxml2.XMLHTTP.6.0","Msxml2.XMLHTTP.3.0","Msxml2.XMLHTTP","Microsoft.XMLHTTP"],d=a.length,e=0;e<d;e++){try{b=new ActiveXObject(a[e])}catch(f){continue}break}}return b}};window.wsl=new WikiaScriptLoader;
}
 
 
/****************************************/
/* sliders using jquery by User:Tierrie */
/****************************************/
//wsl.loadScript("http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js");
//wsl.loadScript("http://ninjagaiden.wikia.com/index.php?title=MediaWiki:Jquery-ui.min.js&action=raw&ctype=text/javascript");
 
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
} );
 
// *********************************************************************
    // Added SiteNotice Functionality, credit to RuneScape wiki for the code
    //
    // Functions:
    //   * Moves the dismiss link into the SiteNotice table.
    //   * Saves the show/hide status of the SiteNotice in a cookie.
    //   * Automatically expands the SiteNotice when the ID is updated.
    // *********************************************************************
    var dCookieName = "dismissSiteNotice=";
    var msgClose = "dismiss";
 
    var hCookieName = "hideSiteNotice=";
    var hCookiePos = document.cookie.indexOf(hCookieName);
    var hCookieValue = "";
 
    function editSiteNotice() {
        var snbox = document.getElementById('mw-dismissable-notice');
 
        if (snbox != null) {
            if (hCookiePos > -1) {
                hCookiePos = hCookiePos + hCookieName.length;
                var hideEndPos = document.cookie.indexOf(";", hCookiePos);
                if (hideEndPos > -1) {
                    hCookieValue = document.cookie.substring(hCookiePos, hideEndPos);
                } else {
                    hCookieValue = document.cookie.substring(hCookiePos);
                }
            }
 
            var newLink = document.createElement('a');
            newLink.setAttribute('href', "javascript:dismissNotice();");
            newLink.setAttribute('title', 'Dismiss this notice.');
            newLink.innerHTML = msgClose;
 
            var newSpan = document.createElement('span');
            newSpan.id = 'siteNoticeDismiss';
            newSpan.appendChild(document.createTextNode(' ['));
            newSpan.appendChild(newLink);
            newSpan.appendChild(document.createTextNode(']'));
 
            var hideLink = document.getElementById("collapseButton" + "0");
            hideLink.href = "javascript:hideSiteNotice();"
            hideLink.parentNode.style.width = "12em";
            hideLink.parentNode.appendChild(newSpan);
 
            if (hCookieValue != siteNoticeID && hideLink.innerHTML == "show") {
                collapseTable(0);
            }
            if (hCookieValue == siteNoticeID && hideLink.innerHTML == "hide") {
                collapseTable(0);
            }
        }
    }
 
    function hideSiteNotice() {
        var hideLink = document.getElementById("collapseButton" + "0");
        var date = new Date();
 
        if (hideLink.innerHTML == 'hide') {
            date.setTime(date.getTime() + 30 * 86400 * 1000);
        } else {
            date.setTime(date.getTime() - 30 * 86400 * 1000);
        }
        document.cookie = hCookieName + siteNoticeID + "; expires=" + date.toGMTString() + "; path=/";
        collapseTable(0);
    }
 
    if (skin == 'oasis') {
        addOnloadHook(editSiteNotice);
    }