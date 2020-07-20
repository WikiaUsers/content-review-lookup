importScriptPage('MediaWiki:ChatOptions/code.js', 'dev');
importScriptPage('MediaWiki:ChatTags/code.js', 'shining-armor');
chatags.tags['user'] = function(s,t) {        // S is the user string, T is the tag
    if (t.charAt(0) === '/') {                // We have been given the ending tag
        s = s.replace('[/user]', '</span>');
    } else {                                  // We have been given the opening tag
        s = s.replace('[user]', '<span style="color:purple">');
    }
    return s;                                 // Return the user string for further parsing
};
console.log('test');