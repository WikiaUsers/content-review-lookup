/* Any JavaScript here will be loaded for all users on every page load. */

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
            page: 'Template:WelcomeSide',
            disablepp: '',
            format: 'json'
        }, function(data) {
            $('#WikiaRail').prepend(
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
/** Adds the Page Tabs template to every page */
mw.hook('wikipage.content').add(function($content) {
    
    // The name of your template without the "Template:" prefix
    var templateName = 'Talk header'; 
    
    // Add the template call as a string
    var wikitext = '{{' + templateName + '}}';
    
    // Convert the wikitext into HTML and prepend it to the main content area
    new mw.Api().parse( wikitext, {
        title: mw.config.get('wgPageName')
    }).done(function(html) {
        // This selector targets the area right above the main content
        $('.page-header').after(html); 
    });
});