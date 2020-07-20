/*
Z Wikipedii - [[wikipedia:pl:MediaWiki:LiveRC.js]].
----

==LiveRC==
*Documentation : [[:fr:User:EDUCA33E/LiveRC/Documentation]]
*Author : [[:fr:User:EDUCA33E]]
*Dev & enhancements : [[:fr:User:TiChou]], [[:pl:User:Leafnode]], [[:it:User:Jalo]], [[:fr:User:Nakor]], [[:fr:User:Arkanosis]], [[:pl:User:Nux]]
*Version (orig): 0.3.9 (beta) http://fr.wikipedia.org/w/index.php?title=Utilisateur:EDUCA33E/LiveRC.js&oldid=54029111
*Version (fork): 0.3.12 (beta)
*Polska strona: [[:pl:Wikipedia:Narzędzia/LiveRC]]

=== Variables globales ===

<source lang="javascript"> */

// Init LiveRC only on one special page
var lrcNamespaceNumber = 4;		// Przestrzeń nazw Elder Scrolls Wiki:
var lrcTitle = "LiveRC";

if (wgNamespaceNumber==lrcNamespaceNumber && wgTitle == lrcTitle) {

  // Variables d'état (pour test sur rc.state);

  var IP          = 1;
  var BOT         = 2 << 0;
  var SYSOP       = 2 << 1;
  var NEW         = 2 << 2;
  var MINOR       = 2 << 3;
  var NEWNS       = 2 << 4;
  var RENAMED     = 2 << 5;
  var PATROLLED   = 2 << 6;
  var REVERT      = 2 << 7;
  var BLANKING    = 2 << 8;
  var REPLACED    = 2 << 9;
  var REDIRECT    = 2 << 10;
  var CATEGORIZED = 2 << 11;
  var LOCK        = 2 << 12;
  var FULLLOCK    = 2 << 13;
  var HOMONYMIE   = 2 << 14;
  var ADQ         = 2 << 15;
  var BA          = 2 << 16;
  var APDQ        = 2 << 17;
  var COPYRIGHT   = 2 << 18;
  var PAS         = 2 << 19;
  var FIRE        = 2 << 20;

  var UPLOAD      = 2 << 21;
  var NEWUSER     = 2 << 22;
  var BLOCK       = 2 << 23;
  var DELETE      = 2 << 24;
  var MOVE        = 2 << 25;
  var PROTECT     = 2 << 26;
  var PATROL      = 2 << 27;
  var ABFILTER    = 2 << 28;
  var TAG         = 2 << 29;
  var REVIEW      = 2 << 30;

  /*
  // ///////////////////////////////////// //
  == Global variables / Variables globales ==
  // ///////////////////////////////////// //

  */

  var lrcRCLimit       = 30;      // LiveRC default RC list size;
  var lrcPreviewHeight = '250px'; // LiveRC default preview window height;
  var lrcAutoCloseDiff = 0;       // LiveRC default Diff behaviour;
  var lrcTZ            = '';      // Default time zone (+02:00, 02:00, -0200, -05:45, ...)
                                  // if not given it is taken from the browser
  /*

  // //////////////////// //
  == Internationalization ==
  // //////////////////// //

  */

  // Wiki specific translation;
  // /////////////////////
  var lang_category = 'Kategoria:';
  var lang_category_short = '(kat ?)';
  var lang_main_namespace = 'Artykuły';

  // Menu translation;
  // /////////////////
  var lang_menu = [ {
    PAUSE:   "Pauza",
    PREVIEW: "Podgląd",
    LISTS:   "Listy",
    LOWDIFF: "Mini diff",
    RCLABEL: "OZ",
    NOBOTS:  "Bez botów",
    IPONLY:  "Tylko IP",
    IPNEW:   "IP i nowi",
    NAMESP:  "Przestrzeń",
    XTIMES:  "razy",
    UNDORC:  "Anuluj zmiany",
    REVERT:  "Revert",
    REASON:  "Powód",
    AVERTS:  "Ostrzeżenie",
    RVMES1:  "[[Wikipedia:Narzędzia/LiveRC|LiveRC]]: Anulowanie modyfikacji użytkownika",
    RVMES2:  "cofnięcie do wersji autora",
    EMPTY:   "Pusty",
    RCSHOW:  "Edit",  // NOT USED
    LOGSHOW: "Rejestry",
    ABSHOW:  "Filtry",
  } ];

  var lang_tooltips = {
    // main menu
    HIDE_ALL:      "Wyczyść bieżącą listę",
    HIDE_REVIEWED: "Ukryj przejrzane zmiany (w bieżącej liście)",
    HIDE_REVERTS:  "Ukryj reverty (w bieżącej liście)",
    HIDE_NEW:      "Ukryj utworzenia stron (w bieżącej liście)",
    HIDE_BLANKING: "Ukryj usunięcia treści (w bieżącej liście)",
    HIDE_THIS:     "Ukryj tę zmianę na liście",
    // links in rows
    TALK_TIP: "Strona dyskusji (w nowym oknie)",
    TALK_SHORT: "D",
    CONTRIB_TIP: "Wkład (w panelu)",
    CONTRIB_SHORT: "W",
    BLOCK_TIP: "Zablokuj użytkownika (w nowym oknie)",
    BLOCK_SHORT: "B",
    DIFF_TIP: "Różnica (w panelu)",
    DIFF_SHORT: "Diff",
    HIST_TIP: "Historia (w panelu)",
    HIST_SHORT: "H",
    EDIT_TIP: "Edycja (w nowym oknie)",
    EDIT_SHORT: "E",
    DEL_TIP: "Skasuj stronę (w nowym oknie)",
    DEL_SHORT: "S",
    PROTECT_TIP: "Zabezpiecz stronę (w nowym oknie)",
    PROTECT_SHORT: "Z",
    USER_HIDE_TIP: "Ukryj edycje użytkownika",
    USER_HIDE_SHORT: "U",
  }

  var lang_log = {
    UPLOAD:  'Rejestr przesyłania plików',
    NEWUSER: 'Rejestr tworzenia kont użytkowników',
    BLOCK:   'Rejestr blokad',
    DELETE:  'Rejestr usunięć',
    MOVE:    'Rejestr przeniesień',
    PROTECT: 'Rejestr zabezpieczeń',
    REBLOCK: 'modification'  // NOT USED
  };

  var lang_messages = {
    SAME_EDITOR: 'kolejna edycja',
    WARNING: 'Ostrzeżenie',
    ON_ARTICLE: 'w'
  };

  // Comments test table (regexp format);
  // ////////////////////////////////////
  var commenttests = [
    { state: BLANKING  , regex: /UWAGA\! Usunięcie treści/ },
    { state: REPLACED  , regex: /UWAGA\! Zastąpienie treści hasła bardzo krótkim tekstem\!/ },
    { state: REVERT    , regex: /^\[\[Wikipedia:Narzędzia\/LiveRC\|LiveRC\]\]: (Usunięcie|Anulowanie)|^Anulowanie wersji|^Przywrócenie wersji autora|^Wycofano edycje użytkownika|^(Przywrócono|przywrócenie) (starszą|poprzednią|przedostatnią) wersję/ }
  ];

  // Categories test table (regexp format);
  var categoriestests = [
    { state: LOCK      , regex: 'Strona częściowo zabezpieczona' },
    { state: FULLLOCK  , regex: 'Strona zabezpieczona' },
    { state: HOMONYMIE , regex: 'Strony ujednoznaczniające' },
    { state: ADQ       , regex: 'Dobre artykuły' },
    { state: BA        , regex: 'Artykuły na medal' },
    { state: APDQ      , regex: 'Propozycje do Artykułów na medal' },
    { state: COPYRIGHT , regex: 'Artykuły podejrzane o naruszenie praw autorskich|Automatyczne wykrywanie NPA' },
    { state: PAS       , regex: 'Ekspresowe kasowanko' },
    { state: FIRE      , regex: 'Wikipatrol' }
  ];

  // LiveRC default template use;
  // ////////////////////////////
  var lstAvert = [
  { template: "testP"     , string: "Pierwsze i ostatnie" , hasPage: false },
  { template: "test4"     , string: "Ostatnie"            , hasPage: false },
  { template: "testW"     , string: "Niemerytoryczne"     , hasPage: false },
  { template: "test"      , string: "test"                , hasPage: false },
  { template: "test1"     , string: "Obraźliwe"           , hasPage: false },
  { template: "test2"     , string: "Nonsensowne"         , hasPage: false },
  { template: "test3"     , string: "Przestań niszczyć"   , hasPage: false },
  { template: "testNie"   , string: "Nieencykopedyczne"   , hasPage: false },
  { template: "testStub"  , string: "Stub"                , hasPage: false },
  { template: "Spam"      , string: "Spamer"              , hasPage: false },
  { template: "testNPA"   , string: "NPA"                 , hasPage: false },
  { template: "testNPW"   , string: "NPOV"                , hasPage: false },
  { template: "testPOV"   , string: "Kontrowersyjne"      , hasPage: false },
  { template: "testPE"    , string: "Zabawa przyciskami"  , hasPage: false },
  { template: "testFikcja", string: "Zaznacz świat fikc." , hasPage: false },
  { template: "anonim"    , string: "Anonim"              , hasPage: false }
  ];

  // LiveRC default values for checkboxes
  var lrcShowBotChecked   = 'checked';   // change to 'checked' to show only IPs by default
  var lrcShowIPChecked   = '';   // change to 'checked' to show only IPs by default
  var lrcShowIPNEWChecked   = '';   // change to 'checked' to show only IPs and non-patrolled by default (sysops only)
  var lrcShowRCChecked   = 'checked';   // change to 'checked' to hide recent changes by default
  var lrcShowLogChecked   = '';   // change to 'checked' to show logs by default
  var lrcShowFilterChecked   = '';   // change to 'checked' to show filters by default

  // Getting user params
  // FIXME: works fine in Mozilla and Opera, does not work in Chrome and Safari
  importScript('User:'+wgUserName+'/LiveRCparam.js');

  jQuery(document).ready(function() {
	mw.loader.load('mediawiki.action.history.diff');	
  })

  var lastrcid=0,lastfilterid=0,lastlogid=0,lastrctimestamp=1,lastletimestamp=1,lastafltimestamp=1; // Timestamp d'initialisation;

  // Découpage de l'URL et de ses parametres;

  var _GET = new Array();
  var _uri = location.href;
  var _temp_get_arr = _uri.substring(_uri.indexOf('?')+1, _uri.length).split("&");
  var _temp_get_arr_1 = new Array();
  for(_get_arr_i=0; _get_arr_i<_temp_get_arr.length; _get_arr_i++){
    _temp_get_arr_1 = _temp_get_arr[_get_arr_i].split("=");
    _GET[decodeURIComponent(_temp_get_arr_1[0])] = decodeURIComponent(_temp_get_arr_1[1]);
  }
  delete _uri; delete _temp_get_arr; delete _temp_get_arr_1;



  var lstSysop = new Array();   // Sysop list;
  var lstContact = new Array(); // Contact list;
  var lstContact2 = new Array(); // Contact list;
  var lstRevoc = new Array();   // Reverted list;
  var lstHidden = new Array();  // Hidden users list;

  // Has user patrol rights?
  var lrcPatrol = false;
  var lrcAPIlimit = 500;
  if(wgUserGroups.indexOf("autopatrolled") != -1)
    lrcPatrol = true;

  // Is user Sysop;
  var lrcAdmin = false; // default value;
  if(wgUserGroups.indexOf("sysop") != -1)
  {
    lrcAdmin = true;
    lrcPatrol = true;
  }

  // Watchlist;
  var lstSuivi = new Array();
  var lstSuiviHH = new Array();
}

/* </source>

===Utilities===

<source lang="javascript"> */
var wpajax = {
  http: function(bundle) {
    // mandatory: bundle.url
    // optional:  bundle.async
    // optional:  bundle.method
    // optional:  bundle.headers
    // optional:  bundle.data
    // optional:  bundle.onSuccess (xmlhttprequest, bundle)
    // optional:  bundle.onFailure (xmlhttprequest, bundle)
    // optional:  bundle.otherStuff OK too, passed to onSuccess and onFailure
    var xmlhttp;
    try {
      xmlhttp = new XMLHttpRequest();
    } catch(e) {
      try {
        xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
      } catch (e) {
        try {
          xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (e) {
          xmlhttp = false
        }
      }
    }

    if (xmlhttp) {
      xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4)
          wpajax.httpComplete(xmlhttp,bundle);
      };
      xmlhttp.open(bundle.method ? bundle.method : "GET",bundle.url,bundle.async == false ? false : true);
      if (bundle.headers) {
        for (var field in bundle.headers)
          xmlhttp.setRequestHeader(field,bundle.headers[field]);
      }
      xmlhttp.send(bundle.data ? bundle.data : null);
    }
    return xmlhttp;
  },

  httpComplete: function(xmlhttp,bundle) {
    if (xmlhttp.status == 200 || xmlhttp.status == 302) {
      if (bundle.onSuccess)
        bundle.onSuccess(xmlhttp,bundle);
    } else if (bundle.onFailure) {
      bundle.onFailure(xmlhttp,bundle);
    } else {
      // A activer en debug mode ?
      // alert(xmlhttp.statusText);
    }
  }
};

///////////////////////////////////////////////////////////////////////////////
// * Recherche d'un élement dont on connait l'Id mais non unique, donc sans utiliser document.getElementById()
// Thanks to Dr Brains

function getElementWithId( elementId , elementTagName , elementParentNode ){
      if(!elementParentNode) elementParentNode = document;

      if (elementParentNode.getElementById) return elementParentNode.getElementById(elementId);

      var TheElement = false;
      var Elements = elementParentNode.getElementsByTagName(elementTagName);
      var elementcount = 0;
      while(elementcount<Elements.length){
            var Id = Elements[elementcount].getAttribute('id');
            if(Id){
                  if(Id==elementId){
                        TheElement = Elements[elementcount];
                        break;
                  }
            }
            elementcount++
      }
      if (! TheElement) return null;
      return TheElement;
}
///////////////////////////////////////////////////////////////////////////////


function getRights(xmlreq, data) {
  var api = xmlreq.responseXML;

  if (api.firstChild.nodeName == "error") return;

  var rights = api.getElementsByTagName('query')[0].getElementsByTagName('userinfo')[0].getElementsByTagName('rights')[0].getElementsByTagName('r');
  var len = rights.length;
  var i;
  var id,right;

  for (i=0; i<len; i++) {
    right = rights[i].textContent;
    // Handle IE
    if (!right)right = rights[i].text;

    if (right == "apihighlimits") lrcAPIlimit=5000;
    if (right == "autopatrol") lrcPatrol=true;
  }

  buildControlBar();
}

function buildControlBar()
{
  var top        = document.getElementById( 'top' );
  if (top != null) {
      top.innerHTML = "";
      top.style.display = "none";
  }
  var siteSub    = document.getElementById( 'siteSub' );
  var contentSub = document.getElementById( 'contentSub' );
  var rtb        = document.getElementById( 'RealTitleBanner' );
  var rt         = document.getElementById( 'RealTitle' );
  var pca        = document.getElementById( 'p-cactions' );


  if (siteSub != null) siteSub.style.display = "none";
  if (contentSub != null) contentSub.style.display = "none";
  if (rtb != null) rtb.style.display = "none";
  if (rt != null) rt.style.display = "none";
  if (pca != null) pca.style.display = "none";

  var showIPNEWbox = '';
  if (lrcPatrol)
    showIPNEWbox = '<input id="showIPNEW"    type="checkbox" ' + lrcShowIPNEWChecked + '/>' +
      '<label for="showIPNEW">'   + lang_menu[0].IPNEW  + ' </label>';

  var lvPreviewFoot = document.getElementById( 'livePreviewFoot' );
  lvPreviewFoot.innerHTML = '<a href="javascript:;" onClick="supprLigne(\'*\');" style="color: red; font-weight: bold;" title="'+lang_tooltips.HIDE_ALL+'">X</a> | ' +
    '<a href="javascript:;" onClick="supprLigne(\'d\');" style="color: rgb(255, 235, 71); font-weight: bold;" title="'+lang_tooltips.HIDE_REVIEWED+'">X</a> ' +
    '<a href="javascript:;" onClick="supprLigne(\'r\');" style="color: rgb(255, 99, 83); font-weight: bold;" title="'+lang_tooltips.HIDE_REVERTS+'">X</a> ' +
    '<a href="javascript:;" onClick="supprLigne(\'n\');" style="color: rgb(178, 243, 113); font-weight: bold;" title="'+lang_tooltips.HIDE_NEW+'">X</a> ' +
    '<a href="javascript:;" onClick="supprLigne(\'c\');" style="color: white; font-weight: bold;" title="'+lang_tooltips.HIDE_BLANKING+'">X</a>' +
    '<input id="stopLive"  type="checkbox" value="true" />' +
    '<label for="stopLive">' + lang_menu[0].PAUSE   + '</label>' +
	' &bull; ' +
    '<input id="shidPrev"  type="checkbox" onclick="showHideObj(this, \'divLivePreview\');" />' +
    '<label for="shidPrev">' + lang_menu[0].PREVIEW + '</label>' +
    '<input id="showDiffR" type="checkbox" />' +
    '<label for="showDiffR">'+ lang_menu[0].LOWDIFF + '</label>' +
	' &bull; ' +
    '<input id="shidList"  type="checkbox" onclick="showHideObj(this, \'liveFollow\');" />' +
    '<label for="shidList">' + lang_menu[0].LISTS   + '</label>' +
	' &bull; ' +
    '<input id="showBot"   type="checkbox" ' + lrcShowBotChecked + ' />' +
    '<label for="showBot">'  + lang_menu[0].NOBOTS  + '</label>' +
    '<input id="showIP"    type="checkbox" ' + lrcShowIPChecked + '/>' +
    '<label for="showIP">'   + lang_menu[0].IPONLY  + ' </label>' +
    showIPNEWbox +
	' &bull; ' +
    '<input id="showRC"    type="checkbox" ' + lrcShowRCChecked + ' />' +
    '<label for="showRC">'   + lang_menu[0].RCLABEL  + ' </label>' +
    '<input id="showLog"    type="checkbox" ' + lrcShowLogChecked + '/>' +
    '<label for="showLog">'   + lang_menu[0].LOGSHOW  + ' </label>' +
    '<input id="showFilter"    type="checkbox" ' + lrcShowFilterChecked + '/>' +
    '<label for="showFilter">'   + lang_menu[0].ABSHOW  + ' • </label>' +
    '<span id="selectNS" />';

  if (lrcPreviewHeight) document.getElementById('livePreview').style.height = lrcPreviewHeight;

  liveSysop();
}

// Parser
if (window.DOMParser) var gml_xmlparser = new DOMParser();

function gml_XMLParse(string) {
  // nie dostaje wcale XML-a, ale dokumenty HTML
  // MediaWiki używa teraz HTML5
  return jQuery.parseHTML("<div>" + string + "</div>")[0];
}

// HTMLize
String.prototype.htmlize = function() {
  var chars = new Array('&','<','>','"');
  var entities = new Array('amp','lt','gt','quot');
  var string = this;
  for (var i=0; i<chars.length; i++) {
    var regex = new RegExp(chars[i], "g");
    string = string.replace(regex, '&' + entities[i] + ';');
  }
  return string;
}

/* </source>

=== LiveDiff ===

<source lang="javascript"> */

function liveDiff(page, id, oldid) {
  var el = document.getElementById( 'livePreviewTitle' );
  el.innerHTML="<b style='text-decoration: blink;'>Diff : <span style='color:red'>"+page+"</span>...</b>";
  wpajax.http({ url: wgServer + wgScriptPath + '/index.php?title='+encodeURIComponent(page)+'&diffonly=1&diff='+id+'&oldid='+oldid,
                onSuccess: getDiff, mpage: page, mid: id, moldid:oldid});
}

function getDiff(xmlreq, data) {
  // temporary fix for incorrect HTML code
  var text = xmlreq.responseText;
  var newtext = text.replace(/&nbsp<span class=\"mw-revdelundel-link/g, "&nbsp;<span class=\"mw-revdelundel-link");
  var doc = gml_XMLParse(newtext);
  var page=data.mpage;
  var oldid=data.moldid;
  var id=data.mid;
  var bC  = getElementWithId('bodyContent', 'div', doc);
  if (bC ==  null) bC  = getElementWithId('article', 'div', doc);
  var LP = document.getElementById( 'livePreview' );
  var dLP = document.getElementById( 'divLivePreview' );
  var lD = getElementsByClass('diff',bC,null);

  var upage=page.replace(new RegExp(/\'/g), "\\'");

  if (lD[0] == null) {
    LP.innerHTML = bC.innerHTML;
    if (LP.innerHTML == "undefined") LP.innerHTML = bC.xml;
  }
  else {
    if (document.getElementById('showDiffR').checked) {
      var avantEl = getElementsByClass('diff-deletedline',bC,null);
      var apresEl = getElementsByClass('diff-addedline',bC,null);
      var rollback = getElementsByClass('mw-rollback-link',bC,null);
      if (rollback[0] == null)
        var rl = "";
      else
        var rl = rollback[0].innerHTML+"<br />";
      var avant = "";
      var apres = "";
      var lav = avantEl.length;
      var lap = apresEl.length;
      for(var n=0; n < lav ; n++)
        avant = avant + avantEl[n].innerHTML + "<br />";
      for(var n=0; n < lap ; n++)
        apres = apres + apresEl[n].innerHTML + "<br />";
      LP.innerHTML = rl+"<table width='100%'><tr><td width='50%' class='diff-deletedline'>"+avant+"</td><td class='diff-addedline'>"+apres+"</td></tr></table>";
    }
    else {
      LP.innerHTML = "<table border='0' width='98%' cellpadding='0' cellspacing='4' class='diff'>"+lD[0].innerHTML+"</table>";
    }
  }
  if (dLP.style.display == "none") {
    var elcb = document.getElementById( 'shidPrev' );
    elcb.checked="true";
    dLP.style.display = "inline";
  }

  var entete = document.getElementById( 'livePreviewTitle' );
  entete.innerHTML='<b><a href="'+wgServer + wgArticlePath.replace(/\$1/, encodeURI(page)) + '" target="_new">' + page + '</a></b> • ' +
  '(<a href="javascript:;" onClick="liveHist(\''+upage+'\');" style="color:darkorange">Hist</a>)';

  var asNextDiff = getElementWithId('differences-nextlink', 'a', doc);
  if ((asNextDiff == null) && lrcPatrol) {
    var optAvert = "";
    var optl = lstAvert.length;
    for (j=0; j<optl; j++) {
      optAvert += '<option value="'+lstAvert[j].template;
      if(lstAvert[j].hasPage) optAvert += '|'+upage;
      optAvert += '">'+lstAvert[j].string+'</option>';
    }

    // Get username of submitter
    var user1 = getElementWithId('mw-diff-otitle2', 'div', doc);
    if (user1 != null) {
      var usertmp=user1.innerHTML;
      if (!usertmp) usertmp=user1.firstChild.xml;
      // user1 = usertmp.replace(new RegExp(/<a (.*)>(.*)<\/a>  \(<a(.*)/g), "$2");
      user1 = usertmp.replace(new RegExp(/<a (.*)>(.*)<\/a>(.*)\((.*)\)/g), "$2");
      user1 = user1.replace(new RegExp(/(.*)<(.*)>/g), "$1");
    }
    var user2 = getElementWithId('mw-diff-ntitle2', 'div', doc);
    if (user2 != null) {
      var usertmp=user2.innerHTML;
      if (!usertmp) usertmp=user2.firstChild.xml;
      // user2 = usertmp.replace(new RegExp(/<a (.*)>(.*)<\/a>  \(<a(.*)/g), "$2");
      user2 = usertmp.replace(new RegExp(/<a (.*)>(.*)<\/a>(.*)\(<a(.*)/g), "$2");
    }
    user1=user1.replace(new RegExp(/\'/g), "\\'");
    user2=user2.replace(new RegExp(/\'/g), "\\'");
    var identique="";
    if(user1 == user2) {
     identique =  "<b style='color:red'>[" + lang_messages.SAME_EDITOR + "]</b> ";
    }

    entete.innerHTML = '<table width="100%" class="creator"><tr><td>' + entete.innerHTML +
    '</td><td align="right"><small>' + identique +
    // Verifier avant si le patrouilleur peut modifier cette page ? (query.php?what=permissions&titles=page)
    '[<a id="LiveRevertLink" href="javascript:getLiveMessage(\'liverevert\',\''+user1+'\',\''+user2+'\',\''+upage+'\',\''+oldid+'\');" >' + lang_menu[0].UNDORC+'</a>] • ' +
    lang_menu[0].REASON+' : <input id="LiveRevertMessage" /> ••• ' +
    '[<a id="LiveAvertoLink" href="javascript:getLiveAverto(\''+user2+'\');">'+lang_menu[0].AVERTS+'</a>] : ' +
    '<select id="averto">' + optAvert + '</select>' +
    '</td></tr></table>';
    document.getElementById('LiveRevertMessage').focus();
  }
}

function getLiveAverto(user) {
  var link = document.getElementById('LiveAvertoLink');
  link.href = "javascript:;";
  link.style.color = "silver";
  link.style.cursor = "default";
  link.style.textDecoration = "none";
  document.getElementById('averto').disabled = true;
  var message = document.getElementById('averto').value;
  wpajax.http({ url: wgServer + wgScriptPath + '/index.php?title=User_Talk:' + encodeURIComponent(user) + '&action=edit',
                onSuccess: postLiveAverto,
                user: user, message: message });
}

function postLiveAverto(xmlreq, data) {
  var parser = new DOMParser();
  var doc = parser.parseFromString(xmlreq.responseText, 'application/xhtml+xml');

  var user = data.user;
  var message = data.message.replace(new RegExp(/\\'/g),"'");

  var wpTextbox1 = encodeURIComponent(doc.getElementById('wpTextbox1').value + '\n\n{{subst:' + message + '}} ~~~~\n');

  var inputs = doc.getElementById('editform').getElementsByTagName('input');
  var editform = new Array();
  for (i=0; i<inputs.length; i++) {
    editform[inputs[i].name] = inputs[i].value;
  }
  var wpStarttime = encodeURIComponent(editform['wpStarttime']);
  var wpEdittime = encodeURIComponent(editform['wpEdittime']);
  var wpEditToken = encodeURIComponent(editform['wpEditToken']);

  var wpSummary = encodeURIComponent('LiveRC : ' + lang_messages.WARNING + ' ' + message.replace(new RegExp(/\|(.*)/),
    ' ' + lang_messages.ON_ARTICLE + ' [[$1]]') + ' !');

  var headers = new Array();
  headers['Content-Type'] = 'application/x-www-form-urlencoded';
  wpajax.http({ url: wgServer + wgScriptPath + '/index.php?title=User_Talk:' + encodeURI(user) + '&action=submit',
                method: "POST", headers: headers,
                data: 'wpSave=1&wpTextbox1=' + wpTextbox1 + '&wpStarttime=' + wpStarttime + '&wpEdittime=' + wpEdittime
                    + '&wpEditToken=' + wpEditToken + '&wpSummary=' + wpSummary});
}

function getLiveMessage(where, user1, user2, page, oldid) {
  var links = [ document.getElementById('LiveRevertLink') ];
  var i,len=links.length;
  for (i=0; i<len; i++) {
    links[i].href = "javascript:;";
    links[i].style.color = "silver";
    links[i].style.cursor = "default";
    links[i].style.textDecoration = "none";
  }
  document.getElementById('LiveRevertMessage').disabled = true;
  var message = document.getElementById('LiveRevertMessage').value;
  wpajax.http({ url: wgServer + wgScriptPath + '/index.php?title=' + encodeURI(page) + '&action=edit&oldid=' + oldid,
                onSuccess: postLiveRevert,
                where: where, page: page, user1: user1, user2: user2, message: message });
}

function postLiveRevert(xmlreq, data) {
  var parser = new DOMParser();
  var doc = parser.parseFromString(xmlreq.responseText, 'application/xhtml+xml');

  var where = data.where;
  var page = data.page;
  var user1 = data.user1;
  var user2 = data.user2;
  var message = data.message;

  var wpTextbox1 = encodeURIComponent(doc.getElementById('wpTextbox1').value);

  var inputs = doc.getElementById('editform').getElementsByTagName('input');
  var editform = new Array();
  for (i=0; i<inputs.length; i++) {
    editform[inputs[i].name] = inputs[i].value;
  }
  var wpStarttime = encodeURIComponent(editform['wpStarttime']);
  var wpEdittime = encodeURIComponent(editform['wpEdittime']);
  var wpEditToken = encodeURIComponent(editform['wpEditToken']);

  switch(where) {
    case 'liverevert':
      var wpSummary = lang_menu[0].RVMES1 + ' [[Special:Contributions/' + user2 + '|' + user2
        + ']]; '+lang_menu[0].RVMES2+' [[User:' + user1 + '|' + user1 + ']]';
      break;
/*    case 'livevandalism':
      var wpSummary = 'LiveRC : Révocation de vandalisme par [[Special:Contributions/' + user2 + '|' + user2
        + ']]; retour a la version de [[User:' + user1 + '|' + user1 + ']]';
      break; */
  }
  if (message)
    wpSummary = wpSummary + ' ; ' + message;
  wpSummary = encodeURIComponent(wpSummary);

  var headers = new Array();
  headers['Content-Type'] = 'application/x-www-form-urlencoded';
  wpajax.http({ url: wgServer + wgScriptPath + '/index.php?title=' + encodeURIComponent(page) + '&action=submit',
                method: "POST", headers: headers,
                data: 'wpSave=1&wpTextbox1=' + wpTextbox1 + '&wpStarttime=' + wpStarttime + '&wpEdittime=' + wpEdittime
                    + '&wpEditToken=' + wpEditToken + '&wpSummary=' + wpSummary});
}

/* </source>

=== LiveHist ===

<source lang="javascript"> */

function liveHist(page) {
  var el = document.getElementById( 'livePreviewTitle' );
  el.innerHTML="<b style='text-decoration: blink;'>Hist : <span style='color:red'>"+page+"</span>...</b>";
  wpajax.http({url:wgServer + wgScriptPath + '/index.php?title=' + encodeURIComponent(page) + '&action=history', onSuccess: getHist, message: page });
}

function getHist(xmlreq, data) {
  doc = gml_XMLParse(xmlreq.responseText);
  bC  = getElementWithId('bodyContent', 'div', doc);
  if (bC ==  null) bC  = getElementWithId('article', 'div', doc);;
  var c=data.message;
  var LP = document.getElementById( 'livePreview' );
  var dLP = document.getElementById( 'divLivePreview' );
  LP.innerHTML = bC.innerHTML;
  if (LP.innerHTML == "undefined") LP.innerHTML = bC.xml;
  if (dLP.style.display == "none") {
    var elcb = document.getElementById( 'shidPrev' );
    elcb.checked="true";
    dLP.style.display = "inline";
  }
  var elt = document.getElementById( 'livePreviewTitle' );
  elt.innerHTML='<b><a href="'+wgServer+wgArticlePath.replace(/\$1/, encodeURI(c))+'" target="_new">'+c+'</a></b>';
}

/* </source>

=== LiveArticle ===

<source lang="javascript"> */

function liveArticle(page) {
  var el = document.getElementById( 'livePreviewTitle' );
  el.innerHTML="<b style='text-decoration: blink;'><span style='color:red'>"+page+"</span>...</b>";
  wpajax.http({url:wgServer + wgScriptPath + '/index.php?title=' + encodeURIComponent(page) + '&redirect=no', onSuccess: getArticle, message: page });
}

function getArticle(xmlreq, data) {
  doc = gml_XMLParse(xmlreq.responseText);
  bC  = getElementWithId('bodyContent', 'div', doc);
  if (bC ==  null) bC  = getElementWithId('article', 'div', doc);
  var c=data.message;
  var LP = document.getElementById( 'livePreview' );
  var dLP = document.getElementById( 'divLivePreview' );
  LP.innerHTML = bC.innerHTML;
  if (LP.innerHTML == "undefined") LP.innerHTML = bC.xml;
  if (dLP.style.display == "none") {
    var elcb = document.getElementById( 'shidPrev' );
    elcb.checked="true";
    dLP.style.display = "inline";
  }
  var elt = document.getElementById( 'livePreviewTitle' );
  elt.innerHTML='<b><a href="'+wgServer+wgArticlePath.replace(/\$1/, encodeURI(c))+'" target="_new">'+c+'</a></b>';
}

/* </source>

=== LiveContrib ===

<source lang="javascript"> */

function liveContrib(user) {
  var el = document.getElementById( 'livePreviewTitle' );
  el.innerHTML="<b style='text-decoration: blink;'><span style='color:red'>"+user+"</span>...</b>";
  wpajax.http({url:wgServer + wgArticlePath.replace(/\$1/, 'Special:Contributions/'+encodeURIComponent(user)),
                   onSuccess: getContrib, message: user });
}

function getContrib(xmlreq, data) {
  doc = gml_XMLParse(xmlreq.responseText);
  bC  = getElementWithId('bodyContent', 'div', doc);
  if (bC ==  null) bC  = getElementWithId('article', 'div', doc);
  var user=data.message;
  var LP = document.getElementById( 'livePreview' );
  var dLP = document.getElementById( 'divLivePreview' );
  LP.innerHTML = bC.innerHTML;
  if (LP.innerHTML == "undefined") LP.innerHTML = bC.xml;
  if (dLP.style.display == "none") {
    var elcb = document.getElementById( 'shidPrev' );
    elcb.checked="true";
    dLP.style.display = "inline";
  }
  var utilde=user.replace(new RegExp(/\'/g), "\\'");

  var optAvert = "";
  var optl = lstAvert.length;
  for (j=0; j<optl; j++) {
    if(lstAvert[j].hasPage) continue;
    optAvert += '<option value="'+lstAvert[j].template+'">'+lstAvert[j].string+'</option>';
  }

  var entete = document.getElementById( 'livePreviewTitle' );
  entete.innerHTML='<b><a href="'+wgServer+wgArticlePath.replace(/\$1/, 'User:'+encodeURIComponent(user))+'" target="_new">'+user+'</a></b>';
  entete.innerHTML = '<table width="100%" class="creator"><tr><td>'+entete.innerHTML +
    '</td><td align="right"><small>' +
    '[<a id="LiveAvertoLink" href="javascript:var message=getLiveAverto(\''+utilde+'\');">'+lang_menu[0].AVERTS+'</a>] : ' +
    '<select id="averto">' + optAvert + '</select>' + '</td></tr></table>';
}

/* </source>

=== LiveLog (:it:User:Jalo) ===

<source lang="javascript"> */

function liveLog(action,page) {
  var titolo = '';
  switch(action) {
    case 'upload':
      titolo = lang_log.UPLOAD;
      break;
    case 'newusers':
      titolo = lang_log.NEWUSER;
      break;
    case 'block':
      titolo = lang_log.BLOCK;
      break;
    case 'delete':
      titolo = lang_log.DELETE;
      break;
    case 'move':
      titolo = lang_log.MOVE;
      break;
    case 'protect':
      titolo = lang_log.PROTECT;
      break;
    default:
      break;
  }

  var el = document.getElementById( 'livePreviewTitle' );
  el.innerHTML="<b style='text-decoration: blink;'><span style='color:red'>"+titolo+"</span>...</b>";
  wpajax.http({url:wgServer + wgScriptPath + '/index.php?title=Special:Log&type=' + action + "&user=&page=" + encodeURIComponent(page), onSuccess: getLog, message: page });
}

function getLog(xmlreq, data) {
  doc = gml_XMLParse(xmlreq.responseText);
  bC  = getElementWithId('bodyContent', 'div', doc);
  if (bC ==  null) bC  = getElementWithId('article', 'div', doc);
  var c=data.message;
  var LP = document.getElementById( 'livePreview' );
  var dLP = document.getElementById( 'divLivePreview' );
  LP.innerHTML = bC.innerHTML;
  if (LP.innerHTML == "undefined") LP.innerHTML = bC.xml;
  if (dLP.style.display == "none") {
    var elcb = document.getElementById( 'shidPrev' );
    elcb.checked="true";
    dLP.style.display = "inline";
  }
  var elt = document.getElementById( 'livePreviewTitle' );
  elt.innerHTML='<b><a href="'+wgServer+wgArticlePath.replace(/\$1/, encodeURI(c))+'" target="_new">'+c+'</a></b>';
}

/* </source>

=== LiveFilter ===
*/

function liveFilter(id) {
  var el = document.getElementById( 'livePreviewTitle' );
  el.innerHTML="<b style='text-decoration: blink;'>Filter: <span style='color:red'></span>...</b>";
  wpajax.http({ url: wgServer + wgScriptPath + '/index.php?title=Special:AbuseLog&details='+id,
                onSuccess: getFilter, mid: id});
}

function getFilter(xmlreq, data) {
  doc = gml_XMLParse(xmlreq.responseText);
  bC  = getElementWithId('bodyContent', 'div', doc);
  if (bC ==  null) bC  = getElementWithId('article', 'div', doc);
  var LP = document.getElementById( 'livePreview' );
  var dLP = document.getElementById( 'divLivePreview' );
  LP.innerHTML = bC.innerHTML;
  if (LP.innerHTML == "undefined") LP.innerHTML = bC.xml;
  if (dLP.style.display == "none") {
    var elcb = document.getElementById( 'shidPrev' );
    elcb.checked="true";
    dLP.style.display = "inline";
  }
  var elt = document.getElementById( 'livePreviewTitle' );
  elt.innerHTML='<b><a href="'+wgServer+wgScriptPath+'/index.php?title=Special:AbuseLog&details='+data.mid+'" target="_new">Détails</a></b>';
}


/*
=== LiveSysop ===

<source lang="javascript"> */

function liveSysop() {
  wpajax.http({url:wgServer + wgScriptPath + '/api.php?action=query&list=allusers&augroup=sysop&aulimit=' +lrcAPIlimit +'&format=xml',
                   onSuccess: getSysop, message: "Traitement en cours...\n\n" });
}

function getSysop(xmlreq, data) {
  var api = xmlreq.responseXML.getElementsByTagName('api')[0];

  if (api.firstChild.nodeName == "error") return;

  var rcs = api.getElementsByTagName('query')[0].getElementsByTagName('allusers')[0].getElementsByTagName('u');

  leni=rcs.length;
  for (i=leni-1; i>=0; i--) {

    lstSysop.push(rcs[i].getAttribute('name'));

  }
  liveNS();
}

function liveWatch() {
  wpajax.http({url:wgServer + wgScriptPath + '/api.php?action=query&list=watchlistraw&wrlimit=' +lrcAPIlimit +'&format=xml',
                   onSuccess: getWatch, message: "Traitement en cours..." });
}

function getWatch(xmlreq, data) {
  var api = xmlreq.responseXML.getElementsByTagName('api')[0];

  if (api.firstChild.nodeName == "error") return;

  var rcs = api.getElementsByTagName('watchlistraw')[0].getElementsByTagName('wr');

  leni=rcs.length;
  for (i=0; i<leni; i++) {

    lstSuivi.push(rcs[i].getAttribute('title'));
    lstSuiviHH.push("--:--");

  }

  var wc1=api.getElementsByTagName('query-continue')[0];
  if (wc1)
  {
    var wrcontinue=wc1.getElementsByTagName('watchlistraw')[0].getAttribute('wrcontinue');
    wpajax.http({url:wgServer + wgScriptPath + '/api.php?action=query&list=watchlistraw&wrlimit=' +lrcAPIlimit +'&format=xml&wrcontinue=' + wrcontinue,
      onSuccess: getWatch, message: "Traitement en cours..." });
  }
  else
    liveRC();
}

function liveNS() {
  wpajax.http({url: wgServer + wgScriptPath + '/api.php?action=query&meta=siteinfo&siprop=namespaces&format=xml',
                   onSuccess: getNS, message: "Pobieranie nazw przestrzeni" });
}

function getNS(xmlreq, data) {
  var api = xmlreq.responseXML;

  if (api.firstChild.nodeName == "error") return;

  var nss = api.getElementsByTagName('query')[0].getElementsByTagName('namespaces')[0].getElementsByTagName('ns');
  var len = nss.length;
  var i;
  var id,ns;
  var options = "";
  var lstNs = new Array();

  for (i=0; i<len; i++) {
    id = nss[i].getAttribute('id');
    ns = nss[i].textContent;
    // Handle IE
    if (!ns)  ns = nss[i].text;

    if (id < 0) continue;
    if (id == 0) ns = lang_main_namespace;

    options += '<option value="' + id + '">' + ns + '</option>';
    lstNs.push(id);
  }
  options = '<option value="' + lstNs.join('|') + '">*</option>' + options;
  document.getElementById('selectNS').innerHTML = '<label for="showNS0">'+lang_menu[0].NAMESP+' </label><select id="showNS0">' + options + '</select>';

  liveWatch();
}

/* </source>

=== LiveRC ===

<source lang="javascript"> */

function supprLigne(quelLigne) {
  var i,len;
  var tab = document.getElementById('tabRC');
  // IE automatically inserts a TBODY that we have to take care of
  if (tab.firstChild && (tab.firstChild.nodeName == "TBODY")) tab=tab.firstChild;
  var els = new Array();
  if (quelLigne == '*')
    els = tab.getElementsByTagName('tr');
  else if (quelLigne == 'd') {
    var _els = tab.getElementsByTagName('tr');
    len = _els.length;
    for (i=len-1; i>=0; i--)
      if (_els[i].firstChild.style.backgroundColor == 'rgb(255, 250, 205)')
        els.push(_els[i]);
  } else if (quelLigne == 'r') {
    var _els = tab.getElementsByTagName('tr');
    len = _els.length;
    for (i=len-1; i>=0; i--)
      if (_els[i].firstChild.style.backgroundColor == 'rgb(255, 228, 225)')
        els.push(_els[i]);
  } else if (quelLigne == 'n') {
    var _els = tab.getElementsByTagName('tr');
    len = _els.length;
    for (i=len-1; i>=0; i--)
      if (_els[i].firstChild.style.backgroundColor == 'rgb(226, 242, 210)')
        els.push(_els[i]);
  } else if (quelLigne == 'c') {
    var _els = tab.getElementsByTagName('tr');
    len = _els.length;
    for (i=len-1; i>=0; i--)
      if (_els[i].firstChild.style.backgroundColor == 'white')
        els.push(_els[i]);
  } else
    els.push(document.getElementById(quelLigne));
  len = els.length;
  for (i=len-1; i>=0; i--)
    if (els[i] != null)
      tab.removeChild(els[i]);
}

function changeLigne(quelLigne) {
  var el = document.getElementById(quelLigne);
  var els1 = el.getElementsByTagName('th');
  var els2 = el.getElementsByTagName('td');
  var len = els1.length;
  for (var i=len-1; i>=0; i--)
    if (els1[i] != null)
      els1[i].style.backgroundColor = "#FFFACD";
  var len = els2.length;
  for (var i=len-1; i>=0; i--)
    if (els2[i] != null)
      els2[i].style.backgroundColor = "#FFFFE0";
}

function getElementsByClass(searchClass,node,tag) {
  var classElements = new Array();
  if ( node == null )
    node = document;
  if ( tag == null )
    tag = '*';
  var els = node.getElementsByTagName(tag);
  var elsLen = els.length;
  var pattern = new RegExp('(^|\\s)'+searchClass+'(\\s|$)');
  for (i = 0, j = 0; i < elsLen; i++) {
    if (pattern.test(els[i].className) ) {
      classElements[j] = els[i];
      j++;
    }
  }
  return classElements;
}

function tsToHhMm(timestamp) {
  var tz;
  var match;
  /*
  // moved to onload for better performance
  if (lrcTZ) {
    var regex = new RegExp(/^([-+])?(\d?\d):?(\d\d)$/);
    match = regex.exec(lrcTZ);
    if (!match) {
      //livercError(lang_error.TZ);
      return 'xx:xx';
    }
    tz = match[2]*60 + match[3]*1;
    tz = match[1] == '-' ? -tz : tz;
  } else {
    var now = new Date();
    tz = -now.getTimezoneOffset();
  }
  */
  tz = lrcTZ;
  var regex = new RegExp(/^\d\d\d\d-\d\d-\d\dT(\d\d):(\d\d):\d\dZ$/);
  match = regex.exec(timestamp);
  if (!match) {
    //livercError(lang_error.timestamp);
    return 'xx:xx';
  }
  var tt = (match[1]*60 + match[2]*1 + tz + 1440) % 1440;
  var mm = tt % 60;
  var hh = (tt - mm) / 60 % 24;
  return hh + ':' + (mm < 10 ? '0' : '') + mm;
}

function updateHidden() {
  var tempAr = new Array();
  for (var user in lstHidden) {
    var utilde = user.replace(new RegExp(/\'/g), "\\'");
    var uremove = '<a href="javascript:;" onClick="unhideUser(\''+utilde+'\');" style="color:grey">-</a>';
    var udiscut  = '<a href="'+wgServer+wgArticlePath.replace(/\$1/, 'User talk:'+encodeURIComponent(user))+'" style="color:seagreen" target="_new" title="'+lang_tooltips.TALK_TIP+'">'+lang_tooltips.TALK_SHORT+'</a>';
    var ucontrib = '<a href="javascript:;" onClick="liveContrib(\''+utilde+'\');" style="color:#43CD80" title="'+lang_tooltips.CONTRIB_TIP+'">'+lang_tooltips.CONTRIB_SHORT+'</a>';
    var uadmin   = '';
    if (lrcAdmin == true) {
       uadmin = ' • <a href="'+wgServer+wgArticlePath.replace(/\$1/, 'Special:Blockip/'+encodeURI(user))+'" target="_new" style="color:seagreen" title="'+lang_tooltips.BLOCK_TIP+'">'+lang_tooltips.BLOCK_SHORT+'</a>';
    }
    var ueditor  = '<a href="'+wgServer+wgArticlePath.replace(/\$1/, 'User:'+encodeURIComponent(user))+'" target="_new">'+user+'</a>';
    var ligne = '<span id="hidden-' + user + '"><small>' + uremove + ' • ' + udiscut + ' • ' + ucontrib + uadmin + ' • </small>' + ueditor + '</span><br />';
    tempAr.push(ligne);
  }
  tempAr.sort();
  var lvHidden = document.getElementById('liveHidden');
  lvHidden.innerHTML = "";
  var len = tempAr.length;
  for (var n=len-1; n>=0; n--)
    lvHidden.innerHTML += tempAr[n];
}

function updateFollowContact() {
  var tempAr = new Array();
  for (var user in lstContact2) {
    var timestamp = lstContact2[user].ts;
    if (timestamp == 0) continue;
    var utilde = user.replace(new RegExp(/\'/g), "\\'");
    var udiscut  = '<a href="'+wgServer+wgArticlePath.replace(/\$1/, 'User talk:'+encodeURIComponent(user))+'" style="color:seagreen" target="_new" title="'+lang_tooltips.TALK_TIP+'">'+lang_tooltips.TALK_SHORT+'</a>';
    var ucontrib = '<a href="javascript:;" onClick="liveContrib(\''+utilde+'\');" style="color:#43CD80" title="'+lang_tooltips.CONTRIB_TIP+'">'+lang_tooltips.CONTRIB_SHORT+'</a>';
    var uadmin   = '';
    if (lrcAdmin == true) {
       uadmin = ' • <a href="'+wgServer+wgArticlePath.replace(/\$1/, 'Special:Blockip/'+encodeURI(user))+'" target="_new" style="color:seagreen" title="'+lang_tooltips.BLOCK_TIP+'">'+lang_tooltips.BLOCK_SHORT+'</a>';
    }
    var ueditor  = '<a href="'+wgServer+wgArticlePath.replace(/\$1/, 'User:'+encodeURIComponent(user))+'" target="_new">'+user+'</a>';
    var ligne = '<span id="contact-' + timestamp + '"><small>' + tsToHhMm(timestamp) + ' • ' + udiscut + ' • ' + ucontrib + uadmin + ' • </small>' + ueditor + '</span><br />';
    tempAr.push(ligne);
  }
  tempAr.sort();
  var lvContact = document.getElementById('liveContact');
  lvContact.innerHTML = "";
  var len = tempAr.length;
  for (var n=len-1; n>=0; n--)
    lvContact.innerHTML += tempAr[n];
}

function updateFollowRevoc() {
  var tempAr = new Array();
  for (var user in lstRevoc) {
    var timestamp = lstRevoc[user].ts;
    var utilde = user.replace(new RegExp(/\'/g), "\\'");
    var uremove = '<a href="javascript:;" onClick="removeRevoc(\''+utilde+'\');" style="color:grey">-</a>';
    var udiscut  = '<a href="'+wgServer+wgArticlePath.replace(/\$1/, 'User talk:'+encodeURIComponent(user))+'" style="color:seagreen" target="_new" title="'+lang_tooltips.TALK_TIP+'">'+lang_tooltips.TALK_SHORT+'</a>';
    var ucontrib = '<a href="javascript:;" onClick="liveContrib(\''+utilde+'\');" style="color:#43CD80" title="'+lang_tooltips.CONTRIB_TIP+'">'+lang_tooltips.CONTRIB_SHORT+'</a>';
    var uadmin   = '';
    if (lrcAdmin == true) {
       uadmin = ' • <a href="'+wgServer+wgArticlePath.replace(/\$1/, 'Special:Blockip/'+encodeURI(user))+'" target="_new" style="color:seagreen" title="'+lang_tooltips.BLOCK_TIP+'">'+lang_tooltips.BLOCK_SHORT+'</a>';
    }
    var ueditor  = '<a href="'+wgServer+wgArticlePath.replace(/\$1/, 'User:'+encodeURIComponent(user))+'" target="_new">'+user+'</a>';
    var ligne = '<span id="revoc-' + timestamp + '"><small>' + tsToHhMm(timestamp) + ' • ' + uremove + ' • ' + udiscut + ' • ' + ucontrib + uadmin + ' • </small>' + ueditor + ' (' + lstRevoc[user].nb + ' '+lang_menu[0].XTIMES+')</span><br />';
    tempAr.push(ligne);
  }
  tempAr.sort();
  var lvRevoc = document.getElementById('liveRevoc');
  lvRevoc.innerHTML = "";
  var len = tempAr.length;
  for (var n=len-1; n>=0; n--)
    lvRevoc.innerHTML += tempAr[n];
}

function removeRevoc(name) {
   delete lstRevoc[name];
   updateFollowRevoc();
}


//function getRevision(xmlreq, data) {
function getRevision(rc) {
  if (document.getElementById('stopLive').checked) return;

//  var api = xmlreq.responseXML.getElementsByTagName('api')[0];
//
//  if (api.firstChild.nodeName == "error") return;

  var match;

//  var rc = data.rc
  var title = rc.title;
  var pageid = rc.pageid;
  var revid = rc.revid;
  var oldid = rc.old_revid;
  var user = rc.user;
  var comment = (rc.comment ? rc.comment : "");
  var timestamp = rc.timestamp;
  var ns = rc.ns;
  var state = rc.state;

  var regex = new RegExp(/\'/g);
  var regex2 = new RegExp(/\"/g);
  var escTitle = title.replace(regex, "\\'").replace(regex2, "&quot;");
  var escUser = user.replace(regex, "\\'").replace(regex2, "&quot;");

//  var revisions = api.getElementsByTagName('query')[0].getElementsByTagName('pages')[0].getElementsByTagName('page')[0].getElementsByTagName('revisions')[0].getElementsByTagName('rev');
//
//  var oldsize = (state & NEW ? 0 : revisions[1].textContent.length);
//  var newsize = revisions[0].textContent.length
  var oldsize = rc.oldlen
  var newsize = rc.newlen
  var sizediff = newsize - oldsize;
  if (typeof(sizediff) == 'undefined')	// shoudn't happen, but...
  {
	sizediff = '-';
  }


  // INITIALISATION LIGNE RC //

  var tr1 = document.createElement('tr');

  var th0 = document.createElement('th');
  var th1 = document.createElement('th');
  var td2 = document.createElement('td');
  var td3 = document.createElement('td');
  var td4 = document.createElement('td');


  // SUPPR. LIGNE //

  th0.innerHTML = '<a href="javascript:;" onClick="supprLigne(\''+pageid+'_'+revid+'\');" style="color:red" title="'+lang_tooltips.HIDE_THIS+'">X</a>';


  // ARTICLE //

  var arti = "", artiStyle = "";
  var preArti = "", postArti = "";

  var diff = "";
  var diffClose = "";
  if (lrcAutoCloseDiff == 1)
    diffClose='supprLigne(\''+pageid+'_'+revid+'\');';
  if (state & NEW)
    diff = '<a href="javascript:;" onClick="changeLigne(\''+pageid+'_'+revid+'\');liveArticle(\''+escTitle+'\',\''+user+'\');'+diffClose+'" style="color:green">New</a>';
  else if (state & UPLOAD)
    diff = '<a href="javascript:;" onClick="changeLigne(\''+pageid+'_'+revid+'\');liveLog(\'upload\',\''+escTitle+'\');'+diffClose+'" style="color:darkslateblue">Log</a>';
  else if (state & NEWUSER)
    diff = '<a href="javascript:;" onClick="changeLigne(\''+pageid+'_'+revid+'\');liveLog(\'newusers\',\''+escTitle+'\');'+diffClose+'" style="color:lime">Log</a>';
  else if (state & BLOCK)
    diff = '<a href="javascript:;" onClick="changeLigne(\''+pageid+'_'+revid+'\');liveLog(\'block\',\''+escTitle+'\');'+diffClose+'" style="color:darkgoldenrod">Log</a>';
  else if (state & DELETE)
    diff = '<a href="javascript:;" onClick="changeLigne(\''+pageid+'_'+revid+'\');liveLog(\'delete\',\''+escTitle+'\');'+diffClose+'" style="color: saddlebrown">Log</a>';
  else if (state & MOVE)
    diff = '<a href="javascript:;" onClick="changeLigne(\''+pageid+'_'+revid+'\');liveLog(\'move\',\''+escTitle+'\');'+diffClose+'" style="color:black">Log</a>';
  else if (state & PROTECT)
    diff = '<a href="javascript:;" onClick="changeLigne(\''+pageid+'_'+revid+'\');liveLog(\'protect\',\''+escTitle+'\');'+diffClose+'" style="color: darkslategray">Log</a>';
  else if (state & ABFILTER)
    diff = '<a href="javascript:;" onClick="changeLigne(\''+pageid+'_'+revid+'\');liveFilter('+revid+');'+diffClose+'" style="color: darkslategray">Filt</a>';
  else  { // simple edit
    diff = '<a href="javascript:;" onClick="changeLigne(\''+pageid+'_'+revid+'\');liveDiff(\''+escTitle+'\','+revid+','+oldid+');'+diffClose+'" style="color:orange" title="'+lang_tooltips.DIFF_TIP+'">'+lang_tooltips.DIFF_SHORT+'</a>'
    diff += '<sup><a href="' + wgServer + wgScriptPath + '/index.php?title='+encodeURI(escTitle)+'&diff='+revid+'&oldid='+oldid+'" target="_new">+</a></sup>';
    }

  var hist = '';
  var edit = '';
  var admin = '';
  // Don't show link for log rows
  if (!(state & UPLOAD) &&
      !(state & NEWUSER) &&
      !(state & BLOCK) &&
      !(state & DELETE) &&
      !(state & PROTECT) &&
      !(state & PATROL) &&
      !(state & MOVE) &&
      !(state & ABFILTER))
  {
    hist = '<a href="javascript:;" onClick="liveHist(\''+escTitle+'\');" style="color:darkorange" title="'+lang_tooltips.HIST_TIP+'">'+lang_tooltips.HIST_SHORT+'</a>';
    edit = '<a href="' + wgServer + wgScriptPath + '/index.php?title='+encodeURIComponent(title)+'&action=edit" target="_new" style="color:tomato" title="'+lang_tooltips.EDIT_TIP+'">'+lang_tooltips.EDIT_SHORT+'</a>';
    if (lrcAdmin == true) {
      admin = ' • <a href="' + wgServer + wgScriptPath + '/index.php?title='+encodeURIComponent(title)+'&action=delete" target="_new" style="color:orangered" title="'+lang_tooltips.DEL_TIP+'">'+lang_tooltips.DEL_SHORT+'</a>';

      admin += ' • <a href="' + wgServer + wgScriptPath + '/index.php?title='+encodeURIComponent(title)+'&action=protect" target="_new" style="color: coral" title="'+lang_tooltips.PROTECT_TIP+'">'+lang_tooltips.PROTECT_SHORT+'</a>';
    }
  }

  // Disambig / Homonymie ? ;
  ///////////////////////////
  if (ns == 0 && state & HOMONYMIE) {
    artiStyle = 'color: darkorange; font-weight: bold; font-style: italic;';
    preArti += '<img src="//upload.wikimedia.org/wikipedia/commons/thumb/7/72/Disambig.svg/16px-Disambig.svg.png" width="16px" alt="Homonymie" /> '
  }

  // Page protégée ? ;
  ////////////////////
  if (state & FULLLOCK)
    preArti += '<img src="//upload.wikimedia.org/wikipedia/commons/thumb/4/48/Padlock-red.svg/16px-Padlock-red.svg.png" width="16px" alt="Article protégé"/> ';
  if (state & LOCK)
    preArti += '<img src="//upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Padlock-gold.svg/16px-Padlock-gold.svg.png" width="16px" alt="Article semi-protégé"/> ';

  // Copyright ? ;
  //////////
  if (state & COPYRIGHT)
    preArti += '<img src="//upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Copyright.svg/16px-Copyright.svg.png" width="16px" alt="Copyright" /> ';

  // PaS ? ;
  //////////////////
  if (state & PAS)
    preArti += '<img src="//upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Cestino_pieno_architetto_01.svg/11px-Cestino_pieno_architetto_01.svg.png" height="11px" alt="PaS" /> ';

  // Intervention wikipompiers ? ;
  ////////////////////////////////
  if (state & FIRE)
    preArti += '<img src="//upload.wikimedia.org/wikipedia/commons/thumb/9/99/FireIcon.svg/12px-FireIcon.svg.png" height="12px" alt="Intervention Wikipompiers" /> ';

  // Adq ? ;
  //////////
  if (state & ADQ)
    postArti += '<sup><img src="//upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Fairytale_bookmark_gold.png/10px-Fairytale_bookmark_gold.png" width="10px" alt="Adq" /></sup>';

  // Bon article ? ;
  //////////////////
  if (state & BA)
    postArti += '<sup><img src="//upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Fairytale_bookmark_silver_light.png/10px-Fairytale_bookmark_silver_light.png" width="10px" alt="Bon article" /></sup>';

  // Article potentiellement de qualité ? ;
  /////////////////////////////////////////
  if (state & APDQ)
    postArti += '<sup><img src="//upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Fairytale_bookmark_light.png/10px-Fairytale_bookmark_light.png" width="10px" alt="Article potentiellement de qualité" /></sup>';

  // Article catégorisé ? ;
  /////////////////////////
  var isCategorized = "";
  if (!(state & REDIRECT)
    && !(state & HOMONYMIE)
    && ns == 0
    && !(state & CATEGORIZED))
    postArti += '<sup style="color:crimson">'+lang_category_short+'</sup>';

  // Redirect, Log, or simple edit ? ;
  //////////////////
  if (state & MOVE) {
//    artiStyle = 'color: magenta; font-weight: bold; font-style: italic;';
    postArti += ' <img src="//upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Forward.png/16px-Forward.png" width="16px" alt="Renommage" />';
    postArti += ' <a href="javascript:;" onClick="liveArticle(\''+rc.new_title+'\',\''+user+'\');">'+rc.new_title+'</a>';
    arti = '<a style="'+artiStyle+'" href="javascript:;" onClick="liveArticle(\''+escTitle+'\',\''+user+'\');">'+title+'</a>';
  }
  else if (state & REDIRECT) {
    artiStyle = 'color: green; font-weight: bold; font-style: italic;';
    postArti += ' <img src="//upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Redirectltr.png/20px-Redirectltr.png" width="20px" alt="Redirect" />';
    postArti += ' <a href="javascript:;" onClick="liveArticle(\''+rc.redirect+'\',\''+user+'\');">'+rc.redirect+'</a>';
    arti = '<a style="'+artiStyle+'" href="javascript:;" onClick="liveArticle(\''+escTitle+'\',\''+user+'\');">'+title+'</a>';
  }
  else if (state & UPLOAD) {
    postArti += ' <img src="//upload.wikimedia.org/wikipedia/commons/thumb/4/47/Gartoon-Gnome-dev-floppy.png/16px-Gartoon-Gnome-dev-floppy.png" width="16px" alt="Upload" />';
    arti = '<a style="'+artiStyle+'" href="javascript:;" onClick="liveArticle(\''+escTitle+'\',\''+user+'\');" onDblClick="window.open(\''+wgServer+wgArticlePath.replace(/\$1/, encodeURI(title))+'\');">'+title+'</a>';
  }
  else if (state & NEWUSER) {
    postArti += ' <img src="//upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Crystal_personal.png/16px-Crystal_personal.png" width="16px" alt="Nouvel utilisateur" />';
    arti = '<a style="'+artiStyle+'" href="javascript:;" onClick="liveArticle(\''+escTitle+'\',\''+user+'\');" onDblClick="window.open(\''+wgServer+wgArticlePath.replace(/\$1/, encodeURI(title))+'\');">'+title+'</a>';
  }
  else if (state & BLOCK) {
//    artiStyle = 'color: magenta; font-weight: bold; font-style: italic;';
    postArti += ' <img src="//upload.wikimedia.org/wikipedia/commons/thumb/6/64/Crystal_Clear_action_lock3.png/16px-Crystal_Clear_action_lock3.png" width="16px" alt="Blocage" />';
    postArti += ' <a href="javascript:;" onClick="liveLog("block",\''+rc.title+'\');">('+rc.duration+')</a>';
    arti = '<a style="'+artiStyle+'" href="javascript:;" onClick="liveArticle(\''+escTitle+'\',\''+user+'\');">'+title+'</a>';
  }
  else if (state & DELETE) {
    postArti += ' <img src="//upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Editcut.png/16px-Editcut.png" width="16px" alt="Suppression" />';
    arti = '<a style="'+artiStyle+'" href="javascript:;" onClick="liveArticle(\''+escTitle+'\',\''+user+'\');" onDblClick="window.open(\''+wgServer+wgArticlePath.replace(/\$1/, encodeURI(title))+'\');">'+title+'</a>';
  }
  else if (state & PROTECT) {
    postArti += ' <img src="//upload.wikimedia.org/wikipedia/commons/thumb/7/72/Crystal_Clear_app_agent.png/16px-Crystal_Clear_app_agent.png" width="16px" alt="Protection" />';
    arti = '<a style="'+artiStyle+'" href="javascript:;" onClick="liveArticle(\''+escTitle+'\',\''+user+'\');" onDblClick="window.open(\''+wgServer+wgArticlePath.replace(/\$1/, encodeURI(title))+'\');">'+title+'</a>';
  }
  else {
    arti = '<a style="'+artiStyle+'" href="javascript:;" onClick="liveArticle(\''+escTitle+'\',\''+user+'\');" onDblClick="window.open(\''+wgServer+wgArticlePath.replace(/\$1/, encodeURI(title))+'\');">'+title+'</a>';
  }

  th1.innerHTML = '<small>' + tsToHhMm(timestamp) + ' • ' + diff + ' • ' + hist + ' • ' + edit + admin + ' • </small>'
                + preArti + arti + postArti;
  th1.className="creator-title";
  th1.style.textAlign="left";
  th1.style.border="1px";
  th1.style.width="40%";

  // EDITOR //
  ////////////
  var discut  = '<a href="'+wgServer+wgArticlePath.replace(/\$1/, 'User talk:'+encodeURIComponent(user))+'" style="color:seagreen" target="_new" title="'+lang_tooltips.TALK_TIP+'">'+lang_tooltips.TALK_SHORT+'</a>';
  var contrib = '<a href="javascript:;" onClick="liveContrib(\''+escUser+'\');" style="color:#43CD80" title="'+lang_tooltips.CONTRIB_TIP+'">'+lang_tooltips.CONTRIB_SHORT+'</a>';
  var editor = "", preEditor = "";

  // Bot ? ;
  //////////
  if (state & BOT)
    preEditor += '<img src="//upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Nuvola_apps_kservices.png/16px-Nuvola_apps_kservices.png" width="16px" />&nbsp;';

  // Sysop ? ;
  ////////////
  if (state & SYSOP)
    preEditor += '<img src="//upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Broom_icon.svg/16px-Broom_icon.svg.png" width="16px" />&nbsp;';

  // Reverted ? ;
  /////////////////
  if (state & REVERT)
    preEditor += '<img src="//upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Nuvola_actions_undo.png/16px-Nuvola_actions_undo.png" width="16px" />&nbsp;';

  // TOR potentiel / AOL
  var isTOR = new RegExp(/172\.\d+\.\d+\.\d+/);
  if (isTOR.test(user))
    preEditor += '<img src="//upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Dialog-warning.svg/16px-Dialog-warning.svg.png" width="16px" />&nbsp;';

  editor = '<a href="'+wgServer+wgArticlePath.replace(/\$1/, 'User:'+encodeURIComponent(user))+'" target="_new">'+user+'</a>';
  var uadmin   = '';
  if (lrcAdmin == true) {
    uadmin = ' • <a href="'+wgServer+wgArticlePath.replace(/\$1/, 'Special:Blockip/'+encodeURI(user))+'" target="_new" style="color:seagreen" title="'+lang_tooltips.BLOCK_TIP+'">'+lang_tooltips.BLOCK_SHORT+'</a>';
  }

  var uhide = '<a href="javascript:;" onClick="supprLigne(\''+pageid+'_'+revid+'\'); hideUser(\''+ user +'\');" style="color:grey" title="'+lang_tooltips.USER_HIDE_TIP+'">'+lang_tooltips.USER_HIDE_SHORT+'</a>';

  td2.innerHTML = '<small>' + discut + ' • ' + contrib + ' • ' + uhide + uadmin + ' • </small>'
                + preEditor + editor;
  td2.className="creator-name";
  td2.style.border = "1px";
  td2.style.width = "20%";

  if (lstRevoc[user]) {
    td2.style.border = "2px solid red";
    td2.innerHTML += '<sup style="color:red">(' + lstRevoc[user].nb + ' révoc)</sup>'
  }

  // COMMENT //
  // Remplace lien [[xxx]] par <a> ;
  var wcomment = comment.htmlize();
  var regex1 = new RegExp(/\[\[(([^\]\|]*)(.*?))\]\]/g);
  wcomment = wcomment.replace(regex1, "<a href='"+wgServer+wgScriptPath+"/index.php?title=$2&redirect=no' target='_new'>$1</a>");
  var regex2 = new RegExp(/\>[^\]\|<]*\|([^\]\|<]*)</g);
  wcomment = wcomment.replace(regex2, ">$1<");

  // Abusefilter tag ? ;
  /////////////////
  if (state & TAG) {
    wcomment += '<br /><span style="color: red; font-weight: bold;">Tag : ';
    wcomment += rc.tags[0].firstChild.nodeValue;
    for (var tagId = 1; tagId < rc.tags.length; ++tagId)
      wcomment += ' | ' + rc.tags[tagId].firstChild.nodeValue;
    wcomment += '</span>';
    td3.style.border = "2px solid red";
  } else {
  td3.style.border = "1px";
  td3.style.width = "40%";
  }

  td3.innerHTML = "<small>" + wcomment + "</small>";


  if (state & PATROLLED) {
    td2.style.backgroundColor = "#e3e3f1";
    td3.style.backgroundColor = "#e3e3f1";
    td4.style.backgroundColor = "#e3e3f1";
  }

  if (state & ABFILTER) {
    th0.style.backgroundColor = "#FFBE60";
    th1.style.backgroundColor = "#FFBE60";
    td2.style.backgroundColor = "#FFBE60";
    td3.style.backgroundColor = "#FFBE60";
    td4.style.backgroundColor = "#FFBE60";
  }

 if (state & UPLOAD) {
    th0.style.backgroundColor = "#D1CAFA";
    th1.style.backgroundColor = "#D1CAFA";
    td2.style.backgroundColor = "#D1CAFA";
    td3.style.backgroundColor = "#D1CAFA";
    td4.style.backgroundColor = "#D1CAFA";
    tr1.style.border = "1px solid  darkslateblue";
  }

  if (state & NEWUSER) {
    th0.style.backgroundColor = "#C6FF6D";
    th1.style.backgroundColor = "#C6FF6D";
    td2.style.backgroundColor = "#C6FF6D";
    td3.style.backgroundColor = "#C6FF6D";
    td4.style.backgroundColor = "#C6FF6D";
    tr1.style.border = "1px solid  lime";
  }

  if (state & BLOCK) {
    th0.style.backgroundColor = "#EECC84";
    th1.style.backgroundColor = "#EECC84";
    td2.style.backgroundColor = "#EECC84";
    td3.style.backgroundColor = "#EECC84";
    td4.style.backgroundColor = "#EECC84";
    tr1.style.border = "1px solid  darkgoldenrod";
  }

  if (state & DELETE) {
    th0.style.backgroundColor = "#E7CAA7";
    th1.style.backgroundColor = "#E7CAA7";
    td2.style.backgroundColor = "#E7CAA7";
    td3.style.backgroundColor = "#E7CAA7";
    td4.style.backgroundColor = "#E7CAA7";
    tr1.style.border = "1px solid saddlebrown";
  }

  if (state & MOVE) {
    th0.style.backgroundColor = "#FDC5FF";
    th1.style.backgroundColor = "#FDC5FF";
    td2.style.backgroundColor = "#FDC5FF";
    td3.style.backgroundColor = "#FDC5FF";
    td4.style.backgroundColor = "#FDC5FF";
    tr1.style.border = "1px solid magenta";
  }

  if (state & PROTECT) {
    th0.style.backgroundColor = "#B2BCC6";
    th1.style.backgroundColor = "#B2BCC6";
    td2.style.backgroundColor = "#B2BCC6";
    td3.style.backgroundColor = "#B2BCC6";
    td4.style.backgroundColor = "#B2BCC6";
    tr1.style.border = "1px solid  darkslategray";
  }

  if (state & REVERT) {
    th0.style.backgroundColor = "#FFE4E1";
    th1.style.backgroundColor = "#FFE4E1";
    td2.style.backgroundColor = "#FFE4E1";
    td3.style.backgroundColor = "#FFE4E1";
    td4.style.backgroundColor = "#FFE4E1";
    tr1.style.border = "1px solid crimson";
  }

  if (state & BLANKING || newsize == 0) {
    th0.style.backgroundColor = "white";
    th1.style.backgroundColor = "white";
    td2.style.backgroundColor = "white";
    td3.style.backgroundColor = "white";
    td4.style.backgroundColor = "white";
    tr1.style.border = "2px double crimson";
  }
  if (state & NEW) {
    th0.style.backgroundColor = "#e2f2d2";
    th1.style.backgroundColor = "#e2f2d2";
    td2.style.backgroundColor = "#e2f2d2";
    td3.style.backgroundColor = "#e2f2d2";
    td4.style.backgroundColor = "#e2f2d2";
    tr1.style.border = "1px solid green";
  }

  if (state & IP) {
    td2.style.backgroundColor = "white";
    td3.style.backgroundColor = "white";
    td4.style.backgroundColor = "white";
  }

  if (isTOR.test(user))
    td2.style.backgroundColor = "pink";

  if (state & REPLACED) {
    th0.style.backgroundColor = "pink";
    th1.style.backgroundColor = "pink";
    td2.style.backgroundColor = "pink";
    td3.style.backgroundColor = "pink";
    td4.style.backgroundColor = "pink";
    td4.innerHTML = '<img src="//upload.wikimedia.org/wikipedia/commons/thumb/9/95/Categorie_III.svg/10px-Categorie_III.svg.png" width="10px" alt="Warning"/>';
    tr1.style.border = "2px solid crimson";
  }

  // CONTACT LIST //
  //////////////////
  if (lstContact2[user]) {
    td2.style.border = "2px solid gold";
    td2.style.backgroundColor = "yellow";
  }

  if (user == wgUserName) {
    td2.style.border = "2px solid #A0B0E0";
    td2.style.backgroundColor = "#F0F8FF";
  }

  // DELTA SIZE //

  // delta de modif ;
  ///////////////////
  if (!(state & NEWUSER) &&
      !(state & PROTECT) &&
      !(state & MOVE) &&
      !(state & DELETE) &&
      !(state & ABFILTER)) {
  var txtdiff = "";
  if (sizediff < 0)
    txtdiff = '<sub style="color:red">'+sizediff+'</sub>';
  else if (sizediff == 0)
    txtdiff = '<small style="color:purple">='+sizediff+'</small>';
  else
    txtdiff = '<sup style="color:blue">+'+sizediff+'</sup>';
  td4.innerHTML += txtdiff;
  td4.style.border = "1px";
  td4.style.textAlign = "right";
  }


  // ASSEMBLAGE LIGNE //

  tr1.appendChild(th0);
  tr1.appendChild(th1);
  tr1.appendChild(td2);
  tr1.appendChild(td3);
  tr1.appendChild(td4);
  tr1.id = pageid+"_"+revid;

  var tab = document.getElementById( 'tabRC' );
  // IE automatically inserts a TBODY that we have to take care of
  if (tab.firstChild && (tab.firstChild.nodeName == "TBODY")) tab=tab.firstChild;
  var elold = document.getElementById(pageid+"_"+oldid);

  if (tab.firstChild != null)
    tab.insertBefore(tr1, tab.firstChild);
  else
    tab.appendChild(tr1);
  if (elold == null) {
    if (tab.childNodes.length > lrcRCLimit) {
      var idt = tab.lastChild.id;
      supprLigne(idt);
    }
  } else {
    supprLigne(pageid+"_"+oldid);
  }

  // Don't show RC if checkbox is not checked
  if ((!document.getElementById('showRC').checked) &&
     (!(state & UPLOAD) &&
      !(state & NEWUSER) &&
      !(state & BLOCK) &&
      !(state & DELETE) &&
      !(state & PROTECT) &&
      !(state & MOVE) &&
      !(state & ABFILTER)))
    supprLigne(pageid+"_"+revid);

  if (state & PATROL)
    supprLigne(pageid+"_"+revid);

  // Don't show Log if checkbox is not checked
  if ((!document.getElementById('showLog').checked) &&
     ((state & UPLOAD) ||
      (state & NEWUSER) ||
      (state & BLOCK) ||
      (state & DELETE) ||
      (state & PROTECT) ||
      (state & MOVE)))
    supprLigne(pageid+"_"+revid);

  // Don't show Filter if checkbox is not checked
  if ((!document.getElementById('showFilter').checked) &&
     (state & ABFILTER))
    supprLigne(pageid+"_"+revid);

  // MISE A JOUR LISTES //

  var spos = lstSuivi.indexOf(title);
  if(spos != -1) {
    th0.style.border = "2px solid gold";
    th0.style.backgroundColor = "yellow";
    th1.style.border = "2px solid gold";
    th1.style.backgroundColor = "yellow";
    lstSuiviHH[spos] = tsToHhMm(timestamp);
    var tempsAr = new Array();
    var len = lstSuivi.length;
    for (var n = 0; n < len; n++) {
      if(lstSuiviHH[n] == "--:--") continue;
      var cstilde = lstSuivi[n].replace(new RegExp(/\'/g), "\\'");
      var sdiff = '<a href="javascript:;" onClick="liveDiff(\''+cstilde+'\','+revid+','+oldid+');" style="color:orange">Diff</a>';
      var shist = '<a href="javascript:;" onClick="liveHist(\''+cstilde+'\');" style="color:darkorange">H</a>';
      var sarti = '<a href="javascript:;" onClick="liveArticle(\''+cstilde+'\');">'+lstSuivi[n]+'</a>';
      var ligne='<small>' + lstSuiviHH[n] + ' • ' + sdiff + ' • ' + shist + ' • </small>' + sarti +'<br />';
      tempsAr.push(ligne);
    }
    tempsAr.sort();
    len = tempsAr.length;
    var lvSuivi = document.getElementById( 'liveSuivi' );
    lvSuivi.innerHTML = "";
    for (var n=len-1; n >= 0; n--)
      lvSuivi.innerHTML = lvSuivi.innerHTML + tempsAr[n];
  }


  if (lstContact2[user]) {
    lstContact2[user].ts = timestamp;
    updateFollowContact();
  }

  if (state & REVERT) {
    var regex = new RegExp(/\[\[Sp[ée]cial:Contributions\/([^\]\|]+)/);
    match = regex.exec(comment);

    if (!match) {
		var regex2 = new RegExp(/\[\[Specjalna:Wkład\/([^\]\|]+)/);
		match = regex2.exec(comment);
    }

    if (match) {
      var userR = match[1];
      if (userR != user && userR != wgUserName) {
        if (!lstRevoc[userR]) lstRevoc[userR] = { ts: 0, nb: 0 };
        lstRevoc[userR].ts = timestamp;
        lstRevoc[userR].nb += 1;
        updateFollowRevoc();
      }
    }
  }
}

function getRedirCat(xmlreq, data) {
  if (document.getElementById('stopLive').checked) return;

  var yurik = xmlreq.responseXML.getElementsByTagName('api')[0];

  if (yurik.firstChild.nodeName == "error") return;

  var rc = data.rc;
  var pageid = rc.pageid;
  var revid = rc.revid;
  var state = rc.state;

  var page = yurik.getElementsByTagName('pages')[0].getElementsByTagName('page')[0];

  if (page.getElementsByTagName('redirect').length) {
    state += REDIRECT;
    if (page.getElementsByTagName('redirect')[0].getElementsByTagName('to').length)
      rc.redirect = page.getElementsByTagName('redirect')[0].getElementsByTagName('to')[0].textContent;
  }

  if (page.getElementsByTagName('categories').length) {
    state += CATEGORIZED;

    var categories = page.getElementsByTagName('categories')[0].getElementsByTagName('cl');
    var i,j;
    var leni = categories.length;
    var lenj = categoriestests.length;

    for (i=0; i<leni; i++)
      for (j=0; j<lenj; j++)
        if (new RegExp(lang_category+categoriestests[j].regex, "i").test(categories[i].textContent))
          state += categoriestests[j].state;
  }

  rc.state = state;

  getRevision(rc);
}

function getRedirCat2(xmlreq, data) {
  if (document.getElementById('stopLive').checked) return;

  var api = xmlreq.responseXML.getElementsByTagName('api')[0];

  if (api.firstChild.nodeName == "error") return;

  var log = data.log;
  var pageid = log.pageid;
  var revid = log.revid;
  var state = log.state;

  var query = api.getElementsByTagName('query')[0];

  if (query.getElementsByTagName('redirects').length) {
    state += REDIRECT;
    if (query.getElementsByTagName('redirects')[0].getElementsByTagName('r').length)
      log.redirect = query.getElementsByTagName('redirects')[0].getElementsByTagName('r')[0].getAttribute('to');
  }

  if (query.getElementsByTagName('categories').length) {
    state += CATEGORIZED;

    var categories = query.getElementsByTagName('categories')[0].getElementsByTagName('cl');
    var i,j;
    var leni = categories.length;
    var lenj = categoriestests.length;

    for (i=0; i<leni; i++)
      for (j=0; j<lenj; j++)
        if (new RegExp(lang_category+categoriestests[j].regex, "i").test(categories[i].getAttribute('title')))
          state += categoriestests[j].state;
  }

  log.state = state;

  getRevision(log);
}

// Get RC and Log
function getRC(xmlreq, data) {
  if (document.getElementById('stopLive').checked) return;

  var api = xmlreq.responseXML.getElementsByTagName('api')[0];

  if (api.firstChild.nodeName == "error") return;

  var rcs = api.getElementsByTagName('query')[0].getElementsByTagName('recentchanges')[0].getElementsByTagName('rc');
  var i,j,leni,lenj,rc;

  leni=rcs.length;
  for (i=leni-1; i>=0; i--) {
    // Using rcid as revid can be 0 (e.g. when moving a page)
    if (rcs[i].getAttribute('rcid') <= lastrcid) continue;

    rc = new Object();
    rc.state = 0;

    lenj = rcs[i].attributes.length;
    for (j=0; j<lenj; j++) {
      switch(rcs[i].attributes[j].name) {
        case 'anon':
          rc.state += IP;
          break;
        case 'bot':
          rc.state += BOT;
          break;
        case 'new':
          rc.state += NEW;
          break;
        case 'minor':
          rc.state += MINOR;
          break;
        case 'new_ns':
          rc.state += NEWNS;
          break;
        case 'new_title':
          rc.state += RENAMED;
          break;
        case 'patrolled':
          rc.state += PATROLLED;
          break;
        case 'type':
          break;
        default:
          rc[rcs[i].attributes[j].name] = rcs[i].attributes[j].value;
          break;
      }
    }

    var tags = rcs[i].getElementsByTagName('tags')[0].getElementsByTagName('tag');
    if (tags.length) {
      rc.state += TAG;
      rc.tags = tags;
    }

    if (typeof(rc.comment) != "undefined") {
      lenj = commenttests.length;
      for (j=0; j<lenj; j++)
        if (new RegExp(commenttests[j].regex).test(rc.comment))
          rc.state += commenttests[j].state;
    }

    if (rc.newlen == 0) rc.state += BLANKING;

    if (lstSysop.indexOf(rc.user) != -1)
      rc.state += SYSOP;

    var mitigating = (rc.state & REVERT)
      || (rc.state & BLANKING)
      || (rc.state & REPLACED)
      || (rc.state & TAG)
      || (lstContact2[rc.user])
      || (lstRevoc[rc.user])
      || (rc.user == wgUserName);

    if (document.getElementById('showIP').checked
      && !(rc.state & IP)
      && !mitigating ) continue;

    if ((rc.state & PATROLLED)
      && document.getElementById('showIPNEW').checked
      && !mitigating ) continue;

    if (lstHidden[rc.user] && !mitigating) continue;

    wpajax.http({url: wgServer + wgScriptPath + '/api.php?titles=' + encodeURIComponent(rc.title) + '&action=query&prop=categories&redirects&format=xml',
                 onSuccess: getRedirCat, rc: rc });
  }

  // Log
  var logs = api.getElementsByTagName('query')[0].getElementsByTagName('logevents')[0].getElementsByTagName('item');
  var i,j,leni,lenj,log;

  leni=logs.length;
  for (i=leni-1; i>=0; i--) {
    if (logs[i].getAttribute('logid') <= lastlogid) continue;
    log = new Object();
    log.state = 0;

    lenj = logs[i].attributes.length;
    for (j=0; j<lenj; j++) {
        if (logs[i].attributes[j].name == 'type')
        {
          switch(logs[i].attributes[j].value) {
            case 'patrol':
// I "Segna come verificata" non li cago
            log.state += PATROL;
              break;
            case 'newusers':
              log.state += NEWUSER;
              break;
            case 'upload':
              log.state += UPLOAD;
              break;
            case 'block':
              log.state += BLOCK;
              if (logs[i].firstChild)
                log.duration = logs[i].firstChild.attributes[1].value;
              break;
            case 'delete':
              log.state += DELETE;
              break;
            case 'move':
              log.state += MOVE;
              if (logs[i].firstChild)
                log.new_title = logs[i].firstChild.attributes[1].value;
            case 'protect':
              log.state += PROTECT;
              break;
            case 'review':
              log.state += REVIEW;
              break;
            default:
              break;
          }
        }
        else
          log[logs[i].attributes[j].name] = logs[i].attributes[j].value;

        //Set a dummy revid to prevent deletion
        log.revid=log.logid;
    }

    if (typeof(log.comment) != "undefined") {
      lenj = commenttests.length;
      for (j=0; j<lenj; j++)
        if (new RegExp(commenttests[j].regex).test(log.comment))
          log.state += commenttests[j].state;
    }

    if (lstSysop.indexOf(log.user) != -1)
      log.state += SYSOP;

    if (!(log.state & REVIEW))
		wpajax.http({url: wgServer + wgScriptPath + '/api.php?titles=' + encodeURIComponent(log.title) + '&action=query&prop=categories&redirects&format=xml',
				   onSuccess: getRedirCat2, log: log });
  }

 // Filters
  var filters = api.getElementsByTagName('query')[0].getElementsByTagName('abuselog')[0].getElementsByTagName('item');
  var i,j,leni,lenj,filter;

  leni=filters.length;
  for (i=leni-1; i>=0; i--) {
    if (filters[i].getAttribute('id') <= lastfilterid) continue;
    filter = new Object();
    filter.state = ABFILTER;

    lenj = filters[i].attributes.length;
    for (j=0; j<lenj; j++) {
        filter[filters[i].attributes[j].name] = filters[i].attributes[j].value;
    }

    //Set a dummy revid to prevent deletion
    filter.revid = filter.id

    // Get filter description


    //Set a dummy revid to prevent deletion
    filter.revid = filter.id

    wpajax.http({url: wgServer + wgScriptPath + '/api.php?action=query&list=abusefilters&abflimit=1&format=xml&abfstartid=' + filter.filter_id,
               onSuccess: getFilterTitle, filter: filter });
  }


  lastrcid = rcs[0].getAttribute('rcid');
  lastlogid = logs[0].getAttribute('logid');
  lastfilterid = filters[0].getAttribute('id');
  lastrctimestamp = rcs[0].getAttribute('timestamp').replace(new RegExp(/\D/g), "");
  lastletimestamp = logs[0].getAttribute('timestamp').replace(new RegExp(/\D/g), "");
  lastafltimestamp = filters[0].getAttribute('timestamp').replace(new RegExp(/\D/g), "");
  document.getElementById('tsInit').innerHTML = lastrctimestamp ;
}

function getFilterTitle(xmlreq, data) {
  var filter = data.filter;

  var xmlinfo = xmlreq.responseXML.getElementsByTagName('api')[0];

  if (xmlinfo.firstChild.nodeName == "error") return;

  filter.comment = 'Déclenchement du filtre '
  filter.comment += xmlinfo.getElementsByTagName('abusefilters')[0].getElementsByTagName('filter')[0].getAttribute('id');
  filter.comment += ': ';
  filter.comment += xmlinfo.getElementsByTagName('abusefilters')[0].getElementsByTagName('filter')[0].getAttribute('description');
  filter.comment += ' (action: '+ filter.result + ')';

  getRevision(filter);
}

function liveRC() {
  var refresh = 10;
  timer= setTimeout("liveRC()",refresh*1000);

  if (document.getElementById('stopLive').checked) return;

  var rcns = document.getElementById('showNS0').value;
  if (rcns == null) return;

  wpajax.http({url:wgServer + wgScriptPath
    + '/api.php?action=query&list=recentchanges|logevents|abuselog&rcnamespace=' + rcns
    + '&rcprop=user|comment|flags|timestamp|title|ids|sizes|tags' + (lrcPatrol ? '|patrolled' : '')
    + (document.getElementById('showBot').checked ? '&rcshow=!bot' : '')
    + '&rcend=' + lastrctimestamp + '&rclimit=' + lrcRCLimit
    + '&leend=' + lastletimestamp + '&lelimit=' + lrcRCLimit
    + '&aflend=' + lastafltimestamp + '&afllimit=' + lrcRCLimit
    + '&format=xml',
    onSuccess: getRC, message: "Traitement en cours...\n\n" });
}

function hideUser(name) {
   lstHidden[name] = true;
   updateHidden();
}

function unhideUser(name) {
   delete lstHidden[name];
   updateHidden();
}

function showHideObj(parent, fils) {
  var ofils = document.getElementById( fils );
  if (parent.checked)
    ofils.style.display=(ofils.nodeName=='span') ? 'inline' : 'block';
  else
    ofils.style.display="none";
}

function liveRCInit()
{
  wpajax.http({ url: wgServer + wgScriptPath + '/api.php?action=query&meta=userinfo&uiprop=rights&format=xml',
                onSuccess: getRights});
}

addOnloadHook(function () {
  if (wgNamespaceNumber==lrcNamespaceNumber && wgTitle == lrcTitle) {

    var top        = document.getElementById( 'top' );
    if (top != null) {
        top.innerHTML = "";
        top.style.display = "none";
    }
    var siteSub    = document.getElementById( 'siteSub' );
    var contentSub = document.getElementById( 'contentSub' );
    var rtb        = document.getElementById( 'RealTitleBanner' );
    var rt         = document.getElementById( 'RealTitle' );
    var pca        = document.getElementById( 'p-cactions' );

    // init timezone settings
    if (lrcTZ) {
		lrcTZ = false;
		var regex = new RegExp(/^([-+])?(\d{1,2}):?(\d{2})$/);
		match = regex.exec(lrcTZ);
		if (match) {
			lrcTZ = match[2]*60 + match[3]*1;
			lrcTZ = match[1] == '-' ? -lrcTZ : lrcTZ;
		}
    }
    if (!lrcTZ) {
		var now = new Date();
		lrcTZ = -now.getTimezoneOffset();
    }
    // try to show TZ on LiveRC page
    try {
		lrcTZ_h = Math.round(lrcTZ/60)
		lrcTZ_m = Math.round(lrcTZ - lrcTZ_h*60)
		lrcTZ_m = (lrcTZ_m<10) ? "0"+lrcTZ_m : ""+lrcTZ_m
		document.getElementById('timezoneSetting').innerHTML = "UTC" + (lrcTZ_h>0 ? '+' : '') + lrcTZ_h + ":" + lrcTZ_m;
    }
    catch (e) {}

    if (siteSub != null) siteSub.style.display = "none";
    if (contentSub != null) contentSub.style.display = "none";
    if (rtb != null) rtb.style.display = "none";
    if (rt != null) rt.style.display = "none";
    if (pca != null) pca.style.display = "none";

    var showIPNEWbox = '';
    if (lrcPatrol)
      showIPNEWbox = '<input id="showIPNEW"    type="checkbox" ' + lrcShowIPNEWChecked + '/>' +
        '<label for="showIPNEW">'   + lang_menu[0].IPNEW  + ' </label>';

    var lvPreviewFoot = document.getElementById( 'livePreviewFoot' );
    lvPreviewFoot.innerHTML = '<a href="javascript:;" onClick="supprLigne(\'*\');" style="color: red; font-weight: bold;">X</a>' +
      '<a href="javascript:;" onClick="supprLigne(\'d\');" style="color: rgb(255, 235, 71); font-weight: bold;">X</a>' +
      '<a href="javascript:;" onClick="supprLigne(\'r\');" style="color: rgb(255, 99, 83); font-weight: bold;">X</a>' +
      '<a href="javascript:;" onClick="supprLigne(\'n\');" style="color: rgb(178, 243, 113); font-weight: bold;">X</a>' +
      '<input id="stopLive"  type="checkbox" value="true" />' +
      '<label for="stopLive">' + lang_menu[0].PAUSE   + '</label>' +
      '<input id="shidPrev"  type="checkbox" onclick="showHideObj(this, \'divLivePreview\');" />' +
      '<label for="shidPrev">' + lang_menu[0].PREVIEW + '</label>' +
      '<input id="shidList"  type="checkbox" onclick="showHideObj(this, \'liveFollow\');" />' +
      '<label for="shidList">' + lang_menu[0].LISTS   + '</label>' +
      '<input id="showDiffR" type="checkbox" />' +
      '<label for="showDiffR">'+ lang_menu[0].LOWDIFF + '</label>' +
      '<input id="showBot"   type="checkbox" ' + lrcShowBotChecked + ' />' +
      '<label for="showBot">'  + lang_menu[0].NOBOTS  + '</label>' +
      '<input id="showIP"    type="checkbox" ' + lrcShowIPChecked + '/>' +
      '<label for="showIP">'   + lang_menu[0].IPONLY  + ' </label>' +
      showIPNEWbox +
      '<input id="showRC"    type="checkbox" ' + lrcShowRCChecked + ' />' +
      '<label for="showRC">'   + lang_menu[0].RCLABEL  + ' </label>' +
      '<input id="showLog"    type="checkbox" ' + lrcShowLogChecked + '/>' +
      '<label for="showLog">'   + lang_menu[0].LOGSHOW  + ' </label>' +
      '<input id="showFilter"    type="checkbox" ' + lrcShowFilterChecked + '/>' +
      '<label for="showFilter">'   + lang_menu[0].ABSHOW  + ' • </label>' +
      '<span id="selectNS" />';

//      '<input id="shidRC"    type="checkbox" checked onclick="showHideObj(this, \'divTabRC\');" />' +
//      '<label for="shidRC">'   + lang_menu[0].RCLABEL + '</label>' +

    if (lrcPreviewHeight) document.getElementById('livePreview').style.height = lrcPreviewHeight;

    var _len = lstContact.length;
    lstContact2 = new Array();
    for (var _i=0; _i<_len; _i++)
      lstContact2[lstContact[_i]] = { ts: 0 };

    // Main
    liveRCInit();
  }
});

/* </source> */