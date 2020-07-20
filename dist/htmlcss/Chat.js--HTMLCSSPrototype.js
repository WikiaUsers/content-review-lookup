(function($, mw, HTMLCSSChat){
    HTMLCSSChat = HTMLCSSChat || {
        features: {
            options: function(elem){
                var el = elem || '#Write .message';
                var modules = {
                    ui: {
                        createFormSection: function createSection(title, id, config){
                            
                        }
                    },
                    fn: {
                        chatStyle: function changeChatStyle(){
                            var chatStyle = {
                                'Background': {
                                    type: 'color',
                                    id: 'chat-background',
                                },
                                'Text Color': {
                                    type: 'color',
                                    id: 'chat-text-color'
                                },
                                'Font': {
                                    type: 'select',
                                    id: 'font-select',
                                    options: ['Arial', 'Gill Sans MT', 'Helvetica', 'Trebuchet MS', 'Tahoma', 'Times New Roman', 'Consolas', 'Segoe UI', 'Verdana', 'Lucida Console', 'Palatino Linotype'],
                                    sorted: true
                                },
                                'Self-Post Color': {
                                    type: 'color',
                                    id: 'self-post-color'
                                },
                                'Surround Background': {
                                    type: 'color',
                                    id: 'surroud-color'
                                }
                            };
                            
                            for (var module in chatStyle){
                                var type = chatStyle[module].type,
                                    id = chatStyles[module].id,
                                    options = (type == 'select') ? chatStyles[module].options : '',
                                    sorted = (type == 'select') ? chatStyles[module].sorted : '';
                                var t = HTMLCSSChat.modules.ui.createFormSection(module, id, {
                                    type: type,
                                    options: options,
                                    sorted: sorted,
                                    elem: elem
                                });
                            }
                        }
                    }
                };
            }
        }
    };
})(this.jQuery, this.mediaWiki, this.htmlcss_chat);