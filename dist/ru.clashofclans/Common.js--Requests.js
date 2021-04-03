/*
 * Original idea and code can be found here: http://communaute.wikia.com/wiki/MediaWiki:Common.js/Requests.js
 *
 */
!function() {
	requests = {};
	
	requests.count = 0;
	requests.onPending = false;

	requests.callDiag = function( title, form, type ) {
		if ( !requests.windowManager ) {
			function createDiag( cfg ) {
                createDiag.super.call( this, cfg );
            }

            OO.inheritClass( createDiag, OO.ui.ProcessDialog );
            createDiag.static.name = 'reqForm';
            createDiag.static.title = title;
            createDiag.static.actions = [
				{ label: 'Отправить запрос', flags: [ 'secondary' ], action: 'checkAndSubmit' },
                { label: 'Закрыть', flags: [ 'safe', 'close' ], action: 'onClose' }
            ];

			if ( type ) createDiag.static.actions.push( { label: 'Добавить секцию', flags: [ 'secondary' ], action: 'addMore', classes: [ 'addMore' ] } );

            createDiag.prototype.initialize = function () {
                createDiag.super.prototype.initialize.apply( this, arguments );
                this.content = new OO.ui.PanelLayout({ padded: true });
                this.content.$element.append( form );
                this.$content.addClass( 'requestForm' );
                this.$body.append( this.content.$element );
            };

            createDiag.prototype.getActionProcess = function (action) {
                switch (action) {
                    case 'checkAndSubmit':
						requests.checkAndSubmit( type );
						break;
                    case 'addMore':
						requests.addMore();
						break;
					case 'onClose':
						requests.count = 0;
						$( '.request-limit' ).hide();
						$( '.request-additional-section' ).html( '' );
						$( '.request-status' ).text( 'Ожидает отправки формы' ).attr( 'class', 'request-status' );
						requests.windowManager.closeWindow( requests.diag );
						break;
                }

				return createDiag.super.prototype.getActionProcess.call( this, action );
            };

            requests.windowManager = new OO.ui.WindowManager({ classes: [ 'requestsDiag' ] });

            $( document.body ).append( requests.windowManager.$element );

            requests.diag = new createDiag({ size: 'larger' });

            requests.windowManager.addWindows([ requests.diag ]);
            requests.windowManager.openWindow( requests.diag );
		} else {
            requests.windowManager.openWindow( requests.diag );
        }
	}
	
	requests.addMore = function() {
		if ( requests.count === 9 ) {
			$( '.request-limit' ).show();
			$( '#addMore' ).attr( 'disabled', true );

			return;
		}

		if ( $( '.request-additional-field' ).css( 'display' ) === 'none' ) {
			$( '.request-additional-field' ).fadeIn(500);
		}
    
		$( '.request-additional-section' ).append(
			'<div class="request-additional" style="margin: 0 5px; border-bottom: 1px solid grey; padding: 5px; 0">' +
				'<p class="request-field"><b>URL вики №1 :</b> https://<input type="text" style="align:center;height:20px; width:300px" class="request-first" placeholder="Например : harrypotter.fandom.com/ru"/></p>' +
				'<p class="request-field"><b>URL вики №2 :</b> https://<input type="text" style="align:center;height:20px; width:300px" class="request-second" placeholder="Например : harrypotter.fandom.com/pl"/></p>' +
			'</div>'
		);

		requests.count++;
	}

	requests.checkAndSubmit = function( t ) {
		if ( requests.onPending ) return;

		var allFieldsAreSet = true;
		$( '.unfilled-warning' ).hide();

		$( '.must-be-filled' ).each(function () {
			if ($( this ).find( 'input' ).val().length === 0 ) {
				$( this ).find( '.unfilled-warning' ).fadeIn( 500 );
				allFieldsAreSet = false;
			}
		});

		var text = "";

		if ( t ) {
			var first_wiki = $( '#PrimaryWiki' ).val().toString().replace(/(^https?:..|\.fandom\.com)/g, '' ).split( '/' ),
                second_wiki = $( '#SecondaryWiki' ).val().toString().replace(/(^https?:..|\.fandom\.com)/g, '' ).split( '/' );
                
            var first_short = ( first_wiki.length == 1 || first_wiki[ 1 ] === "" ) ? first_wiki[ 0 ] : first_wiki[ 1 ] + '.' + first_wiki[ 0 ],
            	second_short = ( second_wiki.length == 1 || second_wiki[ 1 ] === "" ) ? second_wiki[ 0 ] : second_wiki[ 1 ] + '.' + second_wiki[ 0 ];

			text += '== [[w:c:' + first_short + '|' + first_short + ']] ==\n* Участник: ' + mw.config.get( 'wgUserName' ) + '\n' +
                    '* Связываемые википроекты:\n{{InterwikiLink|' + first_short + '|' + second_short + '}}\n';

			$( '.request-additional' ).each(function() {
				var first = $( this ).find( '.request-first' ).val().toString().replace( /(^https?:..|\.fandom\.com)/g, '' ),
					second = $( this ).find( '.request-second' ).val().toString().replace( /(^https?:..|\.fandom\.com)/g, '' );

				if ( first.length === 0 || second.length === 0 ) return;

				first = first.split( '/' );
				second = second.split( '/' );

				first_short = ( first.length == 1 || first[ 1 ] === "" ) ? first[ 0 ] : first[ 1 ] + '.' + first[ 0 ];
            	second_short = ( second.length == 1 || second[ 1 ] === "" ) ? second[ 0 ] : second[ 1 ] + '.' + second[ 0 ];

				text += '{{InterwikiLink|' + first_short + '|' + second_short + '}}\n';
			});
		} else {
			var link = $( '#Link' ).val(),
				lang = $( '#WikiLang' ).val(),
				wiki = ( lang === "" ) ? link : lang + "." + link;

			text += '== [https://clashofclans.fandom.com/ru/wiki/Участник:' + $( '#Name' ).val().toString() + ' ' + $( '#Name' ).val().toString() + '] ==\n' +
                    '* Вклад участника: ' + '[https://clashofclans.fandom.com/ru/wiki/Служебная:Вклад/' + mw.config.get( 'wgUserName' ).replace( /\s/g, '_' ) + ' ' + mw.config.get( 'wgUserName' ) + ']\n' +
                    '* Кол-во правок на Wikia: ' + $( '#NumberOfEdits' ).val().toString() + '\n' +
                    '* Кол-во новых статей: ' + $( '#NumberOfArticles' ).val().toString() + '\n';

			if ( $( '#Comments' ).val() ) {
                text += '* Дополнительная информация о вас: ' + '\'\'\'' + $( '#Comments' ).val().toString() + '\'\'\'' + '\n';
            }
		}

		text += '~~\~~\n';

		if ( allFieldsAreSet ) {
			$( '.request-status' ).attr( 'class', 'request-status' ).text( 'Записываю запрос [1/2]' );
			requests.onPending = true;

			$.ajax({
				url: '/ru/wiki/' + mw.config.get( 'wgPageName' ),
				type: 'GET',
				data: {
					action: 'raw',
					nocache: 1,
					allinone: 1
				},
				dataType: 'text',
				success: function ( data ) {
					if ( data ) {
						$( '.request-status' ).text( 'Записываю запрос [2/2]' );

						$.ajax({
							url: mw.util.wikiScript( 'api' ),
							type: 'POST',
							data: {
								action: 'edit',
								title: mw.config.get( 'wgPageName' ),
								summary: 'Новый запрос',
								text: data + '\n' + text,
								token: mw.user.tokens.get( 'editToken' ),
								format: 'json'
							},
							dataType: 'json',
							success: function( state ) {
								$( '.request-status' ).text( 'Запрос записан!' ).toggleClass( 'request-success' );
								requests.onPending = false;

								setTimeout( function() {
									requests.windowManager.closeWindow( requests.diag );
									$( '.request-status' ).text( 'Ожидает отправки формы' ).toggleClass( 'request-success' );
								}, 3000);
							},
							error: function( e ) {
								requests.onPending = false;

								$( '.request-status' ).text( 'Ошибка отправки формы! [2]' ).toggleClass( 'request-error' );
							}
						});
					} else {
						requests.onPending = false;
						$( '.request-status' ).text( 'Ошибка отправки формы! [1]' ).toggleClass( 'request-error' );
					}
				},
				error: function( err ) {
					requests.onPending = false;
					$( '.request-status' ).text( 'Ошибка отправки формы! [1]' ).toggleClass( 'request-error' );
				}
			});
		}
	}

	requests.init = function() {
		switch( mw.config.get( 'wgTitle' ) ) {
		case "Запросы на повышение Статуса Wikia":
			var requestForm =
                '<form method="" name="">' +
                  '<fieldset style="margin: 0;">' +
                    '<p style="padding:5px; border:1px solid grey; margin: 5px 0;">' +
                        'Пожалуйста, заполните поля этой карточки, чтобы оставить запрос. Обратите внимание, что поля, помеченные (<span style="color:red">*</span>), обязательны для заполнения.<br /><br /><span style="color:red">*</span> Написание статей необходимо только для получения Статуса Модератор и выше.' +
                    '</p>' +
                    '<p class="request-field must-be-filled" style="margin-bottom: 5px;">' +
                        '<b>' +
                            '<span style="color:red">*</span>' +
                            'Ваш NickName: ' +
                        '</b>' +
                        '<span class="unfilled-warning" style="color:red;display:none">Вы должны заполнить это поле!</span>' +
                        '<input type="text" style="align:center;height:20px; width:300px" id="Name" placeholder="Например, Flotiliya"/>' +
                    '</p>'+
                    '<p class="request-field must-be-filled" style="margin-bottom: 5px;">' +
                        '<b>' +
                            '<span style="color:red">*</span>' +
                            'URL на ваш профиль: ' +
                        '</b>' +
                        '<span class="unfilled-warning" style="color:red;display:none">Вы должны заполнить это поле!</span>' +
                        'https://clashofclans.fandom.com/ru/wiki/Участник:<input type="text" style="align:center;height:20px; width:100px" id="Link" placeholder="Flotiliya"/>' +
                    '</p>' +
                    '<p class="request-field must-be-filled" style="margin-bottom: 5px;">' +
                        '<b>' +
                            '<span style="color:red">*</span>' +
                            'Кол-во ваших правок на Wikia: ' +
                        '</b>' +
                        '<span class="unfilled-warning" style="color:red;display:none">Вы должны заполнить это поле!</span>' +
                        '<input type="text" maxlength="6" style="align:center;height:20px; width:150px" id="NumberOfEdits" placeholder="Не менее 500 правок"/>' +
                    '</p>' +
                    '<p class="request-field must-be-filled" style="margin-bottom: 5px;">' +
                        '<b>' +
                            '<span style="color:red">*</span>' +
                            'Кол-во новых статей, которые вы создали на Wikia: ' +
                        '</b>' +
                        '<span class="unfilled-warning" style="color:red;display:none">Вы должны заполнить это поле!</span>' +
                        '<input type="text" style="height:20px; width:200px" id="NumberOfArticles" placeholder="Не менее 3 статей"/>' +
                    '</p>' +
                    '<p class="request-field"">' +
                        '<b>Дополнительная информация о вас: </b>' +
                        '<input type="text" style="height:20px; width:100%" id="Comments" placeholder="Любая дополнительная информация о себе"/>' +
                    '</p>' +
                  '</fieldset>' +
                  '<div class="request-status-div" style="margin: 5px 0; text-align: center;">' +
                	'Текущий статус формы: ' +
                	'<span class="request-status" style="font-weight: bold;">Ожидает отправки формы</span>' +
                  '</div>' +
                '</form>';
				var title = "Форма запроса на получение Статуса Wikia";
				var f = false;
				break;
			case "Запросы на межъязыковые ссылки":
				var requestForm =
                '<form method="" name="" style="height:480px;">' +
                    '<fieldset style="margin: 0;">' +
                        '<p style="padding:5px; border:1px solid grey; margin: 5px 0;">' +
                            'Пожалуйста, заполните поля этой карточки, чтобы оставить запрос. Обратите внимание, что поля, помеченные (<span style="color:red">*</span>), обязательны для заполнения.' +
                        '</p>' +
                        '<p class="request-field must-be-filled">' +
                            '<b>' +
                                '<span style="color:red">*</span>' +
                                'URL вики №1 :' +
                            '</b> ' +
                            '<span class="unfilled-warning" style="color:red;display:none">Вы должны заполнить это поле.</span>' +
                            '<br /> ' + 
                            'https://<input type="text" style="align:center;height:20px; width:300px" id="PrimaryWiki" placeholder="Например : harrypotter.fandom.com/ru"/>' +
                        '</p>' +
                        '<p class="request-field must-be-filled">' +
                            '<b>' +
                                '<span style="color:red">*</span>' +
                                'URL вики №2 :' +
                            '</b> ' +
                            '<span class="unfilled-warning" style="color:red;display:none">Вы должны заполнить это поле.</span>' +
                            '<br /> ' +
                            'https://<input type="text" style="align:center;height:20px; width:300px" id="SecondaryWiki" placeholder="Например : harrypotter.fandom.com/pl"/>' +
                        '</p>' +
                        '<div class="request-additional-field" style="height: 300px; border:1px solid grey; margin-top:5px;">' +
                            '<div style="text-align:center; padding:5px; font-weight: bold; border-bottom: 1px solid grey;">' +
                                'Дополнительные секции' +
                                ' <span class="request-limit" style="display: none; color: red;">(превышен лимит)</span>' +
                            '</div>' +
                            '<div class="request-additional-section" style="overflow-y: auto; height: 265px;" />' +
                        '</div>' +
                    '</fieldset>' +
					'<div class="request-status-div" style="margin: 5px 0; text-align: center;">' +
						'Текущий статус формы: ' +
						'<span class="request-status" style="font-weight: bold;">Ожидает отправки формы</span><br />' +
					'</div>' +
                '</form>';
				var title = "Форма запроса на интервики";
				var f = true;
				break;
		}

        requests.callDiag( title, requestForm, f );
	}

	$( '#request' ).on( 'click', function() {
		mw.loader.using([ 'oojs-ui-windows' ], function() {
			$( requests.init );
		});
	});
}();