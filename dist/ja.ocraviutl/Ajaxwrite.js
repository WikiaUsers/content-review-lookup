/* Ajaxwrite script v0.0.4
*  @author: Laclale
*  @thanks: Kopcap94
*/
;(function($,mw) {
    window.dev = window.dev || {};
    if(window.dev.ajaxwrite !== undefined){
        return;
    }
ajaxwrite = {
// Save config function
    write: function(locate,ajaxSet,summary) {
        $.ajax({
            url: mw.util.wikiScript('api'),
            type: 'POST',
            data: {
                action: 'edit',
                title: locate,
                summary: summary,
                text: ajaxSet,
                bot: 1,
                token: mw.user.tokens.get('editToken'),
                format: 'json'
            }
        })    
        .done(function(d,st,xhr){
            if (d.edit.result == 'Success'){
                return {res: true};
            }else{
                return {
                    res: false
                    data: d
                    status: st
                    xhr: xhr
                };
            }
        })
        .fail(function(xhr,st,e){
            return {
                res: false
                data: e
                status: st
                xhr: xhr
            };
        });
    },
// Launch function
    load: function(locate) {
        $.ajax({
            url: mw.util.wikiScript(),
            type: 'GET',
            data: {
                title: locate,
                action: 'raw',
                cb: Math.ceil(new Date().getTime() / 1000),
                dataType:'text'
            }
        })
        .done(function(d,st,xhr){
            // Parsing result
            try {
                return {
                    res: true
                    parse: true
                    data: JSON.parse(d)
                };
            } catch(err) {
                return {
                    res: true
                    parse: false
                    data: err
                    status: st
                    xhr: xhr
                };
            }
        })
        .fail(function(xhr,st,e){
            return {
                res: false
                parse: false
                data: e
                status: st
                xhr: xhr
            };
        });
    }
}
    window.dev.ajaxwrite = ajaxwrite;
    mw.hook('dev:ajaxwrite').fire(window.dev.ajaxwrite);
})(this.jQuery,this.mediaWiki);