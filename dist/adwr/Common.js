/* Any JavaScript here will be loaded for all users on every page load. */


/* -- hit counter ------------------------------------------------------------------------------------------ */

function myWikiEncode(text, article)
{
  var str = text;

  try { str = str.replace(' ', '_', 'g'); } catch (e) { }

  if (article) {
    // http://en.wikipedia.org/wiki/Percent-encoding (reserved characters)
    var wikiReserved = { "!": "%21", "*": "%2A", '"': "%22", "'": "%27",
                         "(": "%28", ")": "%29", ";": "%3B", ":": "%3A",
                         "@": "%40", "&": "%26", "=": "%3D", "+": "%2B",
                         "$": "%24", ",": "%2C", "/": "%2F", "?": "%3F",
                         "%": "%25", "#": "%23", "[": "%5B", "]": "%5D" }

    var s = str.split('');
    var n = '';

    for (var i = 0; i < s.length; i++) {
      var c = s[i], r = wikiReserved[c];

      n += r ? r : c;
    }

    str = n;
  }

  try {
    str = encodeURI(str);
  } catch (e) {
    str = escape(str);
  }

  return str;
}

function addCounter()
{
  // no globals or we're not viewing an article
  if (!(wgServer && wgPageName && wgArticlePath && wgAction == 'view'))
    return;

  // article does not exist (yet)
  if (wgArticleId < 1)
    return;

  // don't show on the diff view
  if (document.getElementById('mw-diff-otitle1'))
    return;

  // exclude talk and special pages
  if (wgCanonicalNamespace && /^(Talk|.*_talk|Special)$/.test(wgCanonicalNamespace))
    return;

  // where to append the counter
  var node = document.getElementById('article');

  if (!node) // check for new theme
    node = document.getElementById('WikiaMainContent');

  // shouldn't happen (everything appears to be wrapped in an #article)
  if (!node)
    return;

  // hit counter url (superlgn's custom app)
  var counter = 'http://www.gozer.org/hit_counter/';

  // http://adwr.wikia.com + /wiki/$1
  var site = wgServer + wgArticlePath.replace('$1', '');

  var br = document.createElement('br');

  if (br) {
    br.setAttribute('style', 'clear: both;');
    node.appendChild(br);
  }

  var a = document.createElement('a');

  if (a) {
    // link to the stats program
    a.setAttribute('href', counter + 'stats.php?site=' + escape(site));

    // open in a new window? comment to disable
    a.setAttribute('onclick', "window.open(this.href, 'Hit Counter statistics', 'toolbar=0,location=0,status=0,scrollbars=1,resizable=1,height=600,width=550'); return false;");

    a.setAttribute('target', '_blank');

    a.setAttribute('id', 'hitCounter');

    if (node.getAttribute('id') == 'WikiaMainContent')
      a.setAttribute('style', 'padding: 10px;');

    node.appendChild(a);

    var img = document.createElement('img');

    if (img) {
      img.setAttribute('border', 0);
      img.setAttribute('src', counter + '?page=' + myWikiEncode(site) + myWikiEncode(wgPageName, true));

      a.appendChild(img);
    }
  }
}

// comment me to disable the counter
addOnloadHook(addCounter);


/* -- collapsible tables ----------------------------------------------------------------------------------- */
/* http://en.wikipedia.org/wiki/Wikipedia:Collapsible_tables */
/* http://meta.wikimedia.org/wiki/MediaWiki:Common.js */

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