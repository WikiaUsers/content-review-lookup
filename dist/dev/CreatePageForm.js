mw.loader.using(['oojs-ui', 'mediawiki.api']).then(function() {
	'use strict';

	if ( window.createPageFormInit || !($('.create-page-form').length) ) return;
	
    window.createPageFormInit = true;
    var preloads = 2;
    var msg;
	
	function createPageForm() {
		var formConfig = {
			'data': {
				'template_page': mw.config.values.wgFormattedNamespaces[10] + ':CreatePageBlank'
			}
		};

		var rawDataClass = 'create-page-form';
		var rawDataClassSel = '.' + rawDataClass;
		var rawDataSel = '.' + rawDataClass + ' > tbody';
		var formReadyClass = rawDataClass + '-ready';
		var formReadyClassSel = '.' + formReadyClass;

		var templatePath = formConfig.data.template_page;
		var site = mw.config.values.wgServer;
		var path = (mw.config.values.wgArticlePath).replace(/\$1/gi, '');
		var url = site + path;

		var UI = OO.ui;

		/**/

		function getOptions(row) {

            var dataOptions = [];

            $(row).find('th,td').each(function() {

                var test = {};
                var title = $(this).text().trim();

                if ($(this).prop('tagName') == 'TH') {
                    test.optgroup = title;
                } else {
                    test.data = title;
                }

                dataOptions.push(test);
            });

            return dataOptions;

		}


		function getFormRow(row) {

			var input;

			switch (row.type) {

				case 'text':
					input = new UI.TextInputWidget({
						name: row.name,
						placeholder: msg('text-placeholder').plain()
					});
					break;

				case 'select':
					input = new UI.DropdownInputWidget({
						name: row.name,
						options: row.options,
						classes: ['template-select'],
					});
					break;

				case 'button':

					input = new OO.ui.ButtonWidget( {
						label: row.value,
						classes: ['newPageBtn'],
	//                     href: row.href,
						target: '_blank'
					} );    

					break;

			}

			input.onChange = function () {
				formChanged(input);
			};
			input.on('change', input.onChange );

			var newRow = new UI.FieldLayout(input, {
				label: row.label,
				align: 'top'
			});

			return newRow;

		}

		function formChanged(input) {

			var form = $(input.$element).closest(formReadyClassSel);
			var btn = $(form).find('.newPageBtn a');

			var pageName = $(form).find('input[name="page-name"]').val();

			if (!pageName.length) return;

			var subTemplatePath = '';

			$(form).find('.template-select select').each(function() {

				var selected = $(this).val();

				if (!selected.length) return;
				subTemplatePath += '/' + selected;

			});

			var preloadPath = templatePath + subTemplatePath;
			var fullUrl = encodeURI(url + pageName + '?action=edit&preload=' + preloadPath);

			$(btn).attr('href', fullUrl);
			$(form).find(testURL).attr('href', url + preloadPath).text(msg('go-to-form').plain());


        	new mw.Api().get( {
				action: 'query',
				titles: [pageName, preloadPath],
			} ).then( function( ret ) {

				$.each( ret.query.pages, function() {

                    switch(this.title) {
                    	case pageName: 
							var btnText = '';
							if ( this.missing !== "" ) {
								btnText = msg('go-to-page-button-text').plain();
								$(btn).attr('href', encodeURI(url + pageName));
							} else {
								btnText = msg('create-page-button-text').plain();
							}
							$(btn).find('.oo-ui-labelElement-label').text(btnText);
                    	break;

                    	case preloadPath:

							if ( this.missing !== "" ) {
			                    $(form).find(testURL).removeClass('new');
							} else {
			                    $(form).find(testURL).addClass('new');
							}

                    	break;
                    }


				} );
			});

		}


// 		/**/

		$(rawDataSel).each(function() {

// 			Make inputs

			var $form = $('<form>', {
				'class': formReadyClass,
				'methode': 'get'
			});

			var formItems = [];

			formItems.push(getFormRow({
				'type': 'text',
				'name': 'page-name',
				'label': msg('input-page-title').plain()
			}));

			$(this).find('tr').each(function() {

				var title = $(this).attr('data-name');
				var optionsList = getOptions(this);

				formItems.push(getFormRow({
					'type': 'select',
					'name': 'testName',
					'label': title,
					'options': optionsList
				}));

			});

			formItems.push(getFormRow({
				'type': 'button',
				'name': 'send',
				'value': msg('create-page-button-text').plain(),
			}));

// 			// Build form:

			var fieldset = new UI.FieldsetLayout().addItems(formItems);
			$($form).append(fieldset.$element);

// 			// Demo:

			var testURL = $('<a>', {
				'text': '',
				'href': '',
				'target': '_blank',
				'id': 'testURL',
				'style': 'font-size:smaller;'
			});
			$($form).append(testURL);

// 			// Render:

			$(formReadyClassSel).remove();
			$(rawDataClassSel).hide();

            var parent = '';

            if ($(rawDataClassSel).parents('.table-scrollable').length) {
                parent =  $(rawDataClassSel).closest('.table-wrapper');
            } else {
            	parent = rawDataClassSel;
            }

			$(parent).after($form);
		});
	}
	function preload() {
		if (--preloads > 0) return;
		window.dev.i18n.loadMessages('CreatePageForm').done(function (i18no) {
			msg = i18no.msg;
			createPageForm();
		});
	}
	mw.hook('wikipage.content').add(preload);
	mw.hook('dev.i18n').add(preload);
	importArticle({
		type: 'script',
		article: 'u:dev:MediaWiki:I18n-js/code.js'
	});
	console.log('createPageForm loaded');

});