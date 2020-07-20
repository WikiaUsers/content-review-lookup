/*
 * Name:         Cryprogram
 * Description:  Enables to create own cryptograms
 * Author:       Rendann
 * Support:      Zedic45, ЁугелхлЧсокНаЦезаре, Your Own Waifu
 */
!function( $, mw ) {
    'use strict';
 
    var abcRU =  ['а','б','в','г','д','е','ё','ж','з','и','й','к','л','м','н','о','п','р','с','т','у','ф','х','ц','ч','ш','щ','ъ','ы','ь','э','ю','я'],
        abcEN =  ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
 
    var MODE_ENCRYPT = 0,
        MODE_DECRYPT = 1;
 
    var mode = MODE_ENCRYPT,
        keyInt = 3,
        keyString = 'ШИФР',
        lang = 'ru',
        func = {};
 
    func.init = function() {
        $( '[id^=modal]' ).click(function() {
            func.prepare(this.id);
        });
    };
 
    func.prepare = function(type) {
        var config = {};
        config.vars = {};
 
        switch (type) {
            case 'modal-atbash':
                config.vars.id = 'opened-modal-atbash';
                config.vars.title = 'Шифр «Атбаш»';
                config.vars.buttons = [{
                    vars: {
                        value: 'Расшифрование',
                        classes: ['normal', 'primary'],
                        data: [{
                            key: 'cipher'
                        }]
                    }
                }];
                break;
            case 'modal-a1z26':
                config.vars.id = 'opened-modal-a1z26';
                config.vars.title = 'Шифр «A1Z26»/«А1Я33»';
                config.vars.buttons = [{
                        vars: {
                            value: 'Расшифрование',
                            classes: ['normal', 'primary'],
                            data: [{
                                key: 'cipher'
                            }]
                        }
                    }, {
                        vars: {
                            value: 'Задать язык',
                            data: [{
                                key: 'lang'
                            }]
                    }
                }];
                break;
            case 'modal-caeser':
                config.vars.id = 'opened-modal-caeser';
                config.vars.title = 'Шифр Цезаря';
                config.vars.buttons = [{
                        vars: {
                            value: 'Расшифрование',
                            classes: ['normal', 'primary'],
                            data: [{
                                key: 'cipher'
                            }]
                        }
                    }, {
                        vars: {
                            value: 'Задать ключ',
                            data: [{
                                key: 'keyint'
                            }]
                    }
                }];
                break;
            case 'modal-vigenere':
                config.vars.id = 'opened-modal-vigenere';
                config.vars.title = 'Шифр Виженера';
                config.vars.buttons = [{
                        vars: {
                            value: 'Расшифрование',
                            classes: ['normal', 'primary'],
                            data: [{
                                key: 'cipher'
                            }]
                        }
                    }, {
                        vars: {
                            value: 'Задать ключ',
                            data: [{
                                key: 'keystring'
                            }]
                    }
                }];
                break;
        }
 
        config.vars.size = 'medium';
        config.vars.content =
            '<label for="opened-modal-input">Введите текст:</label>' +
            '<textarea id="opened-modal-input" style="width:100%;"></textarea>' +
            '<label for="opened-modal-result">Результат:</label>' +
            '<span style="float:right;">[<a id="opened-modal-selectall" href="#">Выделить всё</a>]</span>' +
            '<hr />' +
            '<div id="opened-modal-result" style="overflow:scroll;"></div>';
 
        func.modal(config);
    };
 
    func.modal = function(config) {
        require(['wikia.ui.factory'], function (uiFactory) {
            uiFactory.init(['modal']).then(function (uiModal) {
                uiModal.createComponent(config, function (modal) {
                    modal.show();
 
                    $( 'button[data-cipher]' ).click(function(){
                        func.handleMode(config.vars.id);
                    });
                    $( 'button[data-keyint]' ).click(function(){
                        func.handleKeyInt(config.vars.id);
                    });
                    $( 'button[data-keystring]' ).click(function(){
                        func.handleKeyString(config.vars.id);
                    });
                    $( 'button[data-lang]' ).click(function(){
                        func.handleLang(config.vars.id);
                    });
                    $( '#opened-modal-selectall' ).click(function(){
                        func.handleSelectAll();
                    });
 
                    $( '#opened-modal-input' ).on('change input paste', function () {
                        func.handleInput(config.vars.id);
                    });
 
                });
            });
        });
    };
 
    func.handleMode = function(type) {
        if (mode === MODE_ENCRYPT) {
            mode = MODE_DECRYPT;
            $( 'button[data-cipher]' ).html( 'Расшифрование' );
        } else {
            mode = MODE_ENCRYPT;
            $( 'button[data-cipher]' ).html( 'Шифрование' );
        }
 
        $( '#opened-modal-input' ).val( $( '#opened-modal-result' ).text() );
        func.handleInput(type);
    };
 
    func.handleKeyInt = function(type) {
        var promted = prompt('Введите ключ — число от 0 до 32 (26 для английского алфавита), на которое будет сдвинут алфавит. В Гравити Фолз использовался ключ 3.', keyInt);
        if (promted >= 0 && promted <= 32) {
            keyInt = parseInt(promted);
        } else {
            alert('Недопустимое значение. Оставлен предыдущий ключ.');
        }
        func.handleInput(type);
    };

    func.handleKeyString = function(type) {
        var promted = prompt('Введите ключ — текст без пробелов и знаков препинания, по которому будет произведён сдвиг алфавита. Без ключа шифр не расшифровать! Один из ключей Гравити Фолз — ШИФР (CIPHER).', keyString);
        if (!/\s/g.test(promted)) {
            keyString = promted.toUpperCase();
        } else {
            alert('Недопустимое значение. Оставлен предыдущий ключ.');
        }
        func.handleInput(type);
    };
 
    func.handleLang = function(type) {
        var promted = prompt('Введите код языка, который будет использоваться в криптограмме. Поддерживаемые языки: en и ru.', lang);
        if (promted === 'en' || promted === 'ru') {
            lang = promted;
        } else {
            alert('Недопустимое значение. Оставлен предыдущий язык.');
        }
        func.handleInput(type);
    };
 
    func.handleSelectAll = function() {
        window.getSelection().selectAllChildren( document.getElementById( 'opened-modal-result' ) );
    };
 
    func.handleInput = function(type) {
        var val = $( '#opened-modal-input' ).val();
        var res = '';
 
        switch (type) {
            case 'opened-modal-atbash':
                res = func.atbash( val );
                break;
            case 'opened-modal-a1z26':
                res = func.a1z26( val, mode, lang );
                break;
            case 'opened-modal-caeser':
                res = func.caeser( val, mode, keyInt );
                break;
            case 'opened-modal-vigenere':
                res = func.vigenere( val, mode, keyString );
                break;
        }
        res = res.replace( /\r\n|\r|\n/g, '<br />' );
        res = res.toUpperCase();
 
        $( '#opened-modal-result' ).html( res );
    };
 
    func.atbash = function(text) {
        var source = text.toLowerCase();
        var result = '';
        var offset = 0;
 
        for (i = 0; i < source.length; i++) {
            if ( abcRU.indexOf(source[i]) !== -1 ) {
                offset = 32 - abcRU.indexOf(source[i]);
                result += abcRU[offset];
            } else if ( abcEN.indexOf(source[i]) !== -1 ) {
                offset = 25 - abcEN.indexOf(source[i]);
                result += abcEN[offset];
            } else {
                result += source[i];
            }
        }
 
        return result;
    };
 
    func.caeser = function(text, mode, key) {
        var source = text.toLowerCase();
        var result = '';
        var offset = 0;
 
        if (mode === MODE_ENCRYPT) {
            for (i = 0; i < source.length; i++) {
                if ( abcRU.indexOf(source[i]) !== -1 ) {
                    offset = abcRU.indexOf(source[i]) + key;
                    offset = (offset > 32 ? offset - 33 : offset);

                    result += abcRU[offset];
                } else if ( abcEN.indexOf(source[i]) !== -1 ) {
                    offset = abcEN.indexOf(source[i]) + key;
                    offset = (offset > 25 ? offset - 26 : offset);

                    result += abcEN[offset];
                } else {
                    result += source[i];
                }
            }
        }
        if (mode === MODE_DECRYPT) {
            for (i = 0; i < source.length; i++) {
                if ( abcRU.indexOf(source[i]) !== -1 ) {
                    offset = abcRU.indexOf(source[i]) - key;
                    offset = (offset < 0 ? offset + 33 : offset);

                    result += abcRU[offset];
                } else if ( abcEN.indexOf(source[i]) !== -1 ) {
                    offset = abcEN.indexOf(source[i]) - key;
                    offset = (offset < 0 ? offset + 26 : offset);

                    result += abcEN[offset];
                } else {
                    result += source[i];
                }
            }
        }
 
        return result;
    };
 
    func.a1z26 = function(text, mode, lang) {
        var source = text.toLowerCase();
        var result = '';
        var index = 0;
        var abc = lang === 'en' ? abcEN : abcRU;
 
        if (mode === MODE_ENCRYPT) {
            for (i = 0; i < source.length; i++) {
                if ( abc.indexOf(source[i]) !== -1 ) {
                    index = abc.indexOf(source[i]) + 1;
                    result += index;
                    if (i + 1 < source.length && abc.indexOf(source[i+1]) !== -1)
                        result += '-';
                } else {
                    result += source[i];
                }
            }
        }
        if (mode === MODE_DECRYPT) {
            var i = 0;
            while (i < source.length) {
                if (source[i] >= '0' && source[i] <= '9') {
                    if (source[i+1] >= '0' && source[i+1] <= '9') {
                        index = parseInt(source[i] + source[i+1]);
                        if (index <= abc.length && index !== 0){
                            result += abc[index-1];
                        }
                        i += 2;
                        if (source[i] == '-')
                            i++;
                    } else {
                        index = parseInt(source[i]);
                        if (index !== 0){
                            result += abc[index-1];
                        }
                        i++;
                        if (source[i] == '-')
                            i++;
                    }
                } else {
                   result += source[i]; 
                   i++;
                }
            }
        }
        return result;
    };

    func.vigenere = function(text, mode, key) {
        var source = text.toLowerCase();
        var key = key.toLowerCase();
        var result = '';
        var j = 0;
        var offset = 0;
    
        if (mode === MODE_ENCRYPT) {
            for (i = 0; i < source.length; i++) {
                if ( abcRU.indexOf(source[i]) !== -1 ) {
                    offset = abcRU.indexOf(source[i]) + abcRU.indexOf(key[j]);
                    offset = (offset > 32 ? offset - 33 : offset);
                    j = (j > key.length - 2 ? 0 : j + 1);

                    result += abcRU[offset];
                } else if ( abcEN.indexOf(source[i]) !== -1 ) {
                    offset = abcEN.indexOf(source[i]) + abcEN.indexOf(key[j]);
                    offset = (offset > 26 ? offset - 26 : offset);
                    j = (j > key.length - 2 ? 0 : j + 1);

                    result += abcEN[offset];
                } else {
                    result += source[i];
                }
            }
        }
        if (mode === MODE_DECRYPT) {
            for (i = 0; i < source.length; i++) {
                if ( abcRU.indexOf(source[i]) !== -1 ) {
                    offset = abcRU.indexOf(source[i]) - abcRU.indexOf(key[j]);
                    offset = (offset < 0 ? offset + 33 : offset);
                    j = (j > key.length - 2 ? 0 : j + 1);

                    result += abcRU[offset];
                } else if ( abcEN.indexOf(source[i]) !== -1 ) {
                    offset = abcEN.indexOf(source[i]) - abcEN.indexOf(key[j]);
                    offset = (offset < 0 ? offset + 26 : offset);
                    j = (j > key.length - 2 ? 0 : j + 1);
                    
                    result += abcEN[offset];
                } else {
                    result += source[i];
                }
            }
        }
    
        return result;
    };
 
    mw.hook( 'wikipage.content' ).add(function() {
        if ( /Список_криптограмм/.test( mw.config.get('wgPageName') ) ) {
            $(func.init);
        }
    });
}( jQuery, mediaWiki );