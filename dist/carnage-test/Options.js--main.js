(function($, mw, mainRoom){
    var ChatFeatures = $.extend({}, window.ChatFeatures);
    ChatFeatures.getItem = function(item){
        var storage = localStorage.getItem('ChatFeatures'),
            object = JSON.parse(storage),
            value = null;
        if (object.hasProperty(item)){
            value = object[item];
            return value;
        }
        return null;
    };
    ChatFeatures.getObject = function(){
        var storage = localStorage.getItem('ChatFeatures'),
            object = JSON.parse(stroage);
        return object;
    };
    ChatFeatures.setItem = function(item, value){
        var storage = localStorage.getItem('ChatFeatures'),
            object = JSON.parse(storage),
            string = '';
        object[item] = value;
        string = JSON.stringify(object);
        localStorage.setItem('ChatFeatures', string);
    };
    ChatFeatures.windowRestart = function(delay){
        if (!isNaN(delay)){
            delay = typeof delay === 'number' ? delay : parseInt(delay, 10);
            setTimeout(() => {
                window.location.reload();
            }, delay);
        } else {
            window.location.reload();
        }
    };
    ChatFeatures.modules = $.extend({}, ChatFeatures.modules);
    ChatFeatures.look = $.extend({
        fontColor: {
            value: ChatFeatures.getItem('fontColor'),
            target: '#fontColor',
            update: function(){
                var selectors = ['#WikiaPage', '#Write [name="message"]', '.User .username'];
                $(selectors.join(', ')).css('color', this.value);
            },
            load: function(){
                var $target = $(this.target);
                $target.val(this.value);
                $target.parent().find('.color-box').data('color', this.value).css('background-color', this.value);
            },
            setValue: function(){
                var value = $(this.target).val();
                this.value = value;
                ChatFeatures.setItem('fontColor', value);
            }
        },
        fontFamily: {
            value: ChatFeatures.getItem('fontFamily'),
            target: '#fontFamily',
            update: function(){
                var selectors = ['#WikiaPage', '.Chat', '#Rail', '#ChatHeader'];
                $(selectors.join(', ')).css('font-family', this.value);
            },
            load: function(){
                var $target = $(this.target);
                $target.find('.combobox-input').val(this.value);
                $target.find('.combobox-list > li[data-item="' + this.value + '"]').addClass('selected');
            },
            setValue: function(){
                var value = $(this.target).find('.combobox-input').val();
                this.value = value;
                ChatFeatures.setItem('fontFamily', value);
            }
        },
        surroundBackground: {
            value: ChatFeatures.getItem('surroundBackground'),
            target: '#surroundBackground',
            update: function(){
                var selectors = ['body.ChatWindow'];
                $(selectors.join(', ')).css('background', this.value);
            },
            load: function(){
                var $target = $(this.target);
                $target.val(this.value);
                $target.parent().find('.color-box').data('color', this.value).css('background-color', this.value);
            },
            setValue: function(){
                var value = $(this.target).val();
                this.value = value;
                ChatFeatures.setItem('surroundBackground', value);
            }
        },
        selfPostBackground: {
            value: ChatFeatures.getItem('selfPostBackground'),
            target: '#selfPostBackground',
            update: function(){
                var selectors = ['.Chat li.you'],
                    $css = $('<style />', { 'id': 'selfPostColorCSS', 'type': 'text/css' }),
                    cssText = selectors.join(', ') + ' { \
                        background: ' + this.value + ' !important; \
                    }';
                $css.text(cssText);
                if ($('style#selfPostColorCSS').length){
                    $('style#selfPostColorCSS').replaceWith($css);
                } else {
                    $('body.ChatWindow').prepend($css);
                }
            },
            load: function(){
                var $target = $(this.target);
                $target.val(this.value);
                $target.parent().find('.background-box').data('background', this.value).css('background', this.value);
            },
            setValue: function(){
                var value = $(this.target).val();
                this.value = value;
                ChatFeatures.setItem('selfPostBackgroundColor', value);
            }
        },
        chatBackground: {
            value: ChatFeatures.getItem('chatBackground'),
            target: '#chatBackground',
            update: function(){
                var selectors = ['#WikiaPage', '#ChatHeader', '#Write .message'];
                $(selectors.join(', ')).css('backgrond', this.value);
            },
            load: function(){
                var $target = $(this.target);
                $target.val(this.value);
                $target.parent().find('.background-box').data('background', this.value).css('background', this.value);
            },
            setValue: function(){
                var value = $(this.target).val();
                this.value = value;
                ChatFeatures.setItem('chatBackground', value);
            }
        },
        avatarBorder: {
            value: ChatFeatures.getItem('avatarBorder'),
            target: '#avatarBorder',
            update: function(){
                var selectors = ['#ChatHeader .User img', '#WikiaPage .Chat .avatar', '#Rail .User img', '#Write > img', '.UserStatsMenu .info img'],
                    $css = $('<style />', { 'id': 'avatarBorderCSS', 'type': 'text/css' }),
                    borderWidth = this.value[0],
                    borderStyle = this.value[1],
                    borderColor = this.value[2],
                    cssText = selectors.join(', ') + ' { \
                        border: ' + borderWidth + ' ' + borderStyle + ' ' + borderColor + ' !important; \
                    }';
                if ($('style#avatarBorderCSS').length){
                    $('style#avatarBorderCSS').replaceWith($css);
                } else {
                    $('body.ChatWindow').prepend($css);
                }
            },
            load: function(){
                var $targetGroup = $(this.target),
                    $borderWidthN = $targetGroup.find('#borderWidthN'),
                    $borderWidthM = $targetGroup.find('#borderWidthM'),
                    $borderStyle = $targetGroup.find('#borderStyle'),
                    $borderColor = $targetGroup.find('#borderColor');
 
                var borderWidth = this.value[0],
                    borderStyle = this.value[1],
                    borderColor = this.value[2];
 
                var borderWidthN = borderWidth.match(/\d+/g).map(Number)[0],
                    borderWidthM = borderWidth.match(/[a-z]+/g)[0];
 
                $borderWidthN.val(borderWidthN);
                $borderWidthM.find('.combobox-input').val(borderWidthM);
                $borderWidthM.find('.combobox-list > li[data-item="' + borderWidthM + '"]').addClass('selected');
                $borderStyle.find('.combobox-input').val(borderStyle);
                $borderStyle.find('.combobox-list > li[data-item="' + borderStyle + '"]').addClass('selected');
                $borderColor.val(borderColor);
                $borderColor.parent().find('.color-box').data('color', borderColor).css('color', borderColor);
            },
            setValue: function(){
                var $targetGroup = $(this.target),
                    borderWidthN = $targetGroup.find('#borderWidthN').val(),
                    borderWidthM = $targetGroup.find('#borderWidthM .combobox-input').val(),
                    borderStyle = $targetGroup.find('#borderStyle .combobox-input').val(),
                    borderColor = $targetGroup.find('#borderColor').val(),
                    value = [borderWidthN + borderWidthM, borderStyle, borderColor];
                this.value = value;
                ChatFeatures.setItem('avatarBorder', value);
            }
        }
    }, ChatFeatures.look);
    ChatFeatures.uiObject = $.extend({
        fontColor: {
            name: 'Font Color',
            type: 'colorbox',
            id: 'fontColor',
            current: ChatFeatures.look.fontColor.value,
            defaults: {
                color: '#000000'
            }
        },
        fontFamily: {
            name: 'Font Family',
            type: 'combobox',
            id: 'fontFamily',
            current: ChatFeatures.look.fontFamily.value,
            defaults: {
                value: 'Helvetica',
                options: ChatFeatures.fonts
            }
        },
        surroundBackground: {
            name: 'Window Background',
            type: 'colorbox',
            id: 'surroundBackground',
            current: ChatFeatures.look.fontFamily.value,
            defaults: {
                color: '#ffffff'
            }
        },
        selfPostBackground: {
            name: 'Self Post',
            type: 'colorbox',
            id: 'selfPostBackground',
            current: ChatFeatures.look.fontFamily.value,
            defaults: {
                color: '#ffffff'
            }
        },
        chatBackground: {
            name: 'Chat Background',
            type: 'colorbox',
            id: 'chatBackground',
            current: ChatFeatures.look.chatBackground.value,
            defaults: {
                color: '#afafaf'
            }
        },
        avatarBorder: {
            name: 'Avatar Border',
            type: 'group',
            id: 'avatarBorder',
            current: (function flatten(array){
                if (typeof Array.prototype.flatten === 'function'){
                    return array.flatten();
                } else {
                    return array.reduce(function(flat, toFlatten){
                        var a = null;
                        if (Array.isArray(toFlatten)){
                            a = flatten(toFlatten);
                        } else {
                            a = toFlatten;
                        }
                        return flat.concat(a);
                    }, []);
                }
            }(ChatFeatures.look.avatarBorder.value.map(function(val, index){
                if (index === 0){
                    var arr = [];
                    arr[0] = val.match(/\d+/g).map(Number)[0];
                    arr[1] = val.match(/[a-z]+/g)[0];
                    return arr;
                }
                return val;
            }))).reduce(function(obj, val, index){
                var keys = ['borderWidthN', 'borderWidthM', 'borderStyle', 'borderColor'],
                    key = keys[index];
                obj[key] = val;
                return obj;
            }, {}),
            children: [
                {
                    type: 'inputbox',
                    id: 'borderWidthN',
                    defaults: {
                        value: '1'
                    }
                },
                {
                    type: 'combobox',
                    id: 'borderWidthM',
                    defaults: {
                        value: 'px',
                        options: ChatFeatures.measurements
                    }
                },
                {
                    type: 'combobox',
                    id: 'borderStyle',
                    defaults: {
                        value: 'solid',
                        options: ChatFeatures.borders
                    }
                },
                {
                    type: 'colorbox',
                    id: 'borderColor',
                    defaults: {
                        value: '#000000'
                    }
                }
            ]
        }
    }, ChatFeatures.uiObject);
    ChatFeatures.openUI = function(){
        var modules = this.modules,
            look = this.look,
            modal = this.UI.Modal('Chat Options', {
                id: 'optionsModal',
                content: ChatFeatures.uiObject
            }, [
                {
                    id: 'optionsCancel',
                    text: 'Cancel',
                    handler: function(event, $target){
                        $target.remove();
                    }
                },
                {
                    id: 'optionsSubmit',
                    text: 'Submit',
                    defaultButton: true,
                    handler: function(event, $target){
                        this.updateValues();
                        $target.remove();
                    }
                }
            ]);
    };
    ChatFeatures.updateChat = function(){
        // Looks
        Object.keys(this.look).forEach((key) => {
            if (this.look.hasOwnProperty(key)){
                this.look[key].update();
            }
        });
 
        Object.keys(this.modules).forEach((key) => {
            if (this.modules.hasOwnProperty(key)){
                if (this.modules[key].loaded === false){
                    this.modules[key].load();
                    if (this.modules[key].enabled === true){
                        this.modules[key].enable();
                    } else if (this.modules[key].enabled === false){
                        this.modules[key].disable();
                    }
                } else {
                    if (this.modules[key].enabled === true){
                        this.modules[key].enable();
                    } else if (this.modules[key].enabled === false){
                        this.modules[key].disable();
                    }
                }
            }
        });
    };
    ChatFeatures.updateValues = function(){
        Object.keys(this.look).forEach((key) => {
            if (this.look.hasOwnProperty(key)){
                this.look[key].update();
            }
        });
 
        Object.keys(this.modules).forEach((key) => {
            if (this.modules.hasOwnProperty(key)){
                if (this.modules[key].target !== 'undefined' && $(this.modules[key].target).is(':checked')){
                    this.modules[key].enabled = true;
                } else {
                    this.modules[key].enabled = false;
                }
            }
        });
 
        this.updateChat();
    };
    return ChatFeatures;
}(jQuery, mediaWiki, mainRoom));