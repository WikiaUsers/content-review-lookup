mw.loader.using(['mediawiki.util', 'mediawiki.storage'], function() {
    console.log('MediaWiki modules loaded: mediawiki.util, mediawiki.storage');

    importArticle({
        type: 'style',
        article: 'w:c:superpowersportal:MediaWiki:Leveling/styles.css'
    });
    console.log('Leveling styles imported');

    var userLevel = mw.config.get('wgUserLevel');
    if (typeof userLevel === 'undefined' || userLevel === null) {
        mw.config.set('wgUserLevel', 0);
        userLevel = 0;
        console.log('User level not found, defaulting to 0');
    }

    console.log('User Level fetched: ', userLevel);

    var levelListItem = $('<li/>').append(
        $('<a/>', {
            href: '/wiki/Special:BlankPage/Level',
            html: '<strong>LEVEL </strong>' + userLevel
        })
    );

    var checkInterval = setInterval(function() {
        var statsContainer = $('.user-identity-stats');
        
        if (statsContainer.length) {
            statsContainer.append(levelListItem);
            console.log('Level item appended to .user-identity-stats');
            clearInterval(checkInterval);
            
            fire({ level: userLevel });
        }
    }, 100);

    function fire(data) {
        mw.hook('custom.userLevel').fire(data);
    }
});