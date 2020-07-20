//UserPage Create
$(function() {
    $('<li>').html('<a href="#">Create Profile</a>')
        .prependTo('.toolbar .tools')
        .click(function() {
            $.showCustomModal('Profile Information', '<p>Infobox Background Color</p><input id="ifbbgcolor" type="text" size="50"></input><br /><p>Title</p><input id="ifbtitle" type="text" size="50"></input><br /><p>Image</p><input id="ifbimage" type="text" size="50"></input><br /><p>Voiced By</p><input id="ifbvoiceb" type="text" size="50"></input><br /><p>Species</p><input id="ifbspecies" type="text" size="50"></input><br /><p>Gender</p><input id="ifbgender" type="text" size="50"></input><br /><p>Nicknames</p><input id="ifbnickn" type="text" size="50"></input><br /><p>Friends</p><input id="ifbfriend" type="text" size="50"></input><br /><p>Occupation</p><input id="ifboccu" type="text" size="50"></input><br /><p>Affiliation</p><input id="ifbaffil" type="text" size="50"></input><br /><p>Residence</p><input id="ifbres" type="text" size="50"></input><br /><p>First Appearance</p><input id="ifbfapp" type="text" size="50"></input><br /><p>Other Appearances</p><input id="ifboapp" type="text" size="50"></input>', {
                id: 'cpModal',
                buttons: [{
                    id: 'createProfile',
                    defaultButton: true,
                    message: 'Create',
                    handler: function() {
                        var ifbbgcolor = $('#ifbbgcolor').val();
                        var ifbtitle = $('#ifbtitle').val();
                        var ifbimage = $('#ifbimage').val();
                        var ifbvoiceb = $('#ifbvoiceb').val();
                        var ifbspecies = $('#ifbspecies').val();
                        var ifbgender = $('#ifbgender').val();
                        var ifbnickn = $('#ifbnickn').val();
                        var ifbfriend = $('#ifbfriend').val();
                        var ifboccu = $('#ifboccu').val();
                        var ifbaffil = $('#ifbaffil').val();
                        var ifbres = $('ifbres').val();
                        var ifbfapp = $('ifbfapp').val();
                        var ifboapp = $('#ifboapp').val();
                        new mw.Api().post({
                            action: 'edit',
                            title: 'User:' + wgUserName,
                            summary: 'Creating Profile',
                            text: '{{UserPage' +
                            '|BGColor=' +  ifbbgcolor +
                            '|Title=' + ifbtitle +
                            '|image=' + ifbimage +
                            '|Voicedby=' + ifbvoiceb +
                            '|Species=' + ifbspecies +
                            '|Gender=' + ifbgender +
                            '|Nicknames=' + ifbnickn +
                            '|Friends=' + ifbfriend +
                            '|Occupation=' + ifboccu +
                            '|Affiliation=' + ifbaffil +
                            '|Residence=' + ifbres +
                            '|FirstAppearance=' + ifbfapp +
                            '|OtherAppearances=' + ifboapp +
                            '}}',
                            format: 'json',
                            createonly: true,
                            token: mw.user.tokens.get('editToken')
                        }).done(function(data) {
                            if (data.edit.result === 'Success') {
                                new BannerNotification("Successfully created page!", "confirm").show();
                            } else {
                                new BannerNotification("An error occurred.", "error").show();
                            }
                        }).fail(function(data) {
                            new BannerNotification("An error occurred.", "error").show();
                        });
                    }
                }, {
                    id: 'cpCancel',
                    defaultButton: true,
                    message: 'Cancel',
                    handler: function() {
                        $('#cpModal').closeModal();
                    }
                }]
            });
        });
});