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
// fixed and modified by User:Harasar on 21/04/2022 to work again
////////////////////////////////////////////////////////////////////
*/
$(function() {
    if (!(
        mw.config.get('wgCanonicalNamespace') === 'Category' &&
        ['Appearances', 'Handbook Appearances', 'Minor Appearances', 'Mentions', 'Handbook Mentions', 'Flashback'].indexOf(mw.config.get('wgTitle').split('/').slice(-1)[0]) !== -1
    )) {
        return;
    } 

    // API requires titles 50 at a time, will be 200 titles per category page
    var requests,
        $links = $('.mw-category-generated').find('a');
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
                    var sort = data[val].pageprops.defaultsort;
                    var title = data[val].title;
                    var cover_date = sort.match(/^&nbsp;\d{4}\-\d{2}/);
                    var release_date = sort.match(/^&nbsp;\d{4}\-\d{2}  \d{8}/);
                    var date_tag = ''
                    if (release_date) {
                    	release_date = release_date[0].match(/\d{8}/)
                    	date_tag = ', release: ' + release_date[0].replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3')
                    }
                    if (cover_date) {
                    	date_tag = ' (cover: ' + cover_date[0].replace('&nbsp;', '') + date_tag + ')'
                        $links.filter('[title="' + title + '"]').after(date_tag);
                    }
                });
            }
        );
    });
});



/* 
////////////////////////////////////////////////////////////////////
// THE BELOW CODE randomly changes text above top navigation from "Marvel Database" to one from the list
////////////////////////////////////////////////////////////////////
*/
var wiki_name_number=Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10) + 1;
var wiki_name_text=["Whosoever Holds This Hammer, If They Be Worthy...", "By the Bristling Beard of Odin!", "Have at Thee!" ][wiki_name_number];
var elements=document.getElementsByClassName('fandom-community-header__community-name');
var wiki_name=elements[0];
wiki_name.textContent=wiki_name_text;


/* 
////////////////////////////////////////////////////////////////////
// THE BELOW CODE ADDS CUSTOM BUTTONS TO THE JAVASCRIPT EDIT TOOLBAR
////////////////////////////////////////////////////////////////////
*/


var customizeToolbar2 = function () {
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
/* disambiguation */
$( '#wpTextbox1' ).wikiEditor( 'addToToolbar', {
	section: 'main',
	group: 'insert',
	tools: {
		"disambiguation": {
			label: 'Disambiguation',
			type: 'button',
			icon: 'https://upload.wikimedia.org/wikipedia/commons/6/62/Button_desambig.png',
			action: {
				type: 'encapsulate',
				options: {
					pre: "{{Disambiguation",
					post: "\n|main         = \n|main_name    = \n|main_title   = \n|main_image   = \n|noimage      = \n\n|alternative1 = \n|include1     = \n|exclude1     = \n}}"
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
pre: "{{Marvel Database:Character Template\n| Image                   = ",
post: "\n| RealName                = \n| CurrentAlias            = \n| Aliases                 = \n| Identity                = \n| Affiliation             = \n| Universe                = \n| BaseOfOperations        = \n\n| Parents                 = \n| Siblings                = \n| Spouses                 = \n| Children                = \n| Relatives               = \n\n| Gender                  = \n| Height                  = \n| Weight                  = \n| Eyes                    = \n| Hair                    = \n| UnusualFeatures         = \n\n| Citizenship             = \n| MaritalStatus           = \n| Occupation              = \n| Education               = \n\n| Creators                = \n| First                   = \n\n| Origin                  = \n| PlaceOfBirth            = \n| Death                   = \n| PlaceOfDeath            = \n| CauseOfDeath            = \n\n| Quotation               = \n| Speaker                 = \n| QuoteSource             = \n\n| HistoryText             = \n\n| Powers                  = \n| Abilities               = \n| Strength                = \n| Weaknesses              = \n\n| Equipment               = \n| Transportation          = \n| Weapons                 = \n\n| Notes                   = \n| Trivia                  = \n| Marvel                  = \n| MarvelWiki              = \n| Wikipedia               = \n| Links                   = \n}}"
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
pre: "{{Marvel Database:Team Template\n| Image                   = ",
post: "\n| OfficialName            = \n| Aliases                 = \n\n| Universe                = \n| Status                  = \n| Identity                = \n| Affiliation             = \n| BaseOfOperations        = \n\n| TeamLeaders             = \n| CurrentMembers          = \n| FormerMembers           = \n| Allies                  = \n| Enemies                 = \n\n| Origin                  = \n| PlaceOfFormation        = \n| PlaceOfDefunction       = \n| Creators                = \n| First                   = \n| Last                    = \n\n| HistoryText             = \n\n| Equipment               = \n| Transportation          = \n| Weapons                 = \n\n| Notes                   = \n| Trivia                  = \n| Links                   = \n}}"
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
pre: "{{Marvel Database:Location Template\n| Image                   = ",
post: "\n| OfficialName            = \n| Aliases                 = \n\n| Status                  = \n| Preceded                = \n| Succeeded               = \n\n| Capital                 = \n| Demonym                 = \n| Area                    = \n| Population              = \n| Language                = \n| Religion                = \n| Government              = \n| RulerLabel              = \n| Ruler                   = \n| Currency                = \n\n| Universe                = \n| Dimension               = \n| Galaxy                  = \n| StarSystem              = \n| Planet                  = \n| Continent               = \n| Country                 = \n| State                   = \n| Province                = \n| Territory               = \n| Region                  = \n| District                = \n| County                  = \n| Division                = \n| City                    = \n| Locale                  = \n\n| Creators                = \n| First                   = \n| Last                    = \n| Destruction             = \n\n| HistoryText             = \n\n| PointsOfInterest        = \n| Residents               = \n\n| MajorResources          = \n| NationalDefense         = \n| InternationalRelations  = \n| ExtTerrestrialRelations = \n| DomesticCrime           = \n| InternationalCrime      = \n\n| Notes                   = \n| Trivia                  = \n| Links                   = \n}}"
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
pre: "{{Marvel Database:Item Template\n| Image                   = ",
post: "\n| OfficialName            = \n| Aliases                 = \n| Type                    = \n| Material                = \n| Model                   = \n| Version                 = \n| Dimensions              = \n| Weight                  = \n| Properties              = \n\n| Universe                = \n| LeadDesigner            = \n| AdditionalDesigners     = \n| PlaceOfCreation         = \n| PlaceOfDestruction      = \n| Origin                  = \n\n| Creators                = \n| First                   = \n\n| CurrentOwner            = \n| PreviousOwners          = \n| AlternateOwners         = \n| AlternateVersions       = \n\n| HistoryText             = \n\n| Notes                   = \n| Trivia                  = \n| Links                   = \n}}"
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
pre: "{{Marvel Database:Reality Template\n| Image                   = ",
post: "\n| EarthNumber             = \n| Title                   = \n| Aliases                 = \n| Status                  = \n\n| Creators                = \n| First                   = \n\n| History                 = \n\n| Residents               = \n| Notes                   = \n| Trivia                  = \n| Links                   = \n}}"
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
pre: "{{Marvel Database:Race Template\n| Image                   = ",
post: "\n| Name                    = \n| ScientificName          = \n| Aliases                 = \n| Identity                = \n| Affiliation             = \n| Universe                = \n| BaseOfOperations        = \n\n| BodyType                = \n| AvgHeight               = \n| AvgWeight               = \n| Eyes                    = \n| Hair                    = \n| Skin                    = \n| NumberOfLimbs           = \n| NumberOfFingers         = \n| NumberOfToes            = \n| SpecialAdaptations      = \n| UnusualFeatures         = \n\n| Origin                  = \n| Status                  = \n| GalaxyOfOrigin          = \n| DimensionOfOrigin       = \n| StarSystemOfOrigin      = \n| HomePlanet              = \n| PlaceOfBirth            = \n| Creators                = \n| First                   = \n\n| HistoryText             = \n\n| Habitat                 = \n| Gravity                 = \n| Atmosphere              = \n| Population              = \n\n| Powers                  = \n| Abilities               = \n| AvgStrength             = \n| Weaknesses              = \n\n| GovernmentType          = \n| TechnologyLevel         = \n| CulturalTraits          = \n| Representatives         = \n\n| Notes                   = \n| Trivia                  = \n| Links                   = \n}}"
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
pre: "{{Marvel Database:Vehicle Template\n| Image                   = ",
post: "\n| Name                    = \n| Aliases                 = \n\n| CurrentOwner            = \n| PreviousOwners          = \n| AlternateOwners         = \n\n| TransportMethod         = \n| CurrentModel            = \n| PreviousModels          = \n| Dimensions              = \n\n| Origin                  = \n| Reality                 = \n| Status                  = \n\n| Creators                = \n| First                   = \n| Last                    = \n\n| History                 = \n\n| Capabilities            = \n| Weapons                 = \n| Equipment               = \n\n| Notes                   = \n| Trivia                  = \n| Links                   = \n}}"
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
pre: "{{Marvel Database:Comic Template\n| Image1              = ",
post: "\n| Image1_Artist1      = \n| Month               = \n| Year                = \n| ReleaseDate         = \n| Solicit             = \n\n| Editor-in-Chief     = \n| Rating              = \n| OriginalPrice       = \n| Pages               = \n\n| Quotation           = \n| Speaker             = \n\n| StoryTitle1         = \n| Synopsis1           = \n\n| Writer1_1           = \n| Penciler1_1         = \n| Inker1_1            = \n| Colorist1_1         = \n| Letterer1_1         = \n| Editor1_1           = \n\n| Appearing1          = \n'''Featured Characters:'''\n* <br/>\n'''Supporting Characters:'''\n* <br/>\n'''Villains:'''\n* <br/>\n'''Other Characters:'''\n* <br/>\n'''Locations:'''\n* <br/>\n'''Items:'''\n* <br/>\n'''Vehicles:'''\n* <br/>\n\n| Notes               = \n| Trivia              = \n| Recommended         = \n| Links               = \n| MarvelUnlimited     = \n| Comixology          = \n}}"
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
pre: "{{Marvel Database:Volume Template\n| volume_logo             = \n| PreviousVol             = \n| NextVol                 = \n| publisher               = Marvel Comics\n| main_volume             = \n| status                  = Active; Canceled; Finished; Announced\n| format                  = Limited Series; Ongoing Series; One Shot; Annual; Handbook; TPB\n| type                    = Solo; Team; Team-Up; Event; Adaptation\n| genres                  = Superhero\n| featured                = \n\n| SeeAlso                 = \n| MarvelUnlimited         = \n| Comixology              = \n\n",
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
label: 'Disambig',
type: 'button',
icon: 'https://images.wikia.nocookie.net/marveldatabase/images/d/dc/Image_Button.png',
action: {
type: 'encapsulate',
options: {
pre: "{{Disambiguation\n|type         = Character ",
post: "\n|logo         = \n|invert_logo  = \n\n|main_image   = \n|noimage      = No Image Male.jpg\n|main         = \n|main_name    = \n|main_title   = \n|description  = \n\n|alternative1 = \n\n|include1     = \n|exclude1     = \n\n|includeComic1= \n|includeMovie1= \n|includeTV1   = \n|includeGame1 = \n\n|teams        = \n|others       = \n|related      = \n\n|group1_header= \n|group1       = \n}}"
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
pre: "{{Marvel Database:Gallery Template\n| GalleryType             = Character\n| GalleryData             = \n<gallery position=\"center\" captionalign=\"center\">\n",
post: "\n</gallery>\n| SeeAlso                 = \n}}"
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
pre: "{{Marvel Database:Episode Template\n| Image               = ",
post: "\n| Month               = \n| Day                 = \n| Year                = \n\n| Director1           = \n| Producer1           = \n| Writer1             = \n| IMDB                = \n\n| Quotation           = \n| Speaker             = \n\n| EpisodeTitle        = \n| Synopsis            = \n\n| Appearing           = \n'''Featured Characters:'''\n* <br/>\n'''Supporting Characters:'''\n* <br/>\n'''Villains:'''\n* <br/>\n'''Other Characters:'''\n* <br/>\n'''Locations:'''\n* <br/>\n'''Items:'''\n* <br/>\n'''Vehicles:'''\n* <br/>\n\n| Character1          = \n| Actor1              = \n| Character2          = \n| Actor2              = \n| Character3          = \n| Actor3              = \n| Character4          = \n| Actor4              = \n| Character5          = \n| Actor5              = \n| Character6          = \n| Actor6              = \n| Character7          = \n| Actor7              = \n| Character8          = \n| Actor8              = \n| Character9          = \n| Actor9              = \n| Character10         = \n| Actor10             = \n\n| Notes               = \n| Trivia              = \n| Recommended         = \n| Links               = \n}}"
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
pre: "{{Marvel Database:Staff Template\n| Image                   = ",
post: "\n| Name                    = \n| Pseudonyms              = \n\n| Gender                  = \n| DateOfBirth             = \n| CityOfBirth             = \n| StateOfBirth            = \n| PlaceOfBirth            = \n| ContinentOfBirth        = \n| DateOfDeath             = \n| PlaceOfDeath            = \n\n| First                   = \n\n| PersonalHistory         = \n| ProfessionalHistory     = \n\n| Notes                   = \n| Trivia                  = \n| OfficialWebsite         = \n| Links                   = \n}}"
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
).then( customizeToolbar2 );
}
} );
}