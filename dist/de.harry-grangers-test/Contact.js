if(skin == "oasis") {
    toolbar = $('.wikia-bar .toolbar .tools');
}
else if(skin == "monobook") {
    toolbar = $('.portlet#p-tb .pBody > ul');
}
else {
    throw new Error('Your skin is not supported yet! Please contact the creator to add support for it.');
}

$(toolbar).append(
    $('<li />').append(
        $('<span />').addClass('arrow-icon-ctr').append(
            $('<span />').addClass('arrow-icon arrow-icon-single')
        ).click(contactFormToggle),
        $('<a />').attr('href','').text('Kontakt').click(contactFormToggle),
        $('<div />').addClass('tools-menu hide tools-contact-form').append(
            $('<form />').append(
                $('<select />').attr('id','tools-contact-receiver').append(
                    $('<option />').val('featurerequest').text('Featurerequest'),
                    $('<option />').val('admin').text('Einen Admin kontaktieren'),
                    $('<option />').val('support').text('Support kontaktieren')
                ).css({
                    'display': 'block',
                    'width': '700px',
                    'margin': '2px'
                }).change(contactReceiverChange),
                $('<input />').attr({
                    'type': 'text',
                    'placeholder': 'Betreff'
                }).addClass('tools-contact-subject').css({
                    'display': 'block',
                    'width': '700px',
                    'margin': '2px'
                }),
                $('<textarea />').addClass('tools-contact-message').css({
                    'display': 'block',
                    'width': '700px',
                    'height': '350px',
                    'margin': '2px'
                }).attr('placeholder','Nachricht'),
                $('<div />').addClass('support-contact-form').css({
                    'display': 'none',
                    'padding': '5px',
                    'width': '700px',
                    'height': '350px'
                }),
                $('<input />').attr('type','submit').addClass('button wikia-button tools-contact-submit').css({
                    'display': 'block',
                    'margin': '2px'
                })
            ).submit(contactFormSubmit)
        )
    )
);
function contactFormToggle(e) {
    if(e) {
        e.preventDefault();
    }
    if($('.tools-contact-form').hasClass('hide')) {
        $('.tools-contact-form').removeClass('hide').addClass('show');
    }
    else {
        $('.tools-contact-form').removeClass('show').addClass('hide');
    }
}
function contactFormSubmit(e) {
    e.preventDefault();
    form = e.currentTarget;
    receiver = $('#tools-contact-receiver').val();
    message = $('.tools-contact-message').val();
    subject = $('.tools-contact-subject').val();

    switch(receiver) {
        case 'featurerequest':
            postNewMessage('Agent Zuri',message,'Featurerequest: ' + subject);
            break;
        case 'admin':
            $.getJSON('http://de.harry-grangers-test.wikia.com/api.php?action=query&list=allusers&augroup=sysop&format=json', function(data) {
                admins = data.query.allusers;

                require(['ext.dev.notifications'], function(Notifications) {
                    console.log(Notifications);
                },function() {
                    console.log('Module not defined. post messages the normal way');
                });

                postNewMessage(admins[0].name,message,subject,function(threadID) {
                    admins.shift();
                    for(var i in admins) {
                        postNewMessage(admins[i].name,'Es wurde eine neue Nachricht an das Wikiteam geschrieben: [[Diskussionsfaden:' + threadID + ']] ([{{fullurl:Diskussionsfaden:' + threadID + '|action=watch}} Benachrichtungen zum Nachrichtenverlauf bekommen])','Nachricht an alle Admins');
                    }
                });
            });
            break;
        case 'admin':
            $.getJSON('http://de.harry-grangers-test.wikia.com/api.php?action=query&list=allusers&augroup=sysop&format=json', function(data) {
                admins = data.query.allusers;
                for(var i in admins) {
                    postNewMessage(admins[i].name,message,'Nachricht an alle Admins');
                }
            });
            break;
        case 'all':
            postNewMessage('Agent Zuri',message,'neuigkeiten!',1);
            break;
    }
    
}
function contactReceiverChange() {
    console.log($('#tools-contact-receiver'),$('#tools-contact-receiver option:selected'));
    if($('#tools-contact-receiver').val() == 'support') {
        $('.support-contact-form').load('/wiki/Spezial:Kontakt/general #mw-content-text', function() {
            $('.tools-contact-submit, .tools-contact-message, .tools-contact-subject').hide();
            $('.support-contact-form').css('color','black').show();
        });
    }
    else  {
        $('.support-contact-form').hide();
        $('.tools-contact-submit, .tools-contact-message, .tools-contact-subject').show();
    }
}
function postNewMessage(username,message,subject,ccFunction,notifyeveryone) {
    $.nirvana.postJson('WallExternal','postNewMessage',{
        body: message,
        messagetitle: subject,
        pagetitle: username,
        pagenamespace: 1200,
        convertToFormat: 'wikitext',
        token: mw.user.tokens.values.editToken
    },function(data) {
        if(typeof ccFunction == 'function' && data.status) {
           threadID = $(data.message).data('id');
           ccFunction(threadID);
        }
        contactFormToggle();
        if(!$('.WikiaPageContentWrapper .banner-notifications-wrapper').length) {
            $('.WikiaPageContentWrapper').append($('<div />').addClass('banner-notifications-wrapper'));
        }
        $('.banner-notifications-wrapper').append(
            $('<div />').addClass('banner-notification confirm').append(
                $('<button />').addClass('close wikia-chiclet-button').append(
                    $('<img />')
                ).click(function() {
                    $(this).parent().detach();
                }),
                $('<div />').addClass('msg').text('Message successfully sent')
            )
        )
    });
}