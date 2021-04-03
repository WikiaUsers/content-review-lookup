mw.loader.using('oojs-ui').then(function() {
	'use strict';

	if ( window.createPageFormInit || !($('.create-page-form').length) ) return;
	
    window.createPageFormInit = true;
	
	function createPageForm() {
		var formConfig = {
			'text': {
				'input_page_title': 'Название',
				'create_page_btn_text': 'Далее',
				'go_to_page_btn_text': 'Перейти к статье',
				'go_to_blank': 'Перейти к бланку',
				'text_placeholder': 'Заголовок новой статьи'
			},
			'data': {
				'template_page': mw.config.values.wgFormattedNamespaces[10] + ':CreatePageBlank'
			}
		};
		var cText = formConfig.text;
		
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
						placeholder: cText.text_placeholder
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

	        var newHref = url + '/';

			var subTemplatePath = '';

			$(form).find('.template-select select').each(function() {

				var selected = $(this).val();

				if (!selected.length) return;
				subTemplatePath += '/' + selected;

			});

			var preloadPath = templatePath + subTemplatePath;
			var fullUrl = encodeURI(url + pageName + '?action=edit&preload=' + preloadPath);

			$(btn).attr('href', fullUrl);
			$(form).find(testURL).attr('href', url + preloadPath).text(cText.go_to_blank);


        	new mw.Api().get( {
				action: 'query',
				titles: [pageName, preloadPath],
			} ).then( function( ret ) {

				$.each( ret.query.pages, function() {

                    switch(this.title) {
                    	case pageName: 
							var btnText = '';
							if ( this.missing !== "" ) {
								btnText = cText.go_to_page_btn_text;
								$(btn).attr('href', encodeURI(url + pageName));
							} else {
								btnText = cText.create_page_btn_text;
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
				'label': cText.input_page_title
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

			var buttonWithLabel = new OO.ui.ButtonWidget( { 
				label: 'Button Label',
			} );

			formItems.push(getFormRow({
				'type': 'button',
				'name': 'send',
				'value': cText.create_page_btn_text,
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
	mw.hook('wikipage.content').add(createPageForm);

	console.log('createPageForm loaded');

});