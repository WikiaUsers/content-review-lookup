/* Jedes JavaScript hier wird für alle Benutzer für jede Seite geladen. */

//=============================================================
//*** Configuration for "star" logo in front of interwiki links to Featured Articles
//*** and green symbol in front of interwiki links to Good Articles

/** set to false in Special:Mypage/monobook.js to switch off this "feature" */
var linkFA_enabled  = true;

/** description that is displayed when cursor hovers above FA interwiki links */
var linkFA_description = "Dieser Artikel wurde als exzellent bewertet.";
var linkGA_description = "Dieser Artikel wurde als lesenswert bewertet.";

// linkFA_bullet/linkGA_bullet and linkFA_style/linkGA_Style werden nur für cologneblue, nostalgia and standard verwendet,
// für monobook und simple siehe [[MediaWiki:Common.css]]

/** image to use instead of the standard bullet (for cologneblue, nostalgia and standard */
var linkFA_bullet = "http://upload.wikimedia.org/wikipedia/commons/d/d0/Monobook-bullet-star-transparent.png";
var linkGA_bullet = "http://upload.wikimedia.org/wikipedia/commons/a/a1/Monobook-bullet-star-gray.png";

/** style to use for the linkFA_bullet/LinkGA_bullet img */
var linkFA_style = "margin-right: 0.2em;";
var linkGA_style = "margin-right: 0.2em;";

/**
 * star logo for featured articles in other languages,
 * see Template:Link_FA / Template:Link_GA and MediaWiki:Common.css
 */
addOnloadHook(function() {
    // early exit when disabled
    if (!linkFA_enabled) return;

    // skins need to be treated differently
    if (skin == "monobook" || skin == "simple" || skin == "modern") {
        newer();
    }
    else if (skin == "cologneblue" || skin == "nostalgia" || skin == "standard") {
        older();
    }

    /** skin == "monobook" || skin == "simple" || skin="modern" */
    function newer() {
        // links are to replaced in p-lang only
        var pLang = document.getElementById("p-lang");
        if (!pLang) return;
        var lis = pLang.getElementsByTagName("li");
        for (var i = 0; i < lis.length; i++) {
            var li = lis[i];
            // only links with a corresponding Link_FA template are interesting
            if (document.getElementById(li.className + "-fa")) {
              li.className += " FA";         // additional class so the template can be hidden with CSS
              li.title = linkFA_description; // change title
              continue;
            }
            if (document.getElementById(li.className + "-ga")) {
              li.className += " GA";         // additional class so the template can be hidden with CSS
              li.title = linkGA_description; // change title
              continue;
            }
        }
    }

    /** skin == "cologneblue" || skin == "nostalgia" || skin == "standard" */
    function older() {
        // these root elements can contain FA-/GA-links
        var rootIds = new Array("topbar", "footer");
        for (var i=0; i<rootIds.length; i++) {
            var root    = document.getElementById(rootIds[i]);
            if (!root)  continue;

            // if the root exists, try to decorate all the links within
            var links   = root.getElementsByTagName("a");
            for (var j=0; j<links.length; j++) {
                decorate(links[j], "-fa", linkFA_bullet, linkFA_description, linkFA_style);
                decorate(links[j], "-ga", linkGA_bullet, linkGA_description, linkGA_style);
            }
        }
    }
   
    /** id necessary, modify a link to show the FA- or GA-star (older) */
    function decorate(link, idSuffix, bullet, description) {
        var lang    = link.title.split(":")[0]; // not precise enough
        var fa      = document.getElementById("interwiki-" + lang + idSuffix);
        if (!fa)	return;
        
		// build an image-node for the FA-star
		var img = document.createElement("img");
		img.setAttribute("src",     bullet);
		img.setAttribute("alt",     description);
		img.setAttribute("style",   style);
		// decorate the link with the image
		link.appendChild(img);
		link.appendChild(link.removeChild(link.firstChild));
		link.setAttribute("title", description);
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

//================================================================================
//*** force the loading of another JavaScript file (Kopie von [[Commons:Common.js]])
// Local Maintainer: [[Commons:User:Dschwen]]

function includePage(name) {
    document.write('<script type="text/javascript" src="' + wgScript + '?title='
        + name + '&action=raw&ctype=text/javascript&dontcountme=s"><\/script>');    // smaxage=3600
}

//==============================================================================
//*** Fügt der Suche weitere Suchengines hinzu (kopiert aus eswp)
// 2009-07-02: Auskommentiert, da das neue Suchformular anders funktioniert. Raymond.
// 2009-08-03: code jetzt reparierter . Pmartin
// 2009-08-03: Nochmals auskommentiert, siehe Diskussionsseite
//if (wgCanonicalSpecialPageName == "Search") {
//    includePage("MediaWiki:SpezialSuche.js");
//}

//================================================================================
//*** import Onlyifuploading-functions
// SEE ALSO [[MediaWiki:Onlyifuploading.js]]

if (wgCanonicalSpecialPageName == "Upload") {
    includePage("MediaWiki:Onlyifuploading.js");
    includePage("MediaWiki:Onlyifediting.js");
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

/** Skript für Vorlage:Galerie */
addOnloadHook(function() {
  if (document.URL.match(/printable/g)) return;

  function toggleImageFunction(group,  remindex, shwindex) {
    return function() {
      document.getElementById("ImageGroupsGr" + group + "Im" + remindex).style["display"] = "none";
      document.getElementById("ImageGroupsGr" + group + "Im" + shwindex).style["display"] = "block";
      return false;
    };
  }

  var divs = document.getElementsByTagName("div");
  var i = 0, j = 0;
  var units, search;
  var currentimage;
  var UnitNode;
  for (i = 0; i < divs.length; i++) {
    if (divs[i].className !== "ImageGroup") { continue; }
    UnitNode = undefined;
    search = divs[i].getElementsByTagName("div");
    for (j = 0; j < search.length; j++) {
      if (search[j].className !== "ImageGroupUnits") { continue; }
      UnitNode=search[j];
      break;
    }
    if (UnitNode === undefined) { continue; }
    units = [];
    for (j = 0 ; j < UnitNode.childNodes.length ; j++ ) {
      var temp = UnitNode.childNodes[j];
      if (temp.className === "center") { units.push(temp); }
    }
    var rightlink = undefined;
    var commentText = undefined;
    for (j = 0; j < units.length; j++) {
      currentimage = units[j];
      currentimage.id = "ImageGroupsGr" + i + "Im" + j;
      var leftlink = document.createElement("a");
      if (commentText !== undefined) {
        leftlink.setAttribute("title", commentText);
      }
      var comment;
      if (typeof(currentimage.getAttribute("title")) !== "string") {
        commentText = (j+1) + "/" + units.length;
        comment = document.createElement("tt").appendChild(document.createTextNode("("+ commentText + ")"));
      }
      else {
        commentText = currentimage.getAttribute("title");
        comment = document.createElement("span").appendChild(document.createTextNode(commentText));
        currentimage.removeAttribute("title");
      }
      if(rightlink !== undefined) {
        rightlink.setAttribute("title", commentText);
      }
      var imghead = document.createElement("div");
      rightlink = document.createElement("a");
      if (j != 0) {
        leftlink.href = "#";
        leftlink.onclick = toggleImageFunction(i, j, j-1);
        leftlink.appendChild(document.createTextNode("◀"));
      }
      if (j != units.length - 1) {
        rightlink.href = "#";
        rightlink.onclick = toggleImageFunction(i, j, j+1);
        rightlink.appendChild(document.createTextNode("▶"));
      }
      imghead.style["fontSize"] = "110%";
      imghead.style["fontweight"] = "bold";
      imghead.appendChild(leftlink);
      imghead.appendChild(document.createTextNode("\xA0"));
      imghead.appendChild(comment);
      imghead.appendChild(document.createTextNode("\xA0"));
      imghead.appendChild(rightlink);
      if (units.length > 1) {
        currentimage.insertBefore(imghead,currentimage.childNodes[0]);
      }
      if (j != 0) {
        currentimage.style["display"] = "none";
      }
    }
  }
});

/* admin ui changes */

if( window.wgUserGroups ) {
  for(var i = 0; i < wgUserGroups.length; ++i) {
    if(wgUserGroups[i] === "sysop") {
  /*  importScript("MediaWiki:Group-sysop.js");  kann bei Bedarf ent-auskommentiert werden  */
      importStylesheet("MediaWiki:Group-sysop.css");
      break;
    }
  }
}

//==============================================================================
//*** Fügt eine Betreffzeile auf leeren Diskussionsseiten ein

addOnloadHook(function() {
        if(wgNamespaceNumber != 0 && wgNamespaceNumber != 1) return;
	var tab = document.getElementById( 'ca-talk' );
	if( !tab || tab.className != 'new' ) return;
	var link = tab.getElementsByTagName( 'a' )[0];
	if( !link ) return;
	link.href += '&section=new';
});


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

/** Fügt bei SVG-Grafiken Links zu gerenderten PNGs in verschiedenen Breiten hinzu */
addOnloadHook(function() {
	if (wgAction !== "view" || wgNamespaceNumber !== 6)	return;
	var extension	= wgTitle.substring(wgTitle.lastIndexOf(".")).toLowerCase();
	if (extension !== ".svg")	return;
	var fileDiv	= document.getElementById("file");
	if (!fileDiv)	return;
	var url	= document.getElementById("shared-image-desc") 
			? wgServer.match(/^https/)
				? "https://secure.wikimedia.org/wikipedia/commons/w/thumb.php?f="
				: "http://commons.wikimedia.org/w/thumb.php?f="
			: wgServer + wgScriptPath + "/thumb.php?f=";
	var div = document.createElement("div");
	div.id = "file-svg-info";
	div.appendChild(document.createTextNode("Aus SVG automatisch erzeugte PNG-Grafiken in verschiedenen Auflösungen:"));
	div.appendChild(document.createElement("br"));
	function addLink(size, textAfter) {
		var	a	= document.createElement("a");
		a.setAttribute("href", url + encodeURIComponent(wgTitle) + "&width=" + size + "px");
		a.appendChild(document.createTextNode(size + "px"));
		div.appendChild(a);
		div.appendChild(document.createTextNode(textAfter));
	}
	addLink(200, ", ");
	addLink(500, ", ");
	addLink(1000, ", ");
	addLink(2000, ".");
	fileDiv.parentNode.insertBefore(div,  
			fileDiv.nextSibling.nextSibling);
});

/** Mobile Redirect Helper ************************************************
 *
 *  Redirects to the mobile-optimized gateway at en.m.wikimedia.org
 *  for viewers on iPhone, iPod Touch, Palm Pre, and Android devices.
 *
 *  You can turn off the redirect by setting the cookie "stopMobileRedirect=true"
 *
 *  This code cannot be imported, because the JS only loads after all other files
 *  and this was causing major issues for users with mobile devices. Must be loaded
 *  *before* the images and etc of the page on all mobile devices.
 *
 *  Maintainer: [[User:Brion VIBBER]], [[User:hcatlin]]
 */
if (/(Android|iPhone|iPod|webOS)/.test(navigator.userAgent)) {

  var wgMainPageName = "Vereins Wiki";
 
  var stopMobileRedirectCookieExists = function() {
    return (document.cookie.indexOf("stopMobileRedirect=true") >= 0);
  }
 
  var mobileSiteLink = function() {
    if (wgCanonicalNamespace == 'Special' && wgCanonicalSpecialPageName == 'Search') {
        var pageLink = '?search=' + encodeURIComponent(document.getElementById('searchText').value);
    } else if (wgPageName == wgMainPageName) {
        var pageLink = '::Home'; // Special case
    } else {
        var pageLink = encodeURIComponent(wgPageName).replace('%2F','/').replace('%3A',':');
    }
    return 'http://' + wgContentLanguage + '.m.wikipedia.org/wiki/' + pageLink + "?wasRedirected=true";
  }
 
  if (!stopMobileRedirectCookieExists()) {
    document.location = mobileSiteLink();
  }
}