$(document).ready(function(){
    var reportActive = false;
    if ($('#report-button').length) reportActive = true;
    if (!reportActive) return;
    
    window.openForm = window.openForm || function openForm(event){
        var form_html =
            '<form class="WikiaForm report-form" id="report-form" method="" name=""> \
                <fieldset onload="console.log(\'The form has been loaded\');"> \
                    <div class="form-input"> \
                        <label for="report-admin" class="form-input-label">Which admin are you reporting it to?</label> \
                        <input id="report-admin" class="form-input-field" name="report-admin" /> \
                    </div> \
                    <div class="form-input"> \
                        <label for="report-heading" class="form-input-label">What is the issue you are having with someone?</label> \
                        <input id="report-heading" class="form-input-field" name="report-heading" /> \
                    </div> \
                    <div class="form-input"> \
                        <label for="report-user" class="form-input-label">Who is causing the problem?</label> \
                        <input id="report-user" class="form-input-field" name="report-user" /> \
                    </div> \
                    <div class="form-input"> \
                        <label for="report-description" class="form-input-label">Can you give us a description on what it is? (optional)</label> \
                        <textarea id="report-description" class="form-input-field" name="report-description" cols="30" rows="10"></textarea> \
                    </div> \
                </fieldset> \
            </form>',
            $modal = $.showCustomModal('Report', form_html, {
                get id(){
                    return 'ReportForm';
                },
                get width(){
                    return 650;
                },
                get buttons(){
                    const cancel_button = {
                            id: 'cancel-button',
                            message: 'Cancel',
                            handler: function cancel(event){
                                $modal.closeModal();
                            }
                        },
                        submit_button = {
                            id: 'submit-button',
                            message: 'Submit',
                            defaultButton: true,
                            handler: function submitForm(event){
                                var param1 = $('#report-heading').val(),
                                    param2 = $('#report-user').val(),
                                    param3 = $('#report-description').val(),
                                    admin = $('#report-admin').val(),
                                    fullTemp = 
                                        '==' + param1 + '== \
                                        \'\'\'User:\'\'\' ' + param2 + '\n \
                                        \'\'\'Description:\'\'\' ' + param3 + '\n';
                                $.ajax({
                                    method: 'POST',
                                    url: mw.util.wikiScript('api'),
                                    data: {
                                        action: 'edit',
                                        title: 'User talk:' + admin || wgUserName,
                                        section: 'new',
                                        text: fullTemp,
                                        token: mw.user.tokens.values.editToken
                                    }
                                }).done(function(data){
                                    window.location.reload();
                                });
                            }
                        };
                    var buttons = [cancel_button, submit_button];
                    return buttons;
                }
            });
    };
    
    $('#report-button').on('click', openForm);
});