/* <source lang="javascript">
  *   Script:  [[Wikipedysta:Leafnode/HotCat.js]]
  * HotCat: Łatwy sposób na dodawanie, modyfikację i usuwanie kategorii
  * Dokumentacja: [[:en:User:TheDJ/HotCat]]
  * Autor: Magnus Manske
  * 
  * This version was forked from http://commons.wikimedia.org/w/index.php?title=MediaWiki:Gadget-HotCat.js&oldid=10204404
  * Major changes:
  *   - blacklist code is disabled.
  *   - all code for the uploadForm has been removed
  *   - autocommit is disabled
  *   - will be enabled on pages without categories so that you can easily add them
  *   - uses javascript:void() as a dummy value for href in order to avoid a conflict with popups.
  *   - checks for {{Uncategorized}} and removes it if a category is added
  *   - does not use JSconfig for configuration options like its Commons original
  *   - tries to detect other categories and if possible, add to the end of them.
  *   - fixes a bug in the suggestion list with titles containing : character
  * [[User:TheDJ]] 2008-03-12
  *  ------------------------------------------------------------------
  *  SKRYPT Z WIKIPEDII (http://pl.wikipedia.org/wiki/MediaWiki:Gadget-HotCat.js)
  *  ------------------------------------------------------------------
  */
var hotcat_running = 0 ;
var hotcat_last_v = "" ;
var hotcat_exists_yes = "http://upload.wikimedia.org/wikipedia/commons/thumb/b/be/P_yes.svg/20px-P_yes.svg.png" ;
var hotcat_exists_no = "http://upload.wikimedia.org/wikipedia/commons/thumb/4/42/P_no.svg/20px-P_no.svg.png" ;
 
var hotcat_no_autocommit = 1;
// In Commons hotcat_suggestion_delay is configurable trough JSconfig
var hotcat_suggestion_delay = 100;
 
var hotcat_old_onsubmit = null;
var hotcat_nosuggestions = false;
// hotcat_nosuggestions is set to true if we don't have XMLHttp! (On IE6, XMLHttp uses
// ActiveX, and the user may deny execution.) If true, no suggestions will ever be
// displayed, and there won't be any checking whether the category  exists.
// Lupo, 2008-01-20
 
var hotcat_modify_blacklist = new Array (
""
) ;
 
// Do not add interface to templates
if (wgNamespaceNumber != 10)
  addOnloadHook ( hotcat ) ;
 
function hotcat () {
  if ( hotcat_check_action() ) return ; // Edited page, reloading anyway
 
  // Do not add interface to protected pages, if user has no edit permission
  // Also disable it on preview pages: on a preview, we *are* already editing,
  // and HotCat must not open the page for editing a second time. Lupo, 2008-02-27
  if( wgAction != "view" || document.getElementById('ca-viewsource' ) != null ||
      wgNamespaceNumber == -1 )
    return;
 
  // If we have no Categories div, then add one
  // TheDJ, 2008-02-28
 
  var visible_catlinks = document.getElementById ('mw-normal-catlinks') || getElementsByClassName ( document , "p" , "catlinks" ) [0];
  var hidden_catlinks = document.getElementById ('mw-hidden-catlinks');
 
  if ( visible_catlinks == null || typeof( visible_catlinks ) == 'undefined' ) {
    d3 = document.createElement ( "div" );
    d3.id = "mw-normal-catlinks";
    d3.innerHTML = '<a href="' + wgArticlePath.replace("$1", "Specjalna:Kategorie") + '" title="Specjalna:Kategorie">Kategorie</a>: ';
    visible_catlinks = d3;
 
    if ( hidden_catlinks ) {
      // There are hidden categories.
      hidden_catlinks.parentNode.insertBefore( d3, hidden_catlinks );
      hidden_catlinks.parentNode.className = "catlinks";
    } else {
      // This page has no categories at all, lets create a section where we can add them.
      var footer = getElementsByClassName ( document , "div" , "printfooter" ) [0];
      if( !footer ) return; // We have no idea where we should add this.
 
      d1 = document.createElement ( "div" );
      d1.id = "catlinks";
      d1.className = "catlinks";
      d1.appendChild ( d3 );
      footer.parentNode.insertBefore( d1, footer.nextSibling );
    } 
  }
 
  hotcat_modify_existing ( visible_catlinks ) ;
  hotcat_append_add_span ( visible_catlinks ) ;
}
 
function hotcat_append_add_span ( catline ) {
  var span_add = document.createElement ( "span" ) ;
  var span_sep = document.createTextNode ( " • " ) ;
  if ( catline.getElementsByTagName("span")[0] ) catline.appendChild ( span_sep ) ;
  catline.appendChild ( span_add ) ;
  hotcat_create_span ( span_add ) ;
}
 
String.prototype.ucFirst = function () {
   return this.substr(0,1).toUpperCase() + this.substr(1,this.length);
}
 
function hotcat_is_on_blacklist ( cat_title ) {
  if ( !cat_title ) return 0 ;
  cat_title = cat_title.ucFirst.replace( /Kategoria:/gi, "" );
  for ( var i = 0 ; i < hotcat_modify_blacklist.length ; i++ ) {
    if ( cat_title.substr ( 0 , hotcat_modify_blacklist[i].length ) == hotcat_modify_blacklist[i] ) return 1 ;
  }
  return 0 ;
}
 
function hotcat_modify_span ( span , i ) {
  //var cat_title = span.firstChild.getAttribute ( "title" ) ;
  // This fails with MW 1.13alpha if the category is a redlink, because MW 1.13alpha appends
  // [[MediaWiki:Red-link-title]] to the category name... we another way to get that category
  // name. Lupo, 2008-02-27
  var cat_title = span.firstChild.innerHTML; // without "Category:"
 
  var sep1 = document.createTextNode ( " " ) ;
  var a1 = document.createTextNode ( "(-)" ) ;
  var remove_link = document.createElement ( "a" ) ;
  // Set the href to a dummy value to make sure we don't move if somehow the onclick handler
  // is bypassed.
  remove_link.href = "#catlinks";
  remove_link.onclick = hotcat_remove;
  remove_link.appendChild ( a1 ) ;
  span.appendChild ( sep1 ) ;
  span.appendChild ( remove_link ) ;
 
  // Disabled blacklist check TheDJ, 2008-02-28
  // if ( hotcat_is_on_blacklist ( cat_title ) ) return ;
  var mod_id = "hotcat_modify_" + i ;
  var sep2 = document.createTextNode ( " " ) ;
  var a2 = document.createTextNode ( "(±)" ) ;
  var modify_link = document.createElement ( "a" ) ;
  modify_link.id = mod_id ;
  modify_link.href = "javascript:hotcat_modify(\"" + mod_id + "\");" ;
  modify_link.appendChild ( a2 ) ;
  span.appendChild ( sep2 ) ;
  span.appendChild ( modify_link ) ;
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
      if (e.altKey) code |= 4;
    } else if (typeof (e.modifiers) != 'undefined') { // Netscape...
      if (e.modifiers & Event.CONTROL_MASK) code |= 1;
      if (e.modifiers & Event.SHIFT_MASK)   code |= 2;
      if (e.modifiers & Event.ALT_MASK)   code |= 4;
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
      e.preventDefault();
      e.stopPropagation()
    } else
      e.cancelBubble = true;
  } catch (ex) {
  }
}
 
function hotcat_remove (evt) {
  var node = hotcat_evt2node (evt);
  if (!node) return false;
  // Get the category name from the original link to the category
  var cat_title = node.parentNode.firstChild.innerHTML;
 
  var editlk = document.getElementById('ca-edit').getElementsByTagName('a')[0].href;
  if ((hotcat_evtkeys (evt) & 1) || (hotcat_evtkeys (evt) & 4 )) // CTRL or ALT pressed?
    editlk = editlk + '&hotcat_nocommit=1';
  hotcat_killEvt (evt);
  document.location = editlk + '&hotcat_removecat=' + encodeURIComponent(cat_title) ;
  return false;
}
 
function hotcatGetParamValue(paramName, h) {
        if (typeof(h) == 'undefined' ) { h = document.location.href; }
        var cmdRe=RegExp('[&?]'+paramName+'=([^&]*)');
        var m=cmdRe.exec(h);
        if (m) {
                try {
                        return decodeURIComponent(m[1]);
                } catch (someError) {}
        }
        return null;
}
 
// New. Code by Lupo & Superm401, added by Lupo, 2008-02-2007
function hotcat_find_category (wikitext, category)
{
  var cat_name  = category.replace(/([\\\^\$\.\?\*\+\(\)])/g, "\\$1");
  var initial   = cat_name.substr (0, 1);
  var cat_regex = new RegExp ("\\[\\[\\s*[Kk]ategoria\\s*:\\s*"
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
 
// New. Code by TheDJ, 2008-03-12
function hotcat_find_ins ( wikitext )
{
  var re = /\[\[(?:Kategoria):[^\]]+\]\]/ig
  var index = -1;
  while( re.exec(wikitext) != null ) index = re.lastIndex;
 
  if( index > -1) return index;
  //we should try to find interwiki links here, but that's for later.
 
  return -1;
}
 
// Rewritten (nearly) from scratch. Lupo, 2008-02-27
function hotcat_check_action () {
  var ret = 0;
  if (wgAction != 'edit' || typeof(document.editform) == "undefined" ) return ret; // Not an edit page, so not our business...
  var summary = new Array () ;
  var t = document.editform.wpTextbox1.value ;
  var prevent_autocommit = 0;
  if (   (typeof (hotcat_no_autocommit) != "undefined" && hotcat_no_autocommit)
      || hotcatGetParamValue ('hotcat_nocommit') == '1')
    prevent_autocommit = 1;
 
  var cat_rm  = hotcatGetParamValue ('hotcat_removecat');
  var cat_add = hotcatGetParamValue ('hotcat_newcat');
  var cat_key = null;
  if (cat_rm != null && cat_rm.length > 0) {
    var matches = hotcat_find_category (t, cat_rm);
    if (!matches || matches.length == 0) {
      alert ('Kategoria "' + cat_rm + '" nie została znaleziona. Może jest w szablonie?');
      prevent_autocommit = 1;
    } else if (matches.length > 1) {
      alert ('Kategoria "' + cat_rm
             + "\" znaleziona w kilku miejscach, nie wiem którą usunąć.");
      prevent_autocommit = 1;
    } else {
      if (cat_add != null && cat_add.length > 0 && matches[0].match.length > 1)
        cat_key = matches[0].match[1]; // Remember the category key, if any.
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
      t = t1 + t2;
      summary.push ( "Usunięto kategorię \"" + cat_rm + "\"" ) ;
      ret = 1;
    }
  }
  if (cat_add != null && cat_add.length > 0) {
    var matches = hotcat_find_category (t, cat_add);
    if (matches && matches.length > 0) {
      alert ('Kategoria "' + cat_add + '" już istnieje. Nie dodano.');
      prevent_autocommit = 1;
    } else {
      var insertionpoint = hotcat_find_ins( t );
      var newcatstring = '\n\[\[Kategoria:' + cat_add + (cat_key != null ? cat_key : "") + '\]\]';
      if( insertionpoint > -1 ) {
        t = t.substring(0, insertionpoint ) + newcatstring + t.substring( insertionpoint );
      } else {
        t = t + newcatstring;
      }
      summary.push ( "Szybkie dodanie kategorii \"" + cat_add + "\"" ) ;
      var t2 = t.replace(/\{\{[Kk]ategoria[^}]*\}\}/g, ""); // Remove "uncategorized" template
      if (t2.length != t.length) {
        t = t2;
        summary.push ( "usunięto {{kategoria}}" ) ;
      }
      ret = 1;
    }
  }
  if (ret) {
    document.editform.wpTextbox1.value = t ;
    document.editform.wpSummary.value = "HotCat: " + summary.join( "; " ) ;
    document.editform.wpMinoredit.checked = true ;
    if (!prevent_autocommit) {
      // Hide the entire edit section so as not to tempt the user into editing...
      var bodyContentId = document.getElementById("bodyContent") || document.getElementById("mw_contentholder");
      bodyContentId.style.display = "none";
      document.editform.submit();
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
  var catname = span.firstChild.innerHTML; // was .firstChild.data. Just for consistency
 
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
        if (l != null)
          document.getElementById("hotcat_text").value = l.options[l.selectedIndex].text;
        hotcat_text_changed();
      };
    list.ondblclick = function (evt)
      {
        var l = document.getElementById("hotcat_list");
        if (l != null)
          document.getElementById("hotcat_text").value = l.options[l.selectedIndex].text;
        // Don't call text_changed here if on upload form: hotcat_ok will remove the list
        // anyway, so we must not ask for new suggestions since show_suggestions might
        // raise an exception if it tried to show a no longer existing list.
        // Lupo, 2008-01-20
        hotcat_text_changed();
        hotcat_ok((hotcat_evtkeys (evt) & 1) || (hotcat_evtkeys (evt) & 4)); // CTRL or ALT pressed?
      };
    list.style.display = "none" ;
  }
 
  var text = document.createElement ( "input" ) ;
  text.size = 40 ;
  text.id = "hotcat_text" ;
  text.type = "text" ;
  text.value = init_text ;
  text.onkeyup = function () { window.setTimeout("hotcat_text_changed();", hotcat_suggestion_delay ); } ;
 
  var exists = null;
  if (!hotcat_nosuggestions) {
    exists = document.createElement ( "img" ) ;
    exists.id = "hotcat_exists" ;
    exists.src = hotcat_exists_no ;
  }
 
  var OK = document.createElement ( "input" ) ;
  OK.type = "button" ;
  OK.value = "OK" ;
  OK.onclick = function (evt) { hotcat_ok ((hotcat_evtkeys (evt) & 1) || (hotcat_evtkeys (evt) & 4)); }; // CTRL or ALT pressed?
 
  var cancel = document.createElement ( "input" ) ;
  cancel.type = "button" ;
  cancel.value = "Anuluj" ;
  cancel.onclick = hotcat_cancel ;
 
  if (list != null) form.appendChild ( list ) ;
  form.appendChild ( text ) ;
  if (exists != null) form.appendChild ( exists ) ;
  form.appendChild ( OK ) ;
  form.appendChild ( cancel ) ;
  thespan.appendChild ( form ) ;
  text.focus () ;
}
 
function hotcat_ok (nocommit) {
  var text = document.getElementById ( "hotcat_text" ) ;
  var v = text.value ;
 
  // Empty category ?
  if ( v == "" ) {
    hotcat_cancel() ;
    return ;
  }
 
  var editlk = document.getElementById('ca-edit').getElementsByTagName('a')[0].href;
  var url = editlk + '&hotcat_newcat=' + encodeURIComponent( v ) ;
 
  // Editing existing?
  var span = text.parentNode.parentNode ; // span.form.text
  if ( span.id != "hotcat_add" ) { // Not plain "addition"   
    url += '&hotcat_removecat=' + span.firstChild.innerHTML;
  }
  if (nocommit) url = url + '&hotcat_nocommit=1';
  document.location = url ;
}
 
function hotcat_just_add ( text ) {
  var span = document.getElementById("hotcat_form") ;
  while ( span.tagName != "SPAN" ) span = span.parentNode ;
  var add = 0 ;
  if ( span.id == "hotcat_add" ) add = 1 ;
  span.id = "" ;
  while ( span.firstChild ) span.removeChild ( span.firstChild ) ;
  var na = document.createElement ( "a" ) ;
  na.href = wgArticlePath.split("$1").join("Kategoria:" + encodeURI (text)) ;
  na.appendChild ( document.createTextNode ( text ) ) ;
  na.setAttribute ( "title" , "Kategoria:" + text ) ;
  span.appendChild ( na ) ;
  var catline = getElementsByClassName ( document , "p" , "catlinks" ) [0] ;
  if ( add ) hotcat_append_add_span ( catline ) ;
 
  for ( var i = 0 ; i < span.parentNode.childNodes.length ; i++ ) {
    if ( span.parentNode.childNodes[i] != span ) continue ;
    hotcat_modify_span ( span , i ) ;
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
  var text = document.getElementById ( "hotcat_text" ) ;
  var v = text.value.ucFirst() ;
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
            + "/api.php?format=xml&action=query&list=allpages&apnamespace=14&apfrom="
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
    request.onreadystatechange = function () {
          if (request.readyState == 4) {
            var xml = request.responseXML ;
            if ( xml == null ) return ;
            var pages = xml.getElementsByTagName( "p" ) ;
            var titles = new Array () ;
            for ( var i = 0 ; i < pages.length ; i++ ) {
              // Strip "Category:" but don't break on titles like "Category:Space: 2001 a space odyssey"
              var s = pages[i].getAttribute("title").replace( /Kategoria:/gi, "" );
              if ( s.substr ( 0 , hotcat_last_v.length ) != hotcat_last_v ) break ;
              titles.push ( s ) ;
            }
            hotcat_show_suggestions ( titles ) ;
          }
      };
    request.setRequestHeader ('Pragma', 'cache=yes');
    request.setRequestHeader ('Cache-Control', 'no-transform');
    request.send(null);
  } else {
    hotcat_show_suggestions ( new Array () ) ;
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
  list.style.top = nt + "px" ;
  list.style.width = text.offsetWidth + "px" ;
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
 
  var nof_titles = titles.lenght;
  var first_title = titles.shift () ;
  var v = text.value.ucFirst() ;
  if ( first_title == v ) {
    if( nof_titles == 1 ) {
      // Only one result, and it's the same as whatever is in the input box: makes no sense
      // to show the list. But make sure the text field has the focus !
      text.focus();
      list.style.display = "none";
    }
    return;
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
 
    text.value = first_title ;
 
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
  }
}
/* </source> */