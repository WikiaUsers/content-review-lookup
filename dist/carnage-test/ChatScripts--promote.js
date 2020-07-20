;(function(mw, $, mainRoom, promote){
    var config = mw.config.get([
            'wgUserName',
            'wgUserGroups',
            'wgUserLanguage'
        ]),
        i18n = $.extend(promote.i18n, {
            'en': {
                button: 'Promote User',
                description: promote.description || '',
                selectLabel: 'Select the right that you want to promote the user to',
                reasonLabel: 'Tell us why you want to promote this user (optional)',
                userText: 'User to promote',
                submit: 'Promote',
                cancel: 'Cancel'
            }
        }),
        lang = i18n[config.wgUserLanguage] || i18n.en;
    
    function _modal(heading, content, _config){
        var $modal = $('<div class="modal-blackout" />'),
            $modal_wrapper = $('<section class="modal-wrapper" />'),
            id = _config.id,
            buttons = _config.buttons;
        function close(callback){
            $('#'.concat(id)).remove();
            if (typeof callback == 'function')
                return callback;
        }
        $modal_wrapper.html([
            $('<header class="modal-header" />')
                .html([
                    $('<h1 class="modal-heading" />')
                        .html(heading),
                    $('<a href="#' + config + '" class="modal-close" />')
                        .html('<i class="icon ion-close" />')
                        .on('click', function(event){
                            event.preventDefault();
                            close();
                        })
                ]),
            $('<article class="modal-content" />')
                .html(content),
            $('<nav class="modal-toolbar" />')
                .html(
                    Object.keys(buttons).map(function(name){
                        var button_options = buttons[name],
                            $button = $('<a href="#' + id + '" class="modal-button" />');
                        $button.attr('id', button_options.id);
                        if (button_options.defaultButton){
                            $button.addClass('primary');
                        }
                        $button.html(name);
                        $button.on('click', function(event){
                            event.preventDefault();
                            if (typeof button_options.handler == 'function'){
                                Function.prototype.apply.call(close(button_options.handler), window, [event]);
                            } else {
                                close();
                            }
                        });
                        return $button;
                    })
                )
        ]);
        $modal.html($modal_wrapper);
        $(document.body).append($modal);
    }
    
    function UI(type, options){
        this.type = type;
        this.id = options.id;
        switch (this.type){
            case 'switch':
                this.element = $('<div class="ui switch custom-switch" />');
                this.items = options.items;
                this.create = function(){
                    var items = this.items,
                        that = this,
                        $element = this.element;
                    $element.attr('id', this.id);
                    $element.html(
                        Object.keys(items).map(function(name){
                            var data = items[name],
                                $switch = $('<input type="radio" name="' + that.id + '" class="switch-radio radio hidden" id="' + data.id + '" value="' + name + '" />'),
                                $switch_name = $('<label for="' + data.id + '" class="switch-label switch-item label" />'),
                                $switch_wrapper = $('<div class="switch-wrapper switch-item-wrapper" />');
                            $switch.eq(0).prop('checked', true);
                            $switch_name.html(name);
                            $switch_wrapper.html([$switch, $switch_name]);
                            return $switch_wrapper;
                        })
                    );
                    return $element;
                };
                this.getValue = function(){
                    var $target = $('#' + this.id);
                    return $target.find('.switch-radio:checked').val();
                };
                return this;
            default:
                return;
        }
        return this;
    }
    
    function _process(user){
        $.ajax({
            method: 'GET',
            dataType: 'json',
            url: mw.util.wikiScript('api'),
            data: {
                action: 'query',
                list: 'users',
                ustoken: 'userrights',
                ususers: user,
                format: 'json'
            }
        }).done(function(d){
            if (!d.error){
                var options = {
                    action: 'userrights',
                    user: user,
                    add: $('#promote-rights-list').find('.list-value').attr('data-value'),
                    reason: $('#promote-reason').val(),
                    bot: true,
                    token: d.query.users[0].userrightstoken
                };
                
                var message = '';
                
                if (
                    $('#promote-remove').is(':checked')
                    && !$('#promote-add').is(':checked')
                ){
                    options.remove = config.add;
                    delete options.add;
                }
                
                $.ajax({
                    method: 'POST',
                    dataType: 'json',
                    url: mw.util.wikiScript('api'),
                    data: options
                }).done(function(data){
                    if (!data.error){
                        message = 'User (' + user + ') has successfully been promoted.';
                        mainRoom.viewDiscussion.chatUL.append(
                            $('<li />', {'class': 'inline-alert'})
                                .html(message)
                        );
                        console.log(message);
                    } else {
                        message = 'Could not promote this user.';
                        mainRoom.viewDiscussion.chatUL.append(
                            $('<li />', {'class': 'inline-alert'})
                                .html(message)
                        );
                        console.log(message +  ' Error code: ' + data.error.code);
                    }
                }).fail(function(error){
                    message = 'Could not promote this user.';
                    mainRoom.viewDiscussion.chatUL.append(
                        $('<li />', {'class': 'inline-alert'})
                            .html(message)
                    );
                    console.log(message);
                });
            }
        });
    }
})(this.mediaWiki, this.jQuery, this.mainRoom, this.promoteRight = this.promoteRight || {});