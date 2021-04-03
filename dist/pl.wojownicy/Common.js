$( function () {
    // Lock old blogs config
    window.LockOldBlogs = {
        expiryDays: 30,
        expiryMessage: 'Ten blog nie był komentowany przez <expiryDays> dni. By przeciwdziałać odkopywaniu wątków i nabijaniu odznak, zablokowaliśmy możliwość komentowania.',
        nonexpiryCategory: 'Niewygasające blogi'
    };
    
    // Administrators and medics's list
    var admins = [
        {
            name: 'Iikanakari',
            roles: [ 'uzdrowiciel' ],
            link: ':Iikanakari'
        },
        {
            name: 'Srebrna Pełnia',
            roles: [ 'uzdrowiciel', 'medyk' ],
            link: ':Srebrna_Pe%C5%82nia'
        },
        {
            name: 'Brzoza the drzewokrzew',
            roles: ['przywódca', 'medyk' ],
            link: ':Brzoza_the_drzewokrzew'
        }
    ];
    
    // Define roles
    var definitions = {
        'uzdrowiciel': 'biurokratą',
        'przywódca': 'administratorem',
        'medyk': 'medykiem',
        'zastępca': 'moderatorem'
    };
    
    // Iterate for all admins
    admins.forEach( function (admin) {
        // Get the elements
        var elements = [
            $( '.subtle a[href$="' + admin.link + '"]' ),
            $( '.edited-by a[href$="' + admin.link + '"].subtle' )
        ];
        
        // Create link
        var linkElement = $( '<a></a>' );
        linkElement.attr( 'href', '/pl/wiki/Project:Administratorzy' );
        linkElement.addClass( 'ww-admin-link' );
        
        // Get user's roles
        var roles = admin.roles;
        
        // Set the link's text
        linkElement.text( '[' + roles.join(', ') + ']' );
        
        // Define the roles
        var definedRoles = [];

        roles.forEach( function (role) {
            var definition = definitions[role];
            definedRoles.push(definition);
        } );
        
        // Parse the roles
        linkElement.attr( 'title', 'Ten użytkownik jest ' + definedRoles.join(' i ') + ' Wojownicy Wiki.' )

        // Attach the link to the elements
        elements.forEach( function ( element ) {
            $( linkElement ).insertAfter( element );
        } );
    } );
} );