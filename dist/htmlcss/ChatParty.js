window.ChatParty = window.ChatParty || {};
window.Skin = window.Skin || function Skin(config){
    this.cssSource = config.source;
    this.fontFace = config.fontFace;
    this.style = 
        '<style type="text/css" id="ChatPartyStyle">' +
            'body.ChatWindow {' +
                'font-family: ' + this.fontFace;
    if (typeof this.cssSource === 'undefined'){
        this.background = config.background;
        this.foreground = config.foreground;
    }
};

window.Ball = window.Ball || function Ball(config){
    this.color = config.color;
    this.hasShadow = typeof config.hasShadow !== 'undefined' ? config.hasShadow : true;
    this.opacity = typeof config.opacity !== 'undefined' ? config.opacity : '80%';
    this.top = config.position.top;
    this.left = config.position.left;
};

ChatParty.info = {
    version: 'v1.0.0 alpha',
    triggerId: 'chatPartyTrigger',
    baseId: 'chatParty',
    tracks: [],
    skins: []
};

ChatParty.getTracks = function(){
    var MAX_OPTIONS = 6;
    function _getTrack(track, string){
        var _s_ = string.split(/\n/),
            _s = {
                title: _s_[0],
                ogg: _s_[1],
                mp3: _s_[2]
            };
        ChatParty.info.tracks[track] = _s;
    }
    
    function _readTrack(source, track){
        $.ajax({
            method: 'GET',
            url: mw.util.wikiScript('api'),
            dataType: 'json',
            data: {
                page: source + typeof track !== 'undefined' ? '-' + track : '',
                action: 'parse',
                format: 'json'
            },
            success: function(data){
                var txt = data.parse.text['*'];
                _getTrack(track, txt);
            }
        });
    }
    
    _readTrack('MediaWiki:Custom-ChatParty-track');
    _readTrack('MediaWiki:Custom-ChatParty-track', 2);
    _readTrack('MediaWiki:Custom-ChatParty-track', 3);
    _readTrack('MediaWiki:Custom-ChatParty-track', 4);
    _readTrack('MediaWiki:Custom-ChatParty-track', 5);
    _readTrack('MediaWiki:Custom-ChatParty-track', 6);
};

ChatParty.shell = function shell(){
    
};