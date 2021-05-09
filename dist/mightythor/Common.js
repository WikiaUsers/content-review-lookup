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

var customizeToolbar = function () {
/* Strike-through text */
$( '#wpTextbox1' ).wikiEditor( 'addToToolbar', {
section: 'main',
group: 'format',
tools: {
"strike": {
label: 'Strike-through text',
type: 'button',
icon: 'https://images.wikia.nocookie.net/central/images/c/c9/Button_strike.png',
action: {
type: 'encapsulate',
options: {
pre: "<s>",
post: "</s>"
}
}
}
}
} );
/* Comment */
$( '#wpTextbox1' ).wikiEditor( 'addToToolbar', {
section: 'main',
group: 'format',
tools: {
"comment": {
label: 'Comment',
type: 'button',
icon: 'https://images.wikia.nocookie.net/central/images/7/74/Button_comment.png',
action: {
type: 'encapsulate',
options: {
pre: "<!-- ",
post: " -->"
}
}
}
}
} );
/* subst:Cat */
$( '#wpTextbox1' ).wikiEditor( 'addToToolbar', {
section: 'main',
group: 'insert',
tools: {
"cat": {
label: 'Quick categorization',
type: 'button',
icon: 'https://upload.wikimedia.org/wikipedia/commons/b/b4/Button_category03.png',
action: {
type: 'encapsulate',
options: {
pre: "{{subst:Cat",
post: "}}"
}
}
}
}
} );
/*-------- INFOBOXES --------*/
$( '#wpTextbox1' ).wikiEditor( 'addToToolbar', {
section: 'advanced',
groups: {
"infoboxes": {
'label': 'Infoboxes'
}
}
} );
/* Character */
$( '#wpTextbox1' ).wikiEditor( 'addToToolbar', {
section: 'advanced',
group: 'infoboxes',
tools: {
"character": {
label: 'Character',
type: 'button',
icon: 'https://images.wikia.nocookie.net/marveldatabase/images/2/29/Character_Button.png',
action: {
type: 'encapsulate',
options: {
pre: "{{Marvel Database:Character Template\r| Image                   = ",
post: "\r| RealName                = \r| CurrentAlias            = \r| Aliases                 = \r| Identity                = \r| Affiliation             = \r| Relatives               = \r| Universe                = \r| BaseOfOperations        = \r\r| Gender                  = \r| Height                  = \r| Weight                  = \r| Eyes                    = \r| Hair                    = \r| UnusualFeatures         = \r\r| Citizenship             = \r| MaritalStatus           = \r| Occupation              = \r| Education               = \r\r| Origin                  = \r| PlaceOfBirth            = \r| Creators                = \r| First                   = \r| Death                   = \r| PlaceOfDeath            = \r| CauseOfDeath            = \r| KilledBy                = \r\r| HistoryText             = \r\r| Powers                  = \r| Abilities               = \r| Strength                = \r| Weaknesses              = \r\r| Equipment               = \r| Transportation          = \r| Weapons                 = \r\r| Notes                   = \r| Trivia                  = \r| Marvel                  = \r| Wikipedia               = \r| Links                   = \r}}"
}
}
}
}
} );
/* Team */
$( '#wpTextbox1' ).wikiEditor( 'addToToolbar', {
section: 'advanced',
group: 'infoboxes',
tools: {
"team": {
label: 'Team',
type: 'button',
icon: 'https://images.wikia.nocookie.net/marveldatabase/images/5/5d/Team_Button.png',
action: {
type: 'encapsulate',
options: {
pre: "{{Marvel Database:Team Template\r| Image                   = ",
post: "\r| OfficialName            = \r| Aliases                 = \r\r| Universe                = \r| Status                  = \r| Identity                = \r| Affiliation             = \r| BaseOfOperations        = \r\r| TeamLeaders             = \r| CurrentMembers          = \r| FormerMembers           = \r| Allies                  = \r| Enemies                 = \r\r| Origin                  = \r| PlaceOfFormation        = \r| PlaceOfDefunction       = \r| Creators                = \r| First                   = \r| Last                    = \r\r| HistoryText             = \r\r| Equipment               = \r| Transportation          = \r| Weapons                 = \r\r| Notes                   = \r| Trivia                  = \r| Links                   = \r}}"
}
}
}
}
} );
/* Location */
$( '#wpTextbox1' ).wikiEditor( 'addToToolbar', {
section: 'advanced',
group: 'infoboxes',
tools: {
"location": {
label: 'Location',
type: 'button',
icon: 'https://images.wikia.nocookie.net/marveldatabase/images/f/f2/Location_Button.png',
action: {
type: 'encapsulate',
options: {
pre: "{{Marvel Database:Location Template\r| Image                   = ",
post: "\r| OfficialName            = \r| Aliases                 = \r\r| Status                  =  \r| Preceded                = \r| Succeeded               = \r\r| Capital                 = \r| Demonym                 = \r| Area                    = \r| Population              = \r| Language                = \r| Religion                = \r| Government              = \r| RulerLabel              = \r| Ruler                   = \r| Currency                = \r\r| Universe                = Earth-\r| Dimension               = \r| Galaxy                  = \r| StarSystem              = \r| Planet                  = \r| Continent               = \r| Country                 = \r| State                   = \r| Province                = \r| Territory               = \r| Region                  = \r| District                = \r| Prefecture              = \r| Division                = \r| City                    = \r| Locale                  = \r\r| Creators                = \r| First                   = \r| Last                    = \r| Destruction             = \r\r| HistoryText             = \r\r| PointsOfInterest        = \r| Residents               = \r\r| MajorResources          = \r| NationalDefense         = \r| InternationalRelations  = \r| ExtTerrestrialRelations = \r| DomesticCrime           = \r| InternationalCrime      = \r\r| Notes                   = \r| Trivia                  = \r| Links                   = \r}}"
}
}
}
}
} );
/* Item */
$( '#wpTextbox1' ).wikiEditor( 'addToToolbar', {
section: 'advanced',
group: 'infoboxes',
tools: {
"item": {
label: 'Item',
type: 'button',
icon: 'https://upload.wikimedia.org/wikipedia/commons/7/79/Button_bombe.png',
action: {
type: 'encapsulate',
options: {
pre: "{{Marvel Database:Item Template\r| Image                   = ",
post: "\r| OfficialName            = \r| Aliases                 = \r| Type                    = \r| Material                = \r| Model                   = \r| Version                 = \r| Dimensions              = \r| Weight                  = \r| Properties              = \r\r| Universe                = \r| LeadDesigner            = \r| AdditionalDesigners     = \r| PlaceOfCreation         = \r| PlaceOfDestruction      = \r| Origin                  = \r\r| Dimensions              = \r| Weight                  = \r| Creators                = \r| First                   = \r\r| CurrentOwner            = \r| PreviousOwners          = \r| AlternateOwners         = \r| AlternateVersions       = \r\r| HistoryText             = \r\r| Notes                   = \r| Trivia                  = \r| Links                   = \r}}"
}
}
}
}
} );
/* Reality */
$( '#wpTextbox1' ).wikiEditor( 'addToToolbar', {
section: 'advanced',
group: 'infoboxes',
tools: {
"reality": {
label: 'Reality',
type: 'button',
icon: 'https://images.wikia.nocookie.net/marveldatabase/images/1/12/Reality_Button.png',
action: {
type: 'encapsulate',
options: {
pre: "{{Marvel Database:Reality Template\r| Image                   = ",
post: "\r| EarthNumber             = \r| Title                   = \r| Aliases                 = \r| Status                  = \r\r| Creators                = \r| First                   = \r\r| History                 = \r\r| Residents               = \r| Notes                   = \r| Trivia                  = \r| Links                   = \r}}"
}
}
}
}
} );
/* Race */
$( '#wpTextbox1' ).wikiEditor( 'addToToolbar', {
section: 'advanced',
group: 'infoboxes',
tools: {
"race": {
label: 'Race',
type: 'button',
icon: 'https://vignette.wikia.nocookie.net/emperors-domination/images/a/a5/Button_Race.png',
action: {
type: 'encapsulate',
options: {
pre: "{{Marvel Database:Race Template\r| Image                   = ",
post: "\r| Name                    = \r| Aliases                 = \r| Identity                = \r| Affiliation             = \r| Universe                = \r| BaseOfOperations        = \r\r| BodyType                = \r| AvgHeight               = \r| AvgWeight               = \r| Eyes                    = \r| NumberOfEyes            = \r| Hair                    = \r| Skin                    = \r| NumberOfLimbs           = \r| NumberOfFingers         = \r| NumberOfToes            = \r| SpecialAdaptations      = \r| UnusualFeatures         = \r\r| Origin                  = \r| GalaxyOfOrigin          = \r| StarSystemOfOrigin      = \r| HomePlanet              = \r| PlaceOfBirth            = \r| Creators                = \r| First                   = \r\r| HistoryText             = \r\r| Habitat                 = \r| Gravity                 = \r| Atmosphere              = \r| Population              = \r\r| Powers                  = \r| Abilities               = \r| AvgStrength             = \r| Weaknesses              = \r\r| GovernmentType          = \r| TechnologyLevel         = \r| CulturalTraits          = \r| Representatives         = \r\r| Notes                   = \r| Trivia                  = \r| Links                   = \r}}"
}
}
}
}
} );
/* Vehicle */
$( '#wpTextbox1' ).wikiEditor( 'addToToolbar', {
section: 'advanced',
group: 'infoboxes',
tools: {
"vehicle": {
label: 'Vehicle',
type: 'button',
icon: 'https://images.wikia.nocookie.net/marveldatabase/images/2/20/Vehicle_Button.png',
action: {
type: 'encapsulate',
options: {
pre: "{{Marvel Database:Vehicle Template\r| Image                   = ",
post: "\r| OfficialName            = \r| Title                   = \r| Nicknames               = \r| Universe                = \r| Status                  = \r| CurrentModel            = \r| CurrentOwner            = \r| PreviousOwners          = \r| TransportMethod         = \r| Dimensions              = \r| Creators                = \r| Origin                  = \r| First                   = \r\r| HistoryText             = \r\r| Capabilities            = \r| Weapons                 = \r| Equipment               = \r\r| Notes                   = \r| Trivia                  = \r| Links                   = \r}}"
}
}
}
}
} );
/* Comic */
$( '#wpTextbox1' ).wikiEditor( 'addToToolbar', {
section: 'advanced',
group: 'infoboxes',
tools: {
"comic": {
label: 'Comic issue',
type: 'button',
icon: 'https://images.wikia.nocookie.net/marveldatabase/images/3/3a/Comic_Button.png',
action: {
type: 'encapsulate',
options: {
pre: "{{Marvel Database:Comic Template\r| Image               = ",
post: "\r| Month               = \r| Year                = \r| ReleaseDate         = \r| Solicit             = \r\r| Editor-in-Chief     = \r| CoverArtist1        = \r\r| Writer1_1           = \r| Penciler1_1         = \r| Inker1_1            = \r| Colourist1_1        = \r| Letterer1_1         = \r| Editor1_1           = \r\r| Quotation           = \r| Speaker             = \r\r| StoryTitle1         = \r| Synopsis1           = \r\r|  Appearing1         = \r'''Featured Characters:'''\r* <br/>\r'''Supporting Characters:'''\r* <br/>\r'''Villains:'''\r* <br/>\r'''Other Characters:'''\r* <br/>\r'''Locations:'''\r* <br/>\r'''Items:'''\r* <br/>\r'''Vehicles:'''\r* <br/> \r\r| Notes               = \r| Trivia              = \r| Recommended         = \r| Links               = \r| MarvelUnlimited     = \r| Comixology          = \r}}"
}
}
}
}
} );
/* Volume */
$( '#wpTextbox1' ).wikiEditor( 'addToToolbar', {
section: 'advanced',
group: 'infoboxes',
tools: {
"volume": {
label: 'Volume',
type: 'button',
icon: 'https://images.wikia.nocookie.net/marveldatabase/images/8/88/Comic_List.png',
action: {
type: 'encapsulate',
options: {
pre: "{{Marvel Database:Volume Template\r| volume_logo             = \r| PreviousVol             = \r| NextVol                 = \r| publisher               = Marvel Comics\r| main_volume             = \r| status                  = Active; Canceled; Finished; Announced\r| format                  = Limited Series; Ongoing Series; One Shot; Annual; Handbook; TPB\r| type                    = Solo; Team; Team-Up; Event; Adaptation\r| genres                  = Superhero\r| featured                = \r\r| SeeAlso                 = \r| MarvelUnlimited         = \r| Comixology              = \r\r",
post: "}}"
}
}
}
}
} );
/* Image */
$( '#wpTextbox1' ).wikiEditor( 'addToToolbar', {
section: 'advanced',
group: 'infoboxes',
tools: {
"image": {
label: 'Power',
type: 'button',
icon: 'https://images.wikia.nocookie.net/marveldatabase/images/d/dc/Image_Button.png',
action: {
type: 'encapsulate',
options: {
pre: "<includeonly>{{Power Grid\r| Reference         = ",
post: "\r| Intelligence      = \r\| Strength          = \r| Speed             = \r\| Durability        = \r| Energy Projection = \r| Fighting Skills   = \r}}</includeonly>"
}
}
}
}
} );
/* Gallery */
$( '#wpTextbox1' ).wikiEditor( 'addToToolbar', {
section: 'advanced',
group: 'infoboxes',
tools: {
"gallery": {
label: 'Gallery',
type: 'button',
icon: 'https://images.wikia.nocookie.net/marveldatabase/images/5/5a/Images_Button.png',
action: {
type: 'encapsulate',
options: {
pre: "{{Marvel Database:Gallery Template\r| GalleryType             = \r| GalleryData             = \r<gallery position=\"center\" captionalign=\"center\">\r",
post: "\r</gallery>\r| SeeAlso                 = \r}}"
}
}
}
}
} );
/* Episode */
$( '#wpTextbox1' ).wikiEditor( 'addToToolbar', {
section: 'advanced',
group: 'infoboxes',
tools: {
"episode": {
label: 'Episode',
type: 'button',
icon: 'https://images.wikia.nocookie.net/marveldatabase/images/e/ee/Episode_Button.png',
action: {
type: 'encapsulate',
options: {
pre: "{{Marvel Database:Episode Template\r| Image               = ",
post: "\r| Month               = \r| Year                = \r\r| Director            = \r| Producer1_1         = \r| Writer1_1           = \r\r| Quotation           = \r| Speaker             = \r\r| EpisodeTitle        = \r| Synopsis            = \r\r| Appearing           = \r'''Featured Characters:'''\r* <br/>\r'''Supporting Characters:'''\r* <br/>\r'''Villains:'''\r* <br/>\r'''Other Characters:'''\r* <br/>\r'''Locations:'''\r* <br/>\r'''Items:'''\r* <br/>\r'''Vehicles:'''\r* <br/>\r\r| Character1          = \r| Actor1              = \r\r| Notes               = \r| Trivia              = \r| Recommended         = \r| Links               = \r}}"
}
}
}
}
} );
/* Marvel staff */
$( '#wpTextbox1' ).wikiEditor( 'addToToolbar', {
section: 'advanced',
group: 'infoboxes',
tools: {
"staff": {
label: 'Marvel staff',
type: 'button',
icon: 'https://images.wikia.nocookie.net/marveldatabase/images/3/3e/Staff_Button.png',
action: {
type: 'encapsulate',
options: {
pre: "{{Marvel Database:Staff Template\r| Image                   = ",
post: "\r| RealName                = \r| Pseudonyms              = \r| Employers               = \r| Titles                  = \r\r| Gender                  = \r| YearOfBirth             = \r| MonthOfBirth            = \r| DayOfBirth              = \r| CityOfBirth             = \r| StateOfBirth            = \r| CountryOfBirth          = \r| Creations               = \r| First                   = \r\r| PersonalHistory         = \r| ProfessionalHistory     = \r\r| Notes                   = \r| Trivia                  = \r| OfficialWebsite         = \r| Links                   = \r}}"
}
}
}
}
} );
};
/* Check if view is in edit mode and that the required modules are available. Then, customize the toolbar … */
if ( [ 'edit', 'submit' ].indexOf( mw.config.get( 'wgAction' ) ) !== -1 ) {
mw.loader.using( 'user.options' ).then( function () {
// This can be the string "0" if the user disabled the preference ([[phab:T54542#555387]])
if ( mw.user.options.get( 'usebetatoolbar' ) == 1 ) {
$.when(
mw.loader.using( 'ext.wikiEditor' ), $.ready
).then( customizeToolbar );
}
} );
}