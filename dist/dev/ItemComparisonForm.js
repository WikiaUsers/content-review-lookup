
(function (window, $, mw) {
	'use strict';
	// Load Protection
	if (window.itemComparisonForm) return;
	window.itemComparisonForm = true;
	
	var config = mw.config.get([
		'wgPageName'
	]);
	
	function addComparisonContent() {
		var $this = $(this);
		var templateName = $this.data('template');
		var staticParams = $this.data('static');
		var wikitext = '{{' + templateName;
		
		$this.closest('.item-comparison-form').find('.item-comparison-form__field-input').each(function(){
			var param = $(this).data('value');
			if (param) {
				wikitext += '|' + param;
			}
		});
		
		if (typeof(staticParams) === 'object' && staticParams !== null) {
			for (var paramKey in staticParams) {
				if (Object.prototype.hasOwnProperty.call(staticParams, paramKey)) {
					var paramValue = staticParams[paramKey];
					wikitext += '|' + paramKey + '=' + paramValue;
				}
			}
		}
		wikitext += '}}';
		console.log(wikitext);
		new mw.Api().get({
			action: 'parse',
			text: wikitext,
			contentmodel: 'wikitext',
			disablelimitreport: true,
			disableeditsection: true,
			disabletoc: true,
		}).done(function(data) {
			console.log(data);
			$('#' + $this.closest('.item-comparison-form').attr('id') + '-content-container').html(data.parse.text['*']);
		});
	}
	
	function addComparisonForm() {
		// multi-field def
		$('.item-comparison-form').each(function (index) {
			var $form = $(this);
			if ($form.data('formType') === 'duplicate') {
				var minFields = $form.data('minFields') || 2;
				var maxFields = $form.data('maxFields') || 2;
				var $fields = $form.children('.item-comparison-form__field');
				$fields.each(function (index) {
					var $field = $(this);
					var templateName = $field.data('template');
					var staticParams = $field.data('static');
					var menu = '{{' + templateName;
					if (typeof(staticParams) === 'object' && staticParams !== null) {
						for (var paramKey in staticParams) {
							if (Object.prototype.hasOwnProperty.call(staticParams, paramKey)) {
								var paramValue = staticParams[paramKey];
								menu += '|' + paramName + '=' + paramValue;
							}
						}
					}
					menu += '}}';
					new mw.Api().get({
						action: 'parse',
						text: menu,
						contentmodel: 'wikitext',
						disablelimitreport: true,
						disableeditsection: true,
						disabletoc: true,
					}).done(function(data) {
						$field.children('.item-comparison-form__field-input').each(function (index) {
							var $input = $(this);
							var $menuContent = $('<div>', {'class': 'item-comparison-form__field-menu'}).html(data.parse.text['*']);
							$menuContent.find('.item-comparison-option').each(function (index) {
								$(this).on('click', function (){
									var $option = $(this);
									var $parentMenu = $option.closest('.item-comparison-form__field-menu');
									var $parentInput = $parentMenu.prev('.item-comparison-form__field-input');
									$parentInput.data('value', $option.data('value'));
									$parentInput.text($option.data('text'));
									$parentMenu.hide();
								});
							});
							$input.after($menuContent);
							$input.on('click', function(){
								$(this).next('.item-comparison-form__field-menu').toggle();
							});
						});
						// multiple init fields
						// var duplicateField = function () {
						// 	$field.clone(true).after($field.last());
						// };
						var $lastField = $field.last();
						console.log(minFields - $field.length);
						for (var i = minFields - $field.length; i > 0; i--) {
							$lastField.after($lastField.clone(true));
						}
					});
				
					// var $addFieldButton = $('<div>', {id: 'item-comparison-add-field'});
					// var $removeFieldButton = $('<div>', {id: 'item-comparison-add-field'});
					// $duplicateFieldButton.on('click', duplicateField);
				});
			} /* else if ($form.data('formType') === 'single') {
				// single-field def
			}
			*/
			
			$form.children('.item-comparison-submit').on('click', addComparisonContent);
		});
		
	}
	
	function isComparisonPage() {
		console.log(config.wgPageName);
		return (window.itemComparisonFormPages && window.itemComparisonFormPages.includes(config.wgPageName)) || !window.itemComparisonFormPages;
	}
	
	function loadMainPage() {
		// importArticle({type: 'style', article: 'u:dev:MediaWiki:ItemComparisonForm.css'});
		mw.loader.using(['mediawiki.api']).then(addComparisonForm);
	}
	
	mw.hook('wikipage.content').add(function () {
		if (isComparisonPage()) {
			addComparisonForm();
		}
	});
})(this, jQuery, mediaWiki);