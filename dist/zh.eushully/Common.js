/* 此处的JavaScript将加载于所有用户每一个页面。 */

/* 
== General stuff ==
<pre>*/

var DOCHEAD = document.getElementsByTagName('HEAD')[0];

// createElement is taken from Chinese Wikipedia
// List of authors can be found at http://zh.wikipedia.org/w/index.php?title=MediaWiki:Common.js&action=history
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

function insertScript( page ) {
	var src= '/index.php?title=' + page + '&action=raw&ctype=text/javascript';
	var newScript = createElement( 'script',null,{'src':src,'type':'text/javascript'} );
	DOCHEAD.appendChild(newScript);
}

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

insertScript("MediaWiki:JS/CollapseVariants");

function include(lang,s) {
  document.write("<script type=\"text/javascript\" src=\"http://"+lang+".wikia.com/index.php?title=" + encodeURI(s) + "&action=raw&ctype=text/javascript&dontcountme=s\"></script>");
}

include("ja","User:Tommy6/js/funp.js");
include("ja","User:Tommy6/js/hemidemi.js");
include("ja","User:Tommy6/js/udn.js");
include("ja","User:Tommy6/js/myshare.js");
include("ja","User:Tommy6/js/youpush.js");
include("ja","User:Tommy6/js/xianguo.js");