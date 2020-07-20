//Censor script, written by Fubuki風吹 for PVZCC :)
$( function () {
    if ( mw.config.get( 'wgCanonicalSpecialPageName' ) == 'Chat' ) {
        var count = 0;
        $( '[name="message"]' ).on( 'keydown', function ( a ) {
            if ( a.which == 32 || a.which == 13 ) {
                // All words
                var swears = [             'arse','arsehole','assbag','assbandit','assbanger','assbite','assclown','asscock','asscracker','asses','assface','assfuck','assfucker','assgoblin','asshat','asshead','asshole','asshopper','assjacker','asslick','asslicker','assmunch','assmuncher','asspirate','assshole','asswipe','bampot','bastard','beaner','bitch','bitchass','bitchtits','bitchy','blow job','blowjob','boner','brotherfucker','bullshit','bumblefuck','butt plug','butt-pirate','buttfucka','buttfucker','camel toe','carpetmuncher','chinc','choad','chode','clitface','clitfuck','cockbite','cockface','cockfucker','cockknoker','cockmaster','cockmongler','cockmongruel','cockmonkey','cockmuncher','cockshit','cocksmith','cocksmoker','cocksucker','coochie','coochy','coon','cooter','cum','cumbubble','cumjockey','cumtart','cunt','cunthole','deggo','dickbag','dickbeaters','dickface','dickfuck','dickhead','dickhole','dickmonger','dickweasel','dickweed','dickwod','dipshit','dookie','douche-fag','douchebag','douchewaffle','dumass','dumb ass','dumbass','dumbfuck','dumbshit','dumshit','fagbag','fagfucker','faggit','faggot','fagtard','fatass','fellatio','feltch','flamer','fuck','fuckass','fuckbrain','fuckbutt','fucked','fucker','fuckface','fuckhead','fuckhole','fuckin','fucking','fucknut','fucks','fuckstick','fucktard','fuckup','fuckwad','fuckwit','fuckwitt','fudgepacker','gaybob','gaydo','gayfuck','gayfuckist','gaytard','gaywad','goddamn','goddamnit','gooch','gook','gringo','guido','handjob','heeb','homo','homodumbshit','honkey','humping','jackass','jap','jerk off','jigaboo','jizz','jungle bunny','junglebunny','kike','kooch','kootch','kyke','lesbo','lezzie','mcfagget','minge','mothafucka','motherfucker','motherfucking','muff','muffdiver','munging','negro','nigga','nigger','niglet','nut sack','nutsack','paki','panooch','pecker','peckerhead','penisfucker','piss','poon','poonani','poonany','porch monkey','porchmonkey','punanny','punta','pussylicking','puto','queef','queer','queerbait','queerhole','renob','rimjob','ruski','sand nigger','sandnigger','schlong','scrote','shit','shitbagger','shitcunt','shitdick','shitface','shitfaced','shithead','shithole','shithouse','shitspitter','shitstain','shitter','shittiest','shitting','shitty','shiz','shiznit','skank','skeet','skullfuck','slut','slutbag','snatch','spic','spick','splooge','tard','thundercunt','tit','titfuck','tits','tittyfuck','twat','twatlips','twats','twatwaffle','va-j-j','vag','vjayjay','wank','wetback','whore','whorebag','wop','хуя'];
                for ( i = 0; i < swears.length; i++ ) {
                    var swear = new RegExp( swears[i] );
                    if ( ( swear ).test( $( this ).val() ) ) {
                        // Block the message
                        $( this ).val( '' );
                        count++;
                        switch ( count ) {
                        // Give warnings
                        case 1:
                            alert( 'You\'ve been found using a swear. Your message has been blocked.' );
                            break;
                        case 2:
                            alert( 'This is your last warning. You will be kicked out of the chat, if you are found using swears again.' );
                            break;
                        case 3:
                            alert( 'You are to be kicked from the chat. Please behave properly on your next visit.' );
                            // For mods
                                if ( document.referrer === '' ) {
                                    window.close();
                                } else {
                                    history.back(-1);
                            }
                         }
                    }
                }
            }
        } );
    }
} );