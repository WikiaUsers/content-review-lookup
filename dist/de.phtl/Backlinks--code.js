/* Script to find backlinks
 * (regardless of whether the linked page exists or not)
 * and replace them.
 *
 * @author PHTL
 */
(function() {
	importArticle({
	    type: 'style',
	    article: 'u:de.phtl:MediaWiki:Backlinks/code.css'
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
		$('#blLog ul').prepend(
		    $('<li>', {
	    	    class: status,
	    	    text: msg
	    	})
		);
	}

	var messages = {
	    en: {
	        apiEditSummary: "Bot: Replace links: ",
	        appnameHeader: "Backlink Replacer",
	        buttonClose: "Close",
	        buttonClearLog: "Clear log",
	        buttonHelp: "Help",
	        buttonStart: "Start",
	        buttonStop: "Stop",
	        errorEmpty: "Error: Empty input",
	        errorUnequalLength: "Error: Unequal number of lines or empty input",
	        help: "If the first letter of a backlink is lower-case, it will also be lower-case in the replacement.",
	        helpURL: "https://phtl.fandom.com/de/wiki/Backlinks?uselang=en",
	        toolbarLink: "Replace backlinks",
	        logCollectResult: "Received $2 backlinks for \"$1\".",
	        logErrorSaving: "Error while saving \"$1\"! Backlinks could not be replaced.",
	        logFinished: "Finished",
	        logReplacing: "Replacing [[$2]] with [[$3]] in \"$1\"...",
	        logSaved: "Page \"$1\" has been updated.",
	        logSkipCollectingEmpty: "Skipped collecting backlinks for empty value in line $1.",
	        logSkipCollectingNochange: "Skipped page \"$1\", there is nothing to change.",
	        logSkipCollectingNotlinked: "Skipped page \"$1\" as it is not linked.",
	        logSkipSecondEdit: "Skipped page \"$1\", all backlinks have already been replaced.",
	        logStop: "The script was stopped.",
	        logVersion: "Backlink Replacer, version $1",
	        placeholderOld: "Insert links that shall be replaced here, separated by line breaks.",
	        placeholderNew: "Insert replacements here on the according line.",
	        warningNoBotRights: "Warning: Your account does not have bot rights!"
	    },
	    de: {
	        apiEditSummary: "Bot: Ersetze Links: ",
	        appnameHeader: "Backlinks-Ersetzer",
	        buttonClose: "Schliessen", // "ß" => "ss" (ist in Großbuchstaben)
	        buttonClearLog: "Log leeren",
	        buttonHelp: "Hilfe",
	        buttonStart: "Beginnen",
	        buttonStop: "Abbrechen",
	        errorEmpty: "Fehler: Leere Eingabe",
	        errorUnequalLength: "Fehler: Ungleiche Anzahl an Zeilen oder leere Eingabe",
	        help: "Wenn der erste Buchstabe in einem Backlink klein ist, wird er auch im ersetzten Link klein sein.",
	        helpURL: "https://phtl.fandom.com/de/wiki/Backlinks?uselang=de",
	        toolbarLink: "Backlinks ersetzen",
	        logCollectResult: "$2 Backlinks für \"$1\" erhalten.",
	        logErrorSaving: "Fehler während des Speicherns von \"$1\"! Backlinks konnten nicht ersetzt werden.",
	        logFinished: "Vorgang abgeschlossen",
	        logReplacing: "Ersetze [[$2]] durch [[$3]] in \"$1\"...",
	        logSaved: "Die Seite \"$1\" wurde aktualisiert.",
	        logSkipCollectingEmpty: "Sammeln von Backlinks übersprungen für leeren Wert in Zeile $1.",
	        logSkipCollectingNochange: "Seite \"$1\" überpsrungen, da es keine Veränderung gibt.",
	        logSkipCollectingNotlinked: "Seite \"$1\" ist nicht verlinkt.",
	        logSkipSecondEdit: "Seite \"$1\" übersprungen, hier wurden bereits alle Backlinks ersetzt.",
	        logStop: "Das Skript wurde angehalten.",
	        logVersion: "Backlink-Ersetzer, Version $1",
	        placeholderOld: "Füge zu suchende Links hier getrennt durch Zeilenumbrüche ein.",
	        placeholderNew: "Füge hier die Ersetzungen ein, in der zur Liste mit den alten Links entsprechenden Zeile.",
	        warningNoBotRights: "Achtung: Dein Benutzerkonto hat keine Bot-Rechte!"
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

		var api	= new mw.Api();
		var bl = {};
		var nl = "\r\n";

		bl.isBot = mw.config.get('wgUserGroups').includes('bot');
		bl.isSysop = mw.config.get('wgUserGroups').includes('sysop');

		if (!bl.isBot && !bl.isSysop) {
		    return false;
		}

		bl.vernum = '1.0.0';
		bl.sleep1 = 2; // Wait 2 seconds
		bl.sleep2 = 5; // Wait 5 seconds
		bl.stop = false;

		// Create form
		$('.main-container').after(
			$('<div>', {
				id: 'blMask'
			}).append(
			    $('<div>', {
			        id: 'blWindow'
			    }).append(
			        $('<h2>').html(i18n.appnameHeader).append(
		    	        $('<span>', {
		    	            class: 'blToggle wds-button wds-is-text',
		    	            text: i18n.buttonClose
		    	        })
		    	    ).append(
			            $('<span>', {
			                id: 'blHelpToggle',
		    	            class: 'wds-button wds-is-text',
		    	            text: i18n.buttonHelp,
		    	            click: function() {
		    	            	window.open(i18n.helpURL, "_blank");
		    	            }
		    	        })
		            )
		        ).append(
		        	bl.isBot && " " || $('<span>', {
		        		class: 'blWarning',
		        		text: i18n.warningNoBotRights
		        	})
		        ).append(
			        $('<div>', {
			            id: 'blForm'
			        }).append(
		    	        $('<div>', {
		    	            id: 'blMessage'
		    	        })
		            ).append(
		    	        $('<div>').append(
		    	            $('<textarea>', {
		    	                id: 'blOld',
		    	                style: 'float: left;',
		    	                placeholder: i18n.placeholderOld
		    	            })
		    	       ).append(
		    	            $('<textarea>', {
		    	                id: 'blNew',
		    	                style: 'float: right;',
		    	                placeholder: i18n.placeholderNew
		    	            })
		    	        )
		            ).append(
		    	        $('<div>').append(
		    	            $('<span>', {
		    	                id: 'blSubmit',
		    	                class: 'wds-button',
		    	                text: i18n.buttonStart
		    	            })
		    	       ).append(
		                    $('<span>', {
		    	                id: 'blStop',
		    	                class: 'wds-button wds-is-secondary',
		    	                text: i18n.buttonStop
		                    })
		                )
		    	    ).append(
		    	        $('<div>').append(
		    	            $('<div>', {
		    	                id: 'blLog'
		    	            }).append(
			                    $('<ul>')
			                )
			           ).append(
			                $('<span>', {
			                    id: 'blClr',
			                    class: 'wds-button',
			                    text: i18n.buttonClearLog
			                })
			            )
				    )
			    ).append(
			        $('<div>', {
			            id: 'blHelp',
			            text: i18n.help,
			            style: 'display: none;'
			        })
		    	)
			).css('display', 'none')
		);

		$('#blMessage').hide();
		log(i18n.logVersion.replace('$1', bl.vernum), 0);

		$('#my-tools-menu').append(
			$('<li>', {
			    class: 'blToggle overflow'
			}).html(
			    $('<a>', {
		    		id: 'blToggleLink',
		    		href: '#',
		    		text: i18n.toolbarLink
		    	})
			)
		);
		$('.blToggle').on('click', function() {
			$('#blMask').toggle();
		});
		/*
		$('#blHelpToggle').on('click', function() {
		    $('#blForm, #blHelp').slideToggle('fast');
		});
		*/

		function logFinished(checks) {
			var isLastItem = true;

			checks.forEach(function(i, val) {
				if (Object.keys(val[0]).length - 1 != val[1]) {
					isLastItem = false;
				}
			});

			if (!isLastItem) {
				return false;
			}

	        log(i18n.logFinished, 2);
	        $('#blOld, #blNew').val('');
		}

		// Clear log click function
		$('#blClr').on('click', function() {
		    $('#blLog ul').html('');
		    log(i18n.logVersion.replace('$1', bl.vernum), 0);
		});

		$( '#blStop' ).on('click', function() {
		    bl.stop = true;
		});

		// Submit click function
		$('#blSubmit').on('click', function() {
			$('#blMessage').html('').hide();

			// Get page names
			bl.oldpn = $('#blOld').val().split("\n");
			bl.newpn = $('#blNew').val().split("\n");
			bl.backlinks = {};
			bl.skips = [];

			// Checks
			if ($('#blOld').val() === '' || $('#blNew').val() === '') {
				$('#blMessage').html(i18n.errorEmpty).show();
				return;
			}
			if (bl.oldpn.length !== bl.newpn.length) {
				$('#blMessage').html(i18n.errorUnequalLength).show();
				return;
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
					logFinished([bl.oldpn, i]);
					return;
				}
				if (val === bl.newpn[i]) {
				    log(i18n.logSkipCollectingNochange.replace('$1', val), 1);
					logFinished([bl.oldpn, i]);
					return; 
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
						action: 'query',
						list: 'backlinks',
						bltitle: val,
						blredirect: true,
						bllimit: 'max'
					}).done(function(api_backlinks) {
						var backlinks = api_backlinks.query.backlinks;

						if (backlinks.length === 0) {
							log(i18n.logSkipCollectingNotlinked.replace('$1', val), 1);
						} else {
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
				    // Possible solution https://stackoverflow.com/a/6700
				    // console.log('Solution: ' + i + '/' + (Object.keys(bl.backlinks).length - 1));

					$.each(val, function(nr, data) {
						window.setTimeout(function() {
							var makeApiCall = true;

						    if (bl.stop) {
						        bl.backlinks = {};
						        bl.stop = false;
						        bl.timeout = 0;
						        log(i18n.logStop, 3);
						        return;
						    }

							if (bl.skips.includes(data.title)) {
								log(i18n.logSkipSecondEdit.replace('$1', data.title), 0);
								makeApiCall = false;
							}

							makeApiCall && api.get({
								action: 'query',
								titles: data.title,
								prop: 'revisions',
								rvprop: 'content'
							}).done(function(api_page) {
								var page = api_page.query.pages[Object.keys(api_page.query.pages)[0]];
		        				var content = page.revisions[0]['*'];

								bl.replacements = {};
								bl.summary = i18n_wiki.apiEditSummary;

								$.each(bl.oldpn, function(old_i, old_val) {
									var regex = {};
									var oldContent = content;
									var new_val = bl.newpn[old_i];

									regex.flags = 'g';
									// Make first character in linktext case-insensitive
									regex.firstlowc = (old_val.substr(0, 1) === old_val.substr(0, 1).toLowerCase());
									regex.escape = mw.RegExp.escape(old_val);
									regex.escold =
									    '(?:' +
									    regex.escape.substr(0, 1).toUpperCase() +
									    '|' +
									    regex.escape.substr(0, 1).toLowerCase() +
									    ')' +
									    regex.escape.substr(1);
									// Equalize space character and underscore when finding links
									regex.escold = regex.escold.replace(/ /g, '(?: |_)');
									// Replace underscore with space character for summary
									regex.cleanold = old_val.replace(/_/g, ' ');
									// Replace underscore with space character in new link
									regex.escnew = (regex.firstlowc) ? new_val.substr(0, 1).toLowerCase() + new_val.substr(1).replace(/_/g, ' ') : new_val.replace(/_/g, ' ');
									// Make link from linktext
									regex.oldlink = '\\[\\[' + regex.escold + '(\\|.*)?\\]\\]';
									// Make Regular Expression
									regex.regex = new RegExp(regex.oldlink, regex.flags);

		                            // Check if page contains current link
									if (regex.regex.test(content)) {
									    // New page content
										content = content.replace(regex.regex, '[[' + regex.escnew + '$1]]');

		                                // Log Msg Replacing...
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

		                    if (
		                    	i == Object.keys(bl.backlinks).length - 1 &&
		                    	nr == val.length - 1
		                    ) {
								logFinished([]);
		                        bl.timeout = 0;
		        		    }
						}, bl.timeout);
		
						bl.timeout += bl.sleep2 * 1000;
					});
				});
			}
		});
	});
})();