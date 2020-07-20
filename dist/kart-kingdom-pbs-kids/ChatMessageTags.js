;(function(mw, $, config){
    config = $.extend(config, {
        checkMessage: function(){
            if (typeof config.loaded == 'boolean' && config.loaded){
                mainRoom.model.chats.bind('afteradd', function(child){
                    var $elem = $('.Chat #entry-'.concat(child.cid));
                    config.checkUser($elem, child.attributes.name);
                });
            } else {
                $(document).ready(function(){
                    $('.Chat li[data-user]').each(function(){
                        var $elem = $(this);
                        config.checkUser($elem, $elem.data('user') || $elem.atttr('data-user'));
                    });
                    config.loaded = true;
                });
            }
        },
        checkUser: function($target, user){
            $.ajax({
                method: 'GET',
                dataType: 'json',
                url: '/index.php',
                data: {
                    title: config.source || 'MediaWiki:Custom-message-tags',
                    action: 'raw',
                    ctype: 'text/plain'
                }
            }).done(function(data){
                var lines = data.split(/\n/g), obj = '{';
                lines = lines.filter(function(line){
                    return line !== '';
                });
                lines.forEach(function(line, index){
                    var groupNameRegex = /==(?:\s+|)(.*)(?:\s+|)==/g;
                    if (groupNameRegex.test(line)){
                        if (index > 0 && index < lines.length - 1){
                            obj += '],';
                        }
                        var groupName = line.replace(groupNameRegex, '$1').trim();
                        obj += '\'' + groupName + '\': [';
                    } else {
                        var user = line.trim();
                        obj += '\'' + user + '\'';
                        if (index < lines.length - 1){
                            obj += ']';
                        }
                    }
                });
                obj += '}';
                $.each(JSON.parse(obj), function(users, right){
                    if (
                        users.indexOf(user) > -1
                    ){
                        if (!$target.has('.user-tag')){
                            $target.append(
                                $('<span />', {
                                    'class': 'user-tag',
                                    'data-name': right
                                }).html(right)
                            );
                        }
                    }
                });
            });
        },
        loaded: false
    });
    $(document).ready(config.checkMessage);
})(
    this.mediaWiki,
    this.jQuery,
    this.ChatMessageTags = this.ChatMessageTags || Object.apply(null, {})
);