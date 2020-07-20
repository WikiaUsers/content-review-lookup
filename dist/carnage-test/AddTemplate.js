(function(mw, $, config){
    importArticle({ type: 'script', article: 'MediaWiki:WDSModal.js' });
    var AddTemplate = $.extend({}, window.AddTemplate);
    AddTemplate.templates = $.merge([], config.templates || []);
    AddTemplate.openModal = function(){
        var buttons = {
                'Cancel': {
                    id: 'AddTemplateCancel',
                    handler: function(event){
                        WDSModal.close($(event.target).parents('.wds-modal'));
                    }
                },
                'Submit': {
                    id: 'AddTemplateSubmit',
                    handler: function(event){
                        var data = WDSModal.getData($(event.target));
                        WDSModal.close($(event.target).parents('.wds-modal'));
                    }
                }
            },
            modal = WDSModal.open({
                id: 'AddTemplate',
                width: 650,
                heading: 'AddTemplate',
                content: this.getFormHTML(),
                buttons: buttons
            });
    };
}(mediaWiki, jQuery, config));