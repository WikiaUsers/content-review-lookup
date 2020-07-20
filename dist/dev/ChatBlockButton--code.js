//<syntaxhighlight lang="javascript">
/**
 * ChatBlockButton
 * 
 * @description Blocks a user. 
 * If they're in the chat at that point then they are kicked also. 
 *
 * @author Ozuzanna
 */

var ButtonStyle = 'position:absolute; right:95px; top:0px;';
var BlockButton = document.createElement('a');
    BlockButton.setAttribute('class', 'wikia-button');
    BlockButton.setAttribute('id', 'chat-block-use');
    BlockButton.setAttribute('style', ButtonStyle);
    BlockButton.textContent = 'Block';

var ChatBar = document.getElementById('Write');
    ChatBar.appendChild(BlockButton);

var FormHTML = '\
<form method="" name="" class="WikiaForm "> \
    <fieldset> \
        <p>User to block: \
            <input type="text" id="block-name" value="" /> \
        </p> \
        <br/> \
        <p>Block length: \
            <input type="text" id="block-expiry" value="" /> \
        </p> \
        <br/> \
        <p>Block reasoning: \
            <input type="text" id="block-reason" value="" /> \
        </p> \
        <br/> \
        <label for="block-nocreate"><input type="checkbox" id="block-nocreate" />Disable account creation?</label> \
        <label for="block-rstrtp"><input type="checkbox" id="block-restrtp" />Disable talk page editing?</label> \
    </fieldset> \
</form>';

document.getElementById('chat-block-use').addEventListener('click', function () {
    $.showCustomModal('Block User', FormHTML, {
        id: 'chat-block',
        width: 400,
        buttons: [{
            message: 'Block',
            defaultButton: true,
            handler: function () {
                var block = {
                    action: 'block',
                    user: document.getElementById('block-name').value,
                    expiry: document.getElementById('block-expiry').value,
                    reason: document.getElementById('block-reason').value,
                    nocreate: '',
                    allowusertalk: '',
                    autoblock: 0,
                    format: 'json',
                    token: mw.user.tokens.values.editToken
                };

                if (!document.getElementById('block-nocreate').checked) {
                    delete block.nocreate;
                }

                if (document.getElementById('block-restrtp').checked) {
                    delete block.allowusertalk;
                }

                $.ajax({
                    url: mw.util.wikiScript('api'),
                    type: "POST",
                    dataType: "JSON",
                    data: block,
                    success: function(data) {
                        if (!data.error) {
                            $('#chat-block').closeModal();

                            $.showCustomModal('Success!', block.user + ' has been blocked for ' + block.expiry , {
                                id: 'chat-block-okay',
                                width: 400,
                                buttons: [{
                                    message: 'Okay',
                                    defaultButton: true,
                                    handler: function() {
                                        $('#chat-block-okay').closeModal();
                                    }
                                }]
                            });

                            mainRoom.kick({
                                name: block.user
                            });
                        } else {
                            $('#chat-block').closeModal();

                            $.showCustomModal('Failure!', data.error.code , {
                                id: 'chat-block-fail',
                                width: 200,
                                buttons: [{
                                    message: 'Okay',
                                    defaultButton: true,
                                    handler: function() {
                                        $('#chat-block-fail').closeModal();
                                    }
                                }]
                            });
                        }
                    },
                    error: function(err, status) {
                        $('#chat-block').closeModal();

                        $.showCustomModal('Failure!', 'An unknown error has occured!<br />' + err + ': ' + status , {
                            id: 'chat-block-fail',
                            width: 200,
                            buttons: [{
                                message: 'Okay',
                                defaultButton: true,
                                handler: function() {
                                    $('#chat-block-fail').closeModal();
                                }
                            }]
                        });
                    }
                });
            }
        }, {
            message: 'Cancel',
            handler: function() {
                $('#chat-block').closeModal();
            }
        }]
    });
});

//</syntaxhighlight>