/**
* __NOWYSIWYG__
* [[Category:Script|{{SUBPAGENAME}}]]
**/

(function(){
    var _host = window.location.host;
    
    if (!_host) return false;
    
    var _func = function(){
        $('.WikiNav, #notificationsContainer .notification, #SPOTLIGHT_FOOTER, .global-footer, #WikiaFooter, .WikiaArticleInterlang')
            .add($('.UserProfileMasthead .masthead-info .masthead-info-lower').find('.links, .wikis'))
            .find('a')
            .add('.wikia-logo, .global-footer a, .hub-link, .hub-links a, #WikiaRandomWiki')
            .each(function(){
                if ((this.host && this.host != _host) || (/__spotlights/).test(this.href))
                {
                    $(this).attr('target', '_blank');
                }
            })
        ;
    }
    
    var _func2 = function(){
        setTimeout(_func, 100);
        setTimeout(_func, 500);
    }
    
    $(window)
        .on('load.wikinav', _func2)
        .triggerHandler('load.wikinav')
    ;
    
    $('#notificationsEntryPoint')
        .one('mousedown.wikinav', _func2)
    ;
    
    wgAfterContentAndJS && wgAfterContentAndJS.push && wgAfterContentAndJS.push(_func2);
})();