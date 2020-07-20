/**
 * The following scripts presented
 * in this page are used for testing
 * purposes only. I strongly advise
 * you to apply it to your personal
 * JavaScript page. Thank you :)
 * - Ultimate Dark Carnage
 **/

(function($, mw, mainRoom){
    /**
     * Clear Chat
     * 
     * This part of the script adds a function which clears the
     * chat or deletes the last message
     **/
    
    var clearChat = {
        cooldown_time: 1000*5,
        limit: 5,
        count: 0,
        state: 'active',
        html: function(){
            return $('<div />', {
                'class': 'ClearChat clear-chat',
                'id': 'ClearChat',
                html: [
                    $('<a />', {
                        'href': '#',
                        'class': 'clear-chat-button chat-button',
                        text: 'Clear Chat',
                        on: { 'click': $.proxy(this.clear, this) }
                    }),
                    $('<a />', {
                        'href': '#',
                        'class': 'remove-last-button chat-button',
                        text: 'Delete Last Message',
                        on: { 'click': $.proxy(this.remove, this) }
                    })
                ]
            });
        },
        cooldown: function(){
            this.state = 'cooling down';
            setTimeout($.proxy(function(){
                this.count = 0;
                this.state = 'active';
            }, this), this.cooldown_time);
        },
        clear: function(event){
            event.preventDefault();
            var $messages = $('.Chat li');
            if ($messages.length > 0 && this.state !== 'cooling down'){
                $messages.remove();
                this.count = this.count + 1;
                if (this.count > this.limit){
                    this.cooldown();
                }
            }
        },
        remove: function(event){
            event.preventDefault();
            var $messages = $('.Chat li');
            if ($messages.length > 0 && this.state !== 'cooling down'){
                var last = $messages.length - 1,
                    $msg = $messages.eq(last);
                $msg.remove();
                this.count = this.count + 1;
                if (this.count > this.limit){
                    this.cooldown();
                }
            }
        },
        insertHTML: function(){
            if (!$('#ClearChat').length){
                $('#Rail').find('.wordmark').after(clearChat.html());
            }
        }
    };
    
    $(document).ready(clearChat.insertHTML);
    window.clearChat = clearChat;
}(jQuery, mediaWiki, mainRoom));