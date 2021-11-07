/** <nowiki>
 * Modal to create new entries for version history on article pages
 * 
 * @author DarkBarbarian
 *
 * @license: CC-BY-NC-SA
 * 
 * @version 1.0.1
 */
mw.loader.using('mediawiki.api', function() {
	var conf = mw.config.get([
		'wgNamespaceNumber',
		'wgPageName'
	]),
		api = new mw.Api(),
		token = mw.user.tokens.get('editToken'),
		isVersionsgeschichte = /\/Versionsgeschichte/.test(conf.wgPageName),
		text;
	
	//don't run the script on non-article pages
	if (conf.wgNamespaceNumber !== 0) {
		return;
	}
	
	/**
	 * creates a new BannerNotification
	 */
	 function notification(type, text) {
	 	mw.hook('dev.banners').add(function(BannerNotification) {
	 		new BannerNotification(text, type, undefined, 3000).show();
	 	});
	 }
	
	/**
	 * create HTML structure for input fields
	 */
	function formHtml() {
		return $('<form>', {
			'class': 'WikiaForm'
		}).append(
			$('<fieldset>').append(
				$('<label>', {
					for: 'anv-date',
					text: 'Datum: '
				}).append(
					$('<input>', {
						type: 'text',
						id: 'anv-date',
						style: 'width: 100%;',
						placeholder: '9. Dezember 2019'
					})
				),
				$('<br />'),
				$('<br />'),
				$('<label>', {
					for: 'anv-type',
					text: 'Art: '
				}).append(
					$('<input>', {
						type: 'text',
						id: 'anv-type',
						style: 'width: 100%;',
						placeholder: 'Update/Wartungspause/Event'
					})
				),
				$('<br />'),
				$('<br />'),
				$('<label>', {
					for: 'anv-change',
					text: 'Änderung: '
				}).append(
					$('<textarea>', {
						id: 'anv-change',
						style: 'width: 100%; height: 10em;',
						placeholder: "* '''Bogenschützen-Königin Level 66-70'''\n** ''Verfügbar ab [[Rathaus]]-Level 13''"
					})
				),
				$('<br />'),
				$('<br />'),
				$('<label>', {
					for: 'anv-addition',
					text: 'Siehe auch: '
				}).append(
					$('<input>', {
						type: 'text',
						id: 'anv-addition',
						style: 'width: 100%;',
						placeholder: '[[Benutzer Blog:DarkBarbarian/Winter-Update|Winter-Update]]'
					})
				)
			)
		).prop('outerHTML');
	}
	
	/**
	 * add entered content to the page
	 */
	function addNewVersion(newVersion) {
		var footer = '|}<noinclude>[[Kategorie:Versionsgeschichte]]</noinclude>';
		
		//get old page content to concatenate it with new one
		api.get({
			action: 'query',
			titles: isVersionsgeschichte ? conf.wgPageName : conf.wgPageName + '/Versionsgeschichte',
			prop: 'revisions',
			rvslots: '*',
			rvprop: 'content'
		}).done(function (d) {
			if (!d.error) {
				var data = d.query;
				for (var i in data.pages) {
					if (data.pages[i].missing !== undefined) {
						console.log(conf.wgPageName + ': Die Versionsgeschichte zu diesem Artikel existiert noch nicht! Bitte erstelle sie manuell.');
						notification('error', 'Die Versionsgeschichte zu diesem Artikel existiert noch nicht! Bitte erstelle sie manuell.');
						return;
					}
					var content = data.pages[i].revisions[0].slots.main['*'];
					if (content.length < footer.length + 1) {
						console.log(conf.wgPageName + ': Vorhandener Wikitext zu kurz! Bitte füge deine Änderung manuell ein.');
						notification('error', 'Vorhandener Wikitext zu kurz! Bitte füge deine Änderung manuell ein.');
						return;
					}
					text = content.slice(0, -(footer.length + 1)) + newVersion + content.slice(-(footer.length + 1));
					break;
				}
				
				//add new wikitext to the page
				api.post({
					action: 'edit',
					title: isVersionsgeschichte ? conf.wgPageName : conf.wgPageName + '/Versionsgeschichte',
					summary: 'Füge neue Änderung hinzu (Skript)',
					nocreate: 'true',
					text: text,
					token: token
				}).done(function (d) {
					if (!d.error) {
						console.log(conf.wgPageName + ': Bearbeitung erfolgreich!');
						notification('confirm', 'Bearbeitung erfolgreich!');
						setTimeout(function() {
							location.reload();
						}, 3000);
					} else {
						console.log(conf.wgPageName + ': Ein Fehler ist aufgetreten: ' + d);
						notification('error', 'Ein Fehler ist aufgetreten: ' + d);
					}
				}).fail(function (d) {
					console.log(conf.wgPageName + ': Ein Fehler ist aufgetreten: ' + d);
					notification('error', 'Ein Fehler ist aufgetreten: ' + d);
				});
			} else {
				console.log(conf.wgPageName + ': Ein Fehler ist aufgetreten: ' + d);
				notification('error', 'Ein Fehler ist aufgetreten: ' + d);
			}
		}).fail(function (d) {
			console.log(conf.wgPageName + ': Ein Fehler ist aufgetreten: ' + d);
			notification('error', 'Ein Fehler ist aufgetreten: ' + d);
		});
	}
	
	/**
	 * show modal to enter contents
	 * is called when clicking on the button in the edit dropdown menu
	 */
	function click () {
		dev.showCustomModal('Füge eine neue Änderung hinzu', {
			content: formHtml(),
			buttons: [
				{
					message: 'Speichern',
					defaultButton: true,
					handler: start
				}, {
					message: 'Hilfe',
					defaultButton: false,
					handler: function() {
						dev.showCustomModal('Hilfe', {
							content: 'Du hast einen Fehler bemerkt oder benötigst Hilfe?<br />Wende dich gerne an die <a href="' + conf.wgServer + conf.wgScriptPath + '/wiki/Clash of Clans Wiki:Administration">Administration</a>!<br /><br />Es ist auch möglich, die Seite manuell zu bearbeiten.',
							buttons: [
								{
									message: 'Manuelle Bearbeitung',
									defaultButton: false,
									handler: function() {
										window.location.href = mw.util.getUrl(isVersionsgeschichte ? null : (conf.wgPageName + '/Versionsgeschichte'),{action: 'edit'});
									}
								}
							]
						});
					}
				}
			],
			id: 'anv-modal'
		});
	}
	
	/**
	 * wraps entered input in wikitext and calls function addNewVersion to add it to the page
	 * is called when clicking on 'Speichern' in the modal
	 * @see addNewVersion
	 */
	function start() {
		var text = '\n|-\n' +
			'!' + $('#anv-date').val() + '\n' +
			'!' + $('#anv-type').val() + '\n' +
			'|\n' +
			$('#anv-change').val();
			
		if ($('#anv-addition').val().length !== 0) {
			text = text + '\n' +
				'<div style="font-size: small; text-align: center;">Siehe auch ' + $('#anv-addition').val() + '</div>';
		}
		
		addNewVersion(text);
	}
	
	/**
	 * init function, places button to open the modal and fires hooks
	 */
	function init() {
		mw.hook('dev.showCustomModal');
		mw.hook('dev.placement').add(function(placement) {
			placement.script('AddNewVersion');
			$(placement.element('editdropdown'))[placement.type('append')] (
				$('<li>').append(
					$('<a>', {
						id: 'anv-button',
						text: 'Neue Änderung hinzufügen',
						title: 'Neue Änderung für die Versionsgeschichte eines Artikels hinzufügen',
						style: 'cursor: pointer !important;',
						click: click
					})
				)	
			);
		});
	}
	
	importArticles({
			type: 'script',
			articles: [
				'u:dev:MediaWiki:BannerNotification.js',
				'u:dev:MediaWiki:Placement.js',
				'u:dev:MediaWiki:ShowCustomModal.js'
			]
		}
	);
	
	init();
});