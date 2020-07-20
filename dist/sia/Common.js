/* Any JavaScript here will be loaded for all users on every page load. */

;(function() {
    $('.mpd-item').click(function(e) {
        e.preventDefault();
        $('.mpd-item-container').hide();
        $('.mpd-content-container')
            .show()
            .append('<img class="loading" src="' + mw.config.get('stylepath') + '/common/images/ajax.gif" />');
        $('.mpd-content').load('/wiki/Template:' + $(this).data('load') + ' #mw-content-text', function() {
            $('.mpd-content-container .loading').remove();
            $(this).slideDown();
            $('.mpd-content-container #mw-content-text h3:first-of-type').prepend(
                $('<a class="back">⬅</a>').click(function() {
                    $('.mpd-content-container, .mpd-content').hide();
                    $('.mpd-item-container').fadeIn();
                    $(this).remove();
                })
            );
        });
    });
})();

/* welcome module */
$(function() {
    var welcome;
    if (localStorage.getItem('welcome-' + mw.config.get('wgDBname'))) {
        welcome = +localStorage.getItem('welcome-' + mw.config.get('wgDBname'));
    } else {
        welcome = 1;
        localStorage.setItem('welcome-' + mw.config.get('wgDBname'), 1);
    }
    if (welcome < 4) {
        $.get(mw.util.wikiScript('api'), {
            action: 'parse',
            page: 'Template:Welcome',
            disablepp: '',
            format: 'json'
        }, function(data) {
            $('#WikiaRail').append(
                $('<section>')
                    .addClass('module')
                    .addClass('welcome-module')
                    .append(
                        $('<h2>')
                            .addClass('activity-heading')
                            .text('Welcome to the Sia Wiki!')
                    )
                    .append(
                        $('<div>')
                            .addClass('welcome-container')
                            .html(
                                data.parse.text['*'].replace(/\$1/g, (!!mw.config.get('wgUserName') ? mw.config.get('wgUserName') : 'anonymous user'))
                            )
                            .append(
                                $('<div>')
                                    .addClass('buttons-container')
                                    .append(
                                        $('<button>')
                                            .addClass('wikia-button')
                                            .attr('id', 'remove')
                                            .text('Don\'t show again')
                                    )
                                    .append(
                                        $('<button>')
                                            .addClass('wikia-button')
                                            .addClass('talk')
                                            .addClass('comments')
                                            .addClass('secondary')
                                            .attr('id', 'cancel')
                                            .text('Cancel')
                                    )
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