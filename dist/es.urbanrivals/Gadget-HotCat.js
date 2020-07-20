//<source lang="javascript">

/*
  HotCat V2.5

  Ajax-based simple Category manager. Allows adding/removing/changing categories on a page view.
  Supports multiple category changes, as well as redirect and disambiguation resolution. Also
  plugs into the upload form. Search engines to use for the suggestion list are configurable, and
  can be selected interactively.

  Authors:
    V0.0: July 2007 - 2010-05-26: original version by [[User:Magnus Manske]], with lots of
          additions by many editors, notably [[User:Dschwen]], [[User:TheDJ]], [[User:Superm401]],
          and [[User:Lupo]]. No explicit license, assumed multi-licensed GFDL and CC-BY-SA-3.0 per
          normal wiki submissions.
    V2.0: April-May 2010: [[User:Lupo]]. Complete rewrite reusing only a little code from V0.0.
    V2.1: May 2010: [[User:Merlissimo]] (added features: namespace case insensitive, subcategory
          engine, category template mapping for removing; developed at de-Wikipedia.)
    V2.2: May 2010: [[User:Lupo]] (porting additions from de-WP to the Commons, auto-localization
          of template namespace name, cleanup, various other improvements. New features:
          highlighting of changed categories, enabling/disabling save button, search engine name
          localization, parent category engine).
    V2.3: Aug 2010: [[User:Lupo]]: page up/down for scrolling in suggestion lists; suggestion list
          size configurable; minor bug fixes.
    V2.4: Oct 2010: [[User:TheDJ]] & [[User:Lupo]]: switch to not enable on upload form, ability to
          load translations from the Commons. Major/minor edit flag configurable; and fix a minor
          bug with the "Warn upon empty edit summary" user preference.
    V2.5: Jan 2011: [[User:Lupo]]: blacklist

  License: Quadruple licensed GFDL, GPL, LGPL and Creative Commons Attribution 3.0 (CC-BY-3.0)
 
  Choose whichever license of these you like best :-)
*/

// Globals:
//  (inline script on the page):
//    wgNamespaceNumber, wgCanonicalSpecialPageName, wgNamespaceIds (optional), wgFormattedNamespaces (optional)
//    wgScript, wgServer, wgArticlePath, wgScriptPath, wgAction, wgPageName, wgTitle, wgUserName, wgIsArticle,
//    wgArticleId
//  ajax.js
//    sajax_init_object
//  wikibits.js
//    addOnloadHook, window.ie6_bugs, window.is_safari, window.is_opera, importScript

if (typeof (HotCat) == 'undefined') { // Guard against double inclusions
    
// Configuration stuff.
var HotCat = {
  isCommonsVersion : true
    // If you copy HotCat to your wiki, you should set this to false!

  // Localize these messages to the main language of your wiki.
  ,messages :
    { cat_removed  : 'removed [[Category:$1]]'
     ,template_removed  : 'removed {{[[Category:$1]]}}'
     ,cat_added    : 'added [[Category:$1]]'
     ,cat_keychange: 'new key for [[Category:$1]]: '
     ,cat_notFound : 'Category "$1" not found'
     ,cat_exists   : 'Category "$1" already exists; not added.'
     ,cat_resolved : ' (redirect [[Category:$1]] resolved)'
     ,uncat_removed: 'removed {{uncategorized}}'
     ,prefix       : ""
        // Some text to prefix to the edit summary.
     ,using        : ' using [[Help:Gadget-HotCat|HotCat]]'
        // Some text to append to the edit summary. Named 'using' for historical reasons. If you prefer
        // to have a marker at the front, use prefix and set this to the empty string.
     ,multi_change : '$1 categories'
        // $1 is replaced by a number
     ,commit       : 'Save'
        // Button text. Localize to wgContentLanguage here; localize to wgUserLanguage in a subpage,
        // see localization hook below.
     ,ok           : 'OK'
        // Button text. Localize to wgContentLanguage here; localize to wgUserLanguage in a subpage,
        // see localization hook below.
     ,cancel       : 'Cancel'
        // Button text. Localize to wgContentLanguage here; localize to wgUserLanguage in a subpage,
        // see localization hook below.
     ,multi_error  : 'Could not retrieve the page text from the server. Therefore, your category changes '
                    +'cannot be saved. We apologize for the inconvenience.'
        // Localize to wgContentLanguage here; localize to wgUserLanguage in a subpage,
        // see localization hook below.
    }
 ,category_regexp    : '[Cc][Aa][Tt][Ee][Gg][Oo][Rr][Yy]'
   // Regular sub-expression matching all possible names for the category namespace. Is automatically localized
   // correctly if you're running MediaWiki 1.16 or later. Otherwise, set it appropriately, e.g. at the German
   // Wikipedia, use '[Cc][Aa][Tt][Ee][Gg][Oo][Rr][Yy]|[Kk][Aa][Tt][Ee][Gg][Oo][Rr][Ii][Ee]', or at the
   // Chinese Wikipedia, use '[Cc][Aa][Tt][Ee][Gg][Oo][Rr][Yy]|分类|分類'. Note that namespaces are case-
   // insensitive!
 ,category_canonical : 'Category'
   // The standard category name on your wiki. Is automatically localized correctly if you're running
   // MediaWiki 1.16 or later; otherwise, set it to the preferred category name (e.g., "Kategorie").
 ,categories         : 'Categories'
   // Plural of category_canonical
 ,disambig_category  : 'Disambiguation'
   // Any category in this category is deemed a disambiguation category; i.e., a category that should not contain
   // any items, but that contains links to other categories where stuff should be categorized. If you don't have
   // that concept on your wiki, set it to null.
 ,redir_category     : 'Category redirects'
   // Any category in this category is deemed a (soft) redirect to some other category defined by the first link
   // to another category. If your wiki doesn't have soft category redirects, set this to null.
 ,links : {change: '(±)', remove: '(−)', add: '(+)', restore: '(×)', undo: '(×)', down: '(↓)', up: '(↑)'}
   // The little modification links displayed after category names.
 ,tooltips : {
    change:  'Modify'
   ,remove:  'Remove'
   ,add:     'Add a new category'
   ,restore: 'Undo changes'
   ,undo:    'Undo changes'
   ,down:    'Open for modifying and display subcategories'
   ,up:      'Open for modifying and display parent categories'
  }
   // The tooltips for the above links
 ,addmulti           : '<span>+<sup>+</sup></span>'
   // The HTML content of the "enter multi-mode" link at the front.
 ,multi_tooltip      : 'Modify several categories'
   // Tooltip for the "enter multi-mode" link
 ,disable            :
    function () { // Return true to disable HotCat
      return (   wgNamespaceNumber < 0   // Special pages; Special:Upload is handled differently
              || wgNamespaceNumber == 10 // Templates
              || wgNamespaceNumber == 8  // MediaWiki
              || wgNamespaceNumber == 2
                 && wgTitle && wgTitle.length >= 3 && wgTitle.lastIndexOf ('.js') + 3 == wgTitle.length
                 // User scripts
              || typeof (wgNamespaceIds) != 'undefined'
                 && (   wgNamespaceNumber == wgNamespaceIds['creator']
                     || wgNamespaceNumber == wgNamespaceIds['timedtext']
                    )
             );
    }
 ,uncat_regexp : /\{\{\s*([Uu]ncat(egori[sz]ed( image)?)?|[Nn]ocat|[Nn]eedscategory)[^}]*\}\}\s*(<\!--.*?--\>)?/g
   // A regexp matching a templates used to mark uncategorized pages, if your wiki does have that.
   // If not, set it to null.
 ,existsYes    : 'http://upload.wikimedia.org/wikipedia/commons/thumb/b/be/P_yes.svg/20px-P_yes.svg.png'
 ,existsNo     : 'http://upload.wikimedia.org/wikipedia/commons/thumb/4/42/P_no.svg/20px-P_no.svg.png'
   // The images used for the little indication icon. Should not need changing.
 ,template_regexp    : '[Tt][Ee][Mm][Pp][Ll][Aa][Tt][Ee]'
   // Regexp to recognize templates. Like "category" above; autolocalized for MW 1.16+, otherwise set manually here.
   // On the German Wikipedia, you might use '[Tt][Ee][Mm][Pp][Ll][Aa][Tt][Ee]|[Vv][Oo][Rr][Ll][Aa][Gg][Ee]'.
 ,template_categories : {}
   // a list of categories which can be removed by removing a template
   // key: the category without namespace
   // value: A regexp matching the template name, again without namespace
   // If you don't have this at your wiki, or don't want this, set it to an empty object {}.
 ,engine_names : {
    searchindex : 'Search index'
   ,pagelist    : 'Page list'
   ,combined    : 'Combined search'
   ,subcat      : 'Subcategories'
   ,parentcat   : 'Parent categories'
  }
   // Names for the search engines
 ,capitalizePageNames : true
   // Set to false if your wiki has case-sensitive page names. MediaWiki has two modes: either the first letter
   // of a page is automatically capitalized ("first-letter"; Category:aa == Category:Aa), or it isn't
   // ("case-sensitive"; Category:aa != Category:Aa). It doesn't currently have a fully case-insensitive mode
   // (which would mean Category:aa == Category:Aa == Category:AA == Category:aA)
   // HotCat tries to set this corretcly automatically using an API query. It's still a good idea to manually
   // configure it correctly; either directly here if you copied HotCat, or in the local configuration file
   // MediaWiki:Gadget-HotCat.js/local_defaults if you hotlink to the Commons-version, to ensure it is set even
   // if that API query should fail for some strange reason.
 ,upload_disabled : false
   // If upload_disabled is true, HotCat will not be used on the Upload form.
 ,blacklist : null
   // Single regular expression matching blacklisted categories that cannot be changed or
   // added using HotCat. For instance /\bstubs?$/ (any category ending with the word "stub"
   // or "stubs"), or /(\bstubs?$)|\bmaintenance\b/ (stub categories and any category with the
   // word "maintenance" in its title.

  // Stuff changeable by users:
 ,bg_changed : '#F8CCB0'
   // Background for changed categories in multi-edit mode. Default is a very light salmon pink.
 ,no_autocommit : false
   // If true, HotCat will never automatically submit changes. HotCat will only open an edit page with
   // the changes; users must always save explicitly.
 ,suggest_delay : 100
   // Time, in milliseconds, that HotCat waits after a keystroke before making a request to the
   // server to get suggestions.
 ,editbox_width : 40
   // Default width, in characters, of the text input field.
 ,suggestions : 'combined'
   // One of the engine_names above, to be used as the default suggestion engine.
 ,fixed_search : false
   // If true, always use the default engine, and never display a selector.
 ,use_up_down : true
   // If false, do not display the "up" and "down" links
 ,list_size : 5
   // Default list size
 ,single_minor : true
   // If true, single category changes are marked as minor edits. If false, they're not.
};

if (HotCat.isCommonsVersion && wgServer.indexOf ('/commons') < 0) {
  // We're running in some other wiki, which hotlinks to the Commons version. The other wiki can put local settings
  // in this file to override the Commons settings for all user languages. For instance, if on your wiki people do
  // not like automatic saving, you'd add in that file the line HotCat.no_autocommit = true; If you hotlink, you
  // *must* adapt HotCat.categories in this file to the local translation in wgContentLanguage of your wiki of the
  // English plural "Categories", and you should provide translations in wgContentLanguage of your wiki of all messages,
  // tooltips, and of the engine names. 
  importScript ('MediaWiki:Gadget-HotCat.js/local_defaults');
}

if (wgUserLanguage != 'en') {
  if (window.hotcat_translations_from_commons && wgServer.indexOf ('/commons') < 0) {
    importScriptURI (
      ((wgServer.indexOf( "https://secure.wikimedia.org") == 0)
         ? '/wikipedia/commons/w/index.php?title='
         : 'http://commons.wikimedia.org/w/index.php?title='
      )
      + 'MediaWiki:Gadget-HotCat.js/' + wgUserLanguage
      + '&action=raw&ctype=text/javascript&smaxage=21600&maxage=86400'
    );
  } else {
    // Load translations locally
    importScript ('MediaWiki:Gadget-HotCat.js/' + wgUserLanguage);
  }
}
// Localization hook to localize HotCat messages, tooltips, and engine names for wgUserLanguage.

// No further changes should be necessary here.
 
(function () {

  // First auto-localize the regexps for the category and the template namespaces.
  if (typeof (wgFormattedNamespaces) != 'undefined') {
    function autoLocalize (namespaceNumber, fallback) {
      function create_regexp_str (name)
      {
        if (!name || name.length == 0) return "";
        var regex_name = "";
        for (var i = 0; i < name.length; i++){
          var initial = name.substr (i, 1);
          var ll = initial.toLowerCase ();
          var ul = initial.toUpperCase ();
          if (ll == ul){
            regex_name += initial;
          } else {
            regex_name += '[' + ll + ul + ']';
          }
        }
        return regex_name.replace (/[ _]/g, '[ _]').replace(/([\\\^\$\.\?\*\+\(\)])/g, '\\$1');
      }

      fallback = fallback.toLowerCase();
      var canonical  = wgFormattedNamespaces["" + namespaceNumber].toLowerCase();
      var regexp     = create_regexp_str (canonical);
      if (fallback && canonical != fallback) regexp += '|' + create_regexp_str (fallback)
      for (var cat_name in wgNamespaceIds) {
        if (   typeof (cat_name) == 'string'
            && cat_name.toLowerCase () != canonical
            && cat_name.toLowerCase () != fallback
            && wgNamespaceIds[cat_name] == namespaceNumber)
        {
          regexp += '|' + create_regexp_str (cat_name);
        }
      }
      return regexp;
    }

    if (wgFormattedNamespaces['14']) {
      HotCat.category_canonical = wgFormattedNamespaces['14'];
      HotCat.category_regexp = autoLocalize (14, 'category');
    }
    if (wgFormattedNamespaces['10']) {
      HotCat.template_regexp = autoLocalize (10, 'template');
    }
  }
  
  // Utility functions. Yes, this duplicates some functionality that also exists in other places, but
  // to keep this whole stuff in a single file not depending on any other on-wiki Javascripts, we re-do
  // these few operations here.
  function bind (func, target) {
    var f = func, tgt = target;
    return function () { return f.apply (tgt, arguments); };
  }
  function make (arg, literal) {
    if (!arg) return null;
    return literal ? document.createTextNode (arg) : document.createElement (arg);
  }
  function param (name, uri) {
    if (typeof (uri) == 'undefined' || uri === null) uri = document.location.href;
    var re = RegExp ('[&?]' + name + '=([^&#]*)');
    var m = re.exec (uri);
    if (m && m.length > 1) return decodeURIComponent(m[1]);
    return null;
  }
  function title (href) {
    if (!href) return null;
    var script = wgScript + '?';
    if (href.indexOf (script) == 0 || href.indexOf (wgServer + script) == 0) {
      // href="/w/index.php?title=..."
      return param ('title', href);
    } else {
      // href="/wiki/..."
      var prefix = wgArticlePath.replace ('$1', "");
      if (href.indexOf (prefix) != 0) prefix = wgServer + prefix; // Fully expanded URL?
      if (href.indexOf (prefix) == 0)
        return decodeURIComponent (href.substring (prefix.length));
    }
    return null;
  }
  function hasClass (elem, name) {
    return (' ' + elem.className + ' ').indexOf (' ' + name + ' ') >= 0;
  }
  function capitalize (str) {
    if (!str || str.length == 0) return str;
    return str.substr(0, 1).toUpperCase() + str.substr (1);
  }
  function wikiPagePath (pageName) {
    // Note: do not simply use encodeURI, it doesn't encode '&', which might break if wgArticlePath catually has the $1 in
    // a query parameter.
    return wgArticlePath.replace('$1', encodeURIComponent (pageName).replace(/%3A/g, ':').replace(/%2F/g, '/'));
  }

  // Text modification
  
  var findCatsRE =
    new RegExp ('\\[\\[\\s*(?:' + HotCat.category_regexp + ')\\s*:\[^\\]\]+\\]\\]', 'g');
  
  function replaceByBlanks (match) {
    return match.replace(/(\s|\S)/g, ' '); // /./ doesn't match linebreaks. /(\s|\S)/ does.
  }

  function find_category (wikitext, category, once) {
    var cat_regex = null;
    if(HotCat.template_categories[category]){
      cat_regex = new RegExp ('\\{\\{\\s*(' + HotCat.template_regexp + '(?=\\s*:))?\\s*'
                              + '(?:' + HotCat.template_categories[category] + ')'
                              + '\\s*(\\|.*?)?\\}\\}', 'g'
                             );
    } else {
      var cat_name  = category.replace(/([\\\^\$\.\?\*\+\(\)])/g, '\\$1');
      var initial   = cat_name.substr (0, 1);
      cat_regex = new RegExp ('\\[\\[\\s*(' + HotCat.category_regexp + ')\\s*:\\s*'
                              + (initial == '\\' || !HotCat.capitalizePageNames
                                 ? initial
                                 : '[' + initial.toUpperCase() + initial.toLowerCase() + ']')
                              + cat_name.substring (1).replace (/[ _]/g, '[ _]')
                              + '\\s*(\\|.*?)?\\]\\]', 'g'
                             );
    }
    if (once) return cat_regex.exec (wikitext);
    var copiedtext = wikitext.replace(/<\!--(\s|\S)*?--\>/g, replaceByBlanks)
                             .replace(/<nowiki\>(\s|\S)*?<\/nowiki>/g, replaceByBlanks);
    var result = [];
    var curr_match = null;
    while ((curr_match = cat_regex.exec (copiedtext)) != null) {
      result.push ({match : curr_match});
    }
    result.re = cat_regex;
    return result; // An array containing all matches, with positions, in result[i].match
  }

  function change_category (wikitext, toRemove, toAdd, key) {

    function find_insertionpoint (wikitext) {        
      var copiedtext = wikitext.replace(/<\!--(\s|\S)*?--\>/g, replaceByBlanks)
                               .replace(/<nowiki\>(\s|\S)*?<\/nowiki>/g, replaceByBlanks);
      // Search in copiedtext to avoid that we insert inside an HTML comment or a nowiki "element".
      var index = -1;
      findCatsRE.lastIndex = 0;
      while (findCatsRE.exec(copiedtext) != null) index = findCatsRE.lastIndex; 
      // We should try to find interwiki links here, but that's for later.
      return index;
    }

    var summary   = [];
    var nameSpace = HotCat.category_canonical;
    var cat_point = -1; // Position of removed category;
  
    if (key) key = '|' + key;
    var keyChange = (toRemove && toAdd && toRemove == toAdd && toAdd.length > 0);
    if (toRemove && toRemove.length > 0) {
      var matches = find_category (wikitext, toRemove);
      if (!matches || matches.length == 0) {
        return {text: wikitext, 'summary': summary, error: HotCat.messages.cat_notFound.replace (/\$1/g, toRemove)};
      } else {
        var before = wikitext.substring (0, matches[0].match.index);
        var after  = wikitext.substring (matches[0].match.index + matches[0].match[0].length);
        if (matches.length > 1) {
          // Remove all occurrences in after
          matches.re.lastIndex = 0;
          after = after.replace (matches.re, "");
        }
        if (toAdd) {
          nameSpace = matches[0].match[1] || nameSpace;
          if (key == null) key = matches[0].match[2]; // Remember the category key, if any.
        }
        // Remove whitespace (properly): strip whitespace, but only up to the next line feed.
        // If we then have two linefeeds in a row, remove one. Otherwise, if we have two non-
        // whitespace characters, insert a blank.
        var i = before.length - 1;
        while (i >= 0 && before.charAt (i) != '\n' && before.substr (i, 1).search (/\s/) >= 0) i--;
        var j = 0;
        while (j < after.length && after.charAt (j) != '\n' && after.substr (j, 1).search (/\s/) >= 0)
          j++;
        if (i >= 0 && before.charAt (i) == '\n' && (after.length == 0 || j < after.length && after.charAt (j) == '\n'))
          i--;
        if (i >= 0) before = before.substring (0, i+1); else before = "";
        if (j < after.length) after = after.substring (j); else after = "";
        if (before.length > 0 && before.substring (before.length - 1).search (/\S/) >= 0
            && after.length > 0 && after.substr (0, 1).search (/\S/) >= 0)
          before += ' ';
        cat_point = before.length;
        wikitext = before + after;
        if (!keyChange) {
          if(HotCat.template_categories[toRemove]) {
            summary.push (HotCat.messages.template_removed.replace (/\$1/g, toRemove));
          } else {     
            summary.push (HotCat.messages.cat_removed.replace (/\$1/g, toRemove));
          }
        }
      }
    }
    if (toAdd && toAdd.length > 0) {
      var matches = find_category (wikitext, toAdd);
      if (matches && matches.length > 0) {
        return {text: wikitext, 'summary': summary, error : HotCat.messages.cat_exists.replace (/\$1/g, toAdd)};
      } else {
        if (cat_point < 0)
          cat_point = find_insertionpoint (wikitext);
        var newcatstring = '[[' + nameSpace + ':' + toAdd + (key || "") + ']]';
        if (cat_point >= 0) {
          wikitext = wikitext.substring (0, cat_point) + '\n' + newcatstring + wikitext.substring (cat_point);
        } else {
          if (wikitext.length > 0 && wikitext.substr (wikitext.length - 1, 1) != '\n')
            wikitext += '\n';
          wikitext += newcatstring;
        }
        if (keyChange) {
          var k = key || "";
          if (k.length > 0) k = k.substr (1);
          summary.push (HotCat.messages.cat_keychange.replace (/\$1/g, toAdd) + '"' + k + '"');
        } else {
          summary.push (HotCat.messages.cat_added.replace (/\$1/g, toAdd));
        }
        if (HotCat.uncat_regexp) {
          var txt = wikitext.replace (HotCat.uncat_regexp, ""); // Remove "uncat" templates
          if (txt.length != wikitext.length) {
            wikitext = txt;
            summary.push (HotCat.messages.uncat_removed);
          }
        }
      }
    }
    return {text: wikitext, 'summary': summary, error: null};
  }
  
  if (wgAction == 'edit') {
    // Legacy code based on URI parameters, can add/remove/change only one single category. Still
    // used for single-category changes.
    var toRemove = param ('hotcat_removecat');
    var toAdd    = param ('hotcat_newcat');
    if (toAdd) {
      toAdd = toAdd.replace (/_/g, ' ').replace (/^\s+|\s+$/g, "");
      if (toAdd.length == 0) toAdd = null;
    }
    if (toRemove) {
      toRemove = toRemove.replace (/_/g, ' ').replace (/^\s+|\s+$/g, "");
      if (toRemove.length == 0) toRemove = null;
    }
    if (toAdd || toRemove) {
      addOnloadHook (function () {
        if (!document.editform || !document.editform.wpTextbox1) return;
        var isMajor  = param ('hotcat_major') == '1';
        var comment = param ('hotcat_comment') || "";
        var cat_key = param ('hotcat_sortkey');
        var result = change_category (document.editform.wpTextbox1.value, toRemove, toAdd, cat_key);
        var do_commit = !HotCat.noCommit && !result.error && param ('hotcat_nocommit') != '1';
        document.editform.wpTextbox1.value    = result.text;
        if (result.summary && result.summary.length > 0)
          document.editform.wpSummary.value     = HotCat.messages.prefix + result.summary.join ('; ') + comment + HotCat.messages.using;
        if (document.editform.wpMinoredit.checked) {
          // User must have "Mark all edits minor" enabled (or some other script set it...) URL param overrides
          // default setting.
          if (isMajor) document.editform.wpMinoredit.checked = false;
        } else {
          // Minor unless URL parameter present (for legacy compatibility: previously, all single-category changes
          // were always minor).
          document.editform.wpMinoredit.checked = !isMajor;
        }
        if (result.error) alert (result.error);
        if (do_commit) {
          // Hide the entire edit section so as not to tempt the user into editing...
          var content =    document.getElementById ('bodyContent')       // monobook & vector skin
                        || document.getElementById ('mw_contentholder')  // modern skin
                        || document.getElementById ('article');          // classic skins
          if (content) content.style.display = 'none';
          // MW1.17 has an annoying warning alert that somehow triggers when we submit.
          window.onbeforeunload = null;
          document.editform.submit();
        }    
      });
    }
    return;
  }
  
  // The real HotCat UI
  
  function evtKeys (e) {
    e = e || window.event || window.Event; // W3C, IE, Netscape
    var code = 0;
    if (typeof (e.ctrlKey) != 'undefined') { // All modern browsers
      // Ctrl-click seems to be overloaded in FF/Mac (it opens a pop-up menu), so treat cmd-click
      // as a ctrl-click, too.
      if (e.ctrlKey || e.metaKey)  code |= 1;
      if (e.shiftKey) code |= 2;
    } else if (typeof (e.modifiers) != 'undefined') { // Netscape...
      if (e.modifiers & (Event.CONTROL_MASK | Event.META_MASK)) code |= 1;
      if (e.modifiers & Event.SHIFT_MASK) code |= 2;
    }
    return code;
  }
  function evtKill (e) {
    e = e || window.event || window.Event; // W3C, IE, Netscape
    if (typeof (e.preventDefault) != 'undefined') {
      e.preventDefault ();
      e.stopPropagation ();
    } else
      e.cancelBubble = true;
    return false;
  }
  
  var catLine      = null;
  var onUpload     = false;    
  var editors      = [];
  
  var commitButton = null;
  var commitForm   = null;
  var multiSpan    = null;

  var pageText     = null;
  var pageTime     = null;
  var pageWatched  = false;
  var watchCreate  = false;
  var watchEdit    = false;
  var minorEdits   = false;

  var is_rtl       = false;
  var serverTime   = null;

  function setMultiInput () {
    if (commitButton || onUpload) return;
    commitButton = make ('input');
    commitButton.type  = 'button';
    commitButton.value = HotCat.messages.commit;
    commitButton.onclick = multiSubmit;
    if (multiSpan) {
      multiSpan.parentNode.replaceChild (commitButton, multiSpan);
    } else {
      catLine.appendChild (commitButton);
    }
    // Get the preferences, so that we can set wpWatchthis correctly later on. Also get information
    // about whether the current user watches the page. Must use Ajax here.
    if (wgUserName) {
      var request = sajax_init_object ();      
      request.open
        ('GET', wgServer + wgScriptPath + '/api.php?format=json&action=query&meta=userinfo&uiprop=options&prop=info&inprop=watched&titles=' + encodeURIComponent (wgPageName), true);
      request.onreadystatechange =
        function () {
          if (request.readyState != 4) return;
          if (request.status == 200 && request.responseText && /^\s*\{/.test(request.responseText)) {
            var json = eval ('(' + request.responseText + ')');
            if (json && json.query) {
              if (json.query.userinfo && json.query.userinfo.options) {
                watchCreate = json.query.userinfo.options.watchcreations == '1';
                watchEdit   = json.query.userinfo.options.watchdefault == '1';
                minorEdits  = json.query.userinfo.options.minordefault == 1;
                // If the user has the "All edits are minor" preference enabled, we should honor that
                // for single category changes, no matter what the site configuration is.
                if (minorEdits) HotCat.single_minor = true;
              }
              if (json.query.pages) {
                for (var p in json.query.pages) {
                  pageWatched = typeof (json.query.pages[p].watched) == 'string';
                  break;
                }
              }
            }            
          }
        };
      request.setRequestHeader ('Pragma', 'cache=yes');
      request.setRequestHeader ('Cache-Control', 'no-transform');
      request.send (null);        
    }
  }
  
  function checkMultiInput () {
    if (!commitButton) return;
    var has_changes = false;
    for (var i = 0; i < editors.length; i++) {
      if (editors[i].state != CategoryEditor.UNCHANGED) {
        has_changes = true;
        break;
      }
    }
    commitButton.disabled = !has_changes;
  }

  function currentTimestamp () {
    var now = new Date();
    var ts  = "" + now.getUTCFullYear();
    function two (s) { return s.substr (s.length - 2); }
    ts = ts
      + two ('0' + (now.getUTCMonth() + 1))
      + two ('0' + now.getUTCDate())
      + two ('00' + now.getUTCHours())
      + two ('00' + now.getUTCMinutes())
      + two ('00' + now.getUTCSeconds());
    return ts;
  }

  function performChanges () {
    // Don't use the edit API or LAPI, it's always bothersome to report back errors like edit
    // conflicts. Instead, make one remote call (blocking, because we can't continue anyway if
    // it doesn't succeed), getting the page text. Perform the changes on the text, then construct
    // a form to submit all this as a diff.
    // Note: we have to do this even if we already got the page text. Other scripts may have already
    // edited the text, and we don't necessarily get an edit conflict with ourself. Use case: open
    // a file page, add an image note through ImageAnnotator, then change the categories. If HotCat
    // still operates on the page text loaded initially, it'll delete the just added note again, and
    // somehow the MediaWiki software does not produce an edit conflict.
    if (wgArticleId != 0) {
      var request = sajax_init_object ();
      var uri     = wgServer + wgScriptPath
                  + '/api.php?format=json&action=query&titles=' + encodeURIComponent (wgPageName)
                  + '&prop=info%7Crevisions&inprop=watched&rvprop=content%7Ctimestamp&meta=siteinfo';
      request.open ('GET', uri, false); // Yes, synchronous
      request.send (null);
      if (request.status == 200 && request.responseText && /^\s*\{/.test (request.responseText)) {
        setPage (eval ('(' + request.responseText + ')'));
      } else {
        pageText = null;
      }
    }
    if (pageText === null) {
      alert (HotCat.messages.multi_error);
      return;
    }
    // Create a form and submit it
    if (!commitForm) {
      var formContainer = make ('div');
      formContainer.style.display = 'none';
      document.body.appendChild (formContainer);
      formContainer.innerHTML =
          '<form method="post" enctype="multipart/form-data" action="'
        + wgScript + '?title=' + encodeURIComponent (wgPageName)
        + '&action=edit">'
        + '<input type="hidden" name="wpTextbox1" />'
        + '<input type="hidden" name="wpSummary" value="" />'
        + '<input type="checkbox" name="wpMinoredit" value="1" />'
        + '<input type="checkbox" name="wpWatchthis" value="1" />'
        + '<input type="hidden" name="wpAutoSummary" value="" />'
        + '<input type="hidden" name="wpEdittime" />'
        + '<input type="hidden" name="wpStarttime" />'
        + '<input type="hidden" name="wpDiff" value="wpDiff" />'
        + '</form>';
      commitForm = formContainer.firstChild;
    }
    var result = { text : pageText };
    var changed = [], added = [], deleted = [], changes = 0;
    for (var i=0; i < editors.length; i++) {
      if (editors[i].state == CategoryEditor.CHANGED) {
        result = change_category (
            result.text
          , editors[i].originalCategory
          , editors[i].currentCategory
          , editors[i].currentKey
        );
        if (!result.error) {
          changes++;
          if (!editors[i].originalCategory || editors[i].originalCategory.length == 0) {
            added.push (editors[i].currentCategory);
          } else {
            changed.push ({from : editors[i].originalCategory, to : editors[i].currentCategory});
          }
        }
      } else if (   editors[i].state == CategoryEditor.DELETED
                 && editors[i].originalCategory
                 && editors[i].originalCategory.length > 0)
      {
        result = change_category (result.text, editors[i].originalCategory, null, null);
        if (!result.error) {
          changes++;
          deleted.push (editors[i].originalCategory);
        }
      }
    }
    if (changes == 0) return;
    // Fill in the form and submit it
    commitForm.wpAutoSummary.value = 'd41d8cd98f00b204e9800998ecf8427e'; // MD5 hash of the empty string
    commitForm.wpMinoredit.checked = minorEdits;
    commitForm.wpWatchthis.checked = wgArticleId == 0 && watchCreate || watchEdit || pageWatched;
    if (wgArticleId > 0) {
      if (changes == 1) {
        if (result.summary && result.summary.length > 0)
          commitForm.wpSummary.value = HotCat.messages.prefix + result.summary.join ('; ') + HotCat.messages.using;
        commitForm.wpMinoredit.checked = HotCat.single_minor || minorEdits;
      } else if (changes > 1) {
        var summary = [];
        var shortSummary = [];
        // Deleted
        for (var i=0; i < deleted.length; i++) {
          summary.push ('−[[' + HotCat.category_canonical + ':' + deleted[i] + ']]');
        }
        if (deleted.length == 1)
          shortSummary.push ('−[[' + HotCat.category_canonical + ':' + deleted[0] + ']]');
        else if (deleted.length > 1)
          shortSummary.push ('− ' + HotCat.messages.multi_change.replace ('$1', "" + deleted.length));
        // Added
        for (var i=0; i < added.length; i++) {
          summary.push ('+[[' + HotCat.category_canonical + ':' + added[i] + ']]');
        }
        if (added.length == 1)
          shortSummary.push ('+[[' + HotCat.category_canonical + ':' + added[0] + ']]');
        else if (added.length > 1)
          shortSummary.push ('+ ' + HotCat.messages.multi_change.replace ('$1', "" + added.length));
        // Changed
        var arrow = "]]→[[";
        if (is_rtl) arrow = "]]←[[";
        for (var i=0; i < changed.length; i++) {
          if (changed[i].from != changed[i].to) {
            summary.push ('±[[' + HotCat.category_canonical + ':' + changed[i].from + arrow
                         + HotCat.category_canonical + ':' + changed[i].to + ']]');
          } else {
            summary.push ('±[[' + HotCat.category_canonical + ':' + changed[i].from + ']]');
          }
        }
        if (changed.length == 1) {
          if (changed[0].from != changed[0].to) {
            shortSummary.push ('±[[' + HotCat.category_canonical + ':' + changed[0].from + arrow
                         + HotCat.category_canonical + ':' + changed[0].to + ']]');
          } else {
            shortSummary.push ('±[[' + HotCat.category_canonical + ':' + changed[0].from + ']]');
          }
        } else if (changed.length > 1) {
          shortSummary.push ('± ' + HotCat.messages.multi_change.replace ('$1', "" + changed.length));
        }
        if (summary.length > 0) {
          summary = summary.join ('; ');
          if (summary.length > 200 - HotCat.messages.prefix.length - HotCat.messages.using.length) {
            summary = shortSummary.join ('; ');
          }
          commitForm.wpSummary.value = HotCat.messages.prefix + summary + HotCat.messages.using;
        }
      }
    }
    commitForm.wpTextbox1.value = result.text;
    commitForm.wpStarttime.value = serverTime || currentTimestamp ();
    commitForm.wpEdittime.value = pageTime || commitForm.wpStarttime.value;
    commitForm.submit();
  }

  function resolveMulti (toResolve, callback) {
    for (var i = 0; i < toResolve.length; i++) {
      toResolve[i].dab = null;
      toResolve[i].dabInput = toResolve[i].lastInput;
    }
    if (noSuggestions) {
      callback (toResolve);
      return;
    }
    var request = sajax_init_object ();
    if (!request) {
      noSuggestions = true;
      callback (toResolve);
      return;
    }
    var url = wgServer + wgScriptPath + '/api.php';
    // Use %7C instead of |, otherwise Konqueror insists on re-encoding the arguments, resulting in doubly encoded
    // category names. (That is a bug in Konqueror. Other browsers don't have this problem.)
    var args = 'action=query&prop=info%7Clinks%7Ccategories&plnamespace=14&pllimit=50'
             + '&cllimit=' + (toResolve.length * 10) // Category limit is global, link limit is per page
             + '&format=json&titles=';
    for (var i = 0; i < toResolve.length; i++) {
      args += encodeURIComponent ('Category:' + toResolve[i].dabInput);
      if (i+1 < toResolve.length) args += '%7C';
    }
    if (url.length + args.length + 1 > 2000) { // Lowest common denominator: IE has a URI length limit of 2083
      request.open ('POST', url, true);
      request.setRequestHeader ('Content-Type', 'application/x-www-form-urlencoded');
    } else {
      url += '?' + args; args = null;
      request.open ('GET', url, true);
    }
    request.onreadystatechange =
      function () {
        if (request.readyState != 4) return;
        if (request.status != 200 || !request.responseText || !/^\s*\{/.test (request.responseText)) {
          callback (toResolve);
          return;
        }
        resolveRedirects (toResolve, eval ('(' + request.responseText + ')'));
        callback (toResolve);
      };
    request.setRequestHeader ('Pragma', 'cache=yes');
    request.setRequestHeader ('Cache-Control', 'no-transform');
    request.send (args);        
  }
    
  function resolveOne (page, toResolve) {
    var cats     = page.categories;
    var lks      = page.links;
    var is_dab   = false;
    var is_redir = typeof (page.redirect) == 'string'; // Hard redirect?
    if (!is_redir && cats && (HotCat.disambig_category || HotCat.redir_category)) {
      for (var c = 0; c < cats.length; c++) {
        var cat = cats[c]['title'];
        // Strip namespace prefix
        if (cat) {
          cat = cat.substring (cat.indexOf (':') + 1).replace(/_/g, ' ');
          if (cat == HotCat.disambig_category) {
            is_dab = true; break;
          } else if (cat == HotCat.redir_category) {
            is_redir = true; break;
          }
        }
      }
    }
    if (!is_redir && !is_dab) return;
    if (!lks || lks.length == 0) return;
    var titles = [];
    for (var i = 0; i < lks.length; i++) {
      if (   lks[i]['ns'] == 14                             // Category namespace
          && lks[i]['title'] && lks[i]['title'].length > 0) // Name not empty
      {
        // Internal link to existing thingy. Extract the page name and remove the namespace.
        var match = lks[i]['title'];
        titles.push (match.substring (match.indexOf (':') + 1));
        if (is_redir) break;
      }
    }
    for (var j = 0; j < toResolve.length; j++) {
      if (toResolve[j].dabInput != page.title.substring (page.title.indexOf (':') + 1)) continue;
      if (titles.length > 1) {
        toResolve[j].dab = titles;
      } else {
        toResolve[j].inputExists = true; // Might actually be wrong...
        toResolve[j].icon.src = HotCat.existsYes;
        toResolve[j].text.value =
          titles[0] + (toResolve[j].currentKey != null ? '|' + toResolve[j].currentKey : "");
      }
    }
  }

  function resolveRedirects (toResolve, params) {
    if (!params || !params.query || !params.query.pages) return;      
    for (var p in params.query.pages) resolveOne (params.query.pages[p], toResolve);
  }
  
  function multiSubmit () {
    var toResolve = [];
    for (var i = 0; i < editors.length; i++) {
      if (editors[i].state == CategoryEditor.CHANGE_PENDING || editors[i].state == CategoryEditor.OPEN)
        toResolve.push (editors[i]);
    }
    if (toResolve.length == 0) {
      performChanges ();
      return;
    }
    resolveMulti (
        toResolve
      , function (resolved) {
          var firstDab = null;
          var dontChange = false;
          for (var i = 0; i < resolved.length; i++) {
            if (resolved[i].lastInput != resolved[i].dabInput) {
              // We didn't disable all the open editors, but we did asynchronous calls. It is
              // theoretically possible that the user changed something...
              dontChange = true;
            } else {
              if (resolved[i].dab) {
                if (!firstDab) firstDab = resolved[i];
              } else {
                if (resolved[i].acceptCheck(true)) resolved[i].commit();
              }
            }
          }
          if (firstDab) {
            CategoryEditor.makeActive (firstDab);
          } else if (!dontChange) {
            performChanges ();
          }
        }
    );
  }

  var cat_prefix = null;
  var noSuggestions = false;
  var suggestionEngines = {
    opensearch :
      { uri     : '/api.php?format=json&action=opensearch&namespace=14&limit=30&search=Category:$1' // $1 = search term
       ,handler : // Function to convert result of uri into an array of category names
          function (responseText, queryKey) {
            if (!/^\s*\[/.test (responseText)) return null;
            var queryResult = eval ('(' + responseText + ')');
            if (   queryResult != null && queryResult.length == 2
                && queryResult[0].toLowerCase() == 'category:' + queryKey.toLowerCase()
               )
            {
              var titles = queryResult[1];
              if (!cat_prefix) cat_prefix = new RegExp ('^(' + HotCat.category_regexp + ':)');
              for (var i = 0; i < titles.length; i++) {
                cat_prefix.lastIndex = 0;
                var m = cat_prefix.exec (titles[i]);
                if (m && m.length > 1) {
                  titles[i] = titles[i].substring (titles[i].indexOf (':') + 1); // rm namespace
                } else {
                  titles.splice (i, 1); // Nope, it's not a category after all.
                  i--;
                }
              }
              return titles;
            }
            return null;      
          }
      }
    ,internalsearch :
      { uri     : '/api.php?format=json&action=query&list=allpages&apnamespace=14&aplimit=30&apfrom=$1'
       ,handler : 
          function (responseText, queryKey) {
            if (!/^\s*\{/.test (responseText)) return null;
            var queryResult = eval ('(' + responseText + ')');
            if (queryResult && queryResult.query && queryResult.query.allpages) {
              var titles = queryResult.query.allpages;
              var key    = queryKey.toLowerCase();
              for (var i = 0; i < titles.length; i++) {
                titles[i] = titles[i].title.substring (titles[i].title.indexOf (':') + 1); // rm namespace
                if (titles[i].toLowerCase().indexOf (key) != 0) {
                  titles.splice (i, 1); // Doesn't start with the query key
                  i--;
                }
              }
              return titles;
            }
            return null;
          }
      }
    ,subcategories :
      { uri     : '/api.php?format=json&action=query&list=categorymembers&cmnamespace=14&cmlimit=max&cmtitle=Category:$1'
       ,handler : 
          function (responseText, queryKey) {
            if (!/^\s*\{/.test (responseText)) return null;
            var queryResult = eval ('(' + responseText + ')');
            if (queryResult && queryResult.query && queryResult.query.categorymembers) {
              var titles = queryResult.query.categorymembers;
              for (var i = 0; i < titles.length; i++) {
                titles[i] = titles[i].title.substring (titles[i].title.indexOf (':') + 1); // rm namespace
              }
              return titles;
            }
            return null;
          }
      }
   ,parentcategories :
      { uri     : '/api.php?format=json&action=query&prop=categories&titles=Category:$1&cllimit=max'
       ,handler : 
          function (responseText, queryKey) {
            if (!/^\s*\{/.test (responseText)) return null;
            var queryResult = eval ('(' + responseText + ')');
            if (queryResult && queryResult.query && queryResult.query.pages) {
              for (var p in queryResult.query.pages) {
                if (queryResult.query.pages[p].categories) {
                  var titles = queryResult.query.pages[p].categories;
                  for (var i = 0; i < titles.length; i++) {
                    titles[i] = titles[i].title.substring (titles[i].title.indexOf (':') + 1); // rm namespace
                  }
                  return titles;
                }
              }
            }
            return null;
          }
      }
  };

  var suggestionConfigs = {
    searchindex : {name: 'Search index', engines: ['opensearch'], cache: {}, show: true, temp: false, noCompletion : false}
   ,pagelist    : {name: 'Page list', engines: ['internalsearch'], cache: {}, show: true, temp: false, noCompletion : false}
   ,combined    : {name: 'Combined search', engines: ['opensearch', 'internalsearch'], cache: {}, show: true, temp: false, noCompletion : false}
   ,subcat      : {name: 'Subcategories', engines: ['subcategories'], cache: {}, show: true, temp: true, noCompletion : true}
   ,parentcat   : {name: 'Parent categories', engines: ['parentcategories'], cache: {}, show: true, temp: true, noCompletion : true}
  };

  function CategoryEditor () { this.initialize.apply (this, arguments); };
  CategoryEditor.UNCHANGED      = 0;
  CategoryEditor.OPEN           = 1; // Open, but no input yet
  CategoryEditor.CHANGE_PENDING = 2; // Open, some input made
  CategoryEditor.CHANGED        = 3;
  CategoryEditor.DELETED        = 4;
  
  CategoryEditor.makeActive = function (toActivate) {
    for (var i = 0; i < editors.length; i++) {
      if (editors[i] != toActivate) editors[i].inactivate ();
    }
    toActivate.is_active = true;
    if (toActivate.dab) {
      toActivate.showSuggestions (toActivate.dab, false, null, null); // do autocompletion, no key, no engine selector
      toActivate.dab = null;
    }
  };
  
  CategoryEditor.prototype = {
    
    initialize : function (line, span, after, key) {
      // If a span is given, 'after' is the category title, otherwise it may be an element after which to
      // insert the new span. 'key' is likewise overloaded; if a span is given, it is the category key (if
      // known), otherwise it is a boolean indicating whether a bar shall be prepended.
      if (!span) {
        this.isAddCategory = true;
        // Create add span and append to catLinks
        this.originalCategory = "";
        this.originalKey = null;
        this.originalExists   = false;
        span = make ('span');
        span.className = 'noprint';
        if (key) {
          span.appendChild (make (' | ', true));
          if (after) {
            after.parentNode.insertBefore (span, after.nextSibling);
            after = after.nextSibling;
          } else {
            line.appendChild (span);
          }
        } else if (line.firstChild) {
          span.appendChild (make (' ', true));
          line.appendChild (span);
        }
        this.linkSpan = make ('span');
        this.linkSpan.className = 'noprint hotcatlink';
        var lk = make ('a'); lk.href = '#catlinks'; lk.onclick = bind (this.open, this);
        lk.appendChild (make (HotCat.links.add, true)); lk.title = HotCat.tooltips.add;      
        this.linkSpan.appendChild (lk);
        span = make ('span');
        span.className = 'noprint';
        if (is_rtl) span.dir = 'rtl';
        span.appendChild (this.linkSpan);
        if (after) 
          after.parentNode.insertBefore (span, after.nextSibling);
        else
          line.appendChild (span);
        this.normalLinks = null;
        this.undelLink = null;
        this.catLink = null;
      } else {
        if (is_rtl) span.dir = 'rtl';
        this.isAddCategory = false;
        this.catLink = span.firstChild;
        this.originalCategory = after;
        this.originalKey = (key && key.length > 1) ? key.substr(1) : null; // > 1 because it includes the leading bar
        this.originalExists   = !hasClass (this.catLink, 'new');
        // Create change and del links
        this.makeLinkSpan ();
        if (!this.originalExists && this.upDownLinks) this.upDownLinks.style.display = 'none';
        span.appendChild (this.linkSpan);
      }
      this.line               = line;
      this.engine             = HotCat.suggestions;
      this.span               = span;
      this.currentCategory    = this.originalCategory;
      this.currentExists      = this.originalExists;
      this.currentKey         = this.originalKey;
      this.state              = CategoryEditor.UNCHANGED;
      this.lastSavedState     = CategoryEditor.UNCHANGED;
      this.lastSavedCategory  = this.originalCategory;
      this.lastSavedKey       = this.originalKey;
      this.lastSavedExists    = this.originalExists;
      editors[editors.length] = this;
    },
    
    makeLinkSpan : function () {
      this.normalLinks = make ('span');
      var lk = null;
      if (this.originalCategory && this.originalCategory.length > 0) {
        lk = make ('a'); lk.href = '#catlinks'; lk.onclick = bind (this.remove, this);
        lk.appendChild (make (HotCat.links.remove, true)); lk.title = HotCat.tooltips.remove;
        this.normalLinks.appendChild (make (' ', true));
        this.normalLinks.appendChild (lk);
      }
      if (!HotCat.template_categories[this.originalCategory]) {
        lk = make ('a'); lk.href = '#catlinks'; lk.onclick = bind (this.open, this);
        lk.appendChild (make (HotCat.links.change, true)); lk.title = HotCat.tooltips.change;
        this.normalLinks.appendChild (make (' ', true));
        this.normalLinks.appendChild (lk);
        if (!noSuggestions && HotCat.use_up_down) {
          this.upDownLinks = make ('span');
          lk = make ('a'); lk.href = '#catlinks'; lk.onclick = bind (this.down, this);
          lk.appendChild (make (HotCat.links.down, true)); lk.title = HotCat.tooltips.down;
          this.upDownLinks.appendChild (make (' ', true));
          this.upDownLinks.appendChild (lk);
          lk = make ('a'); lk.href = '#catlinks'; lk.onclick = bind (this.up, this);
          lk.appendChild (make (HotCat.links.up, true)); lk.title = HotCat.tooltips.up;
          this.upDownLinks.appendChild (make (' ', true));
          this.upDownLinks.appendChild (lk);
          this.normalLinks.appendChild (this.upDownLinks);
        }
      }
      this.linkSpan = make ('span');
      this.linkSpan.className = 'noprint hotcatlink';
      this.linkSpan.appendChild (this.normalLinks);
      this.undelLink = make ('span');
      this.undelLink.style.display = 'none';
      lk = make ('a'); lk.href = '#catlinks'; lk.onclick = bind (this.restore, this);
      lk.appendChild (make (HotCat.links.restore, true)); lk.title = HotCat.tooltips.restore;
      this.undelLink.appendChild (make (' ', true));
      this.undelLink.appendChild (lk);
      this.linkSpan.appendChild (this.undelLink);
    },
    
    makeForm : function () {
      var form = make ('form');
      form.method = 'POST'; form.onsubmit = bind (this.accept, this);
      this.form = form;
      
      var text = make ('input'); text.type = 'text'; text.size = HotCat.editbox_width;
      if (!noSuggestions) {
        text.onkeyup =
          bind (
            function (evt) {
              evt = evt || window.event || window.Event; // W3C, IE, Netscape
              var key = evt.keyCode || 0;
              if (key == 38 || key == 40 || key == 33 || key == 34) { // Up and down arrows, page up/down
                // In case a browser doesn't generate keypress events for arrow keys...
                if (this.keyCount == 0) return this.processKey (evt);
              } else {
                if (key == 27) { // ESC
                  if (!this.resetKeySelection ()) {
                    // No undo of key selection: treat ESC as "cancel".
                    this.cancel ();
                    return;
                  }
                }
                // Also do this for ESC as a workaround for Firefox bug 524360
                // https://bugzilla.mozilla.org/show_bug.cgi?id=524360
                var dont_autocomplete = (key == 8 || key == 46 || key == 27); // BS, DEL, ESC
                if (this.engine && suggestionConfigs[this.engine] && suggestionConfigs[this.engine].temp && !dont_autocomplete) {
                  this.engine = HotCat.suggestions; // Reset to a search upon input
                }
                this.state = CategoryEditor.CHANGE_PENDING;
                var self = this;
                window.setTimeout (function () {self.textchange (dont_autocomplete);}, HotCat.suggest_delay);
              }
              return true;
            }
           ,this
          );
        text.onkeydown =
          bind (
            function (evt) {
              evt = evt || window.event || window.Event; // W3C, IE, Netscape
              this.lastKey = evt.keyCode || 0;
              this.keyCount = 0;
              // Handle return explicitly, to override the default form submission to be able to check for ctrl
              if (this.lastKey == 13) this.accept (evt);
              // Inhibit default behavior of ESC (revert to last real input in FF: we do that ourselves)
              if (this.lastKey == 27) return evtKill (evt);
              return true;
            }
           ,this
          );
        // And handle continued pressing of arrow keys
        text.onkeypress = bind (function (evt) {this.keyCount++; return this.processKey (evt);}, this);
      }
      text.onfocus = bind (function () { CategoryEditor.makeActive (this); }, this);
      this.text = text;
      
      this.icon = make ('img');
      
      var list = null;
      if (!noSuggestions) {
        list = make ('select');
        list.onclick    = bind ( function (e) { if (this.highlightSuggestion (0)) this.textchange (false, true); }, this);
        list.ondblclick = bind (function (e) { if (this.highlightSuggestion (0)) this.accept (e); }, this);
        list.onchange = bind (function (e) { this.highlightSuggestion (0); this.text.focus(); }, this);
        list.onkeyup =
          bind (
            function (evt) {
              evt = evt || window.event || window.Event; // W3C, IE, Netscape
              if (evt.keyCode == 27) {
                this.resetKeySelection ();
                this.text.focus();
                var self = this;
                window.setTimeout (function () {self.textchange (true);}, HotCat.suggest_delay);
              } else if (evt.keyCode == 13) {
                this.accept (evt);
              }
            }
           ,this
          );
        if (!HotCat.fixed_search) {
          var engineSelector = make ('select');
          for (var key in suggestionConfigs) {
            if (suggestionConfigs[key].show) {
              var opt = make ('option');
              opt.value = key;
              if (key == this.engine) opt.selected = true;
              opt.appendChild (make (suggestionConfigs[key].name, true));
              engineSelector.appendChild (opt);
            }
          }
          engineSelector.onchange = bind (
            function () {
              this.engine = this.engineSelector.options[this.engineSelector.selectedIndex].value;
              this.textchange (true, true); // Don't autocomplete, force re-display of list
            }
           ,this
          );
          this.engineSelector = engineSelector;
        }
      }
      this.list = list;
      
      function button_label (id, defaultText) {
        var label = null;
        if (   onUpload
            && typeof (UFUI) != 'undefined'
            && typeof (UIElements) != 'undefined'
            && typeof (UFUI.getLabel) == 'function') {
          try {
            label = UFUI.getLabel (id, true);
            // Extract the plain text. IE doesn't know that Node.TEXT_NODE == 3
            while (label && label.nodeType != 3) label = label.firstChild;
          } catch (ex) {
            label = null;
          }
        }
        if (!label || !label.data) return defaultText;
        return label.data;    
      }

      // Do not use type 'submit'; we cannot detect modifier keys if we do
      var OK = make ('input'); OK.type = 'button';
      OK.value = button_label ('wpOkUploadLbl', HotCat.messages.ok);
      OK.onclick = bind (this.accept, this);
      this.ok = OK;
        
      var cancel = make ('input'); cancel.type = 'button';
      cancel.value = button_label ('wpCancelUploadLbl', HotCat.messages.cancel);
      cancel.onclick = bind (this.cancel, this);
      this.cancelButton = cancel;
        
      if (list) form.appendChild (list);
      if (this.engineSelector) form.appendChild (this.engineSelector);
      form.appendChild (text);
      if (!noSuggestions) form.appendChild (this.icon);
      form.appendChild (OK);
      form.appendChild (cancel);
      form.style.display = 'none';
      this.span.appendChild (form);
    },

    display : function (evt) {
      if (this.isAddCategory && !onUpload) {
        var newAdder = new CategoryEditor (this.line, null, this.span, true); // Create a new one
      }
      if (!commitButton && !onUpload) {
        for (var i = 0; i < editors.length; i++) {
          if (editors[i].state != CategoryEditor.UNCHANGED) {
            setMultiInput();
            break;
          }
        }
      }
      if (!this.form) {
        this.makeForm ();
      }
      if (this.list) this.list.style.display = 'none';
      if (this.engineSelector) this.engineSelector.style.display = 'none';
      this.currentCategory = this.lastSavedCategory;
      this.currentExists   = this.lastSavedExists;
      this.currentKey      = this.lastSavedKey;
      this.icon.src = this.currentExists ? HotCat.existsYes : HotCat.existsNo;
      this.text.value = this.currentCategory + (this.currentKey != null ? '|' + this.currentKey : "");
      this.originalState = this.state;
      this.lastInput     = this.currentCategory;
      this.inputExists   = this.currentExists;
      this.state         = this.state == CategoryEditor.UNCHANGED ? CategoryEditor.OPEN : CategoryEditor.CHANGE_PENDING;
      // Display the form
      if (this.catLink) this.catLink.style.display = 'none';
      this.linkSpan.style.display = 'none';
      this.form.style.display = 'inline';
      this.ok.disabled = false;
      CategoryEditor.makeActive (this);
      // Kill the event before focussing, otherwise IE will kill the onfocus event!
      var result = evtKill (evt);
      this.text.focus();
      this.text.readOnly = false;
      checkMultiInput ();
      return result;
    },

    open : function (evt) {
      var result = this.display (evt);
      var v = this.lastSavedCategory; 
      if (v.length == 0) return result;

      if (this.engine && suggestionConfigs[this.engine].temp) this.engine = HotCat.suggestions;
      this.textchange (false, true); // do autocompletion, force display of suggestions
      return result;
    },

    down : function (evt) {
      var result = this.display (evt);
      var v = this.lastSavedCategory; 
      if (v.length == 0) return result;

      this.text.readOnly = true; // This request may be very slow!
      this.engine = 'subcat';
      this.textchange (false, true);

      return result;
    },

    up : function (evt) {
      var result = this.display (evt);
      var v = this.lastSavedCategory; 
      if (v.length == 0) return result;

      this.engine = 'parentcat';
      this.textchange (false, true);

      return result;
    },

    cancel : function () {
      if (this.isAddCategory && !onUpload) {
        this.removeEditor(); // We added a new adder when opening
        return;
      }
      // Close, re-display link
      if (this.list) this.list.style.display = 'none';
      if (this.engineSelector) this.engineSelector.style.display = 'none';
      this.form.style.display = 'none';
      if (this.catLink) this.catLink.style.display = "";
      this.linkSpan.style.display = "";
      this.state = this.originalState;
      this.currentCategory = this.lastSavedCategory;
      this.currentKey      = this.lastSavedKey;
      this.currentExists   = this.lastSavedExists;
      if (this.state == CategoryEditor.UNCHANGED) {
        if (this.catLink) this.catLink.style.backgroundColor = 'transparent';
      } else {
        if (!onUpload) {
          try {
            this.catLink.style.backgroundColor = HotCat.bg_changed;
          } catch (ex) {}
        }
      }
      checkMultiInput ();
    },

    removeEditor : function () {
      var next = this.span.nextSibling;
      if (next) next.parentNode.removeChild (next);
      this.span.parentNode.removeChild (this.span);
      for (var i = 0; i < editors.length; i++) {
        if (editors[i] == this) {
          editors.splice (i, 1);
          break;
        }
      }
      checkMultiInput ();
      var self = this;
      window.setTimeout (function () {delete self;}, 10);
    },

    rollback : function (evt) {
      this.undoLink.parentNode.removeChild (this.undoLink);
      this.undoLink = null;
      this.currentCategory = this.originalCategory;
      this.currentKey = this.originalKey;
      this.currentExists = this.originalExists;
      this.lastSavedCategory = this.originalCategory;
      this.lastSavedKey = this.originalKey;
      this.lastSavedExists = this.originalExists;
      this.state = CategoryEditor.UNCHANGED;
      if (!this.currentCategory || this.currentCategory.length == 0) {
        // It was a newly added category. Remove the whole editor.
        this.removeEditor();
      } else {
        // Redisplay the link...
        this.catLink.removeChild (this.catLink.firstChild);
        this.catLink.appendChild (make (this.currentCategory, true));
        this.catLink.href = wikiPagePath (HotCat.category_canonical + ':' + this.currentCategory);
        this.catLink.title = "";
        this.catLink.className = this.currentExists ? "" : 'new';
        this.catLink.style.backgroundColor = 'transparent';
        if (this.upDownLinks) this.upDownLinks.style.display = this.currentExists ? "" : 'none';
        checkMultiInput ();
      }
      return evtKill (evt);
    },

    inactivate : function () {
      if (this.list) this.list.style.display = 'none';
      if (this.engineSelector) this.engineSelector.style.display = 'none';
      this.is_active = false;
    },

    acceptCheck : function (dontCheck) {
      this.sanitizeInput ();
      var value = this.text.value.split('|');
      var key   = null;
      if (value.length > 1) key = value[1];
      var v = value[0].replace(/_/g, ' ').replace(/^\s+|\s+$/g, "");
      if (HotCat.capitalizePageNames) v = capitalize (v);
      this.lastInput = v;
      if (v.length == 0) {
        this.cancel ();
        return false;
      }
      if (!dontCheck
          && (   wgNamespaceNumber == 14 && v == wgTitle
              || HotCat.blacklist != null && HotCat.blacklist.test(v))
         ) {
        this.cancel ();
        return false;
      }
      this.currentCategory = v;
      this.currentKey = key;
      this.currentExists = this.inputExists;
      return true;
    },
    
    accept : function (evt) {
      this.noCommit = (evtKeys (evt) & 1) != 0;
      var result = evtKill (evt);
      if (this.acceptCheck ()) {
        var toResolve = [this];
        var original  = this.currentCategory;
        resolveMulti (
            toResolve
          , function (resolved) {
              if (resolved[0].dab) {
                CategoryEditor.makeActive (resolved[0]);
              } else {
                if (resolved[0].acceptCheck(true)) {
                  resolved[0].commit (
                    (resolved[0].currentCategory != original)
                      ? HotCat.messages.cat_resolved.replace (/\$1/g, original)
                      : null
                  );
                }
              }
            }
        );
      }
      return result;
    },

    close : function () {
      if (!this.catLink) {
        // Create a catLink
        this.catLink = make ('a');
        this.catLink.appendChild (make ('foo', true));
        this.catLink.style.display = 'none';
        this.span.insertBefore (this.catLink, this.span.firstChild.nextSibling);
      }
      this.catLink.removeChild (this.catLink.firstChild);
      this.catLink.appendChild (make (this.currentCategory, true));
      this.catLink.href = wikiPagePath (HotCat.category_canonical + ':' + this.currentCategory);
      this.catLink.title = "";
      this.catLink.className = this.currentExists ? "" : 'new';
      this.lastSavedCategory = this.currentCategory;
      this.lastSavedKey      = this.currentKey;
      this.lastSavedExists   = this.currentExists;
      // Close form and redisplay category
      if (this.list) this.list.style.display = 'none';
      if (this.engineSelector) this.engineSelector.style.display = 'none';
      this.form.style.display = 'none';
      this.catLink.style.display = "";
      if (this.isAddCategory) {
        if (onUpload) {
          var newAdder = new CategoryEditor (this.line, null, this.span, true); // Create a new one
        }
        this.isAddCategory = false;
        this.linkSpan.parentNode.removeChild (this.linkSpan);
        this.makeLinkSpan ();
        this.span.appendChild (this.linkSpan);
      }
      if (!this.undoLink) {
        // Append an undo link.
        var span = make ('span');
        var lk = make ('a'); lk.href = '#catlinks'; lk.onclick = bind (this.rollback, this);
        lk.appendChild (make (HotCat.links.undo, true)); lk.title = HotCat.tooltips.undo;
        span.appendChild (make (' ', true));
        span.appendChild (lk);
        this.normalLinks.appendChild (span);
        this.undoLink = span;
        if (!onUpload) {
          try {
            this.catLink.style.backgroundColor = HotCat.bg_changed;
          } catch (ex) {}
        }
      }
      if (this.upDownLinks) this.upDownLinks.style.display = this.lastSavedExists ? "" : 'none';
      this.linkSpan.style.display = "";
      this.state = CategoryEditor.CHANGED;
      checkMultiInput ();
    },
    
    commit : function (comment) {
      // Check again to catch problem cases after redirect resolution
      if (   (   this.currentCategory == this.originalCategory
              && (this.currentKey == this.originalKey
                  || this.currentKey === null && this.originalKey.length == 0
                 )
             )
          || wgNamespaceNumber == 14 && this.currentCategory == wgTitle
          || HotCat.blacklist != null && HotCat.blacklist.test (this.currentCategory)
         )
      {
        this.cancel ();
        return;
      }
      if (commitButton || onUpload) {
        this.close ();
      } else {
        if (this.list) this.list.style.display = 'none';
        if (this.engineSelector) this.engineSelector.style.display = 'none';
        // Execute change from this.originalCategory to this.currentCategory|this.currentKey,
        var editlk = wgServer + wgScript + '?title=' + encodeURIComponent (wgPageName)
                   + '&action=edit';
        var url = editlk + '&hotcat_newcat=' + encodeURIComponent (this.currentCategory);  
        if (this.currentKey != null) url += '&hotcat_sortkey=' + encodeURIComponent (this.currentKey);
        if (this.originalCategory.length > 0)
          url += '&hotcat_removecat=' + encodeURIComponent (this.originalCategory);
        if (comment) url += '&hotcat_comment=' + encodeURIComponent (comment);
        if (this.noCommit || HotCat.no_autocommit) url += '&hotcat_nocommit=1';
        if (!HotCat.single_minor) url += '&hotcat_major=1';
        document.location = url;
      }
    },
    
    remove : function (evt) {
      this.doRemove (evtKeys (evt) & 1);
      return evtKill (evt);
    },
    
    doRemove : function (noCommit) {
      if (this.isAddCategory) { // Empty input on adding a new category
        this.cancel ();
        return;
      }
      if (!commitButton && !onUpload) {
        for (var i = 0; i < editors.length; i++) {
          if (editors[i].state != CategoryEditor.UNCHANGED) {
            setMultiInput();
            break;
          }
        }
      }
      if (commitButton) {
        this.catLink.style.textDecoration = 'line-through';
        try {
          this.catLink.style.backgroundColor = HotCat.bg_changed;
        } catch (ex) {}
        this.originalState = this.state;
        this.state = CategoryEditor.DELETED;
        this.normalLinks.style.display = 'none';
        this.undelLink.style.display = "";
        checkMultiInput ();
      } else {
        if (onUpload) {
          // Remove this editor completely
          this.removeEditor ();
        } else {
          // Execute single category deletion.
          var editlk = wgServer + wgScript + '?title=' + encodeURIComponent (wgPageName)
                     + '&action=edit';
          if (noCommit || HotCat.no_autocommit) editlk += '&hotcat_nocommit=1';
          if (!HotCat.single_minor) editlk += '&hotcat_major=1';
          document.location =
            editlk + '&hotcat_removecat=' + encodeURIComponent (this.originalCategory);
        }
      }
    },
    
    restore : function (evt) {
      // Can occur only if we do have a commit button and are not on the upload form
      this.catLink.style.textDecoration = "";
      this.state = this.originalState;
      if (this.state == CategoryEditor.UNCHANGED) {
        this.catLink.style.backgroundColor = 'transparent';
      } else {
        try {
          this.catLink.style.backgroundColor = HotCat.bg_changed;
        } catch (ex) {}
      }
      this.normalLinks.style.display = "";
      this.undelLink.style.display = 'none';
      checkMultiInput ();
      return evtKill (evt);
    },
    
    // Internal operations
        
    selectEngine : function (engineName) {
      if (!this.engineSelector) return;
      for (var i = 0; i < this.engineSelector.options.length; i++) {
        this.engineSelector.options[i].selected = this.engineSelector.options[i].value == engineName;
      }
    },

    sanitizeInput : function () {
      var v = this.text.value || "";
      v = v.replace(/^(\s|_)+/, ""); // Trim leading blanks and underscores
      var re = new RegExp ('^(' + HotCat.category_regexp + '):');
      if (re.test (v)) v = v.substring (v.indexOf (':') + 1);
      if (HotCat.capitalizePageNames) v = capitalize (v);
      // Only update the input field if there is a difference. IE8 appears to reset the selection
      // and place the cursor at the front upon reset, which makes our autocompletetion become a
      // nuisance. FF and IE6 don't seem to have this problem.
      if (this.text.value != null && this.text.value != v)
        this.text.value = v;
    },

    makeCall : function (url, callbackObj, engine, queryKey) {
      var cb = callbackObj;
      var e  = engine;
      var v  = queryKey;
      var r  = sajax_init_object ();
      cb.requests.push (r);
      r.open('GET', url, true);
      r.onreadystatechange =
        bind (
          function () {
            if (r.readyState == 4) {
              if (r.status != 200) cb.dontCache = true;
              if (r.status == 200 && r.responseText != null) {
                var titles = e.handler (r.responseText, v);
                if (titles && titles.length > 0) {
                  if (cb.allTitles == null) {
                    cb.allTitles = titles;
                  } else {
                    cb.allTitles = cb.allTitles.concat (titles);
                  }
                }
              }
              cb.callsMade++;
            }
            if (cb.callsMade == cb.nofCalls) {
              if (!cb.dontCache && !suggestionConfigs[cb.engineName].cache[v]) {
                suggestionConfigs[cb.engineName].cache[v] = cb.allTitles;
              }
              this.text.readOnly = false;
              if (!cb.cancelled) this.showSuggestions (cb.allTitles, cb.noCompletion, v, cb.engineName);
              if (cb === this.callbackObj) this.callbackObj = null;
              delete cb;
            }
          }
         ,this
        );
      r.setRequestHeader ('Pragma', 'cache=yes');
      r.setRequestHeader ('Cache-Control', 'no-transform');
      r.send (null);
    },

    callbackObj : null,

    textchange : function (dont_autocomplete, force) {
      // Hide all other lists
      CategoryEditor.makeActive (this);
      // Get input value, omit sort key, if any
      this.sanitizeInput ();
      var v = this.text.value;
      // Disregard anything after a pipe.
      var pipe = v.indexOf ('|');
      if (pipe >= 0) v = v.substring (0, pipe);
      if (this.lastInput == v && !force) return; // No change
      if (this.lastInput != v) checkMultiInput ();
      this.lastInput = v;
      this.lastRealInput = v;

      // Mark blacklisted inputs.
      this.ok.disabled = v.length > 0 && HotCat.blacklist != null && HotCat.blacklist.test (v);

      if (noSuggestions) {
        // No Ajax: just make sure the list is hidden
        if (this.list) this.list.style.display = 'none';
        if (this.engineSelector) this.engineSelector.style.display = 'none';
        if (this.icon) this.icon.style.display = 'none';
        return;
      }
      
      if (v.length == 0) { this.showSuggestions([]); return; }
      if (!sajax_init_object ()) {
        noSuggestions = true;
        if (this.list) this.list.style.display = 'none';
        if (this.engineSelector) this.engineSelector.style.display = 'none';
        if (this.icon) this.icon.style.display = 'none';
        return;
      }
      if (this.callbackObj) this.callbackObj.cancelled = true;
      var engineName  = suggestionConfigs[this.engine] ? this.engine : 'combined';

      dont_autocomplete = dont_autocomplete || suggestionConfigs[engineName].noCompletion;
      if (suggestionConfigs[engineName].cache[v]) {
        this.showSuggestions (suggestionConfigs[engineName].cache[v], dont_autocomplete, v, engineName);
        return;
      }

      var engines = suggestionConfigs[engineName].engines;
      this.callbackObj =
        {allTitles: null, requests: [], callsMade: 0, nofCalls: engines.length, noCompletion: dont_autocomplete, engineName: engineName}; 
      for (var j = 0; j < engines.length; j++) {
        engine = suggestionEngines[engines[j]];
        var url = wgServer + wgScriptPath + engine.uri.replace (/\$1/g, encodeURIComponent (v));
        this.makeCall (url, this.callbackObj, engine, v);
      }     
    },
    
    showSuggestions : function (titles, dontAutocomplete, queryKey, engineName) {
      this.text.readOnly = false;
      this.dab = null;
      if (!this.list) return;
      if (noSuggestions) {
        if (this.list) this.list.style.display = 'none';
        if (this.engineSelector) this.engineSelector.style.display = 'none';
        if (this.icon) this.icon.style.display = 'none';
        this.inputExists = true; // Default...
        return;
      }
      var haveEngine = !!engineName;
      if (haveEngine) {
        haveEngine = this.engineSelector != null;
      } else {
        if (this.engineSelector) this.engineSelector.style.display = 'none';
      }
      if (queryKey) {
        if (this.lastInput.indexOf (queryKey) != 0) return;
        if (this.lastQuery && this.lastInput.indexOf (this.lastQuery) == 0 && this.lastQuery.length > queryKey.length)
          return;
      }
      this.lastQuery = queryKey;
      
      // Get current input text
      var v = this.text.value.split('|');
      var key = v.length > 1 ? '|' + v[1] : "";
      v = (HotCat.capitalizePageNames ? capitalize (v[0]) : v[0]);

      if (titles) {
        var vLow = v.toLowerCase ();
        // Strip blacklisted categories
        if (HotCat.blacklist != null) {
          for (var i = 0; i < titles.length; i++) {
            if (HotCat.blacklist.test (titles[i])) {
              titles.splice(i, 1);
              i--;
            }
          }
        }
        titles.sort (
          function (a, b) {
            if (a.indexOf (b) == 0) return 1; // a begins with b: a > b
            if (b.indexOf (a) == 0) return -1; // b begins with a: a < b
            // Opensearch may return stuff not beginning with the search prefix!
            var prefixMatchA = (a.indexOf (v) == 0 ? 1 : 0);
            var prefixMatchB = (b.indexOf (v) == 0 ? 1 : 0);
            if (prefixMatchA != prefixMatchB) return prefixMatchB - prefixMatchA;
            // Case-insensitive prefix match!
            var aLow = a.toLowerCase(), bLow = b.toLowerCase();
            prefixMatchA = (aLow.indexOf (vLow) == 0 ? 1 : 0);
            prefixMatchB = (bLow.indexOf (vLow) == 0 ? 1 : 0);
            if (prefixMatchA != prefixMatchB) return prefixMatchB - prefixMatchA;
            if (a < b) return -1;
            if (b < a) return 1;
            return 0;
          }
        );
        // Remove duplicates and self-references
        for (var i = 0; i < titles.length; i++) {
          if (   i+1 < titles.length && titles[i] == titles[i+1]
              || wgNamespaceNumber == 14 && titles[i] == wgTitle
             )
          {
            titles.splice (i, 1);
            i--;
          }
        }
      }
      if (!titles || titles.length == 0) {
        if (this.list) this.list.style.display = 'none';
        if (this.engineSelector) this.engineSelector.style.display = 'none';
        if (engineName && suggestionConfigs[engineName] && !suggestionConfigs[engineName].temp) {
          if (this.icon) this.icon.src = HotCat.existsNo;
          this.inputExists = false;
        }
        return;
      }
                    
      var firstTitle = titles[0];
      var completed = this.autoComplete (firstTitle, v, key, dontAutocomplete);
      if (engineName && suggestionConfigs[engineName] && !suggestionConfigs[engineName].temp) {
        this.icon.src = completed ? HotCat.existsYes : HotCat.existsNo;
        this.inputExists = completed;
      }
      if (completed) {
        this.lastInput = firstTitle;
        if (titles.length == 1) {
          this.list.style.display = 'none';
          if (this.engineSelector) this.engineSelector.style.display = 'none';
          return;
        }
      }
      if (!this.is_active) {
        this.list.style.display = 'none';
        if (this.engineSelector) this.engineSelector.style.display = 'none';
        return;
      }
      var nofItems = (titles.length > HotCat.list_size ? HotCat.list_size : titles.length);
      if (nofItems <= 1) nofItems = 2;
      this.list.size = nofItems;
      this.list.style.align    = 'left';
      this.list.style.zIndex   = 5;
      this.list.style.position = 'absolute';
      // Compute initial list position. First the height.
      var listh = 0;
      if (this.list.style.display == 'none') {
        // Off-screen display to get the height
        this.list.style.top = this.text.offsetTop + 'px';
        this.list.style.left = '-10000px';
        this.list.style.display = "";
        listh = this.list.offsetHeight;
        this.list.style.display = 'none';
      } else {
        listh = this.list.offsetHeight;
      }
      // Approximate calculation of maximum list size
      var maxListHeight = listh;
      if (nofItems < HotCat.list_size) maxListHeight = (listh / nofItems) * HotCat.list_size;

      function scroll_offset (what) {
        var s = 'scroll' + what;
        return (document.documentElement ? document.documentElement[s] : 0)
               || document.body[s] || 0;
      }  
      function viewport (what) {
        if (typeof (is_safari) != 'undefined' && is_safari && !document.evaluate)
          return window['inner' + what];
        var s = 'client' + what;
        if (typeof (is_opera) != 'undefined' && is_opera) return document.body[s];
        return (document.documentElement ? document.documentElement[s] : 0)
               || document.body[s] || 0;
      }
      function position (node) {
        // Stripped-down simplified position function. It's good enough for our purposes.
        if (node.getBoundingClientRect) {
          var box    = node.getBoundingClientRect ();
          return { x : Math.round (box.left + scroll_offset ('Left'))
                  ,y : Math.round (box.top + scroll_offset ('Top'))
                 };
        }
        var t = 0, l = 0;
        do {
          t = t + (node.offsetTop  || 0);
          l = l + (node.offsetLeft || 0);
          node = node.offsetParent;
        } while (node);
        return {x : l, y : t};
      }

      // IE6 seems to report in this.text.offsetTop and this.text.offsetLeft global offsets??
      // Possibly this has something to do with the special status of input elements in IE as
      // "windowed controls". Calculate the relative offsets manually.
      var textPos = position (this.text);
      var catLinePos = position (this.line);
      var textTop = textPos.y - catLinePos.y;
      var textLeft = textPos.x - catLinePos.x;
      if (window.ie6_bugs) {
        // IE6 somehow has a problem with inline-displayed forms (to which our list belongs), and will add the
        // offset of the beginning of the text to the offsets we'd normally calculate, which in particular with
        // right-aligned category lines as they occur in some older skins completely misplaces the lists, sometimes
        // even off-screen. This appears to affect only the horizontal positioning of the list and of the
        // engineSelector. Try to account for this bizarre behavior. Notes: dunno if that also occurs on IE7.
        var textStartPos = position (this.line.firstChild);
        textStartPos.x -= catLinePos.x;
        textLeft -= textStartPos.x;
      }
      var nl = textLeft;
      var nt = 0;
      var offset = 0;
      if (haveEngine) {
        this.engineSelector.style.zIndex = 5;
        this.engineSelector.style.position = 'absolute';
        this.engineSelector.style.width = this.text.offsetWidth + 'px';
        // Figure out the height of this selector: display it off-screen, then hide it again.
        if (this.engineSelector.style.display == 'none') {
          this.engineSelector.style.left  = '-1000px';
          this.engineSelector.style.top   = textTop + 'px';
          this.engineSelector.style.display = "";
          offset = this.engineSelector.offsetHeight;
          this.engineSelector.style.display = 'none';
        } else {
          offset = this.engineSelector.offsetHeight;
        }
        this.engineSelector.style.left  = nl + 'px';
      } 
      if (textPos.y < maxListHeight + offset) {
        // The list might extend beyond the upper border of the page. Let's avoid that by placing it
        // below the input text field.
        nt = textTop + this.text.offsetHeight + offset + 1;
        if (haveEngine) this.engineSelector.style.top = textTop + this.text.offsetHeight + 'px';
      } else {
        nt = textTop - listh - offset;
        if (haveEngine) this.engineSelector.style.top = textTop - offset + 'px';
      }
      this.list.style.top = nt + 'px';
      this.list.style.width = ""; // No fixed width (yet)
      this.list.style.left = nl + 'px';
      // (Re-)fill the list
      while (this.list.firstChild) this.list.removeChild (this.list.firstChild);
      for (var i = 0 ; i < titles.length ; i++) {
        var opt = make ('option') ;
        opt.appendChild (make (titles[i], true));
        opt.selected = completed && (i == 0);
        this.list.appendChild (opt);
      }
      if (haveEngine) {
        this.selectEngine (engineName);
        this.engineSelector.style.display = "";
      }
      this.list.style.display = 'block';
      // Set the width of the list        
      var scroll = scroll_offset ('Left');
      var view_w = viewport ('Width');
      var l_pos  = position (this.list);
      if (this.list.offsetWidth < this.text.offsetWidth) {
        this.list.style.width = this.text.offsetWidth + 'px';
        return;
      }
      // Make sure that the list fits horizontally into the browser window      
      var w      = this.list.offsetWidth;
      if (l_pos.x + w > scroll + view_w) {
        if (w > view_w) w = view_w;
        this.list.style.width = w + 'px';
        this.list.style.left = nl - (l_pos.x + w - scroll - view_w) + 'px';
      }
    },

    autoComplete : function (newVal, actVal, key, dontModify) {
      if (newVal == actVal) return true;
      if (dontModify || newVal.indexOf (actVal) != 0) return false;
      // Actual input is a prefix of the new text. Fill in new text, selecting the newly added suffix
      // such that it can be easily removed by typing backspace if the suggestion is unwanted.
      if (!(   this.text.setSelectionRange
            || this.text.createTextRange
            ||    typeof (this.text.selectionStart) != 'undefined'
               && typeof (this.text.selectionEnd) != 'undefined'
           )
         )
        return false;
      // Here we know that we can indeed select properly. If we can't doing this would be a major
      // annoyance.
      this.text.focus();
      var start  = actVal.length;        
      this.text.value = newVal + key;          
      if (this.text.setSelectionRange)      // e.g. khtml
        this.text.setSelectionRange (start, newVal.length);
      else if (this.text.createTextRange) { // IE
        var new_selection = this.text.createTextRange();
        new_selection.move ('character', start);
        new_selection.moveEnd ('character', newVal.length - start);
        new_selection.select();
      } else {
        this.text.selectionStart = start;
        this.text.selectionEnd   = newVal.length;
      }
      return true;
    },

    processKey : function (evt) {
      var dir = 0;
      switch (this.lastKey) {
        case 38: dir = -1; // Up arrow
        case 40: if (dir == 0) dir = 1; // Down arrow
        case 33: if (dir == 0) dir = -HotCat.list_size; // Page up
        case 34: if (dir == 0) dir = HotCat.list_size; // Page down
          if (this.list.style.display != 'none') {
            // List is visible, so there are suggestions
            this.highlightSuggestion (dir);
            // Kill the event, otherwise some browsers (e.g., Firefox) may additionally treat an up-arrow
            // as "place the text cursor at the front", which we don't want here.
            return evtKill (evt);
          } else if (   this.keyCount <= 1
                     && (!this.callbackObj || this.callbackObj.callsMade == this.callbackObj.nofCalls)
                    )
          {
            // If no suggestions displayed, get them, unless we're already getting them.
            this.textchange ();
          }
          break;
        case 27: // ESC: inhibit default behavior (revert to last real input in FF: we do that ourselves)
          return evtKill (evt);
      }
      return true;
    },

    highlightSuggestion : function (dir) {
      if (noSuggestions || !this.list || this.list.style.display == 'none') return false;
      var curr = this.list.selectedIndex;
      var tgt  = -1;
      if (dir == 0) {
        if (curr < 0 || curr >= this.list.options.length) return false;
        tgt = curr;
      } else {
        tgt = curr < 0 ? 0 : curr + dir;
        tgt = tgt < 0 ? 0 : tgt;
        if (tgt >= this.list.options.length) tgt = this.list.options.length - 1;
      }
      if (tgt != curr || dir == 0) {
        if (curr >= 0 && curr < this.list.options.length && dir != 0) this.list.options[curr].selected = false;
        this.list.options[tgt].selected = true;
        // Get current input text
        var v = this.text.value.split('|');
        var key = v.length > 1 ? '|' + v[1] : "";
        var completed = this.autoComplete (this.list.options[tgt].text, this.lastRealInput, key, false);
        if (!completed) {
          this.text.value = this.list.options[tgt].text + key;
        }
        this.lastInput = this.list.options[tgt].text;
        this.inputExists = true; // Might be wrong if from a dab list...
        if (this.icon) this.icon.src = HotCat.existsYes;
        this.state = CategoryEditor.CHANGE_PENDING;
      }
      return true;
    },

    resetKeySelection : function () {
      if (noSuggestions || !this.list || this.list.style.display == 'none') return false;
      var curr = this.list.selectedIndex;
      if (curr >= 0 && curr < this.list.options.length) {
        this.list.options[curr].selected = false;
        // Get current input text
        var v = this.text.value.split('|');
        var key = v.length > 1 ? '|' + v[1] : "";
        // ESC is handled strangely by some browsers (e.g., FF); somehow it resets the input value before
        // our event handlers ever get a chance to run.
        var result = v[0] != this.lastInput; 
        if (v[0] != this.lastRealInput) {
          this.text.value = this.lastRealInput + key;
          result = true;
        }
        this.lastInput = this.lastRealInput;
        return result;
      }
      return false;
    }

  }; // end CategoryEditor.prototype
  
  function initialize () {
    // User configurations. Do this here, called from the onload handler, so that users can
    // override it easily in their own user script files by just declaring variables. JSconfig
    // is some feature used at Wikimedia Commons.
    HotCat.no_autocommit = 
      (typeof (hotcat_no_autocommit) != 'undefined'
        ? !!hotcat_no_autocommit
        : (typeof (JSconfig) != 'undefined' && typeof (JSconfig.keys['HotCatNoAutoCommit']) != 'undefined'
            ? JSconfig.keys['HotCatNoAutoCommit']
            : HotCat.no_autocommit
          )
      );
    HotCat.suggest_delay =   window.hotcat_suggestion_delay
                          || typeof (JSconfig) != 'undefined' && JSconfig.keys['HotCatSuggestionDelay']
                          || HotCat.suggest_delay;
    HotCat.editbox_width =   window.hotcat_editbox_width
                          || typeof (JSconfig) != 'undefined' && JSconfig.keys['HotCatEditBoxWidth']
                          || HotCat.editbox_width;
    HotCat.suggestions   =   window.hotcat_suggestions
                          || typeof (JSconfig) != 'undefined' && JSconfig.keys['HotCatSuggestions']
                          || HotCat.suggestions;
    if (typeof (HotCat.suggestions) != 'string' || !suggestionConfigs[HotCat.suggestions])
      HotCat.suggestions = 'combined';
    HotCat.fixed_search  =
      (typeof (hotcat_suggestions_fixed) != 'undefined'
        ? !!hotcat_suggestions_fixed
        : (typeof (JSconfig) != 'undefined' && typeof (JSconfig.keys['HotCatFixedSuggestions']) != 'undefined'
            ? JSconfig.keys['HotCatFixedSuggestions']
            : HotCat.fixed_search
          )
      );
    HotCat.single_minor  =
      (typeof (hotcat_single_changes_are_minor) != 'undefined'
        ? !!hotcat_single_changes_are_minor
        : (typeof (JSconfig) != 'undefined' && typeof (JSconfig.keys['HotCatMinorSingleChanges']) != 'undefined'
            ? JSconfig.keys['HotCatMinorSingleChanges']
            : HotCat.single_minor
          )
      );
    HotCat.bg_changed    =   window.hotcat_changed_background
                          || typeof (JSconfig) != 'undefined' && JSconfig.keys['HotCatChangedBackground']
                          || HotCat.bg_changed;
    HotCat.use_up_down   =
      (typeof (hotcat_use_category_links) != 'undefined'
        ? !!hotcat_use_category_links
        : (typeof (JSconfig) != 'undefined' && typeof (JSconfig.keys['HotCatUseCategoryLinks']) != 'undefined'
            ? JSconfig.keys['HotCatUseCategoryLinks']
            : HotCat.use_up_down
          )
      );
    HotCat.list_size =    window.hotcat_list_size
                       || typeof (JSconfig) != 'undefined' && JSconfig.keys['HotCatListSize']
                       || HotCat.list_size;
    // Numeric input, make sure we have a numeric value
    HotCat.list_size = parseInt (HotCat.list_size, 10);
    if (isNaN (HotCat.list_size) || HotCat.list_size < 5) HotCat.list_size = 5;
    if (HotCat.list_size > 15) HotCat.list_size = 15;
    // Localize search engine names
    if (HotCat.engine_names) {
      for (var key in HotCat.engine_names) {
        if (suggestionConfigs[key] && HotCat.engine_names[key]) {
          suggestionConfigs[key].name = HotCat.engine_names[key];
        }
      }
    }
    // Catch both native RTL and "faked" RTL through [[MediaWiki:Rtl.js]]
    is_rtl = hasClass (document.body, 'rtl');
    if (!is_rtl) {
      if (document.defaultView && document.defaultView.getComputedStyle) { // Gecko etc.
        is_rtl = document.defaultView.getComputedStyle (document.body, null).getPropertyValue ('direction');
      } else if (document.body.currentStyle) { // IE, has subtle differences to getComputedStyle
        is_rtl = document.body.currentStyle['direction'];
      } else { // Not exactly right, but best effort
        is_rtl = document.body.style['direction'];
      }
      is_rtl = (is_rtl == 'rtl');
    }
  }
        
  function can_edit () {
    var container = null;
    switch (skin) {
      case 'cologneblue':
        container = document.getElementById ('quickbar');
        // Fall through
      case 'standard':
      case 'nostalgia':
        if (!container) container = document.getElementById ('topbar');
        var lks = container.getElementsByTagName ('a');
        for (var i = 0; i < lks.length; i++) {
          if (   param ('title', lks[i].href) == wgPageName
              && param ('action', lks[i].href) == 'edit')
            return true;
        }
        return false;
      default:
        // all modern skins:
        return document.getElementById ('ca-edit') != null;
    }
    return false;
  }    
  
  function setup_upload () {
    onUpload = true;
    // Add an empty category bar above the "watch this" box, and change the onsubmit handler.
    var ip = document.getElementById ('wpWatchthis');
    if (!ip) return;
    var reupload = document.getElementById ('wpForReUpload');
    var destFile = document.getElementById ('wpDestFile');
    if (   (reupload && !!reupload.value)
        || (destFile && (destFile.disabled || destFile.readOnly)))
      return; // re-upload form...
    // Insert a table row with two fields (label and empty category bar)
    ip = ip.parentNode.parentNode; // The containing <tr>
    var newRow = make ('tr');
    var labelCell = make ('td');
    var lineCell  = make ('td');
    newRow.appendChild (labelCell);
    newRow.appendChild (lineCell);
    // Create the category line
    catLine = make ('div');
    catLine.className = 'catlinks';
    catLine.id = 'catlinks';
    catLine.style.textAlign = 'left';
    lineCell.appendChild (catLine);
    // Create the label
    var label = null;
    if (   typeof (UFUI) != 'undefined'
        && typeof (UIElements) != 'undefined'
        && typeof (UFUI.getLabel) == 'function') {
      try {
        label = UFUI.getLabel ('wpCategoriesUploadLbl');
      } catch (ex) {
        label = null;
      }
    }
    if (!label) {
      labelCell.id = 'hotcatLabel';
      labelCell.appendChild (make (HotCat.categories), true);
    } else {
      labelCell.id = 'hotcatLabelTranslated';
      labelCell.appendChild (label);
    }
    labelCell.className           = 'mw-label';
    labelCell.style.textAlign     = 'right';
    labelCell.style.verticalAlign = 'middle';
    // Change the onsubmit handler
    var form = document.getElementById ('upload') || document.getElementById ('mw-upload-form');
    if (form) {
      var optionsTable = document.getElementById ('mw-htmlform-options');
      if (optionsTable) optionsTable.width = '100%';
      ip.parentNode.insertBefore (newRow, ip);
      form.onsubmit = (function (oldSubmit) {
        return function () {          
          var do_submit = true;
          if (oldSubmit) {
            if (typeof (oldSubmit) == 'string')
              do_submit = eval (oldSubmit);
            else if (typeof (oldSubmit) == 'function')
              do_submit = oldSubmit.apply (form, arguments);
          }
          if (!do_submit) return false;
          closeForm ();
          // Copy the categories
          var eb =    document.getElementById ('wpUploadDescription')
                   || document.getElementById ('wpDesc');
          for (var i = 0; i < editors.length; i++) {
            var t = editors[i].currentCategory;
            if (!t) continue ;
            var key = editors[i].currentKey;
            var new_cat = '[[' + HotCat.category_canonical + ':' + t + (key ? '|' + key : "") + ']]';
            // Only add if not already present
            var cleanedText = eb.value.replace(/<\!--(\s|\S)*?--\>/g, "")
                                      .replace(/<nowiki\>(\s|\S)*?<\/nowiki>/g, "");
            if (!find_category (cleanedText, t, true)) {
              eb.value += '\n' + new_cat;
            }
          }
          return true;            
        };
      }) (form.onsubmit);
    }
  }
  
  var cleanedText = null;

  function isOnPage (span) {
    var catTitle = title (span.firstChild.getAttribute ('href', 2));
    if (!catTitle) return null;
    catTitle = catTitle.substr (catTitle.indexOf (':') + 1).replace (/_/g, ' ');
    if (HotCat.blacklist != null && HotCat.blacklist.test (catTitle)) return null;
    var result = { title : catTitle, match : ["", "", ""] };
    if (pageText === null) return result;
    if (cleanedText === null) {
      cleanedText = pageText.replace(/<\!--(\s|\S)*?--\>/g, "")
                            .replace(/<nowiki\>(\s|\S)*?<\/nowiki>/g, "");
    }
    result.match = find_category (cleanedText, catTitle, true);
    return result;
  }

  var initialized = false;
  var setupTimeout = null;

  function setup () {
    if (initialized) return;
    initialized = true;
    if (setupTimeout) {
      window.clearTimeout (setupTimeout);
      setupTimeout = null;
    }
    // Find the category bar, or create an empty one if there isn't one. Then add -/+- links after
    // each category, and add the + link.
    catLine =   catLine                                                  // Special:Upload
             || document.getElementById ('mw-normal-catlinks')           // MW >= 1.13alpha
             || getElementsByClassName (document , 'p' , 'catlinks')[0]; // MW < 1.13
    var hiddenCats = document.getElementById ('mw-hidden-catlinks');
    if (!catLine) {
      var footer = null;
      if (!hiddenCats) {
        footer = getElementsByClassName (document , 'div' , 'printfooter')[0];
        if (!footer) return; // Don't know where to insert the category line
      }
      catLine = make ('div');
      catLine.id = 'mw-normal-catlinks';
      catLine.style.textAlign = 'left';
      // Add a label
      var label = make ('a');
      label.href  = wgArticlePath.replace ('$1', 'Special:Categories');
      label.title = HotCat.categories;
      label.appendChild (make (HotCat.categories, true));
      catLine.appendChild (label);
      catLine.appendChild (make (':', true));
      // Insert the new category line
      var container = (hiddenCats ? hiddenCats.parentNode : document.getElementById ('catlinks'));
      if (!container) {
         container = make ('div');
         container.id = 'catlinks';
         footer.parentNode.insertBefore (container, footer.nextSibling);
      }
      container.className = 'catlinks noprint';
      container.style.display = "";
      if (!hiddenCats) {
        container.appendChild (catLine);
      } else {
        container.insertBefore (catLine, hiddenCats);
      }
    } // end if catLine exists
    catLine.style.position = 'relative';
    if (is_rtl) catLine.dir = 'rtl';

    // Create editors for all existing categories

    function createEditors (line) {
      var cats = line.getElementsByTagName ('span');
      // Copy cats, otherwise it'll also magically contain our added spans as it is a live collection!
      var copyCats = new Array (cats.length);
      for (var i = 0; i < cats.length; i++) copyCats[i] = cats[i];
      var editor = null;
      for (var i = 0; i < copyCats.length; i++) {
        var test = isOnPage (copyCats[i]);
        if (test !== null && test.match !== null) {
          editor = new CategoryEditor (line, copyCats[i], test.title, test.match[2]);
        }
      }
      return copyCats.length > 0 ? copyCats[copyCats.length-1] : null;
    }

    var lastSpan = createEditors (catLine);
    // Create one to add a new category
    var editor = new CategoryEditor(catLine, null, null, lastSpan != null);
    if (!onUpload) {
      if (pageText !== null && hiddenCats) {
        hiddenCats.style.position = 'relative';
        if (is_rtl) hiddenCats.dir = 'rtl';
        createEditors (hiddenCats);
      }
      // And finally add the "multi-mode" span. (Do this at the end, otherwise it ends up in the list above.)
      var enableMulti = make ('span');
      enableMulti.className = 'noprint';
      if (is_rtl) enableMulti.dir = 'rtl';
      catLine.insertBefore (enableMulti, catLine.firstChild.nextSibling);
      enableMulti.appendChild (make ('\xa0', true)); // nbsp
      multiSpan = make ('span');
      enableMulti.appendChild (multiSpan);
      multiSpan.innerHTML = '(<a>' + HotCat.addmulti + '</a>)';
      var lk = multiSpan.getElementsByTagName ('a')[0];
      lk.onclick = function (evt) {setMultiInput (); checkMultiInput (); return evtKill (evt);};
      lk.title = HotCat.multi_tooltip;
      lk.style.cursor = 'pointer';
    }
    cleanedText = null;
  }

  function setPage (json) {
    if (json && json.query) {
      if (json.query.pages) {
        for (var p in json.query.pages) {
          var page = json.query.pages[p];
          if (!page.revisions || page.revisions.length == 0) break;
          pageText = page.revisions[0]['*'];
          pageTime = page.revisions[0].timestamp.replace (/\D/g, "");
          pageWatched = typeof (page.watched) == 'string';
          break;
        }
      }
      // Siteinfo
      if (json.query.general) {
        HotCat.capitalizePageNames = (json.query.general['case'] == 'first-letter');
        if (json.query.general.time) serverTime = json.query.general.time.replace (/\D/g, "");
      }
    }
  }

  function getPage () {
    // We know we have an article here.
    if (wgArticleId == 0) {
      // Doesn't exist yet.
      pageText = "";
      pageTime = null;
      setup ();
    } else {
      var url = wgServer + wgScriptPath + '/api.php?format=json&callback=HotCat.start&action=query&titles='
              + encodeURIComponent (wgPageName)
              + '&prop=info%7Crevisions&rvprop=content%7Ctimestamp&meta=siteinfo&rvlimit=1&rvstartid='
              + wgCurRevisionId;
      var s = make ('script');
      s.src = url;
      s.type = 'text/javascript';
      HotCat.start = function (json) { setPage (json); setup (); };
      document.getElementsByTagName ('head')[0].appendChild (s);
      setupTimeout = window.setTimeout (setup, 4000); // 4 sec, just in case getting the wikitext takes longer.
    }
  }

  function run () {
    if (HotCat.started) return;
    HotCat.started = true;
    if (window.is_safari) {
      // Safari/Mac calls initialize before the importScript of /local_defaults (and /wgUserLang) are done. Let's wait a bit.
      // (This is a hack.)
      window.setTimeout (really_run, 1000);
    } else {
      really_run ();
    }
  }

  function really_run () {
    initialize ();

    if (is_rtl && window.ie6_bugs) return; // Disabled! IE6 with RTL is just too broken...

    if (!HotCat.upload_disabled && wgNamespaceNumber == -1 && wgCanonicalSpecialPageName == 'Upload' && wgUserName) {
      setup_upload ();
      setup ();
      // Check for state restoration
      if (   typeof (UploadForm) != 'undefined'
          && typeof (UploadForm.previous_hotcat_state) != 'undefined'
          && UploadForm.previous_hotcat_state != null)
        UploadForm.previous_hotcat_state = setState (UploadForm.previous_hotcat_state);      
    } else {
      if (!wgIsArticle || wgAction != 'view' || !can_edit() || HotCat.disable()) return;
      getPage ();
    }
  }

  // Legacy stuff

  function closeForm () {
    // Close all open editors without redirect resolution and other asynchronous stuff.
    for (var i = 0; i < editors.length; i++) {
      if (editors[i].state == CategoryEditor.OPEN) {
        editors[i].cancel();
      } else if (editors[i].state == CategoryEditor.CHANGE_PENDING) {
        editors[i].sanitizeInput ();
        var value = editors[i].text.value.split('|');
        var key   = null;
        if (value.length > 1) key = value[1];
        var v = value[0].replace(/_/g, ' ').replace(/^\s+|\s+$/g, "");
        if (v.length == 0) {
          editors[i].cancel ();
        } else {
          editors[i].currentCategory = v;
          editors[i].currentKey = key;
          editors[i].currentExists = this.inputExists;
          editors[i].close ();
        }
      }
    }
  }

  function getState () {
    var result = null;
    for (var i = 0; i < editors.length; i++) {
      var text = editors[i].currentCategory;
      var key  = editors[i].currentKey;
      if (text && text.length > 0) {
        if (key != null) text += '|' + key;
        if (result == null)
          result = text;
        else
          result = result + '\n' + text;
      }
    }
    return result;
  }

  function setState (state) {
    var cats = state.split ('\n');
    if (cats.length == 0) return null;
    if (initialized && editors.length == 1 && editors[0].isAddCategory) {
      // Insert new spans and create new editors for them.
      var newSpans = [];
      var before = editors.length == 1 ? editors[0].span : null;
      for (var i = 0; i < cats.length; i++) {
        if (cats[i].length == 0) continue;
        var cat = cats[i].split ('|');
        var key = cat.length > 1 ? cat[1] : null;
        cat = cat[0];
        var lk = make ('a'); lk.href = wikiPagePath (HotCat.category_canonical + ':' + cat);
        lk.appendChild (make (cat, true));
        lk.title = cat;
        var span = make ('span');
        span.appendChild (lk);
        if (i == 0) catLine.insertBefore (make (' ', true), before);
        catLine.insertBefore (span, before);
        if (before && i+1 < cats.length) parent.insertBefore (make (' | ', true), before);
        newSpans.push ({element: span, title: cat, 'key': key});
      }
      // And change the last one...
      if (before) {
        before.parentNode.insertBefore (make (' | ', true), before);
      }
      var editor = null;
      for (var i = 0; i < newSpans.length; i++) {
        editor = new CategoryEditor (catLine, newSpans[i].element, newSpans[i].title, newSpans[i].key);
      }
    }
    return null;
  }

  // Now export these legacy functions
  window.hotcat_get_state  = function () { return getState(); };
  window.hotcat_set_state  = function (state) { return setState (state); };
  window.hotcat_close_form = function () { closeForm (); };

  addOnloadHook (run);
})();

} // end if (guard)
//</source>