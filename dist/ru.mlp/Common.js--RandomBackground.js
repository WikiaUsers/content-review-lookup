!function( $ ) {
	var d = {
        	'd': [
                '8/81/BG_light_1.jpg',
                '4/45/BG_light_2.jpg',
                '4/49/BG_light_3.jpg',
                'f/f7/BG_light_4.jpg',
                '8/8f/BG_light_5.jpg'
            ],
            'n': [
                '8/81/BG_dark_1.jpg',
                '7/78/BG_dark_2.jpg',
                '3/3b/BG_dark_3.jpg',
                '7/71/BG_dark_4.jpg',
                'b/b0/BG_dark_5.jpg'
            ]
        };

	var is_d = $( '.theme-fandomdesktop-dark' ).length
	  , s = ( is_d ) ? "dark" : "light"
	  , n = ( is_d ) ? d.n : d.d
	  , i = Math.floor( Math.random() * n.length );

    $( ':root .theme-fandomdesktop-' + s ).css({
        'background-image': 'url("https://static.wikia.nocookie.net/mlp/ru/images/' + n[ i ] + '")',
        'background-position': 'center center', // Или 'top center', как выриант
        'background-repeat': 'no-repeat',
        'background-attachment': 'fixed'
    });
}( this.jQuery );