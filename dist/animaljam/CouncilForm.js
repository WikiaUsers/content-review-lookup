//<nowiki> -- to prevent link parsing
if (mw.config.get("wgPageName") == "Animal_Jam_Wiki:Wiki_Council/Council_Requests") {
    $( "#councilform" ).click(function() {
        $.showCustomModal('Submit Council request', 'Fill in the following details to submit a council request:<form style="width: 400px"><label>Involved Parties<input style="float: right; display: inline; width: 200px" id="cm-involved"></label><br/><label>Statement<textarea name="cm-message" style="width: 198px; float: right; display: inline; resize: vertical"></textarea></label></form><br style="clear: both">Please add all users involved (on both sides of the issue, excluding yourself) to the "Involved Parties" box, seperated by semicolons, and your own statement of the issue in the "Statement" box.', {
                id: 'council-form',
                width: 650,
                    buttons: [{
                    message: 'Submit',
                    defaultButton: true,
                    handler: function () {
                        submitForm();
                    }
                }, {
                    message: 'Cancel',
                    handler: function () {
                        $('#council-form').closeModal();
                    }
                }]
            }
        );
    });
}
    
function submitForm() {
    $('#chat-block').closeModal();
    var info = {
        involved: $('#cm-involved').val(),
        statement: $('td[name=cm-message]').val()
    };
    var array = info.involved.split(";");
    var involved = "";
    $.each(array, function(index, value) {
        involved += "{{u|"+value+"}}<br/>";
    });
    var username = mw.config.get("wgUserName");
    var date = (new Date()).toUTCString().slice(0, -3) + "UTC";
    $.ajax({
       url: mw.util.wikiScript( 'api' ),
       data: {
           format: 'json',
           action: 'edit',
           title: 'Project:Wiki_Council/Council_Requests/'+ username,
           summary: 'Creating Council request',
           createonly: true,
           text: "{{" + "subst:Council/Arbitration|"+date+"|"+username+"|"+involved+"|"+info.statement+"}}",
           token: mw.user.tokens.get('editToken')
       },
       dataType: 'json',
       type: 'POST',
       success: function( data ) {
            if ( data && data.edit && data.edit.result == 'Success') {
                window.location.href = "http://animaljam.wikia.com/wiki/Project:Wiki_Council/Council_Requests/" +username;
            } else if ( data && data.error) {
                alert( 'Error: API returned error code "' + data.error.code + '": ' + data.error.info );
            } else {
                alert( 'Error: Unknown result from API.' );
            }
            
        },
        error: function( xhr ) {
            alert( 'Error: Request failed.' );
        }
    });
}

//</nowiki>