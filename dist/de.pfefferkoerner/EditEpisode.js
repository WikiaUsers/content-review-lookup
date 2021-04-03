EditForm = $('<form />').append(
    $('<fieldset />').append(
        $('<legend />').html('Edit episode')   
    )  
);

// what was that supposed to do?
// fixing that for script test mode
var callback = function() {};

$.showCustomModal('Edit episode', EditForm, {
    id: 'form-settings',
    width: 500,
    buttons: [{  
      message: 'Cancel',
      handler: function() {
        $('#form-categorization').closeModal();
      }
    }, {
      id: 'save-button',
      message: 'Speichern',
      defaultButton: true,
      handler: callback
    }]
});