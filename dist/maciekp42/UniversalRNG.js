/*
 * author: rekjn
 * script: universal rng
 * desc: universal rng for css styles
 */

let universalrng = 
{
	rng_value: undefined,
	
	initialize: function ( )
	{
		this.rng_value = 
		[
			Math.floor ( Math.random ( ) * 50 ),
			Math.floor ( Math.random ( ) * 10 ),
			Math.floor ( Math.random ( ) * 5 ),
			Math.floor ( Math.random ( ) * 2 )
		];
		
		let page = document.querySelector ( 'body' );
		
		this.rng_value.forEach ( function ( value, index )
		{
			let className = 'rng_' + index + '_' + value;
			page.classList.add ( className );
		} );
	}
};

window.addEventListener ( 'load', function ( )
{
	universalrng.initialize ( );
} );