/*<pre>*/

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

/* Include Global Anime-Common.js Information */
importScriptURI('http://anime.wikia.com/index.php?title=MediaWiki:Anime-Common.js&action=raw&ctype=text/javascript&dontcountme=s&templates=expand');

importScript('MediaWiki:LogoChanger.js');

/* Allows toggle of game navigation */
var displayStates = new Array('none', '');
var displayText = new Array('show', 'hide');

function showHide_init(){
  var idnum = 0;
  var joints = getElementsByClassName(document, "*", "show_hide_btn_joint");
  for (var i=0; i < joints.length; i++){
    var curJoint = joints[i];

    curJoint.setAttribute("state", 0); // 0 is the hide state

    var btnA = createElement("A", "show", {"href":'javascript:toggleShowHide("' + curJoint.id + '");',
                                           "id":"show_hide_btn_"+curJoint.id});
    var btnSpan = createElement("SPAN", ["[", btnA, "]"], {"class":"show_hide_btn_span"});
    curJoint.insertBefore(btnSpan, curJoint.firstChild);

    var curElms = getElementsByClassName(document, "*", "show_hide_elm_"+curJoint.id);
    for (var j=0; j < curElms.length; j++){
      var curElm = curElms[j];
        curElm.style.display="none";
    }
  }
}
function toggleShowHide(jointId){
  var curJoint=document.getElementById(jointId);
  var newState = 1-curJoint.getAttribute('state');
  curJoint.setAttribute('state', newState);
  document.getElementById("show_hide_btn_"+jointId).firstChild.data = displayText[newState];
  var curElms = getElementsByClassName(document, "*", "show_hide_elm_"+jointId);
  var newDispl = displayStates[newState];
  for (var j=0; j < curElms.length; j++){
    var curElm = curElms[j];
    curElm.style.display=newDispl;
  }
}
addOnloadHook(showHide_init);

function gamenav_init() {
	var idnum = 0;
	// Find all tables with class gamenav 
	var tables = getElementsByClassName(document, "table", "game_nav");
	for (var ti = 0; ti < tables.length ; ti++) {
		var tab = tables[ti];

		tab.setAttribute('state', 1); // 1 is the show state
		var gameNavTog = document.createElement("a");
		gameNavTog.setAttribute('href', 'javascript:toggleGameNav("' + tab.id + '");');
		gameNavTog.setAttribute('id', 'tog_' + tab.id);

		var gameNavTogText = document.createTextNode('hide');
		gameNavTog.appendChild(gameNavTogText);

		var spans = getElementsByClassName(tab, "span", "game nav tog");
		for( var sj=0; sj < spans.length; sj++ ){
			spans[sj].appendChild(gameNavTog);
		}
	}
}
function toggleGameNav(tableID) {
	var nothing;
	var tab = document.getElementById(tableID);
	var newState = 1- tab.getAttribute('state');
	tab.setAttribute('state', newState);
	for (var ti=0; ti < tab.rows.length; ti++){
		var myRow = tab.rows[ti];
		if (myRow.className != "nohide"){
			myRow.style.display = displayStates[newState];
		}
	}
	var togA = document.getElementById('tog_' + tableID);
	var togTxt = togA.firstChild;
	togTxt.data = displayText[newState];
}

addOnloadHook(gamenav_init);

/*</pre>
== Open in new window code ==
<pre>*/
/* Function based on externalLinks as described at http://www.mediawiki.org/wiki/Manual:Opening_external_links_in_a_new_window
*/

addOnloadHook(function() {
        if (!document.getElementsByTagName) {
                return;
        }
        var wrappers = getElementsByClassName(document, "*", "OpenNewWindow");
        for (var j=0; j < wrappers.length; j++) {
                var anchors = wrappers[j].getElementsByTagName("a");
                for (var i = 0; i < anchors.length; i++) {
                        var anchor = anchors[i];
                        anchor.target = "_blank";
                }
        }
});

/*</pre>
== Sortable Table Header Fix ==
<pre>*/
function ts_makeSortable(table){
	var firstRow;
	if(table.rows&&table.rows.length>0){
		if(table.tHead&&table.tHead.rows.length>0){
			firstRow=table.tHead.rows[table.tHead.rows.length-1];
		}else{
			firstRow=table.rows[0];
		}
	}
	if(!firstRow)
		return;
	for(var i=0;i<firstRow.cells.length;i++){
		var cell=firstRow.cells[i];
		if((" "+cell.className+" ").indexOf(" unsortable ")==-1){
			cell.innerHTML+=' '
					+'<a href="#" class="sortheader" '
					+'onclick="ts_resortTable(this);return false;">'
					+'<span class="sortarrow">'
					+'<img src="'
					+ts_image_path
					+ts_image_none
					+'" alt="&darr;"/></span></a>';
		}
	}
	if(ts_alternate_row_colors){
		ts_alternate(table);
	}
}


/* </pre> */