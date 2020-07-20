/* User Tags */
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});

/*
   Changes <span class="NH_replacechars">{{cyan|@}}</span>
   so that it'll show the logical color symbol, but clicking on it
   will do insertTags('{{cyan|@}}', '', '')

   Used in http://nethack.wikia.com/wiki/MediaWiki:Edittools

   Relies on specific behaviour of the logical color templates:
   http://nethack.wikia.com/wiki/Category:Function_templates
*/
function WikiHack_replacechars()
{
  var l = document.getElementsByTagName('span');
  if (!l) return;
  for (var i = 0; i < l.length; i++) {
    if (l[i].className == "NH_replacechars") {
      for (var j = 0; j < l[i].childNodes.length; j++) {
        var fc = l[i].childNodes[j];
        if (fc.className && fc.className.match(/^nhsym clr-/)) {
          var clr = fc.className.replace("nhsym clr-", "");
          var chr = fc.innerHTML;
          var a = document.createElement('a');
          a.setAttribute('href', 'javascript:insertTags("{"+"{"+"'+clr+'|'+chr+'"+"}"+"}","","");');
          a.appendChild(fc.cloneNode(true));
          l[i].replaceChild(a, fc);
        }
      }
    }
  }
}

/*
   The following code is for the colored symbol "popup" window when editing.
   Relies on specific behaviour of the logical color symbols.

   Bugs: Doesn't work right with more than one popup span on page.
 */
var WikiHack_sym_popup_backup = null;
var WikiHack_sym_popup_last_color;
var WikiHack_sym_popup_last_char;

function WikiHack_sym_conversion(display)
{
  var c = WikiHack_sym_popup_last_char;
  if (display == 2) {
    if (c == '|') c = '&#124;';
    else if (c == '}') c = '&#125;';
  } else if (display == 1) {
    if (c == '|') c = '&amp;#124;';
    else if (c == '}') c = '&amp;#125;';
  } else if (display == 0) {
    if (c == ' ') c = '&nbsp;';
    else if (c == '"') c = '&quot;';
    else if (c == '\'') c = '&#39;';
  }
  return c;
}

function WikiHack_sym_popup_selected()
{
  var l = document.getElementById("WikiHack_sym_popup_selected");
  var brace = '{';
  if (!l) return;
  var s = '<span class="nhsym clr-'+WikiHack_sym_popup_last_color+'">'+WikiHack_sym_conversion(0)+'</span>';
  s += '&nbsp;<tt>'+brace+'&#123;'+WikiHack_sym_popup_last_color+'|'+WikiHack_sym_conversion(1)+'}}</tt>';
  l.innerHTML = s;
}

function WikiHack_sym_popup_change(state, dat)
{
  var l = document.getElementsByTagName('span');
  if (!l) return;
  if (state == 0) {
    for (var i = 0; i < l.length; i++) {
      if (l[i].className == "NH_sym_popup_chars") {
	for (var j = 0; j < l[i].childNodes.length; j++) {
	    l[i].childNodes[j].className = 'nhsym clr-'+dat;
	}
      }
    }
    WikiHack_sym_popup_last_color = dat;
    WikiHack_sym_popup_selected();
  } else {
    WikiHack_sym_popup_last_char = String.fromCharCode(dat);
    var chs = WikiHack_sym_conversion(0);
    for (var i = 0; i < l.length; i++) {
      if (l[i].className == "NH_sym_popup_colors") {
	for (var j = 0; j < l[i].childNodes.length; j++) {
	    l[i].childNodes[j].innerHTML = chs;
	}
      }
    }
    WikiHack_sym_popup_selected();
  }
}

function WikiHack_sym_popup(state)
{
  var l = document.getElementsByTagName('span');
  var str = '';
  if (!l) return;
  for (var i = 0; i < l.length; i++) {
    if (l[i].className == "NH_sym_popup") {
      if (state == 0) {
	if (WikiHack_sym_popup_backup) {
	  for (var j = 0; j < l[i].childNodes.length; j++) {
	    var fc = l[i].childNodes[j];
	    l[i].replaceChild(WikiHack_sym_popup_backup.cloneNode(true), fc);
	  }
	}
	WikiHack_sym_popup_backup = null;
      } else {
	if (WikiHack_sym_popup_backup == null) {
	  WikiHack_sym_popup_backup = l[i].cloneNode(true);
        }
	var colors = new Array("black", "blue", "green", "cyan", "red", "magenta", "brown", "lightgray",
			       "darkgray", "brightblue", "brightgreen", "brightcyan", "orange", "brightmagenta", "yellow", "white");

        str += '<dt class="color1 widget_title">Color Symbols';
        str += '<span style="float:right">';
        str += '<a href="javascript:WikiHack_sym_popup(0);">';
        str += '<img src="https://images.wikia.nocookie.net/common/skins/common/blank.gif" class="sprite-small close">';
        str += '</a>';
        str += '</span>';
        str += '</dt>';

        str += '<dd class="shadow widget_contents">';
	for (var col = 0; col < colors.length; col++) {
	  str += '<a style="text-decoration:none" href="javascript:WikiHack_sym_popup_change(0,\''+colors[col]+'\');">';
	  str += '<span class="NH_sym_popup_colors">';
	  str += '<span class="nhsym clr-'+colors[col]+'">';
	  str += WikiHack_sym_popup_last_char;
	  str += '</span>';
	  str += '</span>';
	  str += '</a>';
	}
	str += '<br>';
	str += '<br>';
        var cnt = 0;
	for (var ch = ' '.charCodeAt(0); ch <= '~'.charCodeAt(0); ch++) {
          var chs = String.fromCharCode(ch);
	  if (chs == ' ') chs = '&nbsp;';
	  else if (chs == '"') chs = '&quot;';
	  else if (chs == '\'') chs = '&#39;';
	  str += '<a style="text-decoration:none" href="javascript:WikiHack_sym_popup_change(1,\''+ch+'\');">';
	  str += '<span class="NH_sym_popup_chars">';
	  str += '<span class="nhsym clr-'+WikiHack_sym_popup_last_color+'">'+chs+'</span>';
	  str += '</span>';
	  str += '</a>';
	  cnt++;
	  if (cnt > 15) { str += '<br>'; cnt = 0; }
	}
	str += '<br><br>';
	str += 'Selected: <span id="WikiHack_sym_popup_selected"></span>';
	str += '<br><br>';
	str += '<input type="button" onclick="javascript:WikiHack_sym_popup(0);return false;" value="Close">';
        str += '<span style="float:right">';
	str += '<input type="button" onclick="javascript:insertTags(\'{\'+\'{\'+WikiHack_sym_popup_last_color+\'|\'+WikiHack_sym_conversion(2)+\'}\'+\'}\',\'\',\'\');return false;" value="Insert symbol">';
        str += '</span>';

        str += '</dd>';

	var nod = document.createElement('dl');
        nod.setAttribute('id', 'NH_sym_popup_window');
        nod.setAttribute('class', 'widget ui-draggable');
	nod.innerHTML = str;

	for (var j = 0; j < l[i].childNodes.length; j++) {
	  var fc = l[i].childNodes[j];
	  l[i].replaceChild(nod.cloneNode(true), fc);
	}
	WikiHack_sym_popup_selected();
	$("#NH_sym_popup_window").draggable({ handle:'dt' });
      }
    }
  }
}

function WikiHack_sym_popup_hook()
{
  var l = document.getElementsByTagName('span');
  var found = 0;
  if (!l) return;
  for (var i = 0; i < l.length; i++) {
    if (l[i].className == "NH_mk_sym_popup") {
       var nod = l[i].firstChild.cloneNode(true);
       if (!nod) nod = document.createTextNode('Symbols');
       l[i].innerHTML = '<span class="NH_sym_popup"><a href="javascript:WikiHack_sym_popup(1);"></a></span>';
       l[i].firstChild.firstChild.appendChild(nod);
       found = 1;
    }
  }
  if (found) {
    WikiHack_sym_popup_last_color = "white";
    WikiHack_sym_popup_last_char = "@";
  }
}

/* End of colored symbol "popup" window code */



if(wgAction == 'edit' || wgAction == 'submit') {

  /***** Custom edit buttons *****/
  /* Only used if "Editing->Show edit toolbar" in Preferences is ticked. */
  if (mwCustomEditButtons) {

	mwCustomEditButtons[mwCustomEditButtons.length] = {
	  "imageFile": "https://images.wikia.nocookie.net/central/images/c/c8/Button_redirect.png",
	  "speedTip": "Redirect",
	  "tagOpen": "#REDIRECT [[",
	  "tagClose": "]]",
	  "sampleText": "Insert text"};

	mwCustomEditButtons[mwCustomEditButtons.length] = {
	  "imageFile": "https://images.wikia.nocookie.net/central/images/4/4a/Button_table.png",
	  "speedTip": "Insert a table",
	  "tagOpen": '{| class="wikitable"\n|-\n',
	  "tagClose": "\n|}",
	  "sampleText": "! header 1\n! header 2\n! header 3\n|-\n| row 1, cell 1\n| row 1, cell 2\n| row 1, cell 3\n|-\n| row 2, cell 1\n| row 2, cell 2\n| row 2, cell 3"};

	mwCustomEditButtons[mwCustomEditButtons.length] = {
	  "imageFile": "https://images.wikia.nocookie.net/central/images/1/13/Button_enter.png",
	  "speedTip": "Line break",
	  "tagOpen": "<br />",
	  "tagClose": "",
	  "sampleText": ""};
    }

  addOnloadHook(WikiHack_replacechars);
  addOnloadHook(WikiHack_sym_popup_hook);
}


/* Hilight a line of code in the Source-namespace, when we're given a line to go to. For example
 * http://nethack.wikia.com/wiki/Source:Do.c#line1673
 */
function WikiHack_sourceline_hilite() {
  var h = window.location.hash;
  if (h.match(/^#line[0-9]+/)) {
    var e = document.getElementById(h.substring(1));
    if (e) {
      e.setAttribute('class', 'source-line-hilite');
    }
  }
}

if (wgCanonicalNamespace == 'Source') {
  addOnloadHook(WikiHack_sourceline_hilite);
}
/* End of Source code line hilite */


importScriptPage('ShowHide/code.js', 'dev');