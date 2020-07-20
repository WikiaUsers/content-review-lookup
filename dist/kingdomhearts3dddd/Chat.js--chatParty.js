(function($, mw){
    var $styleElem = $('<style />'),
        chatPartyCSS = 
            '.OptionsLink, \
             .EmoticonPanelLink, \
             .ChatPartyLink { \
                padding: 6px 8px; \
                color: white; \
                margin: 0 !important; \
                font-size: 14pt; \
                cursor: pointer; \
                vertical-align: top; \
                display: inline-block; \
            };';
    $styleElem.attr({
        'id': 'chatPartyStyle',
        'type': 'text/css'
    }).text(chatPartyCSS).appendTo(document.head);
    
    function ChatParty(){
        this.triggerTxt = 'Party Mode';
        this.skins = {
            items: ['Epic', 'Dragon', 'Freddy', 'Jason']
        };
        this.themes = { 
            items: ['Metallic', 'White', 'Black', 'Neon'] 
        };
        this.disco = {
            items: ['Colored', 'White', 'Monochrome (Red)', 'Monochrome']
        };
    }
    
    // This is an object that determines
    // if the module exists.
    // @param module - The module that will be checked
    // @return Object|Boolean
    ChatParty.prototype.ifExists = function(module){
        var m = Object.keys(this);
        if (m.indexOf(module) > -1)
            return {
                init: function(callback){
                    Function.prototype.apply.call(callback, window, []);
                },
                bind: function(event, callback){
                    // TBA
                }
            };
        else
            return false;
    };
    
})(this.jQuery, this.mediaWiki);