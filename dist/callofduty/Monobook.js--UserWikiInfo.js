// <pre>
/*
* Copyright (C) 2010  Jesús Martínez Novo ([[User:Ciencia Al Poder]])
* 
* This program is free software; you can redistribute it and/or modify
*   it under the terms of the GNU General Public License as published by
*   the Free Software Foundation; either version 2 of the License, or
*   (at your option) any later version
*
*/
var UserWikiInfo = {
	tmpl: '<div id="UserWikiInfo"><div class="useravatar"><a href="/wiki/User:{u}" title="{U}'s avatar"><img src="https://images.wikia.nocookie.net/__cb20081128203240/messaging/images/thumb/1/19/Avatar.jpg/50px-Avatar.jpg" width="75" height="75" alt="Avatar" /></a>{editavatar}</div>' +
		'<span class="userlink"><a href="/wiki/User:{u}" title="User">User:{U}</a></span> &#124; <span class="talklink"><a href="/wiki/User talk:{u}" title="Talk page">Talk</a> <a href="/index.php?title=User talk:{u}&amp;action=edit&amp;section=new" title="Talk page">[+]</a></span> &#124; <span class="bloglink"><a href="/wiki/User blog:{u}" title="User blog">Blog</a></span>{email} &#124; <span class="contribslink"><a href="/wiki/Special:Contributions/{u}" title="User contributions">Contributions</a></span>{group}'+
		'<div class="contribdetails"></div></div>',
	emailtmpl: ' &#124; <span class="emaillink"><a href="/wiki/Special:EmailUser/{u}" title="Email this user">Email</a></span>',
	contrtmpl: '{U} has {c} edits on the {fe}<br /><span class="contenteditcount"><a href="/wiki/Special:Editcount/{U}" title="{cu} edits on this wiki"><span class="psmax"><span class="psact pslvl{l}" style="width:{r}%;"></span></span></a></span>',
	datefm: '{d} de {m} de {y}',
	editavatar: '<a class="editavatar" href="/wiki/Special:Preferences#wkUserChooseDivText">Change avatar</a>',
	months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
	groupseparator: ', ',
	groups: {
		bureaucrat: '<a href="/wiki/Project:Administradores">Bureaucrat</a>',
		sysop: '<a href="/wiki/Project:Administradores">Administratora>',
		rollback: '<a href="/wiki/Project:Rollback">Rollback</a>',
	},
	avatarWidth: 100, // Initial width
	avatarHeight: 75, // Max height
	avatarImg: null,
	username: null,
	firstEdit: null,
	init: function() {
		var u = null, infoURL = wgServer+wgScriptPath+'/api.php?action=query&list=users|usercontribs|allusers&ususers={u}&usprop=groups|editcount|registration|emailable&ucuser={u}&uclimit=1&ucdir=newer&ucprop=timestamp&aufrom={u}&auprop=&aulimit=1&smaxage=3600&maxage=3600&format=json';
		if (window.wgNamespaceNumber == -1 && window.wgCanonicalSpecialPageName == 'Contributions') {
			var cbu = $('#user');
			if (cbu.exists() && cbu.get(0).checked) {
				u = cbu.parent().children('input[name=target]').eq(0).val();
			}
		} else if (window.wgCanonicalNamespace == 'User' || window.wgCanonicalNamespace == 'User_talk' || window.wgCanonicalNamespace == 'User_Blog') {
			u = window.wgTitle;
			var sl = u.indexOf('/');
			if (sl != -1) {
				u = u.substr(0, sl);
			}
		}
		if (!u) return;
		if (u.search(new RegExp('^\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}$')) != -1) return; // IP
		$.getJSON(infoURL.replace(new RegExp('\\{u\\}','g'), encodeURIComponent(u.replace(new RegExp(' ','g'), '_'))), UserWikiInfo.dataRecv);
	},
	dataRecv: function(data) {
		var q = data.query;
		if (q.users.length == 0 || typeof q.users[0].missing != 'undefined') return;
		var u = q.users[0].name, editcount = (q.users[0].editcount||0), groups = q.users[0].groups, emailable = (typeof q.users[0].emailable == 'string'), firstedit = (q.usercontribs.length == 0 ? '' : q.usercontribs[0].timestamp), userid = q.allusers[0].id, grouptext = '';
		u.replace(new RegExp('\<', 'g'), '&lt;').replace(new RegExp('\>', 'g'), '&gt;').replace(new RegExp('"', 'g'), '&quot;');
		if (firstedit != '') {
			UserWikiInfo.firstEditDate = new Date(Date.UTC(firstedit.substr(0,4), parseInt(firstedit.substr(5,2),10)-1, firstedit.substr(8,2)));
		}
		if (groups && groups.length > 0) {
			var g = '';
			for (var i = 0; i < groups.length; i++) {
				if (i) {
					g += UserWikiInfor.groupseparator;
				}
				g += (UserWikiInfo.groups[groups[i]] || groups[i]);
			}
			grouptext = UserWikiInfo.grouptmpl.replace(new RegExp('\\{g\\}', 'g'), g);
		}
		$('#bodyContent').prepend(
			UserWikiInfo.tmpl.replace('{email}', (emailable ? UserWikiInfo.emailtmpl : '')).replace(
				new RegExp('\\{U\\}', 'g'), u).replace(
				new RegExp('\\{u\\}', 'g'), encodeURIComponent(u.replace(new RegExp(' ', 'g'), '_'))).replace(
				new RegExp('\\{editavatar\\}'), ((window.wgUserName && window.wgUserName == u) ? UserWikiInfoeditavatar : '')).replace(
				new RegExp('\\{group\\}'), grouptext));
		// Avatar
		var img = new Image();
		UserWikiInfo.avatarImg = img;
		img.onload = UserWikiInfo.avatarLoaded;
		var avatar = userid.toString()+'.png';
		var shaObj = new jsSHA(userid.toString(), 'ASCII');
		var hash = shaObj.getHash('HEX');
		img.alt = 'avatar';
		img.src = 'https://images.wikia.nocookie.net/common/avatars/thumb/'+hash.substr(0,1)+'/'+hash.substr(0,2)+'/'+avatar+'/'+UserWikiInfo.avatarWidth.toString()+'px-'+avatar;
		// Contribs
		UserWikiInfo.username = u;
		if (editcount > 0) {
			$.getJSON(wgServer+wgScriptPath+'/api.php?action=parse&text={{:MediaWiki:UserWikiInfoContribs}}&title=User:'+encodeURIComponent(u)+'&prop=text&smaxage=3600&maxage=3600&format=json', UserWikiInfo.contribsData);
		}
	},
	avatarLoaded: function() {
		var img = UserWikiInfo.avatarImg;
		var h = img.height, w = img.width;
		if (h < 1) return;
		if (h > UserWikiInfo.avatarHeight) {
			img.style.height = UserWikiInfo.avatarHeight+'px';
		}
		$('#UserWikiInfo').children('.useravatar').eq(0).find('img').eq(0).replaceWith(img);
	},
	contribsData: function(data) {
		var text = data.parse.text['*'], c = 0, cu = 0, acontr = [], rate = 0, lvl = 0, d = UserWikiInfo.firstEditDate, fe = '';
		if (text.indexOf('class="new"') != -1 || text.indexOf('<p>') == -1) return; // Template does not exist/sanity check
		text = text.substring(3, text.indexOf('</p>')).replace(new RegExp('[\.,]', 'g'), '');
		acontr = text.split('|');
		for (var i = 0; i < acontr.length; i++) {
			var n = parseInt(acontr[i], 10);
			if (isNaN(n)) return;
			if (i == 0) {
				c = n;
			} else {
				cu += n;
			}
		}
		if (c == 0) return;
		rate = parseInt((cu*10000/c), 10)/100;
		lvl = parseInt((cu/c*4), 10);
		fe = UserWikiInfo.datefm.replace('{d}', d.getDate()).replace('{m}', UserWikiInfo.months[d.getMonth()]).replace('{y}', d.getFullYear());
		$('#UserWikiInfo').children('.contribdetails').eq(0).append(
			UserWikiInfo.contrtmpl.replace(new RegExp('\\{U\\}', 'g'), UserWikiInfo.username).replace(
				new RegExp('\\{c\\}', 'g'), c).replace(
				new RegExp('\\{cu\\}', 'g'), cu).replace(
				new RegExp('\\{l\\}', 'g'), lvl).replace(
				new RegExp('\\{r\\}', 'g'), rate).replace(
				new RegExp('\\{fe\\}', 'g'), fe));
	}
};

$(UserWikiInfo.init);
// </pre>