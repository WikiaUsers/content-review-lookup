/*

This is the script to add CGI:IRC login box to random pages (like [[Wikimania:IRC]]). Please report problems to [[user talk:Cometstyles]]. If recently modified, do a hard refresh of [http://mortalkombat.wikia.com/index.php?title=Mediawiki:Irc.js&action=raw&ctype=text/javascript&dontcountme=s this page] to make mods go live.


:Just add <code><nowiki><div id="cgiircbox"/> </nowiki></code> to a random page.


Note: This is based on the login page from CGI:IRC 0.5, which is made by David Leadbeater and is under the GPL. See http://cgiirc.sf.net .
<source lang="javascript">
*/
function add_irc() {
irc_div = document.getElementById("cgiircbox");
if (irc_div) {
//alt server
//http://chatwikizine.memebot.com/cgi-bin/cgiirc/irc.cgi
//http://irc.net/cgi-bin/irc/irc.cgi (allows all servers)
//http://68.213.57.225/irc.cgi
//http://wnirc.awardspace.com/advanced.html
 var irc_form = new_element("form", {id: 'cgiirclogin', name: 'cgiirclogin', method: 'post', action: 'http://chatwikizine.memebot.com/cgi-bin/cgiirc/irc.cgi', onsubmit: 'setjs();return nickvalid()'}, irc_div);
 new_input('interface', 'nonjs', 'hidden', irc_form);
 new_input('Server', 'irc.freenode.net', 'hidden', irc_form);
 table = new_element("table", {border: 0, cellpadding: 5, cellspacing: 0, id: "cgiircboxtable"}, irc_form);
 //to seperate out table rows

 (function() {
  var tr = new_element("tr", {}, table);
  var td1 = new_element("td", {colspan: 2, align: "center", bgcolor: "#c0c0dd", style: "font-weight: bold;"}, tr);
  var ircTitle = document.createTextNode("CGI:IRC Login");
  td1.appendChild(ircTitle);
 })();
 (function() {
  var tr = new_element("tr", {}, table);
  var td1 = new_element("td", {align: "right", bgcolor: "#f1f1f1", id: "nickname-label-a"}, tr);
  var td2 = new_element("td", {align: "left", bgcolor: "#f1f1f1", id: "nickname-a"}, tr);

 })();


 (function() {
  var tr = new_element("tr", {}, table);
  var td1 = new_element("td", {align: "right", bgcolor: "#f1f1f1", id: "channel-label-a"}, tr);
  var td2 = new_element("td", {align: "left", bgcolor: "#f1f1f1", id: "channel-a"}, tr);

 })();
 (function() {
  var tr = new_element("tr", {}, table);
  var td1 = new_element("td", {align: "left", bgcolor: "#d9d9d9", id: "ircAdvanced-td"}, tr);
  var AdvancedLink = new_element("a", {href: "javascript:show_ircAdvanced()", style: "font-size:small;", id: "ircAdvanced"}, td1);
  var ircAdvanced = document.createTextNode("Advanced...");
  AdvancedLink.appendChild(ircAdvanced);
  var td2 = new_element("td", {align: "right", bgcolor: "#d9d9d9", id: "go-a"}, tr);

 })();

 new_label('Nickname-label', 'nickname', 'Your Nickname: ', document.getElementById("nickname-label-a"));

 if (wgUserGroups && (wgUserGroups.indexOf("user") > 0)) {
  var irc_username = wgUserName;
  }
 else {
  var irc_username = "Wikimaniac" + (Math.floor(Math.random()*100));
 }
 new_input('Nickname', irc_username, 'text', document.getElementById("nickname-a"));
 new_label('Channel-label', 'channel', 'IRC channel (which chat room): ', document.getElementById("channel-label-a"));
 var channel = new_element('select', {name: "Channel", id: "Channel", onchange: "irc_channelChange(this.selectedIndex);"}, document.getElementById("channel-a"));
//start chat chan
 var ircDiscussion = new_element('optgroup', {label: "Discussion", id: "ircDiscussion"}, channel);

 var ircwikinews = new_element("option", {name: "#Mortalkombat", value: "#Mortalkombat", selected: "selected"}, ircDiscussion);
 ircwikinews.appendChild(document.createTextNode("General discussion"));
 
 ircwikinewsen = new_element("option", {name: "#cometstyles", value: "#cometstyles"}, ircDiscussion);
 ircwikinewsen.appendChild(document.createTextNode("The REAL cabal"));

 new_input('go', ' Chat! ', 'submit', document.getElementById("go-a"));

//do the setcharset stuff 
 setcharset()
 }


}
//functions called by above
function show_ircAdvanced() {
//do nothing!
//eventually I will make this expand the form
alert("Advanced options not currently available");
}

function irc_channelChange(chan) {
//fix server
var form = document.getElementById("cgiirclogin");

var serv = document.getElementById("Server");
//break not on all for a reason
switch (chan) {
 case 0:
 case 1:
  //switch to freenode
  serv.setAttribute("value", "irc.freenode.net");
  form.setAttribute("action", "http://chatwikizine.memebot.com/cgi-bin/cgiirc/irc.cgi");
  break;
 case 2:
  //RC
  serv.setAttribute("value", "irc.wikimedia.org");
  form.setAttribute("action", "http://irc.net/cgi-bin/irc/irc.cgi");
  break;
 }
}


function new_input(id, value, type, attach) {
 var new_opt = document.createElement("input");
 new_opt.setAttribute('id', id);
 new_opt.setAttribute('name', id);
 new_opt.setAttribute('value', value);
 new_opt.setAttribute('type', type);
 //starting adding to tree 
 attach.appendChild(new_opt);
 return(document.getElementById(id));
}
function new_label(id, input, value, attach) {
 var new_opt = document.createElement("label");
 new_opt.setAttribute('id', id);
 new_opt.setAttribute('name', id);
 new_opt.setAttribute('for', input);
 var label = document.createTextNode(value);
 new_opt.appendChild(label);
 //starting adding to tree 
 if (attach && attach.appendChild) {
  attach.appendChild(new_opt);
 } else {
  alert("JS Error (CGI::IRC): Can not find element to append new element to. (opt)");
 }
 return(document.getElementById(id));
}

function new_element (name, attributes) {
//Create element, and attributes, and optionally add to tree
// call as new_element(element name to create(string), attributes of element (object), optionally element to append as a child to) 
 if (name) {
  var elm = document.createElement(name);
 } else {
  return null;
 }
//set attributes
 if (typeof(attributes) == "object") {
  for (var i in attributes) {
   elm.setAttribute(i, attributes[i]);
  } 
 } else {
  return null;
 }

//attach to tree (but only if third argument given)
 if (arguments[2]) {
  var appendState = arguments[2].appendChild(elm)
  if (!appendState) {
   alert("JS Error (CGI::IRC): Can not find element to append new element to. (element)");
  }
 }
 return elm;
}

function setjs() {
//This function might be under the GPL as it is from cgi:irc 0.5 by David Leadbeater. see http://cgiirc.sf.net
 if(navigator.product == 'Gecko') {
   document.cgiirclogin["interface"].value = 'mozilla';
 }else if(window.opera && document.childNodes) {
   document.cgiirclogin["interface"].value = 'opera7';
 }else if(navigator.appName == 'Microsoft Internet Explorer' &&
    navigator.userAgent.indexOf("Mac_PowerPC") > 0) {
    document.cgiirclogin["interface"].value = 'konqueror';
 }else if(navigator.appName == 'Microsoft Internet Explorer' &&
 document.getElementById && document.getElementById('ietest').innerHTML) {
   document.cgiirclogin["interface"].value = 'ie';
 }else if(navigator.appName == 'Konqueror') {
    document.cgiirclogin["interface"].value = 'konqueror';
 }else if(window.opera) {
   document.cgiirclogin["interface"].value = 'opera';
 }
}
function nickvalid() {
//This function might be under the GPL as it is from cgi:irc 0.5 by David Leadbeater. see http://cgiirc.sf.net
   var nick = document.cgiirclogin.Nickname.value;
   if(nick.match(/^[A-Za-z0-9\[\]\{\}^\\\|\_\-`]{1,32}$/))
      return true;
   alert('Please enter a valid nickname');
   document.cgiirclogin.Nickname.value = nick.replace(/[^A-Za-z0-9\[\]\{\}^\\\|\_\-`]/g, '');
   return false;
}
function setcharset() {
//This function might be under the GPL as it is from cgi:irc 0.5 by David Leadbeater. see http://cgiirc.sf.net
	if(document.charset && document.cgiirclogin["Character set"])
		document.cgiirclogin['Character set'].value = document.charset
}
//because this is already from a load event
add_irc();
//</source>