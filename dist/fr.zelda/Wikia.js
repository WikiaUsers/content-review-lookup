importArticles({
    type: 'script',
    articles: [
        'u:dev:ExtendedNavigation/code.js',
        'u:dev:SocialIcons/code.js'
    ]
});

    //Réseaux sociaux

var SocialMediaButtons = { 
	position: 'top',
	colorScheme: 'dark',
	buttonSize: '20px',
        wikitwitteraccount: 'ZeldaWikiFr'
};

if(mw.config.get('wgUserName')) {
    window.DiscordIntegratorConfig = {
        siderail: {
            title: "Serveur Discord",
            id: "192899995010203648"
        }
    };
}

    //Infobox Utilisateur automatique


$(function() {
    //Caching variables
    var config = mw.config.get([
        'wgNamespaceNumber',
        'wgTitle'
    ]);
 
    //Running script only on Userpages
    if(config.wgNamespaceNumber === 2) {
        var params = {
            action: 'query',
            list: 'users',
            ususers: config.wgTitle,
            usprop: 'editcount',
            format: 'json'
        },
        api = new mw.Api(),
        nb;
        //Requesting editcount
        api.get( params ).done( function ( data ) {
            nb = data.query.users[0].editcount;
            //console.log(nb);
        });
 
        //Getting settings from MediaWiki:Custom-Count-Settings
        var settings = {};
        $.ajax({
            url: mw.util.wikiScript(),
            type: 'GET',
            data: {
                action: "raw",
                title: "MediaWiki:Custom-Count-Settings",
            },
            success: function(settings) {
                try {
                    settings = JSON.parse(settings);
                    var sKeys = Object.keys(settings), 
                    values = Object.values(settings),
                    nKeys = [],
                    piTheme;
 
                    //Cast to numeric & sort
                    sKeys.forEach(function (key) { nKeys.push(parseInt(key, 10));});
                    nKeys.sort(function(n, m) {return (n - m);});
 
                    //Applying a theme depending on their editcount
                    for (var i = 0; i < nKeys.length; i++) {
                        if(nb >= nKeys[i]) {
                            piTheme = values[i];
                        } else break;
                    }
                    if (piTheme) {
                        $( '.pi-theme-infobox-utilisateur').addClass('pi-theme-'+piTheme).removeClass('pi-theme-infobox-utilisateur');
                    }
                    return;
                }
                catch (ex) {
                    console.log('Can\'t parse json', {ex: ex, data: settings});
                }
            }
        });
    }
});

// Bannière
$(function () {
  if (!document.getElementById('moved-banner')) {
    var banner = document.createElement('div');
    banner.id = 'moved-banner';
    banner.style.cssText = 'background:#003344; color:white; padding:12px 20px; text-align:center; font-size:16px; font-weight:bold; z-index:9999;';
    banner.innerHTML = '⚠️ Ce wiki a <strong>déménagé</strong> ! Retrouvez-nous ici 👉 <a href="https://fr.zeldawiki.wiki/wiki/Zelda_Wiki" style="color:#ffd76f; text-decoration:underline;">Zelda Wiki</a>';
    $('body').prepend(banner);
  }
});

// Injecte automatiquement le modèle "MobileNotice" sur mobile uniquement
$(function () {
  // Si largeur écran < 800px (mobile) ET skin = oasis
  if (window.innerWidth < 800 && mw.config.get('skin') === 'oasis') {
    // Récupère le modèle MobileNotice
    $.get(mw.util.getUrl('Modèle:MobileNotice', { action: 'render' }), function (data) {
      // Injecte le bandeau en haut du contenu principal
      $('<div>').html(data).prependTo('#WikiaPage');
    });
  }
});