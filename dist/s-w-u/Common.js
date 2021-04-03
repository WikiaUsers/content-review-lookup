/*
<pre>
*/
/* tooltips and access keys */
ta = new Object();
ta['pt-userpage'] = new Array('.','My user page'); 
ta['pt-anonuserpage'] = new Array('.','The user page for the ip you\'re editing as'); 
ta['pt-mytalk'] = new Array('n','My talk page'); 
ta['pt-anontalk'] = new Array('n','Discussion about edits from this ip address'); 
ta['pt-preferences'] = new Array('-','My preferences'); 
ta['pt-watchlist'] = new Array('l','The list of pages you\'re monitoring for changes.'); 
ta['pt-mycontris'] = new Array('y','List of my contributions'); 
ta['pt-login'] = new Array('o','Logging in is not required, but brings many benefits.'); 
ta['pt-anonlogin'] = new Array('o','Logging in is not required, but brings many benefits.'); 
ta['pt-logout'] = new Array('o','Log out'); 
ta['ca-talk'] = new Array('t','Discussion about the content page'); 
ta['ca-edit'] = new Array('e','You can edit this page. Please use the preview button before saving.'); 
ta['ca-addsection'] = new Array('+','Start a new discussion'); 
ta['ca-viewsource'] = new Array('e','This page is protected. You can view its source.'); 
ta['ca-history'] = new Array('h','Past versions of this page.'); 
ta['ca-protect'] = new Array('=','Protect this page'); 
ta['ca-unprotect'] = new Array('=','Unprotect this page');
ta['ca-delete'] = new Array('d','Delete this page'); 
ta['ca-undelete'] = new Array('d','Restore the edits done to this page before it was deleted'); 
ta['ca-move'] = new Array('m','Move this page'); 
ta['ca-nomove'] = new Array('','You don\'t have the permissions to move this page'); 
ta['ca-watch'] = new Array('w','Add this page to your watchlist'); 
ta['ca-unwatch'] = new Array('w','Remove this page from your watchlist'); 
ta['search'] = new Array('f','Search Wikipedia'); 
ta['p-logo'] = new Array('','Main Page'); 
ta['n-mainpage'] = new Array('z','Visit the Main Page'); 
ta['n-portal'] = new Array('','About the project, what you can do, where to find things');
ta['n-Featured-articles'] = new Array('','Featured articles - the best of Wikipedia'); 
ta['n-currentevents'] = new Array('','Find background information on current events'); 
ta['n-recentchanges'] = new Array('r','List of recent changes in Wikipedia'); 
ta['n-randompage'] = new Array('x','Load a random page'); 
ta['n-help'] = new Array('','The place to find out about Wikipedia'); 
ta['n-contact'] = new Array('','How to contact Wikipedia');
ta['n-sitesupport'] = new Array('','Support us'); 
ta['t-whatlinkshere'] = new Array('j','List of all wiki pages that link here'); 
ta['t-recentchangeslinked'] = new Array('k','Recent changes in pages linked from this page'); 
ta['feed-rss'] = new Array('','RSS feed for this page'); 
ta['feed-atom'] = new Array('','Atom feed for this page'); 
ta['t-contributions'] = new Array('','View the list of contributions of this user'); 
ta['t-emailuser'] = new Array('','Send a mail to this user'); 
ta['t-upload'] = new Array('u','Upload images or media files'); 
ta['t-specialpages'] = new Array('q','List of all special pages');
ta['t-print'] = new Array('','Printable version of this page');
ta['t-permalink'] = new Array('','Permanent link to this version of the page');
ta['t-cite'] = new Array('','Cite this Wikipedia article');
ta['ca-nstab-main'] = new Array('c','View the content page'); 
ta['ca-nstab-user'] = new Array('c','View the user page'); 
ta['ca-nstab-media'] = new Array('c','View the media page'); 
ta['ca-article'] = new Array('','This is a special page; you can\'t edit the page itself.'); 
ta['ca-nstab-project'] = new Array('c','View the project page'); 
ta['ca-nstab-image'] = new Array('c','View the image page'); 
ta['ca-nstab-mediawiki'] = new Array('c','View the system message'); 
ta['ca-nstab-template'] = new Array('c','View the template'); 
ta['ca-nstab-help'] = new Array('c','View the help page'); 
ta['ca-nstab-category'] = new Array('c','View the category page');

if (window.showModalDialog && document.compatMode && document.compatMode == "CSS1Compat")
{
  var oldWidth;
  var docEl = document.documentElement;

  function fixIEScroll()
  {
    if (!oldWidth || docEl.clientWidth > oldWidth)
      doFixIEScroll();
    else
      setTimeout(doFixIEScroll, 1);
  
    oldWidth = docEl.clientWidth;
  }

  function doFixIEScroll() {
    docEl.style.overflowX = (docEl.scrollWidth - docEl.clientWidth < 4) ? "hidden" : "";
  }

  document.attachEvent("onreadystatechange", fixIEScroll);
  attachEvent("onresize", fixIEScroll);
}

function addLoadEvent(func) 
{
  if (window.addEventListener) 
    window.addEventListener("load", func, false);
  else if (window.attachEvent) 
    window.attachEvent("onload", func);
}

function LinkFA() 
{
   // iterate over all <span>-elements
   for(var i=0; a = document.getElementsByTagName("span")[i]; i++) {
      // if found a FA span
      if(a.className == "FA") {
         // iterate over all <li>-elements
         for(var j=0; b = document.getElementsByTagName("li")[j]; j++) {
            // if found a FA link
            if(b.className == "interwiki-" + a.id) {
               b.className += " FA";
               b.title = "This article has gained featured status";
            }
         }
      }
   }
}

addLoadEvent(LinkFA);

 // ============================================================
 // BEGIN Dynamic Navigation Bars (experimantal)
 // Documentation at [[Wikipedia:NavFrame]]
 
 // set up the words in your language
 var NavigationBarHide = '[hide]';
 var NavigationBarShow = '[show]';
 
 // set up max count of Navigation Bars on page,
 // if there are more, all will be hidden
 // NavigationBarShowDefault = 0; // all bars will be hidden
 // NavigationBarShowDefault = 1; // on pages with more than 1 bar all bars will be hidden
 var NavigationBarShowDefault = 1;
 
 
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
        }
    NavToggle.firstChild.data = NavigationBarShow;
 
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
        }
    NavToggle.firstChild.data = NavigationBarHide;
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
            // Find the NavHead and attach the toggle link (Must be this complicated because Moz's firstChild handling is borked)
            for(
              var j=0; 
              j < NavFrame.childNodes.length; 
              j++
            ) {
              if (NavFrame.childNodes[j].className == "NavHead") {
                NavFrame.childNodes[j].appendChild(NavToggle);
              }
            }
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
 
 addLoadEvent(createNavigationBarToggleButton);
 
 // END Dynamic Navigation Bars
 // ============================================================

 // == Collapsible tables ======================================
 var autoCollapse = 2;
 var collapseCaption = "hide";
 var expandCaption = "show";
 
 function hasClass( element, className ) {
   var Classes = element.className.split( " " );
   for ( var i = 0; i < Classes.length; i++ ) {
     if ( Classes[i] == className ) {
       return ( true );
     }
   }
   return ( false );
 }
 
 function collapseTable( tableIndex )
 {
     var Button = document.getElementById( "collapseButton" + tableIndex );
     var Table = document.getElementById( "collapsibleTable" + tableIndex );
 
     if ( !Table || !Button ) {
         return false;
     }
 
     var Rows = Table.getElementsByTagName( "tr" ); 
 
     if ( Button.firstChild.data == collapseCaption ) {
         for ( var i = 1; i < Rows.length; i++ ) {
             Rows[i].style.display = "none";
         }
         Button.firstChild.data = expandCaption;
     } else {
         for ( var i = 1; i < Rows.length; i++ ) {
             Rows[i].style.display = Rows[0].style.display;
         }
         Button.firstChild.data = collapseCaption;
     }
 }
 
 function createCollapseButtons()
 {
     var tableIndex = 0;
     var NavigationBoxes = new Object();
     var Tables = document.getElementsByTagName("table");
 
     for ( var i = 0; i < Tables.length; i++ ) {
         if ( hasClass( Tables[i], "collapsible" ) ) {
             NavigationBoxes[ tableIndex ] = Tables[i];
             Tables[i].setAttribute( "id", "collapsibleTable" + tableIndex);
 
             var Button     = document.createElement( "span" );
             var ButtonLink = document.createElement( "a" );
             var ButtonText = document.createTextNode( collapseCaption );
 
             Button.style.styleFloat = "right";
             Button.style.cssFloat = "right";
 
             ButtonLink.setAttribute( "id", "collapseButton" + tableIndex );
             ButtonLink.setAttribute( "href", "javascript:collapseTable(" + tableIndex + ");" );
             ButtonLink.appendChild( ButtonText );
 
             Button.appendChild( document.createTextNode( "[" ) );
             Button.appendChild( ButtonLink );
             Button.appendChild( document.createTextNode( "]" ) );
 
             var Header = Tables[i].getElementsByTagName( "tr" )[0].getElementsByTagName( "th" )[0];
             Header.insertBefore( Button, Header.childNodes[0] );
 
             tableIndex++;
         }
     }
 
     for ( var i = 0;  i < tableIndex; i++ ) {
         if ( hasClass( NavigationBoxes[i], "collapsed" ) || ( tableIndex >= autoCollapse && hasClass( NavigationBoxes[i], "autocollapse" ) ) ) {
             collapseTable(i);
         }
     }
 }
 
 addLoadEvent(createCollapseButtons);
 
 // == END Collapsible tables =============================


var mpTitle = "Main Page";
var isMainPage = (/(title=|\/wiki\/)([Tt]alk:|)[Mm]ain[ _][Pp]age/.test(document.location));
var isMainPageFront = (document.title.substr(0, document.title.lastIndexOf(" - ")) == mpTitle);
var isDiff = (document.location.search && (document.location.search.indexOf("diff=") != -1 || document.location.search.indexOf("oldid=") != -1));

if (isMainPage) 
{

function appendOtherLanguageLink() {
   var mpInterwiki = document.getElementById("p-lang");

   if(mpInterwiki) {
      var str = mpInterwiki.innerHTML;
      if(str) {
         var pos = Math.max(str.lastIndexOf('LI'),str.lastIndexOf('li'));
         str = (str.substring(0,pos+3) + "<li><a href='http://meta.wikimedia.org/wiki/List_of_Wikipedias'>Complete list</a></li>" + str.substring(pos+3));
         mpInterwiki.innerHTML = str;
      }
   }
}

if (isMainPageFront && !isDiff)
{
   document.write('<style type="text/css">/*<![CDATA[*/ #lastmod, #siteSub, #contentSub, h1.firstHeading { display: none !important; } /*]]>*/</style>');
   addLoadEvent(appendOtherLanguageLink);
}

var mpSmallEnabled;
var mpMinWidth = 700;

function mainPageTransform()
{
       if (isMainPage && document.getElementById('ca-nstab-main')) 
         {document.getElementById('ca-nstab-main').firstChild.innerHTML = 'Main Page';}
       if (((isMainPageFront && !isDiff) || /[\/=:]Main_Page/.test(document.location)) && document.getElementById('ca-nstab-main'))
	var mpContentEl = document.getElementById("bodyContent");
	var mpBrowseEl = document.getElementById("EnWpMpBrowse");
	var mpContainEl = document.getElementById("EnWpMpBrowseContainer");
	var mpMarginEl = document.getElementById("EnWpMpMargin");
	var mpEl = document.getElementById("EnWpMainPage");

	if (!mpContentEl || !mpBrowseEl || !mpContainEl || !mpMarginEl || !mpEl)
		return;

	if (!mpSmallEnabled && mpContentEl.offsetWidth < mpMinWidth)
	{
		mpContainEl.insertBefore(mpBrowseEl, mpContainEl.firstChild);
		mpBrowseEl.className = "EnWpMpBrowseBottom";
		mpMarginEl.style.marginRight = 0;
		mpSmallEnabled = true;
	}
	else if (mpSmallEnabled && mpContentEl.offsetWidth > mpMinWidth)
	{
		mpEl.insertBefore(mpBrowseEl, mpEl.firstChild);
		mpBrowseEl.className = "EnWpMpBrowseRight";
		mpMarginEl.style.marginRight = "13.8em";
		mpSmallEnabled = false;
	}
}

var onloadFuncts = [ mainPageTransform ];

if (window.addEventListener) 
  window.addEventListener("resize", mainPageTransform, false);
else if (window.attachEvent) 
  window.attachEvent("onresize", mainPageTransform);

}

/* add a redirect button to the edit page toolbar */
if (mwCustomEditButtons) {
  mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "http://upload.wikimedia.org/wikipedia/en/c/c8/Button_redirect.png",
    "speedTip": "Redirect",
    "tagOpen": "#REDIRECT [[",
    "tagClose": "]]",
    "sampleText": "Insert text"};
};

//============================================================
// Extra toolbar options
//============================================================
//********WRITTEN BY User:MarkS********
//This is a modified copy of a script by User:MarkS for extra features added by User:Voice of All.

// This is based on the original code on Wikipedia:Tools/Editing tools

function InsertButtonsToToolBar()
{
//Strike-Out Button
mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "http://upload.wikimedia.org/wikipedia/en/c/c9/Button_strike.png",
    "speedTip": "Strike",
    "tagOpen": "<s>",
    "tagClose": "</s>",
    "sampleText": "Strike-through text"}
//Line break button
mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "http://upload.wikimedia.org/wikipedia/en/1/13/Button_enter.png",
    "speedTip": "Line break",
    "tagOpen": "<br />",
    "tagClose": "",
    "sampleText": ""}
//Superscript
mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "http://upload.wikimedia.org/wikipedia/en/8/80/Button_upper_letter.png",
    "speedTip": "Superscript",
    "tagOpen": "<sup>",
    "tagClose": "</sup>",
    "sampleText": "Superscript text"}
//Subscript
mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "http://upload.wikimedia.org/wikipedia/en/7/70/Button_lower_letter.png",
    "speedTip": "Subscript",
    "tagOpen": "<sub>",
    "tagClose": "</sub>",
    "sampleText": "Subscript text"}
//Small Text
mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "http://upload.wikimedia.org/wikipedia/en/5/58/Button_small.png",
    "speedTip": "Small",
    "tagOpen": "<small>",
    "tagClose": "</small>",
    "sampleText": "Small Text"}
//Comment
mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "http://upload.wikimedia.org/wikipedia/en/3/34/Button_hide_comment.png",
    "speedTip": "Insert hidden Comment",
    "tagOpen": "<!-- ",
    "tagClose": " -->",
    "sampleText": "Comment"}
//Gallery
mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "http://upload.wikimedia.org/wikipedia/en/1/12/Button_gallery.png",
    "speedTip": "Insert a picture gallery",
    "tagOpen": "\n<gallery>\n",
    "tagClose": "\n</gallery>",
    "sampleText": "Image:Example.jpg|Caption1\nImage:Example.jpg|Caption2"}
//Block Quote
mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "http://upload.wikimedia.org/wikipedia/en/f/fd/Button_blockquote.png",
    "speedTip": "Insert block of quoted text",
    "tagOpen": "<blockquote>\n",
    "tagClose": "\n</blockquote>",
    "sampleText": "Block quote"}
// Table
mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "http://upload.wikimedia.org/wikipedia/commons/0/04/Button_array.png",
    "speedTip": "Insert a table",
    "tagOpen": '{| class="wikitable"\n|-\n',
    "tagClose": "\n|}",
    "sampleText": "! header 1\n! header 2\n! header 3\n|-\n| row 1, cell 1\n| row 1, cell 2\n| row 1, cell 3\n|-\n| row 2, cell 1\n| row 2, cell 2\n| row 2, cell 3"}
}

addOnloadHook( InsertButtonsToToolBar );

 // ============================================================
 // BEGIN pageview counter
 // 	Please talk to de:User:LeonWeber before changing anything or 
 // 	if there are any issues with that.
 
 // this should be adjusted to a good value.
 // BE CAREFULL, you will break zedler if it's too low!
 // And then DaB. will kill Leon :-(
 var disable_counter = 0;
 var counter_factor = 6000;
 
 function pgcounter_setup()
 {
 	if(disable_counter == 0)
 	{
 		var url = window.location.href;
 		if(Math.floor(Math.random()*counter_factor)==42)  // the probability thing
  		{
  			if(wgIsArticle==true || wgArticleId==0) // do not count history pages etc.
 			{
 				var pgcountNs = wgCanonicalNamespace;
 				if(wgCanonicalNamespace=="")
 				{
 					pgcountNs = "0";
 				}
  				var cnt_url = "http://pgcount.wikimedia.de/index.png?ns=" + pgcountNs + "&title=" + encodeURI(wgTitle) + "&factor=" + counter_factor +"&wiki=enwiki";
 				var img = new Image(); 
 				img.src = cnt_url;
 			}
 		}
 	}
 }
 // Do not use aOnloadFunctions[aOnloadFunctions.length] = pgcounter_setup;, some browsers don't like that.
 pgcounter_setup();
 
 // END pageview counter 
 // ============================================================



//============================================================
// "Technical restrictions" title fix
//============================================================
//******** written by User:Interiot ********
// For pages that have something like Template:Lowercase, replace the title, but only if it is cut-and-pasteable as a valid wikilink.
//	(for instance [[iPod]]'s title is updated.  But [[C#]] is not an equivalent wikilink, so [[C Sharp]] doesn't have its main title changed)
//
// The function looks for a banner like this:
// <div id="RealTitleBanner">    <!-- div that gets hidden -->
//   <span id="RealTitle">title</span>
// </div>
// An element with id=DisableRealTitle disables the function.
addOnloadHook(function() {
	try {
		var realTitleBanner = document.getElementById("RealTitleBanner");
		if (realTitleBanner && !document.getElementById("DisableRealTitle")) {
			var realTitle = document.getElementById("RealTitle");
			if (realTitle) {
				var isPasteable = 0;
				var containsHTML = /</.test(realTitle.innerHTML);

				realTitle = pickUpText(realTitle);		// TODO: replace this with something like "realText"
				
				// calculate whether the title is pasteable
				var verifyTitle = realTitle.replace(/^ +/, "");		// trim left spaces
				verifyTitle = verifyTitle.charAt(0).toUpperCase() + verifyTitle.substring(1, verifyTitle.length);	// uppercase first character

				// if the namespace prefix is there, remove it on our verification copy.  If it isn't there, add it to the original realValue copy.
				if (wgNamespaceNumber != 0) {
					if (wgCanonicalNamespace == verifyTitle.substr(0, wgCanonicalNamespace.length).replace(/ /g, "_") && verifyTitle.charAt(wgCanonicalNamespace.length) == ":") {
						verifyTitle = verifyTitle.substr(wgCanonicalNamespace.length + 1);
					} else {
						realTitle = wgCanonicalNamespace.replace(/_/g, " ") + ":" + realTitle;
					}
				}

				// verify whether wgTitle matches
				verifyTitle = verifyTitle.replace(/^ +/, "").replace(/ +$/, "");		// trim left and right spaces
				verifyTitle = verifyTitle.replace(/_/g, " ");		// underscores to spaces
				verifyTitle = verifyTitle.charAt(0).toUpperCase() + verifyTitle.substring(1, verifyTitle.length);	// uppercase first character
				isPasteable = (verifyTitle == wgTitle);

				var h1 = document.getElementsByTagName("h1")[0];
				if (h1 && isPasteable) {
					h1.innerHTML = realTitle;
					if (!containsHTML)
						realTitleBanner.style.display = "none";
				}
				document.title = realTitle + " - Wikipedia, the free encyclopedia";
			}
		}
	} catch (e) {
		/* Something went wrong. */
	}
});


// similar to innerHTML, but only returns the text portions of the insides, excludes HTML
function pickUpText(aParentElement) {
  var str = "";

  function pickUpTextInternal(aElement) {
    var child = aElement.firstChild;
    while (child) {
      if (child.nodeType == 1)		// ELEMENT_NODE 
        pickUpTextInternal(child);
      else if (child.nodeType == 3)	// TEXT_NODE
        str += child.nodeValue;

      child = child.nextSibling;
    }
  }

  pickUpTextInternal(aParentElement);

  return str;
}
// ^^^^ end "technical restrictions" title fix ^^^^
//============================================================


/*
</pre>
*/