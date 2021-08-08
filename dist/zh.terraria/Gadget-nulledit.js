mw.loader.using(['site']).done(function() {
	if (mw.config.get("wgArticleId") !== 0) {
		
		var l10n = (function(){
			var $text = {
				'buttonlabel': {
					'en': 'Null edit',
					'de': 'Nulledit',
					'fr': 'Modification nulle',
					'pt-br': 'Edição nula',
					'ru': 'Нулевая правка',
				},
				'hovertext': {
					'en': 'Null edit this page',
					'de': 'Einen Nulledit dieser Seite durchführen',
					'fr': 'Effectuer une modification nulle sur cette page',
					'pt-br': 'Editar nulo esta página',
					'ru': 'Совершить нулевую правку на этой странице',
				},
				'confirmtext': {
					'en': 'This will reload the page. OK?',
					'de': 'Dies wird die Seite neu laden. OK?',
					'fr': 'Ceci rechargera la page. Accepter ?',
					'pt-br': 'Isso irá recarregar a página. OK?',
					'ru': 'Это действие перезагрузит страницу. Продолжить?',
				},
				'failtext': {
					'en': 'Could not perform null edit. Reason: ',
					'de': 'Konnte keinen Nulledit durchführen. Grund: ',
					'fr': 'N\'a pas pû effectuer une modification nulle. Raison : ',
					'pt-br': 'Não foi possível realizar a edição nula. Motivo: ',
					'ru': 'Невозможно совершить нулевую правку. Причина: ',
				}
			}
			var $lang = mw.config.get( 'wgUserLanguage' ) || 'en';
			return function(key){
				return $text[key] && ($text[key][$lang] || $text[key]['en']) || '';
			}
		})();
		
		$(mw.util.addPortletLink('p-cactions', 'javascript:;', l10n('buttonlabel'), 'ca-null-edit', l10n('hovertext'), '2')).click(function() {
			if (!confirm(l10n('confirmtext'))) return;
			new mw.Api().postWithToken('csrf', {action: "edit", title: mw.config.get("wgPageName"), appendtext: ""}).done(function(data) {
				location.reload();
			}).fail(function(code, data) {
				alert(l10n('failtext') + code);
			});
		});
	}
});