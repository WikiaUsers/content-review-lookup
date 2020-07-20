(function(mw, $, window, templates){
    if (
        ['edit', 'history', 'delete'].indexOf(mw.config.get('wgAction', wgAction)) > -1 ||
        [0, 1].indexOf(mw.config.get('wgNamespaceNumber', wgNamespaceNumber)) === -1
    ) return;
    templates = $.extend(templates, {
        stub: {
            templateName: 'Stub',
            templateFormat: '{{Template:Stub}}',
            placement: 'prepend'
        },
        'delete': {
            templateName: 'Delete',
            templateFormat: '{{Template:Delete}}',
            placement: 'replace'
        },
        fairUse: {
            templateName: 'Fair Use',
            templateFormat: '{{Template:Fairuse}}',
            placement: 'prepend'
        },
        publicDomain: {
            templateName: 'Public Domain',
            templateFormat: '{{Template:PD}}',
            placement: 'prepend'
        },
        creativeCommons: {
            templateName: 'Creative Commons',
            templateFormat: '{{Template:CC-BY-SA}}',
            placement: 'prepend'
        }
    });
    
    function GetWikitext(page, callback){
        var p = new Promise(function(resolve, reject){
            $.ajax({
                method: 'GET',
                dataType: 'text',
                url: mw.util.wikiScript('index'),
                data: {
                    title: page,
                    action: 'raw',
                    ctype: 'text/plain'
                }
            }).done(function(data){
                if (!data.error){
                    resolve(data, page);
                } else {
                    reject(data.error, page);
                }
            }).fail(function(error){
                reject(error, page);
            });
        });
        if (typeof callback == 'Object' && !(callback instanceof Array)){
            p.then(callback.complete || callback.done, callback.fail || callback.error || function(){});
        } else if (typeof callback == 'function'){
            p.then(callback);
        } else {
            return p;
        }
    }
    
    $(document).ready(function(){
        var $menu = $('<nav />', {
                'class': 'TemplateMenu context menu',
                'id': 'TemplateMenu'
            }),
            $heading = $('<h1 />', {
                'class': 'TemplateMenuHeader context-header menu-header',
                text: 'Quick Templates'
            }),
            $list = $('<ul />', {
                'class': 'TemplateMenuList context-list menu-list',
                html: $.map(templates, function(obj, id){
                    var $li = $('<li />', {
                        'class': 'TemplateMenuItem context-item menu-item item',
                        'id': 'template-' + id,
                        html: $('<a />', {
                            'class': 'TemplateItemLink context-link menu-link',
                            'href': '#TemplateMenu',
                            text: obj.templateName || 'Unknown'
                        }).on('click', function(event){
                            $('#TemplateMenu').remove();
                            GetWikitext(mw.config.get('wgPageName', wgPageName), {
                                complete: function(text, page){
                                    var placement = obj.placement,
                                        template = obj.templateFormat,
                                        add = {
                                            'prepend': function(txt, content){
                                                return txt + content;
                                            },
                                            'append': function(txt, content){
                                                return content + txt;
                                            },
                                            'replace': function(txt, content){
                                                return txt;
                                            }
                                        };
                                    var res = Function.prototype.apply.call(add[placement], window, [template, text]);
                                    $.ajax({
                                        method: 'POST',
                                        dataType: 'json',
                                        url: mw.util.wikiScript('api'),
                                        data: {
                                            title: page,
                                            action: 'edit',
                                            text: res,
                                            token: mw.user.tokens.values.editToken
                                        }
                                    }).always(function(){
                                        window.location.reload();
                                    });
                                },
                                fail: function(error, page){
                                    $.ajax({
                                        method: 'POST',
                                        dataType: 'json',
                                        url: mw.util.wikiScript('api'),
                                        data: {
                                            title: page,
                                            action: 'edit',
                                            text: obj.templateFormat,
                                            token: mw.user.tokens.values.editToken
                                        }
                                    }).always(function(){
                                        window.location.reload();
                                    });
                                }
                            });
                        })
                    });
                    return $li;
                })
            });
        $menu.html([$heading, $list]);
        $(window).on('contextmenu', function(event){
            if (event.ctrlKey && $(event.target).is('#WikiaPage, #WikiaPage *')){
                if (!$('#TemplateMenu').length){
                    event.preventDefault();
                    $menu.css({
                        'top': event.pageY,
                        'left': event.pageX
                    });
                    $('#WikiaSiteWrapper').append($menu);
                } else {
                    $('#TemplateMenu').remove();
                    $menu.css({
                        'top': event.pageY,
                        'left': event.pageX
                    });
                    $('#WikiaSiteWrapper').append($menu);
                }
            }
        });
        
        $(window).on('click', function(event){
            if (!$(event.target).is('#TemplateMenu, #TemplateMenu *')){
                $('#TemplateMenu').remove();
            }
        });
    });
})(this.mediaWiki, this.jQuery, this, this.templates = this.templates || {});