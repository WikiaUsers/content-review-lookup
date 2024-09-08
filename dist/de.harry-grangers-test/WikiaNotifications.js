/*!
 * WikiaNotification JS by User:Jak Himself and User:Gguigui1
 * Rework by Agent Zuri
 * http://dev.wikia.com/wiki/WikiaNotification
 * http://de.harry-grangers-test.wikia.com/wiki/MediaWiki:WikiaNotifications.js
 * requires jQuery
 * version 0.2
 */
 
var WikiaNotificationMessage = 'Herzlich Willkommen im Testwiki<br /><br /><a href="/wiki/" alt="home" title="Hauptseite">Hauptseite&gt;&gt;</a>';
var WikiaNotificationMessagePage = 'Custom-edit-rules';
var WikiaNotificationexpiry = window.WikiaNotificationexpiry || 10;

wikiaNotificationMessages = [{
    content: 'Herzlich Willkommen im Testwiki<br /><br /><a href="/wiki/" alt="home" title="Hauptseite">Hauptseite&gt;&gt;</a>'
},{
    page: 'Custom-edit-rules'
}];

function outputNotification(message) {
    if(!$('.WikiaBar').length) {
        $('.WikiaPage').after($('<div />').addClass('WikiaBar'));
    }
    if(!$('ul.WikiaNotifications#WikiaNotifications').length) {
        $('.WikiaBar').append(
            $('<ul />').addClass('WikiaNotifications').attr('id','WikiaNotifications')
        );
    }
 
    if (message.length) {
        $('ul.WikiaNotifications#WikiaNotifications').append(
            $('<li />').append(
                $('<div />')
                    .attr({
                        'data-type': '2',
                        'data-id': $('ul.WikiaNotifications#WikiaNotifications').length
                    })
                    .html(message)
                    .append(
                        $('<a />').addClass('sprite close-notification').on("click", function() {
                            parent = $(this).closest('li');
                            console.log('parent',parent);
                            parent.hide();
                            closedNotifications = JSON.parse(localStorage.getItem('WikiaNotifications') || '[]');
                            console.log('closedNotifications',closedNotifications);
                            closedNotifications.push(parent.find('div').data('id'));
                            console.log('closedNotifications',closedNotifications);
                            setCookie('WikiaNotification',message,WikiaNotificationexpiry);
                            localStorage.setItem('WikiaNotification',JSON.stringify(closedNotifications));
                       })
                    )
            )
        );
    }
    else {
        if (message === "") {
            console.error("WikiaNotification error: Message empty.");
        }
    }
}

function setCookie( cname, cvalue, exdays ) {
	var d = new Date();
	d.setTime(d.getTime() + (exdays*24*60*60*1000));
	var expires = "expires=" + d.toGMTString();
	document.cookie = cname + "=" + cvalue + "; " + expires;
}
 
$(function() {
	var ids = $.cookie('WikiaNotification'),
        expiry = window.WikiaNotificationexpiry;
        
        for(i in window.wikiaNotificationMessages) {
            console.log('notification item',window.wikiaNotificationMessages[i]);
            if(window.wikiaNotificationMessages[i].hasOwnProperty('page')) {
                $.get('/api.php?action=parse&page=MediaWiki:' + window.wikiaNotificationMessages[i].page + '&format=json', function(data) {
                    message = data.parse.text['*'];
                    outputNotification(message);
                });
            }
            else {
                outputNotification(window.wikiaNotificationMessages[i].content);
            }
        }
        if($('ul.WikiaNotifications#WikiaNotifications li').length >= 3) {
            console.warn('wikia notifications should used only sparely. Is there any notification which can already be deleted?');
        }
});