(function () {
    
    'use strict';
    
    importStylesheetPage('MediaWiki:Typography.test.css', 'pecoes');
    importStylesheetURI('http://fonts.googleapis.com/css?family=Mouse+Memoirs|Unica+One|Fascinate+Inline|Gorditas|Paprika|Berkshire+Swash|Amarante|Elsie|Unlock|Jacques+Francois|Cantata+One&text=TypogrAhQwrzmfbt');
    
    $.ajax('http://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js', 
        { dataType: 'script', cache: true }
    )
    .done(function () {
        WebFont.load({
            google: {
                families: [ 
                  'Amaranth::latin', 'Noticia+Text:400,400italic,700:latin'
                ] 
            },
            active: function () {
                $('#mw-content-text').css('visibility', 'visible');
            }
        });
    });
    
    $.ajax('/load.php', {
        cache: true,
        dataType: 'script',
        data: {
            debug:    'false',
            mode:     'articles',
            only:     'scripts',
            articles: 'u:dev:Colors/code.js'
        }
    })
    .done(function () {
        window.dev.colors.css('.vignette{background:-moz-linear-gradient(left,$header 0%,$page 100%);background:-webkit-gradient(linear,left top,right top,color-stop(0%,$header),color-stop(100%,$page));background:-webkit-linear-gradient(left,$header 0%,$page 100%);background:-o-linear-gradient(left,$header 0%,page 100%);background:-ms-linear-gradient(left,$header 0%,$page 100%);background:linear-gradient(to right,$header 0%,$page 100%);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=\'$header\',endColorstr=\'$page\',GradientType=1)}.typography:after{background:none repeat scroll 0 0 $page;}.typography{text-shadow:0.4em 0.5em $page;}');
    });
    
}());