//<source lang="javascript">
 
if (typeof (hotcat_loaded) == 'undefined') {
var hotcat_loaded = false; // Guard against double inclusions
var hotcat_running = 0 ;
var hotcat_last_v = "" ;
var hotcat_exists_yes = "http://upload.wikimedia.org/wikipedia/commons/thumb/b/be/P_yes.svg/20px-P_yes.svg.png" ;
var hotcat_exists_no = "http://upload.wikimedia.org/wikipedia/commons/thumb/4/42/P_no.svg/20px-P_no.svg.png" ;
var hotcat_upload = 0 ;
var hotcat_no_autocommit = 0;
var hotcat_old_onsubmit = null;
var hotcat_nosuggestions = false;
// hotcat_nosuggestions is set to true if we don't have XMLHttp! (On IE6, XMLHttp uses
// ActiveX, and the user may deny execution.) If true, no suggestions will ever be
// displayed, and there won't be any checking whether the category  exists.
// Lupo, 2008-01-20
 
var hotcat_suggestion_delay = 100;
var hotcat_editbox_width    = 40;
// Fallbacks if we don't have JSconfig. Lupo, 2009-06-24
 
var hotcat_modify_blacklist = new Array (
"CC-" ,
"GFDL" ,
"PD"
) ;
 
// Localization. On MW 1.16+, this is automatically localized. On earlier MediaWiki
// installations, add localized namespace names manually, for instance for the Chinese
// Wikipedia, set it to hotcat_cnames_regexp="[Cc]ategory|分类|分類";
var hotcat_cnames_regexp="[Cc]ategory";
// The following is used for inserting new categories. Also localized automatically from
// MW 1.16 on. When a category is replaced, the namespace prefix of the removed category
// is used for the newly added category.
var hotcat_canonical="Category";
// The following should be the same as [[MediaWiki:Categories]]. Localize manually.
var hotcat_categories="Categories";
 
function hotcat_remove_upload ( text ) {
  var cats = document.getElementById ( "catlinks" ) ;
  cats = cats.getElementsByTagName ( "span" ) ;
  for ( var i = 0 ; i < cats.length ; i++ ) {
    if (cats[i].hotcat_name && cats[i].hotcat_name == text) {
      cats[i].parentNode.removeChild ( cats[i].nextSibling ) ;
      cats[i].parentNode.removeChild ( cats[i] ) ;
      break ;
    }
  }
}
 
function hotcat_check_upload () {
  // Don't do anything if not "Special:Upload", or user not logged in.
  if ( wgNamespaceNumber != -1 || wgCanonicalSpecialPageName != "Upload" || wgUserName == null) return ;
  var ip = document.getElementById ( "wpWatchthis" ) ;
  // Go to Special:Upload, choose a local file, enter a target file name without extension,
  // then submit: you get a page that is "Special:Upload", but that doesn't have any form!
  if (ip == null) return;
  var reupload = document.getElementById ('wpForReUpload');
  var destFile = document.getElementById ('wpDestFile');
  if (   (reupload && !!reupload.value)
      || (destFile && (destFile.disabled || destFile.readonly)))
    return; // re-upload form...
  hotcat_upload = 1 ;
  var tr = ip.parentNode.parentNode ;
  var ntr = document.createElement ( "tr" ) ;
  var ntd = document.createElement ( "td" ) ;
  var ntde = document.createElement ( "td" ) ;
  var catline = document.createElement ( "div" ) ;
  var np = document.createElement ( "p" ) ;
 
  ntde.setAttribute ('id', 'hotcatLabel');
  var label = null;
  if (typeof (UFUI) != 'undefined' &&
      typeof (UFUI.getLabel) == 'function') {
    try {
      label = UFUI.getLabel ('wpCategoriesUploadLbl');
    } catch (ex) {
      label = null;
    }
  }
  if (label == null)
    ntde.appendChild (document.createTextNode (hotcat_categories));
  else {
    ntde.setAttribute ('id', 'hotcatLabelTranslated');
    // Change the ID to avoid that UploadForm tries to translate it again.
    ntde.appendChild (label);
  }
  ntde.style.textAlign = "right" ;
  ntde.style.verticalAlign = "middle" ;
  catline.id = "catlinks" ;
  // On the upload form, the suggestion box appears at the very top of the page. That is because
  // the innermost enclosing div of the upload form (and its table) that has position "relative"
  // is the bodyContent div. Try to fix that by giving catline relative positioning, so absolute
  // positioning within should be relative to catline. Lupo, 2008-01-18
  catline.style.position ="relative";
  catline.style.textAlign = "left";
  // Otherwise, it looks bad in the Classic skin on the upload form. Lupo, 2008-05-16
  np.className = "catlinks" ;
  np.style.textAlign = "left";
  catline.appendChild ( np ) ;
  ntd.appendChild ( catline ) ;
  ntde.className = 'mw-label';
  ntr.appendChild ( ntde ) ;
  ntr.appendChild ( ntd ) ;
 
  // Add handler for submit (changed by Lupo, 2008-01-18)
  var form = document.getElementById ('upload');
  // Grrr... they changed the upload form!
  // http://svn.wikimedia.org/viewvc/mediawiki/trunk/phase3/includes/SpecialUpload.php?r1=32033&r2=32190
  if (!form) form = document.getElementById ('mw-upload-form');
  if (form) {
    hotcat_old_onsubmit = form.onsubmit;
    form.onsubmit = hotcat_on_upload;
    tr.parentNode.insertBefore ( ntr , tr ) ; // Insert *above* "Watch this" box
  }
}
 
function hotcat_on_upload () {
  // First, make sure that if we have an open category input form, we close it.
  var input = document.getElementById ('hotcat_text');
  if (input != null) hotcat_closeform ();
 
  var do_submit = true;
  // Call previous onsubmit handler, if any
  if (hotcat_old_onsubmit) {
    if (typeof hotcat_old_onsubmit == 'string')
      do_submit = eval (hotcat_old_onsubmit);
    else if (typeof hotcat_old_onsubmit == 'function')
      do_submit = hotcat_old_onsubmit ();
  }
  if (!do_submit) return false;
  // Only copy the categories if we do submit
  var cats = document.getElementById ( "catlinks" ) ;
  cats = cats.getElementsByTagName ( "span" ) ;
  var eb = document.getElementById ( "wpUploadDescription" )
           || document.getElementById ( "wpDesc" ); // New upload form
  for ( var i = 0 ; i < cats.length ; i++ ) {
    var t = cats[i].hotcat_name;
    if (!t) continue ;
    var key = cats[i].hotcat_key;
    var new_cat = "\[\[" + hotcat_canonical + ":" + t + (key ? "|" + key : "") + "\]\]" ;
    // Only add if not already present
    if (eb.value.indexOf (new_cat) < 0) eb.value += "\n" + new_cat ;
  }
  return true;
}
 
function hotcat () {
  // Disable in some namespaces
  if (   wgNamespaceNumber == 10 // Templates
      || typeof (wgNamespaceIds) != 'unknown'
         && (   wgNamespaceNumber == wgNamespaceIds['creator']
             || wgNamespaceNumber == wgNamespaceIds['timedtext']
            )
     )
  {
    return;
  }
  // First auto-localize the category names
  if (typeof (wgFormattedNamespaces) != 'undefined' && wgFormattedNamespaces['14']) {
    function create_regexp_str (name)
    {
      if (!name || name.length == 0) return "";
      var initial = name.substr (0, 1);
      name = name.substring(1).replace (/[ _]/g, "[ _]").replace(/([\\\^\$\.\?\*\+\(\)])/g, "\\$1");
      return '[' + initial.toLowerCase () + initial.toUpperCase () + ']' + name;
    }
 
    hotcat_canonical = wgFormattedNamespaces['14'];
    hotcat_cnames_regexp += '|' + create_regexp_str (hotcat_canonical);
    for (var cat_name in wgNamespaceIds) {
      if (   typeof (cat_name) == 'string'
          && cat_name.toLowerCase () != hotcat_canonical.toLowerCase ()
          && wgNamespaceIds[cat_name] == 14)
      {
        hotcat_cnames_regexp += '|' + create_regexp_str (cat_name);
      }
    }
  }
  // Note: although we use JSconfig for our user-preferences, these won't show up in your preference
  // page because gadgets are not loaded on Special:Preferences!
  if (typeof (JSconfig) != 'undefined') {
    JSconfig.registerKey('HotCatDelay', 100, 'HotCat autocompletion delay (ms):', 5);
    JSconfig.registerKey('HotCatEditBoxWidth', 40, 'Width of Input box of HotCat (# of characters):', 5);
  }
 
  if ( hotcat_check_action() ) return ; // Edited page, reloading anyway
  if (hotcat_loaded) return; // Guard against double inclusions
  hotcat_loaded = true;
  hotcat_check_upload () ;
 
  function can_edit ()
  {
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
          if (   hotcatGetParamValue ('title', lks[i].href) == wgPageName
              && hotcatGetParamValue ('action', lks[i].href) == 'edit')
            return true;
        }
        return false;
      default:
        // all modern skins:
        return document.getElementById ('ca-edit') != null;
    }
    return false;
  }
 
  if(    (!can_edit () && !hotcat_upload)           // User has no permission to edit
      || wgAction != 'view'                         // User is editing or previewing or...
      || wgNamespaceNumber == -1 && !hotcat_upload) // Special page other than Special:Upload
   return; 
 
  if (!wgIsArticle && !hotcat_upload) return;       // Diff pages...
  // Note that wgIsArticle is also set to true for category, talk, user, etc. pages: anything that
  // can be edited. It is false for diff pages, special pages, and ...
 
  var visible_cats = 
    document.getElementById ('mw-normal-catlinks') ||           // MW 1.13alpha
    getElementsByClassName ( document , "p" , "catlinks" ) [0]; // MW < 1.13 && Special:Upload
  var hidden_cats =
    document.getElementById ('mw-hidden-catlinks');
  if (visible_cats == null) {
    // Insert an empty category line
    var footer = null;
    if (hidden_cats == null) {
      footer = getElementsByClassName (document , "div" , "printfooter")[0];
      if (!footer) return; // Don't know where to insert the category line
    }
    visible_cats = document.createElement ('div');
    visible_cats.setAttribute ('id', 'mw-normal-catlinks');
    var label = document.createElement ('a');
    label.setAttribute ('href', wgArticlePath.replace (/\$1/, 'Special:Categories'));
    label.setAttribute ('title', 'Special:Categories');
    label.appendChild (document.createTextNode (hotcat_categories));
    visible_cats.appendChild (label);
    visible_cats.appendChild (document.createTextNode (':'));
    var container = (hidden_cats ? hidden_cats.parentNode : document.getElementById ('catlinks'));
    if (!container) {
       container = document.createElement ('div');
       container.id = 'catlinks';
       footer.parentNode.insertBefore (container, footer.nextSibling);
    }
    container.className = 'catlinks';
    container.style.display = "";
    if (!hidden_cats) {
      container.appendChild (visible_cats);
    } else {
      container.insertBefore (visible_cats, hidden_cats);
    }
  } // end if no categories
 
  visible_cats.style.position = 'relative';
  hotcat_modify_existing ( visible_cats ) ;
  hotcat_append_add_span ( visible_cats ) ;
 
  // Check for state restoration (Lupo, 2008-02-06)
  if (   hotcat_upload
      && typeof (UploadForm) != 'undefined'
      && typeof (UploadForm.previous_hotcat_state) != 'undefined'
      && UploadForm.previous_hotcat_state != null)
    UploadForm.previous_hotcat_state = hotcat_set_state (UploadForm.previous_hotcat_state);
}
 
function hotcat_append_add_span ( catline ) {
  var span_add = document.createElement ( "span" ) ;
  if ( catline.getElementsByTagName('span')[0] )
    catline.appendChild (document.createTextNode (" | "));
  else if (catline.firstChild)
    catline.appendChild (document.createTextNode (' '));
  catline.appendChild ( span_add );
  hotcat_create_span ( span_add );
}
 
String.prototype.ucFirst = function () {
   if (this.length < 1) return this;
   return this.substr(0,1).toUpperCase() + this.substr(1,this.length);
}
 
function hotcat_is_on_blacklist ( cat_title ) {
  if ( !cat_title ) return 0 ;
  // cat_title = cat_title.split(":",2).pop() ; // Not needed anymore: we work without 'Category:'
  for ( var i = 0 ; i < hotcat_modify_blacklist.length ; i++ ) {
    if ( cat_title.substr ( 0 , hotcat_modify_blacklist[i].length ) == hotcat_modify_blacklist[i] ) return 1 ;
  }
  return 0 ;
}
 
function hotcat_modify_span ( span , i ) {
  //var cat_title = span.firstChild.getAttribute ( "title" ) ;
  // This fails with MW 1.13alpha if the category is a redlink, because MW 1.13alpha appends
  // [[MediaWiki:Red-link-title]] to the category name... it also fails if the category name
  // contains "&" (because that is represented by &amp; in the XHTML both in the title and in
  // the link's content (innerHTML). Extract the category name from the href instead:
  var cat_title = null;
  var classes   = " " + span.firstChild.className + " ";
  var href      = span.firstChild.getAttribute ('href', 2);
  // Extra param "2" is ignored on W3C compliant browsers. It's for IE only. Note:
  // span.firstChild.href is the normalized URL, getAttribute ('href') should be the text from
  // the XHTML source, but IE somehow (a) also returns a full URL with server part, and (b)
  // IE6 insists on wrongly decoding encoded UTF-8 characters ("K%C3%B6ln-Riehl" becomes
  // "KÃ¶ln-Riehl"). The work-around is to use the special IE variant with the extra parameter,
  // which Microsoft says returns the simple string as found in the XHTML. See their docu at
  // http://msdn.microsoft.com/en-us/library/ms536429(VS.85).aspx .
  if (!href) return;
  if (classes && classes.indexOf (' new ') >= 0) { // href="/w/index.php?title=...&action=edit"
    cat_title = hotcatGetParamValue ('title', href);
  } else { // href="/wiki/..."
    var prefix = wgArticlePath.replace ('$1', "");
    if (href.indexOf (prefix) != 0) prefix = wgServer + prefix; // Fully expanded URL?
    if (href.indexOf (prefix) == 0) {
      cat_title = decodeURIComponent (href.substring (prefix.length));
    }
  }
  if (!cat_title) return;
  // Strip namespace, replace _ by blank
  cat_title = cat_title.substring (cat_title.indexOf (':') + 1).replace (/_/g, ' ');
 
  var remove_link = document.createElement ( "a" ) ;
  // Set the href to a dummy value to make sure we don't move if somehow the onclick handler
  // is bypassed.
  remove_link.href = "#catlinks";
  remove_link.onclick = hotcat_remove;
  remove_link.appendChild ( document.createTextNode ( "(−)" ) ) ;
  span.appendChild ( document.createTextNode ( " " ) ) ;
  span.appendChild ( remove_link ) ;
 
  if ( hotcat_is_on_blacklist ( cat_title ) ) return ;
  var mod_id = "hotcat_modify_" + i ;
  var modify_link = document.createElement ( "a" ) ;
  modify_link.id = mod_id ;
  modify_link.href = "javascript:hotcat_modify(\"" + mod_id + "\");" ;
  modify_link.appendChild ( document.createTextNode ( "(±)" ) ) ;
  span.appendChild ( document.createTextNode ( " " ) ) ;
  span.appendChild ( modify_link ) ;
  //Store the extracted category name in our own new property of the span DOM node
  span.hotcat_name = cat_title;
}
 
function hotcat_modify_existing ( catline ) {
  var spans = catline.getElementsByTagName ( "span" ) ;
  for ( var i = 0 ; i < spans.length ; i++ ) {
    hotcat_modify_span ( spans[i] , i ) ;
  }
}
 
function hotcat_getEvt (evt) {
  return evt || window.event || window.Event; // Gecko, IE, Netscape
}
 
function hotcat_evt2node (evt) {
  var node = null;
  try {
    var e = hotcat_getEvt (evt);
    node = e.target;
    if (!node) node = e.srcElement;
  } catch (ex) {
    node = null;
  }
  return node;
}
 
function hotcat_evtkeys (evt) {
  var code = 0;
  try {
    var e = hotcat_getEvt (evt);
    if (typeof(e.ctrlKey) != 'undefined') { // All modern browsers
      if (e.ctrlKey)  code |= 1;
      if (e.shiftKey) code |= 2;
    } else if (typeof (e.modifiers) != 'undefined') { // Netscape...
      if (e.modifiers & Event.CONTROL_MASK) code |= 1;
      if (e.modifiers & Event.SHIFT_MASK)   code |= 2;
    }
  } catch (ex) {
  }
  return code;
}
 
function hotcat_killEvt (evt)
{
  try {
    var e = hotcat_getEvt (evt);
    if (typeof (e.preventDefault) != 'undefined') {
      e.preventDefault ();
      e.stopPropagation ();
    } else
      e.cancelBubble = true;
  } catch (ex) {
  }
}
 
function hotcat_remove (evt) {
  var node = hotcat_evt2node (evt);
  if (!node) return false;
  // Get the category name from the original link to the category, which is at
  // node.parentNode.firstChild (the DOM structure here is
  // <span><a...>Category</a> <a...>(−)</a>...</span>).
  var cat_title = node.parentNode.hotcat_name; 
  if ( hotcat_upload ) {
    hotcat_remove_upload ( cat_title ) ;
    hotcat_killEvt (evt);
    return false;
  }
  var editlk = wgServer + wgScript + '?title=' + encodeURIComponent (wgPageName)
             + '&action=edit';
  if (hotcat_evtkeys (evt) & 1) // CTRL pressed?
    editlk = editlk + '&hotcat_nocommit=1';
  hotcat_killEvt (evt);
  document.location = editlk + '&hotcat_removecat=' + encodeURIComponent (cat_title);
  return false;
}
 
function hotcatGetParamValue(paramName, h) {
  if (typeof h == 'undefined' ) { h = document.location.href; }
  var cmdRe=RegExp('[&?]'+paramName+'=([^&]*)');
  var m=cmdRe.exec(h);
  if (m) {
    try {
      return decodeURIComponent(m[1]);
    } catch (someError) {}
  }
  return null;
}
 
// New. Code by Lupo & Superm401, added by Lupo, 2008-02-27
function hotcat_find_category (wikitext, category)
{
  var cat_name  = category.replace(/([\\\^\$\.\?\*\+\(\)])/g, "\\$1");
  var initial   = cat_name.substr (0, 1);
  var cat_regex = new RegExp ("\\[\\[\\s*(" + hotcat_cnames_regexp + ")\\s*:\\s*"
                              + (initial == "\\"
                                 ? initial
                                 : "[" + initial.toUpperCase() + initial.toLowerCase() + "]")
                              + cat_name.substring (1).replace (/[ _]/g, "[ _]")
                              + "\\s*(\\|.*?)?\\]\\]", "g"
                             );
  var result = new Array ();
  var curr_match  = null;
  while ((curr_match = cat_regex.exec (wikitext)) != null) {
    result [result.length] = {match : curr_match};
  }
  return result; // An array containing all matches, with positions, in result[i].match
}
 
// New. Code by TheDJ, 2008-03-12. Comment and nowiki skipping by Lupo, 2010-01-31.
function hotcat_find_insertionpoint (wikitext)
{
  function replaceByBlanks (match)
  {
    return match.replace(/(\s|\S)/g, ' '); // /./ doesn't match linebreaks. /(\s|\S)/ does.
  }
  var copiedtext = wikitext.replace(/<\!--(\s|\S)*?--\>/g, replaceByBlanks)
                           .replace(/<nowiki\>(\s|\S)*?<\/nowiki>/g, replaceByBlanks);
  // Search in copiedtext to avoid that we insert inside an HTMl comment or a nowiki "element".
  var re = new RegExp("\\[\\[\\s*(?:" + hotcat_cnames_regexp + ")\\s*:\[^\\]\]+\\]\\]", "ig" );
  var index = -1;
  while( re.exec(copiedtext) != null ) index = re.lastIndex; 
  //we should try to find interwiki links here, but that's for later.
  return index;
}
 
// All redirects to Template:Uncategorized 
var hotcat_uncat_regex =
  /\{\{\s*([Uu]ncat(egori[sz]ed( image)?)?|[Nn]ocat|[Nn]eedscategory)[^}]*\}\}/g;
 
// Rewritten (nearly) from scratch. Lupo, 2008-02-27
function hotcat_check_action () {
  var ret = 0;
  if (wgAction != 'edit') return ret; // Not an edit page, so not our business...
  if (!document.editform || !document.editform.wpTextbox1) return ret; // No edit form??
  var summary = new Array () ;
  var t = document.editform.wpTextbox1.value ;
  var prevent_autocommit = 0;
  if (   (typeof hotcat_no_autocommit != "undefined" && hotcat_no_autocommit)
      || hotcatGetParamValue ('hotcat_nocommit') == '1')
    prevent_autocommit = 1;
 
  var cat_rm    = hotcatGetParamValue ('hotcat_removecat');
  var cat_add   = hotcatGetParamValue ('hotcat_newcat');
  var comment   = hotcatGetParamValue ('hotcat_comment') || "";
  var cat_key   = hotcatGetParamValue ('hotcat_sortkey');
  var cat_name  = hotcat_canonical;
  var cat_point = -1; // Position of removed category;
 
  if (cat_key != null) cat_key = '|' + cat_key;
  if (cat_rm != null && cat_rm.length > 0) {
    var matches = hotcat_find_category (t, cat_rm);
    if (!matches || matches.length == 0) {
      alert ('Category "' + cat_rm + '" not found; maybe it is in a template?');
      prevent_autocommit = 1;
    } else if (matches.length > 1) {
      alert ('Category "' + cat_rm
             + "\" found several times; don't know which occurrence to remove.");
      prevent_autocommit = 1;
    } else {
      if (cat_add != null && cat_add.length > 0 && matches[0].match.length > 1) {
        cat_name = matches[0].match[1] || cat_name;
        if (cat_key == null) cat_key  = matches[0].match[2]; // Remember the category key, if any.
      }
      var t1 = t.substring (0, matches[0].match.index);
      var t2 = t.substring (matches[0].match.index + matches[0].match[0].length);
      // Remove whitespace (properly): strip whitespace, but only up to the next line feed.
      // If we then have two linefeeds in a row, remove one. Otherwise, if we have two non-
      // whitespace characters, insert a blank.
      var i = t1.length - 1;
      while (i >= 0 && t1.charAt (i) != '\n' && t1.substr (i, 1).search (/\s/) >= 0) i--;
      var j = 0;
      while (j < t2.length && t2.charAt (j) != '\n' && t1.substr (j, 1).search (/\s/) >= 0) j++;
      if (i >= 0 && t1.charAt (i) == '\n' && j < t2.length && t2.charAt (j) == '\n')
        i--;
      if (i >= 0) t1 = t1.substring (0, i+1); else t1 = "";
      if (j < t2.length) t2 = t2.substring (j); else t2 = "";
      if (t1.length > 0 && t1.substring (t1.length - 1).search (/\S/) >= 0
          && t2.length > 0 && t2.substr (0, 1).search (/\S/) >= 0)
        t1 = t1 + ' ';
      cat_point = t1.length;
      t = t1 + t2;
      summary.push ( "removed \[\[:Category:" + cat_rm + "\]\]" ) ;
      ret = 1;
    }
  }
  if (cat_add != null && cat_add.length > 0) {
    var matches = hotcat_find_category (t, cat_add);
    if (matches && matches.length > 0) {
      alert ('Category "' + cat_add + '" already exists; not added.');
      prevent_autocommit = 1;
    } else {
      var insertionpoint = hotcat_find_insertionpoint (t);
      if (insertionpoint < 0) {
        // No categories found. If we removed one earlier, insert at that position.
        insertionpoint = cat_point;
      }
      var newcatstring = '\n\[\[' + cat_name + ':' + cat_add + (cat_key || "") + '\]\]';
      if (insertionpoint >= 0) {
        t = t.substring (0, insertionpoint) + newcatstring + t.substring (insertionpoint);
      } else {
        t = t + newcatstring;
      }
      summary.push ("added \[\[Category:" + cat_add + "\]\]" + comment);
      var t2 = t.replace(hotcat_uncat_regex, ""); // Remove "uncat" templates
      if (t2.length != t.length) {
        t = t2;
        summary.push ( "removed {{uncategorized}}" ) ;
      }
      ret = 1;
    }
  }
  if (ret) {
    document.editform.wpTextbox1.value = t ;
    document.editform.wpSummary.value = summary.join( "; " )
                                      + " using [[Help:Gadget-HotCat|HotCat]]" ;
    document.editform.wpMinoredit.checked = true ;
    if (!prevent_autocommit) {
      // Hide the entire edit section so as not to tempt the user into editing...
      var content =    document.getElementById ("bodyContent")       // "monobook" skin
                    || document.getElementById ("mw_contentholder")  // "modern" skin
                    || document.getElementById ("article");          // classic skins
      if (content) content.style.display = "none" ;
      document.editform.submit ();
    }
  }
  return ret;
}
 
function hotcat_clear_span ( span_add ) {
  while ( span_add.firstChild ) span_add.removeChild ( span_add.firstChild ) ;
}
 
function hotcat_create_span ( span_add ) {
  hotcat_clear_span ( span_add ) ;
  var a_add = document.createElement ( "a" ) ;
  var a_text = document.createTextNode ( "(+)" ) ;
  span_add.id = "hotcat_add" ;
  a_add.href = "javascript:hotcat_add_new()" ;
  a_add.appendChild ( a_text ) ;
  span_add.appendChild ( a_add ) ;
}
 
function hotcat_modify ( link_id ) {
  var link = document.getElementById ( link_id ) ;
  var span = link.parentNode ;
  var catname = span.hotcat_name;
 
  while ( span.firstChild.nextSibling ) span.removeChild ( span.firstChild.nextSibling ) ;
  span.firstChild.style.display = "none" ;
  hotcat_create_new_span ( span , catname ) ;
  hotcat_last_v = "" ;
  hotcat_text_changed () ; // Update icon
}
 
function hotcat_add_new () {
  var span_add = document.getElementById ( "hotcat_add" ) ;
  hotcat_clear_span ( span_add ) ;
  hotcat_last_v = "" ;
  hotcat_create_new_span ( span_add , "" ) ;
}
 
function hotcat_button_label (id, defaultText)
{
  var label = null;
  if (hotcat_upload
      && typeof (UFUI) != 'undefined'
      && typeof (UFUI.getLabel) == 'function') {
    try {
      label = UFUI.getLabel (id, true);
      // Extract the plain text. IE doesn't know that Node.TEXT_NODE == 3
      while (label && label.nodeType != 3) label = label.firstChild;
    } catch (ex) {
      label = null;
    }
  }
  if (label == null || !label.data) return defaultText;
  return label.data;    
}
 
function hotcat_create_new_span ( thespan , init_text ) {
  var form = document.createElement ( "form" ) ;
  form.method = "post" ;
  form.onsubmit = function () { hotcat_ok(); return false; } ; 
  form.id = "hotcat_form" ;
  form.style.display = "inline" ;
 
  var list = null;
 
  if (!hotcat_nosuggestions) {
    // Only do this if we may actually use XMLHttp...
    list = document.createElement ( "select" ) ;
    list.id = "hotcat_list" ;
    list.onclick = function ()
      {
        var l = document.getElementById("hotcat_list");
        if (l != null) {
          var text = document.getElementById("hotcat_text");
          var v = text.value.split('|');
          text.value = l.options[l.selectedIndex].text + (v.length > 1 ? '|' + v[1] : "");
        }
        hotcat_text_changed();
      };
    list.ondblclick = function (evt)
      {
        var l = document.getElementById("hotcat_list");
        if (l != null) {
          var text = document.getElementById("hotcat_text");
          var v = text.value.split('|');
          text.value = l.options[l.selectedIndex].text + (v.length > 1 ? '|' + v[1] : "");
        }
        // Don't call text_changed here if on upload form: hotcat_ok will remove the list
        // anyway, so we must not ask for new suggestions since show_suggestions might
        // raise an exception if it tried to show a no longer existing list.
        // Lupo, 2008-01-20
        if (!hotcat_upload) hotcat_text_changed();
        hotcat_ok(hotcat_evtkeys (evt) & 1); // CTRL pressed?
      };
    list.style.display = "none" ;
  }
 
  var text = document.createElement ( "input" ) ;
  var default_width =
    (typeof (JSconfig) != 'undefined'
     ? JSconfig.keys['HotCatEditBoxWidth']
     : hotcat_editbox_width
    );
  var default_delay =
    (typeof (JSconfig) != 'undefined'
     ? JSconfig.keys['HotCatDelay']
     : hotcat_suggestion_delay
    );
  if (default_delay < 0) default_delay = 0;
  text.size = (default_width < 40 ? 40 : default_width);
  text.id = "hotcat_text" ;
  text.type = "text" ;
  text.value = init_text ;
  text.onkeyup =
    function ()
    {
      window.setTimeout ("hotcat_text_changed ();", default_delay);
    };
 
  var exists = null;
  if (!hotcat_nosuggestions) {
    exists = document.createElement ( "img" ) ;
    exists.id = "hotcat_exists" ;
    exists.src = hotcat_exists_no ;
  }
 
  var OK = document.createElement ( "input" ) ;
  OK.type = "button" ;
  OK.value = hotcat_button_label ('wpOkUploadLbl', 'OK') ;
  OK.onclick = function (evt) { hotcat_ok (hotcat_evtkeys (evt) & 1); };
 
  var cancel = document.createElement ( "input" ) ;
  cancel.type = "button" ;
  cancel.value = hotcat_button_label ('wpCancelUploadLbl', 'Cancel') ;
  cancel.onclick = hotcat_cancel ;
 
  if (list != null) form.appendChild ( list ) ;
  form.appendChild ( text ) ;
  if (exists != null) form.appendChild ( exists ) ;
  form.appendChild ( OK ) ;
  form.appendChild ( cancel ) ;
  thespan.appendChild ( form ) ;
  text.focus () ;
}
 
function hotcat_sanitize_input () {
  var text = document.getElementById ( "hotcat_text" ) ;
  if (!text) return;
  var v = text.value || "";
  v = v.replace(/^(\s|_)+/, ""); // Trim leading blanks and underscores
  var re = new RegExp ('^(' + hotcat_cnames_regexp + '):');
  if (re.test (v)) {
    v = v.substring (v.indexOf (':') + 1);
  }
  v = v.ucFirst();
  // Only update the input field if there is a difference. IE8 appears to reset the selection
  // and place the cursor at the front upon reset, which makes our autocompletetion become a
  // nuisance. FF and IE6 don't seem to have this problem.
  if (text.value != null && text.value != v)
    text.value = v;
}
 
function hotcat_ok (nocommit) {
  hotcat_sanitize_input ();
  var text = document.getElementById ( "hotcat_text" ) ;
  var v   = text.value || "";
  var pipe = v.indexOf ('|');
  if (pipe >= 0) v = v.substring (0, pipe);
  v = v.replace(/_/g, ' ').replace(/\s\s*$/, "");
  // Empty category ?
  if (!v) {
    hotcat_cancel() ;
    return ;
  }
  // Get the links and the categories of the chosen category page
  var url = wgServer + wgScriptPath + '/api.php?action=query&titles='
          + encodeURIComponent ('Category:' + v)
          + '&prop=info|links|categories&plnamespace=14&pllimit=50&format=json';
  var request = sajax_init_object() ;
  if (request == null) {
    //Oops! We don't have XMLHttp...
    hotcat_nosuggestions = true;
    hotcat_closeform (nocommit);
    hotcat_running = 0;
    return;
  }
  request.open ('GET', url, true);
  request.onreadystatechange =
    function () {
      if (request.readyState != 4) return;
      if (request.status != 200) {
        hotcat_closeform (nocommit);
      } else {
        var txt = document.getElementById ('hotcat_text');
        var original = txt.value;
        var do_submit = hotcat_json_resolve (eval ('(' + request.responseText + ')'));
        if (do_submit) {
          hotcat_closeform (
             nocommit
            ,(txt.value != original) ? " (redirect \[\[Category:" + v + "\]\] resolved)" : null
          );
        }
      }
    };
  request.setRequestHeader ('Pragma', 'cache=yes');
  request.setRequestHeader ('Cache-Control', 'no-transform');
  request.send (null);
}
 
function hotcat_json_resolve (params)
{
  function resolve (page)
  {
    var cats     = page.categories;
    var is_dab   = false;
    var is_redir = typeof (page.redirect) == 'string'; // Hard redirect?
    if (!is_redir && cats) {
      for (var c = 0; c < cats.length; c++) {
        var cat = cats[c]["title"];
        if (cat) cat = cat.substring (cat.indexOf (':') + 1); // Strip namespace prefix
        if (cat == 'Disambiguation') {
          is_dab = true; break;
        } else if (cat == 'Category_redirects' || cat == 'Category redirects') {
          is_redir = true; break;
        }
      }
    }
    if (!is_redir && !is_dab) return true;
    var lks = page.links;
    var titles = new Array ();
    for (i = 0; i < lks.length; i++) {
      if (   lks[i]["ns"] == 14                               // Category namespace
          && lks[i]["title"] && lks[i]["title"].length > 0) { // Name not empty
        // Internal link to existing thingy. Extract the page name.
        var match = lks[i]["title"];
        // Remove the category prefix
        match = match.substring (match.indexOf (':') + 1);
        titles.push (match);
        if (is_redir) break;
      }
    }
    if (titles.length > 1) {
      // Disambiguation page
      hotcat_show_suggestions (titles);
      return false;
    } else if (titles.length == 1) {
      var text = document.getElementById ("hotcat_text");
      var v = text.value.split('|');
      text.value = titles[0] + (v.length > 1 ? '|' + v[1] : "");
    }
    return true;
  } // end local function resolve
 
  // We should have at most one page here
  for (var page in params.query.pages) return resolve (params.query.pages[page]);
  return true; // In case we have none.
}
 
function hotcat_closeform (nocommit, comment)
{
  hotcat_sanitize_input ();
  var text = document.getElementById ( "hotcat_text" ) ;
  var v = text.value.split('|');
  var key = v.length > 1 ? v[1] : null;
  v = v[0].replace(/_/g, ' ').replace(/\s\s*$/, "");
  if (!v                                                 // Empty
      || wgNamespaceNumber == 14 && v == wgTitle         // Self-reference
      || text.parentNode.parentNode.id != 'hotcat_add'   // Modifying, but
         && text.parentNode.parentNode.hotcat_name == v) //   name unchanged
  {
    hotcat_cancel ();
    return;
  }
 
  if (hotcat_upload) {
    hotcat_just_add (v, key) ; // Close the form
    return ;
  }
  var editlk = wgServer + wgScript + '?title=' + encodeURIComponent (wgPageName)
             + '&action=edit';
  var url = editlk + '&hotcat_newcat=' + encodeURIComponent( v ) ;
 
  if (key && key.length > 0) url += '&hotcat_sortkey=' + encodeURIComponent (key);
  // Editing existing?
  var span = text.parentNode.parentNode ; // span.form.text
  if ( span.id != "hotcat_add" ) { // Not plain "addition"   
    url += '&hotcat_removecat=' + encodeURIComponent (span.hotcat_name);
  }
  if (nocommit) url = url + '&hotcat_nocommit=1';
  if (comment) url = url + '&hotcat_comment=' + encodeURIComponent (comment);
  // Make the list disappear:
  var list = document.getElementById ( "hotcat_list" ) ;
  if (list) list.style.display = 'none';
 
  document.location = url ;
}
 
function hotcat_just_add ( text, key ) {
  var span = document.getElementById("hotcat_form") ;
  while ( span.tagName != "SPAN" ) span = span.parentNode ;
  var add = 0 ;
  if ( span.id == "hotcat_add" ) add = 1 ;
  span.id = "" ;
  while ( span.firstChild ) span.removeChild ( span.firstChild ) ;
  var na = document.createElement ( "a" ) ;
  na.href = wgArticlePath.split("$1").join("Category:" + encodeURI (text)) ;
  na.appendChild ( document.createTextNode ( text ) ) ;
  na.setAttribute ( "title" , "Category:" + text ) ;
  span.appendChild ( na ) ;
  var catline = getElementsByClassName ( document , "p" , "catlinks" ) [0] ;
  if ( add ) hotcat_append_add_span ( catline ) ;
 
  for ( var i = 0 ; i < span.parentNode.childNodes.length ; i++ ) {
    if ( span.parentNode.childNodes[i] != span ) continue ;
    hotcat_modify_span ( span , i ) ;
    span.hotcat_key = (key && key.length > 0) ? key : null;
    break ;
  }
}
 
function hotcat_cancel () {
  var span = document.getElementById("hotcat_form").parentNode ;
  if ( span.id == "hotcat_add" ) {
    hotcat_create_span ( span ) ;
  } else {
    while ( span.firstChild.nextSibling ) span.removeChild ( span.firstChild.nextSibling ) ;
    span.firstChild.style.display = "" ;
    for ( var i = 0 ; i < span.parentNode.childNodes.length ; i++ ) {
      if ( span.parentNode.childNodes[i] != span ) continue ;
      hotcat_modify_span ( span , i ) ;
      break ;
    }
  }
}
 
function hotcat_text_changed () {
  if ( hotcat_running ) return ;
  hotcat_sanitize_input ();
  var text = document.getElementById ( "hotcat_text" ) ;
  var v = text.value;
  // Disregard anything after a pipe.
  var pipe = v.indexOf ('|');
  if (pipe >= 0) v = v.substring (0, pipe);
  if ( hotcat_last_v == v ) return ; // Nothing's changed...
 
  if (hotcat_nosuggestions) {
    // On IE, XMLHttp uses ActiveX, and the user may deny execution... just make sure
    // the list is not displayed.
    var list = document.getElementById ('hotcat_list');
    if (list != null) list.style.display = "none" ;
    var exists = document.getElementById ('hotcat_exists');
    if (exists != null) exists.style.display = "none" ;
    return;
  }
 
  hotcat_running = 1 ;
  hotcat_last_v = v ;
 
  if ( v != "" ) {
    var url = wgServer + wgScriptPath
            + "/api.php?format=json&action=opensearch&namespace=14&limit=30&search="
            + encodeURIComponent( v ) ;
    var request = sajax_init_object() ;
    if (request == null) {
      //Oops! We don't have XMLHttp...
      hotcat_nosuggestions = true;
      var list = document.getElementById ('hotcat_list');
      if (list != null) list.style.display = "none" ;
      var exists = document.getElementById ('hotcat_exists');
      if (exists != null) exists.style.display = "none" ;
      hotcat_running = 0;
      return;
    } 
    request.open('GET', url, true);
    request.onreadystatechange =
      function () {
        if (request.readyState == 4 && request.responseText != null && request.responseText.indexOf ('[') == 0) {
          var result = eval ('(' + request.responseText + ')');
          if (result != null && result.length == 2 && result[0] == v) {
            var titles = result[1];
            for (var i = 0; i < titles.length; i++) {
              // Remove the namespace. No hardcoding of 'Category:', please, other Wikis may have
              // local names ("Kategorie:" on de-WP, for instance). Also don't break on category
              // names containing a colon
              titles[i] = titles[i].substring (titles[i].indexOf (':') + 1);
            }
            // Opensearch may (or may not, depending on which search backend it uses) return entries out of alphabetical
            // order (and even containing "similar characters", for instance, for prefix "Sidl", you might get back
            // "Šidlovská" or "Sídliště Háje"!). Hmmm... shall we sort them again here? But then how to sort "í" with
            // "i"? We do *not* want a full-blown UCA http://www.unicode.org/reports/tr10/tr10-16.html here! Anyway, if
            // you want to sort the suggestions in some way, do it here.
            titles.sort (
              function (a, b) {
                if (a.indexOf (b) == 0) return 1; // a begins with b: a > b
                if (b.indexOf (a) == 0) return -1; // b begins with a: a < b
                // Opensearch may return stuff not beginning with the search prefix!
                var prefixMatchA = (a.indexOf (v) == 0 ? 1 : 0);
                var prefixMatchB = (b.indexOf (v) == 0 ? 1 : 0);
                if (prefixMatchA != prefixMatchB) return prefixMatchB - prefixMatchA;
                if (a < b) return -1;
                if (b < a) return 1;
                return 0;
              }
            );
            hotcat_show_suggestions (titles) ;
          }
        }
      };
    request.setRequestHeader ('Pragma', 'cache=yes');
    request.setRequestHeader ('Cache-Control', 'no-transform');
    request.send (null);
  } else {
    hotcat_show_suggestions ([]);
  }
  hotcat_running = 0 ;
}
 
function hotcat_show_suggestions ( titles ) {
  var text = document.getElementById ( "hotcat_text" ) ;
  var list = document.getElementById ( "hotcat_list" ) ;
  var icon = document.getElementById ( "hotcat_exists" ) ;
  // Somehow, after a double click on the selection list, we still get here in IE, but
  // the list may no longer exist... Lupo, 2008-01-20
  if (list == null) return;
  if (hotcat_nosuggestions) {
    list.style.display = "none" ;
    if (icon != null) icon.style.display = "none";
    return;
  }
  if ( titles.length == 0 ) {
    list.style.display = "none" ;
    icon.src = hotcat_exists_no ;
    return ;
  }
 
  // Set list size to minimum of 5 and actual number of titles. Formerly was just 5.
  // Lupo, 2008-01-20
  list.size = (titles.length > 5 ? 5 : titles.length) ;
  // Avoid list height 1: double-click doesn't work in FF. Lupo, 2008-02-27
  if (list.size == 1) list.size = 2;
  list.style.align = "left" ;
  list.style.zIndex = 5 ;
  list.style.position = "absolute" ;
 
  // Was listh = titles.length * 20: that makes no sense if titles.length > list.size
  // Lupo, 2008-01-20
  var listh = list.size * 20;
  var nl = parseInt (text.offsetLeft) - 1 ;
  var nt = parseInt (text.offsetTop) - listh ;
  if (skin == 'nostalgia' || skin == 'cologneblue' || skin == 'standard') {
    // These three skins have the category line at the top of the page. Make the suggestions
    // appear *below* out input field.
    nt = parseInt (text.offsetTop) + parseInt (text.offsetHeight) + 3;
  }
  list.style.top = nt + "px" ;
  list.style.width = ""; // No fixed width (yet)
  list.style.height = listh + "px" ;
  list.style.left = nl + "px" ;
  while ( list.firstChild ) list.removeChild ( list.firstChild ) ;
  for ( var i = 0 ; i < titles.length ; i++ ) {
    var opt = document.createElement ( "option" ) ;
    var ot = document.createTextNode ( titles[i] ) ;
    opt.appendChild ( ot ) ;
    //opt.value = titles[i] ;
    list.appendChild ( opt ) ;
  }
 
  icon.src = hotcat_exists_yes ;
 
  var nof_titles = titles.length;
 
  var first_title = titles.shift () ;
  var v = text.value.split('|');
  var key = v.length > 1 ? '|' + v[1] : "";
  v = v[0].ucFirst();
  text.focus ();
  if ( first_title == v ) {
    if (nof_titles == 1) {
      // Only one result, and it's the same as whatever is in the input box: makes no sense
      // to show the list.
      list.style.display = 'none';
    }
    return ;
  }
 
  if (list.offsetWidth < text.offsetWidth)
    list.style.width = text.offsetWidth + "px";
  else {
 
    function position (node)
    {
      var t = 0, l = 0;
      do {
        t = t + (node.offsetTop  || 0);
        l = l + (node.offsetLeft || 0);
        node = node.offsetParent;
      } while (node);
      return {x : l, y : t};
    }
 
    function scroll_offset (what)
    {
      var s = 'scroll' + what;
      return (document.documentElement ? document.documentElement[s] : 0)
             || document.body[s] || 0;
    }
 
    function viewport (what)
    {
      if (typeof (is_safari) != 'undefined' && is_safari && !document.evaluate)
        return window['inner' + what];
      var s = 'client' + what;
      if (typeof (is_opera) != 'undefined' && is_opera) return document.body[s];
      return (document.documentElement ? document.documentElement[s] : 0)
             || document.body[s] || 0;
    }
 
    var scroll = scroll_offset ('Left');
    var view_w = viewport ('Width');
    var l_pos  = position (list);
    var w      = list.offsetWidth;
    if (l_pos.x + w > scroll + view_w) {
      if (w > view_w) w = view_w;
      list.style.width = w + "px";
      list.style.left = nl - (l_pos.x + w - scroll - view_w) + "px";
    }
  }
 
  list.style.display = "block" ;
 
  // Put the first entry of the title list into the text field, and select the
  // new suffix such that it'll be overwritten if the user keeps typing.
  // ONLY do this if we have a way to select parts of the content of a text
  // field, otherwise, this is very annoying for the user. Note: IE does it
  // again differently from the two versions previously implemented.
  // Lupo, 2008-01-20
  // Only put first entry into the list if the user hasn't typed something 
  // conflicting yet Dschwen 2008-02-18
  if ( ( text.setSelectionRange ||
         text.createTextRange ||
         typeof (text.selectionStart) != 'undefined' &&
         typeof (text.selectionEnd) != 'undefined' ) &&
         v == first_title.substr(0,v.length) )
  {
    // taking hotcat_last_v was a major annoyance, 
    // since it constantly killed text that was typed in
    // _since_ the last AJAX request was fired! Dschwen 2008-02-18
    var nosel = v.length ;
 
    text.value = first_title + key;
 
    if (text.setSelectionRange)      // e.g. khtml
      text.setSelectionRange (nosel, first_title.length);
    else if (text.createTextRange) { // IE
      var new_selection = text.createTextRange();
      new_selection.move ("character", nosel);
      new_selection.moveEnd ("character", first_title.length - nosel);
      new_selection.select();
    } else {
      text.selectionStart = nosel;
      text.selectionEnd   = first_title.length;
    }
    if (nof_titles == 1) {
      // Only one result, and we've just put it into the input box: makes no sense
      // to show the list.
      list.style.display = 'none';
    }
 
  }
}
 
function hotcat_get_state ()
{
  var cats = document.getElementById ('catlinks');
  if (cats == null) return "";
  var result = null;
  cats = cats.getElementsByTagName ('span') ;
  for (var i = 0; i < cats.length; i++ ) {
    var text = cats[i].hotcat_name;
    var key  = cats[i].hotcat_key;
    if (text) {
      if (key) text += '|' + key;
      if (result == null)
        result = text;
      else
        result = result + '\n' + text;
    }
  }
  return result;
}
 
function hotcat_set_state (state)
{
  var cats = state.split ('\n');
  if (cats.length == 0) return null;
  var parent = document.getElementById ('catlinks');
  if (parent == null) return state;
  // HotCat uses a 'p' element inside the 'div' to wrap its spans...
  parent = parent.firstChild;
  if (parent == null || parent.className != 'catlinks') return state;
  var n = (parent.childNodes ? parent.childNodes.length - 1 : 0);
  if (n < 0) n = 0;
  var before = parent.lastChild;
  for (var i = 0; i < cats.length; i++) {
    if (cats[i].length > 0) {
      var cat = cats[i].split ('|');
      var key = cat.length > 1 ? cat[1] : null;
      cat = cat[0];
      var lk = document.createElement ('a');
      lk.href = wgArticlePath.split ('$1').join ('Category:' + encodeURI (cat));
      lk.appendChild (document.createTextNode (cat));
      lk.setAttribute ('title', cat);
      var span = document.createElement ('span');
      span.appendChild (lk);
      parent.insertBefore (span, before);
      if (before != null) parent.insertBefore (document.createTextNode (' | '), before);
      hotcat_modify_span (span, n++);
      span.hotcat_key = key;
    }
  }
  return null;
}
 
addOnloadHook ( hotcat ) ;
 
} // end if (guard)
//</source>