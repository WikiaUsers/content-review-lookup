if($.inArray(wgNamespaceNumber,[3,1200,1201]) != -1) {
    if(!!$('.private_message').length) {
        hideMessage = $('<i />').text('You are not allowed to read this message.');
        hideMessageAll = 'You are not allowed to read any message if this thread.';

        if(!!$('.private_message[data-user]').length) {
            console.log(wgPageName.split(':')[1]);
            sender = $('.private_message').closest('.MiniEditorWrapper').find('.edited-by a:first-of-type').text();
            recipient = wgUserName;
            switch(wgNamespaceNumber) {
               case 3:
               case 1200:
                   recipient = wgPageName.split(':')[1].replace('_',' ');
                   break;
               case 1201:
                   recipient = $('#mw-content-text .BreadCrumbs a:first-of-type').text().replace('s Nachrichten','');
                   break;
            }
            if(wgUserName == $('.private_message').attr('data-user') || wgUserName == recipient || wgUserName == sender) {
                console.log('locked up');                
            }
            else {
                $('.private_message').html(hideMessage);
                $('#ca-edit').detach();
                if($('.private_message').attr('data-mode') == 'all' || $('.private_message').attr('data-mode') != 'single') {
                    $('ul.replies').empty().append(
                        $('<li />')
                                  .addClass('SpeechBubble message hide message-removed message-2')
                                  .attr({
                                      'id': 2,
                                      'data-is-reply': 1
                                  })
                                  .append(
                                      $('<div />')
                                                 .addClass('removed-info speech-bubble-message-removed')
                                                 .text(hideMessageAll)
                                                 .show()
                                  )
                    );
                    console.log('css important',$('ul.replies li'),$('ul.replies li').attr('style'));
                    $('ul.replies li')[0].style.setProperty('display', 'block', 'important');
                }
            }
        }
        else {
            $('.private_message,#ca-edit').html(hideMessage);
            $('#ca-edit').detach();
        }
    }
    else {
        console.warn('No private message');
    }
}