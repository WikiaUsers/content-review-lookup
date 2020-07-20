function HTMLCSSChat(){
    this.version = '1.0.1';
    this.self = mw.config.get('wgUserName', wgUserName);
    this.loaded = false;
    this.chatWindow = $('.ChatWindow');
    this.modules = ['PartyMode', 'Filter', 'ChatOptions'];
}

HTMLCSSChat.prototype.initModule = function(module){
    importScriptPage('MediaWiki:Chat.js/' + module + '.js');
};

HTMLCSSChat.prototype.addModule = function(module){
    if (this.modules.indexOf(module) === -1){
        this.initModule(module);
    } else {
        throw new Error('Cannot add module: This module is already added!');
    }
};

HTMLCSSChat.prototype.init = HTMLCSSChat.prototype.load = function(){
    var i = 0;
    for (; i < this.modules.length; i++){
        var module = this.modules[i];
        this.initModule(module);
    }
};