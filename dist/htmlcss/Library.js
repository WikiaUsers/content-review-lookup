var Libs = {};

Libs = $.extend(Libs, {
    getMediaWikiMessage: function(name){
        return new Promise(function(resolve, reject){
            $.get(mw.util.wikiScript('index'), {
                title: 'MediaWiki:' + name,
                action: 'raw',
                ctype: 'text/plain'
            }).done(function(data){
                if (data.error) reject(data.error);
                else {
                    resolve(data);
                }
            }).fail(function(error){
                reject(error);
            });
        });
    },
    getPage: function(name){
        return new Promise(function(resolve, reject){
            mw.loader.using('mediawiki.api').then(function(){
                var Api = new mw.Api();
                Api.get({
                    action: 'parse',
                    page: name,
                    format: 'json'
                }).done(function(data){
                    if (data.error) reject(data.error);
                    else {
                        resolve(data);
                    }
                }).fail(function(error){
                    reject(error);
                });
            });
        });
    }
});