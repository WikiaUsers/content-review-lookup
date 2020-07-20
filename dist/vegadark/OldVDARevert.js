/*

This is the latest version of VDA.

Actually, let me rephrase that: This WAS the latest version of VDA until VDA 1.0 was released.

Basically, if you want a really ancient copy to see how far we've come, go ahead and use importScriptPage("MediaWiki:OldVDARevert.js", "vda"); to load it. It's fairly stable, except it will only revert one diff at a time. Have fun using it, but it's not recommended for serious vandal-fighting at the moment. :)

*/

//<pre><nowiki>
 
// Reverting tools V5.5 BETA (Original coding by User:VegaDark, modified by User:VegaDark)
function getElementsByClass(searchClass,node,tag) {
  // Function from http://www.dustindiaz.com/getelementsbyclass/
  var classElements = new Array();
  if ( node == null )
    node = document;
  if ( tag == null )
    tag = '*';
  var els = node.getElementsByTagName(tag);
  var elsLen = els.length;
  var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
  for (i = 0, j = 0; i < elsLen; i++) {
    if ( pattern.test(els[i].className) ) {
      classElements[j] = els[i];
      j++;
    }
  }
  return classElements;
}
 
// _GET code from NoGray JS Library http://www.nogray.com/new_site/
var _GET = new Array();
var _uri = location.href;
 
var _temp_get_arr = _uri.substring(_uri.indexOf('?')+1, _uri.length).split("&");
 
var _temp_get_arr_1 = new Array();
 
for(_get_arr_i=0; _get_arr_i<_temp_get_arr.length; _get_arr_i++){
  _temp_get_arr_1 = _temp_get_arr[_get_arr_i].split("=");
  _GET[decodeURI(_temp_get_arr_1[0])] = decodeURI(_temp_get_arr_1[1]);
}
 
delete _uri; delete _temp_get_arr; delete _temp_get_arr_1;
 
function getMessage (where, user1, user2) {
  var message = prompt ('Enter custom undo message below:', '');
  window.location = 'http://'+ location.hostname + '/index.php?title=' + _GET['title'] + '&action=edit&oldid=' + _GET['oldid'] + '&'+where+'=2&user1='+user1+'&user2='+user2+'&message='+message;
}
 
function AGFMessage (where, user1, user2) {
  var message = prompt ('Enter custom undo message below:', '');
  window.location = 'http://'+ location.hostname + '/index.php?title=' + _GET['title'] + '&action=edit&oldid=' + _GET['oldid'] + '&'+where+'=3&user1='+user1+'&user2='+user2+'&message='+message;
}
 
addOnloadHook(function (){
  if (location.href.match(/diff=/)) {
    // Get username of submitter
    var user1 = getElementsByClass('diff-otitle',null,'td'); user1 = user1[0].getElementsByTagName('a')[2].innerHTML;
    var user2 = getElementsByClass('diff-ntitle',null,'td'); user2 = user2[0].getElementsByTagName('a')[3].innerHTML;
    document.getElementById('contentSub').innerHTML += '<br /><b><span style="font-size:12pt;">[<a href="http://'+ location.hostname + '/index.php?title=' + _GET['title'] + '&action=edit&oldid=' + _GET['oldid'] +
 '&revert=1&user1='+user1+'&user2='+user2+'"><span style="color:#E42217">Rollback (Vandalism)</span></a>]</span></b> <b><span style="font-size:12pt;">[<a href="javascript:var message = getMessage(\'revert\', \''+user1+'\', \''+user2+'\');">Rollback</a>]</span></b> <b><span style="font-size:12pt;">[<a href="javascript:var message = AGFMessage(\'revert\', \''+user1+'\', \''+user2+'\');"><span style="color:#4AA02C">Rollback (AGF)</span></a>]</span></b>' + 
 
 
'';
  } else if (location.href.match(/revert=1/)) {
    document.getElementById('wpSummary').value = 'Reverted edits identified as vandalism by [[User:'+_GET['user2']+'|'+_GET['user2']+']] to the last version by [[User:'+_GET['user1']+'|'+_GET['user1']+']]';
    document.getElementById('editform').submit();
  } else if (location.href.match(/revert=2/)) {
    document.getElementById('wpSummary').value = 'Reverted edits by [[User:' + _GET['user2'] + '|]] to the last version by ' + _GET['user1'] + '(' +_GET['message']+ ')';
    document.getElementById('editform').submit();
  } else if (location.href.match(/revert=3/)) {
    document.getElementById('wpSummary').value = 'Reverted good faith edits by [[User:' + _GET['user2'] + '|]] to the last version by ' + _GET['user1'] + '(' +_GET['message']+ ')';
    document.getElementById('editform').submit();
  }
 
});
 
//</nowiki></pre>