const onLoad = function() {
	'use strict';
	
	const array = [
		1, 100, 250, 512, 1024, 0, -2, 66
	];
	const object = {
		'test': 'Lorem Ipsum',
		'test2': [
			'one',
			'two',
			'three'
		],
		'test3': {
			'lorem': 'Ipsum',
			'dolor': 78234782478,
			'sit': new RegExp( 'test|test2', 'gi' )
		},
		'test4': 'test'
	};
	
	function test( input ) {
		return console.log( input );
	}
	
	test( object.toString() + array.join( ', ' ) );
}();