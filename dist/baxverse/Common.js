/* CAUTION: Any JavaScript here will be loaded for all users on every page load. */

/* controls the placement of the Template:RailModule in right rail module https://dev.fandom.com/wiki/AddRailModule */
window.AddRailModule = [{prepend: true}];

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
                    	var media_type_class;
                    	if (media_type[1] == 'Episode') {
                    		media_type_class = 'category-link-media-tv';
                    	} else if (media_type[1] == 'Film') {
                    		media_type_class = 'category-link-media-film';
                    	} else if (media_type[1] == 'Video Game') {
                    		media_type_class = 'category-link-media-game';
                    	} else if (media_type[1] == 'Novel') {
                    		media_type_class = 'category-link-media-novel';
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
                    var date_tag = '';
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
	                    	release_date = release_date[0].match(/\d{8}/);
	                    	date_tag = ', release: ' + release_date[0].replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3');
	                    }
	                    if (cover_date) {
	                    	date_tag = ' (cover: ' + cover_date[0] + date_tag + ')';
	                    }
                    }
                    if (date_tag != '') {
                    	tooltip = tooltip + date_tag;
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
		                   tooltip = ' (' + task_date[1].replace(/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1-$2-$3 $4:$5:$6') + ')';
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
// THE BELOW CODE randomly changes text above top navigation from "Baxverse" to one from the list
//////////////////////////////////////////////////////////////////// */

var wiki_names = ["Time to Flame On!!!", "It’s Zapping Time!", "Red Belt!", "This is Emphasis! Ready to Go!", "NEKOKEN!", "CATYUKEN!", "Let's Blast through at the Speed of THUNDER!", "Don't expect me to go easy on you!", "You want it? Come and get it!", "Ready for a 'Jolt' of Action?!", "This looks like a job for Firstman!", "I’m good at this kind of thing.", "LET'S SEE WHO'S TALKING AFTER THIS!", "Fair warning. These claws will hurt.", "I am Leviathan!", "I'm ready for ya! Bring it on!", "I AM NOT SHAPED LIKE A FERRIS WHEEL!!!", "AIR LUNAR GUST!!", "My journey starts now", "A-Girls, fire at will!", "Good grief...people like you are always a problem!", "You will explode in any second!", "Man- How long has it been?"];
var wiki_name_number = -1;
while (wiki_name_number < 0 || wiki_name_number > wiki_names.length) {
  wiki_name_number = Math.random().toFixed(2) * 100;
}
var elements = document.getElementsByClassName('fandom-community-header__community-name');
elements[0].textContent = wiki_names[wiki_name_number];

/* 
////////////////////////////////////////////////////////////////////
// THE BELOW CODE ADDS CUSTOM BUTTONS TO THE JAVASCRIPT EDIT TOOLBAR
////////////////////////////////////////////////////////////////////
*/
var customizeToolbar2 = function () {
	/*-------- add tasks --------*/
	$( '#wpTextbox1' ).wikiEditor( 'addToToolbar', {
		section: 'main',
		group: 'insert',
		tools: {
			"cat": {
				label: 'Quick categorization',
				type: 'button',
				oouiIcon: 'fa',
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
				oouiIcon: 'fa',
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
				oouiIcon: 'fa',
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
				oouiIcon: 'fa',
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
				oouiIcon: 'fa',
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
				oouiIcon: 'fa',
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
				oouiIcon: 'fa',
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
				oouiIcon: 'fa',
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
				oouiIcon: 'fa',
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
	$( '#wpTextbox1' ).wikiEditor( 'addToToolbar', {
		section: 'advanced',
		group: 'infoboxes',
		tools: {
			"character": {
				label: 'Character',
				type: 'button',
				oouiIcon: 'fa',
				action: {
					type: 'encapsulate',
					options: {
						pre: "{{Character Template\n| Image                   = ",
						post: "\n| Name                    = \n| NameRef                 = \n| CurrentAlias            = \n| CurrentAliasRef         = \n| Codenames               = \n| Nicknames               = \n| Aliases                 = \n\n| Affiliation             = \n| Parents                 = \n| Siblings                = \n| Spouses                 = \n| Children                = \n| Relatives               = \n| MaritalStatus           = \n\n| CharRef                 = \n| Gender                  = \n| Height                  = \n| Weight                  = \n| Eyes                    = \n| Hair                    = \n| UnusualFeatures         = \n\n| Origin                  = \n| Reality                 = \n| PlaceOfBirth            = \n\n| Identity                = \n| Citizenship             = \n| Occupation              = \n| Education               = \n| BaseOfOperations        = \n\n| Creators                = \n| First                   = \n\n| History                 = \n\n| Powers                  = \n| Abilities               = \n| Weaknesses              = \n| AdditionalAttributes    = \n\n| Equipment               = \n| Transportation          = \n| Weapons                 = \n\n| Notes                   = \n| Trivia                  = \n| Links                   = \n}}"
					}
				}
			},
			"team": {
				label: 'Team',
				type: 'button',
				oouiIcon: 'fa',
				action: {
					type: 'encapsulate',
					options: {
						pre: "{{Team Template\n| Image                   = ",
						post: "\n| Name                    = \n| NameRef                 = \n| EditorialNames          = \n| Aliases                 = \n\n| Leaders                 = \n| CurrentMembers          = \n| FormerMembers           = \n\n| Identity                = \n| Affiliation             = \n| Allies                  = \n| Enemies                 = \n\n| Origin                  = \n| Status                  = \n| Reality                 = \n| BaseOfOperations        = \n| PlaceOfFormation        = \n| PlaceOfDissolution      = \n\n| Creators                = \n| First                   = \n| Last                    = \n\n| History                 = \n\n| Equipment               = \n| Transportation          = \n| Weapons                 = \n\n| Notes                   = \n| Trivia                  = \n| Links                   = \n}}"
					}
				}
			},
			"location": {
				label: 'Location',
				type: 'button',
				oouiIcon: 'fa',
				action: {
					type: 'encapsulate',
					options: {
						pre: "{{Location Template\n| Image                   = ",
						post: "\n| Name                    = \n| NameRef                 = \n| Aliases                 = \n\n| Reality                 = \n| Galaxy                  = \n| StarSystem              = \n| Planet                  = \n| Continent               = \n| Country                 = \n| Region                  = \n| State                   = \n| City                    = \n| Locale                  = \n\n| Population              = \n\n| Creators                = \n| First                   = \n\n| History                 = \n\n| PointsOfInterest        = \n| Residents               = \n\n| Notes                   = \n| Trivia                  = \n| Links                   = \n}}"
					}
				}
			},
			"item": {
				label: 'Item',
				type: 'button',
				oouiIcon: 'fa',
				action: {
					type: 'encapsulate',
					options: {
						pre: "{{Item Template\n| Image                   = ",
						post: "\n| Name                    = \n| NameRef                 = \n| Aliases                 = \n\n| CurrentOwner            = \n| PreviousOwners          = \n| AlternateOwners         = \n\n| Type                    = \n| Material                = \n| Dimensions              = \n| Weight                  = \n\n| Origin                  = \n| Reality                 = \n| LeadDesigner            = \n| AdditionalDesigners     = \n| PlaceOfCreation         = \n| PlaceOfDestruction      = \n\n| Creators                = \n| First                   = \n\n| History                 = \n| Properties              = \n| AlternateVersions       = \n\n| Notes                   = \n| Trivia                  = \n| Links                   = \n}}"
					}
				}
			},
			"reality": {
				label: 'Reality',
				type: 'button',
				oouiIcon: 'fa',
				action: {
					type: 'encapsulate',
					options: {
						pre: "{{Reality Template\n| Title                   = \n| Image                   = ",
						post: "\n| EarthNumber             = \n| EarthNumberRef          = \n| Aliases                 = \n| Status                  = \n\n| Creators                = \n| First                   = \n\n| History                 = \n\n| Residents               = \n| Notes                   = \n| Trivia                  = \n| Links                   = \n}}"
					}
				}
			},
			"race": {
				label: 'Race',
				type: 'button',
				oouiIcon: 'fa',
				action: {
					type: 'encapsulate',
					options: {
						pre: "{{Race Template\n| Image                   = ",
						post: "\n| Name                    = \n| NameRef                 = \n| Aliases                 = \n\n| Identity                = \n| Affiliation             = \n\n| BodyType                = \n| AvgHeight               = \n| AvgWeight               = \n| Eyes                    = \n| Hair                    = \n| Skin                    = \n| NumberOfLimbs           = \n| NumberOfFingers         = \n| NumberOfToes            = \n| SpecialAdaptations      = \n| UnusualFeatures         = \n\n| Origin                  = \n| Status                  = \n| Reality                 = \n| GalaxyOfOrigin          = \n| StarSystemOfOrigin      = \n| HomePlanet              = \n| BaseOfOperations        = \n| PlaceOfBirth            = \n\n| Creators                = \n| First                   = \n\n| History                 = \n\n| Habitat                 = \n| Gravity                 = \n| Atmosphere              = \n| Population              = \n\n| Powers                  = \n| Abilities               = \n| AvgStrength             = \n| Weaknesses              = \n\n| GovernmentType          = \n| TechnologyLevel         = \n| CulturalTraits          = \n| Representatives         = \n\n| Notes                   = \n| Trivia                  = \n| Links                   = \n}}"
					}
				}
			},
			"vehicle": {
				label: 'Vehicle',
				type: 'button',
				oouiIcon: 'fa',
				action: {
					type: 'encapsulate',
					options: {
						pre: "{{Vehicle Template\n| Image                   = ",
						post: "\n| Name                    = \n| NameRef                 = \n| Aliases                 = \n\n| CurrentOwner            = \n| PreviousOwners          = \n\n| TransportMethod         = \n| CurrentModel            = \n| PreviousModels          = \n| Dimensions              = \n\n| Origin                  = \n| Reality                 = \n| Status                  = \n\n| Creators                = \n| First                   = \n\n| History                 = \n\n| Notes                   = \n| Trivia                  = \n| Links                   = \n}}"
					}
				}
			},
			"comic": {
				label: 'Comic issue',
				type: 'button',
				oouiIcon: 'fa',
				action: {
					type: 'encapsulate',
					options: {
						pre: "{{Comic Template\n| Image1              = ",
						post: "\n| Image1_Artist1      = \n| Image2              = \n| Image2_Text         = \n| Image2_Artist1      = \n\n| ReleaseDate         = \n| Month               = \n| Year                = \n\n| Editor-in-Chief     = \n| Pages               = \n| Rating              = \n| OriginalPrice       = \n\n| Quotation           = \n| Speaker             = \n\n| StoryTitle1         = \n| Writer1_1           = \n| Penciler1_1         = \n| Inker1_1            = \n| Colorist1_1         = \n| Letterer1_1         = \n| Editor1_1           = \n\n|  Appearing1         = \n'''Featured Characters:'''\n* <br/>\n'''Supporting Characters:'''\n* <br/>\n'''Antagonists:'''\n* <br/>\n'''Other Characters:'''\n* <br/>\n'''Races and Species:'''\n* <br/>\n'''Locations:'''\n* <br/>\n'''Items:'''\n* <br/>\n'''Vehicles:'''\n* <br/>\n\n| Synopsis1           = \n\n| Solicit             = \n\n| Notes               = \n| Trivia              = \n| Recommended         = \n| Links               = \n}}"
					}
				}
			},
			"volume": {
				label: 'Volume',
				type: 'button',
				oouiIcon: 'fa',
				action: {
				type: 'encapsulate',
					options: {
						pre: "{{Volume Template\n| volume_logo             = \n| PreviousVol             = \n| NextVol                 = \n| publisher               = \n| format                  = \n| type                    = \n| genres                  = \n| featured                = \n\n| SeeAlso                 = \n\n",
						post: "}}"
					}
				}
			},
			"image": {
				label: 'Image',
				type: 'button',
				oouiIcon: 'fa',
				action: {
					type: 'encapsulate',
					options: {
						pre: "{{Image Template\n| License                 = ",
						post: "\n| ImageType               = \n\n| Reality                 = \n| Subject1                = \n| Subject2                = \n| Subject3                = \n| Subject4                = \n| Subject5                = \n\n| Source                  = \n| CoverArtist1            = \n| Penciler1               = \n| Inker1                  = \n| Colorist1               = \n| Letterer1               = \n}}"
					}
				}
			},
			"gallery2": {
				label: 'Gallery',
				type: 'button',
				oouiIcon: 'fa',
				action: {
					type: 'encapsulate',
					options: {
						pre: "{{Gallery Template\n| GalleryType             = \n| GalleryData             = \n\n==Comics==\n===Interior Art===\n<gallery position=\"center\" captionalign=\"center\">\n",
						post: "\n</gallery>\n\n| SeeAlso                 = \n}}"
					}
				}
			},
			"episode": {
				label: 'Episode',
				type: 'button',
				oouiIcon: 'fa',
				action: {
					type: 'encapsulate',
					options: {
						pre: "{{Episode Template\n| Image               = ",
						post: "\n| Day                 = \n| Month               = \n| Year                = \n\n| Director1           = \n| Producer1           = \n| Writer1             = \n\n| Quotation           = \n| Speaker             = \n\n| EpisodeTitle        = \n| Synopsis            = \n\n| Appearing           = \n'''Featured Characters:'''\n* <br/>\n'''Supporting Characters:'''\n* <br/>\n'''Antagonists:'''\n* <br/>\n'''Other Characters:'''\n* <br/>\n'''Locations:'''\n* <br/>\n'''Items:'''\n* <br/>\n'''Vehicles:'''\n* <br/>\n\n| Notes               = \n| Trivia              = \n| Recommended         = \n| Links               = \n}}"
					}
				}
			},
			"creator": {
				label: 'Creators',
				type: 'button',
				oouiIcon: 'fa',
				action: {
					type: 'encapsulate',
					options: {
						pre: "{{Creator Template\n| Image                   = ",
						post: "\n| Name                    = \n| Pseudonyms              = \n\n| Gender                  = \n| DateOfBirth             = \n| PlaceOfBirth            = \n\n| Employers               = \n| Titles                  = \n| First                   = \n| Last                    = \n| NotableCreations        = \n\n| PersonalHistory         = \n| ProfessionalHistory     = \n\n| Notes                   = \n| Trivia                  = \n| OfficialWebsite         = \n| Links                   = \n}}"
					}
				}
			}
		}
	} );
	
	var md_custom_buttons = ['character', 'team', 'location', 'item', 'reality', 'race', 'vehicle', 'comic', 'volume', 'image', 'gallery2', 'episode', 'creator', 'cat', 'disambiguation', 'disambiguation2', 'move', 'delete', 'merge_to', 'merge_from', 'split', 'plagiarism'];
	var md_custom_buttons_fa = ['fa-user', 'fa-users', 'fa-city', 'fa-bomb', 'fa-globe', 'fa-skull', 'fa-car', 'fa-book-open', 'fa-lines-leaning', 'fa-image', 'fa-images', 'fa-tv', 'fa-briefcase', 'fa-cat', 'fa-sitemap', 'fa-arrows-split-up-and-left', 'fa-arrow-right', 'fa-trash', 'fa-right-to-bracket', 'fa-right-from-bracket', 'fa-right-left', 'fa-triangle-exclamation'];
	for (i = 0; i < md_custom_buttons.length; i++) {
		var md_span = document.querySelector('.wikiEditor-ui-toolbar span[rel="'+ md_custom_buttons[i] +'"] a');
		md_span.textContent = '';
		md_span.innerHTML = '<span class="oo-ui-indicatorElement-indicator oo-ui-indicatorElement-noIndicator md-fa-toolbar-button fa ' + md_custom_buttons_fa[i] + '"></span>';
	}
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