/**
 * +-------------------------------------------------------------------------+
 * |                  === WARNING: GLOBAL GADGET FILE ===                    |
 * |                Changes to this page affect many users.                  |
 * |           Please discuss changes at [[WT:TW]] before editing.           |
 * +-------------------------------------------------------------------------+
 *
 * Imported from github [https://github.com/azatoth/twinkle].
 * All changes should be made in the repository, otherwise they will be lost.
 *
 * To update this script from github, you must have a local repository set up. Then
 * follow the instructions at [https://github.com/azatoth/twinkle/blob/master/README.md].
 *
 * ----------
 *
 * This is AzaToth's Twinkle, the popular script sidekick for newbies, admins, and
 * every Wikipedian in between. Visit [[WP:TW]] for more information.
 */

//<nowiki>

var Twinkle = {};
window.Twinkle = Twinkle;  // allow global access

// for use by custom modules (normally empty)
Twinkle.initCallbacks = [];
Twinkle.addInitCallback = function twinkleAddInitCallback(func) {
	Twinkle.initCallbacks.push(func);
};

Twinkle.defaultConfig = {};
/**
 * Twinkle.defaultConfig.twinkle and Twinkle.defaultConfig.friendly
 *
 * This holds the default set of preferences used by Twinkle. (The |friendly| object holds preferences stored in the FriendlyConfig object.)
 * It is important that all new preferences added here, especially admin-only ones, are also added to
 * |Twinkle.config.sections| in twinkleconfig.js, so they are configurable via the Twinkle preferences panel.
 * For help on the actual preferences, see the comments in twinkleconfig.js.
 */
Twinkle.defaultConfig.twinkle = {
	 // General
	summaryAd: " ([[WP:TW|TW]])",
	deletionSummaryAd: " ([[WP:TW|TW]])",
	protectionSummaryAd: " ([[WP:TW|TW]])",
	userTalkPageMode: "window",
	dialogLargeFont: false,
	 // Fluff (revert and rollback)
	openTalkPage: [ "agf", "norm", "vand" ],
	openTalkPageOnAutoRevert: false,
	markRevertedPagesAsMinor: [ "vand" ],
	watchRevertedPages: [ "agf", "norm", "vand", "torev" ],
	offerReasonOnNormalRevert: true,
	confirmOnFluff: false,
	showRollbackLinks: [ "diff", "others" ],
	 // DI (twinkleimage)
	notifyUserOnDeli: true,
	deliWatchPage: "default",
	deliWatchUser: "default",
	 // PROD
	watchProdPages: true,
	prodReasonDefault: "",
	logProdPages: false,
	prodLogPageName: "PROD log",
	 // CSD
	speedyPromptOnG7: false,
	watchSpeedyPages: [ "g3", "g5", "g10", "g11", "g12" ],
	markSpeedyPagesAsPatrolled: true,
	// these next two should probably be identical by default
	notifyUserOnSpeedyDeletionNomination:    [ "db", "g1", "g2", "g3", "g4", "g10", "g11", "g12", "a1", "a2", "a3", "a5", "a7", "a9", "a10", "f1", "f2", "f3", "f7", "f9", "f10", "u3", "t2", "t3", "p1", "p2" ],
	welcomeUserOnSpeedyDeletionNotification: [ "db", "g1", "g2", "g3", "g4", "g10", "g11", "g12", "a1", "a2", "a3", "a5", "a7", "a9", "a10", "f1", "f2", "f3", "f7", "f9", "f10", "u3", "t2", "t3", "p1", "p2" ],
	promptForSpeedyDeletionSummary: [ "db", "g1", "g2", "g3", "g4", "g6", "g7", "g8", "g10", "g11", "g12", "a1", "a2", "a3", "a5", "a7", "a9", "a10", "f2", "f4", "f7", "f8", "f10", "t2", "t3", "p1", "p2" ],
	openUserTalkPageOnSpeedyDelete: [ "db", "g1", "g2", "g3", "g4", "g5", "g10", "g11", "g12", "a1", "a3", "a7", "a9", "a10", "f3", "f7", "f9", "u3", "t2", "p1" ],
	deleteTalkPageOnDelete: false,
	deleteSysopDefaultToTag: false,
	speedyWindowHeight: 500,
	speedyWindowWidth: 800,
	logSpeedyNominations: false,
	speedyLogPageName: "CSD log",
	noLogOnSpeedyNomination: [ "u1" ],
	 // Unlink
	unlinkNamespaces: [ "0", "100" ],
	 // Warn
	defaultWarningGroup: "1",
	showSharedIPNotice: true,
	watchWarnings: true,
	blankTalkpageOnIndefBlock: false,
	 // XfD
	xfdWatchDiscussion: "default",
	xfdWatchList: "no",
	xfdWatchPage: "default",
	xfdWatchUser: "default",
	 // Hidden preferences
	revertMaxRevisions: 50,
	batchdeleteChunks: 50,
	batchDeleteMinCutOff: 5,
	batchMax: 5000,
	batchProtectChunks: 50,
	batchProtectMinCutOff: 5,
	batchundeleteChunks: 50,
	batchUndeleteMinCutOff: 5,
	deliChunks: 500,
	deliMax: 5000,
	proddeleteChunks: 50
};

// now some skin dependent config.
if (mw.config.get("skin") === 'vector') {
	Twinkle.defaultConfig.twinkle.portletArea = 'right-navigation';
	Twinkle.defaultConfig.twinkle.portletId   = 'p-twinkle';
	Twinkle.defaultConfig.twinkle.portletName = 'TW';
	Twinkle.defaultConfig.twinkle.portletType = 'menu';
	Twinkle.defaultConfig.twinkle.portletNext = 'p-search';
} else {
	Twinkle.defaultConfig.twinkle.portletArea =  null;
	Twinkle.defaultConfig.twinkle.portletId   = 'p-cactions';
	Twinkle.defaultConfig.twinkle.portletName = null;
	Twinkle.defaultConfig.twinkle.portletType = null;
	Twinkle.defaultConfig.twinkle.portletNext = null;
}

Twinkle.defaultConfig.friendly = {
	 // Tag
	groupByDefault: true,
	watchTaggedPages: true,
	markTaggedPagesAsMinor: false,
	markTaggedPagesAsPatrolled: true,
	tagArticleSortOrder: "cat",
	customTagList: [],
	 // Welcome
	topWelcomes: false,
	watchWelcomes: true,
	welcomeHeading: "Welcome",
	insertHeadings: true,
	insertUsername: true,
	insertSignature: true,  // sign welcome templates, where appropriate
	quickWelcomeMode: "norm",
	quickWelcomeTemplate: "welcome",
	maskTemplateInSummary: true,
	customWelcomeList: [],
	 // Talkback
	markTalkbackAsMinor: true,
	insertTalkbackSignature: true,  // always sign talkback templates
	talkbackHeading: "Talkback",
	adminNoticeHeading: "Notice",
	 // Shared
	markSharedIPAsMinor: true
};

Twinkle.getPref = function twinkleGetPref(name) {
	var result;
	if (typeof Twinkle.prefs === "object" && typeof Twinkle.prefs.twinkle === "object") {
		// look in Twinkle.prefs (twinkleoptions.js)
		result = Twinkle.prefs.twinkle[name];
	} else if (typeof window.TwinkleConfig === "object") {
		// look in TwinkleConfig
		result = window.TwinkleConfig[name];
	}

	if (typeof result === "undefined") {
		return Twinkle.defaultConfig.twinkle[name];
	}
	return result;
};

Twinkle.getFriendlyPref = function twinkleGetFriendlyPref(name) {
	var result;
	if (typeof Twinkle.prefs === "object" && typeof Twinkle.prefs.friendly === "object") {
		// look in Twinkle.prefs (twinkleoptions.js)
		result = Twinkle.prefs.friendly[name];
	} else if (typeof window.FriendlyConfig === "object") {
		// look in FriendlyConfig
		result = window.FriendlyConfig[name];
	}

	if (typeof result === "undefined") {
		return Twinkle.defaultConfig.friendly[name];
	}
	return result;
};



/**
 * **************** twAddPortlet() ****************
 *
 * Adds a portlet menu to one of the navigation areas on the page.
 * This is necessarily quite a hack since skins, navigation areas, and
 * portlet menu types all work slightly different.
 *
 * Available navigation areas depend on the skin used.
 * Monobook:
 *  "column-one", outer div class "portlet", inner div class "pBody". Existing portlets: "p-cactions", "p-personal", "p-logo", "p-navigation", "p-search", "p-interaction", "p-tb", "p-coll-print_export"
 *  Special layout of p-cactions and p-personal through specialized styles.
 * Vector:
 *  "mw-panel", outer div class "portal", inner div class "body". Existing portlets/elements: "p-logo", "p-navigation", "p-interaction", "p-tb", "p-coll-print_export"
 *  "left-navigation", outer div class "vectorTabs" or "vectorMenu", inner div class "" or "menu". Existing portlets: "p-namespaces", "p-variants" (menu)
 *  "right-navigation", outer div class "vectorTabs" or "vectorMenu", inner div class "" or "menu". Existing portlets: "p-views", "p-cactions" (menu), "p-search"
 *  Special layout of p-personal portlet (part of "head") through specialized styles.
 * Modern:
 *  "mw_contentwrapper" (top nav), outer div class "portlet", inner div class "pBody". Existing portlets or elements: "p-cactions", "mw_content"
 *  "mw_portlets" (sidebar), outer div class "portlet", inner div class "pBody". Existing portlets: "p-navigation", "p-search", "p-interaction", "p-tb", "p-coll-print_export"
 *
 * @param String navigation -- id of the target navigation area (skin dependant, on vector either of "left-navigation", "right-navigation", or "mw-panel")
 * @param String id -- id of the portlet menu to create, preferably start with "p-".
 * @param String text -- name of the portlet menu to create. Visibility depends on the class used.
 * @param String type -- type of portlet. Currently only used for the vector non-sidebar portlets, pass "menu" to make this portlet a drop down menu.
 * @param Node nextnodeid -- the id of the node before which the new item should be added, should be another item in the same list, or undefined to place it at the end.
 *
 * @return Node -- the DOM node of the new item (a DIV element) or null
 */
function twAddPortlet( navigation, id, text, type, nextnodeid )
{
	//sanity checks, and get required DOM nodes
	var root = document.getElementById( navigation );
	if ( !root ) {
		return null;
	}

	var item = document.getElementById( id );
	if (item) {
		if (item.parentNode && item.parentNode === root) {
			return item;
		}
		return null;
	}

	var nextnode;
	if (nextnodeid) {
		nextnode = document.getElementById(nextnodeid);
	}

	//verify/normalize input
	type = (skin === "vector" && type === "menu" && (navigation === "left-navigation" || navigation === "right-navigation")) ? "menu" : "";
	var outerDivClass;
	var innerDivClass;
	switch (skin)
	{
		case "vector":
			if (navigation !== "portal" && navigation !== "left-navigation" && navigation !== "right-navigation") {
				navigation = "mw-panel";
			}
			outerDivClass = (navigation === "mw-panel") ? "portal" : (type === "menu" ? "vectorMenu extraMenu" : "vectorTabs extraMenu");
			innerDivClass = (navigation === "mw-panel") ? 'body' : (type === 'menu' ? 'menu':'');
			break;
		case "modern":
			if (navigation !== "mw_portlets" && navigation !== "mw_contentwrapper") {
				navigation = "mw_portlets";
			}
			outerDivClass = "portlet";
			innerDivClass = "pBody";
			break;
		default:
			navigation = "column-one";
			outerDivClass = "portlet";
			innerDivClass = "pBody";
			break;
	}

	//Build the DOM elements.
	var outerDiv = document.createElement( 'div' );
	outerDiv.className = outerDivClass+" emptyPortlet";
	outerDiv.id = id;
	if (type === "menu") {
		// fix drop-down arrow image in Vector skin
		outerDiv.style.backgroundImage = 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAQCAMAAAAlM38UAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAA9QTFRFsbGxmpqa3d3deXl58/n79CzHcQAAAAV0Uk5T/////wD7tg5TAAAAMklEQVR42mJgwQoYBkqYiZEZAhiZUFRDxWGicEPA4nBRhNlAcYQokpVMDEwD6kuAAAMAyGMFQVv5ldcAAAAASUVORK5CYII=")';
		outerDiv.style.backgroundPosition = 'right 60%';
	}
	if ( nextnode && nextnode.parentNode === root ) {
		root.insertBefore( outerDiv, nextnode );
	} else {
		root.appendChild( outerDiv );
	}

	var h5 = document.createElement( 'h5' );
	if (type === 'menu') {
		var span = document.createElement( 'span' );
		span.appendChild( document.createTextNode( text ) );
		h5.appendChild( span );

		var a = document.createElement( 'a' );
		a.href = "#";
		span = document.createElement( 'span' );
		span.appendChild( document.createTextNode( text ) );
		a.appendChild( span );
		h5.appendChild( a );
	} else {
		h5.appendChild( document.createTextNode( text ) );
	}
	outerDiv.appendChild( h5 );

	var innerDiv = document.createElement( 'div' ); //not strictly necessary with type vectorTabs, or other skins.
	innerDiv.className = innerDivClass;
	outerDiv.appendChild(innerDiv);

	var ul = document.createElement( 'ul' );
	innerDiv.appendChild( ul );

	return outerDiv;
}


/**
 * **************** twAddPortletLink() ****************
 * Builds a portlet menu if it doesn't exist yet, and add the portlet link.
 * @param task: Either a URL for the portlet link or a function to execute.
 */
function twAddPortletLink( task, text, id, tooltip )
{
	if (Twinkle.getPref("portletArea") !== null) {
		twAddPortlet(Twinkle.getPref("portletArea"), Twinkle.getPref("portletId"), Twinkle.getPref("portletName"), Twinkle.getPref("portletType"), Twinkle.getPref("portletNext"));
	}
	var link = mw.util.addPortletLink( Twinkle.getPref("portletId"), typeof task === "string" ? task : "#", text, id, tooltip );
	if (jQuery.isFunction(task)) jQuery(link).click(function(ev){ task(); ev.preventDefault(); });
	return link;
}

// check if account is experienced enough for more advanced functions
var twinkleUserAuthorized = userIsInGroup( 'autoconfirmed' ) || userIsInGroup( 'confirmed' );
/*
 ****************************************
 *** friendlyshared.js: Shared IP tagging module
 ****************************************
 * Mode of invocation:     Tab ("Shared")
 * Active on:              Existing IP user talk pages
 * Config directives in:   FriendlyConfig
 */

Twinkle.shared = function friendlyshared() {
	if( mw.config.get('wgNamespaceNumber') === 3 && isIPAddress(mw.config.get('wgTitle')) ) {
		var username = mw.config.get('wgTitle').split( '/' )[0].replace( /\"/, "\\\""); // only first part before any slashes
		twAddPortletLink( function(){ Twinkle.shared.callback(username); }, "Shared IP", "friendly-shared", "Shared IP tagging" );
	}
};

Twinkle.shared.callback = function friendlysharedCallback( uid ) {
	var Window = new SimpleWindow( 600, 400 );
	Window.setTitle( "Shared IP address tagging" );
	Window.setScriptName( "Twinkle" );
	Window.addFooterLink( "Twinkle help", "WP:TW/DOC#shared" );

	var form = new QuickForm( Twinkle.shared.callback.evaluate );

	form.append( { type:'header', label:'Shared IP address templates' } );
	form.append( { type: 'radio', name: 'shared', list: Twinkle.shared.standardList,
		event: function( e ) {
			Twinkle.shared.callback.change_shared( e );
			e.stopPropagation();
		} } );

	var org = form.append( { type:'field', label:'Fill in IP address owner/operator, hostname and contact information (if applicable) and hit \"Submit\"' } );
	org.append( {
			type: 'input',
			name: 'organization',
			label: 'Organization name',
			disabled: true,
			tooltip: 'Some of these templates support an optional parameter for the organization name that owns/operates the IP address.  The organization name can be entered here for those templates, including wikimarkup if necessary.'
		}
	);
	org.append( {
			type: 'input',
			name: 'host',
			label: 'Host name (optional)',
			disabled: true,
			tooltip: 'These templates support an optional parameter for the host name.  The host name (for example, proxy.example.com) can be entered here and will be linked by the template.'
		}
	);
	org.append( {
			type: 'input',
			name: 'contact',
			label: 'Contact information (only if requested)',
			disabled: true,
			tooltip: 'Some of these templates support an optional parameter for the organization\'s contact information.  Use this parameter only if the organization has specifically request that it be added.  This contact information can be entered here for those templates, including wikimarkup if necessary.'
		}
	);
	
	form.append( { type:'submit' } );

	var result = form.render();
	Window.setContent( result );
	Window.display();
};

Twinkle.shared.standardList = [
	{
		label: '{{Shared IP}}: standard shared IP address template',
		value: 'Shared IP',
		tooltip: 'IP user talk page template that shows helpful information to IP users and those wishing to warn, block or ban them'
	},
	{ 
		label: '{{Shared IP edu}}: shared IP address template modified for educational institutions',
		value: 'Shared IP edu'
	},
	{
		label: '{{Shared IP corp}}: shared IP address template modified for businesses',
		value: 'Shared IP corp'
	},
	{
		label: '{{Shared IP public}}: shared IP address template modified for public terminals',
		value: 'Shared IP public'
	},
	{
		label: '{{Shared IP gov}}: shared IP address template modified for government agencies or facilities',
		value: 'Shared IP gov'
	},
	{
		label: '{{Dynamic IP}}: shared IP address template modified for organizations with dynamic addressing',
		value: 'Dynamic IP'
	},
	{
		label: '{{Static IP}}: shared IP address template modified for static IPs',
		value: 'Static IP'
	},
	{ 
		label: '{{ISP}}: shared IP address template modified for ISP organizations (specifically proxies)',
		value: 'ISP'
	},
	{ 
		label: '{{Mobile IP}}: shared IP address template modified for mobile phone companies and their customers',
		value: 'Mobile IP'
	}
];

Twinkle.shared.callback.change_shared = function friendlysharedCallbackChangeShared(e) {
	if( e.target.value === 'shared IP edu' ) {
		e.target.form.contact.disabled = false;
	} else {
		e.target.form.contact.disabled = true;
	}
	e.target.form.organization.disabled=false;
	e.target.form.host.disabled=false;
};

Twinkle.shared.callbacks = {
	main: function( pageobj ) {
		var params = pageobj.getCallbackParameters();
		var pageText = pageobj.getPageText();
		var found = false;
		var text = '{{';

		for( var i=0; i < Twinkle.shared.standardList.length; i++ ) {
			tagRe = new RegExp( '(\\{\\{' + Twinkle.shared.standardList[i].value + '(\\||\\}\\}))', 'im' );
			if( tagRe.exec( pageText ) ) {
				Status.warn( 'Info', 'Found {{' + Twinkle.shared.standardList[i].value + '}} on the user\'s talk page already...aborting' );
				found = true;
			}
		}

		if( found ) {
			return;
		}

		Status.info( 'Info', 'Will add the shared IP address template to the top of the user\'s talk page.' );
		text += params.value + '|' + params.organization;
		if( params.value === 'shared IP edu' && params.contact !== '') {
			text += '|' + params.contact;
		}
		if( params.host !== '' ) {
			text += '|host=' + params.host;
		}
		text += '}}\n\n';

		var summaryText = 'Added {{[[Template:' + params.value + '|' + params.value + ']]}} template.';
		pageobj.setPageText(text + pageText);
		pageobj.setEditSummary(summaryText + Twinkle.getPref('summaryAd'));
		pageobj.setMinorEdit(Twinkle.getFriendlyPref('markSharedIPAsMinor'));
		pageobj.setCreateOption('recreate');
		pageobj.save();
	}
};

Twinkle.shared.callback.evaluate = function friendlysharedCallbackEvaluate(e) {
	var shared = e.target.getChecked( 'shared' );
	if( !shared || shared.length <= 0 ) {
		alert( 'You must select a shared IP address template to use!' );
		return;
	}
	
	var value = shared[0];
	
	if( e.target.organization.value === '') {
		alert( 'You must input an organization for the {{' + value + '}} template!' );
		return;
	}
	
	var params = {
		value: value,
		organization: e.target.organization.value,
		host: e.target.host.value,
		contact: e.target.contact.value
	};

	SimpleWindow.setButtonsEnabled( false );
	Status.init( e.target );

	Wikipedia.actionCompleted.redirect = mw.config.get('wgPageName');
	Wikipedia.actionCompleted.notice = "Tagging complete, reloading talk page in a few seconds";

	var wikipedia_page = new Wikipedia.page(mw.config.get('wgPageName'), "User talk page modification");
	wikipedia_page.setFollowRedirect(true);
	wikipedia_page.setCallbackParameters(params);
	wikipedia_page.load(Twinkle.shared.callbacks.main);
};
/*
 ****************************************
 *** friendlytag.js: Tag module
 ****************************************
 * Mode of invocation:     Tab ("Tag")
 * Active on:              Existing articles; file pages with a corresponding file
 *                         which is local (not on Commons); existing user subpages
 *                         and existing subpages of Wikipedia:Articles for creation;
 *                         all redirects
 * Config directives in:   FriendlyConfig
 */

Twinkle.tag = function friendlytag() {
	// redirect tagging
	if( Wikipedia.isPageRedirect() ) {
		Twinkle.tag.mode = 'redirect';
		twAddPortletLink( Twinkle.tag.callback, "Tag", "friendly-tag", "Tag redirect" );
	}
	// file tagging
	else if( mw.config.get('wgNamespaceNumber') === 6 && !document.getElementById("mw-sharedupload") && document.getElementById("mw-imagepage-section-filehistory") ) {
		Twinkle.tag.mode = 'file';
		twAddPortletLink( Twinkle.tag.callback, "Tag", "friendly-tag", "Add maintenance tags to file" );
	}
	// article/draft article tagging
	else if( ( mw.config.get('wgNamespaceNumber') === 0 || /^Wikipedia([ _]talk)?\:Articles[ _]for[ _]creation\//.exec(mw.config.get('wgPageName')) ) && mw.config.get('wgCurRevisionId') ) {
		Twinkle.tag.mode = 'article';
		twAddPortletLink( Twinkle.tag.callback, "Tag", "friendly-tag", "Add maintenance tags to article" );
	}
};

Twinkle.tag.callback = function friendlytagCallback( uid ) {
	var Window = new SimpleWindow( 630, (Twinkle.tag.mode === "article") ? 450 : 400 );
	Window.setScriptName( "Twinkle" );
	// anyone got a good policy/guideline/info page/instructional page link??
	Window.addFooterLink( "Twinkle help", "WP:TW/DOC#tag" );

	var form = new QuickForm( Twinkle.tag.callback.evaluate );

	switch( Twinkle.tag.mode ) {
		case 'article':
			Window.setTitle( "Article maintenance tagging" );

			form.append( {
					type: 'checkbox',
					list: [
						{
							label: 'Group into {{multiple issues}} if possible',
							value: 'group',
							name: 'group',
							tooltip: 'If applying three or more templates supported by {{multiple issues}} and this box is checked, all supported templates will be grouped into a single {{multiple issues}} template.',
							checked: Twinkle.getFriendlyPref('groupByDefault')
						}
					]
				}
			);

			form.append({
				type: 'select',
				name: 'sortorder',
				label: 'View this list:',
				tooltip: 'You can change the default view order in your Twinkle preferences (WP:TWPREFS).',
				event: Twinkle.tag.updateSortOrder,
				list: [
					{ type: 'option', value: 'cat', label: 'By categories', selected: Twinkle.getFriendlyPref('tagArticleSortOrder') === 'cat' },
					{ type: 'option', value: 'alpha', label: 'In alphabetical order', selected: Twinkle.getFriendlyPref('tagArticleSortOrder') === 'alpha' }
				]
			});

			form.append( { type: 'div', id: 'tagWorkArea' } );

			if( Twinkle.getFriendlyPref('customTagList').length ) {
				form.append( { type: 'header', label: 'Custom tags' } );
				form.append( { type: 'checkbox', name: 'articleTags', list: Twinkle.getFriendlyPref('customTagList') } );
			}
			break;

		case 'file':
			Window.setTitle( "File maintenance tagging" );

			// TODO: perhaps add custom tags TO list of checkboxes

			form.append({ type: 'header', label: 'License and sourcing problem tags' });
			form.append({ type: 'checkbox', name: 'imageTags', list: Twinkle.tag.file.licenseList } );

			form.append({ type: 'header', label: 'Cleanup tags' } );
			form.append({ type: 'checkbox', name: 'imageTags', list: Twinkle.tag.file.cleanupList } );

			form.append({ type: 'header', label: 'Image quality tags' } );
			form.append({ type: 'checkbox', name: 'imageTags', list: Twinkle.tag.file.qualityList } );

			form.append({ type: 'header', label: 'Wikimedia Commons-related tags' });
			form.append({ type: 'checkbox', name: 'imageTags', list: Twinkle.tag.file.commonsList } );

			form.append({ type: 'header', label: 'Replacement tags' });
			form.append({ type: 'checkbox', name: 'imageTags', list: Twinkle.tag.file.replacementList } );
			break;

		case 'redirect':
			Window.setTitle( "Redirect tagging" );

			form.append({ type: 'header', label:'Spelling, misspelling, tense and capitalization templates' });
			form.append({ type: 'checkbox', name: 'redirectTags', list: Twinkle.tag.spellingList });

			form.append({ type: 'header', label:'Alternative name templates' });
			form.append({ type: 'checkbox', name: 'redirectTags', list: Twinkle.tag.alternativeList });

			form.append({ type: 'header', label:'Miscellaneous and administrative redirect templates' });
			form.append({ type: 'checkbox', name: 'redirectTags', list: Twinkle.tag.administrativeList });
			break;

		default:
			alert("Twinkle.tag: unknown mode " + Twinkle.tag.mode);
			break;
	}

	form.append( { type:'submit' } );

	var result = form.render();
	Window.setContent( result );
	Window.display();

	if (Twinkle.tag.mode === "article") {
		// fake a change event on the sort dropdown, to initialize the tag list
		var evt = document.createEvent("Event");
		evt.initEvent("change", true, true);
		result.sortorder.dispatchEvent(evt);
	}
};

Twinkle.tag.checkedTags = [];

Twinkle.tag.updateSortOrder = function(e) {
	var sortorder = e.target.value;
	var $workarea = $(e.target.form).find("div#tagWorkArea");

	Twinkle.tag.checkedTags = e.target.form.getChecked("articleTags");
	if (!Twinkle.tag.checkedTags) {
		Twinkle.tag.checkedTags = [];
	}

	// function to generate a checkbox, with appropriate subgroup if needed
	var makeCheckbox = function(tag, description) {
		var checkbox = { value: tag, label: "{{" + tag + "}}: " + description };
		if (Twinkle.tag.checkedTags.indexOf(tag) !== -1) {
			checkbox.checked = true;
		}
		if (tag === "globalize") {
			checkbox.subgroup = {
				name: 'globalize',
				type: 'select',
				list: [
					{ label: "{{globalize}}: article may not represent a worldwide view of the subject", value: "globalize" },
					{
						label: "Region-specific {{globalize}} subtemplates",
						list: [
							{ label: "{{globalize/Australia}}: article deals primarily with the Australian viewpoint", value: "globalize/Australia" },
							{ label: "{{globalize/Canada}}: article deals primarily with the Canadian viewpoint", value: "globalize/Canada" },
							{ label: "{{globalize/China}}: article deals primarily with the Chinese viewpoint", value: "globalize/China" },
							{ label: "{{globalize/Common law}}: article deals primarily with the viewpoint of common law countries", value: "globalize/Common law" },
							{ label: "{{globalize/Eng}}: article deals primarily with the English-speaking viewpoint", value: "globalize/Eng" },
							{ label: "{{globalize/Europe}}: article deals primarily with the European viewpoint", value: "globalize/Europe" },
							{ label: "{{globalize/France}}: article deals primarily with the French viewpoint", value: "globalize/France" },
							{ label: "{{globalize/Germany}}: article deals primarily with the German viewpoint", value: "globalize/Germany" },
							{ label: "{{globalize/India}}: article deals primarily with the Indian viewpoint", value: "globalize/India" },
							{ label: "{{globalize/Middle East}}: article deals primarily with the Middle Eastern viewpoint", value: "globalize/Middle East" },
							{ label: "{{globalize/North America}}: article deals primarily with the North American viewpoint", value: "globalize/North America" },
							{ label: "{{globalize/Northern}}: article deals primarily with the northern hemisphere viewpoint", value: "globalize/Northern" },
							{ label: "{{globalize/Southern}}: article deals primarily with the southern hemisphere viewpoint", value: "globalize/Southern" },
							{ label: "{{globalize/South Africa}}: article deals primarily with the South African viewpoint", value: "globalize/South Africa" },
							{ label: "{{globalize/UK}}: article deals primarily with the British viewpoint", value: "globalize/UK" },
							{ label: "{{globalize/UK and Canada}}: article deals primarily with the British and Canadian viewpoints", value: "globalize/UK and Canada" },
							{ label: "{{globalize/US}}: article deals primarily with the USA viewpoint", value: "globalize/US" },
							{ label: "{{globalize/West}}: article deals primarily with the viewpoint of Western countries", value: "globalize/West" }
						]
					}
				]
			};
		} else if (tag === "notability") {
			checkbox.subgroup = {
				name: 'notability',
				type: 'select',
				list: [
					{ label: "{{notability}}: article\'s subject may not meet the general notability guideline", value: "none" },
					{ label: "{{notability|Academics}}: notability guideline for academics", value: "Academics" },
					{ label: "{{notability|Biographies}}: notability guideline for biographies", value: "Biographies" },
					{ label: "{{notability|Books}}: notability guideline for books", value: "Books" },
					{ label: "{{notability|Companies}}: notability guidelines for companies and organizations", value: "Companies" },
					{ label: "{{notability|Events}}: notability guideline for events", value: "Events" },
					{ label: "{{notability|Films}}: notability guideline for films", value: "Films" },
					{ label: "{{notability|Music}}: notability guideline for music", value: "Music" },
					{ label: "{{notability|Neologisms}}: notability guideline for neologisms", value: "Neologisms" },
					{ label: "{{notability|Numbers}}: notability guideline for numbers", value: "Numbers" },
					{ label: "{{notability|Products}}: notability guideline for products and services", value: "Products" },
					{ label: "{{notability|Sport}}: notability guideline for sports and athletics", value: "Sport" },
					{ label: "{{notability|Web}}: notability guideline for web content", value: "Web" }
				]
			};
		}
		return checkbox;
	};

	// categorical sort order
	if (sortorder === "cat") {
		var div = new QuickForm.element({
			type: "div",
			id: "tagWorkArea"
		});

		// function to iterate through the tags and create a checkbox for each one
		var doCategoryCheckboxes = function(subdiv, array) {
			var checkboxes = [];
			$.each(array, function(k, tag) {
				var description = Twinkle.tag.article.tags[tag];
				checkboxes.push(makeCheckbox(tag, description));
			});
			subdiv.append({
				type: "checkbox",
				name: "articleTags",
				list: checkboxes
			});
		};

		var i = 0;
		// go through each category and sub-category and append lists of checkboxes
		$.each(Twinkle.tag.article.tagCategories, function(title, content) {
			div.append({ type: "header", id: "tagHeader" + i, label: title });
			var subdiv = div.append({ type: "div", id: "tagSubdiv" + i++ });
			if ($.isArray(content)) {
				doCategoryCheckboxes(subdiv, content);
			} else {
				$.each(content, function(subtitle, subcontent) {
					subdiv.append({ type: "div", label: [ htmlNode("b", subtitle) ] });
					doCategoryCheckboxes(subdiv, subcontent);
				});
			}
		});

		var rendered = div.render();
		$workarea.replaceWith(rendered);
		var $rendered = $(rendered);
		$rendered.find("h5").css({ 'font-size': '110%', 'margin-top': '1em' });
		$rendered.find("div").filter(":has(span.quickformDescription)").css({ 'margin-top': '0.4em' });
	}
	// alphabetical sort order
	else {
		var checkboxes = [];
		$.each(Twinkle.tag.article.tags, function(tag, description) {
			checkboxes.push(makeCheckbox(tag, description));
		});
		var tags = new QuickForm.element({
			type: "checkbox",
			name: "articleTags",
			list: checkboxes
		});
		$workarea.empty().append(tags.render());
	}
};


// Tags for ARTICLES start here

Twinkle.tag.article = {};

// A list of all article tags, in alphabetical order
// To ensure tags appear in the default "categorized" view, add them to the tagCategories hash below.

Twinkle.tag.article.tags = {
	"advert": "article is written like an advertisement",
	"allplot": "article is almost entirely a plot summary",
	"autobiography": "article is an autobiography and may not be written neutrally",
	"BLP sources": "BLP article needs additional sources for verification",
	"BLP unsourced": "BLP article has no sources at all (use BLP PROD instead for new articles)",
	"capitalization": "article does not follow Wikipedia's guidelines on the use of capital letters",
	"cat improve": "article may require additional categories",
	"citation style": "article has unclear or inconsistent inline citations",
	"cleanup": "article may require cleanup",
	"cleanup-reorganize": "article may be in need of reorganization to comply with Wikipedia's layout guidelines",
	"close paraphrasing": "article contains close paraphrasing of a non-free copyrighted source",
	"COI": "article creator or major contributor may have a conflict of interest",
	"condense": "article may have too many section headers dividing up its content",
	"confusing": "article may be confusing or unclear",
	"context": "article provides insufficient context",
	"copy edit": "article needs copy editing for grammar, style, cohesion, tone, and/or spelling",
	"copypaste": "article appears to have been copied and pasted from a source",
	"dead end": "article has few or no links to other articles",
	"disputed": "article has questionable factual accuracy",
	"essay-like": "article is written like an essay and needs cleanup",
	"external links": "article's external links may not follow content policies or guidelines",
	"fansite": "article resembles a fansite",
	"fiction": "article fails to distinguish between fact and fiction",
	"globalize": "article may not represent a worldwide view of the subject",
	"GOCEinuse": "article is currently undergoing a major copy edit by the Guild of Copy Editors",
	"hoax": "article may be a complete hoax",
	"in-universe": "article subject is fictional and needs rewriting from a non-fictional perspective",
	"incoherent": "article is incoherent or very hard to understand",
	"in use": "article is undergoing a major edit for a short while",
	"lead missing": "article has no lead section and one should be written",
	"lead rewrite": "article lead section needs to be rewritten to comply with guidelines",
	"lead too long": "article lead section is too long and should be shortened",
	"lead too short": "article lead section is too short and should be expanded",
	"linkrot": "article uses bare URLs for references, which are prone to link rot",
	"merge": "article should be merged with another given article",
	"merge from": "another given article should be merged into this one",
	"merge to": "article should be merged into another given article",
	"metricate": "article exclusively uses non-SI units of measurement",
	"more footnotes": "article has some references, but insufficient in-text citations",
	"new unreviewed article": "mark article for later review",
	"no footnotes": "article has references, but no in-text citations",
	"non-free": "article may contain excessive or improper use of copyrighted materials",
	"notability": "article's subject may not meet the notability guideline",
	"not English": "article is written in a language other than English and needs translation",
	"one source": "article relies largely or entirely upon a single source",
	"original research": "article has original research or unverified claims",
	"orphan": "article is linked to from few or no other articles",
	"out of date": "article needs out-of-date information removed or updated",
	"overcoverage": "article has an extensive bias or disproportional coverage towards one or more specific regions",
	"overlinked": "article may have too many duplicate and/or irrelevant links",
	"overly detailed": "article contains an excessive amount of intricate detail",
	"peacock": "article may contain peacock terms that promote the subject without adding information",
	"plot": "plot summary in article is too long",
	"POV": "article does not maintain a neutral point of view",
	"primary sources": "article relies too heavily on first-hand sources, and needs third-party sources",
	"prose": "article is in a list format that may be better presented using prose",
	"recentism": "article is slanted towards recent events",
	"ref improve": "article needs additional references or sources for verification",
	"rough translation": "article is poorly translated and needs cleanup",
	"sections": "article needs to be broken into sections",
	"self-published": "article may contain improper references to self-published sources",
	"technical": "article may be too technical for the uninitiated reader",
	"tense": "article is written in an incorrect tense",
	"tone": "tone of article is not appropriate",
	"too few opinions": "article may not include all significant viewpoints",
	"uncategorized": "article is uncategorized",
	"under construction": "article is currently in the middle of an expansion or major revamping",
	"undue": "article lends undue weight to certain aspects of the subject but not others",
	"unreferenced": "article has no references at all",
	"unreliable sources": "article's references may not be reliable sources",
	"update": "article needs additional up-to-date information added",
	"very long": "article is too long",
	"weasel": "article neutrality is compromised by the use of weasel words",
	"wikify": "article needs to be wikified"
};

// A list of tags in order of category
// Tags should be in alphabetical order within the categories
// Add new categories with discretion - the list is long enough as is!

Twinkle.tag.article.tagCategories = {
	"Cleanup and maintenance tags": {
		"General cleanup": [
			"cleanup",
			"copy edit",
			"wikify"
		],
		"Potentially unwanted content": [
			"close paraphrasing",
			"copypaste",
			"external links",
			"non-free"
		],
		"Structure, formatting, and lead section": [
			"capitalization",
			"cleanup-reorganize",
			"condense",
			"lead missing",
			"lead rewrite",
			"lead too long",
			"lead too short",
			"sections",
			"very long"
		],
		"Fiction-related cleanup": [
			"allplot",
			"fiction",
			"in-universe",
			"plot"
		]
	},
	"General content issues": {
		"Importance and notability": [
			"notability"  // has subcategories and special-cased code
		],
		"Style of writing": [
			"advert",
			"essay-like",
			"fansite",
			"prose",
			"technical",
			"tense",
			"tone"
		],
		"Sense (or lack thereof)": [
			"confusing",
			"incoherent"
		],
		"Information and detail": [
			"context",
			"metricate",
			"overly detailed",
			"undue"
		],
		"Timeliness": [
			"out of date",
			"update"
		],
		"Neutrality, bias, and factual accuracy": [
			"autobiography",
			"COI",
			"disputed",
			"hoax",
			"globalize",  // has subcategories and special-cased code
			"peacock",
			"POV",
			"recentism",
			"too few opinions",
			"weasel"
		],
		"Verifiability and sources": [
			"BLP sources",
			"BLP unsourced",
			"one source",
			"original research",
			"primary sources",
			"ref improve",
			"self-published",
			"unreferenced",
			"unreliable sources"
		]
	},
	"Specific content issues": {
		"Language": [
			"not English",
			"rough translation"
		],
		"Links": [
			"dead end",
			"orphan",
			"overlinked",
			"wikify"  // this tag is listed twice because it used to focus mainly on links, but now it's a more general cleanup tag
		],
		"Referencing technique": [
			"citation style",
			"linkrot",
			"more footnotes",
			"no footnotes"
		],
		"Categories": [
			"cat improve",
			"uncategorized"
		]
	},
	"Merging": [
		"merge",
		"merge from",
		"merge to"
	],
	"Informational": [
		"GOCEinuse",
		"in use",
		"new unreviewed article",
		"under construction"
	]
};

// Tags for REDIRECTS start here

Twinkle.tag.spellingList = [
	{
		label: '{{R from abbreviation}}: redirect from a title with an abbreviation',
		value: 'R from abbreviation' 
	},
	{
		label: '{{R to list entry}}: redirect to a \"list of minor entities\"-type article which contains brief descriptions of subjects not notable enough to have separate articles',
		value: 'R to list entry' 
	},
	{
		label: '{{R to section}}: similar to {{R to list entry}}, but when list is organized in sections, such as list of characters in a fictional universe.',
		value: 'R to section' 
	},
	{
		label: '{{R from misspelling}}: redirect from a misspelling or typographical error',
		value: 'R from misspelling' 
	},
	{
		label: '{{R from alternative spelling}}: redirect from a title with a different spelling',
		value: 'R from alternative spelling' 
	},
	{
		label: '{{R from plural}}: redirect from a plural word to the singular equivalent',
		value: 'R from plural' 
	},
	{
		label: '{{R from related word}}: redirect from a related word',
		value: 'R from related word' 
	},
	{
		label: '{{R with possibilities}}: redirect from a more specific title to a more general, less detailed article, hence something which can and should be expanded',
		value: 'R with possibilities' 
	},
	{
		label: '{{R from member}}: redirect from a member of a group to a related topic such as the group, organization, or team that he or she belongs to',
		value: 'R from member' 
	},
	{
		label: '{{R from other capitalisation}}: redirect from a title with another method of capitalisation',
		value: 'R from other capitalisation'
	}
];

Twinkle.tag.alternativeList = [
	{
		label: '{{R from alternative name}}: redirect from a title that is another name, a pseudonym, a nickname, or a synonym',
		value: 'R from alternative name' 
	},
	{
		label: '{{R from full name}}: redirect from a title that is a complete or more complete name',
		value: 'R from full name' 
	},
	{
		label: '{{R from surname}}: redirect from a title that is a surname',
		value: 'R from surname' 
	},
	{
		label: '{{R from historic name}}: redirect from another name with a significant historic past as a region, state, city or such, but which is no longer known by that title or name',
		value: 'R from historic name' 
	},
	{
		label: '{{R from scientific name}}: redirect from the scientific name to the common name',
		value: 'R from scientific name' 
	},
	{
		label: '{{R to scientific name}}: redirect from the common name to the scientific name',
		value: 'R to scientific name' 
	},
	{
		label: '{{R from name and country}}: redirect from the specific name to the briefer name',
		value: 'R from name and country' 
	},
	{
		label: '{{R from alternative language}}: redirect from an English name to a name in another language, or vice-versa',
		value: 'R from alternative language' 
	},
	{
		label: '{{R from ASCII}}: redirect from a title in basic ASCII to the formal article title, with differences that are not diacritical marks (accents, umlauts, etc.)',
		value: 'R from ASCII' 
	},
	{
		label: '{{R from title without diacritics}}: redirect to the article title with diacritical marks (accents, umlauts, etc.)',
		value: 'R from title without diacritics'
	}
];

Twinkle.tag.administrativeList = [
	{
		label: '{{R from merge}}: redirect from a merged page in order to preserve its edit history',
		value: 'R from merge' 
	},
	{
		label: '{{R to disambiguation page}}: redirect to a disambiguation page',
		value: 'R to disambiguation page' 
	},
	{
		label: '{{R from duplicated article}}: redirect to a similar article in order to preserve its edit history',
		value: 'R from duplicated article' 
	},
	{
		label: '{{R to decade}}: redirect from a year to the decade article',
		value: 'R to decade' 
	},
	{
		label: '{{R from shortcut}}: redirect from a Wikipedia shortcut',
		value: 'R from shortcut' 
	},
	{
		label: '{{R from CamelCase}}: redirect from a CamelCase title',
		value: 'R from CamelCase' 
	},
	{
		label: '{{R from EXIF}}: redirect of a wikilink created from JPEG EXIF information (i.e. the \"metadata\" section on some image description pages)',
		value: 'R from EXIF' 
	},
	{
		label: '{{R from school}}: redirect from a school article that had very little information',
		value: 'R from school'
	}
];

// maintenance tags for FILES start here

Twinkle.tag.file = {};

Twinkle.tag.file.licenseList = [
	{ label: '{{Bsr}}: source info consists of bare image URL/generic base URL only', value: 'Bsr' },
	{ label: '{{Non-free reduce}}: non-low-resolution fair use image (or too-long audio clip, etc)', value: 'Non-free reduce' },
	{ label: '{{Non-free reduced}}: fair use media which has been reduced (old versions need to be deleted)', value: 'Non-free reduced' }
];

Twinkle.tag.file.cleanupList = [
	{ label: '{{Artifacts}}: PNG contains residual compression artifacts', value: 'Artifacts' },
	{ label: '{{Bad font}}: SVG uses fonts not available on the thumbnail server', value: 'Bad font' },
	{ label: '{{Bad format}}: PDF/DOC/... file should be converted to a more useful format', value: 'Bad format' },
	{ label: '{{Bad GIF}}: GIF that should be PNG, JPEG, or SVG', value: 'Bad GIF' },
	{ label: '{{Bad JPEG}}: JPEG that should be PNG or SVG', value: 'Bad JPEG' },
	{ label: '{{Bad trace}}: auto-traced SVG requiring cleanup', value: 'Bad trace' },
	{ label: '{{Cleanup image}}: general cleanup', value: 'Cleanup image' },
	{ label: '{{Cleanup SVG}}: SVG needing code and/or appearance cleanup', value: 'Cleanup SVG' },
	{ label: '{{ClearType}}: image (not screenshot) with ClearType anti-aliasing', value: 'ClearType' },
	{ label: '{{Imagewatermark}}: image contains visible or invisible watermarking', value: 'Imagewatermark' },
	{ label: '{{NoCoins}}: image using coins to indicate scale', value: 'NoCoins' },
	{ label: '{{Overcompressed JPEG}}: JPEG with high levels of artifacts', value: 'Overcompressed JPEG' },
	{ label: '{{Opaque}}: opaque background should be transparent', value: 'Opaque' },
	{ label: '{{Remove border}}: unneeded border, white space, etc.', value: 'Remove border' },
	{ label: '{{Rename media}}: file should be renamed according to the criteria at [[WP:FMV]]', value: 'Rename media' },
	{ label: '{{Should be PNG}}: GIF or JPEG should be lossless', value: 'Should be PNG' },
	{
		label: '{{Should be SVG}}: PNG, GIF or JPEG should be vector graphics', value: 'Should be SVG',
		subgroup: {
			name: 'svgCategory',
			type: 'select',
			list: [
				{ label: '{{Should be SVG|other}}', value: 'other' },
				{ label: '{{Should be SVG|alphabet}}: character images, font examples, etc.', value: 'alphabet' },
				{ label: '{{Should be SVG|chemical}}: chemical diagrams, etc.', value: 'chemical' },
				{ label: '{{Should be SVG|circuit}}: electronic circuit diagrams, etc.', value: 'circuit' },
				{ label: '{{Should be SVG|coat of arms}}: coats of arms', value: 'coat of arms' },
				{ label: '{{Should be SVG|diagram}}: diagrams that do not fit any other subcategory', value: 'diagram' },
				{ label: '{{Should be SVG|emblem}}: emblems, free/libre logos, insignias, etc.', value: 'emblem' },
				{ label: '{{Should be SVG|fair use}}: fair-use images, fair-use logos', value: 'fair use' },
				{ label: '{{Should be SVG|flag}}: flags', value: 'flag' },
				{ label: '{{Should be SVG|graph}}: visual plots of data', value: 'graph' },
				{ label: '{{Should be SVG|logo}}: logos', value: 'logo' },
				{ label: '{{Should be SVG|map}}: maps', value: 'map' },
				{ label: '{{Should be SVG|music}}: musical scales, notes, etc.', value: 'music' },
				{ label: '{{Should be SVG|physical}}: "realistic" images of physical objects, people, etc.', value: 'physical' },
				{ label: '{{Should be SVG|symbol}}: miscellaneous symbols, icons, etc.', value: 'symbol' }
			]
		}
	},
	{ label: '{{Should be text}}: image should be represented as text, tables, or math markup', value: 'Should be text' },
	{ label: '{{Split media}}: there are two different images in the upload log which need to be split', value: 'Split media' }
];

Twinkle.tag.file.qualityList = [
	{ label: '{{Image-blownout}}', value: 'Image-blownout' },
	{ label: '{{Image-out-of-focus}}', value: 'Image-out-of-focus' },
	{ label: '{{Image-Poor-Quality}}', value: 'Image-Poor-Quality' },
	{ label: '{{Image-underexposure}}', value: 'Image-underexposure' },
	{ label: '{{Low quality chem}}: disputed chemical structures', value: 'Low quality chem' }
];

Twinkle.tag.file.commonsList = [
	{ label: '{{Copy to Commons}}: free media that should be copied to Commons', value: 'Copy to Commons' },
	{ label: '{{Do not move to Commons}} (PD issue): file is PD in the US but not in country of origin', value: 'Do not move to Commons' },
	{ label: '{{Do not move to Commons}} (other reason)', value: 'Do not move to Commons_reason' },
	{ label: '{{Keep local}}: request to keep local copy of a Commons file', value: 'Keep local' },
	{ label: '{{Now Commons}}: file has been copied to Commons', value: 'subst:ncd' }
];

Twinkle.tag.file.replacementList = [
	{ label: '{{Duplicate}}: exact duplicate of another file, but not yet orphaned', value: 'Duplicate' },
	{ label: '{{Obsolete}}: improved version available', value: 'Obsolete' },
	{ label: '{{PNG version available}}', value: 'PNG version available' },
	{ label: '{{SVG version available}}', value: 'SVG version available' }
];



// Contains those article tags that can be grouped into {{multiple issues}}.
// This list includes synonyms.
Twinkle.tag.groupHash = [
	'advert',
	'autobiography',
	'BLP IMDb-only refimprove',
	'BLP IMDB-only refimprove',
	'BLP IMDb refimprove',
	'BLP sources',
	'BLPsources',
	'BLP unsourced',
	'BLPunsourced',
	'citation style',
	'citationstyle',
	'citation-style',
	'citations missing',
	'cite check',
	'citecheck',
	'cleanup',
	'cleanup-laundry',
	'laundry',
	'laundrylists',
	'cleanup-link rot',
	'linkrot',
	'cleanup-reorganize',
	'organize',
	'restructure',
	'reorganisation',
	'cleanup-rewrite',
	'rewrite',
	'cleanup-spam',
	'spam',
	'COI',
	'coi',
	'colloquial',
	'confusing',
	'context',
	'contradict',
	'copy edit',
	'copyedit',
	'criticism section',
	'criticisms',
	'crystal',
	'dead end',
	'deadend',
	'disputed',
	'essay-like',
	'essay',
	'example farm',
	'examplefarm',
	'expert',
	'external links',
	'fanpov',
	'fansite',
	'fiction',
	'game guide',
	'gameguide',
	'globalize',
	'histinfo',
	'hoax',
	'howto',
	'inappropriate person',
	'incomplete',
	'in-universe',
	'lead missing',
	'intromissing',
	'lead rewrite',
	'introrewrite',
	'lead too long',
	'intro length',
	'intro-toolong',
	'lead too short',
	'intro-tooshort',
	'like resume',
	'likeresume',
	'news release',
	'newsrelease',
	'no footnotes',
	'notability',
	'notable',
	'one source',
	'onesource',
	'original research',
	'orphan',
	'do-attempt',
	'out of date',
	'overly detailed',
	'fancruft',
	'peacock',
	'plot',
	'POV',
	'NPOV',
	'pov',
	'npov',
	'POV-check',
	'pov-check',
	'primary sources',
	'primarysources',
	'prose',
	'quote farm',
	'quotefarm',
	'recentism',
	'refimprove',
	'review',
	'sections',
	'self-published',
	'story',
	'synthesis',
	'technical',
	'jargon',
	'tone',
	'inappropriate tone',
	'travel guide',
	'travelguide',
	'trivia',
	'unbalanced',
	'unencyclopedic',
	'unreferenced',
	'unref',
	'unreliable sources',
	'unreliable',
	'update',
	'very long',
	'verylong',
	'long',
	'weasel',
	'wikify'
];

Twinkle.tag.callbacks = {
	main: function( pageobj ) {
		var params = pageobj.getCallbackParameters();
		var tagRe, tagText = '', summaryText = 'Added';
		var tags = [], groupableTags = [];

		// Remove tags that become superfluous with this action
		var pageText = pageobj.getPageText().replace(/\{\{\s*(New unreviewed article|Userspace draft)\s*(\|(?:\{\{[^{}]*\}\}|[^{}])*)?\}\}\s*/ig, "");

		var i;
		if( Twinkle.tag.mode !== 'redirect' ) {
			// Check for preexisting tags and separate tags into groupable and non-groupable arrays
			for( i = 0; i < params.tags.length; i++ ) {
				tagRe = new RegExp( '(\\{\\{' + params.tags[i] + '(\\||\\}\\}))', 'im' );
				if( !tagRe.exec( pageText ) ) {
					if( Twinkle.tag.groupHash.indexOf(params.tags[i]) !== -1 && 
							(params.tags[i] !== 'globalize' || params.globalizeSubcategory === 'globalize' ) &&
							(params.tags[i] !== 'notability' || params.notabilitySubcategory === 'none' )) {
						// don't add to multipleissues for globalize/notability subcats
						groupableTags = groupableTags.concat( params.tags[i] );
					} else {
						tags = tags.concat( params.tags[i] );
					}
				} else {
					Status.info( 'Info', 'Found {{' + params.tags[i] +
						'}} on the article already...excluding' );
				}
			}

			if( params.group && groupableTags.length >= 3 ) {
				Status.info( 'Info', 'Grouping supported tags into {{multiple issues}}' );

				groupableTags.sort();
				tagText += '{{multiple issues';
				summaryText += ' {{[[Template:multiple issues|multiple issues]]}} with parameters';
				for( i = 0; i < groupableTags.length; i++ ) {
					tagText += '|' + groupableTags[i] +
						'={{subst:CURRENTMONTHNAME}} {{subst:CURRENTYEAR}}';

					if( i === (groupableTags.length - 1) ) {
						summaryText += ' and';
					} else if ( i < (groupableTags.length - 1) && i > 0 ) {
						summaryText += ',';
					}
					summaryText += ' ' + groupableTags[i];
				}
				tagText += '}}\n';
			} else {
				tags = tags.concat( groupableTags );
			}
		} else {
			// Check for pre-existing tags
			for( i = 0; i < params.tags.length; i++ ) {
				tagRe = new RegExp( '(\\{\\{' + params.tags[i] + '(\\||\\}\\}))', 'im' );
				if( !tagRe.exec( pageText ) ) {
					tags = tags.concat( params.tags[i] );
				} else {
					Status.info( 'Info', 'Found {{' + params.tags[i] +
						'}} on the redirect already...excluding' );
				}
			}
		}

		tags.sort();
		for( i = 0; i < tags.length; i++ ) {
			var currentTag = "";
			if( tags[i] === 'uncategorized' || tags[i] === 'cat improve' ) {
				pageText += '\n\n{{' + tags[i] +
					'|date={{subst:CURRENTMONTHNAME}} {{subst:CURRENTYEAR}}}}';
			} else {
				if( tags[i] === 'globalize' ) {
					currentTag += '{{' + params.globalizeSubcategory;
				} else {
					currentTag += ( Twinkle.tag.mode === 'redirect' ? '\n' : '' ) + '{{' + tags[i];
				}

				if( tags[i] === 'notability' && params.notabilitySubcategory !== 'none' ) {
					currentTag += '|' + params.notabilitySubcategory;
				}

				// prompt for other parameters, based on the tag
				switch( tags[i] ) {
					case 'cleanup':
						var reason = prompt('You can optionally enter a more specific reason why the article requires cleanup.  \n' +
							"Just click OK if you don't wish to enter this.  To skip the {{cleanup}} tag, click Cancel.", "");
						if (reason === null) {
							continue;
						} else if (reason !== "") {
							currentTag += '|reason=' + reason;
						}
						break;
					case 'copypaste':
						var url = prompt('Please enter the URL which is believed to be the source of the copy-paste.  \n' +
							"Just click OK if you don't know.  To skip the {{copypaste}} tag, click Cancel.", "");
						if (url === null) {
							continue;
						} else if (url !== "") {
							currentTag += '|url=' + url;
						}
						break;
					case 'not English':
						var langname = prompt('Please enter the name of the language the article is thought to be written in.  \n' +
							"Just click OK if you don't know.  To skip the {{not English}} tag, click Cancel.", "");
						if (langname === null) {
							continue;
						} else if (langname !== "") {
							currentTag += '|1=' + langname;
						}
						break;
					case 'rough translation':
						var roughlang = prompt('Please enter the name of the language the article is thought to have been translated from.  \n' +
							"Just click OK if you don't know.  To skip the {{rough translation}} tag, click Cancel.", "");
						if (roughlang === null) {
							continue;
						} else if (roughlang !== "") {
							currentTag += '|1=' + roughlang;
						}
						break;
					case 'expert-subject':
						var wikiproject = prompt('Please enter the name of a WikiProject which might be able to help recruit an expert.  \n' +
							"Just click OK if you don't know.  To skip the {{expert-subject}} tag, click Cancel.", "");
						if (wikiproject === null) {
							continue;
						} else if (wikiproject !== "") {
							currentTag += '|1=' + wikiproject;
						}
						break;
					case 'wikify':
						var wreason = prompt('You can optionally enter a more specific reason why the article needs to be wikified.  \n' +
							"Just click OK if you don't wish to enter this.  To skip the {{wikify}} tag, click Cancel.", "");
						if (wreason === null) {
							continue;
						} else if (wreason !== "") {
							currentTag += '|reason=' + wreason;
						}
						break;
					case 'merge':
					case 'merge to':
					case 'merge from':
						var param = prompt('Please enter the name of the other article(s) involved in the merge.  \n' +
							"To specify multiple articles, separate them with a vertical pipe (|) character.  \n" +
							"This information is required.  Click OK when done, or click Cancel to skip the merge tag.", "");
						if (param === null) {
							continue;
						} else if (param !== "") {
							currentTag += '|' + param;
						}
						break;
					default:
						break;
				}

				currentTag += Twinkle.tag.mode === 'redirect' ? '}}' : '|date={{subst:CURRENTMONTHNAME}} {{subst:CURRENTYEAR}}}}\n';
				tagText += currentTag;
			}

			if ( i > 0 || groupableTags.length > 3 ) {
				if( i === (tags.length - 1) ) {
					summaryText += ' and';
				} else if ( i < (tags.length - 1) ) {
					summaryText += ',';
				}
			}

			summaryText += ' {{[[';
			if( tags[i] === 'globalize' ) {
				summaryText += "Template:" + params.globalizeSubcategory + '|' + params.globalizeSubcategory;
			} else {
				summaryText += (tags[i].indexOf(":") !== -1 ? tags[i] : ("Template:" + tags[i] + "|" + tags[i]));
			}
			summaryText += ']]}}';
		}

		if( Twinkle.tag.mode === 'redirect' ) {
			pageText += tagText;
		} else {
			// smartly insert the new tags after any hatnotes. Regex is a bit more
			// complicated than it'd need to be, to allow templates as parameters,
			// and to handle whitespace properly.
			pageText = pageText.replace(/^\s*(?:((?:\s*\{\{\s*(?:about|correct title|dablink|distinguish|for|other\s?(?:hurricaneuses|people|persons|places|uses(?:of)?)|redirect(?:-acronym)?|see\s?(?:also|wiktionary)|selfref|the)\d*\s*(\|(?:\{\{[^{}]*\}\}|[^{}])*)?\}\})+(?:\s*\n)?)\s*)?/i,
				"$1" + tagText);
		}
		summaryText += ' tag' + ( ( tags.length + ( groupableTags.length > 3 ? 1 : 0 ) ) > 1 ? 's' : '' ) +
			' to ' + Twinkle.tag.mode + Twinkle.getPref('summaryAd');

		pageobj.setPageText(pageText);
		pageobj.setEditSummary(summaryText);
		pageobj.setWatchlist(Twinkle.getFriendlyPref('watchTaggedPages'));
		pageobj.setMinorEdit(Twinkle.getFriendlyPref('markTaggedPagesAsMinor'));
		pageobj.setCreateOption('nocreate');
		pageobj.save();

		if( Twinkle.getFriendlyPref('markTaggedPagesAsPatrolled') ) {
			pageobj.patrol();
		}
	},

	file: function friendlytagCallbacksFile(pageobj) {
		var text = pageobj.getPageText();
		var params = pageobj.getCallbackParameters();
		var summary = "Adding ";

		// Add maintenance tags
		if (params.tags.length) {

			var tagtext = "", currentTag;
			$.each(params.tags, function(k, tag) {
				// when other commons-related tags are placed, remove "move to Commons" tag
				if (["Keep local", "subst:ncd", "Do not move to Commons_reason", "Do not move to Commons",
					"Now Commons"].indexOf(tag) !== -1) {
					text = text.replace(/\{\{(mtc|(copy |move )?to ?commons|move to wikimedia commons|copy to wikimedia commons)[^}]*}}/gi, "");
				}

				currentTag = "{{" + (tag === "Do not move to Commons_reason" ? "Do not move to Commons" : tag);

				var input;
				switch (tag) {
					case "subst:ncd":
						/* falls through */
					case "Keep local":
						input = prompt( "{{" + (tag === "subst:ncd" ? "Now Commons" : tag) +
							"}} - Enter the name of the image on Commons (if different from local name), excluding the File: prefix:", "" );
						if (input === null) {
							return true;  // continue
						} else if (input !== "") {
							currentTag += '|1=' + input;
						}
						break;
					case "Rename media":
						input = prompt( "{{Rename media}} - Enter the new name for the image (optional):", "" );
						if (input === null) {
							return true;  // continue
						} else if (input !== "") {
							currentTag += "