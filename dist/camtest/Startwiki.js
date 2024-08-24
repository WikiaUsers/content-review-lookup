/** __NOWYSIWYG__ <pre>
 * Re-purposing start a wiki button
 * @author Cåm
 */

/**
 * Format for swlinks
 * '<li><a href="/wiki/PAGENAME" title="TITLE">TITLE</a></li>';
 */

importArticles({
    type: "style",
    article: 'u:camtest:MediaWiki:Startwiki.css'
});

(function ($, mw) {

    'use strict';

/* Varible declarations */
    var articlecomments = '',
        admintools = '',
        customlinks = '',
        namespace = '';

    if (typeof swlinks === 'string') {
        customlinks = swlinks;
    }

/* Namespace checks for talk page link
 * Message Wall (1200), Message Wall Greeting (1202), User blog (500), Board (2000) and Topic (2002)
 * Talk namespaces are odd numbered, as are Special (-1), User blog comment (501) and Thread (1201)
 * Blog (502) and Blog talk (503) (neither of which exist here)
 */

/* Need to find a way to check mainspace page for article comments from ?action=edit
 * Class only exists in ?action=view
 * <http://runescape.wikia.com/wikia.php?controller=WikiFeaturesSpecial&method=index&format=json>
 *    if ($('.WikiaArticleComments').length) {
 *        articlecomments = '#WikiaArticleComments'; // This isn't going to work...
 *    }
 */

// Possibly make this configurable as talk pages seem to still work?
    if (mw.config.get('wgNamespaceNumber') === 0) {
        namespace = 'Talk';
    } else if (mw.config.get('wgNamespaceNumber') === (1200 || 1202 || 500 || 2000 || 2002)) {
        namespace = mw.config.get('wgCanonicalNamespace');
    } else if (mw.config.get('wgNamespaceNumber') % 2 !== 0) {
        namespace = mw.config.get('wgCanonicalNamespace');
    } else {
        namespace =  mw.config.get('wgCanonicalNamespace') + '_talk';
    }

/* Only show Delete and Protect if you can actually use them */
    if ($.inArray('sysop', mw.config.get('wgUserGroups')) > -1) {
        admintools = '<li><a href="/wiki/' + mw.config.get('wgPageName') + '?action=delete" title="Delete">Delete</a></li><li><a href="/wiki/' + mw.config.get('wgPageName') + '?action=protect" title="Protect">Protect</a></li>';
    }

/* Edit tools
 * Default links to: Talk page, History, Move, Delete, Protect.
 * Some styling set here for smoother loading
 *
 * @todo fix for wgPageName containing " within the string
 * @example "example "text" goes here"
 */
    if (mw.config.get('wgAction') === 'edit') {
        $('.start-a-wiki').replaceWith('<li class="start-a-wiki" style="margin-top:0 !important; padding:0; border-left:none; height:33px;"><ul class="hover-container"><li class="nav-mimic start-a-wiki" style="display:inline-block; margin-top:5px; padding:0 14px; border-left-width:1px; border-left-style:solid; height:22px;"><div class="nav-header" style="font-size:85%; margin-top:3px;">Edit tools</div><div class="list-container AccountNavigation"><ul class="startwiki-list subnav"><li><a href="/wiki/' + mw.config.get('wgPageName') + '" title="Back to page">Back to page</a></li><li><a href="/wiki/' + namespace + ':' + mw.config.get('wgTitle') + articlecomments + '" title="Talk">Talk</a></li><li><a href="/wiki/' + mw.config.get('wgPageName') + '?action=history" title="History">History</a></li><li><a href="/wiki/Special:MovePage/' + mw.config.get('wgPageName') + '" title="Move">Move</a></li>' + admintools + '</ul></div></li></ul></li>');
    } else {
/* Tools
 * Default links to Each skin, Special:WhatLinksHere, Special:PrefixIndex
 */
        $('.start-a-wiki').replaceWith('<li class="start-a-wiki" style="margin-top:0 !important; padding:0; border-left:none; height:33px;"><ul class="hover-container"><li class="nav-mimic start-a-wiki" style="display:inline-block; margin-top:5px; padding:0 14px; border-left-width:1px; border-left-style:solid; height:22px;"><div class="nav-header" style="font-size:85%; margin-top:3px;">Tools</div><div class="list-container AccountNavigation"><ul class="startwiki-list subnav"><li class="skin-container"><a>Skins <img src="data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D" class="chevron-right"></a><ul class=skin-submenu><li><a href="/wiki/' + mw.config.get('wgPageName') + '?useskin=monobook" title="Monobook">Monobook</a></li><li><a href="/wiki/' + mw.config.get('wgPageName') + '?useskin=wikiamobile" title="Wikiamobile">Wikiamobile</a></li></ul></li><li><a href="/wiki/Special:WhatLinksHere/' + mw.config.get('wgPageName') + '" title="What Links Here">What Links Here</a></li><li><a href="/wiki/Special:PrefixIndex/' + mw.config.get('wgPageName') + '" title="Subpages">Subpages</a></li>' + customlinks + '</ul></div></li></ul></li>');
    }
}(jQuery, mediaWiki));

/* </pre> */