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
(function() {
    var config = mw.config.get([
        'wgCanonicalSpecialPageName',
        'wgUserName'
    ]);
    if(config.wgCanonicalSpecialPageName !== 'Chat') {
        return;
    }
    var Music = {
        init: function() {
            this.initUI();
            this.initListener();
        },
        initUI: function() {
            mw.util.addCSS('        \
                #ChatMusicInput {   \
                    width: 140px;   \
                }                   \
            ');
            $('#Rail').prepend(
                $('<div>')
                    .attr('id', 'ChatMusic')
                    .append(
                        $('<span>')
                            .attr('id', 'ChatMusicText')
                            .text('Chat music')
                    )
                    .append(
                        $('<input>')
                            .attr({
                                type: 'text',
                                id: 'ChatMusicInput',
                                placeholder: 'Enter music URL...'
                            })
                    )
                    .append(
                        $('<span>')
                            .attr({
                                class: 'button',
                                id: 'ChatMusicPlayButton'
                            })
                            .text('Play')
                    )
                    .append(
                        $('<span>')
                            .attr({
                                class: 'button',
                                id: 'ChatMusicJoinButton'
                            })
                            .text('Join')
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
            $('#ChatMusicJoinButton').text(this.listening ? 'Leave' : 'Join');
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
            $('#ChatMusicPlayButton').text('Stop');
            this.audio = new Audio(url);
            if(typeof Promise !== 'undefined') {
                this.audio.play().catch($.proxy(function(e) {
                    if(local) {
                        alert('Audio source invalid!');
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
            $('#ChatMusicPlayButton').text('Play');
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