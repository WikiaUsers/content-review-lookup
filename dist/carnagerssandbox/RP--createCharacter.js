var RP = $.extend({}, this.RP);

RP.createCharacter = function(){
    RP.createModal({
        title: 'Create Character',
        content: RP.createCharacterForm,
        id: 'RP-create-modal',
        buttons: {
            'Cancel': { event: 'cancel', id: 'RP-create-cancel' },
            'Submit': { event: 'submit', id: 'RP-create-submit' }
        }
    }).then(function(modal, $elem){
        modal.bind('cancel', $.noop);
        modal.setData($.extend({
            name: $('#RP-create-name-field', $elem)
        }, RP.items));
        modal.bind('submit', function(event, ancestor, object){
            
        });
        modal.open();
    });
};