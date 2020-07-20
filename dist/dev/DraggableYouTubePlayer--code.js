/* 
 * YouTubePlayer
 * @author A-Salt-Rifle
 * @description Draggable box that lets you play a youtube video on-site. 
 * Updated: 19 Sept, 2017
 */

(function() {
    var version = '1.0',
        config = window.YouTubePlayerSettings || {},
        ytpfvs = config.favorites || [],
        defaultVideo = config.defaultVideo || 'B2zgebe8-PI', //File Select - Super Mario Galaxy
        defaultTheme = config.defaultTheme || 'default',
        helpButton = config.helpButton || 'show',
        autoplay = config.alwaysAutoplay || 'never',
        loop = config.alwaysLoop || 'never',
        i18n;
    // and with site-wide use, comes precaution of double-runs
    if (window.DraggableYoutubePlayer) return;
    window.DraggableYoutubePlayer = true;    
    if (!window.dev || !window.dev.i18n) {
        importArticle({
            type: 'script',
            article: 'u:dev:MediaWiki:I18n-js/code.js'
        });
    }    
    // CSS aka my forte
    importArticle({
        type: 'style', 
        article: 'u:dev:MediaWiki:DraggableYouTubePlayer.css'
    });
    
    function exist(variable) {
        if (variable == "") {
            return false;
        }
        return true;
    }

    // Run it when a video is added.
    function initialize(event) {
        var player, time_update_interval = 0;
        // Update the controls on load.
        updateTimerDisplay();
        updateProgressBar();
        // Clear any old interval.
        clearInterval(time_update_interval);
        // Start interval to update elapsed time display and
        // The elapsed part of the progress bar every second.
        time_update_interval = setInterval(function() {
            updateTimerDisplay();
            updateProgressBar();
            getVideoInfo();
        }, 1000);
        $('#videoInfo, #MBtn, .videoControls, #remove').show();
        $('#music, #playlist, #addmusic, #autoplay').hide();
        $('#favoriteList').animate({
            height: '300px',
            top: '-172px'
        });
        if ($('#autoplaycbox').prop('checked')) {
            event.target.playVideo();
            $('#musicbutton').html('<img src="https://images.wikia.nocookie.net/steven-universe/images/b/bb/Notspritepause.png/revision/latest/scale-to-width-down/13" style="position:relative; top:-2px;" alt="Pause">');
            playing = true;
        }
        if (exist($('#playlist').val())) {
            initializePlaylist();
        } else {
            $('#MBtn').css({
                'width': '100%'
            });
        }
    }
    
    // If the "video" is a playlist
    function initializePlaylist() {
        $('.playlistOnlyBtn').show();
    }

    // Get info and update it
    function getVideoInfo() {
        if (window.player) {
            $('span#title').text(player.getVideoData().title);
            $('span#channel').text(player.getVideoData().author);
            $('#videoThumbnail').css('background', 'url(https://i.ytimg.com/vi/' + player.getVideoData().video_id + '/hqdefault.jpg) center / cover');
        }
        $('#sound').on('click', function() {
            var muteToggle = $(this);
            if (player.isMuted()) {
                player.unMute();
                $('#volume').removeAttr('disabled');
                $('#volumeTD').css('opacity', '1');
            } else {
                player.mute();
                $('#volume').attr('disabled', 'disabled');
                $('#volumeTD').css('opacity', '.5');
            }
        });
        $('#volume').on('input', function() {
            if (!window.player) return;
            player.setVolume(this.value);
        });
    }

    function updateTimerDisplay() {
        // Update current time text display.
        if (window.player) {
            $('span#current-time').text(formatTime(player.getCurrentTime()));
            $('span#duration').text(formatTime(player.getDuration()));
        } else return;
    }

    function formatTime(time) {
        time = Math.round(time);
        var minutes = Math.floor(time / 60),
            seconds = time - minutes * 60;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        return minutes + ":" + seconds;
    }

    function updateProgressBar() {
        if (!window.player) return;
        // Update the value of our progress bar accordingly.
        $('#progress-bar').val((player.getCurrentTime() / player.getDuration()) * 100);
    }
    
    function init() {
        // Main body
        $('<div id="YouTubePlayer" style="display:none; width: 400px; height: fit-content; background: rgba(38, 129, 144, 0.95); color:white; border-radius: 10px 5px 10px 10px; z-index: 5000102; padding: 5px 10px 10px 5px; position:fixed; top:25%; left:10%;">\
            <div id="favorites" class="minimize" style="height: 89.5%; position: absolute; top: 10.5%; right: 0px; width: 10px; border-radius: 0 0 5px 0; z-index: 1;">\
            <div id="arrow" style="width: 0; height: 0; border-top: 5px solid transparent; border-bottom: 5px solid transparent; border-left: 5px solid #c3faff; position: absolute; top: 50%; right: 4px;">\
                <div id="favoriteList">\
                    <ul style="width:100%">\
                    <li id="FVStatement"><span></span></li>\
                    </ul>\
                </div>\
            </div>\
            </div>\
            <div style="width: 100%; height: 20px; padding: 5px 10px 10px 5px; font-size: 18px;">\
                <p>' + i18n.msg('ytPlayer', '<span id="version">' + version + '</span>').parse() + '</p>\
                <div id="closePlayer" style="text-align:center; position:absolute; right: 0; top: 0; width: 10px; background: #ff5e5c; border-radius: 0 5px 0 0; border: 1px solid #d7494a; padding: 0 5px; color: white; clear: both; height: 20px; font-size: 17px;  cursor:pointer;">x</div>\
                <div id="minimizePlayer" style="text-align:center; position:absolute; right: 22px; top: 0px; width: 10px; background: #2dc7d4; border-radius: 0; border: 1px solid #00abb9; padding: 0 5px; color: #c3faff; clear: both; height: 20px; font-size: 17px; cursor:pointer;">-</div>\
                <div id="openHelp" style="text-align:center;position:absolute;right: 44px;top: 0px;width: 10px;background: #2dc7d4;border-radius: 0;border: 1px solid #00abb9;padding: 0 5px;color: #c3faff;clear: both;height: 20px;font-size: 18px;cursor:pointer;">?</div>\
                <div class="skinSwitch" style="position:absolute; right:22px; top:0;">\
                <div id="lightSkin" style="text-align:center;position:absolute;right: 44px;top: -22px;width: 10px;background: #ffffff;border-radius: 3px 3px 0 0;border: 1px solid #cacaca;padding: 0 5px;clear: both;height: 20px;font-size: 17px;cursor:pointer; transition: .5s;" class="otherSkin"></div>\
                <div id="defaultSkin" style="text-align:center;position:absolute;right: 44px;top: 0;width: 10px;background: #c3faff;border-radius: 0 0 0 3px;border: 1px solid #52c5ba;padding: 0 5px;clear: both;height: 20px;font-size: 17px;cursor:pointer; transition: .5s;" class="currentSkin"></div>\
                <div id="darkSkin" style="text-align:center;position:absolute;right: 44px;top: 22px;width: 10px;background: #989898;border-radius: 0 0 3px 3px;border: 1px solid #616161;padding: 0 5px;clear: both;height: 20px;font-size: 17px;cursor:pointer; transition: .5s;" class="otherSkin"></div>\
                </div>\
            </div>\
            <table border="0" style="width:100%">\
                <tbody>\
                    <tr style="display:none;" id="videoInfo" class="minimize">\
                        <td colspan="2">\
                            <div style="text-align: left; height: 60px; margin-bottom:5px">\
                                <div id="videoThumbnail" style="width: 100px; border: 1px solid rgb(195, 250, 255); position: absolute; height: 56px; border-radius: 5px; overflow: hidden;">\
                                </div>\
                                <div>\
                                <span style="font-size:15px; position: absolute; left: 115px;">' + i18n.msg('playingNow').escape() + '<br /></span>\
                                <span style="font-size:15px; position: absolute; left: 115px; top:65px; line-height: 15px;" id="title"></span>\
                                </div>\
                                <br>\
                                <span id="channel"></span>\
                            </div>\
                        </td>\
                    </tr>\
                    <tr class="minimize">\
                        <td width="30%"><input id="music" type="text" placeholder="' + i18n.msg('idLink').escape() + '" style="width: 100%; border: 1px solid #ccc; box-shadow: inset 0 1px 3px #ddd; border-radius: 4px; -webkit-box-sizing: border-box; -moz-box-sizing: border-box; box-sizing: border-box; padding: 0 5px; height: 19px;"></td>\
                        <td rowspan="6"><div id="youtube" style="pointer-events:none;"><div id="video1"><img width="100%" src="https://i.ytimg.com/vi/yE-ssqMY8yw/maxresdefault.jpg"></div></div></td>\
                    </tr>\
                    <tr class="minimize">\
                        <td width="30%"><input id="playlist" type="text" placeholder="' + i18n.msg('playlist').escape() + '" style="width: 100%; border: 1px solid #ccc; box-shadow: inset 0 1px 3px #ddd; border-radius: 4px; -webkit-box-sizing: border-box; -moz-box-sizing: border-box; box-sizing: border-box; padding: 0 5px; height: 19px;"></td>\
                    </tr>\
                    <tr class="minimize">\
                        <td width="30%"><button class="playerButton" id="addmusic" style="width:100%;">' + i18n.msg('add').escape() + '</button></td>\
                    </tr>\
                    <tr class="minimize" id="remove" style="display:none;">\
                        <td width="30%">\
                            <button class="playerButton" id="removemusic" style="width:100%;">' + i18n.msg('remove').escape() + '</button>\
                        </td>\
                    </tr>\
                    <tr class="minimize" id="autoplay">\
                        <td width="30%" style="text-align:center;"><span>' + i18n.msg('autoplay').escape() + '</span><input type="checkbox" id="autoplaycbox"></td>\
                    </tr>\
                    <tr>\
                        <td width="30%">\
                            <table style="width:100%; border-collapse:collapse;">\
                                <tbody>\
                                <tr>\
                                    <td class="playlistOnlyBtn" style="width: 30%; display:none;">\
                                        <button class="playerButton" id="previousPlaylist" style="width: 100%; text-align: center;"><img alt="' + i18n.msg('previous').escape() + '" src="https://cdn.discordapp.com/attachments/291787389893083136/357623263146409995/Skip_backward.png" style="position:relative;top:-2px;height: 13px;left: -2px;"></button>\
                                    </td>\
                                    <td id="MBtn" style="width: 40%; display:none;">\
                                        <button class="playerButton" id="musicbutton" style="width: 100%; text-align: center;"><img alt="' + i18n.msg('play').escape() + '" src="https://images.wikia.nocookie.net/steven-universe/images/f/fb/Notspriteplay.png/revision/latest/scale-to-width-down/13" style="position:relative; top:-2px;"></button>\
                                    </td>\
                                    <td class="playlistOnlyBtn" style="width:30%; display:none;">\
                                        <button class="playerButton" id="nextPlaylist" style="width: 100%;text-align: center;"><img alt="' + i18n.msg('next').escape() + '" src="https://cdn.discordapp.com/attachments/291787389893083136/357620623436021784/Skip_forward.png" style="position:relative;top:-2px;height: 13px;"></button>\
                                    </td>\
                                </tr>\
                                </tbody>\
                            </table>\
                    </tr>\
                    <tr style="display:none;" class="videoControls minimize">\
                        <td width="30%">\
                            <table style="width:100%; border-collapse:collapse;">\
                                <tbody>\
                                <tr>\
                                    <td style="width: 50%;">\
                                        <span>' + i18n.msg('loop').escape() + '</span><input type="checkbox" id="loop">\
                                    </td>\
                                    <td style="width: 50%;">\
                                        <span>' + i18n.msg('sound').escape() + '</span><input type="checkbox" id="sound" checked>\
                                    </td>\
                                </tr>\
                                <tr>\
                                    <td id="volumeTD" colspan="2" style="text-align:center;">\
                                        <span style="position: relative; bottom: -5px;">' + i18n.msg('setVolume').escape() + '</span>\
                                        <input type="range" id="volume" value="100" style="position: relative; left: -2px; width: 100%;">\
                                    </td>\
                                </tr>\
                                </tbody>\
                            </table>\
                         </td>\
                    </tr>\
                    <tr style="display:none;" class="videoControls">\
                        <td colspan="2">\
                        <div style="position: relative;height: 17px;width: 100%;bottom: -5px;overflow: hidden;">\
                            <p style="position: absolute; font-size: 16px;"><span id="current-time">0:00</span> / <span id="duration">0:00</span></p>\
                            <input type="range" id="progress-bar" value="0" style="width: 70%; position: absolute; right: 0; height: 15px; bottom: 0;">\
                        </div>\
                        </td>\
                    </tr>\
                </tbody>\
            </table>\
            <div id="Help" style="display:none; position: absolute; z-index: 1; background-color: rgba(57, 160, 177, 0.84); width: 500px; box-shadow: 0 0 20px 0 rgba(57, 160, 177, 0.84); color:white; top: -10px; height: 300px; overflow: auto; border: 1px solid #c3faff; border-bottom: none; border-radius: 5px; padding: 6px 8px; left: -50px;">\
                <div style="width: 100%; height: fit-content; font-size: 18px; margin-bottom: 10px;">\
                <p>' + i18n.msg('help').escape() + '</p>\
                </div>\
                <div style="font-size:14px; clear:both;">\
                ' + i18n.msg('welcomeMsg').escape() + '\
                <br><br>\
                ' + i18n.msg('linkInstructionMsg').escape() + '\
                <br><br>\
                ' + i18n.msg('playlistMsg').escape() + '\
                <br><br>\
                ' + i18n.msg('autoplayMsg').escape() + '\
                <br><br>\
                ' + i18n.msg('optionsMsg').escape() + '\
                <br><br>\
                ' + i18n.msg('legendStart').escape() + '\
                <br><br>\
                ' + i18n.msg('legendX').escape() + '\
                <br><br>\
                ' + i18n.msg('legendDash').escape() + '\
                <br><br>\
                ' + i18n.msg('legendColor').escape() + '\
                </div>\
                <div id="closeHelp" style="text-align:center; float: right; width: fit-content; background: rgba(57, 160, 177, 0.84); border: 1px solid #c3faff; box-shadow: 0 0 20px rgb(195, 250, 255); display: flex; color: white; clear: both; height: fit-content; cursor:pointer; align-items: center; padding: 6px 8px; border-radius: 5px; transition: .5s;">' + i18n.msg('ok').escape() + '</div>\
        </div>\
        </div>').appendTo($('body'));
    
        // Main body
        var YouTubePlayer = $('#YouTubePlayer');
    
        if ($('.toolbar .tools').length) {
            $('.toolbar .tools').append('<li id="YTPButton" style="cursor:pointer"><a>YouTubePlayer</a></li>');
        } else {
            return; // There is nothing to append to
        }
        $('#YTPButton').click(function() {
            YouTubePlayer.show();
        });
        
        $.getScript("https://www.youtube.com/iframe_api");
    
        // Lets you skip to a point in the video
        $('#progress-bar').on('mouseup touchend', function(e) {
            // Calculate the new time for the video.
            // New time in seconds = total duration in seconds * ( value of range input / 100 )
            var newTime = player.getDuration() * (e.target.value / 100);
            // Skip video to new time.
            player.seekTo(newTime);
        });
    
        // Add Music
        $('#addmusic').click(function() {
            var link = $('#music').val();
            var playlist = $('#playlist').val();
            if (window.player) {
                alert(i18n.msg('alertPlaying').plain());
            } else if (exist(link)) {
                window.player = new YT.Player('video1', {
                    height: '100%',
                    width: '100%',
                    videoId: link.slice(-11),
                    playerVars: {
                        'controls': 0,
                        'list': playlist,
                        'fs': 0,
                        'showinfo': 0,
                        'rel': 0, 
                        'enablejsapi': 1
                    },
                    events: {
                        onReady: initialize,
                        onStateChange: function(e) {
                            if (e.data === YT.PlayerState.ENDED &&
                                $('#loop').prop('checked')) {
                                player.playVideo();
                            }
                        }
                    }
                });
                try {
                    player.playVideo();
                } catch (e) {}
            } else if ((exist(playlist)) && (!exist(link))){
                window.player = new YT.Player('video1', {
                    height: '100%',
                    width: '100%',
                    playerVars: {
                        'controls': 0,
                        'list': playlist,
                        'fs': 0,
                        'showinfo': 0,
                        'rel': 0,
                        'enablejsapi': 1
                    },
                    events: {
                        onReady: initialize,
                        onStateChange: function(e) {
                            if (e.data === YT.PlayerState.ENDED &&
                                $('#loop').prop('checked')) {
                                player.playVideo();
                            }
                        }
                    }
                });
                try {
                    player.playVideo();
                } catch (e) {}
            } else {
                window.player = new YT.Player('video1', {
                    height: '100%',
                    width: '100%',
                    videoId: defaultVideo,
                    playerVars: {
                        'controls': 0,
                        'fs': 0,
                        'showinfo': 0,
                        'rel': 0,
                        'enablejsapi': 1
                    },
                    events: {
                        onReady: initialize,
                        onStateChange: function(e) {
                            if (e.data === YT.PlayerState.ENDED &&
                                $('#loop').prop('checked')) {
                                player.playVideo();
                            }
                        }
                    }
                });
                try {
                    player.playVideo();
                } catch (e) {}
            }
        });
    
        // Remove Music
        $('#removemusic').click(function() {
            window.player.stopVideo();
            window.player = undefined;
            playing = false;
            $('#video1').remove();
            $('<div id="video1"><img width="100%" src="https://i.ytimg.com/vi/yE-ssqMY8yw/maxresdefault.jpg"></div>').appendTo('#youtube');
            $('#musicbutton').html('<img src="https://images.wikia.nocookie.net/steven-universe/images/f/fb/Notspriteplay.png/revision/latest/scale-to-width-down/14" alt="' + i18n.msg('play').escape() + '">');
            $('#MBtn, #videoInfo, .videoControls, .playlistOnlyBtn, #remove').hide();
            $('#music, #playlist').show().val('');
            $('#addmusic, #autoplay').show();
            $('#favoriteList').animate({
                height: '210px',
                top: '-120px'
            });
            $('#MBtn').css({
                width: '40%',
            });
        });
    
        // Buttons!
        var playing = false;
        $('#musicbutton').click(function() {
            if (!window.player) return;
            if (playing) {
                $('#musicbutton').html('<img src="https://images.wikia.nocookie.net/steven-universe/images/f/fb/Notspriteplay.png/revision/latest/scale-to-width-down/13" style="position:relative; top:-2px;" alt="' + i18n.msg('play').escape() + '">');
                player.pauseVideo();
            } else {
                $('#musicbutton').html('<img src="https://images.wikia.nocookie.net/steven-universe/images/b/bb/Notspritepause.png/revision/latest/scale-to-width-down/13" style="position:relative; top:-2px;" alt="' + i18n.msg('pause').escape() + '">');
                try {
                    player.playVideo();
                } catch (e) {}
            }
            playing = !playing;
        });
        
        // Playlist Buttons
        $('#previousPlaylist').click(function() {
            if (!window.player) return;
            player.previousVideo();
        });
        
        $('#nextPlaylist').click(function() {
            if (!window.player) return;
            player.nextVideo();
        });
    
        // Buttons on the top right.
        $('#closePlayer').click(function() {
            YouTubePlayer.hide();
        });
    
        $('#minimizePlayer').toggle(function() {
            $('.minimize, #version').hide();
            YouTubePlayer.animate({
                'bottom': '0',
                'left': '0',
                'width': '200px'
            });
            YouTubePlayer.css({
                'top': 'initial',
            });
            $('#progress-bar').animate({
                'width': '50%'
            });
            $('#openHelp').hide();
            $('.skinSwitch').css({
                'top': 'initial',
                'position': 'inherit'
            });
            $(this).text('+');
        }, function() {
            if (window.player) {
                $('.minimize:not(#autoplay), #version').show();
                YouTubePlayer.animate({
                    'left': '25%',
                    'top': '30%',
                    'width': '400px'
                });
                YouTubePlayer.css({
                    'bottom': 'initial',
                });
                $('#progress-bar').animate({
                    'width': '70%'
                });
                if (helpButton !== 'show') {
                    $('#openHelp').hide();
                    $('.skinSwitch').css({
                        'right': '0',
                        'top': '0',
                        'position': 'absolute'
                    });
                } else {
                    $('#openHelp').show();
                    $('.skinSwitch').css({
                        'right': '22px',
                        'top': '0',
                        'position': 'absolute'
                    });
                }
                $(this).text('-');
            } else {
                $('.minimize:not(#videoInfo, .videoControls, #remove), #version').show();
                YouTubePlayer.animate({
                    'left': '25%',
                    'top': '30%',
                    'width': '400px'
                });
                YouTubePlayer.css({
                    'bottom': 'initial',
                });
                $('#progress-bar').animate({
                    'width': '70%'
                });
                if (helpButton !== 'show') {
                    $('#openHelp').hide();
                    $('.skinSwitch').css({
                        'right': '0',
                        'top': '0',
                        'position': 'absolute'
                    });
                } else {
                    $('#openHelp').show();
                    $('.skinSwitch').css({
                        'right': '22px',
                        'top': '0',
                        'position': 'absolute'
                    });
                }
                $(this).text('-');
            }
        });
        
        // Skin Switch
        $('head').append($('<link>', {
            id: 'YTPTheme',
            rel: 'stylesheet',
            href: '/load.php?mode=articles&only=styles&articles=u:dev:MediaWiki:DraggableYouTubePlayer/defaultTheme.css'
        })); 
        $('.otherSkin').hide();
        YouTubePlayer.on('click', function(e) {
        if ($(e.target).closest('.currentSkin').length) {
            $('.otherSkin').show();
            $('.currentSkin').css({
                'border-radius': '0',
            });
            $('#darkSkin').on('click', function() {
                $(this).addClass('currentSkin').removeClass('otherSkin');
                $('#lightSkin, #defaultSkin').removeClass('currentSkin').addClass('otherSkin');
                $('#YTPTheme').attr('href', '/load.php?mode=articles&only=styles&articles=u:dev:MediaWiki:DraggableYouTubePlayer/darkTheme.css');
                if (($('#defaultSkin').css('top') === '0px') && ($('#lightSkin').css('top') === '-22px')) {
                    $('#lightSkin').css({
                        'border-radius': '3px 3px 0 0',
                        'top': '-22px',
                    });
                    $('#darkSkin').css({
                        'border-radius': '0',
                        'top': '0'
                    });
                    $('#defaultSkin').css({
                        'border-radius': '0 0 3px 3px',
                        'top': '22px'
                    });
                } else if (($('#defaultSkin').css('top') === '-22px') && ($('#lightSkin').css('top') === '0px')) {
                    $('#defaultSkin').css({
                        'border-radius': '3px 3px 0 0',
                        'top': '-22px'
                    });
                    $('#darkSkin').css({
                        'border-radius': '0',
                        'top': '0'
                    });
                    $('#lightSkin').css({
                        'border-radius': '0 0 3px 3px',
                        'top': '22px',
                    });
                } else if (($('#defaultSkin').css('top') === '0px') && ($('#lightSkin').css('top') === '22px')) {
                    $('#defaultSkin').css({
                        'border-radius': '3px 3px 0 0',
                        'top': '-22px'
                    });
                    $('#darkSkin').css({
                        'border-radius': '0',
                        'top': '0'
                    });
                    $('#lightSkin').css({
                        'border-radius': '0 0 3px 3px',
                        'top': '22px',
                    });
                } else if (($('#defaultSkin').css('top') === '22px') && ($('#lightSkin').css('top') === '0px')) {
                    $('#lightSkin').css({
                        'border-radius': '3px 3px 0 0',
                        'top': '-22px',
                    });
                    $('#darkSkin').css({
                        'border-radius': '0',
                        'top': '0'
                    });
                    $('#defaultSkin').css({
                        'border-radius': '0 0 3px 3px',
                        'top': '22px'
                    });
                }
            });
            $('#lightSkin').on('click', function() {
                $(this).addClass('currentSkin').removeClass('otherSkin');
                $('#defaultSkin, #darkSkin').removeClass('currentSkin').addClass('otherSkin');
                $('#YTPTheme').attr('href', '/load.php?mode=articles&only=styles&articles=u:dev:MediaWiki:DraggableYouTubePlayer/lightTheme.css');
                if (($('#defaultSkin').css('top') === '0px') && ($('#darkSkin').css('top') === '22px')) {
                    $('#defaultSkin').css({
                        'border-radius': '3px 3px 0 0',
                        'top': '-22px',
                    });
                    $('#lightSkin').css({
                        'border-radius': '0',
                        'top': '0',
                    });
                    $('#darkSkin').css({
                        'border-radius': '0 0 3px 3px',
                        'top': '22px',
                    });
                } else if (($('#defaultSkin').css('top') === '22px') && ($('#darkSkin').css('top') === '0px')) {
                    $('#darkSkin').css({
                        'border-radius': '3px 3px 0 0',
                        'top': '-22px',
                    });
                    $('#lightSkin').css({
                        'border-radius': '0',
                        'top': '0',
                    });
                    $('#defaultSkin').css({
                        'border-radius': '0 0 3px 3px',
                        'top': '22px',
                    });
                } else if (($('#defaultSkin').css('top') === '0px') && ($('#darkSkin').css('top') === '-22px')) {
                    $('#darkSkin').css({
                        'border-radius': '3px 3px 0 0',
                        'top': '-22px',
                    });
                    $('#lightSkin').css({
                        'border-radius': '0',
                        'top': '0',
                    });
                    $('#defaultSkin').css({
                        'border-radius': '0 0 3px 3px',
                        'top': '22px',
                    });
                } else if (($('#defaultSkin').css('top') === '-22px') && ($('#darkSkin').css('top') === '0px')) {
                    $('#defaultSkin').css({
                        'border-radius': '3px 3px 0 0',
                        'top': '-22px',
                    });
                    $('#lightSkin').css({
                        'border-radius': '0',
                        'top': '0',
                    });
                    $('#darkSkin').css({
                        'border-radius': '0 0 3px 3px',
                        'top': '22px',
                    });
                }
            });
            $('#defaultSkin').on('click', function() {
                $(this).addClass('currentSkin').removeClass('otherSkin');
                $('#lightSkin, #darkSkin').removeClass('currentSkin').addClass('otherSkin');
                $('#YTPTheme').attr('href', '/load.php?mode=articles&only=styles&articles=u:dev:MediaWiki:DraggableYouTubePlayer/defaultTheme.css');
                if (($('#lightSkin').css('top') === '0px') && ($('#darkSkin').css('top') === '-22px')) {
                    $('#darkSkin').css({
                        'border-radius': '3px 3px 0 0',
                        'top': '-22px',
                    });
                    $('#defaultSkin').css({
                        'border-radius': '0',
                        'top': '0',
                    });
                    $('#lightSkin').css({
                        'border-radius': '0 0 3px 3px',
                        'top': '22px',
                    });
                } else if (($('#lightSkin').css('top') === '0px') && ($('#darkSkin').css('top') === '22px')) {
                    $('#lightSkin').css({
                        'border-radius': '3px 3px 0 0',
                        'top': '-22px',
                    });
                    $('#defaultSkin').css({
                        'border-radius': '0',
                        'top': '0',
                    });
                    $('#darkSkin').css({
                        'border-radius': '0 0 3px 3px',
                        'top': '22px',
                    });
                } else if (($('#lightSkin').css('top') === '-22px') && ($('#darkSkin').css('top') === '0px')) {
                    $('#lightSkin').css({
                        'border-radius': '3px 3px 0 0',
                        'top': '-22px',
                    });
                    $('#defaultSkin').css({
                        'border-radius': '0',
                        'top': '0',
                    });
                    $('#darkSkin').css({
                        'border-radius': '0 0 3px 3px',
                        'top': '22px',
                    });
                } else if (($('#lightSkin').css('top') === '22px') && ($('#darkSkin').css('top') === '0px')) {
                    $('#darkSkin').css({
                        'border-radius': '3px 3px 0 0',
                        'top': '-22px',
                    });
                    $('#defaultSkin').css({
                        'border-radius': '0',
                        'top': '0',
                    });
                    $('#lightSkin').css({
                        'border-radius': '0 0 3px 3px',
                        'top': '22px',
                    });
                }
            });
        } else if (!$(e.target).closest('.skinSwitch').length) {
            $('.currentSkin').css({
                'border-radius': '0 0 0 3px',
            });
            $('.otherSkin').hide();
        }
        });
        
        if (defaultTheme === 'default') {
            $('#YTPTheme').attr('href', '/load.php?mode=articles&only=styles&articles=u:dev:MediaWiki:DraggableYouTubePlayer/defaultTheme.css');
            $('#defaultSkin').addClass('currentSkin').removeClass('otherSkin');
                $('#lightSkin, #darkSkin').removeClass('currentSkin').addClass('otherSkin');
                $('#lightSkin').css({
                    'border-radius': '3px 3px 0 0',
                    'top': '-22px',
                });
                $('#defaultSkin').css({
                    'border-radius': '0 0 0 3px',
                    'top': '0',
                });
                $('#darkSkin').css({
                    'border-radius': '0 0 3px 3px',
                    'top': '22px',
                });
        } if (defaultTheme === 'light') {
            $('#YTPTheme').attr('href', '/load.php?mode=articles&only=styles&articles=u:dev:MediaWiki:DraggableYouTubePlayer/lightTheme.css');
            $('#lightSkin').addClass('currentSkin').removeClass('otherSkin').show();
                $('#defaultSkin, #darkSkin').removeClass('currentSkin').addClass('otherSkin');
                $('#defaultSkin').css({
                    'border-radius': '3px 3px 0 0',
                    'top': '-22px',
                    'display': 'none'
                });
                $('#lightSkin').css({
                    'border-radius': '0 0 0 3px',
                    'top': '0',
                });
                $('#darkSkin').css({
                    'border-radius': '0 0 3px 3px',
                    'top': '22px',
                });
        } if (defaultTheme === 'dark') {
            $('#YTPTheme').attr('href', '/load.php?mode=articles&only=styles&articles=u:dev:MediaWiki:DraggableYouTubePlayer/darkTheme.css');
            $('#darkSkin').addClass('currentSkin').removeClass('otherSkin').show();
                $('#lightSkin, #defaultSkin').removeClass('currentSkin').addClass('otherSkin');
                $('#lightSkin').css({
                    'border-radius': '3px 3px 0 0',
                    'top': '-22px',
                });
                $('#darkSkin').css({
                    'border-radius': '0 0 0 3px',
                    'top': '0'
                });
                $('#defaultSkin').css({
                    'border-radius': '0 0 3px 3px',
                    'top': '22px',
                    'display': 'none'
                });
        } if (['dark','light','default'].indexOf(defaultTheme) == -1) {
            $('#YTPTheme').attr('href', '/load.php?mode=articles&only=styles&articles=u:dev:MediaWiki:DraggableYouTubePlayer/defaultTheme.css');
        }
            
        
        if (helpButton !== 'show') {
            $('#openHelp').hide();
            $('.skinSwitch').css({
                'right': 'initial',
                'top': 'initial',
                'position': 'inherit'
            });
        }
        
        $('#openHelp').click(function() {
            $('#Help').show();
        });
        
        $('#closeHelp').click(function() {
            $('#Help').hide();
        });
        
        // Favorite List
        if (ytpfvs.length) {
            $('#FVStatement span').text('Favorites List');
            ytpfvs.forEach(function(obj, i) {
                $('#favoriteList ul').append($('<li>', {
                    id: 'FV' + (i + 1),
                    append: $('<div>', {
                        class: 'fvlist',
                        append: [
                            $('<div>', {
                                class: 'fvthumb',
                                css: {
                                    background: 'url(https://i.ytimg.com/vi/' + obj.id + '/hqdefault.jpg) center center / cover'
                                }
                            }),
                            $('<div>', {
                                text: obj.name,
                                css: {
                                    width: '100px'
                                }
                            })
                        ]
                    }).click(function() {
                        if (window.player) {
                            alert(i18n.msg('alertPlaying').plain());
                        } else {
                            $('#music').hide();
                            window.player = new YT.Player('video1', {
                                height: '100%',
                                width: '100%',
                                videoId: obj.id,
                                playerVars: {
                                    'controls': 0,
                                    'fs': 0,
                                    'showinfo': 0,
                                    'rel': 0,
                                    'enablejsapi': 1
                                },
                                events: {
                                    onReady: initialize,
                                    onStateChange: function(e) {
                                        if (e.data === YT.PlayerState.ENDED &&
                                            $('#loop').prop('checked')) {
                                            player.playVideo();
                                        }
                                    }
                                }
                            });
                            try {
                                player.playVideo();
                            } catch (e) {}
                        }
                    })
                }));    
            });
        } else {
            $('#favorites').hover(function () {
                $('#favoriteList').css({
                    'display': 'flex',
                    'align-items': 'center',
                });
                $('#FVStatement span').text(i18n.msg('noFavs').plain());
                $('#FVStatement').attr('style', 'border-bottom: none !important');
            }, function() {
                $('#favoriteList').css({
                    'display': 'none'
                });
            }
        );
        }
        
        // Other settings
        if (loop === 'always') {
            $('#loop').prop('checked', true);
        }
        if (autoplay === 'always') {
            $('#autoplaycbox').prop('checked', true);
        }
        
        // Make it draggable.
        mw.loader.using(['jquery.ui.draggable'], function() {
            YouTubePlayer.draggable({
                containment: 'window',
                scroll: false
            });
        });
    }
    
    mw.hook('dev.i18n').add(function(lib) {
        lib.loadMessages('DraggableYouTubePlayer').done(function(_i18n) {
            i18n = _i18n;
            i18n.useUserLang();
            init(i18n);
        });
    });
})();