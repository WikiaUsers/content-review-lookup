;(function(window, $, mw) {
    var _configuration;      
    var _i18n = {
        'en': {
            'modal_title': 'Chat Notifications',
            'enable': 'enable',
            'window_note': 'HTML5 notifications',
            'window_perm': 'Request permission',
            'audio_label': 'Ping sound',
            'audio_url': 'Audio file URL',
            'audio_test': 'Play',
            'color_label': 'Ping color',
            'color_test': 'Test',
            'color_example': 'This is a sample ping',
            'blocked_label': 'Blocked users',
            'blocked_note': 'These users cannot ping you',
            'blocked_note2': 'One username per line',
            'pings_label': 'Pings',
            'pings_note': 'One ping per line',
            'pings_case': 'Case sensitive',
            'pings_nocase': 'Case insensitive',
            'pings_regex': 'Regular expressions',
            'pings_regexi': 'i flag',
            'save': 'Save',
            'cancel': 'Cancel'
        },
        'de': {
            'modal_title': 'Chat-Benachrichtigungen',
            'enable': 'aktivieren',
            'window_note': 'HTML5-Benachrichtigungen',
            'window_perm': 'Berechtigung anfordern',
            'audio_label': 'Ping-Ton',
            'audio_url': 'Audio-Datei-URL',
            'audio_test': 'Abspielen',
            'color_label': 'Ping-Farbe',
            'color_test': 'Test',
            'color_example': 'Das ist ein Beispiel-Ping!',
            'blocked_label': 'Blockierte Benutzer',
            'blocked_note': 'Diese Benutzer können dich nicht pingen',
            'blocked_note2': 'Ein Benutzername pro Zeile',
            'pings_label': 'Pings',
            'pings_note': 'Ein Ping pro Zeile',
            'pings_case': 'Groß-/Kleinschreibung beachten',
            'pings_nocase': 'Groß-/Kleinschreibung ignorieren',
            'pings_regex': 'Reguläre Ausdrücke',
            'pings_regexi': 'i flag',
            'save': 'Speichern',
            'cancel': 'Abbrechen'
        },
        'be': {
            'modal_title': 'Паведамлення чата',
            'enable': 'ўключыць',
            'window_note': 'HTML5-паведамлення',
            'window_perm': 'Запытаныя дазволы',
            'audio_label': 'Гукі паведамленняў',
            'audio_url': 'URL-адрас аўдыёфайла',
            'audio_test': 'Прайграць',
            'color_label': 'Колер паведамленняў',
            'color_test': 'Тэст',
            'color_example': 'Гэта прыклад пінга',
            'blocked_label': 'Заблякаваныя карыстальнікі',
            'blocked_note': 'Гэтыя ўдзельнікі не могуць пінгаваць вас',
            'blocked_note2': 'Адно імя ўдзельніка ў радку',
            'pings_label': 'Пінгі',
            'pings_note': 'Адзін пінг ў радку',
            'pings_case': 'Адчувальна да рэгістра',
            'pings_nocase': 'Без уліку рэгістра',
            'pings_regex': 'Рэгулярныя выразы',
            'pings_regexi': 'Адзнака',
            'save': 'Захаваць',
            'cancel': 'Выхад'
        },
        'fr': {
            'modal_title': 'Notifications du tchat',
            'enable': 'activer',
            'window_note': 'Notifications HTML5',
            'window_perm': 'Demander l’autorisation',
            'audio_label': 'Son du ping',
            'audio_url': 'URL du fichier audio',
            'audio_test': 'Lire',
            'color_label': 'Couleur du ping',
            'color_test': 'Tester',
            'color_example': 'Ceci est un exemple de ping',
            'blocked_label': 'Utilisateurs bloqués',
            'blocked_note': 'Ces utilisateurs ne peuvent pas vous pinguer',
            'blocked_note2': 'Un utilisateur par ligne',
            'pings_label': 'Pings',
            'pings_note': 'Un ping par ligne',
            'pings_case': 'Sensible à la casse',
            'pings_nocase': 'Non sensible à la casse',
            'pings_regex': 'Expressions régulières',
            'pings_regexi': 'flag i',
            'save': 'Enregistrer',
            'cancel': 'Annuler'
        },
        'es': {
            'modal_title': 'Notifications del chat',
            'enable': 'activo',
            'window_note': 'Notificationes HTML5',
            'window_perm': 'Pedir permiso',
            'audio_label': 'Sonido del ping',
            'audio_url': 'URL del audio',
            'audio_test': 'Reproducir',
            'color_label': 'Color del ping',
            'color_test': 'Probar',
            'color_example': 'Este es un ping de muestra',
            'blocked_label': 'Usuarios bloqueados',
            'blocked_note': 'Estos usuarios no pueden usar tu ping',
            'blocked_note2': 'Un nombre de usuario por línea',
            'pings_label': 'Pings',
            'pings_note': 'Un ping por línea',
            'pings_case': 'Distinguir mayúsculas y minúsculas',
            'pings_nocase': 'No distinguir mayúsculas y minúsculas',
            'pings_regex': 'Expresiones regulares',
            'pings_regexi': 'Indicar',
            'save': 'Guardar',
            'cancel': 'Cancelar'
        },
        'ru': {
            'modal_title': 'Уведомления чата',
            'enable': 'включить',
            'window_note': 'HTML5-уведомления',
            'window_perm': 'Запросить разрешение',
            'audio_label': 'Звуки уведомлений',
            'audio_url': 'URL-адрес аудиофайла',
            'audio_test': 'Воспроизвести',
            'color_label': 'Цвет уведомлений',
            'color_test': 'Тест',
            'color_example': 'Это пример пинга',
            'blocked_label': 'Заблокированные пользователи',
            'blocked_note': 'Эти участники не могут пинговать вас',
            'blocked_note2': 'Одно имя участника в строке',
            'pings_label': 'Пинги',
            'pings_note': 'Один пинг в строке',
            'pings_case': 'Чувствительно к регистру',
            'pings_nocase': 'Без учёта регистра',
            'pings_regex': 'Регулярные выражения',
            'pings_regexi': 'флаг i',
            'save': 'Сохранить',
            'cancel': 'Выход'
        },
        'uk': {
            'modal_title': 'Повідомлення чату',
            'enable': 'включити',
            'window_note': 'HTML5-повідомлення',
            'window_perm': 'Потрібні дозволи',
            'audio_label': 'Звуки повідомлень',
            'audio_url': 'URL-адреса аудіофайлу',
            'audio_test': 'Відтворити',
            'color_label': 'Колір повідомлень',
            'color_test': 'Тест',
            'color_example': 'Це приклад пінгу',
            'blocked_label': 'Заблоковані користувачі',
            'blocked_note': 'Ці користувачі не можуть пінговать вас',
            'blocked_note2': 'Одне ім\'я користувача у рядку',
            'pings_label': 'Пінги',
            'pings_note': 'Один пінг в рядку',
            'pings_case': 'Чутливе до регістру',
            'pings_nocase': 'Без урахування регістру',
            'pings_regex': 'Регулярні вирази',
            'pings_regexi': 'Відмітка',
            'save': 'Зберегти',
            'cancel': 'Вихід'
        }
    };
    
    function hasNotificationPermission() {
        return (Notification.permission !== 'granted') ? false : true;
    }
    
    function saveSettings() {
        var settings = {
            notifications: $('input[name=notifications-select]').prop('checked'),
            audio: $('input[name=audio-enable]').prop('checked'),
            audioUrl: $('input[name=audio-input]').val(),
            color: $('input[name=color-input]').val(),
            blocked: $('textarea[name=blocked-users]').val().split("\n"),
            pings: $('textarea[name=user-pings]').val().split("\n"),
            type: $('input[name=rop]:checked').val(),
            ro: ($('#iflag-cn').prop('checked') === true) ? 'i' : ''
        };
        
        setConfiguration(settings);
    }
    
    function fillInDefaults(config) {
        if (config.notifications === true) {
            $('input[name=notifications-select]').prop('checked', true);
        }
        
        if (hasNotificationPermission()) {
            $('#window-perm').hide();
        }
        
        if (config.audio === true) {
            $('input[name=audio-enable]').prop('checked', true);
        }
        
        if (typeof config.audioUrl === 'string') {
            $('input[name=audio-input]').val(config.audioUrl);
        }
        
        if (typeof config.color === 'string') {
            $('input[name=color-input]').val(config.color);
        }
        
        if (typeof config.blocked === 'object') {
            $('textarea[name=blocked-users]').val(config.blocked.join("\n"));
        }
        
        if (typeof config.pings === 'object') {
            $('textarea[name=user-pings]').val(config.pings.join("\n"));
        }
        
        if (config.type === 'case') {
            $('input[value=case]').prop('checked', true);
        } else if (config.type === 'nocase') {
            $('input[value=nocase]').prop('checked', true);
        } else if (config.type === 'regex') {
            $('input[value=regex]').prop('checked', true);
        } else {
            $('input[value=case]').prop('checked', true);
        }
        
        if (config.ro === 'i') {
            $('input[name=i-flag]').prop('checked', true);
        }
    }
    
    function openUI() {
        var i18n = (typeof _i18n[mw.config.get('wgUserLanguage')] === undefined)?_i18n.en:_i18n[mw.config.get('wgUserLanguage')];
        var config = getConfiguration();
        
        $.showCustomModal(i18n['modal_title'],
            '<form class="WikiaForm" method="" name=""> \
                 <fieldset> \
                     <table> \
                         <tr> \
                             <td>' + i18n['window_note'] + ':</td> \
                             <td>' + i18n['enable'] + ' <input name="notifications-select" type="checkbox" /> <button type="button" id="window-perm">' + i18n['window_perm'] + '</button></td> \
                         </tr> \
                         <tr> \
                             <td>' + i18n['audio_label'] + ':</td> \
                             <td>' + i18n['enable'] + ' <input name="audio-enable" type="checkbox" /></td> \
                         </tr> \
                         <tr> \
                             <td>' + i18n['audio_url'] + ':</td> \
                             <td><input name="audio-input" type="input" /> <button type="button" id="audio-test">' + i18n['audio_test'] + '</button></td> \
                         </tr> \
                         <tr> \
                             <td>' + i18n['color_label'] + ':</td> \
                             <td><input name="color-input" type="input" /> <button type="button" id="color-test">' + i18n['color_test'] + '</button><br />"<span id="fake-ping">' + i18n['color_example'] + '!</span>"</td> \
                         </tr> \
                         <tr> \
                             <td>' + i18n['blocked_label'] + ':</td> \
                             <td>' + i18n['blocked_note'] + '<br /><textarea cols="30" name="blocked-users"></textarea><br />' + i18n['blocked_note2'] + '</td> \
                         </tr> \
                         <tr> \
                             <td>' + i18n['pings_label'] + ':</td> \
                             <td><textarea cols="30" name="user-pings"></textarea><br />' + i18n['pings_note'] + '</td> \
                         </tr> \
                         <tr> \
                             <td></td> \
                             <td> \
                                 <input type="radio" name="rop" value="case">' + i18n['pings_case'] + '</input><br /> \
                                 <input type="radio" name="rop" value="nocase">' + i18n['pings_nocase'] + '</input><br /> \
                                 <input type="radio" name="rop" value="regex">' + i18n['pings_regex'] + '</input> \
                                 (' + i18n['pings_regexi'] + '<input id="iflag-cn" name="i-flag" type="checkbox" />) \
                             </td> \
                         </tr> \
                     </table> \
                 </fieldset> \
             </form>',
        {
            id: 'notifications-ui',
            width: 410,
            buttons: [
                {
                    id: "close-ui",
                    defaultButton: false,
                    message: i18n['cancel'],
                    handler: function() { $('#notifications-ui').closeModal() }
                },
                {
                    id: "save-ui",
                    defaultButton: true,
                    message: i18n['save'],
                    handler: function() { saveSettings(); $('#notifications-ui').closeModal() }
                }
            ]
        });
        
        fillInDefaults(config);
        $('#window-perm').click(function() { Notification.requestPermission() });
        $('#audio-test').click(function() { new Audio($('input[name=audio-input]').val()).play() });
        $('#color-test').click(function() { $('#fake-ping').css('color', $('input[name=color-input]').val()) });
    }
    
    function setConfiguration(config) {
        _configuration = config;
        localStorage.setItem('cnConfig', JSON.stringify(config));
    }
    
    function getConfiguration() {
        if (typeof _configuration === 'undefined') {
            if (typeof localStorage.getItem('cnConfig') === 'string') {
                _configuration = JSON.parse(localStorage.getItem('cnConfig'));
            } else {
                var config = {
                    notifications: false,
                    audio: false,
                    audioUrl: 'https://images.wikia.nocookie.net/monchbox/images/0/01/Beep-sound.ogg',
                    color: '#FF0000',
                    blocked: [],
                    pings: [ mw.config.get('wgUserName') ],
                    roi: '',
                    type: 'case'
                };
                
                setConfiguration(config);
                return config;
            }
        }
        
        return (typeof _configuration === 'undefined') ? {} : _configuration;
    }
    
    function _containsPingRegex(message, pings, ro) {
        for (var i in pings) {
            var regex = new RegExp(pings[i], ro);
            if (regex.test(message) === true) {
                return true;
            }
        }
        
        return false;
    }
    
    function _containsPingNocase(message, pings) {
        for (var i in pings) {
            if ((message.toLowerCase()).indexOf((pings[i].toLowerCase())) > -1) {
                return true;
            }
        }
        
        return false;
    }
    
    function _containsPingDefault(message, pings) {
        for (var i in pings) {
            if (message.indexOf(pings[i]) > -1) {
                return true;
            }
        }
        
        return false;
    }
    
    function createPing(data) {
        if (data.config.notifications) {
            if (!document.hasFocus()) {
                var notification = new Notification(data.user, {
                    body: data.message,
                    icon: data.avatar
                });
                setTimeout(function() { notification.close() }, 5000);
            }
        }
        
        if (data.config.audio) {
            new Audio(data.config.audioUrl).play();
        }
        
        if (typeof data.config.color === 'string') {
            $('#' + data.messageId).css('color', data.config.color);
        }
    }
    
    function containsPing(type, message, pings, ro) {
        switch (type) {
            case 'regex':
                return _containsPingRegex(message, pings, ro);
                break;
            case 'nocase':
                return _containsPingNocase(message, pings);
                break;
            case 'default':
                return _containsPingDefault(message, pings);
                break;
            default:
                return containsPing('nocase', message, pings, ro);
        }
    }
    
    function evaluateMessage(data) {
        if (data.user !== mw.config.get('wgUserName')) {
            if (data.config.blocked.indexOf(data.user) === -1) {
               if (containsPing(data.config.type, data.message,
                       data.config.pings, data.config.ro)) {
                   createPing(data);
               }
            }
        }
    }
    
    $('textarea[name=message').keydown(function(e) {
        if (e.which === 13) {
            var text = $(this).val();
            if (text.substr(0, 1) === '/' && text.substr(1, 13) === 'notifications') {
                e.preventDefault();
                $(this).val('');
                openUI();
            }
        }
    });
    
    window.mainRoom.socket.bind('chat:add', function(message) {
        var user = new models.User();
            user.mport(message.data);
        
        var data = {
            avatar: user.get('avatarSrc'),
            config: getConfiguration(),
            message: user.get('text'),
            messageId: $('#Chat_' + window.mainRoom.roomId + ' li:last').attr('id'),
            user: user.get('name')
        };
        
        evaluateMessage(data);
    });

    window.chatNotificationsOpenUI = openUI;
})(window, jQuery, mediaWiki);