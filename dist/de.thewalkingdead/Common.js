importArticles({
    debug: "true",
    type: "script",
    articles: [
        "MediaWiki:Hilfsfunktionen.js",
        "MediaWiki:PageCounter.js",
        "MediaWiki:Bewertung.js",
        "MediaWiki:ShortMessage.js" 
    ]
});

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:ReferencePopups/code.js',
    ]
});

((window.dev = window.dev || {}).ReferencePopups = dev.ReferencePopups || {}).lockdown = true;

window.ajaxSpecialPages = ["Recentchanges", "WikiActivity", "Watchlist", "Log", "Contributions"];


/* Link Preview */
mw.hook('ppreview.show').add(function(pp) {
  var $pp = $(pp), $div = $pp.find('div'), $img = $pp.find('img');
  setTimeout(function() {
    if(($img.height()) > $img.width()) {
      $pp.css({width:'450px'});
      $pp.css({height:'auto'});
      $img.css({float:'right'});
      $img.css({width:'180px'});
      $div.css({display:'block'});
      $div.css({width:'230px'});
      $div.css({padding: '20px 15px 15px 15px'});
    } 
    else
    {
      $pp.css({width:'320px'});
      $img.css({height:'auto'});
      $div.css({height: 'auto'});
      $div.css({padding: '15px 15px 15px 15px'});
    }
  }, 100)
});
 
window.pPreview = $.extend(true, window.pPreview, {
    tlen: 450,
    delay: 450,
    scale: false,
    RegExp: {
       ilinks: [new RegExp('(Talk:)|(User:)|(Project:)|(Project_talk:)|(Hibike!_Euphonium_Wiki:)|(Hibike!_Euphonium_Wiki_talk:)|(File:)|(File_talk:)|(MediaWiki:)|(MediaWiki_talk:)|(Template:)|(Template_talk:)|(Help:)|(Help_talk:)|(Category:)|(Category_talk:)|(Forum:)|(Forum_talk:)|(User_blog:)|(User_blog_comment)|(Blog:)|(Blog_talk:)|(Module:)|(Module_talk:)|(Message_Wall:)|(Thread:)|(Message_Wall_Greeting:)')],
       iclasses: ['activityfeed-diff'],
       iparents: ['#IgnorePreview', 'div[data-ignore-me=1]', '.tabs', '.wikia-gallery', '.wikiaPhotoGallery-slider-body', '.controls'],
       onlyinclude : ['.LinkPreviewText', '[data-include-me=1]'],
   },
});


$('a').hover(function(e){
    $(this).attr('title', '');
});

window.DiscordBannerSettings = {
    bannerStyle: '3',
    inviteLink: 'KeUM7gra3D',
    prependToRail: true
};