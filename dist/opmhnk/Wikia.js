switch (mw.config.get('wgPageName')) {
    case 'Saitama':
        $('body.skin-oasis').css("background",'linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25)), url("https://vignette.wikia.nocookie.net/opmhnk/images/f/f8/FANDOM_Background_Saitama_1.gif") fixed no-repeat center');
        break;
    case 'Genos':
        $('body.skin-oasis').css("background",'linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25)), url("https://vignette.wikia.nocookie.net/opmhnk/images/1/19/FANDOM_Background_Genos_1.gif") fixed no-repeat center');
        break;
    case 'Hellish_Blizzard':
        $('body.skin-oasis').css("background",'linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25)), url("https://vignette.wikia.nocookie.net/opmhnk/images/0/0d/FANDOM_Background_HellishBlizzard_1.gif") fixed no-repeat center');
        break;
    case 'Speed-O\'-Sound_Sonic':
        $('body.skin-oasis').css("background",'linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25)), url("https://vignette.wikia.nocookie.net/opmhnk/images/5/5b/FANDOM_Background_Speed-O%27-SoundSonic_1.gif") fixed no-repeat center');
        break;
    case 'Mumen_Rider':
        $('body.skin-oasis').css("background",'linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25)), url("https://vignette.wikia.nocookie.net/opmhnk/images/6/60/FANDOM_Background_MumenRider_1.gif") fixed no-repeat center');
        break;
    case 'Vaccine_Man':
        $('body.skin-oasis').css("background",'linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25)), url("https://vignette.wikia.nocookie.net/opmhnk/images/e/e5/FANDOM_Background_VaccineMan_1.gif") fixed no-repeat center');
        break;
    case 'Deep_Sea_King':
        $('body.skin-oasis').css("background",'linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25)), url("https://vignette.wikia.nocookie.net/opmhnk/images/2/2e/FANDOM_Background_DeepSeaKing_1.gif") fixed no-repeat center');
        break;
    default:
        $(function RandomBackground() {
        var BackgroundArray = []; 
        BackgroundArray[0] = 'https://vignette.wikia.nocookie.net/opmhnk/images/0/0c/FANDOM_Background_Saitama_2.gif';
        BackgroundArray[1] = 'https://vignette.wikia.nocookie.net/opmhnk/images/8/84/FANDOM_Background_DeepSeaKing_2.gif/';
  
        var ChosenBackground = Math.floor( Math.random() * BackgroundArray.length );
        
        $('body.skin-oasis').css("background",'linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25)), url(' + BackgroundArray[ChosenBackground] + ') fixed no-repeat center');
        $('body.skin-oasis').css("background-size",'cover');
        });
        break;
}

$('body.skin-oasis').css("background-size",'cover');

$('.wds-community-header #wds-icons-comment-tiny').closest('.wds-tabs__tab').remove();