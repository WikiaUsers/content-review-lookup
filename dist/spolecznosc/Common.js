// Konfiguracja skryptu UserTags
window.UserTagsJS = {
    modules: {
        inactive: 60,
        mwGroups: [
            'sysop',
            'bot',
            'bot-global',
            'staff',
            'helper',
            'soap',
            'vanguard'
        ],
        metafilter: {
            sysop: [
                'bureaucrat',
                'founder'
            ],
            bureaucrat: [
                'founder'
            ]
        }
    },
    tags: {
        bot: { link: 'Pomoc:Boty' },
        staff: { link: 'w:Project:Staff' },
        helper: { link: 'Pomoc:Helperzy' },
        soap: { link: 'Pomoc:SOAP' },
        vanguard: { link: 'Pomoc:Vanguard' },
        sysop: {
            link: 'Project:Administracja',
            order: 3
        }
    }
};

// Konfiguracja skryptu LockOldBlogs
window.LockOldBlogs = {
    expiryDays: 30,
    expiryMessage: 'Ten blog nie był komentowany przez ponad <expiryDays> dni. Nie ma potrzeby dodawać nowych komentarzy.',
    nonexpiryCategory: 'Niewygasające blogi'
};

// Pomoc:Zawartość – klikalne boksy
;( function() {
    if ( mw.config.get( 'wgPageName' ) !== 'Pomoc:Zawartość' ) return;

    const boxes = document.getElementsByClassName( 'centralhelpbox' );
    Array.from( boxes ).forEach( function( box ) {
        box.addEventListener( 'click', function() {
            const link = box.getElementsByTagName( 'a' )[0].href;
            location.href = link;
        } );
    } );
} )();