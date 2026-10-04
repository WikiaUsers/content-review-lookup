$( function () {
    var box = document.getElementById( 'mainpage-song' );
    if ( !box ) return;

    var songs = {
        1: { id: 'EEYMlUVKmyE', title: 'Genshin Impact Main Theme' },
        2: { id: 'ghaz6x9Q-_4', title: 'Dream Aria' },
        3: { id: 'H8NjYdDP0v4', title: 'Twilight Serenity' },
        4: { id: 'K8aLWuJVCEw', title: 'Reminiscence (Genshin Impact Main Theme Var.)' }
    };

    var parts = new Intl.DateTimeFormat( 'en-GB', {
        timeZone: 'Asia/Bangkok', hour: '2-digit', minute: '2-digit', hourCycle: 'h23'
    } ).formatToParts( new Date() );
    var h = +parts.find( function ( p ) { return p.type === 'hour'; } ).value;
    var m = +parts.find( function ( p ) { return p.type === 'minute'; } ).value;
    var hm = h * 100 + m;

    var slotSong;
    if ( hm >= 800 && hm < 1700 ) {
        slotSong = 1;
    } else if ( hm >= 1900 || hm < 430 ) {
        slotSong = 3;
    } else {
        slotSong = 2; // 04.30-07.59 และ 17.00-18.59
    }

    var candidates = [ slotSong, 4 ];

    var last = null;
    try { last = parseInt( localStorage.getItem( 'mainpage-song-last' ), 10 ); } catch ( e ) {}

    var pick;
    if ( candidates.indexOf( last ) !== -1 ) {
        pick = candidates[ candidates[ 0 ] === last ? 1 : 0 ];
    } else {
        pick = candidates[ Math.floor( Math.random() * 2 ) ];
    }

    try { localStorage.setItem( 'mainpage-song-last', pick ); } catch ( e ) {}

    var s = songs[ pick ];
    box.innerHTML =
        '<iframe width="250" height="250" ' +
        'src="https://www.youtube.com/embed/' + s.id + '" ' +
        'frameborder="0" allowfullscreen ' +
        'allow="accelerometer; autoplay; encrypted-media; picture-in-picture"></iframe>' +
        '<div><b>เพลงประกอบ: ' + mw.html.escape( s.title ) + '</b></div>';
} );