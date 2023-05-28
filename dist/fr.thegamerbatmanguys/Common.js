console.log("xx");
/* Tout JavaScript présent ici sera exécuté par tous les utilisateurs à chaque chargement de page. */
/*$(function() {
console.log("check");
var conf = mw.config.get([
    'wgPageName',
    'wgRestrictionMove',
    'wgFormattedNamespaces',
    'wgUserName',
    'wgNamespaceNumber'
]);

var pagename = conf.wgPageName;
var move_level = conf.wgRestrictionMove;
var name_space = conf.wgNamespaceNumber;

if (!$('body').hasClass('ns-special')) {
	if (window.location.href.match('custommobtools=1') !== null ) {
		$('#wpSummary').val('[MobileEdittools] Undo revision ' + window.location.href.match(/oldid\=([0-9]+)/)[1]);
	}
	else {
		var importLink = '';
		
		if (name_space == 6) {
			importLink = '<li><a href="/fr/wiki/Special:Upload?wpDestFile='+pagename+'&wpForReUpload=1">Remplacer</a></li>';
		} else {
			importLink = '<li><a href="' + mw.util.getUrl('Special:Upload') + '">Importer un fichier</a></li><li><a href="/fr/wiki/Special:Upload?useskin=fandomdesktop">Importer un fichier (bureau)</a></li>';
		}
		
		$.when( 
			$('.skin-fandommobile div.wiki-page-header__title-wrapper').append(
				$('<div>',{
					'style': 'width:100%; position:relative;'
				}).append(
					$('<div>', {
						id: 'm-edittools',
						'class': 'wds-dropdown wds-is-touch-device',
						'style': 'position:absolute; top:-10px; right:0;'
					}).append(
						$('<div>', {
							'class': 'wds-dropdown__toggle'
						}).append(
							'<svg class="wds-icon wds-icon-small"><path d="M9 5c1.103 0 2-.896 2-2s-.897-2-2-2-2 .896-2 2 .897 2 2 2m0 8c-1.103 0-2 .896-2 2s.897 2 2 2 2-.896 2-2-.897-2-2-2m0-6c-1.103 0-2 .896-2 2s.897 2 2 2 2-.896 2-2-.897-2-2-2"></path></svg>'
						),
						$('<div>',{
								'class': 'wds-is-right-aligned wds-dropdown__content wds-is-not-scrollable'
						}).append(
							$('<ul>', {
								'class': 'wds-list wds-is-linked'
							}).append(
								'<li><a href="' + mw.util.getUrl('Special:EditPage/'+pagename)+'" >Modifier</a></li>',
								'<li><a href="' + mw.util.getUrl('Special:History/'+pagename) + '">Historique</a></li>',
								'<li><a href="' + mw.util.getUrl('Special:MovePage/'+pagename) + '">Renommer</a></li>',
								'<li><a href="' + mw.util.getUrl(pagename) + '?action=purge">Purge du cache</a></li>',
								'<li><a href="' + mw.util.getUrl(pagename) + '?action=protect">Protéger</a></li>',
								'<li><a href="' + mw.util.getUrl(pagename) + '?action=delete">Supprimer</a></li>',
								'<li><a href="' + mw.util.getUrl('Special:WhatLinksHere/'+pagename) + '">Pages liées</a></li>',
								importLink,
								'<li><a href="' + mw.util.getUrl('Special:PrefixIndex/'+pagename) + '">Toutes les pages commençant par...</a></li>',
								'<li><a href="' + mw.util.getUrl(pagename) + '?useskin=fandomdesktop">Affichage bureau</a></li>'
							)
						)
					)
				)
			) 
		).done(function() {
			var mcheck = 0;
			$(window).on("click", function(event){
				if (!$("#m-edittools").get(0).contains(event.target)){
					mcheck = 0;
					$('#m-edittools').removeClass('wds-is-active');
				}
			});
			$('#m-edittools .wds-dropdown__toggle').click(function() {
				if (mcheck === 0) {
					mcheck = 1;
					$('#m-edittools').addClass('wds-is-active');
				} else {
					mcheck = 0;
					$('#m-edittools').removeClass('wds-is-active');
				}
			});	
		});
	}
}
else if ($('body').hasClass('mw-special-MobileDiff')) {
	revid = $('#mw-mf-diff-info > h2 > a').attr('href');
	$('.post-content').append(
		$('<div>', {
			id: 'm-modtools', 'style': 'text-align:right;'
		}).append(
			$('<a>', {
				'title': 'Undo',
				'href': revid + '&direction=prev&action=edit&useskin=fandomdesktop&custommobtools=1',
				text: 'Undo'
			})
		)
	);
}
});*/