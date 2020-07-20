if(mw.config.get('wgTitle') == "WW" || mw.config.get('wgTitle') == "WS") {
    if(mw.config.get('wgNamespaceNumber') == 4) {
        //importScriptPage('MediaWiki:Redirect.js');
    }
}

$(function() {
    if(mw.config.get('wgPageName') == "Test") {
        $('#mw-content-text').append(mw.config.get('wgServer'));
    } else if(mw.config.get('wgPageName') == "Choose_Your_Own_Adventure") {
        importScriptPage('MediaWiki:CYOA.js', 'underscorre')
    }
});

importScriptPage('ShareMenu/code.js', 'dev');
//importScriptPage('TumblrShare/code.js', 'dev');

$('#PowerShareMenu').ready(function(){
    $('#PowerShareMenu').append('<p>test</p>');
    console.log('d');
});