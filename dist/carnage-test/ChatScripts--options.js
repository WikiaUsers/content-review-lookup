;(function(mw, $, options, modules){
    var _options = $.extend(options, {
        // User Interface
        openModal: function(config){
            var $modal = $('<div class="modal-blackout" />'),
                $modal_wrapper = $('<section class="modal-wrapper" />'),
                $modal_header = $('<header class="modal-header" />'),
                $modal_content = $('<article class="modal-content" />'),
                $modal_footer = $('<footer class="modal-footer modal-toolbar" />');
        },
        userList: function(list, config){
            this.classes = config.classes || '';
            this.id = config.id || '';
            this.row_limit = config.row_limit || 2;
            this.list = (typeof config.limit == 'number' && config.limit > 0) ? Array.prototype.filter.call(list, function(item, index){ return index < config.limit; }) : list;
            this.templates = config.templates || {};
            this.content = config.format || config.content;
            this.create = function(){
                var $content = $('<nav class="userlist-wrapper" />'),
                    $list = $('<ul class="userlist" />'),
                    items = null,
                    _this = this;
                if (typeof this.content == 'function'){
                    items = Function.prototype.apply.call(this.content, this, [this.list]);
                } else if (typeof this.content == 'string'){
                    items = this.content;
                    items = items.replace(/(\$[0-9]{1,2})/g, function(match, t){
                        var templates = _this.templates[t];
                        return templates;
                    });
                }
                return $content;
            };
            return this.create();
        },
        // Modules
        modules: $.extend(modules, {
            multiPM: {
                enabled: true,
                trigger: 'Multi PM',
                handler: function(module, event){
                    if (module.enabled === false) return;
                    _options.openModal({
                        title: 'Multi PM',
                        content: [
                            $('<p class="modal-description" />')
                            .html('Select the user(s) that you want to PM.'),
                            (new _options.userlist(_options.users, {
                                classes: 'multipm-users',
                                id: 'MultiPMUsers',
                                row_limit: 2,
                                format: function(users){
                                    var $list_html = [];
                                    Array.prototype.forEach.call(users, function(user, index){
                                        var user_data = mainRoom.model.users.findByName(user),
                                            attr = user_data.attributes,
                                            $list = $('<li class="multipm-user" data-user="' + attr.name + '" />');
                                        $list.html([
                                            $('<label for="user' + index + '" />')
                                            .html([
                                                $('<img class="avatar" />')
                                                    .attr('src', attr.avatarSrc),
                                                $('<span class="username" />')
                                                    .text(attr.name)
                                            ]),
                                            $('<input type="checkbox" id="user' + index + '" name="multipm-user" value="' + attr.name + '" />')
                                        ]);
                                        $list_html[$list_html.length] = $list;
                                    });
                                    return $list_html;
                                }
                            }))
                        ],
                        confirm: function(event, target){
                            
                        }
                    });
                }
            }
        })
    });
})(this.mediaWiki, this.jQuery, this.ChatOptions = this.ChatOptions || {}, this.OptionsModules = this.OptionsModules || {});