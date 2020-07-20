/* Other */

var arrOrigWords = ['scripts', 'lua', 'developers', 'wikia', 'lifestyle', 'entertainment', 'games', 'java', 'jedi', 'waffles', 'orb', 'feshe', 'potato', 'toilet', 'crazy','thank','illuminati','n0sc0pe','mlg','doritos','gemsona','orangina','quartz','hipster','tumblr','steam','slendertubbies','flute','bassoon','baseball','dimension','amphibian','botany','peashooter','zomboss','rewind','sanic','anagram','patterns','scottish','waltz','tango','april','winter','contaminate','salvage','opera','city','darkness','alto','newlyweds','stationary','fairies'];

importScriptPage("MediaWiki:Chat.js/ChatHacks.js", "pvzcc"); 
importScriptPage('MediaWiki:ChatTags/code.js', 'shining-armor');

var chatags = { images: true, videos: true, maps: true };

chatags.tags['gmap'] = function (s,t) {
                 if (chatags.maps !== true) return s;
                 if (t.charAt(0) !== '/') {
                     try {
                         t = t.split('="');
                         t[1] = t[1].replace('"', '');
                         s = s.replace('[yt="' + t[1] + '"]', '<iframe src="https://www.google.com/maps/embed?pb=' + mw.html.escape(t[1]) + '" width="600" height="450" frameborder="0" style="border:0" allowfullscreen></iframe>');
                     } catch(e) { console.log(e) }
                 }
                 return s;
             }