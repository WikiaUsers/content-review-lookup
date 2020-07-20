// WARNING: For normal displaying use fullscreen editor
importArticles({
    type: "script",
    articles: [
        "u:dev:MediaWiki:ChatAnnouncements/code.js",
        "u:shining-armor:MediaWiki:ChatTags/code.js",
        "u:dev:MediaWiki:ChatOptions/code.js",
        "u:dev:MediaWiki:ChatDelay/code.js",
        "u:kocka:MediaWiki:Emoticons.js"
    ]
});
 
 
importScriptPage('MediaWiki:ChatTags/code.js', 'shining-armor');
 
//... import ...
chatags.tags['user'] = function(s,t) {        // S is the user string, T is the tag
    if (t.charAt(0) === '/') {                // We have been given the ending tag
        s = s.replace('[/user]', '</span>');
    } else {                                  // We have been given the opening tag
        s = s.replace('[user]', '<span style="color:purple">');
    }
    return s;                                 // Return the user string for further parsing
};
 
//... import ...
chatags.tags['user'] = function(s,t) {
    if (t.charAt(0) === '/') {
        s = s.replace('[/user]', '</span>');
    } else {
        try {
            t = t.split(' ');
            s = s.replace('[user' + t[1] + ']', '<span style="color:' + mw.html.escape(t[1]) + ';">');
        } catch(e) { console.log(e) }
    }
    return s;
};