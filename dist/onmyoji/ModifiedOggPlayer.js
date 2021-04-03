//---------------------------------------
// Modified dev:OggPlayer.js so that
// it's easier to upload missing audios
//---------------------------------------
(function() {
    function init(i18n) {
        var oggPlayer = {
            support: "",
            allButtons: $([]),
            init: function() {
                if(typeof oggPlayerButtonOnly == 'undefined') oggPlayerButtonOnly = false;
                oggPlayer.support = document.createElement('audio').canPlayType('audio/ogg');
                oggPlayer.addCSS();
                if(!oggPlayerButtonOnly) $('.ogg_player').each(function() { oggPlayer.prepPlayer($(this)); });
                $('.audio-button').each(function() { oggPlayer.prepButton($(this)); });
                mw.hook('wikipage.content').add(function(elem) {
                    if(!oggPlayerButtonOnly) $(elem).find('.ogg_player').each(function() { oggPlayer.prepPlayer($(this)); });
                    $(elem).find('.audio-button').each(function() { oggPlayer.prepButton($(this)); });
                });
            },
            addCSS: function() {
                $(importArticle({
                    type: 'style',
                    article: 'u:dev:MediaWiki:OggPlayer.css'
                }));
				console.log('css imported');
            },
            prepPlayer: function(player) {
                if(player.data('url')) return;
                var button = player.find('button[onclick]');
                if(button.length) {
                    var onclick = button[0].onclick.toString();
                    var match, url, width, height, isVideo;
                    if(match = onclick.match(/"videoUrl":"((?:\\.|[^"\\])+)"/)) url = match[1].replace('\\x26', '&');
                    if(match = onclick.match(/"width":([0-9]+)/)) width = match[1];
                    if(match = onclick.match(/"height":([0-9]+)/)) height = match[1];
                    if(match = onclick.match(/"isVideo":(true|false)/)) isVideo = match[1] == 'true';
                    if(isVideo) {
                        oggPlayer.video(player, url, width, height);
                    } else {
                        oggPlayer.audio(player, url, width);
                    }
                } else {
                    var p = player.find('> div > audio, > div > video');
                    player
                        .data('url', p.attr('src'))
                        .empty()
                        .append(p);
                }
                player.removeClass('ogg_player').addClass('ogg-player').removeAttr('id');
            },
            prepButton: function(button) {
                if(button.prop('tagName') == 'A' || button.hasClass('no-audio')) return;
                var src = button.data('src'),
                    sources = button.find('audio, video, button[onclick], img, a.internal');
                if(oggPlayer.support === "") {
                    button.attr('title', i18n.msg('no-support').plain()).addClass('no-audio');
                    return;
                }
                if(typeof src == 'undefined' || !oggPlayer.isValid(src)) {
                    sources.each(function(i, v) {
                        v = $(v);
                        if(v.prop('tagName') == 'A') {
                            src = v.attr('href');
                        } else if(v.prop('tagName') == 'BUTTON') {
                            var match, onclick = v[0].onclick.toString();
                            if(match = onclick.match(/"videoUrl":"((?:\\.|[^"\\])+)"/)) src = match[1];
                        } else {
                            src = v.attr('src');
                        }
                        if(oggPlayer.isValid(src)) return false;
                        src = false;
                    });
                    if(!src) {
                        button.addClass('no-audio').attr('title', i18n.msg('no-audio').plain());
                        return;
                    }
                }
                var link = $('<a />', {
                    'class': button.attr('class'),
                    'style': button.attr('style'),
                    'data-src': button.data('src'),
                    'title': i18n.msg('play').plain(),
                    'href': src,
                });
                link.click(function(e) {
                    e.preventDefault();
                    var audio = $(this).find('audio');
                    if(audio.prop('paused')) {
                        oggPlayer.stopAllButtons();
                        audio.trigger('play');
                    } else {
                        audio.trigger('pause');
                    }
                    return false;
                });
                button.replaceWith(link);
                if(link.hasClass('click-parent')) {
                    if(!link.parent().hasClass('audio-button-parent')) {
                        link.parent().addClass('audio-button-parent').click(function(e) {
                            $(this).find('.click-parent').click();
                        });
                    } else {
                        link.removeClass('click-parent');
                    }
                }
                var audio = $('<audio />', {
                    src: src,
                    preload: 'none',
                }).appendTo(link).on('play', function(e) {
                    $(this).parent().addClass('now-playing');
                }).on('pause', function(e) {
                    $(this).parent().removeClass('now-playing');
                    this.currentTime = 0;
                }).on('ended', function(e) {
                    $(this).trigger('pause');
                }).on('error', function(e) {
                    $(this).parent().addClass('no-audio').removeClass('now-playing').attr('title', 'err' + i18n.msg('no-audio').plain());
                });
                oggPlayer.allButtons = oggPlayer.allButtons.add(audio);
            },
            stopAllButtons: function() {
                oggPlayer.allButtons.trigger('pause');
            },
            isValid: function(url) {
                if(url === undefined) return false;
                url = url.replace(/\?.*$/, "");
                if(url.search(/(?:https?:)?(?:\/\/)(?:images|img|static|vignette)\d*\.wikia\.(?:nocookie\.)?(?:net|com)/) < 0 && url.search(/(?:https?:)?(?:\/\/)upload\.wikimedia\.org/) < 0) return false; // Wikia and Wikimedia only
                //URL of media files has changed from 'vignette' to 'static', reflecting change below
				//url = url.replace(/(vignette.*?)(\/revision.*$)/, '$1');
                url = url.replace(/(static.*?)(\/revision.*$)/, '$1');
                if(url.search(/\.(ogg|oga|ogv)$/) < 0) return false;
                return true;
            },
            video: function(player, url, width, height) {
                if(!url) return;
                var a = player.find('a.image');
                player.addClass('ogg-video-player')
                    .data('url', url)
                    .empty()
                    .append(
                        $('<video />', {
                            controls : 'controls',
                            width: width,
                            height: height,
                            src: url,
                            preload: 'metadata'
                        })
                        .click(function(){
                            this.paused ? this.play() : this.pause();
                        })
                        .dblclick(function(){
                            if(document.fullscreenEnabled || document.webkitFullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled) {
                                if(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement) {
                                    if(document.exitFullscreen) {
                                        document.exitFullscreen();
                                    } else if(document.webkitExitFullscreen) {
                                        document.webkitExitFullscreen();
                                    } else if(document.mozCancelFullScreen) {
                                        document.mozCancelFullScreen();
                                    } else if(document.msExitFullscreen) {
                                        document.msExitFullscreen();
                                    }
                                } else {
                                    if(this.requestFullscreen) {
                                        this.requestFullscreen();
                                    } else if(this.webkitRequestFullscreen) {
                                        this.webkitRequestFullscreen();
                                    } else if(this.mozRequestFullScreen) {
                                        this.mozRequestFullScreen();
                                    } else if(this.msRequestFullscreen) {
                                        this.msRequestFullscreen();
                                    }
                                }
                            }
                        })
                    )
                    .append($('<a></a>').addClass('info-icon').attr({
                        href: a.attr('href'),
                        title: a.attr('title')
                    }));
            },
            audio: function(player, url, width) {
                if(!url) return;
                var a = player.find('a.image');
                player.addClass('ogg-audio-player')
                    .data('url', url)
                    .empty()
                    .append($('<audio />', {
                        controls : 'controls',
                        src: url,
                        preload: 'metadata'
                    }).css('width', width))
                    .append($('<a></a>').addClass('info-icon').attr({
                        href: a.attr('href'),
                        title: a.attr('title')
                    }));
            }
        };
        $(oggPlayer.init);
    }
    mw.hook('dev.i18n').add(function(i18n) {
    i18n.loadMessages('OggPlayer').then(init);
    });
    importArticle({
        type: 'script',
        article: 'u:dev:MediaWiki:I18n-js/code.js'
    });
})();