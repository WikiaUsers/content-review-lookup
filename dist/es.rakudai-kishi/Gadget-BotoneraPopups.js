/*<source lang="javascript">*/
/* BotoneraPopups - v3.2
 * A popup (in-page) with links to useful actions will appear when hovering a link while the CTRL key is pressed.
 * (C) 2010-2017 Jesús Martínez Novo [[User:Ciencia_Al_Poder]]
 * This program is free software; you can redistribute it and/or modify
 *   it under the terms of the GNU General Public License as published by
 *   the Free Software Foundation; either version 2 of the License, or
 *   (at your option) any later version
 */
(function( $, extend, mw ) {
	'use strict';
var _version = '3.2', // this version
	_enabled = false, // Track event state
	_elem = null, // popup jQuery element
	_article = null, // current article object
	_url = null, // current url
	_alternateUrl = null, // url from article/talk page switch
	_currentViewTalk = false, // La vista actual es de la discusión?
	_visible = false, // Whether the popup is visible or not
	_options = {}, // Store of internal options
	_rollbackSummary = null, // Stored rollback summary
	_hideRollback = false, // Stored bot=1 option from rollback
	_displayOnKeyDown = false, // Display popup on keydown event
	_lastHoverElement = null, // Stored last hovered element so we can display the popup on keydown
	_ignoreKeyDownEvent = false, // Ignore keydown if we haven't hovered any other element
	_privileged = false, // User is privileged (blockip, delete)
	_wikisiteinfo = {namespaces: {}, namespacealiases: [], specialpagealiases: []}, // wikisiteinfo
	_displayOnKey = {ctrlKey: true, altKey: false, shiftKey: false}, // required key to display popup
	_uilang = {}, // Localized messages for UI
	_rollbackSummaryPrefix = 'Reverted edits by [[Special:Contributions/$1|$1]]: ',
	_enable = function() {
		if (_enabled) return;
		_enabled = true;
		_buildDefaultWikiSiteInfo();
		mw.loader.using(['user.defaults', 'user.options'], _getUserOptions);
		if (!_elem) {
			_elem = $('<div id="botonerapopup" style="display:none;"></div>');
			$(document.body).append(_elem);
			_elem.bind('click', _clickHandler);
		}
		_privileged = (mw.config.get('wgUserGroups') && $.inArray('sysop', mw.config.get('wgUserGroups')) != -1);
		$(document.body).bind('mouseover.BotoneraPopups', _checkMouseOver);
		if (_displayOnKeyDown) {
			$(document.body).bind('keydown.BotoneraPopups', _checkKeyDown);
		}
	},
	_disable = function() {
		if (!_enabled) return;
		$(document.body).unbind('mouseover.BotoneraPopups', _checkMouseOver).unbind('keydown.BotoneraPopups', _checkKeyDown);
		_enabled = false;
	},
	_checkKeyDown = function(e) {
		// Do not attempt to trigger event if the mouse hasn't hovered a new element
		if (!_ignoreKeyDownEvent && _lastHoverElement) {
			_checkMouseOver($.extend({}, e, {target: _lastHoverElement})); // Fix target
		}
		_ignoreKeyDownEvent = true;
	},
	_checkMouseOver = function(e) {
		var a, url, server, pos, title;
		if (_displayOnKeyDown) {
			_lastHoverElement = e.target;
			_ignoreKeyDownEvent = false;
		}
		// Required keys for displaying popup
		for (var keyname in _displayOnKey) {
			if (_displayOnKey[keyname] && !e[keyname]) {
				return;
			}
		}
		// Return if we're inside the popup
		if (_visible) {
			var offset = _elem.offset();
			if (e.pageX >= offset.left && e.pageX <= offset.left + _elem.outerWidth() &&
				e.pageY >= offset.top && e.pageY <= offset.top + _elem.outerHeight()) {
				return;
			}
		}
		a = e.target;
		if (a.tagName.toLowerCase() != 'a') {
			a = $(a).closest('a').get(0);
		}
		if (!a) return;
		// Check for an internal URL
		url = a.toString();
		server = mw.config.get('wgServer');
		pos = server.indexOf('//');
		// MW 1.18 Compatibility
		if (pos > 0) {
			server = server.substr(pos);
		}
		pos = url.indexOf('//');
		if (pos > 0) {
			url = url.substr(pos);
		}
		if (url.indexOf(server) !== 0) return;
		pos = url.indexOf('#');
		if (pos != -1) {
			url = url.substr(0, pos);
		}
		title = '';
		pos = server.length+mw.config.get('wgArticlePath').indexOf('$1');
		if (url.length > pos && url.substr(0, pos) == server+mw.config.get('wgArticlePath').substr(0, pos-server.length)) {
			var qpos = url.indexOf('?');
			if (qpos != -1) {
				title = decodeURIComponent( url.substring(pos, qpos) );
			} else {
				title = decodeURIComponent( url.substr(pos) );
			}
		} else if (url.indexOf(server+mw.config.get('wgScript')) === 0) {
			var params = _getUrlParams(url);
			if (params.title){
				title = params.title;
			}
		}
		if (title === '') return;
		_article = new WikiArticle(_wikisiteinfo, title);
		_currentViewTalk = _article.isTalk;
		_url = url;
		_alternateUrl = null;
		_render();
		_show(a);
	},
	_getUrlParams = function(url) {
		var params = {},
			qpos = url.indexOf('?'),
			hashpos, ps;
		if (qpos == -1) {
			return params;
		}
		hashpos = url.indexOf('#');
		if (hashpos != -1) {
			url = url.substr(0,hashpos);
		}
		url = url.substr(qpos+1);
		for (var i=0, p=url.split('&'); i < p.length; i++) {
			ps = p[i].split('=');
			params[decodeURIComponent(ps[0])] = decodeURIComponent(ps[1]);
		}
		return params;
	},
	_clickHandler = function(e) {
		var target = e.target, idx, arr;
		if (target.tagName.toLowerCase() == 'a') {
			idx = target.href.indexOf('#');
			if (idx != -1) {
				arr = target.href.substr(idx+1).split('/');
				if (arr.length > 1 && arr[0] === 'botonera') {
					switch(arr[1]) {
						case 'changeUrl':
							_changeUrl();
							break;
						case 'hide':
							_hide();
							break;
						case 'toggleView':
							_toggleView();
							break;
						case 'toggleHideRollback':
							_toggleHideRollback();
							break;
						case 'setRollbackSummary':
							_setRollbackSummary();
							break;
						case 'toggle':
							if (arr.length == 3) {
								_toggleOption(arr[2]);
							}
							break;
					}
					return false;
				}
			}
		}
	},
	_link = function(href, contents, classname) {
		if (typeof classname == 'boolean') {
			classname = ((classname ? '' : 'un') + 'checked');
		}
		if (contents.length > 1 && contents[0] == '#') {
			contents = _getMsg(contents.substr(1));
		}
		return ' <a href="'+href+'"'+(classname ? ' class="'+classname+'"' : '')+'>'+contents+'</a>';
	},
	_render = function() {
		var params = _getUrlParams(_url),
			ns = _article.articlens,
			cont = '',
			pdiffonly, ppreview, aNSText;
		_elem.html('');
		if (ns.id == -1 && _article.realspecial == 'Upload' && params.wpDestFile) {
			// Turn links to upload missing files into links to the original file
			_article = new WikiArticle(_wikisiteinfo, 'File:'+params.wpDestFile);
			_render();
			return;
		}
		if (ns.id == -1 && _article.realspecial == 'Contributions' && _article.pagename.indexOf('/') != -1) {
			// Turn links to Special:Contributions into links to user pages
			_article = new WikiArticle(_wikisiteinfo, 'User:'+_article.pagename.substring(_article.pagename.indexOf('/')+1));
			_render();
			return;
		}
		if (ns.id < 0){
			// Special pages
			cont += '<div class="head">' +
				_link(_article.getFullUrl(),_article.toString(),'target') +
				_link('#botonera/changeUrl','#change','change') +
				_link('#botonera/hide','#close','close') +
				'</div>';
		} else {
			pdiffonly = _getOptionArr('diffonly');
			ppreview = _getOptionArr('previewonfirst');
			aNSText = _article.articlens['*'];
			if (aNSText === '') {
				aNSText = _getMsg('ns0');
			}
			cont += '<div class="head">'+
				_link(_article.getFullUrl(),(_article.pagename.length>30?_article.pagename.substr(0,27)+'...':_article.pagename),'target') +
				'<span class="b_tabs">';
			if (_currentViewTalk) {
				cont += _link('#botonera/toggleView',aNSText,'tab_article') +
					' <span class="tab_talk">' + _getMsg('talk') + '</span>';
			} else {
				cont += ' <span class="tab_article">' + aNSText + '</span>';
				if (_article.talkns !== null) {
					cont += _link('#botonera/toggleView','#talk','tab_talk');
				}
			}
			cont += '</span> ' +
				_link('#botonera/changeUrl','#change','change') +
				_link('#botonera/hide','#close','close') +
				'</div>' +
				'<dl class="actions"><dt>' + _getMsg('actions') + '</dt><dd>' +
				_link(_article.getFullUrl($.extend({action:'edit'},ppreview)),'#edit');
			if (_currentViewTalk) {
				cont += _link(_article.getFullUrl({action:'edit',section:'new'}),'#newsec');
			}
			cont += _link(_article.getFullUrl({action:'history'}),'#hist');
			if (_privileged) {
				cont += _link(_article.getFullUrl({action:'delete'}),'#delete') +
					_link(_article.getFullUrl({action:'protect'}),'#protect');
			}
			cont += _link(_article.getFullUrl({action:'purge'}),'#purge') + '</dd></dl>';
			if (ns.canonical == 'User' || ns.canonical == 'User blog' || ns.canonical == 'Message Wall') {
				var username = _article.pagename;
				var pos = username.indexOf('/');
				if (pos != -1) {
					username = username.substr(0,pos);
				}
				var usr = new WikiArticle(_wikisiteinfo, 'User:'+username);
				cont += '<dl class="userlinks"><dt>' + _getMsg('user') + '</dt><dd>' +
					_link(usr.getSpecial('Contributions',false),'#contribs');
				if (_privileged) {
					cont += _link(usr.getSpecial('BlockIp',false),'#block');
				}
				cont += _link(usr.getSpecial('Log',{user:username}),'#userlogs') +
					_link(usr.getSpecial('Log',{type:'block',page:usr.toString()}),'#blocks') + '</dd></dl>';
			}
			cont += '<dl class="articlelinks"><dt>' + _getMsg('article') + '</dt><dd>' +
				_link(_article.getSpecial('Whatlinkshere'),'#links') +
				//_link(_article.getSpecial('Search',false),'#search') +
				_link(_article.getSpecial('Search',{search:_article.pagename}),'#search') +
				_link(_article.getSpecial('Prefixindex'),'#prefix') +
				_link(_article.getSpecial('Movepage'),'#move') +
				_link(_article.getSpecial('Log',{page:_article.toString()}),'#logs');
			if (params.redlink && _privileged) {
				cont += _link(_article.getSpecial('Undelete'),'#undelete');
			}
			cont += _link(_article.getFullUrl($.extend({diff:'cur'},pdiffonly)),'#curdiff') + '</dd></dl>';
			if (params.oldid) {
				cont += '<dl class="diff"><dt>';
				if (params.diff) {
					cont += _link(_article.getFullUrl($.extend({diff:params.diff,oldid:params.oldid},pdiffonly)),'#diff');
				} else {
					cont += _getMsg('diff');
				}
				cont += '</dt><dd>' +
					_link(_article.getFullUrl($.extend({diff:'cur',oldid:params.oldid},pdiffonly)),'#diffcur')+
					_link(_article.getFullUrl($.extend({action:'edit',oldid:params.oldid},ppreview)),'#diffedit')+
					_link(_article.getFullUrl($.extend({diff:'prev',oldid:params.oldid},pdiffonly)),'#diffprev')+
					_link(_article.getFullUrl($.extend({direction:'prev',oldid:params.oldid,action:'edit'},ppreview)),'#diffedit')+
					_link(_article.getFullUrl($.extend({diff:'next',oldid:params.oldid},pdiffonly)),'#diffnext')+
					_link(_article.getFullUrl($.extend({direction:'next',oldid:params.oldid,action:'edit'},ppreview)),'#diffedit')+
					'</dd></dl>';
			}
			if (params.action && params.action == 'rollback') {
				// User names with spaces use unescaped +, which is equivalent to spaces
				// We need to replace it with actual spaces, otherwise they're converted
				// to escaped + which is interpreted as a literal + in the name, not
				// matching the correct user name
				params.from = params.from.replace(/\+/g,' ');
				var rbparams = _getOptionArr('norollbackdiff');
				var rs = (_rollbackSummary||'');
				if (rs !== '') {
					var u = params.from.replace(/\+/g,' ');
					rs = _rollbackSummaryPrefix.replace(/\$1/g,u) + rs;
					rbparams.summary = rs;
				}
				if (_hideRollback) {
					rbparams.bot = '1';
				}
				cont += '<dl class="rollback"><dt>' + _link(_article.getFullUrl($.extend({action:'rollback',from:params.from,token:params.token},rbparams)),'#rollback') + '</dt><dd>' +
					_link('#botonera/toggleHideRollback','#hiderb',_hideRollback) +
					_link('#botonera/toggle/norollbackdiff','#nodiff',((_options.norollbackdiff||'0') == '1')) +
					_link('#botonera/setRollbackSummary','#rbmsg',((_rollbackSummary||'') !== '')) +
					'</dd></dl>';
			}
			cont += '<dl class="options"><dt class="caption">' + _getMsg('opt') + '</dt><dd>' +
				_link('#botonera/toggle/previewonfirst','#previewfe',((_options.previewonfirst||'0') == '1')) +
				_link('#botonera/toggle/diffonly','#diffnoprev',((_options.diffonly||'0') == '1')) +
				'</dd></dl>';
		}
		_elem.append(cont);
	},
	_show = function(target) {
		if (!_visible) {
			_elem.show();
			_visible = true;
			$(document).bind('keyup.BotoneraPopups', function(e) {
				if (e.which==27) _hide();
			});
		}
		var offset = $(target).offset();
		_elem.css({top:offset.top+$(target).height(),left:offset.left});
	},
	_hide = function(e){
		_elem.hide();
		_visible = false;
		$(document).unbind('keyup.BotoneraPopups');
		_ignoreKeyDownEvent = false;
	},
	_getOptionArr = function(name) {
		var ret = {}, optVal = ( _options[name]=='1' ? '1' : '0' );
		if (window.mw !== undefined && typeof mw.user == 'object' && typeof mw.user.options == 'object' &&
			_options[name] !== undefined && mw.user.options.get(name, '0').toString() !== optVal) {
			switch(name) {
				case 'previewonfirst':
					name = 'preview';
					optVal = (optVal == '1' ? 'yes' : 'no');
					break;
				case 'norollbackdiff':
					name = 'hidediff';
					break;
			}
			ret[name] = optVal;
		}
		return ret;
	},
	_toggleView = function() {
		var newArticle, oldArticle = _article;
		if (_currentViewTalk) {
			var ns = oldArticle.articlens['*'];
			if (ns !== '') {
				ns += ':';
			}
			newArticle = new WikiArticle(_wikisiteinfo, ns+oldArticle.pagename);
		} else {
			newArticle = new WikiArticle(_wikisiteinfo, oldArticle.talkns['*']+':'+oldArticle.pagename);
		}
		var newUrl = (_alternateUrl||newArticle.getFullUrl());
		_alternateUrl = _url;
		_url = newUrl;
		_article = newArticle;
		_currentViewTalk = !_currentViewTalk;
		_render();
	},
	_toggleOption = function(name) {
		var oldVal = (_options[name]||'0');
		_options[name] = (oldVal == '0' ? '1' : '0');
		_render();
	},
	_toggleHideRollback = function() {
		_hideRollback = !_hideRollback;
		_render();
	},
	_setRollbackSummary = function() {
		var s = prompt(_getMsg('rbreason'),(_rollbackSummary||''));
		if (!s || s === '') {
			_rollbackSummary = null;
		} else {
			_rollbackSummary = s;
		}
		_render();
	},
	_changeUrl = function() {
		var s = prompt(_getMsg('changeprompt'),_article.toString());
		if (!s || s === '') return;
		_article = new WikiArticle(_wikisiteinfo, s);
		var url = _article.getFullUrl();
		_alternateUrl = null;
		_url = url;
		_currentViewTalk = _article.isTalk;
		_render();
	},
	_getUserOptions = function() {
		var keys = ['previewonfirst', 'diffonly', 'norollbackdiff'];
		if (window.mw !== undefined && typeof mw.user == 'object' && typeof mw.user.options == 'object') {
			for (var i = 0; i < keys.length; i++) {
				_options[keys[i]] = mw.user.options.get(keys[i], '').toString();
			}
		}
	},
	_buildDefaultWikiSiteInfo = function() {
		var reSP = /_/g,
			prev, nsid, nsname2;
		if (!mw.config.get('wgFormattedNamespaces') || !mw.config.get('wgNamespaceIds')) return;
		for (nsid in mw.config.get('wgFormattedNamespaces')) {
			if (mw.config.get('wgFormattedNamespaces').hasOwnProperty(nsid)) {
				prev = _wikisiteinfo.namespaces[nsid];
				_wikisiteinfo.namespaces[nsid] = {id: parseInt(nsid, 10), canonical: ( (prev ? prev.canonical : false) || mw.config.get('wgFormattedNamespaces')[nsid] ), '*': mw.config.get('wgFormattedNamespaces')[nsid]};
			}
		}
		for (var nsname in mw.config.get('wgNamespaceIds')) {
			if (mw.config.get('wgNamespaceIds').hasOwnProperty(nsname)) {
				nsid = mw.config.get('wgNamespaceIds')[nsname];
				nsname2 = nsname.replace(reSP, ' ').toLowerCase();
				if (typeof _wikisiteinfo.namespaces[nsid] != 'undefined') {
					if (_wikisiteinfo.namespaces[nsid]['*'].toLowerCase() != nsname2) {
						_wikisiteinfo.namespacealiases.push( {id: parseInt(nsid, 10), '*': nsname2} );
					}
				}
			}
		}
	},
	_getMsg = function(msg) {
		return (_uilang[msg]||'&lt;'+msg+'&gt;');
	},
	_setDisplayOnKeyDown = function(value) {
		if (value === true) {
			if (!_displayOnKeyDown) {
				$(document.body).bind('keydown.BotoneraPopups', _checkKeyDown);
				_displayOnKeyDown = true;
			}
		} else {
			if (_displayOnKeyDown) {
				$(document.body).unbind('keydown.BotoneraPopups', _checkKeyDown);
				_displayOnKeyDown = false;
			}
		}
	};
	
	// Inicialization
	// Allow initial setup of values if they were set up before object definition
	if (typeof extend.BotoneraPopups == 'object') {
		if (typeof extend.BotoneraPopups.uilang == 'object') {
			_uilang = $.extend(_uilang, extend.BotoneraPopups.uilang);
		}
		if (typeof extend.BotoneraPopups.wikisiteinfo == 'object') {
			_wikisiteinfo = $.extend(_wikisiteinfo, extend.BotoneraPopups.wikisiteinfo);
		}
		if (typeof extend.BotoneraPopups.rollbackSummaryPrefix == 'string') {
			_rollbackSummaryPrefix = extend.BotoneraPopups.rollbackSummaryPrefix;
		}
		if (typeof extend.BotoneraPopups.displayOnKey == 'object') {
			_displayOnKey = $.extend(_displayOnKey, extend.BotoneraPopups.displayOnKey);
		}
		if (typeof extend.BotoneraPopups.displayOnKeyDown == 'boolean') {
			_displayOnKeyDown = extend.BotoneraPopups.displayOnKeyDown;
		}
	}
	
	// Public members
	extend.BotoneraPopups = {
		version: _version,
		enable: _enable,
		disable: _disable,
		hide: _hide,
		uilang: _uilang,
		wikisiteinfo: _wikisiteinfo,
		rollbackSummaryPrefix: _rollbackSummaryPrefix,
		displayOnKey: _displayOnKey,
		setDisplayOnKeyDown: _setDisplayOnKeyDown
	};

})(jQuery, window, mw);
/*</source>*/

$(BotoneraPopups.enable);