// "ICH LESE GERADE..."-MODUL
 
function importArticleCallback(page,type,callback) {
    var v = Math.random() * 10; //don't get cached version (e.g. action=purge)
    $.getScript('/load.php?mode=articles&articles=' + page + '&only=' + type + '&v=' + v).fail(function (response) {
        console.error(response);
    }).done(callback);
}
 
function importArticlesCallback() {
    for(i = 0; i < arguments[0].length; i++) {
        page = arguments[0][i].page;
        type = arguments[0][i].type;
        callback = arguments[0][i].callback;
        importArticleCallback(page, type, callback);
    }
}
 
function isUserpage() {
	var config = mw.config.get(['wgNamespaceNumber', 'wgCanonicalSpecialPageName']);
    return ($.inArray(config.wgNamespaceNumber, [2, 3, 1200, 500]) !== -1 || (config.wgCanonicalSpecialPageName && $.inArray(config.wgCanonicalSpecialPageName, ['Contributions', 'Following']) != -1));
}
 
function getUserByPage() {
	var config = mw.config.get(['wgNamespaceNumber', 'wgCanonicalSpecialPageName', 'wgPageName', 'wgUserName']);
    if($.inArray(config.wgNamespaceNumber,[2,1200,500]) != -1) {
        return /:(.*)/.exec(config.wgPageName)[1].replace('_',' ');
    }
    else if(config.wgCanonicalSpecialPageName == 'Contributions') {
        return /\/(.*)/.exec(config.wgPageName)[1].replace('_',' ');
    }
    else if(config.wgCanonicalSpecialPageName == 'Following') {
        return config.wgUserName;
    }
}
 
/* Thanks to musefan: http://stackoverflow.com/a/17973165 */
function pad(x){
    if(x < 10) return "0" + x;
    return x;
}