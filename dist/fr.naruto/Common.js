/* Tout JavaScript ici sera chargé avec chaque page accédée par n’importe quel utilisateur. */

// Import [[MediaWiki:Onlyifuploading.js]] 

if ( wgCanonicalSpecialPageName == "Upload" ) {
	document.write('<script type="text/javascript" src="/index.php?title=MediaWiki:Onlyifuploading.js&action=raw&ctype=text/javascript&dontcountme=s"></script>');
}

// ============================================================
// BEGIN import Onlyifediting-functions
// SEE ALSO [[MediaWiki:Onlyifediting.js]]
 
if (document.URL.indexOf("action=edit") > 0 || document.URL.indexOf("action=submit") > 0) {
	document.write('<script type="text/javascript" src="/wiki/index.php?title=MediaWiki:Onlyifediting.js&action=raw&ctype=text/javascript&dontcountme=s"></script>');
}

// END import Onlyifediting-functions
// ============================================================

(function(window, $, mw) {
	"use strict";

	// Bulk loading scripts.
	// scriptList are scripts to load everywhere
	// pageScriptList are scripts which only certain pages need.
	var scriptList = [], pageScriptList = [];

	/* Scripts to be loaded everywhere */
	
	//Library to latinize special characters
	//Extends String class
	scriptList.push('MediaWiki:Common.js/StringLatinize.js');
 
	// Make WantedFiles File:xxx entries become links to Special:Upload (bug fix)
	scriptList.push('MediaWiki:Common.js/FixWantedFiles.js');

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
	//window.AjaxRCRefreshText = 'Automatically refresh every 60secs';
	window.AjaxRCRefreshText = 'Actualisation auto toutes les 60s';
	window.AjaxRCRefreshHoverText = 'Activer l’auto-actualisation de la page';
	window.ajaxCallAgain = ($.isArray(window.ajaxCallAgain) && window.ajaxCallAgain) || [];
	scriptList.push('u:dev:AjaxRC/code.js');


	// Étiquettes utilisateurs
	window.UserTagsJS = {
		tags: {
			bureaucrat: {
				link: 'Project:Bureaucrates',
				title: 'Bureaucrate',
				u: 'Chef Suprême'
			},
			sysop: {
				link: 'Project:Administrateurs',
				title: 'Administrateur',
				u: 'Kage'
			},
			'content-moderator': {
				link: 'Project:Modérateurs',
				title: 'Modérateur de contenu',
				u: 'Jônin'
			},
			threadmoderator: {
				link: 'Project:Modérateurs',
				title: 'Modérateur de Discussions',
				u: 'Chûnin'
			},
			chatmoderator: {
				link: 'Project:Modérateurs',
				title: 'Modérateur de tchat',
				u: 'Chûnin'
			},
			autoconfirmed: {
				title: 'Auto-confirmé',
				u: 'Genin'
			},
			newuser: {
				title: 'Nouveau contributeur',
				u: 'Étudiant à l\'Académie',
				f: 'Étudiante à l\'Académie'
			},
			rollback: {
				link: 'Project:Rollback',
				u: 'Policier'
			},
			inactive: {
				title: 'L\'utilisteur n\'a pas contribué ces 30 derniers jours',
				u: 'Nukenin'
			}
		},
		modules: {
			inactive: 30,
			mwGroups: [
				'bureaucrat', 'sysop', 'content-moderator', 'rollback', 'bot', 'bot-global', 'autoconfirmed'
			],
			//autoconfirmed: true,
			newuser: {
				days: 30, // est présent depuis moins de 30 jours
				edits: 100, // a fait moins de 100 édits
				namespace: 0 // Les édits doivent être faits sur des articles
			},
			metafilter: {
				//sysop: ['bureaucrat'],
				bot: ['bot-global'],
				autoconfirmed: ['bureaucrat', 'sysop', 'content-moderator', 'threadmoderator', 'chatmoderator', 'rollback', 'bot', 'bot-global', 'newuser'],
				threadmoderator: ['content-moderator'],
				chatmoderator: ['threadmoderator']
				//newuser: ['autoconfirmed']
			},
			userfilter: {
				TrishFan: ['bureaucrat'] // Hide bureaucrat from inactive founder
			}
		}
	};
	scriptList.push('u:dev:UserTags/code.js');

	//DiscordIntegrator
	scriptList.push('u:dev:DiscordIntegrator/code.js');
	
	//RailWAM
	window.railWAM = {
	    appendAfter: ['.DiscordIntegratorModule','.rail-module']
	};
	scriptList.push('u:dev:MediaWiki:RailWAM/code.js');
	
	// ArchiveTool
	//window.archiveListTemplate = 'ArchiveList';
	//window.archivePageTemplate = 'ArchivePage';
	//scriptList.push('u:dev:ArchiveTool/code.js');
 
	// Bouton Null Edit
	// Charge le bouton Actualiser si la page ne peut être modifiée
	if ($("#ca-edit").length || $("a[data-id='editprofile']").length) {
		scriptList.push('u:dev:NullEditButton/code.js');
	} else {
		scriptList.push('u:dev:PurgeButton/code.js');
	}
 
	// Liste des fichiers. Voir [[Naruto_Wiki:Liste_des_fichiers]]
	scriptList.push('u:dev:ListFiles/code.js');
 
	// Disable Archive Edit
	//scriptList.push('MediaWiki:Common.js/ArchiveEdit.js');
 
	// Sig Reminder
	scriptList.push('MediaWiki:Common.js/SigReminder.js');
 
	// Warnings
	scriptList.push('MediaWiki:Common.js/Warnings.js');
 
	// Popups de Référence, comme sur Wikipedia
	scriptList.push('u:dev:ReferencePopups/code.js');

	//Affiche la date et l'heure en haut à droite de l'écran
	scriptList.push('u:dev:DisplayClock/code.js');

	//Outil de suppression en masse (Seulement pour les administrateurs)
	scriptList.push('u:dev:AjaxBatchDelete/code.js');
	
	//Correction automatique des liens lors du renommage d'un fichier
	scriptList.push('u:dev:FileUsageAuto-update/code.js');
 
	/* Scripts de pages spécifiques */
 
	// Lister les Images Dupliquées
	if (mw.config.get('wgPageName') === 'Naruto_Wiki:Images_Dupliquées') {
		pageScriptList.push('u:dev:DupImageList/code.js');
	}
 
	// Spécial:Téléverser/Téléversement_multiple
	$(function($) {
		// Détacher la fonctionnalité de téléversement AJAX du boutton "Ajouter une image" des récents téléversements d'images
		// Parce que la pup-up n'obéis pas aux préchargements et autres.
		$('a.wikia-button.upphotos').off('click');
	});
	if (({Upload:1, MultipleUpload:1})[mw.config.get('wgCanonicalSpecialPageName')] === 1) {
		pageScriptList.push(
			'MediaWiki:Common.js/FairUseUpload.js',
			'MediaWiki:Common.js/FixMultipleUpload.js' // Corrige la page Spécial:Téléversement_multiple
		);
	}
 
	if (wgPageName === "Accueil") {
		pageScriptList.push('MediaWiki:LastEpisode.js');
	}
	
	if (wgNamespaceNumber === 0){
	    pageScriptList.push('MediaWiki:Common.js/CategoriesSort.js');
	}
 
	/* Petits scripts qui ne nécessitent pas de page à part */
 
	// Retirer les liens rouges (pages supprimées) des Modifications Récentes
	// [Ils restent rouges, ils ne redirigent simplement pas vers ?action=edit]
	if (({Recentchanges: 1, Log: 1})[mw.config.get('wgCanonicalSpecialPageName')] === 1) {
		var deNewRC = function() {
			$('a.new').each(function() {
				this.href = this.href.replace(/\?[^?]*$/, '');
		});
	};
	$(deNewRC);
		window.ajaxCallAgain.push(deNewRC);
	}
	
	// Add custom class for styling long list of refs
	if ($('.references li').length > 9)
		$('.references').addClass('compactreferences');

	// Oasis-only scripts
	if (mw.config.get('skin') === 'oasis') {
		// Detach the AJAX feature from Page/Image Creation/Upload
		// because the pop-up form does not obey the preloads and such.
		$(window).load(function() {
			$('a.wikia-button.upphotos').click(function() {
				window.location.href = "/wiki/Special:Upload";
				return false;
			});
		});

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
 
			var html = '<div><select id="FileTemplateAdder">' + tempOptStr + '</select>&nbsp;<a class="wikia-button" style="margin:0 1em; cursor:pointer;" id="templateSubmit">Ajouter le modèle</a></div>';
			//$('.comments').after(html);
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
	
	// Custom edit buttons
	if (mw.toolbar) {
		mw.toolbar.addButton(
			'https://images.wikia.nocookie.net/central/images/c/c8/Button_redirect.png',
			'Redirection',
			'#REDIRECTION [[',
			']]',
			'Insérer texte',
			'mw-editbutton-redirect'
		);
 
		/*mw.toolbar.addButton(
			'https://images.wikia.nocookie.net/__cb20100821183407/bleach/en/images/e/e1/O_Accent_Button.png',
			'Add the ō character',
			'ō',
			'',
			'',
			'mw-editbutton-macron-o'
		);
 
		mw.toolbar.addButton(
			'https://images.wikia.nocookie.net/__cb20100821183407/bleach/en/images/d/db/U_Accent_Button.png',
			'Add the ū character',
			'ū',
			'',
			'',
			'mw-editbutton-macron-u'
		);*/
 
		mw.toolbar.addButton(
			'https://images.wikia.nocookie.net/naruto/images/7/79/Button_reflink.png',
			'Ajouter une Référence à un Chapitre',
			'<ref>',
			'</ref>',
			'\'\'Naruto\'\' chapitre 0, page 0',
			'mw-editbutton-ref'
		);

		mw.toolbar.addButton(
			'https://vignette.wikia.nocookie.net/naruto/images/9/96/Button_aquote.png/revision/latest?cb=20141212182610&path-prefix=fr',
			'Ajouter des guillemets',
			'«&nbsp;',
			'&nbsp;»',
			'',
			'mw-editbutton-guillemets'
		);
	}
 
	// HOOK: Verbatim imports embedded on particular pages.
	if ($.isArray(window.pageNeededScripts)) {
		pageScriptList.push.apply(pageScriptList, window.pageNeededScripts);
		try { delete window.pageNeededScripts; } catch(e) { window.pageNeededScripts = null; } // IE8 sucks.
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