/* Jedes JavaScript hier wird für alle Benutzer für jede Seite geladen. */
 
//=============================================================
//*** Configuration for "star" logo in front of interwiki links to Featured Articles
 
/** set to false in Special:Mypage/monobook.js to switch off this "feature" */
var linkFA_enabled  = true;
 
/** description that is displayed when cursor hovers above FA interwiki links */
var linkFA_description = "Dieser Artikel wurde als exzellent bewertet.";
 
// linkFA_bullet and linkFA_style werden nur für cologneblue, nostalgia and standard verwendet,
// für monobook und simple siehe [[MediaWiki:Common.css]]
 
/** image to use instead of the standard bullet (for cologneblue, nostalgia and standard */
var linkFA_bullet = "http://upload.wikimedia.org/wikipedia/commons/d/d0/Monobook-bullet-star-transparent.png";
 
/** style to use for the linkFA_bullet img */
var linkFA_style = "margin-right: 0.2em;";
 
/**
 * star logo for featured articles in other languages,
 * see Template:Link_FA and MediaWiki:Common.css
 */
addOnloadHook(function() {
    // early exit when disabled
    if (!linkFA_enabled) return;
 
    // skins need to be treated differently
    if (skin == "monobook" || skin == "simple") {
        newer();
    }
    else if (skin == "cologneblue" || skin == "nostalgia" || skin == "standard") {
        older();
    }
 
    /** skin == "monobook" || skin == "simple" */
    function newer() {
        // links are to replaced in p-lang only
        var pLang = document.getElementById("p-lang");
        if (!pLang) return;
        var lis = pLang.getElementsByTagName("li");
        for (var i = 0; i < lis.length; i++) {
            var li = lis[i];
            // only links with a corresponding Link_FA template are interesting
            if (!document.getElementById(li.className + "-fa"))   continue;
            // additional class so the template can be hidden with CSS
            li.className += " FA";
            // change title
            li.title = linkFA_description;
        }
    }
 
    /** skin == "cologneblue" || skin == "nostalgia" || skin == "standard" */
    function older() {
        // these root elements can contain FA-links
        var rootIds = new Array("topbar", "footer");
        for (var i=0; i<rootIds.length; i++) {
            var rootId  = rootIds[i];
            var root    = document.getElementById(rootId);
            if (!root)  continue;
 
            // if the root exists, try to decorate all the links within
            var links   = root.getElementsByTagName("a");
            for (var j=0; j<links.length; j++) {
                var link    = links[j];
                decorate(link);
            }
        }
    }
 
    /** id necessary, modify a link to show the FA-star (older) */
    function decorate(link) {
        // exit if not a FA-link
        var lang    = link.title.split(":")[0]; // not precise enough
        var fa      = document.getElementById("interwiki-" + lang + "-fa");
        if (!fa)    return;
        // possible problem owing the standard skin: "Link FA" template is transcluded with a non-interwiki parameter, for example "Special"
        // result: links to special pages in the topbar and/or footer might also be marked as a Featured Article
 
        // build an image-node for the FA-star
        var img = document.createElement("img");
        img.setAttribute("src",     linkFA_bullet);
        img.setAttribute("alt",     linkFA_description);
        img.setAttribute("style",   linkFA_style);
 
        // decorate the link with the image
        link.appendChild(img);
        link.appendChild(link.removeChild(link.firstChild));
        link.setAttribute("title", linkFA_description);
    }
});
 
//==============================================================================
//*** Fügt einen Link "Alle Sprachen" auf der Hauptseite unter die Sprachverweise hinzu
 
addOnloadHook(function() {
   // only on the main page
   if ( wgTitle != 'Hauptseite' || wgNamespaceNumber != 4 )    return;
 
   try {
       var node = document.getElementById( "p-lang" )
                           .getElementsByTagName('div')[0]
                           .getElementsByTagName('ul')[0];
 
       var aNode = document.createElement( 'a' );
       var liNode = document.createElement( 'li' );
 
       aNode.appendChild( document.createTextNode( 'Alle Sprachen' ) );
       aNode.setAttribute( 'href' , 'http://de.wikipedia.org/wiki/Wikipedia:Sprachen' );
       liNode.appendChild( aNode );
       liNode.className = 'interwiki-completelist';
       node.appendChild( liNode );
    } catch(e) {
        // lets just ignore what's happened
    }
});
 
//==============================================================================
//*** Verändert die Tabellensortierfunktion so, dass auch deutsche Tausenderpunkt und Dezimalkommata gehen
// Original aus sv.wikipedia.org
 
function ts_parseFloat(num) {
    if (!num) return 0;
    num = num.replace(/\./g, "");
    num = num.replace(/,/, ".");
    num = parseFloat(num);
    return (isNaN(num) ? 0 : num);
}
 
//================================================================================
//*** force the loading of another JavaScript file (Kopie von [[Commons:Common.js]])
// Local Maintainer: [[Commons:User:Dschwen]]
 
function includePage(name) {
    document.write('<script type="text/javascript" src="' + wgScript + '?title='
        + name + '&action=raw&ctype=text/javascript&dontcountme=s"><\/script>');    // smaxage=3600
}
 
//==============================================================================
//*** Fügt der Suche weitere Suchengines hinzu (kopiert aus eswp)
 
includePage("MediaWiki:SpezialSuche.js");
 
//================================================================================
//*** import Onlyifuploading-functions
// SEE ALSO [[MediaWiki:Onlyifuploading.js]]
 
if (wgCanonicalSpecialPageName == "Upload") {
    includePage("MediaWiki:Onlyifuploading.js");
}
 
//================================================================================
//*** Dynamic Navigation Bars
 
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
 
// adds show/hide-button to navigation bars
addOnloadHook(function() {
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
 
	function toggleNavigationBarFunction(indexNavigationBar) {
		return function() {
			toggleNavigationBar(indexNavigationBar);
			return false;
		};
	}
 
   var indexNavigationBar = 0;
   // iterate over all < div >-elements
   var divs = document.getElementsByTagName("div");
   for (var i=0;  i<divs.length; i++) {
       var NavFrame = divs[i];
       // if found a navigation bar
       if (NavFrame.className == "NavFrame") {
 
           indexNavigationBar++;
           var NavToggle = document.createElement("a");
           NavToggle.className = 'NavToggle';
           NavToggle.setAttribute('id', 'NavToggle' + indexNavigationBar);
           NavToggle.setAttribute('href', '#');
		   NavToggle.onclick = toggleNavigationBarFunction(indexNavigationBar);
 
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
});
 
//================================================================================
//*** import Onlyifediting-functions
// SEE ALSO [[MediaWiki:Onlyifediting.js]]
 
if (document.URL.indexOf("action=edit") > 0 || document.URL.indexOf("action=submit") > 0) {
    includePage("MediaWiki:Onlyifediting.js");
}
 
//================================================================================
 
 /**
 * Skrypt für Vorlage:Galerie
 */
addOnloadHook(function() {
  if (document.URL.match(/printable/g)) return;
 
  function toggleImageFunction(group,  remindex, shwindex) {
    return function() {
      document.getElementById("ImageGroupsGr"+group+"Im"+remindex).style.display="none";
      document.getElementById("ImageGroupsGr"+group+"Im"+shwindex).style.display="inline";
      return false;
    };
  }
 
  var divs=document.getElementsByTagName("div");
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
      var leftlink = document.createElement("a");
      var rightlink = document.createElement("a");
      if (j != 0) {
        leftlink.href = "#";
        leftlink.onclick = toggleImageFunction(i, j, j-1);
        leftlink.innerHTML="◀";
      }
      if (j != units.length - 1) {
        rightlink.onclick = toggleImageFunction(i, j, j+1);
        rightlink.innerHTML="▶";
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
      if (units.length>1) currentimage.insertBefore(imghead,currentimage.childNodes[0]);
      if (j != 0) currentimage.style.display="none";
    }
  }
});