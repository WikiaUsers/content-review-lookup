/* De Wikidex*/

/** WikiaShoutBox v1.4: Conector para el Widget ShoutBox de Wikia
 * (C) 2011 Jesús Martínez Novo [[User:Ciencia_Al_Poder]]
 * This program is free software; you can redistribute it and/or modify
 *   it under the terms of the GNU General Public License as published by
 *   the Free Software Foundation; either version 2 of the License, or
 *   (at your option) any later version
 */
var WikiaShoutBox = {
	version: '1.4',
	cookietag: 'WSB',
	skin: 'oasis',
	wid: '302',
	contel: null,
	focus: false,
	init: function() {
		if (!window.wgUserName) return;
		var enabled = false;
		var cfg = $UT.cookie(WikiaShoutBox.cookietag);
		if (cfg) {
			enabled = (cfg == '1');
		}
		// Si alguien no le funciona, que pruebe a poner wgWidgetShoutBoxId = '1'; en su js
		if (typeof window.wgWidgetShoutBoxId == 'string' && !isNaN(window.wgWidgetShoutBoxId)) {
			WikiaShoutBox.wid = window.wgWidgetShoutBoxId;
		}
		WikiaShoutBox.render();
		if (enabled) {
			WikiaShoutBox.start();
		}
		// Core functions
		window.WidgetShoutBoxSend = WikiaShoutBox.sendMsg;
		window.WidgetShoutBoxRemoveMsg = WikiaShoutBox.removeMsg;
	},
	render: function() {
		var fxBtn = function(type, title) {
			return '<a href="#" class="WidgetSprite '+type+'" title="'+title+'"><img src="'+window.wgBlankImgUrl+'" width="12" height="12"/></a>';
		};
		WikiaShoutBox.contel = $('<div id="p-sb" class="portlet"><h5>Chat '+fxBtn('start', 'Mostrar')+fxBtn('stop', 'Ocultar')+
			fxBtn('expand', 'Expandir')+fxBtn('collapse', 'Contraer')+fxBtn('edit', 'Configurar')+fxBtn('reload', 'Recargar')+'<span class="status"></span></h5><div class="pBody"></div></div>').insertAfter('#p-tb');
		$('#p-sb').children('h5').click(WikiaShoutBox.widgetBtnClick).children('a.WidgetSprite').not('a.start').css('display','none');
	},
	widgetBtnClick: function(e) {
		var tg = e.target;
		if (!tg) return;
		if (tg.tagName.toLowerCase() == 'img') tg = tg.parentNode;
		if (tg.tagName.toLowerCase() != 'a') return;
		var cn = tg.className.split(' ');
		for (var i = 0; i < cn.length; i++) {
			switch(cn[i]) {
				case 'start':
				case 'stop':
				case 'expand':
				case 'collapse':
				case 'edit':
				case 'reload':
					WikiaShoutBox[cn[i]]();
					return false;
					break;
			}
		}
	},
	widgetBtnVisible: function(cfg) {
		for (btn in cfg) {
			$('#p-sb').children('h5').children('a.'+btn).css('display',cfg[btn]?'':'none');
		}
	},
	start: function() {
		WikiaShoutBox.action('configure');
		var cfg = $UT.cookie(WikiaShoutBox.cookietag, '1');
		WikiaShoutBox.widgetBtnVisible({start:false, stop:true, expand:true, edit:true, reload:true});
	},
	stop: function() {
		WikiaShoutBox.collapse();
		WikiaShoutBox.widgetBtnVisible({start:true, stop:false, expand:false, collapse:false, edit:false, reload:false});
		WikiaShoutBox.contel.children('div').eq(0).empty();
		var cfg = $UT.cookie(WikiaShoutBox.cookietag, null);
	},
	expand: function() {
		WikiaShoutBox.widgetBtnVisible({expand:false, collapse:true});
		WikiaShoutBox.contel.addClass('expanded');
		// Posicionar al final si hay scroll
		var ul = WikiaShoutBox.contel.children('div').eq(0).find('ul').get(0);
		if (!ul) return;
		ul.scrollTop = ul.scrollHeight - ul.offsetHeight + 2;
	},
	collapse: function() {
		WikiaShoutBox.widgetBtnVisible({expand:true, collapse:false});
		WikiaShoutBox.contel.removeClass('expanded');
	},
	edit: function () {
		WikiaShoutBox.action('editform');
	},
	reload: function() {
		WikiaShoutBox.action('configure');
	},
	action: function(atype, params) {
		if (!WikiaShoutBox.contel) return;
		var req = {
			action: 'ajax',
			rs: 'WidgetFrameworkAjax',
			actionType: atype,
			id: WikiaShoutBox.wid,
			skin: WikiaShoutBox.skin,
			cbuser: encodeURIComponent(window.wgUserName) // un ID por usuario, por la caché
		};
		req = $.extend(req, params);
		WikiaShoutBox.busy(true);
		$.getJSON(wgScriptPath+wgScript, req, WikiaShoutBox.jsonRcvClosure(atype));

	},
	jsonRcvClosure: function(pAction) {
		return function(res) {
			if (res.success) {
				WikiaShoutBox[pAction+'Action'](res);
			}
			WikiaShoutBox.busy(false);
		};
	},
	configureAction: function(res) {
		if (res.type != 'WidgetShoutBox') {
			WikiaShoutBox.stop();
			alert('Ha ocurrido un error: El widget retornado es de tipo ['+res.type+']. Puedes informar de este problema en el foro donde se anuncia el chat.');
			return;
		}
		var b = res.body;
		var pos = b.indexOf('<script');
		if (pos > 0) {
			b = b.substring(0, pos);
		}
		var ul = WikiaShoutBox.contel.children('div').eq(0).html(b).find('ul').get(0);
		if(WikiaShoutBox.focus) {
			$('#widget_' + WikiaShoutBox.wid + '_message').focus();
			WikiaShoutBox.focus = false;
		}
		// Posicionar al final si hay scroll
		if (!ul) return;
		ul.scrollTop = ul.scrollHeight - ul.offsetHeight + 2;
	},
	editformAction: function(res) {
		var b = res.content;
		WikiaShoutBox.contel.children('div').eq(0).html(b);
		$('#widget_' + res.id + '_save').click(WikiaShoutBox.editSave);
		$('#widget_' + res.id + '_cancel').click(WikiaShoutBox.editCancel);
	},
	editSave: function() {
		// get editor fields and add them to AJAX request params
		var fields = $('#widget_' + WikiaShoutBox.wid + '_editor').serializeArray();
		var req = {};
		for (var i = 0; i < fields.length; i++) {
			req[fields[i].name] = fields[i].value;
		}
		WikiaShoutBox.action('configure', req);
	},
	editCancel: function() {
		WikiaShoutBox.action('configure');
	},
	sendMsg: function(wId) {
		var messageBox = $('#widget_' + wId + '_message');
		if (!messageBox.length) {
			return;
		}
		var message = encodeURIComponent( $.trim(messageBox.attr('value')).replace(new RegExp('\\{\\{', 'g'), '{&#123;') );
		WikiaShoutBox.focus = true;
		if (message == '') {
			WikiaShoutBox.reload();
			return;
		}
		WikiaShoutBox.action('configure', {message:message});
	},
	removeMsg: function (wid, mid) {
		WikiaShoutBox.action('configure', {msgid:mid});
	},
	busy: function(isBusy) {
		WikiaShoutBox.contel.children('h5').children('span.status').text(isBusy?' (Cargando...)':'');
	},
};

$(WikiaShoutBox.init);