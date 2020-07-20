var user_menu = {
    actions: {
        mention: function(target){
            var template = '@[<user>]',
                name = target.attr('data-user'),
                text_value = $('.Write [name="message"]').val();
            if (!name) return;
            
            var mention = template.replace('<user>', name);
            if (text_value === '') $('.Write [name="message"]').val(mention);
            else $('.Write [name="message"]').val(text_value + ' ' + mention);
        },
        pm: function(target){
            var name = target.attr('data-user');
            if (!name) return;
            mainRoom.openPrivateChat(name);
        },
        kick: function(target){
            var name = target.attr('data-user');
            if (!name) return;
            mainRoom.kick({name: name});
        },
        ban: function(target){
            
        },
        message_block: function(target){
            
        }
    }
};