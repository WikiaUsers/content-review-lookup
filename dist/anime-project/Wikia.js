window.DisplayClockJS = '%2I:%2M:%2S %p %{January;Febuary;March;April;May;June;July;August;September;October;November;December}m %2d %Y (UTC)';

importArticles({
    type: "script",
    articles: [
        'u:dev:SexyUserPage/code.js',
        'MediaWiki:Wikia.js/Rights.js',
        'u:dev:Countdown/code.js',
        'u:dev:ExtendedNavigation/code.js',
        'u:dev:SocialIcons/code.js',
        'u:dev:DisplayClock/code.js',
        'u:dev:Voice_Dictation/voice.js'
    ]
});

$(function(){
  if(mw.config.get('skin') == "oasis" || mw.config.get('skin') == "wikia"){
      $('#WikiaPageHeader .tally').before('<a href="?useskin=monobook" class="wikia-button secondary">See in Monobook</a>');
  }
});

$(function(){
    if (mw.config.get('skin') == "oasis" || mw.config.get('skin') == "wikia"){
       $('.navigation-buttons').children('a').addClass('button nav-button');
       if ($('.navigation-buttons').children('a').hasClass('new') == true){
          $('.navigation-buttons').children().removeClass('new');
       }
    }
});