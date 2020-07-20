/*
* Chat Timestamps
* Make each message/alert in chat to be in the format of HH:MM:SS
* @author Ozank Cx
*/
$(function () {
    if (window.chatTimestampsLoaded) {
        return;
    }
    window.chatTimestampsLoaded = true;

    mw.hook('dev.chat.render').add(function(mainRoom) {
        $('.time').addClass('custom-time').removeClass('time');

        mainRoom.model.chats.bind('afteradd', function (el) {
            var obj = $('#entry-' + el.cid),
                time = new Date(),
                timestamp;

            //create 24 or 12 hour timestamp
            if (window.chatTimestamps24Hour) {
                timestamp = time.toLocaleTimeString('en-us', { hour12: false });
            } else {
                //also prepend with a leading 0 if needed
                var is12hour = time.toLocaleTimeString().padStart(11, '0');
                //remove APM if enabled
                if (window.chatTimestampsNoAPM) {
                    is12hour = is12hour.slice(0, -3);
                }
                timestamp = is12hour;
            }

            //remove old timestamp
            if (obj.children('.time').length) {
                obj.children('.time').remove();
            }

            //append new timestmap
            obj.append('<span class="custom-time">' + timestamp + '</span>');
        });
    });

    //import css and chat-js
    importArticle({
        type: 'style',
        article: 'u:dev:MediaWiki:ChatTimestamps.css'
    }, {
        type: 'script',
        article: 'u:dev:Chat-js.js'
    });
});