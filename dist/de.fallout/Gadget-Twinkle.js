/**
 * +-------------------------------------------------------------------------+
 * |                  === WARNUNG: GLOBALE GADGET DATEI ===                  |
 * |                Changes to this page affect many users.                  |
 * |           Please discuss changes at [[WT:TW]] before editing.           |
 * +-------------------------------------------------------------------------+
 *
 * Imported from github [https://github.com/azatoth/twinkle]
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
    markWelcomesAsMinor: true,
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
    if (typeof(Twinkle.prefs) === "object" && typeof(Twinkle.prefs.twinkle) === "object") {
        // look in Twinkle.prefs (twinkleoptions.js)
        result = Twinkle.prefs.twinkle[name];
    } else if (typeof(window.TwinkleConfig) === "object") {
        // look in TwinkleConfig
        result = window.TwinkleConfig[name];
    }

    if (typeof(result) === "undefined") {
        return Twinkle.defaultConfig.twinkle[name];
    }
    return result;
};

Twinkle.getFriendlyPref = function twinkleGetFriendlyPref(name) {
    var result;
    if (typeof(Twinkle.prefs) === "object" && typeof(Twinkle.prefs.friendly) === "object") {
        // look in Twinkle.prefs (twinkleoptions.js)
        result = Twinkle.prefs.friendly[name];
    } else if (typeof(window.FriendlyConfig) === "object") {
        // look in FriendlyConfig
        result = window.FriendlyConfig[name];
    }

    if (typeof(result) === "undefined") {
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
 */
function twAddPortletLink( href, text, id, tooltip, accesskey, nextnode )
{
    if (Twinkle.getPref("portletArea") !== null) {
        twAddPortlet(Twinkle.getPref("portletArea"), Twinkle.getPref("portletId"), Twinkle.getPref("portletName"), Twinkle.getPref("portletType"), Twinkle.getPref("portletNext"));
    }
    return mw.util.addPortletLink( Twinkle.getPref("portletId"), href, text, id, tooltip, accesskey, nextnode );
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
        $(twAddPortletLink("#", "Shared IP", "friendly-shared", "Shared IP tagging", "")).click(function() { Twinkle.shared.callback(username); });
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
        label: '{{shared IP}}: standard shared IP address template',
        value: 'shared IP',
        tooltip: 'IP user talk page template that shows helpful information to IP users and those wishing to warn, block or ban them'
    },
    {
        label: '{{shared IP edu}}: shared IP address template modified for educational institutions',
        value: 'shared IP edu'
    },
    {
        label: '{{shared IP corp}}: shared IP address template modified for businesses',
        value: 'shared IP corp'
    },
    {
        label: '{{shared IP public}}: shared IP address template modified for public terminals',
        value: 'shared IP public'
    },
    {
        label: '{{shared IP gov}}: shared IP address template modified for government agencies or facilities',
        value: 'shared IP gov'
    },
    {
        label: '{{dynamicIP}}: shared IP address template modified for organizations with dynamic addressing',
        value: 'dynamicIP'
    },
    {
        label: '{{ISP}}: shared IP address template modified for ISP organizations (specifically proxies)',
        value: 'ISP'
    },
    {
        label: '{{mobileIP}}: shared IP address template modified for mobile phone companies and their customers',
        value: 'mobileIP'
    }
];

Twinkle.shared.callback.change_shared = function friendlytagCallbackChangeShared(e) {
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
        $(twAddPortletLink("#", "Tag", "friendly-tag", "Tag redirect", "")).click(Twinkle.tag.callback);
    }
    // file tagging
    else if( mw.config.get('wgNamespaceNumber') === 6 && !document.getElementById("mw-sharedupload") && document.getElementById("mw-imagepage-section-filehistory") ) {
        Twinkle.tag.mode = 'file';
        $(twAddPortletLink("#", "Tag", "friendly-tag", "Add maintenance tags to file", "")).click(Twinkle.tag.callback);
    }
    // article tagging
    else if( mw.config.get('wgNamespaceNumber') === 0 && mw.config.get('wgCurRevisionId') ) {
        Twinkle.tag.mode = 'article';
        $(twAddPortletLink("#", "Tag", "friendly-tag", "Add maintenance tags to article", "")).click(Twinkle.tag.callback);
    }
    // tagging of draft articles
    else if( ((mw.config.get('wgNamespaceNumber') === 2 && mw.config.get('wgPageName').indexOf("/") !== -1) || /^Wikipedia\:Articles[ _]for[ _]creation\//.exec(mw.config.get('wgPageName')) ) && mw.config.get('wgCurRevisionId') ) {
        Twinkle.tag.mode = 'draft';
        $(twAddPortletLink("#", "Tag", "friendly-tag", "Add review tags to draft article", "")).click(Twinkle.tag.callback);
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

        case 'draft':
            Window.setTitle( "Article draft tagging" );

            form.append({ type: 'header', label:'Draft article tags' });
            form.append({ type: 'checkbox', name: 'draftTags', list: Twinkle.tag.draftList });
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

Twinkle.tag.article.tags = {
    "advert": "article is written like an advertisement",
    "allplot": "article is almost entirely a plot summary",
    "BLP sources": "BLP article needs additional sources for verification",
    "BLP unsourced": "BLP article has no sources at all (use BLP PROD instead for new articles)",
    "catimprove": "article may require additional categories",
    "citation style": "article has unclear or inconsistent inline citations",
    "cleanup": "article may require cleanup",
    "close paraphrasing": "article contains close paraphrasing of a non-free copyrighted source",
    "COI": "article creator or major contributor may have a conflict of interest",
    "confusing": "article may be confusing or unclear",
    "context": "article provides insufficient context",
    "copyedit": "article needs copy editing for grammar, style, cohesion, tone, and/or spelling",
    "copypaste": "article appears to have been copied and pasted from a source",
    "dead end": "article has few or no links to other articles",
    "disputed": "article has questionable factual accuracy",
    "essay-like": "article is written like an essay and needs cleanup",
    "expert-subject": "article needs attention from an expert on the subject",
    "external links": "article's external links may not follow content policies or guidelines",
    "fansite": "article  resembles a fansite",
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
    "more footnotes": "article has some references, but insufficient in-text citations",
    "new unreviewed article": "mark article for later review",
    "no footnotes": "article has references, but no in-text citations",
    "non-free": "article may contain excessive or improper use of copyrighted materials",
    "NOT": "article contains unencyclopedic material which contravenes WP:NOT",
    "notability": "article's subject may not meet the notability guideline",
    "not English": "article is written in a language other than English and needs translation",
    "one source": "article relies largely or entirely upon a single source",
    "original research": "article has original research or unverified claims",
    "orphan": "article is linked to from few or no other articles",
    "out of date": "article needs out-of-date information removed or updated",
    "overcoverage": "article has an extensive bias or disproportional coverage towards one or more specific regions",
    "over detailed": "article contains an excessive amount of intricate detail",
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
    "tense": "article is written in an incorrect tense",
    "tone": "tone of article is not appropriate",
    "too few opinions": "article may not include all significant viewpoints",
    "uncategorized": "article is uncategorized",
    "under construction": "article is currently in the middle of an expansion or major revamping",
    "unreferenced": "article has no references at all",
    "unreliable sources": "article's references may not be reliable sources",
    "update": "article needs additional up-to-date information added",
    "very long": "article is too long",
    "weasel": "article neutrality is compromised by the use of weasel words",
    "wikify": "article needs to be wikified"
};

Twinkle.tag.article.tagCategories = {
    "Cleanup and maintenance tags": {
        "General cleanup": [
            "cleanup",
            "copyedit",
            "wikify"
        ],
        "Potentially unwanted content": [
            "close paraphrasing",
            "copypaste",
            "external links",
            "non-free",
            "NOT"
        ],
        "Structure and lead section": [
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
            "tense",
            "tone"
        ],
        "Sense (or lack thereof)": [
            "confusing",
            "incoherent"
        ],
        "Information and detail": [
            "context",
            "expert-subject",
            "over detailed"
        ],
        "Timeliness": [
            "out of date",
            "update"
        ],
        "Neutrality, bias, and factual accuracy": [
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
            "wikify"  // this tag is listed twice because it used to focus mainly on links, but now it's a more general cleanup tag
        ],
        "Referencing technique": [
            "citation style",
            "linkrot",
            "more footnotes",
            "no footnotes"
        ],
        "Categories": [
            "catimprove",
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
    { label: '{{Should be text}}: image should be represented as text, tables, or math markup', value: 'Should be text' }
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
    { label: '{{Now Commons}}: file has been copied to Commons', value: 'subst:ncd' },
    { label: '{{Shadows Commons}}: a different file is present on Commons under the same filename', value: 'Shadows Commons' }
];

Twinkle.tag.file.replacementList = [
    { label: '{{Obsolete}}: improved version available', value: 'Obsolete' },
    { label: '{{Redundant}}: exact duplicate of another file, but not yet orphaned', value: 'Redundant' },
    { label: '{{PNG version available}}', value: 'PNG version available' },
    { label: '{{SVG version available}}', value: 'SVG version available' }
];


// Tags for DRAFT ARTICLES start here

Twinkle.tag.draftList = [
    { label: '{{New unreviewed article}}: mark article for later review', value: 'new unreviewed article' }
];


// Contains those article tags that can be grouped into {{multiple issues}}.
// This list includes synonyms.
Twinkle.tag.groupHash = [
    'advert',
    'autobiography',
    'BLP IMDb refimprove',
    'BLP IMDb-only refimprove',
    'BLP sources',
    'BLP unsourced',
    'BLPrefimprove',
    'BLPsources',
    'BLPunref',
    'BLPunreferenced',
    'BLPunsourced',
    'citation style',
    'citations missing',
    'cite check',
    'citecheck',
    'cleanup',
    'cleanup-laundry',
    'cleanup-link rot',
    'cleanup-reorganize',
    'cleanup-rewrite',
    'cleanup-spam',
    'coi',
    'COI',
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
    'do-attempt',
    'essay',
    'essay-like',
    'example farm',
    'examplefarm',
    'expert',
    'external links',
    'fancruft',
    'fanpov',
    'fansite',
    'fiction',
    'game guide',
    'gameguide',
    'globalize',
    'grammar',
    'histinfo',
    'hoax',
    'howto',
    'inappropriate person',
    'inappropriate tone',
    'incomplete',
    'intro length',
    'intromissing',
    'introrewrite',
    'intro-toolong',
    'intro-tooshort',
    'in-universe',
    'jargon',
    'laundry',
    'laundrylists',
    'lead missing',
    'lead rewrite',
    'lead too long',
    'lead too short',
    'like resume',
    'likeresume',
    'linkrot',
    'long',
    'news release',
    'newsrelease',
    'notability',
    'notable',
    'npov',
    'one source',
    'onesource',
    'organize',
    'original research',
    'orphan',
    'out of date',
    'over detailed',
    'peacock',
    'plot',
    'pov',
    'POV',
    'pov-check',
    'POV-check',
    'primary sources',
    'primarysources',
    'prose',
    'quote farm',
    'quotefarm',
    'recentism',
    'refimprove',
    'refimproveBLP',
    'reorganisation',
    'restructure',
    'review',
    'rewrite',
    'sections',
    'self-published',
    'spam',
    'story',
    'synthesis',
    'technical',
    'tone',
    'travel guide',
    'travelguide',
    'trivia',
    'unbalanced',
    'unencyclopedic',
    'unref',
    'unrefBLP',
    'unreferenced',
    'unreferencedBLP',
    'unreliable sources',
    'unreliable',
    'update',
    'very long',
    'verylong',
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
            if( tags[i] === 'uncategorized' || tags[i] === 'catimprove' ) {
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

            summaryText += ' {{[[Template:';
            if( tags[i] === 'globalize' ) {
                summaryText += params.globalizeSubcategory + '|' + params.globalizeSubcategory;
            } else {
                summaryText += tags[i] + '|' + tags[i];
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

        // Add in maintenance tags
        if (params.tags.length) {

            var tagtext = "";
            $.each(params.tags, function(k, tag) {
                tagtext += "{{" + (tag === "Do not move to Commons_reason" ? "Do not move to Commons" : tag);

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
                            tagtext += '|1=' + input;
                        }
                        break;
                    case "Rename media":
                        input = prompt( "{{Rename media}} - Enter the new name for the image (optional):", "" );
                        if (input === null) {
                            return true;  // continue
                        } else if (input !== "") {
                            tagtext += "|1=" + input;
                        }
                        input = prompt( "{{Rename media}} - Enter the reason for the rename (optional):", "" );
                        if (input === null) {
                            return true;  // continue
                        } else if (input !== "") {
                            tagtext += "|2=" + input;
                        }
                        break;
                    case "Cleanup image":
                        /* falls through */
                    case "Cleanup SVG":
                        input = prompt( "{{" + tag + "}} - Enter the reason for cleanup (required). To skip the tag, click Cancel:", "" );
                        if (input === null) {
                            return true;  // continue
                        } else if (input !== "") {
                            tagtext += "|1=" + input;
                        }
                        break;
                    case "Image-Poor-Quality":
                        input = prompt( "{{Image-Poor-Quality}} - Enter the reason why this image is so bad (required). To skip the tag, click Cancel:", "" );
                        if (input === null) {
                            return true;  // continue
                        } else if (input !== "") {
                            tagtext += "|1=" + input;
                        }
                        break;
                    case "Low quality chem":
                        input = prompt( "{{Low quality chem}} - Enter the reason why the diagram is disputed (required). To skip the tag, click Cancel:", "" );
                        if (input === null) {
                            return true;  // continue
                        } else if (input !== "") {
                            tagtext += "|1=" + input;
                        }
                        break;
                    case "PNG version available":
                        /* falls through */
                    case "SVG version available":
                        /* falls through */
                    case "Obsolete":
                        /* falls through */
                    case "Redundant":
                        input = prompt( "{{" + tag + "}} - Enter the name of the file which replaces this one (required). To skip the tag, click Cancel:", "" );
                        if (input === null) {
                            return true;  // continue
                        } else if (input !== "") {
                            tagtext += "|1=" + input;
                        }
                        break;
                    case "Do not move to Commons_reason":
                        input = prompt( "{{Do not move to Commons}} - Enter the reason why this image should not be moved to Commons (required). To skip the tag, click Cancel:", "" );
                        if (input === null) {
                            return true;  // continue
                        } else if (input !== "") {
                            tagtext += "|reason=" + input;
                        }
                        break;
                    case "Non-free reduced":
                        tagtext += "|date={{subst:date}}";
                        break;
                    default:
                        break;  // don't care
                }

                if (tag === "Should be SVG") {
                    tagtext += "|" + params.svgSubcategory;
                }

                tagtext += "}}\n";

                summary += "{{" + tag + "}}, ";

                return true;  // continue
            });

            text = tagtext + text;
        }

        pageobj.setPageText(text);
        pageobj.setEditSummary(summary.substring(0, summary.length - 2) + Twinkle.getPref('summaryAd'));
        pageobj.setWatchlist(Twinkle.getFriendlyPref('watchTaggedPages'));
        pageobj.setMinorEdit(Twinkle.getFriendlyPref('markTaggedPagesAsMinor'));
        pageobj.setCreateOption('nocreate');
        pageobj.save();

        if( Twinkle.getFriendlyPref('markTaggedPagesAsPatrolled') ) {
            pageobj.patrol();
        }
    }
};

Twinkle.tag.callback.evaluate = function friendlytagCallbackEvaluate(e) {
    var form = e.target;
    var params = {};

    switch (Twinkle.tag.mode) {
        case 'article':
            params.tags = form.getChecked( 'articleTags' );
            params.group = form.group.checked;
            params.globalizeSubcategory = form["articleTags.globalize"] ? form["articleTags.globalize"].value : null;
            params.notabilitySubcategory = form["articleTags.notability"] ? form["articleTags.notability"].value : null;
            break;
        case 'file':
            params.svgSubcategory = form["imageTags.svgCategory"] ? form["imageTags.svgCategory"].value : null;
            params.tags = form.getChecked( 'imageTags' );
            break;
        case 'redirect':
            params.tags = form.getChecked( 'redirectTags' );
            break;
        case 'draft':
            params.tags = form.getChecked( 'draftTags' );
            Twinkle.tag.mode = 'article';
            break;
        default:
            alert("Twinkle.tag: unknown mode " + Twinkle.tag.mode);
            break;
    }

    if( !params.tags.length ) {
        alert( 'You must select at least one tag!' );
        return;
    }

    SimpleWindow.setButtonsEnabled( false );
    Status.init( form );

    Wikipedia.actionCompleted.redirect = mw.config.get('wgPageName');
    Wikipedia.actionCompleted.notice = "Tagging complete, reloading article in a few seconds";
    if (Twinkle.tag.mode === 'redirect') {
        Wikipedia.actionCompleted.followRedirect = false;
    }

    var wikipedia_page = new Wikipedia.page(mw.config.get('wgPageName'), "Tagging " + Twinkle.tag.mode);
    wikipedia_page.setCallbackParameters(params);
    switch (Twinkle.tag.mode) {
        case 'article':
            /* falls through */
        case 'redirect':
            wikipedia_page.load(Twinkle.tag.callbacks.main);
            return;
        case 'file':
            wikipedia_page.load(Twinkle.tag.callbacks.file);
            return;
        default:
            alert("Twinkle.tag: unknown mode " + Twinkle.tag.mode);
            break;
    }
};

/*
 ****************************************
 *** friendlytalkback.js: Talkback module
 ****************************************
 * Mode of invocation:     Tab ("TB")
 * Active on:              Existing user talk pages
 * Config directives in:   FriendlyConfig
 */

Twinkle.talkback = function friendlytalkback() {
    if( mw.config.get('wgNamespaceNumber') === 3 ) {
        var username = mw.config.get('wgTitle').split( '/' )[0].replace( /\"/, "\\\""); // only first part before any slashes
        $(twAddPortletLink("#", "TB", "friendly-talkback", "Easy talkback", "")).click(function() { Twinkle.talkback.callback(username); });
    }
};

Twinkle.talkback.callback = function friendlytalkbackCallback( uid ) {
    if( uid === mw.config.get('wgUserName') ){
        alert( 'Is it really so bad that you\'re talking back to yourself?' );
        return;
    }

    var Window = new SimpleWindow( 600, 350 );
    Window.setTitle( "Talkback" );
    Window.setScriptName( "Twinkle" );
    Window.addFooterLink( "About {{talkback}}", "Template:Talkback" );
    Window.addFooterLink( "Twinkle help", "WP:TW/DOC#talkback" );

    var form = new QuickForm( Twinkle.talkback.callback.evaluate );

    form.append( { type: 'radio', name: 'tbtarget',
                list: [ {
                        label: 'My talk page',
                        value: 'mytalk',
                        checked: 'true' },
                    {
                        label: 'Other user talk page',
                        value: 'usertalk' },
                    {
                        label: "Administrators' noticeboard",
                        value: 'an' },
                    {
                        label: 'Other page',
                        value: 'other' } ],
                event: Twinkle.talkback.callback.change_target
            } );

    form.append( {
            type: 'field',
            label: 'Work area',
            name: 'work_area'
        } );

    form.append( { type:'submit' } );

    var result = form.render();
    Window.setContent( result );
    Window.display();

    // We must init the
    var evt = document.createEvent( "Event" );
    evt.initEvent( 'change', true, true );
    result.tbtarget[0].dispatchEvent( evt );
};

Twinkle.talkback.prev_page = '';
Twinkle.talkback.prev_section = '';
Twinkle.talkback.prev_message = '';

Twinkle.talkback.callback.change_target = function friendlytagCallbackChangeTarget(e) {
    var value = e.target.values;
    var root = e.target.form;
    var old_area;

    if(root.section) {
        Twinkle.talkback.prev_section = root.section.value;
    }
    if(root.message) {
        Twinkle.talkback.prev_message = root.message.value;
    }
    if(root.page) {
        Twinkle.talkback.prev_page = root.page.value;
    }

    for( var i = 0; i < root.childNodes.length; ++i ) {
        var node = root.childNodes[i];
        if (node instanceof Element && node.getAttribute( 'name' ) === 'work_area' ) {
            old_area = node;
            break;
        }
    }
    var work_area = new QuickForm.element( {
            type: 'field',
            label: 'Talkback information',
            name: 'work_area'
        } );

    switch( value ) {
        case 'mytalk':
            /* falls through */
        default:
            work_area.append( {
                    type:'input',
                    name:'section',
                    label:'Linked section (optional)',
                    tooltip:'The section heading on your talk page where you left a message. Leave empty for no section to be linked.',
                    value: Twinkle.talkback.prev_section
                } );
            break;
        case 'usertalk':
            work_area.append( {
                    type:'input',
                    name:'page',
                    label:'User',
                    tooltip:'The username of the user on whose talk page you left a message.',
                    value: Twinkle.talkback.prev_page
                } );
            
            work_area.append( {
                    type:'input',
                    name:'section',
                    label:'Linked section (optional)',
                    tooltip:'The section heading on the page where you left a message. Leave empty for no section to be linked.',
                    value: Twinkle.talkback.prev_section
                } );
            break;
        case 'an':
            var noticeboard = work_area.append( {
                    type: 'select',
                    name: 'noticeboard',
                    label: 'Noticeboard:'
                } );
            noticeboard.append( {
                    type: 'option',
                    label: "WP:AN (Administrators' noticeboard)",
                    value: "Wikipedia:Administrators' noticeboard"
                } );
            noticeboard.append( {
                    type: 'option',
                    label: 'WP:ANI (Administrators\' noticeboard/Incidents)',
                    selected: true,
                    value: "Wikipedia:Administrators' noticeboard/Incidents"
                } );
            work_area.append( {
                    type:'input',
                    name:'section',
                    label:'Linked thread',
                    tooltip:'The heading of the relevant AN or ANI thread.',
                    value: Twinkle.talkback.prev_section
                } );
            break;
        case 'other':
            work_area.append( {
                    type:'input',
                    name:'page',
                    label:'Full page name',
                    tooltip:'The full page name where you left the message.  For example: "Wikipedia talk:Friendly".',
                    value: Twinkle.talkback.prev_page
                } );
            
            work_area.append( {
                    type:'input',
                    name:'section',
                    label:'Linked section (optional)',
                    tooltip:'The section heading on the page where you left a message. Leave empty for no section to be linked.',
                    value: Twinkle.talkback.prev_section
                } );
            break;
    }

    if (value !== "an") {
        work_area.append( { type:'textarea', label:'Additional message (optional):', name:'message', tooltip:'An additional message that you would like to leave below the talkback template.  Your signature will be added to the end of the message if you leave one.' } );
    }

    work_area = work_area.render();
    root.replaceChild( work_area, old_area );
    root.message.value = Twinkle.talkback.prev_message;
};

Twinkle.talkback.callback.evaluate = function friendlytalkbackCallbackEvaluate(e) {
    var tbtarget = e.target.getChecked( 'tbtarget' )[0];
    var page = null;
    var section = e.target.section.value;
    if( tbtarget === 'usertalk' || tbtarget === 'other' ) {
        page = e.target.page.value;
        
        if( tbtarget === 'usertalk' ) {
            if( !page ) {
                alert( 'You must specify the username of the user whose talk page you left a message on.' );
                return;
            }
        } else {
            if( !page ) {
                alert( 'You must specify the full page name when your message is not on a user talk page.' );
                return;
            }
        }
    } else if (tbtarget === "an") {
        page = e.target.noticeboard.value;
    }

    var message = e.target.message.value;

    SimpleWindow.setButtonsEnabled( false );
    Status.init( e.target );

    Wikipedia.actionCompleted.redirect = mw.config.get('wgPageName');
    Wikipedia.actionCompleted.notice = "Talkback complete; reloading talk page in a few seconds";

    var talkpage = new Wikipedia.page(mw.config.get('wgPageName'), "Adding talkback");
    var tbPageName = (tbtarget === 'mytalk') ? mw.config.get('wgUserName') : page;

    var text;
    if ( tbtarget === "an" ) {
        text = "\n== " + Twinkle.getFriendlyPref('adminNoticeHeading') + " ==\n{{subst:ANI-notice|thread=";
        text += section + "|noticeboard=" + tbPageName + "}}~~~~";

        talkpage.setEditSummary("Notice of AN/ANI discussion" + Twinkle.getPref('summaryAd'));
    } else {
        //clean talkback heading: strip section header markers, were erroneously suggested in the documentation
        text = '\n==' + Twinkle.getFriendlyPref('talkbackHeading').replace(/^\s*=+\s*(.*?)\s*=+$\s*/, "$1") + '==\n{{talkback|';
        text += tbPageName;

        if( section ) {
            text += '|' + section;
        }

        text += '|ts=~~~~~}}';

        if( message ) {
            text += '\n' + message + '  ~~~~';
        } else if( Twinkle.getFriendlyPref('insertTalkbackSignature') ) {
            text += '\n~~~~';
        }

        talkpage.setEditSummary("Talkback ([[" + (tbtarget === 'other' ? '' : 'User talk:') + tbPageName +
            (section ? ('#' + section) : '') + "]])" + Twinkle.getPref('summaryAd'));
    }

    talkpage.setAppendText(text);
    talkpage.setCreateOption('recreate');
    talkpage.setMinorEdit(Twinkle.getFriendlyPref('markTalkbackAsMinor'));
    talkpage.setFollowRedirect(true);
    talkpage.append();
};

/*
 ****************************************
 *** friendlywelcome.js: Welcome module
 ****************************************
 * Mode of invocation:     Tab ("Wel"), or from links on diff pages
 * Active on:              Existing user talk pages, diff pages
 * Config directives in:   FriendlyConfig
 */

Twinkle.welcome = function friendlywelcome() {
    if( QueryString.exists( 'friendlywelcome' ) ) {
        if( QueryString.get( 'friendlywelcome' ) === 'auto' ) {
            Twinkle.welcome.auto();
        } else {
            Twinkle.welcome.semiauto();
        }
    } else {
        Twinkle.welcome.normal();
    }
};

Twinkle.welcome.auto = function() {
    if( QueryString.get( 'action' ) !== 'edit' ) {
        // userpage not empty, aborting auto-welcome
        return;
    }

    Twinkle.welcome.welcomeUser();
};

Twinkle.welcome.semiauto = function() {
    Twinkle.welcome.callback( mw.config.get( 'wgTitle' ).split( '/' )[0].replace( /\"/, "\\\"") );
};

Twinkle.welcome.normal = function() {
    if( QueryString.exists( 'diff' ) ) {
        // check whether the contributors' talk pages exist yet
        var $oList = $("div#mw-diff-otitle2 span.mw-usertoollinks a.new:contains(talk)").first();
        var $nList = $("div#mw-diff-ntitle2 span.mw-usertoollinks a.new:contains(talk)").first();

        if( $oList.length > 0 || $nList.length > 0 ) {
            var spanTag = function( color, content ) {
                var span = document.createElement( 'span' );
                span.style.color = color;
                span.appendChild( document.createTextNode( content ) );
                return span;
            };

            var welcomeNode = document.createElement('strong');
            var welcomeLink = document.createElement('a');
            welcomeLink.appendChild( spanTag( 'Black', '[' ) );
            welcomeLink.appendChild( spanTag( 'Goldenrod', 'welcome' ) );
            welcomeLink.appendChild( spanTag( 'Black', ']' ) );
            welcomeNode.appendChild(welcomeLink);

            if( $oList.length > 0 ) {
                var oHref = $oList.attr("href");

                var oWelcomeNode = welcomeNode.cloneNode( true );
                oWelcomeNode.firstChild.setAttribute( 'href', oHref + '&' + QueryString.create( { 'friendlywelcome': Twinkle.getFriendlyPref('quickWelcomeMode')==='auto'?'auto':'norm' } ) + '&' + QueryString.create( { 'vanarticle': mw.config.get( 'wgPageName' ).replace(/_/g, ' ') } ) );
                $oList[0].parentNode.parentNode.appendChild( document.createTextNode( ' ' ) );
                $oList[0].parentNode.parentNode.appendChild( oWelcomeNode );
            }

            if( $nList.length > 0 ) {
                var nHref = $nList.attr("href");

                var nWelcomeNode = welcomeNode.cloneNode( true );
                nWelcomeNode.firstChild.setAttribute( 'href', nHref + '&' + QueryString.create( { 'friendlywelcome': Twinkle.getFriendlyPref('quickWelcomeMode')==='auto'?'auto':'norm' } ) + '&' + QueryString.create( { 'vanarticle': mw.config.get( 'wgPageName' ).replace(/_/g, ' ') } ) );
                $nList[0].parentNode.parentNode.appendChild( document.createTextNode( ' ' ) );
                $nList[0].parentNode.parentNode.appendChild( nWelcomeNode );
            }
        }
    }
    if( mw.config.get( 'wgNamespaceNumber' ) === 3 ) {
        var username = mw.config.get( 'wgTitle' ).split( '/' )[0].replace( /\"/, "\\\""); // only first part before any slashes
        $(twAddPortletLink("#", "Wel", "friendly-welcome", "Welcome user", "")).click(function() { Twinkle.welcome.callback(username); });
    }
};

Twinkle.welcome.welcomeUser = function welcomeUser() {
    Status.init( document.getElementById('bodyContent') );

    var params = {
        value: Twinkle.getFriendlyPref('quickWelcomeTemplate'),
        article: QueryString.exists( 'vanarticle' ) ? QueryString.get( 'vanarticle' ) : '',
        mode: 'auto'
    };

    Wikipedia.actionCompleted.redirect = mw.config.get('wgPageName');
    Wikipedia.actionCompleted.notice = "Welcoming complete, reloading talk page in a few seconds";

    var wikipedia_page = new Wikipedia.page(mw.config.get('wgPageName'), "User talk page modification");
    wikipedia_page.setFollowRedirect(true);
    wikipedia_page.setCallbackParameters(params);
    wikipedia_page.load(Twinkle.welcome.callbacks.main);
};

Twinkle.welcome.callback = function friendlywelcomeCallback( uid ) {
    var Window = new SimpleWindow( 600, 400 );
    Window.setTitle( "Welcome user" );
    Window.setScriptName( "Twinkle" );
    Window.addFooterLink( "Welcoming Committee", "WP:WC" );
    Window.addFooterLink( "Twinkle help", "WP:TW/DOC#welcome" );

    var form = new QuickForm( Twinkle.welcome.callback.evaluate, 'change' );

    form.append( {
            type: 'input',
            name: 'article',
            label: 'Linked article (if supported by template)',
            value:( QueryString.exists( 'vanarticle' ) ? QueryString.get( 'vanarticle' ) : '' ),
            tooltip: 'An article might be linked to the welcome if the template supports it. Leave empty for no artice to be linked.  Templates that support a linked article are marked with an asterisk.  Ignored for templates that do not support a linked article.',
            event: function( event ) {
                event.stopPropagation();
            }
        } );

    form.append( { type:'header', label:'Simple templates' } );
    form.append( { type: 'radio', name: 'simple', list: Twinkle.welcome.standardList } );

    if( Twinkle.getFriendlyPref('customWelcomeList').length ) {
        form.append( { type:'header', label:'Custom templates' } );
        form.append( { type: 'radio', name: 'custom', list: Twinkle.getFriendlyPref('customWelcomeList') } );
    }

    form.append( { type:'header', label:'Welcoming committee templates' } );
    form.append( { type: 'radio', name: 'welcomingCommittee', list: Twinkle.welcome.welcomingCommitteeList } );

    form.append( { type:'header', label:'Potential problem user templates' } );
    form.append( { type: 'radio', name: 'problem', list: Twinkle.welcome.problemList } );

    form.append( { type:'header', label:'Anonymous user templates' } );
    form.append( { type: 'radio', name: 'anonymous', list: Twinkle.welcome.anonymousList } );

    var result = form.render();
    Window.setContent( result );
    Window.display();
};

Twinkle.welcome.standardList = [
    {
        label: '{{Welcome}}: standard welcome*',
        value: 'Welcome'
    },
    {
        label: '{{Welcomeshort}}: short welcome',
        value: 'Welcomeshort',
        tooltip: 'Includes section heading.'
    },
    {
        label: '{{WelcomeSimple}}: simple welcome',
        value: 'WelcomeSimple',
        tooltip: 'Won\'t overwhelm new users.  Includes section heading.'
    },
    {
        label: '{{Welcome-personal}}: includes a plate of cookies',
        value: 'Welcome-personal',
        tooltip: 'A personal welcome with an introduction from you and a plate of cookies.  Includes section heading and signature.'
    },
    {
        label: '{{WelcomeMenu}}: welcome with menu of links',
        value: 'WelcomeMenu',
        tooltip: 'Contains a welcome message and many useful links broken up into different sections.  Includes signature.'
    },
    {
        label: '{{Welcomeg}}: similar to {{WelcomeMenu}}',
        value: 'Welcomeg',
        tooltip: 'Contains a welcome message and many useful links broken up into different sections.  Includes signature.'
    },
    {
        label: '{{Welcomeh}}: same as {{Welcomeg}} but with a section heading',
        value: 'Welcomeh',
        tooltip: 'Contains a section heading, a welcome message and many useful links broken up into different sections.  Includes section heading and signature.'
    },
    {
        label: '{{Welcome-belated}}: welcome for users with more substantial contributions',
        value: 'Welcome-belated'
    }
];

Twinkle.welcome.welcomingCommitteeList = [
    {
        label: '{{Wel}}: similar to {{Welcome}}, but automatically identifies anonymous and registered users*',
        value: 'Wel',
        tooltip: 'This template checks whether the username contains any letters. If there are any, {{Welcome-reg}} will be shown. If there are none, {{Welcome-anon}} will be shown.'
    },
    {
        label: '{{W-basic}}: standard template, similar to {{Welcome}} with additional options',
        value: 'W-basic',
        tooltip: 'This template is similar to {{Welcome}} but supports many different options.  Includes a signature.'
    },
    {
        label: '{{W-shout}}: extroverted message with bold advice',
        value: 'W-shout',
        tooltip: 'This template is similar to {{WelcomeShout}} but supports many different options.  Includes a signature.'
    },
    {
        label: '{{W-short}}: concise; won\'t overwhelm',
        value: 'W-short||',
        tooltip: 'This template is similar to {{Welcomeshort}} but supports many different options.  Includes a signature.'
    },
    {
        label: '{{W-link}}: shortest greeting, links to Welcoming committee\'s greetings page',
        value: 'W-link',
        tooltip: 'This template is similar to {{Welcom}} but supports many different options.  Includes a signature.'
    },
    {
        label: '{{W-graphical}}: graphical menu format to ease transition from the graphic-heavy web',
        value: 'W-graphical',
        tooltip: 'This template is similar to {{Welcomeg}} but has fewer links.  Supports many different options.  Includes a signature.'
    },
    {
        label: '{{W-screen}}: graphical; designed to fit the size of the user\'s screen',
        value: 'W-screen',
        tooltip: 'This template is a nice graphical welcome with many different options.  Includes a signature.'
    }
];

Twinkle.welcome.problemList = [
    {
        label: '{{Welcomelaws}}: welcome with information about copyrights, npov, the sandbox, and vandalism',
        value: 'Welcomelaws'
    },
    {
        label: '{{Firstarticle}}: for someone whose first article did not meet page creation guidelines*',
        value: 'Firstarticle'
    },
    {
        label: '{{Welcomevandal}}: for someone whose initial efforts appear to be vandalism*',
        value: 'Welcomevandal',
        tooltip: 'Includes a section heading.'
    },
    {
        label: '{{Welcomenpov}}: for someone whose initial efforts do not adhere to the neutral point of view policy*',
        value: 'Welcomenpov'
    },
    {
        label: '{{Welcomespam}}: welcome with additional discussion of anti-spamming polices*',
        value: 'Welcomespam'
    },
    {
        label: '{{Welcomeunsourced}}: for someone whose initial efforts are uncited*',
        value: 'Welcomeunsourced'
    },
    {
        label: '{{Welcomeauto}}: for someone who created an autobiographical article*',
        value: 'Welcomeauto'
    },
    {
        label: '{{Welcome-COI}}: for someone who created or edited an article about a subject with which they have a conflict of interest*',
        value: 'Welcome-COI'
    }
];

Twinkle.welcome.anonymousList = [
    {
        label: '{{Welcome-anon}}: for anonymous users; encourages getting a username*',
        value: 'Welcome-anon'
    },
    {
        label: '{{Welcomeanon2}}: similar to {{Welcome-anon}} but with hints and tips*',
        value: 'Welcomeanon2',
        tooltip: 'Includes section heading.'
    },
    {
        label: '{{Welc-anon}}: similar to {{Welcome-anon}} but with a border and section heading',
        value: 'Welc-anon||',
        tooltip: 'Includes section heading.'
    },
    {
        label: '{{Welcome-anon-vandal}}: for anonymous users who have vandalized a page*',
        value: 'Welcome-anon-vandal',
        tooltip: 'Includes a section heading and signature.'
    },
    {
        label: '{{Welcome-anon-vandalism-fighter}}: for anonymous users who fight vandalism, urging them to create an account*',
        value: 'Welcome-anon-vandalism-fighter',
        tooltip: 'Includes section heading.'
    }
];

// Set to true if template does not already have heading
Twinkle.welcome.headingHash = {
    'Welcome': true,
    'Welcomeshort': false,
    'WelcomeSimple': false,
    'Welcom': false,
    'Welcome-personal': false,
    'WelcomeMenu': true,
    'Welcomeg': true,
    'Welcomeh': false,
    'Welcome-belated': false,
    'Wel': false,
    'W-basic': true,
    'W-shout': true,
    'W-short||': true,
    'W-link': true,
    'W-graphical': true,
    'W-screen': true,
    'Welcomelaws': true,
    'Firstarticle': true,
    'Welcomevandal': false,
    'Welcomenpov': true,
    'Welcomespam': true,
    'Welcomeunsourced': true,
    'Welcomeauto': false,
    'Welcome-COI': true,
    'Welcome-anon': true,
    'Welcomeanon2': false,
    'Welc-anon||': false,
    'Welcome-anon-vandalism-fighter': false,
    'Welcome-anon-vandal': false
};

// Set to true if template already has signature
Twinkle.welcome.signatureHash = {
    'Welcome': false,
    'Welcomeshort': false,
    'WelcomeSimple': false,
    'Welcom': true,
    'Welcome-personal': false,
    'WelcomeMenu': true,
    'Welcomeg': true,
    'Welcomeh': true,
    'Welcome-belated': true,
    'Wel': false,
    'W-basic': true,
    'W-shout': true,
    'W-short||': true,
    'W-link': true,
    'W-graphical': true,
    'W-screen': true,
    'Welcomelaws': false,
    'Firstarticle': true,
    'Welcomevandal': true,
    'Welcomenpov': false,
    'Welcomespam': false,
    'Welcomeunsourced': false,
    'Welcome-COI': false,
    'Welcome-anon': false,
    'Welcomeanon2': false,
    'Welc-anon||': false,
    'Welcome-anon-vandalism-fighter': false,
    'Welcome-anon-vandal': true
};

/* Set to true if template supports article
 * name from art template parameter
 */
Twinkle.welcome.artHash = {
    'Welcome': true,
    'Welcomeshort': false,
    'WelcomeSimple': false,
    'Welcom': false,
    'Welcome-personal': false,
    'WelcomeMenu': false,
    'Welcomeg': false,
    'Welcomeh': false,
    'Welcome-belated': false,
    'Wel': true,
    'W-basic': false,
    'W-shout': false,
    'W-short||': false,
    'W-link': false,
    'W-graphical': false,
    'W-screen': false,
    'Welcomelaws': false,
    'Firstarticle': false,
    'Welcomevandal': false,
    'Welcomenpov': false,
    'Welcomespam': false,
    'Welcomeunsourced': false,
    'Welcomeauto': true,
    'Welcome-COI': false,
    'Welcome-anon': true,
    'Welcomeanon2': true,
    'Welc-anon||': false,
    'Welcome-anon-vandalism-fighter': true,
    'Welcome-anon-vandal': false
};

/* Set to true if template supports article
 * name from vanarticle template parameter
 */
Twinkle.welcome.vandalHash = {
    'Welcome': false,
    'Welcomeshort': false,
    'WelcomeSimple': false,
    'Welcom': false,
    'Welcome-personal': false,
    'WelcomeMenu': false,
    'Welcomeg': false,
    'Welcomeh': false,
    'Welcome-belated': false,
    'Wel': false,
    'W-basic': false,
    'W-shout': false,
    'W-short||': false,
    'W-link': false,
    'W-graphical': false,
    'W-screen': false,
    'Welcomelaws': false,
    'Firstarticle': true,
    'Welcomevandal': true,
    'Welcomenpov': true,
    'Welcomespam': true,
    'Welcomeunsourced': true,
    'Welcomeauto': false,
    'Welcome-COI': false,
    'Welcome-anon': false,
    'Welcomeanon2': false,
    'Welc-anon||': false,
    'Welcome-anon-vandalism-fighter': false,
    'Welcome-anon-vandal': true
};

Twinkle.welcome.callbacks = {
    main: function( pageobj ) {
        var params = pageobj.getCallbackParameters();
        var oldText = pageobj.getPageText();
        
        // abort if mode is auto and form is not empty
        if( pageobj.exists() && params.mode === 'auto' ) {
            Status.info( 'Warning', 'User talk page not empty; aborting automatic welcome' );
            Wikipedia.actionCompleted.event();
            return;
        }
        
        var text = '';
        Status.info( 'Info', 'Will add the welcome template to the ' +
            ( Twinkle.getFriendlyPref('topWelcomes') ? 'top' : 'bottom' ) +
            ' of the user\'s talk page.' );
        if( !Twinkle.getFriendlyPref('topWelcomes') ) {
            text += oldText + '\n';
        }
        
        if( Twinkle.welcome.headingHash[ params.value ] && Twinkle.getFriendlyPref('insertHeadings') ) {
            Status.info( 'Info', 'Will create a new heading for the welcome' );
            // strip section header markers from pref, to preserve backwards compatibility
            text += "== " + Twinkle.getFriendlyPref('welcomeHeading').replace(/^\s*=+\s*(.*?)\s*=+$\s*/, "$1") + " ==\n";
        }
        
        Status.info( 'Info', 'Will substitute the {{' + params.value + '}} welcome template' );
        text += '{{subst:' + params.value;
        
        if( Twinkle.welcome.artHash[ params.value ] ) {
            if( Twinkle.getFriendlyPref('insertUsername') && params.value.substring(2,0) !== 'W-' ) {
                Status.info( 'Info', 'Will add your username to the template' );
                text += '|' + mw.config.get('wgUserName');
            }
            
            if( params.article ) {
                Status.info( 'Info', 'Will add article link to the template' );
                text += '|art=' + params.article;
            }
        } else if( Twinkle.welcome.vandalHash[ params.value ] ) {
            if( params.article ) {
                Status.info( 'Info', 'Will add article link to the template' );
            }
            text += '|' + params.article;
            
            if( Twinkle.getFriendlyPref('insertUsername') ) {
                Status.info( 'Info', 'Will add your username to the template' );
                text += '|' + mw.config.get('wgUserName');
            }
        } else if( Twinkle.getFriendlyPref('insertUsername') ) {
            Status.info( 'Info', 'Will add your username to the template' );
            text += '|' + mw.config.get('wgUserName');
        }
        
        text += '}}';
        
        if( !Twinkle.welcome.signatureHash[ params.value ] && Twinkle.getFriendlyPref('insertSignature') ) {
            Status.info( 'Info', 'Will add your signature after the welcome' );
            text += ' \n~~~~';
        }
        
        if( Twinkle.getFriendlyPref('topWelcomes') ) {
            text += '\n\n' + oldText;
        }
 
        var summaryText = "Added " + ( Twinkle.getFriendlyPref('maskTemplateInSummary') ? 'welcome' : ( '{{[[Template:' + params.value + '|' + params.value + ']]}}' ) ) +
            " template to user talk page";
        pageobj.setPageText(text);
        pageobj.setEditSummary(summaryText + Twinkle.getPref('summaryAd'));
        pageobj.setMinorEdit(Twinkle.getFriendlyPref('markWelcomesAsMinor'));
        pageobj.setWatchlist(Twinkle.getFriendlyPref('watchWelcomes'));
        pageobj.setCreateOption('recreate');
        pageobj.save();
    }
};

Twinkle.welcome.callback.evaluate = function friendlywelcomeCallbackEvaluate(e) {
    // Ignore if a change to the text field triggered this event
    if( e.target.name === 'article' ) {
        return;
    }
    
    var params = {
        value: e.target.values,
        article: e.target.form.article.value,
        mode: 'manual'
    };

    SimpleWindow.setButtonsEnabled( false );
    Status.init( e.target.form );

    Wikipedia.actionCompleted.redirect = mw.config.get('wgPageName');
    Wikipedia.actionCompleted.notice = "Welcoming complete, reloading talk page in a few seconds";

    var wikipedia_page = new Wikipedia.page(mw.config.get('wgPageName'), "User talk page modification");
    wikipedia_page.setFollowRedirect(true);
    wikipedia_page.setCallbackParameters(params);
    wikipedia_page.load(Twinkle.welcome.callbacks.main);
};

/*
 ****************************************
 *** twinklearv.js: ARV module
 ****************************************
 * Mode of invocation:     Tab ("ARV")
 * Active on:              Existing and non-existing user pages, user talk pages, contributions pages
 * Config directives in:   TwinkleConfig
 */

Twinkle.arv = function twinklearv() {
    if ( mw.config.get('wgNamespaceNumber') === 2 || mw.config.get('wgNamespaceNumber') === 3 ||
        ( mw.config.get('wgNamespaceNumber') === -1 && mw.config.get('wgTitle') === "Contributions" )) {

        // If we are on the contributions page, need to parse some then
        var username;
        if( mw.config.get('wgNamespaceNumber') === -1 && mw.config.get('wgTitle') === "Contributions" ) {
            username = decodeURIComponent(/user=(.+)/.exec($('div#contentSub a[title="Special:Log"]').last().attr("href").replace(/\+/g, "%20"))[1]);
        } else {
            username = mw.config.get('wgTitle').split( '/' )[0]; // only first part before any slashes
        }

        if ( !username ) {
            return;
        }

        var title = isIPAddress( username ) ? 'Report IP to administrators' : 'Report user to administrators';
        
        if (twinkleUserAuthorized) {
            $(twAddPortletLink("#", "ARV", "tw-arv", title, "" )).click(function() { Twinkle.arv.callback(username.replace( /\"/g, "\\\"")); } );
        } else {
            $(twAddPortletLink("#", 'ARV', 'tw-arv', title, "" )).click(function() { alert("Your account is too new to use Twinkle."); } );
        }
    }
};

Twinkle.arv.callback = function ( uid ) {
    if( uid === mw.config.get('wgUserName') ){
        alert( 'You don\'t want to report yourself, do you?' );
        return;
    }

    var Window = new SimpleWindow( 600, 500 );
    Window.setTitle( "Advance Reporting and Vetting" ); //Backronym
    Window.setScriptName( "Twinkle" );
    Window.addFooterLink( "Guide to AIV", "WP:GAIV" );
    Window.addFooterLink( "UAA instructions", "WP:UAAI" );
    Window.addFooterLink( "About SPI", "WP:SPI" );
    Window.addFooterLink( "Twinkle help", "WP:TW/DOC#arv" );

    var form = new QuickForm( Twinkle.arv.callback.evaluate );
    var categories = form.append( {
            type: 'select',
            name: 'category',
            label: 'Select report type: ',
            event: Twinkle.arv.callback.changeCategory
        } );
    categories.append( {
            type: 'option',
            label: 'Vandalism (WP:AIV)',
            value: 'aiv'
        } );
    categories.append( {
            type: 'option',
            label: 'Username (WP:UAA)',
            value: 'username'
        } );
    categories.append( {
            type: 'option',
            label: 'Sockpuppeteer (WP:SPI)',
            value: 'sock'
        } );
    categories.append( {
            type: 'option',
            label: 'Sockpuppet (WP:SPI)',
            value: 'puppet'
        } );
    form.append( {
            type: 'field',
            label:'Work area',
            name: 'work_area'
        } );
    form.append( { type:'submit' } );
    form.append( {
            type: 'hidden',
            name: 'uid',
            value: uid
        } );
    
    var result = form.render();
    Window.setContent( result );
    Window.display();

    // We must init the
    var evt = document.createEvent( "Event" );
    evt.initEvent( 'change', true, true );
    result.category.dispatchEvent( evt );
};

Twinkle.arv.callback.changeCategory = function (e) {
    var value = e.target.value;
    var root = e.target.form;
    var old_area;
    for( var i = 0; i < root.childNodes.length; ++i ) {
        var node = root.childNodes[i];
        if (node instanceof Element && node.getAttribute( 'name' ) === 'work_area') {
            old_area = node;
            break;
        }
    }
    var work_area = null;

    switch( value ) {
    case 'aiv':
        /* falls through */
    default:
        work_area = new QuickForm.element( {
                type: 'field',
                label: 'Report user for vandalism',
                name: 'work_area'
            } );
        work_area.append( {
                type: 'input',
                name: 'page',
                label: 'Primary linked page: ',
                tooltip: 'Leave blank to not link to the page in the report',
                value: QueryString.exists( 'vanarticle' ) ? QueryString.get( 'vanarticle' ) : '',
                event: function(e) {
                    var value = e.target.value;
                    var root = e.target.form;
                    if( value === '' ) {
                        root.badid.disabled = root.goodid.disabled = true;
                    } else {
                        root.badid.disabled = false;
                        root.goodid.disabled = root.badid.value === '';
                    }
                }
            } );
        work_area.append( {
                type: 'input',
                name: 'badid',
                label: 'Revision ID for target page when vandalised: ',
                tooltip: 'Leave blank for no diff link',
                value: QueryString.exists( 'vanarticlerevid' ) ? QueryString.get( 'vanarticlerevid' ) : '',
                disabled: !QueryString.exists( 'vanarticle' ),
                event: function(e) {
                    var value = e.target.value;
                    var root = e.target.form;
                    root.goodid.disabled = value === '';
                }
            } );
        work_area.append( {
                type: 'input',
                name: 'goodid',
                label: 'Last good revision ID before vandalism of target page: ',
                tooltip: 'Leave blank for diff link to previous revision',
                value: QueryString.exists( 'vanarticlegoodrevid' ) ? QueryString.get( 'vanarticlegoodrevid' ) : '',
                disabled: !QueryString.exists( 'vanarticle' ) || QueryString.exists( 'vanarticlerevid' )
            } );
        work_area.append( {
                type: 'checkbox',
                name: 'arvtype',
                list: [
                    {
                        label: 'Vandalism after final (level 4 or 4im) warning given',
                        value: 'final'
                    },
                    {
                        label: 'Vandalism after recent (within 1 day) release of block',
                        value: 'postblock'
                    },
                    {
                        label: 'Evidently a vandalism-only account',
                        value: 'vandalonly',
                        disabled: isIPAddress( root.uid.value )
                    },
                    {
                        label: 'Account is evidently a spambot or a compromised account',
                        value: 'spambot'
                    },
                    {
                        label: 'Account is a promotion-only account',
                        value: 'promoonly'
                    }
                ]
            } );
        work_area.append( {
                type: 'textarea',
                name: 'reason',
                label: 'Comment: '
            } );
        work_area = work_area.render();
        old_area.parentNode.replaceChild( work_area, old_area );
        break;
    case 'username':
        work_area = new QuickForm.element( {
                type: 'field',
                label: 'Report username violation',
                name: 'work_area'
            } );
        work_area.append ( {
                type:'header',
                label:'Type(s) of inappropriate username',
                tooltip: 'Wikipedia does not allow usernames that are misleading, promotional, offensive or disruptive. Domain names and e-mail addresses are likewise prohibited. These criteria apply to both usernames and signatures. Usernames that are inappropriate in another language, or that represent an inappropriate name with misspellings and substitutions, or do so indirectly or by implication, are still considered inappropriate.'
            } );
        work_area.append( {
                type: 'checkbox',
                name: 'arvtype',
                list: [
                    {
                        label: 'Misleading username',
                        value: 'misleading',
                        tooltip: 'Misleading usernames imply relevant, misleading things about the contributor. For example, misleading points of fact, an impression of undue authority, or the suggestion that the account is operated by a group, project or collective rather than one individual.'
                    },
                    {
                        label: 'Promotional username',
                        value: 'promotional',
                        tooltip: 'Promotional usernames are advertisements for a company or group.'
                    },
                    {
                        label: 'Offensive username',
                        value: 'offensive',
                        tooltip: 'Offensive usernames make harmonious editing difficult or impossible.'
                    },
                    {
                        label: 'Disruptive username',
                        value: 'disruptive',
                        tooltip: 'Disruptive usernames include outright trolling or personal attacks, or otherwise show a clear intent to disrupt Wikipedia.'
                    }
                ]
            } );
        work_area.append( {
                type: 'textarea',
                name: 'reason',
                label: 'Comment:'
            } );
        work_area = work_area.render();
        old_area.parentNode.replaceChild( work_area, old_area );
        break;

    case 'puppet':
        work_area = new QuickForm.element( {
                type: 'field',
                label: 'Report suspected sockpuppet',
                name: 'work_area'
            } );
        work_area.append(
            {
                type: 'input',
                name: 'sockmaster',
                label: 'Sockpuppeteer',
                tooltip: 'The username of the sockpuppeteer (sockmaster) without the User:-prefix'
            }
        );
        work_area.append( {
                type: 'textarea',
                label: 'Evidence:',
                name: 'evidence',
                tooltip: 'Enter your evidence. It should make clear that each of these users is likely to be abusing multiple accounts. Usually this means diffs, page histories or other information that justifies why the users are a) the same and b) disruptive. This should purely be evidence and information needed to judge the matter. Avoid all other discussion that is not evidence of sockpuppetry or other multiple account abuse.'
            } );
        work_area.append( {
                type: 'checkbox',
                list: [
                    {
                        label: 'Request CheckUser evidence',
                        name: 'checkuser',
                        tooltip: 'CheckUser is a tool used to obtain technical evidence related to a sock-puppetry allegation. It will not be used without good cause, which you must clearly demonstrate. Make sure your evidence explains why CheckUser is appropriate.'
                    },
                    {
                        label: 'Notify reported users',
                        name: 'notify',
                        tooltip: 'Notification is not mandatory. In many cases, especially of chronic sockpuppeteers, notification may be counterproductive. However, especially in less egregious cases involving users who has not been reported before, notification may make the cases fairer and also appear to be fairer in the eyes of the accused. Use your judgment.'
                    }
                ]
            } );
        work_area = work_area.render();
        old_area.parentNode.replaceChild( work_area, old_area );
        break;
    case 'sock':
        work_area = new QuickForm.element( {
                type: 'field',
                label: 'Report suspected sockpuppeteer',
                name: 'work_area'
            } );
        work_area.append(
            {
                type: 'dyninput',
                name: 'sockpuppet',
                label: 'Sockpuppets',
                sublabel: 'Sock: ',
                tooltip: 'The username of the sockpuppet without the User:-prefix',
                min: 2
            }
        );
        work_area.append( {
                type: 'textarea',
                label: 'Evidence:',
                name: 'evidence',
                tooltip: 'Enter your evidence. It should make clear that each of these users is likely to be abusing multiple accounts. Usually this means diffs, page histories or other information that justifies why the users are a) the same and b) disruptive. This should purely be evidence and information needed to judge the matter. Avoid all other discussion that is not evidence of sockpuppetry or other multiple account abuse.'
            } );
        work_area.append( {
                type: 'checkbox',
                list: [ {
                    label: 'Request CheckUser evidence',
                    name: 'checkuser',
                    tooltip: 'CheckUser is a tool used to obtain technical evidence related to a sock-puppetry allegation. It will not be used without good cause, which you must clearly demonstrate. Make sure your evidence explains why CheckUser is appropriate.'
                }, {
                    label: 'Notify reported users',
                    name: 'notify',
                    tooltip: 'Notification is not mandatory. In many cases, especially of chronic sockpuppeteers, notification may be counterproductive. However, especially in less egregious cases involving users who has not been reported before, notification may make the cases fairer and also appear to be fairer in the eyes of the accused. Use your judgment.'
                } ]
            } );
        work_area = work_area.render();
        old_area.parentNode.replaceChild( work_area, old_area );
        break;
    }
};

Twinkle.arv.callback.evaluate = function(e) {

    var form = e.target;
    var reason = "";
    var comment = "";
    if ( form.reason ) {
        comment = form.reason.value;
    }
    var uid = form.uid.value;

    var types;
    switch( form.category.value ) {

        // Report user for vandalism
        case 'aiv':
            /* falls through */
        default:
            types = form.getChecked( 'arvtype' );
            if( !types.length && comment === '' ) {
                alert( 'You must specify some reason' );
                return;
            }

            types = types.map( function(v) {
                    switch(v) {
                        case 'final':
                            return 'vandalism after final warning';
                        case 'postblock':
                            return 'vandalism after recent release of block';
                        case 'spambot':
                            return 'account is evidently a spambot or a compromised account';
                        case 'vandalonly':
                            return 'actions evidently indicate a vandalism-only account';
                        case 'promoonly':
                            return 'account is being used only for promotional purposes';
                        default:
                            return 'unknown reason';
                    }
                } ).join( ', ' );


            if ( form.page.value !== '' ) {
            
                // add a leading : on linked page namespace to prevent transclusion
                reason = 'On [[' + form.page.value.replace( /^(Image|Category|File):/i, ':$1:' ) + ']]';

                if ( form.badid.value !== '' ) {
                    var query = {
                        'title': form.page.value,
                        'diff': form.badid.value,
                        'oldid': form.goodid.value
                    };
                    reason += ' ({{diff|' + form.page.value + '|' + form.badid.value + '|' + form.goodid.value + '|diff}})';
                }
                reason += ';';
            }

            if ( types ) {
                reason += " " + types;
            }
            if (comment !== "" ) {
                reason += (reason === "" ? "" : ". ") + comment + ".";
            }
            reason += "~~~~";
            reason = reason.replace(/\r?\n/g, "\n*:");  // indent newlines

            SimpleWindow.setButtonsEnabled( false );
            Status.init( form );

            Wikipedia.actionCompleted.redirect = "Wikipedia:Administrator intervention against vandalism";
            Wikipedia.actionCompleted.notice = "Reporting complete";

            var aivPage = new Wikipedia.page( 'Wikipedia:Administrator intervention against vandalism', 'Processing AIV request' );
            aivPage.setPageSection( 1 );
            aivPage.setFollowRedirect( true );
            
            aivPage.load( function() {
                var text = aivPage.getPageText();

                // check if user has already been reported
                if (new RegExp( "\\{\\{\\s*(?:(?:[Ii][Pp])?[Vv]andal|[Uu]serlinks)\\s*\\|\\s*(?:1=)?\\s*" + RegExp.escape( uid, true ) + "\\s*\\}\\}" ).test(text)) {
                    aivPage.getStatusElement().info( 'Report already present, will not add a new one' );
                    return;
                }
                aivPage.getStatusElement().status( 'Adding new report...' );
                aivPage.setEditSummary( 'Reporting [[Special:Contributions/' + uid + '|' + uid + ']].' + Twinkle.getPref('summaryAd') );
                aivPage.setAppendText( '\n*{{' + ( isIPAddress( uid ) ? 'IPvandal' : 'vandal' ) + '|' + (/\=/.test( uid ) ? '1=' : '' ) + uid + '}} - ' + reason );
                aivPage.append();
            } );
            break;
            
        // Report inappropriate username
        case 'username':
            types = form.getChecked( 'arvtype' );
            if( !types.length ) {
                alert( 'You must specify at least one breached violation' );
                return;
            }
            types = types.map( function( v ) { return v.toLowerCaseFirstChar(); } );

            if ( types.length <= 2 ) {
                types = types.join( ' and ' );
            } else {
                types = [ types.slice( 0, -1 ).join( ', ' ), types.slice( -1 ) ].join( ' and ' );
            }
            var article = 'a';
            if ( /[aeiouwyh]/.test( types[0] ) ) { // non 100% correct, but whatever, inlcuding 'h' for Cockney
                article = 'an';
            }
            reason = "*{{user-uaa|1=" + uid + "}} &mdash; Violation of username policy as " + article + " " + types + " username. ";
            if (comment !== '' ) {
                reason += comment.toUpperCaseFirstChar() + ". ";
            }
            reason += "~~~~";
            reason = reason.replace(/\r?\n/g, "\n*:");  // indent newlines

            SimpleWindow.setButtonsEnabled( false );
            Status.init( form );

            Wikipedia.actionCompleted.redirect = "Wikipedia:Usernames for administrator attention";
            Wikipedia.actionCompleted.notice = "Reporting complete";

            var uaaPage = new Wikipedia.page( 'Wikipedia:Usernames for administrator attention', 'Processing UAA request' );
            uaaPage.setFollowRedirect( true );

            uaaPage.load( function() {
                var text = uaaPage.getPageText();
                
                // check if user has already been reported
                if (new RegExp( "\\{\\{\\s*user-uaa\\s*\\|\\s*(1\\s*=\\s*)?" + RegExp.escape(uid, true) + "\\s*(\\||\\})" ).test(text)) {
                    uaaPage.getStatusElement().error( 'User is already listed.' );
                    return;
                }
                uaaPage.getStatusElement().status( 'Adding new report...' );
                uaaPage.setEditSummary( 'Reporting [[Special:Contributions/' + uid + '|' + uid + ']].'+ Twinkle.getPref('summaryAd') );
                uaaPage.setPageText( text.replace( /List begins below this line.\s*-->/, "List begins below this line.\n-->\n" + reason ) );  // add at top
                uaaPage.save();
            } );
            break;
            
        // WP:SPI
        case "sock":
            /* falls through */
        case "puppet":
            var sockParameters = {
                evidence: form.evidence.value.rtrim(),
                checkuser: form.checkuser.checked,
                notify: form.notify.checked
            };

            var puppetReport = form.category.value === "puppet";
            if (puppetReport && !(form.sockmaster.value.trim())) {
                if (!confirm("You have not entered a sockmaster account for this puppet. Do you want to report this account as a sockpuppeteer instead?")) {
                    return;
                }
                puppetReport = false;
            }

            sockParameters.uid = puppetReport ? form.sockmaster.value.rtrim() : uid;
            sockParameters.sockpuppets = puppetReport ? [uid] : $.map( $('input:text[@name=sockpuppet]',form), function(o){ return $(o).val(); });

            SimpleWindow.setButtonsEnabled( false );
            Status.init( form );
            Twinkle.arv.processSock( sockParameters );
            break;

    }
};

Twinkle.arv.processSock = function( params ) {
    Wikipedia.addCheckpoint(); // prevent notification events from causing an erronous "action completed"
    
    // notify all user accounts if requested
    if (params.notify && params.sockpuppets.length>0) {
    
        var notifyEditSummary = "Notifying about suspicion of sockpuppeteering." + Twinkle.getPref('summaryAd');
        var notifyText = "\n\n{{subst:socksuspectnotice|1=" + params.uid + "}} ~~~~";
        
        // notify user's master account
        var masterTalkPage = new Wikipedia.page( 'User talk:' + params.uid, 'Notifying suspected sockpuppeteer' );
        masterTalkPage.setFollowRedirect( true );
        masterTalkPage.setEditSummary( notifyEditSummary );
        masterTalkPage.setAppendText( notifyText );
        masterTalkPage.append();

        var statusIndicator = new Status( 'Notifying suspected sockpuppets', '0%' );
        var total = params.sockpuppets.length;
        var current =   0;
        
        // display status of notifications as they progress
        var onSuccess = function( sockTalkPage ) {
            var now = parseInt( 100 * ++(current)/total, 10 ) + '%';
            statusIndicator.update( now );
            sockTalkPage.getStatusElement().unlink();
            if ( current >= total ) {
                statusIndicator.info( now + ' (completed)' );
            }
        };
        
        var socks = params.sockpuppets;

        // notify each puppet account
        for( var i = 0; i < socks.length; ++i ) {
            var sockTalkPage = new Wikipedia.page( 'User talk:' + socks[i], "Notification for " +  socks[i] );
            sockTalkPage.setFollowRedirect( true );
            sockTalkPage.setEditSummary( notifyEditSummary );
            sockTalkPage.setAppendText( notifyText );
            sockTalkPage.append( onSuccess );
        }
    }

    // prepare the SPI report
    var text = "\n\n{{subst:SPI report|socksraw=" +
        params.sockpuppets.map( function(v) {
                return "* {{" + ( isIPAddress( v ) ? "checkip" : "checkuser" ) + "|1=" + v + "}}";
            } ).join( "\n" ) + "\n|evidence=" + params.evidence + " \n";
        
    if ( params.checkuser ) {
        text += "|checkuser=yes";
    }
    text += "}}";

    var reportpage = 'Wikipedia:Sockpuppet investigations/' + params.uid;

    Wikipedia.actionCompleted.redirect = reportpage;
    Wikipedia.actionCompleted.notice = "Reporting complete";

    var spiPage = new Wikipedia.page( reportpage, 'Retrieving discussion page' );
    spiPage.setFollowRedirect( true );
    spiPage.setEditSummary( 'Adding new report for [[Special:Contributions/' + params.uid + '|' + params.uid + ']].'+ Twinkle.getPref('summaryAd') );
    spiPage.setAppendText( text );
    spiPage.append();
    
    Wikipedia.removeCheckpoint();  // all page updates have been started
};

/*
 ****************************************
 *** twinklebatchdelete.js: Batch delete module (sysops only)
 ****************************************
 * Mode of invocation:     Tab ("D-batch")
 * Active on:              Existing and non-existing non-articles, and Special:PrefixIndex
 * Config directives in:   TwinkleConfig
 */


Twinkle.batchdelete = function twinklebatchdelete() {
    if( userIsInGroup( 'sysop' ) && (mw.config.get( 'wgNamespaceNumber' ) > 0 || mw.config.get( 'wgCanonicalSpecialPageName' ) === 'Prefixindex') ) {
        $(twAddPortletLink("#", "D-batch", "tw-batch", "Delete pages found in this category/on this page", "")).click(Twinkle.batchdelete.callback);
    }
};

Twinkle.batchdelete.unlinkCache = {};
Twinkle.batchdelete.callback = function twinklebatchdeleteCallback() {
    var Window = new SimpleWindow( 800, 400 );
    Window.setTitle( "Batch deletion" );
    Window.setScriptName( "Twinkle" );
    Window.addFooterLink( "Twinkle help", "WP:TW/DOC#batchdelete" );

    var form = new QuickForm( Twinkle.batchdelete.callback.evaluate );
    form.append( {
            type: 'checkbox',
            list: [
                {
                    label: 'Delete pages',
                    name: 'delete_page',
                    value: 'delete',
                    checked: true
                },
                {
                    label: 'Remove backlinks to the page',
                    name: 'unlink_page',
                    value: 'unlink',
                    checked: true
                },
                {
                    label: 'Delete redirects to deleted pages',
                    name: 'delete_redirects',
                    value: 'delete_redirects',
                    checked: true
                }
            ]
        } );
    form.append( {
            type: 'textarea',
            name: 'reason',
            label: 'Reason: '
        } );

    var query;
    if( mw.config.get( 'wgNamespaceNumber' ) === Namespace.CATEGORY ) {

        query = {
            'action': 'query',
            'generator': 'categorymembers',
            'gcmtitle': mw.config.get( 'wgPageName' ),
            'gcmlimit' : Twinkle.getPref('batchMax'), // the max for sysops
            'prop': [ 'categories', 'revisions' ],
            'rvprop': [ 'size' ]
        };
    } else if( mw.config.get( 'wgCanonicalSpecialPageName' ) === 'Prefixindex' ) {

        var gapnamespace, gapprefix;
        if(QueryString.exists( 'from' ) )
        {
            gapnamespace = QueryString.get( 'namespace' );
            gapprefix = QueryString.get( 'from' ).toUpperCaseFirstChar();
        }
        else
        {
            var pathSplit = location.pathname.split('/');
            if (pathSplit.length < 3 || pathSplit[2] !== "Special:PrefixIndex") {
                return;
            }
            var titleSplit = pathSplit[3].split(':');
            gapnamespace = Namespace[titleSplit[0].toUpperCase()];
            if ( titleSplit.length < 2 || typeof(gapnamespace) === 'undefined' )
            {
                gapnamespace = Namespace.MAIN;
                gapprefix = pathSplit.splice(3).join('/');
            }
            else
            {
                pathSplit = pathSplit.splice(4);
                pathSplit.splice(0,0,titleSplit.splice(1).join(':'));
                gapprefix = pathSplit.join('/');
            }
        }

        query = {
            'action': 'query',
            'generator': 'allpages',
            'gapnamespace': gapnamespace ,
            'gapprefix': gapprefix,
            'gaplimit' : Twinkle.getPref('batchMax'), // the max for sysops
            'prop' : ['categories', 'revisions' ],
            'rvprop': [ 'size' ]
        };
    } else {
        query = {
            'action': 'query',
            'generator': 'links',
            'titles': mw.config.get( 'wgPageName' ),
            'gpllimit' : Twinkle.getPref('batchMax'), // the max for sysops
            'prop': [ 'categories', 'revisions' ],
            'rvprop': [ 'size' ]
        };
    }

    var wikipedia_api = new Wikipedia.api( 'Grabbing pages', query, function( self ) {
            var xmlDoc = self.responseXML;
            var snapshot = xmlDoc.evaluate('//page[@ns != "' + Namespace.IMAGE + '" and not(@missing)]', xmlDoc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
            var list = [];
            for ( var i = 0; i < snapshot.snapshotLength; ++i ) {
                var object = snapshot.snapshotItem(i);
                var page = xmlDoc.evaluate( '@title', object, null, XPathResult.STRING_TYPE, null ).stringValue;
                var size = xmlDoc.evaluate( 'revisions/rev/@size', object, null, XPathResult.NUMBER_TYPE, null ).numberValue;

                var disputed = xmlDoc.evaluate( 'boolean(categories/cl[@title="Category:Contested candidates for speedy deletion"])', object, null, XPathResult.BOOLEAN_TYPE, null ).booleanValue;
                list.push( {label:page + ' (' + size + ' bytes)' + ( disputed ? ' (DISPUTED CSD)' : '' ), value:page, checked:!disputed });
            }
            self.params.form.append( {
                    type: 'checkbox',
                    name: 'pages',
                    list: list
                } );
            self.params.form.append( { type:'submit' } );

            var result = self.params.form.render();
            self.params.Window.setContent( result );
        } );

    wikipedia_api.params = { form:form, Window:Window };
    wikipedia_api.post();
    var root = document.createElement( 'div' );
    Status.init( root );
    Window.setContent( root );
    Window.display();
};

Twinkle.batchdelete.currentDeleteCounter = 0;
Twinkle.batchdelete.currentUnlinkCounter = 0;
Twinkle.batchdelete.currentdeletor = 0;
Twinkle.batchdelete.callback.evaluate = function twinklebatchdeleteCallbackEvaluate(event) {
    Wikipedia.actionCompleted.notice = 'Status';
    Wikipedia.actionCompleted.postfix = 'batch deletion is now complete';
    mw.config.set('wgPageName', mw.config.get('wgPageName').replace(/_/g, ' '));  // for queen/king/whatever and country!
    var pages = event.target.getChecked( 'pages' );
    var reason = event.target.reason.value;
    var delete_page = event.target.delete_page.checked;
    var unlink_page = event.target.unlink_page.checked;
    var delete_redirects = event.target.delete_redirects.checked;
    if( ! reason ) {
        return;
    }
    SimpleWindow.setButtonsEnabled( false );
    Status.init( event.target );
    if( !pages ) {
        Status.error( 'Error', 'nothing to delete, aborting' );
        return;
    }

    function toCall( work ) {
        if( work.length === 0 &&  Twinkle.batchdelete.currentDeleteCounter <= 0 && Twinkle.batchdelete.currentUnlinkCounter <= 0 ) {
            window.clearInterval( Twinkle.batchdelete.currentdeletor );
            Wikipedia.removeCheckpoint();
            return;
        } else if( work.length !== 0 && ( Twinkle.batchdelete.currentDeleteCounter <= Twinkle.getPref('batchDeleteMinCutOff') || Twinkle.batchdelete.currentUnlinkCounter <= Twinkle.getPref('batchDeleteMinCutOff')  ) ) {
            Twinkle.batchdelete.unlinkCache = []; // Clear the cache
            var pages = work.shift();
            Twinkle.batchdelete.currentDeleteCounter += pages.length;
            Twinkle.batchdelete.currentUnlinkCounter += pages.length;
            for( var i = 0; i < pages.length; ++i ) {
                var page = pages[i];
                var query = {
                    'action': 'query',
                    'titles': page
                };
                var wikipedia_api = new Wikipedia.api( 'Checking if page ' + page + ' exists', query, Twinkle.batchdelete.callbacks.main );
                wikipedia_api.params = { page:page, reason:reason, unlink_page:unlink_page, delete_page:delete_page, delete_redirects:delete_redirects };
                wikipedia_api.post();
            }
        }
    }
    var work = pages.chunk( Twinkle.getPref('batchdeleteChunks') );
    Wikipedia.addCheckpoint();
    Twinkle.batchdelete.currentdeletor = window.setInterval( toCall, 1000, work );
};

Twinkle.batchdelete.callbacks = {
    main: function( self ) {
        var xmlDoc = self.responseXML;
        var normal = xmlDoc.evaluate( '//normalized/n/@to', xmlDoc, null, XPathResult.STRING_TYPE, null ).stringValue;
        if( normal ) {
            self.params.page = normal;
        }
        var exists = xmlDoc.evaluate( 'boolean(//pages/page[not(@missing)])', xmlDoc, null, XPathResult.BOOLEAN_TYPE, null ).booleanValue;

        if( ! exists ) {
            self.statelem.error( "It seems that the page doesn't exist, perhaps it has already been deleted" );
            return;
        }

        var query, wikipedia_api;
        if( self.params.unlink_page ) {
            query = {
                'action': 'query',
                'list': 'backlinks',
                'blfilterredir': 'nonredirects',
                'blnamespace': [0, 100], // main space and portal space only
                'bltitle': self.params.page,
                'bllimit': userIsInGroup( 'sysop' ) ? 5000 : 500 // 500 is max for normal users, 5000 for bots and sysops
            };
            wikipedia_api = new Wikipedia.api( 'Grabbing backlinks', query, Twinkle.batchdelete.callbacks.unlinkBacklinksMain );
            wikipedia_api.params = self.params;
            wikipedia_api.post();
        } else {
            --Twinkle.batchdelete.currentUnlinkCounter;
        }
        if( self.params.delete_page ) {
            if (self.params.delete_redirects)
            {
                query = {
                    'action': 'query',
                    'list': 'backlinks',
                    'blfilterredir': 'redirects',
                    'bltitle': self.params.page,
                    'bllimit': userIsInGroup( 'sysop' ) ? 5000 : 500 // 500 is max for normal users, 5000 for bots and sysops
                };
                wikipedia_api = new Wikipedia.api( 'Grabbing redirects', query, Twinkle.batchdelete.callbacks.deleteRedirectsMain );
                wikipedia_api.params = self.params;
                wikipedia_api.post();
            }

            var wikipedia_page = new Wikipedia.page( self.params.page, 'Deleting page ' + self.params.page );
            wikipedia_page.setEditSummary(self.params.reason + Twinkle.getPref('deletionSummaryAd'));
            wikipedia_page.deletePage(function( apiobj ) {
                    --Twinkle.batchdelete.currentDeleteCounter;
                    var link = document.createElement( 'a' );
                    link.setAttribute( 'href', mw.util.wikiGetlink(self.params.page) );
                    link.setAttribute( 'title', self.params.page );
                    link.appendChild( document.createTextNode( self.params.page ) );
                    apiobj.statelem.info( [ 'completed (' , link , ')' ] );
                } );    
        } else {
            --Twinkle.batchdelete.currentDeleteCounter;
        }
    },
    deleteRedirectsMain: function( self ) {
        var xmlDoc = self.responseXML;
        var snapshot = xmlDoc.evaluate('//backlinks/bl/@title', xmlDoc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );

        var total = snapshot.snapshotLength;

        if( snapshot.snapshotLength === 0 ) {
            return;
        }

        var statusIndicator = new Status('Deleting redirects for ' + self.params.page, '0%');

        var onsuccess = function( self ) {
            var obj = self.params.obj;
            var total = self.params.total;
            var now = parseInt( 100 * ++(self.params.current)/total, 10 ) + '%';
            obj.update( now );
            self.statelem.unlink();
            if( self.params.current >= total ) {
                obj.info( now + ' (completed)' );
                Wikipedia.removeCheckpoint();
            }
        };


        Wikipedia.addCheckpoint();
        if( snapshot.snapshotLength === 0 ) {
            statusIndicator.info( '100% (completed)' );
            Wikipedia.removeCheckpoint();
            return;
        }

        var params = clone( self.params );
        params.current = 0;
        params.total = total;
        params.obj = statusIndicator;


        for ( var i = 0; i < snapshot.snapshotLength; ++i ) {
            var title = snapshot.snapshotItem(i).value;
            var wikipedia_page = new Wikipedia.page( title, "Deleting " + title );
            wikipedia_page.setEditSummary('[[WP:CSD#G8|G8]]: Redirect to deleted page "' + self.params.page + '"' + Twinkle.getPref('deletionSummaryAd'));
            wikipedia_page.setCallbackParameters(params);
            wikipedia_page.deletePage(onsuccess);
        }
    },
    unlinkBacklinksMain: function( self ) {
        var xmlDoc = self.responseXML;
        var snapshot = xmlDoc.evaluate('//backlinks/bl/@title', xmlDoc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );

        if( snapshot.snapshotLength === 0 ) {
            --Twinkle.batchdelete.currentUnlinkCounter;
            return;
        }

        var statusIndicator = new Status('Unlinking backlinks to ' + self.params.page, '0%');

        var total = snapshot.snapshotLength * 2;

        var onsuccess = function( self ) {
            var obj = self.params.obj;
            var total = self.params.total;
            var now = parseInt( 100 * ++(self.params.current)/total, 10 ) + '%';
            obj.update( now );
            self.statelem.unlink();
            if( self.params.current >= total ) {
                obj.info( now + ' (completed)' );
                --Twinkle.batchdelete.currentUnlinkCounter;
                Wikipedia.removeCheckpoint();
            }
        };

        Wikipedia.addCheckpoint();
        if( snapshot.snapshotLength === 0 ) {
            statusIndicator.info( '100% (completed)' );
            --Twinkle.batchdelete.currentUnlinkCounter;
            Wikipedia.removeCheckpoint();
            return;
        }
        self.params.total = total;
        self.params.obj = statusIndicator;
        self.params.current =   0;

        for ( var i = 0; i < snapshot.snapshotLength; ++i ) {
            var title = snapshot.snapshotItem(i).value;
            var wikipedia_page = new Wikipedia.page( title, "Unlinking on " + title );
            var params = clone( self.params );
            params.title = title;
            params.onsuccess = onsuccess;
            wikipedia_page.setCallbackParameters(params);
            wikipedia_page.load(Twinkle.batchdelete.callbacks.unlinkBacklinks);
        }
    },
    unlinkBacklinks: function( pageobj ) {
        var params = pageobj.getCallbackParameters();
        if( ! pageobj.exists() ) {
            // we probably just deleted it, as a recursive backlink
            params.onsuccess( { params: params, statelem: pageobj.getStatusElement() } );
            Wikipedia.actionCompleted();
            return;
        }
        var text;

        if( params.title in Twinkle.batchdelete.unlinkCache ) {
            text = Twinkle.batchdelete.unlinkCache[ params.title ];
        } else {
            text = pageobj.getPageText();
        }
        var old_text = text;
        var wikiPage = new Mediawiki.Page( text );
        wikiPage.removeLink( params.page );

        text = wikiPage.getText();
        Twinkle.batchdelete.unlinkCache[ params.title ] = text;
        if( text === old_text ) {
            // Nothing to do, return
            params.onsuccess( { params: params, statelem: pageobj.getStatusElement() } );
            Wikipedia.actionCompleted();
            return;
        }
        pageobj.setEditSummary('Removing link(s) to deleted page ' + self.params.page + Twinkle.getPref('deletionSummaryAd'));
        pageobj.setPageText(text);
        pageobj.setCreateOption('nocreate');
        pageobj.save(params.onsuccess);
    }
};

/*
 ****************************************
 *** twinklebatchprotect.js: Batch protect module (sysops only)
 ****************************************
 * Mode of invocation:     Tab ("P-batch")
 * Active on:              Existing and non-existing non-articles, and Special:PrefixIndex
 * Config directives in:   TwinkleConfig
 */


Twinkle.batchprotect = function twinklebatchprotect() {
    if( userIsInGroup( 'sysop' ) && (wgNamespaceNumber > 0 || wgCanonicalSpecialPageName == 'Prefixindex') ) {
        $(twAddPortletLink("#", "P-batch", "tw-pbatch", "Protect pages found on this page", "")).click(Twinkle.batchprotect.callback);
    }
};

Twinkle.batchprotect.unlinkCache = {};
Twinkle.batchprotect.callback = function twinklebatchprotectCallback() {
    var Window = new SimpleWindow( 800, 400 );
    Window.setTitle( "Batch protection" );

    var form = new QuickForm( Twinkle.batchprotect.callback.evaluate );
    form.append( {
            type: 'select',
            name: 'move',
            label: 'Move protection',
            list: [
                {
                    label: 'Allow all users (still autoconfirmed)',
                    value: '',
                    selected: true
                },
                {
                    label: 'Block new and unregistered users',
                    value: 'autoconfirmed'
                },
                {
                    label: 'Block all non-admin users',
                    value: 'sysop'
                }
            ]
        } );
    form.append( {
            type: 'select',
            name: 'edit',
            label: 'Edit protection',
            list: [
                {
                    label: 'Allow all users',
                    value: '',
                    selected: true
                },
                {
                    label: 'Block new and unregistered users',
                    value: 'autoconfirmed'
                },
                {
                    label: 'Block all non-admin users',
                    value: 'sysop'
                }
            ]
        } );
    form.append( {
            type: 'select',
            name: 'create',
            label: 'Create protection',
            list: [
                {
                    label: 'Allow all users (still autoconfirmed)',
                    value: '',
                    selected: true
                },
                {
                    label: 'Block new and unregistered users',
                    value: 'autoconfirmed'
                },
                {
                    label: 'Block all non-admin users',
                    value: 'sysop'
                }
            ]
        } );
    form.append( {
            type: 'checkbox',
            list: [
                {
                    name: 'cascade',
                    label: 'Cascade protection'
                }
            ]
        } );
    form.append( {
            type: 'select',
            name: 'expiry',
            label: 'Expiration: ',
            list: [
                { label: '15 minutes', value: '15 minutes' },
                { label: '30 minutes', value: '30 minutes' },
                { label: '45 minutes', value: '45 minutes' },
                { label: '1 hour', value: '1 hour' },
                { label: '2 hours', value: '2 hours' },
                { label: '3 hours', value: '3 hours' },
                { label: '6 hours', value: '6 hours' },
                { label: '12 hours', value: '12 hours' },
                { label: '1 day', value: '1 day' },
                { label: '2 days', value: '2 days' },
                { label: '3 days', value: '3 days' },
                { label: '4 days', value: '4 days' },
                { label: '5 days', value: '5 days' },
                { label: '6 days', value: '6 days' },
                { label: '1 week', value: '1 week' },
                { label: '2 weeks', value: '2 weeks' },
                { label: '1 month', value: '1 month' },
                { label: '2 months', value: '2 months' },
                { label: '3 months', value: '3 months' },
                { label: '6 months', value: '6 months' },
                { label: '1 year', value: '1 year' },
                { label: '2 years', value: '2 years' },
                { label: '3 years', value: '3 years' },
                { label: '6 years', value: '6 years' },
                { label: 'indefinite', selected: true, value:'indefinite' }
            ]
        } );
    
    form.append( {
            type: 'textarea',
            name: 'reason',
            label: 'Reason: '
        } );

    var query;

    if( wgNamespaceNumber == Namespace.CATEGORY ) {

        query = {
            'action': 'query',
            'generator': 'categorymembers',
            'gcmtitle': wgPageName,
            'gcmlimit' : Twinkle.getPref('batchMax'), // the max for sysops
            'prop': [ 'revisions' ],
            'rvprop': [ 'size' ]
        };
    } else if( wgCanonicalSpecialPageName == 'Prefixindex' ) {
        query = {
            'action': 'query',
            'generator': 'allpages',
            'gapnamespace': QueryString.exists('namespace') ? QueryString.get( 'namespace' ): document.getElementById('namespace').value,
            'gapprefix': QueryString.exists('from') ? QueryString.get( 'from' ).replace('+', ' ').toUpperCaseFirstChar() : document.getElementById('nsfrom').value.toUpperCaseFirstChar(),
            'gaplimit' : Twinkle.getPref('batchMax'), // the max for sysops
            'prop' : [ 'revisions' ],
            'rvprop': [ 'size' ]
        };
    } else {
        query = {
            'action': 'query',
            'gpllimit' : Twinkle.getPref('batchMax'), // the max for sysops
            'generator': 'links',
            'titles': wgPageName,
            'prop': [ 'revisions' ],
            'rvprop': [ 'size' ]
        };

    }
    var wikipedia_api = new Wikipedia.api( 'Grabbing pages', query, function( self ) {
            var xmlDoc = self.responseXML;
            var snapshot = xmlDoc.evaluate('//page', xmlDoc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
            var list = [];
            for ( var i = 0; i < snapshot.snapshotLength; ++i ) {
                var object = snapshot.snapshotItem(i);
                var page = xmlDoc.evaluate( '@title', object, null, XPathResult.STRING_TYPE, null ).stringValue;
                var size = xmlDoc.evaluate( 'revisions/rev/@size', object, null, XPathResult.NUMBER_TYPE, null ).numberValue;

                list.push( {label:page + (size ? ' (' + size + ')' : '' ), value:page, checked: true });
            }
            self.params.form.append( {
                    type: 'checkbox',
                    name: 'pages',
                    list: list
                }
            );
            self.params.form.append( { type:'submit' } );

            var result = self.params.form.render();
            self.params.Window.setContent( result );


        }  );

    wikipedia_api.params = { form:form, Window:Window };
    wikipedia_api.post();
    var root = document.createElement( 'div' );
    Status.init( root );
    Window.setContent( root );
    Window.display();
};

Twinkle.batchprotect.currentProtectCounter = 0;
Twinkle.batchprotect.currentprotector = 0;
Twinkle.batchprotect.callback.evaluate = function twinklebatchprotectCallbackEvaluate(event) {
    wgPageName = wgPageName.replace( /_/g, ' ' ); // for queen/king/whatever and country!
    var pages = event.target.getChecked( 'pages' );
    var reason = event.target.reason.value;
    var create = event.target.create.value;
    var edit = event.target.edit.value;
    var cascade = event.target.cascade.checked;
    var expiry = event.target.expiry.value;
    var move = event.target.move.value;
    if( ! reason ) {
        return;
    }
    Status.init( event.target );
    if( !pages ) {
        Status.error( 'Error', 'nothing to delete, aborting' );
        return;
    }

    function toCall( work ) {
        if( work.length === 0 && Twinkle.batchprotect.currentProtectCounter <= 0 ) {
            Status.info( 'work done' );
            window.clearInterval( Twinkle.batchprotect.currentprotector );
            Wikipedia.removeCheckpoint();
            return;
        } else if( work.length !== 0 && Twinkle.batchprotect.currentProtectCounter <= Twinkle.getPref('batchProtectMinCutOff') ) {
            var pages = work.shift();
            Twinkle.batchprotect.currentProtectCounter += pages.length;
            for( var i = 0; i < pages.length; ++i ) {
                var page = pages[i];
                var query = {
                    'action': 'query',
                    'titles': page
                };
                var wikipedia_api = new Wikipedia.api( 'Checking if page ' + page + ' exists', query, Twinkle.batchprotect.callbacks.main );
                wikipedia_api.params = { page:page, reason:reason, move: move, edit: edit, create: create, expiry: expiry, cascade: cascade };
                wikipedia_api.post();
            }
        }
    }
    var work = pages.chunk( Twinkle.getPref('batchProtectChunks') );
    Wikipedia.addCheckpoint();
    Twinkle.batchprotect.currentprotector = window.setInterval( toCall, 1000, work );
};

Twinkle.batchprotect.callbacks = {
    main: function( self ) {
        var xmlDoc = self.responseXML;
        var normal = xmlDoc.evaluate( '//normalized/n/@to', xmlDoc, null, XPathResult.STRING_TYPE, null ).stringValue;
        if( normal ) {
            self.params.page = normal;
        }

        var query = {
            'title': self.params.page,
            'action': 'protect'
        };
        var wikipedia_wiki = new Wikipedia.wiki( 'Protecting page ' + self.params.page, query, Twinkle.batchprotect.callbacks.protectPage, function( self ) {
                --Twinkle.batchprotect.currentProtectCounter;
                var link = document.createElement( 'a' );
                link.setAttribute( 'href', wgArticlePath.replace( '$1', self.query.title ) );
                link.setAttribute( 'title', self.query.title );
                link.appendChild( document.createTextNode( self.query.title ) );
                self.statelem.info( [ 'completed (' , link , ')' ] );

            } );
        wikipedia_wiki.params = self.params;
        wikipedia_wiki.followRedirect = false;
        wikipedia_wiki.get();        
    },
    protectPage: function( self ) {
        var form  = self.responseXML.getElementById( 'mw-Protect-Form' );
        var postData = {
            'wpEditToken': form.wpEditToken.value,
            'mwProtect-level-edit': self.params.edit,
            'wpProtectExpirySelection-edit': self.params.expiry != 'indefinite' ? 'othertime' : 'indefinite',
            'mwProtect-expiry-edit': self.params.expiry != 'indefinite' ? self.params.expiry : undefined,
            'mwProtect-level-move': self.params.move,
            'wpProtectExpirySelection-move': self.params.expiry != 'indefinite' ? 'othertime' : 'indefinite',
            'mwProtect-expiry-move': self.params.expiry != 'indefinite' ? self.params.expiry : undefined,
            'mwProtect-cascade': self.params.cascade ? '' : undefined,
            'mwProtectWatch': form.mwProtectWatch.checked ? '' : undefined,
            'wpProtectReasonSelection': 'other',
            'mwProtect-reason': self.params.reason + Twinkle.getPref('protectionSummaryAd')
        };

        self.post( postData );
    }
};

/*
 ****************************************
 *** twinklebatchundelete.js: Batch undelete module
 ****************************************
 * Mode of invocation:     Tab ("Und-batch")
 * Active on:              Existing and non-existing user pages (??? why?)
 * Config directives in:   TwinkleConfig
 */


Twinkle.batchundelete = function twinklebatchundelete() {
    if( wgNamespaceNumber != Namespace.USER ) {
        return;
    }
    if( userIsInGroup( 'sysop' ) ) {
        $(twAddPortletLink("#", "Und-batch", "tw-batch-undel", "Undelete 'em all", "")).click(Twinkle.batchundelete.callback);
    }
};

Twinkle.batchundelete.callback = function twinklebatchundeleteCallback() {
    var Window = new SimpleWindow( 800, 400 );
    var form = new QuickForm( Twinkle.batchundelete.callback.evaluate );
    form.append( {
            type: 'textarea',
            name: 'reason',
            label: 'Reason: '
        } );

    var query = {
        'action': 'query',
        'generator': 'links',
        'titles': wgPageName,
        'gpllimit' : Twinkle.getPref('batchMax') // the max for sysops
    };
    var wikipedia_api = new Wikipedia.api( 'Grabbing pages', query, function( self ) {
            var xmlDoc = self.responseXML;
            var snapshot = xmlDoc.evaluate('//page[@missing]', xmlDoc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
            var list = [];
            for ( var i = 0; i < snapshot.snapshotLength; ++i ) {
                var object = snapshot.snapshotItem(i);
                var page = xmlDoc.evaluate( '@title', object, null, XPathResult.STRING_TYPE, null ).stringValue;
                list.push( {label:page, value:page, checked: true });
            }
            self.params.form.append( {
                    type: 'checkbox',
                    name: 'pages',
                    list: list
                }
            );
            self.params.form.append( { type:'submit' } );

            var result = self.params.form.render();
            self.params.Window.setContent( result );


        }  );
    wikipedia_api.params = { form:form, Window:Window };
    wikipedia_api.post();
    var root = document.createElement( 'div' );
    Status.init( root );
    Window.setContent( root );
    Window.display();
};
Twinkle.batchundelete.currentUndeleteCounter = 0;
Twinkle.batchundelete.currentundeletor = 0;
Twinkle.batchundelete.callback.evaluate = function( event ) {
    Wikipedia.actionCompleted.notice = 'Status';
    Wikipedia.actionCompleted.postfix = 'batch undeletion is now completed';

    var pages = event.target.getChecked( 'pages' );
    var reason = event.target.reason.value;
    if( ! reason ) {
        return;
    }
    Status.init( event.target );

    if( !pages ) {
        Status.error( 'Error', 'nothing to undelete, aborting' );
        return;
    }

    var work = pages.chunk( Twinkle.getPref('batchUndeleteChunks') );
    Wikipedia.addCheckpoint();
    Twinkle.batchundelete.currentundeletor = window.setInterval( Twinkle.batchundelete.callbacks.main, 1000, work, reason );
};

Twinkle.batchundelete.callbacks = {
    main: function( work, reason ) {
        if( work.length === 0 && Twinkle.batchundelete.currentUndeleteCounter <= 0 ) {
            Status.info( 'work done' );
            window.clearInterval( Twinkle.batchundelete.currentundeletor );
            Wikipedia.removeCheckpoint();
            return;
        } else if( work.length !== 0 && Twinkle.batchundelete.currentUndeleteCounter <= Twinkle.getPref('batchUndeleteMinCutOff') ) {
            var pages = work.shift();
            Twinkle.batchundelete.currentUndeleteCounter += pages.length;
            for( var i = 0; i < pages.length; ++i ) {
                var title = pages[i];
                var query = {
                    'title': 'Special:Undelete',
                    'target': title,
                    'action': 'submit'
                };
                var wikipedia_wiki = new Wikipedia.wiki( "Undeleting " + title, query, Twinkle.batchundelete.callbacks.undeletePage, function( self ) {
                        --Twinkle.batchundelete.currentUndeleteCounter;
                        var link = document.createElement( 'a' );
                        link.setAttribute( 'href', mw.util.wikiGetlink(self.params.title) );
                        link.setAttribute( 'title', self.params.title );
                        link.appendChild( document.createTextNode(self.params.title) );
                        self.statelem.info( ['completed (',link,')'] );

                    });
                wikipedia_wiki.params = { title:title, reason: reason };
                wikipedia_wiki.get();

            }
        }
    },
    undeletePage: function( self ) {
        var form = self.responseXML.getElementById('undelete');
        var postData = {
            'wpComment': self.params.reason + '.' +  Twinkle.getPref('deletionSummaryAd'),
            'target': self.params.image,
            'wpEditToken': form.wpEditToken.value,
            'restore': 1
        };
        self.post( postData );

    }
};

/*
****************************************
*** twinklecloser.js: AFD/AFC closer module
****************************************
* Mode of invocation:     Link on AFD subpages (including daily log pages) and AFC daily log pages
* Active on:              The aforementioned pages
* Config directives in:   TwinkleConfig
*/

Twinkle.closer = function twinklecloser() {
    var closeable = false;
    var type;
    if( /Wikipedia:Articles_for_creation\/\d{4}-\d{2}-\d{2}/.test(mw.config.get('wgPageName')) ) {
        closeable = true;
        type = 'afc';
    } else if(  /Wikipedia:Articles_for_deletion\//.test(mw.config.get('wgPageName')) ) {
        closeable = true;
        type = 'afd';
    }

    if( closeable ) {
        Twinkle.closer.mark( type );
    }
};

Twinkle.closer.mark = function twinklecloserMark( type ) {
    var sections;
    switch( type ) {
    case 'afc':
        sections = $('h2:has(span.editsection)');
        sections.each(function(index, section) {
            var query = new QueryString($(this).find('span.editsection a').attr('href').split( '?', 2 )[1]);
            var section_number = query.get('section');
            var closelink = $('<a/>', {
                'text': '[close]',
                'click': function(){Twinkle.closer.actions.afc(section_number);},
                'class': 'twinkle-closer-link twinkle-closer-link-afc',
                'css': { 'color': '#449922'    }
            }).prependTo(this);
        });
        break;
    case 'afd':
        sections = $('h3:has(span.editsection)');
        sections.each(function(index, section) {
            var $a = $(this).find('span.editsection a');
            var page =$a.attr('title');
            var query = new QueryString($a.attr('href').split( '?', 2 )[1]);
            var section_number = query.get('section');
            var closelink = $('<a/>', {
                'text': '[close]',
                'click': function(){Twinkle.closer.actions.afd(section_number, page);},
                'class': 'twinkle-closer-link twinkle-closer-link-afd',
                'css': { 'color': '#449922'    }
            }).prependTo(this);
        });
        break;
    default:
        alert("Twinkle.closer.mark: unknown closure type " + type);
        break;
    }
};

Twinkle.closer.actions = {
    afc: function twinklecloserActionsAfc( section ) {
        var Window = new SimpleWindow( 800, 400 );
        Window.setTitle( "Close AFC" );
        Window.setScriptName( "Twinkle" );
        Window.addFooterLink( "AFC reviewing instructions", "WP:AFCR" );
        Window.addFooterLink( "Twinkle help", "WP:TW/DOC#closer-afc" );

        var form = new QuickForm( Twinkle.closer.callbacks.afc.evaluate );
        form.append ( {
            label: 'Action: ',
            type: 'select',
            name: 'type',
            event: Twinkle.closer.callbacks.afc.submenu,
            list: [
                {
                    label: 'Approved',
                    value: 'approved'
                },
                {
                    label: 'Denied',
                    value: 'denied'
                },
                {
                    label: 'Archive',
                    value: 'archive'
                }
            ]
        });
        form.append( {
            type: 'div',
            id: 'work_area'
        } );
        form.append( {
            type: 'hidden',
            name: 'section',
            value: section
        } );
        form.append( {
            type: 'hidden',
            name: 'page',
            value: page
        } );
        form.append( { type:'submit' } );

        var result = form.render();
        Window.setContent( result );
        Window.display();

        // We must init the
        var evt = document.createEvent( "Event" );
        evt.initEvent( 'change', true, true );
        result.type.dispatchEvent( evt );
    },
    afd: function twinklecloserActionsAfd( section, page ) {
        var Window = new SimpleWindow( 800, 400 );
        Window.setTitle( "Close AFD" );
        Window.setScriptName( "Twinkle" );
        Window.addFooterLink( "AFD closing instructions", "Wikipedia:Articles for deletion/Administrator instructions" );
        Window.addFooterLink( "Twinkle help", "WP:TW/DOC#closer-afd" );

        var form = new QuickForm( Twinkle.closer.callbacks.afd.evaluate );
        form.append ( {
            label: 'Action: ',
            type: 'radio',
            name: 'type',
            list: [
                {
                    label: 'Keep',
                    value: 'keep'
                },
                {
                    label: 'No consensus',
                    value: 'no consensus'
                },
                {
                    label: 'Merge',
                    value: 'merge'
                },
                {
                    label: 'Redirect',
                    value: 'redirect',
                    subgroup: {
                        type: 'input',
                        name: 'target',
                        label: 'Target: ',
                        tooltip: 'the name of the page to redirect to'
                    }

                },
                {
                    label: 'Delete',
                    value: 'delete',
                    subgroup: {
                        type: 'checkbox',
                        list: [
                            {
                                label: 'Delete? ',
                                value: 'delete',
                                name: 'del',
                                tooltop: 'if we should delete the page on the fly',
                                checked: true
                            }
                        ]
                    }
                }
            ]
        });
        form.append( {
            type: 'textarea',
            name: 'reason',
            label: 'Reason:'
        } );

        form.append( {
            type: 'input',
            name: 'affected_page',
            label: 'Affected page: ',
            value: page.replace( /.*\/(.*?)(\s\(.*?\))?/, "$1" )
        } );

        form.append( {
            type: 'div',
            id: 'work_area'
        } );

        form.append( {
            type: 'hidden',
            name: 'section',
            value: section
        } );
        form.append( {
            type: 'hidden',
            name: 'page',
            value: page
        } );
        form.append( { type:'submit' } );
        var result = form.render();
        Window.setContent( result );
        Window.display();
    }
};

Twinkle.closer.callbacks = {
    afc: {
        submenu: function(e) {
            var value = e.target.value;
            var root = e.target.form;
            var old_area = document.getElementById( 'work_area' );
            var work_area = null;
            switch( value ) {
            case 'archive':
                work_area = new QuickForm.element( {
                    type: 'div',
                    id: 'work_area'
                } );

                work_area.append( {
                    type: 'checkbox',
                    name: 'approved',
                    list: [
                        {
                            label: 'Approved ',
                            value: 'approved'
                        }
                    ]
                } );

                work_area = work_area.render();
                old_area.parentNode.replaceChild( work_area, old_area );
                break;
            case 'approved':
                work_area = new QuickForm.element( {
                    type: 'div',
                    id: 'work_area'
                } );

                work_area.append( {
                    type: 'input',
                    name: 'article',
                    label: 'Article ',
                    tooltop: 'Leave empty if article was created as specified'
                } );

                work_area = work_area.render();
                old_area.parentNode.replaceChild( work_area, old_area );
                break;
            case 'denied':
                work_area = new QuickForm.element( {
                    type: 'div',
                    id: 'work_area'
                } );

                work_area.append( {
                    type: 'select',
                    name: 'reason',
                    label: 'Reason ',
                    list: [
                        {
                            label:'v',
                            value:'v'
                        },
                        {
                            label:'bio',
                            value:'bio'
                        },
                        {
                            label:'nn',
                            value:'nn'
                        },
                        {
                            label:'web',
                            value:'web'
                        },
                        {
                            label:'corp',
                            value:'corp'
                        },
                        {
                            label:'music',
                            value:'music'
                        },
                        {
                            label:'dict',
                            value:'dict'
                        },
                        {
                            label:'context',
                            value:'context'
                        },
                        {
                            label:'blank',
                            value:'blank'
                        },
                        {
                            label:'neo',
                            value:'neo'
                        },
                        {
                            label:'joke',
                            value:'joke'
                        },
                        {
                            label:'lang',
                            value:'lang'
                        },
                        {
                            label:'blp',
                            value:'blp'
                        },
                        {
                            label:'npov',
                            value:'npov'
                        },
                        {
                            label:'not',
                            value:'not'
                        }
                    ]
                } );
                work_area = work_area.render();
                old_area.parentNode.replaceChild( work_area, old_area );
                break;
            default:
                alert("Twinkle.closer.callbacks.afc.submenu: unknown outcome " + value);
                break;
            }
        },
        evaluate: function(e) {
            var form = e.target;
            var type = form.type.value;
            var section = form.section.value;
            var params = { type: type };
            switch( type ) {
            case 'approved':
                var article = form.article.value;
                params.tag = '{{subst:afc accept' + ( article ? '|' + article : '' ) + '}}';
                break;
            case 'denied':
                var reason = form.reason.value;
                params.tag = '{{subst:afc ' + reason + '}}';
                break;
            case 'archive':
                var approved = form.approved.checked;
                params.top = '{{subst:afc top' + ( approved ? '|approved' : '' ) + '}}';
                params.bottom = '{{subst:afc b}}';
                break;
            default:
                alert("Twinkle.closer.callbacks.afc.evaluate: unknown outcome " + type);
                break;
            }

            SimpleWindow.setButtonsEnabled( false );
            Status.init( form );
            var page = Wikipedia.page(mw.config.get('wgPageName'), "Processing");
            page.setPageSection(section);
            page.setCallbackParameters(params);
            page.load(Twinkle.closer.callbacks.afc.edit);
        },
        edit: function( pageobj ) {
            var text = pageobj.getPageText();
            var params = pageobj.getCallbackParameters();
            var statelem = pageobj.getStatusElement();
            var summary;

            switch( params.type ) {
            case 'approved':
                text += params.tag + '~~~~';
                summary = 'Approving article.';
                break;
            case 'denied':
                text += params.tag + '~~~~';
                summary = 'Denying article.';
                break;
            case 'archive':
                text = text.replace( /^(==.*?==)\n/, "$1\n" + params.top  );
                text += params.bottom;
                summary = 'Archiving.';
                break;
            default:
                alert("Twinkle.closer.callbacks.afc.edit: unknown outcome " + params.type);
                break;
            }
            pageobj.setPageText(text);
            pageobj.setEditSummary(summary + Twinkle.getPref('summaryAd'));
            pageobj.setCreateOption('nocreate');
            pageobj.save();
        }
    },
    afd: {
        submenu: function(e) {
            var value = e.target.value;
            var root = e.target.form;
            var old_area = document.getElementById( 'work_area' );
            var    work_area = new QuickForm.element( {
                type: 'div',
                id: 'work_area'
            } );
            switch( value ) {
            case 'keep':
            case 'no consensus':
                // nothing
                break;
            case 'redirect':
                work_area.append( {
                    type: 'input',
                    name: 'target',
                    label: 'Target: ',
                    tooltip: 'the name of the page to redirect to'
                } );
                break;
            case 'merge':
                // merge must be done manually
                break;
            case 'delete':
                work_area.append( {
                    type: 'checkbox',
                    list: [
                        {
                            label: 'Delete? ',
                            value: 'delete',
                            name: 'del',
                            tooltop: 'if we should delete the page on the fly',
                            checked: true
                        }
                    ]
                } );
                break;
            default:
                alert("Twinkle.closer.callbacks.afd.submenu: unknown outcome " + value);
                break;
            }

            work_area = work_area.render();
            old_area.parentNode.replaceChild( work_area, old_area );
        },
        evaluate: function(e) {
            var form = e.target;
            var reason = form.reason.value;
            var type = form.type.value;
            var section = form.section.value;
            var page = form.page.value;
            var affected_page = form.affected_page.value;
            var params = { type: type, page: page, reason: reason, affected_page: affected_page };
            var label, wp_page;
            switch( type ) {
            case 'keep':
                label = "Keep";
                break;
            case 'no consensus':
                label = "No consensus";
                break;
            case 'redirect':
                label = "Redirect";
                var target = form.target.value;
                break;
            case 'merge':
                label = "Merge";
                break;
            case 'delete':
                label = "Delete";
                var del = form.del.checked;
                break;
            default:
                alert("Twinkle.closer.callbacks.afd.evaluate: unknown outcome " + type);
                break;
            }
            params.label = label;

            SimpleWindow.setButtonsEnabled( false );
            Status.init( form );

            if( type === 'delete' ) {
                if( del ) {
                    // Start by purging redirect
                    var query = {
                        'action': 'query',
                        'list': 'backlinks',
                        'blfilterredir': 'redirects',
                        'bltitle': affected_page,
                        'bllimit': 5000
                    };
                    var wikipedia_api = new Wikipedia.api( 'Grabbing redirects', query, Twinkle.closer.callbacks.afd.deleteRedirectsMain );
                    wikipedia_api.params = params;
                    wikipedia_api.post();

                    // and now, delete!

                    wp_page = Wikipedia.page(affected_page, 'Deleting page');
                    wp_page.setEditSummary("Deleted per outcome of [[WP:AFD]] discussion (see [[" + params.page + "]])." + Twinkle.getPref('deletionSummaryAd'));
                    wp_page.deletePage();
                }

            }

            wp_page = Wikipedia.page(page, "Updating process page");
            wp_page.setPageSection(section);
            wp_page.setCallbackParameters(params);
            wp_page.load(Twinkle.closer.callbacks.afd.edit);
        },
        deleteRedirectsMain: function( self ) {
            var $doc = $(self.responseXML);
            $doc.find("backlinks bl").each(function(){
                var title = $(this).attr('title');
                var page = new Wikipedia.page(title, "Deleting redirecting page " + title);
                page.setEditSummary("Speedy deleted per ([[WP:CSD#R1|CSD R1]]), Redirect to deleted page \"" + self.params.affected_page + "\"." + Twinkle.getPref('deletionSummaryAd'));
                page.deletePage();
            });
        },
        edit: function( pageobj ) {
            var text = pageobj.getText();
            var params = pageobj.getCallbackParameters();
            pageobj.setEditSummary( "Closing discussion, result was \"" + params.label + "\"" +  Twinkle.getPref('summaryAd') );
            pageobj.setPageText("{{subst:Afd top}}'''" + params.label + "''' " + params.reason + ". ~~~~n" + text + "\n{{subst:Afd bottom}}");
            pageobj.save();
        }
    }
};

/*
 ****************************************
 *** twinkleconfig.js: Preferences module
 ****************************************
 * Mode of invocation:     Adds configuration form to Wikipedia:Twinkle/Preferences and user
                           subpages named "/Twinkle preferences", and adds ad box to the top of user
                           subpages belonging to the currently logged-in user which end in '.js'
 * Active on:              What I just said.  Yeah.
 * Config directives in:   TwinkleConfig

 I, [[User:This, that and the other]], originally wrote this.  If the code is misbehaving, or you have any
 questions, don't hesitate to ask me.  (This doesn't at all imply [[WP:OWN]]ership - it's just meant to
 point you in the right direction.)  -- TTO
 */


Twinkle.config = {};

Twinkle.config.commonEnums = {
    watchlist: { yes: "Add to watchlist", no: "Don't add to watchlist", "default": "Follow your site preferences" },
    talkPageMode: { window: "In a window, replacing other user talks", tab: "In a new tab", blank: "In a totally new window" }
};

Twinkle.config.commonSets = {
    csdCriteria: {
        db: "Custom rationale ({{db}})",
        g1: "G1", g2: "G2", g3: "G3", g4: "G4", g5: "G5", g6: "G6", g7: "G7", g8: "G8", g10: "G10", g11: "G11", g12: "G12",
        a1: "A1", a2: "A2", a3: "A3", a5: "A5", a7: "A7", a9: "A9", a10: "A10",
        u1: "U1", u2: "U2", u3: "U3",
        f1: "F1", f2: "F2", f3: "F3", f7: "F7", f8: "F8", f9: "F9", f10: "F10",
        c1: "C1",
        t2: "T2", t3: "T3",
        r2: "R2", r3: "R3",
        p1: "P1", p2: "P2"  // db-multiple is not listed here because it is treated differently within twinklespeedy
    },
    csdCriteriaDisplayOrder: [
        "db",
        "g1", "g2", "g3", "g4", "g5", "g6", "g7", "g8", "g10", "g11", "g12",
        "a1", "a2", "a3", "a5", "a7", "a9", "a10",
        "u1", "u2", "u3",
        "f1", "f2", "f3", "f7", "f8", "f9", "f10",
        "c1",
        "t2", "t3",
        "r2", "r3",
        "p1", "p2"
    ],
    csdAndDICriteria: {
        db: "Custom rationale ({{db}})",
        g1: "G1", g2: "G2", g3: "G3", g4: "G4", g5: "G5", g6: "G6", g7: "G7", g8: "G8", g10: "G10", g11: "G11", g12: "G12",
        a1: "A1", a2: "A2", a3: "A3", a5: "A5", a7: "A7", a9: "A9", a10: "A10",
        u1: "U1", u2: "U2", u3: "U3",
        f1: "F1", f2: "F2", f3: "F3", f4: "F4", f5: "F5", f6: "F6", f7: "F7", f8: "F8", f9: "F9", f10: "F10", f11: "F11",
        c1: "C1",
        t2: "T2", t3: "T3",
        r2: "R2", r3: "R3",
        p1: "P1", p2: "P2"
    },
    csdAndDICriteriaDisplayOrder: [
        "db",
        "g1", "g2", "g3", "g4", "g5", "g6", "g7", "g8", "g10", "g11", "g12",
        "a1", "a2", "a3", "a5", "a7", "a9", "a10",
        "u1", "u2", "u3",
        "f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "f9", "f10", "f11",
        "c1",
        "t2", "t3",
        "r2", "r3",
        "p1", "p2"
    ],
    namespacesNoSpecial: {
        "0": "Article",
        "1": "Talk (article)",
        "2": "User",
        "3": "User talk",
        "4": "Wikipedia",
        "5": "Wikipedia talk",
        "6": "File",
        "7": "File talk",
        "8": "MediaWiki",
        "9": "MediaWiki talk",
        "10": "Template",
        "11": "Template talk",
        "12": "Help",
        "13": "Help talk",
        "14": "Category",
        "15": "Category talk",
        "100": "Portal",
        "101": "Portal talk",
        "108": "Book",
        "109": "Book talk"
    }
};

/**
 * Section entry format:
 *
 * {
 *   title: <human-readable section title>,
 *   adminOnly: <true for admin-only sections>,
 *   hidden: <true for advanced preferences that rarely need to be changed - they can still be modified by manually editing twinkleoptions.js>,
 *   inFriendlyConfig: <true for preferences located under FriendlyConfig rather than TwinkleConfig>,
 *   preferences: [
 *     {
 *       name: <TwinkleConfig property name>,
 *       label: <human-readable short description - used as a form label>,
 *       helptip: <(optional) human-readable text (using valid HTML) that complements the description, like limits, warnings, etc.>
 *       adminOnly: <true for admin-only preferences>,
 *       type: <string|boolean|integer|enum|set|customList> (customList stores an array of JSON objects { value, label }),
 *       enumValues: <for type = "enum": a JSON object where the keys are the internal names and the values are human-readable strings>,
 *       setValues: <for type = "set": a JSON object where the keys are the internal names and the values are human-readable strings>,
 *       setDisplayOrder: <(optional) for type = "set": an array containing the keys of setValues (as strings) in the order that they are displayed>,
 *       customListValueTitle: <for type = "customList": the heading for the left "value" column in the custom list editor>,
 *       customListLabelTitle: <for type = "customList": the heading for the right "label" column in the custom list editor>
 *     },
 *     . . .
 *   ]
 * },
 * . . .
 *
 */

Twinkle.config.sections = [
{
    title: "General",
    preferences: [
        // TwinkleConfig.summaryAd (string)
        // Text to be appended to the edit summary of edits made using Twinkle
        {
            name: "summaryAd",
            label: "\"Ad\" to be appended to Twinkle's edit summaries",
            helptip: "The summary ad should start with a space, and be kept short.",
            type: "string"
        },

        // TwinkleConfig.deletionSummaryAd (string)
        // Text to be appended to the edit summary of deletions made using Twinkle
        {
            name: "deletionSummaryAd",
            label: "Summary ad to use for deletion summaries",
            helptip: "Normally the same as the edit summary ad above.",
            adminOnly: true,
            type: "string"
        },

        // TwinkleConfig.protectionSummaryAd (string)
        // Text to be appended to the edit summary of page protections made using Twinkle
        {
            name: "protectionSummaryAd",
            label: "Summary ad to use for page protections",
            helptip: "Normally the same as the edit summary ad above.",
            adminOnly: true,
            type: "string"
        },

        // TwinkleConfig.userTalkPageMode may take arguments:
        // 'window': open a new window, remember the opened window
        // 'tab': opens in a new tab, if possible.
        // 'blank': force open in a new window, even if such a window exists
        {
            name: "userTalkPageMode",
            label: "When opening a user talk page, open it",
            type: "enum",
            enumValues: Twinkle.config.commonEnums.talkPageMode
        },

        // TwinkleConfig.dialogLargeFont (boolean)
        {
            name: "dialogLargeFont",
            label: "Use larger text in Twinkle dialogs",
            type: "boolean"
        }
    ]
},

{
    title: "Image deletion (DI)",
    preferences: [
        // TwinkleConfig.notifyUserOnDeli (boolean)
        // If the user should be notified after placing a file deletion tag
        {
            name: "notifyUserOnDeli",
            label: "Check the \"notify initial uploader\" box by default",
            type: "boolean"
        },

        // TwinkleConfig.deliWatchPage (string)
        // The watchlist setting of the page tagged for deletion. Either "yes", "no", or "default". Default is "default" (Duh).
        {
            name: "deliWatchPage",
            label: "Add image page to watchlist when tagging",
            type: "enum",
            enumValues: Twinkle.config.commonEnums.watchlist
        },

        // TwinkleConfig.deliWatchUser (string)
        // The watchlist setting of the user talk page if a notification is placed. Either "yes", "no", or "default". Default is "default" (Duh).
        {
            name: "deliWatchUser",
            label: "Add user talk page of initial uploader to watchlist when notifying",
            type: "enum",
            enumValues: Twinkle.config.commonEnums.watchlist
        }
    ]
},

{
    title: "Proposed deletion (PROD)",
    preferences: [
        // TwinkleConfig.watchProdPages (boolean)
        // If, when applying prod template to page, to watch the page
        {
            name: "watchProdPages",
            label: "Add article to watchlist when tagging",
            type: "boolean"
        },

        // TwinkleConfig.prodReasonDefault (string)
        // The prefilled PROD reason.
        {
            name: "prodReasonDefault",
            label: "Prefilled PROD reason",
            type: "string"
        },

        {
            name: "logProdPages",
            label: "Keep a log in userspace of all pages you tag for PROD",
            helptip: "Since non-admins do not have access to their deleted contributions, the userspace log offers a good way to keep track of all pages you tag for PROD using Twinkle.",
            type: "boolean"
        },
        {
            name: "prodLogPageName",
            label: "Keep the PROD userspace log at this user subpage",
            helptip: "i.e. User:<i>username</i>/<i>subpage name</i>. Only works if you turn on the PROD userspace log.",
            type: "string"
        }
    ]
},

{
    title: "Revert and rollback",  // twinklefluff module
    preferences: [
        // TwinkleConfig.openTalkPage (array)
        // What types of actions that should result in opening of talk page
        {
            name: "openTalkPage",
            label: "Open user talk page after these types of reversions",
            type: "set",
            setValues: { agf: "AGF rollback", norm: "Normal rollback", vand: "Vandalism rollback", torev: "\"Restore this version\"" }
        },

        // TwinkleConfig.openTalkPageOnAutoRevert (bool)
        // Defines if talk page should be opened when calling revert from contrib page, because from there, actions may be multiple, and opening talk page not suitable. If set to true, openTalkPage defines then if talk page will be opened.
        {
            name: "openTalkPageOnAutoRevert",
            label: "Open user talk page when invoking rollback from user contributions",
            helptip: "Often, you may be rolling back many pages at a time from a vandal's contributions page, so it would be unsuitable to open the user talk page. Hence, this option is off by default. When this is on, the desired options must be enabled in the previous setting for this to work.",
            type: "boolean"
        },

        // TwinkleConfig.markRevertedPagesAsMinor (array)
        // What types of actions that should result in marking edit as minor
        {
            name: "markRevertedPagesAsMinor",
            label: "Mark as minor edit for these types of reversions",
            type: "set",
            setValues: { agf: "AGF rollback", norm: "Normal rollback", vand: "Vandalism rollback", torev: "\"Restore this version\"" }
        },

        // TwinkleConfig.watchRevertedPages (array)
        // What types of actions that should result in forced addition to watchlist
        {
            name: "watchRevertedPages",
            label: "Add pages to watchlist for these types of reversions",
            type: "set",
            setValues: { agf: "AGF rollback", norm: "Normal rollback", vand: "Vandalism rollback", torev: "\"Restore this version\"" }
        },

        // TwinkleConfig.offerReasonOnNormalRevert (boolean)
        // If to offer a prompt for extra summary reason for normal reverts, default to true
        {
            name: "offerReasonOnNormalRevert",
            label: "Prompt for reason for normal rollbacks",
            helptip: "\"Normal\" rollbacks are the ones that are invoked from the middle [rollback] link.",
            type: "boolean"
        },

        {
            name: "confirmOnFluff",
            label: "Provide a confirmation message before reverting",
            helptip: "For users of pen or touch devices, and chronically indecisive people.",
            type: "boolean"
        },

        // TwinkleConfig.showRollbackLinks (array)
        // Where Twinkle should show rollback links (diff, others, mine, contribs)
        // Note from TTO: |contribs| seems to be equal to |others| + |mine|, i.e. redundant, so I left it out heres
        {
            name: "showRollbackLinks",
            label: "Show rollback links on these pages",
            type: "set",
            setValues: { diff: "Diff pages", others: "Contributions pages of other users", mine: "My contributions page" }
        }
    ]
},

{
    title: "Shared IP tagging",
    inFriendlyConfig: true,
    preferences: [
        {
            name: "markSharedIPAsMinor",
            label: "Mark shared IP tagging as a minor edit",
            type: "boolean"
        }
    ]
},

{
    title: "Speedy deletion (CSD)",
    preferences: [
        // TwinkleConfig.speedyPromptOnG7 (boolean)
        {
            name: "speedyPromptOnG7",
            label: "Prompt for rationale when tagging with G7 (author request)",
            type: "boolean"
        },

        // TwinkleConfig.watchSpeedyPages (array)
        // Whether to add speedy tagged pages to watchlist
        {
            name: "watchSpeedyPages",
            label: "Add page to watchlist when tagging with these criteria",
            type: "set",
            setValues: Twinkle.config.commonSets.csdCriteria,
            setDisplayOrder: Twinkle.config.commonSets.csdCriteriaDisplayOrder
        },

        // TwinkleConfig.markSpeedyPagesAsPatrolled (boolean)
        // If, when applying speedy template to page, to mark the page as patrolled (if the page was reached from NewPages)
        {
            name: "markSpeedyPagesAsPatrolled",
            label: "Mark page as patrolled when tagging (if possible)",
            helptip: "Due to technical limitations, pages are only marked as patrolled when they are reached via Special:NewPages.",
            type: "boolean"
        },

        // TwinkleConfig.notifyUserOnSpeedyDeletionNomination (array)
        // What types of actions should result that the author of the page being notified of nomination
        {
            name: "notifyUserOnSpeedyDeletionNomination",
            label: "Notify page creator only when tagging with these criteria",
            helptip: "Even if you choose to notify from the CSD screen, the notification will only take place for those criteria selected here.",
            type: "set",
            setValues: Twinkle.config.commonSets.csdCriteria,
            setDisplayOrder: Twinkle.config.commonSets.csdCriteriaDisplayOrder
        },

        // TwinkleConfig.welcomeUserOnSpeedyDeletionNotification (array of strings)
        // On what types of speedy deletion notifications shall the user be welcomed
        // with a "firstarticle" notice if his talk page has not yet been created.
        {
            name: "welcomeUserOnSpeedyDeletionNotification",
            label: "Welcome page creator alongside notification when tagging with these criteria",
            helptip: "The welcome is issued only if the user is notified about the deletion, and only if their talk page does not already exist. The template used is {{<a href=\"" + mw.util.wikiGetlink("Template:Firstarticle") + "\">firstarticle</a>}}.",
            type: "set",
            setValues: Twinkle.config.commonSets.csdCriteria,
            setDisplayOrder: Twinkle.config.commonSets.csdCriteriaDisplayOrder
        },

        // TwinkleConfig.promptForSpeedyDeletionSummary (array of strings)
        {
            name: "promptForSpeedyDeletionSummary",
            label: "Allow editing of deletion summary when deleting under these criteria",
            adminOnly: true,
            type: "set",
            setValues: Twinkle.config.commonSets.csdAndDICriteria,
            setDisplayOrder: Twinkle.config.commonSets.csdAndDICriteriaDisplayOrder
        },

        // TwinkleConfig.openUserTalkPageOnSpeedyDelete (array of strings)
        // What types of actions that should result user talk page to be opened when speedily deleting (admin only)
        {
            name: "openUserTalkPageOnSpeedyDelete",
            label: "Open user talk page when deleting under these criteria",
            adminOnly: true,
            type: "set",
            setValues: Twinkle.config.commonSets.csdAndDICriteria,
            setDisplayOrder: Twinkle.config.commonSets.csdAndDICriteriaDisplayOrder
        },

        // TwinkleConfig.deleteTalkPageOnDelete (boolean)
        // If talk page if exists should also be deleted (CSD G8) when spedying a page (admin only)
        {
            name: "deleteTalkPageOnDelete",
            label: "Check the \"also delete talk page\" box by default",
            adminOnly: true,
            type: "boolean"
        },

        // TwinkleConfig.deleteSysopDefaultToTag (boolean)
        // Make the CSD screen default to "tag" instead of "delete" (admin only)
        {
            name: "deleteSysopDefaultToTag",
            label: "Default to speedy tagging instead of outright deletion",
            adminOnly: true,
            type: "boolean"
        },

        // TwinkleConfig.speedyWindowWidth (integer)
        // Defines the width of the Twinkle SD window in pixels
        {
            name: "speedyWindowWidth",
            label: "Width of speedy deletion window (pixels)",
            type: "integer"
        },

        // TwinkleConfig.speedyWindowWidth (integer)
        // Defines the width of the Twinkle SD window in pixels
        {
            name: "speedyWindowHeight",
            label: "Height of speedy deletion window (pixels)",
            helptip: "If you have a big monitor, you might like to increase this.",
            type: "integer"
        },

        {
            name: "logSpeedyNominations",
            label: "Keep a log in userspace of all CSD nominations",
            helptip: "Since non-admins do not have access to their deleted contributions, the userspace log offers a good way to keep track of all pages you nominate for CSD using Twinkle. Files tagged using DI are also added to this log.",
            type: "boolean"
        },
        {
            name: "speedyLogPageName",
            label: "Keep the CSD userspace log at this user subpage",
            helptip: "i.e. User:<i>username</i>/<i>subpage name</i>. Only works if you turn on the CSD userspace log.",
            type: "string"
        },
        {
            name: "noLogOnSpeedyNomination",
            label: "Do not create a userspace log entry when tagging with these criteria",
            type: "set",
            setValues: Twinkle.config.commonSets.csdAndDICriteria,
            setDisplayOrder: Twinkle.config.commonSets.csdAndDICriteriaDisplayOrder
        }
    ]
},

{
    title: "Tag",
    inFriendlyConfig: true,
    preferences: [
        {
            name: "watchTaggedPages",
            label: "Add page to watchlist when tagging",
            type: "boolean"
        },
        {
            name: "markTaggedPagesAsMinor",
            label: "Mark addition of tags as a minor edit",
            type: "boolean"
        },
        {
            name: "markTaggedPagesAsPatrolled",
            label: "Mark pages as patrolled when tagging (if possible)",
            helptip: "Due to technical limitations, pages are only marked as patrolled when they are reached via Special:NewPages.",
            type: "boolean"
        },
        {
            name: "groupByDefault",
            label: "Check the \"group into {{multiple issues}}\" box by default",
            type: "boolean"
        },
        {
            name: "tagArticleSortOrder",
            label: "Default view order for article tags",
            type: "enum",
            enumValues: { "cat": "By categories", "alpha": "In alphabetical order" }
        },
        {
            name: "customTagList",
            label: "Custom article maintenance tags to display",
            helptip: "These appear as additional options at the bottom of the list of tags. For example, you could add new maintenance tags which have not yet been added to Twinkle's defaults.",
            type: "customList",
            customListValueTitle: "Template name (no curly brackets)",
            customListLabelTitle: "Text to show in Welcome dialog"
        }
    ]
},

{
    title: "Talkback",
    inFriendlyConfig: true,
    preferences: [
        {
            name: "markTalkbackAsMinor",
            label: "Mark talkbacks as minor edits",
            type: "boolean"
        },
        {
            name: "insertTalkbackSignature",
            label: "Insert signature within talkbacks",
            type: "boolean"
        },
        {
            name: "talkbackHeading",
            label: "Section heading to use for talkbacks",
            type: "string"
        },
        {
            name: "adminNoticeHeading",
            label: "Section heading to use for administrators' noticeboard notices",
            type: "string"
        }
    ]
},

{
    title: "Unlink",
    preferences: [
        // TwinkleConfig.unlinkNamespaces (array)
        // In what namespaces unlink should happen, default in 0 (article) and 100 (portal)
        {
            name: "unlinkNamespaces",
            label: "Remove links from pages in these namespaces",
            helptip: "Avoid selecting any talk namespaces, as Twinkle might end up unlinking on talk archives (a big no-no).",
            type: "set",
            setValues: Twinkle.config.commonSets.namespacesNoSpecial
        }
    ]
},

{
    title: "Warn user",
    preferences: [
        // TwinkleConfig.defaultWarningGroup (int)
        // if true, watch the page which has been dispatched an warning or notice, if false, default applies
        {
            name: "defaultWarningGroup",
            label: "Default warning level",
            type: "enum",
            enumValues: { "1": "Level 1", "2": "Level 2", "3": "Level 3", "4": "Level 4", "5": "Level 4im", "6": "Single-issue notices", "7": "Single-issue warnings", "8": "Block (admin only)" }
        },

        // TwinkleConfig.showSharedIPNotice may take arguments:
        // true: to show shared ip notice if an IP address
        // false: to not print the notice
        {
            name: "showSharedIPNotice",
            label: "Add extra notice on shared IP talk pages",
            helptip: "Notice used is {{<a href='" + mw.util.wikiGetlink("Template:SharedIPAdvice") + "'>SharedIPAdvice</a>}}",
            type: "boolean"
        },

        // TwinkleConfig.watchWarnings (boolean)
        // if true, watch the page which has been dispatched an warning or notice, if false, default applies
        {
            name: "watchWarnings",
            label: "Add user talk page to watchlist when notifying",
            type: "boolean"
        },

        // TwinkleConfig.blankTalkpageOnIndefBlock (boolean)
        // if true, blank the talk page when issuing an indef block notice (per [[WP:UW#Indefinitely blocked users]])
        {
            name: "blankTalkpageOnIndefBlock",
            label: "Blank the talk page when indefinitely blocking users",
            helptip: "See <a href=\"" + mw.util.wikiGetlink("WP:UW#Indefinitely blocked users") + "\">WP:UW</a> for more information.",
            adminOnly: true,
            type: "boolean"
        }
    ]
},

{
    title: "Welcome user",
    inFriendlyConfig: true,
    preferences: [
        {
            name: "topWelcomes",
            label: "Place welcomes above existing content on user talk pages",
            type: "boolean"
        },
        {
            name: "watchWelcomes",
            label: "Add user talk pages to watchlist when welcoming",
            helptip: "Doing so adds to the personal element of welcoming a user - you will be able to see how they are coping as a newbie, and possibly help them.",
            type: "boolean"
        },
        {
            name: "insertHeadings",
            label: "Insert a section heading before welcomes",
            type: "boolean"
        },
        {
            name: "welcomeHeading",
            label: "Section heading to use for welcomes",
            helptip: "Only has an effect if headings are enabled, and the heading is not part of the template.",
            type: "string"
        },
        {
            name: "insertUsername",
            label: "Add your username to the template (where applicable)",
            helptip: "Some welcome templates have an opening sentence like \"Hi, I'm &lt;username&gt;. Welcome\" etc. If you turn off this option, these templates will not display your username in that way.",
            type: "boolean"
        },
        {
            name: "insertSignature",
            label: "Add your signature after the welcome",
            helptip: "Strongly recommended.",
            type: "boolean"
        },
        {
            name: "markWelcomesAsMinor",
            label: "Mark welcomes as minor edits",
            type: "boolean"
        },
        {
            name: "maskTemplateInSummary",
            label: "Omit the name of the welcome template in the edit summary",
            helptip: "The names of some of the templates (e.g. \"welcome-anon-vandal\") may be viewed by the user as attacks, so it is better to leave them out of the edit summary",
            type: "boolean"
        },
        {
            name: "quickWelcomeMode",
            label: "Clicking the \"welcome\" link on a diff page will",
            helptip: "If you choose to welcome automatically, the template you specify below will be used.",
            type: "enum",
            enumValues: { auto: "welcome automatically", norm: "prompt you to select a template" }
        },
        {
            name: "quickWelcomeTemplate",
            label: "Template to use when welcoming automatically",
            helptip: "Enter the name of a welcome template, without the curly brackets. A link to the given article will be added.",
            type: "string"
        },
        {
            name: "customWelcomeList",
            label: "Custom welcome templates to display",
            helptip: "You can add other welcome templates, or user subpages that are welcome templates (prefixed with \"User:\"). Don't forget that these templates are substituted onto user talk pages.",
            type: "customList",
            customListValueTitle: "Template name (no curly brackets)",
            customListLabelTitle: "Text to show in Welcome dialog"
        }
    ]
},

{
    title: "XFD (deletion discussions)",
    preferences: [
        // TwinkleConfig.xfdWatchPage (string)
        // The watchlist setting of the page being nominated for XfD. Either "yes" (add to watchlist), "no" (don't
        // add to watchlist), or "default" (use setting from preferences). Default is "default" (duh).
        {
            name: "xfdWatchPage",
            label: "Add the nominated page to watchlist",
            type: "enum",
            enumValues: Twinkle.config.commonEnums.watchlist
        },

        // TwinkleConfig.xfdWatchDiscussion (string)
        // The watchlist setting of the newly created XfD page (for those processes that create discussion pages for each nomination),
        // or the list page for the other processes.
        // Either "yes" (add to watchlist), "no" (don't add to watchlist), or "default" (use setting from preferences). Default is "default" (duh).
        {
            name: "xfdWatchDiscussion",
            label: "Add the deletion discussion page to watchlist",
            helptip: "This refers to the discussion subpage (for AfD and MfD) or the daily log page (for TfD, CfD, RfD and FfD)",
            type: "enum",
            enumValues: Twinkle.config.commonEnums.watchlist
        },

        // TwinkleConfig.xfdWatchList (string)
        // The watchlist setting of the XfD list page, *if* the discussion is on a separate page. Either "yes" (add to watchlist), "no" (don't
        // add to watchlist), or "default" (use setting from preferences). Default is "no" (Hehe. Seriously though, who wants to watch it?
        // Sorry in advance for any false positives.).
        {
            name: "xfdWatchList",
            label: "Add the daily log/list page to the watchlist (where applicable)",
            helptip: "This only applies for AfD and MfD, where the discussions are transcluded onto a daily log page (for AfD) or the main MfD page (for MfD).",
            type: "enum",
            enumValues: Twinkle.config.commonEnums.watchlist
        },

        // TwinkleConfig.xfdWatchUser (string)
        // The watchlist setting of the user if he receives a notification. Either "yes" (add to watchlist), "no" (don't
        // add to watchlist), or "default" (use setting from preferences). Default is "default" (duh).
        {
            name: "xfdWatchUser",
            label: "Add the user talk page to watchlist (when notifying)",
            type: "enum",
            enumValues: Twinkle.config.commonEnums.watchlist
        }
    ]
},

{
    title: "Hidden",
    hidden: true,
    preferences: [
        // twinkle.header.js: portlet setup
        {
            name: "portletArea",
            type: "string"
        },
        {
            name: "portletId",
            type: "string"
        },
        {
            name: "portletName",
            type: "string"
        },
        {
            name: "portletType",
            type: "string"
        },
        {
            name: "portletNext",
            type: "string"
        },
        // twinklefluff.js: defines how many revision to query maximum, maximum possible is 50, default is 50
        {
            name: "revertMaxRevisions",
            type: "integer"
        },
        // twinklebatchdelete.js: How many pages should be processed at a time
        {
            name: "batchdeleteChunks",
            type: "integer"
        },
        // twinklebatchdelete.js: How many pages left in the process of being completed should allow a new batch to be initialized
        {
            name: "batchDeleteMinCutOff",
            type: "integer"
        },
        // twinklebatchdelete.js: How many pages should be processed maximum
        {
            name: "batchMax",
            type: "integer"
        },
        // twinklebatchprotect.js: How many pages should be processed at a time
        {
            name: "batchProtectChunks",
            type: "integer"
        },
        // twinklebatchprotect.js: How many pages left in the process of being completed should allow a new batch to be initialized
        {
            name: "batchProtectMinCutOff",
            type: "integer"
        },
        // twinklebatchundelete.js: How many pages should be processed at a time
        {
            name: "batchundeleteChunks",
            type: "integer"
        },
        // twinklebatchundelete.js: How many pages left in the process of being completed should allow a new batch to be initialized
        {
            name: "batchUndeleteMinCutOff",
            type: "integer"
        },
        // twinkledelimages.js: How many files should be processed at a time
        {
            name: "deliChunks",
            type: "integer"
        },
        // twinkledelimages.js: How many files should be processed maximum
        {
            name: "deliMax",
            type: "integer"
        },
        // twinkledeprod.js: How many pages should be processed at a time
        {
            name: "proddeleteChunks",
            type: "integer"
        }
    ]
}

]; // end of Twinkle.config.sections

//{
//            name: "",
//            label: "",
//            type: ""
//        },


Twinkle.config.init = function twinkleconfigInit() {

    if ((mw.config.get("wgPageName") === "Wikipedia:Twinkle/Preferences" ||
        (mw.config.get("wgNamespaceNumber") === 2 && mw.config.get("wgTitle").lastIndexOf("/Twinkle preferences") === (mw.config.get("wgTitle").length - 20))) &&
        mw.config.get("wgAction") === "view") {
        // create the config page at Wikipedia:Twinkle/Preferences, and at user subpages (for testing purposes)

        if (!document.getElementById("twinkle-config")) {
            return;  // maybe the page is misconfigured, or something - but any attempt to modify it will be pointless
        }

        // set style (the url() CSS function doesn't seem to work from wikicode - ?!)
        document.getElementById("twinkle-config-titlebar").style.backgroundImage = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAkCAMAAAB%2FqqA%2BAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAEhQTFRFr73ZobTPusjdsMHZp7nVwtDhzNbnwM3fu8jdq7vUt8nbxtDkw9DhpbfSvMrfssPZqLvVztbno7bRrr7W1d%2Fs1N7qydXk0NjpkW7Q%2BgAAADVJREFUeNoMwgESQCAAAMGLkEIi%2FP%2BnbnbpdB59app5Vdg0sXAoMZCpGoFbK6ciuy6FX4ABAEyoAef0BXOXAAAAAElFTkSuQmCC)";

        var contentdiv = document.getElementById("twinkle-config-content");
        contentdiv.textContent = "";  // clear children

        // let user know about possible conflict with monobook.js/vector.js file
        // (settings in that file will still work, but they will be overwritten by twinkleoptions.js settings)
        var contentnotice = document.createElement("p");
        // I hate innerHTML, but this is one thing it *is* good for...
        contentnotice.innerHTML = "<b>Before modifying your preferences here,</b> make sure you have removed any old <code>TwinkleConfig</code> and <code>FriendlyConfig</code> settings from your <a href=\"" + mw.util.wikiGetlink("Special:MyPage/skin.js") + "\" title=\"Special:MyPage/skin.js\">user JavaScript file</a>.";
        contentdiv.appendChild(contentnotice);

        // look and see if the user does in fact have any old settings in their skin JS file
        var skinjs = new Wikipedia.page("User:" + mw.config.get("wgUserName") + "/" + mw.config.get("skin") + ".js");
        skinjs.setCallbackParameters(contentnotice);
        skinjs.load(Twinkle.config.legacyPrefsNotice);

        // start a table of contents
        var toctable = document.createElement("table");
        toctable.className = "toc";
        toctable.style.marginLeft = "0.4em";
        var toctr = document.createElement("tr");
        var toctd = document.createElement("td");
        // create TOC title
        var toctitle = document.createElement("div");
        toctitle.id = "toctitle";
        var toch2 = document.createElement("h2");
        toch2.textContent = "Contents ";
        toctitle.appendChild(toch2);
        // add TOC show/hide link
        var toctoggle = document.createElement("span");
        toctoggle.className = "toctoggle";
        toctoggle.appendChild(document.createTextNode("["));
        var toctogglelink = document.createElement("a");
        toctogglelink.className = "internal";
        toctogglelink.setAttribute("href", "#tw-tocshowhide");
        toctogglelink.textContent = "hide";
        toctoggle.appendChild(toctogglelink);
        toctoggle.appendChild(document.createTextNode("]"));
        toctitle.appendChild(toctoggle);
        toctd.appendChild(toctitle);
        // create item container: this is what we add stuff to
        var tocul = document.createElement("ul");
        toctogglelink.addEventListener("click", function twinkleconfigTocToggle() {
            var $tocul = $(tocul);
            $tocul.toggle();
            if ($tocul.find(":visible").length) {
                toctogglelink.textContent = "hide";
            } else {
                toctogglelink.textContent = "show";
            }
        }, false);
        toctd.appendChild(tocul);
        toctr.appendChild(toctd);
        toctable.appendChild(toctr);
        contentdiv.appendChild(toctable);

        var tocnumber = 1;

        var contentform = document.createElement("form");
        contentform.setAttribute("action", "javascript:void(0)");  // was #tw-save - changed to void(0) to work around Chrome issue
        contentform.addEventListener("submit", Twinkle.config.save, true);
        contentdiv.appendChild(contentform);

        var container = document.createElement("table");
        container.style.width = "100%";
        contentform.appendChild(container);

        $(Twinkle.config.sections).each(function(sectionkey, section) {
            if (section.hidden || (section.adminOnly && !userIsInGroup("sysop"))) {
                return true;  // i.e. "continue" in this context
            }

            var configgetter;  // retrieve the live config values
            if (section.inFriendlyConfig) {
                configgetter = Twinkle.getFriendlyPref;
            } else {
                configgetter = Twinkle.getPref;
            }

            // add to TOC
            var tocli = document.createElement("li");
            tocli.className = "toclevel-1";
            var toca = document.createElement("a");
            toca.setAttribute("href", "#twinkle-config-section-" + tocnumber.toString());
            toca.appendChild(document.createTextNode(section.title));
            tocli.appendChild(toca);
            tocul.appendChild(tocli);

            var row = document.createElement("tr");
            var cell = document.createElement("td");
            cell.setAttribute("colspan", "3");
            var heading = document.createElement("h4");
            heading.style.borderBottom = "1px solid gray";
            heading.style.marginTop = "0.2em";
            heading.id = "twinkle-config-section-" + (tocnumber++).toString();
            heading.appendChild(document.createTextNode(section.title));
            cell.appendChild(heading);
            row.appendChild(cell);
            container.appendChild(row);

            var rowcount = 1;  // for row banding

            // add each of the preferences to the form
            $(section.preferences).each(function(prefkey, pref) {
                if (pref.adminOnly && !userIsInGroup("sysop")) {
                    return true;  // i.e. "continue" in this context
                }

                row = document.createElement("tr");
                row.style.marginBottom = "0.2em";
                // create odd row banding
                if (rowcount++ % 2 === 0) {
                    row.style.backgroundColor = "rgba(128, 128, 128, 0.1)";
                }
                cell = document.createElement("td");

                var label, input;
                switch (pref.type) {

                    case "boolean":  // create a checkbox
                        cell.setAttribute("colspan", "2");

                        label = document.createElement("label");
                        input = document.createElement("input");
                        input.setAttribute("type", "checkbox");
                        input.setAttribute("id", pref.name);
                        input.setAttribute("name", pref.name);
                        if (configgetter(pref.name) === true) {
                            input.setAttribute("checked", "checked");
                        }
                        label.appendChild(input);
                        label.appendChild(document.createTextNode(" " + pref.label));
                        cell.appendChild(label);
                        break;

                    case "string":  // create an input box
                    case "integer":
                        // add label to first column
                        cell.style.textAlign = "right";
                        cell.style.paddingRight = "0.5em";
                        label = document.createElement("label");
                        label.setAttribute("for", pref.name);
                        label.appendChild(document.createTextNode(pref.label + ":"));
                        cell.appendChild(label);
                        row.appendChild(cell);

                        // add input box to second column
                        cell = document.createElement("td");
                        cell.style.paddingRight = "1em";
                        input = document.createElement("input");
                        input.setAttribute("type", "text");
                        input.setAttribute("id", pref.name);
                        input.setAttribute("name", pref.name);
                        if (pref.type === "integer") {
                            input.setAttribute("size", 6);
                            input.setAttribute("type", "number");
                            input.setAttribute("step", "1");  // integers only
                        }
                        if (configgetter(pref.name)) {
                            input.setAttribute("value", configgetter(pref.name));
                        }
                        cell.appendChild(input);
                        break;

                    case "enum":  // create a combo box
                        // add label to first column
                        // note: duplicates the code above, under string/integer
                        cell.style.textAlign = "right";
                        cell.style.paddingRight = "0.5em";
                        label = document.createElement("label");
                        label.setAttribute("for", pref.name);
                        label.appendChild(document.createTextNode(pref.label + ":"));
                        cell.appendChild(label);
                        row.appendChild(cell);

                        // add input box to second column
                        cell = document.createElement("td");
                        cell.style.paddingRight = "1em";
                        input = document.createElement("select");
                        input.setAttribute("id", pref.name);
                        input.setAttribute("name", pref.name);
                        $.each(pref.enumValues, function(enumvalue, enumdisplay) {
                            var option = document.createElement("option");
                            option.setAttribute("value", enumvalue);
                            if (configgetter(pref.name) == enumvalue) {
                                option.setAttribute("selected", "selected");
                            }
                            option.appendChild(document.createTextNode(enumdisplay));
                            input.appendChild(option);
                        });
                        cell.appendChild(input);
                        break;

                    case "set":  // create a set of check boxes
                        // add label first of all
                        cell.setAttribute("colspan", "2");
                        label = document.createElement("label");  // not really necessary to use a label element here, but we do it for consistency of styling
                        label.appendChild(document.createTextNode(pref.label + ":"));
                        cell.appendChild(label);

                        var checkdiv = document.createElement("div");
                        checkdiv.style.paddingLeft = "1em";
                        var worker = function(itemkey, itemvalue) {
                            var checklabel = document.createElement("label");
                            checklabel.style.marginRight = "0.7em";
                            checklabel.style.display = "inline-block";
                            var check = document.createElement("input");
                            check.setAttribute("type", "checkbox");
                            check.setAttribute("id", pref.name + "_" + itemkey);
                            check.setAttribute("name", pref.name + "_" + itemkey);
                            if (configgetter(pref.name) && configgetter(pref.name).indexOf(itemkey) !== -1) {
                                check.setAttribute("checked", "checked");
                            }
                            // cater for legacy integer array values for unlinkNamespaces (this can be removed a few years down the track...)
                            if (pref.name === "unlinkNamespaces") {
                                if (configgetter(pref.name) && configgetter(pref.name).indexOf(parseInt(itemkey, 10)) !== -1) {
                                    check.setAttribute("checked", "checked");
                                }
                            }
                            checklabel.appendChild(check);
                            checklabel.appendChild(document.createTextNode(itemvalue));
                            checkdiv.appendChild(checklabel);
                        };
                        if (pref.setDisplayOrder) {
                            // add check boxes according to the given display order
                            $.each(pref.setDisplayOrder, function(itemkey, item) {
                                worker(item, pref.setValues[item]);
                            });
                        } else {
                            // add check boxes according to the order it gets fed to us (probably strict alphabetical)
                            $.each(pref.setValues, worker);
                        }
                        cell.appendChild(checkdiv);
                        break;

                    case "customList":
                        // add label to first column
                        cell.style.textAlign = "right";
                        cell.style.paddingRight = "0.5em";
                        label = document.createElement("label");
                        label.setAttribute("for", pref.name);
                        label.appendChild(document.createTextNode(pref.label + ":"));
                        cell.appendChild(label);
                        row.appendChild(cell);

                        // add button to second column
                        cell = document.createElement("td");
                        cell.style.paddingRight = "1em";
                        var button = document.createElement("button");
                        button.setAttribute("id", pref.name);
                        button.setAttribute("name", pref.name);
                        button.setAttribute("type", "button");
                        button.addEventListener("click", Twinkle.config.listDialog.display, false);
                        // use jQuery data on the button to store the current config value
                        $(button).data({
                            value: configgetter(pref.name),
                            pref: pref,
                            inFriendlyConfig: section.inFriendlyConfig
                        });
                        button.appendChild(document.createTextNode("Edit items"));
                        cell.appendChild(button);
                        break;

                    default:
                        alert("twinkleconfig: unknown data type for preference " + pref.name);
                        break;
                }
                row.appendChild(cell);

                // add help tip
                cell = document.createElement("td");
                cell.style.fontSize = "90%";

                cell.style.color = "gray";
                if (pref.helptip) {
                    cell.innerHTML = pref.helptip;
                }
                // add reset link (custom lists don't need this, as their config value isn't displayed on the form)
                if (pref.type !== "customList") {
                    var resetlink = document.createElement("a");
                    resetlink.setAttribute("href", "#tw-reset");
                    resetlink.setAttribute("id", "twinkle-config-reset-" + pref.name);
                    resetlink.addEventListener("click", Twinkle.config.resetPrefLink, false);
                    if (resetlink.style.styleFloat) {  // IE (inc. IE9)
                        resetlink.style.styleFloat = "right";
                    } else {  // standards
                        resetlink.style.cssFloat = "right";
                    }
                    resetlink.style.margin = "0 0.6em";
                    resetlink.appendChild(document.createTextNode("Reset"));
                    cell.appendChild(resetlink);
                }
                row.appendChild(cell);

                container.appendChild(row);
                return true;
            });
            return true;
        });

        var footerbox = document.createElement("div");
        footerbox.setAttribute("id", "twinkle-config-buttonpane");
        footerbox.style.backgroundColor = "#BCCADF";
        footerbox.style.padding = "0.5em";
        var button = document.createElement("button");
        button.setAttribute("id", "twinkle-config-submit");
        button.setAttribute("type", "submit");
        button.appendChild(document.createTextNode("Save changes"));
        footerbox.appendChild(button);
        var footerspan = document.createElement("span");
        footerspan.className = "plainlinks";
        footerspan.style.marginLeft = "2.4em";
        footerspan.style.fontSize = "90%";
        var footera = document.createElement("a");
        footera.setAttribute("href", "#tw-reset-all");
        footera.setAttribute("id", "twinkle-config-resetall");
        footera.addEventListener("click", Twinkle.config.resetAllPrefs, false);
        footera.appendChild(document.createTextNode("Restore defaults"));
        footerspan.appendChild(footera);
        footerbox.appendChild(footerspan);
        contentform.appendChild(footerbox);

        // since all the section headers exist now, we can try going to the requested anchor
        if (location.hash) {
            location.hash = location.hash;
        }

    } else if (mw.config.get("wgNamespaceNumber") === 2) {

        var box = document.createElement("div");
        box.setAttribute("id", "twinkle-config-headerbox");
        box.style.border = "1px #f60 solid";
        box.style.background = "#fed";
        box.style.padding = "0.6em";
        box.style.margin = "0.5em auto";
        box.style.textAlign = "center";

        var link;
        if (mw.config.get("wgTitle") === mw.config.get("wgUserName") + "/twinkleoptions.js") {
            // place "why not try the preference panel" notice
            box.style.fontWeight = "bold";
            box.style.width = "80%";
            box.style.borderWidth = "2px";

            if (mw.config.get("wgArticleId") > 0) {  // page exists
                box.appendChild(document.createTextNode("This page contains your Twinkle preferences. You can change them using the "));
            } else {  // page does not exist
                box.appendChild(document.createTextNode("You can customize Twinkle to suit your preferences by using the "));
            }
            link = document.createElement("a");
            link.setAttribute("href", mw.util.wikiGetlink("Wikipedia:Twinkle/Preferences") );
            link.appendChild(document.createTextNode("Twinkle preferences panel"));
            box.appendChild(link);
            box.appendChild(document.createTextNode(", or by editing this page."));
            $(box).insertAfter($("#contentSub"));

        } else if (mw.config.get("wgTitle").indexOf(mw.config.get("wgUserName")) === 0 && mw.config.get("wgTitle").lastIndexOf(".js") == mw.config.get("wgTitle").length - 3) {
            // place "Looking for Twinkle options?" notice
            box.style.width = "60%";

            box.appendChild(document.createTextNode("If you want to set Twinkle preferences, you can use the "));
            link = document.createElement("a");
            link.setAttribute("href", mw.util.wikiGetlink("Wikipedia:Twinkle/Preferences") );
            link.appendChild(document.createTextNode("Twinkle preferences panel"));
            box.appendChild(link);
            box.appendChild(document.createTextNode("."));
            $(box).insertAfter($("#contentSub"));
        }
    }
};

// Wikipedia.page callback from init code
Twinkle.config.legacyPrefsNotice = function twinkleconfigLegacyPrefsNotice(pageobj) {
    var text = pageobj.getPageText();
    var contentnotice = pageobj.getCallbackParameters();
    if (text.indexOf("TwinkleConfig") !== -1 || text.indexOf("FriendlyConfig") !== -1) {
        contentnotice.innerHTML = '<table class="plainlinks ombox ombox-content"><tr><td class="mbox-image">' +
            '<img alt="" src="http://upload.wikimedia.org/wikipedia/en/3/38/Imbox_content.png" /></td>' +
            '<td class="mbox-text"><p><big><b>Before modifying your settings here,</b> you must remove your old Twinkle and Friendly settings from your personal skin JavaScript.</big></p>' +
            '<p>To do this, you can <a href="' + mw.config.get("wgScript") + '?title=User:' + encodeURIComponent(mw.config.get("wgUserName")) + '/' + mw.config.get("skin") + '.js&action=edit" target="_tab"><b>edit your personal JavaScript</b></a>, removing all lines of code that refer to <code>TwinkleConfig</code> and <code>FriendlyConfig</code>.</p>' +
            '</td></tr></table>';
    } else {
        $(contentnotice).remove();
    }
};

// custom list-related stuff

Twinkle.config.listDialog = {};

Twinkle.config.listDialog.addRow = function twinkleconfigListDialogAddRow(dlgtable, value, label) {
    var contenttr = document.createElement("tr");
    // "remove" button
    var contenttd = document.createElement("td");
    var removeButton = document.createElement("button");
    removeButton.setAttribute("type", "button");
    removeButton.addEventListener("click", function() { $(contenttr).remove(); }, false);
    removeButton.textContent = "Remove";
    contenttd.appendChild(removeButton);
    contenttr.appendChild(contenttd);

    // value input box
    contenttd = document.createElement("td");
    var input = document.createElement("input");
    input.setAttribute("type", "text");
    input.className = "twinkle-config-customlist-value";
    input.style.width = "97%";
    if (value) {
        input.setAttribute("value", value);
    }
    contenttd.appendChild(input);
    contenttr.appendChild(contenttd);

    // label input box
    contenttd = document.createElement("td");
    input = document.createElement("input");
    input.setAttribute("type", "text");
    input.className = "twinkle-config-customlist-label";
    input.style.width = "98%";
    if (label) {
        input.setAttribute("value", label);
    }
    contenttd.appendChild(input);
    contenttr.appendChild(contenttd);

    dlgtable.appendChild(contenttr);
};

Twinkle.config.listDialog.display = function twinkleconfigListDialogDisplay(e) {
    var $prefbutton = $(e.target);
    var curvalue = $prefbutton.data("value");
    var curpref = $prefbutton.data("pref");

    var dialog = new SimpleWindow(720, 400);
    dialog.setTitle(curpref.label);
    dialog.setScriptName("Twinkle preferences");

    var dialogcontent = document.createElement("div");
    var dlgtable = document.createElement("table");
    dlgtable.className = "wikitable";
    dlgtable.style.margin = "1.4em 1em";
    dlgtable.style.width = "auto";

    var dlgtbody = document.createElement("tbody");

    // header row
    var dlgtr = document.createElement("tr");
    // top-left cell
    var dlgth = document.createElement("th");
    dlgth.style.width = "5%";
    dlgtr.appendChild(dlgth);
    // value column header
    dlgth = document.createElement("th");
    dlgth.style.width = "35%";
    dlgth.textContent = (curpref.customListValueTitle ? curpref.customListValueTitle : "Value");
    dlgtr.appendChild(dlgth);
    // label column header
    dlgth = document.createElement("th");
    dlgth.style.width = "60%";
    dlgth.textContent = (curpref.customListLabelTitle ? curpref.customListLabelTitle : "Label");
    dlgtr.appendChild(dlgth);
    dlgtbody.appendChild(dlgtr);

    // content rows
    var gotRow = false;
    $.each(curvalue, function(k, v) {
        gotRow = true;
        Twinkle.config.listDialog.addRow(dlgtbody, v.value, v.label);
    });
    // if there are no values present, add a blank row to start the user off
    if (!gotRow) {
        Twinkle.config.listDialog.addRow(dlgtbody);
    }

    // final "add" button
    var dlgtfoot = document.createElement("tfoot");
    dlgtr = document.createElement("tr");
    var dlgtd = document.createElement("td");
    dlgtd.setAttribute("colspan", "3");
    var addButton = document.createElement("button");
    addButton.style.minWidth = "8em";
    addButton.setAttribute("type", "button");
    addButton.addEventListener("click", function(e) {
        Twinkle.config.listDialog.addRow(dlgtbody);
    }, false);
    addButton.textContent = "Add";
    dlgtd.appendChild(addButton);
    dlgtr.appendChild(dlgtd);
    dlgtfoot.appendChild(dlgtr);

    dlgtable.appendChild(dlgtbody);
    dlgtable.appendChild(dlgtfoot);
    dialogcontent.appendChild(dlgtable);

    // buttonpane buttons: [Save changes] [Reset] [Cancel]
    var button = document.createElement("button");
    button.setAttribute("type", "submit");  // so SimpleWindow puts the button in the button pane
    button.addEventListener("click", function(e) {
        Twinkle.config.listDialog.save($prefbutton, dlgtbody);
        dialog.close();
    }, false);
    button.textContent = "Save changes";
    dialogcontent.appendChild(button);
    button = document.createElement("button");
    button.setAttribute("type", "submit");  // so SimpleWindow puts the button in the button pane
    button.addEventListener("click", function(e) {
        Twinkle.config.listDialog.reset($prefbutton, dlgtbody);
    }, false);
    button.textContent = "Reset";
    dialogcontent.appendChild(button);
    button = document.createElement("button");
    button.setAttribute("type", "submit");  // so SimpleWindow puts the button in the button pane
    button.addEventListener("click", function(e) {
        dialog.close();  // the event parameter on this function seems to be broken
    }, false);
    button.textContent = "Cancel";
    dialogcontent.appendChild(button);

    dialog.setContent(dialogcontent);
    dialog.display();
};

// Resets the data value, re-populates based on the new (default) value, then saves the
// old data value again (less surprising behaviour)
Twinkle.config.listDialog.reset = function twinkleconfigListDialogReset(button, tbody) {
    // reset value on button
    var $button = $(button);
    var curpref = $button.data("pref");
    var oldvalue = $button.data("value");
    Twinkle.config.resetPref(curpref, $button.data("inFriendlyConfig"));

    // reset form
    var $tbody = $(tbody);
    $tbody.find("tr").slice(1).remove();  // all rows except the first (header) row
    // add the new values
    var curvalue = $button.data("value");
    $.each(curvalue, function(k, v) {
        Twinkle.config.listDialog.addRow(tbody, v.value, v.label);
    });

    // save the old value
    $button.data("value", oldvalue);
};

Twinkle.config.listDialog.save = function twinkleconfigListDialogSave(button, tbody) {
    var result = [];
    var current = {};
    $(tbody).find('input[type="text"]').each(function(inputkey, input) {
        if ($(input).hasClass("twinkle-config-customlist-value")) {
            current = { value: input.value };
        } else {
            current.label = input.value;
            // exclude totally empty rows
            if (current.value || current.label) {
                result.push(current);
            }
        }
    });
    $(button).data("value", result);
};

// reset/restore defaults

Twinkle.config.resetPrefLink = function twinkleconfigResetPrefLink(e) {
    var wantedpref = e.target.id.substring(21); // "twinkle-config-reset-" prefix is stripped

    // search tactics
    $(Twinkle.config.sections).each(function(sectionkey, section) {
        if (section.hidden || (section.adminOnly && !userIsInGroup("sysop"))) {
            return true;  // continue: skip impossibilities
        }

        var foundit = false;

        $(section.preferences).each(function(prefkey, pref) {
            if (pref.name !== wantedpref) {
                return true;  // continue
            }
            Twinkle.config.resetPref(pref, section.inFriendlyConfig);
            foundit = true;
            return false;  // break
        });

        if (foundit) {
            return false;  // break
        }
    });
    return false;  // stop link from scrolling page
};

Twinkle.config.resetPref = function twinkleconfigResetPref(pref, inFriendlyConfig) {
    switch (pref.type) {

        case "boolean":
            document.getElementById(pref.name).checked = (inFriendlyConfig ?
                Twinkle.defaultConfig.friendly[pref.name] : Twinkle.defaultConfig.twinkle[pref.name]);
            break;

        case "string":
        case "integer":
        case "enum":
            document.getElementById(pref.name).value = (inFriendlyConfig ?
                Twinkle.defaultConfig.friendly[pref.name] : Twinkle.defaultConfig.twinkle[pref.name]);
            break;

        case "set":
            $.each(pref.setValues, function(itemkey, itemvalue) {
                if (document.getElementById(pref.name + "_" + itemkey)) {
                    document.getElementById(pref.name + "_" + itemkey).checked = ((inFriendlyConfig ?
                        Twinkle.defaultConfig.friendly[pref.name] : Twinkle.defaultConfig.twinkle[pref.name]).indexOf(itemkey) !== -1);
                }
            });
            break;

        case "customList":
            $(document.getElementById(pref.name)).data("value", (inFriendlyConfig ?
                Twinkle.defaultConfig.friendly[pref.name] : Twinkle.defaultConfig.twinkle[pref.name]));
            break;

        default:
            alert("twinkleconfig: unknown data type for preference " + pref.name);
            break;
    }
};

Twinkle.config.resetAllPrefs = function twinkleconfigResetAllPrefs() {
    // no confirmation message - the user can just refresh/close the page to abort
    $(Twinkle.config.sections).each(function(sectionkey, section) {
        if (section.hidden || (section.adminOnly && !userIsInGroup("sysop"))) {
            return true;  // continue: skip impossibilities
        }
        $(section.preferences).each(function(prefkey, pref) {
            if (!pref.adminOnly || userIsInGroup("sysop")) {
                Twinkle.config.resetPref(pref, section.inFriendlyConfig);
            }
        });
        return true;
    });
    return false;  // stop link from scrolling page
};

Twinkle.config.save = function twinkleconfigSave(e) {
    Status.init( document.getElementById("twinkle-config-content") );

    Wikipedia.actionCompleted.notice = "Save";

    var userjs = "User:" + mw.config.get("wgUserName") + "/twinkleoptions.js";
    var wikipedia_page = new Wikipedia.page(userjs, "Saving preferences to " + userjs);
    wikipedia_page.setCallbackParameters(e.target);
    wikipedia_page.load(Twinkle.config.writePrefs);

    return false;
};

// The JSON stringify method in the following code was excerpted from
// http://www.JSON.org/json2.js
// version of 2011-02-23

// Douglas Crockford, the code's author, has released it into the Public Domain.
// See http://www.JSON.org/js.html

var JSON;
if (!JSON) {
    JSON = {};
}

(function() {
    var escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        gap,
        indent = '  ',  // hardcoded indent
        meta = { '\b': '\\b', '\t': '\\t', '\n': '\\n', '\f': '\\f', '\r': '\\r', '"' : '\\"', '\\': '\\\\' };

    function quote(string) {
        escapable.lastIndex = 0;
        return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
            var c = meta[a];
            return typeof c === 'string' ? c :    '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
        }) + '"' : '"' + string + '"';
    }

    function str(key, holder) {
        var i, k, v, length, mind = gap, partial, value = holder[key];

        if (value && typeof value === 'object' && typeof value.toJSON === 'function') {
            value = value.toJSON(key);
        }

        switch (typeof value) {
        case 'string':
            return quote(value);
        case 'number':
            return isFinite(value) ? String(value) : 'null';
        case 'boolean':
        case 'null':
            return String(value);
        case 'object':
            if (!value) {
                return 'null';
            }
            gap += indent;
            partial = [];
            if (Object.prototype.toString.apply(value) === '[object Array]') {
                length = value.length;
                for (i = 0; i < length; i += 1) {
                    partial[i] = str(i, value) || 'null';
                }
                v = partial.length === 0 ? '[]' : gap ?
                    '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']' :
                    '[' + partial.join(',') + ']';
                gap = mind;
                return v;
            }
            for (k in value) {
                if (Object.prototype.hasOwnProperty.call(value, k)) {
                    v = str(k, value);
                    if (v) {
                        partial.push(quote(k) + (gap ? ': ' : ':') + v);
                    }
                }
            }
            v = partial.length === 0 ? '{}' : gap ?
                '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}' :
                '{' + partial.join(',') + '}';
            gap = mind;
            return v;
        default:
            throw new Error( "JSON.stringify: unknown data type" );
        }
    }

    if (typeof JSON.stringify !== 'function') {
        JSON.stringify = function (value, ignoredParam1, ignoredParam2) {
            ignoredParam1 = ignoredParam2;  // boredom
            gap = '';
            return str('', {'': value});
        };
    }
}());

Twinkle.config.writePrefs = function twinkleconfigWritePrefs(pageobj) {
    var form = pageobj.getCallbackParameters();
    var statelem = pageobj.getStatusElement();

    // this is the object which gets serialized into JSON
    var newConfig = {
        twinkle: {},
        friendly: {}
    };

    // keeping track of all preferences that we encounter
    // any others that are set in the user's current config are kept
    // this way, preferences that this script doesn't know about are not lost
    // (it does mean obsolete prefs will never go away, but... ah well...)
    var foundTwinklePrefs = [], foundFriendlyPrefs = [];

    // a comparison function is needed later on
    // it is just enough for our purposes (i.e. comparing strings, numbers, booleans,
    // arrays of strings, and arrays of { value, label })
    // and it is not very robust: e.g. compare([2], ["2"]) === true, and
    // compare({}, {}) === false, but it's good enough for our purposes here
    var compare = function(a, b) {
        if (Object.prototype.toString.apply(a) === "[object Array]") {
            if (a.length !== b.length) {
                return false;
            }
            var asort = a.sort(), bsort = b.sort();
            for (var i = 0; asort[i]; i++) {
                // comparison of the two properties of custom lists
                if ((typeof asort[i] === "object") && (asort[i].label !== bsort[i].label ||
                    asort[i].value !== bsort[i].value)) {
                    return false;
                } else if (asort[i].toString() !== bsort[i].toString()) {
                    return false;
                }
            }
            return true;
        } else {
            return a === b;
        }
    };

    $(Twinkle.config.sections).each(function(sectionkey, section) {
        if (section.adminOnly && !userIsInGroup("sysop")) {
            return;  // i.e. "continue" in this context
        }

        // reach each of the preferences from the form
        $(section.preferences).each(function(prefkey, pref) {
            var userValue;  // = undefined

            // only read form values for those prefs that have them
            if (!section.hidden && (!pref.adminOnly || userIsInGroup("sysop"))) {
                switch (pref.type) {

                    case "boolean":  // read from the checkbox
                        userValue = form[pref.name].checked;
                        break;

                    case "string":  // read from the input box or combo box
                    case "enum":
                        userValue = form[pref.name].value;
                        break;

                    case "integer":  // read from the input box
                        userValue = parseInt(form[pref.name].value, 10);
                        if (isNaN(userValue)) {
                            Status.warn("Saving", "The value you specified for " + pref.name + " (" + pref.value + ") was invalid.  The save will continue, but the invalid data value will be skipped.");
                            userValue = null;
                        }
                        break;

                    case "set":  // read from the set of check boxes
                        userValue = [];
                        if (pref.setDisplayOrder) {
                            // read only those keys specified in the display order
                            $.each(pref.setDisplayOrder, function(itemkey, item) {
                                if (form[pref.name + "_" + item].checked) {
                                    userValue.push(item);
                                }
                            });
                        } else {
                            // read all the keys in the list of values
                            $.each(pref.setValues, function(itemkey, itemvalue) {
                                if (form[pref.name + "_" + itemkey].checked) {
                                    userValue.push(itemkey);
                                }
                            });
                        }
                        break;

                    case "customList":  // read from the jQuery data stored on the button object
                        userValue = $(form[pref.name]).data("value");
                        break;

                    default:
                        alert("twinkleconfig: unknown data type for preference " + pref.name);
                        break;
                }
            }

            // only save those preferences that are *different* from the default
            if (section.inFriendlyConfig) {
                if (typeof userValue !== "undefined" && !compare(userValue, Twinkle.defaultConfig.friendly[pref.name])) {
                    newConfig.friendly[pref.name] = userValue;
                }
                foundFriendlyPrefs.push(pref.name);
            } else {
                if (typeof userValue !== "undefined" && !compare(userValue, Twinkle.defaultConfig.twinkle[pref.name])) {
                    newConfig.twinkle[pref.name] = userValue;
                }
                foundTwinklePrefs.push(pref.name);
            }
        });
    });

    if (Twinkle.prefs) {
        $.each(Twinkle.prefs.twinkle, function(tkey, tvalue) {
            if (foundTwinklePrefs.indexOf(tkey) === -1) {
                newConfig.twinkle[tkey] = tvalue;
            }
        });
        $.each(Twinkle.prefs.friendly, function(fkey, fvalue) {
            if (foundFriendlyPrefs.indexOf(fkey) === -1) {
                newConfig.friendly[fkey] = fvalue;
            }
        });
    }

    var text =
        "// twinkleoptions.js: personal Twinkle preferences file\n" +
        "//\n" +
        "// NOTE: The easiest way to change your Twinkle preferences is by using the\n" +
        "// Twinkle preferences panel, at [[" + mw.config.get("wgPageName") + "]].\n" +
        "//\n" +
        "// This file is AUTOMATICALLY GENERATED.  Any changes you make (aside from\n" +
        "// changing the configuration parameters in a valid-JavaScript way) will be\n" +
        "// overwritten the next time you click \"save\" in the Twinkle preferences\n" +
        "// panel.  If modifying this file, make sure to use correct JavaScript.\n" +
        "\n" +
        "window.Twinkle.prefs = ";
    text += JSON.stringify(newConfig, null, 2);
    text +=
        ";\n" +
        "\n" +
        "// End of twinkleoptions.js\n";

    pageobj.setPageText(text);
    pageobj.setEditSummary("Saving Twinkle preferences: automatic edit from [[" + mw.config.get("wgPageName") + "]] ([[WP:TW|TW]])");
    pageobj.setCreateOption("recreate");
    pageobj.save(Twinkle.config.saveSuccess);
};

Twinkle.config.saveSuccess = function twinkleconfigSaveSuccess(pageobj) {
    pageobj.getStatusElement().info("successful");

    var noticebox = document.createElement("div");
    noticebox.className = "successbox";
    noticebox.style.fontSize = "100%";
    noticebox.style.marginTop = "2em";
    noticebox.innerHTML = "<p><b>Your Twinkle preferences have been saved.</b></p><p>To see the changes, you will need to <a href=\"" + mw.util.wikiGetlink("WP:BYPASS") + "\" title=\"WP:BYPASS\"><b>bypass your browser cache</b></a>.</p>";
    Status.root.appendChild(noticebox);
    var noticeclear = document.createElement("br");
    noticeclear.style.clear = "both";
    Status.root.appendChild(noticeclear);
};

/*
****************************************
*** twinkledelimages.js: Batch deletion of images (sysops only)
****************************************
* Mode of invocation:     Tab ("Deli-batch")
* Active on:              Existing non-special pages
* Config directives in:   TwinkleConfig
*/

Twinkle.delimages = function twinkledeli() {
    if( mw.config.get( 'wgNamespaceNumber' ) < 0 || !mw.config.get( 'wgCurRevisionId' ) ) {
        return;
    }
    if( userIsInGroup( 'sysop' ) ) {
        $(twAddPortletLink("#", "Deli-batch", "tw-deli", "Delete files found on page", "")).click(Twinkle.delimages.callback);
    }
};

Twinkle.delimages.unlinkCache = {};
Twinkle.delimages.callback = function twinkledeliCallback() {
    var Window = new SimpleWindow( 800, 400 );
    Window.setTitle( "Batch file deletion" );
    Window.setScriptName( "Twinkle" );
    Window.addFooterLink( "Twinkle help", "WP:TW/DOC#delimages" );

    var form = new QuickForm( Twinkle.delimages.callback.evaluate );
    form.append( {
        type: 'checkbox',
        list: [
            {
                label: 'Delete files',
                name: 'delete_image',
                value: 'delete',
                checked: true
            },
            {
                label: 'Unlink uses of this file',
                name: 'unlink_image',
                value: 'unlink',
                checked: true
            }
        ]
    } );
    form.append( {
        type: 'textarea',
        name: 'reason',
        label: 'Reason: '
    } );
    var query;
    if( mw.config.get( 'wgNamespaceNumber' ) === Namespace.CATEGORY ) {
        query = {
            'action': 'query',
            'generator': 'categorymembers',
            'gcmtitle': mw.config.get( 'wgPageName' ),
            'gcmnamespace': Namespace.IMAGE,
            'gcmlimit' : Twinkle.getPref('deliMax'),
            'prop': [ 'imageinfo', 'categories', 'revisions' ],
            'grvlimit': 1,
            'grvprop': [ 'user' ]
        };
    } else {
        query = {
            'action': 'query',
            'generator': 'images',
            'titles': mw.config.get( 'wgPageName' ),
            'prop': [ 'imageinfo', 'categories', 'revisions' ],
            'gimlimit': 'max'
        };
    }
    var wikipedia_api = new Wikipedia.api( 'Grabbing files', query, function( self ) {
        var xmlDoc = self.responseXML;
        var images = $(xmlDoc).find('page[imagerepository="local"]');
        var list = [];

        $.each(images, function() {
            var $self = $(this);
            var image = $self.attr('title');
            var user = $self.find('imageinfo ii').attr('user');
            var last_edit = $self.find('revisions rev').attr('user');
            var disputed = $self.find('categories cl[title="Category:Contested candidates for speedy deletion"]').size() > 0;
            list.push( {
                'label': image + ' - author: ' + user + ', last edit from: ' + last_edit + ( disputed ? ' DISPUTED' : '' ),
                'value': image,
                'checked': !disputed
            });
        });

        self.params.form.append( {
            type: 'checkbox',
            name: 'images',
            list: list
        }
    );
    self.params.form.append( { type:'submit' } );

    var result = self.params.form.render();
    self.params.Window.setContent( result );


}  );

wikipedia_api.params = { form:form, Window:Window };
wikipedia_api.post();
var root = document.createElement( 'div' );
Status.init( root );
Window.setContent( root );
Window.display();
};

Twinkle.delimages.currentDeleteCounter = 0;
Twinkle.delimages.currentUnlinkCounter = 0;
Twinkle.delimages.currentdeletor = 0;
Twinkle.delimages.callback.evaluate = function twinkledeliCallbackEvaluate(event) {
    mw.config.set('wgPageName', mw.config.get('wgPageName').replace(/_/g, ' '));  // for queen/king/whatever and country!
    var images = event.target.getChecked( 'images' );
    var reason = event.target.reason.value;
    var delete_image = event.target.delete_image.checked;
    var unlink_image = event.target.unlink_image.checked;
    if( ! reason ) {
        return;
    }

    SimpleWindow.setButtonsEnabled( false );
    Status.init( event.target );

    function toCall( work ) {
        if( work.length === 0 && Twinkle.delimages.currentDeleteCounter <= 0 && Twinkle.delimages.currentUnlinkCounter <= 0 ) {
            window.clearInterval( Twinkle.delimages.currentdeletor );
            Wikipedia.removeCheckpoint();
            return;
        } else if( work.length !== 0 && Twinkle.delimages.currentDeleteCounter <= Twinkle.getPref('batchDeleteMinCutOff') && Twinkle.delimages.currentUnlinkCounter <= Twinkle.getPref('batchDeleteMinCutOff') ) {
            Twinkle.delimages.unlinkCache = []; // Clear the cache
            var images = work.shift();
            Twinkle.delimages.currentDeleteCounter = images.length;
            Twinkle.delimages.currentUnlinkCounter = images.length;
            var i;
            for( i = 0; i < images.length; ++i ) {
                var image = images[i];
                var query = {
                    'action': 'query',
                    'titles': image
                };
                var wikipedia_api = new Wikipedia.api( 'Checking if file ' + image + ' exists', query, Twinkle.delimages.callbacks.main );
                wikipedia_api.params = { image:image, reason:reason, unlink_image:unlink_image, delete_image:delete_image };
                wikipedia_api.post();
            }
        }
    }
    var work = images.chunk( Twinkle.getPref('deliChunks') );
    Wikipedia.addCheckpoint();
    Twinkle.delimages.currentdeletor = window.setInterval( toCall, 1000, work );
};
Twinkle.delimages.callbacks = {
    main: function( self ) {
        var xmlDoc = self.responseXML;
        var $data = $(xmlDoc);

        var normal = $data.find('normalized n').attr('to');

        if( normal ) {
            self.params.image = normal;
        }

        var exists = $data.find('pages page[title="'+self.params.image.replace( /"/g, '\\"')+'"]:not([missing])').size() > 0;

        if( ! exists ) {
            self.statelem.error( "It seems that the page doesn't exists, perhaps it has already been deleted" );
            return;
        }
        if( self.params.unlink_image ) {
            var query = {
                'action': 'query',
                'list': 'imageusage',
                'iutitle': self.params.image,
                'iulimit': userIsInGroup( 'sysop' ) ? 5000 : 500 // 500 is max for normal users, 5000 for bots and sysops
            };
            var wikipedia_api = new Wikipedia.api( 'Grabbing file links', query, Twinkle.delimages.callbacks.unlinkImageInstancesMain );
            wikipedia_api.params = self.params;
            wikipedia_api.post();
        }
        if( self.params.delete_image ) {

            var imagepage = new Wikipedia.page( self.params.image, 'Deleting image');
            imagepage.setEditSummary( "Deleted because \"" + self.params.reason + "\"." + Twinkle.getPref('deletionSummaryAd'));
            imagepage.deletePage();
        }
    },
    unlinkImageInstancesMain: function( self ) {
        var xmlDoc = self.responseXML;
        var instances = [];
        $(xmlDoc).find('imageusage iu').each(function(){
            instances.push($(this).attr('title'));
        });
        if( instances.length === 0 ) {
            --twinklebatchdelete.currentUnlinkCounter;
            return;
        }

        $.each( instances, function(k,title) {
            page = new Wikipedia.page(title, "Unlinking instances on " + title);
            page.setFollowRedirect(true);
            page.setCallbackParameters({'image': self.params.image, 'reason': self.params.reason});
            page.load(Twinkle.delimages.callbacks.unlinkImageInstances);

        });
    },
    unlinkImageInstances: function( self ) {
        var params = self.getCallbackParameters();
        var statelem = self.getStatusElement();

        var image = params.image.replace( /^(?:Image|File):/, '' );
        var old_text = self.getPageText();
        var wikiPage = new Mediawiki.Page( old_text );
        wikiPage.commentOutImage( image , 'Commented out because image was deleted' );
        var text = wikiPage.getText();

        if( text === old_text ) {
            statelem.error( 'failed to unlink image ' + image +' from ' + self.getPageName() );
            return;
        }
        self.setPageText(text);
        self.setEditSummary('Removing instance of file ' + image + " that has been deleted because \"" + params.reason + "\")" + "; " + Twinkle.getPref('deletionSummaryAd'));
        self.setCreateOption('nocreate');
        self.save();
    }
};

/*
****************************************
*** twinkledeprod.js: Batch deletion of expired PRODs (sysops only)
****************************************
* Mode of invocation:     Tab ("Deprod")
* Active on:              Categories whose name starts with "Category:Proposed deletion as of"
* Config directives in:   TwinkleConfig
*/

;(function(){
    Twinkle.deprod = function() {
        if( mw.config.get( 'wgNamespaceNumber' ) !== Namespace.CATEGORY || ! userIsInGroup( 'sysop' ) || !((/^Category:Proposed_deletion_as_of/).test(mw.config.get( 'wgPageName' ))) ) {
            return;
        }
        $(twAddPortletLink( "#", "Deprod", "tw-deprod", "Delete prod pages found in this category", "")).click(callback);
    };

    var unlinkCache = {},
    concerns = {},
    currentDeleteCounter = 0,
    currentUnlinkCounter = 0,
    currentDeletor = null,

    callback = function() {
        var Window = new SimpleWindow( 800, 400 );
        Window.setTitle( "PROD cleaning" );
        Window.setScriptName( "Twinkle" );
        Window.addFooterLink( "Proposed deletion", "WP:PROD" );
        Window.addFooterLink( "Twinkle help", "WP:TW/DOC#deprod" );

        var form = new QuickForm( callback_commit );

        var query = {
            'action': 'query',
            'generator': 'categorymembers',
            'gcmtitle': mw.config.get( 'wgPageName' ),
            'gcmlimit' : 5000, // the max for sysops
            'prop': [ 'categories', 'revisions' ],
            'rvprop': [ 'content' ]
        };

        var wikipedia_api = new Wikipedia.api( 'Grabbing pages', query, function( self ) {
            var $doc = $(self.responseXML);
            var $pages = $doc.find("page[ns!=\""+Namespace.IMAGE+"\"]");
            var list = [];
            var re = new RegExp("{{Proposed deletion");
                $pages.each(function() {
                    var $self = $(this);
                    var page = $self.attr('title');
                    var content = $self.find('revisions rev').text();
                    var concern = '';
                    var res = re.exec(content);
                    if( res ) {
                        var parsed = Mediawiki.Template.parse( content, res.index );
                        concern = parsed.parameters.concern || '';
                    }
                    list.push( {label:page + ' (' + concern + ')' , value:page, checked:concern !== '' });
                    concerns[page] = concern;

                });
                self.params.form.append({
                    'type': 'checkbox',
                    'name': 'pages',
                    'list': list
                });
                self.params.form.append({
                    'type': 'submit'
                });
                self.params.Window.setContent(  self.params.form.render() );
            });

            wikipedia_api.params = { form:form, Window:Window };
            wikipedia_api.post();
            var root = document.createElement( 'div' );
            SimpleWindow.setButtonsEnabled( true );

            Status.init( root );
            Window.setContent( root );
            Window.display();
    },

    callback_commit = function(event) {
        var pages = event.target.getChecked( 'pages' );
        Status.init( event.target );
        function toCall( work ) {
            if( work.length === 0 ) {
                Status.info( 'work done' );
                window.clearInterval( currentDeletor );
                Wikipedia.removeCheckpoint();
                return;
            } else if( currentDeleteCounter <= 0 || currentUnlinkCounter <= 0 ) {
                unlinkCache = []; // Clear the cache
                var pages = work.pop(), i;
                for( i = 0; i < pages.length; ++i ) {
                    var page = pages[i];
                    var query = {
                        'action': 'query',
                        'prop': 'revisions',
                        'rvprop': [ 'content' ],
                        'rvlimit': 1,
                        'titles': page
                    };
                    var wikipedia_api = new Wikipedia.api( 'Checking if page ' + page + ' exists', query, callback_check );
                    wikipedia_api.params = { page:page, reason: concerns[page] };
                    wikipedia_api.post();
                }
            }
        }
        var work = pages.chunk( Twinkle.getPref('proddeleteChunks') );
        Wikipedia.addCheckpoint();
        currentDeletor = window.setInterval( toCall, 1000, work );
    },
    callback_check = function( self ) {
        var $doc  = $(self.responseXML);
        var normal = $doc.find('normalized n').attr('to');
        if( normal ) {
            self.params.page = normal;
        }
        var exists = $doc.find('pages page:not([missing])').size() > 0;

        if( ! exists ) {
            self.statelem.error( "It seems that the page doesn't exists, perhaps it has already been deleted" );
            return;
        }

        var query = {
            'action': 'query',
            'list': 'backlinks',
            'blfilterredir': 'redirects',
            'bltitle': self.params.page,
            'bllimit': userIsInGroup( 'sysop' ) ? 5000 : 500 // 500 is max for normal users, 5000 for bots and sysops
        };
        var wikipedia_api = new Wikipedia.api( 'Grabbing redirects', query, callback_deleteRedirects );
        wikipedia_api.params = self.params;
        wikipedia_api.post();

        var page = new Wikipedia.page('Talk:' + self.params.page, "Deleting talk page");
        page.setEditSummary("Deleted talk page of a page because expired [[WP:PROD]]." + Twinkle.getPref('deletionSummaryAd'));
        page.deletePage();

        page = new Wikipedia.page(self.params.page, "Deleting article");
        page.setEditSummary("DDeleted because expired [[WP:PROD]]; Reason given: " + self.params.reason + "." + Twinkle.getPref('deletionSummaryAd'));
        page.deletePage();


    },
    callback_deleteRedirects = function( self ) {
        $doc = $(self.responseXML);
        $doc.find("backlinks bl").each(function(){
            var title = $(this).attr('title');
            var page = new Wikipedia.page(title, "Deleting redirecting page " + title);
            page.setEditSummary("Speedy deleted per ([[WP:CSD#R1|CSD R1]]), Redirect to deleted page \"" + self.params.page + "\"." + Twinkle.getPref('deletionSummaryAd'));
            page.deletePage();
        });
    };
}());

/*
 ****************************************
 *** twinklediff.js: Diff module
 ****************************************
 * Mode of invocation:     Tab on non-diff pages ("Last"); tabs on diff pages ("Since", "Since mine", "Current")
 * Active on:              Existing non-special pages
 * Config directives in:   TwinkleConfig
 */

Twinkle.diff = function twinklediff() {
    if( mw.config.get('wgNamespaceNumber') < 0 || !mw.config.get('wgArticleId') ) {
        return;
    }

    var query = {
        'title': mw.config.get('wgPageName'),
        'diff': 'cur',
        'oldid': 'prev'
    };

    twAddPortletLink( mw.config.get('wgServer') + mw.config.get('wgScriptPath') + '/index.php?' + QueryString.create( query ), 'Last', 'tw-lastdiff', 'Show most recent diff' );

    // Show additional tabs only on diff pages
    if (QueryString.exists('diff')) {
        $(twAddPortletLink("#", 'Since', 'tw-since', 'Show difference between last diff and the revision made by previous user' )).click(function(){Twinkle.diff.evaluate(false);});
        $(twAddPortletLink("#", 'Since mine', 'tw-sincemine', 'Show difference between last diff and my last revision' )).click(function(){Twinkle.diff.evaluate(true);});

        var oldid = /oldid=(.+)/.exec($('div#mw-diff-ntitle1 strong a').first().attr("href"))[1];
        query = {
            'title': mw.config.get('wgPageName'),
            'diff': 'cur',
            'oldid' : oldid
        };
        twAddPortletLink( mw.config.get('wgServer') + mw.config.get('wgScriptPath') + '/index.php?' + QueryString.create( query ), 'Current', 'tw-curdiff', 'Show difference to current revision' );
    }
};

Twinkle.diff.evaluate = function twinklediffEvaluate(me) {
    var ntitle = getElementsByClassName( document.getElementById('bodyContent'), 'td' , 'diff-ntitle' )[0];

    var user;
    if( me ) {
        user = mw.config.get('wgUserName');
    } else {
        var node = document.getElementById( 'mw-diff-ntitle2' );
        if( ! node ) {
            // nothing to do?
            return;
        }
        user = $(node).find('a').first().text();
    }
    var query = {
        'prop': 'revisions',
        'action': 'query',
        'titles': mw.config.get('wgPageName'),
        'rvlimit': 1,
        'rvprop': [ 'ids', 'user' ],
        'rvstartid': mw.config.get('wgCurRevisionId') - 1, // i.e. not the current one
        'rvuser': user
    };
    Status.init( document.getElementById('bodyContent') );
    var wikipedia_api = new Wikipedia.api( 'Grabbing data of initial contributor', query, Twinkle.diff.callbacks.main );
    wikipedia_api.params = { user: user };
    wikipedia_api.post();
};

Twinkle.diff.callbacks = {
    main: function( self ) {
        var xmlDoc = self.responseXML;
        var revid = $(xmlDoc).find('rev').attr('revid');

        if( ! revid ) {
            self.statelem.error( 'no suitable earlier revision found, or ' + self.params.user + ' is the only contributor. Aborting.' );
            return;
        }
        var query = {
            'title': mw.config.get('wgPageName'),
            'oldid': revid,
            'diff': mw.config.get('wgCurRevisionId')
        };
        window.location = mw.config.get('wgServer') + mw.config.get('wgScriptPath') + '/index.php?' + QueryString.create( query );
    }
};

/*
 ****************************************
 *** twinklefluff.js: Revert/rollback module
 ****************************************
 * Mode of invocation:     Links on history, contributions, and diff pages
 * Active on:              Diff pages, history pages, contributions pages
 * Config directives in:   TwinkleConfig
 */

/**
 Twinklefluff revert and antivandalism utility
 */

Twinkle.fluff = {
    auto: function() {
        if( parseInt( QueryString.get('oldid'), 10) !== mw.config.get('wgCurRevisionId') ) {
            // not latest revision
            alert("Can't rollback, page has changed in the meantime.");
            return;
        }

        var ntitle = getElementsByClassName( document.getElementById('bodyContent'), 'td' , 'diff-ntitle' )[0];
        vandal = ntitle.getElementsByTagName('a')[3].firstChild.nodeValue;

        Twinkle.fluff.revert( QueryString.get( 'twinklerevert' ), vandal, true );
    },
    normal: function() {

        var spanTag = function( color, content ) {
            var span = document.createElement( 'span' );
            span.style.color = color;
            span.appendChild( document.createTextNode( content ) );
            return span;
        };

        if( mw.config.get('wgNamespaceNumber') === -1 && mw.config.get('wgCanonicalSpecialPageName') === "Contributions" ) {
            //Get the username these contributions are for
            username = decodeURIComponent(/user=(.+)/.exec($('div#contentSub a[title="Special:Log"]').last().attr("href").replace(/\+/g, "%20"))[1]);
            if( Twinkle.getPref('showRollbackLinks').indexOf('contribs') !== -1 ||
                ( mw.config.get('wgUserName') !== username && Twinkle.getPref('showRollbackLinks').indexOf('others') !== -1 ) ||
                ( mw.config.get('wgUserName') === username && Twinkle.getPref('showRollbackLinks').indexOf('mine') !== -1 ) ) {
                var list = $("div#bodyContent ul li:has(span.mw-uctop)");

                var revNode = document.createElement('strong');
                var revLink = document.createElement('a');
                revLink.appendChild( spanTag( 'Black', '[' ) );
                revLink.appendChild( spanTag( 'SteelBlue', 'rollback' ) );
                revLink.appendChild( spanTag( 'Black', ']' ) );
                revNode.appendChild(revLink);

                var revVandNode = document.createElement('strong');
                var revVandLink = document.createElement('a');
                revVandLink.appendChild( spanTag( 'Black', '[' ) );
                revVandLink.appendChild( spanTag( 'Red', 'vandalism' ) );
                revVandLink.appendChild( spanTag( 'Black', ']' ) );
                revVandNode.appendChild(revVandLink);

                list.each(function(key, current) {
                    var href = $(current).children("a:eq(1)").attr("href");
                    current.appendChild( document.createTextNode(' ') );
                    var tmpNode = revNode.cloneNode( true );
                    tmpNode.firstChild.setAttribute( 'href', href + '&' + QueryString.create( { 'twinklerevert': 'norm' } ) );
                    current.appendChild( tmpNode );
                    current.appendChild( document.createTextNode(' ') );
                    tmpNode = revVandNode.cloneNode( true );
                    tmpNode.firstChild.setAttribute( 'href', href + '&' + QueryString.create( { 'twinklerevert': 'vand' } ) );
                    current.appendChild( tmpNode );
                });
            }
        } else {
                        
            if( mw.config.get('wgCanonicalSpecialPageName') === "Special:Undelete" ) {
                //You can't rollback deleted pages!
                return;
            }

            var body = document.getElementById('bodyContent');

            var firstRev = $("div.firstrevisionheader").length;
            if( firstRev ) {
                // we have first revision here, nothing to do.
                return;
            }

            var otitle, ntitle;
            try {
                var otitle1 = document.getElementById('mw-diff-otitle1');
                var ntitle1 = document.getElementById('mw-diff-ntitle1');
                if (!otitle1 || !ntitle1) {
                    return;
                }
                otitle = otitle1.parentNode;
                ntitle = ntitle1.parentNode;
            } catch( e ) {
                // no old, nor new title, nothing to do really, return;
                return;
            }

            var old_rev_url = $("div#mw-diff-otitle1 strong a").attr("href");

            // Lets first add a [edit this revision] link
            var query = new QueryString( old_rev_url.split( '?', 2 )[1] );

            var oldrev = query.get('oldid');

            var revertToRevision = document.createElement('div');
            revertToRevision.setAttribute( 'id', 'tw-revert-to-orevision' );
            revertToRevision.style.fontWeight = 'bold';

            var revertToRevisionLink = revertToRevision.appendChild( document.createElement('a') );
            revertToRevisionLink.href = "#";
            $(revertToRevisionLink).click(function(){
                Twinkle.fluff.revertToRevision(oldrev);
            });
            revertToRevisionLink.appendChild( spanTag( 'Black', '[' ) );
            revertToRevisionLink.appendChild( spanTag( 'SaddleBrown', 'restore this version' ) );
            revertToRevisionLink.appendChild( spanTag( 'Black', ']' ) );

            otitle.insertBefore( revertToRevision, otitle.firstChild );

            if( document.getElementById('differences-nextlink') ) {
                // Not latest revision
                curVersion = false;

                var new_rev_url = $("div#mw-diff-ntitle1 strong a").attr("href");
                query = new QueryString( new_rev_url.split( '?', 2 )[1] );
                var newrev = query.get('oldid');
                revertToRevision = document.createElement('div');
                revertToRevision.setAttribute( 'id', 'tw-revert-to-nrevision' );
                revertToRevision.style.fontWeight = 'bold';
                revertToRevisionLink = revertToRevision.appendChild( document.createElement('a') );
                revertToRevisionLink.href = "#";
                $(revertToRevisionLink).click(function(){
                    Twinkle.fluff.revertToRevision(newrev);
                });
                revertToRevisionLink.appendChild( spanTag( 'Black', '[' ) );
                revertToRevisionLink.appendChild( spanTag( 'SaddleBrown', 'restore this version' ) );
                revertToRevisionLink.appendChild( spanTag( 'Black', ']' ) );
                ntitle.insertBefore( revertToRevision, ntitle.firstChild );

                return;
            }
            if( Twinkle.getPref('showRollbackLinks').indexOf('diff') != -1 ) {
                var vandal = $("#mw-diff-ntitle2 a").first().text().replace("'", "\\'");

                var revertNode = document.createElement('div');
                revertNode.setAttribute( 'id', 'tw-revert' );

                var agfNode = document.createElement('strong');
                var vandNode = document.createElement('strong');
                var normNode = document.createElement('strong');

                var agfLink = document.createElement('a');
                var vandLink = document.createElement('a');
                var normLink = document.createElement('a');

                agfLink.href = "#";
                vandLink.href = "#";
                normLink.href = "#";
                $(agfLink).click(function(){
                    Twinkle.fluff.revert('agf', vandal);
                });
                $(vandLink).click(function(){
                    Twinkle.fluff.revert('vand', vandal);
                });
                $(normLink).click(function(){
                    Twinkle.fluff.revert('norm', vandal);
                });

                agfLink.appendChild( spanTag( 'Black', '[' ) );
                agfLink.appendChild( spanTag( 'DarkOliveGreen', 'rollback (AGF)' ) );
                agfLink.appendChild( spanTag( 'Black', ']' ) );

                vandLink.appendChild( spanTag( 'Black', '[' ) );
                vandLink.appendChild( spanTag( 'Red', 'rollback (VANDAL)' ) );
                vandLink.appendChild( spanTag( 'Black', ']' ) );

                normLink.appendChild( spanTag( 'Black', '[' ) );
                normLink.appendChild( spanTag( 'SteelBlue', 'rollback' ) );
                normLink.appendChild( spanTag( 'Black', ']' ) );

                agfNode.appendChild(agfLink);
                vandNode.appendChild(vandLink);
                normNode.appendChild(normLink);

                revertNode.appendChild( agfNode );
                revertNode.appendChild( document.createTextNode(' || ') );
                revertNode.appendChild( normNode );
                revertNode.appendChild( document.createTextNode(' || ') );
                revertNode.appendChild( vandNode );

                ntitle.insertBefore( revertNode, ntitle.firstChild );
            }
        }
    }
};

Twinkle.fluff.revert = function revertPage( type, vandal, autoRevert, rev, page ) {

    var pagename = page || mw.config.get('wgPageName');
    var revid = rev || mw.config.get('wgCurRevisionId');

    Status.init( document.getElementById('bodyContent') );
    var params = {
        type: type,
        user: vandal,
        pagename: pagename,
        revid: revid,
        autoRevert: !!autoRevert
    };
    var query = {
        'action': 'query',
        'prop': ['info', 'revisions'],
        'titles': pagename,
        'rvlimit': 50, // max possible
        'rvprop': [ 'ids', 'timestamp', 'user', 'comment' ],
        'intoken': 'edit'
    };
    var wikipedia_api = new Wikipedia.api( 'Grabbing data of earlier revisions', query, Twinkle.fluff.callbacks.main );
    wikipedia_api.params = params;
    wikipedia_api.post();
};

Twinkle.fluff.revertToRevision = function revertToRevision( oldrev ) {

    Status.init( document.getElementById('bodyContent') );

    var query = {
        'action': 'query',
        'prop': ['info',  'revisions'],
        'titles': mw.config.get('wgPageName'),
        'rvlimit': 1,
        'rvstartid': oldrev,
        'rvprop': [ 'ids', 'timestamp', 'user', 'comment' ],
        'intoken': 'edit',
        'format': 'xml'
    };
    var wikipedia_api = new Wikipedia.api( 'Grabbing data of the earlier revision', query, Twinkle.fluff.callbacks.toRevision.main );
    wikipedia_api.params = { rev: oldrev };
    wikipedia_api.post();
};

Twinkle.fluff.userIpLink = function( user ) {
    return (isIPAddress(user) ? "[[Special:Contributions/" : "[[User:" ) + user + "|" + user + "]]";
};

Twinkle.fluff.callbacks = {
    toRevision: {
        main: function( self ) {
            var xmlDoc = self.responseXML;

            var lastrevid = parseInt( $(xmlDoc).find('page').attr('lastrevid'), 10);
            var touched = $(xmlDoc).find('page').attr('touched');
            var starttimestamp = $(xmlDoc).find('page').attr('starttimestamp');
            var edittoken = $(xmlDoc).find('page').attr('edittoken');
            var revertToRevID = $(xmlDoc).find('rev').attr('revid');
            var revertToUser = $(xmlDoc).find('rev').attr('user');

            if (revertToRevID !== self.params.rev) {
                self.statitem.error( 'The retrieved revision does not match the requested revision.  Aborting.' );
                return;
            }

            var optional_summary = prompt( "Please specify a reason for the revert:", "" );
            if (optional_summary === null)
            {
                self.statelem.error( 'Aborted by user.' );
                return;
            }
            var summary = "Reverted to revision " + revertToRevID + " by " + revertToUser + (optional_summary ? ": " + optional_summary : '') + "." +
                Twinkle.getPref('summaryAd');
        
            var query = {
                'action': 'edit',
                'title': mw.config.get('wgPageName'),
                'summary': summary,
                'token': edittoken,
                'undo': lastrevid,
                'undoafter': revertToRevID,
                'basetimestamp': touched,
                'starttimestamp': starttimestamp,
                'watchlist': Twinkle.getPref('watchRevertedPages').indexOf( self.params.type ) !== -1 ? 'watch' : undefined,
                'minor': Twinkle.getPref('markRevertedPagesAsMinor').indexOf( self.params.type ) !== -1  ? true : undefined
            };

            Wikipedia.actionCompleted.redirect = mw.config.get('wgPageName');
            Wikipedia.actionCompleted.notice = "Reversion completed";

            var wikipedia_api = new Wikipedia.api( 'Saving reverted contents', query, null/*Twinkle.fluff.callbacks.toRevision.complete*/, self.statelem);
            wikipedia_api.params = self.params;
            wikipedia_api.post();

        },
        complete: function (self) {
        }
    },
    main: function( self ) {
        var xmlDoc = self.responseXML;

        var lastrevid = parseInt( $(xmlDoc).find('page').attr('lastrevid'), 10);
        var touched = $(xmlDoc).find('page').attr('touched');
        var starttimestamp = $(xmlDoc).find('page').attr('starttimestamp');
        var edittoken = $(xmlDoc).find('page').attr('edittoken');
        var lastuser = $(xmlDoc).find('rev').attr('user');

        var revs = $(xmlDoc).find('rev');

        if( revs.length < 1 ) {
            self.statitem.error( 'We have less than one additional revision, thus impossible to revert' );
            return;
        }
        var top = revs[0];
        if( lastrevid < self.params.revid ) {
            Status.error( 'Error', [ 'The most recent revision ID received from the server, ', htmlNode( 'strong', lastrevid ), ', is less than the ID of the displayed revision. This could indicate that the current revision has been deleted, the server is lagging, or that bad data has been received. Will stop proceeding at this point.' ] );
            return;
        }
        var index = 1;
        if( self.params.revid !== lastrevid  ) {
            Status.warn( 'Warning', [ 'Latest revision ', htmlNode( 'strong', lastrevid ), ' doesn\'t equal our revision ', htmlNode( 'strong', self.params.revid ) ] );
            if( lastuser === self.params.user ) {
                switch( self.params.type ) {
                case 'vand':
                    Status.info( 'Info', [ 'Latest revision was made by ', htmlNode( 'strong', self.params.user ) , '. As we assume vandalism, we continue to revert' ]);
                    break;
                case 'agf':
                    Status.warn( 'Warning', [ 'Latest revision was made by ', htmlNode( 'strong', self.params.user ) , '. As we assume good faith, we stop reverting, as the problem might have been fixed.' ]);
                    return;
                default:
                    Status.warn( 'Notice', [ 'Latest revision was made by ', htmlNode( 'strong', self.params.user ) , ', but we will stop reverting anyway.' ] );
                    return;
                }
            }
            else if(self.params.type === 'vand' &&
                    Twinkle.fluff.whiteList.indexOf( top.getAttribute( 'user' ) ) !== -1 && revs.length > 1 &&
                    revs[1].getAttribute( 'pageId' ) === self.params.revid) {
                Status.info( 'Info', [ 'Latest revision was made by ', htmlNode( 'strong', lastuser ), ', a trusted bot, and the revision before was made by our vandal, so we proceed with the revert.' ] );
                index = 2;
            } else {
                Status.error( 'Error', [ 'Latest revision was made by ', htmlNode( 'strong', lastuser ), ', so it might have already been reverted, stopping  reverting.'] );
                return;
            }

        }

        if( Twinkle.fluff.whiteList.indexOf( self.params.user ) !== -1  ) {
            switch( self.params.type ) {
            case 'vand':
                Status.info( 'Info', [ 'Vandalism revert was chosen on ', htmlNode( 'strong', self.params.user ), '. As this is a whitelisted bot, we assume you wanted to revert vandalism made by the previous user instead.' ] );
                index = 2;
                vandal = revs[1].getAttribute( 'user' );
                self.params.user = revs[1].getAttribute( 'user' );
                break;
            case 'agf':
                Status.warn( 'Notice', [ 'Good faith revert was chosen on ', htmlNode( 'strong', self.params.user ), '. This is a whitelisted bot, it makes no sense at all to revert it as a good faith edit, will stop reverting.' ] );
                return;
            case 'norm':
                /* falls through */
            default:
                var cont = confirm( 'Normal revert was chosen, but the most recent edit was made by a whitelisted bot (' + self.params.user + '). Do you want to revert the revision before instead?' );
                if( cont ) {
                    Status.info( 'Info', [ 'Normal revert was chosen on ', htmlNode( 'strong', self.params.user ), '. This is a whitelisted bot, and per confirmation, we\'ll revert the previous revision instead.' ] );
                    index = 2;
                    self.params.user = revs[1].getAttribute( 'user' );
                } else {
                    Status.warn( 'Notice', [ 'Normal revert was chosen on ', htmlNode( 'strong', self.params.user ), '. This is a whitelisted bot, but per confirmation, revert on top revision will proceed.' ] );
                }
                break;
            }
        }
        var found = false;
        var count = 0;

        for( var i = index; i < revs.length; ++i ) {
            ++count;
            if( revs[i].getAttribute( 'user' ) != self.params.user ) {
                found = i;
                break;
            }
        }

        if( ! found ) {
            self.statelem.error( [ 'No previous revision found. Perhaps ', htmlNode( 'strong', self.params.user ), ' is the only contributor, or that the user has made more than ' + Twinkle.getPref('revertMaxRevisions') + ' edits in a row.' ] );
            return;
        }

        if( ! count ) {
            Status.error( 'Error', "We were to revert zero revisions. As that makes no sense, we'll stop reverting this time. It could be that the edit has already been reverted, but the revision ID was still the same." );
            return;
        }

        var good_revision = revs[ found ];
        var userHasAlreadyConfirmedAction = false;
        if (self.params.type !== 'vand' && count > 1) {
            if ( !confirm( self.params.user + ' has made ' + count + ' edits in a row. Are you sure you want to revert them all?') ) {
                Status.info( 'Notice', 'Stopping reverting per user input' );
                return;
            }
            userHasAlreadyConfirmedAction = true;
        }

        self.params.count = count;

        self.params.goodid = good_revision.getAttribute( 'revid' );
        self.params.gooduser = good_revision.getAttribute( 'user' );

        self.statelem.status( [ ' revision ', htmlNode( 'strong', self.params.goodid ), ' that was made ', htmlNode( 'strong', count ), ' revisions ago by ', htmlNode( 'strong', self.params.gooduser ) ] );

        var summary, extra_summary, userstr, gooduserstr;
        switch( self.params.type ) {
        case 'agf':
            extra_summary = prompt( "An optional comment for the edit summary:", "" );
            if (extra_summary === null)
            {
                self.statelem.error( 'Aborted by user.' );
                return;
            }
            userHasAlreadyConfirmedAction = true;

            userstr = self.params.user.replace("\\'", "'");
            summary = "Reverted [[WP:AGF|good faith]] edits by [[Special:Contributions/" + userstr + "|" + userstr + "]] ([[User talk:" +
                userstr + "|talk]])" + Twinkle.fluff.formatSummaryPostfix(extra_summary) + Twinkle.getPref('summaryAd');
            break;

        case 'vand':

            userstr = self.params.user.replace("\\'", "'");
            gooduserstr = self.params.gooduser.replace("\\'", "'")
            summary = "Reverted " + self.params.count + (self.params.count > 1 ? ' edits' : ' edit') + " by [[Special:Contributions/" +
                userstr + "|" + userstr + "]] ([[User talk:" + userstr + "|talk]]) identified as [[WP:VAND|vandalism]] to last revision by " +
                gooduserstr + "." + Twinkle.getPref('summaryAd');
            break;

        case 'norm':
            /* falls through */
        default:
            if( Twinkle.getPref('offerReasonOnNormalRevert') ) {
                extra_summary = prompt( "An optional comment for the edit summary:", "" );
                if (extra_summary === null)
                {
                    self.statelem.error( 'Aborted by user.' );
                    return;
                }
                userHasAlreadyConfirmedAction = true;
            }

            userstr = self.params.user.replace("\\'", "'");
            summary = "Reverted " + self.params.count + (self.params.count > 1 ? ' edits' : ' edit') + " by [[Special:Contributions/" +
                userstr + "|" + userstr + "]] ([[User talk:" + userstr + "|talk]])" + Twinkle.fluff.formatSummaryPostfix(extra_summary) +
                Twinkle.getPref('summaryAd');
            break;
        }

        if (Twinkle.getPref('confirmOnFluff') && !userHasAlreadyConfirmedAction && !confirm("Reverting page: are you sure?")) {
            self.statelem.error( 'Aborted by user.' );
            return;
        }

        var query;
        if( (!self.params.autoRevert || Twinkle.getPref('openTalkPageOnAutoRevert')) &&
                Twinkle.getPref('openTalkPage').indexOf( self.params.type ) !== -1 &&
                mw.config.get('wgUserName') !== self.params.user ) {
            Status.info( 'Info', [ 'Opening user talk page edit form for user ', htmlNode( 'strong', self.params.user ) ] );
            
            query = {
                'title': 'User talk:' + self.params.user,
                'action': 'edit',
                'preview': 'yes',
                'vanarticle': self.params.pagename.replace(/_/g, ' '),
                'vanarticlerevid': self.params.revid,
                'vanarticlegoodrevid': self.params.goodid,
                'type': self.params.type,
                'count': self.params.count
            };

            switch( Twinkle.getPref('userTalkPageMode') ) {
            case 'tab':
                window.open( mw.config.get('wgServer') + mw.config.get('wgScriptPath') + '/index.php?' + QueryString.create( query ), '_tab' );
                break;
            case 'blank':
                window.open( mw.config.get('wgServer') + mw.config.get('wgScriptPath') + '/index.php?' + QueryString.create( query ), '_blank', 'location=no,toolbar=no,status=no,directories=no,scrollbars=yes,width=1200,height=800' );
                break;
            case 'window':
                /* falls through */
            default:
                window.open( mw.config.get('wgServer') + mw.config.get('wgScriptPath') + '/index.php?' + QueryString.create( query ), 'twinklewarnwindow', 'location=no,toolbar=no,status=no,directories=no,scrollbars=yes,width=1200,height=800' );
                break;
            }
        }
        
        query = {
            'action': 'edit',
            'title': self.params.pagename,
            'summary': summary,
            'token': edittoken,
            'undo': lastrevid,
            'undoafter': self.params.goodid,
            'basetimestamp': touched,
            'starttimestamp': starttimestamp,
            'watchlist' :  Twinkle.getPref('watchRevertedPages').indexOf( self.params.type ) != -1 ? 'watch' : undefined,
            'minor': Twinkle.getPref('markRevertedPagesAsMinor').indexOf( self.params.type ) != -1  ? true : undefined
        };

        Wikipedia.actionCompleted.redirect = self.params.pagename;
        Wikipedia.actionCompleted.notice = "Reversion completed";

        var wikipedia_api = new Wikipedia.api( 'Saving reverted contents', query, Twinkle.fluff.callbacks.complete, self.statelem);
        wikipedia_api.params = self.params;
        wikipedia_api.post();

    },
    complete: function (self) {
        self.statelem.info("done");
    }
};

Twinkle.fluff.formatSummaryPostfix = function(stringToAdd) {
    if (stringToAdd) {
        stringToAdd = ': ' + stringToAdd.toUpperCaseFirstChar();
        if (stringToAdd.search(/[.?!;]$/) == -1) {
            stringToAdd = stringToAdd + '.';
        }
        return stringToAdd;
    }
    else {
        return '.';
    }
};

Twinkle.fluff.init = function twinklefluffinit() {
    if (twinkleUserAuthorized)
    {
        // a list of usernames, usually only bots, that vandalism revert is jumped over, that is
        // if vandalism revert was chosen on such username, then it's target is on the revision before.
        // This is for handeling quick bots that makes edits seconds after the original edit is made.
        // This only affect vandalism rollback, for good faith rollback, it will stop, indicating a bot
        // has no faith, and for normal rollback, it will rollback that edit.
        Twinkle.fluff.whiteList = [
            'AnomieBOT',
            'ClueBot NG',
            'SineBot'
        ];

        if ( QueryString.exists( 'twinklerevert' ) ) {
            Twinkle.fluff.auto();
        } else {
            Twinkle.fluff.normal();
        }
    }
};

/*
 ****************************************
 *** twinkleimage.js: Image CSD module
 ****************************************
 * Mode of invocation:     Tab ("DI")
 * Active on:              File pages with a corresponding file which is local (not on Commons)
 * Config directives in:   TwinkleConfig
 */

Twinkle.image = function twinkleimage() {
    if (mw.config.get('wgNamespaceNumber') === 6 &&
        !document.getElementById("mw-sharedupload") &&
        document.getElementById("mw-imagepage-section-filehistory"))
    {
        if(twinkleUserAuthorized) {
            $(twAddPortletLink("#", "DI", "tw-di", "Nominate file for delayed speedy deletion", "")).click(Twinkle.image.callback);
        } else {
            $(twAddPortletLink("#", "DI", "tw-di", "Nominate file for delayed speedy deletion", "")).click(function(){
                alert("Your account is too new to use Twinkle.");
            });
        }
    }
};

Twinkle.image.callback = function twinkleimageCallback() {
    var Window = new SimpleWindow( 600, 300 );
    Window.setTitle( "File for dated speedy deletion" );
    Window.setScriptName( "Twinkle" );
    Window.addFooterLink( "Speedy deletion policy", "WP:CSD" );
    Window.addFooterLink( "Twinkle help", "WP:TW/DOC#image" );

    var form = new QuickForm( Twinkle.image.callback.evaluate );
    form.append( {
            type: 'checkbox',
            list: [
                {
                    label: 'Notify original uploader',
                    value: 'notify',
                    name: 'notify',
                    tooltip: "Uncheck this if you are planning to make multiple nominations from the same user, and don't want to overload their talk page with too many notifications.",
                    checked: Twinkle.getPref('notifyUserOnDeli')
                }
            ]
        }
    );
    var field = form.append( {
            type: 'field',
            label: 'Type of action wanted'
        } );
    field.append( {
            type: 'radio',
            name: 'type',
            event: Twinkle.image.callback.choice,
            list: [
                {
                    label: 'No source (CSD F4)',
                    value: 'no source',
                    checked: true,
                    tooltip: 'Image or media has no source information'
                },
                {
                    label: 'No license (CSD F4)',
                    value: 'no license',
                    tooltip: 'Image or media does not have information on its copyright status'
                },
                {
                    label: 'No source and no license (CSD F4)',
                    value: 'no source no license',
                    tooltip: 'Image or media has neither information on source nor its copyright status'
                },
                {
                    label: 'Orphaned fair use (CSD F5)',
                    value: 'orphaned fair use',
                    tooltip: 'Image or media is unlicensed for use on Wikipedia and allowed only under a claim of fair use per Wikipedia:Non-free content, but it is not used in any articles'
                },
                {
                    label: 'No fair use rationale (CSD F6)',
                    value: 'no fair use rationale',
                    tooltip: 'Image or media is claimed to be used under Wikipedia\'s fair use policy but has no explanation as to why it is permitted under the policy'
                },
                {
                    label: 'Disputed fair use rationale (CSD F7)',
                    value: 'disputed fair use rationale',
                    tooltip: 'Image or media has a fair use rationale that is disputed'
                },
                {
                    label: 'Replaceable fair use (CSD F7)',
                    value: 'replaceable fair use',
                    tooltip: 'Image or media may fail Wikipedia\'s first non-free content criterion ([[WP:NFCC#1]]) in that it illustrates a subject for which a free image might reasonably be found or created that adequately provides the same information'
                },
                {
                    label: 'No permission (CSD F11)',
                    value: 'no permission',
                    tooltip: 'Image or media does not have proof that the author agreed to licence the file'
                }
            ]
        } );
    form.append( {
            type: 'div',
            label: 'Work area',
            name: 'work_area'
        } );
    form.append( { type:'submit' } );

    var result = form.render();
    Window.setContent( result );
    Window.display();

    // We must init the parameters
    var evt = document.createEvent( "Event" );
    evt.initEvent( 'change', true, true );
    result.type[0].dispatchEvent( evt );
};

Twinkle.image.callback.choice = function twinkleimageCallbackChoose(event) {
    var value = event.target.values;
    var root = event.target.form;
    var work_area = new QuickForm.element( {
            type: 'div',
            name: 'work_area'
        } );

    switch( value ) {
        case 'no source no license':
        case 'no source':
            work_area.append( {
                    type: 'checkbox',
                    name: 'non_free',
                    list: [
                        {
                            label: 'Non-free',
                            tooltip: 'Image is licensed under a fair use claim'
                        }
                    ]
                } );
            break;
        case 'no permission':
            work_area.append( {
                    type: 'input',
                    name: 'source',
                    label: 'Source: '
                } );
            break;
        case 'disputed fair use rationale':
            work_area.append( {
                    type: 'textarea',
                    name: 'reason',
                    label: 'Concern: '
                } );
            break;
        case 'orphaned fair use':
            work_area.append( {
                    type: 'input',
                    name: 'replacement',
                    label: 'Replacement: '
                } );
            break;
        case 'replaceable fair use':
            work_area.append( {
                    type: 'checkbox',
                    name: 'old_image',
                    list: [
                        {
                            label: 'Old image',
                            tooltip: 'Image was uploaded before 2006-07-13'
                        }
                    ]
                } );
            break;
        default:
            break;
    }

    root.replaceChild( work_area.render(), $(root).find('div[name="work_area"]')[0] );
};

Twinkle.image.callback.evaluate = function twinkleimageCallbackEvaluate(event) {
    var type, non_free, source, reason, replacement, old_image;
    mw.config.set('wgPageName', mw.config.get('wgPageName').replace(/_/g, ' '));  // for queen/king/whatever and country!

    var notify = event.target.notify.checked;
    var types = event.target.type;
    for( var i = 0; i < types.length; ++i ) {
        if( types[i].checked ) {
            type = types[i].value;
            break;
        }
    }
    if( event.target.non_free ) {
        non_free = event.target.non_free.checked;
    }
    if( event.target.source ) {
        source = event.target.source.value;
    }
    if( event.target.reason ) {
        reason = event.target.reason.value;
    }
    if( event.target.replacement ) {
        replacement = event.target.replacement.value;
    }
    if( event.target.old_image ) {
        old_image = event.target.old_image.checked;
    }

    var csdcrit;
    switch( type ) {
        case 'no source no license':
        case 'no source':
        case 'no license':
            csdcrit = "F4";
            break;
        case 'orphaned fair use':
            csdcrit = "F5";
            break;
        case 'no fair use rationale':
            csdcrit = "F6";
            break;
        case 'disputed fair use rationale':
        case 'replaceable fair use':
            csdcrit = "F7";
            break;
        case 'no permission':
            csdcrit = "F11";
            break;
        default:
            throw new Error( "Twinkle.image.callback.evaluate: unknown criterion" );
    }

    var lognomination = Twinkle.getPref('logSpeedyNominations') && Twinkle.getPref('noLogOnSpeedyNomination').indexOf(csdcrit) === -1;

    var params = {
        'type': type,
        'normalized': csdcrit,
        'non_free': non_free,
        'source': source,
        'reason': reason,
        'replacement': replacement,
        'old_image': old_image,
        'lognomination': lognomination
    };
    SimpleWindow.setButtonsEnabled( false );
    Status.init( event.target );

    Wikipedia.actionCompleted.redirect = mw.config.get('wgPageName');
    Wikipedia.actionCompleted.notice = "Tagging complete";

    // Tagging image
    var wikipedia_page = new Wikipedia.page( mw.config.get('wgPageName'), 'Tagging file with deletion tag' );
    wikipedia_page.setCallbackParameters( params );
    wikipedia_page.load( Twinkle.image.callbacks.taggingImage );

    // Notifying uploader
    if( notify ) {
        wikipedia_page.lookupCreator(Twinkle.image.callbacks.userNotification);
    } else {
        // add to CSD log if desired
        if (lognomination) {
            params.fromDI = true;
            Twinkle.speedy.callbacks.user.addToLog(params, null);
        }
        // No auto-notification, display what was going to be added.
        var noteData = document.createElement( 'pre' );
        noteData.appendChild( document.createTextNode( "{{subst:di-" + type + "-notice|1=" + mw.config.get('wgTitle') + "}} ~~~~" ) );
        Status.info( 'Notification', [ 'Following/similar data should be posted to the original uploader:', document.createElement( 'br' ),  noteData ] );
    }
};

Twinkle.image.callbacks = {
    taggingImage: function(pageobj) {
        var text = pageobj.getPageText();
        var params = pageobj.getCallbackParameters();

        var tag = "{{di-" + params.type + "|date={{subst:#time:j F Y}}";
        switch( params.type ) {
            case 'no source no license':
            case 'no source':
                tag += params.non_free ? "|non-free=yes" : "";
                break;
            case 'no permission':
                tag += params.source ? "|source=" + params.source : "";
                break;
            case 'disputed fair use rationale':
                tag += params.reason ? "|concern=" + params.reason : "";
                break;
            case 'orphaned fair use':
                tag += params.replacement ? "|replacement=" + params.replacement : "";
                break;
            case 'replaceable fair use':
                tag += params.old_image ? "|old image=yes" : "";
                break;
            default:
                break;  // doesn't matter
        }
        tag += "}}\n";

        pageobj.setPageText(tag + text);
        pageobj.setEditSummary("This file is up for deletion, per [[WP:CSD#" + params.normalized + "|CSD " + params.normalized + "]] (" + params.type + ")." + Twinkle.getPref('summaryAd'));
        switch (Twinkle.getPref('deliWatchPage')) {
            case 'yes':
                pageobj.setWatchlist(true);
                break;
            case 'no':
                pageobj.setWatchlistFromPreferences(false);
                break;
            default:
                pageobj.setWatchlistFromPreferences(true);
                break;
        }
        pageobj.setCreateOption('nocreate');
        pageobj.save();
    },
    userNotification: function(pageobj) {
        var params = pageobj.getCallbackParameters();
        var initialContrib = pageobj.getCreator();
        var usertalkpage = new Wikipedia.page('User talk:' + initialContrib, "Notifying initial contributor (" + initialContrib + ")");
        var notifytext = "\n{{subst:di-" + params.type + "-notice|1=" + mw.config.get('wgTitle');
        if (params.type === 'no permission') {
            notifytext += params.source ? "|source=" + params.source : "";
        }
        notifytext += "}} ~~~~";
        usertalkpage.setAppendText(notifytext);
        usertalkpage.setEditSummary("Notification: tagging for deletion of [[" + mw.config.get('wgPageName') + "]]." + Twinkle.getPref('summaryAd'));
        usertalkpage.setCreateOption('recreate');
        switch (Twinkle.getPref('deliWatchUser')) {
            case 'yes':
                usertalkpage.setWatchlist(true);
                break;
            case 'no':
                usertalkpage.setWatchlistFromPreferences(false);
                break;
            default:
                usertalkpage.setWatchlistFromPreferences(true);
                break;
        }
        usertalkpage.setFollowRedirect(true);
        usertalkpage.append();

        // add this nomination to the user's userspace log, if the user has enabled it
        if (params.lognomination) {
            params.fromDI = true;
            Twinkle.speedy.callbacks.user.addToLog(params, initialContrib);
        }
    }
};

/*
 ****************************************
 *** twinkleimagetraverse.js: Image traverse module (sysops only)
 ****************************************
 * Mode of invocation:     Tab ("Traverse")
 * Active on:              Categories
 * Config directives in:   TwinkleConfig
 */

Twinkle.imagetraverse = function twinkleimagetraverse() {
    if( userIsInGroup( 'sysop' ) && wgNamespaceNumber == Namespace.CATEGORY ) {
        $(twAddPortletLink("#", "Traverse", "tw-imagetraverse", "Traverse category", "")).click(Twinkle.imagetraverse.callback);
    }
};

Twinkle.imagetraverse.basequery = {
    'action': 'query',
    'generator': 'categorymembers',
    'gcmtitle': wgPageName,
    'gcmnamespace': Namespace.IMAGE,
    'gcmlimit' : 1,
    'prop': [ 'imageinfo', 'categories', 'revisions' ],
    'rvlimit': 20,
    'iihistory': true,
    'rvprop': [ 'user', 'size', 'flags', 'ids', 'comment', 'timestamp' ],
    'iiprop': [ 'timestamp', 'user', 'url', 'size', 'comment' ]
};
Twinkle.imagetraverse.callback = function() {
    var Window = new SimpleWindow( 1200, 650 );
    Window.setTitle( "Image traverse" );
    Window.setScriptName( "Twinkle" );
    Window.addFooterLink( "Twinkle help", "WP:TW/DOC#imagetraverse" );

    var form = new QuickForm( Twinkle.imagetraverse.callback.evaluate );
    form.append( {
            type: 'button',
            label: 'Skip',
            event: Twinkle.imagetraverse.callbacks.skip
        } );
    form.append( {
            type: 'button',
            label: 'Delete',
            event: Twinkle.imagetraverse.callbacks.deleteMain
        } );
    form.append( {
            type: 'input',
            label: 'Reason',
            name: 'reason',
            value: 'Speedy deleted',
            size: 80
        } );
    form.append( {
            type: 'checkbox',
            list: [
                {
                    label: 'Remove image instances to the image',
                    name: 'unlink',
                    value: 'unlink',
                    checked: true
                }
            ]
        } );
    var root = document.createElement( 'table' );

    root.style.background = 'transparent';
    root.style.height = '780px';
    var row = root.appendChild( document.createElement( 'tr' ) );
    var options = row.appendChild(  document.createElement( 'td' ) );
    options.setAttribute( 'colspan', 2 );
    var rendered = form.render();
    options.appendChild( rendered );

    rendered.root = root;

    
    options.style.borderBottom = '1px solid gray';
    options.style.height = '80px';
    row = root.appendChild( document.createElement( 'tr' ) );
    var oview = row.appendChild(  document.createElement( 'td' ) );
    var ohistbox = row.appendChild(  document.createElement( 'td' ) );
    ohistbox.style.width = '250px';
    ohistbox.style.verticalAlign = 'top';
    var histbox = ohistbox.appendChild(  document.createElement( 'div' ) );
    histbox.style.overflow = 'auto';
    histbox.style.height = '500px';
    oview.style.verticalAlign = 'top';
    var view = oview.appendChild(  document.createElement( 'div' ) );
    view.style.height = '500px';
    view.style.overflow = 'auto';
    row = root.appendChild( document.createElement( 'tr' ) );
    var ostatus = row.appendChild(  document.createElement( 'td' ) );
    ostatus.style.borderTop = '1px solid gray';
    ostatus.setAttribute( 'colspan', 2 );
    var status = ostatus.appendChild(  document.createElement( 'div' ) );
    ostatus.style.verticalAlign = 'top';
    status.style.height = '180px';
    status.style.overflow = 'auto';
    Wikipedia.actionCompleted.event = function() {}; // just avoid it
    var wikipedia_api = new Wikipedia.api( 'Grabbing images', Twinkle.imagetraverse.basequery, Twinkle.imagetraverse.callbacks.main );
    wikipedia_api.params = { root:root, view:view, histbox:histbox, status:status, Window:Window };
    root.params = wikipedia_api.params;
    wikipedia_api.post();

    Status.init( status );
    Window.setContent( root );
    Window.display();
};

Twinkle.imagetraverse.callback.evaluate = function() {
};

function make_wikilink( page, title, oldid, diff ) {
    var query = {
        'title': page,
        'diff': diff,
        'oldid': oldid
    };
    var url = wgScriptPath + '/index.php?' + QueryString.create( query );
    var a = document.createElement( 'a' );
    a.setAttribute( 'href', url );
    a.setAttribute( 'title', page );
    a.appendChild( document.createTextNode( title ) );
    return a;
}

Twinkle.imagetraverse.callbacks = {
    main: function( self ) {
        var xmlDoc = self.responseXML;

        var image = xmlDoc.evaluate( '//pages/page/@title', xmlDoc, null, XPathResult.STRING_TYPE, null ).stringValue;

        if( !image ) {
            alert( 'no more images' );
            return;
        }
        var next = xmlDoc.evaluate( '//query-continue/categorymembers/@gcmcontinue', xmlDoc, null, XPathResult.STRING_TYPE, null ).stringValue;
        var pagehistory = xmlDoc.evaluate( '//pages/page/revisions/rev', xmlDoc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
        var filehistory = xmlDoc.evaluate( '//pages/page/imageinfo/ii', xmlDoc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
        var categories = xmlDoc.evaluate( '//pages/page/categories/cl', xmlDoc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );

        var pagehistorylist = document.createElement( 'ul' );
        var filehistorylist = document.createElement( 'ul' );
        var categorylist = document.createElement( 'ul' );

        var entry = document.createElement( 'li' );

        var i, cur, tmp, link;
        for( i = 0; i < pagehistory.snapshotLength; ++i ) {
            cur = pagehistory.snapshotItem(i);
            tmp = entry.cloneNode(false);
            tmp.appendChild( make_wikilink( image, cur.getAttribute( 'timestamp' ), cur.getAttribute( 'revid' ) ) );
            tmp.appendChild( document.createTextNode( ' ' ) );
            tmp.appendChild( make_wikilink( 'User:' + cur.getAttribute( 'user' ), cur.getAttribute( 'user' ) ) );
            tmp.appendChild( document.createTextNode( ' (' + ( new Bytes( cur.getAttribute( 'size' ) ) ).toString() + ') (' ) );
            tmp.appendChild( document.createElement( 'em' ) ).appendChild(document.createTextNode( cur.getAttribute( 'comment' ) ) );
            tmp.appendChild( document.createTextNode( ')' ) );
            pagehistorylist.appendChild( tmp );
        }
        
        for( i = 0; i < filehistory.snapshotLength; ++i ) {
            cur = filehistory.snapshotItem(i);
            tmp = entry.cloneNode(false);
            link = document.createElement( 'a' );
            link.setAttribute( 'href', cur.getAttribute( 'url' ) );
            link.appendChild( document.createTextNode( cur.getAttribute( 'timestamp' ) ) );
            tmp.appendChild( link );
            tmp.appendChild( document.createTextNode( ' ' ) );
            tmp.appendChild( make_wikilink( 'User:' + cur.getAttribute( 'user' ), cur.getAttribute( 'user' ) ) );
            tmp.appendChild( document.createTextNode( ' (' + ( new Bytes( cur.getAttribute( 'size' ) ) ).toString() + ') (' ) );
            tmp.appendChild( document.createElement( 'em' ) ).appendChild(document.createTextNode( cur.getAttribute( 'comment' ) ) );
            tmp.appendChild( document.createTextNode( ')' ) );
            filehistorylist.appendChild( tmp );
        }

        for( i = 0; i < categories.snapshotLength; ++i ) {
            cur = categories.snapshotItem(i);
            tmp = entry.cloneNode(false);
            tmp.appendChild( make_wikilink( cur.getAttribute( 'title' ), cur.getAttribute( 'title' ).replace( /Category:/, '' ) ) );
            categorylist.appendChild( tmp );
        }
        self.params.next = next;
        self.params.image = image;
        var hist = self.params.histbox;
        while( hist.hasChildNodes() ) {
            hist.removeChild( hist.lastChild );
        }
        hist.appendChild( document.createElement( 'h2' ) ).appendChild( document.createTextNode( 'Image usage' ) );
        var placeholder = hist.appendChild( document.createElement( 'div' ));
        placeholder.appendChild( document.createTextNode( 'Grabbing data...' ) );
        self.params.imageusageplaceholder = placeholder;
        hist.appendChild( document.createElement( 'h2' ) ).appendChild( document.createTextNode( 'Page history' ) );
        hist.appendChild( pagehistorylist );
        hist.appendChild( document.createElement( 'h2' ) ).appendChild( document.createTextNode( 'File history' ) );
        hist.appendChild( filehistorylist );
        hist.appendChild( document.createElement( 'h2' ) ).appendChild( document.createTextNode( 'Categories' ) );
        hist.appendChild( categorylist );

        var query = {
            'action': 'parse',
            'title': image,
            'text': '{{Wikipedia:WikiProject User scripts/Scripts/Twinkle/Template|' + image.replace(/^File:/, '') + '}}',
            'prop': 'text'
        };
        var wikipedia_api = new Wikipedia.api( 'Rendering', query, Twinkle.imagetraverse.callbacks.render1 );
        wikipedia_api.params = self.params;
        wikipedia_api.post();
    },
    render1: function( self ) {
        var xmlDoc = self.responseXML;
        var html = xmlDoc.evaluate( '//parse/text', xmlDoc, null, XPathResult.STRING_TYPE, null ).stringValue;
        self.params.view.innerHTML = html; // gah!

        // add instance usage
        var query = {
            'action': 'query',
            'list': 'imageusage',
            'iutitle': self.params.image,
            'iulimit': 20,
            'iufilterredir': 'nonredirects'
        };
        var wikipedia_api = new Wikipedia.api( 'Rendering', query, Twinkle.imagetraverse.callbacks.render2 );
        wikipedia_api.params = self.params;
        wikipedia_api.post();
    },
    render2: function( self ) {
        var xmlDoc = self.responseXML;
        var usage = xmlDoc.evaluate( '//imageusage/iu', xmlDoc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );

        var usagelist = document.createElement( 'ul' );

        var entry = document.createElement( 'li' );

        for( var i = 0; i < usage.snapshotLength; ++i ) {
            var cur = usage.snapshotItem(i);
            var tmp = entry.cloneNode(false);
            tmp.appendChild( make_wikilink( cur.getAttribute( 'title' ), cur.getAttribute( 'title' ) ) );
            usagelist.appendChild( tmp );
        }
        var hist = self.params.histbox;
        hist.replaceChild( usagelist, self.params.imageusageplaceholder );

    },
    next: function( params ) {
        Twinkle.imagetraverse.basequery.gcmcontinue = params.next;
        var wikipedia_api = new Wikipedia.api( 'Grabbing images', Twinkle.imagetraverse.basequery, Twinkle.imagetraverse.callbacks.main );
        wikipedia_api.params = params;
        wikipedia_api.post();
    },
    skip: function( event ) {
        var form = event.target.form;
        var params = form.root.params;
        Twinkle.imagetraverse.callbacks.next( params );
        Status.info( 'Skipped', params.image );
    },
    deleteMain: function( event ) {
        var form = event.target.form;
        var params = form.root.params;
        params.reason = form.reason.value;

        var query;
        if( form.unlink.checked ) {
            query = {
                'action': 'query',
                'list': 'imageusage',
                'titles': params.image,
                'iulimit': 5000,
                'iufilterredir': 'nonredirects'
            };
            var wikipedia_api = new Wikipedia.api( 'Grabbing image links', query, Twinkle.imagetraverse.callbacks.unlinkImageInstancesMain );
            wikipedia_api.params = params;

            wikipedia_api.post();
        }
        var imagepage = new Wikipedia.page( params.image, 'Deleting image');
        imagepage.setEditSummary( "Deleted because \"" + params.reason + "\"." + Twinkle.getPref('deletionSummaryAd'));
        imagepage.setCallbackParameters({'image': params.image});
        imagepage.deletePage();
    },
    unlinkImageInstancesMain: function( self ) {
        var xmlDoc = self.responseXML;
        var instances = [];
        $(xmlDoc).find('imageusage iu').each(function(){
            instances.push($(this).attr('title'));
        });
        if( instances.length === 0 ) {
            return;
        }

        $.each( instances, function(k,title) {
            page = new Wikipedia.page(title, "Unlinking instances on " + title);
            page.setFollowRedirect(true);
            page.setCallbackParameters({'image': self.params.image, 'reason': self.params.reason});
            page.load(Twinkle.imagetraverse.callbacks.unlinkImageInstances);

        });
    },
    unlinkImageInstances: function( self ) {
        var params = self.getCallbackParameters();
        var statelem = self.getStatusElement();

        var image = params.image.replace( /^(?:Image|File):/, '' );
        var old_text = self.getPageText();
        var wikiPage = new Mediawiki.Page( old_text );
        wikiPage.commentOutImage( image , 'Commented out because image was deleted' );
        var text = wikiPage.getText();

        if( text === old_text ) {
            statelem.error( 'failed to unlink image ' + image +' from ' + self.getPageName() );
            return;
        }
        self.setPageText(text);
        self.setEditSummary('Removing instance of file ' + image + " that has been deleted because \"" + params.reason + "\")" + "; " + Twinkle.getPref('deletionSummaryAd'));
        self.setCreateOption('nocreate');
        self.save();
    }
};

/*
 ****************************************
 *** twinkleprod.js: PROD module
 ****************************************
 * Mode of invocation:     Tab ("PROD")
 * Active on:              Existing articles which are not redirects
 * Config directives in:   TwinkleConfig
 */

Twinkle.prod = function twinkleprod() {
    if( mw.config.get('wgNamespaceNumber') !== 0 || !mw.config.get('wgCurRevisionId') || Wikipedia.isPageRedirect() ) {
        return;
    }
    if (twinkleUserAuthorized) {
        $(twAddPortletLink("#", "PROD", "tw-prod", "Propose deletion via WP:PROD", "")).click(Twinkle.prod.callback);
    } else {
        $(twAddPortletLink("#", 'PROD', 'tw-prod', 'Propose deletion via WP:PROD', '')).click(function() {
            alert("Your account is too new to use Twinkle.");
        });
    }
};

Twinkle.prod.callback = function twinkleprodCallback() {
    Twinkle.prod.defaultReason = Twinkle.getPref('prodReasonDefault');

    var Window = new SimpleWindow( 800, 410 );
    Window.setTitle( "Proposed deletion (PROD)" );
    Window.setScriptName( "Twinkle" );
    Window.addFooterLink( "Proposed deletion policy", "WP:PROD" );
    Window.addFooterLink( "BLP PROD policy", "WP:BLPPROD" );
    Window.addFooterLink( "Twinkle help", "WP:TW/DOC#prod" );

    var form = new QuickForm( Twinkle.prod.callback.evaluate );
    
    var field = form.append( {
            type: 'field',
            label: 'PROD type'
        } );
    field.append( {
            type: 'radio',
            name: 'prodtype',
            event: Twinkle.prod.callback.prodtypechanged,
            list: [
                {
                    label: 'PROD (proposed deletion)',
                    value: 'prod',
                    checked: true,
                    tooltip: 'Normal proposed deletion, per [[WP:PROD]]'
                },
                {
                    label: 'BLP PROD (proposed deletion of unsourced BLPs)',
                    value: 'prodblp',
                    tooltip: 'Proposed deletion of new, completely unsourced biographies of living persons, per [[WP:BLPPROD]]'
                }
            ]
        } );

    form.append( {
            type: 'field',
            label:'Work area',
            name: 'work_area'
        } );

    form.append( { type:'submit', label:'Propose deletion' } );    

    var result = form.render();
    Window.setContent( result );
    Window.display();
    
    // fake a change event on the first prod type radio, to initialize the type-dependent controls
    var evt = document.createEvent( "Event" );
    evt.initEvent( 'change', true, true );
    result.prodtype[0].dispatchEvent( evt );
};

Twinkle.prod.callback.prodtypechanged = function(event) {
  //prepare frame for prod type dependant controls
    var field = new QuickForm.element( {
            type: 'field',
            label: 'Parameters',
            name: 'work_area'
        } );
    // create prod type dependant controls
    switch( event.target.values )
    {
        case 'prod':
            field.append( {
                    type: 'checkbox',
                    list: [
                        {
                            label: 'Notify page creator if possible',
                            value: 'notify',
                            name: 'notify',
                            tooltip: "A notification template will be placed on the creator's talk page if this is true.",
                            checked: true
                        }
                    ]
                }
            );
            field.append( {
                    type: 'textarea',
                    name: 'reason',
                    label: 'Reason for proposed deletion:',
                    value: Twinkle.prod.defaultReason
                } );
            break;

        case 'prodblp':
          // first, remember the prod value that the user entered in the textarea, in case he wants to switch back. We can abuse the config field for that.
          if (event.target.form.reason) {
                Twinkle.prod.defaultReason = event.target.form.reason.value;
            }
        
            field.append( {
                    type: 'checkbox',
                    list: [
                        {
                            label: 'Notify page creator if possible',
                            value: 'notify',
                            name: 'notify',
                            tooltip: 'Creator of article has to be notified.',
                            checked: true,
                            disabled: true
                        }
                    ]
                }
            );
            //temp warning, can be removed down the line once BLPPROD is more established. Amalthea, May 2010.
            var boldtext = document.createElement('b');
            boldtext.appendChild(document.createTextNode('Please note that only unsourced biographies of living persons are eligible for this tag, narrowly construed.'));
            field.append({
                type: 'div',
                label: boldtext
            });
            if (mw.config.get('wgArticleId') < 26596183)
            {
                field.append({
                    type: 'header',
                    label: 'It appears that this article was created before March 18, 2010, and is thus ineligible for a BLP PROD. Please make sure that this is not the case, or use normal PROD instead.'
                });
            }
            break;
            
        default:
            break;
    }

    event.target.form.replaceChild( field.render(), $(event.target.form).find('fieldset[name="work_area"]')[0] );
};

Twinkle.prod.callbacks = {
    main: function(pageobj) {
        var statelem = pageobj.getStatusElement();

        if( !pageobj.exists() ) {
            statelem.error( "It seems that the page doesn't exist.  Perhaps it has already been deleted." );
            return;
        }
        
        var text = pageobj.getPageText();
        var params = pageobj.getCallbackParameters();

        var tag_re = /(\{\{(?:db-?|delete|[aitcmrs]fd|md1)[^{}]*?\|?[^{}]*?\}\})/i;
        if( tag_re.test( text ) ) {
            statelem.warn( 'Page already tagged with a deletion template, aborting procedure' );
            return;
        }

        // Remove tags that become superfluous with this action
        text = text.replace(/\{\{\s*(New unreviewed article|Userspace draft)\s*(\|(?:\{\{[^{}]*\}\}|[^{}])*)?\}\}\s*/ig, "");

        var prod_re = /\{\{\s*(?:dated prod|dated prod blp|Prod blp\/dated|Proposed deletion\/dated)\s*\|(?:\{\{[^\{\}]*\}\}|[^\}\{])*\}\}/i;
        var summaryText;
        if( !prod_re.test( text ) ) {
            // Notification to first contributor
            if( params.usertalk ) {
                var thispage = new Wikipedia.page(mw.config.get('wgPageName'));
                thispage.setCallbackParameters(params);
                thispage.lookupCreator(Twinkle.prod.callbacks.userNotification);
            }
            // If not notifying, log this PROD
            else if( Twinkle.getPref('logProdPages') ) {
                Twinkle.prod.callbacks.addToLog(params, null);
            }

            summaryText = "Proposing article for deletion per [[WP:" + (params.blp ? "BLP" : "") + "PROD]].";
            text = "{{subst:prod" + (params.blp ? " blp" : ("|1=" + params.reason)) + "}}\n" + text;
        }
        else {  // already tagged for PROD, so try endorsing it
            var prod2_re = /\{\{(?:Proposed deletion endorsed|prod-?2).*?\}\}/;
            if( prod2_re.test( text ) ) {
                statelem.warn( 'Page already tagged with {{prod}} and {{prod-2}} templates, aborting procedure' );
                return;
            }
            var confirmtext = "A {{prod}} tag was already found on this article. \nWould you like to add a {{prod-2}} (PROD endorsement) tag with your explanation?";
            if (params.blp) {
                confirmtext = "A non-BLP {{prod}} tag was found on this article.  \nWould you like to add a {{prod-2}} (PROD endorsement) tag with explanation \"unsourced BLP\"?";
            }
            if( !confirm( confirmtext ) ) {
                statelem.warn( 'Aborted per user request' );
                return;
            }

            summaryText = "Endorsing proposed deletion per [[WP:" + (params.blp ? "BLP" : "") + "PROD]].";
            text = text.replace( prod_re, text.match( prod_re ) + "\n{{prod-2|1=" + (params.blp ? "article is a [[WP:BLPPROD|biography of a living person with no sources]]" : params.reason) + "}}\n" );

            if( Twinkle.getPref('logProdPages') ) {
                params.logEndorsing = true;
                Twinkle.prod.callbacks.addToLog(params);
            }
        }

        pageobj.setPageText(text);
        pageobj.setEditSummary(summaryText + Twinkle.getPref('summaryAd'));
        pageobj.setWatchlist(Twinkle.getPref('watchProdPages'));
        pageobj.setCreateOption('nocreate');
        pageobj.save();
    },

    userNotification: function(pageobj) {
        var params = pageobj.getCallbackParameters();
        var initialContrib = pageobj.getCreator();
        var usertalkpage = new Wikipedia.page('User talk:' + initialContrib, "Notifying initial contributor (" + initialContrib + ")");
        var notifytext = "\n{{subst:prodwarning" + (params.blp ? "BLP" : "") + "|1=" + mw.config.get('wgPageName') + "|concern=" + params.reason + "}} ~~~~";
        usertalkpage.setAppendText(notifytext);
        usertalkpage.setEditSummary("Notification: proposed deletion of [[" + mw.config.get('wgPageName') + "]]." + Twinkle.getPref('summaryAd'));
        usertalkpage.setCreateOption('recreate');
        usertalkpage.setFollowRedirect(true);
        usertalkpage.append();
        if (Twinkle.getPref('logProdPages')) {
            params.logInitialContrib = initialContrib;
            Twinkle.prod.callbacks.addToLog(params);
        }
    },

    addToLog: function(params) {
        var wikipedia_page = new Wikipedia.page("User:" + mw.config.get('wgUserName') + "/" + Twinkle.getPref('prodLogPageName'), "Adding entry to userspace log");
        wikipedia_page.setCallbackParameters(params);
        wikipedia_page.load(Twinkle.prod.callbacks.saveLog);
    },

    saveLog: function(pageobj) {
        var text = pageobj.getPageText();
        var params = pageobj.getCallbackParameters();

        // add blurb if log page doesn't exist
        if (!pageobj.exists()) {
            text =
                "This is a log of all [[WP:PROD|proposed deletion]] tags applied or endorsed by this user using [[WP:TW|Twinkle]]'s PROD module.\n\n" +
                "If you no longer wish to keep this log, you can turn it off using the [[Wikipedia:Twinkle/Preferences|preferences panel]], and " +
                "nominate this page for speedy deletion under [[WP:CSD#U1|CSD U1]].\n";
        }

        // create monthly header
        var date = new Date();
        var headerRe = new RegExp("^==+\\s*" + date.getUTCMonthName() + "\\s+" + date.getUTCFullYear() + "\\s*==+", "m");
        if (!headerRe.exec(text)) {
            text += "\n\n=== " + date.getUTCMonthName() + " " + date.getUTCFullYear() + " ===";
        }

        var summarytext;
        if (params.logEndorsing) {
            text += "\n# [[" + mw.config.get('wgPageName') + "]]: endorsed " + (params.blp ? "BLP " : "") + "PROD. ~~~~~";
            if (params.reason) {
                text += "\n#* '''Reason''': " + params.reason + "\n";
            }
            summarytext = "Logging endorsement of PROD nomination of [[" + mw.config.get('wgPageName') + "]].";
        } else {
            text += "\n# [[" + mw.config.get('wgPageName') + "]]: " + (params.blp ? "BLP " : "") + "PROD";
            if (params.logInitialContrib) {
                text += "; notified {{user|" + params.logInitialContrib + "}}";
            }
            text += " ~~~~~\n";
            if (!params.blp) {
                text += "#* '''Reason''': " + params.reason + "\n";
            }
            summarytext = "Logging PROD nomination of [[" + mw.config.get('wgPageName') + "]].";
        }

        pageobj.setPageText(text);
        pageobj.setEditSummary(summarytext + Twinkle.getPref('summaryAd'));
        pageobj.setCreateOption("recreate");
        pageobj.save();
    }
};

Twinkle.prod.callback.evaluate = function twinkleprodCallbackEvaluate(e) {
    mw.config.set('wgPageName', mw.config.get('wgPageName').replace(/_/g, ' '));  // for queen/king/whatever and country!
    var form = e.target;
    var prodtype;

    var prodtypes = form.prodtype;
    for( var i = 0; i < prodtypes.length; i++ )
    {
        if( !prodtypes[i].checked ) {
            continue;
        }
        prodtype = prodtypes[i].values;
        break;
    }

    var params = {
        usertalk: form.notify.checked,
        blp: prodtype=='prodblp',
        reason: prodtype=='prodblp' ? '' : form.reason.value  // using an empty string here as fallback will help with prod-2.
    };

    SimpleWindow.setButtonsEnabled( false );
    Status.init( form );

    if (prodtype === 'prodblp' && mw.config.get('wgArticleId') < 26596183)
    {
        if (!confirm( "It appears that this article was created before March 18, 2010, and is thus ineligible for a BLP PROD. Do you want to continue tagging it?" ))
        {
            Status.warn( 'Notice', 'Aborting per user input.' );
            return;
        }
    }

    Wikipedia.actionCompleted.redirect = mw.config.get('wgPageName');
    Wikipedia.actionCompleted.notice = "Tagging complete";

    var wikipedia_page = new Wikipedia.page(mw.config.get('wgPageName'), "Tagging page");
    wikipedia_page.setFollowRedirect(true);  // for NPP, and also because redirects are ineligible for PROD
    wikipedia_page.setCallbackParameters(params);
    wikipedia_page.load(Twinkle.prod.callbacks.main);
};

/*
 ****************************************
 *** twinkleprotect.js: Protect/RPP module
 ****************************************
 * Mode of invocation:     Tab ("PP"/"RPP")
 * Active on:              Non-special pages
 * Config directives in:   TwinkleConfig
 */

Twinkle.protect = function twinkleprotect() {
    if ( mw.config.get('wgNamespaceNumber') < 0 ) {
        return;
    }

    if ( userIsInGroup( 'sysop' ) ) {
        $(twAddPortletLink("#", "PP", "tw-rpp", "Protect page", "")).click(Twinkle.protect.callback);
    } else if (twinkleUserAuthorized) {
        $(twAddPortletLink("#", "RPP", "tw-rpp", "Request page protection", "")).click(Twinkle.protect.callback);
    } else {
        $(twAddPortletLink("#", 'RPP', 'tw-rpp', 'Request page protection', '')).click(function() {
            alert("Your account is too new to use Twinkle.");
        });
    }
};

Twinkle.protect.callback = function twinkleprotectCallback() {
    var Window = new SimpleWindow( 620, 530 );
    Window.setTitle( userIsInGroup( 'sysop' ) ? "Apply, request or tag page protection" : "Request or tag page protection" );
    Window.setScriptName( "Twinkle" );
    Window.addFooterLink( "Protection templates", "Template:Protection templates" );
    Window.addFooterLink( "Protection policy", "WP:PROT" );
    Window.addFooterLink( "Twinkle help", "WP:TW/DOC#protect" );

    var form = new QuickForm( Twinkle.protect.callback.evaluate );
    var actionfield = form.append( {
            type: 'field',
            label: 'Type of action'
        } );
    if( userIsInGroup( 'sysop' ) ) {
        actionfield.append( {
                type: 'radio',
                name: 'actiontype',
                event: Twinkle.protect.callback.changeAction,
                list: [
                    {
                        label: 'Protect page',
                        value: 'protect',
                        tooltip: 'Apply actual protection to the page.',
                        checked: true
                    }
                ]
            } );
    }
    actionfield.append( {
            type: 'radio',
            name: 'actiontype',
            event: Twinkle.protect.callback.changeAction,
            list: [
                {
                    label: 'Request page protection',
                    value: 'request',
                    tooltip: 'If you want to request protection via WP:RPP' + (userIsInGroup('sysop') ? ' instead of doing the protection by yourself.' : '.'),
                    checked: !userIsInGroup('sysop')
                },
                {
                    label: 'Tag page with protection template',
                    value: 'tag',
                    tooltip: 'If the protecting admin forgot to apply a protection template, or you have just protected the page without tagging, you can use this to apply the appropriate protection tag.'
                }
            ]
        } );

    form.append({ type: 'field', label: 'Preset', name: 'field_preset' });
    form.append({ type: 'field', label: '1', name: 'field1' });
    form.append({ type: 'field', label: '2', name: 'field2' });

    form.append( { type:'submit' } );

    var result = form.render();
    Window.setContent( result );
    Window.display();

    // We must init the controls
    var evt = document.createEvent( "Event" );
    evt.initEvent( 'change', true, true );
    result.actiontype[0].dispatchEvent( evt );

    // reduce vertical height of dialog
    $('select[name="editlevel"], select[name="editexpiry"], select[name="moveexpiry"], select[name="movelevel"], select[name="createexpiry"], select[name="createlevel"]').
        parent().css({ display: 'inline-block', marginRight: '0.5em' });

    // get current protection level asynchronously
    Wikipedia.actionCompleted.postfix = false;  // avoid Action: completed notice
    if (userIsInGroup('sysop')) {
        var query = {
            action: 'query',
            prop: 'info',
            inprop: 'protection',
            titles: mw.config.get('wgPageName')
        };
        Status.init($('div[name="currentprot"] span').last()[0]);
        var statelem = new Status("Current protection level");
        var wpapi = new Wikipedia.api("retrieving...", query, Twinkle.protect.callback.protectionLevel, statelem);
        wpapi.post();
    }
};

Twinkle.protect.protectionLevel = null;

Twinkle.protect.callback.protectionLevel = function twinkleprotectCallbackProtectionLevel(apiobj) {
    var xml = apiobj.getXML();
    var result = [];
    $(xml).find('pr').each(function(index, pr) {
        var $pr = $(pr);
        var boldnode = document.createElement('b');
        boldnode.textContent = $pr.attr('type').toUpperCaseFirstChar() + ": " + $pr.attr('level');
        result.push(boldnode);
        if ($pr.attr('expiry') === 'infinity') {
            result.push(" (indefinite) ");
        } else {
            result.push(" (expires " + new Date($pr.attr('expiry')).toUTCString() + ") ");
        }
        if ($pr.attr('cascade') === '') {
            result.push("(cascading) ");
        }
    });
    if (!result.length) {
        var boldnode = document.createElement('b');
        boldnode.textContent = "no protection";
        result.push(boldnode);
    }
    Twinkle.protect.protectionLevel = result;
    apiobj.statelem.info(result);
    window.setTimeout(function() { Wikipedia.actionCompleted.postfix = "completed"; }, 500);  // restore actionCompleted message
};

Twinkle.protect.callback.changeAction = function twinkleprotectCallbackChangeAction(e) {
    var field_preset;
    var field1;
    var field2;

    switch (e.target.values) {
        case 'protect':
            field_preset = new QuickForm.element({ type: 'field', label: 'Preset', name: 'field_preset' });
            field_preset.append({
                    type: 'select',
                    name: 'category',
                    label: 'Choose a preset:',
                    event: Twinkle.protect.callback.changePreset,
                    list: (mw.config.get('wgArticleId') ? Twinkle.protect.protectionTypes : Twinkle.protect.protectionTypesCreate)
                });

            field2 = new QuickForm.element({ type: 'field', label: 'Protection options', name: 'field2' });
            field2.append({ type: 'div', name: 'currentprot', label: ' ' });  // holds the current protection level, as filled out by the async callback
            // for existing pages
            if (mw.config.get('wgArticleId')) {
                field2.append({
                        type: 'checkbox',
                        name: 'editmodify',
                        event: Twinkle.protect.formevents.editmodify,
                        list: [
                            {
                                label: 'Modify edit protection',
                                value: 'editmodify',
                                tooltip: 'If this is turned off, the edit protection level, and expiry time, will be left as is.',
                                checked: true
                            }
                        ]
                    });
                var editlevel = field2.append({
                        type: 'select',
                        name: 'editlevel',
                        label: 'Edit protection:',
                        event: Twinkle.protect.formevents.editlevel
                    });
                editlevel.append({
                        type: 'option',
                        label: 'All',
                        value: 'all'
                    });
                editlevel.append({
                        type: 'option',
                        label: 'Autoconfirmed',
                        value: 'autoconfirmed'
                    });
                editlevel.append({
                        type: 'option',
                        label: 'Sysop',
                        value: 'sysop',
                        selected: true
                    });
                field2.append({
                        type: 'select',
                        name: 'editexpiry',
                        label: 'Expires:',
                        event: function(e) {
                            if (e.target.value === 'custom') {
                                Twinkle.protect.doCustomExpiry(e.target);
                            }
                        },
                        list: [
                            { label: '1 hour', value: '1 hour' },
                            { label: '2 hours', value: '2 hours' },
                            { label: '3 hours', value: '3 hours' },
                            { label: '6 hours', value: '6 hours' },
                            { label: '12 hours', value: '12 hours' },
                            { label: '1 day', value: '1 day' },
                            { label: '2 days', selected: true, value: '2 days' },
                            { label: '3 days', value: '3 days' },
                            { label: '4 days', value: '4 days' },
                            { label: '1 week', value: '1 week' },
                            { label: '2 weeks', value: '2 weeks' },
                            { label: '1 month', value: '1 month' },
                            { label: '2 months', value: '2 months' },
                            { label: '3 months', value: '3 months' },
                            { label: '1 year', value: '1 year' },
                            { label: 'indefinite', value:'indefinite' },
                            { label: 'Custom...', value: 'custom' }
                        ]
                    });
                field2.append({
                        type: 'checkbox',
                        name: 'movemodify',
                        event: Twinkle.protect.formevents.movemodify,
                        list: [
                            {
                                label: 'Modify move protection',
                                value: 'movemodify',
                                tooltip: 'If this is turned off, the move protection level, and expiry time, will be left as is.',
                                checked: true
                            }
                        ]
                    });
                var movelevel = field2.append({
                        type: 'select',
                        name: 'movelevel',
                        label: 'Move protection:',
                        event: Twinkle.protect.formevents.movelevel
                    });
                movelevel.append({
                        type: 'option',
                        label: 'All',
                        value: 'all'
                    });
                movelevel.append({
                        type: 'option',
                        label: 'Autoconfirmed',
                        value: 'autoconfirmed'
                    });
                movelevel.append({
                        type: 'option',
                        label: 'Sysop',
                        value: 'sysop',
                        selected: true
                    });
                field2.append({
                        type: 'select',
                        name: 'moveexpiry',
                        label: 'Expires:',
                        event: function(e) {
                            if (e.target.value === 'custom') {
                                Twinkle.protect.doCustomExpiry(e.target);
                            }
                        },
                        list: [
                            { label: '1 hour', value: '1 hour' },
                            { label: '2 hours', value: '2 hours' },
                            { label: '3 hours', value: '3 hours' },
                            { label: '6 hours', value: '6 hours' },
                            { label: '12 hours', value: '12 hours' },
                            { label: '1 day', value: '1 day' },
                            { label: '2 days', selected: true, value: '2 days' },
                            { label: '3 days', value: '3 days' },
                            { label: '4 days', value: '4 days' },
                            { label: '1 week', value: '1 week' },
                            { label: '2 weeks', value: '2 weeks' },
                            { label: '1 month', value: '1 month' },
                            { label: '2 months', value: '2 months' },
                            { label: '3 months', value: '3 months' },
                            { label: '1 year', value: '1 year' },
                            { label: 'indefinite', value:'indefinite' },
                            { label: 'Custom...', value: 'custom' }
                        ]
                    });
            } else {  // for non-existing pages
                var createlevel = field2.append({
                        type: 'select',
                        name: 'createlevel',
                        label: 'Create protection:',
                        event: Twinkle.protect.formevents.createlevel
                    });
                createlevel.append({
                        type: 'option',
                        label: 'All (registered users)',
                        value: 'all'
                    });
                createlevel.append({
                        type: 'option',
                        label: 'Autoconfirmed',
                        value: 'autoconfirmed'
                    });
                createlevel.append({
                        type: 'option',
                        label: 'Sysop',
                        value: 'sysop',
                        selected: true
                    });
                field2.append({
                        type: 'select',
                        name: 'createexpiry',
                        label: 'Expires:',
                        event: function(e) {
                            if (e.target.value === 'custom') {
                                Twinkle.protect.doCustomExpiry(e.target);
                            }
                        },
                        list: [
                            { label: '1 hour', value: '1 hour' },
                            { label: '2 hours', value: '2 hours' },
                            { label: '3 hours', value: '3 hours' },
                            { label: '6 hours', value: '6 hours' },
                            { label: '12 hours', value: '12 hours' },
                            { label: '1 day', value: '1 day' },
                            { label: '2 days', value: '2 days' },
                            { label: '3 days', value: '3 days' },
                            { label: '4 days', value: '4 days' },
                            { label: '1 week', value: '1 week' },
                            { label: '2 weeks', value: '2 weeks' },
                            { label: '1 month', value: '1 month' },
                            { label: '2 months', value: '2 months' },
                            { label: '3 months', value: '3 months' },
                            { label: '1 year', value: '1 year' },
                            { label: 'indefinite', selected: true, value: 'indefinite' },
                            { label: 'Custom...', value: 'custom' }
                        ]
                    });
            }
            field2.append({
                    type: 'textarea',
                    name: 'reason',
                    label: 'Protection reason (for log):'
                });
            if (!mw.config.get('wgArticleId')) {  // tagging isn't relevant for non-existing pages
                break;
            }
            /* falls through */
        case 'tag':
            field1 = new QuickForm.element({ type: 'field', label: 'Tagging options', name: 'field1' });
            field1.append( {
                    type: 'select',
                    name: 'tagtype',
                    label: 'Choose protection template:',
                    list: Twinkle.protect.protectionTags,
                    event: Twinkle.protect.formevents.tagtype
                } );
            field1.append( {
                    type: 'checkbox',
                    list: [
                        {
                            name: 'small',
                            label: 'Iconify (small=yes)',
                            tooltip: 'Will use the |small=yes feature of the template, and only render it as a keylock',
                            checked: true
                        },
                        {
                            name: 'noinclude',
                            label: 'Wrap protection template with <noinclude>',
                            tooltip: 'Will wrap the protection template in &lt;noinclude&gt; tags, so that it won\'t transclude',
                            checked: (mw.config.get('wgNamespaceNumber') === 10)
                        }
                    ]
                } );
            break;

        case 'request':
            field_preset = new QuickForm.element({ type: 'field', label: 'Type of protection', name: 'field_preset' });
            field_preset.append({
                    type: 'select',
                    name: 'category',
                    label: 'Type and reason:',
                    event: Twinkle.protect.callback.changePreset,
                    list: (mw.config.get('wgArticleId') ? Twinkle.protect.protectionTypes : Twinkle.protect.protectionTypesCreate)
                });

            field1 = new QuickForm.element({ type: 'field', label: 'Options', name: 'field1' });
            field1.append( {
                    type: 'select',
                    name: 'expiry',
                    label: 'Duration: ',
                    list: [
                        { label: 'Temporary', value: 'temporary' },
                        { label: 'Indefinite', value: 'indefinite' },
                        { label: '', selected: true, value: '' }
                    ]
                } );
            field1.append({
                    type: 'textarea',
                    name: 'reason',
                    label: 'Reason: '
                });
            break;
        default:
            alert("Something's afoot in twinkleprotect");
            break;
    }

    var oldfield;
    if (field_preset) {
        oldfield = $(e.target.form).find('fieldset[name="field_preset"]')[0];
        oldfield.parentNode.replaceChild(field_preset.render(), oldfield);
    } else {
        $(e.target.form).find('fieldset[name="field_preset"]').css('display', 'none');
    }
    if (field1) {
        oldfield = $(e.target.form).find('fieldset[name="field1"]')[0];
        oldfield.parentNode.replaceChild(field1.render(), oldfield);
    } else {
        $(e.target.form).find('fieldset[name="field1"]').css('display', 'none');
    }
    if (field2) {
        oldfield = $(e.target.form).find('fieldset[name="field2"]')[0];
        oldfield.parentNode.replaceChild(field2.render(), oldfield);
    } else {
        $(e.target.form).find('fieldset[name="field2"]').css('display', 'none');
    }

    // re-add protection level text, if it's available
    if (e.target.values === 'protect' && Twinkle.protect.protectionLevel) {
        Status.init($('div[name="currentprot"] span').last()[0]);
        Status.info("Current protection level", Twinkle.protect.protectionLevel);
    }
};

Twinkle.protect.formevents = {
    editmodify: function twinkleprotectFormEditmodifyEvent(e) {
        e.target.form.editlevel.disabled = !e.target.checked;
        e.target.form.editexpiry.disabled = !e.target.checked || (e.target.form.editlevel.value === 'all');
        e.target.form.editlevel.style.color = e.target.form.editexpiry.style.color = (e.target.checked ? "" : "transparent");
    },
    editlevel: function twinkleprotectFormEditlevelEvent(e) {
        e.target.form.editexpiry.disabled = (e.target.value === 'all');
    },
    movemodify: function twinkleprotectFormMovemodifyEvent(e) {
        e.target.form.movelevel.disabled = !e.target.checked;
        e.target.form.moveexpiry.disabled = !e.target.checked || (e.target.form.movelevel.value === 'all');
        e.target.form.movelevel.style.color = e.target.form.moveexpiry.style.color = (e.target.checked ? "" : "transparent");
    },
    movelevel: function twinkleprotectFormMovelevelEvent(e) {
        e.target.form.moveexpiry.disabled = (e.target.value === 'all');
    },
    createlevel: function twinkleprotectFormCreatelevelEvent(e) {
        e.target.form.createexpiry.disabled = (e.target.value === 'all');
    },
    tagtype: function twinkleprotectFormTagtypeEvent(e) {
        e.target.form.small.disabled = e.target.form.noinclude.disabled = (e.target.value === 'none') || (e.target.value === 'noop');
    }
};

Twinkle.protect.doCustomExpiry = function twinkleprotectDoCustomExpiry(target) {
    var custom = prompt('Enter a custom expiry time.  \nYou can use relative times, like "1 minute" or "19 days", or absolute timestamps, "yyyymmddhhmm" (e.g. "200602011406" is Feb 1, 2006, at 14:06 UTC).', '');
    if (custom) {
        var option = document.createElement('option');
        option.setAttribute('value', custom);
        option.textContent = custom;
        target.appendChild(option);
        target.value = custom;
    }
};

Twinkle.protect.protectionTypes = [
    {
        label: 'Full protection',
        list: [
            { label: 'Generic (full)', value: 'pp-protected' },
            { label: 'Content dispute/edit warring (full)', selected: userIsInGroup('sysop'), value: 'pp-dispute' },
            { label: 'Persistent vandalism (full)', value: 'pp-vandalism' },
            { label: 'Highly visible template (full)', value: 'pp-template' },
            { label: 'User talk of blocked user (full)', value: 'pp-usertalk' }
        ]
    },
    {
        label: 'Semi-protection',
        list: [
            { label: 'Generic (semi)', value: 'pp-semi-protected' },
            { label: 'Persistent vandalism (semi)', selected: !userIsInGroup('sysop'), value: 'pp-semi-vandalism' },
            { label: 'BLP policy violations (semi)', value: 'pp-semi-blp' },
            { label: 'Sockpuppetry (semi)', value: 'pp-semi-sock' },
            { label: 'Highly visible template (semi)', value: 'pp-semi-template' },
            { label: 'User talk of blocked user (semi)', value: 'pp-semi-usertalk' }
        ]
    },
    {
        label: 'Move protection',
        list: [
            { label: 'Generic (move)', value: 'pp-move' },
            { label: 'Dispute/move warring (move)', value: 'pp-move-dispute' },
            { label: 'Page-move vandalism (move)', value: 'pp-move-vandalism' },
            { label: 'Highly visible page (move)', value: 'pp-move-indef' }
        ]
    },
    { label: 'Unprotection', value: 'unprotect' }
];

Twinkle.protect.protectionTypesCreate = [
    {
        label: 'Create protection',
        list: [
            { label: 'Generic ({{pp-create}})', value: 'pp-create' },
            { label: 'Offensive name', value: 'pp-create-offensive' },
            { label: 'Repeatedly recreated', selected: true, value: 'pp-create-salt' },
            { label: 'Recently deleted BLP', value: 'pp-create-blp' }
        ]
    },
    { label: 'Unprotection', value: 'unprotect' }
];

// NOTICE: keep this synched with [[MediaWiki:Protect-dropdown]]
Twinkle.protect.protectionPresetsInfo = {
    'pp-protected': {
        edit: 'sysop',
        move: 'sysop',
        reason: null
    },
    'pp-dispute': {
        edit: 'sysop',
        move: 'sysop',
        reason: '[[WP:PP#Content disputes|Edit warring / Content dispute]]'
    },
    'pp-vandalism': {
        edit: 'sysop',
        move: 'sysop',
        reason: 'Persistent [[WP:Vandalism|vandalism]]'
    },
    'pp-template': {
        edit: 'sysop',
        move: 'sysop',
        reason: '[[WP:High-risk templates|Highly visible template]]'
    },
    'pp-usertalk': {
        edit: 'sysop',
        move: 'sysop',
        reason: '[[WP:PP#Talk-page protection|Inappropriate use of user talk page while blocked]]'
    },
    'pp-semi-vandalism': {
        edit: 'autoconfirmed',
        reason: 'Persistent [[WP:Vandalism|vandalism]]',
        template: 'pp-vandalism'
    },
    'pp-semi-blp': {
        edit: 'autoconfirmed',
        reason: 'Violations of the [[WP:Biographies of living persons|biographies of living persons policy]]'
    },
    'pp-semi-usertalk': {
        edit: 'autoconfirmed',
        move: 'sysop',
        reason: '[[WP:PP#Talk-page protection|Inappropriate use of user talk page while blocked]]'
    },
    'pp-semi-template': {
        edit: 'autoconfirmed',
        move: 'sysop',
        reason: '[[WP:High-risk templates|Highly visible template]]',
        template: 'pp-template'
    },
    'pp-semi-sock': {
        edit: 'autoconfirmed',
        reason: 'Persistent [[WP:Sock puppetry|sock puppetry]]'
    },
    'pp-semi-protected': {
        edit: 'autoconfirmed',
        reason: null,
        template: 'pp-protected'
    },
    'pp-move': {
        move: 'sysop',
        reason: null
    },
    'pp-move-dispute': {
        move: 'sysop',
        reason: '[[WP:MOVP|Move warring]]'
    },
    'pp-move-vandalism': {
        move: 'sysop',
        reason: '[[WP:MOVP|Page-move vandalism]]'
    },
    'pp-move-indef': {
        move: 'sysop',
        reason: '[[WP:MOVP|Highly visible page]]'
    },
    'unprotect': {
        edit: 'all',
        move: 'all',
        create: 'all',
        reason: null,
        template: 'none'
    },
    'pp-create-offensive': {
        create: 'sysop',
        reason: '[[WP:SALT|Offensive name]]'
    },
    'pp-create-salt': {
        create: 'sysop',
        reason: '[[WP:SALT|Repeatedly recreated]]'
    },
    'pp-create-blp': {
        create: 'sysop',
        reason: '[[WP:BLPDEL|Recently deleted BLP]]'
    },
    'pp-create': {
        create: 'sysop',
        reason: '{{pp-create}}'
    }
};

Twinkle.protect.protectionTags = [
    {
        label: 'None (remove existing protection templates)',
        value: 'none'
    },
    {
        label: 'None (do not remove existing protection templates)',
        value: 'noop'
    },
    {
        label: 'Full protection templates',
        list: [
            { label: '{{pp-dispute}}: dispute/edit war', value: 'pp-dispute', selected: true },
            { label: '{{pp-usertalk}}: blocked user talk', value: 'pp-usertalk' }
        ]
    },
    {
        label: 'Full/semi-protection templates',
        list: [
            { label: '{{pp-vandalism}}: vandalism', value: 'pp-vandalism' },
            { label: '{{pp-template}}: high-risk template', value: 'pp-template' },
            { label: '{{pp-protected}}: general protection', value: 'pp-protected' }
        ]
    },
    {
        label: 'Semi-protection templates',
        list: [
            { label: '{{pp-semi-usertalk}}: blocked user talk', value: 'pp-semi-usertalk' },
            { label: '{{pp-semi-sock}}: sockpuppetry', value: 'pp-semi-sock' },
            { label: '{{pp-semi-blp}}: BLP violations', value: 'pp-semi-blp' },
            { label: '{{pp-semi-indef}}: general long-term', value: 'pp-semi-indef' }
        ]
    },
    {
        label: 'Move protection templates',
        list: [
            { label: '{{pp-move-dispute}}: dispute/move war', value: 'pp-move-dispute' },
            { label: '{{pp-move-vandalism}}: page-move vandalism', value: 'pp-move-vandalism' },
            { label: '{{pp-move-indef}}: general long-term', value: 'pp-move-indef' },
            { label: '{{pp-move}}: other', value: 'pp-move' }
        ]
    }
];

Twinkle.protect.callback.changePreset = function twinkleprotectCallbackChangePreset(e) {
    var form = e.target.form;

    var actiontypes = form.actiontype;
    var actiontype;
    for( var i = 0; i < actiontypes.length; i++ )
    {
        if( !actiontypes[i].checked ) {
            continue;
        }
        actiontype = actiontypes[i].values;
        break;
    }

    if (actiontype === 'protect') {  // actually protecting the page
        var item = Twinkle.protect.protectionPresetsInfo[form.category.value];
        if (mw.config.get('wgArticleId')) {
            if (item.edit) {
                form.editmodify.checked = true;
                Twinkle.protect.formevents.editmodify({ target: form.editmodify });
                form.editlevel.value = item.edit;
                Twinkle.protect.formevents.editlevel({ target: form.editlevel });
            } else {
                form.editmodify.checked = false;
                Twinkle.protect.formevents.editmodify({ target: form.editmodify });
            }

            if (item.move) {
                form.movemodify.checked = true;
                Twinkle.protect.formevents.movemodify({ target: form.movemodify });
                form.movelevel.value = item.move;
                Twinkle.protect.formevents.movelevel({ target: form.movelevel });
            } else {
                form.movemodify.checked = false;
                Twinkle.protect.formevents.movemodify({ target: form.movemodify });
            }
        } else {
            if (item.create) {
                form.createlevel.value = item.create;
                Twinkle.protect.formevents.createlevel({ target: form.createlevel });
            }
        }

        if (item.reason) {
            form.reason.value = item.reason;
        } else {
            form.reason.value = '';
        }

        // sort out tagging options
        if (mw.config.get('wgArticleId')) {
            if( form.category.value === 'unprotect' ) {
                form.tagtype.value = 'none';
            } else {
                form.tagtype.value = (item.template ? item.template : form.category.value);
            }
            Twinkle.protect.formevents.tagtype({ target: form.tagtype });

            if( /template/.test( form.category.value ) ) {
                form.noinclude.checked = true;
                form.editexpiry.value = form.moveexpiry.value = "indefinite";
            } else {
                form.noinclude.checked = false;
            }
        }

    } else {  // RPP request
        if( form.category.value === 'unprotect' ) {
            form.expiry.value = '';
            form.expiry.disabled = true;
        } else {
            form.expiry.disabled = false;
        }
    }
};

Twinkle.protect.callback.evaluate = function twinkleprotectCallbackEvaluate(e) {
    var form = e.target;

    var actiontypes = form.actiontype;
    var actiontype;
    for( var i = 0; i < actiontypes.length; i++ )
    {
        if( !actiontypes[i].checked ) {
            continue;
        }
        actiontype = actiontypes[i].values;
        break;
    }

    if( actiontype === 'tag' || actiontype === 'protect' ) {
        tagparams = {
            tag: form.tagtype.value,
            reason: ((form.tagtype.value === 'pp-protected' || form.tagtype.value === 'pp-semi-protected' || form.tagtype.value === 'pp-move') && form.reason) ? form.reason.value : null,
            expiry: (actiontype === 'protect') ? (form.editmodify.checked ? form.editexpiry.value : (form.movemodify.checked ?
                form.moveexpiry.value : null)) : null,
                small: form.small.checked,
                noinclude: form.noinclude.checked
        };
    }

    switch (actiontype) {
        case 'protect':
            // protect the page
            var thispage = new Wikipedia.page(mw.config.get('wgPageName'), "Protecting page");
            if (mw.config.get('wgArticleId')) {
                if (form.editmodify.checked) {
                    thispage.setEditProtection(form.editlevel.value, form.editexpiry.value);
                }
                if (form.movemodify.checked) {
                    thispage.setMoveProtection(form.movelevel.value, form.moveexpiry.value);
                }
            } else {
                thispage.setCreateProtection(form.createlevel.value, form.createexpiry.value);
            }
            if (form.reason.value) {
                thispage.setEditSummary(form.reason.value);
            } else {
                alert("You must enter a protect reason, which will be inscribed into the protection log.");
                return;
            }

            SimpleWindow.setButtonsEnabled( false );
            Status.init( form );

            Wikipedia.actionCompleted.redirect = mw.config.get('wgPageName');
            Wikipedia.actionCompleted.notice = "Protection complete";

            thispage.protect();
            /* falls through */
        case 'tag':

            if (actiontype === 'tag') {
                SimpleWindow.setButtonsEnabled( false );
                Status.init( form );
                Wikipedia.actionCompleted.redirect = mw.config.get('wgPageName');
                Wikipedia.actionCompleted.followRedirect = false;
                Wikipedia.actionCompleted.notice = "Tagging complete";
            }

            if (tagparams.tag === 'noop') {
                Status.info("Applying protection template", "nothing to do");
                break;
            }

            var protectedPage = new Wikipedia.page( mw.config.get('wgPageName'), 'Tagging page');
            protectedPage.setCallbackParameters( tagparams );
            protectedPage.load( Twinkle.protect.callbacks.taggingPage );
            break;

        case 'request':
            // file request at RPP
            var typename, typereason;
            switch( form.category.value ) {
                case 'pp-dispute':
                case 'pp-vandalism':
                case 'pp-template':
                case 'pp-usertalk':
                case 'pp-protected':
                    typename = 'full protection';
                    break;
                case 'pp-semi-vandalism':
                case 'pp-semi-usertalk':
                case 'pp-semi-template':
                case 'pp-semi-sock':
                case 'pp-semi-blp':
                case 'pp-semi-protected':
                    typename = 'semi-protection';
                    break;
                case 'pp-move':
                case 'pp-move-dispute':
                case 'pp-move-indef':
                case 'pp-move-vandalism':
                    typename = 'move protection';
                    break;
                case 'pp-create':
                case 'pp-create-offensive':
                case 'pp-create-blp':
                case 'pp-create-salt':
                    typename = 'create protection';
                    break;
                case 'unprotect':
                    /* falls through */
                default:
                    typename = 'unprotection';
                    break;
            }
            switch (form.category.value) {
                case 'pp-dispute':
                    typereason = 'Content dispute/edit warring';
                    break;
                case 'pp-vandalism':
                case 'pp-semi-vandalism':
                    typereason = 'Persistent vandalism';
                    break;
                case 'pp-template':
                case 'pp-semi-template':
                    typereason = 'Highly visible template';
                    break;
                case 'pp-usertalk':
                case 'pp-semi-usertalk':
                    typereason = 'Inappropriate use of user talk page while blocked';
                    break;
                case 'pp-semi-sock':
                    typereason = 'Persistent sockpuppetry';
                    break;
                case 'pp-semi-blp':
                    typereason = '[[WP:BLP|BLP]] policy violations';
                    break;
                case 'pp-move-dispute':
                    typereason = 'Page title dispute/move warring';
                    break;
                case 'pp-move-vandalism':
                    typereason = 'Page-move vandalism';
                    break;
                case 'pp-move-indef':
                    typereason = 'Highly visible page';
                    break;
                case 'pp-create-offensive':
                    typereason = 'Offensive name';
                    break;
                case 'pp-create-blp':
                    typereason = 'Recently deleted [[WP:BLP|BLP]]';
                    break;
                case 'pp-create-salt':
                    typereason = 'Repeatedly recreated';
                    break;
                default:
                    typereason = '';
                    break;
            }

            var reason = typereason;
            if( form.reason.value !== '') {
                if ( typereason !== '' ) {
                    reason += "\u00A0\u2013 ";  // U+00A0 NO-BREAK SPACE; U+2013 EN RULE
                }
                reason += form.reason.value;
            }
            if( reason !== '' && reason.charAt( reason.length - 1 ) !== '.' ) {
                reason += '.';
            }

            var rppparams = {
                reason: reason,
                typename: typename,
                category: form.category.value,
                expiry: form.expiry.value
            };

            SimpleWindow.setButtonsEnabled( false );
            Status.init( form );

            rppName = 'Wikipedia:Requests for page protection';

            // Updating data for the action completed event
            Wikipedia.actionCompleted.redirect = rppName;
            Wikipedia.actionCompleted.notice = "Nomination completed, redirecting now to the discussion page";

            var rppPage = new Wikipedia.page( rppName, 'Requesting protection of page');
            rppPage.setFollowRedirect( true );
            rppPage.setCallbackParameters( rppparams );
            rppPage.load( Twinkle.protect.callbacks.fileRequest );
            break;
        default:
            alert("twinkleprotect: unknown kind of action");
            break;
    }
};

Twinkle.protect.callbacks = {
    taggingPage: function( protectedPage ) {
        var params = protectedPage.getCallbackParameters();
        var text = protectedPage.getPageText();
        var tag, summary;

        var oldtag_re = /\s*(?:<noinclude>)?\s*\{\{\s*(pp-[^{}]*?|protected|(?:t|v|s|p-|usertalk-v|usertalk-s|sb|move)protected(?:2)?|protected template|privacy protection)\s*?\}\}\s*(?:<\/noinclude>)?\s*/gi;

        text = text.replace( oldtag_re, '' );

        if ( params.tag !== 'none' ) {
            tag = params.tag;
            if( params.reason ) {
                tag += '|reason=' + params.reason;
            }
            if( ['indefinite', 'infinite', 'never', null].indexOf(params.expiry) === -1 ) {
                tag += '|expiry={{subst:#time:F j, Y|' + (/^\s*\d+\s*$/.exec(params.expiry) ? params.expiry : '+' + params.expiry) + '}}';
            }
            if( params.small ) {
                tag += '|small=yes';
            }
        }

        if( params.tag === 'none' ) {
            summary = 'Removing protection template' + Twinkle.getPref('summaryAd');
        } else {
            if( params.noinclude ) {
                text = "<noinclude>{{" + tag + "}}</noinclude>" + text;
            } else {
                text = "{{" + tag + "}}\n" + text;
            }
            summary = "Adding {{" + params.tag + "}}" + Twinkle.getPref('summaryAd');
        }

        protectedPage.setEditSummary( summary );
        protectedPage.setPageText( text );
        protectedPage.setCreateOption( 'nocreate' );
        protectedPage.save();
    },

    fileRequest: function( rppPage ) {

        var params = rppPage.getCallbackParameters();
        var text = rppPage.getPageText();
        var statusElement = rppPage.getStatusElement();

        var ns2tag = {
            '0': 'la',
            '1': 'lat',
            '2': 'lu',
            '3': 'lut',
            '4': 'lw',
            '5': 'lwt',
            '6': 'lf',
            '7': 'lft',
            '8': 'lm',
            '9': 'lmt',
            '10': 'lt',
            '11': 'ltt',
            '12': 'lh',
            '13': 'lht',
            '14': 'lc',
            '15': 'lct',
            '100': 'lp',
            '101': 'lpt',
            '108': 'lb',
            '109': 'lbt'
        };

        var rppRe = new RegExp( '====\\s*\\{\\{\\s*' + ns2tag[ mw.config.get('wgNamespaceNumber') ] + '\\s*\\|\\s*' + RegExp.escape( mw.config.get('wgTitle'), true ) + '\\s*\\}\\}\\s*====', 'm' );
        var tag = rppRe.exec( text );

        var rppLink = document.createElement('a');
        rppLink.setAttribute('href', mw.util.wikiGetlink(rppPage.getPageName()) );
        rppLink.appendChild(document.createTextNode(rppPage.getPageName()));

        if ( tag ) {
            statusElement.error( [ 'There is already a protection request for this page at ', rppLink, ', aborting.' ] );
            return;
        }

        var newtag = '==== {{' + ns2tag[ mw.config.get('wgNamespaceNumber') ] + '|' + mw.config.get('wgTitle') +  '}} ====' + "\n";
        if( ( new RegExp( '^' + RegExp.escape( newtag ).replace( /\s+/g, '\\s*' ), 'm' ) ).test( text ) ) {
            statusElement.error( [ 'There is already a protection request for this page at ', rppLink, ', aborting.' ] );
            return;
        }

        var words;
        switch( params.expiry ) {
        case 'temporary':
            words = "Temporary ";
            break;
        case 'indefinite':
            words = "Indefinite ";
            break;
        default:
            words = "";
            break;
        }

        words += params.typename;

        newtag += "'''" + words.toUpperCaseFirstChar() + ( params.reason !== '' ? ":''' " + params.reason : ".'''" ) + " ~~~~";

        var reg;
        if ( params.category === 'unprotect' ) {
            reg = /(\n==\s*Current requests for unprotection\s*==\s*\n\s*\{\{[^\}\}]+\}\}\s*\n)/;
        } else {
            reg = /(\n==\s*Current requests for protection\s*==\s*\n\s*\{\{[^\}\}]+\}\}\s*\n)/;
        }
        var originalTextLength = text.length;
        text = text.replace( reg, "$1" + newtag + "\n");
        if (text.length === originalTextLength)
        {
            statusElement.error( 'Could not find relevant "current requests for ..." heading on WP:RFPP. Aborting.' );
            return;
        }
        statusElement.status( 'Adding new request...' );
        rppPage.setEditSummary( "Requesting " + params.typename + ' of [[' + mw.config.get('wgPageName').replace(/_/g, ' ') + ']].' + Twinkle.getPref('summaryAd') );
        rppPage.setPageText( text );
        rppPage.setCreateOption( 'recreate' );
        rppPage.save();
    }
};

/*
 ****************************************
 *** twinklespeedy.js: CSD module
 ****************************************
 * Mode of invocation:     Tab ("CSD")
 * Active on:              Non-special, existing pages
 * Config directives in:   TwinkleConfig
 *
 * NOTE FOR DEVELOPERS:
 *   If adding a new criterion, check out the default values of the CSD preferences
 *   in twinkle.header.js, and add your new criterion to those if you think it would
 *   be good.
 */

Twinkle.speedy = function twinklespeedy() {
    // Disable on:
    // * special pages
    // * non-existent pages
    if (mw.config.get('wgNamespaceNumber') < 0 || !mw.config.get('wgArticleId')) {
        return;
    }

    if ( userIsInGroup( 'sysop' ) ) {
        $(twAddPortletLink("#", "CSD", "tw-csd", "Delete page according to WP:CSD", "")).click(Twinkle.speedy.callback);
    } else if (twinkleUserAuthorized) {
        $(twAddPortletLink("#", "CSD", "tw-csd", "Request speedy deletion according to WP:CSD", "")).click(Twinkle.speedy.callback);
    } else {
        $(twAddPortletLink("#", 'CSD', 'tw-csd', 'Request speedy deletion according to WP:CSD', '')).click(function() {
            alert("Your account is too new to use Twinkle.");
        });
    }
};

// This function is run when the CSD tab/header link is clicked
Twinkle.speedy.callback = function twinklespeedyCallback() {
    Twinkle.speedy.initDialog(userIsInGroup( 'sysop' ) ? Twinkle.speedy.callback.evaluateSysop : Twinkle.speedy.callback.evaluateUser, true);
};

Twinkle.speedy.dialog = null;
// Prepares the speedy deletion dialog and displays it
// Parameters:
//  - callbackfunc: the function to call when the dialog box is submitted
//  - firstTime: is this the first time? (false during a db-multiple run, true otherwise)
//  - content: (optional) a div element in which the form content should be rendered - allows
//    for placing content in an existing dialog box
Twinkle.speedy.initDialog = function twinklespeedyInitDialog(callbackfunc, firstTime, content) {
    var dialog;
    if (!content)
    {
        Twinkle.speedy.dialog = new SimpleWindow( Twinkle.getPref('speedyWindowWidth'), Twinkle.getPref('speedyWindowHeight') );
        dialog = Twinkle.speedy.dialog;
        dialog.setTitle( "Choose criteria for speedy deletion" );
        dialog.setScriptName( "Twinkle" );
        dialog.addFooterLink( "Speedy deletion policy", "WP:CSD" );
        dialog.addFooterLink( "Twinkle help", "WP:TW/DOC#speedy" );
    }

    var form = new QuickForm( callbackfunc, 'change' );
    if( firstTime && userIsInGroup( 'sysop' ) ) {
        form.append( {
                type: 'checkbox',
                list: [
                    {
                        label: 'Tag page only, don\'t delete',
                        value: 'tag_only',
                        name: 'tag_only',
                        tooltip: 'If you just want to tag the page, instead of deleting it now',
                        checked : Twinkle.getPref('deleteSysopDefaultToTag'),
                        event: function( event ) {
                            // enable/disable notify checkbox
                            event.target.form.notify.disabled = !event.target.checked;
                            event.target.form.notify.checked = event.target.checked;
                            // enable/disable talk page checkbox
                            if (event.target.form.talkpage) {
                                event.target.form.talkpage.disabled = event.target.checked;
                                event.target.form.talkpage.checked = !event.target.checked && Twinkle.getPref('deleteTalkPageOnDelete');
                            }
                            // enable/disable redirects checkbox
                            event.target.form.redirects.disabled = event.target.checked;
                            event.target.form.redirects.checked = !event.target.checked;
                            // enable/disable multiple
                            $(event.target.form).find('input[name="csd"][value="multiple"]')[0].disabled = !event.target.checked;
                            event.stopPropagation();
                        }
                    }
                ]
            } );
        form.append( { type: 'header', label: 'Delete-related options' } );
        if (mw.config.get('wgNamespaceNumber') % 2 === 0 && (mw.config.get('wgNamespaceNumber') !== 2 || (/\//).test(mw.config.get('wgTitle')))) {  // hide option for user pages, to avoid accidentally deleting user talk page
            form.append( {
                type: 'checkbox',
                list: [
                    {
                        label: 'Also delete talk page',
                        value: 'talkpage',
                        name: 'talkpage',
                        tooltip: "This option deletes the page's talk page in addition. If you choose the F8 (moved to Commons) criterion, this option is ignored and the talk page is *not* deleted.",
                        checked: Twinkle.getPref('deleteTalkPageOnDelete'),
                        disabled: Twinkle.getPref('deleteSysopDefaultToTag'),
                        event: function( event ) {
                            event.stopPropagation();
                        }
                    }
                ]
            } );
        }
        form.append( {
                type: 'checkbox',
                list: [
                    {
                        label: 'Also delete all redirects',
                        value: 'redirects',
                        name: 'redirects',
                        tooltip: "This option deletes all incoming redirects in addition. Avoid this option for procedural (e.g. move/merge) deletions.",
                        checked: true,
                        disabled: Twinkle.getPref('deleteSysopDefaultToTag'),
                        event: function( event ) {
                            event.stopPropagation();
                        }
                    }
                ]
            } );
        form.append( { type: 'header', label: 'Tag-related options' } );
    }

    // don't show this notification checkbox for db-multiple, as the value is ignored
    // XXX currently not possible to turn off notification when using db-multiple
    if (firstTime) {
        form.append( {
                type: 'checkbox',
                list: [
                    {
                        label: 'Notify page creator if possible',
                        value: 'notify',
                        name: 'notify',
                        tooltip: "A notification template will be placed on the talk page of the creator, IF you have a notification enabled in your Twinkle preferences " +
                            "for the criterion you choose AND this box is checked. The creator may be welcomed as well.",
                        checked: !userIsInGroup( 'sysop' ) || Twinkle.getPref('deleteSysopDefaultToTag'),
                        disabled: userIsInGroup( 'sysop' ) && !Twinkle.getPref('deleteSysopDefaultToTag'),
                        event: function( event ) {
                            event.stopPropagation();
                        }
                    }
                ]
            }
        );
    } else {
        form.append( { type:'header', label: 'Tagging with {{db-multiple}}: Criterion ' + (Twinkle.speedy.dbmultipleCriteria.length + 1) } );
    }

    if (firstTime) {
        form.append( { type: 'radio', name: 'csd',
            list: [
                {
                    label: 'Tag with multiple criteria',
                    value: 'multiple',
                    tooltip: 'Opens a series of further dialogs, allowing you to specify all the criteria you want to tag this page with.',
                    disabled: userIsInGroup('sysop') && !Twinkle.getPref('deleteSysopDefaultToTag')
                }
            ]
        } );
    } else if (Twinkle.speedy.dbmultipleCriteria.length > 0) {
        form.append( { type: 'radio', name: 'csd',
            list: [
                {
                    label: 'No more criteria apply - finish tagging',
                    value: 'multiple-finish'
                }
            ]
        } );
    }

    switch (mw.config.get('wgNamespaceNumber')) {
        case 0:  // article
        case 1:  // talk
            form.append( { type: 'header', label: 'Articles' } );
            form.append( { type: 'radio', name: 'csd', list: Twinkle.speedy.getArticleList(!firstTime) } );
            break;

        case 2:  // user
        case 3:  // user talk
            form.append( { type: 'header', label: 'User pages' } );
            form.append( { type: 'radio', name: 'csd', list: Twinkle.speedy.userList } );
            break;

        case 6:  // file
        case 7:  // file talk
            form.append( { type: 'header', label: 'Files' } );
            form.append( { type: 'radio', name: 'csd', list: Twinkle.speedy.getFileList(!firstTime) } );
            form.append( { type: 'div', label: 'Tagging for CSD F4 (no license), F5 (orphaned fair use), F6 (no fair use rationale), and F11 (no permission) can be done using Twinkle\'s "DI" tab.' } );
            break;

        case 10:  // template
        case 11:  // template talk
            form.append( { type: 'header', label: 'Templates' } );
            form.append( { type: 'radio', name: 'csd', list: Twinkle.speedy.getTemplateList(!firstTime) } );
            break;

        case 14:  // category
        case 15:  // category talk
            form.append( { type: 'header', label: 'Categories' } );
            form.append( { type: 'radio', name: 'csd', list: Twinkle.speedy.categoryList } );
            break;

        case 100:  // portal
        case 101:  // portal talk
            form.append( { type: 'header', label: 'Portals' } );
            form.append( { type: 'radio', name: 'csd', list: Twinkle.speedy.getPortalList(!firstTime) } );
            break;

        default:
            break;
    }

    form.append( { type: 'header', label: 'General criteria' } );
    form.append( { type: 'radio', name: 'csd', list: Twinkle.speedy.getGeneralList(!firstTime) });

    form.append( { type: 'header', label: 'Redirects' } );
    form.append( { type: 'radio', name: 'csd', list: Twinkle.speedy.redirectList } );

    var result = form.render();
    if (dialog)
    {
        // render new dialog
        dialog.setContent( result );
        dialog.display();
    }
    else
    {
        // place the form content into the existing dialog box
        content.textContent = ''; // clear children
        content.appendChild(result);
    }
};

// this is a function to allow for db-multiple filtering
Twinkle.speedy.getFileList = function twinklespeedyGetFileList(multiple) {
    var result = [];
    result.push({
        label: 'F1: Redundant file',
        value: 'redundantimage',
        tooltip: 'Any file that is a redundant copy, in the same file format and same or lower resolution, of something else on Wikipedia. Likewise, other media that is a redundant copy, in the same format and of the same or lower quality. This does not apply to files duplicated on Wikimedia Commons, because of licence issues; these should be tagged with {{subst:ncd|Image:newname.ext}} or {{subst:ncd}} instead'
    });
    result.push({
        label: 'F2: Corrupt or blank file',
        value: 'noimage',
        tooltip: 'Before deleting this type of file, verify that the MediaWiki engine cannot read it by previewing a resized thumbnail of it. This also includes empty (i.e., no content) file description pages for Commons files'
    });
    if (!multiple) {
        result.push({
            label: 'F2: Unneeded file description page for a file on Commons',
            value: 'fpcfail',
            tooltip: 'An image, hosted on Commons, but with tags or information on its English Wikipedia description page that are no longer needed. (For example, a failed featured picture candidate.)'
        });
    }
    result.push({
        label: 'F3: Improper license',
        value: 'noncom',
        tooltip: 'Files licensed as "for non-commercial use only", "non-derivative use" or "used with permission" that were uploaded on or after 2005-05-19, except where they have been shown to comply with the limited standards for the use of non-free content. This includes files licensed under a "Non-commercial Creative Commons License". Such files uploaded before 2005-05-19 may also be speedily deleted if they are not used in any articles'
    });
    if (userIsInGroup('sysop')) {
        result.push({
            label: 'F4: Lack of licensing information',
            value: 'unksource',
            tooltip: 'Files in category "Files with unknown source", "Files with unknown copyright status", or "Files with no copyright tag" that have been tagged with a template that places them in the category for more than seven days, regardless of when uploaded. Note, users sometimes specify their source in the upload summary, so be sure to check the circumstances of the file.'
        });
        result.push({
            label: 'F5: Unused unfree copyrighted file',
            value: 'unfree',
            tooltip: 'Files that are not under a free license or in the public domain that are not used in any article and that have been tagged with a template that places them in a dated subcategory of Category:Orphaned fairuse files for more than seven days. Reasonable exceptions may be made for file uploaded for an upcoming article. Use the "Orphaned fair use" option in Twinkle\'s DI module to tag files for forthcoming deletion.'
        });
        result.push({
            label: 'F6: Missing fair-use rationale',
            value: 'norat',
            tooltip: 'Any file without a fair use rationale may be deleted seven days after it is uploaded.  Boilerplate fair use templates do not constitute a fair use rationale.  Files uploaded before 2006-05-04 should not be deleted immediately; instead, the uploader should be notified that a fair-use rationale is needed.  Files uploaded after 2006-05-04 can be tagged using the "No fair use rationale" option in Twinkle\'s DI module. Such files can be found in the dated subcategories of Category:Files with no fair use rationale.'
        });
    }
    result.push({
        label: 'F7: Clearly invalid fair-use tag',
        value: 'badfairuse',  // same as below
        tooltip: 'This is only for files with a clearly invalid fair-use tag, such as a {{Non-free logo}} tag on a photograph of a mascot. For cases that require a waiting period (replaceable images or otherwise disputed rationales), use the options on Twinkle\'s DI tab.'
    });
    if (!multiple) {
        result.push({
            label: 'F7: Fair-use media from a commercial image agency which is not the subject of sourced commentary',
            value: 'badfairuse',  // same as above
            tooltip: 'Non-free images or media from a commercial source (e.g., Associated Press, Getty), where the file itself is not the subject of sourced commentary, are considered an invalid claim of fair use and fail the strict requirements of WP:NFCC.'
        });
    }
    if (!multiple) {
        result.push({
            label: 'F8: File available as an identical or higher-resolution copy on Wikimedia Commons',
            value: 'nowcommons',
            tooltip: 'Provided the following conditions are met: 1: The file format of both images is the same. 2: The file\'s license and source status is beyond reasonable doubt, and the license is undoubtedly accepted at Commons. 3: All information on the file description page is present on the Commons file description page. That includes the complete upload history with links to the uploader\'s local user pages. 4: The file is not protected, and the file description page does not contain a request not to move it to Commons. 5: If the file is available on Commons under a different name than locally, all local references to the file must be updated to point to the title used at Commons. 6: For {{c-uploaded}} files: They may be speedily deleted as soon as they are off the Main Page'
        });
    }
    result.push({
        label: 'F9: Unambiguous copyright infringement',
        value: 'imgcopyvio',
        tooltip: 'The file was copied from a website or other source that does not have a license compatible with Wikipedia, and the uploader neither claims fair use nor makes a credible assertion of permission of free use. Sources that do not have a license compatible with Wikipedia include stock photo libraries such as Getty Images or Corbis. Non-blatant copyright infringements should be discussed at Wikipedia:Files for deletion'
    });
    result.push({
        label: 'F10: Useless media file',
        value: 'badfiletype',
        tooltip: 'Files uploaded that are neither image, sound, nor video files (e.g. .doc, .pdf, or .xls files) which are not used in any article and have no foreseeable encyclopedic use'
    });
    if (userIsInGroup('sysop')) {
        result.push({
            label: 'F11: No evidence of permission',
            value: 'nopermission',
            tooltip: 'If an uploader has specified a license and has named a third party as the source/copyright holder without providing evidence that this third party has in fact agreed, the item may be deleted seven days after notification of the uploader'
        });
    }
    result.push({
        label: 'G8: File description page with no corresponding file',
        value: 'imagepage',
        tooltip: 'This is only for use when the file doesn\'t exist at all. Corrupt files, and local description pages for files on Commons, should use F2; implausible redirects should use R3; and broken Commons redirects should use G6.'
    });
    return result;
};

Twinkle.speedy.getArticleList = function twinklespeedyGetArticleList(multiple) {
    var result = [];
    result.push({
        label: 'A1: No context. Articles lacking sufficient context to identify the subject of the article.',
        value: 'nocontext',
        tooltip: 'Example: "He is a funny man with a red car. He makes people laugh." This applies only to very short articles. Context is different from content, treated in A3, below.'
    });
    result.push({
        label: 'A2: Foreign language articles that exist on another Wikimedia project',
        value: 'foreign',
        tooltip: 'If the article in question does not exist on another project, the template {{notenglish}} should be used instead. All articles in a non-English language that do not meet this criteria (and do not meet any other criteria for speedy deletion) should be listed at Pages Needing Translation (PNT) for review and possible translation'
    });
    result.push({
        label: 'A3: No content whatsoever',
        value: 'nocontent',
        tooltip: 'Any article consisting only of links elsewhere (including hyperlinks, category tags and "see also" sections), a rephrasing of the title, and/or attempts to correspond with the person or group named by its title. This does not include disambiguation pages'
    });
    result.push({
        label: 'A5: Transwikied articles',
        value: 'transwiki',
        tooltip: 'Any article that has been discussed at Articles for Deletion (et al), where the outcome was to transwiki, and where the transwikification has been properly performed and the author information recorded. Alternately, any article that consists of only a dictionary definition, where the transwikification has been properly performed and the author information recorded'
    });
    result.push({
        label: 'A7: Unremarkable people, groups, companies, web content, and individual animals',
        value: 'a7',
        tooltip: 'An article about a real person, group of people, band, club, company, web content, or individual animal that does not assert the importance or significance of its subject. If controversial, or if there has been a previous AfD that resulted in the article being kept, the article should be nominated for AfD instead'
    });
    if (!multiple) {
        result.push({
            label: 'A7: Unremarkable person',
            value: 'person',
            tooltip: 'An article about a real person that does not assert the importance or significance of its subject. If controversial, or if there has been a previous AfD that resulted in the article being kept, the article should be nominated for AfD instead'
        });
        result.push({
            label: 'A7: Unremarkable musician(s) or band',
            value: 'band',
            tooltip: 'Article about a band, singer, musician, or musical ensemble that does not assert the importance or significance of the subject'
        });
        result.push({
            label: 'A7: Unremarkable club',
            value: 'club',
            tooltip: 'Article about a club that does not assert the importance or significance of the subject'
        });
        result.push({
            label: 'A7: Unremarkable company or organization',
            value: 'corp',
            tooltip: 'Article about a company or organization that does not assert the importance or significance of the subject'
        });
        result.push({
            label: 'A7: Unremarkable website or web content',
            value: 'web',
            tooltip: 'Article about a web site, blog, online forum, webcomic, podcast, or similar web content that does not assert the importance or significance of its subject'
        });
        result.push({
            label: 'A7: Unremarkable individual animal',
            value: 'animal',
            tooltip: 'Article about an individual animal (e.g. pet) that does not assert the importance or significance of its subject'
        });
    }
    result.push({
        label: 'A9: Unremarkable musical recording where artist\'s article doesn\'t exist',
        value: 'a9',
        tooltip: 'An article about a musical recording which does not indicate why its subject is important or significant, and where the artist\'s article has never existed or has been deleted'
    });
    if (!multiple) {
        result.push({
            label: 'A10: Recently created article that duplicates an existing topic',
            value: 'a10',
            tooltip: 'A recently created article with no relevant page history that does not aim to expand upon, detail or improve information within any existing article(s) on the subject, and where the title is not a plausible redirect. This does not include content forks, split pages or any article that aims at expanding or detailing an existing one.'
        });
    }
    return result;
};

Twinkle.speedy.categoryList = [
    {
        label: 'C1: Empty categories',
        value: 'catempty',
        tooltip: '(no articles or subcategories for at least four days) whose only content has consisted of links to parent categories. This does not apply to categories being discussed on WP:CFD or WP:SFD, or disambiguation categories. If the category isn\'t relatively new, it possibly contained articles earlier, and deeper investigation is needed'
    },
    {
        label: 'G8: Categories populated by a deleted or retargeted template',
        value: 'templatecat',
        tooltip: 'If a template which includes pages in a category has been deleted, the associated category can be deleted. This excludes categories that are still in use.'
    }
];

Twinkle.speedy.userList = [
    {
        label: 'U1: User request',
        value: 'userreq',
        tooltip: 'Personal subpages, upon request by their user. In some rare cases there may be administrative need to retain the page. Also, sometimes, main user pages may be deleted as well. See Wikipedia:User page for full instructions and guidelines'
    },
    {
        label: 'U2: Nonexistent user',
        value: 'nouser',
        tooltip: 'User pages of users that do not exist (Check Special:Listusers)'
    },
    {
        label: 'U3: Non-free galleries',
        value: 'gallery',
        tooltip: 'Galleries in the userspace which consist mostly of "fair use" or non-free files. Wikipedia\'s non-free content policy forbids users from displaying non-free files, even ones they have uploaded themselves, in userspace. It is acceptable to have free files, GFDL-files, Creative Commons and similar licenses along with public domain material, but not "fair use" files'
    }
];

Twinkle.speedy.getTemplateList = function twinklespeedyGetTemplateList(multiple) {
    var result = [];
    result.push({
        label: 'T2: Templates that are blatant misrepresentations of established policy',
        value: 'policy',
        tooltip: 'This includes "speedy deletion" templates for issues that are not speedy deletion criteria and disclaimer templates intended to be used in articles'
    });
    if (!multiple) {
        result.push({
            label: 'T3: Templates that are not employed in any useful fashion',
            value: 't3',
            tooltip: 'Templates that are either substantial duplications of another template or hardcoded instances of another template where the same functionality could be provided by that other template'
        });
    }
    return result;
};

Twinkle.speedy.getPortalList = function twinklespeedyGetPortalList(multiple) {
    var result = [];
    if (!multiple) {
        result.push({
            label: 'P1: Portal that would be subject to speedy deletion if it were an article',
            value: 'p1',
            tooltip: 'You must specify the article criterion that applies in this case (A1, A3, A7, or A10).'
        });
    }
    result.push({
        label: 'P2: Underpopulated portal',
        value: 'emptyportal',
        tooltip: 'Any Portal based on a topic for which there is not a non-stub header article, and at least three non-stub articles detailing subject matter that would be appropriate to discuss under the title of that Portal'
    });
    return result;
};

Twinkle.speedy.getGeneralList = function twinklespeedyGetGeneralList(multiple) {
    var result = [];
    if (!multiple) {
        result.push({
            label: 'Custom rationale' + (userIsInGroup('sysop') ? ' (custom deletion reason)' : ' using {'+'{db}} template'),
            value: 'reason',
            tooltip: '{'+'{db}} is short for "delete because". At least one of the other deletion criteria must still apply to the page, and you should (must?) make mention of this in your rationale. This is not a "catch-all" for when you can\'t find any criteria that fit.'
        });
    }
    result.push({
        label: 'G1: Patent nonsense. Pages consisting purely of incoherent text or gibberish with no meaningful content or history.',
        value: 'nonsense',
        tooltip: 'This does not include poor writing, partisan screeds, obscene remarks, vandalism, fictional material, material not in English, poorly translated material, implausible theories, or hoaxes. In short, if you can understand it, G1 does not apply.'
    });
    result.push({
        label: 'G2: Test page',
        value: 'test',
        tooltip: 'A page created to test editing or other Wikipedia functions. Pages in the User namespace are not included, nor are valid but unused or duplicate templates (although criterion T3 may apply).'
    });
    result.push({
        label: 'G3: Pure vandalism',
        value: 'vandalism',
        tooltip: 'Plain pure vandalism (including redirects left behind from pagemove vandalism)'
    });
    if (!multiple) {
        result.push({
            label: 'G3: Blatant hoax',
            value: 'hoax',
            tooltip: 'Blatant and obvious hoax, to the point of vandalism'
        });
    }
    result.push({
        label: 'G4: Recreation of deleted material',
        value: 'repost',
        tooltip: 'A copy, by any title, of a page that was deleted via an XfD process or Deletion review, provided that the copy is substantially identical to the deleted version and that any revisions made clearly do not address the reasons for which the page was deleted. This clause does not apply to content that has been "userfied", to content undeleted as a result of Deletion review, or if the prior deletions were proposed or speedy deletions, although in this last case, the previous speedy criterion, or other speedy deletion criteria, may apply'
    });
    result.push({
        label: 'G5: Banned user',
        value: 'banned',
        tooltip: 'Pages created by banned users while they were banned'
    });
    if (!multiple) {
        result.push({
            label: 'G6: History merge',
            value: 'histmerge',
            tooltip: 'Temporarily deleting a page in order to merge page histories'
        });
        result.push({
            label: 'G6: Move',
            value: 'move',
            tooltip: 'Making way for a noncontroversial move like reversing a redirect'
        });
        result.push({
            label: 'G6: XfD',
            value: 'xfd',
            tooltip: 'An admin has closed a deletion discussion (at AfD, FfD, RfD, TfD, CfD, SfD, or MfD) as "delete", but they didn\'t actually delete the page.'
        });
        result.push({
            label: 'G6: Unnecessary disambiguation page',
            value: 'disambig',
            tooltip: 'This only applies for orphaned disambiguation pages which either: (1) disambiguate two or fewer existing Wikipedia pages and whose title ends in "(disambiguation)" (i.e., there is a primary topic); or (2) disambiguates no (zero) existing Wikipedia pages, regardless of its title.'
        });
        result.push({
            label: 'G6: Redirect to malplaced disambiguation page',
            value: 'movedab',
            tooltip: 'This only applies for redirects to disambiguation pages ending in (disambiguation) where a primary topic does not exist.'
        });
        result.push({
            label: 'G6: Copy-and-paste page move',
            value: 'copypaste',
            tooltip: 'This only applies for a copy-and-paste page move of another page that needs to be temporarily deleted to make room for a clean page move.'
        });
    }
    result.push({
        label: 'G6: Housekeeping',
        value: 'g6',
        tooltip: 'Other non-controversial "housekeeping" tasks'
    });
    result.push({
        label: 'G7: Author requests deletion, or author blanked',
        value: 'author',
        tooltip: 'Any page for which deletion is requested by the original author in good faith, provided the page\'s only substantial content was added by its author. If the author blanks the page, this can also be taken as a deletion request.'
    });
    result.push({
        label: 'G8: Pages dependent on a non-existent or deleted page',
        value: 'g8',
        tooltip: 'such as talk pages with no corresponding subject page; subpages with no parent page; file pages without a corresponding file; redirects to invalid targets, such as nonexistent targets, redirect loops, and bad titles; or categories populated by deleted or retargeted templates. This excludes any page that is useful to the project, and in particular: deletion discussions that are not logged elsewhere, user and user talk pages, talk page archives, plausible redirects that can be changed to valid targets, and file pages or talk pages for files that exist on Wikimedia Commons.'
    });
    if (!multiple) {
        result.push({
            label: 'G8: Talk pages with no corresponding subject page',
            value: 'talk',
            tooltip: 'This excludes any page that is useful to the project, and in particular: deletion discussions that are not logged elsewhere, user and user talk pages, talk page archives, plausible redirects that can be changed to valid targets, and file pages or talk pages for files that exist on Wikimedia Commons.'
        });
        result.push({
            label: 'G8: Subpages with no parent page',
            value: 'subpage',
            tooltip: 'This excludes any page that is useful to the project, and in particular: deletion discussions that are not logged elsewhere, user and user talk pages, talk page archives, plausible redirects that can be changed to valid targets, and file pages or talk pages for files that exist on Wikimedia Commons.'
        });
    }
    result.push({
        label: 'G10: Attack page',
        value: 'attack',
        tooltip: 'Pages that serve no purpose but to disparage their subject or some other entity (e.g., "John Q. Doe is an imbecile"). This includes a biography of a living person that is negative in tone and unsourced, where there is no NPOV version in the history to revert to. Administrators deleting such pages should not quote the content of the page in the deletion summary!'
    });
    if (!multiple) {
        result.push({
            label: 'G10: Wholly negative, unsourced BLP',
            value: 'negublp',
            tooltip: 'A biography of a living person that is entirely negative in tone and unsourced, where there is no neutral version in the history to revert to.'
        });
    }
    result.push({
        label: 'G11: Unambiguous advertising',
        value: 'spam',
        tooltip: 'Pages which exclusively promote a company, product, group, service, or person and which would need to be fundamentally rewritten in order to become encyclopedic. Note that an article about a company or a product which describes its subject from a neutral point of view does not qualify for this criterion; an article that is blatant advertising should have inappropriate content as well'
    });
    result.push({
        label: 'G12: Unambiguous copyright infringement',
        value: 'copyvio',
        tooltip: 'Either: (1) Material was copied from another website that does not have a license compatible with Wikipedia, or is photography from a stock photo seller (such as Getty Images or Corbis) or other commercial content provider; (2) There is no non-infringing content in the page history worth saving; or (3) The infringement was introduced at once by a single person rather than created organically on wiki and then copied by another website such as one of the many Wikipedia mirrors'
    });
    return result;
};

Twinkle.speedy.redirectList = [
    {
        label: 'R2: Redirects from mainspace to any other namespace except the Category:, Template:, Wikipedia:, Help: and Portal: namespaces',
        value: 'rediruser',
        tooltip: '(this does not include the Wikipedia shortcut pseudo-namespaces). If this was the result of a page move, consider waiting a day or two before deleting the redirect'
    },
    {
        label: 'R3: Redirects as a result of an implausible typo that were recently created',
        value: 'redirtypo',
        tooltip: 'However, redirects from common misspellings or misnomers are generally useful, as are redirects in other languages'
    },
    {
        label: 'G8: Redirects to invalid targets, such as nonexistent targets, redirect loops, and bad titles',
        value: 'redirnone',
        tooltip: 'This excludes any page that is useful to the project, and in particular: deletion discussions that are not logged elsewhere, user and user talk pages, talk page archives, plausible redirects that can be changed to valid targets, and file pages or talk pages for files that exist on Wikimedia Commons.'
    }
];

Twinkle.speedy.normalizeHash = {
    'reason': 'db',
    'multiple': 'multiple',
    'multiple-finish': 'multiple-finish',
    'nonsense': 'g1',
    'test': 'g2',
    'vandalism': 'g3',
    'hoax': 'g3',
    'repost': 'g4',
    'banned': 'g5',
    'histmerge': 'g6',
    'move': 'g6',
    'xfd': 'g6',
    'disambig': 'g6',
    'movedab': 'g6',
    'copypaste': 'g6',
    'g6': 'g6',
    'author': 'g7',
    'g8': 'g8',
    'talk': 'g8',
    'subpage': 'g8',
    'redirnone': 'g8',
    'templatecat': 'g8',
    'attack': 'g10',
    'negublp': 'g10',
    'spam': 'g11',
    'copyvio': 'g12',
    'nocontext': 'a1',
    'foreign': 'a2',
    'nocontent': 'a3',
    'transwiki': 'a5',
    'a7': 'a7',
    'person': 'a7',
    'corp': 'a7',
    'web': 'a7',
    'band': 'a7',
    'club': 'a7',
    'animal': 'a7',
    'a9': 'a9',
    'a10': 'a10',
    'rediruser': 'r2',
    'redirtypo': 'r3',
    'redundantimage': 'f1',
    'noimage': 'f2',
    'fpcfail': 'f2',
    'noncom': 'f3',
    'unksource': 'f4',
    'unfree': 'f5',
    'norat': 'f6',
    'badfairuse': 'f7',
    'nowcommons': 'f8',
    'imgcopyvio': 'f9',
    'badfiletype': 'f10',
    'nopermission': 'f11',
    'catempty': 'c1',
    'userreq': 'u1',
    'nouser': 'u2',
    'gallery': 'u3',
    'policy':'t2',
    't3':'t3',
    'p1':'p1',
    'emptyportal': 'p2'
};

// keep this synched with [[MediaWiki:Deletereason-dropdown]]
Twinkle.speedy.reasonHash = {
    'reason': '',
// General
    'nonsense': '[[WP:PN|Patent nonsense]], meaningless, or incomprehensible',
    'test': 'Test page',
    'vandalism': '[[WP:Vandalism|Vandalism]]',
    'hoax': 'Blatant [[WP:Do not create hoaxes|hoax]]',
    'repost': 'Recreation of a page that was [[WP:DEL|deleted]] per a [[WP:XFD|deletion discussion]]',
    'banned': 'Creation by a [[WP:BLOCK|blocked]] or [[WP:BAN|banned]] user in violation of block or ban',
    'histmerge': 'Temporary deletion in order to merge page histories',
    'move': 'Making way for a non-controversial move',
    'xfd': 'Deleting page per result of [[WP:XfD|deletion discussion]]',
    'disambig': 'Unnecessary disambiguation page',
    'movedab': 'Redirect to [[WP:MALPLACED|malplaced disambiguation page]]',
    'copypaste': '[[WP:CPMV|Copy-and-paste]] page move',
    'g6': 'Housekeeping and routine (non-controversial) cleanup',
    'author': 'One author who has requested deletion or blanked the page',
    'g8': 'Page dependent on a deleted or nonexistent page',
    'talk': '[[Help:Talk page|Talk page]] of a deleted or nonexistent page',
    'subpage': '[[WP:Subpages|Subpage]] of a deleted or nonexistent page',
    'redirnone': '[[Wikipedia:Redirect|redirect]] to a deleted or nonexistent page',
    'templatecat': 'Populated by deleted or retargeted templates',
    'attack': '[[WP:ATP|Attack page]] or negative unsourced [[WP:BLP|BLP]]',
    'negublp': 'Negative unsourced [[WP:BLP|BLP]]',
    'spam': 'Unambiguous [[WP:ADS|advertising]] or promotion',
    'copyvio': 'Unambiguous [[WP:C|copyright infringement]]',
// Articles
    'nocontext': 'Not enough context to identify article\'s subject',
    'foreign': 'Article in a foreign language that exists on another project',
    'nocontent': 'Article that has no meaningful, substantive content',
    'transwiki': 'Article that has been transwikied to another project',
    'a7': 'No explanation of the subject\'s significance (real person, animal, organization, or web content)',
    'person' : 'No explanation of the subject\'s significance (real person)',
    'web': 'No explanation of the subject\'s significance (web content)',
    'corp': 'No explanation of the subject\'s significance (organization)',
    'club': 'No explanation of the subject\'s significance (organization)',
    'band': 'No explanation of the subject\'s significance (band/musician)',
    'animal': 'No explanation of the subject\'s significance (individual animal)',
    'a9': 'Music recording by redlinked artist and no indication of importance or significance',
    'a10': 'Recently created article that duplicates an existing topic',
// Images and media
    'redundantimage': 'File  redundant to another on Wikipedia',
    'noimage': 'Corrupt or empty file, or a file description page for a file on Commons',
    'noncom': 'File with improper license',
    'unksource': 'Lack of licensing information',
    'unfree': 'Unused non-free media',
    'norat': 'Non-free file without [[WP:RAT|fair-use rationale]]',
    'badfairuse': '[[WP:NFCC|Invalid]] fair-use claim',
    'nowcommons': 'Media file available on Commons',
    'imgcopyvio': 'File [[WP:COPYVIO|copyright violation]]',
    'badfiletype': 'Useless media file',
    'nopermission': 'No evidence of permission',
// Categories
    'catempty': 'Empty category',
// User pages
    'userreq': 'User request to delete page in own userspace',
    'nouser': 'Userpage or subpage of a nonexistent user',
    'gallery': '[[WP:NFC|Non-free]] [[Help:Gallery|gallery]]',
// Templates
    'policy': 'Template that unambiguously misrepresents established policy',
    't3': 'Unused, redundant template',
// Portals
    'p1': '[[WP:P|Portal]] page that would be subject to speedy deletion as an article',
    'emptyportal': '[[WP:P|Portal]] without a substantial topic base',
// Redirects
    'rediruser': 'Cross-[[WP:NS|namespace]] [[WP:R|redirect]] from mainspace',
    'redirtypo': 'Recently created, implausible [[WP:R|redirect]]'
};

Twinkle.speedy.callbacks = {
    sysop: {
        main: function( params ) {
            var thispage = new Wikipedia.page( mw.config.get('wgPageName'), "Deleting page" );

            // delete page
            var reason;
            if (params.normalized === 'db') {
                reason = prompt("Enter the deletion summary to use, which will be entered into the deletion log:", "");
            } else {
                var presetReason = "[[WP:CSD#" + params.normalized.toUpperCase() + "|" + params.normalized.toUpperCase() + "]]: " + params.reason;
                if (Twinkle.getPref("promptForSpeedyDeletionSummary").indexOf(params.normalized) !== -1) {
                    reason = prompt("Enter the deletion summary to use, or press OK to accept the automatically generated one.", presetReason);
                } else {
                    reason = presetReason;
                }
            }
            if (!reason || !reason.replace(/^\s*/, "").replace(/\s*$/, "")) {
                Status.error("Asking for reason", "you didn't give one.  I don't know... what with admins and their apathetic antics... I give up...");
                return;
            }
            thispage.setEditSummary( reason + Twinkle.getPref('deletionSummaryAd') );
            thispage.deletePage();

            // delete talk page
            if (params.deleteTalkPage &&
                params.normalized !== 'f8' &&
                document.getElementById( 'ca-talk' ).className !== 'new') {
                var talkpage = new Wikipedia.page( Wikipedia.namespaces[ mw.config.get('wgNamespaceNumber') + 1 ] + ':' + mw.config.get('wgTitle'), "Deleting talk page" );
                talkpage.setEditSummary('[[WP:CSD#G8|G8]]: Talk page of deleted page [[' + mw.config.get('wgPageName') + "]]. " + Twinkle.getPref('deletionSummaryAd'));
                talkpage.deletePage();
            }

            // promote Unlink tool
            var $link, $bigtext;
            if( mw.config.get('wgNamespaceNumber') === 6 && params.normalized !== 'f8' ) {
                $link = $('<a/>', {
                    'href': '#',
                    'text': 'click here to go to the Unlink tool',
                    'css': { 'fontSize': '130%', 'fontWeight': 'bold' },
                    'click': function(){
                        Wikipedia.actionCompleted.redirect = null;
                        Twinkle.speedy.dialog.close();
                        Twinkle.unlink.callback("Removing usages of and/or links to deleted file " + mw.config.get('wgPageName'));
                    }
                });
                $bigtext = $('<span/>', {
                    'text': 'To orphan backlinks and remove instances of file usage',
                    'css': { 'fontSize': '130%', 'fontWeight': 'bold' }
                });
                Status.info($bigtext[0], $link[0]);
            } else if (params.normalized !== 'f8') {
                $link = $('<a/>', {
                    'href': '#',
                    'text': 'click here to go to the Unlink tool',
                    'css': { 'fontSize': '130%', 'fontWeight': 'bold' },
                    'click': function(){
                        Wikipedia.actionCompleted.redirect = null;
                        Twinkle.speedy.dialog.close();
                        Twinkle.unlink.callback("Removing links to deleted page " + mw.config.get('wgPageName'));
                    }
                });
                $bigtext = $('<span/>', {
                    'text': 'To orphan backlinks',
                    'css': { 'fontSize': '130%', 'fontWeight': 'bold' }
                });
                Status.info($bigtext[0], $link[0]);
            }

            // open talk page of first contributor
            if( params.openusertalk ) {
                thispage = new Wikipedia.page( mw.config.get('wgPageName') );  // a necessary evil, in order to clear incorrect Status.text
                thispage.setCallbackParameters( params );
                thispage.lookupCreator( Twinkle.speedy.callbacks.sysop.openUserTalkPage );
            }

            // delete redirects
            if (params.deleteRedirects) {
                var query = {
                    'action': 'query',
                    'list': 'backlinks',
                    'blfilterredir': 'redirects',
                    'bltitle': mw.config.get('wgPageName'),
                    'bllimit': 5000  // 500 is max for normal users, 5000 for bots and sysops
                };
                var wikipedia_api = new Wikipedia.api( 'getting list of redirects...', query, Twinkle.speedy.callbacks.sysop.deleteRedirectsMain,
                    new Status( 'Deleting redirects' ) );
                wikipedia_api.params = params;
                wikipedia_api.post();
            }
        },
        openUserTalkPage: function( pageobj ) {
            pageobj.getStatusElement().unlink();  // don't need it anymore
            var user = pageobj.getCreator();
            var statusIndicator = new Status('Opening user talk page edit form for ' + user, 'opening...');

            var query = {
                'title': 'User talk:' + user,
                'action': 'edit',
                'preview': 'yes',
                'vanarticle': mw.config.get('wgPageName').replace(/_/g, ' ')
            };
            switch( Twinkle.getPref('userTalkPageMode') ) {
            case 'tab':
                window.open( mw.config.get('wgServer') + mw.config.get('wgScriptPath') + '/index.php?' + QueryString.create( query ), '_tab' );
                break;
            case 'blank':
                window.open( mw.config.get('wgServer') + mw.config.get('wgScriptPath') + '/index.php?' + QueryString.create( query ), '_blank', 'location=no,toolbar=no,status=no,directories=no,scrollbars=yes,width=1200,height=800' );
                break;
            case 'window':
                /* falls through */
                default :
                window.open( mw.config.get('wgServer') + mw.config.get('wgScriptPath') + '/index.php?' + QueryString.create( query ), 'twinklewarnwindow', 'location=no,toolbar=no,status=no,directories=no,scrollbars=yes,width=1200,height=800' );
                break;
            }

            statusIndicator.info( 'complete' );
        },
        deleteRedirectsMain: function( apiobj ) {
            var xmlDoc = apiobj.getXML();
            var $snapshot = $(xmlDoc).find('backlinks bl');

            var total = $snapshot.length;

            if( !total ) {
                return;
            }

            var statusIndicator = apiobj.statelem;
            statusIndicator.status("0%");

            var onsuccess = function( apiobj ) {
                var obj = apiobj.params.obj;
                var total = apiobj.params.total;
                var now = parseInt( 100 * ++(apiobj.params.current)/total, 10 ) + '%';
                obj.update( now );
                apiobj.statelem.unlink();
                if( apiobj.params.current >= total ) {
                    obj.info( now + ' (completed)' );
                    Wikipedia.removeCheckpoint();
                }
            };

            Wikipedia.addCheckpoint();

            var params = clone( apiobj.params );
            params.current = 0;
            params.total = total;
            params.obj = statusIndicator;

            $snapshot.each(function(key, value) {
                var title = $(value).attr('title');
                var page = new Wikipedia.page(title, 'Deleting redirect "' + title + '"');
                page.setEditSummary('[[WP:CSD#G8|G8]]: Redirect to deleted page [[' + mw.config.get('wgPageName') + "]]." + Twinkle.getPref('deletionSummaryAd'));
                page.deletePage(onsuccess);
            });
        }
    },





    user: {
        main: function(pageobj) {
            var statelem = pageobj.getStatusElement();

            if (!pageobj.exists()) {
                statelem.error( "It seems that the page doesn't exist; perhaps it has already been deleted" );
                return;
            }

            var text = pageobj.getPageText();
            var params = pageobj.getCallbackParameters();

            statelem.status( 'Checking for tags on the page...' );

            // check for existing deletion tags
            var tag = /(?:\{\{\s*(db|delete|db-.*?)(?:\s*\||\s*\}\}))/.exec( text );
            if( tag ) {
                statelem.error( [ htmlNode( 'strong', tag[1] ) , " is already placed on the page." ] );
                return;
            }

            var xfd = /(?:\{\{([rsaiftcm]fd|md1)[^{}]*?\}\})/i.exec( text );
            if( xfd && !confirm( "The deletion-related template {{" + xfd[1] + "}} was found on the page. Do you still want to add a CSD template?" ) ) {
                return;
            }

            var code, parameters, i;
            if (params.normalized === 'multiple')
            {
                code = "{{db-multiple";
                for (i in Twinkle.speedy.dbmultipleCriteria) {
                    if (typeof Twinkle.speedy.dbmultipleCriteria[i] === 'string') {
                        code += "|" + Twinkle.speedy.dbmultipleCriteria[i].toUpperCase();
                    }
                }
                for (i in Twinkle.speedy.dbmultipleParameters) {
                    if (typeof Twinkle.speedy.dbmultipleParameters[i] === 'string') {
                        code += "|" + i + "=" + Twinkle.speedy.dbmultipleParameters[i];
                    }
                }
                code += "}}";
                params.utparams = [];
            }
            else
            {
                parameters = Twinkle.speedy.getParameters(params.value, params.normalized, statelem);
                if (!parameters) {
                    return;  // the user aborted
                }
                code = "{{db-" + params.value;
                for (i in parameters) {
                    if (typeof parameters[i] === 'string') {
                        code += "|" + i + "=" + parameters[i];
                    }
                }
                code += "}}";
                params.utparams = Twinkle.speedy.getUserTalkParameters(params.normalized, parameters);
            }

            var thispage = new Wikipedia.page(mw.config.get('wgPageName'));
            // patrol the page, if reached from Special:NewPages
            if( Twinkle.getPref('markSpeedyPagesAsPatrolled') ) {
                thispage.patrol();
            }

            // Notification to first contributor
            if (params.usertalk) {
                var callback = function(pageobj) {
                    var initialContrib = pageobj.getCreator();
                    var usertalkpage = new Wikipedia.page('User talk:' + initialContrib, "Notifying initial contributor (" + initialContrib + ")");
                    var notifytext;

                    // specialcase "db" and "db-multiple"
                    // XXX modify the "db-csd-notice-custom" template to cater for these special cases
                    switch (params.normalized)
                    {
                        case 'db':
                            notifytext = "\n\n{{subst:db-reason-notice|1=" + mw.config.get('wgPageName');
                            break;
                        case 'multiple':
                            notifytext = "\n\n{{subst:db-notice-multiple|1=" + mw.config.get('wgPageName');
                            break;
                        default:
                            notifytext = "\n\n{{subst:db-csd-notice-custom|1=" + mw.config.get('wgPageName') + "|2=" + params.value;
                            break;
                    }
                    for (var i in params.utparams) {
                        if (typeof params.utparams[i] === 'string') {
                            notifytext += "|" + i + "=" + params.utparams[i];
                        }
                    }
                    notifytext += (params.welcomeuser ? "" : "|nowelcome=yes") + "}} ~~~~";

                    usertalkpage.setAppendText(notifytext);
                    usertalkpage.setEditSummary("Notification: speedy deletion nomination of [[" + mw.config.get('wgPageName') + "]]." + Twinkle.getPref('summaryAd'));
                    usertalkpage.setCreateOption('recreate');
                    usertalkpage.setFollowRedirect(true);
                    usertalkpage.append();

                    // add this nomination to the user's userspace log, if the user has enabled it
                    if (params.lognomination) {
                        Twinkle.speedy.callbacks.user.addToLog(params, initialContrib);
                    }
                };
                thispage.lookupCreator(callback);
            }
            // or, if not notifying, add this nomination to the user's userspace log without the initial contributor's name
            else if (params.lognomination) {
                Twinkle.speedy.callbacks.user.addToLog(params, null);
            }

            // Wrap SD template in noinclude tags if we are in template space.
            // Won't work with userboxes in userspace, or any other transcluded page outside template space
            if (mw.config.get('wgNamespaceNumber') === 10) {  // Template:
                code = "<noinclude>" + code + "</noinclude>";
            }

            // Remove tags that become superfluous with this action
            text = text.replace(/\{\{\s*(New unreviewed article|Userspace draft)\s*(\|(?:\{\{[^{}]*\}\}|[^{}])*)?\}\}\s*/ig, "");

            // Generate edit summary for edit
            var editsummary;
            switch (params.normalized)
            {
                case 'db':
                    editsummary = 'Requesting [[WP:CSD|speedy deletion]] with rationale \"' + parameters["1"] + '\".';
                    break;
                case 'multiple':
                    editsummary = 'Requesting speedy deletion (';
                    for (i in Twinkle.speedy.dbmultipleCriteria) {
                        if (typeof Twinkle.speedy.dbmultipleCriteria[i] === 'string') {
                            editsummary += '[[WP:CSD#' + Twinkle.speedy.dbmultipleCriteria[i].toUpperCase() + '|CSD ' + Twinkle.speedy.dbmultipleCriteria[i].toUpperCase() + ']], ';
                        }
                    }
                    editsummary = editsummary.substr(0, editsummary.length - 2); // remove trailing comma
                    editsummary += ').';
                    break;
                case 'g6':
                    if (params.value === 'histmerge') {
                        editsummary = "Requesting history merge with [[" + parameters["1"] + "]] ([[WP:CSD#G6|CSD G6]]).";
                        break;
                    }
                    /* falls through */
                default:
                    editsummary = "Requesting speedy deletion ([[WP:CSD#" + params.normalized.toUpperCase() + "|CSD " + params.normalized.toUpperCase() + "]]).";
                    break;
            }

            pageobj.setPageText(code + ((params.normalized === 'g10' || Twinkle.speedy.dbmultipleCriteria.indexOf('g10') !== -1) ?
                    '' : ("\n" + text) )); // cause attack pages to be blanked
            pageobj.setEditSummary(editsummary + Twinkle.getPref('summaryAd'));
            pageobj.setWatchlist(params.watch);
            pageobj.setCreateOption('nocreate');
            pageobj.save();
        },

        // note: this code is also invoked from twinkleimage
        // the params used are:
        //   for all: params.normalized
        //   for CSD: params.value
        //   for DI: params.fromDI = true, params.type
        addToLog: function(params, initialContrib) {
            var wikipedia_page = new Wikipedia.page("User:" + mw.config.get('wgUserName') + "/" + Twinkle.getPref('speedyLogPageName'), "Adding entry to userspace log");
            params.logInitialContrib = initialContrib;
            wikipedia_page.setCallbackParameters(params);
            wikipedia_page.load(Twinkle.speedy.callbacks.user.saveLog);
        },

        saveLog: function(pageobj) {
            var text = pageobj.getPageText();
            var params = pageobj.getCallbackParameters();

            // add blurb if log page doesn't exist
            if (!pageobj.exists()) {
                text =
                    "This is a log of all [[WP:CSD|speedy deletion]] nominations made by this user using [[WP:TW|Twinkle]]'s CSD module.\n\n" +
                    "If you no longer wish to keep this log, you can turn it off using the [[Wikipedia:Twinkle/Preferences|preferences panel]], and " +
                    "nominate this page for speedy deletion under [[WP:CSD#U1|CSD U1]].\n";
                if (userIsInGroup("sysop")) {
                    text += "\nThis log does not track outright speedy deletions made using Twinkle.\n";
                }
            }

            // create monthly header
            var date = new Date();
            var headerRe = new RegExp("^==+\\s*" + date.getUTCMonthName() + "\\s+" + date.getUTCFullYear() + "\\s*==+", "m");
            if (!headerRe.exec(text)) {
                text += "\n\n=== " + date.getUTCMonthName() + " " + date.getUTCFullYear() + " ===";
            }

            text += "\n# [[:" + mw.config.get('wgPageName') + "]]: ";
            if (params.fromDI) {
                text += "DI [[WP:CSD#" + params.normalized.toUpperCase() + "|CSD " + params.normalized.toUpperCase() + "]] (" + params.type + ")";
            } else {
                switch (params.normalized)
                {
                    case 'db':
                        text += "{{tl|db-reason}}";
                        break;
                    case 'multiple':
                        text += "multiple criteria (";
                        for (var i in Twinkle.speedy.dbmultipleCriteria) {
                            if (typeof Twinkle.speedy.dbmultipleCriteria[i] === 'string') {
                                text += '[[WP:CSD#' + Twinkle.speedy.dbmultipleCriteria[i].toUpperCase() + '|' + Twinkle.speedy.dbmultipleCriteria[i].toUpperCase() + ']], ';
                            }
                        }
                        text = text.substr(0, text.length - 2);  // remove trailing comma
                        text += ')';
                        break;
                    default:
                        text += "[[WP:CSD#" + params.normalized.toUpperCase() + "|CSD " + params.normalized.toUpperCase() + "]] ({{tl|db-" + params.value + "}})";
                        break;
                }
            }

            if (params.logInitialContrib) {
                text += "; notified {{user|" + params.logInitialContrib + "}}";
            }
            text += " ~~~~~\n";

            pageobj.setPageText(text);
            pageobj.setEditSummary("Logging speedy deletion nomination of [[" + mw.config.get('wgPageName') + "]]." + Twinkle.getPref('summaryAd'));
            pageobj.setCreateOption("recreate");
            pageobj.save();
        }
    }
};

// prompts user for parameters to be passed into the speedy deletion tag
Twinkle.speedy.getParameters = function twinklespeedyGetParameters(value, normalized, statelem)
{
    var parameters = [];
    switch( normalized ) {
        case 'db':
            var dbrationale = prompt('Please enter a mandatory rationale.   \n\"This page qualifies for speedy deletion because:\"', "");
            if (!dbrationale || !dbrationale.replace(/^\s*/, "").replace(/\s*$/, ""))
            {
                statelem.error( 'You must specify a rationale.  Aborted by user.' );
                return null;
            }
            parameters["1"] = dbrationale;
            break;
        case 'u1':
            if (mw.config.get('wgNamespaceNumber') === 3 && !((/\//).test(mw.config.get('wgTitle'))))
            {
                var u1rationale = prompt('Please provide a mandatory rationale to explain why this user talk page should be deleted:', "");
                if (!u1rationale || !u1rationale.replace(/^\s*/, "").replace(/\s*$/, ""))
                {
                    statelem.error( 'You must specify a rationale.  Aborted by user.' );
                    return null;
                }
                parameters.rationale = u1rationale;
            }
            break;
        case 'f8':
            var pagenamespaces = mw.config.get('wgPageName').replace( '_', ' ' );
            var filename = prompt( 'Please enter the name of the file on Commons:', pagenamespaces );
            if (filename === null)
            {
                statelem.error( 'Aborted by user.' );
                return null;
            }
            if (filename !== '' && filename !== pagenamespaces)
            {
                if (filename.indexOf("Image:") === 0 || filename.indexOf("File:") === 0)
                {
                    parameters["1"] = filename;
                }
                else
                {
                    statelem.error("The File: prefix was missing from the image filename.  Aborted.");
                    return null;
                }
            }
            parameters.date = "~~~~~";
            break;
        case 'g6':
            switch( value ) {
                case 'histmerge':
                    var mergetitle = prompt( 'Please enter the title to merge into:', "" );
                    if (mergetitle === null)
                    {
                        statelem.error( 'Aborted by user.' );
                        return null;
                    }
                    parameters["1"] = mergetitle;
                    break;
                case 'move':
                    var title = prompt( 'Please enter the title of the page to be moved here:', "" );
                    if (title === null)
                    {
                        statelem.error( 'Aborted by user.' );
                        return null;
                    }
                    var reason = prompt( 'Please enter the reason for the page move:', "" );
                    if (reason === null)
                    {
                        statelem.error( 'Aborted by user.' );
                        return null;
                    }
                    parameters["1"] = title;
                    parameters["2"] = reason;
                    break;
                case 'xfd':
                    var votepage = prompt( 'If the title of the discussion is different than the title of the page, and it is not an SfD discussion or a page where the discussion is not where it is expected to be, please enter the title of the discussion here (leave empty to skip):', "" );
                    if (votepage === null)
                    {
                        statelem.error( 'Aborted by user.' );
                        return null;
                    }
                    if (votepage === '')
                    {
                        var fullvotepage = prompt( 'For SfD discussions and pages where discussions are not where they are expected to be, please enter the full title of the discussion, including the namespace, here: (leave empty to skip):', "" );
                        if (fullvotepage === null)
                        {
                        statelem.error( 'Aborted by user.' );
                        return null;
                        }
                    }
                    var redirectpar = prompt( 'If this page is a redirect that was discussed at RfD, please type the word "yes" here: (leave empty to skip):', "");
                    if (redirectpar === null)
                    {
                        statelem.error( 'Aborted by user.' );
                        return null;
                    }
                    if (votepage !== '')
                    {
                        parameters.votepage = votepage;
                    }
                    if (fullvotepage !== '')
                    {
                        parameters.fullvotepage = fullvotepage;
                    }
                    if (redirect !== '')
                    {
                        parameters.redirect = redirectpar;
                    }
                    break;
                case 'copypaste':
                    var copytitle = prompt( 'Please enter the title of the original page that was copy-pasted here:', "" );
                    if (copytitle === null)
                    {
                        statelem.error( 'Aborted by user.' );
                        return null;
                    }
                    parameters["1"] = copytitle;
                    break;
                case 'g6':
                    var g6rationale = prompt( 'Please provide an optional rationale (leave empty to skip):', "" );
                    if (g6rationale === null)
                    {
                        statelem.error( 'Aborted by user.' );
                        return null;
                    }
                    if (g6rationale !== '')
                    {
                        parameters.rationale = g6rationale;
                    }
                    break;
                default:
                    break;
            }
            break;
        case 'g7':
            if (Twinkle.getPref('speedyPromptOnG7'))
            {
                var g7rationale = prompt('Please provide an optional rationale (perhaps linking to where the author requested this deletion - leave empty to skip):', "");
                if (g7rationale === null)
                {
                    statelem.error( 'Aborted by user.' );
                    return null;
                }
                if (g7rationale !== '')
                {
                    parameters.rationale = g7rationale;
                }
            }
            break;
        case 'f9':
        case 'g12':
            var url = prompt( 'Please enter the URL if available, including the "http://":', "" );
            if (url === null)
            {
                statelem.error( 'Aborted by user.' );
                return null;
            }
            parameters.url = url;
            break;
        case 'a2':
            var source = prompt('Enter an interwiki link to the article on the foreign-language wiki (for example, "fr:Bonjour"):', "");
            if (source === null)
            {
                statelem.error('Aborted by user.');
                return null;
            }
            parameters.source = source;
            break;
        case 'a10':
            var duptitle = prompt( 'Enter the article name that is duplicated:', "" );
            if (duptitle === null)
            {
                statelem.error( 'Aborted by user.' );
                return null;
            }
            parameters.article = duptitle;
            break;
        case 'f1':
            var img = prompt( 'Enter the file this is redundant to, excluding the "Image:" or "File:" prefix:', "" );
            if (img === null)
            {
                statelem.error( 'Aborted by user.' );
                return null;
            }
            parameters.filename = img;
            break;
        case 't3':
            var template = prompt( 'Enter the template this is redundant to, excluding the "Template:" prefix:', "" );
            if (template === null)
            {
                statelem.error( 'Aborted by user.' );
                return null;
            }
            parameters["1"] = "~~~~~";
            parameters["2"] = template;
            break;
        case 'g10':
            parameters.blanked = 'yes';
            // it is actually blanked elsewhere in code, but setting the flag here
            break;
        case 'p1':
            var criterion = prompt( 'Enter the code of the article CSD criterion which this portal falls under:   \n\n(A1 = no context, A3 = no content, A7 = non-notable, A10 = duplicate)', "" );
            if (!criterion || !criterion.replace(/^\s*/, "").replace(/\s*$/, ""))
            {
                statelem.error( 'You must enter a criterion.  Aborted by user.' );
                return null;
            }
            parameters["1"] = criterion;
            break;
        default:
            break;
    }
    return parameters;
};

// function for processing talk page notification template parameters
Twinkle.speedy.getUserTalkParameters = function twinklespeedyGetUserTalkParameters(normalized, parameters)
{
    var utparams = [];
    switch (normalized)
    {
        case 'db':
            utparams["2"] = parameters["1"];
            break;
        case 'a10':
            utparams.key1 = "article";
            utparams.value1 = parameters.article;
            break;
        default:
            break;
    }
    return utparams;
};

Twinkle.speedy.callback.evaluateSysop = function twinklespeedyCallbackEvaluateSysop(e)
{
    mw.config.set('wgPageName', mw.config.get('wgPageName').replace(/_/g, ' ')); // for queen/king/whatever and country!

    var tag_only = e.target.form.tag_only;
    if( tag_only && tag_only.checked ) {
        Twinkle.speedy.callback.evaluateUser(e);
        return;
    }

    var value = e.target.values;
    var normalized = Twinkle.speedy.normalizeHash[ value ];

    var params = {
        value: value,
        normalized: normalized,
        watch: Twinkle.getPref('watchSpeedyPages').indexOf( normalized ) !== -1,
        reason: Twinkle.speedy.reasonHash[ value ],
        openusertalk: Twinkle.getPref('openUserTalkPageOnSpeedyDelete').indexOf( normalized ) !== -1,
        deleteTalkPage: e.target.form.talkpage && e.target.form.talkpage.checked,
        deleteRedirects: e.target.form.redirects.checked
    };
    Status.init( e.target.form );

    Twinkle.speedy.callbacks.sysop.main( params );
};

Twinkle.speedy.callback.evaluateUser = function twinklespeedyCallbackEvaluateUser(e) {
    mw.config.set('wgPageName', mw.config.get('wgPageName').replace(/_/g, ' '));  // for queen/king/whatever and country!
    var value = e.target.values;

    if (value === 'multiple')
    {
        e.target.form.style.display = "none"; // give the user a cue that the dialog is being changed
        setTimeout(function() {
            Twinkle.speedy.initDialog(Twinkle.speedy.callback.doMultiple, false, e.target.form.parentNode);
        }, 150);
        return;
    }

    if (value === 'multiple-finish') {
        value = 'multiple';
    }
    else
    {
        // clear these out, whatever the case, to avoid errors
        Twinkle.speedy.dbmultipleCriteria = [];
        Twinkle.speedy.dbmultipleParameters = [];
    }

    var normalized = Twinkle.speedy.normalizeHash[ value ];

    // for sysops only
    if (['f4', 'f5', 'f6', 'f11'].indexOf(normalized) !== -1) {
        alert("Tagging with F4, F5, F6, and F11 is not possible using the CSD module.  Try using DI instead, or unchecking \"Tag page only\" if you meant to delete the page.");
        return;
    }

    var i;

    // analyse each db-multiple criterion to determine whether to watch the page/notify the creator
    var watchPage = false;
    if (value === 'multiple')
    {
        for (i in Twinkle.speedy.dbmultipleCriteria)
        {
            if (typeof Twinkle.speedy.dbmultipleCriteria[i] === 'string' &&
                Twinkle.getPref('watchSpeedyPages').indexOf(Twinkle.speedy.dbmultipleCriteria[i]) !== -1)
            {
                watchPage = true;
                break;
            }
        }
    }
    else
    {
        watchPage = Twinkle.getPref('watchSpeedyPages').indexOf(normalized) !== -1;
    }

    var notifyuser = false;
    if (value === 'multiple')
    {
        for (i in Twinkle.speedy.dbmultipleCriteria)
        {
            if (typeof Twinkle.speedy.dbmultipleCriteria[i] === 'string' &&
                Twinkle.getPref('notifyUserOnSpeedyDeletionNomination').indexOf(Twinkle.speedy.dbmultipleCriteria[i]) !== -1)
            {
                notifyuser = true;
                break;
            }
        }
    }
    else
    {
        notifyuser = (Twinkle.getPref('notifyUserOnSpeedyDeletionNomination').indexOf(normalized) !== -1) && e.target.form.notify.checked;
    }

    var welcomeuser = false;
    if (notifyuser)
    {
        if (value === 'multiple')
        {
            for (i in Twinkle.speedy.dbmultipleCriteria)
            {
                if (typeof Twinkle.speedy.dbmultipleCriteria[i] === 'string' &&
                    Twinkle.getPref('welcomeUserOnSpeedyDeletionNotification').indexOf(Twinkle.speedy.dbmultipleCriteria[i]) !== -1)
                {
                    welcomeuser = true;
                    break;
                }
            }
        }
        else
        {
            welcomeuser = Twinkle.getPref('welcomeUserOnSpeedyDeletionNotification').indexOf(normalized) !== -1;
        }
    }

    var csdlog = false;
    if (Twinkle.getPref('logSpeedyNominations') && value === 'multiple')
    {
        for (i in Twinkle.speedy.dbmultipleCriteria)
        {
            if (typeof Twinkle.speedy.dbmultipleCriteria[i] === 'string' &&
                Twinkle.getPref('noLogOnSpeedyNomination').indexOf(Twinkle.speedy.dbmultipleCriteria[i]) === -1)
            {
                csdlog = true;
                break;
            }
        }
    }
    else
    {
        csdlog = Twinkle.getPref('logSpeedyNominations') && Twinkle.getPref('noLogOnSpeedyNomination').indexOf(normalized) === -1;
    }

    var params = {
        value: value,
        normalized: normalized,
        watch: watchPage,
        usertalk: notifyuser,
        welcomeuser: welcomeuser,
        lognomination: csdlog
    };

    Status.init( e.target.form );

    Wikipedia.actionCompleted.redirect = mw.config.get('wgPageName');
    Wikipedia.actionCompleted.notice = "Tagging complete";

    var wikipedia_page = new Wikipedia.page(mw.config.get('wgPageName'), "Tagging page");
    wikipedia_page.setCallbackParameters(params);
    wikipedia_page.load(Twinkle.speedy.callbacks.user.main);
};

Twinkle.speedy.dbmultipleCriteria = [];
Twinkle.speedy.dbmultipleParameters = [];
Twinkle.speedy.callback.doMultiple = function twinklespeedyCallbackDoMultiple(e)
{
    var value = e.target.values;
    var normalized = Twinkle.speedy.normalizeHash[value];
    if (value !== 'multiple-finish')
    {
        if (Twinkle.speedy.dbmultipleCriteria.indexOf(normalized) !== -1)
        {
            alert('You already selected that criterion. Please choose another.');
        }
        else
        {
            var parameters = Twinkle.speedy.getParameters(value, normalized, Status);
            if (parameters)
            {
                for (var i in parameters) {
                    if (typeof parameters[i] === 'string') {
                        Twinkle.speedy.dbmultipleParameters[i] = parameters[i];
                    }
                }
                Twinkle.speedy.dbmultipleCriteria.push(normalized);
            }
        }
        e.target.form.style.display = "none"; // give the user a cue that the dialog is being changed
        setTimeout(function() {
            Twinkle.speedy.initDialog(Twinkle.speedy.callback.doMultiple, false, e.target.form.parentNode);
        }, 150);
    }
    else
    {
        Twinkle.speedy.callback.evaluateUser(e);
    }
};

/*
 ****************************************
 *** twinkleunlink.js: Unlink module
 ****************************************
 * Mode of invocation:     Tab ("Unlink")
 * Active on:              Non-special pages
 * Config directives in:   TwinkleConfig
 */

Twinkle.unlink = function twinkleunlink() {
    if( mw.config.get('wgNamespaceNumber') < 0 ) {
        return;
    }
    $(twAddPortletLink("#", "Unlink", "tw-unlink", "Unlink backlinks", "")).click(function(){Twinkle.unlink.callback()}); //wrap call in function, callback expects a reason parameter.
};

Twinkle.unlink.getChecked2 = function twinkleunlinkGetChecked2( nodelist ) {
    if( !( nodelist instanceof NodeList ) && !( nodelist instanceof HTMLCollection ) ) {
        return nodelist.checked ? [ nodelist.value ] : [];
    }
    var result = [];
    for(var i  = 0; i < nodelist.length; ++i ) {
        if( nodelist[i].checked ) {
            result.push( nodelist[i].value );
        }
    }
    return result;
};

// the parameter is used when invoking unlink from admin speedy
Twinkle.unlink.callback = function(presetReason) {
    var Window = new SimpleWindow( 800, 400 );
    Window.setTitle( "Unlink backlinks" );
    Window.setScriptName( "Twinkle" );
    Window.addFooterLink( "Twinkle help", "WP:TW/DOC#unlink" );

    var form = new QuickForm( Twinkle.unlink.callback.evaluate );
    form.append( {
        type: 'textarea',
        name: 'reason',
        label: 'Reason: ',
        value: (presetReason ? presetReason : '')
    } );

    var query;
    if(mw.config.get('wgNamespaceNumber') === Namespace.IMAGE) {
        query = {
            'action': 'query',
            'list': [ 'backlinks', 'imageusage' ],
            'bltitle': mw.config.get('wgPageName'),
            'iutitle': mw.config.get('wgPageName'),
            'bllimit': userIsInGroup( 'sysop' ) ? 5000 : 500, // 500 is max for normal users, 5000 for bots and sysops
            'iulimit': userIsInGroup( 'sysop' ) ? 5000 : 500, // 500 is max for normal users, 5000 for bots and sysops
            'blnamespace': Twinkle.getPref('unlinkNamespaces') // Main namespace and portal namespace only, keep on talk pages.
        };
    } else {
        query = {
            'action': 'query',
            'list': 'backlinks',
            'bltitle': mw.config.get('wgPageName'),
            'blfilterredir': 'nonredirects',
            'bllimit': userIsInGroup( 'sysop' ) ? 5000 : 500, // 500 is max for normal users, 5000 for bots and sysops
            'blnamespace': Twinkle.getPref('unlinkNamespaces') // Main namespace and portal namespace only, keep on talk pages.
        };
    }
    var wikipedia_api = new Wikipedia.api( 'Grabbing backlinks', query, Twinkle.unlink.callbacks.display.backlinks );
    wikipedia_api.params = { form: form, Window: Window, image: mw.config.get('wgNamespaceNumber') === Namespace.IMAGE };
    wikipedia_api.post();

    var root = document.createElement( 'div' );
    root.style.padding = '15px';  // just so it doesn't look broken
    Status.init( root );
    wikipedia_api.statelem.status( "loading..." );
    Window.setContent( root );
    Window.display();
};

Twinkle.unlink.callback.evaluate = function twinkleunlinkCallbackEvaluate(event) {
    mw.config.set('wgPageName', mw.config.get('wgPageName').replace(/_/g, ' '));  // for queen/king/whatever and country!

    Twinkle.unlink.backlinksdone = 0;
    Twinkle.unlink.imageusagedone = 0;

    function processunlink(pages, imageusage) {
        var statusIndicator = new Status((imageusage ? 'Unlinking instances of file usage' : 'Unlinking backlinks'), '0%');
        var total = pages.length;  // removing doubling of this number - no apparent reason for it

        Wikipedia.addCheckpoint();

        if( !pages.length ) {
            statusIndicator.info( '100% (completed)' );
            Wikipedia.removeCheckpoint();
            return;
        }

        // get an edit token
        var params = { reason: reason, imageusage: imageusage, globalstatus: statusIndicator, current: 0, total: total };
        for (var i = 0; i < pages.length; ++i)
        {
            var myparams = clone(params);
            var articlepage = new Wikipedia.page(pages[i], 'Unlinking in article "' + pages[i] + '"');
            articlepage.setCallbackParameters(myparams);
            articlepage.load(imageusage ? Twinkle.unlink.callbacks.unlinkImageInstances : Twinkle.unlink.callbacks.unlinkBacklinks);
        }
    }

    var reason = event.target.reason.value;
    var backlinks, imageusage;
    if( event.target.backlinks ) {
        backlinks = Twinkle.unlink.getChecked2(event.target.backlinks);
    }
    if( event.target.imageusage ) {
        imageusage = Twinkle.unlink.getChecked2(event.target.imageusage);
    }

    SimpleWindow.setButtonsEnabled( false );
    Status.init( event.target );
    Wikipedia.addCheckpoint();
    if (backlinks) {
        processunlink(backlinks, false);
    }
    if (imageusage) {
        processunlink(imageusage, true);
    }
    Wikipedia.removeCheckpoint();
};

Twinkle.unlink.backlinksdone = 0;
Twinkle.unlink.imageusagedone = 0;

Twinkle.unlink.callbacks = {
    display: {
        backlinks: function twinkleunlinkCallbackDisplayBacklinks(apiobj) {
            var xmlDoc = apiobj.responseXML;
            var havecontent = false;
            var list, namespaces, i;

            if( apiobj.params.image ) {
                var imageusage = $(xmlDoc).find('query imageusage iu');
                list = [];
                for ( i = 0; i < imageusage.length; ++i ) {
                    var usagetitle = imageusage[i].getAttribute('title');
                    list.push( { label: usagetitle, value: usagetitle, checked: true } );
                }
                if (!list.length)
                {
                    apiobj.params.form.append( { type: 'div', label: 'No instances of file usage found.' } );
                }
                else
                {
                    apiobj.params.form.append( { type:'header', label: 'File usage' } );
                    namespaces = [];
                    $.each(Twinkle.getPref('unlinkNamespaces'), function(k, v) {
                        namespaces.push(Wikipedia.namespacesFriendly[v]);
                    });
                    apiobj.params.form.append( {
                        type: 'div',
                        label: "Selected namespaces: " + namespaces.join(', '),
                        tooltip: "You can change this with your Twinkle preferences, at [[WP:TWPREFS]]"
                    });
                    if ($(xmlDoc).find('query-continue').length) {
                        apiobj.params.form.append( {
                            type: 'div',
                            label: "First " + list.length.toString() + " file usages shown."
                        });
                    }
                    apiobj.params.form.append( {
                        type: 'checkbox',
                        name: 'imageusage',
                        list: list
                    } );
                    havecontent = true;
                }
            }

            var backlinks = $(xmlDoc).find('query backlinks bl');
            if( backlinks.length > 0 ) {
                list = [];
                for ( i = 0; i < backlinks.length; ++i ) {
                    var title = backlinks[i].getAttribute('title');
                    list.push( { label: title, value: title, checked: true } );
                }
                apiobj.params.form.append( { type:'header', label: 'Backlinks' } );
                namespaces = [];
                $.each(Twinkle.getPref('unlinkNamespaces'), function(k, v) {
                    namespaces.push(Wikipedia.namespacesFriendly[v]);
                });
                apiobj.params.form.append( {
                    type: 'div',
                    label: "Selected namespaces: " + namespaces.join(', '),
                    tooltip: "You can change this with your Twinkle preferences, at [[WP:TWPREFS]]"
                });
                if ($(xmlDoc).find('query-continue').length) {
                    apiobj.params.form.append( {
                        type: 'div',
                        label: "First " + list.length.toString() + " backlinks shown."
                    });
                }
                apiobj.params.form.append( {
                    type: 'checkbox',
                    name: 'backlinks',
                    list: list
                });
                havecontent = true;
            }
            else
            {
                apiobj.params.form.append( { type: 'div', label: 'No backlinks found.' } );
            }

            if (havecontent) {
                apiobj.params.form.append( { type:'submit' } );
            }

            var result = apiobj.params.form.render();
            apiobj.params.Window.setContent( result );
        }
    },
    unlinkBacklinks: function twinkleunlinkCallbackUnlinkBacklinks(pageobj) {
        var text, oldtext;
        text = oldtext = pageobj.getPageText();
        var params = pageobj.getCallbackParameters();

        var wikiPage = new Mediawiki.Page(text);
        wikiPage.removeLink(mw.config.get('wgPageName'));
        text = wikiPage.getText();
        if (text === oldtext) {
            // Nothing to do, return
            Twinkle.unlink.callbacks.success(pageobj);
            Wikipedia.actionCompleted();
            return;
        }

        pageobj.setPageText(text);
        pageobj.setEditSummary("Removing link(s) to \"" + mw.config.get('wgPageName') + "\": " + params.reason + "." + Twinkle.getPref('summaryAd'));
        pageobj.setCreateOption('nocreate');
        pageobj.save(Twinkle.unlink.callbacks.success);
    },
    unlinkImageInstances: function twinkleunlinkCallbackUnlinkImageInstances(pageobj) {
        var text, oldtext;
        text = oldtext = pageobj.getPageText();
        var params = pageobj.getCallbackParameters();

        var wikiPage = new Mediawiki.Page(text);
        wikiPage.commentOutImage(mw.config.get('wgTitle'), 'Commented out');
        text = wikiPage.getText();
        if (text === oldtext) {
            // Nothing to do, return
            Twinkle.unlink.callbacks.success(pageobj);
            Wikipedia.actionCompleted();
            return;
        }

        pageobj.setPageText(text);
        pageobj.setEditSummary("Commenting out use(s) of file \"" + mw.config.get('wgPageName') + "\": " + params.reason + "." + Twinkle.getPref('summaryAd'));
        pageobj.setCreateOption('nocreate');
        pageobj.save(Twinkle.unlink.callbacks.success);
    },
    success: function twinkleunlinkCallbackSuccess(pageobj) {
        var statelem = pageobj.getStatusElement();
        statelem.info('done');

        var params = pageobj.getCallbackParameters();
        var total = params.total;
        var now = parseInt( 100 * (params.imageusage ? ++(Twinkle.unlink.imageusagedone) : ++(Twinkle.unlink.backlinksdone))/total, 10 ) + '%';
        params.globalstatus.update( now );
        if((params.imageusage ? Twinkle.unlink.imageusagedone : Twinkle.unlink.backlinksdone) >= total) {
            params.globalstatus.info( now + ' (completed)' );
            Wikipedia.removeCheckpoint();
        }
    }
};

/*
 ****************************************
 *** twinklewarn.js: Warn module
 ****************************************
 * Mode of invocation:     Tab ("Warn")
 * Active on:              User talk pages
 * Config directives in:   TwinkleConfig
 */

Twinkle.warn = function twinklewarn() {
    if( mw.config.get('wgNamespaceNumber') === 3 ) {
        if(twinkleUserAuthorized) {
            $(twAddPortletLink("#", "Warn", "tw-warn", "Warn/notify user", "")).click(Twinkle.warn.callback);
        } else {
            $(twAddPortletLink("#", "Warn", "tw-warn", "Warn/notify user", "")).click(function() {
                alert("Your account is too new to use Twinkle.");
            });
        }
    }
};

Twinkle.warn.callback = function twinklewarnCallback() {
    var Window = new SimpleWindow( 600, 440 );
    Window.setTitle( "Warn/notify user" );
    Window.setScriptName( "Twinkle" );
    Window.addFooterLink( "Choosing a warning level", "WP:UWUL#Levels" );
    Window.addFooterLink( "Twinkle help", "WP:TW/DOC#warn" );

    var form = new QuickForm( Twinkle.warn.callback.evaluate );
    var main_select = form.append( {
            type:'field',
            label:'Choose type of warning/notice to issue',
            tooltip:'First choose a main warning group, then the specific warning to issue.'
        } );

    var main_group = main_select.append( {
            type:'select',
            name:'main_group',
            event:Twinkle.warn.callback.change_category
        } );

    var defaultGroup = parseInt(Twinkle.getPref('defaultWarningGroup'), 10);
    main_group.append( { type:'option', label:'General note (1)', value:'level1', selected: ( defaultGroup === 1 || defaultGroup < 1 || ( userIsInGroup( 'sysop' ) ? defaultGroup > 8 : defaultGroup > 7 ) ) } );
    main_group.append( { type:'option', label:'Caution (2)', value:'level2', selected: ( defaultGroup === 2 ) } );
    main_group.append( { type:'option', label:'Warning (3)', value:'level3', selected: ( defaultGroup === 3 ) } );
    main_group.append( { type:'option', label:'Final warning (4)', value:'level4', selected: ( defaultGroup === 4 ) } );
    main_group.append( { type:'option', label:'Only warning (4im)', value:'level4im', selected: ( defaultGroup === 5 ) } );
    main_group.append( { type:'option', label:'Single issue notices', value:'singlenotice', selected: ( defaultGroup === 6 ) } );
    main_group.append( { type:'option', label:'Single issue warnings', value:'singlewarn', selected: ( defaultGroup === 7 ) } );
    if( userIsInGroup( 'sysop' ) ) {
        main_group.append( { type:'option', label:'Blocking', value:'block', selected: ( defaultGroup === 8 ) } );
    }

    main_select.append( { type:'select', name:'sub_group', event:Twinkle.warn.callback.change_subcategory } ); //Will be empty to begin with.

    form.append( {
            type:'input',
            name:'article',
            label:'Linked article',
            value:( QueryString.exists( 'vanarticle' ) ? QueryString.get( 'vanarticle' ) : '' ),
            tooltip:'An article can be linked within the notice, perhaps because it was a revert to said article that dispatched this notice. Leave empty for no article to be linked.'
        } );

    var more = form.append( { type:'field', label:'Fill in an optional reason and hit \"Submit\"' } );
    more.append( { type:'textarea', label:'More:', name:'reason', tooltip:'Perhaps a reason, or that a more detailed notice must be appended' } );

    var previewlink = document.createElement( 'a' );
    $(previewlink).click(function(){
        Twinkle.warn.callbacks.preview();
    });
    previewlink.style.cursor = "pointer";
    previewlink.textContent = 'Preview';
    more.append( { type: 'div', name: 'warningpreview', label: [ previewlink ] } );

    more.append( { type:'submit', label:'Submit' } );

    var result = form.render();
    Window.setContent( result );
    Window.display();
    result.main_group.root = result;

    // We must init the first choice (General Note);
    var evt = document.createEvent( "Event" );
    evt.initEvent( 'change', true, true );
    result.main_group.dispatchEvent( evt );
};

// This is all the messages that might be dispatched by the code
// Each of the individual templates require the following information:
//   label (required): A short description displayed in the dialog
//   summary (required): The edit summary used. If an article name is entered, the summary is postfixed with "on [[article]]", and it is always postfixed with ". $summaryAd"
//   suppressArticleInSummary (optional): Set to true to suppress showing the article name in the edit summary. Useful if the warning relates to attack pages, or some such.
Twinkle.warn.messages = {
    level1: {
        "uw-vandalism1": {
            label:"Vandalism",
            summary:"General note: Nonconstructive editing"
        },
        "uw-test1": {
            label:"Editing tests",
            summary:"General note: Editing tests"
        },
        "uw-delete1": {
            label:"Page blanking, removal of content",
            summary:"General note: Page blanking, removal of content"
        },
        "uw-redirect1": {
            label:"Creating malicious redirects",
            summary:"General note: Creating malicious redirects"
        },
        "uw-tdel1": {
            label:"Removal of maintenance templates",
            summary:"General note: Removal of maintenance templates"
        },
        "uw-joke1": {
            label:"Using improper humor",
            summary:"General note: Using improper humor"
        },
        "uw-create1": {
            label:"Creating inappropriate pages",
            summary:"General note: Creating inappropriate pages"
        },
        "uw-upload1": {
            label:"Uploading unencyclopedic images",
            summary:"General note: Uploading unencyclopedic images"
        },
        "uw-image1": {
            label:"Image-related vandalism",
            summary:"General note: Image-related vandalism"
        },
        "uw-ics1": {
            label:"Uploading files missing copyright status",
            summary:"General note: Uploading files missing copyright status"
        },
        "uw-idt1": {
            label:"Removing file deletion tags",
            summary:"General note: Removing file deletion tags"
        },
        "uw-spam1": {
            label:"Adding spam links",
            summary:"General note: Adding spam links"
        },
        "uw-advert1": {
            label:"Using Wikipedia for advertising or promotion",
            summary:"General note: Using Wikipedia for advertising or promotion"
        },
        "uw-npov1": {
            label:"Not adhering to neutral point of view",
            summary:"General note: Not adhering to neutral point of view"
        },
        "uw-unsourced1": {
            label:"Addition of unsourced or improperly cited material",
            summary:"General note: Addition of unsourced or improperly cited material"
        },
        "uw-error1": {
            label:"Introducing deliberate factual errors",
            summary:"General note: Introducing factual errors"
        },
        "uw-nor1": {
            label:"Adding original research, including unpublished syntheses of sourced material",
            summary:"General note: Adding original research, including unpublished syntheses of sourced material"
        },
        "uw-biog1": {
            label:"Adding unreferenced controversial information about living persons",
            summary:"General note: Adding unreferenced controversial information about living persons"
        },
        "uw-defam1": {
            label:"Defamation not specifically directed",
            summary:"General note: Defamation not specifically directed"
        },
        "uw-uncen1": {
            label:"Censorship of material",
            summary:"General note: Censorship of material"
        },
        "uw-mos1": {
            label:"Manual of style",
            summary:"General note: Formatting, date, language, etc (Manual of style)"
        },
        "uw-move1": {
            label:"Page moves against naming conventions or consensus",
            summary:"General note: Page moves against naming conventions or consensus"
        },
        "uw-chat1": {
            label:"Using talk page as forum",
            summary:"General note: Using talk page as forum"
        },
        "uw-tpv1": {
            label:"Refactoring others' talk page comments",
            summary:"General note: Refactoring others' talk page comments"
        },
        "uw-afd1": {
            label:"Removing {{afd}} templates",
            summary:"General note: Removing {{afd}} templates"
        },
        "uw-speedy1": {
            label:"Removing {{speedy deletion}} templates",
            summary:"General note: Removing {{speedy deletion}} templates"
        },
        "uw-blpprod1": {
            label:"Removing {{blp prod}} templates",
            summary:"General note: Removing {{blp prod}} templates"
        },
        "uw-npa1": {
            label:"Personal attack directed at a specific editor",
            summary:"General note: Personal attack directed at a specific editor"
        },
        "uw-agf1": {
            label:"Not assuming good faith",
            summary:"General note: Not assuming good faith"
        },
        "uw-own1": {
            label:"Ownership of articles",
            summary:"General note: Ownership of articles"
        },
        "uw-tempabuse1": {
            label:"Improper use of warning or blocking template",
            summary:"General note: Improper use of warning or blocking template"
        },
        "uw-genre1": {
            label:"Frequent or mass changes to genres without consensus or references",
            summary:"General note: Frequent or mass changes to genres without consensus or references"
        }
    },
    level2: {
        "uw-vandalism2": {
            label:"Vandalism",
            summary:"Caution: Vandalism"
        },
        "uw-test2": {
            label:"Editing tests",
            summary:"Caution: Editing tests"
        },
        "uw-delete2": {
            label:"Page blanking, removal of content",
            summary:"Caution: Page blanking, removal of content"
        },
        "uw-redirect2": {
            label:"Creating malicious redirects",
            summary:"Caution: Creating malicious redirects"
        },
        "uw-tdel2": {
            label:"Removal of maintenance templates",
            summary:"Caution: Removal of maintenance templates"
        },
        "uw-joke2": {
            label:"Using improper humor",
            summary:"Caution: Using improper humor"
        },
        "uw-create2": {
            label:"Creating inappropriate pages",
            summary:"Caution: Creating inappropriate pages"
        },
        "uw-upload2": {
            label:"Uploading unencyclopedic images",
            summary:"Caution: Uploading unencyclopedic images"
        },
        "uw-image2": {
            label:"Image-related vandalism",
            summary:"Caution: Image-related vandalism"
        },
        "uw-ics2": {
            label:"Uploading files missing copyright status",
            summary:"Caution: Uploading files missing copyright status"
        },
        "uw-idt2": {
            label:"Removing file deletion tags",
            summary:"Caution: Removing file deletion tags"
        },
        "uw-spam2": {
            label:"Adding spam links",
            summary:"Caution: Adding spam links"
        },
        "uw-advert2": {
            label:"Using Wikipedia for advertising or promotion",
            summary:"Caution: Using Wikipedia for advertising or promotion"
        },
        "uw-npov2": {
            label:"Not adhering to neutral point of view",
            summary:"Caution: Not adhering to neutral point of view"
        },
        "uw-unsourced2": {
            label:"Addition of unsourced or improperly cited material",
            summary:"Caution: Addition of unsourced or improperly cited material"
        },
        "uw-error2": {
            label:"Introducing deliberate factual errors",
            summary:"Caution: Introducing factual errors"
        },
        "uw-nor2": {
            label:"Adding original research, including unpublished syntheses of sourced material",
            summary:"Caution: Adding original research, including unpublished syntheses of sourced material"
        },
        "uw-biog2": {
            label:"Adding unreferenced controversial information about living persons",
            summary:"Caution: Adding unreferenced controversial information about living persons"
        },
        "uw-defam2": {
            label:"Defamation not specifically directed",
            summary:"Caution: Defamation not specifically directed"
        },
        "uw-uncen2": {
            label:"Censorship of material",
            summary:"Caution: Censorship of material"
        },
        "uw-mos2": {
            label:"Manual of style",
            summary:"Caution: Formatting, date, language, etc (Manual of style)"
        },
        "uw-move2": {
            label:"Page moves against naming conventions or consensus",
            summary:"Caution: Page moves against naming conventions or consensus"
        },
        "uw-chat2": {
            label:"Using talk page as forum",
            summary:"Caution: Using talk page as forum"
        },
        "uw-tpv2": {
            label:"Refactoring others' talk page comments",
            summary:"Caution: Refactoring others' talk page comments"
        },
        "uw-afd2": {
            label:"Removing {{afd}} templates",
            summary:"Caution: Removing {{afd}} templates"
        },
        "uw-speedy2": {
            label:"Removing {{speedy deletion}} templates",
            summary:"Caution: Removing {{speedy deletion}} templates"
        },
        "uw-blpprod2": {
            label:"Removing {{blp prod}} templates",
            summary:"Caution: Removing {{blp prod}} templates"
        },
        "uw-npa2": {
            label:"Personal attack directed at a specific editor",
            summary:"Caution: Personal attack directed at a specific editor"
        },
        "uw-agf2": {
            label:"Not assuming good faith",
            summary:"Caution: Not assuming good faith"
        },
        "uw-own2": {
            label:"Ownership of articles",
            summary:"Caution: Ownership of articles"
        },
        "uw-tempabuse2": {
            label:"Improper use of warning or blocking template",
            summary:"Caution: Improper use of warning or blocking template"
        },
        "uw-genre2": {
            label:"Frequent or mass changes to genres without consensus or references",
            summary:"Caution: Frequent or mass changes to genres without consensus or references"
        }
    },
    level3: {
        "uw-vandalism3": {
            label:"Vandalism",
            summary:"Warning: Vandalism"
        },
        "uw-test3": {
            label:"Editing tests",
            summary:"Warning: Editing tests"
        },
        "uw-delete3": {
            label:"Page blanking, removal of content",
            summary:"Warning: Page blanking, removal of content"
        },
        "uw-redirect3": {
            label:"Creating malicious redirects",
            summary:"Warning: Creating malicious redirects"
        },
        "uw-tdel3": {
            label:"Removal of maintenance templates",
            summary:"Warning: Removal of maintenance templates"
        },
        "uw-joke3": {
            label:"Using improper humor",
            summary:"Warning: Using improper humor"
        },
        "uw-create3": {
            label:"Creating inappropriate pages",
            summary:"Warning: Creating inappropriate pages"
        },
        "uw-upload3": {
            label:"Uploading unencyclopedic images",
            summary:"Warning: Uploading unencyclopedic images"
        },
        "uw-image3": {
            label:"Image-related vandalism",
            summary:"Warning: Image-related vandalism"
        },
        "uw-ics3": {
            label:"Uploading files missing copyright status",
            summary:"Warning: Uploading files missing copyright status"
        },
        "uw-idt3": {
            label:"Removing file deletion tags",
            summary:"Warning: Removing file deletion tags"
        },
        "uw-spam3": {
            label:"Adding spam links",
            summary:"Warning: Adding spam links"
        },
        "uw-advert3": {
            label:"Using Wikipedia for advertising or promotion",
            summary:"Warning: Using Wikipedia for advertising or promotion"
        },
        "uw-npov3": {
            label:"Not adhering to neutral point of view",
            summary:"Warning: Not adhering to neutral point of view"
        },
        "uw-unsourced3": {
            label:"Addition of unsourced or improperly cited material",
            summary:"Warning: Addition of unsourced or improperly cited material"
        },
        "uw-error3": {
            label:"Introducing deliberate factual errors",
            summary:"Warning: Introducing deliberate factual errors"
        },
        "uw-nor3": {
            label:"Adding original research, including unpublished syntheses of sourced material",
            summary:"Warning: Adding original research, including unpublished syntheses of sourced material"
        },
        "uw-biog3": {
            label:"Adding unreferenced controversial or defamatory information about living persons",
            summary:"Warning: Adding unreferenced controversial information about living persons"
        },
        "uw-defam3": {
            label:"Defamation not specifically directed",
            summary:"Warning: Defamation not specifically directed"
        },
        "uw-uncen3": {
            label:"Censorship of material",
            summary:"Warning: Censorship of material"
        },
        "uw-mos3": {
            label:"Manual of style",
            summary:"Warning: Formatting, date, language, etc (Manual of style)"
        },
        "uw-move3": {
            label:"Page moves against naming conventions or consensus",
            summary:"Warning: Page moves against naming conventions or consensus"
        },
        "uw-chat3": {
            label:"Using talk page as forum",
            summary:"Warning: Using talk page as forum"
        },
        "uw-tpv3": {
            label:"Refactoring others' talk page comments",
            summary:"Warning: Refactoring others' talk page comments"
        },
        "uw-afd3": {
            label:"Removing {{afd}} templates",
            summary:"Warning: Removing {{afd}} templates"
        },
        "uw-speedy3": {
            label:"Removing {{speedy deletion}} templates",
            summary:"Warning: Removing {{speedy deletion}} templates"
        },
        "uw-blpprod3": {
            label:"Removing {{blpprod}} templates",
            summary:"Warning: Removing {{blpprod}} templates"
        },
        "uw-npa3": {
            label:"Personal attack directed at a specific editor",
            summary:"Warning: Personal attack directed at a specific editor"
        },
        "uw-agf3": {
            label:"Not assuming good faith",
            summary:"Warning: Not assuming good faith"
        },
        "uw-own3": {
            label:"Ownership of articles",
            summary:"Warning: Ownership of articles"
        },
        "uw-genre3": {
            label:"Frequent or mass changes to genres without consensus or reference",
            summary:"Warning: Frequent or mass changes to genres without consensus or reference"
        }

    },
    level4: {
        "uw-generic4": {
            label:"Generic warning (for template series missing level 4)",
            summary:"Final warning notice"
        },
        "uw-vandalism4": {
            label:"Vandalism",
            summary:"Final warning: Vandalism"
        },
        "uw-test4": {
            label:"Editing tests",
            summary:"Final warning: Editing tests"
        },
        "uw-delete4": {
            label:"Page blanking, removal of content",
            summary:"Final warning: Page blanking, removal of content"
        },
        "uw-redirect4": {
            label:"Creating malicious redirects",
            summary:"Final warning: Creating malicious redirects"
        },
        "uw-tdel4": {
            label:"Removal of maintenance templates",
            summary:"Final warning: Removal of maintenance templates"
        },
        "uw-joke4": {
            label:"Using improper humor",
            summary:"Final warning: Using improper humor"
        },
        "uw-create4": {
            label:"Creating inappropriate pages",
            summary:"Final warning: Creating inappropriate pages"
        },
        "uw-upload4": {
            label:"Uploading unencyclopedic images",
            summary:"Final warning: Uploading unencyclopedic images"
        },
        "uw-image4": {
            label:"Image-related vandalism",
            summary:"Final warning: Image-related vandalism"
        },
        "uw-ics4": {
            label:"Uploading files missing copyright status",
            summary:"Final warning: Uploading files missing copyright status"
        },
        "uw-idt4": {
            label:"Removing file deletion tags",
            summary:"Final warning: Removing file deletion tags"
        },
        "uw-spam4": {
            label:"Adding spam links",
            summary:"Final warning: Adding spam links"
        },
        "uw-advert4": {
            label:"Using Wikipedia for advertising or promotion",
            summary:"Final warning: Using Wikipedia for advertising or promotion"
        },
        "uw-npov4": {
            label:"Not adhering to neutral point of view",
            summary:"Final warning: Not adhering to neutral point of view"
        },
        "uw-error4": {
            label:"Introducing deliberate factual errors",
            summary:"Final Warning: Introducing deliberate factual errors"
        },
        "uw-nor4": {
            label:"Adding original research, including unpublished syntheses of sourced material",
            summary:"Final Warning: Adding original research, including unpublished syntheses of sourced material"
        },
        "uw-biog4": {
            label:"Adding unreferenced defamatory information about living persons",
            summary:"Final warning: Adding unreferenced controversial information about living persons"
        },
        "uw-defam4": {
            label:"Defamation not specifically directed",
            summary:"Final warning: Defamation not specifically directed"
        },
        "uw-uncen4": {
            label:"Censorship of material",
            summary:"Final warning: Censorship of material"
        },
        "uw-mos4": {
            label:"Manual of style",
            summary:"Final warning: Formatting, date, language, etc (Manual of style)"
        },
        "uw-move4": {
            label:"Page moves against naming conventions or consensus",
            summary:"Final warning: Page moves against naming conventions or consensus"
        },
        "uw-chat4": {
            label:"Using talk page as forum",
            summary:"Final warning: Using talk page as forum"
        },
        "uw-tpv4": {
            label:"Refactoring others' talk page comments",
            summary:"Final warning: Refactoring others' talk page comments"
        },
        "uw-afd4": {
            label:"Removing {{afd}} templates",
            summary:"Final warning: Removing {{afd}} templates"
        },
        "uw-speedy4": {
            label:"Removing {{speedy deletion}} templates",
            summary:"Final warning: Removing {{speedy deletion}} templates"
        },
        "uw-blpprod4": {
            label:"Removing {{blpprod}} templates",
            summary:"Final warning: Removing {{blpprod}} templates"
        },
        "uw-npa4": {
            label:"Personal attack directed at a specific editor",
            summary:"Final warning: Personal attack directed at a specific editor"
        }

    },
    level4im: {
        "uw-vandalism4im": {
            label:"Vandalism",
            summary:"Only warning: Vandalism"
        },
        "uw-delete4im": {
            label:"Page blanking, removal of content",
            summary:"Only warning: Page blanking, removal of content"
        },
        "uw-redirect4im": {
            label:"Creating malicious redirects",
            summary:"Only warning: Creating malicious redirects"
        },
        "uw-joke4im": {
            label:"Using improper humor",
            summary:"Only warning: Using improper humor"
        },
        "uw-create4im": {
            label:"Creating inappropriate pages",
            summary:"Only warning: Creating inappropriate pages"
        },
        "uw-upload4im": {
            label:"Uploading unencyclopedic images",
            summary:"Only warning: Uploading unencyclopedic images"
        },
        "uw-image4im": {
            label:"Image-related vandalism",
            summary:"Only warning: Image-related vandalism"
        },
        "uw-spam4im": {
            label:"Adding spam links",
            summary:"Only warning: Adding spam links"
        },
        "uw-advert4im": {
            label:"Using Wikipedia for advertising or promotion",
            summary:"Only warning: Using Wikipedia for advertising or promotion"
        },
        "uw-biog4im": {
            label:"Adding unreferenced defamatory information about living persons",
            summary:"Only warning: Adding unreferenced controversial information about living persons"
        },
        "uw-defam4im": {
            label:"Defamation not specifically directed",
            summary:"Only warning: Defamation not specifically directed"
        },
        "uw-move4im": {
            label:"Page moves against naming conventions or consensus",
            summary:"Only warning: Page moves against naming conventions or consensus"
        },
        "uw-npa4im": {
            label:"Personal attack directed at a specific editor",
            summary:"Only warning: Personal attack directed at a specific editor"
        }
    },
    singlenotice: {
        "uw-2redirect": {
            label:"Creating double redirects through bad page moves",
            summary:"Notice: Creating double redirects through bad page moves"
        },
        "uw-aiv": {
            label:"Bad AIV report",
            summary:"Notice: Bad AIV report"
        },
        "uw-articlesig": {
            label:"Adding signatures to article space",
            summary:"Notice: Adding signatures to article space"
        },
        "uw-autobiography": {
            label:"Creating autobiographies",
            summary:"Notice: Creating autobiographies"
        },
        "uw-badcat": {
            label:"Adding incorrect categories",
            summary:"Notice: Adding incorrect categories"
        },
        "uw-badlistentry": {
            label:"Adding inappropriate entries to lists",
            summary:"Notice: Adding inappropriate entries to lists"
        },
        "uw-bite": {
            label:"\"Biting\" newcomers",
            summary:"Notice: \"Biting\" newcomers"
        },
        "uw-coi": {
            label:"Conflict of Interest",
            summary:"Notice: Conflict of Interest"
        },
        "uw-copying": {
            label:"Copying text to another page",
            summary:"Notice: Copying text to another page"
        },
        "uw-crystal": {
            label:"Adding speculative or unconfirmed information",
            summary:"Notice: Adding speculative or unconfirmed information"
        },
        "uw-csd": {
            label:"Speedy deletion declined",
            summary:"Notice: Speedy deletion declined"
        },
        "uw-c&pmove": {
            label:"Cut and paste moves",
            summary:"Notice: Cut and paste moves"
        },
        "uw-dab": {
            label:"Incorrect edit to a disambiguation page",
            summary:"Notice: Incorrect edit to a disambiguation page"
        },
        "uw-date": {
            label:"Unnecessarily changing date formats",
            summary:"Notice: Unnecessarily changing date formats"
        },
        "uw-deadlink": {
            label:"Removing proper sources containing dead links",
            summary:"Notice: Removing proper sources containing dead links"
        },
        "uw-directcat": {
            label:"Applying stub categories manually",
            summary:"Notice: Applying stub categories manually"
        },
        "uw-draftfirst": {
            label:"User should draft in userspace without the risk of speedy deletion",
            summary:"Notice: Consider drafting your article in [[Help:Userspace draft|userspace]]"
        },
        "uw-editsummary": {
            label:"Not using edit summary",
            summary:"Notice: Not using edit summary"
        },
        "uw-english": {
            label:"Not communicating in English",
            summary:"Notice: Not communicating in English"
        },
        "uw-fuir": {
            label:"Fair use image has been removed from your userpage",
            summary:"Notice: A fair use image has been removed from your userpage"
        },
        "uw-hasty": {
            label:"Hasty addition of speedy deletion tags",
            summary:"Notice: Allow creators time to improve their articles before tagging them for deletion"
        },
        "uw-imageuse": {
            label:"Incorrect image linking",
            summary:"Notice: Incorrect image linking"
        },
        "uw-incompleteAFD": {
            label:"Incomplete AFD",
            summary:"Notice: Incomplete AFD"
        },
        "uw-italicize": {
            label:"Italicize books, films, albums, magazines, TV series, etc within articles",
            summary:"Notice: Italicize books, films, albums, magazines, TV series, etc within articles"
        },
        "uw-lang": {
            label:"Unnecessarily changing between British and American English",
            summary:"Notice: Unnecessarily changing between British and American English"
        },
        "uw-linking": {
            label:"Excessive addition of redlinks or repeated blue links",
            summary:"Notice: Excessive addition of redlinks or repeated blue links"
        },
        "uw-minor": {
            label:"Incorrect use of minor edits check box",
            summary:"Notice: Incorrect use of minor edits check box"
        },
        "uw-nonfree": {
            label:"Uploading replaceable non-free images",
            summary:"Notice: Uploading replaceable non-free images"
        },
        "uw-notaiv": {
            label:"Do not report complex abuse to AIV",
            summary:"Notice: Do not report complex abuse to AIV"
        },
        "uw-notenglish": {
            label:"Creating non-English articles",
            summary:"Notice: Creating non-English articles"
        },
        "uw-notifysd": {
            label:"Notify authors of speedy deletion tagged articles",
            summary:"Notice: Please notify authors of articles tagged for speedy deletion"
        },
        "uw-notvand": {
            label:"Mislabelling edits as vandalism",
            summary:"Notice: Misidentifying edits as vandalism"
        },
        "uw-notvote": {
            label:"We use consensus, not voting",
            summary:"Notice: We use consensus, not voting"
        },
        "uw-patrolled": {
            label:"Mark newpages as patrolled when patrolling",
            summary:"Notice: Mark newpages as patrolled when patrolling"
        },
        "uw-plagiarism": {
            label:"Copying from public domain sources without attribution",
            summary:"Notice: Copying from public domain sources without attribution"
        },
        "uw-preview": {
            label:"Use preview button to avoid mistakes",
            summary:"Notice: Use preview button to avoid mistakes"
        },
        "uw-probation": {
            label:"Article is on probation",
            summary:"Notice: Article is on probation"
        },
        "uw-refimprove": {
            label:"Creating unverifiable articles",
            summary:"Notice: Creating unverifiable articles"
        },
        "uw-removevandalism": {
            label:"Incorrect vandalism removal",
            summary:"Notice: Incorrect vandalism removal"
        },
        "uw-repost": {
            label:"Recreating material previously deleted via XfD process",
            summary:"Notice: Recreating previously deleted material"
        },
        "uw-salt": {
            label:"Recreating salted articles under a different title",
            summary:"Notice: Recreating salted articles under a different title"
        },
        "uw-samename": {
            label:"Rename request impossible",
            summary:"Notice: Rename request impossible"
        },
        "uw-selfrevert": {
            label:"Reverting self tests",
            summary:"Notice: Reverting self tests"
        },
        "uw-skype": {
            label:"Skype interfering with editing",
            summary:"Notice: Skype interfering with editing"
        },
        "uw-socialnetwork": {
            label:"Wikipedia is not a social network",
            summary:"Notice: Wikipedia is not a social network"
        },
        "uw-sofixit": {
            label:"Be bold and fix things yourself",
            summary:"Notice: You can be bold and fix things yourself"
        },
        "uw-spoiler": {
            label:"Adding spoiler alerts or removing supposed spoilers from appropriate sections",
            summary:"Notice: Don't delete or flag potential 'spoilers' in Wikipedia articles"
        },
        "uw-subst": {
            label:"Remember to subst: templates",
            summary:"Notice: Remember to subst: templates"
        },
        "uw-talkinarticle": {
            label:"Talk in article",
            summary:"Notice: Talk in article"
        },
        "uw-tilde": {
            label:"Not signing posts",
            summary:"Notice: Not signing posts"
        },
        "uw-toppost": {
            label:"Posting at the top of talk pages",
            summary:"Notice: Posting at the top of talk pages"
        },
        "uw-uaa": {
            label:"Reporting of username to WP:UAA not accepted",
            summary:"Notice: Reporting of username to WP:UAA not accepted"
        },
        "uw-userspace draft finish": {
            label:"Stale userspace draft",
            summary:"Notice: Stale userspace draft"
        },
        "uw-userspacenoindex": {
            label:"User page/subpage isn't appropriate for search engine indexing",
            summary:"Notice: User (sub)page isn't appropriate for search engine indexing"
        },
        "uw-vgscope": {
            label:"Adding video game walkthroughs, cheats or instructions",
            summary:"Notice: Adding video game walkthroughs, cheats or instructions"
        },
        "uw-warn": {
            label:"Place user warning templates when reverting vandalism",
            summary:"Notice: You can use user warning templates when reverting vandalism"
        }
    },
    singlewarn: {
        "uw-3rr": {
            label:"Violating the three-revert rule; see also uw-ew",
            summary:"Warning: Violating the three-revert rule"
        },
        "uw-affiliate": {
            label:"Affiliate marketing",
            summary:"Warning: Affiliate marketing"
        },
        "uw-agf-sock": {
            label:"Use of multiple accounts (assuming good faith)",
            summary:"Warning: Using multiple accounts"
        },
        "uw-attack": {
            label:"Creating attack pages",
            summary:"Warning: Creating attack pages",
            suppressArticleInSummary: true
        },
        "uw-attempt": {
            label:"Triggering the edit filter",
            summary:"Warning: Triggering the edit filter"
        },
        "uw-bizlist": {
            label:"Business promotion",
            summary:"Warning: Promoting a business"
        },
        "uw-botun": {
            label:"Bot username",
            summary:"Warning: Bot username"
        },
        "uw-canvass": {
            label:"Canvassing",
            summary:"Warning: Canvassing"
        },
        "uw-copyright": {
            label:"Copyright violation",
            summary:"Warning: Copyright violation"
        },
        "uw-copyright-link": {
            label:"Linking to copyrighted works violation",
            summary:"Warning: Linking to copyrighted works violation"
        },
        "uw-copyright-remove": {
            label:"Removing {{copyvio}} template from articles",
            summary:"Warning: Removing {{copyvio}} templates"
        },
        "uw-efsummary": {
            label:"Edit summary triggering the edit filter",
            summary:"Warning: Edit summary triggering the edit filter"
        },
        "uw-ew": {
            label:"Edit warring; see also uw-3rr",
            summary:"Warning: Edit warring"
        },
        "uw-hoax": {
            label:"Creating hoaxes",
            summary:"Warning: Creating hoaxes"
        },
        "uw-legal": {
            label:"Making legal threats",
            summary:"Warning: Making legal threats"
        },
        "uw-longterm": {
            label:"Long term pattern of vandalism",
            summary:"Warning: Long term pattern of vandalism"
        },
        "uw-multipleIPs": {
            label:"Usage of multiple IPs",
            summary:"Warning: Usage of multiple IPs"
        },
        "uw-pinfo": {
            label:"Personal info",
            summary:"Warning: Personal info"
        },
        "uw-socksuspect": {
            label:"Sockpuppetry",
            summary:"Warning: You are a suspected [[WP:SOCK|sockpuppet]]"  // of User:...
        },
        "uw-upv": {
            label:"Userpage vandalism",
            summary:"Warning: Userpage vandalism"
        },
        "uw-username": {
            label:"Username is against policy",
            summary:"Warning: Your username might be against policy"
        },
        "uw-coi-username": {
            label:"Username is against policy, and conflict of interest",
            summary:"Warning: Username and conflict of interest policy"
        },
        "uw-userpage": {
            label:"Userpage or subpage is against policy",
            summary:"Warning: Userpage or subpage is against policy"
        },
        "uw-wrongsummary": {
            label:"Using inaccurate or inappropriate edit summaries",
            summary:"Warning: Using inaccurate or inappropriate edit summaries"
        }
    },
    block: {
        "uw-block": {
            'label':"Block",
            'summary':"You have been blocked from editing"
        },
        "uw-blocknotalk": {
            'label':"Block (talk page disabled)",
            'summary':"You have been blocked from editing and your user talk page has been disabled"
        },
        "uw-blockindef": {
            'label':"Block (indefinite)",
            'summary':"You have been indefinitely blocked from editing"
        },
        "uw-ablock": {
            'label':"Anonymous block",
            'summary':"Your IP address has been blocked from editing"
        },
        "uw-aeblock": {
            'label':"Arbitration enforcement block",
            'summary':"You have been blocked from editing for violating an [[WP:Arbitration|arbitration decision]] with your edits"
        },
        "uw-adblock": {
            'label':"Advertising block",
            'summary':"You have been blocked from editing for [[WP:SOAP|advertising or self-promotion]]"
        },
        "uw-sblock": {
            'label':"Spam block",
            'summary':"You have been blocked from editing for continuing to add [[WP:SPAM|spam links]]"
        },
        "uw-soablock": {
            'label':"Spam/advertising-only account block",
            'summary':"You have been indefinitely blocked from editing because your account is being used only for [[WP:SPAM|spam, advertising, or promotion]]"
        },
        "uw-vblock": {
            'label':"Vandalism block",
            'summary':"You have been blocked from editing for persistent [[WP:VAND|vandalism]]"
        },
        "uw-voablock": {
            'label':"Vandalism-only account block",
            'summary':"You have been indefinitely blocked from editing because your account is being [[WP:VOA|used only for vandalism]]"
        },
        "uw-bioblock": {
            'label':"BLP violations",
            'summary':"You have been blocked from editing for violations of Wikipedia's [[WP:BLP|biographies of living persons policy]]"
        },
        "uw-npblock": {
            'label':"Creating nonsense pages block",
            'summary':"You have been blocked from editing for creating [[WP:PN|nonsense pages]]"
        },
        "uw-myblock": {
            'label':"Social networking block",
            'summary':"You have been blocked from editing for using user and/or article pages as a [[WP:NOTMYSPACE|blog, web host, social networking site or forum]]"
        },
        "uw-copyrightblock": {
            'label':"Copyright violation block",
            'summary':"You have been blocked from editing for continued [[WP:COPYVIO|copyright infringement]]"
        },
        "uw-dblock": {
            'label':"Deletion/removal of content block",
            'summary':"You have been blocked from editing for continued [[WP:VAND|removal of material]]"
        },
        "uw-efblock": {
            'label':"Edit filter-related block",
            'summary':"You have been blocked from editing for making disruptive edits that repeatedly triggered the [[WP:EF|edit filter]]"
        },
        "uw-ewblock": {
            'label':"Edit warring block",
            'summary':"You have been blocked from editing to prevent further [[WP:DE|disruption]] caused by your engagement in an [[WP:EW|edit war]]"
        },
        "uw-3block": {
            'label':"Three-revert rule violation block",
            'summary':"You have been blocked from editing for your [[WP:DE|disruption]] caused by [[WP:EW|edit warring]] and violation of the [[WP:3RR|three-revert rule]]"
        },
        "uw-botblock": {
            'label':"Unapproved bot block",
            'summary':"You have been blocked from editing because it appears you are running a [[WP:BOT|bot script]] without [[WP:BRFA|approval]]"
        },
        "uw-ublock": {
            'label':"Username soft block",
            'summary':"You have been indefinitely blocked from editing because your username is a violation of the [[WP:U|username policy]]"
        },
        "uw-uhblock": {
            'label':"Username hard block",
            'summary':"You have been indefinitely blocked from editing because your username is a blatant violation of the [[WP:U|username policy]]"
        },
        "uw-softerblock": {
            'label':"Promotional username soft block",
            'summary':"You have been indefinitely blocked from editing because your [[WP:U|username]] gives the impression that the account represents a group, organization or website"
        },
        "uw-causeblock": {
            'label':"Promotional username soft block, for charitable causes and social service organizations",
            'summary':"You have been indefinitely blocked from editing because your [[WP:U|username]] gives the impression that the account represents a group, organization or website"
        },
        "uw-botublock": {
            'label':"Bot username soft block",
            'summary':"You have been indefinitely blocked from editing because your [[WP:U|username]] indicates this is a [[WP:BOT|bot]] account, which is currently not approved"
        },
        "uw-memorialblock": {
            'label':"Memorial username soft block",
            'summary':"You have been indefinitely blocked from editing because your [[WP:U|username]] indicates this account may be used as a memorial or tribute to someone"
        },
        "uw-ublock-famous": {
            'label':"Famous username soft block",
            'summary':"You have been indefinitely blocked from editing because your [[WP:U|username]] matches the name of a well-known living individual"
        },
        "uw-ublock-double": {
            'label':"Similar username soft block",
            'summary':"You have been indefinitely blocked from editing because your [[WP:U|username]] is too similar to the username of another Wikipedia user"
        },
        "uw-uhblock-double": {
            'label':"Username impersonation hard block",
            'summary':"You have been indefinitely blocked from editing because your [[WP:U|username]] appears to impersonate another Wikipedia user"
        },
        "uw-vaublock": {
            'label':"Vandalism-only account and username hard block",
            'summary':"You have been indefinitely blocked from editing because your account is being [[WP:VOA|used only for vandalism]] and your username is a blatant violation of the [[WP:U|username policy]]"
        },
        "uw-spamublock": {
            'label':"Spam/advertising-only account and promotional username hard block",
            'summary':"You have been indefinitely blocked from editing because your account is being used only for [[WP:SPAM|spam or advertising]] and your username is a violation of the [[WP:U|username policy]]"
        },
        "uw-compblock": {
            'label':"Possible compromised account block",
            'summary':"You have been indefinitely blocked from editing because it is believed that your [[WP:SECURE|account has been compromised]]"
        },
        "uw-lblock": {
            'label':"Legal threat block",
            'summary':"You have been blocked from editing for making [[WP:NLT|legal threats or taking legal action]]"
        },
        "uw-hblock": {
            'label':"Harassment block",
            'summary':"You have been blocked from editing for attempting to [[WP:HARASS|harass]] other users"
        },
        "uw-pinfoblock": {
            'label':"Personal information exposure block",
            'summary':"You have been blocked from editing for [[WP:OUTING|posting personal information]] of another editor"
        },
        "uw-deoablock": {
            'label':"Disruption/trolling only account block",
            'summary':"You have been indefinitely blocked from editing because your account is being used only for [[WP:DE|trolling, disruption or harassment]]"
        },
        "uw-block-onlyfor": {
            'label':"Bad-faith single purpose account",
            'summary':"You have been indefinitely blocked from editing because your account is a [[WP:SPA|single purpose account]] being [[WP:DE|used only for disruptive editing]]"
        },
        "uw-spoablock": {
            'label':"Sockpuppet account block",
            'summary':"You have been indefinitely blocked from editing because your account is being used only for [[WP:SOCK|sock puppetry or meat puppetry]]"
        }
    }
};

// Set to true if the template is always for an indef block
Twinkle.warn.indefBlockHash = {
    'uw-block': false,
    'uw-3block': false,
    'uw-ablock': false,
    'uw-adblock': false,
    'uw-aeblock': false,
    'uw-bioblock': false,
    'uw-blocknotalk': false,
    'uw-botblock': false,
    'uw-copyrightblock': false,
    'uw-dblock': false,
    'uw-efblock': false,
    'uw-ewblock': false,
    'uw-hblock': false,
    'uw-myblock': false,
    'uw-npblock': false,
    'uw-pinfoblock': false,
    'uw-sblock': false,
    'uw-pblock': false,
    'uw-blockindef': true,
    'uw-block-onlyfor': true,
    'uw-botublock': true,
    'uw-causeblock': true,
    'uw-compblock': true,
    'uw-deoablock': true,
    'uw-lblock': true,
    'uw-memorialblock': true,
    'uw-soablock': true,
    'uw-softerblock': true,
    'uw-spamublock': true,
    'uw-spoablock': true,
    'uw-ublock': true,
    'uw-ublock-famous': true,
    'uw-uhblock': true,
    'uw-uhblock-double': true,
    'uw-ublock-double': true,
    'uw-vaublock': true,
    'uw-voablock': true
};

// Set to true if the template supports the page parameter
Twinkle.warn.pageHash = {
    'uw-block': true,
    'uw-3block': true,
    'uw-ablock': true,
    'uw-adblock': true,
    'uw-aeblock': true,
    'uw-bioblock': true,
    'uw-blocknotalk': true,
    'uw-botblock': true,
    'uw-copyrightblock': true,
    'uw-dblock': true,
    'uw-efblock': true,
    'uw-ewblock': true,
    'uw-hblock': true,
    'uw-myblock': true,
    'uw-npblock': true,
    'uw-pinfoblock': true,
    'uw-sblock': true,
    'uw-vblock': true,
    'uw-blockindef': true,
    'uw-block-onlyfor': true,
    'uw-botublock': false,
    'uw-causeblock': false,
    'uw-compblock': true,
    'uw-deoablock': true,
    'uw-lblock': true,
    'uw-memorialblock': false,
    'uw-soablock': true,
    'uw-softerblock': false,
    'uw-spamublock': false,
    'uw-spoablock': true,
    'uw-ublock': false,
    'uw-ublock-famous': false,
    'uw-uhblock': false,
    'uw-uhblock-double': false,
    'uw-ublock-double': false,
    'uw-vaublock': true,
    'uw-voablock': true
};

// Set to true if the template supports the reason parameter and isn't the same as its super-template when a reason is provided
Twinkle.warn.reasonHash = {
    'uw-block': true,
    'uw-3block': false,
    'uw-ablock': true,
    'uw-adblock': false,
    'uw-aeblock': true,
    'uw-bioblock': false,
    'uw-blocknotalk': true,
    'uw-botblock': false,
    'uw-copyrightblock': false,
    'uw-dblock': false,
    'uw-efblock': false,
    'uw-ewblock': false,
    'uw-hblock': false,
    'uw-myblock': false,
    'uw-npblock': false,
    'uw-pinfoblock': true,
    'uw-sblock': false,
    'uw-vblock': false,
    'uw-blockindef': true,
    'uw-block-onlyfor': true,
    'uw-botublock': true,
    'uw-causeblock': false,
    'uw-compblock': false,
    'uw-deoablock': false,
    'uw-lblock': false,
    'uw-memorialblock': false,
    'uw-soablock': false,
    'uw-softerblock': false,
    'uw-spamublock': false,
    'uw-spoablock': false,
    'uw-ublock': true,
    'uw-ublock-famous': false,
    'uw-uhblock': true,
    'uw-uhblock-double': false,
    'uw-ublock-double': false,
    'uw-vaublock': false,
    'uw-voablock': false
};

Twinkle.warn.prev_block_timer = null;
Twinkle.warn.prev_article = null;
Twinkle.warn.prev_reason = null;

Twinkle.warn.callback.change_category = function twinklewarnCallbackChangeCategory(e) {
    var value = e.target.value;
    var sub_group = e.target.root.sub_group;
    var messages = Twinkle.warn.messages[ value ];
    sub_group.main_group = value;
    var old_subvalue = sub_group.value;
    var old_subvalue_re;
    if( old_subvalue ) {
        old_subvalue = old_subvalue.replace(/\d*(im)?$/, '' );
        old_subvalue_re = new RegExp( RegExp.escape( old_subvalue ) + "(\\d*(?:im)?)$" );
    }

    while( sub_group.hasChildNodes() ){
        sub_group.removeChild( sub_group.firstChild );
    }

    for( var i in messages ) {
        var selected = false;
        if( old_subvalue && old_subvalue_re.test( i ) ) {
            selected = true;
        }
        var elem = new QuickForm.element( { type:'option', label:"[" + i + "]: " + messages[i].label, value:i, selected: selected } );
        
        sub_group.appendChild( elem.render() );
    }

    if( value === 'block' ) {
        var more = new QuickForm.element( {
                type: 'input',
                name: 'block_timer',
                label: 'Period of blocking: ',
                tooltip: 'The period the blocking is due for, for example 24 hours, 2 weeks, indefinite etc...'
            } );
        e.target.root.insertBefore( more.render(), e.target.root.lastChild );
        if(Twinkle.warn.prev_block_timer !== null) {
            e.target.root.block_timer.value = Twinkle.warn.prev_block_timer;
            Twinkle.warn.prev_block_timer = null;
        }        
        if(Twinkle.warn.prev_article === null) {
            Twinkle.warn.prev_article = e.target.root.article.value;
        }
        e.target.root.article.disabled = true;
        e.target.root.article.value = '';
    } else if( e.target.root.block_timer ) {
        if(!e.target.root.block_timer.disabled && Twinkle.warn.prev_block_timer === null) {
            Twinkle.warn.prev_block_timer = e.target.root.block_timer.value;
        }
        e.target.root.removeChild( e.target.root.block_timer.parentNode );
        if(e.target.root.article.disabled && Twinkle.warn.prev_article !== null) {
            e.target.root.article.value = Twinkle.warn.prev_article;
            Twinkle.warn.prev_article = null;
        }
        e.target.root.article.disabled = false;
        if(e.target.root.reason.disabled && Twinkle.warn.prev_reason !== null) {
            e.target.root.reason.value = Twinkle.warn.prev_reason;
            Twinkle.warn.prev_reason = null;
        }
        e.target.root.reason.disabled = false;
    }
};

Twinkle.warn.callback.change_subcategory = function twinklewarnCallbackChangeSubcategory(e) {
    var main_group = e.target.form.main_group.value;
    var value = e.target.form.sub_group.value;

    if( main_group === 'singlewarn' ) {
        if( value === 'uw-username' ) {
            if(Twinkle.warn.prev_article === null) {
                Twinkle.warn.prev_article = e.target.form.article.value;
            }
            e.target.form.article.disabled = true;
            e.target.form.article.value = '';
        } else if( e.target.form.article.disabled ) {
            if(Twinkle.warn.prev_article !== null) {
                e.target.form.article.value = Twinkle.warn.prev_article;
                Twinkle.warn.prev_article = null;
            }
            e.target.form.article.disabled = false;
        }
    } else if( main_group === 'block' ) {
        if( Twinkle.warn.indefBlockHash[ value ] ) {
            if(Twinkle.warn.prev_block_timer === null) {
                Twinkle.warn.prev_block_timer = e.target.form.block_timer.value;
            }
            e.target.form.block_timer.disabled = true;
            e.target.form.block_timer.value = 'indef';
        } else if( e.target.form.block_timer.disabled ) {
            if(Twinkle.warn.prev_block_timer !== null) {
                e.target.form.block_timer.value = Twinkle.warn.prev_block_timer;
                Twinkle.warn.prev_block_timer = null;
            }
            e.target.form.block_timer.disabled = false;
        }

        if( Twinkle.warn.pageHash[ value ] ) {
            if(Twinkle.warn.prev_article !== null) {
                e.target.form.article.value = Twinkle.warn.prev_article;
                Twinkle.warn.prev_article = null;
            }
            e.target.form.article.disabled = false;
        } else if( !e.target.form.article.disabled ) {
            if(Twinkle.warn.prev_article === null) {
                Twinkle.warn.prev_article = e.target.form.article.value;
            }
            e.target.form.article.disabled = true;
            e.target.form.article.value = '';
        }

        if( Twinkle.warn.reasonHash[ value ] ) {
            if(Twinkle.warn.prev_reason !== null) {
                e.target.form.reason.value = Twinkle.warn.prev_reason;
                Twinkle.warn.prev_reason = null;
            }
            e.target.form.reason.disabled = false;
        } else if( !e.target.form.reason.disabled ) {
            if(Twinkle.warn.prev_reason === null) {
                Twinkle.warn.prev_reason = e.target.form.reason.value;
            }
            e.target.form.reason.disabled = true;
            e.target.form.reason.value = '';
        }
    }

    var $article = $(e.target.form.article);
    if (main_group === "singlewarn" && value === "uw-socksuspect") {
        $article.prev().hide();
        $article.before('<span id="tw-spi-article-username">Username of sock master, if known (without User:) </span>');
    } else {
        $("span#tw-spi-article-username").remove();
        $article.prev().show();
    }
};

Twinkle.warn.callbacks = {
    preview: function() {
        // XXX cannot preview block templates as yet...
        var templatename = $('select[name="sub_group"]:visible').last()[0].value;
        if (templatename in Twinkle.warn.messages.block) {
            alert("Cannot preview block templates at the moment, unfortunately");
            return;
        }

        var previewdiv = $('div[name="warningpreview"]:visible').last();
        if (!previewdiv.length) {
            return;  // just give up
        }
        previewdiv = previewdiv[0];

        var previewbox = $('div#twinklewarn-previewbox:visible').last();
        if (!previewbox.length) {
            previewbox = document.createElement('div');
            previewbox.style.background = "white";
            previewbox.style.border = "2px inset";
            previewbox.style.marginTop = "0.4em";
            previewbox.style.padding = "0.2em 0.4em";
            previewbox.setAttribute('id', 'twinklewarn-previewbox');
            previewdiv.parentNode.appendChild(previewbox);
        } else {
            previewbox = previewbox[0];
        }

        var statusspan = document.createElement('span');
        previewbox.appendChild(statusspan);
        Status.init(statusspan);
        var templatetext = '{{subst:' + templatename;
        var linkedarticle = $('input[name="article"]:visible').last();
        if (linkedarticle.length) {
            templatetext += '|1=' + linkedarticle[0].value;
        }
        templatetext += '}}';
        var reason = $('textarea[name="reason"]:visible').last();
        if (reason.length && reason[0].value) {
            templatetext += " ''" + reason[0].value + "''";
        }
        var query = {
            action: 'parse',
            prop: 'text',
            pst: 'true',  // PST = pre-save transform; this makes substitution work properly
            text: templatetext,
            title: mw.config.get('wgPageName')
        };
        var wikipedia_api = new Wikipedia.api("loading...", query, Twinkle.warn.callbacks.previewRender, new Status("Preview"));
        wikipedia_api.params = { previewbox: previewbox };
        wikipedia_api.post();
    },
    previewRender: function( apiobj ) {
        var params = apiobj.params;
        var xml = apiobj.getXML();
        var html = $(xml).find('text').text();
        if (!html) {
            apiobj.statelem.error("failed to retrieve preview, or warning template was blanked");
            return;
        }
        params.previewbox.innerHTML = html;
        // fix vertical alignment
        $(params.previewbox).find(':not(img)').css('vertical-align', 'baseline');
    },
    main: function( pageobj ) {
        var text = pageobj.getPageText();
        var params = pageobj.getCallbackParameters();
        var messageData = Twinkle.warn.messages[params.main_group][params.sub_group];

        var history_re = /<!-- Template:(uw-.*?) -->.*?(\d{1,2}:\d{1,2}, \d{1,2} \w+ \d{4}) \(UTC\)/g;
        var history = {};
        var latest = { date:new Date( 0 ), type:'' };
        var current;

        while( ( current = history_re.exec( text ) ) ) {
            var current_date = new Date( current[2] + ' UTC' );
            if( !( current[1] in history ) ||  history[ current[1] ] < current_date ) {
                history[ current[1] ] = current_date;
            }
            if( current_date > latest.date ) {
                latest.date = current_date;
                latest.type = current[1];
            }
        }

        var date = new Date();

        if( params.sub_group in history ) {
            var temp_time = new Date( history[ params.sub_group ] );
            temp_time.setUTCHours( temp_time.getUTCHours() + 24 );

            if( temp_time > date ) {
                if( !confirm( "An identical " + params.sub_group + " has been issued in the last 24 hours.  \nWould you still like to add this warning/notice?" ) ) {
                    pageobj.statelem.info( 'aborted per user request' );
                    return;
                }
            }
        }

        latest.date.setUTCMinutes( latest.date.getUTCMinutes() + 1 ); // after long debate, one minute is max

        if( latest.date > date ) {
            if( !confirm( "A " + latest.type + " has been issued in the last minute.  \nWould you still like to add this warning/notice?" ) ) {
                pageobj.statelem.info( 'aborted per user request' );
                return;
            }
        }
        
        var mainheaderRe = new RegExp("==+\\s*Warnings\\s*==+");
        var headerRe = new RegExp( "^==+\\s*(?:" + date.getUTCMonthName() + '|' + date.getUTCMonthNameAbbrev() +  ")\\s+" + date.getUTCFullYear() + "\\s*==+", 'm' );

        if( text.length > 0 ) {
            text += "\n\n";
        }

        if( params.main_group === 'block' ) {
            var article = '', reason = '', time = null;
            
            if( Twinkle.getPref('blankTalkpageOnIndefBlock') && params.sub_group !== 'uw-lblock' && ( Twinkle.warn.indefBlockHash[ params.sub_group ] || (/indef|\*|max/).exec( params.block_timer ) ) ) {
                Status.info( 'Info', 'Blanking talk page per preferences and creating a new level 2 heading for the date' );
                text = "== " + date.getUTCMonthName() + " " + date.getUTCFullYear() + " ==\n";
            } else if( !headerRe.exec( text ) ) {
                Status.info( 'Info', 'Will create a new level 2 heading for the date, as none was found for this month' );
                text += "== " + date.getUTCMonthName() + " " + date.getUTCFullYear() + " ==\n";
            }
            
            if( params.article && Twinkle.warn.pageHash[ params.sub_group ] ) {
                article = '|page=' + params.article;
            }
            
            if( params.reason && Twinkle.warn.reasonHash[ params.sub_group ] ) {
                reason = '|reason=' + params.reason;
            }
            
            if( /te?mp|^\s*$|min/.exec( params.block_timer ) || Twinkle.warn.indefBlockHash[ params.sub_group ] ) {
                time = '';
            } else if( /indef|\*|max/.exec( params.block_timer ) ) {
                time = '|indef=yes';
            } else {
                time = '|time=' + params.block_timer;
            }

            text += "{{subst:" + params.sub_group + article + time + reason + "|sig=true|subst=subst:}}";
        } else {
            if( !headerRe.exec( text ) ) {
                Status.info( 'Info', 'Will create a new level 2 heading for the date, as none was found for this month' );
                text += "== " + date.getUTCMonthName() + " " + date.getUTCFullYear() + " ==\n";
            }

            switch( params.sub_group ) {
                case 'uw-username':
                    text += "{{subst:" + params.sub_group + ( params.reason ? '|1=' + params.reason : '' ) + "|subst=subst:}} ~~~~";
                    break;
                case 'uw-socksuspect':
                    text += "{{subst:" + params.sub_group + ( params.article ? '|1=User:' + params.article : '' ) + "|subst=subst:}}" + (params.reason ? " ''" + params.reason + "'' ": ' ' ) + " ~~~~";
                    break;
                default:
                    text += "{{subst:" + params.sub_group + ( params.article ? '|1=' + params.article : '' ) + "|subst=subst:}}" + (params.reason ? " ''" + params.reason + "'' ": ' ' ) + "~~~~";
                    break;
            }
        }
        
        if ( Twinkle.getPref('showSharedIPNotice') && isIPAddress( mw.config.get('wgTitle') ) ) {
            Status.info( 'Info', 'Adding a shared IP notice' );
            text +=  "\n{{subst:SharedIPAdvice}}";
        }

        var summary = messageData.summary;
        if ( messageData.suppressArticleInSummary !== true && params.article ) {
            if ( params.sub_group === "uw-socksuspect" ) {  // this template requires a username
                summary += " of [[User:" + params.article + "]]";
            } else {
                summary += " on [[" + params.article + "]]";
            }
        }
        summary += "." + Twinkle.getPref("summaryAd");

        pageobj.setPageText( text );
        pageobj.setEditSummary( summary );
        pageobj.setWatchlist( Twinkle.getPref('watchWarnings') );
        pageobj.save();
    }
};

Twinkle.warn.callback.evaluate = function twinklewarnCallbackEvaluate(e) {

    // First, check to make sure a reason was filled in if uw-username was selected
    
    if(e.target.sub_group.value === 'uw-username' && e.target.reason.value.trim() === '') {
        alert("You must supply a reason for the {{uw-username}} template.");
        return;
    }

    // Then, grab all the values provided by the form
    
    var params = {
        reason: e.target.reason.value,
        main_group: e.target.main_group.value,
        sub_group: e.target.sub_group.value,
        article: e.target.article.value,  // .replace( /^(Image|Category):/i, ':$1:' ),  -- apparently no longer needed...
        block_timer: e.target.block_timer ? e.target.block_timer.value : null
    };

    SimpleWindow.setButtonsEnabled( false );
    Status.init( e.target );

    Wikipedia.actionCompleted.redirect = mw.config.get('wgPageName');
    Wikipedia.actionCompleted.notice = "Warning complete, reloading talk page in a few seconds";

    var wikipedia_page = new Wikipedia.page( mw.config.get('wgPageName'), 'User talk page modification' );
    wikipedia_page.setCallbackParameters( params );
    wikipedia_page.setFollowRedirect( true );
    wikipedia_page.load( Twinkle.warn.callbacks.main );
};

/*
 ****************************************
 *** twinklexfd.js: XFD module
 ****************************************
 * Mode of invocation:     Tab ("XFD")
 * Active on:              Existing, non-special pages, except for file pages with no local (non-Commons) file which are not redirects
 * Config directives in:   TwinkleConfig
 */

Twinkle.xfd = function twinklexfd() {
    // Disable on:
    // * special pages
    // * non-existent pages
    // * files on Commons, whether there is a local page or not (unneeded local pages of files on Commons are eligible for CSD F2)
    // * file pages without actual files (these are eligible for CSD G8)
    if ( mw.config.get('wgNamespaceNumber') < 0 || !mw.config.get('wgArticleId') || (mw.config.get('wgNamespaceNumber') === 6 && (document.getElementById('mw-sharedupload') || (!document.getElementById('mw-imagepage-section-filehistory') && !Wikipedia.isPageRedirect()))) ) {
        return;
    }
    if (twinkleUserAuthorized) {
        $(twAddPortletLink("#", "XFD", "tw-xfd", "Nominate for deletion", "")).click(Twinkle.xfd.callback);
    } else {
        $(twAddPortletLink("#", 'XFD', 'tw-xfd', 'Nominate for deletion', '')).click(function() {
            alert("Your account is too new to use Twinkle.");
        });
    }
};

Twinkle.xfd.num2order = function twinklexfdNum2order( num ) {
    switch( num ) {
    case 1: return '';
    case 2: return '2nd';
    case 3: return '3rd';
    default: return num + 'th';
    }
};

Twinkle.xfd.currentRationale = null;

// error callback on Status object
Twinkle.xfd.printRationale = function twinklexfdPrintRationale() {
    if (Twinkle.xfd.currentRationale) {
        var p = document.createElement("p");
        p.textContent = "Your deletion rationale is provided below, which you can copy and paste into a new XFD dialog if you wish to try again:";
        var pre = document.createElement("pre");
        pre.className = "toccolours";
        pre.style.marginTop = "0";
        pre.textContent = Twinkle.xfd.currentRationale;
        p.appendChild(pre);
        Status.root.appendChild(p);
        // only need to print the rationale once
        Twinkle.xfd.currentRationale = null;
    }
};

Twinkle.xfd.callback = function twinklexfdCallback() {
    var Window = new SimpleWindow( 600, 350 );
    Window.setTitle( "Nominate for deletion (XfD)" );
    Window.setScriptName( "Twinkle" );
    Window.addFooterLink( "About deletion discussions", "WP:XFD" );
    Window.addFooterLink( "Twinkle help", "WP:TW/DOC#xfd" );

    var form = new QuickForm( Twinkle.xfd.callback.evaluate );
    var categories = form.append( {
            type: 'select',
            name: 'category',
            label: 'Deletion discussion venue:',
            tooltip: 'When activated, a default choice is made, based on what namespace you are in. This default should be the most appropriate',
            event: Twinkle.xfd.callback.change_category
        } );
    categories.append( {
            type: 'option',
            label: 'AfD (Articles for deletion)',
            selected: mw.config.get('wgNamespaceNumber') === Namespace.MAIN,
            value: 'afd'
        } );
    categories.append( {
            type: 'option',
            label: 'TfD (Templates for discussion)',
            selected: mw.config.get('wgNamespaceNumber') === Namespace.TEMPLATE,
            value: 'tfd'
        } );
    categories.append( {
            type: 'option',
            label: 'FfD (Files for deletion)/PUF (Possibly unfree files)',
            selected: mw.config.get('wgNamespaceNumber') === Namespace.IMAGE,
            value: 'ffd'
        } );
    categories.append( {
            type: 'option',
            label: 'CfD (Categories for discussion)',
            selected: mw.config.get('wgNamespaceNumber') === Namespace.CATEGORY,
            value: 'cfd'
        } );
    categories.append( {
            type: 'option',
            label: 'MfD (Miscellany for deletion)',
            selected: [ Namespace.IMAGE, Namespace.MAIN, Namespace.TEMPLATE, Namespace.CATEGORY ].indexOf( mw.config.get('wgNamespaceNumber') ) === -1 ,
            value: 'mfd'
        } );
    categories.append( {
            type: 'option',
            label: 'RfD (Redirects for discussion)',
            selected: Wikipedia.isPageRedirect(),
            value: 'rfd'
        } );
    //categories.append( {
    //        type: 'option',
    //        label: 'SfD (Stub types for deletion)',
    //        disabled: true,
    //        value: 'sfd'
    //    } );
    form.append( {
            type: 'checkbox',
            list: [
                {
                    label: 'Notify page creator if possible',
                    value: 'notify',
                    name: 'notify',
                    tooltip: "A notification template will be placed on the creator's talk page if this is true.",
                    checked: true
                }
            ]
        }
    );
    form.append( {
            type: 'field',
            label:'Work area',
            name: 'work_area'
        } );
    form.append( { type:'submit' } );

    var result = form.render();
    Window.setContent( result );
    Window.display();

    // We must init the controls
    var evt = document.createEvent( "Event" );
    evt.initEvent( 'change', true, true );
    result.category.dispatchEvent( evt );
};

Twinkle.xfd.callback.change_category = function twinklexfdCallbackChangeCategory(e) {
    var value = e.target.value;
    var root = e.target.form;
    var old_area;
    var childNodes = root.childNodes;
    for( var i = 0; i < childNodes.length; ++i ) {
        var node = childNodes[i];
        if (node instanceof Element &&
            node.getAttribute( 'name' ) === 'work_area') {
            old_area = node;
            break;
        }
    }
    var work_area = null;

    var oldreasontextbox = e.target.form.getElementsByTagName('textarea')[0];
    var oldreason = (oldreasontextbox ? oldreasontextbox.value : '');

    switch( value ) {
    case 'afd':
        work_area = new QuickForm.element( {
                type: 'field',
                label: 'Articles for deletion',
                name: 'work_area'
            } );
        work_area.append( {
                type: 'checkbox',
                list: [
                        {
                            label: 'Wrap deletion tag with <noinclude>',
                            value: 'noinclude',
                            name: 'noinclude',
                            tooltip: 'Will wrap the deletion tag in &lt;noinclude&gt; tags, so that it won\'t transclude. This option is not normally required.'
                        }
                    ]
        } );
        var afd_category = work_area.append( {
                type:'select',
                name:'xfdcat',
                label:'Choose what category this nomination belongs in:'
            } );

        afd_category.append( { type:'option', label:'Unknown', value:'?', selected:true } );
        afd_category.append( { type:'option', label:'Media and music', value:'M' } );
        afd_category.append( { type:'option', label:'Organisation, corporation, or product', value:'O' } );
        afd_category.append( { type:'option', label:'Biographical', value:'B' } );
        afd_category.append( { type:'option', label:'Society topics', value:'S' } );
        afd_category.append( { type:'option', label:'Web or internet', value:'W' } );
        afd_category.append( { type:'option', label:'Games or sports', value:'G' } );
        afd_category.append( { type:'option', label:'Science and technology', value:'T' } );
        afd_category.append( { type:'option', label:'Fiction and the arts', value:'F' } );
        afd_category.append( { type:'option', label:'Places and transportation', value:'P' } );
        afd_category.append( { type:'option', label:'Indiscernible or unclassifiable topic', value:'I' } );
        afd_category.append( { type:'option', label:'Debate not yet sorted', value:'U' } );

        work_area.append( {
                type: 'textarea',
                name: 'xfdreason',
                label: 'Reason: ',
                value: oldreason
            } );
        work_area = work_area.render();
        old_area.parentNode.replaceChild( work_area, old_area );
        break;
    case 'tfd':
        work_area = new QuickForm.element( {
                type: 'field',
                label: 'Templates for discussion',
                name: 'work_area'
            } );
        var linknode = document.createElement('a');
        linknode.setAttribute("href", mw.util.wikiGetlink("WP:SFD") );
        linknode.appendChild(document.createTextNode('WP:SFD'));
        work_area.append( {
                type: 'div',
                label: [ 'Stub types and userboxes are not eligible for TfD. Stub types go to ', linknode, ', and userboxes go to MfD.' ]
            } );
        work_area.append( {
                type: 'checkbox',
                list: [
                        {
                            label: 'Inline deletion tag',
                            value: 'tfdinline',
                            name: 'tfdinline',
                            tooltip: 'Use {{tfd|type=inline}} to tag the page instead of {{tfd}}. Good for inline templates (those that appear amongst the words of text).',
                            checked: false
                        }
                    ]
        } );
        work_area.append( {
                type: 'textarea',
                name: 'xfdreason',
                label: 'Reason: ',
                value: oldreason
            } );
        work_area = work_area.render();
        old_area.parentNode.replaceChild( work_area, old_area );
        break;
    case 'mfd':
        work_area = new QuickForm.element( {
                type: 'field',
                label: 'Miscellany for deletion',
                name: 'work_area'
            } );
        work_area.append( {
                type: 'checkbox',
                list: [
                        {
                            label: 'Wrap deletion tag with <noinclude>',
                            value: 'noinclude',
                            name: 'noinclude',
                            tooltip: 'Will wrap the deletion tag in &lt;noinclude&gt; tags, so that it won\'t transclude. Select this option for userboxes.'
                        }
                    ]
        } );
        if (mw.config.get('wgNamespaceNumber') === Namespace.USER || mw.config.get('wgNamespaceNumber') === Namespace.USER_TALK) {
            work_area.append( {
                type: 'checkbox',
                list: [
                        {
                            label: 'Also notify owner of userspace if they are not the page creator',
                            value: 'notifyuserspace',
                            name: 'notifyuserspace',
                            tooltip: 'If the user in whose userspace this page is located, is not the page creator (for example, the page is a rescued article stored as a userspace draft), notify the userspace owner as well.',
                            checked: true
                        }
                    ]
            } );
        }
        work_area.append( {
                type: 'textarea',
                name: 'xfdreason',
                label: 'Reason: ',
                value: oldreason
            } );
        work_area = work_area.render();
        old_area.parentNode.replaceChild( work_area, old_area );
        break;
    case 'ffd':
        work_area = new QuickForm.element( {
                type: 'field',
                label: 'Files for deletion',
                name: 'work_area'
            } );
        work_area.append( {
                type: 'checkbox',
                name: 'puf',
                list: [
                    {
                        label: 'Possibly unfree file',
                        value: 'puf',
                        tooltip: 'File has disputed source or licensing information'
                    }
                ]
            } );
        work_area.append( {
                type: 'textarea',
                name: 'xfdreason',
                label: 'Reason: ',
                value: oldreason
            } );
        work_area = work_area.render();
        old_area.parentNode.replaceChild( work_area, old_area );
        break;
    case 'cfd':
        work_area = new QuickForm.element( {
                type: 'field',
                label: 'Categories for discussion',
                name: 'work_area'
            } );
        var cfd_category = work_area.append( {
                type: 'select',
                label: 'Choose type of action wanted: ',
                name: 'xfdcat',
                event: function(e) {
                    var value = e.target.value;
                    var target = e.target.form.xfdtarget;
                    if( value === 'cfd' ) {
                        target.disabled = true;
                    } else {
                        target.disabled = false;
                    }
                }
            } );
        cfd_category.append( { type: 'option', label: 'Deletion', value: 'cfd', selected: true } );
        cfd_category.append( { type: 'option', label: 'Merge', value: 'cfm' } );
        cfd_category.append( { type: 'option', label: 'Renaming', value: 'cfr' } );
        cfd_category.append( { type: 'option', label: 'Convert into article', value: 'cfc' } );

        work_area.append( {
                type: 'input',
                name: 'xfdtarget',
                label: 'Target page: ',
                disabled: true,
                value: ''
            } );
        work_area.append( {
                type: 'textarea',
                name: 'xfdreason',
                label: 'Reason: ',
                value: oldreason
            } );
        work_area = work_area.render();
        old_area.parentNode.replaceChild( work_area, old_area );
        break;
    case 'rfd':
        work_area = new QuickForm.element( {
                type: 'field',
                label: 'Redirects for discussion',
                name: 'work_area'
            } );
        work_area.append( {
                type: 'textarea',
                name: 'xfdreason',
                label: 'Reason: ',
                value: oldreason
            } );
        work_area = work_area.render();
        old_area.parentNode.replaceChild( work_area, old_area );
        break;
    default:
        work_area = new QuickForm.element( {
                type: 'field',
                label: 'Nothing for anything',
                name: 'work_area'
            } );
        work_area = work_area.render();
        old_area.parentNode.replaceChild( work_area, old_area );
        break;
    }
};

Twinkle.xfd.callbacks = {
    afd: {
        main: function(apiobj) {
            var xmlDoc = apiobj.responseXML;
            var titles = $(xmlDoc).find('allpages p');

            // There has been no earlier entries with this prefix, just go on.
            if( titles.length <= 0 ) {
                apiobj.params.numbering = apiobj.params.number = '';
            } else {
                var number = 0;
                for( var i = 0; i < titles.length; ++i ) {
                    var title = titles[i].getAttribute('title');

                    // First, simple test, is there an instance with this exact name?
                    if( title === 'Wikipedia:Articles for deletion/' + mw.config.get('wgPageName') ) {
                        number = Math.max( number, 1 );
                        continue;
                    }

                    var order_re = new RegExp( '^' +
                        RegExp.escape( 'Wikipedia:Articles for deletion/' + mw.config.get('wgPageName'), true ) +
                        '\\s*\\(\\s*(\\d+)(?:(?:th|nd|rd|st) nom(?:ination)?)?\\s*\\)\\s*$');
                    var match = order_re.exec( title );

                    // No match; A non-good value
                    if( !match ) {
                        continue;
                    }

                    // A match, set number to the max of current
                    number = Math.max( number, Number(match[1]) );
                }
                apiobj.params.number = Twinkle.xfd.num2order( parseInt( number, 10 ) + 1);
                apiobj.params.numbering = number > 0 ? ' (' + apiobj.params.number + ' nomination)' : '';
            }
            apiobj.params.discussionpage = 'Wikipedia:Articles for deletion/' + mw.config.get('wgPageName') + apiobj.params.numbering;

            Status.info( "Next discussion page", "[[" + apiobj.params.discussionpage + "]]" );

            // Updating data for the action completed event
            Wikipedia.actionCompleted.redirect = apiobj.params.discussionpage;
            Wikipedia.actionCompleted.notice = "Nomination completed, now redirecting to the discussion page";

            // Tagging article
            var wikipedia_page = new Wikipedia.page(mw.config.get('wgPageName'), "Adding deletion tag to article");
            wikipedia_page.setFollowRedirect(true);  // should never be needed, but if the article is moved, we would want to follow the redirect
            wikipedia_page.setCallbackParameters(apiobj.params);
            wikipedia_page.load(Twinkle.xfd.callbacks.afd.taggingArticle);
        },
        // Tagging needs to happen before everything else: this means we can check if there is an AfD tag already on the page
        taggingArticle: function(pageobj) {
            var text = pageobj.getPageText();
            var params = pageobj.getCallbackParameters();
            var statelem = pageobj.getStatusElement();

            // Check for existing AfD tag, for the benefit of new page patrollers
            var textNoAfd = text.replace(/\{\{\s*(Article for deletion\/dated|AfDM)\s*(\|(?:\{\{[^{}]*\}\}|[^{}])*)?\}\}\s*/g, "");
            if (text !== textNoAfd) {
                if (confirm("An AfD tag was found on this article. Maybe someone beat you to it.  \nClick OK to replace the current AfD tag (not recommended), or Cancel to abandon your nomination.")) {
                    text = textNoAfd;
                } else {
                    statelem.error("Article already tagged with AfD tag, and you chose to abort");
                    window.location.reload();
                    return;
                }
            }

            // Now we know we want to go ahead with it, trigger the other AJAX requests

            // Starting discussion page
            var wikipedia_page = new Wikipedia.page(params.discussionpage, "Creating article deletion discussion page");
            wikipedia_page.setCallbackParameters(params);
            wikipedia_page.load(Twinkle.xfd.callbacks.afd.discussionPage);

            // Today's list
            var date = new Date();
            wikipedia_page = new Wikipedia.page('Wikipedia:Articles for deletion/Log/' + date.getUTCFullYear() + ' ' +
                date.getUTCMonthName() + ' ' + date.getUTCDate(), "Adding discussion to today's list");
            wikipedia_page.setFollowRedirect(true);
            wikipedia_page.setCallbackParameters(params);
            wikipedia_page.load(Twinkle.xfd.callbacks.afd.todaysList);

            // Notification to first contributor
            if (params.usertalk) {
                var thispage = new Wikipedia.page(mw.config.get('wgPageName'));
                thispage.setCallbackParameters(params);
                thispage.lookupCreator(Twinkle.xfd.callbacks.afd.userNotification);
            }

            // Remove some tags that should always be removed on AfD.
            text = text.replace(/\{\{\s*(dated prod|dated prod blp|Prod blp\/dated|Proposed deletion\/dated|prod2|Proposed deletion endorsed|New unreviewed article|Userspace draft)\s*(\|(?:\{\{[^{}]*\}\}|[^{}])*)?\}\}\s*/ig, "");
            // Then, test if there are speedy deletion-related templates on the article.
            var textNoSd = text.replace(/\{\{\s*(db(-\w*)?|delete|(?:hang|hold)[\- ]?on)\s*(\|(?:\{\{[^{}]*\}\}|[^{}])*)?\}\}\s*/ig, "");
            if (text !== textNoSd && confirm("A speedy deletion tag was found on this page. Should it be removed?")) {
                text = textNoSd;
            }

            pageobj.setPageText((params.noinclude ? "<noinclude>{{" : "{{") + (params.number === '' ? "subst:afd|help=off" : ('subst:afdx|' +
                params.number + "|help=off")) + (params.noinclude ? "}}</noinclude>\n" : "}}\n") + text);
            pageobj.setEditSummary("Nominated for deletion; see [[" + params.discussionpage + "]]." + Twinkle.getPref('summaryAd'));
            switch (Twinkle.getPref('xfdWatchPage')) {
                case 'yes':
                    pageobj.setWatchlist(true);
                    break;
                case 'no':
                    pageobj.setWatchlistFromPreferences(false);
                    break;
                default:
                    pageobj.setWatchlistFromPreferences(true);
                    break;
            }
            pageobj.setCreateOption('nocreate');
            pageobj.save();
        },
        discussionPage: function(pageobj) {
            var text = pageobj.getPageText();
            var params = pageobj.getCallbackParameters();

            pageobj.setPageText("{{subst:afd2|pg=" + mw.config.get('wgPageName') + "|cat=" + params.xfdcat + "|text=" + params.reason + " ~~~~}}\n");
            pageobj.setEditSummary("Creating deletion discussion page for [[" + mw.config.get('wgPageName') + "]]." + Twinkle.getPref('summaryAd'));
            switch (Twinkle.getPref('xfdWatchDiscussion')) {
                case 'yes':
                    pageobj.setWatchlist(true);
                    break;
                case 'no':
                    pageobj.setWatchlistFromPreferences(false);
                    break;
                default:
                    pageobj.setWatchlistFromPreferences(true);
                    break;
            }
            pageobj.setCreateOption('createonly');
            pageobj.save();
            Twinkle.xfd.currentRationale = null;  // any errors from now on do not need to print the rationale, as it is safely saved on-wiki
        },
        todaysList: function(pageobj) {
            var old_text = pageobj.getPageText();
            var params = pageobj.getCallbackParameters();
            var statelem = pageobj.getStatusElement();

            var text = old_text.replace( /(<\!-- Add new entries to the TOP of the following list -->\n+)/, "$1{{subst:afd3|pg=" + mw.config.get('wgPageName') + params.numbering + "}}\n");
            if( text === old_text ) {
                statelem.error( 'failed to find target spot for the discussion' );
                return;
            }
            pageobj.setPageText(text);
            pageobj.setEditSummary("Adding [[" + params.discussionpage + "]]." + Twinkle.getPref('summaryAd'));
            switch (Twinkle.getPref('xfdWatchList')) {
                case 'yes':
                    pageobj.setWatchlist(true);
                    break;
                case 'no':
                    pageobj.setWatchlistFromPreferences(false);
                    break;
                default:
                    pageobj.setWatchlistFromPreferences(true);
                    break;
            }
            pageobj.setCreateOption('recreate');
            pageobj.save();
        },
        userNotification: function(pageobj) {
            var params = pageobj.getCallbackParameters();
            var initialContrib = pageobj.getCreator();
            var usertalkpage = new Wikipedia.page('User talk:' + initialContrib, "Notifying initial contributor (" + initialContrib + ")");
            var notifytext = "\n{{subst:AFDWarning|1=" + mw.config.get('wgPageName') + ( params.numbering !== '' ? '|order=&#32;' + params.numbering : '' ) + "}} ~~~~";
            usertalkpage.setAppendText(notifytext);
            usertalkpage.setEditSummary("Notification: listing at [[WP:AFD|articles for deletion]] of [[" + mw.config.get('wgPageName') + "]]." + Twinkle.getPref('summaryAd'));
            usertalkpage.setCreateOption('recreate');
            switch (Twinkle.getPref('xfdWatchUser')) {
                case 'yes':
                    usertalkpage.setWatchlist(true);
                    break;
                case 'no':
                    usertalkpage.setWatchlistFromPreferences(false);
                    break;
                default:
                    usertalkpage.setWatchlistFromPreferences(true);
                    break;
            }
            usertalkpage.setFollowRedirect(true);
            usertalkpage.append();
        }
    },


    tfd: {
        taggingTemplate: function(pageobj) {
            var text = pageobj.getPageText();
            var params = pageobj.getCallbackParameters();

            pageobj.setPageText("{{tfd" + (params.tfdinline ? "|type=inline" : "") + "|" + mw.config.get('wgTitle') + "}}\n" + text);
            pageobj.setEditSummary("Nominated for deletion; see [[" + params.logpage + "#" + mw.config.get('wgPageName') + "]]." + Twinkle.getPref('summaryAd'));
            switch (Twinkle.getPref('xfdWatchPage')) {
                case 'yes':
                    pageobj.setWatchlist(true);
                    break;
                case 'no':
                    pageobj.setWatchlistFromPreferences(false);
                    break;
                default:
                    pageobj.setWatchlistFromPreferences(true);
                    break;
            }
            pageobj.setCreateOption('nocreate');
            pageobj.save();
        },
        todaysList: function(pageobj) {
            var old_text = pageobj.getPageText();
            var params = pageobj.getCallbackParameters();
            var statelem = pageobj.getStatusElement();

            var text = old_text.replace( '-->', "-->\n{{subst:tfd2|" + mw.config.get('wgTitle') + "|text=" + params.reason + " ~~~~}}");
            if( text === old_text ) {
                statelem.error( 'failed to find target spot for the discussion' );
                return;
            }
            pageobj.setPageText(text);
            pageobj.setEditSummary("Adding [[Template:" + mw.config.get('wgTitle') + "]]." + Twinkle.getPref('summaryAd'));
            switch (Twinkle.getPref('xfdWatchDiscussion')) {
                case 'yes':
                    pageobj.setWatchlist(true);
                    break;
                case 'no':
                    pageobj.setWatchlistFromPreferences(false);
                    break;
                default:
                    pageobj.setWatchlistFromPreferences(true);
                    break;
            }
            pageobj.setCreateOption('recreate');
            pageobj.save();
            Twinkle.xfd.currentRationale = null;  // any errors from now on do not need to print the rationale, as it is safely saved on-wiki
        },
        userNotification: function(pageobj) {
            var initialContrib = pageobj.getCreator();
            var usertalkpage = new Wikipedia.page('User talk:' + initialContrib, "Notifying initial contributor (" + initialContrib + ")");
            var notifytext = "\n{{subst:tfdnotice|1=" + mw.config.get('wgTitle') + "}} ~~~~";
            usertalkpage.setAppendText(notifytext);
            usertalkpage.setEditSummary("Notification: nomination at [[WP:TFD|templates for discussion]] of [[" + mw.config.get('wgPageName') + "]]." + Twinkle.getPref('summaryAd'));
            usertalkpage.setCreateOption('recreate');
            switch (Twinkle.getPref('xfdWatchUser')) {
                case 'yes':
                    usertalkpage.setWatchlist(true);
                    break;
                case 'no':
                    usertalkpage.setWatchlistFromPreferences(false);
                    break;
                default:
                    usertalkpage.setWatchlistFromPreferences(true);
                    break;
            }
            usertalkpage.setFollowRedirect(true);
            usertalkpage.append();
        }
    },


    mfd: {
        main: function(apiobj) {
            var xmlDoc = apiobj.responseXML;
            var titles = $(xmlDoc).find('allpages p');

            // There has been no earlier entries with this prefix, just go on.
            if( titles.length <= 0 ) {
                apiobj.params.numbering = apiobj.params.number = '';
                numbering = number = '';
            } else {
                var number = 0;
                for( var i = 0; i < titles.length; ++i ) {
                    var title = titles[i].getAttribute('title');

                    // First, simple test, is there an instance with this exact name?
                    if( title === 'Wikipedia:Miscellany for deletion/' + mw.config.get('wgPageName') ) {
                        number = Math.max( number, 1 );
                        continue;
                    }

                    var order_re = new RegExp( '^' +
                            RegExp.escape( 'Wikipedia:Miscellany for deletion/' + mw.config.get('wgPageName'), true ) +
                            '\\s*\\(\\s*(\\d+)(?:(?:th|nd|rd|st) nom(?:ination)?)?\\s*\\)\\s*$' );
                    var match = order_re.exec( title );

                    // No match; A non-good value
                    if( !match ) {
                        continue;
                    }

                    // A match, set number to the max of current
                    number = Math.max( number, Number(match[1]) );
                }
                apiobj.params.number = Twinkle.xfd.num2order( parseInt( number, 10 ) + 1);
                apiobj.params.numbering = number > 0 ? ' (' + apiobj.params.number + ' nomination)' : '';
            }
            apiobj.params.discussionpage = "Wikipedia:Miscellany for deletion/" + mw.config.get('wgPageName') + apiobj.params.numbering;

            apiobj.statelem.info( "next in order is [[" + apiobj.params.discussionpage + ']]');

            // Tagging page
            var wikipedia_page = new Wikipedia.page(mw.config.get('wgPageName'), "Tagging page with deletion tag");
            wikipedia_page.setFollowRedirect(true);  // should never be needed, but if the page is moved, we would want to follow the redirect
            wikipedia_page.setCallbackParameters(apiobj.params);
            wikipedia_page.load(Twinkle.xfd.callbacks.mfd.taggingPage);

            // Updating data for the action completed event
            Wikipedia.actionCompleted.redirect = apiobj.params.discussionpage;
            Wikipedia.actionCompleted.notice = "Nomination completed, now redirecting to the discussion page";

            // Discussion page
            wikipedia_page = new Wikipedia.page(apiobj.params.discussionpage, "Creating deletion discussion page");
            wikipedia_page.setCallbackParameters(apiobj.params);
            wikipedia_page.load(Twinkle.xfd.callbacks.mfd.discussionPage);

            // Today's list
            wikipedia_page = new Wikipedia.page("Wikipedia:Miscellany for deletion", "Adding discussion to today's list");
            //wikipedia_page.setPageSection(2);
                // pageSection has been disabled - the API seems to throw up with nonexistent edit conflicts
                // it can be turned on again once the problem is fixed, to save bandwidth
            //wikipedia_page.setFollowRedirect(true);
            wikipedia_page.setCallbackParameters(apiobj.params);
            wikipedia_page.load(Twinkle.xfd.callbacks.mfd.todaysList);

            // Notification to first contributor, and notification to owner of userspace (if applicable and required)
            if (apiobj.params.usertalk) {
                var thispage = new Wikipedia.page(mw.config.get('wgPageName'));
                thispage.setCallbackParameters(apiobj.params);
                thispage.lookupCreator(Twinkle.xfd.callbacks.mfd.userNotification);
            }
        },
        taggingPage: function(pageobj) {
            var text = pageobj.getPageText();
            var params = pageobj.getCallbackParameters();

            pageobj.setPageText((params.noinclude ? "<noinclude>" : "") + "{{" + ((params.number === '') ? "mfd}}\n" : ('mfdx|' + params.number + "}}\n")) +
                (params.noinclude ? "</noinclude>" : "") + text);
            pageobj.setEditSummary("Nominated for deletion; see [[" + params.discussionpage + "]]." + Twinkle.getPref('summaryAd'));
            switch (Twinkle.getPref('xfdWatchPage')) {
                case 'yes':
                    pageobj.setWatchlist(true);
                    break;
                case 'no':
                    pageobj.setWatchlistFromPreferences(false);
                    break;
                default:
                    pageobj.setWatchlistFromPreferences(true);
                    break;
            }
            pageobj.setCreateOption('nocreate');
            pageobj.save();
        },
        discussionPage: function(pageobj) {
            var text = pageobj.getPageText();
            var params = pageobj.getCallbackParameters();

            pageobj.setPageText("{{subst:mfd2|pg=" + mw.config.get('wgPageName') + "|text=" + params.reason + " ~~~~}}\n");
            pageobj.setEditSummary("Creating deletion discussion page for [[" + mw.config.get('wgPageName') + "]]." + Twinkle.getPref('summaryAd'));
            switch (Twinkle.getPref('xfdWatchDiscussion')) {
                case 'yes':
                    pageobj.setWatchlist(true);
                    break;
                case 'no':
                    pageobj.setWatchlistFromPreferences(false);
                    break;
                default:
                    pageobj.setWatchlistFromPreferences(true);
                    break;
            }
            pageobj.setCreateOption('createonly');
            pageobj.save();
            Twinkle.xfd.currentRationale = null;  // any errors from now on do not need to print the rationale, as it is safely saved on-wiki
        },
        todaysList: function(pageobj) {
            var text = pageobj.getPageText();
            var params = pageobj.getCallbackParameters();
            var statelem = pageobj.getStatusElement();

            var date = new Date();
            var date_header = "===" + date.getUTCMonthName() + ' ' + date.getUTCDate() + ', ' + date.getUTCFullYear() + "===";
            var date_header_regex = new RegExp( "(===\\s*" + date.getUTCMonthName() + '\\s+' + date.getUTCDate() + ',\\s+' + date.getUTCFullYear() + "\\s*===)" );
            var new_data = "{{subst:mfd3|pg=" + mw.config.get('wgPageName') + params.numbering + "}}";

            if( date_header_regex.test( text ) ) { // we have a section already
                statelem.info( 'Found today\'s section, proceeding to add new entry' );
                text = text.replace( date_header_regex, "$1\n" + new_data );
            } else { // we need to create a new section
                statelem.info( 'No section for today found, proceeding to create one' );
                text = text.replace("===", date_header + new_data + "\n\n===");
            }

            pageobj.setPageText(text);
            pageobj.setEditSummary("Adding [[" + params.discussionpage + "]]." + Twinkle.getPref('summaryAd'));
            switch (Twinkle.getPref('xfdWatchList')) {
                case 'yes':
                    pageobj.setWatchlist(true);
                    break;
                case 'no':
                    pageobj.setWatchlistFromPreferences(false);
                    break;
                default:
                    pageobj.setWatchlistFromPreferences(true);
                    break;
            }
            pageobj.setCreateOption('recreate');
            pageobj.save();
        },
        userNotification: function(pageobj) {
            var initialContrib = pageobj.getCreator();
            var params = pageobj.getCallbackParameters();

            // Really notify the creator
            Twinkle.xfd.callbacks.mfd.userNotificationMain(params, initialContrib, "Notifying initial contributor");

            // Also notify the user who owns the subpage if they are not the creator
            if (params.notifyuserspace) {
                var userspaceOwner = ((mw.config.get('wgTitle').indexOf('/') === -1) ? mw.config.get('wgTitle') : mw.config.get('wgTitle').substring(0, mw.config.get('wgTitle').indexOf('/')));
                if (userspaceOwner !== initialContrib) {
                    Twinkle.xfd.callbacks.mfd.userNotificationMain(params, userspaceOwner, "Notifying owner of userspace");
                }
            }
        },
        userNotificationMain: function(params, initialContrib, actionName)
        {
            var usertalkpage = new Wikipedia.page('User talk:' + initialContrib, actionName + " (" + initialContrib + ")");
            var notifytext = "\n{{subst:MFDWarning|1=" + mw.config.get('wgPageName') + ( params.numbering !== '' ? '|order=&#32;' + params.numbering : '' ) + "}} ~~~~";
            usertalkpage.setAppendText(notifytext);
            usertalkpage.setEditSummary("Notification: listing at [[WP:MFD|miscellany for deletion]] of [[" + mw.config.get('wgPageName') + "]]." + Twinkle.getPref('summaryAd'));
            usertalkpage.setCreateOption('recreate');
            switch (Twinkle.getPref('xfdWatchUser')) {
                case 'yes':
                    usertalkpage.setWatchlist(true);
                    break;
                case 'no':
                    usertalkpage.setWatchlistFromPreferences(false);
                    break;
                default:
                    usertalkpage.setWatchlistFromPreferences(true);
                    break;
            }
            usertalkpage.setFollowRedirect(true);
            usertalkpage.append();
        }
    },


    ffd: {
        main: function(pageobj) {
            // this is coming in from lookupCreator...!
            var params = pageobj.getCallbackParameters();
            var initialContrib = pageobj.getCreator();
            params.uploader = initialContrib;

            // Adding discussion
            wikipedia_page = new Wikipedia.page(params.logpage, "Adding discussion to today's list");
            wikipedia_page.setFollowRedirect(true);
            wikipedia_page.setCallbackParameters(params);
            wikipedia_page.load(Twinkle.xfd.callbacks.ffd.todaysList);

            // Notification to first contributor
            if(params.usertalk) {
                var usertalkpage = new Wikipedia.page('User talk:' + initialContrib, "Notifying initial contributor (" + initialContrib + ")");
                var notifytext = "\n{{subst:idw|1=" + mw.config.get('wgTitle') + "}}";
                usertalkpage.setAppendText(notifytext);
                usertalkpage.setEditSummary("Notification: listing at [[WP:FFD|files for deletion]] of [[" + mw.config.get('wgPageName') + "]]." + Twinkle.getPref('summaryAd'));
                usertalkpage.setCreateOption('recreate');
                switch (Twinkle.getPref('xfdWatchUser')) {
                    case 'yes':
                        usertalkpage.setWatchlist(true);
                        break;
                    case 'no':
                        usertalkpage.setWatchlistFromPreferences(false);
                        break;
                    default:
                        usertalkpage.setWatchlistFromPreferences(true);
                        break;
                }
                usertalkpage.setFollowRedirect(true);
                usertalkpage.append();
            }
        },
        taggingImage: function(pageobj) {
            var text = pageobj.getPageText();
            var params = pageobj.getCallbackParameters();

            pageobj.setPageText("{{ffd|log=" + params.date + "}}\n" + text);
            pageobj.setEditSummary("Nominated for deletion at [[" + params.logpage + "#" + mw.config.get('wgPageName') + "]]." + Twinkle.getPref('summaryAd'));
            switch (Twinkle.getPref('xfdWatchPage')) {
                case 'yes':
                    pageobj.setWatchlist(true);
                    break;
                case 'no':
                    pageobj.setWatchlistFromPreferences(false);
                    break;
                default:
                    pageobj.setWatchlistFromPreferences(true);
                    break;
            }
            pageobj.setCreateOption('recreate');  // it might be possible for a file to exist without a description page
            pageobj.save();
        },
        todaysList: function(pageobj) {
            var text = pageobj.getPageText();
            var params = pageobj.getCallbackParameters();

            // add date header if the log is found to be empty (a bot should do this automatically, but it sometimes breaks down)
            if (!pageobj.exists()) {
                text = "{{subst:Ffd log}}";
            }

            pageobj.setPageText(text + "\n{{subst:ffd2|1=" + mw.config.get('wgTitle') + "|Uploader=" + params.uploader + "|Reason=" + params.reason + "}} ~~~~");
            pageobj.setEditSummary("Adding [[" + mw.config.get('wgPageName') + "]]." + Twinkle.getPref('summaryAd'));
            switch (Twinkle.getPref('xfdWatchDiscussion')) {
                case 'yes':
                    pageobj.setWatchlist(true);
                    break;
                case 'no':
                    pageobj.setWatchlistFromPreferences(false);
                    break;
                default:
                    pageobj.setWatchlistFromPreferences(true);
                    break;
            }
            pageobj.setCreateOption('recreate');
            pageobj.save();
            Twinkle.xfd.currentRationale = null;  // any errors from now on do not need to print the rationale, as it is safely saved on-wiki
        }
    },


    puf: {
        taggingImage: function(pageobj) {
            var text = pageobj.getPageText();
            var params = pageobj.getCallbackParameters();

            pageobj.setPageText("{{puf|help=off|log=" + params.date + "}}\n" + text);
            pageobj.setEditSummary("Listed at [[WP:PUF|possibly unfree files]]: [[" + params.logpage + "#" + mw.config.get('wgPageName') + "]]." + Twinkle.getPref('summaryAd'));
            switch (Twinkle.getPref('xfdWatchPage')) {
                case 'yes':
                    pageobj.setWatchlist(true);
                    break;
                case 'no':
                    pageobj.setWatchlistFromPreferences(false);
                    break;
                default:
                    pageobj.setWatchlistFromPreferences(true);
                    break;
            }
            pageobj.setCreateOption('recreate');  // it might be possible for a file to exist without a description page
            pageobj.save();
        },
        todaysList: function(pageobj) {
            var text = pageobj.getPageText();
            var params = pageobj.getCallbackParameters();

            pageobj.setPageText(text + "\n{{subst:puf2|image=" + mw.config.get('wgTitle') + "|reason=" + params.reason + "}} ~~~~");
            pageobj.setEditSummary("Adding [[" + mw.config.get('wgPageName') + "]]." + Twinkle.getPref('summaryAd'));
            switch (Twinkle.getPref('xfdWatchDiscussion')) {
                case 'yes':
                    pageobj.setWatchlist(true);
                    break;
                case 'no':
                    pageobj.setWatchlistFromPreferences(false);
                    break;
                default:
                    pageobj.setWatchlistFromPreferences(true);
                    break;
            }
            pageobj.setCreateOption('recreate');
            pageobj.save();
            Twinkle.xfd.currentRationale = null;  // any errors from now on do not need to print the rationale, as it is safely saved on-wiki
        },
        userNotification: function(pageobj) {
            var initialContrib = pageobj.getCreator();
            var usertalkpage = new Wikipedia.page('User talk:' + initialContrib, "Notifying initial contributor (" + initialContrib + ")");
            var notifytext = "\n{{subst:idw-puf|1=" + mw.config.get('wgTitle') + "}} ~~~~";
            usertalkpage.setAppendText(notifytext);
            usertalkpage.setEditSummary("Notification: listing at [[WP:PUF|possibly unfree files]] of [[" + mw.config.get('wgPageName') + "]]." + Twinkle.getPref('summaryAd'));
            usertalkpage.setCreateOption('recreate');
            switch (Twinkle.getPref('xfdWatchUser')) {
                case 'yes':
                    usertalkpage.setWatchlist(true);
                    break;
                case 'no':
                    usertalkpage.setWatchlistFromPreferences(false);
                    break;
                default:
                    usertalkpage.setWatchlistFromPreferences(true);
                    break;
            }
            usertalkpage.setFollowRedirect(true);
            usertalkpage.append();
        }
    },


    cfd: {
        taggingCategory: function(pageobj) {
            var text = pageobj.getPageText();
            var params = pageobj.getCallbackParameters();

            var added_data = "";
            var editsummary = "";
            switch( params.xfdcat ) {
            case 'cfd':
                added_data = "{{subst:cfd}}";
                editsummary = "Category being considered for deletion in accordance with [[WP:CDP|CDP]].";
                break;
            case 'cfm':
                added_data = "{{subst:cfm|" + params.target.replace('Category:','') + "}}";
                editsummary = "Category being considered for merging in accordance with [[WP:CDP|CDP]].";
                break;
            case 'cfr':
                added_data = "{{subst:cfr|" + params.target.replace('Category:','') + "}}";
                editsummary = "Category being considered for renaming in accordance with [[WP:CDP|CDP]].";
                break;
            case 'cfc':
                added_data = "{{subst:cfc|" + params.target + "}}";
                editsummary = "Category being considered for conversion to an article in accordance with [[WP:CDP|CDP]].";
                break;
            default:
                alert("twinklexfd in taggingCategory(): unknown CFD action");
                break;
            }

            pageobj.setPageText(added_data + "\n" + text);
            pageobj.setEditSummary(editsummary + Twinkle.getPref('summaryAd'));
            switch (Twinkle.getPref('xfdWatchPage')) {
                case 'yes':
                    pageobj.setWatchlist(true);
                    break;
                case 'no':
                    pageobj.setWatchlistFromPreferences(false);
                    break;
                default:
                    pageobj.setWatchlistFromPreferences(true);
                    break;
            }
            pageobj.setCreateOption('recreate');  // since categories can be populated without an actual page at that title
            pageobj.save();
        },
        todaysList: function(pageobj) {
            var old_text = pageobj.getPageText();
            var params = pageobj.getCallbackParameters();
            var statelem = pageobj.getStatusElement();

            var added_data = "";
            var editsummary = "";
            switch( params.xfdcat ) {
            case 'cfd':
                added_data = "{{subst:cfd2|1=" + mw.config.get('wgTitle') + "|text=" + params.reason + " ~~~~}}";
                editsummary = "Added delete nomination of [[:" + mw.config.get('wgPageName') + "]].";
                break;
            case 'cfm':
                added_data = "{{subst:cfm2|1=" + mw.config.get('wgTitle') + "|2=" + params.target + "|text=" + params.reason + " ~~~~}}";
                editsummary = "Added merge nomination of [[:" + mw.config.get('wgPageName') + "]].";
                break;
            case 'cfr':
                added_data = "{{subst:cfr2|1=" + mw.config.get('wgTitle') + "|2=" + params.target + "|text=" + params.reason + " ~~~~}}";
                editsummary = "Added rename nomination of [[:" + mw.config.get('wgPageName') + "]].";
                break;
            case 'cfc':
                added_data = "{{subst:cfc2|1=" + mw.config.get('wgTitle') + "|2=" + params.target + "|text=" + params.reason + " ~~~~}}";
                editsummary = "Added convert nomination of [[:" + mw.config.get('wgPageName') + "]].";
                break;
            default:
                alert("twinklexfd in todaysList: unknown CFD action");
                break;
            }

            text = old_text.replace( 'below this line -->', "below this line -->\n" + added_data );
            if( text === old_text ) {
                statelem.error( 'failed to find target spot for the discussion' );
                return;
            }

            pageobj.setPageText(text);
            pageobj.setEditSummary(editsummary + Twinkle.getPref('summaryAd'));
            switch (Twinkle.getPref('xfdWatchDiscussion')) {
                case 'yes':
                    pageobj.setWatchlist(true);
                    break;
                case 'no':
                    pageobj.setWatchlistFromPreferences(false);
                    break;
                default:
                    pageobj.setWatchlistFromPreferences(true);
                    break;
            }
            pageobj.setCreateOption('recreate');
            pageobj.save();
            Twinkle.xfd.currentRationale = null;  // any errors from now on do not need to print the rationale, as it is safely saved on-wiki
        },
        userNotification: function(pageobj) {
            var initialContrib = pageobj.getCreator();
            var params = pageobj.getCallbackParameters();
            var usertalkpage = new Wikipedia.page('User talk:' + initialContrib, "Notifying initial contributor (" + initialContrib + ")");
            var notifytext = "\n{{subst:CFDNote|1=" + mw.config.get('wgPageName') + "}} ~~~~";
            usertalkpage.setAppendText(notifytext);
            usertalkpage.setEditSummary("Notification: listing at [[WP:CFD|categories for discussion]] of [[" + mw.config.get('wgPageName') + "]]." + Twinkle.getPref('summaryAd'));
            usertalkpage.setCreateOption('recreate');
            switch (Twinkle.getPref('xfdWatchUser')) {
                case 'yes':
                    usertalkpage.setWatchlist(true);
                    break;
                case 'no':
                    usertalkpage.setWatchlistFromPreferences(false);
                    break;
                default:
                    usertalkpage.setWatchlistFromPreferences(true);
                    break;
            }
            usertalkpage.setFollowRedirect(true);
            usertalkpage.append();
        }
    },


    rfd: {
        // This is a callback from an API request, which gets the target of the redirect
        findTargetCallback: function(apiobj) {
            var xmlDoc = apiobj.responseXML;
            var target = $(xmlDoc).find('redirects r').first().attr('to');
            if( !target ) {
                apiobj.statelem.error( "This page is currently not a redirect, aborting" );
                return;
            }
            apiobj.params.target = target;
            Twinkle.xfd.callbacks.rfd.main(apiobj.params);
        },
        main: function(params) {
            var date = new Date();
            params.logpage = 'Wikipedia:Redirects for discussion/Log/' + date.getUTCFullYear() + ' ' + date.getUTCMonthName() + ' ' + date.getUTCDate();

            // Tagging redirect
            var wikipedia_page = new Wikipedia.page(mw.config.get('wgPageName'), "Adding deletion tag to redirect");
            wikipedia_page.setFollowRedirect(false);
            wikipedia_page.setCallbackParameters(params);
            wikipedia_page.load(Twinkle.xfd.callbacks.rfd.taggingRedirect);

            // Updating data for the action completed event
            Wikipedia.actionCompleted.redirect = params.logpage;
            Wikipedia.actionCompleted.notice = "Nomination completed, now redirecting to today's log";

            // Adding discussion
            wikipedia_page = new Wikipedia.page(params.logpage, "Adding discussion to today's log");
            wikipedia_page.setFollowRedirect(true);
            wikipedia_page.setCallbackParameters(params);
            wikipedia_page.load(Twinkle.xfd.callbacks.rfd.todaysList);

            // Notifying initial contributor
            if (params.usertalk) {
                var thispage = new Wikipedia.page(mw.config.get('wgPageName'));
                thispage.setCallbackParameters(params);
                thispage.lookupCreator(Twinkle.xfd.callbacks.rfd.userNotification);
            }
        },
        taggingRedirect: function(pageobj) {
            var text = pageobj.getPageText();
            var params = pageobj.getCallbackParameters();

            pageobj.setPageText("{{rfd}}\n" + text);
            pageobj.setEditSummary("Listed for discussion at [[" + params.logpage + "#" + mw.config.get('wgPageName') + "]]." + Twinkle.getPref('summaryAd'));
            switch (Twinkle.getPref('xfdWatchPage')) {
                case 'yes':
                    pageobj.setWatchlist(true);
                    break;
                case 'no':
                    pageobj.setWatchlistFromPreferences(false);
                    break;
                default:
                    pageobj.setWatchlistFromPreferences(true);
                    break;
            }
            pageobj.setCreateOption('nocreate');
            pageobj.save();
        },
        todaysList: function(pageobj) {
            var old_text = pageobj.getPageText();
            var params = pageobj.getCallbackParameters();
            var statelem = pageobj.getStatusElement();

            var text = old_text.replace( /(<\!-- Add new entries directly below this line -->)/, "$1\n{{subst:rfd2|redirect="+ mw.config.get('wgPageName') + "|target=" +
                params.target + "|text=" + params.reason.toUpperCaseFirstChar() +"}} ~~~~\n" );
            if( text === old_text ) {
                statelem.error( 'failed to find target spot for the discussion' );
                return;
            }

            pageobj.setPageText(text);
            pageobj.setEditSummary("Adding [[" + mw.config.get('wgPageName') + "]]." + Twinkle.getPref('summaryAd'));
            switch (Twinkle.getPref('xfdWatchDiscussion')) {
                case 'yes':
                    pageobj.setWatchlist(true);
                    break;
                case 'no':
                    pageobj.setWatchlistFromPreferences(false);
                    break;
                default:
                    pageobj.setWatchlistFromPreferences(true);
                    break;
            }
            pageobj.setCreateOption('recreate');
            pageobj.save();
            Twinkle.xfd.currentRationale = null;  // any errors from now on do not need to print the rationale, as it is safely saved on-wiki
        },
        userNotification: function(pageobj) {
            var initialContrib = pageobj.getCreator();
            var usertalkpage = new Wikipedia.page('User talk:' + initialContrib, "Notifying initial contributor (" + initialContrib + ")");
            var notifytext = "\n{{subst:RFDNote|1=" + mw.config.get('wgPageName') + "}} ~~~~";
            usertalkpage.setAppendText(notifytext);
            usertalkpage.setEditSummary("Notification: listing at [[WP:RFD|redirects for discussion]] of [[" + mw.config.get('wgPageName') + "]]." + Twinkle.getPref('summaryAd'));
            usertalkpage.setCreateOption('recreate');
            switch (Twinkle.getPref('xfdWatchUser')) {
                case 'yes':
                    usertalkpage.setWatchlist(true);
                    break;
                case 'no':
                    usertalkpage.setWatchlistFromPreferences(false);
                    break;
                default:
                    usertalkpage.setWatchlistFromPreferences(true);
                    break;
            }
            usertalkpage.setFollowRedirect(true);
            usertalkpage.append();
        }
    }
};



Twinkle.xfd.callback.evaluate = function(e) {
    mw.config.set('wgPageName', mw.config.get('wgPageName').replace(/_/g, ' '));  // for queen/king/whatever and country!

    var type =  e.target.category.value;
    var usertalk = e.target.notify.checked;
    var reason = e.target.xfdreason.value;
    var xfdcat, puf, noinclude, tfdinline, notifyuserspace;
    if( type in {'afd':'','cfd':''} ) {
        xfdcat = e.target.xfdcat.value;
    }
    if( type === 'ffd' ) {
        puf = e.target.puf.checked;
    }
    if( type in {'afd':'','mfd':''} ) {
        noinclude = e.target.noinclude.checked;
    }
    if( type === 'tfd' ) {
        tfdinline = e.target.tfdinline.checked;
    }
    if( type === 'mfd' ) {
        notifyuserspace = e.target.notifyuserspace && e.target.notifyuserspace.checked;
    }

    SimpleWindow.setButtonsEnabled( false );
    Status.init( e.target );

    Twinkle.xfd.currentRationale = reason;
    Status.onError(Twinkle.xfd.printRationale);

    if( !type ) {
        Status.error( 'Error', 'no action given' );
        return;
    }

    var query, wikipedia_page, wikipedia_api, logpage, params;
    var date = new Date();
    switch( type ) {

    case 'afd': // AFD
        query = {
            'action': 'query',
            'list': 'allpages',
            'apprefix': 'Articles for deletion/' + mw.config.get('wgPageName'),
            'apnamespace': 4,
            'apfilterredir': 'nonredirects',
            'aplimit': userIsInGroup( 'sysop' ) ? 5000 : 500
        };
        wikipedia_api = new Wikipedia.api( 'Tagging article with deletion tag', query, Twinkle.xfd.callbacks.afd.main );
        wikipedia_api.params = { usertalk:usertalk, reason:reason, noinclude:noinclude, xfdcat:xfdcat };
        wikipedia_api.post();
        break;

    case 'tfd': // TFD
        Wikipedia.addCheckpoint();

        logpage = 'Wikipedia:Templates for discussion/Log/' + date.getUTCFullYear() + ' ' + date.getUTCMonthName() + ' ' + date.getUTCDate();

        // Tagging template
        wikipedia_page = new Wikipedia.page(mw.config.get('wgPageName'), "Tagging template with deletion tag");
        wikipedia_page.setFollowRedirect(true);  // should never be needed, but if the page is moved, we would want to follow the redirect
        wikipedia_page.setCallbackParameters({ tfdinline: tfdinline, logpage: logpage });
        wikipedia_page.load(Twinkle.xfd.callbacks.tfd.taggingTemplate);

        // Updating data for the action completed event
        Wikipedia.actionCompleted.redirect = logpage;
        Wikipedia.actionCompleted.notice = "Nomination completed, now redirecting to today's log";

        // Adding discussion
        wikipedia_page = new Wikipedia.page(logpage, "Adding discussion to today's log");
        wikipedia_page.setFollowRedirect(true);
        wikipedia_page.setCallbackParameters({ reason: reason });
        wikipedia_page.load(Twinkle.xfd.callbacks.tfd.todaysList);

        // Notification to first contributor
        if (usertalk) {
            var thispage = new Wikipedia.page(mw.config.get('wgPageName'));
            thispage.lookupCreator(Twinkle.xfd.callbacks.tfd.userNotification);
        }

        Wikipedia.removeCheckpoint();
        break;

    case 'mfd': // MFD
        query = {
            'action': 'query',
            'list': 'allpages',
            'apprefix': 'Miscellany for deletion/' + mw.config.get('wgPageName'),
            'apnamespace': 4,
            'apfilterredir': 'nonredirects',
            'aplimit': userIsInGroup( 'sysop' ) ? 5000 : 500
        };
        wikipedia_api = new Wikipedia.api( "Looking for prior nominations of this page", query, Twinkle.xfd.callbacks.mfd.main );
        wikipedia_api.params = { usertalk: usertalk, notifyuserspace: notifyuserspace, reason: reason, noinclude: noinclude, xfdcat: xfdcat };
        wikipedia_api.post();
        break;

    case 'ffd': // FFD
        var dateString = date.getUTCFullYear() + ' ' + date.getUTCMonthName() + ' ' + date.getUTCDate();
        logpage = 'Wikipedia:Files for deletion/' + dateString;
        params = { usertalk: usertalk, reason: reason, date: dateString, logpage: logpage };

        Wikipedia.addCheckpoint();
        if( puf ) {
            params.logpage = logpage = 'Wikipedia:Possibly unfree files/' + dateString;

            // Updating data for the action completed event
            Wikipedia.actionCompleted.redirect = logpage;
            Wikipedia.actionCompleted.notice = "Nomination completed, now redirecting to today's list";

            // Tagging file
            wikipedia_page = new Wikipedia.page(mw.config.get('wgPageName'), "Tagging file with PUF tag");
            wikipedia_page.setFollowRedirect(true);
            wikipedia_page.setCallbackParameters(params);
            wikipedia_page.load(Twinkle.xfd.callbacks.puf.taggingImage);

            // Adding discussion
            wikipedia_page = new Wikipedia.page(params.logpage, "Adding discussion to today's list");
            wikipedia_page.setFollowRedirect(true);
            wikipedia_page.setCallbackParameters(params);
            wikipedia_page.load(Twinkle.xfd.callbacks.puf.todaysList);

            // Notification to first contributor
            if (usertalk) {
                wikipedia_page = new Wikipedia.page(mw.config.get('wgPageName'));
                wikipedia_page.setCallbackParameters(params);
                wikipedia_page.lookupCreator(Twinkle.xfd.callbacks.puf.userNotification);
            }

            Wikipedia.removeCheckpoint();

        } else {
            // Updating data for the action completed event
            Wikipedia.actionCompleted.redirect = logpage;
            Wikipedia.actionCompleted.notice = "Nomination completed, now redirecting to the discussion page";

            // Tagging file
            wikipedia_page = new Wikipedia.page(mw.config.get('wgPageName'), "Adding deletion tag to file page");
            wikipedia_page.setFollowRedirect(true);
            wikipedia_page.setCallbackParameters(params);
            wikipedia_page.load(Twinkle.xfd.callbacks.ffd.taggingImage);

            // Contributor specific edits
            wikipedia_page = new Wikipedia.page(mw.config.get('wgPageName'));
            wikipedia_page.setCallbackParameters(params);
            wikipedia_page.lookupCreator(Twinkle.xfd.callbacks.ffd.main);
        }
        Wikipedia.removeCheckpoint();
        break;

    case 'cfd':
        Wikipedia.addCheckpoint();

        var target;
        if( e.target.xfdtarget ) {
            target = e.target.xfdtarget.value.replace( /^\:?Category\:/, '' );
        } else {
            target = '';
        }

        logpage = 'Wikipedia:Categories for discussion/Log/' + date.getUTCFullYear() + ' ' + date.getUTCMonthName() + ' ' + date.getUTCDate();

        params = { reason: reason, xfdcat: xfdcat, target: target, logpage: logpage };

        // Updating data for the action completed event
        Wikipedia.actionCompleted.redirect = logpage;
        Wikipedia.actionCompleted.notice = "Nomination completed, now redirecting to today's log";

        // Tagging category
        wikipedia_page = new Wikipedia.page(mw.config.get('wgPageName'), "Tagging category with deletion tag");
        wikipedia_page.setCallbackParameters(params);
        wikipedia_page.load(Twinkle.xfd.callbacks.cfd.taggingCategory);

        // Adding discussion to list
        wikipedia_page = new Wikipedia.page(logpage, "Adding discussion to today's list");
        //wikipedia_page.setPageSection(2);
            // pageSection has been disabled - the API seems to throw up with nonexistent edit conflicts
            // it can be turned on again once the problem is fixed, to save bandwidth
        //wikipedia_page.setFollowRedirect(true);
        wikipedia_page.setCallbackParameters(params);
        wikipedia_page.load(Twinkle.xfd.callbacks.cfd.todaysList);

        // Notification to first contributor
        if (usertalk) {
            wikipedia_page = new Wikipedia.page(mw.config.get('wgPageName'));
            wikipedia_page.setCallbackParameters(params);
            wikipedia_page.lookupCreator(Twinkle.xfd.callbacks.cfd.userNotification);
        }

        Wikipedia.removeCheckpoint();
        break;

    case 'rfd':
        params = { usertalk: usertalk, reason: reason };
        if (document.getElementById("softredirect")) {
            // For soft redirects, skip straight to the callback
            params.target = document.getElementById("softredirect").textContent.replace(/^\:+/, "");
            Twinkle.xfd.callbacks.rfd.main(params);
        } else {
            // Find current target of redirect
            query = {
                'action': 'query',
                'titles': mw.config.get('wgPageName'),
                'redirects': true
            };
            wikipedia_api = new Wikipedia.api( "Finding target of redirect", query, Twinkle.xfd.callbacks.rfd.findTargetCallback );
            wikipedia_api.params = params;
            wikipedia_api.post();
        }
        break;
    default:
        alert("twinklexfd: unknown XFD discussion venue");
        break;
    }
};


/**
 * General initialization code
 */

var scriptpathbefore = mw.config.get('wgServer') + mw.config.get('wgScript') + "?title=";
var scriptpathafter = "&action=raw&ctype=text/javascript&happy=yes";

// retrieve the user's Twinkle preferences
$.ajax({
    url: scriptpathbefore + "User:" + encodeURIComponent(mw.config.get('wgUserName')) + "/twinkleoptions.js" + scriptpathafter,
    dataType: 'text',
    error: function(){ jsMsg("Could not load twinkleoptions.js"); },
    success: function(optionsText){

        //quick pass if user has no options
        if ( optionsText === "/* Empty */" ) {
            return;
        }

        //twinkle options are basically a JSON object with some comments. Strip those:
        optionsText = optionsText.replace(/(?:^(?:\/\/[^\n]*\n)*\n*|(?:\/\/[^\n]*(?:\n|$))*$)/g, "");

        //first version of options had some boilerplate code to make it eval-able -- strip that too. This part may become obsolete down the line.
        if (optionsText.lastIndexOf("window.Twinkle.prefs = ", 0) === 0) {
            optionsText = optionsText.replace(/(?:^window.Twinkle.prefs = |;\n*$)/g, "");
        }

        try {
            var options = $.parseJSON(optionsText);

            // Assuming that our options evolve, we will want to transform older versions:
            //if (options.optionsVersion === undefined) {
            // ...
            // options.optionsVersion = 1;
            //}
            //if (options.optionsVersion === 1) {
            // ...
            // options.optionsVersion = 2;
            //}
            // At the same time, twinkleconfig.js needs to be adapted to write a higher version number into the options.

            Twinkle.prefs = options;
        }
        catch (e) {
            jsMsg("Could not parse twinkleoptions.js");
        }
    },
    complete: function(){
        $(document).ready(Twinkle.load);
    }
});

// Developers: you can import custom Twinkle modules here
// for example, mw.loader.load(scriptpathbefore + "User:UncleDouggie/morebits-test.js" + scriptpathafter);

Twinkle.load = function(){
    // Don't activate on special pages other than "Contributions" so that they load faster, especially the watchlist.
    // Also, Twinkle is incompatible with Internet Explorer versions 8 or lower, so don't load there either.
    if ( (mw.config.get('wgNamespaceNumber') === -1 && mw.config.get('wgTitle') !== "Contributions") ||
        ($.client.profile().name === 'msie' && $.client.profile().versionBase < 9) ) {
        return;
    }

    // load the modules in the order that the tabs should appears
    // user/user talk-related
    Twinkle.arv();
    Twinkle.warn();
    Twinkle.welcome();
    Twinkle.shared();
    Twinkle.talkback();
    // deletion
    Twinkle.speedy();
    Twinkle.prod();
    Twinkle.xfd();
    Twinkle.image();
    // maintenance
    Twinkle.protect();
    Twinkle.tag();
    // misc. ones last
    Twinkle.diff();
    Twinkle.unlink();
    Twinkle.config.init();
    Twinkle.fluff.init();
    if (userIsInGroup('sysop')) {
        //Twinkle.closer();  -- disabled for the moment, as it is disliked among Twinkle users -- TTO 2011-05-30
        Twinkle.delimages();
        Twinkle.deprod();
        Twinkle.batchdelete();
        Twinkle.batchprotect();
        Twinkle.imagetraverse();
        Twinkle.batchundelete();
    }
    // run the initialization callbacks for any custom modules
    $(Twinkle.initCallbacks).each(function(k, v) { v(); });
    Twinkle.addInitCallback = function(func) { func(); };

    // increates text size in Twinkle dialogs bigger, if so configured
    if (Twinkle.getPref("dialogLargeFont")) {
        mw.util.addCSS(".morebits-dialog-content, .morebits-dialog-footerlinks { font-size: 100% !important; } " +
            ".morebits-dialog input, .morebits-dialog select, .morebits-dialog-content button { font-size: inherit !important; }");
    }
};

// </nowiki>