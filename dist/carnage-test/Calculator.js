(function(window, $, mw){
    var Loader = (function(global, $, mw){
        var deferred = $.Deferred(), error;
        if (mw.config.get('wgNamespaceNumber') !== -1){
            error = new ReferenceError('This is not a "Special" page.');
            deferred.reject(error);
        } else {
            var pattern = /Special\:Blank[Pp]age\//;
            if (mw.config.get('wgPageName').match(pattern)){
                var subtitle = mw.config.get('wgPageName').replace(pattern, '');
                if (subtitle.match(/[Cc]alculator/)){
                    $(
                        importArticles({
                            type: 'script',
                            articles: ['u:dev:MediaWiki:I18n-js/code.js']
                        }, {
                            type: 'style',
                            articles: ['MediaWiki:Calculator.css']
                        })
                    ).on('load', function(){
                        mw.hook('dev.i18n').add(function(i18no){
                            i18no.loadMessages('Calculator').done(function(o){
                                var msg = o._messages.en, i18n = {};
                                Object.keys(msg).forEach(function(name){
                                    i18n[name] = o.msg(name).escape();
                                });
                                deferred.resolve(i18n);
                            }).fail(function(error){
                                deferred.reject(error);
                            });
                        });
                    });
                } else {
                    error = new ReferenceError('Incorrect subtitle:' + subtitle);
                    deferrred.reject(error);
                }
            } else {
                error = new ReferenceError('Page must be "Special:BlankPage/Calculator."');
                deferred.reject(error);
            }
        }
    }(window, $, mw));
    return Loader;
}(this, jQuery, mediaWiki)).done(function(i18n){
    
}).fail(function(error){
    console.error(error);
});