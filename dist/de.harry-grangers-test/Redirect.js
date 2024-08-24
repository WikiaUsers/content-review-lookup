path = url.path.split('/');
path.splice(0,2);
path = decodeURI(path.length > 1 ? path.join('/') : path[0]);
originPageName = path;
originBasePageName = url.path.split('/')[url.path.split('/').length - 1];
console.log(originPageName,wgPageName);
testmode = false;
wgBasePageName = wgPageName.indexOf('/') != -1 ? wgPageName.split('/')[wgPageName.split('/').length - 1] : wgPageName;
if(isset(urlparams) && urlparams.hasOwnProperty('cb')) {
    testmode = true;
    console.log('Testmode is on:',originPageName);
}
if(typeof wgRedirectedFrom != 'undefined') {
    require(['BannerNotification'],function(BannerNotification) {
	new BannerNotification('Redirected from: ' + wgRedirectedFrom,'notify').show();
    });
    if($('.redirect_annotation.redirect_from_' + wgRedirectedFrom).exists()) {
        el = mw.util.$content.find('.redirect_from_' + wgRedirectedFrom);
        el.detach();
        mw.util.$content.prepend(el);
        el.show();
    }
}
if(originPageName != wgPageName) {
    console.error('This page is a redirect from',originPageName,'to',wgPageName);
    $.get('http://de.harry-grangers-test.wikia.com/wiki/Benutzer:Agent_Zuri/Redirect_to?action=raw',function(data) {
        html = $.parseHTML(data);
        html.shift();
        box = $('<div />').addClass('notificationWrapper').html($(html));
        notification = box.find('.redirect-notification');
        console.log('originPageId',notification);
        if(!!notification.length) {
            alert = $('<div />').addClass('alert alert-info alert-dismissible fade in').attr('role','alert');
            button = $('<button />').addClass('close').attr({
                'type': 'button',
                'data-dismiss': 'alert',
                'aria-label': 'Close'
            });
            close = $('<span />').attr('aria-hidden','true').html('&times;');
            button.append(close);
            alert.append(button);
            alert.append($(notification));
            alert.prependTo($('.mw-content-text#mw-content-text'));
        }
    });
    
    $('button.close[data-dismiss="alert"]').click(function() {
       $(this).parent().detach();
   });
}

if(!!$('.redirectText').length && url.query.hasOwnProperty('redirect') === false && !!$('.redirectText a').text().match(/^(w:c:|http(s)?)/)) {
    new_url = $('.redirectText a').attr('href');
    $('.redirectText').detach();
    $('.redirectMsg').empty();
    $('.redirectMsg').append(
        $('<span />').text('Sie werden in fünf Sekunden weitergeleitet an folgende URL: ' + new_url).prepend(
            $('<strong>').text('Achtung: ')    
        )
    );
    setTimeout(function() {
        window.location.href = new_url;
    },5000);
}