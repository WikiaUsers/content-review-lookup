/**
 * Name:        EmoticonsWindow
 * Version:     v1.5
 * Author:      KockaAdmiralac <1405223@gmail.com>
 * Description: Shows a window with all emoticons available
 */
$(function() {
    if(mw.config.get('wgCanonicalSpecialPageName') !== 'Chat') {
        return;
    }
    /**
     * Main object
     */
    var EmoticonsWindow = {
        // Plugin configuration
        config: $.extend({
            // If button should be integrated with ChatOptions
            // Defaults to Steven Universe Wiki only.
            chatOptionsIntegration: (mw.config.get('wgCityId') === '621556')
        }, window.EmoticonsWindowConfig),
        // List of emoticons
        emoticons: {},
        // Cached list element
        emoticonsList: $(mw.html.element('div', { id: 'EmoticonsWindowList' })),
        /**
         * Preloads i18n data
         */
        preload: function() {
            $.get(mw.util.wikiScript('load'), {
                mode: 'articles',
                articles: 'u:kocka:MediaWiki:Custom-plugin-i18n/EmoticonsWindow.json',
                only: 'styles'
            }, $.proxy(function(d) {
                var i18n = JSON.parse(d.replace(/\/\*.*\*\//g, '')),
                    lang = mw.config.get('wgUserLanguage');
                this.i18n = $.extend(i18n.en, i18n[lang.split('-')], i18n[lang], window.EmoticonsWindowVocab);
                this.init();
            }, this));
        },
        /**
         * Initialize and parse emoticons
         */
        init: function() {
            this.parseEmoticons();
            this.insertUI();
        },
        /**
         * Parse emoticons
         * EmoticonMapping is used because that's a way Wikia parses
         * emoticons in the default system.
         */
        parseEmoticons: function() {
            var mapping = new EmoticonMapping();
            mapping.loadFromWikiText(mw.config.get('wgChatEmoticons'));
            Object.keys(mapping._settings).forEach(function(key) {
                this.emoticons[mapping._settings[key][0]] = key;
            }, this);
        },
        /**
         * Initialize UI elements
         */
        insertUI: function() {
            mw.util.addCSS('.EmoticonsWindowIcon{width:19px;height:19px;border:1px solid black;padding:10px;border-radius:5px;background:#5F2C60;}.EmoticonsWindowIcon:hover{background:#823C83;}#EmoticonsWindowList{height:400px;overflow-y:auto;}.EmoticonsWindowButton{margin-left:140px;}' + (this.config.chatOptionsIntegration ? '' : '.EmoticonsWindowButton{position:absolute;top:10px}'));
            this.insertElements();
            this.insertButton();
        },
        /**
         * Create elements to be displayed in the modal
         */
        insertElements: function() {
            this.mainElement = $('<div id="EmoticonsWindowModalMain">' + mw.html.element('span', { class: 'EmoticonsWindowHelp' }, this.i18n.help) + '</div>');
            $.each(this.emoticons, $.proxy(function(k, v) {
                this.emoticonsList.append(mw.html.element('img', {
                    class: 'EmoticonsWindowIcon',
                    src: v,
                    title: k
                }));
            }, this));
            this.mainElement.append(this.emoticonsList);
        },
        /**
         * Insert the Emoticons button
         */
        insertButton: function() {
            var button = $(mw.html.element('a', { class: 'wikia-button EmoticonsWindowButton' }, this.i18n.emoticons));
            button.click($.proxy(function() {
                try {
                    this.showModal();
                } catch(e) {
                    console.log("An error occurred in EmoticonsWindow.showModal:\n\n" + e.stack);
                }
                this.setHandlers();
            }, this));
            if(this.config.chatOptionsIntegration) {
                var chatOptionsIntegrationInterval = setInterval(function() {
                    if($('#chatOptionsButton').length > 0) {
                        $('#chatOptionsButton').after(button);
                        $('.EmoticonsWindowButton').wrap(mw.html.element('div', { class: 'chat-button' }));
                        clearInterval(chatOptionsIntegrationInterval);
                    }
                }, 250);
            } else {
                $('.public.wordmark').second().append(button);
            }
        },
        /**
         * Show the emoticons window
         */
        showModal: function() {
            $.showCustomModal(this.i18n.emoticons, this.mainElement.prop('outerHTML'), {
                id: 'EmoticonsWindowModal',
                buttons: [{
                    id: 'EmoticonsWindowClose',
                    defaultButton: true,
                    message: this.i18n.close,
                    handler: function() {
                        try {
                            $('#EmoticonsWindowModal').closeModal();
                        } catch(e) {
                            console.log("An error occurred in $().closeModal:\n\n" + e.stack);
                        }
                    }
                }]
            });
        },
        /**
         * Set the handlers for clicking on the emoticon in the list
         */
        setHandlers: function() {
            $('.EmoticonsWindowIcon').click(function(e) {
                var ap = $('.message textarea').last();
                ap.val(ap.attr('value') + ' ' + e.target.title);
                try {
                    $('#EmoticonsWindowModal').closeModal();
                } catch(e) {
                    console.log("An error occurred in $().closeModal:\n\n" + e.stack);
                }
            });
        }
    };
    $($.proxy(EmoticonsWindow.preload, EmoticonsWindow));
});