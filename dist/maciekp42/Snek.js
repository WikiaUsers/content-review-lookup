/*
 * Snek: The table snake!
 *
 * About: Snek is a snake that lives inside <table> HTML elements and hates people who use flex and grids. He also hates people using WebGL or even canvas in web games.
 * Inspired by duckey's lovely game: http://pl.duckey.wikia.com/wiki/Snejk
 *
 * Author: MaciekP42
 * Please don't rip off without credits.
 */

var snake =
{
	level: [],
	snake: [],
	snakeVelocity: { x: 0, y: 0 },
	previousHeadPos: { x: 0, y: 0 },
	width: 0,
	height: 0,
	fruitSpawned: false,
	dead: false,
	interval: undefined,

	keyDown:
	{
		left: false,
		right: false,
		up: false,
		down: false
	},

	get_tile: function ( x, y )
	{
		if ( x < 0 || x > snake.width - 1 || y < 0 || y > snake.height - 1 )
		{
			return -1;
		}

		return y * snake.width + x;
	},

	generateFriut: function ( )
	{
		snake.fruitSpawned = true;

		var fields = new Array ( );

		for ( var i = 0; i < snake.level.length; ++i )
		{
			if ( snake.level [i] === 0 ) fields.push ( i );
		}

		var rng = Math.floor ( ( Math.random ( ) * fields.length ) );
		var field = fields [rng];

		var y = Math.floor ( field / snake.height );
		var x = field % snake.width;

		console.log ( 'created fruit at ' + x + ', ' + y + ' (' + field + ')!' );

		snake.level [snake.get_tile ( x, y )] = 2;
		document.querySelector ( '#p_' + x + '_' + y ).classList.add ( "fruit" );
	},

	initializeSnake: function ( x, y )
	{
		var x = Math.floor ( snake.width / 2 );
		var y = Math.floor ( snake.height / 2 );

		var p = document.querySelector ( '#p_' + x + '_' + y );
		p.classList.add ( 'snake' );

		var p2 = document.querySelector ( '#p_' + ( x - 1 ) + '_' + y );
		p2.classList.add ( 'snake' );

		snake.snake.push ( { x: x, y: y } );
		snake.snake.push ( { x: x - 1, y: y } );

		snake.level [snake.get_tile ( x, y )] = 1;
		snake.level [snake.get_tile ( x - 1, y )] = 1;

		snake.previousHeadPos = { x: x - 1, y: y };

		snake.snakeVelocity.x = 0;
		snake.snakeVelocity.y = 0;
	},

	tick: function ( )
	{
		if ( snake.dead ) return;
		var previousVelocity = snake.snakeVelocity;

		if ( snake.keyDown.left ) snake.snakeVelocity = { x: -1, y: 0 };
		if ( snake.keyDown.up ) snake.snakeVelocity = { x: 0, y: -1 };
		if ( snake.keyDown.right ) snake.snakeVelocity = { x: 1, y: 0 };
		if ( snake.keyDown.down ) snake.snakeVelocity = { x: 0, y: 1 };

		if ( snake.snake [0].x + snake.snakeVelocity.x == snake.previousHeadPos.x
			&& snake.snake [0].y + snake.snakeVelocity.y == snake.previousHeadPos.y )
		{
			snake.snakeVelocity = previousVelocity;
		}

		if ( snake.snakeVelocity.x === 0 && snake.snakeVelocity.y === 0 ) return;

		// Update Snake
		snake.previousHeadPos = snake.snake [0];

		var prevPosition = { x: snake.snake [0].x + snake.snakeVelocity.x, y: snake.snake [0].y + snake.snakeVelocity.y };
		var collectedFood = false;

		var nextTile = snake.get_tile ( prevPosition.x, prevPosition.y );

		if ( nextTile == -1 || snake.level [nextTile] == 1 )
		{
			snake.gameOver ( );
			prevPosition = snake.snake [0];
		}

		if ( snake.level [snake.get_tile ( prevPosition.x, prevPosition.y )] == 2 )
		{
			snake.level [snake.get_tile ( prevPosition.x, prevPosition.y )] === 0;
			document.querySelector ( '#p_' + prevPosition.x + '_' + prevPosition.y ).classList.remove ( 'fruit' );
			collectedFood = true;
			snake.fruitSpawned = false;
		}

		for ( var i = 0; i < snake.snake.length; ++i )
		{
			var newPosition = prevPosition;

			prevPosition = snake.snake [i];
			snake.snake [i] = newPosition;

			var p = document.querySelector ( '#p_' + newPosition.x + '_' + newPosition.y );
			p.classList.add ( 'snake' );

			snake.level [snake.get_tile ( newPosition.x, newPosition.y )] = 1;
 		}

		if ( snake.dead ) return;

		if ( collectedFood )
		{
			snake.level [snake.get_tile ( prevPosition.x, prevPosition.y )] = 1;
			snake.snake.push ( prevPosition );
		}
		else
		{
			snake.level [snake.get_tile ( prevPosition.x, prevPosition.y )] = 0;
			var endp = document.querySelector ( '#p_' + prevPosition.x + '_' + prevPosition.y );
			endp.classList.remove ( 'snake' );
		}

		snake.keyDown.left = false;
		snake.keyDown.up = false;
		snake.keyDown.right = false;
		snake.keyDown.down = false;

		if ( !snake.fruitSpawned )
		{
			snake.generateFriut ( );
			snake.fruitSpawned = true;
		}

		document.querySelector ( '#snakeGameScore' ).innerHTML = 'Score: ' + ( snake.snake.length - 2 );
	},

	gameOver: function ( )
	{
		snake.dead = true;

		var gameOverWrapper = document.createElement ( "DIV" );
		var gameOverMessage = document.createElement ( "DIV" );
		var gameOverText = document.createElement ( "P" );
		var gameOverRetry = document.createElement ( "BUTTON" );

		gameOverWrapper.classList.add ( 'gameOverWrapper' );
		gameOverMessage.classList.add ( 'gameOverMessage' );
		gameOverText.innerHTML = 'Game over! You collected ' + ( snake.snake.length - 2 ) + ' fruits!';
		gameOverRetry.innerHTML = 'Retry';
		gameOverRetry.onclick = function ( ) { snake.retry ( ); };

		gameOverMessage.appendChild ( gameOverText );
		gameOverMessage.appendChild ( gameOverRetry );
		gameOverWrapper.appendChild ( gameOverMessage );

		document.querySelector ( "#gameWrapper" ).appendChild ( gameOverWrapper );
	},

	retry: function ( )
	{
		snake.keyDown.left = false;
		snake.keyDown.up = false;
		snake.keyDown.right = false;
		snake.keyDown.down = false;

		snake.snake = [ ];
		snake.level = [ ];
		snake.initializeGame ( snake.width, snake.height );
		snake.dead = false;
	},

	initializeGame: function ( width, height )
	{
		var table = document.createElement ( "TABLE" );

		for ( var i = 0; i < height; ++i )
		{
			var row = document.createElement ( "TR" );

			for ( var j = 0; j < width; ++j )
			{
				var col = document.createElement ( "TD" );
				col.id = "p_" + j + "_" + i;

				snake.level.push ( 0 );
				row.appendChild ( col );
			}

			table.appendChild ( row );
		}

		document.querySelector ( "#gameWrapper" ).innerHTML = '';
		document.querySelector ( "#gameWrapper" ).appendChild ( table );

		document.querySelector ( "#gameWrapper" ).style.width = ( 36 * width ) + 'px';
		document.querySelector ( "#gameWrapper" ).style.height = ( 36 * height ) + 'px';

		snake.initializeSnake ( );
		snake.generateFriut ( );

		var scoreDiv = document.createElement ( "DIV" );
		scoreDiv.classList.add ( "snekScore" );
		scoreDiv.id = "snakeGameScore";
		scoreDiv.innerHTML = "Score: 0";

		document.querySelector ( "#gameWrapper" ).appendChild ( scoreDiv );
	},

	initialize: function ( width, height )
	{
		if ( document.querySelector ( "#gameWrapper" ) === null ) return;

		document.addEventListener ( 'keydown', function ( event )
		{
			if ( event.keyCode == 37 ) snake.keyDown.left = true;
			if ( event.keyCode == 38 ) snake.keyDown.up = true;
			if ( event.keyCode == 39 ) snake.keyDown.right = true;
			if ( event.keyCode == 40 ) snake.keyDown.down = true;

			if ( [37, 38, 39, 40].indexOf ( event.keyCode ) > -1 )
			{
				event.preventDefault ( );
			}
		} );

		snake.width = width;
		snake.height = height;

		snake.initializeGame ( snake.width, snake.height );

		snake.interval = setInterval ( function ( ) { snake.tick ( ); }, 350 );
	}
};

$ ( function ( )
{
	importStylesheetURI ( 'https://www.dl.dropboxusercontent.com/s/y8yh6xu9ma1dv4f/style.css' );
	snake.initialize ( 17, 17 );
} );