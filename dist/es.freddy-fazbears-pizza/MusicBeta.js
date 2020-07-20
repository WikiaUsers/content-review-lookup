/**
 * Name:        ChatMusic
 * Version:     v1.0
 * Author:      KockaAdmiralac <1405223@gmail.com>
 * Description: Allows playing music in chat between multiple users
 *              Functions like a music channel, where anybody can
 *              play music other people can hear
 */
/* globals $: true, mw: true, models: true, mainRoom: true */
/* jshint multistr: true */
/* modified by Unai01 - Adding i18n and styling*/
(function() {
    var config = mw.config.get([
        'wgCanonicalSpecialPageName',
        'wgUserName'
    ]);
    if(config.wgCanonicalSpecialPageName !== 'Chat') {
        return;
    }

	var i18n = {
		en: {
      chat: "Chat music",
      placeholder: "Enter music URL",
      join: 'Join',
      leave: 'Leave',
      invalid: 'Audio source invalid!'
		},
		es: {
      chat: "Música del chat",
      placeholder: "Introducir URL", // too long
      join: 'Unirse',
      leave: 'Salir',
      invalid: '¡Origen inválido de la música!'
		}
	};
	i18n = i18n[mw.config.get("wgContentLanguage")] || i18n.en; //set i18n according to wiki language
    var Music = {
        init: function() {
            this.initUI();
            this.initListener();
        },
        initUI: function() {
            mw.util.addCSS('        \
                #ChatMusicInput {   \
                  width: 140px; \
                  border: 0;\
                  border-bottom: 3px solid #00b7e0;\
                  padding: 5px; \
                }                   \
                span#ChatMusicText { \
                  background: #00b7e0;\
                  font-variant: small-caps; \
                  width: 100%;\
                  display: block;\
                  color: white;\
                  font-size: 14px;\
                  text-align: center;\
                  padding: 6px;\
                }\
                .wds-button.wds-is-squished { \
                  padding: 10px 23px 9px; \
                }  \
            ');
            $('#Rail').prepend(
                $('<div>')
                    .attr('id', 'ChatMusic')
                    .append(
                        $('<span>')
                            .attr('id', 'ChatMusicText')
                            .text(i18n.chat)
                    )
                    .append(
                        $('<input>')
                            .attr({
                                type: 'text',
                                id: 'ChatMusicInput',
                                placeholder: i18n.placeholder
                            })
                    )
                    .append(
                        $('<span>')
                            .attr({
                                class: 'wds-button wds-is-squished wds-is-secondary',
                                id: 'ChatMusicPlayButton'
                            })
                            .text('▶️️')
                    )
                    .append(
                        $('<span>')
                            .attr({
                                class: 'wds-button wds-is-squished wds-is-secondary',
                                id: 'ChatMusicJoinButton',
                            })
                            .text(i18n.join)
                    )
            );
            $('#ChatMusicInput').keydown($.proxy(this.keydown, this));
            $('#ChatMusicJoinButton').click($.proxy(this.joinClick, this));
            $('#ChatMusicPlayButton').click($.proxy(this.playClick, this));
        },
        keydown: function(e) {
            if(e.keyCode === 13) {
                var value = $(e.target).val();
                if(value) {
                    this.play(value, true);
                } else if(this.audio) {
                    this.pause();
                }
            }
        },
        joinClick: function() {
            this.listening = !this.listening;
            $('#ChatMusicJoinButton').text(this.listening ? i18n.leave : i18n.join);
            if(!this.listening) {
                this.pause();
            }
        },
        playClick: function() {
            if(this.audio && !this.audio.paused) {
                this.pause();
            } else {
                this.play($('#ChatMusicInput').val(), true);
            }
        },
        play: function(url, local) {
            if(this.audio) {
                this.audio.pause();
            }
            $('#ChatMusicPlayButton').text('⏹️');
            this.audio = new Audio(url);
            if(typeof Promise !== 'undefined') {
                this.audio.play().catch($.proxy(function(e) {
                    if(local) {
                        alert(i18n.invalid);
                    }
                    this.pause();
                }, this));
            } else {
                this.audio.play();
            }
            if(local && this.listening && typeof mainRoom !== 'undefined') {
                mainRoom.socket.send(new models.SetStatusCommand({
                    statusState: 'music',
                    statusMessage: url
                }).xport());
            }
        },
        pause: function() {
            if(this.audio) {
                this.audio.pause();
            }
            $('#ChatMusicPlayButton').text(i18n.play);
        },
        initListener: function() {
            if(typeof mainRoom !== 'undefined') {
                mainRoom.socket.bind('updateUser', $.proxy(function(d) {
                    var data = JSON.parse(d.data).attrs;
                    if(this.listening && data.name !== config.wgUserName && data.statusState === 'music') {
                        this.play(data.statusMessage);
                    }
                }, this));
            }
        }
    };
    $($.proxy(Music.init, Music));
})();