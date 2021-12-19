/**
 * GetNewlyImportedPages
 * @description Retrieves a list of all newly imported pages
 * and makes it possible to copy it to AjaxBatchDelete.js.
 * Partly borrows code from AjaxBatchDelete.
 * @todo Make it possible to ignore "Page already deleted"
 * warnings (checkbox?), fix timestamp selection & design,
 * copy to clipboard, btns for adding/removing username from
 * input, multi-username?
 * @author Professor Hershel Theodore Layton
 */

mw.loader.using('mediawiki.api', function() {
	'use strict';
	
	var	api = new mw.Api(),
		countPages = 0,
		modalReady = false,
		gnipFindContinueTimeout = 3000,
		gnipModal,
		placement,
		preloads = 2;
	
	// Wait for all dependencies (Modal, Placement) to load, then init
	function preload() {
		if (--preloads === 0) {
			placement = window.dev.placement.loader;
			
			placement.script('GetNewlyImportedPages');
			$(placement.element('tools'))[placement.type('prepend')](
				$('<li>').append(
					$('<a>', {
						style: 'cursor: pointer;',
						id: 'gnipToolbarBtn',
						text: 'GNIP',
						click: click
					})
				)
			);
		}
	}
	
	// Init/Open the modal
	function click() {
		if (gnipModal) {
			gnipModal.show();
			return;
		}
		gnipModal = new window.dev.modal.Modal({
			content: formHtml(),
			id: 'gnipModal',
			size: 'large',
			title: 'Get Newly Imported Pages',
			buttons: [
				{
					id: 'gnipBtnFind',
					text: 'Find pages',
					primary: true,
					event: 'findPages'
				},
				{
					id: 'gnipBtnClear',
					text: 'Clear',
					event: 'clear'
				},
				{
					id: 'gnipBtnABD',
					text: 'Open in AjaxBatchDelete',
					event: 'copyToAjaxBatchDelete'
				},
			],
			events: {
				clear: function() {
					if (!modalReady) return;
					countPages = 0;
					$('#gnipResults').val('');
					$('#gnipSuccessMessages, #gnipErrors').html('');
				},
				copyToAjaxBatchDelete: function() {
					if (!modalReady) return;
					var pagesList = $('#gnipResults').val();
					$('#t-bd').click();
					$('#ajax-delete-reason').val("Mergetest(s) successful: Clean-up using GNIP+ABD");
					$('#text-mass-delete').val(pagesList);
					this.hide();
					$('#t-bd').click();
				},
				findPages: findPages
			}
		});
		gnipModal.create();
		
		$('#gnipForm #gnipResults').text('');
		modalReady = true;
		
		gnipModal.show();
	}
	
	// InnerHTML of the modal
	function formHtml() {
        return $('<form>', {
			id: 'gnipForm',
            'class': 'WikiaForm'
        }).append(
			$('<div>', {
				style: 'padding: 10px;'
			}).append(
				$('<p>').append(
					$('<label>', {
						'for': 'gnipByUser',
						text: 'By user (optional):'
					}),
					/*
					$('<input>', {
						style: 'width: 400px;',
						type: 'text',
						name: 'gnipByUser',
						id: 'gnipByUser',
						value: mw.config.get('wgUserName')
					}),
					*/
					(new OO.ui.TextInputWidget({
						id: 'gnipByUser',
						value: mw.config.get('wgUserName')
					})).$element,
					$('<br>', {
						style: 'margin-bottom: 20px;'
					}),
					$('<label>', {
						'for': 'gnipTimestampFromDate',
						text: 'Timestamp: from (optional) '
					}),
					$('<input>', {
						type: 'date',
						id: 'gnipTimestampFromDate',
						name: 'gnipTimestampFromDate'
					}),
					$('<input>', {
						type: 'time',
						id: 'gnipTimestampFromTime',
						name: 'gnipTimestampFromTime'
					}),
					$('<label>', {
						'for': 'gnipTimestampToDate',
						text: ' to (optional) '
					}),
					$('<input>', {
						type: 'date',
						id: 'gnipTimestampToDate',
						name: 'gnipTimestampToDate'
					}),
					$('<input>', {
						type: 'time',
						id: 'gnipTimestampToTime',
						name: 'gnipTimestampToTime'
					})
				),
				$('<p>', {
					style: 'margin-top: 20px;',
					text: 'Results:'
				}),
				$('<textarea>', {
					// disabled: true,
					style: 'min-height: 160px; min-width: calc(100% - 22px); max-width: calc(100% - 22px); resize: vertical; padding: 10px; border: 1px solid gray;',
					id: 'gnipResults'
				}),
				$('<p>', {
					style: 'margin-top: 20px;',
					text: 'Status:'
				}),
				$('<div>', {
					style: 'max-height: 200px; width: calc(100% - 22px); padding: 10px; overflow-y: scroll; border: 1px solid #018c30; background: #018c3020; color: #018c30;',
					id: 'gnipSuccessMessages'
				}),
				$('<p>', {
					style: 'margin-top: 20px;',
					text: 'Warnings:'
				}),
				$('<div>', {
					style: 'max-height: 200px; width: calc(100% - 22px); padding: 10px; overflow-y: scroll; border: 1px solid #de5e33; background: #de5e3320; color: #de5e33;',
					id: 'gnipWarnings'
				}),
				$('<p>', {
					style: 'margin-top: 20px;',
					text: 'Errors:'
				}),
				$('<div>', {
					style: 'max-height: 200px; width: calc(100% - 22px); padding: 10px; overflow-y: scroll; border: 1px solid #e81a3f; background: #e81a3f20; color: #e81a3f;',
					id: 'gnipErrors'
				})
			)
        ).prop('outerHTML');
    }
	
	function findPages(lecontinue) {
		if (!modalReady) return;
		if (typeof lecontinue === 'undefined') lecontinue = "";
		
        var config = {
			action: 'query',
			list: 'logevents',
			letype: 'import',
			lelimit: 'max',
			leprop: ['ids', 'title', 'details'],
		};
		
		if (lecontinue.length) config['lecontinue'] = lecontinue;
		
		var	byUser		= $('#gnipByUser input[type="text"]').val(),
			fromDate	= $('#gnipTimestampFromDate').val(),
			fromTime	= $('#gnipTimestampFromTime').val(),
			toDate		= $('#gnipTimestampToDate').val(),
			toTime		= $('#gnipTimestampToTime').val(),
			date;
		
		// User filter
		if (byUser) config['leuser'] = byUser;
		
		// Timestamp (from) filter
		if (fromDate) {
			date = new Date(fromDate);
			
			if (fromTime) {
				date.setHours(fromTime.substr(0, 2));
				date.setMinutes(fromTime.substr(-2));
			}
			
			console.log(date.toISOString());
			config['lestart'] = date.toISOString();
		}
		
		// Timestamp (to) filter
		if (toDate) {
			date = new Date(toDate);
			
			if (toTime) {
				date.setHours(toTime.substr(0, 2));
				date.setMinutes(toTime.substr(-2));
			}
			
			console.log(date.toISOString());
			config['lestart'] = date.toISOString();
		}
		
		// API
		api.get(config).done(function(results) {
			results.query.logevents.forEach(function(page) {
				var list = $('#gnipResults').val();
				
				if (!page.pageid) {
					printWarning('Found page "' + page.title + '", but it has already been deleted.');
					return;
				}
				
				if (list.indexOf(page.title) !== -1) {
					printWarning('Found page "' + page.title + '", but it is already listed.');
					return;
				}
				
				$('#gnipResults').val(list + page.title + '\n');
				
				countPages++;
			});
			
			if (results.hasOwnProperty('continue'))
				window.setTimeout(findPages(results['continue'].lecontinue), gnipFindContinueTimeout);
			else if (countPages) {
				printSuccess("Added " + countPages + " pages.");
				countPages = 0;
			}
		}).fail(function(response) {
			printError('API error - check console!');
			console.error("GNIP Error:");
			console.error(response);
		});
    }
	
	function printSuccess(text) {
        $('#gnipSuccessMessages').append(text, '<br>');
    }
	
	function printWarning(text) {
        $('#gnipWarnings').append(text, '<br>');
    }
	
	function printError(text) {
        $('#gnipErrors').append(text, '<br>');
    }
	
	mw.hook('dev.modal').add(preload);
	mw.hook('dev.placement').add(preload);
	
	importArticles({
		type: 'script',
		articles: [
			'u:dev:MediaWiki:AjaxBatchDelete.js',
			'u:dev:MediaWiki:Modal.js',
			'u:dev:MediaWiki:Placement.js',
		]
	});
	
	window.batchDeleteDelay = 500;
});