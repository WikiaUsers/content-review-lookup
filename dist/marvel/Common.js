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

/* displays sortkey in General Tasks categories */
$(function() {
    if (
        mw.config.get('wgCanonicalNamespace') === 'Category' &&
        ['Move', 'Move Reality', 'Move Comic', 'Move Comic Volume', 'Move Image', 'To Be Deleted', 'Merge', 'Split', 'Plagiarism'].indexOf(mw.config.get('wgTitle').split('/').slice(-1)[0]) !== -1
    ) {
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
	                    var tooltip = '';
	                    var task_date = sort.match(/TASKDATE:(.+);/);
		                if (task_date) {
		                   tooltip = ' (' + task_date[1].replace(/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1-$2-$3 $4:$5:$6') + ')'
		                }
	                    if (tooltip != '') {
	                    	var tooltip_element = document.createElement("span");
	                    	tooltip_element.classList.add('category-link-tooltip');
	                    	tooltip_element.textContent = tooltip;
	                    	$links.filter('[title="' + title + '"]').after(tooltip_element); 
	                    }
	                 });
	            }
	        );
	    });
    }
});


/* 
////////////////////////////////////////////////////////////////////
// THE BELOW CODE randomly changes text above top navigation from "Marvel Database" to one from the list
//////////////////////////////////////////////////////////////////// */

var wiki_names = ["Face Front, True Believers!", "'Nuff Said!", "Excelsior!", "Make Mine Marvel", "Avengers Assemble!", "To Me, My X-Men!", "With Great Power...", "Hulk Smash!", "Snikt!", "It's Clobberin' Time!", "Flame On!", "Wakanda Forever!", "I Am Iron Man", "I Am Groot", "By the Hoary Host of Hoggoth!", "Bamf!", "Whosoever Holds This Hammer, If They Be Worthy...", "By the Bristling Beard of Odin!", "Imperius Rex!", "Oh, My Stars and Garters!", "The Best There Is...", "...Hope You Survive the Experience!", "Sweet Christmas!", "Whatta Revoltin' Development!", "Have at Thee!", "And There Came a Day Unlike Any Other...", "Thwip!", "Champions Charge!", "Down, down, down The Road"];
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
		},
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
		},
	}
} );
/* Comment */
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
		},
		"disambiguation": {
			label: 'Main Disambiguation',
			type: 'button',
			icon: 'https://static.wikia.nocookie.net/marveldatabase/images/thumb/f/f4/Disambiguation_Icon_1.svg/30px-Disambiguation_Icon_1.svg.png',
			action: {
				type: 'encapsulate',
				options: {
					pre: "{{Disambiguation",
					post: "\n|main         = \n|main_name    = \n|main_title   = \n|main_image   = \n|noimage      = \n\n|alternative1 = \n|include1     = \n|exclude1     = \n}}"
				}
			}
		},
		"disambiguation2": {
			label: 'Disambiguation by group',
			type: 'button',
			icon: 'https://static.wikia.nocookie.net/marveldatabase/images/thumb/9/95/Disambiguation_Icon_2.svg/30px-Disambiguation_Icon_2.svg.png',
			action: {
				type: 'encapsulate',
				options: {
					pre: "{{Disambiguation",
					post: "\n|group1_header= \n|group1       = \n\n|group2_header= \n|group2       = \n}}"
				}
			}
		},
		"move": {
			label: 'Move page',
			type: 'button',
			icon: 'https://static.wikia.nocookie.net/marveldatabase/images/thumb/e/e4/Move_Task_Icon.svg/30px-Move_Task_Icon.svg.png',
			action: {
				type: 'encapsulate',
				options: {
					pre: "{{subst:Move\n|page_name     = ",
					post: "\n|reason        = \n|move_variants = Yes\n}}"
				}
			}
		},
		"delete": {
			label: 'Delete page',
			type: 'button',
			icon: 'https://static.wikia.nocookie.net/marveldatabase/images/thumb/1/16/Delete_Task_Icon.svg/30px-Delete_Task_Icon.svg.png',
			action: {
				type: 'encapsulate',
				options: {
					pre: "{{subst:Delete\n|reason        = ",
					post: "\n}}"
				}
			}
		},
		"merge_to": {
			label: 'Merge To',
			type: 'button',
			icon: 'https://static.wikia.nocookie.net/marveldatabase/images/thumb/3/37/Merge_To_Task_Icon.svg/30px-Merge_To_Task_Icon.svg.png',
			action: {
				type: 'encapsulate',
				options: {
					pre: "{{subst:Merge To\n|page_name     = ",
					post: "\n|reason        =\n|section       = \n}}"
				}
			}
		},
		"merge_from": {
			label: 'Merge From',
			type: 'button',
			icon: 'https://static.wikia.nocookie.net/marveldatabase/images/thumb/d/df/Merge_From_Task_Icon.svg/30px-Merge_From_Task_Icon.svg.png',
			action: {
				type: 'encapsulate',
				options: {
					pre: "{{subst:Merge From\n|page_name     = ",
					post: "\n|reason        =\n|section       = \n}}"
				}
			}
		},
		"split": {
			label: 'Split into page(s)',
			type: 'button',
			icon: 'https://static.wikia.nocookie.net/marveldatabase/images/thumb/9/9a/Split_Task_Icon.svg/30px-Split_Task_Icon.svg.png',
			action: {
				type: 'encapsulate',
				options: {
					pre: "{{subst:Split\n|page_name     = ",
					post: "\n|page_name2    = \n|reason        = \n|section       = \n}}"
				}
			}
		},
		"plagiarism": {
			label: 'Plagiarism',
			type: 'button',
			icon: 'https://static.wikia.nocookie.net/marveldatabase/images/thumb/2/2b/Plagiarism_Task_Icon.svg/30px-Plagiarism_Task_Icon.svg.png',
			action: {
				type: 'encapsulate',
				options: {
					pre: "{{subst:Plagiarism\n|reason        = ",
					post: "\n|section       = \n}}"
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
					post: "\n| Name                    = \n| NameRef                 = \n| CurrentAlias            = \n| CurrentAliasRef         = \n| Codenames               = \n| Nicknames               = \n| Aliases                 = \n\n| Affiliation             = \n| Parents                 = \n| Siblings                = \n| Spouses                 = \n| Children                = \n| Relatives               = \n| MaritalStatus           = \n\n| CharRef                 = \n| Gender                  = \n| Height                  = \n| Weight                  = \n| Eyes                    = \n| Hair                    = \n| UnusualFeatures         = \n\n| Origin                  = \n| Reality                 = \n| PlaceOfBirth            = \n\n| Identity                = \n| Citizenship             = \n| Occupation              = \n| Education               = \n| BaseOfOperations        = \n\n| Creators                = \n| First                   = \n\n| History                 = \n\n| Personality             = \n\n| Powers                  = \n| Abilities               = \n| Weaknesses              = \n| AdditionalAttributes    = \n\n| Equipment               = \n| Transportation          = \n| Weapons                 = \n\n| Notes                   = \n| Trivia                  = \n| Links                   = \n}}"
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
					post: "\n| Name                    = \n| NameRef                 = \n| EditorialNames          = \n| Aliases                 = \n\n| Leaders                 = \n| CurrentMembers          = \n| FormerMembers           = \n\n| Identity                = \n| Affiliation             = \n| Allies                  = \n| Enemies                 = \n\n| Origin                  = \n| Status                  = \n| Reality                 = \n| BaseOfOperations        = \n| PlaceOfFormation        = \n| PlaceOfDissolution      = \n\n| Creators                = \n| First                   = \n| Last                    = \n\n| History                 = \n\n| Equipment               = \n| Transportation          = \n| Weapons                 = \n\n| Notes                   = \n| Trivia                  = \n| Links                   = \n}}"
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
					post: "\n| Name                    = \n| NameRef                 = \n| Aliases                 = \n\n| Reality                 = \n| Galaxy                  = \n| StarSystem              = \n| Planet                  = \n| Continent               = \n| Country                 = \n| Region                  = \n| State                   = \n| City                    = \n| Locale                  = \n\n| Population              = \n\n| Creators                = \n| First                   = \n\n| History                 = \n\n| PointsOfInterest        = \n| Residents               = \n\n| Notes                   = \n| Trivia                  = \n| Links                   = \n}}"
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
					post: "\n| Name                    = \n| NameRef                 = \n| Aliases                 = \n\n| CurrentOwner            = \n| PreviousOwners          = \n| AlternateOwners         = \n\n| Type                    = \n| Material                = \n| Dimensions              = \n| Weight                  = \n\n| Origin                  = \n| Reality                 = \n| LeadDesigner            = \n| AdditionalDesigners     = \n| PlaceOfCreation         = \n| PlaceOfDestruction      = \n\n| Creators                = \n| First                   = \n\n| History                 = \n| Properties              = \n| AlternateVersions       = \n\n| Notes                   = \n| Trivia                  = \n| Links                   = \n}}"
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
					pre: "{{Marvel Database:Reality Template\n| Title                   = \n| Image                   = ",
					post: "\n| EarthNumber             = \n| EarthNumberRef          = \n| Aliases                 = \n| Status                  = \n\n| Creators                = \n| First                   = \n\n| History                 = \n\n| Residents               = \n| Notes                   = \n| Trivia                  = \n| Links                   = \n}}"
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
					post: "\n| Name                    = \n| NameRef                 = \n| Aliases                 = \n\n| Identity                = \n| Affiliation             = \n\n| BodyType                = \n| AvgHeight               = \n| AvgWeight               = \n| Eyes                    = \n| Hair                    = \n| Skin                    = \n| NumberOfLimbs           = \n| NumberOfFingers         = \n| NumberOfToes            = \n| SpecialAdaptations      = \n| UnusualFeatures         = \n\n| Origin                  = \n| Status                  = \n| Reality                 = \n| GalaxyOfOrigin          = \n| StarSystemOfOrigin      = \n| HomePlanet              = \n| BaseOfOperations        = \n| PlaceOfBirth            = \n\n| Creators                = \n| First                   = \n\n| History                 = \n\n| Habitat                 = \n| Gravity                 = \n| Atmosphere              = \n| Population              = \n\n| Powers                  = \n| Abilities               = \n| AvgStrength             = \n| Weaknesses              = \n\n| GovernmentType          = \n| TechnologyLevel         = \n| CulturalTraits          = \n| Representatives         = \n\n| Notes                   = \n| Trivia                  = \n| Links                   = \n}}"
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
					post: "\n| Name                    = \n| NameRef                 = \n| Aliases                 = \n\n| CurrentOwner            = \n| PreviousOwners          = \n\n| TransportMethod         = \n| CurrentModel            = \n| PreviousModels          = \n| Dimensions              = \n\n| Origin                  = \n| Reality                 = \n| Status                  = \n\n| Creators                = \n| First                   = \n\n| History                 = \n\n| Notes                   = \n| Trivia                  = \n| Links                   = \n}}"
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
					post: "\n| Image1_Artist1      = \n| Image2              = \n| Image2_Text         = \n| Image2_Artist1      = \n\n| ReleaseDate         = \n| Month               = \n| Year                = \n\n| Editor-in-Chief     = \n| Pages               = \n| Rating              = \n| OriginalPrice       = \n\n| Quotation           = \n| Speaker             = \n\n| StoryTitle1         = \n| Writer1_1           = \n| Penciler1_1         = \n| Inker1_1            = \n| Colorist1_1         = \n| Letterer1_1         = \n| Editor1_1           = \n\n|  Appearing1         = \n'''Featured Characters:'''\n* <br/>\n'''Supporting Characters:'''\n* <br/>\n'''Antagonists:'''\n* <br/>\n'''Other Characters:'''\n* <br/>\n'''Races and Species:'''\n* <br/>\n'''Locations:'''\n* <br/>\n'''Items:'''\n* <br/>\n'''Vehicles:'''\n* <br/>\n\n| Synopsis1           = \n\n| Solicit             = \n\n| Notes               = \n| Trivia              = \n| Recommended         = \n| Links               = \n}}"
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
					pre: "{{Marvel Database:Volume Template\n| volume_logo             = \n| PreviousVol             = \n| NextVol                 = \n| publisher               = \n| format                  = \n| type                    = \n| genres                  = \n| featured                = \n\n| SeeAlso                 = \n\n",
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
					post: "\n| Day                 = \n| Month               = \n| Year                = \n\n| Director1           = \n| Producer1           = \n| Writer1             = \n\n| Quotation           = \n| Speaker             = \n\n| EpisodeTitle        = \n| Synopsis            = \n\n| Appearing           = \n'''Featured Characters:'''\n* <br/>\n'''Supporting Characters:'''\n* <br/>\n'''Antagonists:'''\n* <br/>\n'''Other Characters:'''\n* <br/>\n'''Locations:'''\n* <br/>\n'''Items:'''\n* <br/>\n'''Vehicles:'''\n* <br/>\n\n| Notes               = \n| Trivia              = \n| Recommended         = \n| Links               = \n}}"
				}
			}
		}
	}
} );
/* Creators */
$( '#wpTextbox1' ).wikiEditor( 'addToToolbar', {
	section: 'advanced',
	group: 'infoboxes',
	tools: {
		"creator": {
			label: 'Creators',
			type: 'button',
			icon: 'https://images.wikia.nocookie.net/marveldatabase/images/3/3e/Staff_Button.png',
			action: {
				type: 'encapsulate',
				options: {
					pre: "{{Marvel Database:Creator Template\n| Image                   = ",
					post: "\n| Name                    = \n| Pseudonyms              = \n\n| Gender                  = \n| DateOfBirth             = \n| PlaceOfBirth            = \n\n| Employers               = \n| Titles                  = \n| First                   = \n| Last                    = \n| NotableCreations        = \n\n| PersonalHistory         = \n| ProfessionalHistory     = \n\n| Notes                   = \n| Trivia                  = \n| OfficialWebsite         = \n| Links                   = \n}}"
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