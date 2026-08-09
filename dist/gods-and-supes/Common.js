// [[Category:Internal]]
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
                    	} else if (media_type[1] == 'Sourcebook') {
                    		media_type_class = 'category-link-media-sourcebook'
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
// THE BELOW CODE randomly changes text above top navigation from "Marvel Database" to one from the list
//////////////////////////////////////////////////////////////////// */

var wiki_names = ["True Believers!", "'Nuff Said!", "Excelsior!", "With Great Power...", "Comes great responsibility...", "Anyone can wear the mask.", "Thwip!", "I'm your friendly neighborhood Spider-Man.", "I couldn't save her.", "You know, I'm something of a scientist myself.", "Can the Spider-Man come out to play?!", "You can't do this to me...", "Nah. I'ma do my own thing.", "I stop holding back my punches...", "That’s all it is, Miles. A leap of faith.", "I shall become… the Superior Spider-Man!", "You're not a nobody, you're somebody!", "Spider-Man always gets up.", "For me, it was my best friend.", "Surprise attack!", "The Last Hunt.", "And the wind... smells like rain.", "Poor Peter Parker...", "Hulk Smash!", "Avengers Assemble!", "To Me, My X-Men!", "It's Clobberin' Time!", "Flame On!", "Wakanda Forever!", "I Am Iron Man", "I Am Groot", "If They Be Worthy...", "By the Bristling Beard of Odin!", "I am Batman.", "I am vengeance", "In brightest day, in blackest night, no evil shall escape my sight…", "All it takes is one bad day", "Faster Than A Speeding Bullet...", "It was me, Barry!", "Darkseid Is.", "It's A Bird!", "It's A Plane!", "It's Superman!"];
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
						post: "\n|reason        = \n}}"
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
						pre: "{{Gods & Supes Wiki:Character Template\n| Image                   = ",
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
						pre: "{{Gods & Supes Wiki:Team Template\n| Image                   = ",
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
						pre: "{{Gods & Supes Wiki:Location Template\n| Image                   = ",
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
						pre: "{{Gods & Supes Wiki:Item Template\n| Image                   = ",
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
						pre: "{{Gods & Supes Wiki:Reality Template\n| Title                   = \n| Image                   = ",
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
						pre: "{{Gods & Supes Wiki:Race Template\n| Image                   = ",
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
						pre: "{{MGods & Supes Wiki:Vehicle Template\n| Image                   = ",
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
						pre: "{{Gods & Supes Wikie:Comic Template\n| Image1              = ",
						post: "\n| Image1_Artist1      = \n| Image2              = \n| Image2_Text         = \n| Image2_Artist1      = \n\n| ReleaseDate         = \n| Month               = \n| Year                = \n| MarvelUnlimitedID   = \n\n| Editor-in-Chief     = \n| Pages               = \n| Rating              = \n| OriginalPrice       = \n\n| Quotation           = \n| Speaker             = \n\n| StoryTitle1         = \n| Writer1_1           = \n| Penciler1_1         = \n| Inker1_1            = \n| Colorist1_1         = \n| Letterer1_1         = \n| Editor1_1           = \n\n|  Appearing1         = \n'''Featured Characters:'''\n* <br/>\n'''Supporting Characters:'''\n* <br/>\n'''Antagonists:'''\n* <br/>\n'''Other Characters:'''\n* <br/>\n'''Races and Species:'''\n* <br/>\n'''Realities:'''\n* <br/>\n'''Locations:'''\n* <br/>\n'''Items:'''\n* <br/>\n'''Vehicles:'''\n* <br/>\n\n| Synopsis1           = \n\n| Solicit             = \n\n| Notes               = \n| Trivia              = \n| Recommended         = \n| Links               = \n}}"
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
						pre: "{{Gods & Supes Wiki:Volume Template\n| volume_logo             = \n| PreviousVol             = \n| NextVol                 = \n| publisher               = \n| format                  = \n| type                    = \n| genres                  = \n| featured                = \n\n| SeeAlso                 = \n\n",
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
						pre: "{{Gods & Supes Wiki:Image Template\n| License                 = ",
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
						pre: "{{Gods & Supes Wiki:Gallery Template\n| GalleryType             = \n| GalleryData             = \n\n==Comics==\n===Interior Art===\n<gallery position=\"center\" captionalign=\"center\">\n",
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
						pre: "{{Gods & Supes Wiki:Episode Template\n| Image               = ",
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
						pre: "{{Gods & Supes Wiki:Creator Template\n| Image                   = ",
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

// Template dependencies
mw.hook("wikipage.content").add(function() {
	
	// [[Module:CSS]]; [[T:CSS]]
	// $("span.import-css").each(function() {
	// 	const css = mw.util.addCSS($(this).attr("data-css"));
	// 	$(css.ownerNode).addClass("import-css")
	// 		.attr("data-css-hash", $(this).attr("data-css-hash"))
	// 		.attr("data-from", $(this).attr("data-from"))
	// 		.attr("data-wait", $(this).attr("data-wait"))
	// 		.attr("data-portal", $(this).attr("data-portal"));
		
	// 	const wait = $(this).attr("data-wait");
	// 	const portal = $(this).attr("data-portal");
	// 	var portalOpened = false;
		
	// 	if (wait != "none") {
	// 		css.disabled = true;
	// 		var timer = setTimeout(() => css.disabled = false, wait);
	// 	}
		
	// 	if (portal != "none") {
	// 		css.disabled = true;
	// 		$(".t-css-portal-" + portal).click(function() {
	// 			css.disabled = !css.disabled;
	// 			portalOpened = true;
	// 		});
	// 	}
		
	// 	$(".theme-toggler").click(function() {
	// 		switch (true) {
	// 			case wait != "none":
	// 				if (timer || css.disabled == false) {
	// 					clearTimeout(timer);
	// 					timer = false;
	// 					css.disabled = true;
	// 				} else css.disabled = false;
	// 				break;
	// 			case portal != "none":
	// 				if (portalOpened) css.disabled = !css.disabled;
	// 				break;
	// 			default:
	// 				css.disabled = !css.disabled;
	// 				break;
	// 		}
	// 	});
	// });
	
	// [[Template:Audio]] toggle
	$(".t-audio").each(function() {
		const toggle = $(this).attr("data-toggle");
		const toggleFunction = $(this).attr("data-toggle-function");
		const fadeSteps = Math.round(250 * toggleFunction.replace(/fade-(in|out)-/, ""));
		if (toggle != "none") {
			$(".t-audio-toggle-" + toggle).click(function () {
				const audio = $(`.t-audio-toggle-${toggle} audio`)[0];
				switch (true) {
					case toggleFunction.includes("time"):
						audio.currentTime = toggleFunction.replace("time-", "");
						audio.play();
						break;
					case toggleFunction.includes("fade-in"):
						audio.play();
						(function loop(i) {
							setTimeout(() => {
								console.log((-i + fadeSteps) / fadeSteps);
								if (--i > -1) loop(i);
						    }, 4);
						})(fadeSteps - 1);
						break;
					case toggleFunction.includes("fade-out"):
						audio.play();
						(function loop(i) {
							setTimeout(() => {
								console.log((i) / fadeSteps);
								if (--i > -1) loop(i);
						    }, 4);
						})(fadeSteps - 1);
						break;
					default:
						audio.paused ? audio.play() : audio.pause();
						break;
				}
			});
		}
	});
});



// UserTags config
window.UserTagsJS = {
	modules: {},
	tags: {
		inactive: { order: -2 },
		bot: { link:'Help:Bots', order: -1 },
		bureaucrat: { order: 0 },
		sysop: { order: 1 },
		'content-moderator': { order: 2 },
		threadmoderator: { order: 3 }
	}
};

UserTagsJS.modules.inactive = { days: 90, zeroIsInactive: true };
UserTagsJS.modules.autoconfirmed = false;
UserTagsJS.modules.newuser = false;
UserTagsJS.modules.metafilter = false;


window.WikiForumNS = [4, 110];

importScriptPage('Countdown/code.js', 'dev');
importScriptPage('ShowHide/code.js', 'dev');
importScriptPage('PreloadFileDescription/code.js', 'dev');
/* Spoiler Alert */
SpoilerAlert = {
    isSpoiler: function () {
        return -1 !== wgCategories.indexOf('Spoiler');
  },
    back: true
};
importScriptPage('SpoilerAlert/code.js', 'dev');
importScriptPage('BackToTopButton/code.js', 'dev');

$(function(){
	importArticles({
		type: "script",
		articles: ["u:pad.wikia.com:MediaWiki:FilterTable.js"]
	});
});

// 1. DiscussionTemplates configuration option
window.DiscussionTemplates = {
    templates: {
        '3RR': {
            name: 'Template:3RR',
            title: 'Three-Revert Rule'
        },
        'ImageHelp': {
            name: 'Template:ImageHelp',
            title: 'ImageHelp'
        },
        'MoveWarning': {
        	name: 'Template:MoveWarning',
        	title: 'MoveWarning'
        },
        'New-Images': {
        	name: 'Template:New Images',
        	title: 'New Images'
        },
        'Visual': {
        	name: 'Template:Visual',
        	title: 'Visual'
        },
        'W': {
        	name: 'W',
        	title: 'W'
        },
        'Welcome': {
        	name: 'Welcome',
        	title: 'Welcome'
        },
        'Warning1': {
        	name: 'Warning1',
        	title: 'Warning1'
        },
        'Warning2': {
        	name: 'Warning2',
        	title: 'Warning2'
        },
        'Warning3': {
        	name: 'Warning3',
        	title: 'Warning3'
        },
        'WarningCategory': {
        	name: 'WarningCategory',
        	title: 'Category Warning',
        },
        'WarningTalk': {
            name: 'Template:WarningTalk',
            title: 'Talk Warning'
        }
    },
    allowedGroups: ['sysop', 'content-moderator']
};

// 2. DiscussionTemplates import statement
importArticles({
	type: 'script',
	articles: [
		'u:dev:MediaWiki:DiscussionTemplates.js'
		]
});

// Configuration for Pathway application form
window.adoptInternational = {
    unsupportedLanguages: window.communityRequestsUnsupportedLangs,
    adoptionConfig: {
        blockDays: 0,
        activeDays: 30,
        permissionTypes: [
            'bureaucrat',
            'sysop',
            'content-mod',
            'thread-mod'
        ],
    },
    pageConfig: {
        namespace: 'Pathway application',
        namespaceId: 118,
        adoptionsPage: 'Pathway:Applications'
    },
    wikitextSchema: "{{bStart}}Pathway application\n" +
    "|1-Wiki User       = {{userName}}\n" +
    "|2-Discord User    = {{{DiscordURL}}}\n" +
    "|3-Rights type     = {{permissionsType}}\n" +
    "|4-Block history   = {{blockDays}}\n" +
    "|5-User activity   = {{activeDays}}\n" +
    "|6-Your motivation = <nowiki>{{comments}}</nowiki>\n" +
    "{{bEnd}}"
};

// Configuration for NoLicenseWarning
window.NoLicenseWarning = {
    forceLicense: true,
    excludedGroups: [
        'sysop',
        'threadmoderator',
        'content-moderator',
        'rollback'
    ]
};

// PreloadFileDescription
PFD_templates = '{{Image\n| media = \n| source = \n| artist = \n| note = \n| type = \n}}';

// Doomsday Clock (Created by Pr0tato210)
;(function (mw, document) {
	'use strict';

	/* Namespace */
	if (mw.doomsdayClock) {
		return; // prevent double-load
	}

	mw.doomsdayClock = {};

	/* Time calculations */
	function calculateTimeDiff(now, target) {
		var nowDate = new Date(now);
		var targetDate = new Date(target);
		var negative = target < now;

		if (negative) {
			var tmp = nowDate;
			nowDate = targetDate;
			targetDate = tmp;
		}

		var months = 0;
		var years = targetDate.getFullYear() - nowDate.getFullYear();
		months = years * 12;
		months += targetDate.getMonth() - nowDate.getMonth();

		if (targetDate.getDate() < nowDate.getDate()) {
			months--;
		}

		var afterMonths = new Date(nowDate);
		afterMonths.setMonth(afterMonths.getMonth() + months);

		var remainingSeconds = Math.floor((targetDate - afterMonths) / 1000);

		return {
			months: months,
			seconds: remainingSeconds,
			negative: negative
		};
	}

	function pad(num) {
		return num < 10 ? '0' + num : String(num);
	}

	function unitLabel(value, name) {
		var label = value === 1 ? name : name + 's';
		return label.toUpperCase();
	}

	/* Time Rendering */
	function render(targetDate, frozen, showDoomsday) {
		var now = Date.now();
		var diff = calculateTimeDiff(now, targetDate);

		var seconds = frozen ? 0 : Math.abs(diff.seconds);
		var months = frozen ? 0 : diff.months;

		var s = seconds % 60;
		seconds = Math.floor(seconds / 60);
		var m = seconds % 60;
		seconds = Math.floor(seconds / 60);
		var h = seconds % 24;
		var d = Math.floor(seconds / 24);

		var parts;
		
		if (frozen && showDoomsday) {
			parts = [
				{ v: 'D', l: unitLabel(0, 'month') },
				{ v: 'OO', l: unitLabel(0, 'day') },
				{ v: 'MS', l: unitLabel(0, 'hour') },
				{ v: 'DA', l: unitLabel(0, 'minute') },
				{ v: 'Y', l: unitLabel(0, 'second') }
			];
		} else {
			parts = [
				{ v: months, l: unitLabel(months, 'month') },
				{ v: d,      l: unitLabel(d, 'day') },
				{ v: h,      l: unitLabel(h, 'hour') },
				{ v: m,      l: unitLabel(m, 'minute') },
				{ v: s,      l: unitLabel(s, 'second') }
			];
		}

		var html = '<div class="ddc-display">';
		html += '<div class="ddc-numbers">';

		parts.forEach(function (p, i) {
			var displayValue = typeof p.v === 'string' ? p.v : pad(p.v);
			html += '<span class="ddc-number">' + displayValue + '</span>';
			if (i < parts.length - 1) {
				html += '<span class="ddc-sep">:</span>';
			}
		});

		html += '</div><div class="ddc-labels">';

		parts.forEach(function (p, i) {
			html += '<span class="ddc-label">' + p.l + '</span>';
			if (i < parts.length - 1) {
				html += '<span class="ddc-label-sep"></span>';
			}
		});

		html += '</div></div>';

		return html;
	}

	/* CSS Injection */
	function injectCSS() {
		if (document.getElementById('ddc-styles')) return;

		var style = document.createElement('style');
		style.id = 'ddc-styles';
		style.textContent = `
			.ddc-display { display: inline-flex; flex-direction: column; align-items: center; width: max-content; max-width: 100%; }
			.ddc-numbers { display: flex; font-size: clamp(24px, 5.6vw, 56px); font-weight: bold; font-family: DS-Digital, sans-serif; }
			.ddc-number { width: clamp(40px, 8vw, 80px); text-align: center; flex-shrink: 0; }
			.ddc-sep { width: clamp(10px, 2vw, 20px); text-align: center; flex-shrink: 0; }
			.ddc-labels { display: flex; font-size: clamp(10px, 1.6vw, 16px); font-family: DS-Digital, sans-serif; margin-top: clamp(-12px, -0.6vw, -15px); }
			.ddc-label { width: clamp(40px, 8vw, 80px); text-align: center; flex-shrink: 0; }
			.ddc-label-sep { width: clamp(10px, 2vw, 20px); flex-shrink: 0; }

			@supports (container-type: inline-size) {
				.doomsdayCountdown { container-type: inline-size; container-name: ddc-container; }
				@container ddc-container (max-width: 600px) {
					.ddc-numbers { font-size: clamp(20px, 7vw, 42px); }
					.ddc-number,
					.ddc-label { width: clamp(32px, 10vw, 64px); }
					.ddc-sep,
					.ddc-label-sep { width: clamp(8px, 2.5vw, 16px); }
					.ddc-labels { font-size: clamp(8px, 2vw, 13px); }
				}
				@container ddc-container (max-width: 400px) {
					.ddc-numbers { font-size: clamp(16px, 8vw, 32px); }
					.ddc-number,
					.ddc-label { width: clamp(24px, 12vw, 48px); }
					.ddc-sep,
					.ddc-label-sep { width: clamp(6px, 3vw, 12px); }
					.ddc-labels { font-size: clamp(7px, 2.5vw, 11px); }
				}
			}
		`;
		document.head.appendChild(style);
	}

	/* Initialization */
	function init($content) {
		injectCSS();

		var nodes = $content.querySelectorAll('.doomsdayCountdownDate');
		var clocks = [];

		nodes.forEach(function (node) {
			var date = new Date(node.textContent.trim()).valueOf();
			var nocountdown = node.closest('.doomsdayCountdown').querySelector('.noDoomsdayCountdown');
			
			if (isNaN(date)) {
				if (nocountdown) nocountdown.style.display = '';
				node.style.display = 'none';
				return;
			}

			if (nocountdown) nocountdown.style.display = 'none';
			node.style.display = '';

			clocks.push({
				node: node,
				date: date,
				frozen: false,
				renderedAtZero: false,
				flickerState: false
			});
		});

		if (!clocks.length) return;

		function tick() {
			clocks.forEach(function (c) {
				if (!c.frozen && Date.now() >= c.date) {
					c.frozen = true;
				}
				if (!c.frozen) {
					c.node.innerHTML = render(c.date, false, false);
				} else {
					c.node.innerHTML = render(c.date, true, c.flickerState);
				}
			});
		}

		// Flicker interval for frozen clocks (750ms)
		setInterval(function() {
			clocks.forEach(function(c) {
				if (c.frozen) {
					c.flickerState = !c.flickerState;
				}
			});
		}, 750);

		tick();
		setInterval(tick, 100); // Update more frequently to catch flicker changes
	}

	mw.hook('wikipage.content').add(function ($content) {
		init($content[0] || document);
	});

}(mediaWiki, document));

// Checks if a div with the id "OK_image" is clicked and then adds a
// "display:none" style attribute to a div with the id "notice".

document.getElementById("OK_image").addEventListener("click", function() {
    $('#notice').fadeOut(400, function () {
        this.style.display = "none";
    });
});