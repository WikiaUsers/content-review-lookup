if (!loaded && !$('script[src$=\'Chat.js/load.js\']').length) {
    var loaded = true;
    var b=document.createElement('script');
    b.setAttribute('src', wgServer + '/index.php?title=MediaWiki:Chat.js/load.js&action=raw&ctype=text/javascript');
    b.setAttribute('type', 'text/javascript');
    document.getElementsByTagName('head')[0].appendChild(b);
}