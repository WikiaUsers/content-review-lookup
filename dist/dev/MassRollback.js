;(function($, window) { 
    function massRollback() {
        var config = window.massRollback || {};
    
        function logMsg(data) {
            console.log('[MassRollback | v0.1]:', Array.isArray(data) ? data.join(' ') : data);
        }
    
        if (mw.config.get('wgCanonicalSpecialPageName') !== "Contributions" || config.init) {
            logMsg('Page is not contributions, or script double-loaded, skipping import.');
            return;
        }
        config.init = true;
 
        if (!$('.mw-custom-rollback-link > a, .mw-rollback-link > a').length) {
            console.warn('[MassRollback | v0.1]:', 'No rollback links found');
            return;
        }
 
        if (mw.config.get('wgUserName') === $('h1[itemprop="name"]').html()) {
            logMsg('Opened page is own userpage, skipping import');
            return;
        }
 
        $(config.placement || '#contentSub, .page-header__subtitle').append(
            $('<span>', { 
                id: "mw-rollback-all",
                html: [
                    ' [', 
                    $('<a>', { 
                        html: config.displayText || 'Rollback All', 
                        style: "cursor: pointer",
                    }), 
                    ']',
                ]
            })
        );
         
        logMsg('Successfully placed rollback links at the selector `' + (config.placement ||  '#contentSub, .page-header__subtitle') + '`')
     
        $('#mw-rollback-all').click(function() {
            if (config.noConfirm || confirm('Are you sure you want to rollback all of ' + $('h1#name, h1[itemprop="name"]').html() + ' edits?')) {
                logMsg('Rollbacking edits...'); 
                $(this).children('a').html(
                    $('<img>').attr({
                        src: 'https://images.wikia.nocookie.net/dev/images/8/82/Facebook_throbber.gif',
                        alt: 'Rollbacking edits...',
                        border: '0'
                    }).css('vertical-align', 'baseline')
                );
                $('.mw-custom-rollback-link > a, .mw-rollback-link > a').each(function(i) { 
                    $(this).click();
                    logMsg('Sucessfully rollbacked link #' + i);
                });
 
                logMsg('Sucessfully Rollbacked All edits!');
 
                $(this).children('a').html( config.doneText || 'All Edits Rollbacked');
                $(this).prop('id', 'mw-rollback-all-done');
                $(this).children('a').css({ 'text-decoration': 'line-through', 'color': 'gray', 'cursor': 'inherit', });
                $(this).off('click');
 
                setTimeout(function() {
                    $('.wds-banner-notification__container').remove();
                }, 400);
            } else {
                logMsg('Rollbacks Cancelled.');
            }
        });
    }
    
    setTimeout(massRollback, 1250)

})(jQuery, window);