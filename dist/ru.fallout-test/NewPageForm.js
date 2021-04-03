mw.loader.using('oojs-ui').then(function() {
	'use strict';

	if ( !($('.new-page-form').length) ) return;
	
	function newPageForm() {
		var formConfig = {
			'text': {
				'input_page_title': 'Название',
				'create_page_btn_text': 'Перейти в черновик'
			}
		};

		var cText = formConfig.text;
		
		var rawDataSel = '.new-page-form';
		var formReadyClass = 'new-page-form-ready';
		var formReadySel = '.' + formReadyClass;

		var curLink = mw.config.values.wgServer;
		var path = (mw.config.values.wgArticlePath).replace(/\$1/gi, '');
		var url = curLink + path;

		var separatorMark = '|';
		var titleMark     = '#';
		var actionMark    = '%';

		var templatePath = 'Template:NewPageBlank';

		var UI = OO.ui;

		/**/

		function getOptions(raw) {

				var dataOptions = $(raw).attr('data-options').replaceAll(titleMark, separatorMark + titleMark).split(separatorMark);
				var title = $(raw).attr('data-name');

				var optionsList = [];

				dataOptions.forEach(function(line) {

					if (!line.length) return;

					var cOption = {};

					if (line.includes(titleMark)) {

						cOption.optgroup = line.replace(titleMark,'');

					}

					if (line.includes(actionMark)) {

						var action = line.split(actionMark);
						cOption.action = action[1];
						line = action[0];
						
					}

					cOption.data = line;

					for (var key in cOption) {
						cOption[key] = cOption[key].trim();
					}

					optionsList.push(cOption);

				});

				return optionsList;

		}


		function getFormRow(row) {

			var input;

			switch (row.type) {

				case 'text':
					input = new UI.TextInputWidget({
						name: row.name
					});
					break;

				case 'select':
					input = new UI.DropdownInputWidget({
						name: row.name,
						options: row.options,
						classes: ['template-select'],
						value: 'Fallout 4'
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

			var form = $(input.$element).closest(formReadySel);
			var btn = $(form).find('.newPageBtn a');

			var pageName = $(form).find('input[name="page-name"]').val();

			if (!pageName.length) return;


	//         var newHref = url + + '/';

			var subTemplatePath = '';

			$(form).find('.template-select select').each(function() {

				var selected = $(this).val();

				if (!selected.length) return;
				subTemplatePath += '/' + selected;

			});

			var preloadPath = templatePath +  subTemplatePath;
			var fullUrl = encodeURI(url + pageName + '?action=edit&preload=' + preloadPath);

			$(btn).attr('href', fullUrl);
			$(form).find(testURL).attr('href', fullUrl).text(decodeURI(fullUrl));


			// console.log(fullUrl);
		}

		/**/

		$(rawDataSel).each(function() {

			// Make inputs

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

			$(this).find('[data-input="select"]').each(function() {

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

			// Build form:

			var fieldset = new UI.FieldsetLayout().addItems(formItems);
			$($form).append(fieldset.$element);

			// Demo:

			var testURL = $('<a>', {
				'text': '...',
				'href': '',
				'target': '_blank',
				'id': 'testURL',
				'style': 'font-size:smaller'
			});
			$($form).append(testURL);

			// Render:

			$(formReadySel).remove();
			$(this).append($form);
		});
	}
	mw.hook('wikipage.content').add(newPageForm);

	console.log('Test Form Loaded');

});