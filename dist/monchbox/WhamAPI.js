/* 
 * WhamAPI.js, inspired by Joeyaa's Wham.js (http://vstf.wikia.com/wiki/User:Joeyaa/wham.js)
 * 
 * Basically this is an API version of Wham that allows you to not only wham people from any number of random pages,
 * but also with more control over which things you wham. Because some people have some legit contribs
 */

importScriptURI('http://monchbox.wikia.com/index.php?title=MediaWiki:APIQuery.js&action=raw&ctype=text/javascript');

function WhamUI() {
	if(!document.getElementById('wham')) {
		if(wgPageName == 'Special:RecentChanges'){
		var html = '<div id="wham" onmouseover="this.getElementsByTagName(\'div\')[0].style.display = \'block\'" onmouseout="this.getElementsByTagName(\'div\')[0].style.display = \'none\'" style="width:170px; font-size:12px; line-height:12px; color:red; margin:0 2px 2px 2px;">Wham<div style="position:absolute; width:170px; padding:5px; background-color:#fff; color:#333; border:1px solid #aaa; display:none;"><div><label for="wham-user">User</label><input id="wham-user" type="text" style="display:block; width:165px;"></div><div><label for="wham-user" title="Only delete/rollback edits since this time">Since</label><input id="wham-since" type="text" style="display:block; width:165px;"></div><div><label for="wham-summary">Summary</label><input id="wham-summary" type="text" style="display:block; width:165px;"></div><div><label for="wham-expiry" title="Only used in blocks">Expiry</label><input id="wham-expiry" type="text" style="display:block; width:165px;"></div><div style="font-size:13px;"><a id="wham-delete" href="javascript:Whamdelete(document.getElementById(\'wham-user\').value, document.getElementById(\'wham-since\').value, document.getElementById(\'wham-summary\').value)">Delete</a> | <a id="wham-delete" href="javascript:Whamrollback(document.getElementById(\'wham-user\').value, document.getElementById(\'wham-since\').value, document.getElementById(\'wham-summary\').value)">Rollback</a> | <a id="wham-delete" href="javascript:Whamblock(document.getElementById(\'wham-user\').value, document.getElementById(\'wham-summary\').value, document.getElementById(\'wham-expiry\').value)">Block</a> | <a id="wham-all" href="javascript:Wham(document.getElementById(\'wham-user\').value, document.getElementById(\'wham-since\').value, document.getElementById(\'wham-summary\').value, document.getElementById(\'wham-expiry\').value)">All</a></div></div></div>';
			if(document.body.className.indexOf('skin-oasis') != -1) {
				if(document.getElementById('WikiHeader').getElementsByTagName('div')[0].className.indexOf('AdminDashboardGeneralHeader') != -1) {$('.AdminDashboardGeneralHeader').after(html);}
				else {$('#WikiaPageHeader').append(html);}
			}
			else {
				$('#firstHeading').append(html);
			}
		}
		if(wgPageName == 'Special:Contributions') {
			var html = '<div id="wham" onmouseover="this.getElementsByTagName(\'div\')[0].style.display = \'block\'" onmouseout="this.getElementsByTagName(\'div\')[0].style.display = \'none\'" style="width:170px; font-size:12px; line-height:12px; color:red; margin:0 2px 2px 2px;">Wham<div style="position:absolute; width:170px; padding:5px; background-color:#fff; color:#333; border:1px solid #aaa; display:none;"><div><label for="wham-since" title="Only delete/rollback edits since this time">Since</label><input id="wham-since" type="text" style="display:block; width:165px;"></div><div><label for="wham-summary">Summary</label><input id="wham-summary" type="text" style="display:block; width:165px;"></div><div><label for="wham-expiry" title="Only used in blocks">Expiry</label><input id="wham-expiry" type="text" style="display:block; width:165px;"></div><div style="font-size:13px;"><a id="wham-delete" href="javascript:Whamdelete(\'' + $('input[name="target"]')[0].value + '\', document.getElementById(\'wham-since\').value, document.getElementById(\'wham-summary\').value)">Delete</a> | <a id="wham-delete" href="javascript:Whamrollback(\'' + $('input[name="target"]')[0].value + '\', document.getElementById(\'wham-since\').value, document.getElementById(\'wham-summary\').value)">Rollback</a> | <a id="wham-delete" href="javascript:Whamblock(\'' + $('input[name="target"]')[0].value + '\', document.getElementById(\'wham-summary\').value, document.getElementById(\'wham-expiry\').value)">Block</a> | <a id="wham-all" href="javascript:Wham(\'' + $('input[name="target"]')[0].value + '\', document.getElementById(\'wham-since\').value, document.getElementById(\'wham-summary\').value, document.getElementById(\'wham-expiry\').value)">All</a></div></div>';
			if(document.body.className.indexOf('skin-oasis') != -1) {
				$('#WikiaArticle').prepend(html);
			}
			else {
				$('#contentSub').append(html);
			}
		}
	}
}
addOnloadHook(WhamUI);
if(window.ajaxCallAgain) {ajaxCallAgain.push(WhamUI);}

function Wham(user, time, summary, expiry) {
	var limit = 50;
	if(!user) {return;}
	if(time) {time = timestr(time); limit = 5000;} //Try parsing basic format: HH:MM, MN DD, YYYY
	else {time = '';}
	if(!summary) {var summary = '';}
	if(!expiry) {var expiry = '2 week';}

	api.send(new api.Query(api, 'GET', 'action=query&list=usercontribs&ucuser=' + user + '&ucend=' + time + '&uclimit=' + limit, function(result) {
		for(var i in result.query.usercontribs) {
			if(result.query.usercontribs[i].new == '') {
				$('a[title="' + result.query.usercontribs[i].title + '"] ~ abbr.newpage').html('<img src="https://images.wikia.nocookie.net/dev/images/8/82/Facebook_throbber.gif" style="vertical-align: baseline;" border="0" alt="Whamming...">');
				api.send(new api.Query(api, 'POST', 'action=delete&title=' + result.query.usercontribs[i].title + '&reason=' + summary, function(result) {
					$('a[title="' + this.params.title + '"] ~ abbr.newpage').html('Wham\'d');
				}));
			}
			else if(result.query.usercontribs[i].top == '') {
				$('a[title="' + result.query.usercontribs[i].title + '"] + span + span.mw-uctop').html('<img src="https://images.wikia.nocookie.net/dev/images/8/82/Facebook_throbber.gif" style="vertical-align: baseline;" border="0" alt="Whamming...">');
				api.send(new api.Query(api, 'POST', 'action=rollback&title=' + result.query.usercontribs[i].title + '&user=' + user + '&summary=' + summary, function(result) {
					$('a[title="' + this.params.title + '"] + span + span.mw-uctop').html('Wham\'d');
				}));
			}
		}
	}));
	Whamblock(user, summary, expiry);
}
function Whamblock(user, summary, expiry) {
	if(!user) {return;}
	if(!summary) {var summary = '';}
	if(!expiry) {var expiry = '2 week';}
	api.send(new api.Query(api, 'POST', 'action=block&user=' + user + '&expiry=' + expiry + '&reason=' + summary + '&nocreate&autoblock&noemail', function(result) {
		$('a[title="User:' + this.params.user + '"]').after('<span> (Wham\'d)</span>');
	}));
}
function Whamdelete(user, time, summary) {
	var limit = 50;
	if(!user) {return;}
	if(time) {time = '&ucend=' + timestr(time); limit = 5000;}
	else {time = '';}
	if(!summary) {var summary = '';}
	api.send(new api.Query(api, 'GET', 'action=query&list=usercontribs&ucuser=' + user + time + '&uclimit=' + limit, function(result) {
		for(var i in result.query.usercontribs) {
			if(result.query.usercontribs[i].new == '') {
				$('a[title="' + result.query.usercontribs[i].title + '"] ~ abbr.newpage').html('<img src="https://images.wikia.nocookie.net/dev/images/8/82/Facebook_throbber.gif" style="vertical-align: baseline;" border="0" alt="Whamming..."> ');
				api.send(new api.Query(api, 'POST', 'action=delete&title=' + result.query.usercontribs[i].title + '&reason=' + summary, function(result) {
					$('a[title="' + this.params.title + '"] ~ abbr.newpage').html('Wham\'d ');
				}));
			}
		}
	}));
}
function Whamrollback(user, time, summary) {
	var limit = 50;
	if(!user) {return;}
	if(time) {time = '&ucend=' + timestr(time); limit = 5000;}
	else {time = '';}
	if(!summary) {var summary = '';}
	
	api.send(new api.Query(api, 'GET', 'action=query&list=usercontribs&ucuser=' + user + time + '&uclimit=' + limit, function(result) {
		for(var i in result.query.usercontribs) {
			if(result.query.usercontribs[i].top == '') {
				var page = result.query.usercontribs[i].title;
				var rollback = false;
				for(var j = 0; j < wgUserRights.length; j++) {
					if(wgUserRights[j] == 'rollback' || wgUserRights[j] == 'sysop' || wgUserRights[j] == 'vstf' || wgUserRights[j] == 'helper' || wgUserRights[j] == 'staff') {rollback = true; break;}
				}
				if(rollback) {
					api.send(new api.Query(api, 'POST', {action: 'rollback', title: page, user: user, summary: summary}, function(result) {
						$('a[title="' + this.params.title + '"] + span + span.mw-uctop').html('Wham\'d ');
					}));
				}
				else {
					api.send(new api.Query(api, 'GET', {action: 'query', prop: 'revisions', titles: page, rvlimit: '5000', indexpageids: 1}, function(result) {
						var revs = result.query.pages[result.query.pageids[0]].revisions;
						if(revs[0].user != user) {return;}
						var i = 1;
						while(revs[i].user == revs[0].user) {i++;}
						api.send(new api.Query(api, 'POST', {action: 'edit', title: this.params.titles, undo: revs[i].revid, undoafter: revs[0].revid, summary: (summary ? summary : 'Reverted edits by [[User:' + revs[0].user + '|' + revs[0].user + ']] ([[User talk:' + revs[0].user + '|talk]] | [[Special:Contributions/' + revs[0].user + '|contribs]]) to last version by [[User:' + revs[i + 1].user + '|' + revs[i + 1].user + ']]')}, function(result) {
							$('a[title="' + this.params.title + '"] + span + span.mw-uctop').html('Wham\'d ');
						}));
					}));
				}
				$('a[title="' + result.query.usercontribs[i].title + '"] + span + span.mw-uctop').html('<img src="https://images.wikia.nocookie.net/dev/images/8/82/Facebook_throbber.gif" style="vertical-align: baseline;" border="0" alt="Whamming..."> ');
			}
		}
	}));
}

function timestr(time) {
	try { //Some of this may break if the date is a fail
		time = time.removeTrailing(' ');
		var date = new Date();
		var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
		if(time.split(',').length == 3) { //Contains two commas, assumed to be full string
			var hours = time.split(',')[0].removeTrailing(' ').split(':')[0].removeTrailing(' '); if(hours < 10 && hours.length < 2) {hours = '0' + hours;}
			var minutes = time.split(',')[0].removeTrailing(' ').split(':')[1].removeTrailing(' '); if(minutes < 10 && minutes.length < 2) {minutes = '0' + minutes;}
			var month = time.split(',')[1].removeTrailing(' ').split(' ')[0];
			for(var i = 0; i < months.length; i++) {if(months[i] == month) {month = i + 1; break;}}
			if(month < 10) {month = '0' + month;}
			var days = time.split(',')[1].removeTrailing(' ').split(' ')[time.split(',')[1].removeTrailing(' ').split(' ').length -1]; if(days < 10) {days = '0' + days;}
			var year = time.split(',')[2].removeTrailing(' ');
		}
		else if(time.split(',').length == 2) { //Contains one comma, assumed to be month, day and year
			var hours = '00';
			var minutes = '00';
			var month = time.split(',')[0].removeTrailing(' ').split(' ')[0];
			for(var i = 0; i < months.length; i++) {if(months[i] == month) {month = i + 1; break;}}
			if(month < 10) {month = '0' + month;}
			var days = time.split(',')[0].removeTrailing(' ').split(' ')[time.split(',')[0].removeTrailing(' ').split(' ').length - 1]; if(days < 10) {days = '0' + days;}
			var year = time.split(',')[1].removeTrailing(' ');
		}
		else { //Contains no commas, is either month and day or a time
			if(time.indexOf(':') != -1) { //Time
				time = time.replace(/ /g, '');
				var hours = time.split(':')[0]; if(hours < 10 && hours.length < 2) {hours = '0' + hours;}
				var minutes = time.split(':')[1]; if(minutes < 10 && minutes.length < 2) {minutes = '0' + minutes;}
				var days = date.getUTCDate(); if(days < 10) {days = '0' + days;}
				var month = date.getUTCMonth() + 1; if(month < 10) {month = '0' + month;}
				var year = date.getUTCFullYear();
			}
			else { //Date
				var hours = '00';
				var minutes = '00';
				var month = time.split(' ')[0];
				for(var i = 0; i < months.length; i++) {if(months[i] == month) {month = i + 1; break;}}
				if(month < 10) {month = '0' + month;}
				var days = time.split(' ')[time.split(' ').length - 1]; if(days < 10) {days = '0' + days;}
				var year = date.getUTCFullYear();
			}
		}
		
		return year + '-' + month + '-' + days + 'T' + hours + ':' + minutes + ':00Z';
	}
	catch(err) {console.log(err); return time;}
}

String.prototype.removeTrailing = function(char) {
	var str = this;
	while(str.charAt(0) == char) {str = str.substring(1, str.length);}
	while(str.charAt(str.length - 1) == char) {str = str.substring(0, str.length - 1);}
	return str;
}