/**<nowiki>
 * Note that this script will only run on the 'Project:AutoWikiBrowser/Script' page.
 * This script is based on the downloadable AutoWikiBrowser.
 * 
 * @licence
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program; if not, write to the Free Software Foundation, Inc.,
 * 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.
 * https://www.gnu.org/copyleft/gpl.html
 * @version 3.0.2
 * @author Joeytje50
 */
//TODO: Re-enable summary box (possibly more) when not busy submitting.
//TODO: more advanced pagelist-generating options
//TODO: generate page list based on images on a page
var JWB = {}; //The main global object for the script.
window.JWB = JWB;
/***** User verification *****/
(function($, mw) {
	if (
	    mw.config.get('wgNamespaceNumber') !== 4 ||
	    mw.config.get('wgTitle') !== 'AutoWikiBrowser/Script' ||
	    JWB.allowed === false ||
	    mw.config.get('wgUserName') === null
	) {
		JWB.allowed = false;
		return;
	}

	importArticle({
		type: 'style',
		article: 'u:dev:MediaWiki:JWB.css'
	});
	importArticle({
		type: 'script',
		article: 'u:dev:MediaWiki:I18n-js/code.js'
	});
	mw.loader.load('mediawiki.diff.styles');

	mw.hook('dev.i18n').add(function(i18n) {
		i18n.loadMessages('JWB').done(function(i18no) {
			JWB.msg = i18no.msg;
			if (JWB.allowed === true) {
				JWB.init(); //init if verification has already returned true
			} else if (JWB.allowed === false) {
				alert(JWB.msg('not-on-list').plain());
			}
		});
	});

	//RegEx Typo Fixing
	mw.loader.getScript('https://dev.fandom.com/wiki/MediaWiki:JWB/RETF.js?action=raw&ctype=text/javascript').then(function() {
    	$('#refreshRETF').click(RETF.load);
	});

	mw.loader.using('mediawiki.api').then(function() {
		new mw.Api().get({
			action: 'query',
			titles: 'Project:AutoWikiBrowser/CheckPage',
			prop: 'revisions',
			meta: 'userinfo|siteinfo',
			rvprop: 'content',
			rvlimit: 1,
			uiprop: 'groups',
			siprop: 'namespaces',
			indexpageids: true,
			format: 'json',
		}).done(function(response) {
			if (response.error) {
				alert('API error: ' + response.error.info);
				JWB = false; //preventing further access. No verification => no access.
				return;
			}
			JWB.ns = response.query.namespaces; //saving for later
	
			JWB.username = response.query.userinfo.name; //preventing any "hacks" that change wgUserName or mw.config.wgUserName
			var groups = response.query.userinfo.groups;
			var page = response.query.pages[response.query.pageids[0]];
			var users, bots;
			if (response.query.pageids[0] !== '-1' && /<!--\s*enabledusersbegins\s*-->/.test(page.revisions[0]['*'])) {
				var cont = page.revisions[0]['*'];
				users = cont.substring(
					cont.search(/<!--\s*enabledusersbegins\s*-->/),
					cont.search(/<!--\s*enabledusersends\s*-->/)
				).split('\n');
				if (/<!--\s*enabledbots\s*-->/.test(cont)) {
					bots = cont.substring(
						cont.search(/<!--\s*enabledbots\s*-->/),
						cont.search(/<!--\s*enabledbotsends\s*-->/)
					).split('\n');
				} else bots = [];
				var i=0;
				while (i<users.length) {
	                if (users[i].charAt(0) !== '*') {
	                    users.splice(i,1);
	                } else {
	                    users[i] = $.trim(users[i].substr(1));
	                    i++;
	                }
				}
				i=0;
				while (i<bots.length) {
	                if (bots[i].charAt(0) !== '*') {
	                    bots.splice(i,1);
	                } else {
	                    bots[i] = $.trim(bots[i].substr(1));
	                    i++;
	                }
				}
			} else {
				users = false; //fallback when page doesn't exist
			}
			JWB.bot = groups.indexOf('bot') !== -1 && (users === false || bots.indexOf(JWB.username) !== -1);
			JWB.sysop = groups.indexOf('sysop') !== -1;
			if (JWB.username === "Joeytje50" && response.query.userinfo.id === 13299994) {//TEMP: Dev full access to entire interface.
				JWB.bot = true;
				users.push("Joeytje50");
			}
			if (JWB.sysop || response.query.pageids[0] === '-1' || users.indexOf(JWB.username) !== -1 || users === false) {
				JWB.allowed = true;
				if (JWB.msg) JWB.init(); //init if messages have already loaded
			} else {
				if (JWB.msg) {
					//run this after messages have loaded, so the message that shows is in the user's language
					alert(JWB.msg('not-on-list').plain());
				}
				JWB = false; //prevent further access
			}
		}).fail(function(xhr, error) {
			alert(JWB.msg('verify-error').plain() + '\n' + error);
			JWB = false; //preventing further access. No verification => no access.
		});
	});
})(window.jQuery, window.mediaWiki);
/***** Global object/variables *****/
var objs = ['page', 'api', 'fn', 'pl', 'messages', 'setup', 'settings', 'ns'];
for (var i=0;i<objs.length;i++) {
	JWB[objs[i]] = {};
}
JWB.lang = mw.config.get('wgUserLanguage');
JWB.index_php = mw.config.get('wgScript');
JWB.isStopped = true;
JWB.tooltip = window.tooltipAccessKeyPrefix || '';
JWB.configext = 'js';
JWB.settingspage = 'JWB';
if (window.hasOwnProperty('JWBSETTINGS')) {
	JWB.settingspage = JWBSETTINGS;
	delete window.JWBSETTINGS; //clean up the global variable
}
/***** API functions *****/
//Main template for API calls
JWB.api.call = function(data, callback, onerror) {
	data.format = 'json';
	if (data.action !== 'query') data.bot = true;
	$.ajax({
		data: data,
		dataType: 'json',
		url: mw.config.get('wgScriptPath') + '/api.php',
		type: 'POST',
		success: function(response) {
			if (response.error) {
				alert('API error: ' + response.error.info);
				JWB.stop();
			} else {
				callback(response);
			}
		},
		error: function(xhr, error) {
			alert('AJAX error: ' + error);
			JWB.stop();
			if (onerror) onerror();
		}
	});
};
//Get page diff, and process it for more interactivity
JWB.api.diff = function(callback) {
	JWB.status('diff');
	var editBoxInput = $('#editBoxArea').val();
	var redirects = $('input.redirects:checked').val()==='follow'?'redirects':'inprop';
	var data = {
		'action': 'query',
		'prop': 'info|revisions',
		'indexpageids': true,
		'titles': JWB.page.name,
		'rvlimit': '1',
		'rvdifftotext': editBoxInput
	};
	data[redirects] = 'redirect';
	JWB.api.call(data, function(response) {
		var pageExists = response.query.pageids[0] !== '-1';
		var diff;
		if (pageExists) {
			var diffpage = response.query.pages[response.query.pageids[0]];
			diff = diffpage.revisions[0].diff['*'];
			if (diff === '') {
				diff = '<div class="log-row log-skipped">' + JWB.msg('no-changes-made').escape() + '</div>';
			} else {
				diff = '<table class="diff">'+
					'<colgroup>'+
						'<col class="diff-marker">'+
						'<col class="diff-content">'+
						'<col class="diff-marker">'+
						'<col class="diff-content">'+
					'</colgroup>'+
					'<tbody>' + diff + '</tbody></table>';
			}
		} else {
			diff = '<div class="log-row log-error">' + JWB.msg('page-not-exists').escape() + '</div>';
		}
		$('#resultWindow').html(diff);
		$('.diff-lineno').each(function() {
			$(this).parent().attr('data-line',parseInt($(this).html().match(/\d+/)[0], 10)-1).addClass('lineheader');
		});
		$('table.diff tr').each(function() { //add data-line attribute to every line, relative to the previous one. Used for click event.
			if (!$(this).next().is('[data-line]') && !$(this).next().has('td.diff-deletedline + td.diff-empty')) {
				$(this).next().attr('data-line',parseInt($(this).data('line'), 10)+1);
			} else if ($(this).next().has('td.diff-deletedline + td.diff-empty')) {
				$(this).next().attr('data-line',$(this).data('line')); //copy over current data-line for deleted lines to prevent them from messing up counting.
			}
		});
		JWB.status('done', true);
		if (typeof(callback) === 'function') {
			callback();
		}
	});
};
//Retrieve page contents/info, process them, and store information in JWB.page object.
JWB.api.get = function(pagename) {
	JWB.pageCount();
	if (!JWB.list[0] || JWB.isStopped) {
		return JWB.stop();
	}
	if (pagename === '#PRE-PARSE-STOP') {
		var curval = $('#articleList').val();
		$('#articleList').val(curval.substr(curval.indexOf('\n') + 1));
		$('#preparse').prop('checked', false);
		JWB.stop();
		return;
	}
	var redirect = $('input.redirects:checked').val();
	var data = {
		'action': 'query',
		'prop': 'info|revisions',
		'inprop': 'watched',
		'intoken': 'edit|delete|protect|move|watch',
		'titles': pagename,
		'rvprop': 'content|timestamp|ids',
		'rvlimit': '1',
		'indexpageids': true,
		'meta': 'userinfo',
		'uiprop': 'hasmsg'
	};
	if (redirect=='follow'||redirect=='skip') data.redirects = true;
	if (JWB.sysop) {
		data.list = 'deletedrevs';
		data.drprop = 'token';
	}
	JWB.status('load-page');
	JWB.api.call(data, function(response) {
		if (response.query.userinfo.hasOwnProperty('messages')) {
			var view = mw.config.get('wgScriptPath') + '?title=Special:MyTalk';
			var viewNew = view + '&diff=cur';
			JWB.status(
				'<span style="color:red;font-weight:bold;">'+
					JWB.msg('status-newmsg', 
						'<a href="'+view+'" target="_blank">'+JWB.msg('status-talklink')+'</a>',
						'<a href="'+viewNew+'" target="_blank">'+JWB.msg('status-difflink')+'</a>').escape()+
				'</span>', true);
			alert(JWB.msg('new-message').plain());
			JWB.stop();
			return;
		}
		JWB.page = response.query.pages[response.query.pageids[0]];
		JWB.page.name = JWB.list[0].split('|')[0];
        var varOffset = JWB.list[0].indexOf('|') !== -1 ? JWB.list[0].indexOf('|') + 1 : 0;
        JWB.page.pagevar = JWB.list[0].substr(varOffset);
		JWB.page.content = JWB.page.revisions ? JWB.page.revisions[0]['*'] : '';
		JWB.page.exists = !response.query.pages["-1"];
		JWB.page.deletedrevs = response.query.deletedrevs;
		JWB.page.watched = JWB.page.hasOwnProperty('watched');
		if (response.query.redirects) {
			JWB.page.name = response.query.redirects[0].to;
		}
		var newContent = JWB.replace(JWB.page.content);
		if (JWB.isStopped === true) return;
		JWB.status('done', true);
		var containRegex = $('#containRegex').prop('checked'), containFlags = $('#containFlags').val();
		var skipContains = containRegex ? new RegExp($('#skipContains').val(), containFlags) : $('#skipContains').val();
		var skipNotContains = containRegex ? new RegExp($('#skipNotContains').val(), containFlags) : $('#skipContains').val();
		if (
			($('#skipNoChange').prop('checked') && JWB.page.content === newContent) || //skip if no changes are made
			($('#skipContains').val() && JWB.page.content.match(skipContains)) ||
			($('#skipNotContains').val() && !JWB.page.content.match(skipNotContains)) ||
			($('#exists-no').prop('checked') && !JWB.page.exists) ||
			($('#exists-yes').prop('checked') && JWB.page.exists) ||
			(redirect==='skip' && response.query.redirects) // variable  redirect  is defined outside this callback function.
		) {
			JWB.log('skip', JWB.page.name);
			return JWB.next();
		} else {
			$('#editBoxArea').val(newContent);
			$('#currentpage').html(JWB.msg('editbox-currentpage', JWB.page.name ? '[[' + JWB.page.name + ']]' : ' ').parse());
			if ($('#preparse').prop('checked')) {
				$('#articleList').val($.trim($('#articleList').val()) + '\n' + JWB.list[0]); //move current page to the bottom
				JWB.next();
				return;
			} else if (JWB.bot && $('#autosave').prop('checked')) {
				JWB.api.diff(function() {
					//timeout will take #throttle's value * 1000, if it's a number above 0. Currently defaults to 0.
					setTimeout(JWB.api.submit, Math.max(+$('#throttle').val() || 0, 0) * 1000, JWB.page.name);
				});
			} else {
				JWB.api.diff();
			}
		}
		JWB.updateButtons();
	});
};
//Some functions with self-explanatory names:
JWB.api.submit = function(page) {
	JWB.status('submit');
	var summary = $('#summary').val();
	if ($('#summary').parent('label').hasClass('viaJWB')) summary += ' (via JWB)'; // @todo: i18n this string.
	if ((typeof page === 'text' && page !== JWB.page.name) || $('#currentpage a').html().replace(/&amp;/g, '&') !== JWB.page.name) {
		console.log(page, JWB.page.name, $('#currentpage a').html());
		JWB.stop();
		alert(JWB.msg('autosave-error', JWB.msg('tab-log')).plain());
		$('#currentpage').html(JWB.msg('editbox-currentpage', ' ').escape());
		return;
	}
	var data = {
		'title': JWB.page.name,
		'summary': summary,
		'action': 'edit',
		'basetimestamp': JWB.page.revisions ? JWB.page.revisions[0].timestamp : '',
		'token': JWB.page.edittoken || mw.user.tokens.get("csrfToken"),
		'text': $('#editBoxArea').val(),
		'watchlist': $('#watchPage').val()
	};
	if ($('#minorEdit').prop('checked')) data.minor = true;
	JWB.api.call(data, function(response) {
		JWB.log('edit', response.edit.title, response.edit.newrevid);
		JWB.status('done', true);
		JWB.next();
	});
};
JWB.api.preview = function() {
	JWB.status('preview');
	JWB.api.call({
		'title': JWB.page.name,
		'action': 'parse',
		'text': $('#editBoxArea').val()
	}, function(response) {
		$('#resultWindow').html(response.parse.text['*']);
		$('#resultWindow div.previewnote').remove();
		JWB.status('done', true);
	});
};
JWB.api.move = function() {
	JWB.status('move');
	var topage = $('#moveTo').val().replace(/\$x/gi, JWB.page.pagevar);
	var summary = $('#summary').val();
	if ($('#summary').parent('label').hasClass('viaJWB')) summary += ' (via JWB)';
	var data = {
		'action':'move',
		'from': JWB.page.name,
		'to': topage,
		'token': JWB.page.movetoken,
		'reason': summary,
		'ignorewarnings': 'yes'
	};
	if ($('#moveTalk').prop('checked')) data.movetalk = true;
	if ($('#moveSubpage').prop('checked')) data.movesubpages = true;
	if ($('#suppressRedir').prop('checked')) data.noredirect = true;
	JWB.api.call(data, function(response) {
		JWB.log('move', response.move.from, reponse.move.to);
		JWB.status('done', true);
		if (!$('#moveTo').val().match(/\$x/i)) $('#moveTo').val('')[0].focus(); //clear entered move-to pagename if it's not based on the pagevar
		JWB.next(topage);
	});
};
JWB.api['delete'] = function() {
	JWB.status(($('#deletePage').is('.undelete') ? 'un' : '') + 'delete');
	var summary = $('#summary').val();
	if ($('#summary').parent('label').hasClass('viaJWB')) summary += ' (via JWB)';
	var undeltoken = JWB.page.deletedrevs && JWB.page.deletedrevs[0] ? JWB.page.deletedrevs[0].token : '';
	JWB.api.call({
		'action': (!JWB.page.exists ? 'un' : '') + 'delete',
		'title': JWB.page.name,
		'token': JWB.page.exists ? JWB.page.deletetoken : undeltoken,
		'reason': summary
	}, function(response) {
		JWB.log((!JWB.page.exists ? 'un' : '') + 'delete', (response['delete']||response.undelete).title);
		JWB.status('done', true);
		JWB.next(response.undelete && response.undelete.title);
	});
};
JWB.api.protect = function() {
	JWB.status('protect');
	var summary = $('#summary').val();
	if ($('#summary').parent('label').hasClass('viaJWB')) summary += ' (via JWB)';
	var editprot = $('#editProt').val();
	var moveprot = $('#moveProt').val();
	JWB.api.call({
		'action':'protect',
		'title': JWB.page.name,
		'token': JWB.page.protecttoken,
		'reason': summary,
		'expiry': $('#protectExpiry').val()!==''?$('#protectExpiry').val():'infinite',
		'protections': (JWB.page.exists?'edit='+editprot+'|move='+moveprot:'create='+editprot)
	}, function(response) {
		var protactions = '';
		var prots = response.protect.protections;
		for (var i=0;i<prots.length;i++) {
			if (typeof prots[i].edit == 'string') {
				protactions += ' edit: '+(prots[i].edit?prots[i].edit:'all');
			} else if (typeof prots[i].move == 'string') {
				protactions += ' move: '+(prots[i].move?prots[i].move:'all');
			} else if (typeof prots[i].create == 'string') {
				protactions += ' create: '+(prots[i].create?prots[i].create:'all');
			}
		}
		protactions += ' expires: '+prots[0].expiry;
		JWB.log('protect', response.protect.title, protactions);
		JWB.status('done', false);
		JWB.next(response.protect.title);
	});
};
JWB.api.watch = function() {
	JWB.status('watch');
	var data = {
		'action':'watch',
		'title':JWB.page.name,
		'token':JWB.page.watchtoken
	};
	if (JWB.page.watched) data.unwatch = true;
	JWB.api.call(data, function(response) {
		JWB.status('<span style="color:green;">'+
			JWB.msg('status-watch-'+(JWB.page.watched ? 'removed' : 'added'), "'"+JWB.page.name+"'").escape()+
		'</span>', true);
		JWB.page.watched = !JWB.page.watched;
		$('#watchNow').html( JWB.msg('watch-' + (JWB.page.watched ? 'remove' : 'add')).escape() );
	});
};
/***** Pagelist functions *****/
JWB.pl.list = [];
JWB.pl.iterations = 0;
JWB.pl.stop = function() {
	JWB.pl.iterations = 0;
	$('#pagelistPopup [disabled]:not(fieldset [disabled]), #pagelistPopup legend input').prop('disabled', false);
	$('#pagelistPopup legend input').trigger('change');
	$('#pagelistPopup button img').remove();
};
JWB.pl.getNSpaces = function() {
	var list = $('#pagelistPopup [name="namespace"]')[0];
	if (list.selectedOptions.length == list.options.length) {
		return ''; //return empty string if every namespace is selected; this will make the request default to having no filter
	} else {
		return $('#pagelistPopup [name="namespace"]').val().join('|'); //.val() returns an array of selected options.
	}
};
JWB.pl.getList = function(abbrs, lists, data) {
	$('#pagelistPopup button, #pagelistPopup input, #pagelistPopup select').prop('disabled', true);
	JWB.pl.iterations++;
	data.action = 'query';
	var nspaces = JWB.pl.getNSpaces();
	for (var i=0;i<abbrs.length;i++) {
		if (nspaces) data[abbrs[i]+'namespace'] = nspaces;
		data[abbrs[i]+'limit'] = 'max';
	}
	if (lists.indexOf('links') !== -1) {
		data.prop = 'links';
	}
	data.list = lists.join('|');
	JWB.api.call(data, function(response) {
		var maxiterate = 100; //allow up to 100 consecutive requests at a time to avoid overloading the server.
		if (!response.query) response.query = {};
		if (response.watchlistraw) response.query.watchlistraw = response.watchlistraw; //adding some consistency
		var plist = [];
		if (response.query.pages) {
			var links;
			for (var id in response.query.pages) {
				links = response.query.pages[id].links;
				for (var i=0;i<links.length;i++) {
					plist.push(links[i].title);
				}
			}
		}
		for (var l in response.query) {
			if (l === 'pages') continue;
			for (var z=0;z<response.query[l].length;z++) {
				plist.push(response.query[l][z].title);
			}
		}
		//add the result to the pagelist immediately, as opposed to saving it all up and adding in 1 go like AWB does
		$('#articleList').val($.trim($('#articleList').val()) + '\n' + plist.join('\n'));
		JWB.pageCount();
		var cont = response['continue'];
		console.log("Continue",JWB.pl.iterations, cont);
		if (cont && JWB.pl.iterations <= maxiterate) {
			var lists = [];
			if (response.query) { //compatibility with the code I wrote for the old query-continue. TODO: make this unnecessary?
				for (var list in response.query) {
					lists.push(list); //add to the new array of &list= values
				}
			}
			var abbrs = [];
			for (var abbr in cont) {
				data[abbr] = cont[abbr]; //add the &xxcontinue= value to the data
				if (abbr != 'continue') {
					abbrs.push(abbr.replace('continue','')); //find out what xx is and add it to the list of abbrs
				}
			}
			JWB.pl.getList(abbrs, lists, data); //recursive function to get every page of a list
		} else {
			if (JWB.pl.iterations > maxiterate) {
				JWB.status('pl-over-lim', true);
			} else {
				JWB.status('done', true);
			}
			JWB.pl.stop();
		}
	}, function() { //on error, simply reset and let the user work with what he has
		JWB.status('done', true);
		JWB.pl.stop();
	});
};
//JWB.pl.getList(['wr'], ['watchlistraw'], {}) for watchlists
JWB.pl.generate = function() {
	var $fields = $('#pagelistPopup fieldset').not('[disabled]');
	var spinner = '<svg class="wds-spinner" width="45" height="45" viewBox="0 0 45 45" xmlns="http://www.w3.org/2000/svg"><g transform="translate(22.5, 22.5)"><circle class="wds-spinner__stroke" fill="none" stroke-width="5" stroke-dasharray="125" stroke-dashoffset="125" stroke-linecap="round" r="20"></circle>/g&gt;</g></svg>';
	$('#pagelistPopup').find('button[type="submit"]').append(spinner);
	var abbrs = [], lists = [], data = {'continue': ''};
	$fields.each(function() {
		var list = $(this).find('legend input').attr('name');
		var abbr;
		if (list === 'linksto') { //Special case since this fieldset features 3 merged lists in 1 fieldset
			if (!$('[name="title"]').val()) return;
			$('[name="backlinks"], [name="embeddedin"], [name="imageusage"]').filter(':checked').each(function() {
				var val = this.value;
				abbrs.push(val);
				lists.push(this.name);
				data[val+'title'] = $('[name="title"]').val();
				data[val+'filterredir'] = $('[name="filterredir"]:checked').val();
				if ($('[name="redirect"]').prop('checked')) data[val+'redirect'] = true;
			});
		} else { //default input system
			abbr = $(this).find('legend input').val();
			lists.push(list);
			abbrs.push(abbr);
			$(this).find('input').not('legend input').each(function() {
				if ((this.type === 'checkbox' || this.type === 'radio') && this.checked === false) return;
				if ($(this).is('[name="cmtitle"]')) {
					//making sure every page has a Category: prefix, in case the user left it out
					var newval = $(this).val().replace(new RegExp(JWB.ns[14]['*']+':', 'gi'), '').split('|')[0];
					$(this).val(JWB.ns[14]['*']+':'+newval);
				}
				var name = this.name;
				var val = this.value;
				if (data.hasOwnProperty(name)) {
					data[name] += '|'+val;
				} else {
					data[name] = val;
				}
			});
			console.log(abbrs, lists, data);
		}
	});
	if (abbrs.length) JWB.pl.getList(abbrs, lists, data);
};
/***** Setup functions *****/
JWB.setup.save = function(name) {
	name = name || prompt(JWB.msg('setup-prompt', JWB.msg('setup-prompt-store').plain()).plain(), $('#loadSettings').val());
	if (name === null) return;
	var self = JWB.settings[name] = {
		string: {},
		bool: {},
		replaces: []
	};
	//inputs with a text value
	$('textarea, input[type="text"], input[type="number"], select').not('.replaces input, #editBoxArea, #settings *').each(function() {
		if (typeof $(this).val() == 'string') { 
			self.string[this.id] = this.value.replace(/\n{2,}/g,'\n');
		} else {
			self.string[this.id] = $(this).val();
		}
	});
	self.replaces = [];
	$('.replaces').each(function() {
		if ($(this).find('.replaceText').val() || $(this).find('.replaceWith').val()) {
			self.replaces.push({
				replaceText: $(this).find('.replaceText').val(),
				replaceWith: $(this).find('.replaceWith').val(),
				useRegex: $(this).find('.useRegex').prop('checked'),
				regexFlags: $(this).find('.regexFlags').val(),
				ignoreNowiki: $(this).find('.ignoreNowiki').prop('checked')
			});
		}
	});
	$('input[type="radio"], input[type="checkbox"]').not('.replaces input').each(function() {
		self.bool[this.id] = this.checked;
	});
	if (!$('#loadSettings option[value="'+name+'"]').length) {
		$('#loadSettings').append('<option value="'+name+'">'+name+'</option>');
	}
	$('#loadSettings').val(name);
	console.log(self);
};
JWB.setup.apply = function(name) {
	name = name && JWB.settings[name] ? name : 'default';
	var self = JWB.settings[name];
	$('#loadSettings').val(name);
	$('.replaces + .replaces').remove(); //reset find&replace inputs
	$('.replaces input[type="text"]').val('');
	$('.useRegex').each(function() {this.checked = false;});
	$('#pagelistPopup legend input').trigger('change'); //fix checked state of pagelist generating inputs
	for (var a in self.string) {
		$('#'+a).val(self.string[a]);
	}
	for (var b in self.bool) {
		$('#'+b).prop('checked', self.bool[b]);
	}
	var cur;
	for (var c=0;c<self.replaces.length;c++) {
		if ($('.replaces').length <= c) $('#moreReplaces')[0].click();
		cur = self.replaces[c];
		for (var d in cur) {
			if (cur[d] === true || cur[d] === false) {
				$('.replaces').eq(c).find('.'+d).prop('checked', cur[d]);
			} else {
				$('.replaces').eq(c).find('.'+d).val(cur[d]);
			}
		}
	}
	$('.useRegex, #containRegex,'+
        '#pagelistPopup legend input,'+
        '#viaJWB').trigger('change'); //reset disabled inputs
};
JWB.setup.getObj = function() {
	var settings = [];
	for (var i in JWB.settings) {
		if (i != '_blank') {
			settings.push('"' + i + '": ' + JSON.stringify(JWB.settings[i]));
		}
	}
	return '{\n\t' + settings.join(',\n\t') + '\n}';
};
JWB.setup.submit = function() {
	var name = prompt(JWB.msg('setup-prompt', JWB.msg('setup-prompt-save').plain()).plain(), $('#loadSettings').val());
	if (name === null) return;
	if ($.trim(name) === '') name = 'default';
	JWB.setup.save(name);
	JWB.status('setup-submit');
	JWB.api.call({
		'title': 'User:'+JWB.username+'/'+JWB.settingspage+'-settings.'+JWB.configext,
		'summary': JWB.msg(['setup-summary', mw.config.get('wgContentLanguage')]).plain(),
		'action': 'edit',
		'token': JWB.setup.edittoken || mw.user.tokens.get("csrfToken"),
		'text': JWB.setup.getObj(),
		'minor': true
	}, function(response) {
		JWB.status('done', true);
	});
};
//TODO: use blob uri
JWB.setup.download = function() {
	var name = prompt(JWB.msg('setup-prompt', JWB.msg('setup-prompt-save').plain()).plain(), $('#loadSettings').val());
	if (name === null) return;
	if ($.trim(name) === '') name = 'default';
	JWB.setup.save(name);
	JWB.status('setup-dload');
	var url = 'data:application/json;base64,' + btoa(JWB.setup.getObj());
	var elem = $('#download-anchor')[0];
	if (elem.hasOwnProperty('download')) { //use download attribute when possible, for its ability to specify a filename
		elem.href = url;
		elem.click();
		setTimeout(function() {elem.removeAttribute('href');}, 2000);
	} else { //fallback to iframes for browsers with no support for download="" attributes
		elem = $('#download-iframe')[0];
		elem.src = url.replace('application/json', 'application/octet-stream');
		setTimeout(function() {elem.removeAttribute('src');}, 2000);
	}
	JWB.status('done', true);
};
JWB.setup.import = function(e) {
	e.preventDefault();
	file = (e.dataTransfer||this).files[0];
	if ($(this).is('#import')) { //reset input
		this.outerHTML = this.outerHTML;
		$('#import').change(JWB.setup.import);
	}
	if (!window.hasOwnProperty('FileReader')) {
		alert(JWB.msg('old-browser').plain());
		JWB.status('old-browser', '<a target="_blank" href="'+JWB.index_php+'?title=Special:MyPage/'+JWB.settingspage+'-settings.'+JWB.configext+'">/'+JWB.settingspage+'-settings.'+JWB.configext+'</a>');
		return;
	}
	if (file.name.split('.').pop().toLowerCase() !== 'json') {
		alert(JWB.msg('not-json').plain());
		return;
	}
	JWB.status('Processing file');
	var reader = new FileReader();
	reader.readAsText(file);
	reader.onload = function(e) {
		JWB.status('done', true);
		try {
			//Exclusion regex based on https://stackoverflow.com/a/23589204/1256925
			//Removes all JS comments from the file, except when they're between quotes.
			var data = JSON.parse(reader.result.replace(/("[^"]*")|(\/\*[\w\W]*\*\/|\/\/[^\n]*)/g, function(match, g1, g2) {
				if (g1) return g1;
			}));
		} catch(e) {
			alert(JWB.msg('json-err', e.message, JWB.msg('json-err-upload').plain()).plain());
			console.log(e); //also log the error for further info
			return;
		}
		JWB.setup.extend(data);
	};
	JWB.status('Processing file');
};
JWB.setup.load = function() {
	JWB.status('setup-load');
	JWB.api.call({
		'action': 'query',
		'titles': 'User:' + (JWB.username||mw.config.get('wgUserName')) + '/'+JWB.settingspage+'-settings.'+JWB.configext,
		'prop': 'info|revisions',
		'intoken': 'edit',
		'rvprop': 'content',
		'indexpageids': true
	}, function(response) {
		JWB.status('done', true);
		if (JWB === false) return; //user is not allowed to use JWB
		var firstrun =  JWB.setup.edittoken ? false : true;
		var page = response.query.pages[response.query.pageids[0]];
		JWB.setup.edittoken = page.edittoken || mw.user.tokens.get("csrfToken");
		if (response.query.pageids[0] === '-1') {
			if (JWB.allowed && firstrun) JWB.setup.save('default'); //this runs when this callback returns after the init has loaded.
			return;
		}
		var data = page.revisions[0]['*'];
		if (!data) {
			if (JWB.allowed && firstrun) JWB.setup.save('default'); //this runs when this callback returns after the init has loaded.
			return;
		}
		try {
			data = JSON.parse(data);
		} catch(e) {
			alert(JWB.msg('json-err', e.message, JWB.msg('json-err-page', JWB.settingspage).plain()).plain() || 'JSON error:\n'+e.message);
			JWB.setup.save('default');
			return;
		}
		JWB.setup.extend(data);
	});
};
JWB.setup.extend = function(obj) {
	$.extend(JWB.settings, obj);
	if (!JWB.settings.hasOwnProperty('default')) {
		JWB.setup.save('default');
	}
	for (var i in JWB.settings) {
		if ($('#loadSettings').find('option[value="'+i+'"]').length) continue;
		$('#loadSettings').append('<option value="'+i+'">'+i+'</option>');
	}
	JWB.setup.apply($('#loadSettings').val());
};
JWB.setup['delete'] = function() {
	var name = $('#loadSettings').val();
	if (name === '_blank') return alert(JWB.msg('setup-delete-blank').plain());
	var temp = {};
	temp[name] = JWB.settings[name];
	JWB.setup.temp = $.extend({}, temp);
	delete JWB.settings[name];
	$('#loadSettings').val('default');
	if (name === 'default') {
		JWB.setup.apply('_blank');
		JWB.setup.save('default');
		JWB.status(JWB.msg('status-del-default', '<a href="javascript:JWB.setup.undelete();">'+JWB.msg('status-del-undo').plain()+'</a>').escape(), true);
	} else {
		$('#loadSettings').find('[value="'+name+'"]').remove();
		JWB.setup.apply();
		JWB.status(JWB.msg('status-del-setup', name, '<a href="javascript:JWB.setup.undelete();">'+JWB.msg('status-del-undo').plain()+'</a>').escape(), true);
	}
};
JWB.setup.undelete = function() {
	JWB.setup.extend(JWB.setup.temp);
	JWB.status('done', true);
};
/***** Main other functions *****/
//Show status message
JWB.status = function(action, done) {
	$('#summary, .editbutton').prop('disabled', !done); //Disable box when not done (so busy loading). re-enable when done loading.
	var status = JWB.msg('status-'+action).plain();
	if (status === false) return;
	var spinImg = '<svg class="wds-spinner" width="45" height="45" viewBox="0 0 45 45" xmlns="http://www.w3.org/2000/svg"><g transform="translate(22.5, 22.5)"><circle class="wds-spinner__stroke" fill="none" stroke-width="5" stroke-dasharray="125" stroke-dashoffset="125" stroke-linecap="round" r="20"></circle>/g&gt;</g></svg>';
	if (status) {
		if (!done) { //spinner if not done
			status += ' ' + spinImg;
		}
	} else {
		status = action;
	}
	$('#status').html(status);
	JWB.pageCount();
	return action=='done';
};
JWB.pageCount = function() {
	if (JWB.allowed === false||!$('#articleList').length) return;
	$('#articleList').val(($('#articleList').val()||'').replace(/(^[ \t]*$\n)*/gm, ''));
	JWB.list = $('#articleList').val().split('\n');
	var count = JWB.list.length;
	if (count === 1 && JWB.list[0] === '') count = 0;
	$('#totPages').html(count);
};
//Perform all specified find&replace actions
JWB.replace = function(input) {
	JWB.pageCount();
    var varOffset = JWB.list[0].indexOf('|') !== -1 ? JWB.list[0].indexOf('|') + 1 : 0;
    JWB.page.pagevar = JWB.list[0].substr(varOffset);
	$('.replaces').each(function() {
		var $this = $(this);
		var regexFlags = $this.find('.regexFlags').val();
		var replace = $this.find('.replaceText').val().replace(/\$x/gi, JWB.page.pagevar) || '$';
		var useRegex = replace === '$' || $this.find('.useRegex').prop('checked');
		if (useRegex && regexFlags.indexOf('_') !== -1) {
			replace = replace.replace(/[ _]/g, '[ _]'); //replaces any of [Space OR underscore] with a match for spaces or underscores.
			replace = replace.replace(/(\[[^\]]*)\[ _\]/g, '$1 _'); //in case a [ _] was placed inside another [] match, remove the [].
			regexFlags = regexFlags.replace('_', '');
		}
		var rWith = $this.find('.replaceWith').val().replace(/\$x/gi, JWB.page.pagevar).replace(/\\n/g,'\n');
		try {
			if ($this.find('.ignoreNowiki').prop('checked')) {
				if (!useRegex) {
					replace = replace.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
					regexFlags = 'g';
				}
				input = JWB.replaceParsed(input, replace, regexFlags, rWith);
			} else if (useRegex) {
				replace = new RegExp(replace, regexFlags);
				input = input.replace(replace, rWith);
			} else {
				input = input.split(replace).join(rWith); //global replacement without having to escape all special chars.
			}
		} catch(e) {
			JWB.stop();
			return JWB.status('regex-err', false);
		}
	});
	if ($('#enableRETF').prop('checked')) {
		input = RETF.replace(input);
	}
	return input;
};
//function to *only* replace the parsed wikitext
//It excludes comments (<!-- -->), and nowiki, math, source, syntaxhighlight, pre, code, gallery and timeline tags)
//Based on https://stackoverflow.com/a/23589204/1256925
JWB.replaceParsed = function(str, replace, flags, rwith) {
	var exclude = '(<!--[\\s\\S]*?-->|<(nowiki|math|source|syntaxhighlight|pre|gallery|timeline)[^>]*?>[\\s\\S]*?<\\/\\2>)';
	//add /i flag, to exclude the correct tags regardless of casing.
	//This won't matter for the actual replacing, as the specified flags are used there.
	var re = new RegExp(exclude + '|(' + replace + ')', flags.replace(/i|$/, 'i'));
	return str.replace(re, function(match, g1, g2, g3) {
		if (g3 !== undefined) { //continue to perform replacement if the match is the group that's supposed to be the match
			return match.replace(new RegExp(replace, flags), rwith);
		} else { //do nothing if the match is one of the excluded groups
			return match;
		}
	});
};

// Adds a line to the logs tab.
JWB.log = function(action, page, info) {
	var d = new Date();
	var pagee = encodeURIComponent(page);
	var extraInfo = '',
		actionStat = '';

	switch (action) {
		case 'edit':
			if (typeof info === 'undefined') {
				action = 'null-edit';
				actionStat = 'nullEdits';
				extraInfo = '';
			} else {
				extraInfo = ' (<a target="_blank" href="' + JWB.index_php + '?title=' + pagee + '&diff=' + info + '">diff</a>)';
				actionStat = 'pagesSaved';
			}
		break;
		case 'skip':
			actionStat = 'pagesSkipped';
		break;
		case 'move':
			extraInfo = ' to <a target="_blank" href="/wiki/'+encodeURIComponent(info)+'" title="' + info + '">' + info + '</a>';
		break;
		case 'protect':
			extraInfo = info;
		break;
	}

	actionStat = '#' + (actionStat || 'otherActions');
	$(actionStat).html(+$(actionStat).html() + 1);
	$('#actionlog tbody')
		.append('<tr class="actionlog-row">'+
			'<td class="actionlog-timestamp">' + String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0') + ':' + String(d.getSeconds()).padStart(2, '0') + '</td>'+
			'<td class="actionlog-action actionlog-action-' + action + '">' + action + '</td>'+
			'<td class="actionlog-page"><a target="_blank" href="/wiki/' + pagee + '" title="' + page + '">' + page + '</a>' + extraInfo + '</td>'+
		'</tr>');
	// @todo: Fix automatic scroll-to-bottom in log table not working.
	// .parents('.JWBtabc').scrollTop($('#actionlog-container').parents('.JWBtabc')[0].scrollHeight);
};

// Move to the next page in the list.
JWB.next = function(nextPage) {
	if ($.trim(nextPage) && !$('#skipAfterAction').prop('checked')) {
		nextPage = $.trim(nextPage) + '\n';
	} else {
		nextPage = '';
	}
	$('#articleList').val($('#articleList').val().replace(/^.*\n?/, nextPage));
	JWB.list.splice(0,1);
	JWB.pageCount();
	JWB.api.get(JWB.list[0].split('|')[0]);
};

// Stop everything, reset inputs and editor.
JWB.stop = function() {
	$('#stopbutton,'+
        '.editbutton,'+
        '#watchNow,'+
        '.JWBtabc[data-tab="2"] .editbutton,'+
        '#watchNow'+
        '.JWBtabc[data-tab="4"] button').prop('disabled', true);
	$('#startbutton, #articleList,'+
        '.JWBtabc[data-tab="1"] button,'+
        '#replacesPopup button,'+
        '#replacesPopup input,'+
        '.JWBtabc input, select').prop('disabled', false);
	$('#resultWindow').html('');
	$('#editBoxArea').val('');
	$('#currentpage').html(JWB.msg('editbox-currentpage', ' ').escape());
	JWB.pl.stop();
	JWB.status('done', true);
	JWB.isStopped = true;
};

// Start AutoWikiBrowsing.
JWB.start = function() {
	JWB.pageCount();
	if (JWB.list.length === 0 || (JWB.list.length === 1 && !JWB.list[0])) {
		alert(JWB.msg('no-pages-listed').plain());
	} else if ($('#skipNoChange').prop('checked') && !$('.replaceText').val() && !$('.replaceWith').val() && !$('#enableRETF').prop('checked')) {
		alert(JWB.msg('infinite-skip-notice').plain());
	} else {
		JWB.isStopped = false;
		if ($('#preparse').prop('checked') && !$('#articleList').val().match('#PRE-PARSE-STOP')) {
			$('#articleList').val($.trim($('#articleList').val()) + '\n#PRE-PARSE-STOP'); //mark where to stop pre-parsing
		} else {
			$('#preparse-reset').click();
		}
		$('#stopbutton, .editbutton, #watchNow, .JWBtabc[data-tab="2"] button, .JWBtabc[data-tab="4"] button').prop('disabled', false);
		$('#startbutton, #articleList, .JWBtabc[data-tab="1"] button, #replacesPopup button, #replacesPopup input, .JWBtabc input, select').prop('disabled', true);
		JWB.api.get(JWB.list[0].split('|')[0]);
	}
};

JWB.updateButtons = function() {
	if (!JWB.page.exists && $('#deletePage').is('.delete')) {
		$('#deletePage').removeClass('delete').addClass('undelete').html('Undelete');
		JWB.fn.blink('#deletePage'); //Indicate the button has changed
	} else if (JWB.page.exists && $('#deletePage').is('.undelete')) {
		$('#deletePage').removeClass('undelete').addClass('delete').html('Delete');
		JWB.fn.blink('#deletePage'); //Indicate the button has changed
	}
	if (!JWB.page.exists) {
		$('#movePage').prop('disabled', true);
	} else {
		$('#movePage').prop('disabled', false);
	}
	$('#watchNow').html( JWB.msg('watch-' + (JWB.page.watched ? 'remove' : 'add')).escape() );
};

/***** General functions *****/
// Clear all existing timers to prevent them from getting errors.
JWB.fn.clearAllTimeouts = function() {
	var i = setTimeout(function() {
		return void(0);
	}, 1000);
	for (var n=0;n<=i;n++) {
		clearTimeout(n);
		clearInterval(i);
	}
	console.log('Cleared all running intervals up to index',i);
};

// Filter an array to only contain unique values.
JWB.fn.uniques = function(arr) {
	var a = [];
	for (var i=0, l=arr.length; i<l; i++) {
		if (a.indexOf(arr[i]) === -1 && arr[i] !== '') {
			a.push(arr[i]);
		}
	}
	return a;
};

JWB.fn.blink = function(el,t) {
	t=t?t:500;
	$(el).prop('disabled', true)
	.children().animate({opacity:'0.1'},t-100)
	.animate({opacity:'1'},t)
	.animate({opacity:'0.1'},t-100)
	.animate({opacity:'1'},t);
	setTimeout("$('"+el+"').prop('disabled', false)",t*4-400);
};

JWB.fn.setSelection = function(el, start, end, dir) {
    dir = dir||'none'; // Default value.
    end = end||start; // If no end is specified, assume the caret is placed without creating text selection.
    if (el.setSelectionRange) {
        el.focus();
        el.setSelectionRange(start, end, dir);
    } else if (el.createTextRange) {
        var rng = el.createTextRange();
        rng.collapse(true);
        rng.moveStart('character', start);
        rng.moveEnd('character', end);
        rng.select();
    }
};

JWB.fn.scrollSelection = function(el, index) { //function to fix scrolling to selection - doesn't do that automatically.
	var newEl = document.createElement('textarea'); //create a new textarea to simulate the same conditions
	var elStyle = getComputedStyle(el);
	newEl.style.height = elStyle.height; //copy over size-influencing styles
	newEl.style.width = elStyle.width;
	newEl.style.lineHeight = elStyle.lineHeight;
	newEl.style.fontSize = elStyle.fontSize;
	newEl.value = el.value.substr(0,index);
	document.body.appendChild(newEl); //needs to be added to the HTML for the scrollHeight and clientHeight to work.
	if (newEl.scrollHeight != newEl.clientHeight) {
		el.scrollTop = newEl.scrollHeight - 2;
	} else {
		el.scrollTop = 0;
	}
	newEl.remove(); //clean up the mess I've made
};

/***** Init *****/
JWB.init = function() {
	JWB.setup.load();
	JWB.fn.clearAllTimeouts();
	if (!JWB.msg && JWB.lang != 'qqx') JWB.lang = 'en';

	var icons = {
		'bookmark': '<svg xmlns="http://www.w3.org/2000/svg" class="material-icons" enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24"><path d="M0,0h24v24H0V0z" fill="none"></path><path d="M17,5v12.97l-4.21-1.81L12,15.82l-0.79,0.34L7,17.97V5H17 M17,3H7C5.9,3,5,3.9,5,5v16l7-3l7,3V5C19,3.9,18.1,3,17,3L17,3z"></path></svg>',
		'delete': '<svg xmlns="http://www.w3.org/2000/svg" class="material-icons" enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24" class="material-icons"><path d="M0,0h24v24H0V0z" fill="none"></path><path d="M15,4V3H9v1H4v2h1v13c0,1.1,0.9,2,2,2h10c1.1,0,2-0.9,2-2V6h1V4H15z M17,19H7V6h10V19z M9,8h2v9H9V8z M13,8h2v9h-2V8z"></path></svg>',
		'save': '<svg xmlns="http://www.w3.org/2000/svg" class="material-icons" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none"></path><path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm2 16H5V5h11.17L19 7.83V19z"></path><circle cx="12" cy="15" r="3"></circle><path d="M6 6h9v4H6z"></path></svg>',
		'download': '<svg xmlns="http://www.w3.org/2000/svg" class="material-icons" enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24"><rect fill="none" height="24" width="24" x="0"/><path d="M18,15v3H6v-3H4v3c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2v-3H18z M17,11l-1.41-1.41L13,12.17V4h-2v8.17L8.41,9.59L7,11l5,5 L17,11z"/></svg>',
		'upload': '<svg xmlns="http://www.w3.org/2000/svg" class="material-icons" enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24"><rect fill="none" height="24" width="24" x="0"/><path d="M18,15v3H6v-3H4v3c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2v-3H18z M7,9l1.41,1.41L11,7.83V16h2V7.83l2.59,2.58L17,9l-5-5L7,9z"/></svg>',
		'refresh': '<svg xmlns="http://www.w3.org/2000/svg" class="material-icons" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M13 9v2h7V4h-2v2.74C16.53 5.07 14.4 4 12 4c-2.21 0-4.21.9-5.66 2.34S4 9.79 4 12c0 4.42 3.58 8 8 8 2.21 0 4.21-.9 5.66-2.34l-1.42-1.42C15.15 17.33 13.65 18 12 18c-3.31 0-6-2.69-6-6 0-1.65.67-3.15 1.76-4.24C8.85 6.67 10.35 6 12 6c2.21 0 4.15 1.21 5.19 3H13z"/></svg>',
		'add': '<svg xmlns="http://www.w3.org/2000/svg" class="material-icons" enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24"><rect fill="none" height="24" width="24"/><path d="M19,13h-6v6h-2v-6H5v-2h6V5h2v6h6V13z"/></svg>',
		'play': '<svg xmlns="http://www.w3.org/2000/svg" class="material-icons" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M10 8.64L15.27 12 10 15.36V8.64M8 5v14l11-7L8 5z"/></svg>',
		'stop': '<svg xmlns="http://www.w3.org/2000/svg" class="material-icons" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 19h-6V5h6v14zm-4-2h2V7h-2v10zm-4 2H5V5h6v14zm-4-2h2V7H7v10z"/></svg>',
		'skip': '<svg xmlns="http://www.w3.org/2000/svg" class="material-icons" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M6 18l8.5-6L6 6v12zm2-8.14L11.03 12 8 14.14V9.86zM16 6h2v12h-2z"/></svg>',
		'preview': '<svg xmlns="http://www.w3.org/2000/svg" class="material-icons" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px"><rect fill="none" height="24" width="24"/><path d="M19,3H5C3.89,3,3,3.9,3,5v14c0,1.1,0.89,2,2,2h14c1.1,0,2-0.9,2-2V5C21,3.9,20.11,3,19,3z M19,19H5V7h14V19z M13.5,13 c0,0.83-0.67,1.5-1.5,1.5s-1.5-0.67-1.5-1.5c0-0.83,0.67-1.5,1.5-1.5S13.5,12.17,13.5,13z M12,9c-2.73,0-5.06,1.66-6,4 c0.94,2.34,3.27,4,6,4s5.06-1.66,6-4C17.06,10.66,14.73,9,12,9z M12,15.5c-1.38,0-2.5-1.12-2.5-2.5c0-1.38,1.12-2.5,2.5-2.5 c1.38,0,2.5,1.12,2.5,2.5C14.5,14.38,13.38,15.5,12,15.5z"/></svg>',
		'diff': '<svg xmlns="http://www.w3.org/2000/svg" class="material-icons" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px"><rect fill="none" height="24" width="24"/><path d="M18,23H4c-1.1,0-2-0.9-2-2V7h2v14h14V23z M15,1H8C6.9,1,6.01,1.9,6.01,3L6,17c0,1.1,0.89,2,1.99,2H19c1.1,0,2-0.9,2-2V7 L15,1z M16.5,15h-6v-2h6V15z M16.5,9h-2v2h-2V9h-2V7h2V5h2v2h2V9z"/></svg>',
		'move': '<svg xmlns="http://www.w3.org/2000/svg" class="material-icons" enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24"><rect fill="none" height="24" width="24"/><path d="M22,8l-4-4v3H3v2h15v3L22,8z"/><path d="M2,16l4,4v-3h15v-2H6v-3L2,16z"/></svg>',
		'protect': '<svg xmlns="http://www.w3.org/2000/svg" class="material-icons" enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24"><path d="M0,0h24v24H0V0z" fill="none"/><path d="M18,8h-1V6c0-2.76-2.24-5-5-5S7,3.24,7,6v2H6c-1.1,0-2,0.9-2,2v10c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2V10 C20,8.9,19.1,8,18,8z M9,6c0-1.66,1.34-3,3-3s3,1.34,3,3v2H9V6z M18,20H6V10h12V20z M12,17c1.1,0,2-0.9,2-2s-0.9-2-2-2s-2,0.9-2,2 S10.9,17,12,17z"/></svg>',
		'done': '<svg xmlns="http://www.w3.org/2000/svg" class="material-icons" enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24"><path d="M0,0h24v24H0V0z" fill="none"/><polygon points="18.7,6 9.53,15.17 5.28,10.93 3.87,12.35 9.53,18 20.13,7.4"/></svg>',
		'page': '<svg xmlns="http://www.w3.org/2000/svg" class="material-icons" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M8 16h8v2H8zm0-4h8v2H8zm6-10H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"/></svg>',
		'block': '<svg xmlns="http://www.w3.org/2000/svg" class="material-icons" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM4 12c0-4.42 3.58-8 8-8 1.85 0 3.55.63 4.9 1.69L5.69 16.9C4.63 15.55 4 13.85 4 12zm8 8c-1.85 0-3.55-.63-4.9-1.69L18.31 7.1C19.37 8.45 20 10.15 20 12c0 4.42-3.58 8-8 8z"/></svg>',
		'info': '<svg xmlns="http://www.w3.org/2000/svg" class="material-icons" enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24"><path d="M0,0h24v24H0V0z" fill="none"/><path d="M12,7c-0.55,0-1,0.45-1,1s0.45,1,1,1s1-0.45,1-1S12.55,7,12,7z M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10 S17.52,2,12,2z M12,20c-4.41,0-8-3.59-8-8c0-4.41,3.59-8,8-8s8,3.59,8,8C20,16.41,16.41,20,12,20z M11,17h2v-6h-2V17z"/></svg>'
	};

	var findreplace = '<div class="replaces">'+
		'<div class="wds-input">'+
		'<label for="replace" id="label-replace">' + JWB.msg('label-replace').escape() + '</label>'+
			'<input type="text" class="wds-input__field replaceText" id="replace"/>'+
		'</div>'+
		'<div class="wds-input">'+
			'<label for="replace-with" id="label-replace-with">' + JWB.msg('label-rwith').escape() + '</label>'+
			'<input type="text" class="wds-input__field replaceWith" id="replace-with"/>'+
		'</div>'+
		'<div class="regexswitch">'+
			'<div class="wds-checkbox">'+
				'<input type="checkbox" class="useRegex" id="useRegex">'+
				'<label for="useRegex">'+JWB.msg('label-useregex').escape()+'</label>'+
				'<a class="re101" href="https://regex101.com/#javascript" target="_blank">?</a>'+
			'</div>'+
			'<label class="divisor" title="'+JWB.msg('tip-regex-flags').escape()+'" style="display:none;">'+
				JWB.msg('label-regex-flags')+' <input type="text" class="regexFlags" value="g"/>'+ //default: global replacement
			'</label>'+
			'<br/>'+
		'</div>'+
		'<div class="wds-checkbox">'+
			'<input type="checkbox" class="ignoreNowiki" id="ignoreNowiki">'+
			'<label for="ignoreNowiki" title="'+JWB.msg('tip-ignore-comment').escape()+'">'+JWB.msg('label-ignore-comment').escape()+'</label>'+
		'</div>'+
		'<div class="wds-checkbox">'+
			'<input type="checkbox" id="enableRETF">'+
			'<label for="enableRETF">'+JWB.msg('label-enable-RETF', '<a href="https://en.wikipedia.org/wiki/Project:AutoWikiBrowser/Typos" id="regex-link" target="_blank">'+JWB.msg('label-RETF').escape()+'</a>').plain()+'</label>'+
		'</div>'+
	'</div>';

	var NSList = '<select multiple name="namespace" id="namespacelist">';
	for (var i in JWB.ns) {
		if (parseInt(i) < 0) continue; //No Special: or Media: in the list
		NSList += '<option value="'+JWB.ns[i].id+'" selected>'+(JWB.ns[i]['*'] || '('+JWB.msg('namespace-main').escape()+')')+'</option>';
	}
	NSList += '</select>';

	/***** Interface *****/

	document.title = 'AutoWikiBrowser Script'+(document.title.split('-')[1] ? ' -'+document.title.split('-')[1] : '');
	$('.fandom-sticky-header').addClass('is-visible');
	$('.main-container, .wds-global-footer, .wds-community-header').remove();
	
	// Mobile friendly
	$('head meta[name=viewport]').remove();
	$('head').append('<meta name="viewport" content="width=device-width, initial-scale=1">');
	
	// Show the app
	$('body').append(
		'<div class="AWB-container" style="margin:46px 0 0 66px">'+
			'<main id="inputsWindow">'+
				'<div id="inputsBox">'+
					'<section id="tabs">'+
						'<nav class="tabholder">'+
							'<button class="JWBtab" data-tab="1">'+JWB.msg('tab-setup').escape()+'</button> '+
							'<button class="JWBtab active" data-tab="2">'+JWB.msg('tab-editing').escape()+'</button> '+
							'<button class="JWBtab" data-tab="3">'+JWB.msg('tab-skip').escape()+'</button> '+
							(JWB.sysop?'<button class="JWBtab" data-tab="4">'+JWB.msg('tab-other').escape()+'</button> ':'')+
							' <button class="JWBtab log" data-tab="5">'+JWB.msg('tab-log').escape()+'</button> '+
						'</nav>'+
						'<section class="JWBtabc" data-tab="1"></section>'+
						'<section class="JWBtabc active" data-tab="2"></section>'+
						'<section class="JWBtabc" data-tab="3"></section>'+
						(JWB.sysop?'<section class="JWBtabc" data-tab="4"></section>':'')+
						'<section class="JWBtabc log" data-tab="5"></section>'+
						'<footer id="status">Done</footer>'+
					'</section>'+
					'<aside id="articleBox">'+
						'<b>'+JWB.msg('pagelist-caption').escape()+'</b>'+
						'<textarea id="articleList"></textarea>'+
					'</aside>'+
					'<aside id="editBox">'+
						'<b>'+JWB.msg('editbox-caption').escape()+' - <span id="currentpage">'+JWB.msg('editbox-currentpage', ' ').escape()+'</span></b>'+
						'<textarea id="editBoxArea"></textarea>'+
					'</aside>'+
				'</div>'+
			'</main>'+
			'<article id="resultWindow"></article>'+
			'<footer id="stats">'+
				'<div class="footer-stat">' + icons.page + JWB.msg('stat-pages').escape() + '&nbsp;<span id="totPages">0</span></div>'+
				'<div class="footer-stat">' + icons.done + JWB.msg('stat-save').escape() + '&nbsp;<span id="pagesSaved">0</span></div>'+
				'<div class="footer-stat">' + icons.block + JWB.msg('stat-null').escape() + '&nbsp;<span id="nullEdits">0</span></div>'+
				'<div class="footer-stat">' + icons.skip + JWB.msg('stat-skip').escape() + '&nbsp;<span id="pagesSkipped">0</span></div>'+
				'<div class="footer-stat">' + icons.info + JWB.msg('stat-other').escape() + '&nbsp;<span id="otherActions">0</span></div>'+
			'</footer>'+
			'<div id="overlay" style="display:none;"></div>'+
			'<section class="JWBpopup" id="replacesPopup" style="display:none;">'+
			// @todo: add sticky header, place this button and add a close button too.
				'<button class="wds-button" id="moreReplaces">' + JWB.msg('button-more-fields').escape() + '</button>'+
				findreplace+
			'</section>'+
			'<section class="JWBpopup" id="pagelistPopup" style="display:none;">'+
				'<form action="javascript:JWB.pl.generate();"></form>'+
			'</section>'+
		'</div>'
	);

	$('.JWBtabc[data-tab="1"]').html(
		'<fieldset id="pagelist">'+
			'<legend>'+JWB.msg('label-pagelist').escape()+'</legend>'+
			'<button class="wds-button" id="removeDupes">'+JWB.msg('button-remove-dupes').escape()+'</button> '+
			'<button class="wds-button" id="sortArticles">'+JWB.msg('button-sort').escape()+'</button>'+
			'<button class="wds-button" id="preparse-reset" title="'+JWB.msg('tip-preparse-reset')+'">'+JWB.msg('preparse-reset').escape()+'</button>'+
			'<button class="wds-button" id="pagelistButton">'+JWB.msg('pagelist-generate').escape()+'</button>'+
			'<div class="wds-checkbox">'+
				'<input type="checkbox" id="preparse">'+
				'<label for="preparse" title="'+JWB.msg('tip-preparse').escape()+'">'+JWB.msg('preparse').escape()+'</label>'+
			'</div>'+
		'</fieldset>'+
		'<fieldset id="settings">'+
			'<legend>'+JWB.msg('label-settings').escape()+'</legend>'+
			'<label id="loadSettingsLabel">'+
				JWB.msg('load-settings').escape() + ' '+
				'<select id="loadSettings">'+
					'<option value="default" selected>default</option>'+
					'<option value="_blank">'+JWB.msg('blank-setup').escape()+'</option>'+
				'</select>'+
			'</label>'+
			'<button class="wds-button" id="saveAs" title="' + JWB.msg('tip-store-setup').escape() + '">'+
				icons.bookmark + '<span class="wds-button__label" id="saveAs-label">' + JWB.msg('store-setup').escape() + '</span>'+
			'</button>'+
			'<button class="wds-button" id="deleteSetup" title="' + JWB.msg('tip-delete-setup') + '">'+
				icons.delete + '<span class="wds-button__label" id="deleteSetup-label">' + JWB.msg('delete-setup').escape() + '</span>'+
			'</button>'+
			'<button class="wds-button" id="saveToWiki">'+
				icons.save + '<span class="wds-button__label" id="saveToWiki-label">' + JWB.msg('save-setup').escape() + '</span>'+
			'</button>'+
			'<button class="wds-button" id="download">'+
				icons.download + '<span class="wds-button__label" id="download-label">' + JWB.msg('download-setup').escape() + '</span>'+
			'</button>'+
			'<label class="wds-button" id="importLabel" title="' + JWB.msg('tip-import-setup').escape() + '">'+
				'<input type="file" id="import" accept=".json">'+
				icons.upload + '<span class="wds-button__label" id="import-label">' + JWB.msg('import-setup').escape() + '</span>'+
			'</label>'+
			'<button class="wds-button" id="updateSetups" title="' + JWB.msg('tip-update-setup', JWB.settingspage).escape() + '">'+
				icons.refresh + '<span class="wds-button__label" id="updateSetups-label">' + JWB.msg('update-setup').escape() + '</span>'+
			'</button>'+
			'<div id="downloads">'+
				'<a download="JWB-settings.json" target="_blank" id="download-anchor"></a>'+
				'<iframe id="download-iframe"></iframe>'+
			'</div>'+
		'</fieldset>'
	);
	$('.JWBtabc[data-tab="2"]').html(
		'<fieldset id="edit-settings-container">'+
			'<legend>'+JWB.msg('label-edit-settings').escape()+'</legend>'+
			'<div class="wds-checkbox">'+
				'<input type="checkbox" id="minorEdit" checked>'+
				'<label for="minorEdit" id="minor-edit">'+JWB.msg('minor-edit').escape()+'</label>'+
			'</div>'+
			'<div id="via-JWB-container">'+
				'<div class="wds-input">'+
					'<label for="summary">' + JWB.msg('edit-summary').escape() + '</label>'+
					'<input class="wds-input__field fullwidth" type="text" id="summary" maxlength="250">'+
				'</div>'+
				'<div class="wds-checkbox">'+
					'<input type="checkbox" id="viaJWB" checked">'+
					'<label for="viaJWB" id="viaJWB-label">'+JWB.msg('tip-via-JWB').escape()+'</label>'+
				'</div>'+
			'</div>'+
			'<select id="watchPage">'+
				'<option value="watch">'+JWB.msg('watch-watch').escape()+'</option>'+
				'<option value="unwatch">'+JWB.msg('watch-unwatch').escape()+'</option>'+
				'<option value="nochange" selected>'+JWB.msg('watch-nochange').escape()+'</option>'+
				'<option value="preferences">'+JWB.msg('watch-preferences').escape()+'</option>'+
			'</select>'+
			'<button class="wds-button" id="watchNow" disabled accesskey="w" title="['+JWB.tooltip+'w]">'+
				icons.add + '<span class="wds-button__label">' + JWB.msg('watch-add').escape() + '</span>'+
			'</button>'+
			(JWB.bot?
				'<div class="wds-checkbox">'+
					'<input type="checkbox" id="autosave">'+
					'<label for="autosave">' + JWB.msg('auto-save').escape()+
						'<span title="' + JWB.msg('tip-save-interval').escape() + '" class="divisor">'+
							JWB.msg('save-interval', '<input type="number" min="0" value="0" id="throttle" disabled>').escape()+
						'</span>'+
					'</label>'+
				'</div>'+
			'</fieldset>'
		:'</fieldset>')+
		'<fieldset id="find-replace-container">'+
			'<legend>' + JWB.msg('label-find-replace').escape() + '</legend>'+
			'<button class="wds-button" id="replacesButton">'+
				icons.add + '<span class="wds-button__label">' + JWB.msg('button-open-popup').escape() + '</span>'+
			'</button>'+
			findreplace+
			'<button class="wds-button" id="refreshRETF" title="' + JWB.msg('tip-refresh-RETF').escape() + '">'+
				icons.refresh + '<span class="wds-button__label">' + JWB.msg('label-refresh-RETF').escape() + '</span>'+
			'</button>'+
		'</fieldset>'+
		'<fieldset id="edit-actions-container">'+
			'<legend>'+JWB.msg('label-edit-actions').escape()+'</legend>'+
			'<button class="wds-button" id="startbutton" accesskey="a" title="['+JWB.tooltip+'a]">'+
				icons.play + '<span class="wds-button__label">' + JWB.msg('editbutton-start').escape() + '</span>'+
			'</button>'+
			'<button class="wds-button" id="stopbutton" disabled accesskey="q" title="['+JWB.tooltip+'q]">'+
				icons.stop + '<span class="wds-button__label">' + JWB.msg('editbutton-stop').escape() + '</span>'+
			'</button>'+
			'<button class="wds-button editbutton" id="skipButton" disabled accesskey="n" title="['+JWB.tooltip+'n]">'+
				icons.skip + '<span class="wds-button__label">' + JWB.msg('editbutton-skip').escape() + '</span>'+
			'</button>'+
			'<button class="wds-button editbutton" id="submitButton" disabled accesskey="s" title="['+JWB.tooltip+'s]">'+
				icons.save + '<span class="wds-button__label">' + JWB.msg('editbutton-save').escape() + '</span>'+
			'</button>'+
			'<button class="wds-button editbutton" id="previewButton" disabled accesskey="p" title="['+JWB.tooltip+'p]">'+
				icons.preview + '<span class="wds-button__label">' + JWB.msg('editbutton-preview').escape() + '</span>'+
			'</button>'+
			'<button class="wds-button editbutton" id="diffButton" disabled accesskey="d" title="['+JWB.tooltip+'d]">'+
				icons.diff + '<span class="wds-button__label">' + JWB.msg('editbutton-diff').escape() + '</span>'+
			'</button>'+
		'</fieldset>'
	);
	$('.JWBtabc[data-tab="3"]').html(
		'<fieldset id="redirects-container">'+
			'<legend>' + JWB.msg('label-redirects').escape() + '</legend>'+
			'<div class="oo-ui-radioInputWidget oo-ui-widget-enabled">'+
				'<input type="radio" class="redirects" value="follow" name="redir" id="redir-follow"><span></span>'+
				'<label for="redir-follow" title="' + JWB.msg('tip-redirects-follow').escape() + '">' + JWB.msg('redirects-follow').escape() + '</label>'+
			'</div>'+
			'<div class="oo-ui-radioInputWidget oo-ui-widget-enabled">'+
				'<input type="radio" class="redirects" value="skip" name="redir" id="redir-skip"><span></span>'+
                '<label for="redir-skip" title="' + JWB.msg('tip-redirects-skip').escape() + '">' + JWB.msg('redirects-skip').escape() + '</label>'+
			'</div>'+
			'<div class="oo-ui-radioInputWidget oo-ui-widget-enabled">'+
				'<input type="radio" class="redirects" value="edit" name="redir" id="redir-edit" checked><span></span>'+
				'<label for="redir-edit" title="' + JWB.msg('tip-redirects-edit').escape() + '">' + JWB.msg('redirects-edit').escape() + '</label>'+
			'</div>'+
		'</fieldset>'+
		'<fieldset id="skip-container">'+
			'<legend>' + JWB.msg('label-skip-when').escape() + '</legend>'+
			'<div class="radio-group">'+
			'<div class="oo-ui-radioInputWidget oo-ui-widget-enabled">'+
					'<input type="radio" id="exists-yes" name="exists" value="yes"><span></span>'+
					'<label>' + JWB.msg('skip-exists-yes').escape() + '</label>'+
				'</div>'+
				'<div class="oo-ui-radioInputWidget oo-ui-widget-enabled">'+
					'<input type="radio" id="exists-no" name="exists" value="no" checked><span></span>'+
					'<label>' + JWB.msg('skip-exists-no').escape() + '</label>'+
				'</div>'+
				'<div class="oo-ui-radioInputWidget oo-ui-widget-enabled">'+
					'<input type="radio" id="exists-neither" name="exists" value="neither"><span></span>'+
					'<label>' + JWB.msg('skip-exists-neither').escape() + '</label>'+
				'</div>'+
			'</div>'+
			'<div class="checkbox-group">'+
				'<div class="wds-checkbox">'+
					'<input type="checkbox" id="skipNoChange">'+
					'<label for="skipNoChange">' + JWB.msg('skip-no-change').escape() + '</label>'+
				'</div>'+
				(JWB.sysop?
					'<div class="wds-checkbox">'+
						'<input type="checkbox" id="skipAfterAction" checked>'+
						'<label for="skipAfterAction">' + JWB.msg('skip-after-action').escape() + '</label>'+
					'</div>':'')+
			'</div>'+
			'<div class="textfield-group">'+
				'<div class="wds-input">'+
					'<label for="skipContains">' + JWB.msg('skip-contains').escape() + '</label>'+
					'<input class="wds-input__field fullwidth" type="text" id="skipContains">'+
				'</div>'+
				'<div class="wds-input">'+
					'<label for="skipNotContains">' + JWB.msg('skip-not-contains').escape() + '</label>'+
					'<input class="wds-input__field fullwidth" type="text" id="skipNotContains">'+
				'</div>'+
			'</div>'+
		'<div class="regexswitch">'+
			'<div class="wds-checkbox">'+
				'<input type="checkbox" id="containRegex">'+
				'<label for="containRegex">' + JWB.msg('label-useregex').escape() + '</label>'+
				'<a class="re101" href="https://regex101.com/#javascript" target="_blank">?</a>'+
				'<label class="divisor" title="'+JWB.msg('tip-regex-flags').escape()+'" style="display:none;">'+
					JWB.msg('label-regex-flags').escape()+' <input type="text" id="containFlags"/>'+
				'</label>'+
			'</div>'+
		'</div>'+
		'</fieldset>'
	);
	if (JWB.sysop) $('.JWBtabc[data-tab="4"]').html(
		'<fieldset id="move-options-container">'+
			'<legend>' + JWB.msg('move-header').escape()+ '</legend>'+
			'<div class="wds-checkbox">'+
				'<input type="checkbox" id="suppressRedir">'+
				'<label for="suppressRedir">' + JWB.msg('move-redir-suppress').escape() + '</label>'+
				'</div>'+
			'<span class="also-move headline">' + JWB.msg('move-also').escape() + '</span>'+
			'<div class="wds-checkbox">'+
				'<input type="checkbox" id="movetalk">'+
				'<label for="movetalk">' + JWB.msg('move-talk-page').escape() + '</label> '+
			'</div>'+
			'<div class="wds-checkbox">'+
				'<input type="checkbox" id="movesubpage">'+
				'<label for="movesubpage">' + JWB.msg('move-subpage').escape() + '</label>'+
			'</div>'+
			'<div class="wds-input">'+
				'<label for="moveTo">' + JWB.msg('move-new-name').escape() + '</label>'+
				'<input type="text" class="wds-input__field" id="moveTo">'+
			'</div>'+
		'</fieldset>'+
		'<fieldset id="protect-options-container">'+
		'<legend>' + JWB.msg('protect-header').escape() + '</legend>'+
			'<span class="edit headline">' + JWB.msg('protect-edit').escape() + '</span>'+
			'<select id="editProt">'+
				'<option value="all" selected>' + JWB.msg('protect-none').escape() + '</option>'+
				'<option value="autoconfirmed">' + JWB.msg('protect-autoconf').escape() + '</option>'+
				'<option value="sysop">' + JWB.msg('protect-sysop').escape() + '</option>'+
			'</select> '+
			'<span class="protect headline">' + JWB.msg('protect-move').escape() + '</span>'+
			'<select id="moveProt">'+
				'<option value="all" selected>' + JWB.msg('protect-none').escape() + '</option>'+
				'<option value="autoconfirmed">' + JWB.msg('protect-autoconf').escape() + '</option>'+
				'<option value="sysop">' + JWB.msg('protect-sysop').escape() + '</option>'+
			'</select> '+
			'<div class="wds-input">'+
				'<label for="protectExpiry">' + JWB.msg('protect-expiry').escape() + '</label>'+
				'<input type="text" class="wds-input__field" id="protectExpiry"/>'+
			'</div>'+
		'</fieldset>'+
		'<fieldset id="page-actions-container">'+
			'<legend>' + JWB.msg('page-actions-header').escape() + '</legend>'+
			'<button class="wds-button" id="movePage" disabled accesskey="m" title="['+JWB.tooltip+'m]">'+
				icons.move + JWB.msg('editbutton-move').escape()+
			'</button> '+
			'<button class="wds-button" id="deletePage" disabled accesskey="x" title="['+JWB.tooltip+'x]">'+
				icons.delete + JWB.msg('editbutton-delete').escape()+
			'</button> '+
			'<button class="wds-button" id="protectPage" disabled accesskey="z" title="['+JWB.tooltip+'z]">'+
				icons.protect + JWB.msg('editbutton-protect').escape()+
			'</button> '+
			'<button class="wds-button" id="skipPage" disabled title="['+JWB.tooltip+'n]">'+
				icons.skip + JWB.msg('editbutton-skip').escape()+
			'</button>'+
		'</fieldset>'
	);
	$('.JWBtabc[data-tab="5"]').html(
		'<div id="actionlog-container">'+
			'<table id="actionlog">'+
				'<thead>'+
					'<tr>'+
						'<th>' + JWB.msg('log-time-header').escape() + '</th>'+
						'<th>' + JWB.msg('log-action-header').escape() + '</th>'+
						'<th>' + JWB.msg('log-page-header').escape() + '</th>'+
					'</tr>'+
				'</thead>'+
				'<tbody>'+
				'</tbody>'+
			'</table>'+
		'</div>'
	);
	$('#pagelistPopup form').html(
		'<div id="pageListPopup-container">'+
			'<div id="ns-filter" title="' + JWB.msg('tip-ns-select').escape() + '">' + JWB.msg('label-ns-select').escape() + NSList + '</div>'+
			'<div id="pageList-fieldsets">'+
				'<fieldset>'+
					'<legend>'+
						'<div class="wds-checkbox">'+
							'<input type="checkbox" id="categorymembers" name="categorymembers" value="cm">'+
							'<label for="categorymembers">' + JWB.msg('legend-cm').escape() + '</label>'+
						'</div>'+
					'</legend>'+
					'<div class="wds-input">'+
						'<label for="cmtitle" title="' + JWB.msg('cnpnr-title').escape() + '">' + JWB.msg('label-cm').escape() + '</label>'+
						'<input type="text" name="cmtitle" class="wds-input__field" id="cmtitle">'+
					'</div>'+
					'<span class="group-label" id="include-checkboxes-label">' + JWB.msg('cm-include').escape() + '</span>'+
					'<div class="checkbox-group is-vertical">'+
						'<div class="wds-checkbox">'+
							'<input type="checkbox" id="cmtype-page" name="cmtype" value="page" checked>'+
							'<label for="cmtype-page">' + JWB.msg('cm-include-pages').escape() + '</label>'+
						'</div>'+
						'<div class="wds-checkbox">'+
							'<input type="checkbox" id="cmtype-subcg" name="cmtype" value="subcat" checked>'+
							'<label for="cmtype-subcg">' + JWB.msg('cm-include-subcgs').escape() + '</label>'+
						'</div>'+
						'<div class="wds-checkbox">'+
							'<input type="checkbox" id="cmtype-file" name="cmtype" value="file" checked>'+
							'<label for="cmtype-file">' + JWB.msg('cm-include-files').escape() + '</label>'+
						'</div>'+
					'</div>'+
				'</fieldset>'+
				'<fieldset>'+
					'<legend>'+
					'<div class="wds-checkbox">'+
							'<input type="checkbox" name="linksto" id="linksto">'+
							'<label for="linksto">' + JWB.msg('legend-linksto').escape() + '</label>'+
						'</div>'+
					'</legend>'+
					'<div class="wds-input">'+
						'<label for="linksto-title">' + JWB.msg('label-linksto').escape() + '</label>'+
						'<input type="text" name="title" class="wds-input__field" id="linksto-title">'+
					'</div>'+
					'<span class="headline" id="include-headline">' + JWB.msg('links-include').escape() + '</span>'+
					'<div class="checkbox-group is-vertical">'+
						'<div class="wds-checkbox">'+
							'<input type="checkbox" id="backlinks" name="backlinks" value="bl" checked>'+
							'<label for="backlinks">' + JWB.msg('links-include-links').escape() + '</label>'+
						'</div>'+
						'<div class="wds-checkbox">'+
							'<input type="checkbox" id="embeddedin" name="embeddedin" value="ei">'+
							'<label for="embeddedin">' + JWB.msg('links-include-templ').escape() + '</label>'+
						'</div>'+
						'<div class="wds-checkbox">'+
							'<input type="checkbox" id="imageusage" name="imageusage" value="iu">'+
							'<label for="imageusage">' + JWB.msg('links-include-files').escape() + '</label>'+
						'</div>'+
					'</div>'+
					'<span class="headline" id="redirects-headline">' + JWB.msg('links-redir').escape() + '</span>'+
					'<div class="radio-group is-vertical">'+
						'<div class="oo-ui-radioInputWidget oo-ui-widget-enabled">'+
							'<input type="radio" id="rfilter-redir" name="filterredir" value="redirects"><span></span>'+
							'<label for="rfilter-redir">' + JWB.msg('links-redir-redirs').escape() + '</label>'+
						'</div>'+
						'<div class="oo-ui-radioInputWidget oo-ui-widget-enabled">'+
							'<input type="radio" id="rfilter-nonredir" name="filterredir" value="nonredirects"><span></span>'+
							'<label for="rfilter-nonredir">' + JWB.msg('links-redir-noredirs').escape() + '</label>'+
						'</div>'+
						'<div class="oo-ui-radioInputWidget oo-ui-widget-enabled">'+
							'<input type="radio" id="rfilter-all" name="filterredir" value="all" checked><span></span>'+
							'<label for="rfilter-all">' + JWB.msg('links-redir-all').escape() + '</label>'+
						'</div>'+
					'</div>'+
					'<div class="wds-checkbox">'+
						'<input type="checkbox" name="redirect" value="true" checked id="linksto-redir">'+
						'<label for="linksto-redir" title="'+JWB.msg('tip-link-redir').escape()+'">' + JWB.msg('label-link-redir').escape() + '</label>'+
					'</div>'+
				'</fieldset>'+
				'<fieldset>'+
					'<legend>'+
						'<div class="wds-checkbox">'+
							'<input type="checkbox" id="prefixsearch" name="prefixsearch" value="ps">'+
							'<label for="prefixsearch">' + JWB.msg('legend-ps').escape() + '</label>'+
						'</div>'+
					'</legend>'+
					'<div class="wds-input">'+
						'<label for="pssearch">' + JWB.msg('label-ps').escape() + '</label>'+
						'<input type="text" name="pssearch" class="wds-input__field" id="pssearch">'+
					'</div>'+
				'</fieldset>'+
				'<fieldset>'+
					'<legend>'+
						'<div class="wds-checkbox">'+
							'<input type="checkbox" id="watchlistraw" name="watchlistraw" value="wr">'+
							'<label for="watchlistraw">' + JWB.msg('legend-wr').escape() + '</label>'+
						'</div>'+
					'</legend>'+
					'<span id="watchlist-desc">' + JWB.msg('label-wr').escape() + '</span>'+
				'</fieldset>'+
				'<fieldset>'+
					'<legend>'+
						'<div class="wds-checkbox">'+
							'<input type="checkbox" id="proplinks" name="links" value="pl">'+
							'<label for="proplinks">' + JWB.msg('legend-pl').escape() + '</label>'+
						'</div>'+
					'</legend>'+
					'<div class="wds-input">'+
						'<label for="pltitles" title="' + JWB.msg('tip-pl').escape() + '">' + JWB.msg('label-pl').escape()+'</label>'+
						'<input type="text" name="titles" class="wds-input__field" id="pltitles">'+
					'</div>'+
				'</fieldset>'+
				'<button type="submit" class="wds-button">' + JWB.msg('pagelist-generate').escape() + '</button>'+
			'</div>'+
		'</div>'
	);

	$('body').addClass('AutoWikiBrowser'); //allow easier custom styling of JWB.

	/***** Setup *****/
	JWB.setup.save('_blank'); //default setup
	if (JWB.settings.hasOwnProperty('default')) {
		JWB.setup.apply();
	} else if (JWB.setup.hasOwnProperty('edittoken')) {
		JWB.setup.save('default');
	}
	JWB.setup.extend({});

	/***** Event handlers *****/
	// Alert user when leaving the tab, to prevent accidental closing.
	onbeforeunload = function() {
		return "Closing this tab will cause you to lose all progress.";
	};

	ondragover = function(e) {
		e.preventDefault();
	};

	$('.JWBtab').click(function() {
		$('.active').removeClass('active');
		$(this).addClass('active');
		$('.JWBtabc[data-tab="'+$(this).attr('data-tab')+'"]').addClass('active');
	});

	function showRegexFlags() {
		// >>this<< is the element that's triggered
		$(this).parent().nextAll('label').toggle(this.checked);
	}

	$('body').on('change', '#useRegex, #containRegex, .useRegex', showRegexFlags);

	$('#preparse-reset').click(function() {
		$('#articleList').val($('#articleList').val().replace(/#PRE-PARSE-STOP/g,'').replace(/\n\n/g, '\n'));
	});

	$('#saveAs').click(function() {
		JWB.setup.save();
	});

	$('#loadSettings').change(function() {
		JWB.setup.apply(this.value);
	});

	$('#download').click(JWB.setup.download);
	$('#saveToWiki').click(JWB.setup.submit);
	$('#import').change(JWB.setup.import);
	ondrop = JWB.setup.import;
	$('#updateSetups').click(JWB.setup.load);
	$('#deleteSetup').click(JWB.setup['delete']);

	if (window.RETF) $('#refreshRETF').click(RETF.load);

	$('#replacesButton, #pagelistButton').click(function() {
		var popup = this.id.slice(0, -6); //omits the 'Button' in the id by cutting off the last 6 characters
		$('#'+popup+'Popup, #overlay').show();
	});

	$('#overlay').click(function() {
		$('#replacesPopup, #pagelistPopup, #overlay').hide();
	});

	$('#moreReplaces').click(function() {
		$('#replacesPopup').append(findreplace);
	});

	$('#replacesPopup').on('keydown', '.replaces:last', function(e) {
		if (e.which === 9) $('#moreReplaces')[0].click();
	});

	$('#pagelistPopup legend input').change(function() {
		//remove disabled attr when checked, add when not.
		$(this).parents('fieldset').find('input').not('legend input').prop('disabled', !this.checked);
		$(this).parents('fieldset').prop('disabled', !this.checked);
	}).trigger('change');

	$('#resultWindow').on('click', 'tr[data-line]:not(.lineheader) *', function(e) {
		var line = +$(e.target).closest('tr[data-line]').data('line');
		var index = $('#editBoxArea').val().split('\n').slice(0, line-1).join('\n').length;
		$('#editBoxArea')[0].focus();
		JWB.fn.setSelection($('#editBoxArea')[0], index+1);
		JWB.fn.scrollSelection($('#editBoxArea')[0], index);
	});

	$('#removeDupes').click(function() {
		$('#articleList').val(JWB.fn.uniques($('#articleList').val().split('\n')).join('\n'));
		JWB.pageCount();
	});

	$('#sortArticles').click(function() {
		$('#articleList').val($('#articleList').val().split('\n').sort().join('\n'));
		JWB.pageCount();
	});

	$('#watchNow').click(JWB.api.watch);
	$('#autosave').change(function() {
		$('#throttle').prop('disabled', !this.checked);
	});

	$('#viaJWB').change(function() {
		$('#summary').parent('.wds-input')
			.toggleClass('viaJWB', this.checked)
			.attr('maxlength', 250 - this.checked * 10); // 233 for true, 250 for false. ` (via JWB)` is 10 chars long.
			// @todo: rather than toggling a class, toggle a new element with
			// the text so it's accesible and easier to customize.
	});

	$('#startbutton').click(JWB.start);
	$('#stopbutton').click(JWB.stop);
	$('#submitButton').click(JWB.api.submit);
	$('#previewButton').click(JWB.api.preview);
	$('#diffButton').click(JWB.api.diff);

	$('#skipButton, #skipPage').click(function() {
		JWB.log('skip', JWB.list[0].split('|')[0]);
		JWB.next();
	});

	if (JWB.sysop) {
		$('#movePage').click(function() {
			if ($('#moveTo').val().length === 0) {
				return alert(JWB.msg('alert-no-move').escape());
			}
			JWB.api.move();
		});
		$('#protectPage').click(JWB.api.protect);
		$('#deletePage').click(JWB.api['delete']);
	}
};

// Disable JWB altogether when it's loaded on a page other than
// Project:AutoWikiBrowser/Script. This script shouldn't be loaded on any other
// page in the first place.
if (JWB.allowed === false) JWB = false;
// </nowiki>