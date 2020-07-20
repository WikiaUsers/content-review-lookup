/*Powitanie */
var cwmLoader = setInterval(function() {
    if(typeof $(".Chat > ul > .inline-alert")[0] !== "undefined") {
        welcomeMessage = $(".Chat > ul > .inline-alert")[0]; // Selects the first welcome message.
        $(welcomeMessage).html('<table class="ChatWelcomeTable" style="border: 1px solid white; border-radius:64px; padding:5px; padding-left:32px; padding-right:32px; margin-left: auto; margin-right: auto; background-color: white;"><tr><td><big>Witaj w Spółce Zło Dundersztyca!</big><br />Pamiętaj, by podczas pisania na czacie przestrzegać <u><a href="http://pl.fiffan.wikia.com/wiki/Fanowska_Fineasz_i_Ferb_Wiki:Regulamin/Czat">regulaminu czatu</a></u>.<br />Zobacz także listę <a href="http://pl.fiffan.wikia.com/wiki/MediaWiki:Emoticons">dostępnych emotikon</a></u>.</td></tr></table>');
        clearInterval(cwmLoader);
        console.error("CWM loaded, tried to change it");
    } else {
        console.log("CWM isn't loaded");
    }
},50);