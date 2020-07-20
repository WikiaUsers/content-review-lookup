/**
 * 
 * ChatEditTools. 
 * @author: [[w:User:BlackZetsu]]
 */
function start() {
    mainRoom.model.chats.add(new models.InlineAlert({
        text: ('<a href= "http://dev.wikia.com/wiki/ChatEditTools">ChatEditTools</a> is enabled')
    }));
}
 
function commands() {
    $('[name="message"]').keydown(function(e) {
        if (e.which == 13 && $(this).val().substr(0, 10) == '!interwiki') {
            command = $(this).val().split("/");
            page = command[1];
            lang = command[2];
            interwiki = '\n[[' + lang + ':' + command[3] + ']]';
            $(this).unbind('keypress').val('');
            commandsAPI.interwiki();
        }
    });
 
    $('[name="message"]').keydown(function(e) {
        if (e.which == 13 && $(this).val().substr(0, 9) == '!category') {
            command = $(this).val().split("/");
            page = command[1];
            category = '\n[[Category:' + command[2] + ']]';
            $(this).unbind('keypress').val('');
            commandsAPI.category();
        }
    });
    $('[name="message"]').keydown(function(e) {
        if (e.which == 13 && $(this).val().substr(0, 7) == '!delete') {
            command = $(this).val().split("/");
            page = command[1];
            reason = command[2];
            $(this).unbind('keypress').val('');
            commandsAPI.delete();
        }
    });
    $('[name="message"]').keydown(function(e) {
        if (e.which == 13 && $(this).val().substr(0, 8) == '!message') {
            command = $(this).val().split("/");
            user = command[1];
            title = command[2];
            message = command[3];
            $(this).unbind('keypress').val('');
            commandsAPI.message();
        }
    });
    $('[name="message"]').keydown(function(e) {
        if (e.which == 13 && $(this).val().substr(0, 9) == '!talkpage') {
            command = $(this).val().split("/");
            user = command[1];
            title = command[2];
            message = command[3];
            $(this).unbind('keypress').val('');
            commandsAPI.talkpage();
        }
    });
 
    var commandsAPI = {
        interwiki: function() {
            $.post(mw.util.wikiScript('api'), {
                format: 'json',
                action: 'edit',
                summary: 'Adding interwiki: ' + command[3],
                title: page,
                appendtext: interwiki,
                token: mw.user.tokens.get("editToken"),
                success: alert('Done!')
            });
        },
        delete: function() {
            $.post(mw.util.wikiScript('api'), {
                format: 'json',
                action: 'delete',
                reason: reason,
                title: page,
                token: mw.user.tokens.get("editToken"),
                success: alert('Done!')
            });
        },
        message: function() {
            $.post(mw.util.wikiScript('wikia'), {
                controller: 'WallExternal',
                method: 'postNewMessage',
                pagenamespace: '1200',
                pagetitle: user,
                messagetitle: title,
                body: message,
                format: 'json',
                success: alert('Done!')
            });
        },
        talkpage: function() {
            $.post(mw.util.wikiScript('api'), {
                format: 'json',
                action: 'edit',
                summary: 'Adding message: ' + title,
                title: 'User_talk:' + user,
                section: 'new',
                sectiontitle: title,
                text: message,
                token: mw.user.tokens.get("editToken"),
                success: alert('Done!')
            });
        },
        category: function() {
            $.post(mw.util.wikiScript('api'), {
                format: 'json',
                action: 'edit',
                summary: 'Adding: ' + command[2],
                title: page,
                appendtext: category,
                token: mw.user.tokens.get("editToken"),
                success: alert('Done!')
            });
        }
    };
}
$(start());
$(commands());