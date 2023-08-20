//Magic: Changes talk page link into contributions link on profile masthead
$(document).ready(function() { 
    var buttbutts = setInterval(function() {
        if ($('#UserProfileMasthead .wikis').length) {
            $('#UserProfileMasthead .wikis').find('a').each(function() {
                var lnk = this.href;
                this.href = lnk.replace("Usuario_discusión:","Special:Contributions/").replace("User:","Special:Contributions/");
            });
            clearInterval(buttbutts2);
        }
    },150),
//ES   - HOW IS THAT EVEN SUPPOSED TO WORK ó
    buttbutts2 = setInterval(function() {
        if ($('#UserProfileMasthead .wikis').length) {
            $('#UserProfileMasthead .wikis').find('a').each(function() {
                var lnk = this.href;
                this.href = lnk.replace("Usuario_discusi&Oacute;n:","Special:Contributions/").replace("User:","Special:Contributions/");
            });
            clearInterval(buttbutts2);
        }
    },150),
//DE
    buttbutts3 = setInterval(function() {
        if ($('#UserProfileMasthead .wikis').length) {
            $('#UserProfileMasthead .wikis').find('a').each(function() {
                var lnk = this.href;
                this.href = lnk.replace("Benutzer_Diskussion:","Special:Contributions/").replace("User:","Special:Contributions/");
            });
            clearInterval(buttbutts3);
        }
    },150),
//EN    
    buttbutts4 = setInterval(function() {
        if ($('#UserProfileMasthead .wikis').length) {
            $('#UserProfileMasthead .wikis').find('a').each(function() {
                var lnk = this.href;
                this.href = lnk.replace("User_talk:","Special:Contributions/").replace("User:","Special:Contributions/");
            });
            clearInterval(buttbutts4);
        }
    },150),
//FR    
    buttbutts5 = setInterval(function() {
        if ($('#UserProfileMasthead .wikis').length) {
            $('#UserProfileMasthead .wikis').find('a').each(function() {
                var lnk = this.href;
                this.href = lnk.replace("Discussion_utilisateur:","Special:Contributions/").replace("User:","Special:Contributions/");
            });
            clearInterval(buttbutts5);
        }
    },150),
//JA - home of anime
    buttbutts6 = setInterval(function() {
        if ($('#UserProfileMasthead .wikis').length) {
            $('#UserProfileMasthead .wikis').find('a').each(function() {
                var lnk = this.href;
                this.href = lnk.replace("メッセージウォール:","Special:Contributions/").replace("User:","Special:Contributions/");
            });
            clearInterval(buttbutts6);
        }
    },150),
//IT   
    buttbutts7 = setInterval(function() {
        if ($('#UserProfileMasthead .wikis').length) {
            $('#UserProfileMasthead .wikis').find('a').each(function() {
                var lnk = this.href;
                this.href = lnk.replace("Discussioni_utente:","Special:Contributions/").replace("User:","Special:Contributions/");
            });
            clearInterval(buttbutts7);
        }
    },150);
});