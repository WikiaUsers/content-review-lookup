function notify(msg) {
    if(!$('.banner-notifications-wrapper').length) {
        $('.WikiaPageContentWrapper').append(
            $('<div />').addClass('banner-notifications-wrapper')
        );
    }

    classes = ['banner-notification','custom'];
    classAdd = 'notify';
    if(arguments.length > 1) {
        switch(arguments[1]) {
            case 'warning':
            case 'warn':
                classAdd = 'warn';
                break;
            case 'danger':
            case 'error':
                classAdd = 'error';
                break;
            case 'success':
            case 'confirm':
                classAdd = 'confirm';
                break;
        }
    }
    classes.push(classAdd);

    notificationContainer = $('.banner-notifications-wrapper')
                                .on('click','.banner-notification.custom',function() {
                                    $(this).closest('.banner-notification.custom').fadeOut();
                            });
                            notification = $('<div />').addClass(classes.join(' ')).append(
                                $('<button />').addClass('close wikia-chiclet-button').append($('<img />'))
                            ).append(
                                $('<div />').addClass('msg').html(msg)
                            ).appendTo(notificationContainer);
}