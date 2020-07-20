/* Il codice JavaScript inserito qui viene caricato da ciascuna pagina, per tutti gli utenti. */

/*
/////////////////////////////////////////////////////////////////////////////////////////////////////////
// Altering the edit links in section titles to reflect the actual page they're on, and not the template.
/////////////////////////////////////////////////////////////////////////////////////////////////////////
*/

function editLinks(){
	var pageTitle = ""+wgPageName;
	if (pageTitle.indexOf("User talk:")==-1){
		var content = document.getElementById('bodyContent');
		var editLinks = content.getElementsByTagName("h2");
		changeLinks(editLinks);

		editLinks = content.getElementsByTagName("h3");
		changeLinks(editLinks, pageTitle);
	}
}

function changeLinks(editLinks,pageTitle){
	var pageTitle = ""+wgPageName;
	for (var i = 0; i < editLinks.length; i++){
		var editLink = editLinks[i].childNodes.item(0).childNodes.item(1);
		if (editLink != null){
			var oldLink = editLink.href;
			var newLink = oldLink.replace("/Appearances_Synopsis", "");
			newLink = newLink.replace("Marvel_Database:Comic_Template/Header", pageTitle);
			newLink = newLink.replace("Marvel_Database:Comic_Template", pageTitle);
			newLink = newLink.replace("Marvel_Database:Character_Template/Header", pageTitle);
			newLink = newLink.replace("Marvel_Database:Character_Template", pageTitle);
			newLink = newLink.replace("&section=T-10", "");
			newLink = newLink.replace("&section=T-11", "");
			newLink = newLink.replace("&section=T-12", "");
			newLink = newLink.replace("&section=T-13", "");
			newLink = newLink.replace("&section=T-14", "");
			newLink = newLink.replace("&section=T-15", "");
			newLink = newLink.replace("&section=T-16", "");
			newLink = newLink.replace("&section=T-17", "");
			newLink = newLink.replace("&section=T-1", "");
			newLink = newLink.replace("&section=T-2", "");
			newLink = newLink.replace("&section=T-3", "");
			newLink = newLink.replace("&section=T-4", "");
			newLink = newLink.replace("&section=T-5", "");
			newLink = newLink.replace("&section=T-6", "");
			newLink = newLink.replace("&section=T-7", "");
			newLink = newLink.replace("&section=T-8", "");
			newLink = newLink.replace("&section=T-9", "");
			editLink.href = newLink;
			editLink.title = pageTitle.replace("_", " ");
			//editLink.innerHTML = "Done!";
		}
	}
}

addOnloadHook(editLinks)

/*
/////////////////////////////////////////////////////////////////////////////////
// Changing the Link from Special:CreatePage to Marvel Database:Create a New Page
/////////////////////////////////////////////////////////////////////////////////
*/
function createPage(){
	var createPageLink = document.getElementById('dynamic-links-write-article-icon');
	if (createPageLink != null){
		createPageLink.href = "/wiki/Marvel_Database:Create_a_New_Page";
                createPageLink.onclick = "";
	}
	createPageLink = document.getElementById('dynamic-links-write-article-link');
	if (createPageLink != null){
		createPageLink.href = "/wiki/Marvel_Database:Create_a_New_Page";
                createPageLink.onclick = "";
	}
}

addOnloadHook(createPage)

/*
//////////////////////////////////////////////////////////
// Auto-fill the Blog title with sub page name in the URL
//////////////////////////////////////////////////////////
*/

function blogTitle(){
  if (wgCanonicalSpecialPageName == "CreateBlogPage"){
    var sel = document.getElementById('blogPostTitle');
    var title = document.getElementById('page_tabs');
    var title2 = title.getElementsByTagName('a')[0];
    var title3 = title2.href;
    title3 = title3.toString();
    var num = title3.indexOf("CreateBlogPage")+15;
    var title4 = title3.substring(num);
    if (sel != null & sel.value == ''){
      sel.value = title4.replace(/_/g," ");
    }

    var template = "\{\{Review\}\}\<\!--Write Review Below--\>";
    var textBlock1 = document.getElementById('wpTextbox1');
    if (textBlock1 != null){
      textBlock1.value = template;
    }

  }
}

addOnloadHook(blogTitle)


/*
////////////////////////////////////////////////////////////////////////////////////
// Rewrites the title of a given page.
////////////////////////////////////////////////////////////////////////////////////
*/
function rewriteTitle(){
    if(typeof(window.SKIP_TITLE_REWRITE) != 'undefined' && window.SKIP_TITLE_REWRITE)
        return;

    var titleDiv = document.getElementById('title-meta');

    if(titleDiv == null)
        return;

    var cloneNode = titleDiv.cloneNode(true);
    var firstHeading = getFirstHeading();
    var node = firstHeading.childNodes[0];

    // new, then old!
    firstHeading.replaceChild(cloneNode, node);
    cloneNode.style.display = "inline";

    var titleAlign = document.getElementById('title-align');
    firstHeading.style.textAlign = titleAlign.childNodes[0].nodeValue;
}

/*
    Stores the (unmodified) page title.
*/
function storePageName(){
    window.pageName = getFirstHeading().childNodes[0].nodeValue.trim();
}
/*
    Returns h1.firstHeading (the page title element).
*/
function getFirstHeading()
{
    var elements = getElementsByClass('firstHeading', document.getElementById('content'), 'h1');
    return (elements != null && elements.length > 0) ? elements[0] : null;
}


addOnloadHook(rewriteTitle)


function getElementsByClass(searchClass,node,tag) {
	var classElements = new Array();
	if ( node == null )
		node = document;
	if ( tag == null )
		tag = '*';
	var els = node.getElementsByTagName(tag);
	var elsLen = els.length;
	var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
	for (i = 0, j = 0; i < elsLen; i++) {
		if ( pattern.test(els[i].className) ) {
			classElements[j] = els[i];
			j++;
		}
	}
	return classElements;
}

/* 
////////////////////////////////////////////////////////////////////////////////////
// ONLY ALLOWS BOTS, SYSOPS, AND BUREAUCRATS TO SEE THE MOVE OPTION IF JS IS ENABLED
////////////////////////////////////////////////////////////////////////////////////
*/
function oc(a){
  var o = {};
  for(var i=0;i<a.length;i++){
    o[a[i]]='';
  }
  return o;
}

var name = wgUserName

if (wgUserName in oc(['The Ucci','MediaWiki default'])){
} else {
  if (document.getElementById('ca-move') != null){
     document.getElementById('ca-move').style.display = 'none';
  } else {
     setTimeout("document.getElementById('control_move').style.display = 'none'",200);
  }
}


/* 
////////////////////////////////////////////////////////////////
// THE BELOW CODE HELPS MAKE THE NAVIGATION TEMPLATE COLLAPSIBLE
////////////////////////////////////////////////////////////////
*/


function importScriptPage (page, server) {  
var url = '/index.php?title=' + encodeURIComponent(page.replace(/ /g,'_')).replace('%2F','/').replace('%3A',':') + '&action=raw&ctype=text/javascript';
if (typeof server == "string") url = (server.indexOf('://') == -1)?'http://' + server + '.wikia.com' + url:server + url;  
return importScriptURI(url);
}

importScriptPage('ShowHide/code.js', 'dev');




/* 
/////////////////////////////////////////////////////////////////
// THE BELOW CODE HELPS MAKE THE DROPDOWN FOR MEDIAWIKI:EDITTOOLS
/////////////////////////////////////////////////////////////////
*/

/* </pre>
==addLoadEvent==
<pre> */
function addLoadEvent(func) 
{
  if (window.addEventListener) 
    window.addEventListener("load", func, false);
  else if (window.attachEvent) 
    window.attachEvent("onload", func);
}

/* </pre>
===addOnloadHook===
<pre> */
//use both names for it, for Wikipedia compatability (just in case)
function addOnloadHook(f) {
  addLoadEvent(f);
}

/* </pre>

==Cookies==
<pre> */

//Cookie helpers
function setCookie(cookieName, cookieValue) {
 var today = new Date();
 var expire = new Date();
 var nDays = 30;
 expire.setTime( today.getTime() + (3600000 * 24 * nDays) );
 document.cookie = cookieName + "=" + escape(cookieValue)
                 + ";path=/w"
                 + ";expires="+expire.toGMTString();
 document.cookie = cookieName + "=" + escape(cookieValue)
                 + ";path=/wiki"
                 + ";expires="+expire.toGMTString();
}

function getCookie(cookieName) {
  var start = document.cookie.indexOf( cookieName + "=" );
  if ( start == -1 ) return "";
  var len = start + cookieName.length + 1;
  if ( ( !start ) &&
    ( cookieName != document.cookie.substring( 0, cookieName.length ) ) )
      {
        return "";
      }
  var end = document.cookie.indexOf( ";", len );
  if ( end == -1 ) end = document.cookie.length;
  return unescape( document.cookie.substring( len, end ) );
}

function deleteCookie(cookieName) {
  if ( getCookie(cookieName) ) {
    document.cookie = cookieName + "=" + ";path=/w" +
    ";expires=Thu, 01-Jan-1970 00:00:01 GMT";
    document.cookie = cookieName + "=" + ";path=/wiki" +
    ";expires=Thu, 01-Jan-1970 00:00:01 GMT";
  }
}

/* </pre>
==addCharSubsetMenu==
<pre> */
/* add menu for selecting subsets of special characters */
/***** must match MediaWiki:Edittools *****/
function addCharSubsetMenu() {
  var edittools = document.getElementById('editpage-specialchars');

  if (edittools) {
    var menu = "<select id=\"charSubsetControl\" style=\"display:inline\" onChange=\"chooseCharSubset(selectedIndex)\">";
    menu += "<option>Edit Tools</option>";
    menu += "<option>Latin/Roman</option>";
    menu += "<option>Miscellaneous</option>";
    menu += "<option>Wiki Markup</option>";
    menu += "<option>Special Characters</option>";
    menu += "<option>Admin Templates</option>";
    menu += "</select>";
    edittools.innerHTML = menu + edittools.innerHTML;

    /* default subset from cookie */
    var s = parseInt( getCookie('edittoolscharsubset') );
    if ( isNaN(s) ) s = 0;

    /* update dropdown control to value of cookie */
    document.getElementById('charSubsetControl').selectedIndex = s; 

    /* display the subset indicated by the cookie */
    chooseCharSubset( s );
  }
}

/* </pre>
===chooseCharSubsetMenu===
<pre> */
/* select subsection of special characters */
function chooseCharSubset(s) {
  var l = document.getElementById('editpage-specialchars').getElementsByTagName('p');
  for (var i = 0; i < l.length ; i++) {
    l[i].style.display = i == s ? 'inline' : 'none';
    l[i].style.visibility = i == s ? 'visible' : 'hidden';
  }
  setCookie('edittoolscharsubset', s);
}



/* </pre>
==addHelpToolsMenu==
<pre> */
/* add menu for selecting help info */
/***** must match MediaWiki:Edittools *****/
function addHelpToolsMenu() {
  var edittools = document.getElementById('editpage-helpmenu');

  if (edittools) {
    var menu = "<select id=\"helpControl\" style=\"display:inline\" onChange=\"chooseHelpTools(selectedIndex)\">";
    menu += "<option>Help Topics</option>";
    menu += "<option>Naming Conventions</option>";
    menu += "<option>Template Help</option>";
    menu += "<option>Image Help</option>";
    menu += "<option>Miscellaneous</option>";
    menu += "<option>Asking Questions</option>";
    menu += "</select>";
    edittools.innerHTML = menu + edittools.innerHTML;

    /* default subset from cookie */
    var s = parseInt( getCookie('edittoolshelpmenu') );
    if ( isNaN(s) ) s = 0;

    /* update dropdown control to value of cookie */
    document.getElementById('helpControl').selectedIndex = s; 

    /* display the subset indicated by the cookie */
    chooseHelpTools( s );
  }
}

/* </pre>
===chooseHelpToolsMenu===
<pre> */
/* select subsection of special characters */
function chooseHelpTools(s) {
  var l = document.getElementById('editpage-helpmenu').getElementsByTagName('p');
  for (var i = 0; i < l.length ; i++) {
    l[i].style.display = i == s ? 'inline' : 'none';
    l[i].style.visibility = i == s ? 'visible' : 'hidden';
  }
  setCookie('edittoolshelpmenu', s);
}


/* 
////////////////////////////////////////////////
// THE BELOW CODE ALLOWS THE JAVASCRIPT FOR DIGG
////////////////////////////////////////////////
*/
/* </pre>
===addDigg===
<pre> */
/* call to digg script */
function addDigg() {
  var digg = document.getElementById('digg');
  if (digg) {
  
    var ds=typeof digg_skin=='string'?digg_skin:'';var h=80;var w=52;if(ds=='compact'){h=18;w=120;}
    else if(ds=='icon'){h=16;w=16;}
    var u=typeof digg_url=='string'?digg_url:(typeof DIGG_URL=='string'?DIGG_URL:window.location.href);

    var output = "<iframe src='http://digg.com/tools/diggthis.php?u="+
    escape(u).replace(/\+/g,'%2b')+
    (typeof digg_title=='string'?('&t='+escape(digg_title)):'')+
    (typeof digg_bodytext=='string'?('&b='+escape(digg_bodytext)):'')+
    (typeof digg_topic=='string'?('&c='+escape(digg_topic)):'')+
    (typeof digg_bgcolor=='string'?('&k='+escape(digg_bgcolor)):'')+
    (ds?('&s='+ds):'')+"' height='"+h+"' width='"+w+"' frameborder='0' scrolling='no'></iframe>";  
    
    digg.innerHTML = output + digg.innerHTML; 
  }
}


/* 
//////////////////////////////////////////////////////////////////
// THE BELOW CODE EXECUTES EVERYTHING ON PAGELOAD EVENT (REQUIRED)
//////////////////////////////////////////////////////////////////
*/
/* </pre>
==customizeWiki==
<pre> */
/* do any Wiki customizations */
function customizeWiki() {
  addCharSubsetMenu();
  addHelpToolsMenu();
  addDigg();
}

addLoadEvent(customizeWiki);


/* 
////////////////////////////////////////////////////////////////////
// THE BELOW CODE ADDS CUSTOM BUTTONS TO THE JAVASCRIPT EDIT TOOLBAR
////////////////////////////////////////////////////////////////////
*/

if (mwCustomEditButtons) {
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/central/images/c/c8/Button_redirect.png",
     "speedTip": "Redirect",
     "tagOpen": "#REDIRECT [[",
     "tagClose": "]]",
     "sampleText": "Insert text"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/marvel_dc/images/3/3e/Small_Button.png",
     "speedTip": "Small",
     "tagOpen": "<small>",
     "tagClose": "</small>",
     "sampleText": "Insert text"};

  mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/central/images/c/c9/Button_strike.png",
     "speedTip": "Strike",
     "tagOpen": "<s>",
     "tagClose": "</s>",
     "sampleText": "Strike-through text"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/central/images/1/13/Button_enter.png",
     "speedTip": "Line break",
     "tagOpen": "<br />",
     "tagClose": "",
     "sampleText": ""};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/central/images/7/74/Button_comment.png",
     "speedTip": "Comment visible only for editors",
     "tagOpen": "<!-- ",
     "tagClose": " -->",
     "sampleText": "Insert comment here"}
}

if (mwCustomEditButtons) {
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/marveldatabase/images/2/29/Character_Button.png",
     "speedTip": "Insert character template",
     "tagOpen": "\{\{Marvel Database:Character Template\r| Image                   = ",
     "tagClose": "\r| RealName                = \r| CurrentAlias            = \r| Distinguish1            = \r| Distinguish2            = \r| Aliases                 = \r| Identity                = \r| Alignment               = \r| Affiliation             = \r| Relatives               = \r| Universe                = \r| BaseOfOperations        = \r\r| Gender                  = \r| Height                  = \r| Weight                  = \r| Eyes                    = \r| Hair                    = \r| UnusualFeatures         = \r\r| Citizenship             = \r| MaritalStatus           = \r| Occupation              = \r| Education               = \r\r| Origin                  = \r| PlaceOfBirth            = \r| Creators                = \r| First                   = \r\r| HistoryText             = \r\r| Powers                  = \r| Abilities               = \r| Strength                = \r| Weaknesses              = \r\r| Equipment               = \r| Transportation          = \r| Weapons                 = \r\r| Notes                   = \r| Trivia                  = \r| Marvel                  = \r| Wikipedia               = \r| Links                   = \r\}\}",
     "sampleText": ""};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/marveldatabase/images/3/3a/Comic_Button.png",
     "speedTip": "Insert comic template",
     "tagOpen": "\{\{Marvel Database:Comic Template\r| Image               = ",
     "tagClose": "\r| Month               = \r| Year                = \r\r| Editor-in-Chief     = \r| CoverArtist1        = \r\r| Editor1_1           = \r| Writer1_1           = \r| Penciler1_1         = \r| Inker1_1            = \r| Colourist1_1        = \r| Letterer1_1         = \r\r| Quotation           = \r| Speaker             = \r\r| StoryTitle1         = \r| Synopsis1           = \r\r| Appearing1 = \r'''Featured Characters:'''\r* <br/>\r'''Supporting Characters:'''\r* <br/>\r'''Villains:'''\r* <br/>\r'''Other Characters:'''\r* <br/>\r'''Locations:'''\r* <br/>\r'''Items:'''\r* <br/>\r'''Vehicles:'''\r* <br/>\r\r| Notes               = \r| Trivia              = \r| Recommended         = \r| Links               = \r\}\}",
     "sampleText": ""}

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/marveldatabase/images/8/88/Comic_List.png",
     "speedTip": "Insert Comic List template",
     "tagOpen": "\{\{Comic List\r| IssueList               = \r<center><gallery style=\"text-align\:center\;\">\r",
     "tagClose": "\r\r</gallery></center>\r\r| SeeAlso                 =  \r\r\}\}",
     "sampleText": ""};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/marveldatabase/images/5/5d/Team_Button.png",
     "speedTip": "Insert team template",
     "tagOpen": "{{Marvel Database:Team Template\r| Image                   = ",
     "tagClose": "\r| OfficialName            = \r| Aliases                 = \r\r| Status                  = \r| Alignment               = \r| Identity                = \r| Universe                = \r| BaseOfOperations        = \r\r| TeamLeaders             = \r| CurrentMembers          = \r| FormerMembers           = \r| Allies                  = \r| Enemies                 = \r\r| Origin                  = \r| PlaceOfFormation        = \r| PlaceOfDefunction       = \r| Creators                = \r| First                   = \r| Last                    = \r\r| HistoryText             = \r\r| Equipment               = \r| Transportation          = \r| Weapons                 = \r\r| Notes                   = \r| Trivia                  = \r| Links                   = \r\}\}",
     "sampleText": ""}

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/marveldatabase/images/f/f2/Location_Button.png",
     "speedTip": "Insert location template",
     "tagOpen": "\{\{Marvel Database:Location Template\r| Image                   = ",
     "tagClose": "\r| OfficialName            = \r| Aliases                 = \r\r| Galaxy                  = \r| StarSystem              = \r| Planet                  = \r| Country                 = \r| City                    = \r| State                   = \r| Province                = \r| Locale                  = \r\r| Dimensions              = \r| Population              = \r| First                   = \r\r| HistoryText             = \r\r| PointsOfInterest        = \r| Residents               = \r\r| Notes                   = \r| Trivia                  = \r| Links                   = \r\}\}",
     "sampleText": ""}

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/marveldatabase/images/2/20/Vehicle_Button.png",
     "speedTip": "Insert vehicle template",
     "tagOpen": "\{\{Marvel Database: Vehicle Template\r| Image                   = ",
     "tagClose": "\r| OfficialName            = \r| Title                   = \r| Nicknames               = \r| Universe                = \r| Status                  = \r| CurrentModel            = \r| CurrentOwner            = \r| TransportMethod         = \r| Dimensions              = \r| Creators                = \r| Origin                  = \r| First                   = \r\r| HistoryText             = \r\r| Notes                   = \r| Trivia                  = \r| Links                   = \r\}\}",
     "sampleText": ""};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": " https://images.wikia.nocookie.net/marveldatabase/images/0/02/Eyetem_Button.png",
     "speedTip": "Insert item template",
     "tagOpen": "\{\{Marvel Database: Item Template\r| Image                   = ",
     "tagClose": "\r| OfficialName            = \r| Aliases                 = \r| Model                   = \r| Version                 = \r\r| Universe                = \r| LeadDesigner            = \r| AdditionalDesigners     = \r| PlaceOfCreation         = \r| PlaceOfDestruction      = \r| Origin                  = \r\r| Dimensions              = \r| Weight                  = \r| First                   = \r\r| HistoryText             = \r\r| CurrentOwner            = \r| PreviousOwners          = \r\r| Notes                   = \r| Trivia                  = \r| Links                   = \r\}\}",
     "sampleText": ""};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/marveldatabase/images/5/5a/Images_Button.png",
     "speedTip": "Insert gallery template",
     "tagOpen": "\{\{Marvel Database:Gallery Template\r| GalleryType             = {{subst:GetGalleryType}}\r| GalleryData             = \r<gallery> \r",
     "tagClose": "\r</gallery>\r| SeeAlso                 = \r\}\}",
     "sampleText": ""}

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/marveldatabase/images/d/dc/Image_Button.png",
     "speedTip": "Insert image template",
     "tagOpen": "{{Marvel Database:Image Template\r| License                 = ",
     "tagClose": "\r| ImageType               = \r| Description             = \r| GalleryDescription      = \r\r| Source                  = \r| Permission              = \r| Issue                   = \r\r| Universe                = \r| Subject1                = \r| Subject2                = \r| Subject3                = \r| Subject4                = \r| Subject5                = \r\r| CoverArtist1            = \r| Penciler1               = \r| Inker1                  = \r| Colourist1              = \r| Letterer1               = \r\r| Notes                   = \r| Trivia                  = \r\}\}",
     "sampleText": ""}

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/marveldatabase/images/2/2c/Race_Button.png",
     "speedTip": "Insert race template",
     "tagOpen": "\{\{Marvel Database:Race Template\r| Image                   = ",
     "tagClose": "\r| Name                    = \r| Aliases                 = \r| Identity                = \r| Affiliation             = \r| Universe                = \r| BaseOfOperations        = \r\r| BodyType                = \r| AvgHeight               = \r| AvgWeight               = \r| Eyes                    = \r| Hair                    = \r| Skin                    = \r| NumberOfLimbs           = \r| NumberOfFingers         = \r| NumberOfToes            = \r| SpecialAdaptations      = \r| UnusualFeatures         = \r\r| Origin                  = \r| GalaxyOfOrigin          = \r| StarSystemOfOrigin      = \r| HomePlanet              = \r| PlaceOfBirth            = \r| Creators                = \r| First                   = \r\r| HistoryText             = \r\r| Habitat                 = \r| Gravity                 = \r| Atmosphere              = \r| Population              = \r\r| Powers                  = \r| Abilities               = \r| AvgStrength             = \r| Weaknesses              = \r\r| GovernmentType          = \r| TechnologyLevel         = \r| CulturalTraits          = \r| Representatives         = \r\r| Notes                   = \r| Trivia                  = \r| Links                   = \r\}\}",
     "sampleText": ""};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/marveldatabase/images/1/12/Reality_Button.png",
     "speedTip": "Insert reality template",
     "tagOpen": "\{\{Marvel Database:Reality Template\r| Image                   = ",
     "tagClose": "\r| EarthNumber             = \r| Title                   = \r| Aliases                 = \r| Status                  = \r\r| Creators                = \r| First                   = \r\r| History                 = \r\r| Residents               = \r| Notes                   = \r| Trivia                  = \r| Links                   = \r\}\}",
     "sampleText": ""};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/marveldatabase/images/e/ee/Episode_Button.png",
     "speedTip": "Insert episode template",
     "tagOpen": "\{\{Marvel Database:Episode Template\r| Image               = ",
     "tagClose": "\r| Month               = \r| Year                = \r\r| Director            = \r| Producer1_1         = \r| Writer1_1           = \r\r| Quotation           = \r| Speaker             = \r\r| EpisodeTitle        = \r| Synopsis            = \r\r| Appearing           = \r'''Featured Characters:'''\r* <br/>\r'''Supporting Characters:'''\r* <br/>\r'''Villains:'''\r* <br/>\r'''Other Characters:'''\r* <br/>\r'''Locations:'''\r* <br/>\r'''Items:'''\r* <br/>\r'''Vehicles:'''\r* <br/>\r\r| Notes               = \r| Trivia              = \r| Recommended         = \r| Links               = \r\}\}",
     "sampleText": ""};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/marveldatabase/images/3/3e/Staff_Button.png",
     "speedTip": "Insert marvel staff template",
     "tagOpen": "\{\{Marvel Database:Staff Template\r| Image                   = ",
     "tagClose": "\r| RealName                = \r| Pseudonyms              = \r| Employers               = \r| Titles                  = \r\r| Gender                  = \r| YearOfBirth             = \r| MonthOfBirth            = \r| DayOfBirth              = \r| CityOfBirth             = \r| StateOfBirth            = \r| CountryOfBirth          = \r| Creations               = \r| First                   = \r\r| PersonalHistory         = \r| ProfessionalHistory     = \r\r| Notes                   = \r| Trivia                  = \r| OfficialWebsite         = \r| Links                   = \r\}\}",
     "sampleText": ""};
}