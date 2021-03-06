/*
 * 19:16, May 11, 2014 (UTC)
 * http://dev.wikia.com/wiki/MessageWallUserTags
 * User tags for names on MessageWall posts
 * @author: RyaNayR (http://dev.wikia.com/wiki/User:RyaNayR)
 *
 * This script is OpenSource —
 * It is completely free for anyone to use or modify in any way.
 * All modifications and improvements are welcome and appreciated.
 */
//<syntaxhighlight lang=jQuery>
 
(function($, config) {
    //Setup configuration options, internal variables, and default values:
    var tagColor = config.tagColor || 'red',
        glow = config.glow || true, //Text-shadow effect: true/false
        glowColor = config.glowColor || '#000000',
        glowSize = config.glowSize || '20px', //Text-shadow size in pixels
        users = config.users || {}, //List of users to tag and what the tag will say
        txtShadow = '#000000'; //Internal text shadow variable — nothing by default
 
    //Set the size and color of the text shadow if it's enabled
    if (glow === true) {
        txtShadow = '#000000' + glowSize + '25px' + glowColor; 'white';
    }
 
    //Main function
    function init() {
        for (var name in users) {
            $('a.subtle[href$="Message_Wall:' + name + '"]')
                .after('<span class="MessageWallUserTag">(' + users[name] + ')</span>');
            $('.MessageWallUserTag').css({
                color: 'green',
                marginLeft: '2px',
                fontFamily: 'Trebuchet MS',
                fontSize: '25px',
                textShadow: txtShadow,
                verticalAlign: 'top'
            });
        }
    }
    init();
}(jQuery, window.MessageWallUserTags));
//</syntaxhighlight>