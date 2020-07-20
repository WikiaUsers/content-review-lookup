var ChatSideMenu = (document.defaultView || this || window).ChatSideMenu || function(config){
    this.wordmark = this.wordmarkSrc = $('#ChatHeader .wordmark img').attr('src');
    this.wikiname = this.wiki = mw.config.get('wgMainPageTitle', wgMainPageTitle);
    this.loaded = false;
    this.collapsed = config.collapsed || true;
    this.target = this.selector = '#ChatSideMenu';
    return this;
};

ChatSideMenu.prototype.addItem = ChatSideMenu.prototype.appendItem = function(title, type, _x){
    var collectionKeywords = ['collection', 'list', 'items'],
        actionKeywords = ['action', 'trigger', 'command', 'button'];
    
    if (collectionKeywords.indexOf(type) > -1){
        if (_x instanceof Array){
            
        }
    }
    else if (actionKeywords.indexOf(type) > -1){
        
    }
};