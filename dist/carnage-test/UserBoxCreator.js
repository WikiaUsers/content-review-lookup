window.UserBoxCreator = (function(window, $, mw){
    var config = $.extend({}, window.UBCconfig),
        page = mw.config.get('wgPageName'),
        QuakeUI = window.QuakeUI;
    if (mw.config.get('wgCanonicalSpecialPageName') !== 'Blankpage') return;
    if (
        page.split('/').slice(1).indexOf('UBC') === -1 || 
        page.split('/').slice(1).indexOf('UserBoxCreator') === -1
    ) return;
    function UserBoxCreator(){
        this.username = mw.config.get('wgUserName');
        this.loaded = false;
        this.load = $.Deferred();
        this.options = $.extend({
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: '#000',
            infoBackground: '#33a',
            imageBackground: '#77f',
            imageColor: '#000',
            imageName: '',
            fontSize: '8pt',
            fontColor: '#000',
            fontFamily: 'Verdana, Helvetica, Arial, sans-serif',
            float: '',
            description: ''
        }, config);
    }
    
    UserBoxCreator.prototype.create = function(){
        
    };
}(window, jQuery, mediaWiki));