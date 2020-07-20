/* Any JavaScript here will be loaded for all users on every page load. */

//purge script: http://daemonicsword.wikia.com/wiki/MediaWiki:Common.js?action=purge

window.DisplayClockJS = '%2H:%2M:%2S %d %{January;Febuary;March;April;May;June;July;August;September;October;November;December}m %Y (UTC)';

importArticles({
    type: "script",
    articles: [
        'w:c:dev:RevealAnonIP/code.js',
        'w:c:dev:DisplayClock/code.js'//,
        //'w:c:dev:HTMLNoLimit/code.js'
    ]
});
importScriptPage('Colors/code.js', 'dev');

//On init script
(function (window,document,$) {

    //Clock no purge
    setTimeout("$('#DisplayClockJS').attr('href','#');",100);
    setTimeout("$('#DisplayClockJS').attr('title','');",100);

    //Enable iframe
    /*$('.iframe').html('');
    $('.iframe').append('<iframe src="'+$('.iframe').attr('data-src')+'"></iframe>');
    $('.iframe iframe').css('width','100%').css('height','100%');
    //$('.iframe a').remove();

    //Audio tag
    $('.audio').html('');
    $('.audio').append('<audio controls><source src="'+$('.audio').attr('data-src')+'" type="'+$('.audio').attr('data-type')+'"></audio>');
    $('.audio audio').css('width','100%').css('height','100%');*/

    console.log('Path name: '+window.location.pathname);
    console.log('On init script executed');
}(this, this.document, this.jQuery));