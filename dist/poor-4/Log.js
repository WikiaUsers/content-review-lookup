!function( $ ) {
    if ( !$( '.journal-nav' ).length ) return;

    function fill_journal( ind ) {
        for ( var i = 0; i <= 8; i++ ) {
            var new_ind = ind + i;
            $( '.body-' + i ).html( '' );

            if ( typeof data_arr[ new_ind ] === 'undefined' ) continue;
            $( '.body-' + i ).append(
                '<a href="/ru/wiki/' + data_arr[ new_ind ][ 1 ] + '" target="_blank">' +
                    '<img src="' + data_arr[ new_ind ][ 0 ] + '" width="50" />' +
                '</a>'
            );
        }
    }

    var data_arr = [
        [
            'https://static.wikia.nocookie.net/poor-4/images/9/9c/Trashbugenemyicon.png',
            'Trashbug'
        ],
        [
            'https://static.wikia.nocookie.net/poor-4/images/0/07/Mixtapeenemyicon.png',
            'Mixtape'
        ],
        [
            'https://static.wikia.nocookie.net/poor-4/images/9/9a/Skeletonenemyicon.png',
            'Skeleton'
        ],
        [
            'https://static.wikia.nocookie.net/poor-4/images/4/4e/Trashflyenemyicon.png',	
            'Trashfly'
        ],
        [
            'https://static.wikia.nocookie.net/poor-4/images/a/ac/Spikeyenemyicon.png',
            'Spikey'
        ],
        [
            'https://static.wikia.nocookie.net/poor-4/images/e/e8/Madsorcererenemyicon.png',
            'Mad Sorcerer'
        ],
        [
            'https://static.wikia.nocookie.net/poor-4/images/6/63/Trashbeeenemyicon.png',
            'Trashbee'
        ],
        [
            'https://static.wikia.nocookie.net/poor-4/images/9/9b/Slavcannonenemyicon.png',
            'Slav cannon'
        ],
        [
            'https://static.wikia.nocookie.net/poor-4/images/c/cd/Lumpyenemyicon.png',
            'Lumpy'
        ],
        [
            'https://static.wikia.nocookie.net/poor-4/images/1/19/Spaceshipenemyicon.png',
            'Spaceship'
        ],
        [
            'https://static.wikia.nocookie.net/poor-4/images/c/c9/Fugoenemyicon.png',
            'Fugo'
        ],
        [
            'https://static.wikia.nocookie.net/poor-4/images/9/98/Ghostdancerenemyicon.png',
            'Ghost Dancer'
        ],
        [
            'https://static.wikia.nocookie.net/poor-4/images/a/ab/Dinosaurenemyicon.png',
            'Dinosaur'
        ],
        [
            'https://static.wikia.nocookie.net/poor-4/images/8/89/Seaurchinenemyicon.png',
            'Sea Urchine'
        ],
        [
            'https://static.wikia.nocookie.net/poor-4/images/e/ed/Starship7enemyicon.png',
            'Starship 7'
        ],
        [
            'https://static.wikia.nocookie.net/poor-4/images/4/48/Ethernetclimberenemyicon.png',
            'Ethernet Climber'
        ],
        [
            'https://static.wikia.nocookie.net/poor-4/images/f/f6/Constructionworkerenemyicon.png',
            'Construction Worker'
        ],
        [
            'https://static.wikia.nocookie.net/poor-4/images/c/c2/Ghostenemyicon.png',
            'Ghost'
        ],
        [
            'https://static.wikia.nocookie.net/poor-4/images/4/4c/Yeetenemyicon.png',
            'Yeet'
        ],
        [
            'https://static.wikia.nocookie.net/poor-4/images/9/90/Bumboenemyicon.png',
            'Bumbo'
        ],
        [
            'https://static.wikia.nocookie.net/poor-4/images/e/e5/Deathheadenemyicon.png',
            'Death Head'
        ],
        [
            'https://static.wikia.nocookie.net/poor-4/images/d/d5/Gopnikenemyicon.png',
            'Gopnik'
        ],
        [
            'https://static.wikia.nocookie.net/poor-4/images/7/79/Spacechickenenemyicon.png',
            'Space Chicken'
        ],
        [
            'https://static.wikia.nocookie.net/poor-4/images/0/03/Bloodbugenemyicon.png',
            'Bloodbug'
        ],
        [
            'https://static.wikia.nocookie.net/poor-4/images/8/87/Cmoonenemyicon.png',
            'C-Moon'
        ],
        [
            'https://static.wikia.nocookie.net/poor-4/images/1/13/Evilottoenenemyicon.png',
            'Evil Otto'
        ],
        [
            'https://static.wikia.nocookie.net/poor-4/images/a/a5/Princessenemyicon.png',
            'Princess'
        ],
        [
            'https://static.wikia.nocookie.net/poor-4/images/a/ae/Stickfigureenemyicon.png',
            'Stick Figure'
        ],
        [
            'https://static.wikia.nocookie.net/poor-4/images/b/b6/Burgerenemyicon.png',
            'Burger'
        ],
        [
            'https://static.wikia.nocookie.net/poor-4/images/3/36/Alienenemyicon.png',
            'Alien'
        ],
        [
            'https://static.wikia.nocookie.net/poor-4/images/1/12/Shadowmanenemyicon.png',
            'Shadow Man'
        ],
        [
            'https://static.wikia.nocookie.net/poor-4/images/7/75/Mothmanenemyicon.png',
            'Mothman'
        ],
        [
            'https://static.wikia.nocookie.net/poor-4/images/d/de/Puprlehazeenemyicon.png',
            'Purple Haze'
        ],
        [
            'https://static.wikia.nocookie.net/poor-4/images/2/25/Alexmercerenemyicon.png',
            'Alex Mercer'
        ],
        [
            'https://static.wikia.nocookie.net/poor-4/images/0/08/Counterterroristenemyicon.png',
            'Counter Terrorist'
        ]
    ];
    
    var current = 0,
        max_current = data_arr.length;

    fill_journal( 0 );

    $( '.arrow-style' ).click( function() {
        var new_current;

        if ( $( this ).hasClass( 'arrow-left' ) ) {
            new_current = current - 8;

            if ( new_current <= 0 ) {
                $( '.arrow-left' ).css( 'visibility', 'hidden' );
            } else if ( new_current < max_current ) {
                $( '.arrow-right' ).css( 'visibility', 'visible' );
            } else if ( new_current < 8 ) {
                $( '.arrow-left' ).css( 'visibility', 'hidden' );
                return;
            } else 
            current;

            current = current - 8;
        } else {
            new_current = current + 8;

            if ( new_current >= max_current ) {
                $( '.arrow-right' ).css( 'visibility', 'hidden' );
                return;
            } else if ( new_current >= max_current - 8 ) { 
                $( '.arrow-right' ).css( 'visibility', 'hidden' );
            } else if ( new_current >= 8 ) {
                $( '.arrow-left' ).css( 'visibility', 'visible' );
            }
            current;

            current = current + 8;
        }

        fill_journal( current );
    });
}( jQuery );