/* Custom ChatTags...uh...tags that are not included with the default installation of the ChatTags script */
 
chatags.tags['align'] = function(s,t) {
    if (t.charAt(0) === '/') {
        s = s.replace('[/align]', '</span>');
    } else {
        try {
            t = t.split('="');
            t[1] = t[1].replace('"', '');
            s = s.replace('[align="' + t[1] + '"]', '<span style="display:block; text-align:' + mw.html.escape(t[1]) + ';">');
        } catch(e) { console.log(e) }
    }
    return s;
}; 

chatags.tags['green'] = function(s,t) {
    if (t.charAt(0) === '/') {
        s = s.replace('[/green]', '</span>');
    } else {
        s = s.replace('[green]', '<span style="color:#849900">> ');
    }
    return s;
};
 
chatags.tags['spoiler'] = function(s,t) {
    if (t.charAt(0) === '/') {
        s = s.replace('[/spoiler]', '</span>');
    } else {
        s = s.replace('[spoiler]', '<span style="color:black;background-color:black">');
    }
    return s;
};

chatags.tags['yt'] = function(s,t) {
    if (chatags.videos !== true) return s;
    if (t.charAt(0) !== '/') {
        try {
            t = t.split('="');
            t[1] = t[1].replace('"', '');
            s = s.replace('[yt="' + t[1] + '"]', '<iframe width="210" height="158" src="https://www.youtube.com/embed/' + mw.html.escape(t[1]) + '" frameborder="0" allowfullscreen></iframe>');
        } catch(e) { console.log(e) }
    }
    return s;
};

chatags.tags['snd'] = function(s,t) {
    if (t.charAt(0) !== '/') {
        try {
            t = t.split('="');
            t[1] = t[1].replace('"', '');
            s = s.replace('[snd="' + t[1] + '"]', '<audio controls class="chatags-audio" src="http://' + mw.html.escape(t[1]) + '">ChatTag not supported by your browser!</audio>');
        } catch(e) { console.log(e) }
    }
    return s;
};

chatags.tags['vid'] = function(s,t) {
    if (t.charAt(0) !== '/') {
        try {
            t = t.split('="');
            t[1] = t[1].replace('"', '');
            s = s.replace('[vid="' + t[1] + '"]', '<video width="210" height="158" controls src="http://' + mw.html.escape(t[1]) + '">ChatTag not supported by your browser!</video>');
        } catch(e) { console.log(e) }
    }
    return s;
};