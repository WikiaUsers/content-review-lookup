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
 
	document.getElementById('wpUploadDescription').appendChild(document.createTextNode("{{Fair use rationale\r| Description       = \r| Source            = \r| Replaceability    = \r| Other Information = \r}}"));
	
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


/*testing content filter by Derugon*/
/**
 * Wiki-wise configuration of the content filter.
 */
var contentFilterConfig = {

	/**
	 * The list of available filters, each one being the description of the
	 * corresponding filter.
	 * @type {string[]}
	 */
	filters: [
		/* 01 */ 'Hide spoilers',
		/* 10 */ 'Show spoilers'
	],

	/**
	 * The namespaces where the filtering should be available.
	 * @type {number[]}
	 */
	filteredNamespaces: [ 0, 2 ],

	/**
	 * The pages where the filtering should be available, if they are not from a
	 * namespace where the filtering is available.
	 * @type {string[]}
	 */
	filteredSpecialTitles: [
		'Special:Random'
	],

	/**
	 * If an element on a page has this class (directly on the page or
	 * transcluded), the filtering becomes available, even if the page is not
	 * from a namespace in filteredNamespaces or in filteredSpecialTitles.
	 * Use false to disable this functionality.
	 * @type {string|false}
	 */
	filterEnableClass: false,

	/**
	 * The language codes used on the wiki.
	 * @type {string[]}
	 */
	languageCodes: [],

	/**
	 * Some translatable messages are used with the content filter. These can be
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
	 * @type {string}
	 */
	messagesLocation: 'mediawiki:content-filter/',

	/**
	 * The name of the URL parameter used to store the selected filter.
	 * @type {string}
	 */
	urlParam: 'contentfilter',

	/**
	 * If an element with this ID is on a page (directly on the page or
	 * transcluded), it will be filled with the "info" message (see the
	 * messagesLocation parameter) followed by the filter buttons. These will
	 * then not appear on the page header.
	 * Use false to disable this functionality.
	 * @type {string|false}
	 */
	filtersInfoId: false,

	/**
	 * To indicate with which filters some content should be visible or hidden,
	 * the corresponding elements have to use a specific filtering class:
	 * 
	 *     <filterClassIntro><mask>
	 * 
	 * (<filterClassIntro> being the value of this parameter and <mask>
	 *  the bitmask of the filters the associated content should be available
	 *  with)
	 * 
	 * Each element also has to use a filtering type class (either
	 * blockFilterClass, wrapperFilterClass, or inlineFilterClass).
	 * 
	 * For instance, if the available filters were previously defined as:
	 * 
	 *     filters: [
	 *         'filter1',  // 01
	 *         'filter2'   // 10
	 *     ],
	 * 
	 * using "0" (00) as <mask> will hide the content while any of the filters
	 * are enabled, using "1" (01) as <mask> will hide the content while the
	 * second filter is enabled, using "2" (10) as <mask> will hide the content
	 * while the first filter is enabled, using "3" (11) as <mask> will have no
	 * effect (the content will be shown with any filter enabled). If the value
	 * of this parameter is 'filter-', then the following tags are valid uses:
	 * 
	 *     <span class="filter-2 …"> … </span>
	 *     <img class="filter-1 …" />
	 * 
	 * @type {string}
	 */
	filterClassIntro: 'spoiler-',

	/**
	 * This class can be used on elements to indicate that they should be
	 * removed entirely if the selected filter does not match the element
	 * bitmask, and left in place otherwise.
	 * Use false to disable this functionality.
	 * @type {string|false}
	 */
	blockFilterClass: false,

	/**
	 * This class can be used on elements to indicate that they should be
	 * unwrapped if the selected filter does not match the element bitmask
	 * (the element itself is removed, its content is left in place), and left
	 * in place otherwise.
	 * Use false to disable this functionality.
	 * @type {string|false}
	 */
	wrapperFilterClass: 'spoiler',

	/**
	 * This class can be used on elements to indicate that they should be
	 * removed if any filter is enabled. Their associated content is then
	 * removed if the selected filter does not match the element bitmask, and
	 * left in place otherwise.
	 * Use false to disable this functionality.
	 * @type {string|false}
	 */
	inlineFilterClass: false,

	/**
	 * If an element with a filter bitmask class is inside an element with this
	 * class, the corresponding bitmask is applied to the surrounding section.
	 * If the element is not in a section, then the bitmask is applied to the
	 * entire page: the filter buttons not matching the bitmask are disabled.
	 * Use false to disable this functionality.
	 * @type {string|false}
	 */
	contextFilterClass: false,

	/**
	 * This class can be used on elements to make them invisible to filtering:
	 * the script will go through them when trying to remove elements. For
	 * instance, the button used to collapse tables (.mw-collapsible-toggle) is
	 * skipped by default.
	 * Use false to disable this functionality.
	 * @type {string|false}
	 */
	skipClass: false,

	/**
	 * If a page has navigation bars or elements considered out of the page
	 * content at the bottom of the page, using this class on at least the first
	 * one will prevent these elements from being removed with a previous
	 * section (see contextFilterClass).
	 * Use false to disable this functionality.
	 * @type {string|false}
	 */
	contentEndClass: false,

	/**
	 * By default, a row is removed from a table if its first cell is removed.
	 * If the title cell of a table is not the first one, then a class with the
	 * following format can be used to indicate which cell should be considered
	 * the main one:
	 * 
	 *     <mainColumnClassIntro><index>
	 * 
	 * (<mainColumnClassIntro> being the value of this parameter and <index>
	 *  the index of the main cell, the first one being 1)
	 * 
	 * For instance, if the value of this parameter is 'main-column-', then the
	 * following classes can be used to respectively make the second and third
	 * columns the main ones:
	 * 
	 *     {| class="main-column-2"
	 *      ! Column 1
	 *      ! Main column 2
	 *      ! Column 3
	 *      …
	 *      |}
	 *     {| class="main-column-3"
	 *      ! Column 1
	 *      ! Column 2
	 *      ! Main column 3
	 *      …
	 *      |}
	 * 
	 * Use false to disable this functionality.
	 * @type {string|false}
	 */
	mainColumnClassIntro: false,

	/**
	 * If a table has this class, its cells can be removed (instead of being
	 * only cleared), the following cells on the column will then be shifted.
	 * Use false to disable this functionality.
	 * @type {string|false}
	 */
	listTableClass: false,

	/**
	 * This class works the same way as skipClass, except that it will try to
	 * put back the element on the page somewhere else if it has to be removed.
	 * Use false to disable this functionality.
	 * @type {string|false}
	 */
	inContentAddClass: false,

	/**
	 * Removes an element with a block filter, following custom rules.
	 * @param {Element} element The element to remove.
	 * @returns True if the removal has been handled by this function, false if
	 *          it should be handled the default way.
	 */
	blockFilterCustomHandler: function ( element ) {
		return false;
	},

	/**
	 * Removes an element with a wrapper filter, following custom rules.
	 * @param {Element} element The element to remove.
	 * @returns True if the removal has been handled by this function, false if
	 *          it should be handled the default way.
	 */
	wrapperFilterCustomHandler: function ( element ) {
		contentFilter.removePreviousNodeUntilText( element, '.' );
		return false;
	},

	/**
	 * Removes an element with an inline filter and its related content,
	 * following custom rules.
	 * @param {Element} element The element to remove.
	 * @returns True if the removal has been handled by this function, false if
	 *          it should be handled the default way.
	 */
	inlineFilterCustomHandler: function ( element ) {
		return false;
	},

	/**
	 * Does things before removing elements with a filter from a container.
	 * @param {Element} container The container to remove elements from.
	 */
	preprocess: function ( container ) {
		// Adds a numeric filter to spoiler tags to tell the script the tags
		// should be hidden with the first filter enabled ("Hide spoilers").
		var spoilers = container.getElementsByClassName( 'spoiler' );
		for ( var i = spoilers.length - 1; i >= 0; --i ) {
			spoilers.item( i ).classList.add( 'spoiler-2' );
		}
	},

	/**
	 * Does things after removing elements with a filter from a container.
	 * @param {Element} container The container to remove elements from.
	 */
	postprocess: function ( container ) {}
};



/**
 * Removes information from pages according to a filter, which can be
 * enabled/disabled from the toolbar.
 */
var contentFilter = {
	/**
	 * The version number of the content filter.
	 */
	version: '1.2',

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
	 * The filter form items.
	 * @type {HTMLLIElement[]}
	 */
	items: [],

	/**
	 * A MediaWiki API to the current wiki.
	 * @type {mw.Api}
	 */
	api: null,
	/**
	 * The current URI.
	 * Used to set links to the current page with a filter on or off.
	 * @type {mw.Uri}
	 */
	uri: null,

	/**
	 * The page global filter.
	 */
	pageFilter: 0,
	/**
	 * The index of the currently selected filter form item.
	 */
	selectedIndex: -1,
	/**
	 * The currently selected filter.
	 */
	selectedFilter: 0,

	/**
	 * @type {[(element:Element)=>void,Element][]}
	 */
	postponed: [],

	/**
	 * Initializes the content filter on a page.
	 */
	init: function () {
		console.log( 'Content Filter v' + contentFilter.version );

		try {
			contentFilterConfig;
		} catch ( _ ) {
			mw.log.error(
				'Content Filter: The configuration object is undefined. ' +
				'Please define a contentFilterConfig object this script ' +
				'would have access to.'
			);
			return;
		}
		var isUtilDefined = true;
		try {
			contentFilterUtil.selectedFilter = 0;
			contentFilterUtil.getFilterMax   = contentFilter.getFilterMax;
			contentFilterUtil.getFilter      = contentFilter.getFilter;
			contentFilterUtil.applyFilter    = function () {};
		} catch ( _ ) {
			isUtilDefined = false;
		}

		if ( !contentFilter.isFilteringAvailable() ) {
			if ( isUtilDefined ) {
				contentFilterUtil.loaded = true;
			}
			return;
		}

		var contentText = document.getElementById( 'mw-content-text' );
		contentFilter.parserOutput = contentText ?
			contentText.getElementsByClassName( 'mw-parser-output' )[ 0 ] :
			null;
		contentFilter.toc          = document.getElementById( 'toc' );
		contentFilter.api          = new mw.Api();
		contentFilter.uri          = new mw.Uri( document.location.href );
		contentFilter.pageFilter   = contentFilter.getPageFilter();

		contentFilter.generateFilterItems();
		contentFilter.insertFilterElement();

		if ( !contentFilter.updateSelectedIndex() ) {
			if ( isUtilDefined ) {
				contentFilterUtil.loaded = true;
			}
			return;
		}

		contentFilter.selectedFilter = Math.pow( 2, contentFilter.selectedIndex );
		if ( isUtilDefined ) {
			contentFilterUtil.selectedFilter = contentFilter.selectedFilter;
			contentFilterUtil.applyFilter = contentFilter.applyFilter;
		}

		contentFilter.updateSelectedFilterItem();
		contentFilter.applyFilter( contentFilter.parserOutput );
		contentFilter.updateAnchorsFilter();

		if ( isUtilDefined ) {
			contentFilterUtil.loaded = true;
		}
	},

	/**
	 * Indicates whether the filters can be used on the current page.
	 * @returns True if the filters can be used, false otherwise.
	 */
	isFilteringAvailable: function () {
		if (
			contentFilterConfig.filterEnableClass &&
			document.getElementsByClassName(
				contentFilterConfig.filterEnableClass
			).length
		) {
			return true;
		}
		var namespace = contentFilter.findClassStartingWith( document.body, 'ns-' );
		return contentFilterConfig.filteredNamespaces.includes( +namespace );
	},

	/**
	 * Checks if the entire page is limited to some versions then sets the page
	 * global filter accordingly.
	 */
	getPageFilter: function () {
		if (
			!contentFilterConfig.contextFilterClass ||
			!contentFilter.parserOutput
		) {
			return contentFilter.getFilterMax();
		}
		var contextBoxes = contentFilter.parserOutput
			.getElementsByClassName( contentFilterConfig.contextFilterClass );
		if (
			!contextBoxes.length ||
			contentFilter.getPreviousHeading( contextBoxes[ 0 ] )
		) {
			return contentFilter.getFilterMax();
		}
		if ( contentFilterConfig.blockFilterClass ) {
			var blockElement = contextBoxes[ 0 ].getElementsByClassName(
				contentFilterConfig.blockFilterClass
			)[ 0 ];
			if ( blockElement ) {
				return contentFilter.getFilter( blockElement );
			}
		}
		if ( contentFilterConfig.wrapperFilterClass ) {
			var wrapperElement = contextBoxes[ 0 ].getElementsByClassName(
				contentFilterConfig.wrapperFilterClass
			)[ 0 ];
			if ( wrapperElement ) {
				return contentFilter.getFilter( wrapperElement );
			}
		}
		if ( contentFilterConfig.inlineFilterClass ) {
			var inlineElement = contextBoxes[ 0 ].getElementsByClassName(
				contentFilterConfig.inlineFilterClass
			)[ 0 ];
			if ( inlineElement ) {
				return contentFilter.getFilter( inlineElement );
			}
		}
		return 0;
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
	 * Gets the numeric filter preventing content from being removed with any
	 * filter.
	 * @returns The maximum allowed numeric filter.
	 */
	getFilterMax: function () {
		return Math.pow( 2, contentFilterConfig.filters.length ) - 1;
	},

	/**
	 * Gets the numeric filter of an element.
	 * @param {Element} element The element.
	 * @returns The numeric filter of the given element, 0 otherwise.
	 */
	getFilter: function ( element ) {
		var filterClass = contentFilter.findClassStartingWith(
			element,
			contentFilterConfig.filterClassIntro
		);
		return filterClass ? +filterClass : 0;
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
	 * Generates the filter form items.
	 */
	generateFilterItems: function () {
		var itemBase = document.createElement( 'li' );
		itemBase.classList.add( 'content-filter-item' );
		itemBase.appendChild( document.createElement( 'a' ) );
		for (
			var i = 0, pow = 1;
			i < contentFilterConfig.filters.length;
			++i, pow *= 2
		) {
			var item = itemBase.cloneNode( true );
			item.id = 'content-filter-item-' + i;
			contentFilter.items.push( item );
			if ( ( pow & contentFilter.pageFilter ) === 0 ) {
				item.classList.add( 'content-filter-item-deactivated' );
				continue;
			}
			item.title = contentFilterConfig.filters[ i ];
			/** @type {{[k:string]:number}} */
			var obj = {};
			obj[ contentFilterConfig.urlParam ] = i;
			contentFilter.uri.extend( obj );
			/** @type {HTMLAnchorElement} */
			( item.firstChild ).href = contentFilter.uri.toString();
		}
	},

	/**
	 * Generates the filter form and puts it on the page.
	 */
	insertFilterElement: function () {
		var ul = document.createElement( 'ul' );
		ul.id = 'content-filter';
		for ( var i = 0; i < contentFilter.items.length; ++i ) {
			ul.appendChild( contentFilter.items[ i ] );
		}
		var info = contentFilterConfig.filtersInfoId &&
			document.getElementById( contentFilterConfig.filtersInfoId );
		if ( !info ) {
			var wrapper = document
				.getElementsByClassName( 'page-header__actions' )
				.item( 0 );
			wrapper.prepend( ul );
			return;
		}
		contentFilter.getMessage( 'info', function ( pageContent ) {
			info.append(
				pageContent || document.createTextNode(
					'Use one of the following filters to hide the wiki ' +
					'content unrelated to your game version:'
				),
				document.createElement( 'br' ),
				ul
			);
		} );
	},

	/**
	 * Gets the value of a localized message.
	 * @param {string}              name     The message name.
	 * @param {(e:ChildNode)=>void} callback The function to call when the
	 *                                       message has been retrieved.
	 */
	getMessage: function ( name, callback ) {
		var messagePage          = contentFilterConfig.messagesLocation + name,
			localizedMessagePage = messagePage + '/' +
				contentFilter.getPageLanguage();

		contentFilter.pageExists( messagePage ).then( messagePageExists );

		function messagePageExists( /** @type {boolean} */ pageExists ) {
			if ( !pageExists ) {
				callback( null );
				return;
			}
			if ( !contentFilterConfig.languageCodes.length ) {
				contentFilter.getPageContent( messagePage ).then( callback );
				return;
			}
			contentFilter
				.pageExists( localizedMessagePage )
				.then( localizedMessagePageExists );
		}

		function localizedMessagePageExists( /** @type {boolean} */ pageExists ) {
			if ( !pageExists ) {
				contentFilter.getPageContent( messagePage ).then( callback );
				return;
			}
			contentFilter.getPageContent( localizedMessagePage ).then( callback );
		}
	},

	/**
	 * Indicates whether a page exists.
	 * @param {string} pageName The name of the page.
	 * @returns The boolean promise.
	 */
	pageExists: function ( pageName ) {
		return contentFilter.api
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
		return contentFilter.api
			.parse( '{{' + pageName + '}}' )
			.then( function ( parserOutput ) {
				return contentFilter.stringToElements( parserOutput ).firstChild;
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
		var pageName = mw.config.get( 'wgPageName' ),
			lastPartIndex = pageName.lastIndexOf( '/' );
		if ( lastPartIndex === -1 ) {
			return 'en';
		}
		var lastPart = pageName.substr( lastPartIndex + 1 );
		if ( !contentFilterConfig.languageCodes.includes( lastPart ) ) {
			return 'en';
		}
		return lastPart;
	},

	/**
	 * Updates the index of the currently selected filter form item from the URL
	 * parameters.
	 * @returns True if a valid filter should be applied, false otherwise.
	 */
	updateSelectedIndex: function () {
		if ( contentFilter.selectedIndex !== -1 ) {
			return true;
		}
		var urlParam = mw.util.getParamValue( contentFilterConfig.urlParam );
		if ( !urlParam ) {
			return false;
		}
		contentFilter.selectedIndex = parseInt( urlParam, 10 );
		if (
			contentFilter.isIndex(
				contentFilter.selectedIndex,
				contentFilter.items
			)
		) {
			return true;
		}
		contentFilter.selectedIndex = -1;
		mw.log.error(
			'Content Filter: The selected numeric filter (' + urlParam + ') ' +
			'is unavailable, please use an integer x so 0 ≤ x ≤ ' +
			( contentFilter.items.length - 1 ) + '. No filtering will be ' +
			'performed.'
		);
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
	 * Removes elements with a filter from a container.
	 * @param {Element} container The container to remove elements from.
	 */
	applyFilter: function ( container ) {
		contentFilterConfig.preprocess( container );
		if ( contentFilterConfig.blockFilterClass ) {
			contentFilter.forEachLiveElement(
				container.getElementsByClassName(
					contentFilterConfig.blockFilterClass
				),
				contentFilter.processBlockFilter
			);
		}
		if ( contentFilterConfig.wrapperFilterClass ) {
			contentFilter.forEachLiveElement(
				container.getElementsByClassName(
					contentFilterConfig.wrapperFilterClass
				),
				contentFilter.processWrapperFilter
			);
		}
		if ( contentFilterConfig.inlineFilterClass ) {
			contentFilter.forEachLiveElement(
				container.getElementsByClassName(
					contentFilterConfig.inlineFilterClass
				),
				contentFilter.processInlineFilter
			);
		}
		while ( contentFilter.postponed.length ) {
			var todo = contentFilter.postponed;
			contentFilter.postponed = [];
			for ( var i = 0; i < todo.length; ++i ) {
				todo[ i ][ 0 ]( todo[ i ][ 1 ] );
			}
		}
		contentFilterConfig.postprocess( container );
	},

	/**
	 * Performs the specified action for each element of a live list.
	 * @template E The element type.
	 * @param {HTMLCollectionOf<E>} liveElementList The live element list.
	 * @param {(element:E)=>void}   callback        A function called for each
	 *                                              element.
	 */
	forEachLiveElement: function ( liveElementList, callback ) {
		var previousLength = liveElementList.length;
		for ( var i = 0; i < liveElementList.length; ) {
			callback( liveElementList[ i ] );
			if ( previousLength > liveElementList.length ) {
				previousLength = liveElementList.length;
			} else {
				++i;
			}
		}
	},

	/**
	 * Removes an element with a block filter if its filter does not match the
	 * selected one.
	 * @param {Element} element The element.
	 */
	processBlockFilter: function ( element ) {
		var elementFilter = contentFilter.getFilter( element );
		if ( ( elementFilter & contentFilter.selectedFilter ) > 0 ) {
			element.classList.remove(
				/** @type {string} */
				( contentFilterConfig.blockFilterClass )
			);
		} else if ( !contentFilter.handleBlockFilter( element ) ) {
			element.classList.remove(
				/** @type {string} */
				( contentFilterConfig.blockFilterClass )
			);
			mw.log.warn( 'unmatched block filter' );
		}
	},

	/**
	 * Removes an element with a block filter if its filter does not match the
	 * selected one.
	 * @param {Element} element The element.
	 */
	processWrapperFilter: function ( element ) {
		var elementFilter = contentFilter.getFilter( element );
		if ( ( elementFilter & contentFilter.selectedFilter ) > 0 ) {
			element.classList.remove(
				/** @type {string} */
				( contentFilterConfig.wrapperFilterClass )
			);
		} else if ( !contentFilter.handleWrapperFilter( element ) ) {
			contentFilter.unwrap( element );
			mw.log.warn( 'unmatched wrapper filter' );
		}
	},

	/**
	 * Removes an element with an inline filter. Also removes its related
	 * content if the element filter does not match the selected one.
	 * @param {Element} element The element.
	 */
	processInlineFilter: function ( element ) {
		var elementFilter = contentFilter.getFilter( element );
		if ( ( elementFilter & contentFilter.selectedFilter ) > 0 ) {
			contentFilter.removeElementWithoutContext( element );
		} else if ( !contentFilter.handleInlineFilter( element ) ) {
			element.classList.remove(
				/** @type {string} */
				( contentFilterConfig.inlineFilterClass )
			);
			mw.log.warn( 'unmatched inline filter' );
		}
	},

	/**
	 * Removes an element and its empty parents.
	 * @param {Element} element The element to remove.
	 */
	removeElementWithoutContext: function ( element ) {
		var parent = element.parentElement;
		while (
			parent !== contentFilter.parserOutput &&
			!contentFilter.hasSibling( element ) &&
			parent.tagName !== 'TD'
		) {
			element = parent;
			parent  = parent.parentElement;
		}
		parent.removeChild( element );
	},

	/**
	 * Removes an element with a block filter.
	 * @param {Element} element The element to remove.
	 * @returns True if the removal has been handled properly, false otherwise.
	 */
	handleBlockFilter: function ( element ) {
		if (
			contentFilterConfig.blockFilterCustomHandler &&
			contentFilterConfig.blockFilterCustomHandler( element )
		) {
			return true;
		}

		contentFilter.removeElement( element );
		return true;
	},

	/**
	 * Removes an element with a wrapper filter.
	 * @param {Element} element The element to remove.
	 * @returns True if the removal has been handled properly, false otherwise.
	 */
	handleWrapperFilter: function ( element ) {
		if (
			contentFilterConfig.wrapperFilterCustomHandler &&
			contentFilterConfig.wrapperFilterCustomHandler( element )
		) {
			return true;
		}

		contentFilter.removeElement( element );
		return true;
	},

	/**
	 * Removes an element with an inline filter and its related content.
	 * @param {Element} element The element to remove.
	 * @returns True if the removal has been handled properly, false otherwise.
	 */
	handleInlineFilter: function ( element ) {
		if (
			contentFilterConfig.inlineFilterCustomHandler &&
			contentFilterConfig.inlineFilterCustomHandler( element )
		) {
			return true;
		}

		var parent = element.parentElement;

		if (
			contentFilterConfig.contextFilterClass &&
			parent.classList.contains(
				contentFilterConfig.contextFilterClass
			)
		) {
			var heading = contentFilter.getPreviousHeading( parent );
			contentFilter.removeElement( heading || parent );
			return true;
		}

		if (
			parent.tagName === 'LI' &&
			!contentFilter.hasPreviousSibling( element )
		) {
			contentFilter.removeElement( parent );
			return true;
		}

		contentFilter.removeGhostSiblings( element );
		if ( !contentFilter.getNextText( element ) ) {
			var nextElement = element.nextElementSibling;
			if ( !nextElement ) {
				contentFilter.removeElement( element.parentElement );
				return true;
			}
			if ( nextElement.tagName === 'BR' ) {
				contentFilter.removePreviousNodesUntilName( nextElement, 'BR' );
				nextElement.remove();
				return true;
			}
		}

		var previousElement = element.previousElementSibling,
			previousText    = contentFilter.getPreviousText( element );
		if (
			previousText ?
				!previousText.endsWith( '.' ) :
				previousElement && previousElement.tagName !== 'BR'
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
			node.remove();
			node = nextNode;
			if ( !node ) {
				if ( !previousElement && !previousText ) {
					contentFilter.removeElement( parent );
				}
				return true;
			}
			if ( node.nodeName === 'BR' ) {
				node.remove();
				return true;
			}
			if (
				textContent.endsWith( '.' ) &&
				node instanceof HTMLElement &&
				node.classList.contains(
					/** @type {string} */
					( contentFilterConfig.inlineFilterClass )
				)
			) {
				return true;
			}
		} while ( true );
	},

	/**
	 * Removes an element. Also removes its containers and previous headings if
	 * they are empty after the element being removed.
	 * @param {Element} element The element to remove.
	 */
	removeElement: function ( element ) {
		if ( element.classList.contains( 'gallerytext' ) ) {
			while ( element.classList.contains( 'gallerybox' ) ) {
				element = element.parentElement;
			}
		}
		contentFilter.removeGhostSiblings( element );
		switch ( element.tagName ) {
		case 'H2':
		case 'H3':
		case 'H4':
		case 'H5':
		case 'H6':
			contentFilter.removeHeadingElement( element );
			return;
		case 'LI':
			contentFilter.removeListItem( element );
			return;
		case 'TBODY':
			contentFilter.removeElement( element.parentElement );
			return;
		case 'TR':
			if ( !contentFilter.hasSibling( element ) ) {
				contentFilter.removeElement( element.parentElement );
			} else {
				element.remove();
			}
			return;
		case 'TH':
		case 'TD':
			contentFilter.removeTableCell( element );
			return;
		}
		contentFilter.removeDefaultElement( element );
	},

	/**
	 * Handles the removal of a heading element.
	 * @param {Element} element The <h2/h3/h4/h5/h6> element.
	 */
	removeHeadingElement: function ( element ) {
		var headingLevel = contentFilter.getHeadingLevel( element ),
			sibling      = element.nextElementSibling;
		while ( !contentFilter.isOutOfSection( sibling, headingLevel ) ) {
			var toRemove = sibling;
			sibling = sibling.nextElementSibling;
			toRemove.remove();
		}
		contentFilter.removeTocElement(
			element.getElementsByClassName( 'mw-headline' )[ 0 ].id
		);
	},

	/**
	 * Handles the removal of a list item.
	 * @param {Element} item The <li> element.
	 */
	removeListItem: function ( item ) {
		var list = item.parentElement;
		if ( list.childNodes.length > 1 ) {
			item.remove();
			return;
		}
		contentFilter.removeElement( list );
	},

	/**
	 * Handles the removal of a table cell, from clearing it to removing the
	 * entire table depending to the situation.
	 * @param {Element} cell The <th/td> element.
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
			// TODO: Fix with mw-collapsible & sortable.
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

		var mainColumn = contentFilterConfig.mainColumnClassIntro &&
			contentFilter.findClassStartingWith(
				table,
				contentFilterConfig.mainColumnClassIntro
			) || 1;
		if ( +mainColumn === column + 1 ) {
			contentFilter.removeElement( row );
			return;
		}

		if (
			contentFilterConfig.listTableClass &&
			table.classList.contains( contentFilterConfig.listTableClass )
		) {
			row.removeChild( cell );
			return;
		}
		while ( cell.firstChild ) {
			cell.removeChild( cell.firstChild );
		}
	},

	/**
	 * Handles the removal of any element.
	 * @param {Element} element The element.
	 */
	removeDefaultElement: function ( element ) {
		if ( element.classList.contains( 'mw-headline' ) ) {
			contentFilter.removeElement( element.parentElement );
			return;
		}
		var parent  = element.parentElement,
			sibling = element.previousElementSibling;
		element.remove();
		contentFilter.ensureNonEmptySection( sibling );
		if ( !parent.childNodes.length ) {
			contentFilter.removeElement( parent );
		}
	},

	/**
	 * Recursively removes an element if it is a heading and its associated
	 * section is empty. Also updates the table of contents.
	 * @param {Element} element The element.
	 */
	ensureNonEmptySection: function ( element ) {
		if ( !element ) {
			return;
		}
		while ( !( element instanceof HTMLHeadingElement ) ) {
			if (
				!contentFilterConfig.inContentAddClass ||
				!element.classList.contains(
					contentFilterConfig.inContentAddClass
				)
			) {
				return;
			}
			element = element.previousElementSibling;
		}
		if (
			!contentFilter.isOutOfSection(
				element.nextElementSibling,
				contentFilter.getHeadingLevel( element )
			)
		) {
			return;
		}
		var previousElement = element.previousElementSibling;
		contentFilter.removeTocElement(
			element.getElementsByClassName( 'mw-headline' )[ 0 ].id
		);
		element.parentNode.removeChild( element );
		contentFilter.ensureNonEmptySection( previousElement );
	},

	/**
	 * Removes a row (associated to a removed heading element) from the
	 * table of contents, then updates the numbering of the following rows.
	 * @param {string} id The ID of the removed heading element.
	 * @returns True if a row has been removed from the table of contents, false
	 *          if the table of contents has not been defined or if there is no
	 *          associated row.
	 */
	removeTocElement: function ( id ) {
		if ( !contentFilter.toc ) {
			return false;
		}
		var element = contentFilter.toc.querySelector( '[href="#' + id + '"]' );
		if ( !element ) {
			return false;
		}
		var parent     = element.parentElement,
			number     = element
				.getElementsByClassName( 'tocnumber' )[ 0 ].textContent,
			lastDotPos = number.lastIndexOf( '.', 1 ) + 1,
			lastNumber = +number.substring( lastDotPos ),
			nextParent = parent.nextElementSibling;
		while ( nextParent ) {
			var nextNumbers = nextParent
					.getElementsByClassName( 'tocnumber' );
			for ( var i = 0; i < nextNumbers.length; ++i ) {
				var textContent = nextNumbers[ i ].textContent;
				nextNumbers[ i ].textContent =
					textContent.substring( 0, lastDotPos ) + lastNumber +
					textContent.substring( number.length );
			}
			++lastNumber;
			nextParent = nextParent.nextElementSibling;
		}
		parent.parentNode.removeChild( parent );
		return true;
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
		       headingLevel >= contentFilter.getHeadingLevel( element ) ||
		       contentFilterConfig.contentEndClass &&
		       element.classList.contains(
			       contentFilterConfig.contentEndClass
		       );
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
			if ( !contentFilter.hasClass( children[ i ], className ) ) {
				return false;
			}
		}
		return true;
	},

	/**
	 * Indicates whether an element has a sibling. Ignores comments and
	 * "invisible" strings.
	 * @param {Element} element The element.
	 * @returns True if the element has no sibling other than a comment or an
	 *          "invisible" string.
	 */
	hasSibling: function ( element ) {
		return contentFilter.hasPreviousSibling( element ) ||
		       contentFilter.hasNextSibling( element );
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
		while ( contentFilter.isGhostNode( sibling ) ) {
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
		while ( contentFilter.isGhostNode( sibling ) ) {
			sibling = sibling.nextSibling;
			if ( !sibling ) {
				return false;
			}
		}
		return true;
	},

	/**
	 * Indicates whether a node should be considered as an additional
	 * non-essential node.
	 * @param {Node} node The node.
	 * @returns True if the node is non-essential, false otherwise.
	 */
	isGhostNode: function ( node ) {
		if ( !node ) {
			return false;
		}
		switch ( node.nodeType ) {
		case Node.COMMENT_NODE:
			return true;
		case Node.TEXT_NODE:
			return !node.textContent.trim();
		case Node.ELEMENT_NODE:
			/** @type {Element} */
			var element = ( node );
			return element.classList.contains( 'mw-collapsible-toggle' ) ||
			       contentFilterConfig.skipClass &&
			       element.classList.contains( contentFilterConfig.skipClass );
		}
		return false;
	},

	/**
	 * Removes the non-essential nodes around a node.
	 * @param {Node} node The node.
	 */
	removeGhostSiblings: function ( node ) {
		var sibling = node.previousSibling;
		while ( contentFilter.isGhostNode( sibling ) ) {
			sibling.remove();
			sibling = node.previousSibling;
		}
		sibling = node.nextSibling;
		while ( contentFilter.isGhostNode( sibling ) ) {
			sibling.remove();
			sibling = node.nextSibling;
		}
	},

	/**
	 * Removes nodes before a node while they do not have the given node name.
	 * @param {ChildNode} node         The node.
	 * @param {string}    nodeName     The node name.
	 * @param {boolean}   [removeLast] If the last node (with the given name)
	 *                                 should also be removed.
	 */
	removePreviousNodesUntilName: function ( node, nodeName, removeLast ) {
		var sibling = node.previousSibling;
		while ( sibling && ( sibling.nodeName !== nodeName ) ) {
			sibling.remove();
			sibling = node.previousSibling;
		}
		if ( removeLast ) {
			sibling.remove();
		}
	},

	/**
	 * Removes nodes after a node while they do not have the given node name.
	 * @param {ChildNode} node         The node.
	 * @param {string}    nodeName     The node name.
	 * @param {boolean}   [removeLast] If the last node (with the given name)
	 *                                 should also be removed.
	 */
	removeNextNodesUntilName: function ( node, nodeName, removeLast ) {
		var sibling = node.nextSibling;
		while ( sibling && ( sibling.nodeName !== nodeName ) ) {
			sibling.remove();
			sibling = node.nextSibling;
		}
		if ( removeLast ) {
			sibling.remove();
		}
	},

	/**
	 * Removes nodes before a node while they do not contain the given text.
	 * @param {ChildNode} node         The node.
	 * @param {string}    text 	       The searched text.
	 * @param {boolean}   [removeText] If the searched text should also be
	 *                                 removed from the last node.
	 */
	removePreviousNodeUntilText: function ( node, text, removeText ) {
		var sibling = node.previousSibling;
		while (
			sibling && (
				sibling.nodeType !== Node.TEXT_NODE ||
				sibling.textContent.indexOf( text ) === -1
			)
		) {
			sibling.remove();
			sibling = node.previousSibling;
		}
		if ( !sibling ) {
			return;
		}
		if ( !removeText ) {
			sibling.textContent = sibling.textContent.substr(
				0,
				sibling.textContent.lastIndexOf( text ) + text.length
			);
			return;
		}
		sibling.textContent = sibling.textContent
			.substr( 0, sibling.textContent.lastIndexOf( text ) )
			.trimEnd();
		if ( !sibling.textContent ) {
			sibling.remove();
		}
	},
	
	/**
	 * Removes nodes after a node while they do not contain the given text.
	 * @param {ChildNode} node         The node.
	 * @param {string}    text 	       The searched text.
	 * @param {boolean}   [removeText] If the searched text should also be
	 *                                 removed from the last node.
	 */
	removeNextNodeUntilText: function ( node, text, removeText ) {
		var sibling = node.nextSibling;
		while (
			sibling && (
				sibling.nodeType !== Node.TEXT_NODE ||
				sibling.textContent.indexOf( text ) === -1
			)
		) {
			sibling.remove();
			sibling = node.nextSibling;
		}
		if ( !sibling ) {
			return;
		}
		if ( !removeText ) {
			sibling.textContent = sibling.textContent
				.substr( sibling.textContent.indexOf( text ) );
			return;
		}
		sibling.textContent = sibling.textContent
			.substr( sibling.textContent.indexOf( text ) + text.length )
			.trimStart();
		if ( !sibling.textContent ) {
			sibling.remove();
		}
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
	 * Removes an element, leaving its content in place.
	 * @param {Element}   element  The element to remove.
	 * @param {ChildNode} [target] The node which should be directly after the
	 *                             initial element contents, defaults to the
	 *                             initial element.
	 */
	unwrap: function ( element, target ) {
		if ( !target ) {
			target = element;
		}
		var parent = target.parentElement;
		if ( !parent ) {
			return;
		}
		var childNode = element.firstChild;
		if ( !childNode ) {
			element.remove();
			return;
		}
		var sibling = target.previousSibling;
		if (
			sibling &&
			childNode.nodeType === Node.TEXT_NODE &&
			sibling.nodeType === Node.TEXT_NODE
		) {
			sibling.textContent += childNode.textContent;
			childNode.remove();
		}
		childNode = element.lastChild;
		if ( !childNode ) {
			element.remove();
			return;
		}
		sibling = target.nextSibling;
		if (
			sibling &&
			childNode.nodeType === Node.TEXT_NODE &&
			sibling.nodeType === Node.TEXT_NODE
		) {
			sibling.textContent = childNode.textContent + sibling.textContent;
			childNode.remove();
		}
		childNode = element.firstChild;
		while ( childNode ) {
			parent.insertBefore( childNode, target );
			childNode = element.firstChild;
		}
		element.remove();
	},

	/**
	 * Updates the selected filter form item.
	 */
	updateSelectedFilterItem: function () {
		delete contentFilter.uri.query[ contentFilterConfig.urlParam ];
		var item = contentFilter.items[ contentFilter.selectedIndex ];
		item.classList.add( 'content-filter-item-active' );
		item.firstElementChild.setAttribute(
			'href',
			contentFilter.uri.toString()
		);
	},

	/**
	 * Adds a corresponding filter URL parameter to anchors where none is
	 * used.
	 */
	updateAnchorsFilter: function () {
		var anchors = document.getElementsByTagName( 'a' );
		for ( var i = 0; i < anchors.length; ++i ) {
			var anchor = anchors[ i ];
			if ( !anchor.href ) {
				continue;
			}
			if (
				anchor.parentElement.classList.contains( 'content-filter-item' )
			) {
				continue;
			}
			var uri = new mw.Uri( anchor.href );
			if ( uri.query[ contentFilterConfig.urlParam ] ) {
				continue;
			}
			var match = uri.path.match(
				mw.RegExp
					.escape( mw.config.get( 'wgArticlePath' ) )
					.replace( '\\$1', '(.*)' )
			);
			if ( !match ) {
				continue;
			}
			var title = new mw.Title(
				mw.Uri.decode( match[ 1 ] ) ||
				mw.config.get( 'wgMainPageTitle' )
			);
			if (
				!contentFilterConfig.filteredNamespaces.includes(
					title.getNamespaceId()
				) &&
				!contentFilterConfig.filteredSpecialTitles.includes(
					title.getPrefixedText()
				)
			) {
				continue;
			}
			/** @type {{[k:string]:number}} */
			var obj = {};
			obj[ contentFilterConfig.urlParam ] = contentFilter.selectedIndex;
			uri.extend( obj );
			anchor.href = uri.toString();
		}
	}
};

$( contentFilter.init );