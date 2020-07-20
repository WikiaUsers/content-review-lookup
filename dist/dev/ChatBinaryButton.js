/*
 * @name:           ChatBinaryButton
 * @version         2.1
 * @description:    Adds a "Binary!" button to chat
 * @author:         Count of Howard (https://dev.wikia.com/wiki/User:Count_of_Howard)
 */

require(['wikia.window', 'jquery', 'mw'], function (window, $, mw) {
    var mwVariables = mw.config.get([
        'wgCanonicalSpecialPageName',
        'wgUserLanguage'
    ]);

    window.dev = window.dev || {};
    if (
        mwVariables.wgCanonicalSpecialPageName !== 'Chat' ||
        window.dev.chatBinary
    ) {
        return;
    }
    window.dev.chatBinary = true;
    var preview = window.ChatBinaryButtonPreview;

    mw.util.addCSS(
        '.Write [name="message"] {' +
            'width: calc(100% - 70px);' +
        '}' +
        '#ChatBinaryButton {' +
            'position: absolute;' +
            'bottom: 25px;' +
            'right: 50px;' +
        '}' +
        'input + #ChatBinaryButton:last-child {' +
            'bottom: 12px;' +
            'right: 12px;' +
        '}'
    );

    var binaryValue;
    function binaryCompute() {
        var input = $('#Write textarea').val(),
            inputArray = input.split(''),
            inputBinary = inputArray.map(binaryMap);
        binaryValue = inputBinary.join(' ');
    };

    function binaryMap(a) {
        var b;
        for (var i = 0; i < a.length; i++) {
            b = a.charCodeAt(i).toString(2);
        }
        return b.length == 8 ? b : "0" + b;
    };
 
    function binaryClick() {
        var iteration = preview ? ($(binaryButton).data('iteration') || 1) : 2;
        switch (iteration) {
            case 1:
                binaryCompute();
                $('#Write textarea').val(binaryValue);
                break;
            case 2:
                var roomId = mainRoom.activeRoom,
                    room = roomId === 'main'
                        ? mainRoom.chats.main
                        : mainRoom.chats.privates[roomId] || mainRoom;
                room.socket.send(new models.ChatEntry({
                    name: wgUserName,
                    text: binaryValue
                }).xport());
                $('#Write textarea').val('');
                break;
        }
        if (preview) {
            iteration = iteration === 1 ? 2 : 1;
            $(binaryButton).data('iteration', iteration);
        }
    };

    var binaryButton;
    function binaryInit(i18no) {
        if (i18no === window.dev.i18n) {
            i18no.loadMessages('ChatBinaryButton')
                .then(binaryInit);
            return;
        } else {
            binaryButton = $('<span>', {
                'class': 'button',
                'id': 'ChatBinaryButton',
                text: i18no.msg('binary').plain(),
                click: binaryClick
            });
            $('.Write').append(binaryButton);
        }
   }

    mw.hook('dev.i18n').add(binaryInit);
    importArticle({
        type: 'script',
        article: 'u:dev:MediaWiki:I18n-js/code.js'
    });

});