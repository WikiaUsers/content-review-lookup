/* Any JavaScript here will be loaded for all users on every page load. */

/*
<pre>
*/

var DEBUGMODE = false; // most users don't want to see debug information, probably
var DOCHEAD = document.getElementsByTagName('HEAD')[0];
var TOOLSCRIPTPATH = 'MediaWiki:Common.js/';

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
	var src= '/index.php?title=' + page + '&action=raw&ctype=text/javascript&templates=expand';
	var newScript = createElement( 'script',null,{'src':src,'type':'text/javascript'} );
	DOCHEAD.appendChild(newScript);
}

function insertSubscript(partialPage){
    insertScript(TOOLSCRIPTPATH + partialPage);
}

function sysopFunctions() {
    if ( wgUserGroups && !window.disableSysopJS ) {
        for ( var g = 0; g < wgUserGroups.length; ++g ) {
            if ( wgUserGroups[g] == 'sysop' ) {
                insertScript( 'MediaWiki:Sysop.js' );
                break;
            }
        }
    }
}
addOnloadHook( sysopFunctions );


/*
</pre>
*/