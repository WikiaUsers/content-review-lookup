/*
 * Original idea and code can be found here: http://communaute.wikia.com/wiki/MediaWiki:Common.js/Requests.js
 * by Flotiliya: JS файл был адаптирован под текущую Wiki от 20.02.2025г.
 */
/*******************************************************/
!function() {
	requests = {};
	
	requests.count = 0;
	requests.onPending = false;

    function getEditToken(callback) {
        $.ajax({
            url: mw.util.wikiScript('api'),
            type: 'GET',
            data: {
                action: 'query',
                meta: 'tokens',
                type: 'csrf',
                format: 'json'
            },
            dataType: 'json',
            success: function(response) {
                if (response && response.query && response.query.tokens) {
                    var token = response.query.tokens.csrftoken;
                    callback(token);
                } else {
                    //$('.request-status').text('Ошибка: Не удалось получить CSRF-токен. Попробуйте позже.');
                    $('.request-status')
                    .text('Ошибка: Не удалось получить CSRF-токен. Попробуйте позже.')
                    .removeClass('text-success text-error')
                    .addClass('text-error');
                    callback(null);
                }
            },
            error: function() {
                $('.request-status')
                .text('Ошибка: Не удалось получить CSRF-токен. Проверьте подключение к интернету.')
                .removeClass('text-success text-error')
                .addClass('text-error');
                callback(null);
            }
        });
    }

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
                createDiag.super.prototype.initialize.apply(this, arguments);
                this.content = new OO.ui.PanelLayout({ padded: true });
                this.content.$element.html(form);
                this.$content.addClass('requestForm');
                this.$body.append(this.content.$element);
            };

            createDiag.prototype.getActionProcess = function(action) {
                switch (action) {
                    case 'checkAndSubmit':
                        return new OO.ui.Process(function() {
                            requests.checkAndSubmit();
                        });
                    case 'addMore':
                        return new OO.ui.Process(function() {
                            requests.addMore();
                        });
                    case 'onClose':
                        return new OO.ui.Process(function() {
                            requests.count = 0;
                            $('.request-limit').hide();
                            $('.request-additional-section').html('');
                            $('.request-status')
                            .text('Ожидает отправки формы')
                            .removeClass('text-success text-error')
                            .attr('class', 'request-status ');
                            requests.onPending = false;
                            requests.windowManager.closeWindow(requests.diag);
                        });
                }
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

    requests.checkAndSubmit = function() {

        if (!mw.config.get('wgUserGroups').includes('user')) {
            $('.request-status')
            .text('Ошибка: У вас нет прав для создания страниц')
            .removeClass('text-success text-error')
            .addClass('text-error');
            return;
        }

        if (requests.onPending) return;
    
        var errors = [];
        $('.must-be-filled').each(function() {
            if ($(this).is('select') && ($(this).val() === '' || $(this).val() === null)) {
                // Для select проверяем, что выбрано значение
                $(this).next('.unfilled-warning').fadeIn(500);
                errors.push($(this).prev('label').text() + ' не может быть пустым.');
            } else if ($(this).is('input[type="number"]') && isNaN($(this).val())) {
                // Для числовых полей проверяем, что введено число
                $(this).next('.unfilled-warning').fadeIn(500);
                errors.push($(this).prev('label').text() + ' должно быть числом.');
            } else if ($(this).val().trim() === '') {
                // Для остальных полей проверяем на пустоту
                $(this).next('.unfilled-warning').fadeIn(500);
                errors.push($(this).prev('label').text() + ' не может быть пустым.');
            } else {
                $(this).next('.unfilled-warning').hide();
            }
        });
        
        if (errors.length > 0) {
            $('.request-status')
            .text('Ошибка: Не все обязательные поля заполнены!')
            .removeClass('text-success text-error')
            .addClass('text-error');
            requests.onPending = false;
            return;
        }

        // Если все проверки пройдены
        $('.request-status')
        .text('Данные проверены. Подготовка к отправке...')
        .removeClass('text-success text-error');
        requests.onPending = true;
        
        // Собираем данные из формы
        var topicName = $('#TopicName').val();
        var nickName = $('#NickName').val();
        var requestedStatus = $('#RequestedStatus').val();
        var numberOfEdits = $('#NumberOfEdits').val();
        var numberOfArticles = $('#NumberOfArticles').val();
        var comments = $('#Comments').val();
    
        // Формируем текст для новой страницы
        var text = '{{Запрос_статуса\n';
        text += '| Status            = open\n';
        text += '| TopicName         = ' + topicName + '\n';
        text += '| NickName          = ' + nickName + '\n';
        text += '| RequestedStatus   = ' + requestedStatus + '\n';
        text += '| NumberOfEdits     = ' + numberOfEdits + '\n';
        text += '| NumberOfArticles  = ' + numberOfArticles + '\n';
        text += '| Comments          = ' + comments + '\n';
        text += '| Decision          = Ожидание\n';
        text += '}}';

        // Обновляем статус формы перед отправкой
        $('.request-status')
        .text('Подготовка данных для отправки...')
        .removeClass('text-success text-error');
        requests.onPending = true;

        // Генерируем имя новой страницы
        var newPageTitle = 'Запрос_статуса:' + decodeURIComponent(topicName);

        // Выводим URL API для отладки
        $('.request-status')
        .text('URL API: ' + mw.util.wikiScript('api'))
        .removeClass('text-success text-error');
        setTimeout(function() {
            $('.request-status')
            .text('Ожидает отправки формы')
            .removeClass('text-success text-error');
        }, 2000);

        // Получаем CSRF-токен
        getEditToken(function(editToken) {
            if (!editToken) {
                $('.request-status')
                .text('Ошибка: Не удалось получить CSRF-токен. Попробуйте позже.')
                .removeClass('text-success text-error')
                .addClass('text-error');
                requests.onPending = false;
                return;
            }

            // Обновляем статус формы перед созданием страницы
            $('.request-status')
            .text('Создание новой страницы...')
            .removeClass('text-success text-error');
            requests.onPending = true;

            // Создаем новую страницу
            $.ajax({
                url: mw.util.wikiScript('api'),
                type: 'POST',
                data: {
                    action: 'edit',
                    title: newPageTitle,
                    summary: 'Новый запрос статуса',
                    text: text,
                    token: editToken,
                    format: 'json',
                    createonly: true
                },
                dataType: 'json',
                success: function(response) {
                    if (response && response.edit && response.edit.result === 'Success') {
                        // Если страница успешно создана
                        $('.request-status')
                        .text('Запрос создан! Перенаправление на вашу страницу...')
                        .removeClass('text-success text-error')
                        .addClass('text-success');
                        requests.onPending = false;
    
                        // Через 3 секунды выполняем редирект
                        setTimeout(function() {
                            window.location.href = mw.util.getUrl(newPageTitle);
                        }, 3000);
                    } else {
                        // Если произошла ошибка при создании страницы
                        $('.request-status')
                        .text('Ошибка: Не удалось создать страницу. Подробности: ' + JSON.stringify(response))
                        .removeClass('text-success text-error')
                        .addClass('text-error');
                        requests.onPending = false;
                    }
                },
                error: function(xhr, status, error) {
                    // Если произошла ошибка при запросе к API
                    $('.request-status')
                    .text('Ошибка: ' + status + '. Подробности: ' + error)
                    .removeClass('text-success text-error')
                    .addClass('text-error');
                    requests.onPending = false;
                }
            });
        });
    };

    requests.init = function() {
        switch (mw.config.get('wgTitle')) {
            case "Запросы на повышение Статуса":
                var requestForm =
                    '<form class="request-form">' +
                    '   <div class="request-info">Пожалуйста, заполните поля этой формы, чтобы оставить запрос.<br />Обратите внимание, что поля, помеченные <span class="required-indicator">*</span>, обязательны для заполнения.</div>' +
                    '   <div class="form-section">' +
                    '       <label for="TopicName" class="form-label"><span class="required-indicator">*</span> Название темы:</label>' +
                    '       <input type="text" id="TopicName" class="form-input must-be-filled">' +
                    '       <span class="unfilled-warning">Это поле обязательно для заполнения!</span>' +
                    '   </div>' +
                    '   <div class="form-section">' +
                    '       <label for="NickName" class="form-label"><span class="required-indicator">*</span> Ваш NickName:</label>' +
                    '       <input type="text" id="NickName" class="form-input must-be-filled">' +
                    '       <span class="unfilled-warning">Это поле обязательно для заполнения!</span>' +
                    '   </div>' +
                    '   <div class="form-section">' +
                    '       <label for="RequestedStatus" class="form-label"><span class="required-indicator">*</span> Запрашиваемый статус:</label>' +
                    '       <select id="RequestedStatus" class="form-input must-be-filled">' +
                    '           <option value="" disabled selected>Выберите статус</option>' +
                    '           <option value="Откатчик">Откатчик</option>' +
                    '           <option value="Младший модератор">Младший модератор</option>' +
                    '           <option value="Модератор">Модератор</option>' +
                    '           <option value="Младший администратор">Младший администратор</option>' +
                    '           <option value="Администратор">Администратор</option>' +
                    '       </select>' +
                    '       <span class="unfilled-warning">Это поле обязательно для заполнения!</span>' +
                    '   </div>' +
                    '   <div class="form-section">' +
                    '       <label for="NumberOfEdits" class="form-label"><span class="required-indicator">*</span> Количество ваших правок:</label>' +
                    '       <input type="number" id="NumberOfEdits" class="form-input must-be-filled">' +
                    '       <span class="unfilled-warning">Это поле обязательно для заполнения!</span>' +
                    '   </div>' +
                    '   <div class="form-section">' +
                    '       <label for="NumberOfArticles" class="form-label"><span class="required-indicator">*</span> Количество созданных вами статей/страниц:</label>' +
                    '       <input type="number" id="NumberOfArticles" class="form-input must-be-filled">' +
                    '       <span class="unfilled-warning">Это поле обязательно для заполнения!</span>' +
                    '   </div>' +
                    '   <div class="form-section">' +
                    '       <label for="Comments" class="form-label">Дополнительная информация (опционально):</label>' +
                    '       <textarea id="Comments" class="form-input"></textarea>' +
                    '   </div>' +
                    '   <div class="request-status">Ожидает отправки формы</div>' +
                    '</form>';
                var title = "Форма запроса на получение статуса";
                var f = false;
                break;
        }
    
        if (requestForm) {
            requests.callDiag(title, requestForm, f);
        }
    };

    $(document).ready(function() {
        $('#request').on('click', function() {
            mw.loader.using(['oojs-ui-windows'], function() {
                requests.init();
            });
        });
    });
}();