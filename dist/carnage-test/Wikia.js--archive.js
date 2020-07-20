importArticles({
    type: 'style',
    articles: [
        'u:carnage-test:MediaWiki:Modal.css',
        'u:carnage-test:MediaWiki:Breadcrumbs.css',
        'u:carnage-test:MediaWiki:Navigation.css',
        'u:carnage-test:Mediawiki:ModeChanger.css'
    ]
});

importArticles({
    type: 'script',
    articles: [
        'u:carnage-test:MediaWiki:ReportWiki.js'
        //'u:carnage-test:MediaWiki:ScreenMenu.js',
        //'u:carnage-test:MediaWiki:SVG.js'
    ]
});

/*
importArticles({
    type: 'script',
    articles: [
        'u:carnage-test:MediaWiki:Navigation.js',
        'u:carnage-test:MediaWiki:ModeChanger.js'
    ]
});
*/

/*jQuery(function($){
    var screen_menu_button = '<a href="#" class="screen-menu-button wikia-button">Open Menu</a>';
    $('.screen-menu-button-wrapper').append(screen_menu_button);
    $('.screen-menu-button').on('click', function(){
        $screen_menu.open('Test', { content: 'Welcome'});
    });
});*/

/*$(function(){
    // Create the element
    var grid_elem = 
       '<section class="grid-navigation module">' +
           '<h1></h1>' +
           '<nav class="grid-content"></nav>' +
       '</section>';

    // Add the element
    $('.grid-wrapper').html(grid_elem);
    $('.grid-navigation h1').html($('.grid-wrapper').attr("data-heading"));

    // Parse JSON
    jQuery.getJSON('/api.php?action=parse&text={{' + wgPageName + '/grid}}&format=json', function(data){
        // Add the text to the element
        var code = data.parse.text['*'];
        $('.grid-navigation .grid-content').append(code);
    });
});

$('.grid-navigation ul').addClass('row');
$('.grid-navigation ul li').addClass('grid');
*/

mw.loader.using(['jquery.ui.accordion'], function(){
    $('.accordion').accordion();
    window.accordionStyleLoad = 0;
    if (accordionStyleLoad < 1){
        accordionStyleLoad = 1;
        var accordionStyle =
            '.accordion > div {' +
                'border: 1px solid black;' +
                'padding: 0;' +
                'box-shadow: 0 0 5px silver;' +
            '}' +

            '.accordion h3 {' +
                'color: white;' +
                'padding: 8px;' +
                'margin: 0;' +
                'text-align: center;' +
                'background: black;' +
                'background: -moz-linear-gradient(top, black 35%, #454545 65%);' +
                'background: -webkit-gradient(linear, 50% 0, 50% 100%, color-stop(35%, black), color-stop(65%, #454545));' +
                'background: -webkit-linear-gradient(top, black 35%, #454545 65%);' +
                'background: -ms-linear-gradient(top, black 35%, #454545 65%);' +
                'background: -o-linear-gradient(top, black 35%, #454545 65%);' +
                'background: linear-gradient(to bottom, black 35%, #454545 65%);' +
                'filter: progid:DXImageTransform.Microsoft.Gradient( GradientType=1, startColorStr=#000000, endColorStr=#454545);' +
            '}';

        $('head').append('<style type="text/css" id="accordionStyle" media="all">' + accordionStyle + '</style>');
    }
});