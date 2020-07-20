$(function() {
    'use strict';
    
    if (mw.config.get('wgCanonicalSpecialPageName') === "Chat") {
        console.log('Zombidle Wiki - Chat Sound Notifications v1.4.3');

        const NOTIFICATION_SOUND_ENABLED = 'notification-sound-enabled';
        const NOTIFICATION_SOUND_LINK = 'notification-sound-link';
        const NOTIFICATION_DEFAULT_SOUND = 'https://vignette.wikia.nocookie.net/zombidle/images/1/11/NotificationSoundDefault.ogg';
        
        var timeout;
        var railElement;
        var chatOptionsWindow;
        var chatOptionsButton;
        var notificationAudio;
        var notificationSoundEnabled;
        
        function saveOptions() {
            localStorage.setItem(NOTIFICATION_SOUND_ENABLED, Number( document.getElementById("notification-sound-enabled").checked) );
            localStorage.setItem(NOTIFICATION_SOUND_LINK, document.getElementById("notification-sound-link").value);

            // set to new values
            notificationSoundEnabled = Number( localStorage.getItem(NOTIFICATION_SOUND_ENABLED) );
            notificationAudio = new Audio( localStorage.getItem(NOTIFICATION_SOUND_LINK) );
        }
        
        function closeOptionsWindow() {
            chatOptionsWindow.classList.remove('chat__options-window--visible');
            clearTimeout(timeout);
            timeout = setTimeout(function() {
                document.body.removeChild(chatOptionsWindow);
            }, 600);
        }
        
        function openOptionsWindow() {
            // append 'fresh' options window
            // because can't append it only once during loading due to some sort of weird selectors wikia uses to bind all actions
            document.body.appendChild(chatOptionsWindow);
            
            // set fields to stored values
            document.getElementById("notification-sound-enabled").checked = Number( localStorage.getItem(NOTIFICATION_SOUND_ENABLED) );
            document.getElementById("notification-sound-link").value = localStorage.getItem(NOTIFICATION_SOUND_LINK);
            
            // delay class appending for pretty animations
            clearTimeout(timeout);
            timeout = setTimeout(function() {
                chatOptionsWindow.classList.add('chat__options-window--visible');
            }, 20);
        }

        createAndAppendElements();
        
        if( localStorage.getItem(NOTIFICATION_SOUND_ENABLED) === null ) {
            localStorage.setItem(NOTIFICATION_SOUND_ENABLED, 1);
        }
        
        if( localStorage.getItem(NOTIFICATION_SOUND_LINK) === null ) {
            localStorage.setItem(NOTIFICATION_SOUND_LINK, NOTIFICATION_DEFAULT_SOUND);
        }
        
        chatOptionsButton = document.querySelector('#chat__options-button');
        notificationAudio = new Audio( localStorage.getItem(NOTIFICATION_SOUND_LINK) );
        notificationSoundEnabled = Number(localStorage.getItem(NOTIFICATION_SOUND_ENABLED));
        
        chatOptionsButton.addEventListener('click', function(e) {
            if( chatOptionsWindow.classList.contains('chat__options-window--visible') ) {
                closeOptionsWindow();
            } else {
                openOptionsWindow();
            }
        });
        
        mainRoom.model.chats.bind('afteradd', function(e) {
            if( notificationSoundEnabled && mw.config.get('wgUserName') !== e.attributes.name && e.attributes.name !== '' ) {
                notificationAudio.play();
            }
        });
        
        chatOptionsWindow.querySelector('#options-cancel-button').addEventListener('click', function(e) {
            closeOptionsWindow();
        });
        
        chatOptionsWindow.querySelector('#options-save-button').addEventListener('click', function(e) {
            saveOptions();
            closeOptionsWindow();
        });
        
        function createAndAppendElements() {
            // TODO: do something with that

            // add options button
            railElement = document.querySelector('#Rail');
            railElement.innerHTML = '<div id="chat__options-button" class="chat__options-button">\
                                        <button>\
                                            <img src="https://vignette.wikia.nocookie.net/zombidle/images/e/e9/Chat-options-button.png" alt="Options">\
                                        </button>\
                                    </div>' + railElement.innerHTML;
            
            // create options window
            chatOptionsWindow = document.createElement('div');
            chatOptionsWindow.id = "chat__options-window";
            chatOptionsWindow.classList.add('chat__options-window');
            chatOptionsWindow.innerHTML = '<div id="options-window__options-box" class="options-window__options-box">\
                                                <div class="options-box__option">\
                                                    <span>Enable sound notification:</span>\
                                                    <input id="notification-sound-enabled" type="checkbox">\
                                                    <label for="notification-sound-enabled"></label>\
                                                </div>\
                                                <div class="options-box__option">\
                                                    <span>Notification sound:</span>\
                                                    <input id="notification-sound-link" type="text">\
                                                    <label for="notification-sound-link"></label>\
                                                </div>\
                                                <div class="options-box__option">\
                                                    <span>Play sound when user joins/leaves chat:</span>\
                                                    <input id="notification-user-joining" type="checkbox">\
                                                    <label for="notification-user-joining"></label>\
                                                </div>\
                                            </div>\
                                            <div id="options-window__buttons" class="options-window__buttons">\
                                                <button id="options-save-button">\
                                                    <img src="https://vignette.wikia.nocookie.net/zombidle/images/0/0f/Zombidle-save-button.png" alt="Save">\
                                                </button>\
                                                <button id="options-cancel-button">\
                                                    <img src="https://vignette.wikia.nocookie.net/zombidle/images/2/27/Zombidle-cancel-button.png" alt="Cancel">\
                                                </button>\
                                            </div>';
        }

    }

});