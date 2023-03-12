// Additional UserRights Icons in profile mastheads
importScript('MediaWiki:Wikia.js/userRightsIcons.js');
// END Additional UserRights Icons in profile mastheads

// Random Wordmarks
$(function() {
    var images = [
      'https://images.wikia.nocookie.net/princessdisney/images/c/cf/Snow_White_wordmark.PNG',
      'https://images.wikia.nocookie.net/princessdisney/images/b/bd/Cinderella_wordmark.png',
      'https://images.wikia.nocookie.net/princessdisney/images/5/53/Aurora_wordmark.png',
      'https://images.wikia.nocookie.net/princessdisney/images/f/f2/Ariel_wordmark.png',
      'https://images.wikia.nocookie.net/princessdisney/images/5/58/Belle_wordmark.png',
      'https://images.wikia.nocookie.net/princessdisney/images/9/9a/Jasmine_wordmark.png',
      'https://images.wikia.nocookie.net/princessdisney/images/e/ef/Pocahontas_wordmark.png',
      'https://images.wikia.nocookie.net/princessdisney/images/6/61/Mulan_wordmark.png',
      'https://images.wikia.nocookie.net/princessdisney/images/f/f9/Tiana_wordmark.png',
      'https://images.wikia.nocookie.net/princessdisney/images/b/bb/Rapunzel_wordmark.png',
      'https://images.wikia.nocookie.net/princessdisney/images/f/f0/M%C3%A9rida_wordmark.png',
      'https://images.wikia.nocookie.net/princessdisney/images/3/35/Tinker_Bell_wordmark.png',
      'https://images.wikia.nocookie.net/princessdisney/images/3/35/Silvermist_wordmark.png',
      'https://images.wikia.nocookie.net/princessdisney/images/3/30/Iridessa_wordmark.png',
      'https://images.wikia.nocookie.net/princessdisney/images/3/3c/Fawn_wordmark.png',
      'https://images.wikia.nocookie.net/princessdisney/images/4/4e/Rosetta_wordmark.png',
      'https://images.wikia.nocookie.net/princessdisney/images/1/12/Vidia_wordmark.png',
      'https://images.wikia.nocookie.net/princessdisney/images/5/5f/Periwinkle_wordmark.png',
      'https://images.wikia.nocookie.net/__cb20131206094141/princessdisney/images/6/69/Berry_wordmark.png',
      'https://images.wikia.nocookie.net/__cb20131206094228/princessdisney/images/3/36/Pumpkin_wordmark.png',
      'https://images.wikia.nocookie.net/__cb20131206094332/princessdisney/images/8/86/Bibbidy_wordmark.png',
      'https://images.wikia.nocookie.net/__cb20131206094351/princessdisney/images/6/6c/Beauty_wordmark.png',
      'https://images.wikia.nocookie.net/__cb20131206094416/princessdisney/images/f/f1/Bloom_wordmark.png',
      'https://images.wikia.nocookie.net/__cb20131206094651/princessdisney/images/c/c9/Treasure_wordmark.png',
      'https://images.wikia.nocookie.net/__cb20131206094707/princessdisney/images/e/e8/Teacup_workmark.png',
      'https://images.wikia.nocookie.net/__cb20131206094726/princessdisney/images/e/ea/Petit_wordmark.png',
      'https://images.wikia.nocookie.net/__cb20131206094750/princessdisney/images/c/ce/Sultan_wordmark.png',
      'https://images.wikia.nocookie.net/__cb20131206095259/princessdisney/images/f/f2/Blossom_wordmark.png',
      'https://images.wikia.nocookie.net/__cb20131206095333/princessdisney/images/4/4d/Lily_wordmark.png',
      'https://images.wikia.nocookie.net/__cb20131206095727/princessdisney/images/b/b8/Bayou_wordmark.png',
      'https://images.wikia.nocookie.net/__cb20131206095756/princessdisney/images/6/6a/Blondie_wordmark.png',
      'https://images.wikia.nocookie.net/__cb20131206100033/princessdisney/images/4/42/Summer_wordmark.png'
    ];
 
    $('.wds-community-header__wordmark img').attr('src', images[Math.floor(Math.random() * images.length)]);
});

// Weather effects
importArticle( { type: 'script', article: 'u:c:MediaWiki:Snow.js' } );

//Extend code for navibar
importArticle( { type: 'script', article: 'u:dev:ExtendedNavigation/code.js' } );

/*//Extend for RoseXinh
importArticle( { type: 'script', article: 'u:dev:SexyUserPage/code.js' } );*/

//Spoilers
importArticles({
    type: "script",
    articles: [
        "w:c:dev:SpoilerAlert/code.js"
    ]
});