if (wgUserName == "Kill1mes") {
    console.log('JS Disabled');
} else {
    $(document).ready(function () {
        //Custom Mod\Admin Badges (Change Sometime)
        setInterval(function () {
            $('#Rail .User.chat-mod:not(.admin) .username').each(function () {
                if (!this.innerHTML.match(/Slayingthehalcyon/)) {
                    $(this).parent().addClass('admin');
                }
            });
        }, 1000)   
 
        $('#user-Princess_Platinum').removeClass('chat-mod').removeClass('admin');      
 
        //Chat Options Import
       importScriptURI('https://raw.github.com/PrincessPlatinum/ChatOptions/master/Options-Menu.js');
 
        // Anti-chat linking censor
        $('[name="message"]').keypress(function (e) {
            if (e.which == 32 || e.which == 13) {
                this.value = this.value.replace(/Special:Chat|encyclopediadramatica/gi, 'No');
            }
        });
        // Fix Mobile Link
        $('[name="message"]').keypress(function (e) {
            if (e.which == 32 || e.which == 13) {
                this.value = this.value.replace(/http:\/\/m./g, 'http://www.');
            }
        });
 
       if (!document.cookie.match(/(?:^|; *)alert_shown=1/)) {
           var confirmcheck = confirm('This chat can at times contain adult material that is not suitable for everyone. Click Ok to continue.');
           if (confirmcheck === true) {
               document.cookie = "alert_shown=1;max-age=" + 60 * 60 * 24 * 365;
           } else {
               window.location.href = "http://creepypasta.wikia.com";
           }
       }
    });
}