/* Any JavaScript here will be loaded for all users on every page load. */
// ============================================================
 
/****************************/
/* spoilers by User:Tierrie */
/****************************/
importScriptPage('Content/SpoilersToggle.js', 'scripts');
 
// BEGIN Dynamic Navigation Bars (experimantal)
// This script is from Wikipedia. For author attribution, please see http://en.wikipedia.org/w/index.php?title=MediaWiki:Common.js&action=history
  

/** Collapsible tables *********************************************************
 *
 *  Description: Allows tables to be collapsed, showing only the header. See
 *               [[Wikipedia:NavFrame]].
 *  Maintainers: [[User:R. Koot]]
 */
 
var autoCollapse = 2;
var collapseCaption = "hide";
var expandCaption = "show";
 
function collapseTable(tableIndex) {
    var Button = document.getElementById("collapseButton" + tableIndex);
    var Table = document.getElementById("collapsibleTable" + tableIndex);
 
    if (!Table || !Button) {
        return false;
    }
 
    var Rows = Table.getElementsByTagName("tr");
 
    if (Button.firstChild.data == collapseCaption) {
        for (var i = 1; i < Rows.length; i++) {
            Rows[i].style.display = "none";
        }
        Button.firstChild.data = expandCaption;
    } else {
        for (var i = 1; i < Rows.length; i++) {
            Rows[i].style.display = Rows[0].style.display;
        }
        Button.firstChild.data = collapseCaption;
    }
}
 
$(function createCollapseButtons() {
    var tableIndex = 0;
    var NavigationBoxes = new Object();
    var Tables = document.getElementsByTagName("table");
 
    for (var i = 0; i < Tables.length; i++) {
        if ($(Tables[i]).hasClass("collapsible")) {
            NavigationBoxes[tableIndex] = Tables[i];
            Tables[i].setAttribute("id", "collapsibleTable" + tableIndex);
 
            var Button = document.createElement("span");
            var ButtonLink = document.createElement("a");
            var ButtonText = document.createTextNode(collapseCaption);
 
            Button.style.styleFloat = "right";
            Button.style.cssFloat = "right";
            Button.style.fontWeight = "normal";
            Button.style.textAlign = "right";
            Button.style.width = "6em";
 
            ButtonLink.setAttribute("id", "collapseButton" + tableIndex);
            ButtonLink.setAttribute("href", "javascript:collapseTable(" + tableIndex + ");");
            ButtonLink.appendChild(ButtonText);
 
            Button.appendChild(document.createTextNode("["));
            Button.appendChild(ButtonLink);
            Button.appendChild(document.createTextNode("]"));
 
            var Header = Tables[i].getElementsByTagName("tr")[0].getElementsByTagName("th")[0];
            /* only add button and increment count if there is a header row to work with */
            if (Header) {
                Header.insertBefore(Button, Header.childNodes[0]);
                tableIndex++;
            }
        }
    }
 
    for (var i = 0; i < tableIndex; i++) {
        if ($(NavigationBoxes[i]).hasClass("collapsed") || (tableIndex >= autoCollapse && $(NavigationBoxes[i]).hasClass("autocollapse"))) {
            collapseTable(i);
        }
    }
});
 
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
function toggleNavigationBar(indexNavigationBar) {
    var NavToggle = document.getElementById("NavToggle" + indexNavigationBar);
    var NavFrame = document.getElementById("NavFrame" + indexNavigationBar);
 
    if (!NavFrame || !NavToggle) {
        return false;
    }
 
    // if shown now
    if (NavToggle.firstChild.data == NavigationBarHide) {
        for (
            var NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling
        ) {
            if ($(NavChild).hasClass('NavPic')) {
                NavChild.style.display = 'none';
            }
            if ($(NavChild).hasClass('NavContent')) {
                NavChild.style.display = 'none';
            }
        }
        NavToggle.firstChild.data = NavigationBarShow;
 
        // if hidden now
    } else if (NavToggle.firstChild.data == NavigationBarShow) {
        for (
            var NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling
        ) {
            if ($(NavChild).hasClass('NavPic')) {
                NavChild.style.display = 'block';
            }
            if ($(NavChild).hasClass('NavContent')) {
                NavChild.style.display = 'block';
            }
        }
        NavToggle.firstChild.data = NavigationBarHide;
    }
}
 
// adds show/hide-button to navigation bars
$(function createNavigationBarToggleButton() {
    var indexNavigationBar = 0;
    // iterate over all < div >-elements 
    var divs = document.getElementsByTagName("div");
    for ( var i = 0; NavFrame = divs[i]; i++ ) {
        // if found a navigation bar
        if ($(NavFrame).hasClass("NavFrame")) {
 
            indexNavigationBar++;
            var NavToggle = document.createElement("a");
            NavToggle.className = 'NavToggle';
            NavToggle.setAttribute('id', 'NavToggle' + indexNavigationBar);
            NavToggle.setAttribute('href', 'javascript:toggleNavigationBar(' + indexNavigationBar + ');');
 
            var NavToggleText = document.createTextNode(NavigationBarHide);
            NavToggle.appendChild(NavToggleText);
            // Find the NavHead and attach the toggle link (Must be this complicated because Moz's firstChild handling is borked)
            for ( var j = 0; j < NavFrame.childNodes.length; j++ ) {
                if ($(NavFrame.childNodes[j]).hasClass("NavHead")) {
                    NavFrame.childNodes[j].appendChild(NavToggle);
                }
            }
            NavFrame.setAttribute('id', 'NavFrame' + indexNavigationBar);
        }
    }
    // if more Navigation Bars found than Default: hide all
    if (NavigationBarShowDefault < indexNavigationBar) {
        for ( var i = 1; i <= indexNavigationBar; i++ ) {
            toggleNavigationBar(i);
        }
    }
});
 
// Fair Use/Source addon for image uploading. Copied from https://community.fandom.com/wiki/User_blog:Godisme/Fair_Use_and_Image_Licensing
$(function preloadUploadDesc() {
	if (wgPageName.toLowerCase() != 'special:upload') {
		return;
}
 
	document.getElementById('wpUploadDescription').appendChild(document.createTextNode("{{Fair use rationale\r| Description       = \r| Source            = \r| Portion           = \r| Purpose           = \r| Resolution        = \r| Replaceability    = \r| Other Information = \r}}"));
	
});

// *******
// Auto-Refreshing RecentChanges, Logs, Contributions, and WikiActivity (Courtesy of Sactage)
// *******
window.ajaxPages = [
    "Special:RecentChanges",
    "Special:Log",
    "Special:Contributions",
    "Special:WikiActivity"
];
window.AjaxRCRefreshText = 'AutoRefresh';

(function() {
    'use strict';
    var mconfig = mw.config.get([
        'skin',
        'wgUserLanguage',
        'wgUserName'
    ]);
    if (window.DiscordIntegratorLoaded) {
        return;
    }
    window.DiscordIntegratorLoaded = true;
    /**
     * Main object
     * @static
     */
    var DiscordIntegrator = {
        /**
         * Configuration for the plugin
         * @property config
         * @type {Object}
         */
        config: (window.DiscordIntegratorConfig || {}).siderail || {},
        /**
         * Preload resources
         */
        preload: function() {
            mw.hook('wikipage.content').add($.proxy(this.insertToContent, this));
            if (mconfig.skin !== 'oasis') {
                return;
            }
            mw.loader.using('mediawiki.api').then($.proxy(function() {
                this.api = new mw.Api();
                this.api.get({
                    action: 'query',
                    meta: 'allmessages',
                    ammessages: ['id', 'title', 'moduleHeight', 'theme', 'width', 'height', 'text', 'logged-in', 'footer'].map(function(el) {
                        return 'Custom-DiscordIntegrator-config-' + el;
                    }).join('|'),
                    amlang: mconfig.wgUserLanguage
                }).done($.proxy(function(d) {
                    if (!d.error) {
                        d.query.allmessages.forEach(function(el) {
                            if(el['*']) {
                                this.config[el.name.substring(32)] = el['*'];
                            }
                        }, this);
                        this._loading = 0;
                        ['text', 'title', 'footer'].forEach(this.parse, this);
                        if (this._loading === 0) {
                            this.init();
                        }
                    }
                }, this));
            }, this));
        },
        /**
         * Parse the configuration that needs to be parsed
         */
        parse: function(msg) {
            if (this.config[msg]) {
                ++this._loading;
                this.api.get({
                    action: 'parse',
                    text: this.config[msg]
                }).done($.proxy(function(d) {
                    if (!d.error) {
                        this.config[msg] = d.parse.text['*'];
                        if (--this._loading === 0) {
                            this.init();
                        }
                    }
                }, this));
            }
        },
        /**
         * Initializing
         */
        init: function() {
            if (this.config.id && $('#WikiaRail').length > 0) {
                var clas = $('#WikiaRail').attr('class');
                if (clas && clas.split(/\s+/).indexOf('loaded') === -1) {
                    $('#WikiaRail').on('afterLoad.rail', $.proxy(this.insertToSiderail, this));
                } else {
                    this.insertToSiderail();
                }
            }
        },
        /**
         * Inserting the widget to siderail
         */
        insertToSiderail: function() {
            var filter = $('#top-right-boxad-wrapper, #NATIVE_TABOOLA_RAIL, .content-review-module').last(),
            // TODO: Insert some user configuration here
                el = $('<div>', { class: 'DiscordIntegratorModule rail-module' });
            if (this.config.title) {
                el.append(
                    $('<h2>', {
                        'class': 'activity-heading',
                        html: this.config.title
                    })
                );
            }
            if (this.config.text) {
                el.append(
                    $('<p>', {
                        id: 'DiscordIntegratorModuleText',
                        html: this.config.text
                    })
                );
            }
            el.append(this.generateContent(this.config));
            if(this.config.footer) {
                el.append(
                    $('<p>', {
                        id: 'DiscordIntegratorModuleFooter',
                        html: this.config.footer
                    })
                );
            }
            if (filter.length > 0) {
                el.insertAfter(filter);
            } else {
                $('#WikiaRail').prepend(el);
            }
            mw.util.addCSS('.DiscordIntegratorModule { height: ' + Number(this.config.moduleHeight || 500) + 'px; }');
            mw.hook('DiscordIntegrator.added').fire();
        },
        /**
         * Finding the designated places in content
         * in which to place the widget and placing it
         */
        insertToContent: function($content) {
            $content.find('.DiscordIntegrator:not(.loaded)').each($.proxy(function(cabbage, el) {
                el = $(el);
                el.html(this.generateContent(el.data()))
                  .addClass('loaded');
            }, this));
        },
        /**
         * Generating widget content from an object
         * @todo i18n
         * @return [String] content of the widget
         */
        generateContent: function(config) {
            return config.id ? ((config.loggedIn === true || Boolean(config['logged-in']) === true) && !mconfig.wgUserName) ? 'Please log in to see this widget' : mw.html.element('iframe', {
                src: 'https://discordapp.com/widget?id=' +
                     config.id +
                     '&theme=' +
                     (config.theme === 'light' ? 'light' : 'dark'),
                width: config.width || '100%',
                height: config.height || '90%',
                allowtransparency: 'true',
                frameborder: '0'
            }) : 'Error: ID of the widget is not supplied';
        }
    };
    $($.proxy(DiscordIntegrator.preload, DiscordIntegrator));
 
	var dynamicImages = document.getElementsByClassName( 'dynamic-images'),
		i, imageSet , j;
 
	for ( i = 0; i < dynamicImages.length; i++ ) {
		imageSet = dynamicImages[i].getElementsByClassName( 'image' );
		for ( j = 0; j < imageSet.length; j++ ) {
			if ( j > 0 ) {
				imageSet[j].style.display = 'none';
			}
			imageSet[j].addEventListener( 'click', function ( event ) {
				event.stopImmediatePropagation();
				event.preventDefault();
				this.style.display = 'none';
				if ( this.nextElementSibling !== null ) {
					this.nextElementSibling.style.display = 'inline';
				} else {
					this.parentNode.getElementsByClassName( 'image' )[0].style.display = 'inline';
				}
			});
		}
	}
})();
//********************************************************************
// Added Multiple Upload Functionality, credit to Gamepedia wiki
//********************************************************************

mw.loader.load('https://help.gamepedia.com/index.php?title=MediaWiki:Gadget-multiupload.js&action=raw&ctype=text/javascript');

//**************************************************************************
// Script by Frietjes to help get rid of the Duplicate Arguments categories
//**************************************************************************
mw.loader.load('//en.wikipedia.org/w/index.php?title=User:Frietjes/findargdups.js&action=raw&ctype=text/javascript');

/*dlc/content filter code by Derugon https://gitlab.com/Derugon/mediawiki-gadget-dlc-filter*/
/**
 * Wiki-wise configuration of the DLC filter.
 */
 var dlcFilterConfig = {

	/**
	 * The path on the website to an article.
	 */
	path: 'wiki/',

	/**
	 * The list of available filters, each one being the description of the
	 * corresponding filter.
	 */
	filters: [
		/* 0001 */ 'Hide content from Higurashi Gou and Sotsu',
		/* 0010 */ 'Hide content from Higurashi Sotsu',
		/* 0100  'Hide content unavailable with the second DLC'*/
	],

	/**
	 * The namespaces where the filtering should be available.
	 */
	filteredNamespaces: [ 0 ],

	/**
	 * The HTML <a> elements which redirect to articles from a namespace with
	 * filtering enabled.
	 */
	filteredSpecialTitles: [
		'Special:Random'
	],

	/**
	 * The language codes used on the wiki.
	 */
	languageCodes: [],

	/**
	 * Some translatable messages are used with the DLC filter. These can be
	 * customized by creating/editing their corresponding page:
	 * 
	 *     <messagesLocation><messageName>
	 * 
	 * (<messagesLocation> being the value of this parameter and <messageName>
	 *  the name of the message)
	 * 
	 * If language codes have been specified, the messages can be translated by
	 * creating/editing the corresponding page:
	 * 
	 *     <messagesLocation><messageName>/<languageCode>
	 * 
	 * (<languageCode> being the corresponcing language code: one of the values
	 *  in the previously defined languageCodes array)
	 */
	messagesLocation: 'mediawiki:',

	/**
	 * Removes a DLC icon and its related content from the DOM, following custom
	 * rules.
	 * @param {Element} dlcIcon The DLC icon to remove.
	 * @returns True if the DLC icon has been handled by this function, false if
	 *          it should be handled the normal way.
	 */
	customHandler: function ( dlcIcon ) {

		// ...

		return false;
	},

	/**
	 * Does things before removing DLC icons from an element.
	 * @param {Element} element The element to remove DLC icons from.
	 */
	preprocess: function ( element ) {

		// ...

	},

	/**
	 * Does things after removing DLC icons from an element.
	 * @param {Element} element The element to remove DLC icons from.
	 */
	postprocess: function ( element ) {

		// ...

	}
};
var dlcFilter = {
	/**
	 * The version number of the DLC filter.
	 */
	version: '1.0',

	/**
	 * The parser output.
	 * @type {Element}
	 */
	parserOutput: null,
	/**
	 * The table of contents from the parser output.
	 * @type {Element}
	 */
	toc: null,
	/**
	 * The DLC filter form items.
	 * @type {HTMLLIElement[]}
	 */
	items: [],

	/**
	 * A MediaWiki API to the current wiki.
	 * @type {mwApi}
	 */
	api: null,
	/**
	 * The current URI.
	 * Used to set links to the current page with a DLC filter on or off.
	 * @type {mwUri}
	 */
	uri: null,

	/**
	 * The page global DLC filter.
	 */
	pageFilter: 0,
	/**
	 * The index of the currently selected DLC filter form item.
	 */
	selectedIndex: -1,
	/**
	 * The currently selected DLC filter.
	 */
	selectedFilter: 0,

	/**
	 * @type {[(element:Element)=>void,Element][]}
	 */
	postponed: [],

	/**
	 * Initializes the DLC filter on a page.
	 */
	init: function () {
		console.log( 'DLC Filter v' + dlcFilter.version );

		if ( "dlcFilterUtil" in window ) {
			dlcFilterUtil.selectedFilter = 0;
			dlcFilterUtil.getDlcFilter = dlcFilter.getDlcFilter;
			dlcFilterUtil.applyFilter = function () {};
		}

		if ( !dlcFilter.isFilteringAvailable() ) {
			if ( "dlcFilterUtil" in window ) {
				dlcFilterUtil.loaded = true;
			}
			return;
		}

		dlcFilter.parserOutput = document
			.getElementById( 'mw-content-text' )
			.getElementsByClassName( 'mw-parser-output' )[ 0 ];
		dlcFilter.toc          = document.getElementById( 'toc' );
		dlcFilter.api          = new mw.Api();
		dlcFilter.uri          = new mw.Uri( document.location.href );
		dlcFilter.pageFilter   = dlcFilter.getPageFilter();

		dlcFilter.generateDlcFilterItems();
		dlcFilter.insertDlcFilterElement();

		if ( !dlcFilter.updateSelectedIndex() ) {
			if ( "dlcFilterUtil" in window ) {
				dlcFilterUtil.loaded = true;
			}
			return;
		}

		dlcFilter.selectedFilter = Math.pow( 2, dlcFilter.selectedIndex );
		if ( "dlcFilterUtil" in window ) {
			dlcFilterUtil.selectedFilter = dlcFilter.selectedFilter;
			dlcFilterUtil.applyFilter = dlcFilter.applyFilter;
		}

		dlcFilter.updateSelectedDlcFilterItem();
		dlcFilter.applyFilter( dlcFilter.parserOutput );
		dlcFilter.updateAnchorsDlcFilter();

		if ( "dlcFilterUtil" in window ) {
			dlcFilterUtil.loaded = true;
		}
	},

	/**
	 * Indicates whether the filters can be used on the current page.
	 * @returns True if the filters can be used, false otherwise.
	 */
	isFilteringAvailable: function () {
		if ( document.getElementsByClassName( 'dlc-filter-enable' ).length ) {
			return true;
		}
		var namespace = dlcFilter.findClassStartingWith( document.body, 'ns-' );
		return dlcFilterConfig.filteredNamespaces.includes( +namespace );
	},

	/**
	 * Checks if the entire page is limited to some versions then sets the page
	 * global DLC filter accordingly.
	 */
	getPageFilter: function () {
		var contextBoxes = dlcFilter.parserOutput
			.getElementsByClassName( 'context-box' );
		if (
			!contextBoxes.length ||
			dlcFilter.getPreviousHeading( contextBoxes[ 0 ] )
		) {
			return Math.pow( 2, dlcFilterConfig.filters.length ) - 1;
		}
		return dlcFilter.getDlcFilter(
			contextBoxes[ 0 ].getElementsByClassName( 'dlc' )[ 0 ]
		);
	},

	/**
	 * Gets the last heading element used before an element.
	 * @param {Element} element The element.
	 * @returns The previous heading element if there is one, null otherwise.
	 */
	getPreviousHeading: function ( element ) {
		element = element.previousElementSibling;
		while ( element && !( element instanceof HTMLHeadingElement ) ) {
			element = element.previousElementSibling;
		}
		return element;
	},

	/**
	 * Gets the DLC filter of a DLC icon.
	 * @param {Element} icon The DLC icon.
	 * @returns The DLC filter of the given DLC icon, 0 otherwise.
	 */
	getDlcFilter: function ( icon ) {
		var dlcFilterClass = dlcFilter.findClassStartingWith( icon, 'dlc-' );
		return dlcFilterClass ? +dlcFilterClass : 0;
	},

	/**
	 * Gets the first class of an element beginning with a specific string.
	 * @param {Element} element The element.
	 * @param {string}  intro   The beginning of the class name.
	 * @returns The first corresponding class name, null otherwise.
	 */
	findClassStartingWith: function ( element, intro ) {
		var classList = element.classList;
		for ( var i = 0; i < classList.length; ++i ) {
			if ( classList[ i ].startsWith( intro ) ) {
				return classList[ i ].substr( intro.length );
			}
		}
		return null;
	},

	/**
	 * Generates the DLC filter form items.
	 */
	generateDlcFilterItems: function () {
		for (
			var i = 0, pow = 1;
			i < dlcFilterConfig.filters.length;
			++i, pow *= 2
		) {
			var item = document.createElement( 'li' );
			item.id = 'dlc-filter-item-' + i;
			item.classList.add( 'dlc-filter-item' );
			dlcFilter.items.push( item );
			if ( ( pow & dlcFilter.pageFilter ) === 0 ) {
				item.classList.add( 'dlc-filter-item-deactivated' );
				continue;
			}
			item.title = dlcFilterConfig.filters[ i ];
			dlcFilter.uri.extend( { dlcfilter: i } );
			var a = document.createElement( 'a' );
			a.href = dlcFilter.uri.toString();
			item.appendChild( a );
		}
	},

	/**
	 * Generates the DLC filter form and puts it on the page.
	 */
	insertDlcFilterElement: function () {
		var ul = document.createElement( 'ul' );
		ul.id = 'dlc-filter';
		for ( var i = 0; i < dlcFilter.items.length; ++i ) {
			ul.appendChild( dlcFilter.items[ i ] );
		}
		var info = document.getElementById( 'dlc-filter-info' );
		if ( !info ) {
			document.getElementById( 'firstHeading' ).appendChild( ul );
			return;
		}
		dlcFilter.getMessage( 'info', function ( pageContent ) {
			info.appendChild( pageContent || document.createTextNode(
				'Use one of the following filters to hide the wiki ' +
				'content unrelated to your game version:'
			) );
			info.appendChild( document.createElement( 'br' ) );
			info.appendChild( ul );
		} );
	},

	/**
	 * Gets the value of a localized message.
	 * @param {string}              name     The message name.
	 * @param {(e:ChildNode)=>void} callback The function to call when the
	 *                                       message has been retrieved.
	 */
	getMessage: function ( name, callback ) {
		var messagePage          = dlcFilterConfig.messagesLocation + name,
			localizedMessagePage = messagePage + '/' +
				dlcFilter.getPageLanguage();

		dlcFilter.pageExists( messagePage ).then( messagePageExists );

		function messagePageExists( /** @type {boolean} */ pageExists ) {
			if ( !pageExists ) {
				callback( null );
				return;
			}
			if ( !dlcFilterConfig.languageCodes.length ) {
				dlcFilter.getPageContent( messagePage ).then( callback );
				return;
			}
			dlcFilter
				.pageExists( localizedMessagePage )
				.then( localizedMessagePageExists );
		}

		function localizedMessagePageExists( /** @type {boolean} */ pageExists ) {
			if ( !pageExists ) {
				dlcFilter.getPageContent( messagePage ).then( callback );
				return;
			}
			dlcFilter.getPageContent( localizedMessagePage ).then( callback );
		}
	},

	/**
	 * Indicates whether a page exists.
	 * @param {string} pageName The name of the page.
	 * @returns The boolean promise.
	 */
	pageExists: function ( pageName ) {
		return dlcFilter.api
			.get( { action: 'query', titles: pageName } )
			.then( function ( ret ) {
				return !ret.query.pages[ '-1' ];
			} );
	},

	/**
	 * Gets the HTML content of a page.
	 * @param {string} pageName The name of the page.
	 * @returns The HTML content promise.
	 */
	getPageContent: function ( pageName ) {
		return dlcFilter.api
			.parse( '{{' + pageName + '}}' )
			.then( function ( parserOutput ) {
				return dlcFilter.stringToElements( parserOutput ).firstChild;
			} );
	},

	/**
	 * Generates DOM elements from a string.
	 * @param {string} str The DOM string.
	 * @returns The generated DOM elements.
	 */
	stringToElements: function ( str ) {
		var template = document.createElement( 'template' );
		template.innerHTML = str;
		return template.content.firstChild;
	},

	/**
	 * Gets the language used on the page.
	 * @returns The language code used on the page.
	 */
	getPageLanguage: function () {
		var pageName = mw.config.get( 'wgPageName' );
		var lastPartIndex = pageName.lastIndexOf( '/' );
		if ( lastPartIndex === -1 ) {
			return 'en';
		}
		var lastPart = pageName.substr( lastPartIndex + 1 );
		if ( !dlcFilterConfig.languageCodes.includes( lastPart ) ) {
			return 'en';
		}
		return lastPart;
	},

	/**
	 * Updates the index of the currently selected DLC filter form item from
	 * the URL parameters.
	 * @returns True if a valid DLC filter should be applied, false otherwise.
	 */
	updateSelectedIndex: function () {
		if ( dlcFilter.selectedIndex !== -1 ) {
			return true;
		}
		var urlParam = mw.util.getParamValue( 'dlcfilter' );
		if ( !urlParam ) {
			return false;
		}
		dlcFilter.selectedIndex = parseInt( urlParam, 10 );
		if ( dlcFilter.isIndex( dlcFilter.selectedIndex, dlcFilter.items ) ) {
			return true;
		}
		dlcFilter.selectedIndex = -1;
		return false;
	},

	/**
	 * Indicates if a number is a valid index of an array.
	 * @param {number} number The number.
	 * @param {any[]}  array  The array.
	 * @returns True if "array[ number ]" exists, false otherwise.
	 */
	isIndex: function ( number, array ) {
		return !isNaN( number ) && number >= 0 && number < array.length;
	},

	/**
	 * Removes DLC icons from an element, according to the selected filter.
	 * @param {Element} element The element to remove DLC icons from.
	 */
	applyFilter: function ( element ) {
		dlcFilterConfig.preprocess( element );
		var dlcIcons  = element.getElementsByClassName( 'dlc' );
		var oldLength = dlcIcons.length;
		for ( var i = 0; i < dlcIcons.length; ) {
			dlcFilter.removeDlcElement( dlcIcons[ i ] );
			if ( dlcIcons.length === oldLength ) {
				++i;
			} else {
				oldLength = dlcIcons.length;
			}
		}
		while ( dlcFilter.postponed.length ) {
			var todo = dlcFilter.postponed;
			dlcFilter.postponed = [];
			for ( var i = 0; i < todo.length; ++i ) {
				todo[ i ][ 0 ]( todo[ i ][ 1 ] );
			}
		}
		dlcFilterConfig.postprocess( element );
	},

	/**
	 * Removes a DLC icon and its related content if the DLC filter does not
	 * match the image one.
	 * @param {Element} element The DLC icon.
	 */
	removeDlcElement: function ( element ) {
		if (
			( dlcFilter.getDlcFilter( element ) & dlcFilter.selectedFilter ) > 0
		) {
			dlcFilter.removeDlcElementWithoutContext( element );
		} else if (
			!dlcFilterConfig.customHandler( element ) &&
			!dlcFilter.handleDlcIcon( element )
		) {
			mw.log.warn( 'unmatched dlc' );
		}
	},

	/**
	 * Removes a DLC icon and its empty parents.
	 * @param {Element} element The DLC icon.
	 */
	removeDlcElementWithoutContext: function ( element ) {
		var parent = element.parentElement;
		while (
			parent !== dlcFilter.parserOutput &&
			!dlcFilter.hasSibling( element ) &&
			parent.tagName !== 'TD'
		) {
			element = parent;
			parent = parent.parentElement;
		}
		parent.removeChild( element );
	},

	/**
	 * Indicates whether an element has a sibling. Ignores comments and
	 * "invisible" strings.
	 * @param {Element} element The element.
	 * @returns True if the element has no sibling other than a comment or an
	 *          "invisible" string.
	 */
	hasSibling: function ( element ) {
		return dlcFilter.hasPreviousSibling( element ) ||
		       dlcFilter.hasNextSibling( element );
	},

	/**
	 * Indicates whether an element has a previous sibling. Ignores comments and
	 * "invisible" strings.
	 * @param {Element} element The element.
	 * @returns True if the element has a previous sibling other than a comment
	 *          or an "invisible" string.
	 */
	hasPreviousSibling: function ( element ) {
		var sibling = element.previousSibling;
		if ( !sibling ) {
			return false;
		}
		while (
			sibling.nodeType === Node.COMMENT_NODE ||
			sibling.nodeType === Node.TEXT_NODE &&
			sibling.textContent.trim() === ''
		) {
			sibling = sibling.previousSibling;
			if ( !sibling ) {
				return false;
			}
		}
		return true;
	},

	/**
	 * Indicates whether an element has a next sibling. Ignores comments and
	 * "invisible" strings.
	 * @param {Element} element The element.
	 * @returns True if the element has a next sibling other than a comment or
	 *          an "invisible" string.
	 */
	hasNextSibling: function ( element ) {
		var sibling = element.nextSibling;
		if ( !sibling ) {
			return false;
		}
		while (
			sibling.nodeType === Node.COMMENT_NODE ||
			sibling.nodeType === Node.TEXT_NODE &&
			sibling.textContent.trim() === ''
		) {
			sibling = sibling.nextSibling;
			if ( !sibling ) {
				return false;
			}
		}
		return true;
	},

	/**
	 * Removes a DLC icon and its related content.
	 * @param {Element} dlcIcon The DLC icon.
	 * @returns True if the DLC icon has been handled properly, false otherwise.
	 */
	handleDlcIcon: function ( dlcIcon ) {
		var parent = dlcIcon.parentElement;

		if ( parent.classList.contains( 'context-box' ) ) {
			var heading = dlcFilter.getPreviousHeading( parent );
			dlcFilter.recRemoveElement( heading || parent );
			return true;
		}

		if (
			parent.tagName === 'LI' &&
			!dlcFilter.hasPreviousSibling( dlcIcon )
		) {
			dlcFilter.recRemoveElement( parent );
			return true;
		}

		if ( dlcFilter.getNextText( dlcIcon ) === '' ) {
			// TODO: Rework this part, and maybe remove it as it seems to follow
			// some unintuitive rules.
			var nextElement = dlcIcon.nextElementSibling;
			while (
				nextElement?.classList.contains( 'dlc-filter-skip' ) ||
				nextElement?.classList.contains( 'mw-collapsible-toggle' )
			) {
				nextElement = nextElement.nextElementSibling;
			}
			if ( !nextElement ) {
				dlcFilter.recRemoveElement( dlcIcon.parentElement );
				return true;
			}
			if ( nextElement.tagName === 'BR' ) {
				dlcFilter.removePreviousNodeUntil( nextElement, 'BR' );
				return true;
			}
		}

		var element         = dlcIcon;
		var previousElement = dlcIcon.previousElementSibling;
		var previousText    = dlcFilter.getPreviousText( dlcIcon );
		while (
			previousElement?.classList.contains( 'dlc-filter-skip' ) ||
			previousElement?.classList.contains( 'mw-collapsible-toggle' )
		) {
			element         = previousElement;
			previousElement = previousElement.previousElementSibling;
		}
		if (
			previousText && !previousText.endsWith( '.' ) ||
			!previousText && previousElement && previousElement.tagName !== 'BR'
		) {
			return false;
		}

		/** @type {ChildNode} */
		var node        = element,
			nextNode    = node,
			textContent = '';
		do {
			textContent = node.textContent.trimEnd();
			nextNode    = node.nextSibling;
			parent.removeChild( node );
			node = nextNode;
			if ( !node ) {
				if ( !previousElement && !previousText ) {
					dlcFilter.recRemoveElement( parent );
				}
				return true;
			}
			if ( node.nodeName === 'BR' ) {
				parent.removeChild( node );
				return true;
			}
			if (
				textContent.endsWith( '.' ) &&
				node instanceof HTMLElement &&
				node.classList.contains( 'dlc' )
			) {
				return true;
			}
		} while ( true );
	},

	/**
	 * Recursively removes an element: also removes its containers and previous
	 * headings if they are empty after the element being removed.
	 * @param {Element} element The element to remove.
	 */
	recRemoveElement: function ( element ) {
		if ( element.classList.contains( 'gallerytext' ) ) {
			while ( element.classList.contains( 'gallerybox' ) ) {
				element = element.parentElement;
			}
		}

		var parent  = element.parentElement,
			sibling = element.previousElementSibling;
		while ( dlcFilter.hasClass( sibling, 'dlc-filter-ornament' ) ) {
			parent.removeChild( sibling );
			sibling = element.previousElementSibling;
		}
		sibling = element.nextElementSibling;
		while ( dlcFilter.hasClass( sibling, 'dlc-filter-ornament' ) ) {
			parent.removeChild( sibling );
			sibling = element.nextElementSibling;
		}

		if ( element.tagName === 'TH' || element.tagName === 'TD' ) {
			dlcFilter.removeTableCell( element );
			return;
		}

		if ( element.classList.contains( 'mw-headline' ) ) {
			dlcFilter.recRemoveElement( parent );
			return;
		}

		if ( element instanceof HTMLHeadingElement ) {
			var headingLevel = dlcFilter.getHeadingLevel( element );
			sibling = element.nextElementSibling;
			while ( !dlcFilter.isOutOfSection( sibling, headingLevel ) ) {
				var toRemove = sibling;
				sibling = sibling.nextElementSibling;
				parent.removeChild( toRemove );
			}
		}

		sibling = element.previousElementSibling;
		parent.removeChild( element );
		dlcFilter.ensureNonEmptySection( sibling );
		if ( !parent.childNodes.length ) {
			dlcFilter.recRemoveElement( parent );
		}
	},

	/**
	 * Indicates whether an element or all its children have a class.
	 * @param {Element} element   The element.
	 * @param {string}  className The class name.
	 * @returns {boolean} True if the element or all its children have the
	 *                    given class, false otherwise.
	 */
	hasClass: function ( element, className ) {
		if ( !element ) {
			return false;
		}
		if ( element.classList.contains( className ) ) {
			return true;
		}
		var children = element.children;
		if ( !children.length ) {
			return false;
		}
		for ( var i = 0; i < children.length; ++i ) {
			if ( !dlcFilter.hasClass( children[ i ], className ) ) {
				return false;
			}
		}
		return true;
	},

	/**
	 * Handles the removal of a table cell, from clearing it to removing the
	 * entire table depending to the situation.
	 * @param {Element} cell The JQuery <th/td> element.
	 */
	removeTableCell: function ( cell ) {
		var row    = cell.parentElement,
			tbody  = row.parentElement,
			table  = tbody.parentElement,
			column = 0;
		for (
			var sibling = cell.previousElementSibling;
			sibling;
			sibling = sibling.previousElementSibling
		) {
			++column;
		}

		if ( tbody.tagName === 'THEAD' && cell.tagName === 'TH' ) {
			// TODO: fix with mw-collapsible & sortable
			var isLastColumn = !cell.nextElementSibling;
			row.removeChild( cell );
			if ( !tbody.nextElementSibling ) {
				return;
			}
			var nextRow = tbody.nextElementSibling.firstElementChild;
			while ( nextRow ) {
				nextRow.removeChild( nextRow.children[ column ] );
				nextRow = nextRow.nextElementSibling;
			}
			if ( isLastColumn ) {
				table.classList.remove(
					'mw-collapsible',
					'mw-made-collapsible'
				);
				$( table ).makeCollapsible();
			}
		}

		var mainColumn = dlcFilter.findClassStartingWith(
			table,
			'dlc-filter-main-column-'
		);
		if (
			mainColumn && +mainColumn === column + 1 ||
			!mainColumn && column === 0
		) {
			if ( tbody.children.length === 1 ) {
				dlcFilter.recRemoveElement( table );
				return;
			}
			tbody.removeChild( row );
			return;
		}

		if ( table.classList.contains( 'dlc-switcher-list' ) ) {
			row.removeChild( cell );
			return;
		}
		while ( cell.firstChild ) {
			cell.removeChild( cell.firstChild );
		}
	},

	/**
	 * Recursively removes an element if it is a heading and its associated section is
	 * empty. Also updates the table of contents.
	 * @param {Element} element The element.
	 */
	ensureNonEmptySection: function ( element ) {
		if ( !element ) {
			return;
		}
		while ( !( element instanceof HTMLHeadingElement ) ) {
			if ( element.id !== 'incontent_player' ) {
				return;
			}
			element = element.previousElementSibling;
		}

		if (
			!dlcFilter.isOutOfSection(
				element.nextElementSibling,
				dlcFilter.getHeadingLevel( element )
			)
		) {
			return;
		}

		if ( dlcFilter.toc ) {
			var tocElement    = dlcFilter.toc.querySelector(
				'[href="#' +
				element.getElementsByClassName( 'mw-headline' )[ 0 ].id + '"]'
			);
			var tocParent     = tocElement.parentElement;
			var tocNumber     = tocElement
					.getElementsByClassName( 'tocnumber' )[ 0 ].textContent;
			var lastDotPos    = tocNumber.lastIndexOf( '.', 1 ) + 1;
			var lastTocNumber = +tocNumber.substring( lastDotPos );

			var nextParent    = tocParent.nextElementSibling;
			while ( nextParent ) {
				var nextTocNumbers = nextParent
					.getElementsByClassName( 'tocnumber' );
				for ( var i = 0; i < nextTocNumbers.length; ++i ) {
					var textContent = nextTocNumbers[ i ].textContent;
					nextTocNumbers[ i ].textContent =
						textContent.substring( 0, lastDotPos ) + lastTocNumber +
						textContent.substring( tocNumber.length );
				}
				++lastTocNumber;
				nextParent = nextParent.nextElementSibling;
			}
			tocParent.parentNode.removeChild( tocParent );
		}

		var previousElement = element.previousElementSibling;
		element.parentNode.removeChild( element );
		dlcFilter.ensureNonEmptySection( previousElement );
	},

	/**
	 * Gets the level of a heading element.
	 * @param {Element} heading The heading element.
	 * @returns The level of the heading element.
	 */
	getHeadingLevel: function ( heading ) {
		return +heading.tagName.substr( 1 );
	},

	/**
	 * Indicates whether an element would be the first below a section defined
	 * with a previous heading element.
	 * @param {Element} element      The element.
	 * @param {number}  headingLevel The level of the last heading element.
	 * @returns True if the element is missing, defines a new section with a
	 * 	        higher or same level, or is the end of the page content.
	 */
	isOutOfSection: function ( element, headingLevel ) {
		return !element ||
		       element instanceof HTMLHeadingElement &&
			   headingLevel >= dlcFilter.getHeadingLevel( element ) ||
			   element.classList.contains( 'dlc-filter-end' );
	},

	/**
	 * Removes a node and its previous ones if they do not have the given name.
	 * @param {ChildNode} node     The node to remove.
	 * @param {string}    nodeName The node name to find to stop removing nodes.
	 */
	removePreviousNodeUntil: function ( node, nodeName ) {
		var parent   = node.parentNode,
			previous = node;
		do {
			previous = node.previousSibling;
			parent.removeChild( node );
			node     = previous;
		} while ( node && node.nodeName !== nodeName );
	},

	/**
	 * Removes a node and its following ones if they do not have the given name.
	 * @param {ChildNode} node     The node to remove.
	 * @param {string}    nodeName The node name to find to stop removing nodes.
	 */
	removeNextNodeUntil: function ( node, nodeName ) {
		var parent = node.parentNode,
			next   = node;
		do {
			next = node.nextSibling;
			parent.removeChild( node );
			node = next;
		} while ( node && node.nodeName !== nodeName );
	},

	/**
	 * Gets the text from the text node before a DOM element.
	 * @param {Element} element The element.
	 */
	getPreviousText: function ( element ) {
		var previousNode = element.previousSibling;
		return previousNode instanceof Text && previousNode.textContent ?
			previousNode.textContent.trim() :
			'';
	},

	/**
	 * Gets the text from the text node after a DOM element.
	 * @param {Element} element The element.
	 */
	getNextText: function ( element ) {
		var nextNode = element.nextSibling;
		return nextNode instanceof Text && nextNode.textContent ?
			nextNode.textContent.trim() :
			'';
	},

	/**
	 * Updates the selected DLC filter form item.
	 */
	updateSelectedDlcFilterItem: function () {
		delete dlcFilter.uri.query.dlcfilter;
		var item = dlcFilter.items[ dlcFilter.selectedIndex ];
		item.classList.add( 'dlc-filter-item-active' );
		item.firstElementChild.setAttribute( 'href', dlcFilter.uri.toString() );
	},

	/**
	 * Adds a corresponding "dlcfilter" URL parameter to anchors where none is
	 * used.
	 */
	updateAnchorsDlcFilter: function () {
		var anchors = document.getElementsByTagName( 'a' );
		for ( var i = 0; i < anchors.length; ++i ) {
			var anchor = anchors[ i ];
			if ( !anchor.href ) {
				continue;
			}
			if (
				anchor.parentElement.classList.contains( 'dlc-filter-item' )
			) {
				continue;
			}
			var uri = new mw.Uri( anchor.href );
			if (
				!uri.path.startsWith( '/' + dlcFilterConfig.path ) ||
				uri.query.dlcfilter
			) {
				continue;
			}
			var title = new mw.Title(
				uri.path.substr( dlcFilterConfig.path.length + 1 )
			);
			if (
				!dlcFilterConfig.filteredNamespaces.includes(
					title.getNamespaceId()
				) &&
				!dlcFilterConfig.filteredSpecialTitles.includes(
					title.getPrefixedText()
				)
			) {
				continue;
			}
			uri.extend( { dlcfilter: dlcFilter.selectedIndex } );
			anchor.href = uri.toString();
		}
	}
};

$( dlcFilter.init );