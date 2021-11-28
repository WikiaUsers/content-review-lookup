/*
 * 21:10, February 8, 2014 (UTC)
 * http://dev.wikia.com/wiki/MessageWallUserTags
 * User tags for names on MessageWall posts
 * @author: RyaNayR (http://dev.wikia.com/wiki/User:RyaNayR)
 *
 * This script is OpenSource —
 * It is completely free for anyone to use or modify in any way.
 * All modifications and improvements are welcome and appreciated.
 */
//<syntaxhighlight lang=jQuery>

var messageWallTagColor = window.messageWallTagColor || 'red';

(function($) {
    for (var name in messageWallUserTags) {
        $('a.subtle[href$="Message_Wall:' + name + '"]').after('<img src="https://images.wikia.nocookie.net/__cb20140418184709/micronations/images/d/db/Microwikistafflogo.png" alt="MicroWiki ' + messageWallUserTags[name] + '">');
    }
}(jQuery));
//</syntaxhighlight>