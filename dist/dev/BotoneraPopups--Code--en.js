// Leave this line as it is
//// Leave this line as it is
///*<source lang="javascript">*/
/* BotoneraPopups - v2.5
 * A popup (in-page) with links to useful actions will appear when hovering a link while the CTRL key is pressed.
 * (C) 2010-2012 Jesús Martínez Novo [[User:Ciencia_Al_Poder]]
 * This program is free software; you can redistribute it and/or modify
 *   it under the terms of the GNU General Public License as published by
 *   the Free Software Foundation; either version 2 of the License, or
 *   (at your option) any later version
 */
(function( $, extend ) {
var _version = '2.5', // this version
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
	_wikiprefs = null, // User preferences
	_wikisiteinfo = {namespaces: {}, namespacealiases: [], specialpagealiases: []}, // wikisiteinfo
	_displayOnKey = {ctrlKey: true, altKey: false, shiftKey: false}, // required key to display popup
	_uilang = {}, // Localized messages for UI
	_rollbackSummaryPrefix = 'Reverted edits by [[Special:Contributions/$1|$1]]: ',
	_enable = function() {
		if (_enabled) return;
		_enabled = true;
		_buildDefaultWikiSiteInfo();
		_getUserOptions();
		if (!_elem) {
			_elem = $('<div id="botonerapopup" style="display:none;"></div>');
			$(document.body).append(_elem);
			_elem.bind('click', _clickHandler);
		}
		_privileged = (window.wgUserGroups && $.inArray('sysop', wgUserGroups) != -1);
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
		server = wgServer;
		pos = server.indexOf('//');
		// MW 1.18 Compatibility
		if (pos > 0) {
			server = server.substr(pos);
		}
		pos = url.indexOf('//');
		if (pos > 0) {
			url = url.substr(pos);
		}
		if (url.indexOf(server) != 0) return;
		pos = url.indexOf('#');
		if (pos != -1) {
			url = url.substr(0, pos);
		}
		title = '';
		pos = server.length+wgArticlePath.indexOf('$1');
		if (url.length > pos && url.substr(0, pos) == server+wgArticlePath.substr(0, pos-server.length)) {
			var qpos = url.indexOf('?');
			if (qpos != -1) {
				title = decodeURIComponent( url.substring(pos, qpos) );
			} else {
				title = decodeURIComponent( url.substr(pos) );
			}
		} else if (url.indexOf(server+wgScriptPath+wgScript) == 0) {
			var params = _getUrlParams(url);
			if (params.title){
				title = params.title;
			}
		}
		if (title == '') return;
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
			ns = _article.articlens;
			cont = '';
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
			var pdiffonly = _getOptionStr('diffonly');
			var ppreview = _getOptionStr('previewonfirst');
			var aNSText = _article.articlens['*'];
			if (aNSText == '') {
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
				_link(_article.getFullUrl('action=edit'+ppreview),'#edit');
			if (_currentViewTalk) {
				cont += _link(_article.getFullUrl('action=edit&section=new'),'#newsec');
			}
			cont += _link(_article.getFullUrl('action=history'),'#hist');
			if (_privileged) {
				cont += _link(_article.getFullUrl('action=delete'),'#delete') +
					_link(_article.getFullUrl('action=protect'),'#protect');
			}
			cont += _link(_article.getFullUrl('action=purge'),'#purge') + '</dd></dl>';
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
				cont += _link(usr.getSpecial('Log','user='+encodeURIComponent(username)),'#userlogs') +
					_link(usr.getSpecial('Log','type=block&page='+encodeURIComponent(usr.toString())),'#blocks') + '</dd></dl>';
			}
			cont += '<dl class="articlelinks"><dt>' + _getMsg('article') + '</dt><dd>' +
				_link(_article.getSpecial('Whatlinkshere'),'#links') +
				//_link(_article.getSpecial('Search',false),'#search') +
				_link(_article.getSpecial('Search','search='+_article.pagename),'#search') +
				_link(_article.getSpecial('Prefixindex'),'#prefix') +
				_link(_article.getSpecial('Movepage'),'#move') +
				_link(_article.getSpecial('Log','page='+encodeURIComponent(_article.toString())),'#logs');
			if (params.redlink && _privileged) {
				cont += _link(_article.getSpecial('Undelete'),'#undelete');
			}
			cont += _link(_article.getFullUrl('diff=cur'+pdiffonly),'#curdiff') + '</dd></dl>';
			if (params.oldid) {
				cont += '<dl class="diff"><dt>';
				if (params.diff) {
					cont += _link(_article.getFullUrl('diff='+params.diff+'&oldid='+params.oldid+pdiffonly),'#diff');
				} else {
					cont += _getMsg('diff');
				}
				cont += '</dt><dd>' +
					_link(_article.getFullUrl('diff=cur&oldid='+params.oldid+pdiffonly),'#diffcur')+
					_link(_article.getFullUrl('action=edit&oldid='+params.oldid+ppreview),'#diffedit')+
					_link(_article.getFullUrl('diff=prev&oldid='+params.oldid+pdiffonly),'#diffprev')+
					_link(_article.getFullUrl('direction=prev&oldid='+params.oldid+'&action=edit'+ppreview),'#diffedit')+
					_link(_article.getFullUrl('diff=next&oldid='+params.oldid+pdiffonly),'#diffnext')+
					_link(_article.getFullUrl('direction=next&oldid='+params.oldid+'&action=edit'+ppreview),'#diffedit')+
					'</dd></dl>';
			}
			if (params.action && params.action == 'rollback') {
				var rbparams = _getOptionStr('norollbackdiff');
				var rs = (_rollbackSummary||'');
				if (rs != '') {
					var u = params.from.replace(/\+/g,' ');
					rs = _rollbackSummaryPrefix.replace(/\$1/g,u) + rs;
					rbparams += '&summary='+encodeURIComponent(rs);
				}
				if (_hideRollback) {
					rbparams += '&bot=1';
				}
				cont += '<dl class="rollback"><dt>' + _link(_article.getFullUrl('action=rollback&from='+encodeURIComponent(params.from).replace(/%2B/g, '+')+'&token='+encodeURIComponent(params.token)+rbparams),'#rollback') + '</dt><dd>' +
					_link('#botonera/toggleHideRollback','#hiderb',_hideRollback) +
					_link('#botonera/toggle/norollbackdiff','#nodiff',((_options.norollbackdiff||'0') == '1')) +
					_link('#botonera/setRollbackSummary','#rbmsg',((_rollbackSummary||'') != '')) +
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
	_getOptionStr = function(name) {
		var str = '';
		var optVal = (_options[name]=='1'?'1':'0');
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
			str = '&'+name+'='+optVal;
		}
		return str;
	},
	_getRollbackSummaryParam = function(params) {
		var rs = _rollbackSummary;
		if (rs == null) return '';
		params = params || {};
		if (params.from) {
			var u = params.from.replace(/\+/g,' ');
			rs = _rollbackSummaryPrefix.replace(/\$1/g,u) + rs;
		}
		return '&summary='+encodeURIComponent(rs);
	},
	_toggleView = function() {
		var newArticle, oldArticle = _article;
		if (_currentViewTalk) {
			var ns = oldArticle.articlens['*'];
			if (ns != '') {
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
		if (!s || s == '') {
			_rollbackSummary = null;
		} else {
			_rollbackSummary = s;
		}
		_render();
	},
	_changeUrl = function() {
		var s = prompt(_getMsg('changeprompt'),_article.toString());
		if (!s || s == '') return;
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
				_options[keys[i]] = mw.user.options.get(keys[i]).toString();
			}
		}
	},
	_retrieveWikiConfiguration = function() {
		_wikisiteinfo = {namespaces:{}, namespacealiases:[], specialpagealiases:[]};
		$.getJSON(wgScriptPath+'/api.php?action=query&meta=siteinfo&siprop=namespaces|namespacealiases|specialpagealiases&format=json&smaxage=3000000&maxage=3000000', function(data) {
			_wikisiteinfo = data.query;
		});
	},
	_buildDefaultWikiSiteInfo = function() {
		var reSP = /_/g,
			prev;
		if (!window.wgFormattedNamespaces || !window.wgNamespaceIds) return;
		for (var nsid in wgFormattedNamespaces) {
			prev = _wikisiteinfo.namespaces[nsid];
			_wikisiteinfo.namespaces[nsid] = {id: parseInt(nsid, 10), canonical: ( (prev ? prev.canonical : false) || wgFormattedNamespaces[nsid] ), '*': wgFormattedNamespaces[nsid]};
		}
		for (var nsname in wgNamespaceIds) {
			var nsid = wgNamespaceIds[nsname];
			var nsname2 = nsname.replace(reSP, ' ').toLowerCase();
			if (typeof _wikisiteinfo.namespaces[nsid] != 'undefined') {
				if (_wikisiteinfo.namespaces[nsid]['*'].toLowerCase() != nsname2) {
					_wikisiteinfo.namespacealiases.push( {id: parseInt(nsid, 10), '*': nsname2} );
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

})(jQuery, window);
/*</source>*/
///*<source lang="javascript">*/
/* WikiArticle - v2.0
 * Framework to easily generate urls to MediaWiki articles (actions, special pages) from an article name
 * (C) 2010-2012 Jesús Martínez Novo [[User:Ciencia_Al_Poder]]
 * This program is free software; you can redistribute it and/or modify
 *   it under the terms of the GNU General Public License as published by
 *   the Free Software Foundation; either version 2 of the License, or
 *   (at your option) any later version
 */
(function(){
// @private globals
var defaultNsInfo = {id:0,'*':'',canonical:''},
	re_space = / /g,
	re_underscore = /_/g,
	re_colon = /%3A/gi,
	re_dash = /%2F/gi;

// @public class WikiArticle
window.WikiArticle = function(wikisiteinfo, title) {
	// Namespace configuration & localization
	this.wikisiteinfo = wikisiteinfo;
	// Normalized pagename
	this.pagename = null;
	// Whether the current page is a talk page
	this.isTalk = false;
	// Namespace information of the article
	this.articlens = null;
	this.talkns = null;
	this.realspecial = null;

	this.init(title);
}

WikiArticle.prototype = {
	init: function(title) {
		var t = this.decode(title||''); // namespaces use slashes
		if (t=='') return;
		var scPos = t.indexOf(':');
		if (scPos != -1) {
			// It looks like a namespace, try to get namespace information
			// Namespace is case insensitive
			var tns = t.split(':')[0].toLowerCase();
			// Namespaces
			for (var ns in this.wikisiteinfo.namespaces) {
				var objns = this.wikisiteinfo.namespaces[ns];
				if (tns == objns['*'].toLowerCase() || tns == objns['canonical'].toLowerCase()) {
					this.articlens = jQuery.extend(true,{},objns); // Copy namespace object
					var tmpt = t.substring(scPos+1);
					this.pagename = tmpt.substring(0,1).toUpperCase()+tmpt.substring(1);
					break;
				}
			}
			if (this.articlens === null) {
				// Test against namespace aliases
				for (var i = 0; i < this.wikisiteinfo.namespacealiases.length; i++) {
					var nsa = this.wikisiteinfo.namespacealiases[i];
					if (tns == nsa['*'].toLowerCase()) {
						var objns = this.wikisiteinfo.namespaces[nsa['id'].toString()];
						this.articlens = jQuery.extend(true,{},objns); // Copy namespace object
						var tmpt = t.substring(scPos+1);
						this.pagename = tmpt.substring(0,1).toUpperCase()+tmpt.substring(1);
						break;
					}
				}
			}
		}
		if (!this.articlens) {
			// No namespace, or it's not known
			this.articlens = defaultNsInfo;
			this.pagename = t.substring(0,1).toUpperCase()+t.substring(1);
			this.isTalk = false;
		}
		if (this.articlens.id >= 0) {
			// Fill namespace info variables
			if (this.articlens.id % 2) {
				// Is talk page
				this.isTalk = true;
				// Switch article to talk and get the real article ns info
				this.talkns = this.articlens;
				var ansid = this.talkns.id-1;
				this.articlens = jQuery.extend(true,{},this.wikisiteinfo.namespaces[ansid.toString()]); // Copy namespace object
				if (typeof this.articlens == 'undefined') {
					this.articlens = defaultNsInfo;
				}
			} else {
				// Get the talk ns info
				var tnsid = this.articlens.id+1;
				this.talkns = jQuery.extend(true,{},this.wikisiteinfo.namespaces[tnsid.toString()]); // Copy namespace object
				// Note that a particular NS could miss a talk namespace
				if (typeof this.talkns.id == 'undefined') {
					this.talkns = null;
				}
			}
		}
		if (this.articlens.id == -1) {
			// Special pages. Normalize the pagename
			var pos = this.pagename.indexOf('/');
			if (pos != -1) {
				var base = this.pagename.substr(0,pos);
				var extra = this.pagename.substr(pos);
				this.pagename = this.getLocalizedSpecial(base, true) + extra;
			} else {
				this.pagename = this.getLocalizedSpecial(this.pagename, true);
			}
		}
	},
	toString: function() {
		var tns = this.isTalk ? this.talkns : this.articlens;
		if (tns['*'] == '') {
			return this.pagename;
		}
		return tns['*']+':'+this.pagename;
	},
	encode: function(str) {
		return str.replace(re_space,'_');
	},
	decode: function(str) {
		return jQuery.trim(str.replace(re_underscore,' '));
	},
	buildURI: function(fullpagename, strArgs) {
		var fullpn = encodeURIComponent(this.encode(fullpagename)).replace(re_colon, ':').replace(re_dash, '/');
		if (strArgs && strArgs != '') {
			return wgServer+wgScriptPath+wgScript+'?title='+fullpn+'&'+strArgs;
		}
		return wgServer+wgArticlePath.replace('$1',fullpn);
	},
	getFullUrl: function(strArgs) {
		var tns = this.isTalk ? this.talkns : this.articlens;
		var szNs = tns['*'];
		return this.buildURI((szNs == '' ? '' : szNs+':') + this.pagename, strArgs);
	},
	getLocalizedSpecial: function(special, setReal) {
		var tsp = this.encode(special).toLowerCase(); // special aliases use slashes
		for (var i = 0; i < this.wikisiteinfo.specialpagealiases.length; i++) {
			var spa = this.wikisiteinfo.specialpagealiases[i];
			if (spa.realname.toLowerCase() == tsp) {
				if (setReal === true) {
					this.realspecial = spa.realname;
				}
				return spa.aliases[0];
			}
			for (var j = 0; j < spa.aliases.length; j++) {
				if (spa.aliases[j].toLowerCase() == tsp) {
					// Save the real name for future reference if we're setting the specialpage info
					if (setReal === true) {
						this.realspecial = spa.realname;
					}
					// Use the first alias
					return spa.aliases[0];
				}
			}
		}
		if (setReal === true) {
			this.realspecial = special;
		}
		return special;
	},
	// Returns a special page, appending /FULLPAGENAME. If strArgs is false then /PAGENAME is appended instead. if strArgs is a string the page name is not appended at all
	//  specialpage: Special page name
	//  strArgs: additional queryString
	getSpecial: function(specialpage, strArgs) {
		var withNS = (strArgs !== false);
		strArgs = (strArgs||'');
		var pagename = this.wikisiteinfo.namespaces['-1']['*'] + ':' + this.getLocalizedSpecial(specialpage);
		if (strArgs == '') {
			pagename += '/'+(withNS?this.toString():this.pagename);
		}
		return this.buildURI(pagename, strArgs);
	}
};

}());
/*</source>*/

$(BotoneraPopups.enable);
///*<source lang="javascript">*/
if (!window.BotoneraPopups) {
	window.BotoneraPopups = {};
}
window.BotoneraPopups.uilang = $.extend(window.BotoneraPopups.uilang, {
	close: '[x]',
	change: 'Change',
	ns0: 'Page',
	talk: 'Talk',
	actions: 'Actions',
	edit: 'Edit',
	newsec: '+',
	hist: 'History',
	'delete': 'Delete',
	protect: 'Protect',
	purge: 'Purge',
	user: 'User',
	contribs: 'Contribs',
	block: 'Block',
	userlogs: 'Logs',
	blocks: 'Blocks',
	article: 'Page',
	links: 'Links',
	search: 'Search',
	prefix: 'Prefix',
	move: 'Move',
	logs: 'Logs',
	undelete: 'Undelete',
	curdiff: 'Current diff',
	diff: 'Diff',
	diffcur: 'Current',
	diffedit: '(edit)',
	diffprev: '&larr; Prev',
	diffnext: '&rarr; Next',
	rollback: 'Rollback',
	hiderb: 'Hide RC',
	nodiff: 'Without diff',
	rbmsg: 'Reason',
	opt: 'Options',
	previewfe: 'Preview on edit',
	diffnoprev: 'Diff without preview',
	rbreason: 'Rollback summary',
	changeprompt: 'Change the target page'
});
/*</source>*/