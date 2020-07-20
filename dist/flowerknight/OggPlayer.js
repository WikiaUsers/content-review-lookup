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
            $('head').prepend('<style type="text/css">.audio-button { display: inline-block; vertical-align: text-top; width: 1em; height: 1em; overflow: hidden; border-radius: 3px; background-color: #006cb0; transition: background-color .2s; cursor: pointer; background-repeat: no-repeat; background-position: center; background-image: url(\'data:image/svg+xml;utf8,<svg xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns="http://www.w3.org/2000/svg" xml:space="preserve" viewBox="0 0 18 18" version="1.1" y="0px" x="0px" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/"><metadata><rdf:RDF><cc:Work rdf:about=""><dc:format>image/svg+xml</dc:format><dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage"/><dc:title/></cc:Work></rdf:RDF></metadata><path style="color-rendering:auto;text-decoration-color:#000000;color:#000000;isolation:auto;mix-blend-mode:normal;shape-rendering:auto;solid-color:#000000;block-progression:tb;text-decoration-line:none;text-decoration-style:solid;image-rendering:auto;white-space:normal;text-indent:0;text-transform:none" d="m4.4824 4c-0.2692 0.0095-0.4825 0.2306-0.4824 0.5v9c0.0003726 0.37101 0.39044 0.61243 0.72266 0.44727l9.0003-4.4997c0.36858-0.18428 0.36858-0.71026 0-0.89453l-9-4.5c-0.0748-0.0374-0.1574-0.0555-0.2406-0.0528z" fill-rule="evenodd" fill="#fff"/></svg>\'); } .audio-button-parent { cursor: pointer; } .audio-button.now-playing, .audio-button:hover, .audio-button-parent:hover > .click-parent { background-color: #b30000; } .audio-button.now-playing { background-image: url(\'data:image/svg+xml;utf8,<svg xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns="http://www.w3.org/2000/svg" xml:space="preserve" viewBox="0 0 18 18" version="1.1" y="0px" x="0px" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/"><metadata><rdf:RDF><cc:Work rdf:about=""><dc:format>image/svg+xml</dc:format><dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage"/><dc:title/></cc:Work></rdf:RDF></metadata><path style="color-rendering:auto;text-decoration-color:#000000;color:#000000;isolation:auto;mix-blend-mode:normal;shape-rendering:auto;solid-color:#000000;block-progression:tb;text-decoration-line:none;text-decoration-style:solid;image-rendering:auto;white-space:normal;text-indent:0;text-transform:none" d="m4.5 4c-0.2761 0-0.5 0.2239-0.5 0.5v9c0.0000276 0.27613 0.22387 0.49997 0.5 0.5h9c0.27613-0.000028 0.49997-0.22387 0.5-0.5v-9c0-0.2761-0.224-0.5-0.5-0.5z" fill-rule="evenodd" fill="#fff"/></svg>\'); } .audio-button.no-audio { cursor: help; background-color: #b30000; background-image: url(\'data:image/svg+xml;utf8,<svg xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns="http://www.w3.org/2000/svg" xml:space="preserve" viewBox="0 0 18 18" version="1.1" y="0px" x="0px" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/"><path style="color-rendering:auto;text-decoration-color:#000000;color:#000000;isolation:auto;mix-blend-mode:normal;shape-rendering:auto;solid-color:#000000;block-progression:tb;text-decoration-line:none;text-decoration-style:solid;image-rendering:auto;white-space:normal;text-indent:0;text-transform:none" d="m4.5 4c-0.2761 0-0.5 0.2239-0.5 0.5v1.5c0.0000255 0.1326 0.052716 0.25976 0.14648 0.35352l2.6465 2.6465-2.6465 2.646c-0.0938 0.094-0.1465 0.221-0.1465 0.354v1.5c0.0000276 0.27613 0.22387 0.49997 0.5 0.5h1.5c0.1326-0.000025 0.25976-0.05272 0.35352-0.14648l2.6465-2.647 2.646 2.647c0.094 0.093 0.221 0.146 0.354 0.146h1.5c0.27613-0.000028 0.49997-0.22387 0.5-0.5v-1.5c-0.000025-0.1326-0.05272-0.25976-0.14648-0.35352l-2.647-2.646 2.647-2.6465c0.093-0.0937 0.146-0.2209 0.146-0.3535v-1.5c0-0.2761-0.224-0.5-0.5-0.5h-1.5c-0.1326 0.0000254-0.25976 0.052716-0.35352 0.14648l-2.646 2.6465-2.6465-2.6465c-0.0937-0.0938-0.2209-0.1465-0.3535-0.1465z" fill-rule="evenodd" fill="#fff"/></svg>\'); } .ogg-player audio, .ogg-player video { display: inline-block; } .ogg-player .info-icon { display: none; position: absolute; z-index: 2; background-color: transparent; background-image: url(https://images.wikia.nocookie.net/__cb1453503614/common/skins/shared/images/sprite.png); background-repeat: no-repeat; background-position: -1228px 0; height: 18px; width: 18px; } .ogg-audio-player .info-icon { background-color: rgba(0, 0, 0, .5); margin: -5px 0 0 -5px; border-radius: 100%; } .ogg-video-player .info-icon { margin: 2px 0 0 -20px; } .ogg-player:hover .info-icon { display: inline-block; }</style>');
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