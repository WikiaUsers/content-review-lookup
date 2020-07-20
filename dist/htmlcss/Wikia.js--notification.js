;(function(mw, $, window, notification){
    var config = $.extend(notification, {
        load: true,
        excludedNamespaces: [],
        source: 'MediaWiki:Custom-notification',
        fadeSpeed: 300
    });
    
    if (!config.load) return;
    importArticles({
        type: 'style',
        articles: [
            'u:htmlcss:MediaWiki:Notification.css'
        ]
    });
    
    $.get(mw.util.wikiScript('index'), {
        title: config.source,
        action: 'render',
        ctype: 'text/html'
    }, function(data){
        if (data.error) return;
        var $notification = $('<section />', {
                'class': 'custom-notification notification wds-notification',
                'id': 'custom-notification'
            }),
            $content = $('<div />', {
                'class': 'custom-notification-content wds-notification-content',
                html: data
            }),
            $header = $('<header />', {
                'class': 'custom-notification-header wds-notification-header',
                html: $('<div />').html(data).find('h2').eq(0)
            }),
            sass_params = mw.config.get('sassParams', sassParams);
        
        /**
         * To prevent the other h2s from rendering
         **/
         
        $content.children('h2').each(function(index){
            $(this).remove();
        });
        
        $header.html('<h2 class="custom-notification-heading wds-notification-heading">' + $header.find('span.mw-headline').html() + '</h2>');
        $header.wrap('<header class="custom-notification-header wds-notification-header"></header>');
        $content.wrap('<div class="custom-notification-content wds-notification-content"></div>');
        
        $notification.html([$header, $content, $('<a />', {
            'class': 'custom-notification-close wds-button wds-is-squished',
            'id': 'custom-notification-close',
            'href': '#custom-notification',
            text: 'Close'
        }).on('click', function(event){
            event.preventDefault();
            $(event.target.hash).fadeOut(config.fadeSpeed);
        })]);
        
        if (['view', 'history'].indexOf(mw.config.get('wgAction', wgAction)) > -1 || config.excludedNamespaces.indexOf(mw.config.get('wgNamespaceNumber', wgNamespaceNumber)) === -1){
            mw.util.addCSS(
                '#custom-notification {' +
                    'background-color: ' + sass_params['color-header'] + ';' +
                    'color: ' + sass_params['color-links'] + ';' + 
                '}'
            );
            if (!$('.custom-notification').length){
                $('.WikiaSiteWrapper').append($notification);
            }
        }
    });
})(this.mediaWiki, this.jQuery, this, this.notification = this.notification || {});