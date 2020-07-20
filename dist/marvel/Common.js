/* CAUTION: Any JavaScript here will be loaded for all users on every page load. */

/* 
////////////////////////////////////////////////////////////////////
// Reference hover-over pop-ups
////////////////////////////////////////////////////////////////////
*/
importScriptPage('ReferencePopups/code.js', 'dev');
((window.dev = window.dev || {}).ReferencePopups = dev.ReferencePopups || {}).lockdown = true;


/* 
////////////////////////////////////////////////////////////////////
// Facebook box
////////////////////////////////////////////////////////////////////
*/
function fBox() {
    $('#fbox').append('<iframe scrolling="no" height="550" frameborder="0" align="top" width="330" src="https://www.facebook.com/connect/connect.php?id=208174206745&amp;connections=30" marginwidth="0" marginheight="0"></iframe>');
}
$(fBox);


/* 
////////////////////////////////////////////////////////////////////
// Twitter Follow Button
////////////////////////////////////////////////////////////////////
*/
function addTwitterButton() {
   $('#twitter-button').append('<a href="https://twitter.com/marveldatabase" class="twitter-follow-button" data-show-count="true" data-show-screen-name="false">Follow @MarvelDatabase</a><script src="https://platform.twitter.com/widgets.js" type="text/javascript"></script>');
}
$(addTwitterButton);

/* 
////////////////////////////////////////////////////////////////////
// Google+ and YouTube elements
////////////////////////////////////////////////////////////////////
*/
importScriptPage('PlusOneButton/code.js', 'dev');

/* 
////////////////////////////////////////////////////////////////////
// SpoilerAlert
// documentation at: https://dev.wikia.com/wiki/SpoilerAlert
// © Peter Coester, 2012
// 
// __NOWYSIWYG__
////////////////////////////////////////////////////////////////////
*/
(function () {
    var cats = mw.config.get('wgCategories'),
        spoiler = $.inArray('Spoilers', cats) !== -1,
        mature  = $.inArray('Mature content',cats) !== -1;
    window.SpoilerAlert = {};
    window.SpoilerAlert.isSpoiler = function () {    
        return spoiler || mature;
    };
    if (mature && spoiler) {
        window.SpoilerAlert.question = 'This page may contain spoilers about unreleased or newly released stories. It also contains mature content that may not be suitable for all users. Are you absolutely sure you want to read it?';
    } else if (mature) {
        window.SpoilerAlert.question = 'This page may contain mature content that may not be suitable for all users. Are you absolutely sure you want to read it?';
    } else if (spoiler) {
        window.SpoilerAlert.question = 'This page may contain spoilers about unreleased or newly released stories. Are you absolutely sure you want to read it?';
    }
}());
importScriptPage('SpoilerAlert/code.js', 'dev');


/* 
////////////////////////////////////////////////////////////////
// THE BELOW CODE HELPS MAKE THE NAVIGATION TEMPLATE COLLAPSIBLE
////////////////////////////////////////////////////////////////
*/
importScriptPage('ShowHide/code.js', 'dev');


/*
/////////////////////////////////////////////////////////////////////////////////
// Changing the Link from Special:CreatePage to Marvel Database:Create a New Page
/////////////////////////////////////////////////////////////////////////////////
*/
function createPage(){
	var createPageLink = document.getElementById('dynamic-links-write-article-icon');
	if (createPageLink !== null){
		createPageLink.href = "/wiki/Marvel_Database:Create_a_New_Page";
                createPageLink.onclick = "";
	}
	createPageLink = document.getElementById('dynamic-links-write-article-link');
	if (createPageLink !== null){
		createPageLink.href = "/wiki/Marvel_Database:Create_a_New_Page";
                createPageLink.onclick = "";
	}
}

addOnloadHook(createPage);


/* 
/////////////////////////////////////////////////////////////////
// THE BELOW CODE HELPS MAKE THE DROPDOWN FOR MEDIAWIKI:EDITTOOLS
/////////////////////////////////////////////////////////////////
*/
function addLoadEvent(func) 
{
  if (window.addEventListener) 
    window.addEventListener("load", func, false);
  else if (window.attachEvent) 
    window.attachEvent("onload", func);
}

//use both names for it, for Wikipedia compatability (just in case)
function addOnloadHook(f) {
  addLoadEvent(f);
}

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
////////////////////////////////////////////////////////////////////
// JS FOR FINDING DUPLICATE IMAGES ON THE SITE
////////////////////////////////////////////////////////////////////
*/
dil = new Array();
function findDupImages(gf) {
output = "";
url = "/api.php?action=query&generator=allimages&prop=duplicatefiles&gailimit=500&format=json";
if (gf) url += "&gaifrom=" + gf;
$.getJSON(url,function (data) {
if (data.query) {
pages = data.query.pages;
for (pageID in pages) {
dils = ","+dil.join();
if (dils.indexOf(","+pages[pageID].title) == -1 && pages[pageID].title.indexOf("File::") == -1 && pages[pageID].duplicatefiles) {
output += "<h3><a href='/" + pages[pageID].title + "'>"+pages[pageID].title+"</a></h3>\n<ul>\n";
for (x=0;x<pages[pageID].duplicatefiles.length;x++) {
output += "<li><a href='/File:" + pages[pageID].duplicatefiles[x].name + "'>File:"+pages[pageID].duplicatefiles[x].name+"</a></li>\n";
dil.push("File:"+pages[pageID].duplicatefiles[x].name.replace(/_/g," "));
}
output += "</ul>\n\n";
}
}
$("#mw-dupimages").append(output);
if (data["query-continue"]) setTimeout("findDupImages('"+data["query-continue"].allimages.gaifrom+"');",5000);
}
});
}
$(function () { if ($("#mw-dupimages").length) findDupImages(); });



/*
////////////////////////////////////////////////////////////////////
// Release date sortkey display script by User:Bobogoobo (from https://community.wikia.com/wiki/Thread:918005)
////////////////////////////////////////////////////////////////////
*/
$(function() {
    if (!(
        mw.config.get('wgCanonicalNamespace') === 'Category' &&
        ['Appearances', 'Mentions'].indexOf(mw.config.get('wgPageName').split('/').slice(-1)[0]) !== -1
    )) {
        return;
    }
 
    // API requires titles 50 at a time, will be 200 titles per category page
    var requests,
        $links = $('#mw-pages').find('table').find('a');
        pages = $links.toArray().map(function(value) {
            return encodeURIComponent($(value).attr('title'));
        });
    requests = [pages.slice(0, 50), pages.slice(50, 100), pages.slice(100, 150), pages.slice(150)];
    $.each(requests, function(index, value) {
        $.getJSON(
            '/api.php?action=query&prop=pageprops&ppprop=defaultsort&format=json&titles=' + value.join('|'),
            function(data) {
                data = data.query.pages;
                $.each(Object.keys(data), function(idx, val) {
                    if (!data[val].pageprops) {
                        return true;// continue
                    }
                    var sort = data[val].pageprops.defaultsort,
                        title = data[val].title;
                        date = sort.match(/\d{8}/);
                    if (date) {
                        $links.filter('[title="' + title + '"]').after(
                            ' (' + date[0].replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3') + ')'
                        );
                    }
                });
            }
        );
    });
});


/* 
////////////////////////////////////////////////////////////////////
// THE BELOW CODE ADDS CUSTOM BUTTONS TO THE JAVASCRIPT EDIT TOOLBAR
////////////////////////////////////////////////////////////////////
*/

if ( window.mwCustomEditButtons ) {
   mwCustomEditButtons.push( {
     "imageFile": "https://images.wikia.nocookie.net/central/images/c/c8/Button_redirect.png",
     "speedTip": "Redirect",
     "tagOpen": "#REDIRECT [[",
     "tagClose": "]]",
     "sampleText": "Insert text"} );
 
   mwCustomEditButtons.push( {
     "imageFile": "https://images.wikia.nocookie.net/marvel_dc/images/3/3e/Small_Button.png",
     "speedTip": "Small",
     "tagOpen": "<small>",
     "tagClose": "</small>",
     "sampleText": "Insert text"} );

  mwCustomEditButtons.push( {
     "imageFile": "https://images.wikia.nocookie.net/central/images/c/c9/Button_strike.png",
     "speedTip": "Strike",
     "tagOpen": "<s>",
     "tagClose": "</s>",
     "sampleText": "Strike-through text"} );
 
   mwCustomEditButtons.push( {
     "imageFile": "https://images.wikia.nocookie.net/central/images/1/13/Button_enter.png",
     "speedTip": "Line break",
     "tagOpen": "<br />",
     "tagClose": "",
     "sampleText": ""} );

   mwCustomEditButtons.push( {
     "imageFile": "https://images.wikia.nocookie.net/central/images/7/74/Button_comment.png",
     "speedTip": "Comment visible only for editors",
     "tagOpen": "<!-- ",
     "tagClose": " -->",
     "sampleText": "Insert comment here"} );

   mwCustomEditButtons.push( {
     "imageFile": "https://images.wikia.nocookie.net/marveldatabase/images/2/29/Character_Button.png",
     "speedTip": "Insert character template",
     "tagOpen": "{{Marvel Database:Character Template\r| Image                   = ",
     "tagClose": "\r| RealName                = \r| CurrentAlias            = \r| Aliases                 = \r| Identity                = \r| Affiliation             = \r| Relatives               = \r| Universe                = \r| BaseOfOperations        = \r\r| Gender                  = \r| Height                  = \r| Weight                  = \r| Eyes                    = \r| Hair                    = \r| UnusualFeatures         = \r\r| Citizenship             = \r| MaritalStatus           = \r| Occupation              = \r| Education               = \r\r| Origin                  = \r| PlaceOfBirth            = \r| Creators                = \r| First                   = \r\r| HistoryText             = \r\r| Personality             = \r\r| Powers                  = \r| Abilities               = \r| Strength                = \r| Weaknesses              = \r\r| Equipment               = \r| Transportation          = \r| Weapons                 = \r\r| Notes                   = \r| Trivia                  = \r| Marvel                  = \r| Wikipedia               = \r| Links                   = \r}}",
     "sampleText": ""} );

   mwCustomEditButtons.push( {
     "imageFile": "https://images.wikia.nocookie.net/marveldatabase/images/3/3a/Comic_Button.png",
     "speedTip": "Insert comic template",
     "tagOpen": "{{Marvel Database:Comic Template\r| Image               = ",
     "tagClose": "\r| Image2              = \r| Image2Text          = \r| Month               = \r| Year                = \r| ReleaseDate         = \r| Pages               = \r| Rating              = \r| OriginalPrice       = \r\r| Editor-in-Chief     = \r| CoverArtist1        = \r| Production1_1       = \r| Publisher1_1        = \r| CCO                 = \r| President1_1        = \r\r| Quotation           = \r| Speaker             = \r\r| StoryTitle1         = \r| Writer1_1           = \r| Penciler1_1         = \r| Inker1_1            = \r| Colourist1_1        = \r| Letterer1_1         = \r| Editor1_1           = \r\r|  Appearing1         = \r'''Featured Characters:'''\r* <br/>\r'''Supporting Characters:'''\r* <br/>\r'''Antagonists:'''\r* <br/>\r'''Other Characters:'''\r* <br/>\r'''Races and Species:'''\r* <br/>\r'''Locations:'''\r* <br/>\r'''Items:'''\r* <br/>\r'''Vehicles:'''\r* <br/>\r\r| Synopsis1           = \r\r| Solicit             = \r\r| Notes               = \r| Trivia              = \r| Recommended         = \r| Links               = \r}}",
     "sampleText": ""} );

   mwCustomEditButtons.push( {
     "imageFile": "https://images.wikia.nocookie.net/marveldatabase/images/8/88/Comic_List.png",
     "speedTip": "Insert Comic Volume template",
     "tagOpen": "{{Marvel Database:Volume Template\r| VolumeLogo              = \r| PreviousVol             = \r| NextVol                 = \r| Publisher               = \r| Type                    = \r| Creators                = \r| Featured                = \r| Crossovers              = \r| IssueList               = \r<gallery position=\"center\" captionalign=\"center\">\r",
     "tagClose": "\r\r</gallery>\r\r| SeeAlso                 =  \r\r}}",
     "sampleText": ""} );

   mwCustomEditButtons.push( {
     "imageFile": "https://images.wikia.nocookie.net/marveldatabase/images/5/5d/Team_Button.png",
     "speedTip": "Insert team template",
     "tagOpen": "{{Marvel Database:Team Template\r| Image                   = ",
     "tagClose": "\r| OfficialName            = \r| EditorialNames          = \r| Aliases                 = \r\r| Status                  = \r| Identity                = \r| Universe                = \r| BaseOfOperations        = \r\r| TeamLeaders             = \r| CurrentMembers          = \r| FormerMembers           = \r| Allies                  = \r| Enemies                 = \r\r| Origin                  = \r| PlaceOfFormation        = \r| PlaceOfDefunction       = \r| Creators                = \r| First                   = \r| Last                    = \r\r| HistoryText             = \r\r| Equipment               = \r| Transportation          = \r| Weapons                 = \r\r| Notes                   = \r| Trivia                  = \r| Links                   = \r}}",
     "sampleText": ""} );

   mwCustomEditButtons.push( {
     "imageFile": "https://images.wikia.nocookie.net/marveldatabase/images/f/f2/Location_Button.png",
     "speedTip": "Insert location template",
     "tagOpen": "{{Marvel Database:Location Template\r| Image                   = ",
     "tagClose": "\r| OfficialName            = \r| Aliases                 = \r\r| Universe                = \r| Galaxy                  = \r| StarSystem              = \r| Planet                  = \r| Continent               = \r| Country                 = \r| Region                  = \r| State                   = \r| City                    = \r| Locale                  = \r\r| Population              = \r| Creators                = \r| First                   = \r\r| HistoryText             = \r\r| PointsOfInterest        = \r| Residents               = \r\r| Notes                   = \r| Trivia                  = \r| Links                   = \r}}",
     "sampleText": ""} );

   mwCustomEditButtons.push( {
     "imageFile": "https://images.wikia.nocookie.net/marveldatabase/images/2/20/Vehicle_Button.png",
     "speedTip": "Insert vehicle template",
     "tagOpen": "{{Marvel Database: Vehicle Template\r| Image                   = ",
     "tagClose": "\r| OfficialName            = \r| Title                   = \r| Nicknames               = \r| Universe                = \r| Status                  = \r| CurrentModel            = \r| CurrentOwner            = \r| TransportMethod         = \r| Dimensions              = \r| Creators                = \r| Origin                  = \r| First                   = \r\r| HistoryText             = \r\r| Notes                   = \r| Trivia                  = \r| Links                   = \r}}",
     "sampleText": ""} );

   mwCustomEditButtons.push( {
     "imageFile": " https://images.wikia.nocookie.net/marveldatabase/images/0/02/Eyetem_Button.png",
     "speedTip": "Insert item template",
     "tagOpen": "{{Marvel Database: Item Template\r| Image                   = ",
     "tagClose": "\r| OfficialName            = \r| Aliases                 = \r| Model                   = \r| Version                 = \r\r| Universe                = \r| LeadDesigner            = \r| AdditionalDesigners     = \r| PlaceOfCreation         = \r| PlaceOfDestruction      = \r| Origin                  = \r\r| Dimensions              = \r| Weight                  = \r| Creators                = \r| First                   = \r\r| HistoryText             = \r\r| CurrentOwner            = \r| PreviousOwners          = \r\r| Notes                   = \r| Trivia                  = \r| Links                   = \r}}",
     "sampleText": ""} );

   mwCustomEditButtons.push( {
     "imageFile": "https://images.wikia.nocookie.net/marveldatabase/images/5/5a/Images_Button.png",
     "speedTip": "Insert gallery template",
     "tagOpen": "{{Marvel Database:Gallery Template\r| GalleryType             = \r| GalleryData             = \r<gallery position=\"center\" captionalign=\"center\">\r",
     "tagClose": "\r</gallery>\r| SeeAlso                 = \r}}",
     "sampleText": ""} );

   mwCustomEditButtons.push( {
     "imageFile": "https://images.wikia.nocookie.net/marveldatabase/images/d/dc/Image_Button.png",
     "speedTip": "Insert image template",
     "tagOpen": "{{Marvel Database:Image Template\r| License                 = ",
     "tagClose": "\r| ImageType               = \r| Description             = \r\r| Source                  = \r| Permission              = \r| Issue                   = \r\r| Universe                = \r| Subject1                = \r| Subject2                = \r| Subject3                = \r| Subject4                = \r| Subject5                = \r\r| CoverArtist1            = \r| Penciler1               = \r| Inker1                  = \r| Colourist1              = \r| Letterer1               = \r\r| Notes                   = \r| Trivia                  = \r}}",
     "sampleText": ""} );

   mwCustomEditButtons.push( {
     "imageFile": "https://images.wikia.nocookie.net/marveldatabase/images/2/2c/Race_Button.png",
     "speedTip": "Insert race template",
     "tagOpen": "{{Marvel Database:Race Template\r| Image                   = ",
     "tagClose": "\r| Name                    = \r| Aliases                 = \r| Identity                = \r| Affiliation             = \r| Universe                = \r| BaseOfOperations        = \r\r| BodyType                = \r| AvgHeight               = \r| AvgWeight               = \r| Eyes                    = \r| Hair                    = \r| Skin                    = \r| NumberOfLimbs           = \r| NumberOfFingers         = \r| NumberOfToes            = \r| SpecialAdaptations      = \r| UnusualFeatures         = \r\r| Origin                  = \r| GalaxyOfOrigin          = \r| StarSystemOfOrigin      = \r| HomePlanet              = \r| PlaceOfBirth            = \r| Creators                = \r| First                   = \r\r| HistoryText             = \r\r| Habitat                 = \r| Gravity                 = \r| Atmosphere              = \r| Population              = \r\r| Powers                  = \r| Abilities               = \r| AvgStrength             = \r| Weaknesses              = \r\r| GovernmentType          = \r| TechnologyLevel         = \r| CulturalTraits          = \r| Representatives         = \r\r| Notes                   = \r| Trivia                  = \r| Links                   = \r}}",
     "sampleText": ""} );

   mwCustomEditButtons.push( {
     "imageFile": "https://images.wikia.nocookie.net/marveldatabase/images/1/12/Reality_Button.png",
     "speedTip": "Insert reality template",
     "tagOpen": "{{Marvel Database:Reality Template\r| Image                   = ",
     "tagClose": "\r| EarthNumber             = \r| Title                   = \r| Aliases                 = \r| Status                  = \r\r| Creators                = \r| First                   = \r\r| History                 = \r\r| Residents               = \r| Notes                   = \r| Trivia                  = \r| Links                   = \r}}",
     "sampleText": ""} );

   mwCustomEditButtons.push( {
     "imageFile": "https://images.wikia.nocookie.net/marveldatabase/images/e/ee/Episode_Button.png",
     "speedTip": "Insert episode template",
     "tagOpen": "{{Marvel Database:Episode Template\r| Image               = ",
     "tagClose": "\r| Month               = \r| Year                = \r\r| Director            = \r| Producer1_1         = \r| Writer1_1           = \r\r| Quotation           = \r| Speaker             = \r\r| EpisodeTitle        = \r| Synopsis            = \r\r| Appearing           = \r'''Featured Characters:'''\r* <br/>\r'''Supporting Characters:'''\r* <br/>\r'''Antagonists:'''\r* <br/>\r'''Other Characters:'''\r* <br/>\r'''Locations:'''\r* <br/>\r'''Items:'''\r* <br/>\r'''Vehicles:'''\r* <br/>\r\r| Notes               = \r| Trivia              = \r| Recommended         = \r| Links               = \r}}",
     "sampleText": ""} );

   mwCustomEditButtons.push( {
     "imageFile": "https://images.wikia.nocookie.net/marveldatabase/images/3/3e/Staff_Button.png",
     "speedTip": "Insert marvel staff template",
     "tagOpen": "{{Marvel Database:Staff Template\r| Image                   = ",
     "tagClose": "\r| RealName                = \r| Pseudonyms              = \r| Employers               = \r| Titles                  = \r\r| Gender                  = \r| YearOfBirth             = \r| MonthOfBirth            = \r| DayOfBirth              = \r| CityOfBirth             = \r| StateOfBirth            = \r| CountryOfBirth          = \r| Creations               = \r| First                   = \r\r| PersonalHistory         = \r| ProfessionalHistory     = \r\r| Notes                   = \r| Trivia                  = \r| OfficialWebsite         = \r| Links                   = \r}}",
     "sampleText": ""} );
}