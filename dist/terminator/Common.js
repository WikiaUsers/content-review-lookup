/* Any JavaScript here will be loaded for all users on every page load. */

/** Tabview ************************************************************************
 *
 *  Description: This is an alternative to Wikia's TabView extension by Inez Korczynski.
 *               This doesn't use AJAX and has a fallback that allows things to just be 
 *               displayed flat when someone has JS disabled. 
 *               Source: http://en.anime.wikia.com/wiki/MediaWiki:TabView.js 
 *               See Also: http://www.mail-archive.com/wikia-l@wikia.com/msg00832.html
 *  Written by:  [[w:User:Dantman]] "Daniel Friesen"
 *
 *  Customized for Terminator Wiki by: [[User:Jeiara]]
 */

// This script is to be used only for a specific page: Main Page
if (wgPageName == "Terminator_Wiki") {

//------------------------------//
// BEGIN: MediaWiki YUI TabView //
//------------------------------//

//addOnloadHook(initTabview);
function initTabview() {
	var start = document.getElementById( 'bodyContent' );
	if( !start ) start = document.getElementById( 'content' );
	if( !start ) start = document.getElementById( 'c-content' );
	if( !start ) start = document.getElementsByTagName( 'body' )[0];
	if( !start ) start = document;
	var container = 0;
	var containers = YAHOO.util.Dom.getElementsByClassName( 'tabview', 'div', start );
	for( var c = 0; c < containers.length; c++ ) {
		container++;
		if( !containers[c].id ) containers[c].id = 'YUI_TAB_ID_' + container;
		var tabView = new YAHOO.widget.TabView({ id: 'YUI_TAB_CONTAINER_' + container });
		YAHOO.util.Event.onContentReady(containers[c].id, function() {
			for( var t = 0; t < this.childNodes.length; t++ ) {
				if( this.childNodes[t].tagName && this.childNodes[t].tagName.toLowerCase() == 'div' ) {
                                    // create tabs from existing HTML markup
					tabView.addTab( new YAHOO.widget.Tab({
						label: this.childNodes[t].title,
						content: this.childNodes[t].innerHTML
					}));
				}                                    
			}
                                    // tabs generated entirely through JavaScript
                                        tabView.addTab( new YAHOO.widget.Tab({
                                                label: 'Community',
                                                dataSrc: '/index.php?title=User:Jeiara/Homepage/Tab2&action=render'
                                        }));
    
                                        tabView.addTab( new YAHOO.widget.Tab({
                                                label: 'What you can do',
                                                dataSrc: '/index.php?title=User:Jeiara/Homepage/Tab3&action=render'
                                        }));
			tabView.set('activeIndex', 0); // make first tab active
			tabView.appendTo(this.parentNode, this);
			this.parentNode.removeChild(this);
		});
	}
}

YAHOO.util.Event.onDOMReady(initTabview);

} // END if wgPageName == "Terminator_Wiki"

/** substUsername *******************************************************************
 *
 *  Description: Replaces {{username}} with the name of the user browsing the page.
 *               Requires copying Template:Username.
 */

function substUsername()
{
    var spans = YAHOO.util.Dom.getElementsByClassName('insertusername', 'span');

    for(var i = 0; i < spans.length; i++)
    {
        spans[i].innerHTML = wgUserName;
    }
}

addOnloadHook(substUsername);


/** renderGoogleCharts **************************************************************
 *
 *  Description: Replaces links to google charts with images of the chart.
 *               The title and alternate text of the image will be the text of the link.
 *               If the link is placed inside a element with class="nochart", 
 *               the link won't be touched.
 *  Written by:  [[w:User:Ciencia Al Poder]] "Jesús Martínez Novo"
 */

function renderGoogleCharts(){
 if (!document.getElementById('bodyContent')) return;
 var as = document.getElementById('bodyContent').getElementsByTagName('a');
 for (var i = as.length-1; i>=0; i--){
  if (as[i].href.indexOf('http://chart.apis.google.com/chart?') == 0){
   if ((' '+as[i].parentNode.className+' ').indexOf(' nochart ') == -1){
    var img = document.createElement('img');
    img.src = as[i].href;
    var content = as[i].textContent || as[i].innerHTML || 'This is a chart'
    img.alt = content;
    img.title = content;
    as[i].parentNode.replaceChild(img, as[i]);
   }
  }
 }
}

addOnloadHook(renderGoogleCharts);

/** Create pop-up menu of image tags *************************************************
 *  Description: Creates a pop-up menu using the Yahoo! User Interface library (YUI).
 *               Used in conjunction with insertImageTags() function below.
 *  Written by: [[User:Jeiara]] for http://terminator.wikia.com
 */

// This script is to be used only for a specific page: Special:MultipleUpload
if (wgPageName == "Special:MultipleUpload") {

// Variables for pop-up Menu
// Notes: Wikia has YUI Dom and Event already installed, no need to import.
//var domevents = 'http://yui.yahooapis.com/2.6.0/build/yahoo-dom-event/yahoo-dom-event.js';
var dragdrop = 'http://yui.yahooapis.com/2.6.0/build/dragdrop/dragdrop-min.js';
var container = 'http://yui.yahooapis.com/2.6.0/build/container/container-min.js';
var container_css = 'http://yui.yahooapis.com/2.6.0/build/container/assets/skins/sam/container.css';

importScriptURI(dragdrop);
importScriptURI(container);
importStylesheetURI(container_css);

var popMenu;
YAHOO.example.panels = function(){
	popMenu = new YAHOO.widget.Panel("popMenu", 
		{ 	
			width:"475px",
                        height:"350px",
			zindex:"999",
			close:true,  
			visible:false,  
			draggable:true,
			context:['wiki_logo','tl','br'],
			constraintoviewport:false	
		} 
	); 
	popMenu.setHeader('Add tags for Image #n');
	popMenu.setBody('Image tags go here.');
	popMenu.setFooter('Notes: <b>Click</b> all tags that apply. You can <b>drag</b> this box anywhere in the window. Close with <b><a href="#" onclick="popMenu.hide();return false;">[X]</a></b>.');
	popMenu.render(document.body);
};
	
YAHOO.util.Event.addListener(window,'load',YAHOO.example.panels); 

/** insertImageTags *****************************************************************
 *
 *  Description: Inserts a link with the text: "Add Image Tags", that activates a 
 *               pop-up menu listing image tags that can be added to the summary box.
 *  Written by:  [[User:Jeiara]] for http://terminator.wikia.com
 */

function insertImageTags() {
// Check for DOM support
if (!document.getElementById || !document.createElement) {return;} 

// Add Yahoo styles for pop-up menu
appendCSS(".yui-panel .bd {font-size:10px;}");
YAHOO.util.Dom.addClass('body', 'yui-skin-sam');  

   // Obtain reference to table containing form inputs
   var tableRef = document.getElementById('upload').getElementsByTagName('table')[0];
   var tRows = tableRef.rows;
   var num = -1;

      // Find only the Summary input boxes
      for (var i=0; i<tRows.length; i++) { 
           var inputElements = tRows[i].getElementsByTagName('input');
          for (var j=0; j<inputElements.length; j++) {
             // Extract only input name of Summary boxes
			if (inputElements[j].name.split("_")[0] == 'wpUploadDescription') {				
				num++; // Increase uploads description quantity                          
				var aRow = tableRef.rows[i];							
				// Insert "Add Image Tags" link after Summary box
				var insertLink = document.createElement('a');
				insertLink.id = 'insertLink_'+ num;
				insertLink.rel = inputElements[j].name; // Save input name 
				insertLink.title = num + 1; // Save image number
				insertLink.href = '#';
				insertLink.innerHTML = 'Add Image Tags';
				insertLink.onclick = function(){
					var t = createTags(this.rel);
					popMenu.setHeader('Add tags for Image #' + this.title);
					popMenu.setBody(t);
					popMenu.show();
					return false;
	            };
				aRow.insertCell(j+1).appendChild(insertLink);                               
            }
          }        
      }   

}

addOnloadHook(insertImageTags);

function appendTags(loc, tag) {
// I used YUI equivalent of getElementsByName (which is buggy in browsers)
// More information at http://www.quirksmode.org/dom/w3c_core.html#t114
var namedElement = YAHOO.util.Dom.getElementsBy(function(el) {
	return (el.getAttribute("name") == loc);
});	
	namedElement[0].value += tag;
}

function linkTags(loc, tag) {
	return '<a href="#" onclick="appendTags(\''+loc+'\',\''+tag+'\');return false;">'+tag+'</a><br />';
}

function createTags(loc) {
// Images tags to insert
var Franchise = new Array(
'&#123;&#123;images-animation&#125;&#125;',
'&#123;&#123;images-comics&#125;&#125;', 
'&#123;&#123;images-films&#125;&#125;', 
'&#123;&#123;images-novels&#125;&#125;', 
'&#123;&#123;images-television&#125;&#125;', 
'&#123;&#123;images-theme-park&#125;&#125;', 
'&#123;&#123;images-video-games&#125;&#125;'
);
var Subject = new Array(
'&#123;&#123;images-by-event&#125;&#125;', 
'&#123;&#123;images-by-location&#125;&#125;', 
'&#123;&#123;images-by-people&#125;&#125;', 
'&#123;&#123;images-by-technology&#125;&#125;' 
);
var Type = new Array(
'&#123;&#123;images-cover&#125;&#125;',  
'&#123;&#123;images-illustration&#125;&#125;',  
'&#123;&#123;images-logo&#125;&#125;',  
'&#123;&#123;images-photo&#125;&#125;',  
'&#123;&#123;images-poster&#125;&#125;',  
'&#123;&#123;images-screenshot&#125;&#125;',  
'&#123;&#123;images-user-created&#125;&#125;'  
);
var Machine = new Array(
'&#123;&#123;images-hunter-killer&#125;&#125;', 
'&#123;&#123;images-terminator&#125;&#125;' 
);
var Character = new Array(
'&#123;&#123;images-recurring-characters&#125;&#125;', 
'&#123;&#123;images-minor-characters&#125;&#125;', 
'&#123;&#123;images-unidentified-characters&#125;&#125;', 
'&#123;&#123;images-cameron-phillips&#125;&#125;', 
'&#123;&#123;images-charley-dixon&#125;&#125;', 
'&#123;&#123;images-derek-reese&#125;&#125;', 
'&#123;&#123;images-james-ellison&#125;&#125;', 
'&#123;&#123;images-john-connor&#125;&#125;', 
'&#123;&#123;images-kate-brewster&#125;&#125;', 
'&#123;&#123;images-kyle-reese&#125;&#125;', 
'&#123;&#123;images-miles-dyson&#125;&#125;', 
'&#123;&#123;images-peter-silberman&#125;&#125;', 
'&#123;&#123;images-sarah-connor&#125;&#125;' 
);
// Create image tag links
var f = new Array();var s = new Array();var t = new Array();var m = new Array();var c = new Array();	
for (var a = 0; a < Franchise.length; a++) {f[a] = linkTags(loc,Franchise[a]);}
for (var e = 0; e < Subject.length; e++) {s[e] = linkTags(loc,Subject[e]);}
for (var i = 0; i < Type.length; i++) {t[i] = linkTags(loc,Type[i]);}
for (var o = 0; o < Machine.length; o++) {m[o] = linkTags(loc,Machine[o]);}
for (var u = 0; u < Character.length; u++) {c[u] = linkTags(loc,Character[u]);}
// Create image tags table
tags = "<table id=\"imagetags\" cellpadding=\"0\" cellspacing=\"0\" style=\"width:475px; height:325px; text-align:left; margin:0; padding:0; \">";
tags += "<tbody>";
tags += "<tr style=\"vertical-align: top;\">";
tags += "<td>";
tags += "<b>Franchise:</b>  <br />";
for (a = 0; a < f.length; a++) { tags += f[a]; }
tags += "<br /> <b>Subject:</b> <br /> ";
for (e = 0; e < s.length; e++) { tags += s[e]; }
tags += "</td>";
tags += "<td>";
tags += "<b>Type:</b> <br /> ";
for (i = 0; i < t.length; i++) { tags += t[i]; }
tags += "<br /> <b>Machine:</b> <br />";
for (o = 0; o < m.length; o++) { tags += m[o]; }
tags += "</td>";
tags += "<td>";
tags += "<b>Character:</b> <br />";
for (u = 0; u < c.length; u++) { tags += c[u]; }
tags += "</td>";
tags += "</tr>";
tags += "</tbody>";
tags += "</table>";
	return tags;	
}

} // END if wgPageName == "Special:MultipleUpload"

/*
////////////////////////////////////////////////////////
// Adding text to the top of a specific edit page.
////////////////////////////////////////////////////////
*/

function myTitle(){
  var title1 = ""+wgPageName;
if (wgPageName == "Terminator_Wiki_talk:Terminator_Salvation_Giveaway" && wgAction == "edit"){

    var elem = document.createElement("div");
    elem.setAttribute("style", "color:red; font-style:italic;");
    elem.setAttribute("align", "center");
    elem.innerHTML = "enter * <nowiki>~~~~</nowiki> and you're done!";

    var titleArea = document.getElementById("top");
    if (titleArea != null){
      titleArea.appendChild(elem);
      titleArea.setAttribute("style", "text-decoration:none");
    }

  }

}

addOnloadHook(myTitle)

/*
////////////////////////////////////////////////////////
// END
////////////////////////////////////////////////////////
*/