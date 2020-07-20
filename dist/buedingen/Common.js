/* Jedes JavaScript hier wird für alle Benutzer für jede Seite geladen. */

 // ============================================================
 // BEGIN Dynamic Navigation Bars
 // NEEDS Enable multiple onload functions 
 
 // set up the words in your language
 var NavigationBarHide = 'Einklappen';
 var NavigationBarShow = 'Ausklappen';
 
 // set up max count of Navigation Bars on page,
 // if there are more, all will be hidden
 // NavigationBarShowDefault = 0; // all bars will be hidden
 // NavigationBarShowDefault = 1; // on pages with more than 1 bar all bars will be hidden
 if (typeof NavigationBarShowDefault == 'undefined' ) {
     var NavigationBarShowDefault = 1;
 }
 
 // shows and hides content and picture (if available) of navigation bars
 // Parameters:
 //     indexNavigationBar: the index of navigation bar to be toggled
 function toggleNavigationBar(indexNavigationBar)
 {
    var NavToggle = document.getElementById("NavToggle" + indexNavigationBar);
    var NavFrame = document.getElementById("NavFrame" + indexNavigationBar);
 
    if (!NavFrame || !NavToggle) {
        return false;
    }
 
    // if shown now
    if (NavToggle.firstChild.data == NavigationBarHide) {
        for (
                var NavChild = NavFrame.firstChild;
                NavChild != null;
                NavChild = NavChild.nextSibling
            ) {
            if (NavChild.className == 'NavPic') {
                NavChild.style.display = 'none';
            }
            if (NavChild.className == 'NavContent') {
                NavChild.style.display = 'none';
            }
            if (NavChild.className == 'NavToggle') {
                NavChild.firstChild.data = NavigationBarShow;
            }
        }
 
    // if hidden now
    } else if (NavToggle.firstChild.data == NavigationBarShow) {
        for (
                var NavChild = NavFrame.firstChild;
                NavChild != null;
                NavChild = NavChild.nextSibling
            ) {
            if (NavChild.className == 'NavPic') {
                NavChild.style.display = 'block';
            }
            if (NavChild.className == 'NavContent') {
                NavChild.style.display = 'block';
            }
            if (NavChild.className == 'NavToggle') {
                NavChild.firstChild.data = NavigationBarHide;
            }
        }
    }
 }
 
 // adds show/hide-button to navigation bars
 function createNavigationBarToggleButton()
 {
    var indexNavigationBar = 0;
    // iterate over all < div >-elements
    for(
            var i=0; 
            NavFrame = document.getElementsByTagName("div")[i]; 
            i++
        ) {
        // if found a navigation bar
        if (NavFrame.className == "NavFrame") {
 
            indexNavigationBar++;
            var NavToggle = document.createElement("a");
            NavToggle.className = 'NavToggle';
            NavToggle.setAttribute('id', 'NavToggle' + indexNavigationBar);
            NavToggle.setAttribute('href', 'javascript:toggleNavigationBar(' + indexNavigationBar + ');');
 
            var NavToggleText = document.createTextNode(NavigationBarHide);
            NavToggle.appendChild(NavToggleText);
 
            // add NavToggle-Button as first div-element 
            // in < div class="NavFrame" >
            NavFrame.insertBefore(
                NavToggle,
                NavFrame.firstChild
            );
            NavFrame.setAttribute('id', 'NavFrame' + indexNavigationBar);
        }
    }
    // if more Navigation Bars found than Default: hide all
    if (NavigationBarShowDefault < indexNavigationBar) {
        for(
                var i=1; 
                i<=indexNavigationBar; 
                i++
        ) {
            toggleNavigationBar(i);
        }
    }
 
 }
 
 addOnloadHook(createNavigationBarToggleButton);
 
 // END Dynamic Navigation Bars
 // ============================================================


 // ============================================================
 // BEGIN import Onlyifediting-functions
 // SEE ALSO [[MediaWiki:Onlyifediting.js]]
 
 if (document.URL.indexOf("action=edit") > 0 || document.URL.indexOf("action=submit") > 0) {
     document.write('<script type="text/javascript" src="/index.php?title=MediaWiki:Onlyifediting.js&action=raw&ctype=text/javascript&dontcountme=s"></script>');
 }
 
 // END import Onlyifediting-functions
 // ============================================================

 // ============================================================
 // BEGIN import Onlyifuploading-functions
 // SEE ALSO [[MediaWiki:Onlyifuploading.js]]
 
 if ( wgCanonicalSpecialPageName == "Upload" ) {
      document.write('<script type="text/javascript" src="/index.php?title=MediaWiki:Onlyifuploading.js&action=raw&ctype=text/javascript&dontcountme=s"></script>');
 }
 
 // END import Onlyifuploading-functions
 // ============================================================

/*** CODE FÜR VORLAGE:Scroll Gallery ***/
function toggleImage(group, remindex, shwindex) {
  document.getElementById("ImageGroupsGr"+group+"Im"+remindex).style.display="none";
  document.getElementById("ImageGroupsGr"+group+"Im"+shwindex).style.display="inline";
}
function ImageGroup(){
        if (document.URL.match(/printable/g)) return;
        var bc=document.getElementById("bodyContent");
        var divs=bc.getElementsByTagName("div");
        var i = 0, j = 0;
        var units, search;
        var currentimage;
        var UnitNode;
        for (i = 0; i < divs.length ; i++) {
                if (divs[i].className != "ImageGroup") continue;
                UnitNode=undefined;
                search=divs[i].getElementsByTagName("div");
                for (j = 0; j < search.length ; j++) {
                        if (search[j].className != "ImageGroupUnits") continue;
                        UnitNode=search[j];
                        break;
                }
                if (UnitNode==undefined) continue;
                units=Array();
                for (j = 0 ; j < UnitNode.childNodes.length ; j++ ) {
                        var temp = UnitNode.childNodes[j];
                        if (temp.className=="center") units.push(temp);
                }
                for (j = 0 ; j < units.length ; j++) {
                        currentimage=units[j];
                        currentimage.id="ImageGroupsGr"+i+"Im"+j;
                        var imghead = document.createElement("div");
                        var leftlink;
                        var rightlink;
                        if (j != 0) {
                                leftlink = document.createElement("a");
                                leftlink.href = "javascript:toggleImage("+i+","+j+","+(j-1)+");";
                                leftlink.innerHTML="◀";
                        } else {
                                leftlink = document.createElement("span");
                                leftlink.innerHTML="&nbsp;";
                        }
                        if (j != units.length - 1) {
                                rightlink = document.createElement("a");
                                rightlink.href = "javascript:toggleImage("+i+","+j+","+(j+1)+");";
                                rightlink.innerHTML="▶";
                        } else {
                                rightlink = document.createElement("span");
                                rightlink.innerHTML="&nbsp;";
                        }
                        var comment = document.createElement("tt");
                        comment.innerHTML = "("+ (j+1) + "/" + units.length + ")";
                        with(imghead) {
                                style.fontSize="110%";
                                style.fontweight="bold";
                                appendChild(leftlink);
                                appendChild(comment);
                                appendChild(rightlink);
                        }
                        currentimage.insertBefore(imghead,currentimage.childNodes[0]);
                        if (j != 0) currentimage.style.display="none";
                }
        }
}
addOnloadHook(ImageGroup);
/*** Ende CODE FÜR VORLAGE:Scroll Gallery ***/


// Lokaler Bilddiskussionsseitenlink eines Commonsbildes verweist nach Commons

if (wgNamespaceNumber === 6) addOnloadHook( function() {
	if (window.keepLocalFileTabs ) return;
	if (document.getElementById( 'ca-history')) return; //Lokale Dateibeschreibung vorhanden?
	if (!getElementsByClassName(document, 'div', 'sharedUploadNotice')[0]) return; //Nur bei Commons-Bildern
 
	var path = wgServer.match(/^https/)
		? 'https://secure.wikimedia.org/wikipedia/commons/wiki/'
		: 'http://commons.wikimedia.org/wiki/';
 
	// Ändere Link auf Diskussionsseite
	// vector uses ca-image_talk
	var talk = document.getElementById('ca-talk') || document.getElementById('ca-image_talk');
	if (talk && talk.className.match(/(^| )new( |$)/)) {
		var link		= talk.getElementsByTagName('a')[0];
		link.href       = path + 'File_talk:' + encodeURIComponent(wgTitle) + '?uselang=de';
		link.className  += ' commonstab';
	}
 
	// Ändere Bearbeiten-Link
	var edit	= document.getElementById('ca-edit') || document.getElementById('ca-viewsource');
	if (edit) { 
		var link		= edit.getElementsByTagName('a')[0];
		link.href       = path + 'File:' + encodeURIComponent(wgTitle) + '?uselang=de&action=edit';
		link.className  += ' commonstab';
		link.firstChild.nodeValue = 'Bearbeiten';
	}
});