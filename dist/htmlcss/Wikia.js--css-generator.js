;(function(mw, $, window, document, CSSGenerator){
    const mwValues = mw.config.get([
            'wgPageName',
            'wgUserName',
            'wgUserLanguage',
            'wgUserGroups',
            'wgPageContentLanguage',
            'wgNamespaceNumber',
            'wgArticlePath',
            'wgServer'
        ]),
        fullURL = (wgServer + wgArticlePath).replace('$1', wgPageName.replace(/\s+/g, '_'));
    
    function inGroup(groups){
        let group = null,
            value = null;
        if (groups.length > 1){
            for (let i = 0; i < groups.length; i++){
                let group_name = groups[i];
                if (mwValues.wgUserGroups.indexOf(group_name) > -1){
                    value = true;
                    break;
                }
                value = false;
            }
        } else if (groups.length === 1){
            group = groups[0];
            if (mwValues.wgUserGroups.indexOf(group) > -1){
                value = true;
            } else {
                value = false;
            }
        } else {
            value = void 0;
        }
        return value;
    }
    
    CSSGenerator.prototype.createUI = function(config){
        let [ui,d] = [1,2];
    };
    
    CSSGenerator.prototype.validate = function(event){
        
    };
})(this.mediaWiki, this.jQuery, (this || document.defaultView || window), document, function(){
    this.isGeneratorPage = this.verify() || false;
    this.generatorTitle = 'CSS Generator';
    return this;
});