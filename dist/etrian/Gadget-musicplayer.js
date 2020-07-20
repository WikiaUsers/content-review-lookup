// Adds a music player to the EditRail on the edit screen
// @author Destruction Matter

/*global $, mw, localStorage */
/*jslint browser: true, vars: true */

if (window.modsLoaded === undefined) {
    var modsLoaded = {};
}

// Adds music player module
if (mw.config.get('wgNamespaceNumber') !== undefined && mw.config.get('wgAction') === "edit" && !modsLoaded.musicPlayer) {
    var musicPlayer = {
        // Manual function for sliding show/hide functionality
        playerSlide: function () {
            "use strict";
            $('#musicplayerarea').slideToggle('medium');
            $('.module_player .chevron').toggleClass('expand');
            $('.module_player .chevron').toggleClass('collapse');
        },
        // Changes the source of the music file in the player
        changeMusic: function () {
            "use strict";
            var text;
            $("#musicchoose option:selected").each(function () {
                text = $(this).attr('value');
            });
            $('#musicplayer').attr('src', text);
        },
        // Changes the player's loop setting
        toggleLoop: function () {
            "use strict";
            var temp = localStorage.musicPlayerLoop;
            if (temp === "yes") {
                localStorage.musicPlayerLoop = "no";
                $('#musicplayer').get(0).loop = false;
            } else if (temp === "no") {
                localStorage.musicPlayerLoop = "yes";
                $('#musicplayer').get(0).loop = true;
            }
        },
        // Adds a music player to the EditRail on the edit screen
        initModule: function () {
            "use strict";
            var temp;
            if (!localStorage.musicPlayerLoop || localStorage.musicPlayerLoop === "yes") {
                temp = ['loop="loop" ', 'checked="checked" '];
                localStorage.musicPlayerLoop = "yes";
            } else {
                temp = ["", ""];
            }
            $('<div class="module module_player"><h3 onclick="musicPlayer.playerSlide()"><span>Music Player</span><img src="data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D" class="chevron expand" /></h3><div id="musicplayerarea" class="module_content" style="display:none"><audio id="musicplayer" src="http://sq4.atlusnet.jp/swf/sound/bgm_3.mp3" preload="none" controls="controls" ' + temp[0] + 'style="width:100%">Your browser does not support this player</audio><br /><select id="musicchoose" onchange="musicPlayer.changeMusic()"><optgroup label="EO4 Music"><option value="http://sq4.atlusnet.jp/swf/sound/bgm_1.mp3">Music 1</option><option value="http://sq4.atlusnet.jp/swf/sound/bgm_2.mp3">Music 2</option><option value="http://sq4.atlusnet.jp/swf/sound/bgm_3.mp3" selected="selected">Music 3</option><option value="http://sq4.atlusnet.jp/swf/sound/bgm_4.mp3">Music 4</option><option value="http://sq4.atlusnet.jp/swf/sound/bgm_5.mp3">Music 5</option></optgroup><optgroup label="EO1 Music"><option value="http://www.intothelabyrinth.net/mp3s/SQ-OST/103%20Labyrinth%20I%20-%20The%20Green%20Green%20Woodlands.mp3">Stratum 1</option><option value="http://www.intothelabyrinth.net/mp3s/SQ-OST/106%20Labyrinth%20II%20-%20The%20Vast%20Primeval%20Hidden%20Grove.mp3">Stratum 2</option><option value="http://www.intothelabyrinth.net/mp3s/SQ-OST/110%20Labyrinth%20III%20-%20The%20Thousand%20Year%20Old%20Blue%20Woodlands.mp3">Stratum 3</option><option value="http://www.intothelabyrinth.net/mp3s/SQ-OST/114%20Labyrinth%20IV%20-%20The%20Withered%20Forest.mp3">Stratum 4</option><option value="http://www.intothelabyrinth.net/mp3s/SQ-OST/116%20Labyrinth%20V%20-%20The%20Capital%20of%20Shinjuku.mp3">Stratum 5</option></optgroup><optgroup label="IOSYS"><option value="http://www.intothelabyrinth.net/mp3s/IOSYS/1-01.mp3">1-1</option><option value="http://www.intothelabyrinth.net/mp3s/IOSYS/1-02.mp3">1-2</option><option value="http://www.intothelabyrinth.net/mp3s/IOSYS/1-03.mp3">1-3</option><option value="http://www.intothelabyrinth.net/mp3s/IOSYS/1-04.mp3">1-4</option><option value="http://www.intothelabyrinth.net/mp3s/IOSYS/1-05.mp3">1-5</option><option value="http://www.intothelabyrinth.net/mp3s/IOSYS/1-06.mp3">1-6</option><option value="http://www.intothelabyrinth.net/mp3s/IOSYS/1-08.mp3">1-8</option><option value="http://www.intothelabyrinth.net/mp3s/IOSYS/1-09.mp3">1-9</option><option value="http://www.intothelabyrinth.net/mp3s/IOSYS/1-11.mp3">1-11</option></optgroup><option value="http://sei-peri.up.seesaa.net/mp3/sq3-6.mp3">SQ3-6 Remix</option></select><input id="loopbox" type="checkbox" ' + temp[1] + 'onclick="musicPlayer.toggleLoop()" />Loop</div></div>').insertAfter('.module_page_controls');
        }
    };
    $(document).ready(function () {
        "use strict";
        musicPlayer.initModule();
    });
    modsLoaded.musicPlayer = true;
}