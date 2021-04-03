/**
 * Script to find backlinks and replace them
 * (regardless of whether the linked page exists or not)
 * 
 * NOT YET WORKING ON UCP
 *
 * @author Professor Hershel Theodore Layton
 */
 
importArticles({
    type: 'style',
    articles: ['u:de.hobbit-fragen:MediaWiki:Backlinks/code.css']
});
 
function log(msg, status) {
	switch (status) {
		case 0:
			status = 'hint';
			break;
		case 1:
			status = 'warning';
			break;
		case 2:
			status = 'success';
			break;
		case 3:
			status = 'error';
			break;
	}
	$('#blLog ul').prepend($('<li>', {
	    class: status
	}).html(msg));
}
 
var messages = {
    'en': {
        'apiEditSummary': "Bot: Replace links: ",
        'appnameHeader': "Backlinks corrections",
        'buttonClose': "Close",
        'buttonClearLog': "Clear log",
        'buttonStart': "Start",
        'buttonStop': "Stop",
        'errorEmpty': "Error: Empty input",
        'errorUnequalLength': "Error: Unequal number of lines or empty input",
        'toolbarLink': "Backlinks",
        'logCollectResult': "Received $2 backlinks for \"$1\".",
        'logErrorSaving': "Error while saving \"$1\"! Did not replace backlinks.",
        'logFinished': "Finished",
        'logReplacing': "Replacing [[$2]] with [[$3]] in \"$1\"...",
        'logSaved': "Saved \"$1\".",
        'logSkipCollectingEmpty': "Skipped collecting backlinks for empty value in line $1.",
        'logSkipCollectingNochange': "Skipped collecting backlinks for \"$1\" as there was no change.",
        'logSkipCollectingNotlinked': "Skipped collecting backlinks for \"$1\" as it is not linked.",
        'logSkipSecondEdit': "Skipped double-editing \"$1\".",
        "logStop": "Script was stopped.",
        'logVersion': "Backlinks version $1"
    },
    'de': {
        'apiEditSummary': "Bot: Ersetze Links: ",
        'appnameHeader': "Backlinks-Berichtigungen",
        'buttonClose': "Schliessen", // "ß" => "ss" / "ẞ", konvertiert zu Großbuchstaben
        'buttonClearLog': "Log leeren",
        'buttonStart': "Beginnen",
        'buttonStop': "Abbrechen",
        'errorEmpty': "Fehler: Leere Eingabe",
        'errorUnequalLength': "Fehler: Ungleiche Anzahl an Zeilen oder leere Eingabe",
        'toolbarLink': "Backlinks",
        'logCollectResult': "$2 Backlinks für \"$1\" erhalten.",
        'logErrorSaving': "Fehler während des Speicherns von \"$1\"! Backlinks wurden nicht ersetzt.",
        'logFinished': "Vorgang abgeschlossen",
        'logReplacing': "Ersetze [[$2]] durch [[$3]] in \"$1\"...",
        'logSaved': "\"$1\" gespeichert.",
        'logSkipCollectingEmpty': "Sammeln von Backlinks übersprungen für leeren Wert in Zeile $1.",
        'logSkipCollectingNochange': "Sammeln von Backlinks übersprungen für \"$1\", da es keine Änderung gab.",
        'logSkipCollectingNotlinked': "Sammeln von Backlinks übersprungen für Seite \"$1\", da sie nicht verlinkt ist.",
        'logSkipSecondEdit': "Doppeltes Bearbeiten von \"$1\" übersprungen.",
        "logStop": "Das Skript wurde angehalten.",
        'logVersion': "Backlinks Version $1"
    }
};
 
mw.loader.using([
	'mediawiki.api',
	'mediawiki.user'
], function() {
    if (messages.hasOwnProperty(mw.config.get('wgUserLanguage'))) {
        i18n = messages[mw.config.get('wgUserLanguage')];
    } else {
        i18n = messages.en;
    }
 
    if (messages.hasOwnProperty(mw.config.get('wgContentLanguage'))) {
        i18n_wiki = messages[mw.config.get('wgContentLanguage')];
    } else {
        i18n_wiki = messages.en;
    }
 
	if (mw.config.get('wgUserGroups').includes('sysop')) {
		var api	= new mw.Api();
		var bl	= {};
		var nl	= "\r\n";
 
		bl.vernum = '1.0.0';
		bl.sleep1	= 2; // Wait 2 seconds //
		bl.sleep2	= 5; // Wait 5 seconds //
		bl.stop     = false;
 
        // Build HTML
		$('#WikiaPage').after(
			$('<div>', {
				id: 'blMask'
			}).append(
			    $('<div>', {
			        id: 'blWindow'
			    }).append(
    		        $('<h2>').html(i18n.appnameHeader).append(
    		        $('<span>', {
    		            class: 'blToggle wds-button wds-is-text'
    		        }).html(i18n.buttonClose))
    		    ).append(
    		        $('<span>', {
    		            id: 'blMessage'
    		        })
    		    ).append(
    		        $('<div>').append(
    		            $('<textarea>', {
    		                id: 'blOld',
    		                style: 'float: left;'
    		            })
    		        ).append(
    		            $('<textarea>', {
    		                id: 'blNew',
    		                style: 'float: right;'
    		            })
    		        )
    		    ).append(
    		        $('<div>').append(
    		            $('<span>', {
    		                id: 'blSubmit',
    		                class: 'wds-button'
    		            }).html(i18n.buttonStart)
    		        ).append(
                        $('<span>', {
    		                id: 'blStop',
    		                class: 'wds-button wds-is-secondary'
                        }).html(i18n.buttonStop)
    		        )
    		    ).append(
    		        $('<div>').append(
    		            $('<div>', {
    		                id: 'blLog'
    		            }).append($('<ul>'))
    		        ).append(
    		            $('<span>', {
    		                id: 'blClr',
    		                class: 'wds-button'
    		            }).html(i18n.buttonClearLog)
    		        )
				)
			).css('display', 'none')
		);
 
		$('#blMessage').hide();
		log(i18n.logVersion.replace('$1', bl.vernum), 0);
 
		$('#my-tools-menu').append(
			$('<li>', {
			    class: 'blToggle overflow'
			}).html($('<a>', {
				id: 'blToggleLink',
				href: '#'
			}).text('Backlinks'))
		);
		$('.blToggle').on('click', function() {
			$('#blMask').toggle();
		});
        // Build HTML completed
 
        // Clear log click function
        $('#blClr').on('click', function() {
            $('#blLog ul').html('');
            log(i18n.logVersion.replace('$1', bl.vernum), 0);
        });
 
        $( '#blStop' ).on('click', function() {
            bl.stop = true;
            console.log('Script shall be cancelled.');
        });
 
        // Submit click function
        $('#blSubmit').on('click', function() {
			$('#blMessage').html('');
 
			// Get page names
			bl.oldpn = $('#blOld').val().split("\n");
			bl.newpn = $('#blNew').val().split("\n");
			bl.backlinks= {};
			bl.skips	= [];
 
			// Checks
			if ($('#blOld').val() === '' || $('#blNew').val() === '') {
				$('#blMessage').html(i18n.errorEmpty);
				return false;
			}
			if (bl.oldpn.length !== bl.newpn.length) {
				$('#blMessage').html(i18n.errorUnequalLength);
				return false;
			}
 
            $('#blStop').click(function() {
                bl.backlinks = {};
            });
 
			// Start script
			// Loop through pages
			bl.timeout = 0;
			$.each(bl.oldpn, function(i, val) {
				// Checks
				if (val === '' || bl.newpn[i] === '') {
					log(i18n.logSkipCollectingEmpty.replace('$1', i), 1);
					return true; // Continue
				}
				if (val === bl.newpn[i]) {
				    log(i18n.logSkipCollectingNochange.replace('$1', val), 1);
					return true; // Continue
				}
 
				// Checks okay
				window.setTimeout(function() {
				    if (bl.stop) {
				        bl.backlinks = {};
				        bl.stop = false;
        				log(i18n.logStop, 3);
				        return false;
				    }
 
					// API request backlinks
					api.get({
						action:		'query',
						list:		'backlinks',
						bltitle:	val,
						blredirect:	true,
						bllimit:	'max'
					}).done(function(api_backlinks) {
						var backlinks = api_backlinks.query.backlinks;
 
						// Checks
						if (backlinks.length === 0) {
							log(i18n.logSkipCollectingNotlinked.replace('$1', val), 1);
						} else {
						// Checks okay
							log(i18n.logCollectResult.replace('$1', val).replace('$2', backlinks.length), 2);
							bl.backlinks[i] = backlinks;
						}
 
						if (i === (bl.oldpn.length - 1)) {
							blCorrection();
						}
					});
				}, bl.timeout);
 
				bl.timeout += bl.sleep1 * 1000;
			});
 
			function blCorrection() {
				bl.timeout = 0;
				$.each(bl.backlinks, function(i, val) {
				    // Log message when finished
				    if (i === (bl.backlinks.length - 1)) {
				        log(i18n.logFinished, 2);
                        bl.timeout = 0;
                        $('#blOld, #blNew').val('');
				    }
 
					$.each(val, function(nr, data) {
						window.setTimeout(function() {
						    if (bl.stop) {
        				        bl.backlinks = {};
        				        bl.stop = false;
        				        log(i18n.logStop, 3);
        				        return false;
        				    }
 
							if (bl.skips.includes(data.title)) {
								log(i18n.logSkipSecondEdit.replace('$1', data.title), 0);
								return true;
							}
 
							api.get({
								action:		'query',
								titles:		data.title,
								prop:		'revisions',
								rvprop:		'content'
							}).done(function(api_page) {
								var page		= api_page.query.pages[Object.keys(api_page.query.pages)[0]];
	            				var content		= page.revisions[0]['*'];
 
								bl.replacements = {};
								bl.summary		= i18n_wiki.apiEditSummary;
 
								$.each(bl.oldpn, function(old_i, old_val) {
									var regex = {};
									var oldContent = content;
 
									regex.flags		= 'g';
									regex.escold	= $.escapeRE(old_val).replace(/ /g, '(?: |_)');
									regex.cleanold	= old_val.replace(/_/g, ' ');
									regex.escnew	= bl.newpn[old_i].replace(/_/g, ' ');
									regex.oldlink	= '\\[\\[' + regex.escold + '(\\|.*)?\\]\\]';
									regex.regex		= new RegExp(regex.oldlink, regex.flags);
									regex.under		= new RegExp(regex.escnew, regex.flags);
 
									if (regex.regex.test(content)) {
										content = content.replace(regex.regex, '[[' + regex.escnew + '$1]]');
 
										if (content !== oldContent) {
											bl.summary += '([[' + regex.cleanold + ']] → [[' + regex.escnew + ']]), ';
 
											log(i18n.logReplacing.replace('$1', data.title).replace('$2', old_val).replace('$3', regex.escnew), 0);
										}
									}
 
									if (old_i === (bl.oldpn.length - 1)) {
                                        bl.summary = bl.summary.replace(/(, )$/, '').trim();
 
							    		var config = {
							    			action: 'edit',
								    		token: mw.user.tokens.get('editToken'),
								    		title: data.title,
								    		text: content,
								    		summary: bl.summary,
								    		redirect: false,
								    		watchlist: 'nochange',
								    		minor: true,
								    		bot: true
							    		};
							    		api.post(
								    		config
								    	).done(function(api_submit) {
								    		if (api_submit.hasOwnProperty('error')) {
								    			log(i18n.logErrorSaving.replace('$1', data.title), 3);
								    		} else {
								    			bl.skips.push(data.title);
								    			log(i18n.logSaved.replace('$1', data.title), 2);
								    		}
								    	});
									}
								});
							});
						}, bl.timeout);
 
						bl.timeout += bl.sleep2 * 1000;
					});
				});
			}
        });
	}
});