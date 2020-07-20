var HTMLCSSApi = window.HCApi = window.htmlcss_api = {
    importArticles: function(){
        if (!arguments) return;
        for (var i = 0; i < arguments.length; i++){
            var settings = arguments[i],
                type = arguments[i].type,
                wikis = arguments[i].wikis;
            for (var wiki_name in wikis){
                var s = wikis[wiki_name];
                for (var url in s){
                    if (typeof s[url] == 'function'){
                        if (type == 'style'){
                            if (wiki_name == 'dev')
                                importStylesheetPage(url + '/code.css', wiki_name);
                            else if (wiki_name == 'dev/alt')
                                importStylesheetPage(url, 'dev');
                            else importStyleSheetPage(url, wiki_name);
                        }
                        else if (type == 'script'){
                            if (wiki_name == 'dev')
                                importScriptPage(url + '/code.js', wiki_name);
                            else if (wiki_name == 'dev/alt')
                                importScriptPage(url, 'dev');
                            else importScriptPage(url, wiki_name);
                        }
                        else return false;
                        s[url].call(url, wiki_name);
                    } else if (s[url] === true){
                        if (type == 'style'){
                            if (wiki_name == 'dev')
                                importStylesheetPage(url + '/code.css', wiki_name);
                            else if (wiki_name == 'dev/alt')
                                importStylesheetPage(url, 'dev');
                            else importStylesheetPage(url, wiki_name);
                        }
                        else if (type == 'script'){
                            if (wiki_name == 'dev')
                                importScriptPage(url + '/code.js', wiki_name);
                            else if (wiki_name == 'dev/alt')
                                importScriptPage(url, 'dev');
                            else importScriptPage(url, wiki_name);
                        }
                        else return false;
                    } else {
                        return false;
                    }
                }
            }
        }
    },
    createModule: function(config, selector){
        var heading = config.heading,
            content = config.content,
            insert = config.insert_method,
            insertType = config.insert_type,
            onAdd = config.onAdd,
            elem = (typeof selector == "string") ? selector : '.ChatModule',
            module;
        if (heading && content && insert){
            module = $('<section />', {
                'class': heading.replace(/ /gi, '') + 'Module module',
                'id': heading.replace(/ /gi, '') + 'Module',
                html: function addModuleHTML(){
                    var moduleHTML =
                        '<h2>' + heading + '</h2>' + content;
                    return moduleHTML;
                }
            });
            switch (insert){
                case 'after':
                    if (insertType == 'afterLoad') $('.WikiaRail').on('DOMNodeInserted', function(){
                        $(elem).after(module);
                    });
                    break;
                case 'before':
                    if (insertType == 'afterLoad') $('.WikiaRail').on('DOMNodeInserted', function(){
                        $(elem).before(module);
                    });
                    break;
                default:
                    $('.WikiaRail').append(module);
            }
        }
        this.addButton = function(config){
            if (module){
                var button = $('<a />', {
                    'class': 'wikia-button' + ((config.defaultButton === false) ? ' secondary' : ''),
                    'id': config.id,
                    'href': ((config.link === true) ? config.href : 'javascript:void(0);'),
                    text: config.buttonText,
                    on: {
                        'click': config.handler
                    }
                });
                switch (config.add){
                    case 'append':
                        module.append(button);
                        break;
                    case 'prepend':
                        module.prepend(button);
                        break;
                    default:
                        return false;
                }
            }
        };
    }
};