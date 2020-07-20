(function($, mw, HTMLCSS){
    if (mw.config.get('skin').match(/wikia|oasis/gi)){
        HTMLCSS = {
            ui: {
                modal: function(heading, content, config){
                    var modal =
                        '<section class="HC-modal-blackout HC-blackout"' + ((config.id) ? ' id="' + config.id + '"' : '') + ' data-title="' + heading + '" style="width:' + ((typeof config.width == "number") ? config.width + 'px' : config.width) + '>' +
                            '<div class="HC-modal-wrapper HC-blackout-container">' +
                                '<section class="HC-modal HC-modal-wrapper HC-modal-container">' +
                                    '<header class="HC-modal-header">' +
                                        '<h2 class="HC-modal-heading">' + heading + '</h2>' +
                                        '<a href="javascript:void(0);" class="HC-modal-close-button"></a>' +
                                    '</header>' +
                                    '<article class="HC-modal-content HC-content">' + content + '</article>' +
                                    '<footer class="HC-modal-footer HC-footer">' +
                                        '<nav class="HC-modal-button-wrapper HC-modal-buttons">' +
                                            '<ul>';
                    for (var btn in config.buttons){
                        modal +=
                            '<li class="HC-modal-button">' +
                                ((config.buttons[btn].message.match(/<[^<>](?:.*)>(.*)<\/[^<>](?:.*)>/gi)) ? config.buttons[btn].message : '<a href="javascript:void(0);" class="HC-modal-button-link">' + config.buttons[btn].message + '</a>') +
                            '</li>';
                    }
                    modal += 
                                    '</ul>' +
                                '</nav>' +
                            '</footer>' +
                        '</section>' +
                        '</div>' +
                    '</section>';
                    if (!$('.HC-modal-blackout').length){
                        $('.WikiaSiteWrapper').append(modal);
                    }
                }
            },
            features: {
                swappable: {
                    swap: function(delay, elem, event){
                        var el = elem || '.swap-wrapper';
                        var swappable = $(el).find('.swappable'),
                            swap_arr = swappable.attr('data-txt').split('|'),
                            $span, len = swap_arr.length, c = -1, l, delay = del || swappable.attr('data-delay');
                        $(function insertCSS(){
                            var css = 
                                '.swap-wrapper {\n' +
                                '\tposition: relative;\n' +
                                '}\n' +
                                
                                '.swap-wrapper .swappable {\n' +
                                '\tvertical-align: top;\n' +
                                '\twidth: 0;\n' +
                                '\theight: 0;\n' +
                                '\tdisplay: inline-block;\n' +
                                '}\n' +
                                
                                '.swap-wrapper .swappable .swap-txt {\n' +
                                '\tposition: absolute;\n' +
                                '}';
                            if (!$('style#swappableCSS').length){
                                $(document.head).append(
                                    $('<style />', {
                                        "type": "text/css",
                                        "id": "swappableCSS",
                                        text: css
                                    })
                                );
                            }
                        });
                        delay = (typeof delay == "string") ? (function(){
                            var delay_regex = /([0-9]{1,})(s|m|h|d|w|y)/gi;
                            delay = delay.replace(delay_regex, function convert(key, value, time){ 
                                value = Number(value); 
                                switch (time){ 
                                    case 's': 
                                        value = value * 1000;
                                        break; 
                                    case 'm': 
                                        value = value * convert('', '60', 's');
                                        break;
                                    case 'h': 
                                        value = value * convert('', '60', 'm');
                                        break; 
                                    case 'd': 
                                        value = value * convert('', '24', 'h');
                                        break;
                                    case 'w': 
                                        value = value * convert('', '7', 'd');
                                        break;
                                    case 'y':
                                        value = value * convert('', '365', 'd');
                                        break;
                                }
                                return value; 
                            });
                            return delay;
                        })() : ((typeof delay == "number") ? delay : 1000);
                        Array.prototype.forEach.call(swap_arr, function(text){
                            
                            var color = text.replace(/(?:.*) \[#([0-9a-f]{3,6})\]/gi, '$1'),
                            textRes = text.replace(/(.*) \[#([0-9a-f]{3,6})\]/gi, '$1'),
                            elem = $('<span />', {
                                    "class": "swap-txt",
                                    "data-name": textRes,
                                    text: textRes
                                });
                            if (color.match(/([0-9a-f]{3,6})/gi)){
                                elem.css('color', '#' + color);
                            }
                            swappable.append(elem);
                        });
                        $span = $('span', swappable).hide();
                        
                        if (event) l = swappable.on(event, function loop(){
                                c = ++c % n;
                                swappable.animate({
                                    width: $span.eq(c).width()
                                });
                                $span.stop().fadeOut().eq(c).fadeIn().delay(delay).show(0, loop);
                            });
                        else l = $(function loop(){
                                c = ++c % len;
                                swappable.animate({
                                    width: $span.eq(c).width()
                                });
                                $span.stop().fadeOut().eq(c).fadeIn().delay(delay).show(0, loop);
                            });
                    }
                },
                contextMenu: function(elem){
                    var el = elem || '.ctxMenuTrigger',
                        ctxMenuTrigger = $(el),
                        ctxTxt = ctxMenuTrigger.find('.ctx-wrapper'),
                        ctxList = ctxMenuTrigger.find('.ctx-list');
                    
                    $(el).on('contextmenu', function(event){
                        if (event.ctrlKey && !$('.customCtxMenu').length){
                            event.preventDefault();
                            event.stopPropagation();
                            var ctx_menu = $('<section />', {
                                "class": (function(){
                                    "use strict";
                                    var theme = $(event.target).attr('data-theme'),
                                        c = 'customCtxMenu';
                                    if (theme){
                                        theme = theme.replace(' ', '_');
                                        c += ' ctxMenu-theme-' + theme;
                                    }
                                    return c;
                                })(),
                                css: {
                                    'position': 'absolute',
                                    'top': event.pageY + 'px',
                                    'left': event.pageX + 'px'
                                },
                                html: function createCtxMenu(){
                                    var ctxMenu = (function(){
                                        var cmd = ['Cut', 'Copy', 'Paste'], html = '<ul class="ctxCommands ctxMenuSection">';
                                        
                                        for (var c = 0; c < cmd.length; c++){
                                            if (cmd[c]){
                                                html += '<li class="ctxMenuItem menuitem ctxCommand" data-cmd="' + cmd[c] + '"><a href="javascript:void(0);">' + cmd[c] + '</a></li>';
                                            }
                                        }
                                        html += '</ul>';
                                        return html;
                                    })(), ctxMenuHTML;
                                    var ctxListHTML = ctxList.html();
                                    ctxListHTML = ctxListHTML.replace(/<[^>]a/gi, '<li class="ctxMenuItem menuitem"><a').replace(/<\/[^>]a>/gi, '</a></li>');
                                    ctxListHTML = '<ul class="ctxMenuSection ctxCustom">' + ctxListHTML + '</ul>';
                                    ctxMenuHTML = '<nav class="ctxMenuWrapper ctx-menu">' + ctxListHTML + ctxMenu + '</nav>';
                                    return ctxMenuHTML;
                                }
                            });
                            $('.WikiaSiteWrapper').append(ctx_menu);
                        }
                    });
                },
                /*specBox: function(elem){
                    var el = elem || '.specBox';
                    $(function createSpecBox(){
                        if ($('.specBoxWrapper').length){
                            var spec = $('.specBoxWrapper').attr('data-spec').split('|'),
                                specArr = [];
                            for (var i = 0; i < spec.length; i++){
                                var specDesc = spec[i],
                                    specRegex = /(?:IE|FF|Chrome|Safari|Opera)=([0-9]{1,}|[0-9]{1,}\.[0-9]{1,})/gi,
                                    specVersion = specDesc.replace(specRegex, '$1');
                                if (Number(specVersion) <= 0){
                                    specVersion = 'None';
                                }
                                specArr.push(specVersion);
                            }
                            var specBrowsers = {
                                'IE': {
                                    name: 'Internet Explorer',
                                    specVersion: specArr[0] 
                                },
                                'FF': {
                                    name: 'Firefox',
                                    specVersion: specArr[1]
                                },
                                'Chrome': {
                                    name: 'Chrome',
                                    specVersion: specArr[2]
                                },
                                'Safari': {
                                    name: 'Safari',
                                    specVersion: specArr[3]
                                },
                                'Opera': {
                                    name: 'Opera',
                                    specVersion: specArr[4]
                                }
                            };
                            $(document).ready(function addSpecBox(){
                                var specBox = $('<section />', {
                                    "class": "HTMLCSSSpecBox specBox",
                                    "id": "specBox-" + $('.specBoxWrapper').attr('data-elem'),
                                    html: function(){
                                        var specBoxHTML =
                                            '<header class="specBoxHeader' + (function(){
                                                var collapsible = $('.specBoxWrapper').attr('data-elem'),
                                                    value = Boolean(collapsible), c;
                                                switch (value){
                                                    case true:
                                                        c = ' ';
                                                        c += 'collapse_trigger';
                                                        break;
                                                    case false:
                                                        c = '';
                                                }
                                                return c;
                                            })() + '">' +
                                            '<h1>' + (($('.specBoxWrapper').attr('data-lang') == "HTML") ? '&lt;' + $('.specBoxWrapper').attr('data-elem') + '&gt; ' : $('.specBoxWrapper').attr('data-elem')) + ' Support</h1>' +
                                            '</header>' +
                                            '<nav class="specBoxContent specContent"><ul>';
                                        for (var name in specBrowsers){
                                            specBoxHTML +=
                                                '<li class="specSection-' + name + '">' +
                                                    '<h2>' + specBrowsers[name].name + '</h2>' +
                                                    '<div class="specVersion specBrowser" data-version="' + specBrowsers[name].specVersion + '" data-browser="' + specBrowsers[name].name + '">' +
                                                        '<img src="' + (function(){
                                                            var img;
                                                            $.get('/wiki/File:' + name + 'logo.svg', function insertImage(data){
                                                                var d = $(data),
                                                                    imageBase = $(d).find('.fullImageLink > a')[0],
                                                                    image = imageBase.find('img').attr('src');
                                                                img = image;
                                                            });
                                                            return img;
                                                        })() + '" style="width: 50px; height: 50px;" class="specImage" /><span class="specVersionLabel">' + specBrowsers[name].specVersion + '</span>' +
                                                    '</div>' +
                                                '</li>';
                                        }
                                        specBoxHTML += 
                                                '</ul>' + 
                                            '</nav>' +
                                        '</section>';
                                        return specBoxHTML;
                                    }
                                });
                                $('.specBoxWrapper').append(specBox);
                            });
                        }
                    });
                },*/
                /*tooltip: function(){
                    var tooltip_content = {
                        'User': {
                            content: null,
                            theme: null
                        }
                    };
                    $(function addTooltip(){
                        var simp_tooltip_elem = ['a', 'span', 'em', 'var', 'kbd', 'strong'].join(', '),
                            adv_tooltip_elem = ['div', 'section', 'article', 'nav', 'footer', 'header'].join(', '),
                            tooltip_elem = window.Array.prototype.concat.call(simp_tooltip_elem, adv_tooltip_elem).join(', ');
                        onload = function tooltip(){
                            if ($('.tooltip-wrapper').is(simp_tooltip_elem)){
                                if (!$('.tooltip').length){
                                    $('.tooltip-wrapper').append(function(){
                                        var tooltip_content = $(this).attr('data-tooltip');
                                        var tooltip_html = '<span class="tooltip">' + tooltip_content + '</span>';
                                        return tooltip_html;
                                    });
                                }
                            } else if ($('.tooltip-wrapper').is(adv_tooltip_elem)){
                                if (!$('.tooltip.advanced').length){
                                    if ($('.tooltip-wrapper').attr('data-name')){
                                        var tooltip_html = null;
                                        switch ($('.tooltip-wrapper').attr('data-name')){
                                            case 'User':
                                                tooltip_html = tooltip_content['User'].content;
                                                break;
                                            default: 
                                                return false;
                                        }
                                        $('.tooltip-wrapper').append(function(){
                                            var tooltip = $('<section />', {
                                                'class': 'tooltip advanced',
                                                html: tooltip_html
                                            });
                                            return tooltip;
                                        });
                                    }
                                }
                            }
                            
                            $('.tooltip-wrapper').each(function(index){
                                var effects = $(this).attr('data-effects');
                                switch (effects){
                                    case 'fade':
                                        $(this).animate({
                                            'opacity': '0'
                                        }, 'slow', function(){
                                            $(this).hide();
                                        });
                                }
                            });
                        };
                    });
                },*/
                navigation: function(){
                    $(function createNavigation(){
                        if ($('.navigation-values').length){
                        $('.navigation-values').each(function(){
                            var links = $(this).text().split('|').sort(),
                                type = $(this).attr('data-type'),
                                title = $(this).attr('data-title'),
                                overflow = ($(this).attr('data-overflow') && !isNaN(Number($(this).attr('data-overflow')))) ? Number($(this).attr('data-overflow')) : '';
                            var navigation_html = 
                                '<nav class="page-navigation' + ((type) ? ' page-navigation-' + type : '') + ' navigation page-nav">' +
                                    ((title) ? 
                                    '<header class="page-navigation-header page-nav-header">' +
                                        '<h2>' + title + '</h2>' +
                                    '</header>' : '') +
                                    '<ul class="page-navigation-list page-nav-list">';
                            for (var i = 0; i < links.length; i++){
                                if (overflow){
                                    if (i < overflow && overflow){
                                        navigation_html += 
                                        '<li class="page-nav-link page-navigation-link nav-link">' +
                                            '<a href="/wiki/' + encodeURIComponent(links[i]) + '">' + ((type == 'html') ? '&lt;' + links[i].toLowerCase() + ((links[i].match(/link|meta|param|base|source|br|keygen|embed|img|input|wbr|hr|track|col|area/gi) ? ' /' : '')) + '&gt;' : links[i]) + '</a>' +
                                        '</li>';
                                    } else if (i >= overflow && overflow){
                                        if (i == overflow){
                                            navigation_html +=
                                            '<li class="page-nav-link nav-more-link toggle-container">' +
                                                '<a href="javascript:void(0);" class="more-link toggle">More <span class="chevron"></span></a>' +
                                                '<ul class="page-nav-subnav overflow-links page-nav-overflow">' +
                                                    '<li class="page-nav-link page-navigation-link nav-link">' +
                                                        '<a href="/wiki/' + encodeURIComponent(links[i]) + '">' + ((type == 'html') ? '&lt;' + links[i].toLowerCase() + ((links[i].match(/link|meta|param|base|source|br|keygen|embed|img|input|wbr|hr|track|col|area/gi) ? ' /' : '')) + '&gt;' : links[i]) + '</a>' +
                                                    
                                                    '</li>';
                                        } else if (i > overflow && i < links.length - 1 && overflow){
                                            navigation_html +=
                                            '<li class="page-nav-link page-navigation-link nav-link">' +
                                                '<a href="/wiki/' + encodeURIComponent(links[i]) + '">' + ((type == 'html') ? '&lt;' + links[i].toLowerCase() + ((links[i].match(/link|meta|param|base|source|br|keygen|embed|img|input|wbr|hr|track|col|area/gi) ? ' /' : '')) + '&gt;' : links[i]) + '</a>' +
                                                    
                                            '</li>';
                                        } else if (overflow){
                                            navigation_html +=
                                                '<li class="page-nav-link page-navigation-link nav-link">' +
                                                    '<a href="/wiki/' + encodeURIComponent(links[i]) + '">' + ((type == 'html') ? '&lt;' + links[i].toLowerCase() + ((links[i].match(/link|meta|param|base|source|br|keygen|embed|img|input|wbr|hr|track|col|area|menuitem/gi) ? ' /' : '')) + '&gt;' : links[i]) + '</a>' +
                                                    
                                                '</li>' +
                                                '<li class="page-nav-link nav-less-link toggle-container">' +
                                                    '<a href="javascript:void(0);" class="less-link toggle">Less <span class="chevron"></span></a>' +
                                                '</li>' +
                                            '</ul>' +
                                        '</li>';
                                        }
                                    }
                                } else {
                                    navigation_html += 
                                        '<li class="page-nav-link page-navigation-link nav-link">' +
                                            '<a href="/wiki/' + encodeURIComponent(links[i]) + '">' + ((type == 'html') ? '&lt;' + links[i].toLowerCase() + ((links[i].match(/link|meta|param|base|source|br|keygen|embed|img|input|wbr|hr|track|col|area/gi) ? ' /' : '')) + '&gt;' : links[i]) + '</a>' +
                                        '</li>';
                                }
                            }
                            navigation_html += 
                                '</ul>' +
                            '</nav>';
                            $(this).replaceWith(navigation_html);
                        });
                        }
                    });
                    $(function initEvents(){
                        var state = 0;
                        $('.page-nav-subnav').css({
                            'opacity': '0',
                            'display': 'none',
                            'top': '100%'
                        });
                        $('.page-navigation').each(function(){
                            $('.toggle', $(this)).on('click', function(event){
                                if (state === 0){
                                    $(event.target).next('.page-nav-subnav').show().delay(500).animate({
                                        'opacity': '1',
                                        'top': '-6px'
                                    }, 1000);
                                    state = 1;
                                }
                                else {
                                    $(event.target).parents('.page-nav-subnav').delay(500).animate({
                                        'opacity': '0',
                                        'top': '100%'
                                    }, 1000, function(){
                                        $(this).hide();
                                    });
                                    state = 0;
                                }
                            });
                        });
                    });
                },
                mainPageSection: function(){
                    $(function createMainPageSection(){
                        if ($('.main-page-section-cont').length){
                            var section_html = $('.main-page-section-cont').html(),
                                section_title = $('.main-page-section-cont').attr('data-title'),
                                section_type = $('.main-page-section-cont').attr('data-type');
                            var mp_section =
                                '<section class="main-page-section mp-section' + ((!section_type.match(/None/gi) && section_type) ? ' ' + section_type.split(' ').join('_') : '') + '"' + ((!section_type.match(/None/gi) && section_type) ? ' data-type="' + section_type + '"' : '') + '>' +
                                    ((!section_title.match(/None/gi) && section_title) ? '<header class="main-page-section-header mp-section-header"><h2>' + section_title + '</h2></header>' : '') +
                                    '<div class="main-page-content mp-section-content">' + section_html + '</div>' +
                                '</section>';
                            setTimeout(function insertMPSection(){
                                $('.main-page-section-cont').replaceWith(mp_section);
                            }, 500);
                        }
                    });
                },
                tabs: function(){
                    $(function createTabs(){
                        if ($('.tab-cont').is('div, p, blockquote') && $('.tab-cont')){
                            $('.tab-cont').each(function(){
                                var tab_type = $(this).attr('data-type') || '',
                                    tabs = $(this).find('.tab-values').text().split('|'),
                                    tab_cont = $(this).find('.tab-content').html(),
                                    tab_html = '';
                                if (tab_type.match(/tabber|tabs|tabview|tab|tabbed/gi)){
                                    tab_type = "tabs";
                                    tab_html += 
                                        '<section class="tabbed-navigation tab-nav tab-wrapper"' + (($(this).attr('data-id')) ? ' id="tab-nav-' + $(this).attr('data-id') + '"' : '') + '>' +
                                            '<header class="tab-container tab-nav-header tab-header">' +
                                                '<nav class="tab-nav-container">' +
                                                    '<ul class="tab-nav-list">';
                                    for (var i = 0; i < tabs.length; i++){
                                        tab_html +=
                                            '<li class="nav-tab tab">' +
                                                '<a href="javascript:void(0);" class="tab-link" data-tab-title="' + tabs[i] + '">' + tabs[i] + '</a>' +
                                            '</li>';
                                    }
                                    tab_html += '</ul>' +
                                            '</nav>' +
                                        '</header>';
                                    tab_html += '<article class="tab-content tab-nav-content">' + tab_cont + '</article>' +
                                    '</section>';
                                }
                                $(this).replaceWith(tab_html);
                            });
                            
                            $(function init(){
                                
                            });
                        }
                    });
                },
                createbox: function(){
                    $(function initCreatebox(){
                        var form_name = $('span.createbox-val').attr('data-name'),
                            namespace = ($('span.createbox-val').attr('data-ns')) ? $('span.createbox-val').attr('data-ns') : '',
                            placeholder = ($('span.createbox-val').attr('data-placeholder')) ? $('span.createbox-val').attr('data-placeholder')  : 'Type here!',
                            Name = (!namespace || namespace == 'Main') ? '-' + namespace.replace(' ', '_') : '',
                            create_box =
                                '<form class="WikiaForm HC-createbox create-box-form" id="create-box-form">' +
                                    '<section class="HC-createbox-input-wrapper create-box-input-wrapper">' +
                                        '<label class="HC-input-placeholder HC-createbox-placeholder create-box-placeholder" for="HC-createbox-input' + Name + '">' + placeholder + '</label>' +
                                        '<input type="text" value="" class="HC-input HC-createbox-input create-box-input" id="HC-createbox-input' + Name + '" />' +
                                    '</section>' +
                                    '<section class="HC-createbox-button-wrapper HC-createbox-submit-wrapper create-box-submit">' +
                                        '<button class="HC-createbox-button HC-createbox-submit">Create</button>' +
                                    '</section>' +
                                '</form>';
                        $('span.createbox-val').replaceWith(create_box);
                    });
                    
                    /*$(function initEvents(){
                        $('.HC-createbox-submit').on('click', function(){
                            HTMLCSS.ui.modal('Create', modal_html, {
                               buttons: {
                                   'Cancel': {
            
                                   }
                               } 
                            });
                        });
                    });*/
                }
            },
            load: function(){
                $(function loadFeatures(){
                    HTMLCSS.features.swappable.swap();
                    // HTMLCSS.features.contextMenu();
                    // HTMLCSS.features.specBox();
                    HTMLCSS.features.navigation();
                    HTMLCSS.features.mainPageSection();
                    HTMLCSS.features.tabs();
                });
            },
            load2: function(key, val, callback){
                switch (key){
                    case 'features':
                        if (typeof val == 'object'){
                            for (var f in val){
                                switch (f){
                                    case 'swappable':
                                        if (typeof val[f] == 'function'){
                                            HTMLCSS.features.swappable.swap();
                                            val[f].call(this);
                                        }
                                        else if (val[i] === true) HTMLCSS.features.swappable.swap();
                                        else return false;
                                        break;
                                    default:
                                        if (typeof val[f] == 'function'){
                                            HTMLCSS.features[f]();
                                            val[f].call(this);
                                        }
                                        else if (val[i] === true) HTMLCSS.features[f]();
                                        else return false;
                                }
                            }
                        } else {
                            switch (val){
                                case 'swappable':
                                    HTMLCSS.features.swappable.swap();
                                    break;
                                default:
                                    HTMLCSS.features[f]();
                            }
                            if (callback) callback.call(this);
                        }
                }
            }
        };
        HTMLCSS.load();
        return HTMLCSS;
    }
})(this.jQuery, this.mediaWiki, this.htmlcss);