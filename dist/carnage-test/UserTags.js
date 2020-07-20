(function($, mw, config){
    var WallTags = $.extend(true, {
        txtColor: 'red',
        txtSize: '10px',
        borderColor: 'red',
        glow: true,
        glowColor: '#000',
        glowOffset: ['0', '0'],
        glowSize: '8px',
        glowSpread: '0',
        users: {}
    }, config);
    
    WallTags.getShadow = function(){
        this.txtShadow = this.glowOffset.join(' ') + ' ' + this.glowSize + ' ' + this.glowColor;
        this.boxShadow = this.glowOffset.join(' ') + ' ' + this.glowSize + ' ' + this.glowColor + ' ' + this.glowSpread;
    };
}(jQuery, mediaWiki, $.extend(window.WallTagsConfig, {})));