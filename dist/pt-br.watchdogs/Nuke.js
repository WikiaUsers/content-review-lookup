/*
* Nuke
* Extensão Nuke com engenharia reversa
* https://www.mediawiki.org/wiki/Extension:Nuke é a página da extensão oficial do MW
* @author Ozank Cx
* @todo - implementar a API do usercontribs se a Wikia atualizar para o MW 1.23+
*/
	
mw.loader.using(['mediawiki.util', 'mediawiki.api'], function() {

var ug = mw.config.get('wgUserGroups');

if (ug.indexOf('content-moderator') + ug.indexOf('sysop') + ug.indexOf('vstf') + ug.indexOf('staff') + ug.indexOf('helper') == -5) return;

var config = mw.config.get([
	'skin',
	'stylepath',
	'wgArticlePath',
	'wgFormattedNamespaces',
	'wgMainpage',
	'wgSiteName'
]),
token = mw.user.tokens.values.editToken,
API = new mw.Api(),
deleteDelay = window.nukeDelay || 1000;
config.wgArticlePath = config.wgArticlePath.slice(0,-2);

var self = {
	init: function() {
 
		$('.header-column.header-title h1').text('Nuke');
		document.title = "Nuke - " + config.wgSiteName;
 
		if ($.getUrlVar('nukeuser')) {
			var user = $.getUrlVar('nukeuser'),
			deleteReason = window.nukeDeleteReason || "Remoção em massa de páginas criadas por " + user.replace(/_/g,' ');
 
			$('#mw-content-text p').html('<a href="' + config.wgArticlePath + 'Special:Blankpage?blankspecial=nuke">Alternar para o formulário principal do Nuke</a><br/>As seguintes páginas foram criadas por <a href="' + config.wgArticlePath + 'Especial:Contribui\u00e7\u00f5es/' + user + '">' + user.replace(/_/g,' ') + '</a>; coloque um comentário e aperte o botão para excluí-las.<br/>Razão para a exclusão: <input style="width: 400px" type="text" id="nuke-delete-reason" value="' + deleteReason + '"/><br/><a class="wikia-button nuke-submit">Excluir</a><div id="nuke-status"/><ul id="nuke-query-results"></ul><a class="wikia-button nuke-submit">Excluir</a>');
			$('#nuke-status').html('Obtendo páginas... por favor, aguarde <img src="' + config.stylepath + '/common/progress-wheel.gif"/>');
 
			API.get({
			action: 'query',
			list: 'usercontribs',
			ucnamespace: $.getUrlVar('nukenamespace') || '',
			ucuser: user,
			uclimit: 5000,
			cb: new Date().getTime() 
			})
			.done(function(d) {
				if (!d.error) {
					var usercontribs = d.query.usercontribs,
					maxLimit = $.getUrlVar('nukelimit') || 500,
					count = 0,
					images = [];
					
					for (var i in usercontribs) {
						if (count >= maxLimit) break;
						
						if (usercontribs[i].hasOwnProperty('new')) {
							var escapedTitle = encodeURIComponent(usercontribs[i].title);
							if (!$.getUrlVar('nukematch') || new RegExp($.getUrlVar('nukematch')).test(usercontribs[i].title)) {
								$('#nuke-query-results').append('<li class="nuke-query-result"><input type="checkbox" class="nuke-title-check" checked="checked"/> <a href="' + config.wgArticlePath + escapedTitle + '" target="_blank">' + usercontribs[i].title + '</a></li>');
								if (usercontribs[i].title.slice(0,5) == "File:")
									images.push(usercontribs[i].title);
								count++;								
							}
						}
					}
					if (!$('.nuke-query-result').length)
						self.outputError("Nenhuma contribuição do usuário encontrada");
					else {
						if (images.length > 0)
							self.displayImages(images);
					}
				}
				else
					self.outputError("Falha ao obter as contribuições do usuário: " + d.error.code);
			})
			.fail(function() {
				self.outputError("Falha ao obter as contribuições do usuário");
			});
			$('#nuke-status').empty();
		}
		else {
			$('#mw-content-text p').html('Esta ferramenta permite a exclusão em massa de páginas recentemente adicionadas por um determinado usuário ou endereço de IP.<br/>Digite o nome de usuário ou endereço IP para obter uma lista de páginas para excluir ou deixe em branco para todos os usuários.<br/>Nome de usuário, endereço de IP ou em branco: <input type="text" id="nuke-username"/><br/>Padrão para o nome da página: <input type="text" id="nuke-match"/><br/>Limitar ao namespace: <select id="nuke-namespace"><option value="All">Todos</option><option value="Main" ns="0">Principal</option><option value="Project" ns="4">Project</option><option value="Project talk" ns="5">Project talk</option><option value="Talk" ns="1">Discussão</option><option value="User" ns="2">Usuário</option><option value="User talk" ns="3">Usuário Discussão</option><option value="File" ns="6">Arquivo</option><option value="File talk" ns="7">Arquivo Discussão</option><option value="Template" ns="10">Predefinição</option><option value="Template talk" ns="11">Predefinição Discussão</option><option value="Help" ns="12">Ajuda</option><option value="Help talk" ns="13">Ajuda Discussão</option><option value="Category" ns="14">Categoria</option><option value="Category talk" ns="15">Categoria Discussão</option></select><br/>Número máximo de páginas: <input type="text" id="nuke-max" value="500"/><br/><a class="wikia-button" id="nuke-rc">Vá</a><br/><div id="nuke-status"/><div id="nuke-query-results"/>');
		
			$('#nuke-rc').click(function() {
				if ($(this).attr('disabled')) return;
			
				$(this).attr('disabled','disabled');
			
				if ($('#nuke-username').val()) {
					var locationStr = config.wgArticlePath + 'Especial:P\u00e1gina_em_branco?blankspecial=nuke&nukeuser=' + $('#nuke-username').val();
 
					if ($('#nuke-namespace').val() != "All")
						locationStr += '&nukenamespace=' + $('#nuke-namespace option:selected').attr('ns');
 
					if ($.isNumeric($('#nuke-max').val()) && $('#nuke-max').val() > 0)
						locationStr += '&nukelimit=' + $('#nuke-max').val();
 
					if ($('#nuke-match').val())
						locationStr += '&nukematch=' + $('#nuke-match').val();
 
					location.replace(locationStr);
					return;
				}
 
				$('#nuke-query-results').empty();
 
				if ($('.nuke-submit').length) {
					$('.nuke-submit').remove();
					$('#mw-content-text > p:nth-child(1) > br:nth-child(14)').remove();
				}
 
				$('#nuke-status').html('Obtendo páginas... por favor, aguarde <img src="' + config.stylepath + '/common/progress-wheel.gif"/>');
 
				API.get({	
					action: 'query',
					list: 'recentchanges',
					rcshow: '!bot',
					rctype: 'new|log',
					rclimit: 5000,
					cb: new Date().getTime() 
				})
				.done(function(d) {
					if (!d.error) {
						var recentchanges = d.query.recentchanges,
						RCTitles = [],
						maxLimit = $('#nuke-max').val() || 5000,
						count = 0,
						images = [];
						
						for (var i in recentchanges) {
							if (count >= maxLimit) break;
							
							if ($.inArray(recentchanges[i].title,RCTitles) == -1 && (($('#nuke-namespace').val() == "Main" && recentchanges[i].title.split(':').length === 1) || $('#nuke-namespace').val() == "All" || $('#nuke-namespace').val() == "Project" && new RegExp(config.wgFormattedNamespaces[4] + ':').test(recentchanges[i].title) || $('#nuke-namespace').val() == "Project talk" && new RegExp(config.wgFormattedNamespaces[5] + ':').test(recentchanges[i].title) || new RegExp($('#nuke-namespace').val() + ':').test(recentchanges[i].title)) && (recentchanges[i].type == "new" || (recentchanges[i].type == "log" && recentchanges[i].ns == 6))) { 
								if (!$('#nuke-match').val() || new RegExp($('#nuke-match').val()).test(recentchanges[i].title)) {
									RCTitles.push(recentchanges[i].title);
									var escapedTitle = encodeURIComponent(recentchanges[i].title);
									$('#nuke-query-results').append('<li class="nuke-query-result"><input type="checkbox" class="nuke-title-check" checked="checked"/> <a href="' + config.wgArticlePath + escapedTitle + '" target="_blank"> ' + recentchanges[i].title + '</a></li>');
									if (recentchanges[i].title.slice(0,5) == "File:")
										images.push(recentchanges[i].title);
									count++;
								}
							}
						}
						if (!$('.nuke-query-result').length)
							self.outputError("Nenhuma mudança recente encontrada");
						else {
							$('#nuke-query-results').before('<br/><a class="wikia-button nuke-submit">Delete</a>').after('<a class="wikia-button nuke-submit">Excluir</a>');					 
							$('#nuke-status').empty();
							if (images.length > 0)
								self.displayImages(images);
						}
					}
					else
						self.outputError("Falha ao obter as mudanças recentes: " + d.error.code);
				})
				.fail(function() {
					self.outputError("Falha ao obter as mudanças recentes");
				});
				$('#nuke-status').empty();
				$(this).removeAttr('disabled');
			});
		}

		$('.nuke-submit').click(function() {
			if (!$('.nuke-query-result').length || $(this).attr('disabled')) return;
		
			$('.nuke-submit').attr('disabled','disabled');
			$('#nuke-status').html('Excluindo páginas... por favor, aguarde <img src="' + config.stylepath + '/common/progress-wheel.gif"/>');
			$('.nuke-title-check:checked').each(function(i) {
				var title = $(this).parent().find('a').text();
				setTimeout(function() {
					API.post({
					action: 'delete',
					title: title,
					reason: $('#nuke-delete-reason').val() || '',
					bot: true,
					token: token
					})
					.done(function(d) { 
						if (!d.error) {
							console.log('Exclusão de ' + title + ' bem-sucedida!');
						} 
						else {
							console.log('Falha ao excluir ' + title + ': '+ d.error.code);
						}
					})
					.fail(function() {
						console.log('Falha ao excluir ' + title);
					});
					if (i === $('.nuke-title-check:checked').length - 1) {
						setTimeout(function() {
							location.replace(config.wgArticlePath + config.wgMainpage);
						}, 1000);	 
					}
				}, i*deleteDelay);		
			});
		});
	},
	outputError: function(text) {
		switch (config.skin) {
			case 'oasis': 
			case 'wikia':
				new BannerNotification(text,'error').show();				
			break;
			
			default:
				alert(text);
			break;
		}
	},
	displayImages: function(imgs) {
		API.post({ //POST instead of GET for longer length
		action: 'query',
		prop: 'imageinfo',
		titles: imgs.join('|'),
		iiprop: 'url',
		iilimit: 500
		})
		.done(function(d) {
			if (!d.error) {
				mw.util.addCSS('.thumbnail-nuke { width: 120px; height: 77px; }');
				for (var i in d.query.pages) {
					if (d.query.pages[i].missing != "") {
						var href = config.wgArticlePath + encodeURIComponent(d.query.pages[i].title);
						$('a[href="' + href + '"]').parent().children('.nuke-title-check').after('<a href="' + href + '"><img class="thumbnail-nuke" src="' + d.query.pages[i].imageinfo[0].url + '" /></a>');
					}
				}
			}
			else
				self.outputError('Falha ao exibir imagens: ' + d.error.code);
		})
		.fail(function() {	
			self.outputError('Falha ao exibir imagens');			
		});
	}
};

switch (mw.config.get('wgCanonicalSpecialPageName')) {
	case "Contributions":
		$('#contentSub a:last-child').after(' | <a title="Especial:Nuke" href="' + mw.config.get('wgArticlePath').replace('$1','Especial:P\u00e1gina_em_branco?blankspecial=nuke&nukeuser=' + mw.config.get('wgPageName').split('/')[1] ) + '">Nuke</a>');
	break;
	
	case "Specialpages":
		if (!$('a[title="Especial:Nuke"]').length)
			$('.mw-specialpagerestricted a[title="Especial:Restaurar"]').after('<li class="mw-specialpagerestricted"><a title="Especial:Nuke" href="' + mw.config.get('wgArticlePath').replace('$1','Especial:P\u00e1gina_em_branco?blankspecial=nuke') + '">Excluir em massa</a></li>');
		else
			$('.mw-specialpagerestricted a[title="Especial:Nuke"]').after('<li class="mw-specialpagerestricted"><a title="Especial:Nuke" href="' + mw.config.get('wgArticlePath').replace('$1','Especial:P\u00e1gina_em_branco?blankspecial=nuke') + '">Excluir em massa (JavaScript)</a></li>');		
	break;
	
	case "Blankpage":
		if ($.getUrlVar('blankspecial') == "nuke")
			self.init();
	break;
	
	default:
		return;
	break;
}

});