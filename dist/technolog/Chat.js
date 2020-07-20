importArticles({ type: 'script', articles: [     'u:dev:MediaWiki:ChatHacks.js' ]});
importScriptPage('MediaWiki:ChatOptions/code.js', 'dev');
var chatags = { images: true, videos: true };
importScriptPage('MediaWiki:ChatTags/code.js', 'shining-armor');
//... import ... chatags.tags['user'] = function(s,t) {        // S is the user string, T is the tag     if (t.charAt(0) === '/') {                // We have been given the ending tag         s = s.replace('[/user]', '</span>');     } else {                                  // We have been given the opening tag         s = s.replace('[user]', '<span style="color:purple">');     }     return s;                                 // Return the user string for further parsing };
//... import ... chatags.tags['user'] = function(s,t) {     if (t.charAt(0) === '/') {         s = s.replace('[/user]', '</span>');     } else {         try {             t = t.split('="');             t[1] = t[1].replace('"', '');             s = s.replace('[user="' + t[1] + '"]', '<span style="color:' + mw.html.escape(t[1]) + ';">');         } catch(e) { console.log(e) }     }     return s; };
mw.html.escape()