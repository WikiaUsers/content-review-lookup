if (wgUserName == "Kill1mes") {
    console.log('JS Disabled');
} else {
    $(document).ready(function () {
        //Custom Mod\Admin Badges (Change Sometime)
        setInterval(function () {
            $('#Rail .User.chat-mod:not(.admin) .username').each(function () {
                if (!this.innerHTML.match(/Dream Hacked|ChaoZStrider|CPwikiCHATlogger|Kill1mes|MrDark|CrashingCymbal|Esoteric Entity|Pramirez351|EvraVon53|Zack -The Undead Soldier- Skye/)) {
                    $(this).parent().addClass('admin');
                }
            });
        }, 1000)         
 
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
    });
}