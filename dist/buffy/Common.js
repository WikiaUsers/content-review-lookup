/* Any JavaScript here will be loaded for all users on every page load. */

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



var STRINGTAGTEXT; // yeah, this is a global variable.  Bite me.

function createStringTags(){
    var stringTags
    try{  // Some of the newer browsers support getElementsByClassName natively
        stringTags= document.getElementsByClassName('stringTags'); // find all tab definitions in the article
    } catch (el) { // and some don't
        return 0;
    }
    if (stringTags.length == 0) return 0;

    STRINGTAGTEXT = new Array(stringTags.length);
    for (var i=0; i < stringTags.length; i++){
        var curTag = stringTags[i];
        if (curTag.textContent) {
            STRINGTAGTEXT[i] = curTag.textContent;
        } else {
            STRINGTAGTEXT[i] = curTag.innerText;
        }
        newLink = createElement('A', 
                                curTag.title,
                                {'href':'javascript:insertStringTags(' + i + ');'}
                               );
        while (curTag.childNodes[0]) {
            curTag.removeChild(curTag.childNodes[0]);
        }
        curTag.appendChild(newLink);
    }
}

addOnloadHook(createStringTags);

function insertStringTags(idx){
    insertTags(STRINGTAGTEXT[idx], '', '');
}