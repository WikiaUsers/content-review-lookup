mw.hook('wikipage.content').add(function(e){
	var main = document.getElementById('ColorCalc');
	if (!main) return;
	var html = '<style>' +
		'.widget-colorCalc__items {' +
			'display: flex;' +
			'flex-wrap: wrap;' +
		'}' +
	
		'.widget-colorCalc__item {' +
			'margin: .5em;' +
		'}' +
	
		'.widget-colorCalc__errors {' +
			'color: #f00;' +
		'}' +
	'</style>' +
	'<div class="widget-colorCalc__errors"></div>' +
	'<div class="widget-colorCalc"></div>';
	main.innerHTML = html;
	/**
	 *	For translators
	 **/

	var texts = {
		'region': 'Регион',
		'donotpaint': 'Не красить',
		'thiscolorwithoutid': 'Этот цвет не имеет ID',
		'dontuse': 'Не используется',
	};
	/**
	 *	For translators - end
	 **/

	// Generate content
	var $element = $('.widget-colorCalc');
	var colors = [
		[0, texts.donotpaint, ''],
		[1, 'Red', '#ff0000'],
		[2, 'Blue', '#0000ff'],
		[3, 'Green', '#00ff00'],
		[4, 'Yellow', '#ffff00'],
		[5, 'Cyan', '#00ffff'],
		[6, 'Magenta', '#ff00ff'],
		[7, 'Light Green', '#c0ffba'],
		[8, 'Light Grey', '#c8caca'],
		[9, 'Light Brown', '#786759'],
		[10, 'Light Orange', '#ffb46c'],
		[11, 'Light Yellow', '#fffa8a'],
		[12, 'Light Red', '#ff756c'],
		[13, 'Dark Grey', '#7b7b7b'],
		[14, 'Black', '#3b3b3b'],
		[15, 'Brown', '#593a2a'],
		[16, 'Dark Green', '#224900'],
		[17, 'Dark Red', '#812118'],
		[18, 'White', '#ffffff'],
		[19, 'Dino Light Red', '#ffa8a8'],
		[20, 'Dino Dark Red', '#592b2b'],
		[21, 'Dino Light Orange', '#ffb694'],
		[22, 'Dino Dark Orange', '#88532f'],
		[23, 'Dino Light Yellow', '#cacaa0'],
		[24, 'Dino Dark Yellow', '#94946c'],
		[25, 'Dino Light Green', '#e0ffe0'],
		[26, 'Dino Medium Green', '#799479'],
		[27, 'Dino Dark Green', '#224122'],
		[28, 'Dino Light Blue', '#d9e0ff'],
		[29, 'Dino Dark Blue', '#394263'],
		[30, 'Dino Light Purple', '#e4d9ff'],
		[31, 'Dino Dark Purple', '#403459'],
		[32, 'Dino Light Brown', '#ffe0ba'],
		[33, 'Dino Medium Brown', '#948575'],
		[34, 'Dino Dark Brown', '#594e41'],
		[35, 'Dino Darker Grey', '#595959'],
		[36, 'Dino Albino', '#ffffff'],
		[37, 'BigFoot0', '#b79683'],
		[38, 'BigFoot4', '#eadad5'],
		[39, 'BigFoot5', '#d0a794'],
		[40, 'WolfFur', '#c3b39f'],
		[41, 'DarkWolfFur', '#887666'],
		[42, 'DragonBase0', '#a0664b'],
		[43, 'DragonBase1', '#cb7956'],
		[44, 'DragonFire', '#bc4f00'],
		[45, 'DragonGreen0', '#79846c'],
		[46, 'DragonGreen1', '#909c79'],
		[47, 'DragonGreen2', '#a5a48b'],
		[48, 'DragonGreen3', '#74939c'],
		[49, 'WyvernPurple0', '#787496'],
		[50, 'WyvernPurple1', '#b0a2c0'],
		[51, 'WyvernBlue0', '#6281a7'],
		[52, 'WyvernBlue1', '#485c75'],
		[53, 'Dino Medium Blue', '#5fa4ea'],
		[54, 'Dino Deep Blue', '#4568d4'],
		[55, 'NearWhite', '#ededed'],
		[56, 'NearBlack', '#515151'],
	];
	var optionItems = '';
	var i;
	for (i = colors.length; i--;) {
		optionItems = '<option value="' + colors[i][0] + '" style="background-color: ' + colors[i][2] + '">' + colors[i][0] + ' - ' + colors[i][1] + '</option>' + optionItems;
	}
	$element.html(
		'<div class="widget-colorCalc__items">' +
		'<div class="widget-colorCalc__item">'+texts.region + ' 0: <select data-region="0">' + optionItems + '</select></div>' +
		'<div class="widget-colorCalc__item">'+texts.region + ' 1: <select data-region="1">' + optionItems + '</select></div>' +
		'<div class="widget-colorCalc__item">'+texts.region + ' 2: <select data-region="2">' + optionItems + '</select></div>' +
		'<div class="widget-colorCalc__item">'+texts.region + ' 3: <select data-region="3">' + optionItems + '</select></div>' +
		'<div class="widget-colorCalc__item">'+texts.region + ' 4: <select data-region="4">' + optionItems + '</select></div>' +
		'<div class="widget-colorCalc__item">'+texts.region + ' 5: <select data-region="5">' + optionItems + '</select></div>' +
		'</div>' +
		'<div class="widget-colorCalc__output"><span class="copy-clipboard"><span class="copy-content"></span></span></div>'
	);
	var $outputEl = $element.find('.widget-colorCalc__output .copy-content');
	$outputEl.parent().addClass('copy-clipboard');


	// On changes selects with colors
	var $selects = $element.find('select');
	$selects.on('change', function (e) {
		$('.widget-colorCalc__errors').text('');
		var $e = $(e.target);
		if ($e.val() !== '0')
			$e.css('box-shadow', '0 0 0 .2em ' + colors[$e.val()][2] + ', 0 0 0 .25em #ccc');
		else
			$e.css('box-shadow', '');
		var output = '';

		$selects.each(function (i, e) {
			var $e = $(e);
			if ($e.val() !== '0')
				output += ' | cheat setTargetDinoColor ' + $e.data('region') + ' ' + $e.val();
		});
		$outputEl.text(output.substr(3));
	});

	// If on page with .paintregion
	var $paints = $('.paintregion');
	if ($paints.length === 6) {
		$paints.each(function(i,e){
			if ($(e).find('font').length!==0) {
				$($selects[i]).prop('disabled', true).html('<option value="0">'+texts.dontuse+'</option>');
			} else {
				var $colors = $(e).find('>div:last div');
				$colors.on('click', function(e){
					var curcolor = $(e.target).attr('title').substr(-3);
					if (!isNaN(parseInt(curcolor))) curcolor = parseInt(curcolor);
					else {
						curcolor = curcolor.substr(-2);
						if (!isNaN(parseInt(curcolor))) curcolor = parseInt(curcolor);
						else {
							$('.widget-colorCalc__errors').text(texts.thiscolorwithoutid);
							return;
						}
					}
					$selects[i].selectedIndex = curcolor;
					$($selects[i]).trigger('change');
				});
			}
		});
	}
});