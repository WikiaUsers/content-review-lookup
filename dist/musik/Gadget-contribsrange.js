//  _________________________________________________________________________________________
// |                                                                                         |
// |                    === WARNING: GLOBAL GADGET FILE ===                                  |
// |                  Changes to this page affect many users.                                |
// | Please discuss changes on the talk page or on [[Wikipedia_talk:Gadget]] before editing. |
// |_________________________________________________________________________________________|
//
// Imported from version 312947638 as of September 10, 2009 from [[User:Splarka/contribsrange.js]]
// See notes below

/* Special:Contributions Wildcard/CIDR lookup, version [0.2.7]
Originally from: http://en.wikipedia.org/wiki/User:Splarka/contribsrange.js

Notes:
* Uses the API which is faster than most CIDR contrib tools.
** Needs 1.14 r42198+ for advanced continue.
* Currently uses a GET json via <script src=""> to avoid ajax problems.
* Only currently works if submitted (or called by URL parameter, eg Special:Contributions/User).
** Checks namespace and date options in form.
** Also utilizes &ucstart and &ucend date parameters if supplied manually (not supported in the UI atm).
*** These parameter soverride the form date options.
* Uses: Submit any IP CIDR range /16 or from /24 to /32. Submit any string (at least 3 characters) with a suffixed asterisk.
** eg: [123.123.123.0/24 ] or [123.123.123.* ] or [Willy* ].
* Now keeps searching until it finds crMax (or forever with crshowall=true URI parameter).
** Puts them in a nice collapsed div stack, like enhanced recent changes.
* /25 and /26 ranges now disabled, since they are inaccurate (50 parameter limit), please use /24 (ucuserprefix) or /27 (32 parameters)

To do:
* use ajax (let sysops/bots = 5000)?
*/

if(wgCanonicalSpecialPageName == 'Contributions' && wgEnableAPI) { 
  addOnloadHook(prefixContribsInit);
  var crContURI = ''; //query URI for continuing later
  var crLimit = 500; //limit for each query
  var crMax = 10000; //bypass with &crshowall=true URI parameter
  var crImgHid = stylepath + '/common/images/Arr_r.png';
  var crImgSho = stylepath + '/common/images/Arr_d.png';
  appendCSS('.cr-list {padding-left:5px;}\n.cr-toggle-hidden {padding-left:16px;background: transparent no-repeat center left url("' + crImgHid + '")}' 
  + '\n.cr-toggle-shown {padding-left:16px;background: transparent no-repeat center left url("' + crImgSho + '")}\n.mw-mightexist {font-style:italic;}'
  + '\n#results-from-CIDR {border:1px solid black;padding:.5em}\n#prefixcontribs-tog {float:right;border:1px solid black;text-decoration:none;color:black;padding:0 5px;}');
}

function prefixContribsInit() {
  var show = document.getElementById('contentSub') || document.getElementById('topbar');
  if(show) show.appendChild(document.createTextNode(' \u2022 Du kannst einen CIDR-Netzbereich (wie 123.45.67.1/30) angeben oder Sternchen (wie 123.45.67.*) verwenden, um einen Präfix anzugeben.'));
  var ucfrm = document.getElementsByTagName('form')[0];
  if(!ucfrm.target) return;

  //general optionlets independent of type of search.
  var opt_ns = (parseInt(ucfrm.namespace[ucfrm.namespace.selectedIndex].value) > -1) ? '&ucnamespace=' + ucfrm.namespace[ucfrm.namespace.selectedIndex].value : '';
  var opt_ts = '';
  var m = '' + ucfrm.month.selectedIndex; 
  var y = ucfrm.year.value;
  if(m.length == 1) m = '0' + m
  if(y > 2000 && y < 2100) opt_ts = '&ucstart=' + y + '-' + m + '-01T00:00:00Z'
  var opts_se = '';
  if(queryString('ucstart')) opts_se += '&ucstart=' + encodeURIComponent(queryString('ucstart'))
  if(queryString('ucend')) opts_se += '&ucend=' + encodeURIComponent(queryString('ucend'))
  if(opts_se == '') {
    var options = opt_ns + opt_ts;
  } else {
    var options = opt_ns + opts_se + '&ucdir=newer';
  }

  var patternCIDR = /(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\/(2[7-9]|3[0-2]|24|16)/i ;
  var patternWild = /^.{3,}\*$/i ;
  var url = wgServer + wgScriptPath + '/api.php?action=query&format=json&callback=prefixContribs&list=usercontribs' + options + '&uclimit=' + parseInt(crLimit);
  if(ucfrm.target.value.search(patternCIDR) == 0) {
    prefixContribsStartbox(ucfrm.parentNode);
    var cidr = ucfrm.target.value.match(patternCIDR)[0];
    var range = cidr.match(/[^\/]\d{1,2}$/i)[0];
    if(range == 24 || range == 16) {
      //prefixable CIDR, lets do-er
      if(range == 24) {
        cidr = cidr.match(/\d{1,3}\.\d{1,3}\.\d{1,3}\./)[0];
      } else {
        cidr = cidr.match(/\d{1,3}\.\d{1,3}\./)[0];
      }
      url += '&ucuserprefix=' + cidr;
    } else {
      //complex CIDR, lets figure it out
      var oct3 = cidr.match(/\.\d{1,3}\//i)[0].replace(/(\.|\/)/g,'');
      cidr = cidr.match(/\d{1,3}\.\d{1,3}\.\d{1,3}\./)[0];
      var num = Math.pow(2,32 - range);
      var start = oct3 - oct3 % num;
      url += '&ucuser=';
      for(var i=start;i<=start + num;i++) {
        url += '' + cidr + i;
        if(i != start + num) url += '|'
      }
    }
  } else if(ucfrm.target.value.search(patternWild) == 0) {
    //very simple wildcard, lets do-er
    prefixContribsStartbox(ucfrm.parentNode);
    var prefix = ucfrm.target.value.replace(/\*$/,'');
    prefix = prefix.substr(0,1).toUpperCase() + prefix.substr(1);
    url += '&ucuserprefix=' + prefix;
  }
  importScriptURI(url);
  crContURI = url;
}

function prefixContribsStartbox(parent) {
  var res = document.createElement('div');
  res.setAttribute('id','results-from-CIDR');
  addlinkchild(res,'javascript:prefixContribsToggleAll();','alle auf/zu','prefixcontribs-tog');
  var spin = document.createElement('span');
   spin.setAttribute('id','prefixcontribs-prog')
   spin.appendChild(document.createTextNode('Suche…'));
  res.appendChild(spin);
  injectSpinner(spin,'prefixcontribs-spin');
  parent.appendChild(res);
}

function prefixContribs(obj) {
  if(!obj['query'] || !obj['query']['usercontribs']) return
  cidr = obj['query']['usercontribs'];
  var res = document.getElementById('results-from-CIDR');
  if(cidr.length == 0) {
    res.appendChild(document.createTextNode(' Für diesen Netzbereich wurden keine Änderungen gefunden.'));
    removeSpinner('prefixcontribs-spin');
    return;
  }
  for(var i=0;i<cidr.length;i++) {
    var id = 'cr-' + escapeID(cidr[i].user);
    var etitle = encodeURIComponent(cidr[i].title.replace(/ /g,'_')).replace('%2F','/').replace('%3A',':');
    var euser = encodeURIComponent(cidr[i].user.replace(/ /g,'_')).replace('%2F','/').replace('%3A',':');
    // group each result set based on the user name, create new div for new names
    if(!document.getElementById(id)) {
      var hdiv = document.createElement('div');
      hdiv.setAttribute('id','d-' + id)
      addlinkchild(hdiv,'javascript:prefixContribsToggleDiv("' + id +'")',cidr[i].user,'m-' + id,'cr-toggle-hidden');
      res.appendChild(hdiv);
      res.appendChild(document.createTextNode('\n'));
      var rul = document.createElement('ul');
       rul.setAttribute('id',id);
       rul.setAttribute('class','cr-list');
       rul.style.display = 'none';
      res.appendChild(rul);
      res.appendChild(document.createTextNode('\n'));
    }
    var ul = document.getElementById(id);
    ul.appendChild(document.createTextNode('\n'));
    var li = document.createElement('li');
     li.appendChild(document.createTextNode(cidr[i].timestamp.replace(/T[\d:]*Z/,' ')));
     addlinkchild(li, wgScript + '?title=Special:Contributions/' + euser, cidr[i].user);
     li.appendChild(document.createTextNode(' ('));
     addlinkchild(li, wgScript + '?title=User_talk:' + euser, 'Diskussion','','mw-mightexist');
     li.appendChild(document.createTextNode(') bearbeitete ('));
     addlinkchild(li, wgScript + '?title=' + etitle + '&curid=' + cidr[i].pageid + '&diff=prev&oldid=' + cidr[i].revid , 'diff');
     li.appendChild(document.createTextNode(') '));
     addlinkchild(li, wgScript + '?title=' + etitle + '&curid=' + cidr[i].pageid, cidr[i].title);
     if(cidr[i].comment) li.appendChild(document.createTextNode(' (' + cidr[i].comment + ')'))
    ul.appendChild(li);
  }

  //continue?
  crMax = crMax - cidr.length;
  var prog = document.getElementById('prefixcontribs-prog');
  if(!obj['query-continue'] || !obj['query-continue']['usercontribs'] || !obj['query-continue']['usercontribs']['uccontinue']) {
    removeSpinner('prefixcontribs-spin');  
    prog.parentNode.removeChild(prog);
    prefixContribsNumerate();
    return;
  }
  var url = crContURI + '&uccontinue='+ obj['query-continue']['usercontribs']['uccontinue'];
  if(crMax <= 0 && queryString('crshowall') != 'true') {
    prog.appendChild(document.createTextNode(' Es wurden viele Ergebnisse gefunden. Um sie alle zu sehen klicke '));
    var ga = document.createElement('a');
     var gaurl = document.location.href;
     if(gaurl.indexOf('#') != -1) gaurl = gaurl.substr(0,gaurl.indexOf('#'))
     if(gaurl.indexOf('?') == -1) gaurl += '?'
     gaurl += '&crshowall=true';
     ga.setAttribute('href',gaurl);
     ga.appendChild(document.createTextNode('hier'));
    prog.appendChild(ga);
    prog.appendChild(document.createTextNode('. Achtung: Könnte den Browser lahmlegen!'));
    removeSpinner('prefixcontribs-spin');
    prefixContribsNumerate();
  } else {
    prog.appendChild(document.createTextNode('.'));
    importScriptURI(url);
  }
}

function prefixContribsNumerate() {
  var lsts = getElementsByClassName(document,'ul','cr-list');
  for(var i=0;i<lsts.length;i++) {
    var dv = document.getElementById('d-' + lsts[i].getAttribute('id'));
    dv.appendChild(document.createTextNode(' ' + lsts[i].getElementsByTagName('li').length + ' gefunden'));
  }
  if(lsts.length == 1) prefixContribsToggleDiv(lsts[0].id)
}

function prefixContribsToggleAll() {
  var lsts = getElementsByClassName(document,'ul','cr-list');
  if(lsts.length == 0) return
  var togglefrom = lsts[0].style.display;
  for(var i=0;i<lsts.length;i++) {
    if(lsts[i].style.display == togglefrom) prefixContribsToggleDiv(lsts[i].id)
  }
}

function prefixContribsToggleDiv(id) {
  var i = document.getElementById(id);
  var m = document.getElementById('m-' + id);
  if(!i || !m) return
  if(i.style.display == 'none') {
    i.style.display = 'block';
    m.className = 'cr-toggle-shown'
  } else {
    i.style.display = 'none';
    m.className = 'cr-toggle-hidden'
  }
}

function addlinkchild(obj,href,text,id,classes) {
  if(!obj || !href || !text) return false;
  var a = document.createElement('a');
  a.setAttribute('href',href);
  a.appendChild(document.createTextNode(text));
  if(id) a.setAttribute('id',id);
  if(classes) a.setAttribute('class',classes);
  obj.appendChild(a);
  return a;
}

function escapeID(txt) {
  var id = txt;
  id = id.replace(/ /g,'_');
  id = encodeURIComponent(id);
  id = id.replace(/\%3A/g,':');
  id = id.replace(/\%/g,'.');
  return id;
}

function queryString(p) {
  var re = RegExp('[&?#]' + p + '=([^&#]*)');
  var matches;
  if (matches = re.exec(document.location)) {
    try { 
      return decodeURI(matches[1]);
    } catch (e) {
    }
  }
  return null;
}