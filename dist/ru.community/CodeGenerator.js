/**
 * Generator for most popular CSS and JavaScript code snippets
 * @author fngplg
 * //fix for UCP/UCX — Arhhhat
 */
 $(function() {
	if (!$('#CodeGenerator2').length) {
		return;
	}

	var isPreloaded = false; // true if preload(); false by chkCursorSize

	function array_uniq(arr) {
		// unique values. latter is better
		if (!$.isArray(arr) || !arr.filter) return arr;
		return arr.filter(function(v, i, a) {
			return a.indexOf(v, ++i) > i ? false : true;
		});
	} // array_uniq

	function preload() {
		// preload: cg<var>=<value1>[|value2]
		// example: ?cgtab=css&cgusr=fngplg&cgwhat=cn|cc&cgcnc=black&cgccc=green
		// vars:
		// tab: <css|cssv>
		// css:
		//  usr: username1[|username2]
		//  what: <what1>[|what2]
		//      cn: цветные ники
		//          cnc: цвет ника
		//  wikiurl: ссылка на вики
		var vars = $.getUrlVars();

		// 1st chk
		if (!vars) return;
		// 1.5th chk
		switch (vars.cgtab) {
			case 'css':
				$('#SwitchToCSS').click();
				break;
			case 'cssv':
				$('#SwitchToVar').click();
				break;
			default:
				return;
		}
		// 2nd chk
		vars.cgwhat = decodeURIComponent(vars.cgwhat || '');
		if (!vars.cgwhat || !/cn|ft|cb|cc|ms|cr/.test(vars.cgwhat)) return;

		vars.cgwhat = vars.cgwhat.split('|');
		vars.cgwhat = array_uniq(vars.cgwhat);

		// at this point it's considered officially preloaded
		isPreloaded = true;

		// разрешена только одна вкладка, поэтому проверка имени не нужна
		vars.cguser = decodeURIComponent(vars.cguser || '');
		var cssParams = $('#CSSParams');

		// kis
		if (vars.cguser) cssParams.find('#CSSNick').val(vars.cguser);
		vars.cgwhat.forEach(function(what) {
			var currentElement;
			switch (what) {
				case 'cn':
					currentElement = cssParams.find('input.codegenerator-option[data-section="ColorNames"]');
					if (vars.cgcnc) cssParams.find('#CSSColor').val(decodeURIComponent(vars.cgcnc));
					break;
				default:
					return;
			} // switch what
			if (currentElement && currentElement.length && !currentElement.get(0).checked) currentElement.click();
		}); // each cgwhat
		cssParams.find('#CSSSubmit').click();
	} // preload

	$('#CodeGenerator2').replaceWith(
		'<div id="GeneratorBody">' +
		'<fieldset>' +
		'<legend>' +
		'<div id="SwitchToCSS" class="codegenerator-field-switch active">CSS</div>' +
		'<div id="SwitchToVar" class="codegenerator-field-switch" style="width: 120px;">Переменные</div>' +
		'</legend>' +
		'<div id="CSSParams" />' +
		'<div id="VarParams" style="display:none;" />' +
		'<div style="text-align:center;">' +
		'<textarea id="CodeGenOutput" type="text" placeholder="Результат" />' +
		'</div>' +
		'<div class="result-main"><button class="wds-button codegenerator-copy-css">Копировать</button></div>' +
		'</fieldset>' +
		'</div>'
	);

	$('#CSSParams').append(
		'<h2 style="margin-top:5px;">Опции</h2>' +
		'<div id="CSSoptionblock" class="codegenerator-group" style="-webkit-column-count:2; -moz-column-count:2; column-count:2; text-align:inherit; padding-bottom:2px;">' +
		'<input type="checkbox" class="codegenerator-option" data-section="ColorNames"> Цветные ники<br>' +
		'<input type="checkbox" class="codegenerator-option" data-section="Comm"> Плашки в комментариях<br>' +
		'</div>' +
		'<div class="codegenerator-nick codegenerator-nickbody" style="display:none;">' +
		// Поле ввода никнеймов
		'<div class="codegenerator-nickinput">' +
		'Введите ник: <input type="text" id="CSSNick" placeholder="Можно указывать несколько через знак |" />' +
		'</div></div>' +
		// Ввод параметров для кода цветных никнеймов
		'<div id="ColorNamesBody" class="codegenerator-bodyinnick" style="display:none;">' +
		'<h2 style="margin-top:5px;">Цветные ники</h2>' +
		'<div style="text-align:center;">Задайте цвет: <input type="text" id="CSSColor" class="codegenerator-input codegenerator-color-input" placeholder="Цвет в формате rgb, rgba, hex" disabled="disabled"/>' +
		'</div></div></div>' +
		// Плашки в коммах
		'<div id="CommBody" class="codegenerator-bodyinnick" style="display:none; text-align: center;">' +
		'<h2 style="margin-top:5px;">Плашки в комментариях</h2>' +
		'<div style="margin-top:3px;">Должность: <input id="CommText" type="text" class="codegenerator-input" placeholder="Введите отображаемый статус" disabled="disabled"/></div>' +
		'<div style="margin-top:3px;">Цвет фона: <input id="CommColorBack" type="text" class="codegenerator-input" placeholder="Цвет в формате rgb, rgba, hex" disabled="disabled"/></div>' +
		'<div style="margin-top:3px;">Цвет текста: <input id="CommColorFont" type="text" class="codegenerator-input" placeholder="Цвет в формате rgb, rgba, hex" disabled="disabled"/></div>' +
		'</div>' +
		'<div class="result-main">' +
		'<button id="CSSSubmit" type="button" class="wds-button" style="display:block;">Показать результат</button></div>'
	);

	$('#VarParams').append(
		'<h2 style="margin-top:15px;">Класс для вики (наименование вики в БД)</h2>' +
		'<div id="WikiBodyClass" class="codegenerator-group" style="opacity:1; text-align:left;">' +
		'<input class="codegenerator-wikiname" type="text" style="width:60%; margin-right: 5px;" placeholder="Ссылка на вики или название в формате язык.вики"/>' +
		'<button class="wds-button codegenerator-var-get">Получить класс</button>' +
		'<input type="text" class="codegenerator-input codegenerator-wikiname-result" style="width: calc(39% - 170px);" placeholder="Результат" />' +
		'<button class="wds-button codegenerator-copy-var">Копировать</button>' +
		'</div>'
	);

	$('#SwitchToVar').click(function() {
		$(this).addClass('active');
		$('#SwitchToCSS').removeClass('active');
		$('#CSSParams, #CodeGenOutput, .codegenerator-copy-css').hide();
		$('#VarParams, .codegenerator-copy-var').show();
	});

	$('#SwitchToCSS').click(function() {
		$(this).addClass('active');
		$('#SwitchToVar').removeClass('active');
		$('#VarParams, .codegenerator-copy-var').hide();
		$('#CSSParams, #CodeGenOutput, .codegenerator-copy-css').show();
	});

	$('input[data-section]').each(function() {
		$(this).click(function() {
			var opt_value = $(this).attr('data-section'),
				$opt_body = $('#' + opt_value + 'Body');

			if (this.checked) {
				$opt_body.slideDown('fast', function() {
					$(this).css('display', 'block').find('.codegenerator-input').removeAttr('disabled');
					if ($(this).hasClass('codegenerator-bodyinnick')) {
						if (!$('.codegenerator-nicktoggle').length) {
							$('.codegenerator-nickinput, .codegenerator-nickbody').slideDown('fast');
						}
						$(this).toggleClass('codegenerator-nicktoggle');
					}
				});
			} else {
				$opt_body.slideUp('fast', function() {
					$(this).css('display', 'none').find('.codegenerator-input').attr('disabled', 'disabled');
					if ($(this).hasClass('codegenerator-bodyinnick')) {
						$(this).toggleClass('codegenerator-nicktoggle');
						if (!$('.codegenerator-nicktoggle').length) {
							$('.codegenerator-nickinput, .codegenerator-nickbody').slideUp();
						}
					}
				});
			}
		});
	});

	// CSS
	$('#CSSSubmit').click(function() {
		var invalidInput = false;
		$('.codegenerator-input-error').fadeOut(300);
		// Проверка на наличие заполненных полей
		$('#CSSParams .codegenerator-input').each(function() {
			if ($(this).attr('disabled') !== 'disabled' && !$(this).val()) {
				$('<div class="codegenerator-input-error" style="color:red">Это поле должно быть заполнено</div>').insertAfter(this);
				invalidInput = true;
			} else {
				$(this).css('border', '2px inset');
			}
		});
		if (invalidInput) {
			return;
		}

		$('#CodeGenOutput').val('');
		var Result = '',
			colorRes = ($('#ColorNamesBody').css('display') !== 'none'),
            CommText = ($('#CommBody').css('display') !== 'none');
		if (colorRes) {
			var ColorSelector = '',
				ColorBody = '    color: ' + $('#CSSColor').val() + ';\n' +
				'}\n\n';
		}
		if (CommText) {
			var CommSelector = '',
				CommBody = '    content: "' + $('#CommText').val() + '";\n' +
				'    background: ' + $('#CommColorBack').val() + ';\n' +
				'    padding: 3px;\n' +
				'    border-radius: 5px;\n' +
				'    margin-left:4px;\n' +
				'    font-size: 12px;\n' +
				'    color: ' + $('#CommColorFont').val() + ';\n' +
				'}\n\n';
		}
		if ($('#CSSNick').val()) {
			var NickArr = $('#CSSNick').val().split('|');
			$.each(NickArr, function(i, nick) {
				var CodeGenCSSEnding = (i + 1 != NickArr.length) ? ',\n' : ' {\n',
					nick = encodeURIComponent(nick.replace(/\s/g, '_'));
				if (nick.indexOf('_') > -1) {
					nick2 = nick.replace(/_/g, '%20');
				} else {
					delete nick2;
				}
				// Парсим недостающие элементы
				if (nick.indexOf("'") > -1) {
					nick = nick.replace(/'/g, '%27');
				}
				if (nick.indexOf("~") > -1) {
					nick = nick.replace(/~/g, '%7E');
				}
				if (colorRes) {
					if (typeof nick2 !== "undefined") {
						ColorSelector += 'a[href$="/' + nick + '"],\na[href$=":' + nick + '"]\n' + 'a[href$="/' + nick2 + '"],\na[href$=":' + nick2 + '"]' + CodeGenCSSEnding;
					} else {
						ColorSelector += 'a[href$="/' + nick + '"],\na[href$=":' + nick + '"]' + CodeGenCSSEnding;
					}
				}
				if (CommText) {
					if (typeof nick2 !== "undefined") {
						CommSelector += 'a[href$=":' + nick2 + '"] ~ .EntityHeader_middot__2f4XC:after' + CodeGenCSSEnding;
					} else {
						CommSelector += 'a[href$=":' + nick + '"] ~ .EntityHeader_middot__2f4XC:after' + CodeGenCSSEnding;
					}
				}
			});
			if (colorRes) {
				Result += '/*Цветные ники*/\n' + ColorSelector + ColorBody;
			}
			if (CommText) {
				Result += '/*Плашки в комментах*/\n' + CommSelector + CommBody;
			}
		}
		$('#CodeGenOutput').val(Result);
	});

	$(function() {
		$('.codegenerator-copy-css').click(function() {
			$('#CodeGenOutput')[0].select();
			document.execCommand('copy');
			$('#CodeGenOutput').val().slice(0, -1);
		});
	});
	$(function() {
		$('.codegenerator-copy-var').click(function() {
			$('.codegenerator-wikiname-result')[0].select();
			document.execCommand('copy');
			$('.codegenerator-wikiname-result').val().slice(0, -1);
		});
	});

	// Variables
	$('.codegenerator-var-get').click(function() {
		$('.codegenerator-input-error').remove();
		$('.codegenerator-wikiname, .codegenerator-wikiname-result').css('border', '');

		var wikiname = $('.codegenerator-wikiname').val()
			.replace(/\/wiki\/.*/, '').replace(/^(.+)\.fandom\.com\/([^\/]+?)/, '$1.fandom.com/$2'),
			wikiNameLang = wikiname.split('.');
		if (wikiname === '') {
			$('<div class="codegenerator-input-error" style="color:red; text-align:center;">Это поле должно быть заполнено</div>').appendTo('#WikiBodyClass');
			$('.codegenerator-wikiname').css('border', '1px solid red');
			return;
		}

		if (wikiNameLang.length === 2) {
			// lang.wiki case. probably
			wikiname = 'https://' + wikiNameLang[1] + '.fandom.com/' + wikiNameLang[0];
		}
		if (wikiname.indexOf('https://') === -1) {
			wikiname = 'https://' + wikiname;
		}
		if (wikiname.indexOf('.fandom.com') === -1) {
			wikiname += '.fandom.com';
		}

		$('.codegenerator-wikiname-result')
			.val('Подождите...')
			.css('border', '1px solid orange');

		$.ajax({
			url: wikiname + '/api.php',
			type: 'GET',
			data: {
				action: 'query',
				meta: 'siteinfo',
				format: 'json'
			},
			crossDomain: true,
			dataType: 'jsonp',
			success: function(d) {
				$('.codegenerator-wikiname-result')
					.val('wiki-' + d.query.general.wikiid)
					.css('border', '1px solid green');
			},
			error: function() {
				$('.codegenerator-wikiname-result')
					.val('Ошибка!')
					.css('border', '1px solid red');
			}
		});
	});
	preload();
});