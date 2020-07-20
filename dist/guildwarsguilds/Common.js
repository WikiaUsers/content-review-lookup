/* Any JavaScript here will be loaded for all users on every page load. */

/*<nowiki>*/
/** additional scripts **/
if ( wgIsArticle || window.location.href.indexOf( 'action=submit' ) > -1 )
{
  addScript( 'MediaWiki:CollapsibleTables.js' );
  hookEvent( 'load', function()
  {
    new CollapsibleTables();
    diffwithFix();
  } );

/**** function addScript.js
 * (c) 2007 by Patrick Westerhoff [poke]
 */
function addScript ( pagename )
{
  var script  = document.createElement( 'script' );
  pagename    = encodeURI( pagename.replace( ' ', '_' ) );
  script.src  = '/index.php?title=' + pagename + '&action=raw&ctype=text/javascript';
  script.type = 'text/javascript';
  
  document.getElementsByTagName( 'head' )[0].appendChild( script );
}

/**** function diffwithFix.js
 * (c) 2008 by Patrick Westerhoff [poke]
 */
function diffwithFix ()
{
  var diffSpan = document.getElementById( 'diffwith' );
  if ( diffSpan == undefined )
    return;
  
  var diffLink  = diffSpan.getElementsByTagName( 'a' )[0];
  var diffTitle = diffSpan.title;
  var xmlHttp;
  
  try
  {
    xmlHttp = new XMLHttpRequest();
  }
  catch ( e )
  {
    try
    {
      xmlHttp = new ActiveXObject( 'Msxml2.XMLHTTP' );
    }
    catch ( e )
    {
      try
      {
        xmlHttp = new ActiveXObject( 'Microsoft.XMLHTTP' );
      }
      catch ( e )
      {
        diffSpan.style.fontSize = '90%';
        diffSpan.innerHTML      = '(Automated diff <b>not available</b>.)';
        return;
      }
    }
  }
  
  xmlHttp.onreadystatechange = function ()
  {
    if ( xmlHttp.readyState != 4 )
      return;
    
    revs = xmlHttp.responseXML.getElementsByTagName( 'rev' );
    
    if ( revs.length > 0 )
    {
      diffLink.href += '&oldid=' + revs[0].getAttribute( 'revid' );
      diffSpan.title = '';
    }  
  } 
  xmlHttp.open( 'GET', '/api.php?format=xml&action=query&prop=revisions&rvprop=ids&rvlimit=1&titles=' + diffTitle, true );
  xmlHttp.send( null );
}

// =====================================================================
// Pagetitle rewrite
//
// Rewrites the page's title, used by Template:Title
// by [[w:c:runescape:User:Sikon]]
//
// =====================================================================

function rewriteTitle() {
    if(typeof(SKIP_TITLE_REWRITE) != 'undefined' && SKIP_TITLE_REWRITE)
        return;

    var titleDiv = document.getElementById('title-meta');
    if(titleDiv == null || titleDiv == undefined)
        return;

    // For the title in the Monaco masthead
    if (skin == "monaco" && (wgCanonicalNamespace == "User" || wgCanonicalNamespace == "User_talk")) {
        var mastheadUser = document.getElementById("user_masthead_head");
        var mastheadSince = document.getElementById("user_masthead_since");

        var titleString = '<h2>' + titleDiv.innerHTML;
        titleString += '<small id="user_masthead_since">' + mastheadSince.innerHTML;
        titleString += '</small></h2>';
    
        mastheadUser.innerHTML = titleString;
    } else {
        var cloneNode = titleDiv.cloneNode(true);
        var firstHeading = getElementsByClass('firstHeading', document.getElementById('content'), 'h1')[0];
        var node = firstHeading.childNodes[0];

        // new, then old!
        firstHeading.replaceChild(cloneNode, node);
        cloneNode.style.display = "inline";

        var titleAlign = document.getElementById('title-align');
        firstHeading.style.textAlign = titleAlign.childNodes[0].nodeValue;
    }
}
addOnloadHook(rewriteTitle, false);

/*</nowiki>*/