/* Any JavaScript here will be loaded for all users on every page load. */
/* Any JavaScript here will be loaded for all users on every page load. */
 
/* Main page */
 
/* Photo feed Instagram */
 
$("#instagram").append("<iframe src='https://instansive.com/widgets/490aac8daf88ffcf3d0fbba595c1fbbb322de524.html' id='instansive_490aac8daf' name='instansive_490aac8daf' scrolling='no' allowtransparency='true' class='instansive-widget' style='width: 100%; border: 0; overflow: hidden;'></iframe>");
 
/*Vevo embedder*/
 
importScriptPage('MediaWiki:VevoEmbedder/VevoEmbedder.js', 'dev');
 
/* welcome module sia wiki*/
$(function() {
    var welcome = "";
    if (localStorage.getItem('welcome-' + mw.config.get('wgDBname'))) {
        welcome = +localStorage.getItem('welcome-' + mw.config.get('wgDBname'));
    } else {
        welcome = 1;
        localStorage.setItem('welcome-' + mw.config.get('wgDBname'), 1);
    }
    if (welcome < 4) {
        $.get(mw.util.wikiScript('api'), {
            action: 'parse',
            page: 'Template:Side Promotions',
            disablepp: '',
            format: 'json'
        }, function(data) {
            $('#WikiaRail').append(
                $('<section>')
                    .addClass('module')
                    .addClass('welcome-module')
                    .append(
                        $('<div>')
                            .addClass('welcome-container')
                            .html(
                                data.parse.text['*'].replace(/\$1/g, (!!mw.config.get('wgUserName') ? mw.config.get('wgUserName') : 'anonymous user'))
                            )
                    )
            );
            if (!mw.config.get('wgUserName')) {
                $('.welcome-module .anons').show();
            }
            $('.welcome-module #remove').on('click', function() {
                localStorage.setItem('welcome-' + mw.config.get('wgDBname'), 4);
                $('.welcome-module').fadeOut('slow');
            });
            $('.welcome-module #cancel').on('click', function() {
                localStorage.setItem('welcome-' + mw.config.get('wgDBname'), ++welcome);
                $('.welcome-module').fadeOut('slow');
            });
        });
    }
});
 
/* YOUTUBE */
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:YoutubePlayer/code.js'
    ]
});
 
/* VEVO */
importScriptPage('MediaWiki:VevoEmbedder/VevoEmbedder.js', 'dev');