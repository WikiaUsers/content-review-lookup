;(function(mw, $, window, GradientCreator){
    var mwValues = mw.config.get('wgPageName, wgUserName, wgDBname, wgServer, wgIsDarkTheme, skin'.split(/,(?:\s+|)/g));
    
    if ((mwValues.skin == 'oasis' ||
        mwValues.skin == 'wikia') &&
        mwValues.wgPageName == 'Special:GradientCreator'){
        var $gradient_editor = $('<section class="GradientEditor" id="GradientEditor" />'),
            config = {
                prefixed: GradientCreator.prefixed || true,
                fallbackColor: GradientCreator.fallbackColor || '',
                theme: GradientColor.theme || (mwValues.wgIsDarkTheme === true) ? 'dark' : 'light'
            };
    }
})(this.mediaWiki, this.jQuery, window, this.GradientCreator || {});