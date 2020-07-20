// <nowiki>
// Einfaches Hinzufügen und Entfernen von Kategorien in Artikeln.
// Von http://commons.wikimedia.org/wiki/MediaWiki:HotCat.js und
// http://fr.wikipedia.org/wiki/MediaWiki:JSScripts/HotCats übernommen
// Version: 28. 11. 2007

// Konfigurationsvariablen:
// Zeit bis die Auswahlliste erscheint
var hotcat_suggestion_delay = 200;
// Anzahl der Zeilen in der Auswahlliste
var hotcat_list_size = 10;
// Anzahl der Elemente in der Auswahlliste
var hotcat_list_items = 50;
// Wenn true: Automatisches Speichern der Änderung ohne Bearbeitungsfenster
// var hotcat_autocommit = false;
// Wenn true: Auswahlliste nach unten statt nach oben ausklappen
// var hotcat_list_down = false;

// interne Variablen
var hotcat_running = 0 ;
var hotcat_last_v = "" ;
var hotcat_exists_yes = "http://upload.wikimedia.org/wikipedia/commons/thumb/b/be/P_yes.svg/20px-P_yes.svg.png" ;
var hotcat_exists_no = "http://upload.wikimedia.org/wikipedia/commons/thumb/4/42/P_no.svg/20px-P_no.svg.png" ;

addOnloadHook ( hotcat ) ;

function hotcat () {
  if ( hotcat_check_action() ) return ; // Edited page, reloading anyway

  if ( wgArticleId == 0 ) return ; // Article does not exists, no need to make a category...

  var catlinks = document.getElementById("catlinks");

  if (!catlinks && wgNamespaceNumber % 2 == 0) { // all except discussion
   // let's create a fake one
   var bodyC = document.getElementById("bodyContent");
   if (!bodyC) bodyC = document.getElementById("mw_contentholder");
   catlinks = document.createElement("div");
   catlinks.className = "noprint";
   catlinks.id = "catlinks";
   catlinks.appendChild(document.createElement("p"));
   catlinks.firstChild.className = "catlinks";
   bodyC.appendChild(catlinks);
  }

  var catline = 
    document.getElementById ('mw-normal-catlinks') ||
    getElementsByClassName ( document , "div" , "catlinks" ) [0];
  if ( catline == null || typeof catline == 'undefined' ) return ;

  hotcat_modify_existing ( catline ) ;
  hotcat_append_add_span ( catline ) ;
}

function hotcat_append_add_span ( catline ) {
  if ( catline.firstChild ) {
		var span_sep = document.createElement ( "span" ) ;
    span_sep.className = "noprint";
    span_sep.appendChild ( document.createTextNode ( " | " ) ) ;
    catline.appendChild ( span_sep ) ;
  }
  var span_add = document.createElement ( "span" ) ;
  span_add.className = "noprint";
  catline.appendChild ( span_add ) ;
  hotcat_create_span ( span_add ) ;
}

String.prototype.ucFirst = function () {
   return this.substr(0,1).toUpperCase() + this.substr(1,this.length);
}

function hotcat_modify_span ( span , i ) {
  if ( ! span.firstChild.getAttribute ) return;
  var cat_title = span.firstChild.getAttribute ( "title" ) ;
  // Removing leading Category:
  cat_title = cat_title.substr(cat_title.indexOf(":") + 1);
  var span1 = document.createElement ( "span" ) ;
  span1.className = "noprint";
  span1.appendChild ( document.createTextNode ( " " ) ) ;
  var remove_link = document.createElement ( "a" ) ;
  remove_link.href = "javascript:hotcat_remove(\"" + cat_title + "\");" ;
  remove_link.appendChild ( document.createTextNode ( "(−)" ) ) ;
  span1.appendChild ( remove_link ) ;

  span1.appendChild ( document.createTextNode ( " " ) ) ;
  var mod_id = "hotcat_modify_" + i ;
  var modify_link = document.createElement ( "a" ) ;
  modify_link.id = mod_id ;
  modify_link.href = "javascript:hotcat_modify(\"" + mod_id + "\");" ;
  modify_link.appendChild ( document.createTextNode ( "(±)" ) ) ;
  span1.appendChild ( modify_link ) ;

  span.appendChild ( span1 ) ;
}

function hotcat_modify_existing ( catline ) {
  var spans = catline.getElementsByTagName ( "span" ) ;
  for ( var i = 0 ; i < spans.length ; i++ ) {
    hotcat_modify_span ( spans[i] , i ) ;
  }
}

function hotcat_remove ( cat_title ) {
  var editlk = document.getElementById('ca-edit').getElementsByTagName('a')[0].href;
  if (window.confirm("Soll die Kategorie '" + cat_title + "' wirklich entfernt werden?")) {
    document.location = editlk + '&hotcat_removecat=' + encodeURIComponent(cat_title) ;
  }
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

function hotcat_check_action () {
  var ret = 0 ;
  if ( wgAction != "edit" || ! document.editform ) return ret ; // Not an edit page, so no business...
  var summary = new Array () ;
  var t = document.editform.wpTextbox1.value ;
  var prevent_autocommit = 1 ;
  if ( typeof hotcat_autocommit != 'undefined' && hotcat_autocommit ) prevent_autocommit = 0 ;

  // Remove existing category?
  var hrc = hotcatGetParamValue('hotcat_removecat') ;
  // Add new category?
  var hnc = hotcatGetParamValue('hotcat_newcat') ;

  if ( typeof hrc != "undefined" && hrc != null && hrc != "" ) {
    var hcre = new RegExp("(\\s*)\\[\\[ *(?:Kategorie|Category) *: *" + hrc.replace(/([\\\^\$\*\+\?\.\|\{\}\[\]\(\)])/g, "\\$1") + " *(\\|[^\\]]*)?\\]\\]", "gi");
    var matches = t.match(hcre);
    if (matches != null && matches.length == 1) { // Found one occurrence of the category - good!
      if ( typeof hnc != "undefined" && hnc != null && hnc != "" ) {
        t = t.replace(hcre, "$1[[Kategorie:" + hnc + "$2]]");
        summary.push ( "[[Kategorie:" + hrc + "]] nach [[Kategorie:" + hnc + "]] geändert" ) ;
      } else {
        t = t.replace(hcre, "");
        summary.push ( "[[Kategorie:" + hrc + "]] entfernt" ) ;
      }
      ret = 1 ;
    } else {
      alert ( "Kategorie \"" + hrc + "\" wurde im Text nicht gefunden. Sie wird wahrscheinlich über eine Vorlage eingebunden." ) ;
      prevent_autocommit = 1 ;
    }
  } else {
    // Only adding?
    if ( typeof hnc != "undefined" && hnc != null && hnc != "" ) {
      // Looking for last cat
      var re = /\[\[(?:Kategorie|Category):[^\]]+\]\]/ig ;
      var index = -1;
      while (re.exec(t) != null) index = re.lastIndex;
      var txt = "[[Kategorie:" + hnc + "]]" ;
      if (index < 0) {
        t = t + '\n' + txt ;
      } else {
        t = t.substring(0, index) + '\n' + txt + t.substring(index);
      }
      summary.push ( "[[Kategorie:" + hnc + "]] hinzugefügt" ) ;
      ret = 1 ;
    }
  }

  if ( ret ) {
    document.editform.wpTextbox1.value = t ;
    document.editform.wpSummary.value = summary.join( " ; " );
    document.editform.wpMinoredit.checked = true ;
    if ( !prevent_autocommit ) {
      document.getElementById("bodyContent").style.display = "none" ; // Hiding the entire edit section so as not to tempt the user into editing...
      document.editform.wpSave.click();
    }
  }

  // This is the end, my friend, the end...
  return ret ;
}

function hotcat_clear_span ( span_add ) {
  while ( span_add.firstChild ) span_add.removeChild ( span_add.firstChild ) ;
}

function hotcat_create_span ( span_add ) {
  hotcat_clear_span ( span_add ) ;
  var a_add = document.createElement ( "a" ) ;
  span_add.id = "hotcat_add" ;
  a_add.href = "javascript:hotcat_add_new()" ;
  a_add.appendChild ( document.createTextNode ( "(+)" ) ) ;
  span_add.appendChild ( a_add ) ;
}

function hotcat_modify ( link_id ) {
  var link = document.getElementById ( link_id ) ;
  var span = link.parentNode.parentNode ;
  var catname = span.firstChild.firstChild.data ;
  
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

  var list = document.createElement ( "select" ) ;
  list.id = "hotcat_list" ;
  list.onclick = function () { document.getElementById("hotcat_text").value = document.getElementById("hotcat_list").value ; hotcat_text_changed() ; } ;
  list.ondblclick = function () { document.getElementById("hotcat_text").value = document.getElementById("hotcat_list").value ; hotcat_text_changed() ; hotcat_ok(); } ;
  list.style.display = "none" ;

  var text = document.createElement ( "input" ) ;
  text.size = 40 ;
  text.id = "hotcat_text" ;
  text.type = "text" ;
  text.value = init_text ;
  text.onkeyup = function () { window.setTimeout("hotcat_text_changed();", hotcat_suggestion_delay ); } ;

  var exists = document.createElement ( "img" ) ;
  exists.id = "hotcat_exists" ;
  exists.src = hotcat_exists_no ;

  var OK = document.createElement ( "input" ) ;
  OK.type = "button" ;
  OK.value = "OK" ;
  OK.onclick = hotcat_ok ;

  var cancel = document.createElement ( "input" ) ;
  cancel.type = "button" ;
  cancel.value = "Abbrechen" ;
  cancel.onclick = hotcat_cancel ;

  form.appendChild ( list ) ;
  form.appendChild ( text ) ;
  form.appendChild ( exists ) ;
  form.appendChild ( OK ) ;
  form.appendChild ( cancel ) ;
  thespan.appendChild ( form ) ;
  text.focus () ;
}

function hotcat_ok () {
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
    var cat_title = span.firstChild.innerHTML ;
    // Removing leading Category:
    cat_title = cat_title.substr(cat_title.indexOf(":") + 1);
    url += '&hotcat_removecat=' + encodeURIComponent( cat_title ) ;
  }

  document.location = url ;
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

  hotcat_running = 1 ;
  hotcat_last_v = v ;

  if ( v != "" ) {
    var url = wgServer + "/" + wgScriptPath + "/api.php?format=xml&action=query&list=allpages&apnamespace=14&apfrom=" + encodeURIComponent( v ) + "&aplimit=" + encodeURIComponent( hotcat_list_items );
    if ( typeof ( hotcat_xmlhttp ) != "undefined" ) hotcat_xmlhttp.abort() ; // Just to make sure...
    hotcat_xmlhttp = new sajax_init_object() ;
    hotcat_xmlhttp.open('GET', url, true);
    hotcat_xmlhttp.onreadystatechange = function () {
          if ( typeof hotcat_xmlhttp == "undefined" ) return ;
          if (hotcat_xmlhttp.readyState == 4) {
              var xml = hotcat_xmlhttp.responseXML ;
              if ( xml == null ) return ;
              var pages = xml.getElementsByTagName( "p" ) ;
              var titles = new Array () ;
              for ( var i = 0 ; i < pages.length ; i++ ) {
                var s = pages[i].getAttribute("title");
                // Removing leading "Category:"
                s = s.substr(s.indexOf(":") + 1);
                if ( s.substr ( 0 , hotcat_last_v.length ) != hotcat_last_v ) break ;
                titles.push ( s ) ;
              }
              hotcat_show_suggestions ( titles ) ;
          }
      };
    hotcat_xmlhttp.send(null);
  } else {
    var titles = new Array () ;
    hotcat_show_suggestions ( titles ) ;
  }
  hotcat_running = 0 ;
}

function hotcat_show_suggestions ( titles ) {
  var text = document.getElementById ( "hotcat_text" ) ;
  var list = document.getElementById ( "hotcat_list" ) ;
  var icon = document.getElementById ( "hotcat_exists" ) ;
  if ( titles.length == 0 ) {
    list.style.display = "none" ;
    icon.src = hotcat_exists_no ;
    return ;
  }
  
  var listh = hotcat_list_size * 20 ;
  if (titles.length < hotcat_list_size) {
    listh = titles.length * 20 ;
  }
  var nl = parseInt ( text.parentNode.offsetLeft ) - 1 ;
  var nt = parseInt(text.offsetTop) - listh ;
  // Parameter to show suggestion list beneath categories instead of above
  if (typeof hotcat_list_down != "undefined" && hotcat_list_down) {
     nt = text.offsetTop + text.offsetHeight;
  }
  list.size = 5 ;
  list.style.align = "left" ;
  list.style.zIndex = 5 ;
  list.style.position = "absolute" ;
  list.style.top = nt + "px" ;
  list.style.width = text.offsetWidth + "px" ;
  list.style.height = listh + "px" ;
  list.style.left = nl + "px" ;
  while ( list.firstChild ) list.removeChild ( list.firstChild ) ;
  for ( var i = 0 ; i < titles.length ; i++ ) {
    var opt = document.createElement ( "option" ) ;
    opt.appendChild ( document.createTextNode ( titles[i] ) ) ;
    opt.setAttribute( "value", titles[i] );
    list.appendChild ( opt ) ;
  }
  
  list.style.display = "block" ;

  icon.src = hotcat_exists_yes ;

  var first_title = titles.shift () ;
  if ( first_title == hotcat_last_v ) return ;

  var suggestion = first_title;
  
  text.value = suggestion  ;
  if (text.createTextRange) {
    // IE
    var ra = text.createTextRange();
    ra.moveStart("character", hotcat_last_v.length);
    ra.moveEnd("character", suggestion.length);
    ra.select();
  } else if( is_khtml ) {
    text.setSelectionRange( hotcat_last_v.length, suggestion.length );
  } else {
    text.selectionStart = hotcat_last_v.length ;
    text.selectionEnd = suggestion.length ;
  }
}
// </nowiki>