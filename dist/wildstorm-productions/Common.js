/* Any JavaScript here will be loaded for all users on every page load. */

/* 
////////////////////////////////////////////////////////////////
// THE BELOW CODE HELPS MAKE THE NAVIGATION TEMPLATE COLLAPSABLE
////////////////////////////////////////////////////////////////
*/

 // ============================================================
// BEGIN Dynamic Navigation Bars (experimental)
// This script is from Wikipedia. For author attribution, please see http://en.wikipedia.org/w/index.php?title=MediaWiki:Common.js&action=history


/* Test if an element has a certain class **************************************
 *
 * Description: Uses regular expressions and caching for better performance.
 * Maintainers: User:Mike Dillon, User:R. Koot, User:SG
 */

var hasClass = (function () {
    var reCache = {};
    return function (element, className) {
        return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
    };
})();

 /** Collapsible tables *********************************************************
  *
  *  Description: Allows tables to be collapsed, showing only the header. See
  *               [[Wikipedia:NavFrame]].
  *  Maintainers: [[User:R. Koot]]
  */
 
 var autoCollapse = 2;
 var collapseCaption = "hide";
 var expandCaption = "show";
 
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
     var Tables = document.getElementsByTagName( "table" );
 
     for ( var i = 0; i < Tables.length; i++ ) {
         if ( hasClass( Tables[i], "collapsible" ) ) {
             NavigationBoxes[ tableIndex ] = Tables[i];
             Tables[i].setAttribute( "id", "collapsibleTable" + tableIndex );
 
             var Button     = document.createElement( "span" );
             var ButtonLink = document.createElement( "a" );
             var ButtonText = document.createTextNode( collapseCaption );
 
             Button.style.styleFloat = "right";
             Button.style.cssFloat = "right";
             Button.style.fontWeight = "normal";
             Button.style.textAlign = "right";
             Button.style.width = "6em";
 
             ButtonLink.setAttribute( "id", "collapseButton" + tableIndex );
             ButtonLink.setAttribute( "href", "javascript:collapseTable(" + tableIndex + ");" );
             ButtonLink.appendChild( ButtonText );
 
             Button.appendChild( document.createTextNode( "[" ) );
             Button.appendChild( ButtonLink );
             Button.appendChild( document.createTextNode( "]" ) );
 
             var Header = Tables[i].getElementsByTagName( "tr" )[0].getElementsByTagName( "th" )[0];
             /* only add button and increment count if there is a header row to work with */
             if (Header) {
                 Header.insertBefore( Button, Header.childNodes[0] );
                 tableIndex++;
             }
         }
     }
 
     for ( var i = 0;  i < tableIndex; i++ ) {
         if ( hasClass( NavigationBoxes[i], "collapsed" ) || ( tableIndex >= autoCollapse && hasClass( NavigationBoxes[i], "autocollapse" ) ) ) {
             collapseTable( i );
         }
     }
 }
 addOnloadHook( createCollapseButtons );

 /** Dynamic Navigation Bars (experimental) *************************************
  *
  *  Description: See [[Wikipedia:NavFrame]].
  *  Maintainers: UNMAINTAINED
  */
 
  // set up the words in your language
  var NavigationBarHide = '[' + collapseCaption + ']';
  var NavigationBarShow = '[' + expandCaption + ']';
  
  // set up max count of Navigation Bars on page,
  // if there are more, all will be hidden
  // NavigationBarShowDefault = 0; // all bars will be hidden
  // NavigationBarShowDefault = 1; // on pages with more than 1 bar all bars will be hidden
  var NavigationBarShowDefault = autoCollapse;
  
  
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
             if ( hasClass( NavChild, 'NavPic' ) ) {
                 NavChild.style.display = 'none';
             }
             if ( hasClass( NavChild, 'NavContent') ) {
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
             if (hasClass(NavChild, 'NavPic')) {
                 NavChild.style.display = 'block';
             }
             if (hasClass(NavChild, 'NavContent')) {
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
     var divs = document.getElementsByTagName("div");
     for(
             var i=0; 
             NavFrame = divs[i]; 
             i++
         ) {
         // if found a navigation bar
         if (hasClass(NavFrame, "NavFrame")) {
  
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
               if (hasClass(NavFrame.childNodes[j], "NavHead")) {
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
  addOnloadHook( createNavigationBarToggleButton );



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
     "imageFile": "http://images.wikia.com/central/images/c/c8/Button_redirect.png",
     "speedTip": "Redirect",
     "tagOpen": "#REDIRECT [[",
     "tagClose": "]]",
     "sampleText": "Insert text"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://images.wikia.com/marvel_dc/images/3/3e/Small_Button.png",
     "speedTip": "Small",
     "tagOpen": "<small>",
     "tagClose": "</small>",
     "sampleText": "Insert text"};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://images.wikia.com/central/images/c/c9/Button_strike.png",
     "speedTip": "Strike",
     "tagOpen": "<s>",
     "tagClose": "</s>",
     "sampleText": "Strike-through text"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://images.wikia.com/central/images/1/13/Button_enter.png",
     "speedTip": "Line break",
     "tagOpen": "<br />",
     "tagClose": "",
     "sampleText": ""};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://images.wikia.com/central/images/7/74/Button_comment.png",
     "speedTip": "Comment visible only for editors",
     "tagOpen": "<!-- ",
     "tagClose": " -->",
     "sampleText": "Insert comment here"}
}

if (mwCustomEditButtons) {
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://images.wikia.com/marveldatabase/images/2/29/Character_Button.png",
     "speedTip": "Insert character template",
     "tagOpen": "\{\{Wildstorm Productions Wiki:Character Template\r| Image                   = ",
     "tagClose": "\r| RealName                = \r| CurrentAlias            = \r| Distinguish1            = \r| Distinguish2            = \r| Aliases                 = \r| Identity                = \r| Alignment               = \r| Affiliation             = \r| Relatives               = \r| Universe                = \r| BaseOfOperations        = \r\r| Gender                  = \r| Height                  = \r| Weight                  = \r| Eyes                    = \r| Hair                    = \r| UnusualFeatures         = \r\r| Citizenship             = \r| MaritalStatus           = \r| Occupation              = \r| Education               = \r\r| Origin                  = \r| PlaceOfBirth            = \r| Creators                = \r| First                   = \r\r| HistoryText             = \r\r| Powers                  = \r| Abilities               = \r| Strength                = \r| Weaknesses              = \r\r| Equipment               = \r| Transportation          = \r| Weapons                 = \r\r| Notes                   = \r| Trivia                  = \r| WildStorm                      = \r| Wikipedia               = \r| Recommended             = \r| Links                   = \r\}\}",
     "sampleText": ""};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://images2.wikia.nocookie.net/marveldatabase/images/a/a5/Minor_Button_2.png",
     "speedTip": "Insert minor character template",
     "tagOpen": "\{\{Wildstorm Productions Wiki:Minor Character\r| Name                    = Common.js\r| Image                   = ",
     "tagClose": "\r| Universe                = \r| Gender                  = \r| Alias                   = \r| Alignment               = \r| Nationality             = \r| Occupation              = \r| Group Affiliation       = \r\r| First                   = \r| Last                    = \r\r| History                 = \r\r| Powers/Abilities        = \r\r| Appearances             = \r\r| Related Articles        = \r\r\}\}",
     "sampleText": ""};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://images.wikia.com/marveldatabase/images/3/3a/Comic_Button.png",
     "speedTip": "Insert comic template",
     "tagOpen": "\{\{Wildstorm Productions Wiki:Comic Template\r| Title               = \r| Image               = ",
     "tagClose": "\r| Volume              = \r| Issue               = \r| Month               = \r| Year                = \r\r| Executive Editor    = \r| CoverArtist1        = \r\r| Editor1_1           = \r| Writer1_1           = \r| Penciler1_1         = \r| Inker1_1            = \r| Colourist1_1        = \r| Letterer1_1         = \r\r| Quotation           = \r| Speaker             = \r\r| StoryTitle1         = \r| Synopsis1           = \r\r| Appearing1 = \r'''Featured Characters:'''\r* <br/>\r'''Supporting Characters:'''\r* <br/>\r'''Villains:'''\r* <br/>\r'''Other Characters:'''\r* <br/>\r'''Locations:'''\r* <br/>\r'''Items:'''\r* <br/>\r'''Vehicles:'''\r* <br/>\r\r| Notes               = \r| Trivia              = \r| Recommended         = \r| Links               = \r\}\}",
     "sampleText": ""}

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://images.wikia.com/marveldatabase/images/5/5d/Team_Button.png",
     "speedTip": "Insert team template",
     "tagOpen": "{{Wildstorm Productions Wiki:Team Template\r| Image                   = ",
     "tagClose": "\r| OfficialName            = \r| Aliases                 = \r\r| Status                  = \r| Identity                = \r| Alignment               = \r| Universe                = \r| BaseOfOperations        = \r\r| TeamLeaders             = \r| CurrentMembers          = \r| FormerMembers           = \r| Allies                  = \r| Enemies                 = \r\r| Origin                  = \r| PlaceOfFormation        = \r| PlaceOfDefunction       = \r| Creators                = \r| First                   = \r| Last                    = \r\r| HistoryText             = \r\r| Equipment               = \r| Transportation          = \r| Weapons                 = \r\r| Notes                   = \r| Trivia                  = \r| Links                   = \r\}\}",
     "sampleText": ""}

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://images.wikia.com/marveldatabase/images/f/f2/Location_Button.png",
     "speedTip": "Insert location template",
     "tagOpen": "\{\{Wildstorm Productions Wiki:Location Template\r| Image                   = ",
     "tagClose": "\r| OfficialName            = \r| Aliases                 = \r\r| Universe                = \r| Galaxy                  = \r| StarSystem              = \r| Planet                  = \r| Country                 = \r| City                    = \r| State                   = \r| Province                = \r| Locale                  = \r\r| Dimensions              = \r| Population              = \r| First                   = \r\r| HistoryText             = \r\r| PointsOfInterest        = \r| Residents               = \r\r| Notes                   = \r| Trivia                  = \r| Links                   = \r\}\}",
     "sampleText": ""}

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://images3.wikia.nocookie.net/marveldatabase/images/2/20/Vehicle_Button.png",
     "speedTip": "Insert vehicle template",
     "tagOpen": "\{\{Wildstorm Productions Wiki: Vehicle Template\r| Image                   = ",
     "tagClose": "\r| OfficialName            = \r| Title                   = \r| Nicknames               = \r\r| VehicleType             = \r| Universe                = \r| Status                  = \r| CurrentModel            = \r| CurrentOwner            = \r| TransportMethod         = \r| Dimensions              = \r| Creators                = \r| Origin                  = \r| First                   = \r\r| HistoryText             = \r\r| Notes                   = \r| Trivia                  = \r| Links                   = \r\}\}",
     "sampleText": ""};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": " http://images1.wikia.nocookie.net/marveldatabase/images/0/02/Eyetem_Button.png",
     "speedTip": "Insert item template",
     "tagOpen": "\{\{Wildstorm Productions Wiki:Item Template\r| Image                   = ",
     "tagClose": "\r| OfficialName            = \r| Aliases                 = \r| Model                   = \r| Version                 = \r\r| Universe                = \r| LeadDesigner            = \r| AdditionalDesigners     = \r| PlaceOfCreation         = \r| PlaceOfDestruction      = \r| Origin                  = \r\r| Dimensions              = \r| Weight                  = \r| First                   = \r\r| HistoryText             = \r\r| CurrentOwner            = \r| PreviousOwners          = \r\r| Notes                   = \r| Trivia                  = \r| Links                   = \r\}\}",
     "sampleText": ""};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://images.wikia.com/marveldatabase/images/5/5a/Images_Button.png",
     "speedTip": "Insert gallery template",
     "tagOpen": "\{\{Wildstorm Productions Wiki:Gallery Template\r| GalleryType             = \r| GalleryData             = \r<gallery>\r",
     "tagClose": "\r</gallery>\r| SeeAlso                 = \r\}\}",
     "sampleText": ""}

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://images.wikia.com/marveldatabase/images/d/dc/Image_Button.png",
     "speedTip": "Insert image template",
     "tagOpen": "{{Wildstorm Productions Wiki:Image Template\r| License                 = ",
     "tagClose": "\r| ImageType               = \r| ImageQuality            = \r| Description             = \r| GalleryDescription      = \r\r| Source                  = \r| Permission              = \r| Universe                = \r\r| Subject1                = \r| Subject2                = \r| Subject3                = \r| Subject4                = \r| Subject5                = \r\r| Medium                  = \r| Photographer            = \r| Colourist1              = \r| CoverArtist1            = \r| Inker1                  = \r| Letterer1               = \r| Penciler1               = \r\r| Notes                   = \r| Trivia                  = \r\}\}",
     "sampleText": ""}

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://images2.wikia.nocookie.net/marveldatabase/images/2/2c/Race_Button.png",
     "speedTip": "Insert race template",
     "tagOpen": "\{\{Wildstorm Productions Wiki:Race Template\r| Image                   = ",
     "tagClose": "\r| Name                    = \r| Aliases                 = \r| Identity                = \r| Affiliation             = \r| Universe                = \r| BaseOfOperations        = \r\r| BodyType                = \r| AvgHeight               = \r| AvgWeight               = \r| Eyes                    = \r| Hair                    = \r| Skin                    = \r| NumberOfLimbs           = \r| NumberOfFingers         = \r| NumberOfToes            = \r| SpecialAdaptations      = \r| UnusualFeatures         = \r\r| Origin                  = \r| GalaxyOfOrigin          = \r| StarSystemOfOrigin      = \r| HomePlanet              = \r| PlaceOfBirth            = \r| Creators                = \r| First                   = \r\r| HistoryText             = \r\r| Habitat                 = \r| Gravity                 = \r| Atmosphere              = \r| Population              = \r\r| Powers                  = \r| Abilities               = \r| AvgStrength             = \r| Weaknesses              = \r\r| GovernmentType          = \r| TechnologyLevel         = \r| CulturalTraits          = \r| Representatives         = \r\r| Notes                   = \r| Trivia                  = \r| Links                   = \r\}\}",
     "sampleText": ""};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://images1.wikia.nocookie.net/marveldatabase/images/1/12/Reality_Button.png",
     "speedTip": "Insert Reality Template",
     "tagOpen": "{\{Wildstorm Productions Wiki:Reality Template\r| Image                   = ",
     "tagClose": "\r| EarthNumber             = \r| Title                   = \r| Aliases                 = \r| Status                  = \r\r| Creators                = \r| First                   = \r| Last                    = \r\r| History                 = \r\r| Residents               = \r| Notes                   = * Part of the Post-[[Infinite Crisis]] [[Multiverse#52 Multiverse|Multiverse]].\r| Trivia                  = \r| Links                   = \r\}\}",
     "sampleText": ""};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://images.wikia.com/marveldatabase/images/3/3e/Staff_Button.png",
     "speedTip": "Insert WildStorm staff template",
     "tagOpen": "\{\{Wildstorm Productions Wiki:Staff Template\r| Image                   = ",
     "tagClose": "\r| RealName                = \r| Pseudonyms              = \r| Employers               = \r| Titles                  = \r\r| Gender                  = \r| YearOfBirth             = \r| MonthOfBirth            = \r| DayOfBirth              = \r| CityOfBirth             = \r| StateOfBirth            = \r| CountryOfBirth          = \r| Creations               = \r| First                   = \r\r| PersonalHistory         = \r| ProfessionalHistory     = \r\r| Notes                   = \r| Trivia                  = \r| OfficialWebsite         = \r| Links                   = \r\}\}",
     "sampleText": ""};
}


/* 
////////////////////////////////////////////////////////////////////
// THE BELOW CODE ADDS CLICK HANDLING TO MAINPAGE ACCENT GRAPHICS
////////////////////////////////////////////////////////////////////
* Author: BladeBronson (Christian, Wikia Staff)
*/
if (skin == 'monaco' && wgPageName == 'Main_Page') {
  el = new YAHOO.util.Element('background_accent1'); 
  el.setStyle('cursor', 'pointer');
  el.on('click', function() { 
    document.location = 'Superman';
  });

  el = new YAHOO.util.Element('background_accent2'); 
  el.setStyle('cursor', 'pointer');
  el.on('click', function() { 
    document.location = 'Batman';
  });
}