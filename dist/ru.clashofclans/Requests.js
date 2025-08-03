/*
 * Original idea and code can be found here: http://communaute.wikia.com/wiki/MediaWiki:Common.js/Requests.js
 *
 * by Flotiliya:
 * - the JS page has been adapted to the current Wiki 20.02.2025
 * - last update 31.07.2025
 * - desc:
 * - added class "template-local" for adaptation of the design themes
 * - added class "request-dialog-local" for form
 */
/*******************************************************/
!function() {
	requests = {};
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

	requests.callDiag = function( title, form ) {
		if ( !requests.windowManager ) {
			function createDiag( cfg ) {
                createDiag.super.call( this, cfg );
            }

            OO.inheritClass( createDiag, OO.ui.ProcessDialog );
            createDiag.static.name = 'reqForm';
            createDiag.static.title = title;
            createDiag.static.actions = [
				{
					label: 'Отправить запрос',
					flags: [ 'secondary' ],
					action: 'checkAndSubmit',
					classes: [ 'template-local' ]
				},
                {
                	label: 'Закрыть',
                	flags: [ 'safe', 'close' ],
                	action: 'onClose'
                }
            ];

            createDiag.prototype.initialize = function () {
                createDiag.super.prototype.initialize.apply(this, arguments);
               
                // Добавляем уникальный класс к корневому элементу диалога
				this.$element.addClass('request-dialog-local');
                this.content = new OO.ui.PanelLayout({ padded: true });
                this.content.$element.html(form);
                this.$content.addClass('requestForm');
                this.$body.append(this.content.$element);
                
                // Добавляем обработчик для скрытия предупреждений при вводе
                this.$body.on('input', '.must-be-filled', function() {
                    ['duplicate-warning', 'unfilled-warning'].forEach(function(cls) {
                        var warning = $(this).siblings('.' + cls);
                        if (warning.length > 0) {
                            warning.addClass('hidden');
                        }
                    }.bind(this)); // Привязываем контекст this
                });
            };

            createDiag.prototype.getActionProcess = function(action) {
                switch (action) {
                    case 'checkAndSubmit':
                        return new OO.ui.Process(function() {
                            requests.checkAndSubmit();
                        });
                    case 'onClose':
                        return new OO.ui.Process(function() {
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

    requests.checkAndSubmit = function() {

        if (!mw.config.get('wgUserGroups').includes('user')) {
            $('.request-status')
            .text('Ошибка: У вас нет прав для создания страниц!')
            .removeClass('text-success text-error')
            .addClass('text-error');
            return;
        }

        if (requests.onPending) return;

        var errors = [];
        $('.must-be-filled').each(function() {
            if ($(this).is('select') && ($(this).val() === '' || $(this).val() === null)) {
                // Для select проверяем, что выбрано значение
                $(this).next('.unfilled-warning').removeClass('hidden').fadeIn(500);
                errors.push($(this).prev('label').text() + ' не может быть пустым.');
            } else if ($(this).is('input[type="number"]') && isNaN($(this).val())) {
                // Для числовых полей проверяем, что введено число
                $(this).next('.unfilled-warning').removeClass('hidden').fadeIn(500);
                errors.push($(this).prev('label').text() + ' должно быть числом.');
            } else if ($(this).val().trim() === '') {
                // Для остальных полей проверяем на пустоту
                $(this).next('.unfilled-warning').removeClass('hidden').fadeIn(500);
                errors.push($(this).prev('label').text() + ' не может быть пустым.');
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
        	        if (response && response.error && response.error.code === 'articleexists') {
        				// Если страница с таким названием уже существует
                        $('.request-status')
                        .text('Ошибка: Страница с таким названием уже существует!')
                        .removeClass('text-success text-error')
                        .addClass('text-error');        				
        				
            			// Показываем предупреждение о дубликате под полем ввода
	                    var duplicateWarning = $('#TopicName').siblings('.duplicate-warning');
	                    if (duplicateWarning.length > 0) {
	                        duplicateWarning.removeClass('hidden').fadeIn(500);
	                    }
            			requests.onPending = false;
            			return;
        			}
                	
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
                    '		<span class="duplicate-warning" style="display: none;">Страница с таким названием уже существует! Пожалуйста, укажите другое.<br />Пример: Ваше имя - Название статуса</span>' +
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
                    '           <option value="Хелпер">Хелпер</option>' +
                    '           <option value="Младший модератор">Младший модератор</option>' +
                    '           <option value="Модератор">Модератор</option>' +
                    '           <option value="Старший модератор">Старший модератор</option>' +
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
                    '       <label for="NumberOfArticles" class="form-label"><span class="required-indicator">*</span> Количество созданных вами страниц-статей:</label>' +
                    '       <input type="number" id="NumberOfArticles" class="form-input must-be-filled">' +
                    '       <span class="unfilled-warning">Это поле обязательно для заполнения!</span>' +
                    '   </div>' +
                    '   <div class="form-section">' +
                    '       <label for="Comments" class="form-label">Наименования созданных вами страниц-статей:</label>' +
                    '       <label for="Comments" class="form-label-info"><font style="color: #dd360a;">[Опционально]</font> Для получения статуса выше Хелпера поле обязательное для заполнения</label>' +
                    '       <textarea id="Comments" class="form-input"></textarea>' +
                    '   </div>' +
                    '   <div class="request-status">Ожидает отправки формы</div>' +
                    '</form>';
                var title = "Форма запроса на получение статуса";
                break;
        }
    
        if (requestForm) {
            requests.callDiag(title, requestForm);
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