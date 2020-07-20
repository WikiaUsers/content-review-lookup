/* Any JavaScript here will be loaded for all users on every page load. */
importStylesheet("Template:Ambox/code.css");
/**
 * Redirect User:Name/skin.js and skin.css to the current skin's pages
 * (unless the 'skin' page really exists)
 * @source: http://www.mediawiki.org/wiki/Snippets/Redirect_skin.js
 * @rev: 2
 */
if ( mw.config.get( 'wgArticleId' ) === 0 && mw.config.get( 'wgNamespaceNumber' ) == 2 ) {
	var titleParts = mw.config.get( 'wgPageName' ).split( '/' );
	// Make sure there was a part before and after the slash
	// And that the latter is 'skin.js' or 'skin.css'
	if ( titleParts.length == 2 ) {
		var userSkinPage = titleParts.shift() + '/' + mw.config.get( 'skin' );
		if ( titleParts.slice(-1) == 'skin.js' ) {
			window.location.href = mw.util.wikiGetlink( userSkinPage + '.js' );
		} else if ( titleParts.slice(-1) == 'skin.css' ) {
			window.location.href = mw.util.wikiGetlink( userSkinPage + '.css' );
		}
	}
}

/** Map addPortletLink to mw.util 
 */
window.addPortletLink = function(){
	return mw.util.addPortletLink.apply( mw.util, arguments );
};

/** extract a URL parameter from the current URL **********
 *
 * @deprecated: Use mw.util.getParamValue with proper escaping
 */
function getURLParamValue(paramName, url) {
	return mw.util.getParamValue(paramName, url);
}

/** &withCSS= and &withJS= URL parameters *******
 * Allow to try custom scripts from MediaWiki space 
 * without editing personal .css or .js files
 */
var extraCSS = mw.util.getParamValue("withCSS");
if ( extraCSS && extraCSS.match(/^MediaWiki:[^&<>=%]*\.css$/) ) {
    importStylesheet(extraCSS);
}
var extraJS = mw.util.getParamValue("withJS");
if ( extraJS && extraJS.match(/^MediaWiki:[^&<>=%]*\.js$/) ) {
    importScript(extraJS);
}

// makeCollapsible (remove when deployed)
importStylesheet('MediaWiki:JQuery-makeCollapsible.css');
importScript('MediaWiki:JQuery-makeCollapsible.js'); 


/* Import more specific scripts if necessary */
if (wgAction == 'edit' || wgAction == 'submit' || wgPageName == 'Special:Upload') { //scripts specific to editing pages
    importScript('MediaWiki:Common.js/edit.js');
}
else if (mw.config.get('wgPageName') == 'Special:Watchlist') { //watchlist scripts
    mw.loader.load(mw.config.get('wgServer') + mw.config.get('wgScript') + '?title=MediaWiki:Common.js/watchlist.js&action=raw&ctype=text/javascript&smaxage=21600&maxage=86400');
}

if ( wgNamespaceNumber == 6 ) {
    importScript('MediaWiki:Common.js/file.js');
}

/** For sysops and accountcreators *****************************************
 *
 *  Description: Allows for sysop-specific Javascript at [[MediaWiki:Sysop.js]],
 *               and accountcreator-specific CSS at [[MediaWiki:Accountcreator.css]].
 */
if ( $.inArray( 'sysop', wgUserGroups) > -1 ) {
 importStylesheet('MediaWiki:Sysop.css');
 if ( !window.disableSysopJS ) {
  $(function(){
   importScript('MediaWiki:Sysop.js');
  });
 }
} else if ( $.inArray( 'accountcreator', wgUserGroups ) > -1 ) {
 importStylesheet('MediaWiki:Accountcreator.css');
}


/** WikiMiniAtlas *******************************************************
  *
  *  Description: WikiMiniAtlas is a popup click and drag world map.
  *               This script causes all of our coordinate links to display the WikiMiniAtlas popup button.
  *               The script itself is located on meta because it is used by many projects.
  *               See [[Meta:WikiMiniAtlas]] for more information. 
  *  Maintainers: [[User:Dschwen]]
  */

var metaBase = 'http://meta.wikimedia.org';
if ( mw.config.get( 'wgServer' ) == 'https://secure.wikimedia.org' ) {
 var metaBase = 'https://secure.wikimedia.org/wikipedia/meta';
}
mw.loader.load(metaBase + '/w/index.php?title=MediaWiki:Wikiminiatlas.js&action=raw&ctype=text/javascript&smaxage=21600&maxage=86400');

/* Scripts specific to Internet Explorer */
if (navigator.appName == 'Microsoft Internet Explorer'){
    /** Internet Explorer bug fix **************************************************
     *
     *  Description: Fixes IE horizontal scrollbar bug
     *  Maintainers: [[User:Tom-]]?
     */
    
    var oldWidth;
    var docEl = document.documentElement;
    
    var fixIEScroll = function() {
        if (!oldWidth || docEl.clientWidth > oldWidth) {
            doFixIEScroll();
        } else {
            setTimeout(doFixIEScroll, 1);
        }
        
        oldWidth = docEl.clientWidth;
    };
    
    var doFixIEScroll = function () {
        docEl.style.overflowX = (docEl.scrollWidth - docEl.clientWidth < 4) ? "hidden" : "";
    };
    
    document.attachEvent("onreadystatechange", fixIEScroll);
    document.attachEvent("onresize", fixIEScroll);
    
    // In print IE (7?) does not like line-height
    mw.util.addCSS( '@media print { sup, sub, p, .documentDescription { line-height: normal; }}');

    // IE overflow bug
    mw.util.addCSS('div.overflowbugx { overflow-x: scroll !important; overflow-y: hidden !important; } div.overflowbugy { overflow-y: scroll !important; overflow-x: hidden !important; }');

    // IE zoomfix
    // Use to fix right floating div/table inside tables
    mw.util.addCSS('.iezoomfix div, .iezoomfix table { zoom: 1;}');
}

/* Load fixes for Windows font rendering */
if( navigator.platform.indexOf( "Win" ) != -1 ) {
    importStylesheet( 'MediaWiki:Common.css/WinFixes.css' );
}

/* Test if an element has a certain class
 * Maintainers: [[User:Mike Dillon]], [[User:R. Koot]], [[User:SG]]
 *
 * @deprecated:  Use $(element).hasClass() instead.
 */

var hasClass = (function () {
    var reCache = {};
    return function (element, className) {
        return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
    };
})();


/** Interwiki links to featured articles ***************************************
 *
 *  Description: Highlights interwiki links to featured articles (or
 *               equivalents) by changing the bullet before the interwiki link
 *               into a star.
 *  Maintainers: [[User:R. Koot]]
 */

function LinkFA() {
    if ( document.getElementById( "p-lang" ) ) {
        var InterwikiLinks = document.getElementById( "p-lang" ).getElementsByTagName( "li" );

        for ( var i = 0; i < InterwikiLinks.length; i++ ) {
            if ( document.getElementById( InterwikiLinks[i].className + "-fa" ) ) {
                InterwikiLinks[i].className += " FA";
                InterwikiLinks[i].title = "This is a featured article in another language.";
            } else if ( document.getElementById( InterwikiLinks[i].className + "-ga" ) ) {
                InterwikiLinks[i].className += " GA";
                InterwikiLinks[i].title = "This is a good article in another language.";
            }
        }
    }
}

$( LinkFA );


/** Collapsible tables *********************************************************
 *
 *  Description: Allows tables to be collapsed, showing only the header. See
 *               [[Wikipedia:NavFrame]].
 *  Maintainers: [[User:R. Koot]]
 */

var autoCollapse = 2;
var collapseCaption = "hide";
var expandCaption = "show";

function collapseTable( tableIndex ){
    var Button = document.getElementById( "collapseButton" + tableIndex );
    var Table = document.getElementById( "collapsibleTable" + tableIndex );

    if ( !Table || !Button ) {
        return false;
    }

    var Rows = Table.rows;

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

function createCollapseButtons(){
    var tableIndex = 0;
    var NavigationBoxes = new Object();
    var Tables = document.getElementsByTagName( "table" );

    for ( var i = 0; i < Tables.length; i++ ) {
        if ( hasClass( Tables[i], "collapsible" ) ) {

            /* only add button and increment count if there is a header row to work with */
            var HeaderRow = Tables[i].getElementsByTagName( "tr" )[0];
            if (!HeaderRow) continue;
            var Header = HeaderRow.getElementsByTagName( "th" )[0];
            if (!Header) continue;

            NavigationBoxes[ tableIndex ] = Tables[i];
            Tables[i].setAttribute( "id", "collapsibleTable" + tableIndex );

            var Button     = document.createElement( "span" );
            var ButtonLink = document.createElement( "a" );
            var ButtonText = document.createTextNode( collapseCaption );

            Button.className = "collapseButton";  //Styles are declared in Common.css

            ButtonLink.style.color = Header.style.color;
            ButtonLink.setAttribute( "id", "collapseButton" + tableIndex );
            ButtonLink.setAttribute( "href", "#" );
            addHandler( ButtonLink,  "click", new Function( "evt", "collapseTable(" + tableIndex + " ); return killEvt( evt );") );
            ButtonLink.appendChild( ButtonText );

            Button.appendChild( document.createTextNode( "[" ) );
            Button.appendChild( ButtonLink );
            Button.appendChild( document.createTextNode( "]" ) );

            Header.insertBefore( Button, Header.childNodes[0] );
            tableIndex++;
        }
    }

    for ( var i = 0;  i < tableIndex; i++ ) {
        if ( hasClass( NavigationBoxes[i], "collapsed" ) || ( tableIndex >= autoCollapse && hasClass( NavigationBoxes[i], "autocollapse" ) ) ) {
            collapseTable( i );
        } 
        else if ( hasClass( NavigationBoxes[i], "innercollapse" ) ) {
            var element = NavigationBoxes[i];
            while (element = element.parentNode) {
                if ( hasClass( element, "outercollapse" ) ) {
                    collapseTable ( i );
                    break;
                }
            }
        }
    }
}

$( createCollapseButtons );


/** Dynamic Navigation Bars (experimental) *************************************
 *
 *  Description: See [[Wikipedia:NavFrame]].
 *  Maintainers: UNMAINTAINED
 */

// set up the words in your language
var NavigationBarHide = '[' + collapseCaption + ']';
var NavigationBarShow = '[' + expandCaption + ']';

// shows and hides content and picture (if available) of navigation bars
// Parameters:
//     indexNavigationBar: the index of navigation bar to be toggled
function toggleNavigationBar(indexNavigationBar){
    var NavToggle = document.getElementById("NavToggle" + indexNavigationBar);
    var NavFrame = document.getElementById("NavFrame" + indexNavigationBar);

    if (!NavFrame || !NavToggle) {
        return false;
    }

    // if shown now
    if (NavToggle.firstChild.data == NavigationBarHide) {
        for (var NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling) {
            if (hasClass(NavChild, 'NavContent') || hasClass(NavChild, 'NavPic')) {
                NavChild.style.display = 'none';
            }
        }
    NavToggle.firstChild.data = NavigationBarShow;

    // if hidden now
    } else if (NavToggle.firstChild.data == NavigationBarShow) {
        for (var NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling) {
            if (hasClass(NavChild, 'NavContent') || hasClass(NavChild, 'NavPic')) {
                NavChild.style.display = 'block';
            }
        }
        NavToggle.firstChild.data = NavigationBarHide;
    }
}

// adds show/hide-button to navigation bars
function createNavigationBarToggleButton(){
    var indexNavigationBar = 0;
    // iterate over all < div >-elements 
    var divs = document.getElementsByTagName("div");
    for (var i = 0; NavFrame = divs[i]; i++) {
        // if found a navigation bar
        if (hasClass(NavFrame, "NavFrame")) {

            indexNavigationBar++;
            var NavToggle = document.createElement("a");
            NavToggle.className = 'NavToggle';
            NavToggle.setAttribute('id', 'NavToggle' + indexNavigationBar);
            NavToggle.setAttribute('href', 'javascript:toggleNavigationBar(' + indexNavigationBar + ');');

            var isCollapsed = hasClass( NavFrame, "collapsed" );
            /*
             * Check if any children are already hidden.  This loop is here for backwards compatibility:
             * the old way of making NavFrames start out collapsed was to manually add style="display:none"
             * to all the NavPic/NavContent elements.  Since this was bad for accessibility (no way to make
             * the content visible without JavaScript support), the new recommended way is to add the class
             * "collapsed" to the NavFrame itself, just like with collapsible tables.
             */
            for (var NavChild = NavFrame.firstChild; NavChild != null && !isCollapsed; NavChild = NavChild.nextSibling) {
                if ( hasClass( NavChild, 'NavPic' ) || hasClass( NavChild, 'NavContent' ) ) {
                    if ( NavChild.style.display == 'none' ) {
                        isCollapsed = true;
                    }
                }
            }
            if (isCollapsed) {
                for (var NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling) {
                    if ( hasClass( NavChild, 'NavPic' ) || hasClass( NavChild, 'NavContent' ) ) {
                        NavChild.style.display = 'none';
                    }
                }
            }
            var NavToggleText = document.createTextNode(isCollapsed ? NavigationBarShow : NavigationBarHide);
            NavToggle.appendChild(NavToggleText);

            // Find the NavHead and attach the toggle link (Must be this complicated because Moz's firstChild handling is borked)
            for(var j=0; j < NavFrame.childNodes.length; j++) {
                if (hasClass(NavFrame.childNodes[j], "NavHead")) {
                    NavToggle.style.color = NavFrame.childNodes[j].style.color;
                    NavFrame.childNodes[j].appendChild(NavToggle);
                }
            }
            NavFrame.setAttribute('id', 'NavFrame' + indexNavigationBar);
        }
    }
}

$( createNavigationBarToggleButton );


/** Main Page layout fixes *********************************************************
 *
 *  Description: Adds an additional link to the complete list of languages available.
 *  Maintainers: [[User:AzaToth]], [[User:R. Koot]], [[User:Alex Smotrov]]
 */

if (wgPageName == 'Main_Page' || wgPageName == 'Talk:Main_Page') {
    $(function () {
        mw.util.addPortletLink('p-lang', 'http://meta.wikimedia.org/wiki/List_of_Wikipedias',
                 'Complete list', 'interwiki-completelist', 'Complete list of Wikipedias');
        var nstab = document.getElementById('ca-nstab-main');
        if (nstab && wgUserLanguage=='en') {
            while (nstab.firstChild) { nstab = nstab.firstChild; }
            nstab.nodeValue = 'Main Page';
        }
    });
}


/** Table sorting fixes ************************************************
  *
  *  Description: Disables code in table sorting routine to set classes on even/odd rows
  *  Maintainers: [[User:Random832]]
  */
ts_alternate_row_colors = false;


/***** uploadwizard_newusers ********
 * Switches in a message for non-autoconfirmed users at [[Wikipedia:Upload]]
 *
 *  Maintainers: [[User:Krimpet]]
 */
function uploadwizard_newusers() {
  if (wgNamespaceNumber == 4 && wgTitle == "Upload" && wgAction == "view") {
    var oldDiv = document.getElementById("autoconfirmedusers"),
        newDiv = document.getElementById("newusers");
    if (oldDiv && newDiv) {
      if (typeof wgUserGroups == "object" && wgUserGroups) {
        for (i = 0; i < wgUserGroups.length; i++) {
          if (wgUserGroups[i] == "autoconfirmed") {
            oldDiv.style.display = "block";
            newDiv.style.display = "none";
            return;
          }
        }
      }
      oldDiv.style.display = "none";
      newDiv.style.display = "block";
      return;
    }
  }
}
$(uploadwizard_newusers);


/** IPv6 AAAA connectivity testing **/

var __ipv6wwwtest_factor = 100;
var __ipv6wwwtest_done = 0;
if ((wgServer != "https://secure.wikimedia.org") && (Math.floor(Math.random()*__ipv6wwwtest_factor)==42)) {
    importScript("MediaWiki:Common.js/IPv6.js");
}

/** Magic editintros ****************************************************
 *
 *  Description: Adds editintros on disambiguation pages and BLP pages.
 *  Maintainers: [[User:RockMFR]]
 */

function addEditIntro(name){
  var el = document.getElementById('ca-edit');
  if (!el) {
    return;
  }
  el = el.getElementsByTagName('a')[0];
  if (el) {
    el.href += '&editintro=' + name;
  }
}


if (wgNamespaceNumber === 0) {
  $(function(){
    if (document.getElementById('disambigbox')) {
      addEditIntro('Template:Disambig_editintro');
    }
  });

  $(function(){
    var cats = document.getElementById('mw-normal-catlinks');
    if (!cats) {
      return;
    }
    cats = cats.getElementsByTagName('a');
    for (var i = 0; i < cats.length; i++) {
      if (cats[i].title == 'Category:Living people' || cats[i].title == 'Category:Possibly living people') {
        addEditIntro('Template:BLP_editintro');
        break;
      }
    }
  });
}

/**
 * Description: Stay on the secure server as much as possible
 * Maintainers: [[User:TheDJ]]
 */
if ( mw.config.get('wgServer') == 'https://secure.wikimedia.org' ) {
    importScript( 'MediaWiki:Common.js/secure.js');
}

/** Text area function for the account creation process */
jQuery(function(){
   if (!(document.getElementById('signupuserpagefillmagic'))) return;
  /*
   * Puts an userpage edit-box inside a div with the ID 'signupuserpagefillmagic'
   * Created for [[:outreach:Account Creation Improvement Project]] by
   * [[:sv:User:Sertion]] on the behalf of [[:outreach:User:Hannibal]]
   * 
   * Below are variables for internationalization. Please use \n for linebreaks
   * and escape all single quotation marks (') with \'
   */
   var preComment = '<!-- BELOW IS THE TEXT ABOUT YOU. YOU CAN CHANGE IT COMPLETELY OR IN PARTS AND THEN COME BACK TO IT. AFTER YOU ARE DONE, SCROLL DOWN A BIT FURTHER AND CLICK "SAVE PAGE".--\>{'+'{New user bar}}\n',
       postComment = '\n\n<!-- NOW, CLICK THE "SAVE PAGE" BUTTON. CONGRATULATIONS, YOU\'VE JUST MADE YOUR FIRST EDIT TO WIKIPEDIA. --\>',
       preSubmitButton ='Do not forget to click SAVE PAGE when you get to the next page!',
       submitText = 'Create my user page for me now!',
       SUPeditSummary = 'New user page through [[:outreach:Account Creation Improvement Project|Outreach:ACIP]]',
       preFilltemplate = 'Replace this example text below with information about you: \n\nHello, my background is in biology, with a main interest in snakes.\n\nI speak English and French. In my off-time, I listen to a lot of music, and I have discovered that Wikipedia is a very good source for information in that department. Hopefully I can help make it even better.';
   /*
    * The actual magic:
    * Inserts a form with a single visible field that simulates the normal
    * edit-field. It uses the variables from above to set a text example (pre
    * filled), an automated edit summary and the label of the submit button.
    * 'fakewpTextbox1' is used to hide the assembling of the final output that
    * is made below.
    */
   jQuery('#signupuserpagefillmagic').html('<form action="'+wgServer+wgScript+'?title='+wgFormattedNamespaces[2]+':'+wgUserName+'&action=submit" method="post"><textarea id="fakewpTextbox1" style="width:46em;height:20em;">'+preFilltemplate+'</textarea><textarea name="wpTextbox1" id="wpTextbox1" style="display:none;"></textarea><input type="hidden" name="wpSummary" id="wpSummary" value="'+SUPeditSummary+'" /><br/>'+preSubmitButton+'<br/><input type="submit" value="'+submitText+'"/></form>');
   // Waits for the form to be submitted.
   jQuery('#signupuserpagefillmagic form').live('submit',function(r){
     // Stops the form from submitting
     r.preventDefault();
     /*
      * Uses the previously defined variables preComment and postComment
      * to assemble the final output in the hidden textarea.
      */
     $('#wpTextbox1').text( preComment + jQuery('#fakewpTextbox1').text() + postComment );
     /*
      * Submits the form.
      * For unknown reasons jQuery('#signupuserpagefillmagic form').submit() crashes
      * Firefox (only tested in version 4.0). This method seam to work cross browser.
      */
     document.getElementById('signupuserpagefillmagic').getElementsByTagName('form')[0].submit();
   });
});
// Wikia's own WikiaScriptLoader isn't automatically included in other skins such as monobook.
// Presumably this is because they no longer support them. This checks to see if WikiaScriptLoader 
// function reference has been declared, and if it has not, it creates it. Backwards compatibility
// for everybody! - Blame User:Tierrie @ DA Wiki if this works. Blame someone else if it breaks.
if(typeof WikiaScriptLoader === 'undefined') {
  var WikiaScriptLoader=WikiaScriptLoader?WikiaScriptLoader:function(){var b=navigator.userAgent.toLowerCase();this.useDOMInjection=b.indexOf("opera")!=-1||b.indexOf("firefox")!=-1&&b.indexOf("/4.0b")==-1;this.isIE=b.indexOf("opera")==-1&&b.indexOf("msie")!=-1;this.headNode=document.getElementsByTagName("HEAD")[0]}; WikiaScriptLoader.prototype={loadScript:function(b,c){this.useDOMInjection?this.loadScriptDOMInjection(b,c):this.loadScriptDocumentWrite(b,c)},loadScriptDOMInjection:function(b,c){var a=document.createElement("script");a.type="text/javascript";a.src=b;var d=function(){a.onloadDone=true;typeof c=="function"&&c()};a.onloadDone=false;a.onload=d;a.onreadystatechange=function(){a.readyState=="loaded"&&!a.onloadDone&&d()};this.headNode.appendChild(a)},loadScriptDocumentWrite:function(b,c){document.write('<script src="'+ b+'" type="text/javascript"><\/script>');var a=function(){typeof c=="function"&&c()};typeof c=="function"&&this.addHandler(window,"load",a)},loadScriptAjax:function(b,c){var a=this,d=this.getXHRObject();d.onreadystatechange=function(){if(d.readyState==4){var e=d.responseText;if(a.isIE)eval(e);else{var f=document.createElement("script");f.type="text/javascript";f.text=e;a.headNode.appendChild(f)}typeof c=="function"&&c()}};d.open("GET",b,true);d.send("")},loadCSS:function(b,c){var a=document.createElement("link"); a.rel="stylesheet";a.type="text/css";a.media=c||"";a.href=b;this.headNode.appendChild(a)},addHandler:function(b,c,a){if(window.addEventListener)window.addEventListener(c,a,false);else window.attachEvent&&window.attachEvent("on"+c,a)},getXHRObject:function(){var b=false;try{b=new XMLHttpRequest}catch(c){for(var a=["Msxml2.XMLHTTP.6.0","Msxml2.XMLHTTP.3.0","Msxml2.XMLHTTP","Microsoft.XMLHTTP"],d=a.length,e=0;e<d;e++){try{b=new ActiveXObject(a[e])}catch(f){continue}break}}return b}};window.wsl=new WikiaScriptLoader;
}

/** Archive edit tab disabling *************************************
 * Disables the edit tab on old forum topic pages to stop new people bumping old topics.
 * Page can still be edited by going via the edit tab on the history etc, or by 
 * typing the edit address manually.
 * By [[User:Spang|Spang]]
 * Monaco support by [[User:Uberfuzzy|Uberfuzzy]]
 * Copied from [[w:c:Community:MediaWiki:Common.js]] on 3-Sep-2010
 */
 
if(wgNamespaceNumber == 110) {
 
function disableOldForumEdit() {
	if( typeof( enableOldForumEdit ) != 'undefined' && enableOldForumEdit )
		return;
	if(!document.getElementById('old-forum-warning') ||
		 !document.getElementById('ca-edit') )
		return;
 
	if( skin == 'monaco' )
	{
		editLink = document.getElementById('ca-edit');
	}
	else if( skin == 'monobook' )
	{
		editLink = document.getElementById('ca-edit').firstChild;
	}
 
	editLink.removeAttribute('href', 0);
	editLink.removeAttribute('title', 0);
	editLink.style.color = 'gray';
	editLink.innerHTML = 'Archived';
 
	$('span.editsection-upper').remove();
 
}
addOnloadHook( disableOldForumEdit );
}

/*
    Replaces {{USERNAME}} with the name of the user browsing the page.
    Requires copying Template:USERNAME.
*/

function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);

/* Test if an element has a certain class **************************************
 *
 * Description: Uses regular expressions and caching for better performance.
 * Maintainers: [[User:Mike Dillon]], [[User:R. Koot]], [[User:SG]]
 */

var hasClass = (function () {
    var reCache = {};
    return function (element, className) {
        return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
    };
})();

/** Collapsible tables *********************************************************
 *
 *  Description: Allows tables to be collapsed, showing only the header. See
 *               [[Wikipedia:NavFrame]].
 *  Maintainers: [[User:R. Koot]]
 */

var autoCollapse = 2;
var collapseCaption = "hide";
var expandCaption = "show";

function collapseTable( tableIndex )
{
    var Button = document.getElementById( "collapseButton" + tableIndex );
    var Table = document.getElementById( "collapsibleTable" + tableIndex );

    if ( !Table || !Button ) {
        return false;
    }

    var Rows = Table.rows;

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

            /* only add button and increment count if there is a header row to work with */
            var HeaderRow = Tables[i].getElementsByTagName( "tr" )[0];
            if (!HeaderRow) continue;
            var Header = HeaderRow.getElementsByTagName( "th" )[0];
            if (!Header) continue;

            NavigationBoxes[ tableIndex ] = Tables[i];
            Tables[i].setAttribute( "id", "collapsibleTable" + tableIndex );

            var Button     = document.createElement( "span" );
            var ButtonLink = document.createElement( "a" );
            var ButtonText = document.createTextNode( collapseCaption );

            Button.style.styleFloat = "right";    //
            Button.style.cssFloat = "right";      // REMOVE THESE LINES
            Button.style.fontWeight = "normal";   // ON 10 FEBRUARY 2009
            Button.style.textAlign = "right";     // 
            Button.style.width = "6em";           //
 
            Button.className = "collapseButton";  //Styles are declared in Common.css

            ButtonLink.style.color = Header.style.color;
            ButtonLink.setAttribute( "id", "collapseButton" + tableIndex );
            ButtonLink.setAttribute( "href", "javascript:collapseTable(" + tableIndex + ");" );
            ButtonLink.appendChild( ButtonText );

            Button.appendChild( document.createTextNode( "[" ) );
            Button.appendChild( ButtonLink );
            Button.appendChild( document.createTextNode( "]" ) );

            Header.insertBefore( Button, Header.childNodes[0] );
            tableIndex++;
        }
    }

    for ( var i = 0;  i < tableIndex; i++ ) {
        if ( hasClass( NavigationBoxes[i], "collapsed" ) || ( tableIndex >= autoCollapse && hasClass( NavigationBoxes[i], "autocollapse" ) ) ) {
            collapseTable( i );
        } 
        else if ( hasClass( NavigationBoxes[i], "innercollapse" ) ) {
            var element = NavigationBoxes[i];
            while (element = element.parentNode) {
                if ( hasClass( element, "outercollapse" ) ) {
                    collapseTable ( i );
                    break;
                }
            }
        }
    }
}

addOnloadHook( createCollapseButtons );
//<source lang="JavaScript">
 
/** Extra toolbar options ******************************************************
 *  
 *  Description: Adds extra buttons to the editing toolbar.
 *  
 *  To disable this script, add <code>mwCustomEditButtons = [];<code> to [[Special:Mypage/monobook.js]].
 *  
 *  Maintainers: [[User:MarkS]], [[User:Voice of All]], [[User:R. Koot]]
 */
 
if (mwCustomEditButtons) {
    mwCustomEditButtons.push({
        "imageFile": "http://upload.wikimedia.org/wikipedia/en/c/c8/Button_redirect.png",
        "speedTip": "Redirect",
        "tagOpen": "#REDIRECT [[",
        "tagClose": "]]",
        "sampleText": "Target page name"
    });
 
    mwCustomEditButtons.push({
        "imageFile": "http://upload.wikimedia.org/wikipedia/en/c/c9/Button_strike.png",
        "speedTip": "Strike",
        "tagOpen": "<s>",
        "tagClose": "</s>",
        "sampleText": "Strike-through text"
    });
 
    mwCustomEditButtons.push({
         "imageFile": "http://upload.wikimedia.org/wikipedia/en/1/13/Button_enter.png",
        "speedTip": "Line break",
        "tagOpen": "<br />",
        "tagClose": "",
        "sampleText": ""
    });
 
    mwCustomEditButtons.push({
        "imageFile": "http://upload.wikimedia.org/wikipedia/en/8/80/Button_upper_letter.png",
        "speedTip": "Superscript",
        "tagOpen": "<sup>",
        "tagClose": "</sup>",
        "sampleText": "Superscript text"
    });
 
    mwCustomEditButtons.push({
        "imageFile": "http://upload.wikimedia.org/wikipedia/en/7/70/Button_lower_letter.png",
        "speedTip": "Subscript",
        "tagOpen": "<sub>",
        "tagClose": "</sub>",
        "sampleText": "Subscript text"
    });
 
    mwCustomEditButtons.push({
        "imageFile": "http://upload.wikimedia.org/wikipedia/en/5/58/Button_small.png",
        "speedTip": "Small",
        "tagOpen": "<small>",
        "tagClose": "</small>",
        "sampleText": "Small Text"
    });
 
    mwCustomEditButtons.push({
        "imageFile": "http://upload.wikimedia.org/wikipedia/en/3/34/Button_hide_comment.png",
        "speedTip": "Insert hidden Comment",
        "tagOpen": "<!-- ",
        "tagClose": " -->",
        "sampleText": "Comment"
    });
 
    mwCustomEditButtons.push({
        "imageFile": "http://upload.wikimedia.org/wikipedia/en/1/12/Button_gallery.png",
        "speedTip": "Insert a picture gallery",
        "tagOpen": "\n<gallery>\n",
        "tagClose": "\n</gallery>",
        "sampleText": "Image:Example.jpg|Caption1\nImage:Example.jpg|Caption2"
    });
 
    mwCustomEditButtons.push({
        "imageFile": "http://upload.wikimedia.org/wikipedia/en/f/fd/Button_blockquote.png",
        "speedTip": "Insert block of quoted text",
        "tagOpen": "<blockquote>\n",
        "tagClose": "\n</blockquote>",
        "sampleText": "Block quote"
    });
 
    mwCustomEditButtons.push({
        "imageFile": "http://upload.wikimedia.org/wikipedia/en/6/60/Button_insert_table.png",
        "speedTip": "Insert a table",
        "tagOpen": '{| class="wikitable"\n|',
        "tagClose": "\n|}",
        "sampleText": "-\n! header 1\n! header 2\n! header 3\n|-\n| row 1, cell 1\n| row 1, cell 2\n| row 1, cell 3\n|-\n| row 2, cell 1\n| row 2, cell 2\n| row 2, cell 3"
    });
 
    mwCustomEditButtons.push({
        "imageFile": "http://upload.wikimedia.org/wikipedia/commons/7/79/Button_reflink.png",
        "speedTip": "Insert a reference",
        "tagOpen": "<ref>",
        "tagClose": "</ref>",
        "sampleText": "Insert footnote text here"
    });
}
 
 
//fix edit summary prompt for undo
//this code fixes the fact that the undo function combined with the "no edit summary prompter" causes problems if leaving the
//edit summary unchanged
//this was added by [[User:Deskana]], code by [[User:Tra]]
//see bug 8912
addOnloadHook(function () {
    if (document.location.search.indexOf("undo=") != -1
        && document.getElementsByName('wpAutoSummary')[0]) {
        document.getElementsByName('wpAutoSummary')[0].value='1';
    }
})
 
/** Edittools javascript loader ************************************************
 *
 *  Description: Pulls in [[MediaWiki:Edittools.js]]. Includes a cache-bypassing
 *  version number in the URL in order to allow any changes to the edittools to
 *  be rapidly deployed to users.
 *
 *  Note that, by default, this function does nothing unless the element with
 *  the ID "editpage-specialchars" (which contains the old edittools code in
 *  [[MediaWiki:Edittools]], and will be retained as a placeholder in the new
 *  implementation) has a class named "edittools-version-NNN", where NNN is a
 *  number.  If the class name has "test" before the number, the code will only
 *  run for users who have set "window.testJsEdittools = true" in their user JS.
 *  The "test" should be retained in the class name until the new edittools
 *  implementation is ready and fully tested, and until at least 30 days have
 *  passed since this loader stub was added (which will be in 27 June 2008).
 *
 *  For compatibility with Alex Smotrov's original implementation, on which this
 *  code is loosely based (see [[mw:User talk:Alex Smotrov/edittools.js]]), this
 *  loader can also be disabled by setting "window.noDefaultEdittools = true".
 *
 *  Maintainers: [[User:Ilmari Karonen]]
 */
 
//Prevent the static edittools from flashing before the compact edittools below is loaded.
appendCSS('div.edittools-text { display:none; }');
 
addOnloadHook(function () {
    // needs to be deferred until the DOM has fully loaded
    var placeholder = document.getElementById("editpage-specialchars");
    if (!placeholder || window.noDefaultEdittools) {
      //Show the static edittools again for users with "window.noDefaultEdittools=true".
      appendCSS('div.edittools-text { display:block; }');
      return;
    }
    var match = /(?:^| )edittools-version-(\d+)(?: |$)/.exec(placeholder.className);
 
    // set window.testJsEdittools = true to enable testing before full deployment
    if (!match && window.testJsEdittools)
        match = /(?:^| )edittools-version-(test\d+)(?: |$)/.exec(placeholder.className);
 
    if (!match) return;
    var url = wgScript + '?title=MediaWiki:Edittools.js&action=raw&ctype=text/javascript&nocache=' + match[1];
    importScriptURI(url);
});
 
 
// Turn on spellchecking in the edit summary field, for Firefox. 
// Temporary until [[bugzilla:21604]] is deployed
addOnloadHook( function() {
  var wpSummary = document.getElementById( "wpSummary" );
  if ( wpSummary && typeof wpSummary.spellcheck != undefined )
    wpSummary.spellcheck = true;
} );

/ Collapsible tables /
if ( wgIsArticle || window.location.href.indexOf( 'action=submit' ) > -1 )
{
  var script  = document.createElement( 'script' );
  script.src  = '/index.php?title=MediaWiki:CollapsibleTables.js&action=raw&ctype=text/javascript';
  script.type = 'text/javascript';
  document.getElementsByTagName( 'head' )[0].appendChild( script );
  
  hookEvent( 'load', function()
  {
    new CollapsibleTables();
  } );
}

/** Grid/slide **/

jQuery(function(){jQuery(".GridSlide").each(function(){jQuery("div.GridSlideChild:first",this).addClass("active").show()});setInterval(function(){jQuery(".GridSlide").each(function(){var b=jQuery("div.active",this),a=b.next();a.length<1&&(a=jQuery("div.GridSlideChild:first",this));b.removeClass("active").hide();a.addClass("active").show()})},2E3)});

jQuery(function(){jQuery("div.grid-input-slide").each(function(){jQuery("span.grid-input:first",this).addClass("active").show();jQuery("span.grid-input-numbers:first",this).addClass("active").show()});jQuery("div.grid-output-slide").each(function(){jQuery("span.grid-output:first",this).addClass("active").show();jQuery("span.grid-output-numbers:first",this).addClass("active").show()});setInterval(function(){jQuery("div.grid-input-slide").each(function(){var b=jQuery("span.grid-input.active",this),
a=b.next();if(a.length<1||!a.hasClass("grid-input"))a=jQuery("span.grid-input:first",this);b.removeClass("active").hide();a.addClass("active").show();b=jQuery("span.grid-input-numbers.active",this);a=b.next();a.length<1&&(a=jQuery("span.grid-input-numbers:first",this));b.removeClass("active").hide();a.addClass("active").show()});jQuery("div.grid-output-slide").each(function(){var b=jQuery("span.grid-output.active",this),a=b.next();if(a.length<1||!a.hasClass("grid-output"))a=jQuery("span.grid-output:first",
this);b.removeClass("active").hide();a.addClass("active").show();b=jQuery("span.grid-output-numbers.active",this);a=b.next();a.length<1&&(a=jQuery("span.grid-output-numbers:first",this));b.removeClass("active").hide();a.addClass("active").show()})},2E3)});