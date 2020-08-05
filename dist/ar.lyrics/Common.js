/* الجافاسكريبت الموضوع هنا سيتم تحميله لكل المستخدمين مع كل تحميل للصفحة. */
 
 /*<nowiki>*/

// SWC 4/6/06 - Adds the search plugin to the user's netscape/mozilla browser.
function swc_addEngine(){
    if ((typeof window.sidebar == "object") && (typeof
       window.sidebar.addSearchEngine == "function")) {
         window.sidebar.addSearchEngine(
         "http://lyricwiki.org/lyricWiki_mycroft.src",
         "http://lyricwiki.org/lyricWiki_mycroft.png",
         "LyricWiki.org",
         "Music" );
    } else {
         alert("Netscape 6 or Mozilla are needed to install a sherlock plugin.");
    }
}


 /*</nowiki>*/

// End of Script </pre><!--<noinclude>
/* -->

= hasClass =
Description: Test if an element has a certain class.  Uses regular expressions and caching for better performance.
Maintainers: [http://en.wikipedia.org/User:Mike_Dillon Mike Dillon], [http://en.wikipedia.org/User:R._Koot R. Koot], [http://en.wikipedia.org/User:SG SG], [[User:Teknomunk|teknomunk (local)]]
<!--</noinclude> */
// --><pre>
var hasClass = (function () 
{
    var reCache = {};
    return function (element, className) 
	{
        return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
    };
})();

/*
=Collapsible tables=
Description: Allows tables to be collapsed, showing only the header.
Maintainers: [[User:R. Koot]]
<!--</noinclude> */
// --><pre>

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

            Button.style.styleFloat = "right";
            Button.style.cssFloat = "right";
            Button.style.fontWeight = "normal";
            Button.style.textAlign = "right";
            Button.style.width = "6em";

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
    }
}

addOnloadHook( createCollapseButtons );
// End of Script </pre><!--</noinclude> */
// -->

/* WarnBar for LW:PN - maintained by LWChris */
/* Successfully tested with
     Firefox 3.6.3
     Internet Explorer 8.0.6001.18904
     Opera 10.51 Build 3315
     Safari 3.2.2 (525.28.1)
*/
function WarnBarShow() {
  Body=document.getElementById("body");
  Body.insertBefore(WarnBar,Body.firstChild);
  for(a=60;a<=105;++a){
   window.setTimeout("document.getElementById('WarnBar').setAttribute('style','top: "+(a-105)+"px; margin-bottom: "+(a-105)+"px;');",a*10);
  };
};

function WarnBarHide() {
  for(a=1;a<=46;++a){
    window.setTimeout("document.getElementById('WarnBar').setAttribute('style','top: "+(-a)+"px; margin-bottom: "+(-a)+"px;');",a*10);
  };
};

if(wgNamespaceNumber+wgArticleId==0){
  var FLUC="", ColAt=wgTitle.indexOf(":"), NewWord=true;
  for(CN=0;CN<wgTitle.length;++CN){
    Letter=wgTitle.substring(CN,CN+1);
    FLUC+=(NewWord)?Letter.toUpperCase():Letter;
    NewWord=(Letter==" "||CN==ColAt);
  };
  if(wgTitle!=FLUC){
    WarnBar=document.createElement("div");
    WarnBar.setAttribute("style","top: -46px; margin-bottom: -46px;");
    WarnBar.setAttribute("id","WarnBar");
    WarnBar.innerHTML='<span id="WarnBarHead">&nbsp;</span><div id="WarnBarMsg">The page you are creating does <b>not</b> match our <b><a href="http://lyrics.wikia.com/LW:PN" target="_blank">page naming conventions</a></b>.<br>The correct title is <b>"<a href="http://lyrics.wikia.com/'+FLUC.replace(/ /g,"_")+'" target="_blank">'+FLUC+'</a>"</b>. Please use that page instead.</div><span id="WarnBarX" onClick="WarnBarHide();" title="Hide">x</span>';
    window.setTimeout("WarnBarShow();", 1500); // Wait for the "body" Element
  };
};