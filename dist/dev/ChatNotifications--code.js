;(function(window, $, mw) {
    if (mw.config.get('wgCanonicalSpecialPageName') !== 'Chat') return;
    var _configuration;
    var i18n;
    
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
        var config = getConfiguration();
        
        $.showCustomModal(i18n.msg('modal_title').escape(),
            '<form class="WikiaForm" method="" name=""> \
                 <fieldset> \
                     <table> \
                         <tr> \
                             <td>' + i18n.msg('window_note').escape() + ':</td> \
                             <td>' + i18n.msg('enable').escape() + ' <input name="notifications-select" type="checkbox" /> <button type="button" id="window-perm">' + i18n.msg('window_perm').escape() + '</button></td> \
                         </tr> \
                         <tr> \
                             <td>' + i18n.msg('audio_label').escape() + ':</td> \
                             <td>' + i18n.msg('enable').escape() + ' <input name="audio-enable" type="checkbox" /></td> \
                         </tr> \
                         <tr> \
                             <td>' + i18n.msg('audio_url').escape() + ':</td> \
                             <td><input name="audio-input" type="input" /> <button type="button" id="audio-test">' + i18n.msg('audio_test').escape() + '</button></td> \
                         </tr> \
                         <tr> \
                             <td>' + i18n.msg('color_label').escape() + ':</td> \
                             <td><input name="color-input" type="input" /> <button type="button" id="color-test">' + i18n.msg('color_test').escape() + '</button><br />"<span id="fake-ping">' + i18n.msg('color_example').escape() + '!</span>"</td> \
                         </tr> \
                         <tr> \
                             <td>' + i18n.msg('blocked_label').escape() + ':</td> \
                             <td>' + i18n.msg('blocked_note').escape() + '<br /><textarea cols="30" name="blocked-users"></textarea><br />' + i18n.msg('blocked_note2').escape() + '</td> \
                         </tr> \
                         <tr> \
                             <td>' + i18n.msg('pings_label').escape() + ':</td> \
                             <td><textarea cols="30" name="user-pings"></textarea><br />' + i18n.msg('pings_note').escape() + '</td> \
                         </tr> \
                         <tr> \
                             <td></td> \
                             <td> \
                                 <input type="radio" name="rop" value="case">' + i18n.msg('pings_case').escape() + '</input><br /> \
                                 <input type="radio" name="rop" value="nocase">' + i18n.msg('pings_nocase').escape() + '</input><br /> \
                                 <input type="radio" name="rop" value="regex">' + i18n.msg('pings_regex').escape() + '</input> \
                                 (' + i18n.msg('pings_regexi').escape() + '<input id="iflag-cn" name="i-flag" type="checkbox" />) \
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
                    message: i18n.msg('cancel').escape(),
                    handler: function() { $('#notifications-ui').closeModal() }
                },
                {
                    id: "save-ui",
                    defaultButton: true,
                    message: i18n.msg('save').escape(),
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
    
    function init(inst) {
        i18n = inst;

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
    }
    
    mw.hook('dev.i18n').add(function(lib) {
        lib.loadMessages('ChatNotifications').then(init);
    });

    window.chatNotificationsOpenUI = openUI;
    
    importArticle({
        type: 'script',
        article: 'u:dev:I18n-js/code.js'
    });
})(window, jQuery, mediaWiki);