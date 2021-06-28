/* Sysop decrier/detector (rights group displayer), version [0.2.0a]
Originally from http://en.wikipedia.org/wiki/User:Splarka/sysopdectector.js

Notes:
* Fixed this up to use the new API fun stuffs.
* Shows all groups now
* nstab-user isn't available in all skins, all skins have at least one h1 or h2 I believe.
* heading given class="detected-userrights-heading" and text in span class="detected-userrights"

Options:
* Now supports an option system. 
* By setting a datalet true it shows in the header instead of the title.
* Note, all are assumed false if omitted. All but 'groups' are assumed false if undefined.
var showUserGroupSettings = {
  'IP':true,
  'unregistered':true,
  'registered':true,
  'groups': true,
  'groupless': true,
  'editcount':true,
  'regdate':true,
  'blocked':true
};
*/

if((wgNamespaceNumber == 2 || wgNamespaceNumber == 3) && wgTitle.indexOf('/') == -1 && (wgAction != 'edit' || wgAction != 'submit')) addOnloadHook(showUserGroups)
function showUserGroups() {
  var url = wgServer + wgScriptPath + '/api.php?action=query&format=json&callback=showUserGroupsCB&maxage=3600&smaxage=3600&usprop=blockinfo|groups|editcount|registration&list=users&ususers=' + encodeURIComponent(wgTitle);
  importScriptURI(url);
}

function showUserGroupsCB(obj) {
  var show = window.showUserGroupSettings || false;
  if(!obj['query'] || !obj['query']['users']) return
  var user = obj['query']['users'];
  if(user.length == 0) return
  user = user[0];
  var someHeading = document.getElementsByTagName('h1')[0] || document.getElementsByTagName('h2')[0]
  if(!someHeading) return

  var span = document.createElement('span');
  var title = 'User:' + user['name'] + ' ';
  var text = ' ';

  if(user['invalid'] == '') {
    if(show && show.IP) text += '[IP] '
    else title += '[invalid or IP username] '
  } else if(user['missing'] == '') {
    if(show && show.unregistered) text += '[doesn\'t exist] '
    else title += '[not a registered name] '
  } else {
    if(show && show.registered) text += '[exists] '
    else title += '[username registered] '
    if(user['groups']) {
      if(show && show.groups || !show) text += '[user,' + user['groups'] + '] '
      else title += '[user,' + user['groups'] + '] '
    } else {
      if(show && show.groupless) text += '[user] '
      else title += '[user] '
    }
    if(user['editcount']) {
      if(show && show.editcount) text += '[' + user['editcount'] + ' edits] '
      else title += '[' + user['editcount'] + ' edits] '
    }
    if(user['registration']) {
      if(show && show.regdate) text += '[created: ' + user['registration'].split('T')[0] + '] '
      else title += '[created: ' + user['registration'] + '] '
    }
    if(user['blockedby']) { 
      if(show && show.blocked) text += '[blocked] '
      else text += '[currently blocked] '
    }
  }

  span.setAttribute('class','detected-userrights');
  span.appendChild(document.createTextNode(text));
  someHeading.appendChild(span);
  someHeading.setAttribute('title',title);
  someHeading.className += ' detected-userrights-heading';
}