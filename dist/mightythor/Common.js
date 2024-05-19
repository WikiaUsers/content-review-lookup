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
// further modified by User:Harasar on 27/03/2024 to display legacy numbers in categories for Legacy Numbers and to change colors of links depending on the medium type (comics, tv episodes, movies, games, novels)
////////////////////////////////////////////////////////////////////
*/
$(function() {
    if (!(
        mw.config.get('wgCanonicalNamespace') === 'Category' &&
        ['Legacy Numbers', 'Appearances', 'Handbook Appearances', 'Minor Appearances', 'Mentions', 'Handbook Mentions', 'Invocations', 'Writer', 'Penciler', 'Inker', 'Cover Artist', 'Editor'].indexOf(mw.config.get('wgTitle').split('/').slice(-1)[0]) !== -1
    )) {
        return;
    } 

    // API requires titles 50 at a time, will be 200 titles per category page
    var requests,
        $links = $('.mw-category').find('a');
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
                    // medium types
                    var media_type = sort.match(/MEDIA:(.+);/);
                    if (media_type) {
                    	var media_type_class
                    	if (media_type[1] == 'Episode') {
                    		media_type_class = 'category-link-media-tv'
                    	} else if (media_type[1] == 'Film') {
                    		media_type_class = 'category-link-media-film'
                    	} else if (media_type[1] == 'Video Game') {
                    		media_type_class = 'category-link-media-game'
                    	} else if (media_type[1] == 'Novel') {
                    		media_type_class = 'category-link-media-novel'
                    	}
                    	document.querySelector('[title="' + title + '"]').classList.add(media_type_class);
                    }
                    
                    var tooltip = '';
                    // legacy numbers
                    var lgy_category = mw.config.get('wgTitle').indexOf('Legacy Numbers');
                    if (lgy_category !== -1) {
	                    var lgy = sort.match(/LGY:(.+);/);
	                    if (lgy) {
	                    	tooltip = ' (' + lgy[1] + ')';
	                    }
                    }
                    // dates
                    var cover_date = sort.match(/^&nbsp;\d{4}\-\d{2}/);
                    var release_date = sort.match(/^&nbsp;\d{4}\-\d{2}  \d{8}/);
                    var release_date_film_tv = sort.match(/^&nbsp;\d{8}/);
                    var date_tag = ''
                    if (release_date_film_tv) {
                    	release_date_film_tv = release_date_film_tv[0].replace('&nbsp;', '');
                    	var release_date_film_tv_year = release_date_film_tv.substr(0, 4);
                    	var release_date_film_tv_month = release_date_film_tv.substr(4, 2);
                    	var release_date_film_tv_day = release_date_film_tv.substr(6, 2);
                    	if (release_date_film_tv_day === '00') {
                    		if (release_date_film_tv_month === '00') {
                    			date_tag = ' (release: ' + release_date_film_tv_year + ')';
                    		} else {
                    			date_tag = ' (release: ' + release_date_film_tv_year + '-' + release_date_film_tv_month + ')';
                    		}
                    	} else {
                    		date_tag = ' (release: ' + release_date_film_tv_year + '-' + release_date_film_tv_month + '-' + release_date_film_tv_day + ')';
                    	}
                    } else {
	                    if (release_date) {
	                    	release_date = release_date[0].match(/\d{8}/)
	                    	date_tag = ', release: ' + release_date[0].replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3')
	                    }
	                    if (cover_date) {
	                    	date_tag = ' (cover: ' + cover_date[0] + date_tag + ')'
	                    }
                    }
                    if (date_tag != '') {
                    	tooltip = tooltip + date_tag
                    }
                    if (tooltip != '') {
                    	tooltip = tooltip.replace('&nbsp;', '');
                    	var tooltip_element = document.createElement("span");
                    	tooltip_element.classList.add('category-link-tooltip');
                    	tooltip_element.textContent = tooltip;
                    	$links.filter('[title="' + title + '"]').after(tooltip_element); 
                    }
                 });
            }
        );
    });
});


/* 
////////////////////////////////////////////////////////////////////
// THE BELOW CODE randomly changes text above top navigation from "Marvel Database" to one from the list
//////////////////////////////////////////////////////////////////// */

var wiki_names = ["Face Front, True Believers!", "'Nuff Said!", "Excelsior!", "Make Mine Marvel", "Avengers Assemble!", "To Me, My X-Men!", "With Great Power...", "Hulk Smash!", "Snikt!", "It's Clobberin' Time!", "Flame On!", "Wakanda Forever!", "I Am Iron Man", "I Am Groot", "By the Hoary Host of Hoggoth!", "Bamf!", "Whosoever Holds This Hammer, If They Be Worthy...", "By the Bristling Beard of Odin!", "Imperius Rex!", "Oh, My Stars and Garters!", "The Best There Is...", "...Hope You Survive the Experience!", "Sweet Christmas!", "Whatta Revoltin' Development!", "Have at Thee!", "And There Came a Day Unlike Any Other...", "Thwip!", "Champions Charge!"];
var wiki_name_number = -1;
while (wiki_name_number < 0 || wiki_name_number > wiki_names.length) {
  wiki_name_number = Math.random().toFixed(2) * 100;
};
var elements = document.getElementsByClassName('fandom-community-header__community-name');
elements[0].textContent = wiki_names[wiki_name_number];

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
					post: "\n|type         = DEFAULT: character\n|logo         = \n\n|main_image   = \n|noimage      = DEFAULT: No Image Available.png\n|main         = \n|main_name    = \n|main_title   = \n|description  = \n\n|alternative1 = \n\n|include1     = \n\n|exclude1     = \n\n|includeComic1= \n|includeMovie1= \n|includeTV1   = \n|includeGame1 = \n\n|teams        = \n|others       = \n|related      = \n\n|group1_header= \n|group1       = \n}}"
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
					post: "\n| RealName                = \n| CurrentAlias            = \n| Nicknames               = \n| Impersonations          = \n| Aliases                 = \n\n| Affiliation             = \n| Ancestors               = \n| Grandparents            = \n| Parents                 = \n| Siblings                = \n| Spouses                 = \n| Children                = \n| Descendants             = \n| Relatives               = \n\n| MaritalStatus           = \n| CharRef                 = \n| Gender                  = \n| Height                  = \n| Weight                  = \n| Eyes                    = \n| Hair                    = \n| Skin                    = \n| UnusualFeatures         = \n\n| Origin                  = \n| Universe                = \n| PlaceOfBirth            = \n| PlaceOfDeath            = \n| CauseOfDeath            = \n| KilledBy                = \n| CasualtyOf              = \n| Suicide                 = \n| Sacrifice               = \n\n| Identity                = \n| Citizenship             = \n| Occupation              = \n| Education               = \n| BaseOfOperations        = \n\n| Creators                = \n| First                   = \n| Death                   = \n\n| Quote                   = \n| Speaker                 = \n\n| HistoryText             = \n\n| Powers                  = \n| Abilities               = \n| Weaknesses              = \n| AdditionalAttributes    = \n\n| Equipment               = \n| Weapons                 = \n| Transportation          = \n\n| Notes                   = \n| Trivia                  = \n| Marvel                  = \n| Wikipedia               = \n| Links                   = \n}}"
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
					post: "\n| Name                    = \n| Aliases                 = \n\n| Leaders                 = \n| CurrentMembers          = \n| FormerMembers           = \n\n| Identity                = \n| Affiliation             =\n| Allies                  = \n| Enemies                 = \n\n| Origin                  = \n| Status                  = \n| Reality                 = \n| BaseOfOperations        = \n| PlaceOfFormation        = \n| PlaceOfDissolution      = \n\n| Creators                = \n| First                   = \n\n| History                 = \n\n| Equipment               = \n| Transportation          = \n| Weapons                 = \n\n| Notes                   = \n| Trivia                  = \n| Links                   = \n}}"
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
					post: "\n| Name                    = \n| Aliases                 = \n\n| Status                  = <!-- Defunct / Destroyed -->\n| Preceded                = \n| Succeeded               = \n\n| Capital                 = \n| Demonym                 = \n| Population              = \n| Area                    = \n| Language                = \n| Religion                = \n| Government              = \n| RulerLabel              = \n| Ruler                   = \n| Currency                = \n\n| Reality                 = \n| Dimension               = \n| Galaxy                  = \n| StarSystem              = \n| Planet                  = \n| Continent               = \n| Country                 = \n| State                   = \n| Province                = \n| Territory               = \n| Region                  = \n| District                = \n| County                  = \n| Division                = \n| City                    = \n| Locale                  = \n\n| Creators                = \n| First                   = \n\n| History                 = \n\n| PointsOfInterest        = \n| Residents               = \n\n| MajorResources          = \n| NationalDefense         = \n| InternationalRelations  = \n| ExtTerrestrialRelations = \n| DomesticCrime           = \n| InternationalCrime      = \n\n| Notes                   = \n| Trivia                  = \n| Links                   = \n}}"
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
					post: "\n| Name                    = \n| Aliases                 = \n\n| CurrentOwner            = \n| PreviousOwners          = \n\n| Type                    = \n| Material                = \n| Model                   = \n| Version                 = \n| Dimensions              = \n| Weight                  = \n\n| Origin                  = \n| Reality                 = \n| LeadDesigner            = \n| AdditionalDesigners     =      \n| PlaceOfCreation         = \n| PlaceOfDestruction      = \n\n| Creators                = \n| First                   = \n\n| History                 = \n\n| Properties              = \n| AlternateVersions       = \n\n| Notes                   = \n| Trivia                  = \n| Links                   =                    \n}}
"
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
					pre: "{{Marvel Database:Reality Template\n| Image                   = \n| Title                   = ",
					post: "\n| EarthNumber             = \n| EarthNumberRef          = \n| Aliases                 = \n| Status                  = \n\n| Creators                = \n| First                   = \n\n| History                 = \n\n| PointsOfInterest        = \n| Residents               = \n\n| Notes                   = \n| Trivia                  = \n| Links                   = \n}}"
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
					post: "\n| Name                    = \n| ScientificName          = \n| Aliases                 = \n\n| Identity                = \n| Affiliation             = \n\n| BodyType                = \n| AvgHeight               = \n| AvgWeight               = \n| Eyes                    = \n| Hair                    = \n| Skin                    = \n| NumberOfLimbs           = \n| NumberOfFingers         = \n| NumberOfToes            = \n| NumberOfEyes            = \n| SpecialAdaptations      =       \n| UnusualFeatures         = \n\n| Origin                  = \n| Status                  = \n| Reality                 = \n| GalaxyOfOrigin          = \n| DimensionOfOrigin       = \n| StarSystemOfOrigin      = \n| HomePlanet              = \n| BaseOfOperations        =         \n| PlaceOfBirth            =             \n\n| Creators                = \n| First                   = \n\n| History                 = \n\n| Powers                  = \n| Abilities               = \n| AvgStrength             = \n| Weaknesses              = \n\n| Habitat                 = \n| Gravity                 = \n| Atmosphere              = \n| Population              =               \n\n| GovernmentType          = \n| TechnologyLevel         = \n| CulturalTraits          = \n| Representatives         = \n\n| Notes                   = \n| Trivia                  = \n| Links                   = \n}}"
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
					post: "\n| Name                    = \n| Aliases                 = \n\n| CurrentOwner            = \n| AlternateOwners         = \n| PreviousOwners          = \n\n| TransportMethod         = \n| CurrentModel            = \n| PreviousModels          = \n| Dimensions              = \n\n| Origin                  = \n| Reality                 = \n| Status                  = \n\n| Creators                = \n| First                   = \n\n| History                 = \n\n| Capabilities            = \n| Weapons                 = \n| Equipment               = \n\n| Notes                   = \n| Trivia                  = \n| Links                   = \n}}"
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
					post: "\n| Image1_Artist1      = \n| Image2              = \n| Image2_Text         = \n\n| ReleaseDate         = \n| Month               = \n| Year                = \n\n| Editor-in-Chief     = \n| Rating              = \n| OriginalPrice       = \n| Pages               = \n\n| Quotation           = \n| Speaker             = \n\n| StoryTitle1         = \n| Synopsis1           = \n\n| Writer1_1           = \n| Penciler1_1         = \n| Inker1_1            = \n| Colorist1_1         = \n| Letterer1_1         = \n| Editor1_1           = \n\n| Appearing1          = \n'''Featured Characters:'''\n* <br/>\n'''Supporting Characters:'''\n* <br/>\n'''Villains:'''\n* <br/>\n'''Other Characters:'''\n* <br/>\n'''Locations:'''\n* <br/>\n'''Items:'''\n* <br/>\n'''Vehicles:'''\n* <br/>\n\n| Solicit             = \n\n| Notes               = \n| Trivia              = \n| Recommended         = \n| Links               = \n| MarvelUnlimited     = \n| Comixology          = \n}}"
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
					pre: "{{Marvel Database:Volume Template\n||volume_logo  = \n||publisher    = \n|\n||PreviousVol  = \n||NextVol      = \n|\n||format       = Limited Series; Ongoing Series; One Shot; Annual; Handbook; TPB\n||main_volume  = \n||type         = Solo; Team; Team-Up; Event; Adaptation\n||status       = Active; Canceled; Finished; Announced\n||genres       = Superhero; Western, Horror\n||relaunches   = \n||featured     = \n|\n||category     = \n||exclude      = \n|\n||part1_above  = \n||part1        = \n||part1_below  = \n|\n|| Notes                   = \n|| SeeAlso                 = \n",
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
			label: 'Image',
			type: 'button',
			icon: 'https://images.wikia.nocookie.net/marveldatabase/images/d/dc/Image_Button.png',
			action: {
				type: 'encapsulate',
				options: {
					pre: "{{Marvel Database:Image Template\n| License                 = ",
					post: "\n| ImageType               = \n\n| Reality                 = \n| Subject1                = \n| Subject2                = \n| Subject3                = \n| Subject4                = \n| Subject5                = \n\n| Source                  = \n| CoverArtist1            = \n| Penciler1               = \n| Inker1                  = \n| Colorist1               = \n| Letterer1               = \n}}"
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
					pre: "{{Marvel Database:Gallery Template\n| GalleryType             = \n| GalleryData             = \n\n==Comics==\n===Interior Art===\n<gallery position=\"center\" captionalign=\"center\">\n",
					post: "\n</gallery>\n\n| SeeAlso                 = \n}}"
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
					post: "\n| Month               = \n| Day                 = \n| Year                = \n\n| Director1           = \n| Producer1           = \n| Writer1             = \n| IMDB                = \n\n| Quotation           = \n| Speaker             = \n\n| EpisodeTitle        = \n| Synopsis            = \n\n| Appearing           = \n'''Featured Characters:'''\n* <br/>\n'''Supporting Characters:'''\n* <br/>\n'''Villains:'''\n* <br/>\n'''Other Characters:'''\n* <br/>\n'''Locations:'''\n* <br/>\n'''Items:'''\n* <br/>\n'''Vehicles:'''\n* <br/>\n\n| Character1          = \n| Actor1              = \n| Character2          = \n| Actor2              = \n| Character3          = \n| Actor3              = \n| Character4          = \n| Actor4              = \n| Character5          = \n| Actor5              = \n| Character6          = \n| Actor6              = \n| Character7          = \n| Actor7              = \n| Character8          = \n| Actor8              = \n| Character9          = \n| Actor9              = \n| Character10         = \n| Actor10             = \n\n| Notes               = \n| Trivia              = \n| Links               = \n}}"
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
					post: "\n| Name                    = \n| Pseudonyms              = \n\n| Gender                  = \n| DateOfBirth             = \n| CityOfBirth             = \n| StateOfBirth            = \n| PlaceOfBirth            = COUNTRY\n| Citizenship             = \n| DateOfDeath             = \n| PlaceOfDeath            = \n\n| Employers               = \n| Titles                  = \n| NotableCreations        = \n| First                   = \n\n| PersonalHistory         = \n| ProfessionalHistory     = \n\n| Notes                   = \n| Trivia                  = \n| OfficialWebsite         = \n| Links                   = \n| Wikipedia               = \n}}"
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