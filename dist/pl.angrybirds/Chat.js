$("#ChatHeader .User").attr("data-user", wgUserName);
// WORDFILTER by Drew1200, translation by Szynka013
window.outputWarning = '';
window.badWords = ["blocked-test", "penis", "chuj", "chujem", "chujnie", "chuju", "chuje", "chujowo", "chuja", "chujowi", "chujach", "chujami", "kurwa", "kurwy", "kurwie", "kurwę", "kurwą", "kurwą", "kurwo", "kurwy", "kurw", "kurwami", "kurwach", "spierdalaj", "spierdalajcie", "spierdalają", "spierdoliło", "spierdoliliście", "pojebany", "pojebana", "pojebani", "pojebało"];
$('#Write textarea').keydown(function(e) {
    if (e.keyCode == 13 && wordFilter() === true && mainRoom.active === true) {
        for (var i = 0; i < window.badWords.length; i++) {
            window.outputWarning = $('#Write textarea').val();
        }
        $("div.Chat>ul").append("<li class='inline-alert'>W tej wiadomości znajdują się treści, które są uważane powszechnie za wulgarne! Czy chcesz przesłać swoją wiadomość?<span id='temporary'> ~<br><br>~ <span onclick='ignoreWarning();' style='color:blue;cursor:pointer;'>Tak</span> czy <span onclick='endMessage();' style='color:blue;cursor:pointer;'>Nie</span><span></li>");
        $(this).unbind('keypress').val('');
    }
})
importScriptPage("ChatTags/code.js", "dev");
importArticles( {
    type: 'script',
    articles: [
        // ...
        'u:dev:!kick/code.js',
        // ...
    ]
} );
/**
 * !jumbles
 * By Dessamator
 * WikiJumbles 
 * Startup script
 */
 
importArticles( {
    type: 'script',
    articles: [
        // ...
        "u:dev:Jumbles/gameinterface.js",
        "u:dev:Jumbles/code.js"
        // ...
    ]
} );
// by Wedkarski
// v2.0
if ( wgDBname === 'plwikia' ) {
    function WywalRR() {
       mainRoom.kick({name:"Rrouge"});
    }
    function WywalPawla() {
       mainRoom.kick({name:"Lartament"});
    }
    function WywalNF() {
       mainRoom.kick({name:"Night Furia"});
    }
    $('<a class="wikia-button" href="javascript:WywalRR()" style="position:absolute; right:0; bottom:0px; width:127px; text-align: center;">Wywal RR</a>').appendTo('#Rail');
    $('<a class="wikia-button" href="javascript:WywalPawla()" style="position:absolute; right:0; bottom:22px; width:127px; text-align: center;">Wywal Pawla</a>').appendTo('#Rail');
    $('<a class="wikia-button" href="javascript:WywalNF()" style="position:absolute; right:0; bottom:44px; width:127px; text-align: center;">Wywal NF</a>').appendTo('#Rail');
}