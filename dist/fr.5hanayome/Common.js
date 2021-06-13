/* Tout JavaScript ici sera chargé avec chaque page accédée par n’importe quel utilisateur. */
/**
 * Page copiée sur le wiki Naruto fr
 * 27 novembre 2020, 19:04 (UTC)
 * https://naruto.fandom.com/fr/wiki/MediaWiki:Common.js
 * This is the central JavaScript file for the Wiki. Any code placed in here will
 * run on every page for every user (logged in or not) on every skin (Oasis).
 * Scripts imported in MediaWiki:ImportJS
 */
(function(window, $, mw) {
	"use strict";

	// Bulk loading scripts.
	// pageScriptList are scripts which only certain pages need.
	var scriptList = [], pageScriptList = [];

	/* Scripts to be loaded everywhere */
 
	// Configure AjaxRC
	(window.ajaxPages = (window.ajaxPages || [])).push(
		"Spécial:Modifications_récentes",
		"Spécial:Liste_de_suivi",
		"Spécial:Journal",
		"Spécial:Contributions",
		"Spécial:Images",
		"Spécial:Nouvelles_pages",
		"Spécial:Liste_des_fichiers",
		"Spécial:WikiActivity"
	);
	
	window.AjaxRCRefreshText = 'Actualisation auto toutes les 60s';
	window.AjaxRCRefreshHoverText = 'Activer l’auto-actualisation de la page';
	window.ajaxCallAgain = ($.isArray(window.ajaxCallAgain) && window.ajaxCallAgain) || [];


	// scriptList.push('u:dev:MediaWiki:UserTags/code.js');
	
	// Bouton Null Edit
	// Charge le bouton Actualiser si la page ne peut être modifiée
	if ($("#ca-edit").length || $("a[data-id='editprofile']").length) {
		scriptList.push('u:dev:MediaWiki:NullEditButton/code.js');
	} else {
		scriptList.push('u:dev:MediaWiki:PurgeButton/code.js');
	}	
	
	// Aperçu des liens
	window.pPreview = $.extend(true, window.pPreview, {RegExp: (window.pPreview || {}).RegExp || {} }); 
    window.pPreview.defimage = 'https://vignette.wikia.nocookie.net/naruto/images/8/89/Wiki-wordmark.png/revision/latest?cb=20130629170436&path-prefix=fr';
    window.pPreview.noimage = 'https://vignette.wikia.nocookie.net/naruto/images/8/89/Wiki-wordmark.png/revision/latest?cb=20130629170436&path-prefix=fr';

 
	/* Scripts de pages spécifiques */
 
	// Lister les Images Dupliquées
	if (mw.config.get('wgPageName') === 'Naruto_Wiki:Images_Dupliquées') {
		pageScriptList.push('u:dev:MediaWiki:DupImageList/code.js');
	}
 
	
	//Tri des catégories (pour Principal et Fichier)
	if ( [0, 6].includes(mw.config.get('wgNamespaceNumber')) ){
		pageScriptList.push('MediaWiki:Common.js/CategoriesSort.js');
	}
	
	// Add custom class for styling long list of refs
	$(function() {
		if ($('.references li').length > 9)
			$('.references').addClass('compactreferences');
	});

	if (mw.config.get('skin') === 'oasis') {
	
		// Ajouteur de modèles dans les pages de fichier
		if (mw.config.get('wgCanonicalNamespace') === 'File' && 
			mw.config.get('wgUserGroups').includes('user'))
			$(function() {
				var Options = {
					'{{Sans licence}}': 'Image sans licence',
					'{{Sans données}}': 'Sans info d\'utilisation',
					'{{Inutilisé}}': 'Image inutilisée',
					'{{Mauvais titre}}': 'Mauvais titre'
				},
				tempOptStr = '';
	 
				for (var i in Options) {
					tempOptStr += '<option value="' + i + '" style="text-align:left;">' + Options[i] + '</option>';
				}
	 
				var html = '<div><select id="FileTemplateAdder" class="oo-ui-dropdownWidget-handle fileTemplateAdder-dropdown">' + tempOptStr + '</select>&nbsp;<a class="wds-button" style="margin:0 1em; cursor:pointer;" id="templateSubmit">Ajouter le modèle</a></div>';
				$('#PageHeader').after(html);
				$('#templateSubmit').click(function() {
					$(this).html('<img src="https://images.wikia.nocookie.net/dev/images/8/82/Facebook_throbber.gif" style="vertical-align: baseline;" border="0" />');
					new mw.Api().post({
						format: 'json',
						action: 'edit',
						title: mw.config.get('wgPageName'),
						token: mw.user.tokens.get('editToken'),
						summary: 'Ajouter le modèle&nbsp;: ' + $('#FileTemplateAdder').val(),
						minor: true,
						appendtext: $('#FileTemplateAdder').val() + "\n"
					})
					.done(function() {
						$('#templateSubmit').text('Ajouter ce modèle aussi !');
						new BannerNotification('Modèle: ' + $('#FileTemplateAdder').val() + ' ajouté avec succès', 'confirmer').show();
					})
					.fail(function() {
						new BannerNotification('Échec de l\'ajout du modèle&nbsp;!', 'erreur').show();
					});
				});
			});
	}
 
	// Import all scripts in bulk (and minified)
	window.importArticles({
        type: 'script',
        articles: scriptList
    }, {
		type: 'script',
		articles: pageScriptList
	});
}(window, jQuery, mediaWiki));