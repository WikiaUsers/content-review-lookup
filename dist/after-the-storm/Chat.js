$(document).ready(function () {
    //Custom Mod\Admin Badges (Change Sometime)
    setInterval(function () {
        $('#Rail .User.chat-mod:not(.admin) .username').each(function () {
            if (!this.innerHTML.match(/Dream Hacked|ChaoZStrider|CPwikiCHATlogger|CrashingCymbal|Esoteric Entity|MrDark|Pramirez351|EvraVon53|Zack -The Undead Soldier- Skye|Zyranne|Prince Weaver|Silverspots/)) {
                $(this).parent().addClass('admin');
            }
        });
        $('#user-Princess_Platinum').removeClass('chat-mod').removeClass('admin');
    }, 1000)
 
    //Chat Options Import
    importScriptURI('https://raw.github.com/PrincessPlatinum/ChatOptions/master/Options-Menu.js');
 
    // Anti-chat linking censor
    $('[name="message"]').keypress(function (e) {
        if (e.which == 32 || e.which == 13) {
            this.value = this.value.replace(/Special:Chat|encyclopediadramatica|ask.fm/gi, '<Banned Link>');
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
            window.location.href = "http://the-rp-fear.wikia.com";
        }
    }
 
    $('[name="message"]').keypress(function (e) {
        if (e.which == 13) {
            var string = this.value.toLowerCase();
            if (string.indexOf("[[special:userlogout") > -1) {
                this.value = "I am a fail troll who should feel bad";
            }
        }
    });
});