var API = new mw.Api(),
    warnComments = {
        verify: function() {
            API.get({
            action: 'query',
            meta: 'allmessages',
            ammessages: 'Custom-warn-comments-status'
            }).done((function(r) {
                if (!r.error) {
                    switch(r.query.allmessages[0]['*']) {
                        case 'off':
                        case 'disabled':
                        case 'disable':
                        case 'false':
                            console.log('Warn for comments are disabled.');
                        break;
                        case 'enable':
                        case 'enabled':
                        case 'on':
                        case 'true':
                            warnComments.init();
                        break;
                    }
                }
            }));
        },
        init: function() {
            API.get({
            action: 'parse',
            page: 'MediaWiki:Custom-warn-comments'
            }).done((function(r) {
                if (!r.error) {
                    var mainEl;
                    switch(mw.config.get('wgNamespaceNumber')) {
                        case 1201: // Hilos del foro
                        case 1200: // Muros
                        mainEl = '.Wall';
                        break;
                        case 0: // Artículos
                        case 500: // Blogs
                        mainEl = '.WikiaArticleFooter';
                        break;
                        default:
                        return;
                    }
                    $(mainEl).prepend(r.parse.text['*']);
                } else {
                    console.error('[$1] $2'.replace(/\$1/g,r.error.code).replace(/\$2/g,r.error.info));
                }
            }));
        }
    };
 
$(function(){
    warnComments.verify();
});