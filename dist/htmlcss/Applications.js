/* jshint jquery:true */

;(function(mw, $, App){
    if (App.noop || App.DoNotLoad) return;
    var mwConfig = mw.config.get([
            'wgPageName',
            'wgUserName',
            'skin'
        ]),
        RequestForRights = $.extend(App, {
            name: 'Request For Rights',
            version: '0.1.0 alpha',
            char_min: 200,
            page: 'Project:Request For Rights/New requests',
            defaultItem: 'Select a right that you want to apply for.',
            getAllURLQueries: function(){
                var json_obj = '{',
                    parts = window.location.href.split(/[?&]/g),
                    no_path = parts.filter(function(part){
                        return !(/http(?:s|):\/\/(.*)/).test(part);
                    }),
                    var_obj = no_path.map(function(part){
                        var _parts = part.split('=');
                        _parts[0] = '"' + _parts[0] + '"';
                        _parts[1] = '"' + _parts[1] + '"';
                        return _parts.join(':');
                    }),
                    _obj = var_obj.join(', ');
                json_obj = json_obj.concat(_obj);
                json_obj = json_obj.concat('}');
                return JSON.parse(json_obj);
            },
            rights: {
                'Main Rights': ['Rollback', 'Chat Moderator', 'Discussion Moderator', 'Administrator', 'Bureaucrat'],
                'Other': ['Code Editor', 'Patroller']
            }
        });
        
    RequestForRights.createHTML = function(){
        var $html = $('<section class="RFRFormWrapper rfa-form" id="RFRFormWrapper" />'),
            $form = $('<form class="RFRForm WikiaForm" id="RFRForm" onsubmit="return false;" />'),
            $form_html = $('<div class="RFR rfa-content" id="RFR" />'),
            $rfa_button = $('<a href="/wiki/' + RequestForRights.page.replace(' ', '_') + '" class="rfa-button wds-button" id="rfa-button" />').text('Submit Application');
        $form_html.html(function(){
            var $username = $('<div class="rfa-form-section" />')
                    .html([
                        $('<span class="rfa-form-text" />')
                            .html('Username: '),
                        $('<span class="rfa-form-noinput rfa-form-data" id="rfa-username" />')
                            .html([
                                $('<img class="avatar" />'),
                                $('<span class="rfa-username username" />')
                                    .html(mwConfig.wgUserName)
                            ])
                    ]),
                $rights = $('<div class="rfa-form-section" />')
                    .html([
                        $('<span class="rfa-form-text" />')
                            .html('Position: ')
                            .on('click', function(event){
                                if (!event.target.nexSibling) return;
                                var $dropdown = $(event.target.nextSibling);
                                $dropdown.show(500);
                            }),
                        $('<nav class="rfa-form-data rfa-select-box" id="rfa-right" />')
                            .html([
                                $('<span class="rfa-selected" />')
                                    .text(RequestForRights.defaultItem),
                                $('<div class="rfa-dropdown rfa-select-dropdown" id="rfa-dropdown" />')
                                    .html(function(){
                                        var $default = $('<a href="#rfa-right" class="rfa-dropdown-item item is-link" />').text(RequestForRights.defaultItem).on('click', function(event){
                                                event.preventDefault();
                                                var $box_selected = $(event.target.hash).find('.rfa-selected');
                                                $box_selected.text(event.target.innerText);
                                                $(event.target.parentElement).hide(500);
                                            }),
                                            items = RequestForRights.rights,
                                            $items = null,
                                            $_html = [$default];
                                        $items = Object.keys(items).map(function(name, index){
                                            var $h = $('<h3 class="rfa-group-header" data-target="#rga-group' + index + '" />').text(name),
                                                $u = $('<ul class="rfa-group-list group-list list" />'),
                                                $g = $('<div class="rfa-group group" />'),
                                                _items = items[name];
                                            $u.html(_items.map(function(_item, _i){
                                                var $item = $('<li class="rfa-dropdown-item item" />');
                                                $item.html(
                                                    $('<a class="rfa-dropdown-link link" href="#rfa-dropdown" />').text(_item).on('click', function(event){
                                                        event.preventDefault();
                                                        var $box_selected = $(event.target.hash).find('.rfa-selected');
                                                        $box_selected.text(event.target.innerText);
                                                        $(event.target.hash).hide(500);
                                                    })
                                                );
                                                return $item;
                                            }));
                                            $g.html([$h, $u]);
                                            return $g;
                                        });
                                        
                                        $items.forEach(function(_item_){
                                            $_html[$_html.length] = _item_;
                                        });
                                        
                                        return $_html;
                                    })
                            ])
                    ]),
                $reason = $('<div class="rfa-form-section" />')
                        .html([
                            $('<span class="rfa-form-text" />')
                                .text('Reason: '),
                            $('<div class="rfa-textarea" />')
                                .html(
                                    $('<textarea id="rfa-description" class="rfa-description" />')
                                    .attr('rows', '5')
                                    .on('keypress change', function(event){
                                        var $textarea = $(event.target),
                                            value = $textarea.val();
                                        $('#rfa-description-count').text(value.length - RequestForRights.char_min);
                                    }),
                                    $('<span class="rfa-description-count" id="rfa-description-count" />')
                                    .text($('#rfa-description').val().length - RequestForRights.char_min)
                                ),
                        ]);
                
            $.ajax({
                method: 'GET',
                dataType: 'json',
                url: mw.util.wikiScript('wikia'),
                data: {
                    controller: 'UserProfilePageController',
                    method: 'renderUserIdentityBox',
                    title: 'User:' + mwConfig.wgUserName.replace('_', ' '),
                    format: 'json'
                }
            }).done(function(data){
                var avatar = data.user.avatar;
                $username.find('.avatar').attr('src', avatar.replace(/\/scale-to-width\/(?:.*)/g, '/scale-to-width-down/60'));
            });
            return [$username, $rights, $reason];
        });
        
        $rfa_button.on('click', function validate(event){
            // To make sure that the button does not go to a new page
            event.preventDefault();
            var $u = $('#rfa-username .username'),
                $r = $('#rfa-rights .rfa-selected'),
                $d = $('#rfa-description'),
                url = event.target.href,
                now = new Date(),
                months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                ampm = now.getHours() > 12 ? 'PM' : 'AM';
            
            if ($r.text() == RequestForRights.defaultText){
                $(event.target).before(
                    $('<p class="rfa-error-message" />').text('Please select a position to apply for.')
                    .animate({
                        'opacity': '0' 
                    }, 1000).promise().done(function(){
                        $(this).remove();
                    })
                );
                return;
            }
            
            if ($d.val() === ''){
                $(event.target).before(
                    $('<p class="rfa-error-message" />').text('The description cannot be empty. Please try again after you have typed out the description.')
                    .animate({
                        'opacity': '0' 
                    }, 1000).promise().done(function(){
                        $(this).remove();
                    })
                );
                return;
            }
            
            if ($d.val().length < RequestForRights.char_min){
                $(event.target).before(
                    $('<p class="rfa-error-message" />').text('The description must have at least 200 characters in order for you to continue.')
                    .animate({
                        'opacity': '0' 
                    }, 1000).promise().done(function(){
                        $(this).remove();
                    })
                );
                return;
            }
            
            function pad(n){
                if (n < 10) n = "0" + n;
                return n;
            }
            
            var template = 
                '== ' + 
                    $u.text() + ' (' + months[now.getMonth()] + ' ' + now.getDate() + ', ' + now.getFullYear() +
                    ' ' + pad(now.getHours()) + ':' + pad(now.getMinutes()) + ':' + pad(now.getSeconds()) + ' ' + ampm 
                    + ')' +
                '==';
            
            template +=
                '*\'\'\'Position:\'\'\' ' + $r.text() +
                '*\'\'\'Description:\'\'\' ' + $d.val();
            
            $.ajax({
                method: 'POST',
                url: mw.util.wikiScript('api'),
                data: {
                    action: 'edit',
                    text: template,
                    title: url.replace('/wiki/', '').replace('_', ' '),
                    section: 'new',
                    token: mw.user.tokens.values.editToken
                }
            }).done(function(data){
                window.open(url, '_self');
            });
        });
        
        $form.append([$form_html, $rfa_button]);
        $html.append($form);
        return $html;
    };
    
    if (
        Array.prototype.some.call(['oasis', 'wikia'], function(_skin){
            return _skin == mwConfig.skin;
        }) ||
        (RequestForRights.getAllURLQueries().blankspecial == 'rfr-apps'
            && mwConfig.wgPageName == 'Special:BlankPage')
    ){
        $('.mw-content-text').html(RequestForRights.createHTML);
    }
})(this.mediaWiki, this.jQuery, this.RFR = this.RFR || {});