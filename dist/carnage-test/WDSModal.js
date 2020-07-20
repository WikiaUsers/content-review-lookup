window.WDSModal = (function(mw, $){
    var WDSModal = {};
    WDSModal.createModal = function(config){
        var $modal = $('<div />', { 'class': 'wds-modal-blackout wds-blackout' }),
            $modalWrapper = $('<section />', { 'class': 'wds-modal-wrapper wds-modal', 'id': config.id, 'data-width': config.width, 'data-title': config.title });
        $modalWrapper.html(() => {
            var $header = $('<header />', { 'class': 'wds-modal-header' }),
                $content = $('<article />', { 'class': 'wds-modal-content' }),
                $footer = $('<footer />', { 'class': 'wds-modal-footer wds-modal-toolbar' }),
                content = config.content;
                
            $header.html(() => {
                return $('<h1 />', {
                    'class': 'wds-modal-heading wds-heading',
                    text: config.heading
                });
            });
            
            if (typeof content == 'object'){
                var type = config.content.type,
                    value = config.content.value;
                if (type === 'html'){
                    $content.html(value);
                } else if (type === 'tabs'){
                    var html = this.createTabs(value);
                    $content.addClass('wds-no-padding');
                    $content.html(html);
                }
            } else {
                $content.html(content);
            }
            
            $footer.html(() => {
                var len = Object.keys(config.buttons).length,
                    keys = Object.keys(config.buttons),
                    $elem = null;
                if (len > 1){
                    $elem = $('<nav />', { 'class': 'wds-button-group' });
                    var $buttons = keys.map(name => {
                        var value = config.buttons[name],
                            $el = $('<a />', {
                                'class': 'wds-button wds-is-squished',
                                'id': value.id,
                                'href': '#',
                                text: name,
                                on: { 
                                    'click': event => { 
                                        event.preventDefault();
                                        value.handler.apply(this, [event]);
                                    } 
                                }
                            });
                        if (typeof value.defaultButton !== 'boolean' || !value.defaultButton){
                            $el.addClass('wds-is-secondary');
                        }
                        return $el;
                    });
                    $elem.html($buttons);
                } else {
                    var _name = keys[0],
                        value = config.buttons[_name];
                    $elem = $('<a />', {
                        'class': 'wds-button wds-is-squished',
                        'id': value.id,
                        'href': '#',
                        text: _name,
                        on: { 
                            'click': event => { 
                                event.preventDefault();
                                value.handler.apply(this, [event]);
                            } 
                        }
                    });
                }
                return $elem;
            });
            return [$header, $content, $footer];
        });
        $modal.html($modalWrapper);
        $modal.on('click', event => {
            if (event.target == event.delegateTarget){
                $(event.target).remove();
            }
        });
        return $modal;
    };
    WDSModal.createTabs = function(config){
        var $tabs = $('<nav />', { 'class': 'wds-tabs-container wds-vertical-container', 'id': config.id });
        $tabs.html(() => {
            var tabs = config.tabs,
                tabsItems = Object.keys(tabs).map(name => {
                    var tabItemObj = tabs[name],
                        $tab = $('<li />', { 'class': 'wds-tab wds-vertical-tab' }),
                        $link = $('<a />', { 'class': 'wds-tab-link wds-vertical-tab-link', 'id': tabItemObj.id, 'href': '#', 'data-content-id': tabItemObj.contentId, text: name });
                    $link.on('click', event => {
                        var contentId = (event.delegateTarget || event.target).data('id'),
                            $content = $('#' + contentId);
                        if (!$('.wds-tab-content.show').is('#' + contentId)){
                            $('.wds-tab-content.show').removeClass('show');
                            $content.addClass('show');
                        }
                    });
                    return $link;
                }),
                tabsContent = Object.keys(tabs).map(function(name){
                    var tabItemObj = tabs[name],
                        $tabContent = $('<div />', { 'class':'wds-tab-content wds-vertical-tab-content wds-content', 'id': tabItemObj.contentId, html: tabItemObj.tabContent });
                    if (typeof tabItemObj !== 'boolean' || !tabItemObj.defaultTab){
                        $tabContent.hide();
                    }
                    return $tabContent;
                });
            return [tabsItems, tabsContent];
        });
        return $tabs;
    };
    WDSModal.open = function(config){
        return new Promise((resolve, reject) => {
            var $modal = this.createModal(config);
            if ($('#' + $modal.children().eq(0).attr('id')).length) reject();
            else {
                $('body').append($modal);
                var $modalSelector = $('#' + $modal.children().eq(0).attr('id'));
                resolve($modal, config);
            }
        });
    };
    WDSModal.close = function($modal){
        if ($modal.is('.wds-modal')){
            var $parent = $modal.parent();
            if ($modal.parent().is('.wds-modal-blackout')){
                $parent.remove();
            }
        } else if ($modal.is('.wds-modal-blackout')){
            $modal.remove();
        }
    };
    WDSModal.getData = function($elem, selector){
        var $target = null;
        if (typeof selector === 'undefined'){
            $target = $elem;
        } else {
            $target = $elem.find(selector);
        }
        
        var target_node = $target.get(0);
        if (target_node.hasAttributes()){
            var attributes = [].slice.call(target_node.attributes),
                result = {};
            attributes = attributes.filter(function(attribute){
                var name = attribute.name;
                return (/^data-([\w\d\-]+)/).test(name);
            });
            Array.prototype.forEach.call(attributes, (attribute) => {
                result[attribute.name] = attribute.value;
            });
            return result;
        } else {
            return null;
        }
    };
    WDSModal.addCSS = function(){
        var $css = $('<style />', { 'id': 'WDSModalCSS', 'type': 'text/css' });
        var cssText =
            '.wds-modal-wrapper { \
                background-color: ' + mw.config.get('wgSassParams')['color-page'] + '; \
            } \
            .wds-modal-header { \
                background-color: ' + mw.config.get('wgSassParams')['color-community-header'] + '; \
            } \
            .wds-modal-footer { \
                background-color: ' + mw.config.get('wgSassParams')['color-body'] + '; \
            }';
        $css.text(cssText);
        if (!$('#WDSModalCSS').length) $(document.body).append($css);
    };
    $(WDSModal.addCSS);
    return WDSModal;
}(mediaWiki, jQuery));