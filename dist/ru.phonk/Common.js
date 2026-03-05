/* Размещённый здесь код JavaScript будет загружаться пользователям при обращении к каждой странице */
mw.loader.using('mediawiki.util').then(function () {
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Special+Elite&display=swap';
    document.head.appendChild(link);
});