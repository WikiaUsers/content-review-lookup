/* 
 * @name        AjaxBanButtons
 * @description Adds ajax ban buttons to the user menu in Special:Chat
 * @author     Mario&LuigiBowser'sInsideStory
 */
$(document).on('click', 'li.User', function(){
    if ($(this).find('span.badge svg').exists()) return;
    var $user = $(this).attr('data-user');
    $('.UserStatsMenu').each(function (){
        if ($(this).css('display') === 'block') {
            var $this = $(this);
            window.ajaxBanButtons.map(function(el){
                $this.find('.admin-actions').append(
                    $('<li>', {
                            css: {
                            "cursor" : "pointer"
                        },
                        class:"quickBanButton",
                        'data-reason' : el.reason,
                        'data-expiry' : el.expiry,
                        'data-target' : $user,
                        text: el.label
                    })
                );
            });
        }
    });
}).on('click', '.quickBanButton', function(){
    var obj = {
        second: 1,
        minute: 60,
        hour: 3600,
        day: 86400,
        week: 604800,
        month: 2592000,
        year: 31536000,
    };
    var timeToBan = $(this).attr('data-expiry') === 'infinite' ? 31536000000 : $(this).attr('data-expiry').split(' ');
    if (timeToBan !== 31536000000 && timeToBan[1].charAt(timeToBan[1].length - 1) === 's') {
        timeToBan[1] = timeToBan[1].slice(0, -1);
    }
    if(timeToBan !== 31536000000) timeToBan = obj[timeToBan[1]] * timeToBan[0];
    mainRoom.socket.send(new models.BanCommand({
        userToBan: $(this).attr('data-target'),
        time: timeToBan,
        reason: $(this).attr('data-reason')
    }).xport());
    $(this).parents('.UserStatsMenu').hide();
});