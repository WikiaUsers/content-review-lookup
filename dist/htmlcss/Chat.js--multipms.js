window.mediaWiki.loader.load('http://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css');

var MultiPMs = {};

MultiPMs.ui = function(){
    this.element =
        $('<div />', { 'class': 'modal-blackout mp-ui-modal', html: $('<section />', {
            'class': 'modal-wrapper mp-ui-modal',
            'id': 'MP-ui-modal',
            html: [
                $('<header />', { 'class': 'modal-header mp-ui-header', html: [
                    $('<h1 />', { 'class': 'modal-heading mp-ui-heading', text: 'Multi PM' }),
                    $('<a />', { 'class': 'modal-close mp-ui-close', html: $('<i />', { 'class': 'icon ion-close-round' })})
                ] }),
                $('<article />', { 'class': 'modal-content mp-ui-content' }),
                $('<footer />', { 'class': 'modal-footer mp-ui-footer', html: [
                    $('<a />', { 'class': 'wds-button wds-is-squished wds-is-secondary', 'href': '#MP-ui-modal', text: 'Cancel', on: { 'click': $.proxy(function(event){ event.preventDefault(); this.cancel.apply(this, [event]); }, this) } }),
                    $('<a />', { 'class': 'wds-button wds-is-squished', 'href': '#MP-ui-modal', text: 'Confirm', on: { 'click': $.proxy(function(event){ event.preventDefault(); this.confirm.apply(this, [event]); }, this) } })
                ]})
            ]
        }) });
    this.users = [];
    this.userData = [];
    return this;
};

MultiPMs.ui.prototype.getUsersFrom = function(obj){
    if (obj instanceof Backbone.Collection){
        var users = obj.map(function(c){ return c.attributes.name; });
        users = users.sort();
        this.users = users;
    } else if (Array.isArray(obj)){
        this.users = obj.sort();
    } else {
        this.users = [];
    }
};

MultiPMs.ui.prototype.getUserData = function(){
    var users = this.users;
    for (var u = 0, len = users.length; u < len; u++){
        var user = users[u],
            data = mainRoom.model.users.findByName(user);
        this.userData[u] = {
            name: data.attributes.name,
            avatar: data.attributes.avatar
        };
    }
};

MultiPMs.ui.prototype.create = function(){
    var $modal = this.element,
        users = typeof MultiPMs.users == 'undefined' ? mainRoom.model.users : MultiPMs;
    this.getUsersFrom(users);
    if (this.users.length > 0){
        this.getUserData(this.users);
        var $form = $('<form />', {
            'class': 'WikiaForm mp-ui-form multipm-form',
            'id': 'MP-ui-form',
            html: $('<fieldset />', {
                html: $('<ul />', {
                    'class': 'mp-ui-list multipm-list',
                    html: this.userData.map(function(data, index){
                        var name = data.name, avatar = data.avatar,
                            $li = $('<li />', {
                                'class': 'mp-ui-list-item multipm-item',
                                'data-user': name,
                                html: [
                                    $('<input />', {
                                        'type': 'checkbox',
                                        'id': 'multipm-option-' + index,
                                        'name': 'multipm',
                                        on: {
                                            'change': function(event){
                                                if ($(event.target).is(':checked')){
                                                    $(event.target).next('.mp-ui-label').addClass('selected');
                                                } else {
                                                    $(event.target).next('.mp-ui-label').removeClass('selected');
                                                }
                                            }
                                        }
                                    }),
                                    $('<label />', {
                                        'for': 'multipm-option-' + index,
                                        'class': 'mp-ui-label multipm-label',
                                        html: [
                                            $('<img />', {
                                                'class': 'multipm-avatar wds-avatar',
                                                'src': avatar
                                            }),
                                            $('<span />', {
                                                'class': 'multipm-username username',
                                                text: name
                                            })
                                        ]
                                    })
                                ]
                            });
                        return $li;
                    })
                })
            })
        });
        $modal.find('.mp-ui-content').html($form);
        $(document.body).append($modal);
    }
};

MultiPMs.ui.prototype.cancel = function(event){
    if (event.target.hash){
        $(event.target.hash).closest('.modal-blackout').remove();
    }
};

MultiPMs.ui.prototype.confirm = function(event){
    if (event.target.hash){
        var $modal = $(event.target.hash),
            $form = $modal.find('.mp-ui-form'),
            $selected = $form.find('.selected'),
            selected_users = [];
        $selected.each(function(){
            var $elem = $(this),
                name = $elem.data('user') || $elem.attr('data-user');
            if (selected_users.indexOf(name) === -1){
                selected_users[selected_users.length] = name;
            }
        });
        mainRoom.openPrivateChat(selected_users);
        $modal.closest('.modal-blackout').remove();
    }
};

$(document).ready(function(){
    importArticle({
        'type': 'style',
        'article': 'MediaWiki:Multipms.css'
    });
    $('.Rail').prepend(
        $('<div />', {
            'class': 'MultiPMButton multi-pm-button-wrapper',
            html: $('<a />', {
                'class': 'wds-button multi-pm-button',
                'href': '#',
                text: 'Multi PM',
                on: {
                    'click': function(event){
                        event.preventDefault();
                        var modalUI = new MultiPMs.ui();
                        modalUI.create();
                    }
                }
            })
        })
    );
});