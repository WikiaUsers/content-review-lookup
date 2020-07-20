/* init */
/*if(!!$('.discussions_container').length) {
    $.getScript('http://underscorejs.org/underscore-min.js',function() {
        getDiscussions('threads',showDiscussions); 
    });
}
$('.wds-global-navigation .wds-notifications').hover(function() {
   getNotifications(function(data) {
       notifications = data.notifications;
       ul = $('.wds-global-navigation .wds-notifications .wds-notifications__notification-list').empty();
       notifications.forEach(function(notification) {
           var type = notification.type.split('-')[0];
           console.log(
               'type',
               notification.type.split('-')[0],
               (/([a-z]+)s$/.exec(type) || ["",type])[1].replace('ie','y')
            );
            type = (/([a-z]+)s$/.exec(type) || ["",type])[1].replace('ie','y');
            console.log('type',type);
           var event = notification.events.latestEvent;
           $('<li />').addClass('wds-notification-card').attr({
               'data-type': 'discussion-' + notification.type,
               'data-uri': event.uri
           }).append(
                $('<a />')
                    .attr('href',event.uri)
                    .addClass('wds-notification-card__outer-body')   
                    .append(
                        $('<div />').addClass('wds-notification-card__icon-wrapper').html('<svg class="wds-icon" viewBox="0 0 18 18"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#wds-icons-' + type + '-small"></svg>'),
                        $('<div />').addClass('wds-notification-card__body').append(
                            $('<p />').addClass('wds-notification-card__text').html(''),
                            $('<p />').addClass('wds-notification-card__snippet').text(event.snippet),
                            $('<ul />')
                                .addClass('wds-notification-card__context-list')
                                .append(
                                    $('<li />')
                                        .addClass('wds-notification-card__context-item')
                                        .text(''),
                                    $('<li />')
                                        .addClass('wds-notification-card__context-separator')
                                        .html('&middot;'),
                                    $('<li />')
                                        .addClass('wds-notification-card__context-item wds-notification-card__community')
                                        .text(notification.community.name)
                                 )
                        )
                    )
            ).appendTo(ul);
       });
   }); 
});*/
    
/* output */
/*function showDiscussions(threads) {
    console.log('threads',threads);
    for(var i in threads) {
        console.log('thread',threads[i]);
    }
}

function listToString(list) {
    if(list.length > 1) {
        end = list.pop();
        return list.join(', ') + ' und ' + end;
    }
    else {
        return list;
    }
}*/

/* getter */
/*function getNotifications(callback,limit,page,ts) {
    url = 'https://services.wikia.com/on-site-notifications/notifications?' + $.param({
       limit: ((limit && limit <= 50) ? limit : 10),
       page: page || 1,
       startingTimestamp: ts || new Date().toISOString()
    }).replace(/%3A/g,':'); //fix colon replacement
    $.ajax({
        url: url,
        type: 'GET',
        dataType: "json",
        success: function(data) {
            callback(data);
        },
       xhrFields: {
          withCredentials: true
       }
    });
}

function getDiscussions(item,callback) {
    $.getJSON('https://services.wikia.com/discussion/1965/threads/',function(data) {
        if(!item || item == 'threads') {
            callback(data._embedded.threads);
        }
        else if(item == 'categories') {
            callback(data._embedded.forums);
        }
    });
}*/