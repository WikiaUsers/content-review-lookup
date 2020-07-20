/* Any JavaScript here will be loaded for all users on every page load. */

/*
== Generic utility functions ==
<pre> */

var DEBUGMODE = false; // most users don't want to see debug information, probably
var DOCHEAD = document.getElementsByTagName('HEAD')[0];
var TOOLSCRIPTPATH = 'MediaWiki:Common.js/';

/* </pre>
=== createElement() ===
* createElement is taken from Chinese Wikipedia
* List of authors can be found at http://zh.wikipedia.org/w/index.php?title=MediaWiki:Common.js&action=history 
<pre> */
function createElement(tag,children,props){
	var element = document.createElement(tag);
	if(!(children instanceof Array)){children=[children];}
	for(var i=0;i<children.length;i++){
		var child=children[i];
		if(typeof child=='string'){child=document.createTextNode(child);}
		if(child){element.appendChild(child);}
	}
	if(typeof props=='object'){
		for(var k in props){
			switch(k){
			case 'styles':
				var styles=props.styles;
				for(var s in styles){element.style[s]=styles[s];}
				break;
			case 'events':
				var events=props.events;
				for(var e in events){ addHandler(element,e,events[e]); }
				break;
			case 'class':
				element.className=props[k];break;
			default:
				element.setAttribute(k,props[k]);
			}
		}
	}
	return element;
}

/* </pre>
=== insertScript() ===
<pre> */
function insertScript( page ) {
	var src= '/index.php?title=' + page + '&action=raw&ctype=text/javascript&templates=expand';
	var newScript = createElement( 'script',null,{'src':src,'type':'text/javascript'} );
	DOCHEAD.appendChild(newScript);
}
function insertSubscript(partialPage){
    insertScript(TOOLSCRIPTPATH + partialPage);
}

/* </pre>

=== insertCSS ===
<pre> */
function insertCSS( page ) {
    var sheet = wgScriptPath
              + '/index.php?title='
              + encodeURIComponent( page.replace( / /g, '_' ) )
              + '&action=raw&ctype=text/css';
    var styleElem = document.createElement( 'style' );
    styleElem.setAttribute( 'type' , 'text/css' );
    try{
        styleElem.appendChild( document.createTextNode('@import "' + sheet + '";') );
    } catch (el){ // a hack to fix problem with Internet Explorer
        document.createStyleSheet(sheet);
    }
    DOCHEAD.appendChild( styleElem );
}

function insertExternalCSS( sheetURL ) {
    var styleElem = document.createElement( 'style' );
    styleElem.setAttribute( 'type' , 'text/css' );
    try{
        styleElem.appendChild( document.createTextNode('@import "' + sheetURL + '";') );
    } catch (el){ // a hack to fix problem with Internet Explorer
        document.createStyleSheet(sheet);
    }
    DOCHEAD.appendChild( styleElem );
}

/* </pre>

=== hasClass ===
<pre> */

function hasClass( element, className ) {
  var Classes = element.className.split( " " );
  for ( var i = 0; i < Classes.length; i++ ) {
    if ( Classes[i] == className ) {
      return ( true );
    }
  }
  return ( false );
}

/* </pre>

== Inserted scripts ==
* [[MediaWiki:Common.js/AllInOneLoader]] loads:
** [[MediaWiki:Common.js/NavToggle]]
<pre>
*/


importWikiaScriptPages([
    'Common.js/NavToggle.js'
]);

addOnloadHook( function (){
    if (DEBUGMODE) {
        insertSubscript('DebuggerInit.js');
        insertSubscript('DebugTools.js');
    } 
});
/*
</pre>
*/