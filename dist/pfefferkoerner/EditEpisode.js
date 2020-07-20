EditForm = $('<form />').append(
    $('<fieldset />').append(
        $('<legend />').html('Edit episode')   
    )  
);

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