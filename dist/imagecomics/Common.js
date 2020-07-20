importScriptPage('ShowHide/code.js', 'dev');

/* Any JavaScript here will be loaded for all users on every page load. */
/* 
////////////////////////////////////////////////////////////////
// THE BELOW CODE DEFAULTS IN AN IMAGE TEMPLATE ON UPLOAD
////////////////////////////////////////////////////////////////
*/
// BEGINNING: JavaScript for placing the fair use rationale template inside the summary box on [[Special:Upload]]. Code by "[[wikipedia:User:Pinky49]]", created and coded specifically for [[wikia:c:cdnmilitary|Duty & Valour]]. Edited by [[http://imagecomics.wikia.com/wiki/User:Unatratnag]] for Comic Image Templates.

function FairUseRationale() {
     if((wgPageName == 'Special:Upload') && document.getElementById('wpDestFile').value === '') {
          document.getElementById('wpUploadDescription').value = 
'{{Image Database:Image Template\n| License               = <!-- Comic Cover, Comic Single Panel, Fair Use -->\n| Publisher             = Image Comics\n| ImageType             = <!-- Character, Cover Art, Team, Location, etc -->\n| Description           = <!-- {{F|character, team or comic article}} -->\n| GalleryDescription    = \n\n| Source                = \n| Permission            = \n| Issue                 = <!--{{c|Issue in which image was published}} -->\n\n| Universe              = <!-- Spawn, Invincible, Top Cow etc -->\n| Subject1              = <!-- Character link such as Albert Simmons -->\n| Subject2              = \n| Subject3              = \n| Subject4              = \n| Subject5              = \n\n| CoverArtist1          = <!-- Leave these blank if multiple names-->\n| Penciler1             = \n| Inker1                = \n| Colourist1            = \n| Letterer1             = \n\n| Notes                 = \n| Trivia                = \n}}';
     }
}
addOnloadHook(FairUseRationale);

// ****** END: JavaScript for [[Special:Upload]] ******

/*
////////////////////////////////////////////////////////////////////////////////////////////
// Auto-fill the Blog title with sub page name in the URL (coded with help from Monchoman45)
//////////////////////////////////////////////////////////////////////////////////////////// COMMENTED OUT TO TEST PROBLEMS WITH MESSAGE WALL


function blogTitle(){
  if (wgCanonicalSpecialPageName == "CreateBlogPage" && urlQuery('action') != null && urlQuery('action') != 'submit'){
    
    var pageTitle = fbReturnToTitle.replace("Special:CreateBlogPage", "");
    pageTitle = pageTitle.replace("/", "");
    pageTitle = pageTitle.replace(/_/gi, " ");

    var titleTitle = pageTitle.replace(/Vol (\d+) (\d+)/, "$2 (Volume $1)");
    titleTitle = titleTitle.replace(" (Volume 1)", "");

    var user = wgUserName;

    if (pageTitle != "") {
      var sel = document.getElementById('blogPostTitle');
      if (sel != null && sel.value == ''){
        sel.value = titleTitle+" Review by "+user;
      }

      var signature = "~~"+"~~";
      var template = "\<!--Replace this text with your review, leaving your signature and the categories below.-->\n\n\n"+signature+"\n\n\[\[Category:"+pageTitle+"\/Reviews\]\]\[\[Category:"+user+"\/Reviews\]\]";
      var textBlock1 = document.getElementById('wpTextbox1');
      if (textBlock1 != null){
        textBlock1.value = template;
      }
    }

  }
}

function urlQuery(quer) {
  for (i in location.href.split('?')) {
    for (j in location.href.split('?')[i].split('&')) {
      if (location.href.split('?')[i].split('&')[j].split('=')[0] == quer) {
        return location.href.split('?')[i].split('&')[j].split('=')[1];
        }
      }
    }
    return '';
  }


addOnloadHook(blogTitle)
*/


/* 
////////////////////////////////////////////////////////////////
// THE BELOW CODE HELPS MAKE THE NAVIGATION TEMPLATE COLLAPSIBLE
////////////////////////////////////////////////////////////////
*/

importScriptPage('ShowHide/code.js', 'dev');




/* 
////////////////////////////////////////////////////////////////////
// Facebook box
////////////////////////////////////////////////////////////////////
*/

function fBox() {
    $('#fbox').append('<iframe scrolling="no" height="550" frameborder="0" align="top" width="330" src="http://www.facebook.com/connect/connect.php?id=208174206745&amp;connections=29" marginwidth="0" marginheight="0"></iframe>');
}

$(fBox);

/* 
////////////////////////////////////////////////////////////////////
// Twitter Follow Button
////////////////////////////////////////////////////////////////////
*/


function addTwitterButton() {
   $('#twitter-button').append('<a href="http://twitter.com/marveldatabase" class="twitter-follow-button" data-show-count="true" data-show-screen-name="false">Follow @MarvelDatabase</a><script src="https://platform.twitter.com/widgets.js" type="text/javascript"></script>');
}
$(addTwitterButton);



/*
/////////////////////////////////////////////////////////////////////////////////////////////////////////
// Altering the edit links in section titles to reflect the actual page they're on, and not the template.
/////////////////////////////////////////////////////////////////////////////////////////////////////////
http://marvel.wikia.com/index.php?title=Marvel_Database:Character_Template&action=edit&section=T-1
*/

function editLinks(){
	var pageTitle = ""+wgPageName;
	if (pageTitle.indexOf("User talk:")==-1){
		var content = document.getElementById('bodyContent');
		if (content !== null) {
			var editLinks = content.getElementsByTagName('h2');
			if (editLinks !== null) changeLinks(editLinks, pageTitle);

			editLinks = content.getElementsByTagName('h3');
			if (editLinks !== null) changeLinks(editLinks, pageTitle);
		}
	}
}

function changeLinks(editLinks,pageTitle){
	var pageTitle = ""+wgPageName;
	for (var i = 0; i < editLinks.length; i++){
		var editLink = editLinks[i].childNodes.item(1).childNodes.item(1);
		if (editLink !== null){
			var oldLink = editLink.href;
			var newLink = oldLink.replace("/Appearances_Synopsis", "");
			newLink = newLink.replace("Comic_Template/Header", pageTitle);
			newLink = newLink.replace("Comic_Template", pageTitle);
			newLink = newLink.replace("Character_Template/Header", pageTitle);
			newLink = newLink.replace("Character_Template", pageTitle);
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
			newLink = newLink.replace("_&_", "_%26_");
			editLink.href = newLink;
			editLink.title = pageTitle.replace(/_/g, " ");
			editLink.title = editLink.title.replace("Comics:", "Edit: ");
			editLink.title = editLink.title.replace(" Vol 1 ", " #");
			//editLink.innerHTML = "Done!";
		}
	}
}

addOnloadHook(editLinks);







/* 
////////////////////////////////////////////////////////////////////
// SORTS THE FIRST SORTABLE TABLE BY THE SECOND COLUMN
////////////////////////////////////////////////////////////////////


sortables_init();
 // sort the first sortable table; change [0] to sort other tables.
 tab = document.getElementsByTagName("table")[0];
 // sort by the first column; change [0] to sort by other columns.
 hdr = tab.getElementsByTagName("th")[2];
 // get the sort button link
 lnk = hdr.getElementsByTagName("a")[0];
 ts_resortTable(lnk);
*/



/*
////////////////////////////////////////////////////////////////////////////////////
// Rewrites the title of a given page.
////////////////////////////////////////////////////////////////////////////////////
*/
function rewriteTitle(){
    if(typeof(window.SKIP_TITLE_REWRITE) != 'undefined' && window.SKIP_TITLE_REWRITE)
        return;

    var titleDiv = document.getElementById('title-meta');

    if(titleDiv === null)
        return;

    var cloneNode = titleDiv.cloneNode(true);
    var firstHeading = getFirstHeading();
    if (firstHeading.childNodes[0] === null) return;
    var node = firstHeading.childNodes[0];

    // new, then old!
    if(node === null)
        return;
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
    return (elements !== null && elements.length > 0) ? elements[0] : null;
}


addOnloadHook(rewriteTitle);


function getElementsByClass(searchClass,node,tag) {
	var classElements = [];
	if ( node === null )
		node = document;
	if ( tag === null )
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
/////////////////////////////////////////////////////////////////
// THE BELOW CODE HELPS MAKE THE DROPDOWN FOR MEDIAWIKI:EDITTOOLS
/////////////////////////////////////////////////////////////////
*/

/* </pre>
==addLoadEvent==
<pre> */
function addLoadEvent(func) {
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

addLoadEvent(addDigg);


/*
////////////////////////////////////////////////////////////////////
// JS FOR FINDING DUPLICATE IMAGES ON THE SITE
////////////////////////////////////////////////////////////////////
*/

$(function () {
    if ($("#mw-dupimages").length) {
        dil = [];
        output = "";
        url = "/api.php?action=query&generator=allimages&prop=duplicatefiles&gailimit=500&format=json";
        if (gf) url += "&gaifrom=" + gf;
        $.getJSON(url, function (data) {
            if (data.query) {
                pages = data.query.pages;
                for (var pageID in pages) {
                    dils = "," + dil.join();
                    if (dils.indexOf("," + pages[pageID].title) == -1 && pages[pageID].title.indexOf("File::") == -1 && pages[pageID].duplicatefiles) {
                        output += "<h3><a href='/" + pages[pageID].title + "'>" + pages[pageID].title + "</a></h3>\n<ul>\n";
                        for (x = 0; x < pages[pageID].duplicatefiles.length; x++) {
                            output += "<li><a href='/File:" + pages[pageID].duplicatefiles[x].name + "'>File:" + pages[pageID].duplicatefiles[x].name + "</a></li>\n";
                            dil.push("File:" + pages[pageID].duplicatefiles[x].name.replace(/_/g, " "));
                        }
                        output += "</ul>\n\n";
                    }
                }
                $("#mw-dupimages").append(output);
                if (data["query-continue"]) setTimeout("findDupImages('" + data["query-continue"].allimages.gaifrom + "');", 5000);
            }
        });
    }
});

/* 
////////////////////////////////////////////////////////////////////
// THE BELOW CODE ADDS CUSTOM BUTTONS TO THE JAVASCRIPT EDIT TOOLBAR
////////////////////////////////////////////////////////////////////
*/

if (mwCustomEditButtons) {
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        imageFile: "https://images.wikia.nocookie.net/central/images/c/c8/Button_redirect.png",
        speedTip: "Redirect",
        tagOpen: "#REDIRECT [[",
        tagClose: "]]",
        sampleText: "Insert text"
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        imageFile: "https://images.wikia.nocookie.net/marvel_dc/images/3/3e/Small_Button.png",
        speedTip: "Small",
        tagOpen: "<small>",
        tagClose: "</small>",
        sampleText: "Insert text"
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        imageFile: "https://images.wikia.nocookie.net/central/images/c/c9/Button_strike.png",
        speedTip: "Strike",
        tagOpen: "<s>",
        tagClose: "</s>",
        sampleText: "Strike-through text"
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        imageFile: "https://images.wikia.nocookie.net/central/images/1/13/Button_enter.png",
        speedTip: "Line break",
        tagOpen: "<br />",
        tagClose: "",
        sampleText: ""
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        imageFile: "https://images.wikia.nocookie.net/central/images/7/74/Button_comment.png",
        speedTip: "Comment visible only for editors",
        tagOpen: "<!-- ",
        tagClose: " -->",
        sampleText: "Insert comment here"
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        imageFile: "https://images.wikia.nocookie.net/marveldatabase/images/2/29/Character_Button.png",
        speedTip: "Insert character template",
        tagOpen: "\{\{Character Template\r| Image                   = ",
        tagClose: "\r| RealName                = \r| CurrentAlias            = \r| Aliases                 = \r| Identity                = \r| Alignment               = \r| Affiliation             = \r| Relatives               = \r| Universe                = \r| BaseOfOperations        = \r\r| Gender                  = \r| Height                  = \r| Weight                  = \r| Eyes                    = \r| Hair                    = \r| UnusualFeatures         = \r\r| Citizenship             = \r| MaritalStatus           = \r| Occupation              = \r| Education               = \r\r| Origin                  = \r| PlaceOfBirth            = \r| Creators                = \r| First                   = \r| Death                   = \r\r| Quotation               = \r| Speaker                 = \r| QuoteSource             = \r\r| HistoryText             = \r\r| Powers                  = \r| Abilities               = \r| Strength                = \r| Weaknesses              = \r\r| Equipment               = \r| Transportation          = \r| Weapons                 = \r\r| Notes                   = \r| Trivia                  = \r| OtherMedia              = \r| Wikipedia               = \r| Links                   = \r\}\}",
        sampleText: ""
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        imageFile: "https://images.wikia.nocookie.net/marveldatabase/images/3/3a/Comic_Button.png",
        speedTip: "Insert comic template",
        tagOpen: "\{\{Comic Template \r| Title               = \r| Image               = ",
        tagClose: "\r| Volume              = \r| Issue               = \r| Month               = \r| Year                = \r| Day                 = \r| Publisher           = \r| Country             = \r| OriginalPrice       = \r| Pages               = \r\r| PreviousIssue       = \r| NextIssue           = \r\r| Editor-in-Chief     = \r| CoverArtist1        = \r\r| Quotation           = \r| Speaker             = \r\r| StoryTitle1         = \r| Writer1_1           = \r| Penciler1_1         = \r| Inker1_1            = \r| Colourist1_1        = \r| Letterer1_1         = \r| Editor1_1           = \r\r| Synopsis1           = \r\r| Solicit             = \r\r| Appearing1          = \r'''Featured Characters:'''\r* <br/>\r'''Supporting Characters:'''\r* <br/>\r'''Villains:'''\r* <br/>\r'''Other Characters:'''\r* <br/>\r'''Locations:'''\r* <br/>\r'''Items:'''\r* <br/>\r'''Vehicles:'''\r* <br/>\r\r| Notes               = \r| Trivia              = \r| Recommended         = \r| Links               = \r\}\}",
        sampleText: ""
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        imageFile: "https://images.wikia.nocookie.net/marveldatabase/images/8/88/Comic_List.png",
        speedTip: "Insert Comic Volume template",
        tagOpen: "\{\{Volume Template\r| VolumeLogo               = \r| Universe                 = \r| IssueList                = \r<gallery position=\"center\" captionalign=\"center\">\r",
        tagClose: "\r\r</gallery>\r\r| Publisher                 =  \r| TotalIssues               =  \r| StartMonth                =  \r| StartYear                 =  \r| EndMonth                  =  \r| EndYear                   =  \r| SeeAlso                   =  \r\r\}\}",
        sampleText: ""
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        imageFile: "https://images.wikia.nocookie.net/marveldatabase/images/5/5d/Team_Button.png",
        speedTip: "Insert team template",
        tagOpen: "{{Team Template\r| Image                   = ",
        tagClose: "\r| OfficialName            = \r| Aliases                 = \r\r| Status                  = \r| Alignment               = \r| Identity                = \r| Universe                = \r| BaseOfOperations        = \r\r| TeamLeaders             = \r| CurrentMembers          = \r| FormerMembers           = \r| Allies                  = \r| Enemies                 = \r\r| Origin                  = \r| PlaceOfFormation        = \r| PlaceOfDefunction       = \r| Creators                = \r| First                   = \r| Last                    = \r\r| HistoryText             = \r\r| Equipment               = \r| Transportation          = \r| Weapons                 = \r\r| Notes                   = \r| Trivia                  = \r| Links                   = \r\}\}",
        sampleText: ""
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        imageFile: "https://images.wikia.nocookie.net/marveldatabase/images/f/f2/Location_Button.png",
        speedTip: "Insert location template",
        tagOpen: "\{\{Location Template\r| Image                   = ",
        tagClose: "\r| OfficialName            = \r| Aliases                 = \r\r| Universe                = \r| Galaxy                  = \r| StarSystem              = \r| Planet                  = \r| Country                 = \r| City                    = \r| State                   = \r| Province                = \r| Locale                  = \r\r| Dimensions              = \r| Population              = \r| Creators                = \r| First                   = \r\r| HistoryText             = \r\r| PointsOfInterest        = \r| Residents               = \r\r| Notes                   = \r| Trivia                  = \r| Links                   = \r\}\}",
        sampleText: ""
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        imageFile: "https://images.wikia.nocookie.net/marveldatabase/images/2/20/Vehicle_Button.png",
        speedTip: "Insert vehicle template",
        tagOpen: "\{\{Vehicle Template\r| Image                   = ",
        tagClose: "\r| OfficialName            = \r| Title                   = \r| Nicknames               = \r| Universe                = \r| Status                  = \r| CurrentModel            = \r| CurrentOwner            = \r| TransportMethod         = \r| Dimensions              = \r| Creators                = \r| Origin                  = \r| First                   = \r\r| HistoryText             = \r\r| Notes                   = \r| Trivia                  = \r| Links                   = \r\}\}",
        sampleText: ""
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        imageFile: " https://images.wikia.nocookie.net/marveldatabase/images/0/02/Eyetem_Button.png",
        speedTip: "Insert item template",
        tagOpen: "\{\{Item Template\r| Image                   = ",
        tagClose: "\r| OfficialName            = \r| Aliases                 = \r| Model                   = \r| Version                 = \r\r| Universe                = \r| LeadDesigner            = \r| AdditionalDesigners     = \r| PlaceOfCreation         = \r| PlaceOfDestruction      = \r| Origin                  = \r\r| Dimensions              = \r| Weight                  = \r| Creators                = \r| First                   = \r\r| HistoryText             = \r\r| CurrentOwner            = \r| PreviousOwners          = \r\r| Notes                   = \r| Trivia                  = \r| Links                   = \r\}\}",
        sampleText: ""
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        imageFile: "https://images.wikia.nocookie.net/marveldatabase/images/5/5a/Images_Button.png",
        speedTip: "Insert gallery template",
        tagOpen: "\{\{Gallery Template\r| GalleryType             = \r| GalleryData             = \r<gallery position=\"center\" captionalign=\"center\"> \r",
        tagClose: "\r</gallery>\r| SeeAlso                 = \r\}\}",
        sampleText: ""
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        imageFile: "https://images.wikia.nocookie.net/marveldatabase/images/d/dc/Image_Button.png",
        speedTip: "Insert image template",
        tagOpen: "{{Image Database:Image Template\r| License                 = ",
        tagClose: "\r| Publisher               = \r| ImageType               = \r| Description             = \r| GalleryDescription      = \r\r| Source                  = \r| Permission              = \r| Issue                   = \r\r| Universe                = \r| Subject1                = \r| Subject2                = \r| Subject3                = \r| Subject4                = \r| Subject5                = \r\r| CoverArtist1            = \r| Penciler1               = \r| Inker1                  = \r| Colourist1              = \r| Letterer1               = \r\r| Notes                   = \r| Trivia                  = \r\}\}",
        sampleText: ""
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        imageFile: "https://images.wikia.nocookie.net/marveldatabase/images/2/2c/Race_Button.png",
        speedTip: "Insert race template",
        tagOpen: "\{\{Race Template\r| Image                   = ",
        tagClose: "\r| Name                    = \r| Aliases                 = \r| Identity                = \r| Affiliation             = \r| Universe                = \r| BaseOfOperations        = \r\r| BodyType                = \r| AvgHeight               = \r| AvgWeight               = \r| Eyes                    = \r| Hair                    = \r| Skin                    = \r| NumberOfLimbs           = \r| NumberOfFingers         = \r| NumberOfToes            = \r| SpecialAdaptations      = \r| UnusualFeatures         = \r\r| Origin                  = \r| GalaxyOfOrigin          = \r| StarSystemOfOrigin      = \r| HomePlanet              = \r| PlaceOfBirth            = \r| Creators                = \r| First                   = \r\r| HistoryText             = \r\r| Habitat                 = \r| Gravity                 = \r| Atmosphere              = \r| Population              = \r\r| Powers                  = \r| Abilities               = \r| AvgStrength             = \r| Weaknesses              = \r\r| GovernmentType          = \r| TechnologyLevel         = \r| CulturalTraits          = \r| Representatives         = \r\r| Notes                   = \r| Trivia                  = \r| Links                   = \r\}\}",
        sampleText: ""
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        imageFile: "https://images.wikia.nocookie.net/marveldatabase/images/e/ee/Episode_Button.png",
        speedTip: "Insert episode template",
        tagOpen: "\{\{Image Comics:Episode Template\r| Image               = ",
        tagClose: "\r| Month               = \r| Day                 = \r| Year                = \r\r| Director1_1         = \r| Producer1_1         = \r| Writer1_1           = \r\r| PreviousEpisode     = \r| NextEpisode         = \r\r| Quotation           = \r| Speaker             = \r\r| EpisodeTitle        = \r| Synopsis            = \r\r| Appearing           = \r'''Featured Characters:'''\r* <br/>\r'''Supporting Characters:'''\r* <br/>\r'''Adversaries:'''\r* <br/>\r'''Other Characters:'''\r* <br/>\r'''Locations:'''\r* <br/>\r'''Items:'''\r* <br/>\r'''Vehicles:'''\r* <br/>\r\r| Notes               = \r| Trivia              = \r| Recommended         = \r| Links               = \r\}\}",
        sampleText: ""
    };
    
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        imageFile: "https://images.wikia.nocookie.net/marveldatabase/images/1/12/Reality_Button.png",
        speedTip: "Insert Universe Main template",
        tagOpen: "\{\{Universe Main\r| Image               = ",
        tagClose: "\r| Slider              = \r\r| Description         = \r\r| Synopsis            = \r\r| Creators            = \r| Writers             = \r| Pencilers           = \r| Inkers              = \r| Colourists          = \r| Letterers           = \r\r| MainChar1           = \r| MainChar1Link       = \r| MainChar1Image      = \r| MainChar1HO         = \r\r| MainChar2           = \r| MainChar2Link       = \r| MainChar2Image      = \r| MainChar2HO         = \r\r| MainChar3           = \r| MainChar3Link       = \r| MainChar3Image      = \r| MainChar3HO         = \r\r| MainChar4           = \r| MainChar4Link       = \r| MainChar4Image      = \r| MainChar4HO         = \r\r| MainChar5           = \r| MainChar5Link       = \r| MainChar5Image      = \r| MainChar5HO         = \r\r| MainVil1            = \r| MainVil1Link        = \r| MainVil1Image       = \r| MainVil1HO          = \r\r| MainVil2            = \r| MainVil2Link        = \r| MainVil2Image       = \r| MainVil2HO          = \r\r| MainVil3            = \r| MainVil3Link        = \r| MainVil3Image       = \r| MainVil3HO          = \r\r| MainVil4            = \r| MainVil4Link        = \r| MainVil4Image       = \r| MainVil4HO          = \r\r| MainVil5            = \r| MainVil5Link        = \r| MainVil5Image       = \r| MainVil5HO          = \r\r| StartPoints         = \r| SingleIssues        = \r| Events              = \r\r| Notes               = \r| Trivia              = \r| Recommended         = \r| Links               = \r\}\}",
        sampleText: ""
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        imageFile: "https://images.wikia.nocookie.net/marveldatabase/images/3/3e/Staff_Button.png",
        speedTip: "Insert staff template",
        tagOpen: "\{\{Staff Template\r| Image                   = ",
        tagClose: "\r| RealName                = \r| Pseudonyms              = \r| Employers               = \r| Titles                  = \r\r| Gender                  = \r| YearOfBirth             = \r| MonthOfBirth            = \r| DayOfBirth              = \r| CityOfBirth             = \r| StateOfBirth            = \r| CountryOfBirth          = \r| Creations               = \r| First                   = \r\r| PersonalHistory         = \r| ProfessionalHistory     = \r\r| Notes                   = \r| Trivia                  = \r| OfficialWebsite         = \r| Links                   = \r\}\}",
        sampleText: ""
    };
}

importArticles({
    type: 'script',
    articles: [
        // ...
        'w:c:dev:ReferencePopups/code.js',
        // ...
    ]
});