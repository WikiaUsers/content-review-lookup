/* Any JavaScript here will be loaded for all users on every page load. */

// ============================================================
// BEGIN scripts for Internet Explorer 6
// ============================================================

if (navigator.appName == "Microsoft Internet Explorer")
{
    //Import scripts specific to Internet Explorer 6
    if (navigator.appVersion.substr(22, 1) == "6")
    {
        importScript("MediaWiki:Common.js/IE60Fixes.js")
    }
}

// ============================================================
// END scripts for Internet Explorer 6
// ============================================================

// ============================================================
// BEGIN Template:Games
// ============================================================

function addTitleGames()
{
    var titleDiv = document.getElementById("title-games");
    if (titleDiv != null && titleDiv != undefined)
    {
       var content = document.getElementById('article');
       if (!content) 
       {
         var content = document.getElementById('content');
       }

       if (content) 
       {
          var hs = content.getElementsByTagName('h1');
          var firstHeading;
          for (var i = 0; i < hs.length; i++){
            if ( (' '+hs[i].className+' ').indexOf(' firstHeading ') != -1){
              firstHeading=hs[i];
              break;
            }
          }
   
          var cloneNode = titleDiv.cloneNode(true);
          firstHeading.insertBefore(cloneNode, firstHeading.childNodes[0]);
          cloneNode.style.display = "block";
          cloneNode.style.visibility = "visible";
          if (skin != "monaco")
          {
            cloneNode.style.marginTop = "-11px";
          }
       }
    }
}

addOnloadHook( addTitleGames );

// ============================================================
// END Template:Games
// ============================================================

// ============================================================
// BEGIN collapsible tables
// This script is from Wikipedia. For author attribution, please see http://en.wikipedia.org/w/index.php?title=MediaWiki:Common.js&action=history
// ============================================================

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
/* customized for Fallout wiki */

var autoCollapse = 5;
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
    var collapseIndex = 0;
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

            Button.style.styleFloat = "right";
            Button.style.cssFloat = "right";
            Button.style.fontWeight = "normal";
            Button.style.textAlign = "right";
            Button.style.marginLeft = "-100%";
            Button.style.width = "6em";
            Button.className = "t_show_hide";

            ButtonLink.style.color = Header.style.color;
            ButtonLink.setAttribute( "id", "collapseButton" + tableIndex );
            ButtonLink.setAttribute( "href", "javascript:collapseTable(" + tableIndex + ");" );
            ButtonLink.appendChild( ButtonText );

            Button.appendChild( document.createTextNode( "[" ) );
            Button.appendChild( ButtonLink );
            Button.appendChild( document.createTextNode( "]" ) );

            Header.insertBefore( Button, Header.childNodes[0] );

            if ( !hasClass( Tables[i], "nocount" ) ) {
		collapseIndex++;
	    }
            tableIndex++;
        }
    }

    for ( var i = 0;  i < tableIndex; i++ ) {
        if ( hasClass( NavigationBoxes[i], "collapsed" ) || ( collapseIndex >= autoCollapse && hasClass( NavigationBoxes[i], "autocollapse" ) ) ) {
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

// ============================================================
// END collapsible tables
// This script is from Wikipedia. For author attribution, please see http://en.wikipedia.org/w/index.php?title=MediaWiki:Common.js&action=history
// ============================================================

// ============================================================
// BEGIN demo widgets
// ============================================================

addWidgets = function() {
   var widgets = getElementsByClassName(document.getElementById('bodyContent'),'div','wikia_widget');
   for(var i = 0; i < widgets.length; i++){
      widgets[i].innerHTML = "<object classid='clsid:d27cdb6e-ae6d-11cf-96b8-444553540000' codebase='http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0' width='300' height='250' align='middle' id='wikia_widget'><param name='allowScriptAccess' value='always' /><param name='movie' value='https://images.wikia.nocookie.net/common/skins/common/flash_widgets/wikia_widget.swf' /><param name='quality' value='high' /> <param name='wmode' value='transparent' /><embed src='https://images.wikia.nocookie.net/common/skins/common/flash_widgets/wikia_widget.swf' FlashVars='backgroundColor=000000&backgroundImage=&borderColor=92947c&dropShadow=on&headerColor=92947c&headerAlpha=.05&headerBorderColor=000000&headline1=The Vault presents&headline1Color=CCCCCC&headline2=Most Wanted DLC Items&headline2Color=FFFFFF&clickURL=http://fallout.wikia.com&wikiURLColor=FFFFFF&wikiaLogoColor=FFFFFF&type=slideshow&slideshowImages=https://images.wikia.nocookie.net/fallout/images/8/8b/Widget_Auto-Axe.png,https://images.wikia.nocookie.net/fallout/images/f/ff/Widget_Gauss-Rifle.png,https://images.wikia.nocookie.net/fallout/images/6/6f/Widget_WidPower-Armor.png,https://images.wikia.nocookie.net/fallout/images/1/1c/Get_Shock-Sword.png&=Preview images in the widget&' quality='high' wmode='transparent' width='300' height='250' align='middle' allowScriptAccess='always' type='application/x-shockwave-flash' pluginspage='http://www.macromedia.com/go/getflashplayer' name='wikia_widget' /></object>";
   }
}

addOnloadHook(addWidgets);

// ============================================================
// END demo widgets
// ============================================================

/* Disable redirect to MyHome (code by Ciencia Al Poder) */
if( skin == 'monaco' && wgNamespaceNumber == -1 && wgCanonicalSpecialPageName == 'MyHome' && window.location.toString().indexOf('redirect=no') == -1 ) {
	window.location = wgServer + wgArticlePath.replace('$1',(window.wgMainpage||window.wgMainPageTitle));
}

function alterMyHomeLink(link) {
   if (link != null && link != undefined)
   {
      if (link.href.indexOf('/wiki/Special:MyHome') > -1)
      {
         link.href = link.href + "?redirect=no";
      }
   }
}

function replaceMyHomeLinks() {
   var MyHomeButtons;
   var MyHomeTab;
   var MyHomeWidget = document.getElementById("community-widget-action-button");
   alterMyHomeLink(MyHomeWidget);

   var myHomeDiv = document.getElementById("header_myhome");
   if(typeof myHomeDiv!="undefined") {
      var MyHomeHeader = document.getElementById("header_myhome").getElementsByTagName("a")[0];
      
      alterMyHomeLink(MyHomeHeader);

      if (wgNamespaceNumber == -1 && wgCanonicalSpecialPageName == 'MyHome') {
         MyHomeButtons = document.getElementById("myhome-feed-switch").getElementsByTagName("a")[0];
         alterMyHomeLink(MyHomeButtons);
      }
      if (wgNamespaceNumber == 2 || wgNamespaceNumber == 3 || wgNamespaceNumber == 500 || wgCanonicalSpecialPageName == 'Contributions') {
         MyHomeTab = document.getElementById("user_masthead_tabs").getElementsByTagName("li")[0].getElementsByTagName("a")[0];
         alterMyHomeLink(MyHomeTab);
      }
   }
}

if (skin == 'monaco' && wgUserName != null) {
  addOnloadHook (replaceMyHomeLinks);
}