/* Ajax batch delete thingy, version [0.1.1b]
Originally from: http://en.wikipedia.org/wiki/User:Splarka/ajaxbatchdelete.js
 
Notes:
* It is a bit verbose, after debugging perhaps some output should be removed.
* It waits 1 second after every delete before starting the next.
* Can be aborted by simply deleting the contents of the textarea, or leaving the page.
* Stops when it hits a blank line.
* Nonfatal errors (skip to next line):
** Bad character or malformed line
** Bad token
** Unexpected response
* Pauses in execution can be added with a blank line.
 
To do:
* Cache the token if two the same?
** Please note the delete token is not guaranteed to be static, but currently it always is.
*/
 
addOnloadHook(function() {
  addPortletLink('p-tb','/wiki/Special:BlankPage?blankspecial=ajaxbd','Batch Delete');
});
 
if(wgCanonicalSpecialPageName && wgCanonicalSpecialPageName.toLowerCase() == 'blankpage' && queryString('blankspecial') == 'ajaxbd') {
  document.title = 'Ajax Batch Deletion';
  addOnloadHook(abdForm);
}
 
function abdForm() {
  addPortletLink('p-tb','/wiki/Special:Log/delete?user=' + encodeURIComponent(wgUserName),'My delete log');
 
  //subvert this Special: page to our own needs.
  var con = document.getElementById('content') || document.getElementById('mw_content');
  var bcon = document.getElementById('bodyContent') || document.getElementById('mw_contentholder');
  var fh = getElementsByClassName(con,'h1','firstHeading')[0];
  while(fh.firstChild) fh.removeChild(fh.firstChild)
  fh.appendChild(document.createTextNode('Ajax Batch Deletion'));
  for(var i=0;i<bcon.childNodes.length;i++) {
    bcur = bcon.childNodes[i];
    if(bcur.id != 'siteSub' && bcur.id != 'contentSub' && bcur.className != 'visualClear') {
      while(bcur.firstChild) bcur.removeChild(bcur.firstChild)
      if(bcur.nodeType == 3) bcur.nodeValue = '';
    }
  }
 
  //generate content
  var form = document.createElement('form');
   form.appendChild(document.createTextNode('List of pages to delete:'));
   form.appendChild(document.createElement('p'));
   form.setAttribute('action','javascript:void(0);');
   var txt = document.createElement('textarea');
    txt.style.height = '20em';
    txt.style.width = '50%';
    txt.setAttribute('id','abd-textarea');
   form.appendChild(txt);
   form.appendChild(document.createElement('p'));
   var lab1 = document.createElement('label');
    lab1.setAttribute('for','abd-reason')
    lab1.appendChild(document.createTextNode('Deletion reason: '));
   form.appendChild(lab1);
   var inp1 = document.createElement('input');
    inp1.style.width = '20em';
    inp1.setAttribute('type','text');
    inp1.setAttribute('id','abd-reason');
   form.appendChild(inp1);
   form.appendChild(document.createElement('p'));
   var sub1 = document.createElement('input');
    sub1.setAttribute('type','button');
    sub1.setAttribute('id','abd-startbutton');
    sub1.setAttribute('value','start');
    sub1.setAttribute('onclick','abdStart()');
   form.appendChild(sub1);
  bcon.appendChild(form);
  var pre = document.createElement('pre');
   pre.setAttribute('id','abd-output');
  bcon.appendChild(pre);
}
 
function abdStart() {
  document.getElementById('abd-startbutton').setAttribute('disabled','disabled');
  var out = document.getElementById('abd-output');
  var txt = document.getElementById('abd-textarea');
  var deletes = txt.value.split('\n');
  var page = deletes[0];
  if(page == '') {
    out.appendChild(document.createTextNode('* Done! Nothing left to do, or next line is blank.\n'));
    document.getElementById('abd-startbutton').removeAttribute('disabled');
  } else {
    var badchars = /(\#|\<|\>|\[|\]|\{|\}|\|)/;
    if(badchars.test(page)) {
      out.appendChild(document.createTextNode('! Illegal characters detected, skipping:' + page + '\n'));
      setTimeout('abdStart()',1000);
    } else {
      out.appendChild(document.createTextNode('> Attempting to delete [[' + page + ']]\n'));
      abdGetToken(page);
    }
  }
  deletes = deletes.slice(1,deletes.length);
  txt.value = deletes.join('\n');
}
 
function abdGetToken(page) {
  var out = document.getElementById('abd-output');
  out.appendChild(document.createTextNode(' > Fetching delete token for [[' + page + ']]\n'));
  var url = wgScriptPath + '/api.php?action=query&prop=info&indexpageids=1&intoken=delete&format=json&titles=' + encodeURIComponent(page);
  var req = sajax_init_object();
  req.open('GET', url, true);
  req.onreadystatechange = function() {
    if(req.readyState == 4 && req.status == 200) {
      eval("abdDelete(" + req.responseText + ",'" + req.responseText.replace(/\'/g,"`") + "','" + page + "')");
    }
  }
  req.send(null);
}
 
function abdDelete(obj,txt,page) {
  var out = document.getElementById('abd-output');
  if(obj['error']) {
    out.appendChild(document.createTextNode(' ! Api error: ' + obj['error']['code'] + ' - ' + obj['error']['info'] + '\n'));
    return;
  }
  if(!obj['query'] || !obj['query']['pageids'] || !obj['query']['pages'][obj['query']['pageids'][0]] || !obj['query']['pages'][obj['query']['pageids'][0]]['deletetoken']) {
    out.appendChild(document.createTextNode('  ? Unexpected response: ' + txt + '\n'));
    return;
  }
  var token = obj['query']['pages'][obj['query']['pageids'][0]]['deletetoken'];
  out.appendChild(document.createTextNode('  > Token found, attempting delete\n'));
  var reason = document.getElementById('abd-reason').value;
 
  var params = 'action=delete&format=json&token=' + encodeURIComponent(token) + '&title=' + encodeURIComponent(page) + '&reason=' + encodeURIComponent(reason);
  var url = wgScriptPath + '/api.php';
 
  var req = sajax_init_object();
  req.open('POST', url, true);
  req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  req.setRequestHeader('Content-length', params.length);
  req.setRequestHeader('Connection', 'close');
  req.onreadystatechange = function() {
    if(req.readyState == 4 && req.status == 200) {
      eval("abdDeleteAftermath(" + req.responseText + ",'" + req.responseText.replace(/\'/g,"`") + "')");
    }
  }
  req.send(params);
}
 
function abdDeleteAftermath(obj,txt) {
  var out = document.getElementById('abd-output');
  if(obj['error']) {
    out.appendChild(document.createTextNode('   ! Api error: ' + obj['error']['code'] + ' - ' + obj['error']['info'] + '\n'));
  } else if(obj['delete'] && obj['delete']['title']) {
    out.appendChild(document.createTextNode('   > Page [[' + obj['delete']['title'] + ']] deleted\n'));
  } else {
    out.appendChild(document.createTextNode('   ? Unexpected response: ' + txt + '\n'));
    return;
  }
  setTimeout('abdStart()',1000);
}
 
function queryString(p) {
  var re = RegExp('[&?]' + p + '=([^&]*)');
  var matches;
  if (matches = re.exec(document.location)) {
    try { 
      return decodeURI(matches[1]);
    } catch (e) {
    }
  }
  return null;
}