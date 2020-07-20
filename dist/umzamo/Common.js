window.addPortletLink = mw.util.addPortletLink;
 
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
 
/** extract a URL parameter from the current URL **********
 *
 * @deprecated: Use mw.util.getParamValue with proper escaping
 */
function getURLParamValue(paramName, url){
	return mw.util.getParamValue(paramName, url);
}
 
/** &withCSS= and &withJS= URL parameters *******
 * Allow to try custom scripts from MediaWiki space 
 * without editing personal .css or .js files
 */
var extraCSS = mw.util.getParamValue("withCSS");
if ( extraCSS && extraCSS.match("^MediaWiki:[^&<>=%]*\.css$") ) {
    importStylesheet(extraCSS);
}
var extraJS = mw.util.getParamValue("withJS");
if ( extraJS && extraJS.match("^MediaWiki:[^&<>=%]*\.js$") ) {
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
 
    // Import scripts specific to Internet Explorer 6
    if (navigator.appVersion.substr(22, 1) == '6') {
        importScript('MediaWiki:Common.js/IE60Fixes.js');
    }
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
                InterwikiLinks[i].className += " FA"
                InterwikiLinks[i].title = "This is a featured article in another language.";
            } else if ( document.getElementById( InterwikiLinks[i].className + "-ga" ) ) {
                InterwikiLinks[i].className += " GA"
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
       SUPeditSummary = 'New user page thru [[:outreach:Account Creation Improvement Project|Outreach:ACIP]]',
       preFilltemplate = 'Replace this example text below with information about you: \n\nHello, my name is Rosie Underhill. I am a veterinarian from Utah, USA, but I was born just outside London, UK, around forty years ago. My background is in biology, with a main interest in snakes.\n\nI speak English and French. In my off-time, I listen to a lot of music, and I have discovered that Wikipedia is a very good source for information in that department. Hopefully I can help make it even better.';
   /*
    * The actual magic:
    * Inserts a form with a single visible field that simulates the normal
    * edit-field. It uses the variables from above to set a text example (pre
    * filled), an automated edit summary and the label of the submit button.
    * 'fakewpTextbox1' is used to hide the assembling of the final output that
    * is made below.
    */
   jQuery('#signupuserpagefillmagic').html('<form action="'+wgServer+wgScript+'?title='+wgFormattedNamespaces[2]+':'+wgUserName+'&action=submit" method="post"><textarea id="fakewpTextbox1" style="width:46em;height:20em;">'+preFilltemplate+'</textarea><textarea name="wpTextbox1" id="wpTextbox1" style="display:none;"></textarea><input type="hidden" name="wpSummary" id="wpSummary" value="'+SUPeditSummary+'" /><br/>'+preSubmitButton+'<br/><input type="submit" value="'+submitText+'"/></form>')
   // Waits for the form to be submitted.
   jQuery('#signupuserpagefillmagic form').live('submit',function(r){
     // Stops the form from submitting
     r.preventDefault()
     /*
      * Uses the previously defined variables preComment and postComment
      * to assemble the final output in the hidden textarea.
      */
     $('#wpTextbox1').text(preComment+jQuery('#fakewpTextbox1').text()+postComment)
     /*
      * Submits the form.
      * For unknown reasons jQuery('#signupuserpagefillmagic form').submit() crashes
      * Firefox (only tested in version 4.0). This method seam to work cross browser.
      */
     document.getElementById('signupuserpagefillmagic').getElementsByTagName('form')[0].submit()
   })
})