Extension.Application = function(){
    var $application = $('div.application');
    $(document).ready(function(){
        var $button = $('<a href="/wiki/Project:Applications" class="app-button application-button">Create Application</a>');
        $button.on('click', function(event){
            event.preventDefault();
            event.stopPropagation();
            var $form = Extension.ui.createForm('Create Application', {
                description: '',
                inputs: {
                    'Username': {
                        defaultValue: '',
                        id: 'application-username',
                        placeholder: 'Enter your username.'
                    },
                    'Position': {
                        defaultValue: '',
                        id: 'application-position',
                        placeholder: 'Position you are applying for.'
                    },
                    'Description': {
                        defaultValue: '',
                        id: 'application-description',
                        placeholder: 'Write a few things about yourself and why you\'re applying for this position.',
                        type: 'textarea'
                    }
                },
                buttons: {
                    'Cancel': {
                        id: 'application-cancel',
                        handler: function cancel(event){
                            $application.html($button);
                        }
                    },
                    'Confirm': {
                        id: 'application-confirm',
                        handler: function confirm(event){
                            var title = $button.attr('href'),
                                values = Extension.ui._get('values', ['application-username', 'application-position', 'application-description']),
                                text =
                                    '==' + values['application-username'] + '==' +
                                    '\'\'\'Position:\'\'\' ' + values['application-position'] + '<br />' +
                                    '\'\'\'Description:\'\'\' ' + values['application-description'];
                            title = title.replace('/wiki/', '');

                            $.ajax({
                                method: 'POST',
                                url: mw.util.wikiScript('api'),
                                data: {
                                    action: 'edit',
                                    title: title,
                                    section: 'new',
                                    text: text,
                                    token: mw.user.tokens.values.editToken
                                }
                            }).done(function(){
                                window.location.reload();
                            });
                        }
                    }
                }
            });
            $application.html($form);
        });
        
        if (!$application.has('.app-button'))
            $application.append($button);
    });
};

Extension.activate('Application');