/* Az ide elhelyezett JavaScript kód minden felhasználó számára lefut az oldalak betöltésekor. */
/* Any JavaScript here will be loaded for all users on every page load. */
 
/**
 * Segédfüggvények
 */
 
function addLoadEvent(func) {
  addOnloadHook(func);
}
 
var hasClass = (function () {
   var reCache = {};
   return function (element, className) {
      return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
   };
})();
 
function getCookie(name) {
   var cookieText;
   var cookiePos = document.cookie.indexOf(name + '=');
   if(cookiePos!=-1) {
      var results = document.cookie.match(name+'=(.*?)(;|$)');
      if(results) cookieText = unescape(results[1]);
      return cookieText;
   } else return null;
}
function setCookie(name, text, expires) {
   if(text) {
      if(expires) {
         document.cookie = name + '=' + escape(text) + '; expires=' + expires.toUTCString() + '; path=/';
      } else {
         document.cookie = name + '=' + escape(text) + '; path=/';
      }
   } else {
      document.cookie = name + '=; expires=Thu, 01-Jan-1970 00:00:01 GMT; path=/'; // delete cookie
   }
}
 
/**
 * Elrejthető üzenetek
 */
 
function hideElement(e) {
   var name = this.id.slice(5); // 'hide-' elhagyása
   var element = document.getElementById(name);
   var expires = new Date();
   expires.setTime( expires.getTime() + (7*24*60*60*1000) ); // 1 hét
 
   setCookie('hide-' + name, '1', expires);
   element.style.display = "none";
   this.style.display = "none";
   return false;
}
function addHideButton(element) {
   var isHidden = getCookie('hide-' + element.id);
   if(isHidden) {
      element.style.display = "none";
   } else {
      var button = document.createElement( "a" );
      button.setAttribute( "id", "hide-" + element.id);
      button.setAttribute( "class", "hideButton" );
      button.setAttribute( "href", "#" );
      button.setAttribute( "title", "Üzenet elrejtése egy hétre" );
      button.onclick = hideElement;
      button.appendChild( document.createTextNode("[elrejt]") );
      element.appendChild( button );
   }
}
 
/**
 * WikiMiniAtlas
 */
 
importScriptURI( 'http://meta.wikimedia.org/w/index.php?title=MediaWiki:Wikiminiatlas.js'
            + '&action=raw&ctype=text/javascript&dontcountme=s&smaxage=3600');
 
/**
 * Tartós blokkolás
 */
 
//Cookie based blocking offers greater control such as upload-only blocks, but can be more 
//easily defeated.
//For usage instructions please see [[commons:MediaWiki talk:Cookieblock.js]].
 
function checkevilbit() {
   var ca = document.cookie.split(';');
   for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      if(c.replace(/^\s+|\s+$/g,"") == "evilbit=True") {
         document.getElementById("wpSave").disabled=true;
         document.getElementsByName("wpUpload")[0].disabled=true
      } 
      if(c == "evilbit=Upload") {
         document.getElementsByName("wpUpload")[0].disabled=true
      } 
   }
}
addOnloadHook(checkevilbit);
 
 
/**
 * Nincslicenc sablon beszúrása feltöltéskor
 */
 
// code to add a temporary license template if user leaves the license drop-down at 
// its default setting and no template is present in the upload description
// based on ForceSummary()
 
function ForceLicenseInstall(){
    // Check browser capabilities
    if(!document.forms || !document.getElementById) return;
    // User explicitly turned it off
    if (typeof noForceLicense != 'undefined') return;
    if(!document.forms.upload) return;
    document.forms.upload.wpUpload.onclick = ForceLicense;
};
 
function ForceLicense(){
    if ((document.forms.upload.wpLicense.selectedIndex == 0) && (!/\{\{[^{}]+\}\}/.test(document.forms.upload.wpUploadDescription.value))) {
        document.forms.upload.wpUploadDescription.value += ("\n==Licenc==\n{"+"{nincslicenc}"+"}");
    }
    return true;
};
 
addOnloadHook(ForceLicenseInstall);
 
 
/* Enable selecting last item in license drop-down */
 
function licenseSelectorEnableLast() {
  var selector = document.getElementById("wpLicense");
  if ((selector) && (selector.selectedIndex != selector.options.length - 1 )) {
    // call original handler
    licenseSelectorCheck();
  }
}
 
function licenseSelectorEnableLastInstall() {
  var selector = document.getElementById("wpLicense");
  if (selector) {
    selector.options[selector.options.length-1].style.disabled = 'false';
    selector.onchange = licenseSelectorEnableLast;
  }
}
 
addOnloadHook(licenseSelectorEnableLastInstall);
 
/**
 * Legördülő menü és extra gombok az edittools-ba
 */
 
if (document.URL.indexOf("action=edit") > 0 || document.URL.indexOf("action=submit") > 0 || document.URL.indexOf("Speci%C3%A1lis:Upload") > 0) {
 
  // Listbox to select edit tools
  function addCharSubsetMenu() {
    var specialchars = document.getElementById('specialchars');
    if (specialchars) {
      var menu = document.createElement('select');
      menu.style.display = 'inline';
      menu.onchange = function() {
        chooseCharSubset(menu.options[menu.selectedIndex].value);
      }
      var specialCharacterTypes = new Object();
      var l = document.getElementById('specialchars').getElementsByTagName('p');
      for (var i = 0; i < l.length; i++) {
        var title = l[i].title;
        var opt = document.createElement('option');
        opt.appendChild(document.createTextNode(title));
        opt.value = i;
        specialCharacterTypes[title] = opt;
      }
      if(typeof(allowedSpecialCharacterTypes) == 'undefined') {
        for (var i = 0; i < l.length; i++) {
          menu.appendChild(specialCharacterTypes[l[i].title]);
        }
        chooseCharSubset(0);
      } else {
        for(var i = 0; i < allowedSpecialCharacterTypes.length; i++) {
          if(typeof(specialCharacterTypes[allowedSpecialCharacterTypes[i]]) != 'undefined') {
            menu.appendChild(specialCharacterTypes[allowedSpecialCharacterTypes[i]]);
          }
        }
        chooseCharSubset(specialCharacterTypes[allowedSpecialCharacterTypes[0]].value);
      }
      specialchars.insertBefore(menu, specialchars.firstChild);
    }
  }
  function chooseCharSubset(s) {
    var l = document.getElementById('specialchars').getElementsByTagName('p');
    for (var i = 0; i < l.length ; i++) {
      l[i].style.display = (i == s) ? 'inline' : 'none';
    }
  }
 
  // Extra buttons for the edit toolbar, based on en:User:MarkS/extraeditbuttons.js
  function InsertButtonsToToolBar() {
    //Redirect
    mwCustomEditButtons[mwCustomEditButtons.length] = {
      "imageFile": "http://upload.wikimedia.org/wikipedia/en/c/c8/Button_redirect.png",
      "speedTip": "Átirányítás",
      "tagOpen": "#ÁTIRÁNYÍTÁS [[",
      "tagClose": "]]",
      "sampleText": "Cél" }
    //Strike-Out Button
    mwCustomEditButtons[mwCustomEditButtons.length] = {
      "imageFile": "http://upload.wikimedia.org/wikipedia/en/c/c9/Button_strike.png",
      "speedTip": "Áthúzott szöveg",
      "tagOpen": "<s>",
      "tagClose": "</s>",
      "sampleText": "Áthúzott szöveg" }
    //Small Text
    mwCustomEditButtons[mwCustomEditButtons.length] = {
      "imageFile": "http://upload.wikimedia.org/wikipedia/commons/1/17/Button_small_2.png",
      "speedTip": "Apróbetűs szöveg",
      "tagOpen": "<small>",
      "tagClose": "</small>",
      "sampleText": "Apróbetűs szöveg" }
    //Code
    mwCustomEditButtons[mwCustomEditButtons.length] = {
      "imageFile": "http://upload.wikimedia.org/wikipedia/commons/3/30/Tt_icon.png",
      "speedTip": "Írógép-szöveg",
      "tagOpen": "<tt>",
      "tagClose": "</tt>",
      "sampleText": "Fix szélességű szöveg" }
    //Reference link button
    mwCustomEditButtons[mwCustomEditButtons.length] = {
      "imageFile": "http://upload.wikimedia.org/wikipedia/commons/c/c4/Button_ref.png",
      "speedTip": "Forráshivatkozás",
      "tagOpen": "<ref>",
      "tagClose": "</ref>",
      "sampleText": "Hivatkozás szövegének helye" }
    //Reference button
    mwCustomEditButtons[mwCustomEditButtons.length] = {
      "imageFile": "http://upload.wikimedia.org/wikipedia/commons/f/fe/Button_refs.png",
      "speedTip": "Forráshivatkozás lábrész",
      "tagOpen": "<references/>",
      "tagClose": "",
      "sampleText": "" }
    // Template button
    mwCustomEditButtons[mwCustomEditButtons.length] = {
      "imageFile": "http://upload.wikimedia.org/wikipedia/commons/e/eb/Button_plantilla.png",
      "speedTip": "Sablon",
      "tagOpen": "{{",
      "tagClose": "}}",
      "sampleText": "példa sablon" }
 
    if(mwEditButtons[9] && mwEditButtons[9].imageId == 'mw-editbutton-signature') mwEditButtons[9].tagOpen = "– ~~" + "~~";
  }
 
  addOnloadHook(addCharSubsetMenu);
  addOnloadHook(InsertButtonsToToolBar);
}
 
/**
 * Ékezetes karakterek bejelentkezéshez
 */
 
function insertText(box, string) {
  box.focus();
  if (document.selection && document.selection.createRange) { // IE/Opera
    var range = document.selection.createRange();
    range.text = string;
  } else if (box.selectionStart || box.selectionStart == '0') { // Mozilla
    var startPos = box.selectionStart;
    var endPos = box.selectionEnd;
    box.value = box.value.substring(0, startPos) + string + box.value.substring(endPos, box.value.length);
  }
}
 
if (window['wgCanonicalSpecialPageName'] && wgCanonicalSpecialPageName == "Userlogin") {
  function installLoginChars() {
    window['loginbox'] = document.getElementById('wpName1');
    var loginchars = document.getElementById('loginchars');
    if (loginchars) {
      var hunchars = "áéíóöőúüűÁÉÍÓÖŐÚÜŰ".split('');
      for (var i = 0, str = ''; i < hunchars.length; i++) {
        str += '<a href="javascript:insertText(loginbox, \'' + hunchars[i] + '\')">' + hunchars[i] + '</a> ';
      }
 
      loginchars.innerHTML += str;
      loginchars.style.display = "block";
    }
  }
  addOnloadHook(installLoginChars);
}
 
/**
 * Navigációs kapcsoló (kinyit/becsuk)
 */
 
// ============================================================
 // BEGIN Dynamic Navigation Bars (experimantal)
 
 // set up the words in your language
 var NavigationBarHide = '▲ becsuk';
 var NavigationBarShow = '▼ kinyit';
 
 // set up max count of Navigation Bars on page,
 // if there are more, all will be hidden
 // NavigationBarShowDefault = 0; // all bars will be hidden
 // NavigationBarShowDefault = 1; // on pages with more than 1 bar all bars will be hidden
 var NavigationBarShowDefault = 0;
 
 
 // shows and hides content and picture (if available) of navigation bars
 // Parameters:
 //     indexNavigationBar: the index of navigation bar to be toggled
 function toggleNavigationBar(indexNavigationBar)
 {
    var NavToggle = document.getElementById("NavToggle" + indexNavigationBar);
    var NavFrame = document.getElementById("NavFrame" + indexNavigationBar);
 
    if (!NavFrame || !NavToggle) {
        return false;
    }
 
    // if shown now
    if (NavToggle.firstChild.data == NavigationBarHide) {
        for (
                var NavChild = NavFrame.firstChild;
                NavChild != null;
                NavChild = NavChild.nextSibling
            ) {
            if (NavChild.className == 'NavPic') {
                NavChild.style.display = 'none';
            }
            if (NavChild.className == 'NavContent') {
                NavChild.style.display = 'none';
            }
        }
    NavToggle.firstChild.data = NavigationBarShow;
 
    // if hidden now
    } else if (NavToggle.firstChild.data == NavigationBarShow) {
        for (
                var NavChild = NavFrame.firstChild;
                NavChild != null;
                NavChild = NavChild.nextSibling
            ) {
            if (NavChild.className == 'NavPic') {
                NavChild.style.display = 'block';
            }
            if (NavChild.className == 'NavContent') {
                NavChild.style.display = 'block';
            }
        }
    NavToggle.firstChild.data = NavigationBarHide;
    }
 }
 
 // adds show/hide-button to navigation bars
 function createNavigationBarToggleButton()
 {
    var indexNavigationBar = 0;
    // iterate over all < div >-elements
    for(
            var i=0; 
            NavFrame = document.getElementsByTagName("div")[i]; 
            i++
        ) {
        // if found a navigation bar
        if (NavFrame.className == "NavFrame") {
 
            indexNavigationBar++;
            var NavToggle = document.createElement("a");
            NavToggle.className = 'NavToggle';
            NavToggle.setAttribute('id', 'NavToggle' + indexNavigationBar);
            NavToggle.setAttribute('href', 'javascript:toggleNavigationBar(' + indexNavigationBar + ');');
 
            var NavToggleText = document.createTextNode(NavigationBarHide);
            NavToggle.appendChild(NavToggleText);
            // Find the NavHead and attach the toggle link (Must be this complicated because Moz's firstChild handling is borked)
            for(
              var j=0; 
              j < NavFrame.childNodes.length; 
              j++
            ) {
              if (NavFrame.childNodes[j].className == "NavHead") {
                NavFrame.childNodes[j].appendChild(NavToggle);
              }
            }
            NavFrame.setAttribute('id', 'NavFrame' + indexNavigationBar);
        }
    }
    // if more Navigation Bars found than Default: hide all
    if (NavigationBarShowDefault < indexNavigationBar) {
        for(
                var i=1; 
                i<=indexNavigationBar; 
                i++
        ) {
            toggleNavigationBar(i);
        }
    }
 
 }
 
 if (!fCreateNavigationBarToggleButton) addLoadEvent(createNavigationBarToggleButton);
 var fCreateNavigationBarToggleButton = 1;
 
 // END Dynamic Navigation Bars
 // ============================================================
 
/*
=== Table (collapsible) ===
*/
 
/** Collapsible tables *********************************************************
 *
 *  Description: Allows tables to be collapsed, showing only the header. See
 *               Wikipedia:NavFrame.
 *  Maintainers: User:R. Koot
 */
 
var autoCollapse = 2;
var collapseCaption = "▲ becsuk";
var expandCaption = "▼ kinyit";
 
// browser detection magic; Gecko < 1.8 does not know visibility:collapse
var gecko_rvi = navigator.userAgent.toLowerCase().indexOf('rv:');
var gecko_rv = (gecko_rvi == -1) ? 0 : parseFloat(navigator.userAgent.toLowerCase().substring(gecko_rvi+3, gecko_rvi+6));
 
function collapseTable( tableIndex )
{
    var Button = document.getElementById( "collapseButton" + tableIndex );
    var Table = document.getElementById( "collapsibleTable" + tableIndex );
 
    if ( !Table || !Button ) {
        return false;
    }
 
    var Rows = Table.getElementsByTagName( "tr" ); 
 
    if ( Button.firstChild.data == collapseCaption ) {
        if(is_gecko && gecko_rv >= 1.8) {
            for ( var i = 1; i < Rows.length; i++ ) {
                Rows[i].style.visibility = 'collapse';
                Rows[i].className += ' row-collapsed';
            }
        } else {
            for ( var i = 1; i < Rows.length; i++ ) {
                Rows[i].style.display = 'none';
            }
        }
        Button.firstChild.data = expandCaption;
    } else {
        if(is_gecko && gecko_rv >= 1.8) {
            for ( var i = 1; i < Rows.length; i++ ) {
                Rows[i].style.visibility = 'visible';
                Rows[i].className.replace(/\s*\brow-collapsed\b/g, '');
            }
        } else {
            for ( var i = 1; i < Rows.length; i++ ) {
                Rows[i].style.display = Rows[0].style.display;
            }
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
 
            Button.appendChild( ButtonLink );
 
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
 
if (!fCreateCollapseButtons) addOnloadHook( createCollapseButtons );
var fCreateCollapseButtons = 1;
 
/**
 * Címek javítása
 */
 
// For pages that have something like Template:Lowercase, replace the title, but only if it is cut-and-pasteable as a valid wikilink.
// (for instance iPod's title is updated. But C# is not an equivalent
// wikilink, so C Sharp doesn't have its main title changed)
// Likewise for users who have selected the U.K. date format ("1 March") the  
// titles of day-of-the-year articles will appear in that style. Users with any
// other date setting are not affected.
//
// The function looks for a banner like this: 
// <div id="RealTitleBanner">  ... <span id="RealTitle">title</span> ... </div>
// An element with id=DisableRealTitle disables the function.
//
var disableRealTitle = 0; // users can set disableRealTitle = 1 locally to disable.
if (wgIsArticle) { // don't display the RealTitle when editing, since it is apparently inconsistent (doesn't show when editing sections, doesn't show when not previewing)
  function fixArticleTitle() {
    var realTitleBanner = document.getElementById("RealTitleBanner");
    var realTitle = document.getElementById("RealTitle");
    if (realTitleBanner && realTitle && !document.getElementById("DisableRealTitle") && !disableRealTitle) {
      var realTitleHTML = realTitle.innerHTML;
      realTitleText = pickUpText(realTitle);
 
      var isPasteable = 0;
      //var containsHTML = /</.test(realTitleHTML);    // contains ANY HTML
      var containsTooMuchHTML = /</.test( realTitleHTML.replace(/<\/?(sub|sup|small|big)>/gi, "") ); // contains HTML that will be ignored when cut-n-pasted as a wikilink
      // calculate whether the title is pasteable
      var verifyTitle = realTitleText.replace(/^ +/, "");       // trim left spaces
      verifyTitle = verifyTitle.charAt(0).toUpperCase() + verifyTitle.substring(1, verifyTitle.length);    // uppercase first character
 
      // if the namespace prefix is there, remove it on our verification copy. If it isn't there, add it to the original realValue copy.
      if (wgNamespaceNumber != 0) {
        var localNamespace = wgPageName.split(':')[0];
        if (wgCanonicalNamespace == verifyTitle.substr(0, wgCanonicalNamespace.length).replace(/ /g, "_") && verifyTitle.charAt(wgCanonicalNamespace.length) == ":") {
          verifyTitle = verifyTitle.substr(wgCanonicalNamespace.length + 1);
        } else if (localNamespace == verifyTitle.substr(0, localNamespace.length).replace(/ /g, "_") && verifyTitle.charAt(localNamespace.length) == ":") {
          verifyTitle = verifyTitle.substr(localNamespace.length + 1);
        } else {
          realTitleText = localNamespace.replace(/_/g, " ") + ":" + realTitleText;
          realTitleHTML = localNamespace.replace(/_/g, " ") + ":" + realTitleHTML;
        }
      }
 
      // verify whether wgTitle matches
      verifyTitle = verifyTitle.replace(/[\s_]+/g, " ");      // underscores and multiple spaces to single spaces
      verifyTitle = verifyTitle.replace(/^\s+/, "").replace(/\s+$/, "");        // trim left and right spaces
      verifyTitle = verifyTitle.charAt(0).toUpperCase() + verifyTitle.substring(1, verifyTitle.length);    // uppercase first character
      if (verifyTitle == wgTitle) isPasteable = 1;
      var h1 = document.getElementsByTagName("h1")[0];
      if (h1 && isPasteable) {
        h1.innerHTML = containsTooMuchHTML ? realTitleText : realTitleHTML;
        if (!containsTooMuchHTML)
          realTitleBanner.style.display = "none";
      }
      document.title = realTitleText + " - Wikipédia";
    }
  }
 
  // similar to innerHTML, but only returns the text portions of the insides, excludes HTML
  function pickUpText(aParentElement) {
    var str = "";
 
    function pickUpTextInternal(aElement) {
      var child = aElement.firstChild;
      while (child) {
        if (child.nodeType == 1)		// ELEMENT_NODE 
          pickUpTextInternal(child);
        else if (child.nodeType == 3)	// TEXT_NODE
          str += child.nodeValue;
 
        child = child.nextSibling;
      }
    }
 
    pickUpTextInternal(aParentElement);
    return str;
  }
 
  addOnloadHook(fixArticleTitle);
}
 
/**
 * IRC login
 */
 
// this script looks for the element with id "irclogon", and replaces its contents 
// with a login form that redirects to the wikizine CGI:IRC gateway
 
if(document.getElementById && !document.location.href.match("action=edit") && !document.location.href.match("action=submit")) {
  function loadLoginForm() {
    var box = document.getElementById("irclogin");
    if(box ) {
      box.innerHTML = '<form method="get" action="http://embed.mibbit.com/" target="_blank" name="loginform" onsubmit="setJs()"><input type="hidden" name="server" value="irc.freenode.net"/><input type="hidden" name="channel" value="#wikipedia-hu"/><input type="hidden" name="forcePrompt" value="false"/><input type="hidden" name="nick" value="' + nickify(wgUserName) + '"/><input type="submit" value="Belépés"/></form>';
    }
  }
 
  function nickify(s) {
    if(s == null) {
      return "anon" + Math.floor(Math.random()*100);
    }
    s = s.toLowerCase();
    s = s.replace(" ", "_");
    s = s.replace(/á/g, 'a');
    s = s.replace(/é/g, 'e');
    s = s.replace(/í/g, 'i');
    s = s.replace(/[óő]/g, 'o');
    s = s.replace(/[úű]/g, 'u');
    s = s.replace(/[^a-z0-9_-]/g, '');
    return s;
  }
 
  function setJs() {
    if(navigator.product == 'Gecko') {
      document.loginform["interface"].value = 'mozilla';
    } else if(window.opera && document.childNodes) {
      document.loginform["interface"].value = 'opera7';
    } else if(navigator.appName == 'Microsoft Internet Explorer' &&
      navigator.userAgent.indexOf("Mac_PowerPC") > 0) {
      document.loginform["interface"].value = 'konqueror';
    } else if(navigator.appName == 'Microsoft Internet Explorer') {
      document.loginform["interface"].value = 'ie';
    } else if(navigator.appName == 'Konqueror') {
      document.loginform["interface"].value = 'konqueror';
    } else if(window.opera) {
      document.loginform["interface"].value = 'opera';
    }
  }
 
  addOnloadHook(loadLoginForm);
}
 
/**
 * Információs sablon beillesztése a szövegdobozba feltöltéskor
 */
 
function insertInfoTemplate() {
  var editbox = document.getElementById('wpUploadDescription');
  if (!editbox)            return;
  if (editbox.value != '') return;
  editbox.rows = 9; // make it large enough to fit the template
  editbox.value = "{{Információ\n"
                + "| leírás         = \n"
                + "| forrás         = \n"
                + "| dátum          = \n"
                + "| helyszín       = \n"
                + "| szerző         = \n"
                + "| engedély       = \n"
                + "| más változatok = \n"
                + "}}";
}
 
addOnloadHook(insertInfoTemplate);
 
/**
 * Összefoglalóra figyelmeztető prompt anonimoknak
 */
 
function IsLoggedIn() {
   // If there is no login button, assume we're logged in
   return document.getElementById('pt-login') == null;
}
 
// some code to check whether I've added an Edit Summary
// somewhat copied from [[User:ABCD/monobook.js]]
 
function ForceSummaryInstall(){
    // Check browser capabilities
    if(!document.forms || !document.getElementById) return;
    // User explicitly turned it off
    if (typeof noForceSummary != 'undefined') return;
    // User is logged in
    if(IsLoggedIn()) return;
    if(!/&action=edit/.test(window.location.href) && !/&action=submit/.test(window.location.href)) return;
    if(/&section=new/.test(window.location.href)) return;
    if(!document.forms.editform) return;
    document.forms.editform.wpSave.onclick = ForceSummary;
};
 
function ForceSummary(){
    var summary = document.forms.editform.wpSummary;
    if(!summary.value.replace(/^(\/\*.*\*\/)? *(.*) *$/,'$2')){
      var r = prompt('Kérünk, írj egy rövid szerkesztési\n összefoglalót a változtatásaidról:', summary.value);
      if(r == null) return false;
      summary.value = r;
    }
    return true;
};
 
addOnloadHook(ForceSummaryInstall);
 
/**
 * Változtatható rendezésű táblázatok: ékezetes betűk, magyar írásmódú számok rendezése
 */
 
function strip_basic_latin_accents(s) {
    s = s.replace(/[áäâãåàāăą]/g, 'a');
    s = s.replace(/[çćĉċč]/g, 'c');
    s = s.replace(/[ďđ]/g, 'd');
    s = s.replace(/[èéêëēĕėęě]/g, 'e');
    s = s.replace(/[ĝğġģ]/g, 'g');
    s = s.replace(/[ĥħ]/g, 'h');
    s = s.replace(/[ìíîïĩīĭįı]/g, 'i');
    s = s.replace(/[ĵ]/g, 'j');
    s = s.replace(/[ķĸ]/g, 'k');
    s = s.replace(/[ĺļľŀł]/g, 'l');
    s = s.replace(/[ñńņňŉŋ]/g, 'n');
    s = s.replace(/[òóôõöøōŏő]/g, 'o');
    s = s.replace(/[ŕŗř]/g, 'r');
    s = s.replace(/[śŝşš]/g, 's');
    s = s.replace(/[ţťŧ]/g, 't');
    s = s.replace(/[ùúûüũūŭůűų]/g, 'u');
    s = s.replace(/[ŵ]/g, 'w');
    s = s.replace(/[ýÿŷ]/g, 'y');
    s = s.replace(/[źżž]/g, 'z');
    s = s.replace(/[æ]/g, 'ae');
    s = s.replace(/[ĳ]/g, 'ij');
    s = s.replace(/[œ]/g, 'oe');
    return s;
}
 
function ts_sort_caseinsensitive(a,b) {
  var aa = strip_basic_latin_accents(a[1].toLowerCase());
  var bb = strip_basic_latin_accents(b[1].toLowerCase());
  return (aa < bb ? -1 : aa > bb ? 1 : a[2] - b[2]);
}
 
function ts_parseFloat(num) {
  if (!num) return 0;
  num = num.replace(/[\s\xa0.]/g, ''); /* ezreseket elválasztó whitespace, pont ki */
  num = num.replace(/,/, '.'); /* Tizedesvessző -> tizedespont */
  num = parseFloat(num);
  return (isNaN(num) ? 0 : num);
}
 
/* Eredeti változat: http://svn.wikimedia.org/viewvc/mediawiki/trunk/phase3/skins/common/wikibits.js */
/* Ha az eredeti változat frissebb az itteninél, frissíteni kell a helyi változtatások megtartásával */
function ts_resortTable(lnk) {
    var span = lnk.getElementsByTagName("span")[0];
    var td = lnk.parentNode;
    var tr = td.parentNode;
    var column = td.cellIndex;
    var table = tr.parentNode;
    while (table && !(table.tagName && table.tagName.toLowerCase() == "table")) {
        table = table.parentNode;
    }
    if (!table) {
        return;
    }
    if (table.rows.length <= 1) {
        return;
    }
    var rowStart = table.tHead && table.tHead.rows.length > 0 ? 0 : 1;
    var itm = "";
    for (var i = rowStart; i < table.rows.length; i++) {
        if (table.rows[i].cells.length > column) {
            itm = ts_getInnerText(table.rows[i].cells[column]);
            itm = itm.replace(/^[\s\xa0]+/, "").replace(/[\s\xa0]+$/, "");
            if (itm != "") {
                break;
            }
        }
    }
    sortfn = ts_sort_caseinsensitive;
    if (itm.match(/^\d\d[\/. -][a-zA-Z]{3}[\/. -]\d\d\d\d$/)) {
        sortfn = ts_sort_date;
    }
    if (itm.match(/^\d\d[\/.-]\d\d[\/.-]\d\d\d\d$/)) {
        sortfn = ts_sort_date;
    }
    if (itm.match(/^\d\d[\/.-]\d\d[\/.-]\d\d$/)) {
        sortfn = ts_sort_date;
    }
    if (itm.match(/^[\u00a3$\u20ac]/)) {
        sortfn = ts_sort_currency;
    }
    if (itm.match(/^[\d\s\xa0.,]+\%?$/)) { /* Ebben a sorban van különbség a huwikin */
        sortfn = ts_sort_numeric;
    }
    var reverse = span.getAttribute("sortdir") == "down";
    var newRows = new Array;
    for (var j = rowStart; j < table.rows.length; j++) {
        var row = table.rows[j];
        var keyText = ts_getInnerText(row.cells[column]);
        var oldIndex = reverse ? - j : j;
        newRows[newRows.length] = new Array(row, keyText, oldIndex);
    }
    newRows.sort(sortfn);
    var arrowHTML;
    if (reverse) {
        arrowHTML = "<img src=\"" + ts_image_path + ts_image_down + "\" alt=\"&darr;\"/>";
        newRows.reverse();
        span.setAttribute("sortdir", "up");
    } else {
        arrowHTML = "<img src=\"" + ts_image_path + ts_image_up + "\" alt=\"&uarr;\"/>";
        span.setAttribute("sortdir", "down");
    }
    for (var i = 0; i < newRows.length; i++) {
        if ((" " + newRows[i][0].className + " ").indexOf(" sortbottom ") == -1) {
            table.tBodies[0].appendChild(newRows[i][0]);
        }
    }
    for (var i = 0; i < newRows.length; i++) {
        if ((" " + newRows[i][0].className + " ").indexOf(" sortbottom ") != -1) {
            table.tBodies[0].appendChild(newRows[i][0]);
        }
    }
    var spans = getElementsByClassName(tr, "span", "sortarrow");
    for (var i = 0; i < spans.length; i++) {
        spans[i].innerHTML = "<img src=\"" + ts_image_path + ts_image_none + "\" alt=\"&darr;\"/>";
    }
    span.innerHTML = arrowHTML;
    ts_alternate(table);
}
 
/**
 * A Sablon:Képdia működéséhez szükséges kód
 */
function kepValtas(group, remindex, shwindex) {
  document.getElementById("kepDiaCs"+group+"Kep"+remindex).style.display="none";
  document.getElementById("kepDiaCs"+group+"Kep"+shwindex).style.display="inline";
}
 
function kepDia(){
  if (document.URL.match(/printable/g)) return;
  var bc=document.getElementById("bodyContent");
  if( !bc ) bc = document.getElementById("mw_contentholder");
  if( !bc ) return;
  var divs=bc.getElementsByTagName("td");
  var i = 0, j = 0;
  var units, search;
  var currentimage;
  var UnitNode;
  for (i = 0; i < divs.length ; i++) {
    if (divs[i].className != "kepDia") continue;
    UnitNode=undefined;
    search=divs[i].getElementsByTagName("div");
    for (j = 0; j < search.length ; j++) {
      if (search[j].className != "kepDiaKepek") continue;
      UnitNode=search[j];
      break;
    }
    if (UnitNode==undefined) continue;
    units=Array();
    for (j = 0 ; j < UnitNode.childNodes.length ; j++ ) {
      var temp = UnitNode.childNodes[j];
      if (temp.className=="center") units.push(temp);
    }
    for (j = 0 ; j < units.length ; j++) {
      currentimage=units[j];
      currentimage.id="kepDiaCs"+i+"Kep"+j;
      var imghead = document.createElement("div");
      var leftlink;
      var rightlink;
      if (j != 0) {
        leftlink = document.createElement("a");
        leftlink.href = "javascript:kepValtas("+i+","+j+","+(j-1)+");";
        leftlink.innerHTML="◀";
      } else {
        leftlink = document.createElement("span");
        leftlink.innerHTML="&nbsp;";
      }
      if (j != units.length - 1) {
        rightlink = document.createElement("a");
        rightlink.href = "javascript:kepValtas("+i+","+j+","+(j+1)+");";
        rightlink.innerHTML="▶";
      } else {
        rightlink = document.createElement("span");
        rightlink.innerHTML="&nbsp;";
      }
      var comment = document.createElement("tt");
      comment.innerHTML = "("+ (j+1) + "/" + units.length + ")";
      with(imghead) {
        style.fontSize="110%";
        style.fontweight="bold";
        appendChild(leftlink);
        appendChild(comment);
        appendChild(rightlink);
      }
      currentimage.insertBefore(imghead,currentimage.childNodes[0]);
      if (j != 0) currentimage.style.display="none";
    }
  }
}
 
addOnloadHook(kepDia);
 
/*
 * Knávom, azaz a kínai nevek átírását váltogató mechanika.
 *
 * [[Sablon:Kínai]] stb.
 */
importScript('User:Chery/kínai.js');