(function() {
    var oggPlayer = {
        support: '',
        messages: {
            'en': {
                'play': 'Play',
                'no-audio': 'Invalid or missing audio file',
                'no-support': 'Your browser doesn\'t support Ogg format',
            },
            'qqx': {
                'play': '(play)',
                'no-audio': '(no-audio)',
                'no-support': '(no-support)',
            },
            'de': {
                'play': 'Abspielen',
                'no-audio': 'Ungültige oder fehlende Audiodatei',
                'no-support': 'Dein Browser unterstützt kein Ogg-Format',
            },
            'es': {
                'play': 'Reproducir',
                'no-audio': 'Archivo de audio inválido o faltante',
                'no-support': 'Tu navegador no soporta el formato Ogg',
            },
            'fr': {
                'play': 'Lecture',
                'no-audio': 'Fichier audio introuvable ou invalide',
                'no-support': 'Votre navigateur ne supporte pas le format Ogg',
            },
            'nl': {
                'play': 'Afspelen',
                'no-audio': 'Audiobestand ontbreekt of is ongeldig',
                'no-support': 'Deze browser ondersteunt de Ogg-indeling niet',
            },
            'pl': {
                'play': 'Odtwórz',
                'no-audio': 'Niepoprawny lub brakujący plik audio',
                'no-support': 'Twoja przeglądarka nie ma wsparcia dla formatu Ogg',
            },
        },
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
            $('head').prepend('<style type="text/css">.audio-button { display: inline-block; vertical-align: text-top; width: 1em; height: 1em; overflow: hidden; border-radius: 3px; background-color: #006cb0; transition: background-color .2s; cursor: pointer; background-repeat: no-repeat; background-position: center; background-image: url(\'data:image/svg+xml;base64,PHN2ZyB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgdmlld0JveD0iMCAwIDE4IDE4IiB2ZXJzaW9uPSIxLjEiIHk9IjBweCIgeD0iMHB4IiB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iPjxtZXRhZGF0YT48cmRmOlJERj48Y2M6V29yayByZGY6YWJvdXQ9IiI+PGRjOmZvcm1hdD5pbWFnZS9zdmcreG1sPC9kYzpmb3JtYXQ+PGRjOnR5cGUgcmRmOnJlc291cmNlPSJodHRwOi8vcHVybC5vcmcvZGMvZGNtaXR5cGUvU3RpbGxJbWFnZSIvPjxkYzp0aXRsZS8+PC9jYzpXb3JrPjwvcmRmOlJERj48L21ldGFkYXRhPjxwYXRoIHN0eWxlPSJjb2xvci1yZW5kZXJpbmc6YXV0bzt0ZXh0LWRlY29yYXRpb24tY29sb3I6IzAwMDAwMDtjb2xvcjojMDAwMDAwO2lzb2xhdGlvbjphdXRvO21peC1ibGVuZC1tb2RlOm5vcm1hbDtzaGFwZS1yZW5kZXJpbmc6YXV0bztzb2xpZC1jb2xvcjojMDAwMDAwO2Jsb2NrLXByb2dyZXNzaW9uOnRiO3RleHQtZGVjb3JhdGlvbi1saW5lOm5vbmU7dGV4dC1kZWNvcmF0aW9uLXN0eWxlOnNvbGlkO2ltYWdlLXJlbmRlcmluZzphdXRvO3doaXRlLXNwYWNlOm5vcm1hbDt0ZXh0LWluZGVudDowO3RleHQtdHJhbnNmb3JtOm5vbmUiIGQ9Im00LjQ4MjQgNGMtMC4yNjkyIDAuMDA5NS0wLjQ4MjUgMC4yMzA2LTAuNDgyNCAwLjV2OWMwLjAwMDM3MjYgMC4zNzEwMSAwLjM5MDQ0IDAuNjEyNDMgMC43MjI2NiAwLjQ0NzI3bDkuMDAwMy00LjQ5OTdjMC4zNjg1OC0wLjE4NDI4IDAuMzY4NTgtMC43MTAyNiAwLTAuODk0NTNsLTktNC41Yy0wLjA3NDgtMC4wMzc0LTAuMTU3NC0wLjA1NTUtMC4yNDA2LTAuMDUyOHoiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZmlsbD0iI2ZmZiIvPjwvc3ZnPg==\'); } .audio-button-parent { cursor: pointer; } .audio-button.now-playing, .audio-button:hover, .audio-button-parent:hover > .click-parent { background-color: #b30000; } .audio-button.now-playing { background-image: url(\'data:image/svg+xml;base64,PHN2ZyB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgdmlld0JveD0iMCAwIDE4IDE4IiB2ZXJzaW9uPSIxLjEiIHk9IjBweCIgeD0iMHB4IiB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iPjxtZXRhZGF0YT48cmRmOlJERj48Y2M6V29yayByZGY6YWJvdXQ9IiI+PGRjOmZvcm1hdD5pbWFnZS9zdmcreG1sPC9kYzpmb3JtYXQ+PGRjOnR5cGUgcmRmOnJlc291cmNlPSJodHRwOi8vcHVybC5vcmcvZGMvZGNtaXR5cGUvU3RpbGxJbWFnZSIvPjxkYzp0aXRsZS8+PC9jYzpXb3JrPjwvcmRmOlJERj48L21ldGFkYXRhPjxwYXRoIHN0eWxlPSJjb2xvci1yZW5kZXJpbmc6YXV0bzt0ZXh0LWRlY29yYXRpb24tY29sb3I6IzAwMDAwMDtjb2xvcjojMDAwMDAwO2lzb2xhdGlvbjphdXRvO21peC1ibGVuZC1tb2RlOm5vcm1hbDtzaGFwZS1yZW5kZXJpbmc6YXV0bztzb2xpZC1jb2xvcjojMDAwMDAwO2Jsb2NrLXByb2dyZXNzaW9uOnRiO3RleHQtZGVjb3JhdGlvbi1saW5lOm5vbmU7dGV4dC1kZWNvcmF0aW9uLXN0eWxlOnNvbGlkO2ltYWdlLXJlbmRlcmluZzphdXRvO3doaXRlLXNwYWNlOm5vcm1hbDt0ZXh0LWluZGVudDowO3RleHQtdHJhbnNmb3JtOm5vbmUiIGQ9Im00LjUgNGMtMC4yNzYxIDAtMC41IDAuMjIzOS0wLjUgMC41djljMC4wMDAwMjc2IDAuMjc2MTMgMC4yMjM4NyAwLjQ5OTk3IDAuNSAwLjVoOWMwLjI3NjEzLTAuMDAwMDI4IDAuNDk5OTctMC4yMjM4NyAwLjUtMC41di05YzAtMC4yNzYxLTAuMjI0LTAuNS0wLjUtMC41eiIgZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjZmZmIi8+PC9zdmc+\'); } .audio-button.no-audio { cursor: help; background-color: #b30000; background-image: url(\'data:image/svg+xml;base64,PHN2ZyB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgdmlld0JveD0iMCAwIDE4IDE4IiB2ZXJzaW9uPSIxLjEiIHk9IjBweCIgeD0iMHB4IiB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iPjxwYXRoIHN0eWxlPSJjb2xvci1yZW5kZXJpbmc6YXV0bzt0ZXh0LWRlY29yYXRpb24tY29sb3I6IzAwMDAwMDtjb2xvcjojMDAwMDAwO2lzb2xhdGlvbjphdXRvO21peC1ibGVuZC1tb2RlOm5vcm1hbDtzaGFwZS1yZW5kZXJpbmc6YXV0bztzb2xpZC1jb2xvcjojMDAwMDAwO2Jsb2NrLXByb2dyZXNzaW9uOnRiO3RleHQtZGVjb3JhdGlvbi1saW5lOm5vbmU7dGV4dC1kZWNvcmF0aW9uLXN0eWxlOnNvbGlkO2ltYWdlLXJlbmRlcmluZzphdXRvO3doaXRlLXNwYWNlOm5vcm1hbDt0ZXh0LWluZGVudDowO3RleHQtdHJhbnNmb3JtOm5vbmUiIGQ9Im00LjUgNGMtMC4yNzYxIDAtMC41IDAuMjIzOS0wLjUgMC41djEuNWMwLjAwMDAyNTUgMC4xMzI2IDAuMDUyNzE2IDAuMjU5NzYgMC4xNDY0OCAwLjM1MzUybDIuNjQ2NSAyLjY0NjUtMi42NDY1IDIuNjQ2Yy0wLjA5MzggMC4wOTQtMC4xNDY1IDAuMjIxLTAuMTQ2NSAwLjM1NHYxLjVjMC4wMDAwMjc2IDAuMjc2MTMgMC4yMjM4NyAwLjQ5OTk3IDAuNSAwLjVoMS41YzAuMTMyNi0wLjAwMDAyNSAwLjI1OTc2LTAuMDUyNzIgMC4zNTM1Mi0wLjE0NjQ4bDIuNjQ2NS0yLjY0NyAyLjY0NiAyLjY0N2MwLjA5NCAwLjA5MyAwLjIyMSAwLjE0NiAwLjM1NCAwLjE0NmgxLjVjMC4yNzYxMy0wLjAwMDAyOCAwLjQ5OTk3LTAuMjIzODcgMC41LTAuNXYtMS41Yy0wLjAwMDAyNS0wLjEzMjYtMC4wNTI3Mi0wLjI1OTc2LTAuMTQ2NDgtMC4zNTM1MmwtMi42NDctMi42NDYgMi42NDctMi42NDY1YzAuMDkzLTAuMDkzNyAwLjE0Ni0wLjIyMDkgMC4xNDYtMC4zNTM1di0xLjVjMC0wLjI3NjEtMC4yMjQtMC41LTAuNS0wLjVoLTEuNWMtMC4xMzI2IDAuMDAwMDI1NC0wLjI1OTc2IDAuMDUyNzE2LTAuMzUzNTIgMC4xNDY0OGwtMi42NDYgMi42NDY1LTIuNjQ2NS0yLjY0NjVjLTAuMDkzNy0wLjA5MzgtMC4yMjA5LTAuMTQ2NS0wLjM1MzUtMC4xNDY1eiIgZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjZmZmIi8+PC9zdmc+\'); } .ogg-player audio, .ogg-player video { display: inline-block; } .ogg-player .info-icon { display: none; position: absolute; z-index: 2; background-color: transparent; background-image: url(https://images.wikia.nocookie.net/__cb1453503614/common/skins/shared/images/sprite.png); background-repeat: no-repeat; background-position: -1228px 0; height: 18px; width: 18px; } .ogg-audio-player .info-icon { background-color: rgba(0, 0, 0, .5); margin: -5px 0 0 -5px; border-radius: 100%; } .ogg-video-player .info-icon { margin: 2px 0 0 -20px; } .ogg-player:hover .info-icon { display: inline-block; }</style>');
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
            
            if(oggPlayer.support === '') {
                button.attr('title', oggPlayer.msg('no-support')).addClass('no-audio').empty();
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
                    button.addClass('no-audio').empty().attr('title', oggPlayer.msg('no-audio'));
                    return;
                }
            }
            var link = $('<a />', {
                'class': button.attr('class'),
                'style': button.attr('style'),
                'data-src': button.data('src'),
                'title': oggPlayer.msg('play'),
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
                $(this).parent().addClass('no-audio').removeClass('now-playing').empty().attr('title', 'err'+oggPlayer.msg('no-audio'));
            });
            oggPlayer.allButtons = oggPlayer.allButtons.add(audio);
        },
        stopAllButtons: function() {
            oggPlayer.allButtons.trigger('pause');
        },
        isValid: function(url) {
            if(url === undefined) return false;
            url = url.replace(/\?.*$/, '');
            if(url.search(/(?:https?:)?(?:\/\/)(?:images|img|static|vignette)\d*\.wikia\.(?:nocookie\.)?(?:net|com)/) < 0 && url.search(/(?:https?:)?(?:\/\/)upload\.wikimedia\.org/) < 0) return false; // Wikia and Wikimedia only
            url = url.replace(/(vignette.*?)(\/revision.*$)/, '$1');
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
        },
        msg: function(code) {
            var lang = oggPlayer.messages[wgUserLanguage] || oggPlayer.messages[wgContentLanguage] || oggPlayer.messages['en'];
            return lang[code];
        }
    };
    $(oggPlayer.init);
})();
 