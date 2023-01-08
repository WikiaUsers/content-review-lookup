/* Any JavaScript here will be loaded for all users on every page load. */
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
		

		if ( allFieldsAreSet ) {
			$.ajax({
				dataType: 'text',
				success: function ( data ) {
					if ( data ) {
						$( '.request-status' ).text( 'Записываю запрос [1/1]' );

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
		case "Приём заявок в Трудбригаду":
			var requestForm =
                '<form method="" name="">' +
                  '<fieldset style="margin: 0;">' +
                    '<p style="padding:5px; border:1px solid grey; margin: 5px 0;">' +
                        'Пожалуйста, заполните поля этой карточки, чтобы оставить запрос. Обратите внимание, что поля, помеченные (<span style="color:red">*</span>), обязательны для заполнения.' +
                    '</p>' +
                    '<p class="request-field must-be-filled" style="margin-bottom: 5px;">' +
                        '<b>' +
                            '<span style="color:red">*</span>' +
                            'Названия проектов с наибольшим кол-вом вашего вклада: ' +
                        '</b>' +
                        '<span class="unfilled-warning" style="color:red;display:none">Вы должны заполнить это поле.</span>' +
                        '<input type="text" style="align:center;height:20px; width:300px" id="Name" placeholder="Например : Гарри Поттер Вики"/>' +
                    '</p>'+
                    '<p class="request-field must-be-filled" style="margin-bottom: 5px;">' +
                        '<b>' +
                            '<span style="color:red">*</span>' +
                            'Примерное кол-во ваших правок на Фэндоме: ' +
                        '</b>' +
                        '<span class="unfilled-warning" style="color:red;display:none">Вы должны заполнить это поле.</span>' +
                        '<input type="text" maxlength="6" style="align:center;height:20px; width:150px" id="NumberOfEdits"/>' +
                    '</p>' +
                    '<p class="request-field must-be-filled" style="margin-bottom: 5px;">' +
                        '<b>' +
                            '<span style="color:red">*</span>' +
                            'Примерное кол-во созданных вами статей: ' +
                        '</b>' +
                        '<span class="unfilled-warning" style="color:red;display:none">Вы должны заполнить это поле.</span>' +
                        '<input type="text" style="height:20px; width:200px" id="NumberOfArticles" placeholder="Нужно НЕ менее 1 статьи"/>' +
                    '</p>' +
                    '<p class="request-field"">' +
                        '<b>Дополнительная информация: </b>' +
                        '<input type="text" style="height:20px; width:100%" id="Comments" placeholder="Любая дополнительная информация о каком-либо ином виде помощи или о себе"/>' +
                    '</p>' +
                  '</fieldset>' +
                  '<div class="request-status-div" style="margin: 5px 0; text-align: center;">' +
                	'Текущий статус формы: ' +
                	'<span class="request-status" style="font-weight: bold;">Ожидает отправки формы</span>' +
                  '</div>' +
                '</form>';
				var title = "Форма запроса на Трудбригадника";
				var f = false;
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