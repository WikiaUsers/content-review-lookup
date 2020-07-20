(function() {
    var favicon = 'http://pintorkagamine.wikia.com/wiki/Special:Filepath/Favicon_-_Mekakucity_Actors.ico'
    var link = document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = (favicon);
    document.getElementsByTagName('head')[0].appendChild(link);
}());