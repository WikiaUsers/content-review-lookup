/**
 * @name        MultiKick
 * @version     v0.1
 * @author      Ultimate Dark Carnage
 * @license     CC-BY-SA
 **/
(function($, mw, mainRoom, MultiKickConfig){
    function MultiKick(){
        this.config = $.extend({}, MultiKickConfig);
        this.self = mw.config.get('wgUserName');
        this.loaded = false;
        this.load = $.Deferred();
        this.enabled = false;
        this.title = 'MultiKick';
        this.version = 'v0.1';
        this.userData = mainRoom.model.users.map(function(model){
            return {
                name: model.attributes.name,
                avatar: model.attributes.avatarSrc,
                groups: model.attributes.groups
            };
        });
        this.count = this.userData.length;
        this.setConfig();
        return this;
    }
    
    MultiKick.prototype.setConfig = function(){
        this.title = this.config.title || this.title;
        this.description = this.config.description || '';
        this.sortValues = {
            'desc': function(a, b){
                return a.name.localeCompare(b.name) * -1;
            },
            'asc': function(a, b){
                return a.name.localeCompare(b.name);
            }
        };
        this.filterValues = {
            'letter': function(data, letter){
                return data.name.indexOf(letter) === 0;
            },
            'group': function(data, group){
                return data.groups.indexOf(group) > -1;
            }
        };
        this.sort = this.config.sort || '';
        this.sortFn = this.sortValues[this.sort] || null;
        this.filter = this.config.filter || '';
        this.filterFn = this.filterValues[this.filter] || null;
        this.filterVal = this.config.filterVal || null;
        this.limit = this.config.limit || null;
        if (this.sortFn !== null){
            this.userData = this.userData.sort(this.sortFn);
        }
        
        if (this.filterFn !== null){
            this.userData = this.userData.filter($.proxy(function(data){
                return this.filterFn.apply(window, [data, this.filterVal]);
            }, this));
        }
    };
    
    MultiKick.prototype.Modal = function(){
        var $Modal = 
            $('<div>').addClass('MultiKickBlackout multi-kick-blackout').html(
                $('<section>').addClass('MultiKickModal multi-kick-modal').attr('id', 'MultiKickModal').html([
                    $('<header>').addClass('MultiKickHeader multi-kick-header').html(
                        $('<h2>').addClass('MultiKickHeading multi-kick-heading').text(this.title)
                    ),
                    $('<article>').addClass('MultiKickContent multi-kick-content').html([
                        $('<p>').addClass('MultiKickDescription multi-kick-description').html(this.description),
                        $('<nav>').addClass('MultiKickWrapper multi-kick-wrapper').html([
                            $('<div>'),
                            $('<ul>').addClass('MultiKickList multi-kick-list').html(
                                this.userData.map(function(data, index){
                                    var isMod = data.groups.some(function(group){
                                        return ['staff', 'helper', 'vstf', 'bureaucrat', 'sysop', 'discussions-moderator', 'chatmoderator'].indexOf(group) > -1;
                                    });
                                    return $('<li>').addClass('MultiKickUser multi-kick-user' + (isMod ? ' multi-kick-mod' : ''))
                                        .html([
                                            $('<input>').attr({
                                                'id': 'multi-kick-user-' + index,
                                                'type': 'checkbox'
                                            }),
                                            $('<label>').addClass('MultiKickUserItem multi-kick-user-item').attr('for', 'multi-kick-user-' + index).html([
                                                $('<img>').addClass('MultiKickAvatar multi-kick-avatar').attr('src', data.avatar),
                                                $('<span>').addClass('MultiKickUsername multi-kick-username username')
                                            ])
                                        ]);
                                })
                            )
                        ])
                    ])
                ])
            ).on('click', function(event){
                event.preventDefault();
                var $target = $(event.target),
                    $blackout = $(event.delegateTarget);
                if (!$target.is('.multi-kick-modal, .multi-kick-modal *')){
                    $blackout.remove();
                }
            });
    };
}(jQuery, mediaWiki, window.mainRoom, $.extend({}, window.MultiKickConfig)));