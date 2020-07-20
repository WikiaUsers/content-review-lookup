;(function(mw, $, config, modules){
    var mwVars = mw.config.get([
            'wgUserName',
            'wgCanonicalSpecialPageName',
            'wgPageName',
            'wgUserLanguage',
            'wgChatEmoticons',
            'wgServer'
        ]),
        sidebar_settings = $.extend(config, {
            version: '0.1.0 alpha',
            collapsed: true,
            setCookie: function(cookie_name, data){
                var domain = mwVars.wgServer.replace(/http:\/\/(.*)/gi, '$1');
                document.cookie =
                    cookie_name + '=' + data +
                    '; max-age=' + 60*60*24*150 +
                    '; path=/; domain=' + domain;
            },
            getCookie: function(cookie_name, pos){
                var x, y, cookie_array = document.cookie.split(';');
                for (var i = 0; i < cookie_array.length; i++){
                    x = cookie_array[i].substr(0, cookie_array[i].indexOf('='));
                    y = cookie_array[i].substr(cookie_array[i].indexOf('=') + 1);
                    x = x.replace(/^\s+|\s+$/g,"");
 
                    if (x == cookie_name){
                        var style_obj = y.split(/\,(?:\s+|)/g);
                        return unescape(style_obj[pos]);
                    }
                }
            },
            insertModule: function(name, object){
                if (!sidebar_modules.hasOwnProperty(name)){
                    sidebar_modules[name] = object;
                }
            },
            removeModule: function(name){
                if (sidebar_modules.hasOwnProperty(name)){
                    delete sidebar_modules[name];
                }
            },
            isImported: function(script){
                var script_name = script.replace(/\s+/g, '_'),
                    isCSS = /(.*)\.css/.test(script_name),
                    isJS = /(.*)\.js/.test(script_name),
                    value = null, $el = null;
                if (isCSS){
                    $el = $('link[href*="' + script_name + '"]');
                    if ($el.exists()) value = true;
                    else value = false;
                } else if (isJS){
                    $el = $('script[src*="' + script_name + '"]');
                    if ($el.exists()) value = true;
                    else value = false;
                } else {
                    return;
                }
                return value;
            },
            getAllUsers: function(exclusions){
                var users = null;
                if (typeof exclusions !== 'undefined'){
                    users = mainRoom.model.users.map(function(child){
                        var type = exclusions.type,
                            target = exclusions.target,
                            isExcluded = null;
                        switch (type){
                            case 'users':
                                if (typeof target == 'object' && target instanceof Array){
                                    isExcluded = target.some(function(name){
                                        return child.attributes.name == name;
                                    });
                                } else {
                                    isExcluded = (child.attributes.name == target);
                                }
                                if (!isExcluded) return child.attributes.name;
                                break;
                            case 'groups':
                                if (typeof target == 'object' && target instanceof Array){
                                    isExcluded = target.some(function(group){
                                        return child.attributes.groups.indexOf(group) > -1;
                                    });
                                } else {
                                    isExcluded = child.attributes.groups.indexOf(target) > -1;
                                }
                                if (!isExcluded) return child.attributes.name;
                                break;
                            default:
                                throw new SyntaxError('The "type" property is required in the exclusions argulent.');
                        }
                    });
                } else {
                    users = mainRoom.model.users.map(function(child){
                        return child.attributes.name;
                    });
                }
                return users.filter(function(name){
                    return name !== void(name);
                });
            },
            moduleExists: function(name){
                return sidebar_modules.hasOwnProperty(name);
            }
        }),
        sidebar_ui = {
            createList: function(array, settings){
                var $list = $('<ul class="list sidebar-list dynamic-list" />');
                settings = settings || {};
                if (settings.id) $list.attr('id', settings.id);
                array.forEach(function(item, index){
                    var $li = $('<li class="list-item dynamic-item" />');
                    if (settings.noLink){
                        $li.html(item);
                    } else {
                        $li.html(
                            $('<a href="#" class="list-link link" />').html(item).on('click', function(event){
                                event.preventDefault();
                            })
                        );
                    }
                    $list.append($li);
                });
                return $list;
            }
        },
        sidebar_modules = $.extend(modules, {
            'Pings': {
                open: true,
                enabled: true,
                id: 'pinglist-item',
                content: sidebar_ui.createList(sidebar_settings.pingList || [], {
                    customizable: true,
                    id: 'pinglist'
                }),
                handler: function($target){
                    var $pinglist = $target.find('#pinglist'),
                        pings = [];
                        
                    setInterval(function(){
                        $pinglist.find('> li > a').each(function(index){
                            var ping = $(this).text();
                            if (ping !== '')
                                pings[index] = ping;
                        });
                    }, 500);
                    
                    mainRoom.model.chats.bind('afteradd', function(child){
                    });
                }
            }
        });
})(this.mediaWiki, this.jQuery, (window.ChatSidebar = window.ChatSidebar || {}), (window._modules = window._modules || {}));