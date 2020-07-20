/**
 * The class that renders the game player.
 */

// Constants
GamePlayer.FRAME_RATE = 100;
GamePlayer.BLOCK_HEIGHT = 40;
GamePlayer.BLOCK_WIDTH = 40;
GamePlayer.WINDOW_HEIGHT = 17;
GamePlayer.WINDOW_WIDTH = 17;
GamePlayer.CHARACTER_HEIGHT = 2;
GamePlayer.CHARACTER_WIDTH = 1;

GamePlayer.WALL = 1;
GamePlayer.VOID = 2;
GamePlayer.START = 3;
GamePlayer.EXIT = 4;
GamePlayer.TRAP = 5;

GamePlayer.KEY_UP_ARROW = 74;
GamePlayer.KEY_LEFT_ARROW = 37;
GamePlayer.KEY_RIGHT_ARROW = 39;
GamePlayer.KEY_RELOAD_ARROW = 82;
GamePlayer.WORLD_DEPTH = 5;

GamePlayer.CHARACTER_STATE_DIRECTION_RIGHT = 1;
GamePlayer.CHARACTER_STATE_DIRECTION_LEFT = 2;

GamePlayer.CHARACTER_STATE_PHYSICS_FALLING = 1;
GamePlayer.CHARACTER_STATE_PHYSICS_WAITING = 2;
GamePlayer.CHARACTER_STATE_PHYSICS_WALKING = 3;
GamePlayer.CHARACTER_STATE_PHYSICS_RAISING = 4;

GamePlayer.CHARACTER_STATE_SPRITE_NUMBER = 2;

function GamePlayer() {

	var _gamePlayer = this;

	// Fields
	_gamePlayer.xPosition = 7;
	_gamePlayer.yPosition = 7;
	_gamePlayer.isGameWon = false;
	_gamePlayer.isGameOver = false;
	_gamePlayer.jumpPower = 0;
	_gamePlayer.batch = null;

	_gamePlayer.canvas = null;
	_gamePlayer.canvasContext = null;
	_gamePlayer.canvasProgram = null;
	_gamePlayer.canvasBuffer = null;
	_gamePlayer.canvasBufferContext = null;
	_gamePlayer.canvasBufferProgram = null;

	_gamePlayer.keyUpPressed = false;
	_gamePlayer.keyLeftPressed = false;
	_gamePlayer.keyRightPressed = false;
	_gamePlayer.rKeyPressed = false;

	// Character state
	_gamePlayer.characterState = {};
	_gamePlayer.characterState.direction = GamePlayer.CHARACTER_STATE_DIRECTION_RIGHT;
	_gamePlayer.characterState.physics = GamePlayer.CHARACTER_STATE_PHYSICS_WAITING;
	_gamePlayer.characterState.spriteCount = 0;

	// Character sprites
	_gamePlayer.wallCanvas = null;
	_gamePlayer.keyCanvas = null;
	_gamePlayer.backgroundCanvas = null;
	_gamePlayer.departureCanvas = null;
	_gamePlayer.trapCanvas = null;
	_gamePlayer.characterFall1LeftCanvas = null;
	_gamePlayer.characterFall1RightCanvas = null;
	_gamePlayer.characterJump1LeftCanvas = null;
	_gamePlayer.characterJump1RightCanvas = null;
	_gamePlayer.characterWait1LeftCanvas = null;
	_gamePlayer.characterWait1RightCanvas = null;
	_gamePlayer.characterWalk1LeftCanvas = null;
	_gamePlayer.characterWalk1RightCanvas = null;
	_gamePlayer.characterWalk2LeftCanvas = null;
	_gamePlayer.characterWalk2RightCanvas = null;
	_gamePlayer.bomb1Canvas = null;
	_gamePlayer.bomb2Canvas = null;
	_gamePlayer.bomb3Canvas = null;
	_gamePlayer.bomb4Canvas = null;
	_gamePlayer.bomb5Canvas = null;
	_gamePlayer.bomb6Canvas = null;
	_gamePlayer.bomb7Canvas = null;
	_gamePlayer.bomb8Canvas = null;
	_gamePlayer.bomb9Canvas = null;
	_gamePlayer.bomb10Canvas = null;
	_gamePlayer.bomb11Canvas = null;
	_gamePlayer.bomb12Canvas = null;
	_gamePlayer.bombCanvas = [];

	_gamePlayer.wallCanvasContext = null;
	_gamePlayer.keyCanvasContext = null;
	_gamePlayer.backgroundCanvasContext = null;
	_gamePlayer.departureCanvasContext = null;
	_gamePlayer.trapCanvasContext = null;
	_gamePlayer.characterFall1LeftCanvasContext = null;
	_gamePlayer.characterFall1RightCanvasContext = null;
	_gamePlayer.characterJump1LeftCanvasContext = null;
	_gamePlayer.characterJump1RightCanvasContext = null;
	_gamePlayer.characterWait1LeftCanvasContext = null;
	_gamePlayer.characterWait1RightCanvasContext = null;
	_gamePlayer.characterWalk1LeftCanvasContext = null;
	_gamePlayer.characterWalk1RightCanvasContext = null;
	_gamePlayer.characterWalk2LeftCanvasContext = null;
	_gamePlayer.characterWalk2RightCanvasContext = null;
	_gamePlayer.bomb1CanvasContext = null;
	_gamePlayer.bomb2CanvasContext = null;
	_gamePlayer.bomb3CanvasContext = null;
	_gamePlayer.bomb4CanvasContext = null;
	_gamePlayer.bomb5CanvasContext = null;
	_gamePlayer.bomb6CanvasContext = null;
	_gamePlayer.bomb7CanvasContext = null;
	_gamePlayer.bomb8CanvasContext = null;
	_gamePlayer.bomb9CanvasContext = null;
	_gamePlayer.bomb10CanvasContext = null;
	_gamePlayer.bomb11CanvasContext = null;
	_gamePlayer.bomb12CanvasContext = null;

	_gamePlayer.wallCanvasProgram = null;
	_gamePlayer.keyCanvasProgram = null;
	_gamePlayer.backgroundCanvasProgram = null;
	_gamePlayer.departureCanvasProgram = null;
	_gamePlayer.trapCanvasProgram = null;
	_gamePlayer.characterFall1LeftCanvasProgram = null;
	_gamePlayer.characterFall1RightCanvasProgram = null;
	_gamePlayer.characterJump1LeftCanvasProgram = null;
	_gamePlayer.characterJump1RightCanvasProgram = null;
	_gamePlayer.characterWait1LeftCanvasProgram = null;
	_gamePlayer.characterWait1RightCanvasProgram = null;
	_gamePlayer.characterWalk1LeftCanvasProgram = null;
	_gamePlayer.characterWalk1RightCanvasProgram = null;
	_gamePlayer.characterWalk2LeftCanvasProgram = null;
	_gamePlayer.characterWalk2RightCanvasProgram = null;
	_gamePlayer.bomb1CanvasProgram = null;
	_gamePlayer.bomb2CanvasProgram = null;
	_gamePlayer.bomb3CanvasProgram = null;
	_gamePlayer.bomb4CanvasProgram = null;
	_gamePlayer.bomb5CanvasProgram = null;
	_gamePlayer.bomb6CanvasProgram = null;
	_gamePlayer.bomb7CanvasProgram = null;
	_gamePlayer.bomb8CanvasProgram = null;
	_gamePlayer.bomb9CanvasProgram = null;
	_gamePlayer.bomb10CanvasProgram = null;
	_gamePlayer.bomb11CanvasProgram = null;
	_gamePlayer.bomb12CanvasProgram = null;

	_gamePlayer.gameEditor = null;

	/**
	* The event trigger. It operates any player operation.
	*/
	_gamePlayer.keyDown = function(event) {
		if (event.keyCode == GamePlayer.KEY_RELOAD_ARROW) {
			_gamePlayer.rKeyPressed = true;
		} else if (!_gamePlayer.isGameWon && !_gamePlayer.isGameOver) {
			if (event.keyCode == GamePlayer.KEY_LEFT_ARROW) {
				_gamePlayer.keyLeftPressed = true;
			} else if (event.keyCode == GamePlayer.KEY_RIGHT_ARROW) {
				_gamePlayer.keyRightPressed = true;
			} else if (event.keyCode == GamePlayer.KEY_UP_ARROW) {
				_gamePlayer.keyUpPressed = true;
			}
		}
	};

	/**
	* The event trigger. It operates any player operation.
	*/
	_gamePlayer.keyUp = function(event) {
		if (event.keyCode == GamePlayer.KEY_RELOAD_ARROW) {
			_gamePlayer.rKeyPressed = false;
		} else if (!_gamePlayer.isGameWon && !_gamePlayer.isGameOver) {
			if (event.keyCode == GamePlayer.KEY_LEFT_ARROW) {
				_gamePlayer.keyLeftPressed = false;
			} else if (event.keyCode == GamePlayer.KEY_RIGHT_ARROW) {
				_gamePlayer.keyRightPressed = false;
			} else if (event.keyCode == GamePlayer.KEY_UP_ARROW) {
				_gamePlayer.keyUpPressed = false;
			}
		}
	};

	/**
	* Process the instructions the player has entered.
	*/
	function doControlls() {
		if (_gamePlayer.rKeyPressed) {
			_gamePlayer.startParty();
		} else if (!_gamePlayer.isGameWon && !_gamePlayer.isGameOver) {

			var hasNewMove = false;

			if (_gamePlayer.keyLeftPressed
			&& _gamePlayer.isMovePossible(_gamePlayer.xPosition - GamePlayer.BLOCK_WIDTH, _gamePlayer.yPosition)) {
				_gamePlayer.xPosition = _gamePlayer.xPosition - GamePlayer.BLOCK_WIDTH;
				_gamePlayer.characterState.direction = GamePlayer.CHARACTER_STATE_DIRECTION_LEFT;
				// If gravity has effect, the physics parameter will be revised later
				_gamePlayer.characterState.physics = GamePlayer.CHARACTER_STATE_PHYSICS_WALKING;
				hasNewMove = true;
			} else if (_gamePlayer.keyRightPressed
			&& _gamePlayer.isMovePossible(_gamePlayer.xPosition + GamePlayer.BLOCK_WIDTH, _gamePlayer.yPosition)) {
				_gamePlayer.xPosition = _gamePlayer.xPosition + GamePlayer.BLOCK_WIDTH;
				_gamePlayer.characterState.direction = GamePlayer.CHARACTER_STATE_DIRECTION_RIGHT;
			// If gravity has effect, the physics parameter will be revised later
				_gamePlayer.characterState.physics = GamePlayer.CHARACTER_STATE_PHYSICS_WALKING;
				hasNewMove = true;
			} else if (_gamePlayer.keyLeftPressed) {
			_gamePlayer.characterState.direction = GamePlayer.CHARACTER_STATE_DIRECTION_LEFT;
				// If gravity has effect, the physics parameter will be revised later
				_gamePlayer.characterState.physics = GamePlayer.CHARACTER_STATE_PHYSICS_WALKING;
			} else if (_gamePlayer.keyRightPressed) {
			_gamePlayer.characterState.direction = GamePlayer.CHARACTER_STATE_DIRECTION_RIGHT;
				// If gravity has effect, the physics parameter will be revised later
				_gamePlayer.characterState.physics = GamePlayer.CHARACTER_STATE_PHYSICS_WALKING;
			} else {
				// If gravity has effect, the physics parameter will be revised later
				_gamePlayer.characterState.physics = GamePlayer.CHARACTER_STATE_PHYSICS_WAITING;
			}

			if ((_gamePlayer.keyUpPressed)
			&& !_gamePlayer.isMovePossible(_gamePlayer.xPosition, _gamePlayer.yPosition + GamePlayer.BLOCK_HEIGHT)) {
				_gamePlayer.jumpPower = 5;
				_gamePlayer.characterState.physics = GamePlayer.CHARACTER_STATE_PHYSICS_RAISING;
			}

			// Calculate the new position of the character due to gravity. It is a very basic calculation.
			if (_gamePlayer.jumpPower > 0) {
				if (_gamePlayer.isMovePossible(_gamePlayer.xPosition, _gamePlayer.yPosition - GamePlayer.BLOCK_HEIGHT)) {
					_gamePlayer.jumpPower = _gamePlayer.jumpPower - 1;
					_gamePlayer.yPosition = _gamePlayer.yPosition - GamePlayer.BLOCK_HEIGHT;
					_gamePlayer.characterState.physics = GamePlayer.CHARACTER_STATE_PHYSICS_RAISING;
					hasNewMove = true;
				} else {
					// The physics parameter is still "waiting" or "walking"
					_gamePlayer.jumpPower = 0;
				}
			} else if (_gamePlayer.isMovePossible(_gamePlayer.xPosition, _gamePlayer.yPosition + GamePlayer.BLOCK_HEIGHT)) {
				_gamePlayer.yPosition = _gamePlayer.yPosition + GamePlayer.BLOCK_HEIGHT;
				_gamePlayer.characterState.physics = GamePlayer.CHARACTER_STATE_PHYSICS_FALLING;
				hasNewMove = true;
			}

			if (_gamePlayer.characterState.physics == GamePlayer.CHARACTER_STATE_PHYSICS_WALKING) {
				_gamePlayer.characterState.spriteCount = _gamePlayer.characterState.spriteCount + 1;
				if (_gamePlayer.characterState.spriteCount >= GamePlayer.CHARACTER_STATE_SPRITE_NUMBER) {
					_gamePlayer.characterState.spriteCount = 0;
				}
			}

			if (hasNewMove) {
				if (_gamePlayer.isArrival(_gamePlayer.xPosition, _gamePlayer.yPosition)) {
					_gamePlayer.isGameWon = true;
				} else if (_gamePlayer.isOnTrap(_gamePlayer.xPosition, _gamePlayer.yPosition)) {
					_gamePlayer.isGameOver = true;
				}
			}
			_gamePlayer.render();
		}
	};

	/**
	* True if the character is on an arrival.
	*/
	_gamePlayer.isArrival = function(x, y) {
		return _gamePlayer.isOnArtefact(x, y, GamePlayer.EXIT);
	}

	/**
	* True if the character is on a trap.
	*/
	_gamePlayer.isOnTrap = function(x, y) {
		return _gamePlayer.isOnArtefact(x, y, GamePlayer.TRAP);
	}

	/**
	* True if the character is on the artefact.
	*/
	_gamePlayer.isOnArtefact = function(x, y, artefact) {
		var isPossible = false;

		for ( var i = (x / GamePlayer.BLOCK_WIDTH); i < (x / GamePlayer.BLOCK_WIDTH) + GamePlayer.CHARACTER_WIDTH; i++) {
			for ( var j = (y / GamePlayer.BLOCK_HEIGHT); j > (y / GamePlayer.BLOCK_HEIGHT) - GamePlayer.CHARACTER_HEIGHT; j--) {
				if (gameMap[j][i] == artefact) {
					isPossible = true;
				}
			}
		}

		return isPossible;
	}

	/**
	* True if this position of the character is not on a wall.
	*/
	_gamePlayer.isMovePossible = function(x, y) {
		var isPossible = true;

		for ( var i = (x / GamePlayer.BLOCK_WIDTH); i < (x / GamePlayer.BLOCK_WIDTH) + GamePlayer.CHARACTER_WIDTH; i++) {
			for ( var j = (y / GamePlayer.BLOCK_HEIGHT); j > (y / GamePlayer.BLOCK_HEIGHT) - GamePlayer.CHARACTER_HEIGHT; j--) {
				if ((j < 0)
					|| (j > gameMap.length - 1)
					|| (i < 0)
					|| (i > gameMap[j].length - 1)
					|| ((gameMap[j][i] != GamePlayer.VOID)
					&& (gameMap[j][i] != GamePlayer.START)
					&& (gameMap[j][i] != GamePlayer.EXIT) && (gameMap[j][i] != GamePlayer.TRAP))) {
					isPossible = false;
				}
			}
		}
		
		return isPossible;
	}

	/**
	* Construct the game player.
	*/
	_gamePlayer.initGamePlayer = function() {
		var canvas = document.createElement("canvas");
		canvas.id = "playerCanvas";
		var canvasTable = document.createElement("table");
		canvasTable.style.margin = "auto";
		var canvasTr = document.createElement("tr");
		canvasTable.appendChild(canvasTr);
		var canvasTd = document.createElement("td");
		canvasTr.appendChild(canvasTd);
		canvasTd.appendChild(canvas);

		var canvasContainer = document.createElement("div");
		canvasContainer.appendChild(canvasTable);

		var explanation = document.createElement("div");
		explanation.width = "100%";
		// TODO Move the code reliated to the editor to the game editor script
		explanation.innerHTML = "<p>It's your turn, now!</p>"
			+ '<ul>'
			+ '<li>You have to find a key avoiding the bombs,</li>'
			+ '<li>Hit the <b>left arrow</b> to go to the left,</li>'
			+ '<li>Hit the <b>right arrow</b> to go to the right,</li>'
			+ '<li>Hit <b>J</b> to jump.</li>'
			+ '<li>Hit <b>R</b> to restart.</li>'
			+ '</ul>'
			+ '<br/>'
			+ ''
			+ '<button type="button" id="editorVisibilityButton">Hide the game editor</button>'
			+ '<br/>'
			+ ''
			+ '<div id="editPanel">'
			+ '<h2><span class="mw-headline" id="Game_editor">Game editor</span></h2>'
			+ ''
			+ 'This section lets you edit the game. It represents the whole game map. You have several tools to draw the map:'
			+ '<ul>'
			+ '<li><b>The beginning</b>: where the character starts the game (only one),</li>'
			+ '<li><b>The exit</b>: where the character should go (several permitted),</li>'
			+ '<li><b>The wall</b>: it is an obstacle,</li>'
			+ '<li><b>The bomb</b>: the bomb kills you.</li>'
			+ '</ul>'
			+ '<p>Select one of the tools to activate it. Click on the grid to add the item. Click again to remove it. Remember the character can go on the left and the right and can jump up to 5 squares. You can enlarge or reduce the height and the width of the map by clicking on - or +.</p>'
			+ '<br/>'
			+ ''
			+ '<button type="button" id="wallButton" title="Add/remove a block of wall to prevent the character from going through.">'
			+ '<img src="https://images.wikia.nocookie.net/gamecloud/images/3/3a/Brick_wall.jpg" width="10px" alt="Wall">'
			+ 'Wall'
			+ '</button>'
			+ '&nbsp;'
			+ '<button type="button" id="trapButton" title="Add/remove a trap. The game can have several traps.">'
			+ '<img src="https://images.wikia.nocookie.net/__cb20120611200515/gamecloud/images/3/3b/Bomb.png" width="10px" alt="Trap">'
			+ 'Trap'
			+ '</button>'
			+ '&nbsp;'
			+ '<button type="button" id="startButton" title="Add/remove a square one. Only one should exist.">'
			+ '<img src="https://images.wikia.nocookie.net/gamecloud/images/4/48/Parchment.png" width="10px" alt="Start">'
			+ 'Start'
			+ '</button>'
			+ '&nbsp;'
			+ '<button type="button" id="arrivalButton" title="Add/remove an arrival. The game can have several arrivals.">'
			+ '<img src="https://images.wikia.nocookie.net/gamecloud/images/5/52/Key.png" width="10px" alt="Arrival">'
			+ 'Arrival'
			+ '</button>'
			+ ''
			+ '&nbsp;Width of the map:&nbsp;'
			+ ''
			+ '<button type="button" id="widthLessButton" title="Decrease the width of the map.">'
			+ '-'
			+ '</button>'
			+ '&nbsp;'
			+ '<button type="button" id="widthMoreButton" title="Increase the width of the map.">'
			+ '+'
			+ '</button>'
			+ ''
			+ '&nbsp;Height of the map:&nbsp;'
			+ ''
			+ '<button type="button" id="heightLessButton" title="Decrease the height of the map.">'
			+ '-'
			+ '</button>'
			+ '&nbsp;'
			+ '<button type="button" id="heightMoreButton" title="Increase the height of the map.">'
			+ '+'
			+ '</button>'
			+ ''
			+ '<div id="editorDiv" style="overflow:auto; width:100%; height:500px; display:bloc;">'
			+ '<canvas id="editorCanvas"/>'
			+ '</div>'
			+ '<br/>'
			+ ''
			+ '<button type="button" id="previewButton" title="Restart the game with the new world to test it before publishing.">Preview</button>'
			+ '&nbsp;'
			// TODO Restore disabled="disabled"
			+ '<button type="button" id="updateButton" title="Save the game on the site and make it visible to everybody.">Publish on the site</button>'
			+ '<br/>'
			+ '<span id="statusMessage">'
			+ '</span>'
			+ '</div>'
			+ '<br/>';

		// Add the game and the explanation at the top of the content area
		gameMarkup.innerHTML = canvasContainer.innerHTML + explanation.innerHTML + gameMarkup.innerHTML;

		_gamePlayer.canvas = document.getElementById("playerCanvas");
		var returnValues = _gamePlayer.initCanvas(_gamePlayer.canvas);
		_gamePlayer.canvasContext = returnValues[0];
		_gamePlayer.canvasProgram = returnValues[1];

		_gamePlayer.canvasBuffer = document.createElement('canvas');
		returnValues = _gamePlayer.initCanvas(_gamePlayer.canvasBuffer);
		_gamePlayer.canvasBufferContext = returnValues[0];
		_gamePlayer.canvasBufferProgram = returnValues[1];
		
		// Canvas of sprites
		_gamePlayer.wallCanvas = document.createElement('canvas');
		_gamePlayer.keyCanvas = document.createElement('canvas');
		_gamePlayer.backgroundCanvas = document.createElement('canvas');
		_gamePlayer.departureCanvas = document.createElement('canvas');
		_gamePlayer.trapCanvas = document.createElement('canvas');
		_gamePlayer.characterFall1LeftCanvas = document.createElement('canvas');
		_gamePlayer.characterFall1RightCanvas = document.createElement('canvas');
		_gamePlayer.characterJump1LeftCanvas = document.createElement('canvas');
		_gamePlayer.characterJump1RightCanvas = document.createElement('canvas');
		_gamePlayer.characterWait1LeftCanvas = document.createElement('canvas');
		_gamePlayer.characterWait1RightCanvas = document.createElement('canvas');
		_gamePlayer.characterWalk1LeftCanvas = document.createElement('canvas');
		_gamePlayer.characterWalk1RightCanvas = document.createElement('canvas');
		_gamePlayer.characterWalk2LeftCanvas = document.createElement('canvas');
		_gamePlayer.characterWalk2RightCanvas = document.createElement('canvas');
		_gamePlayer.bomb1Canvas = document.createElement('canvas');
		_gamePlayer.bomb2Canvas = document.createElement('canvas');
		_gamePlayer.bomb3Canvas = document.createElement('canvas');
		_gamePlayer.bomb4Canvas = document.createElement('canvas');
		_gamePlayer.bomb5Canvas = document.createElement('canvas');
		_gamePlayer.bomb6Canvas = document.createElement('canvas');
		_gamePlayer.bomb7Canvas = document.createElement('canvas');
		_gamePlayer.bomb8Canvas = document.createElement('canvas');
		_gamePlayer.bomb9Canvas = document.createElement('canvas');
		_gamePlayer.bomb10Canvas = document.createElement('canvas');
		_gamePlayer.bomb11Canvas = document.createElement('canvas');
		_gamePlayer.bomb12Canvas = document.createElement('canvas');
		
		returnValues = _gamePlayer.initCanvas(_gamePlayer.wallCanvas);
		_gamePlayer.wallCanvasContext = returnValues[0];
		_gamePlayer.wallCanvasProgram = returnValues[1];
		returnValues = _gamePlayer.initCanvas(_gamePlayer.keyCanvas);
		_gamePlayer.keyCanvasContext = returnValues[0];
		_gamePlayer.keyCanvasProgram = returnValues[1];
		returnValues = _gamePlayer.initCanvas(_gamePlayer.backgroundCanvas);
		_gamePlayer.backgroundCanvasContext = returnValues[0];
		_gamePlayer.backgroundCanvasProgram = returnValues[1];
		returnValues = _gamePlayer.initCanvas(_gamePlayer.departureCanvas);
		_gamePlayer.departureCanvasContext = returnValues[0];
		_gamePlayer.departureCanvasProgram = returnValues[1];
		returnValues = _gamePlayer.initCanvas(_gamePlayer.trapCanvas);
		_gamePlayer.trapCanvasContext = returnValues[0];
		_gamePlayer.trapCanvasProgram = returnValues[1];
		returnValues = _gamePlayer.initCanvas(_gamePlayer.characterFall1LeftCanvas);
		_gamePlayer.characterFall1LeftCanvasContext = returnValues[0];
		_gamePlayer.characterFall1LeftCanvasProgram = returnValues[1];
		returnValues = _gamePlayer.initCanvas(_gamePlayer.characterFall1RightCanvas);
		_gamePlayer.characterFall1RightCanvasContext = returnValues[0];
		_gamePlayer.characterFall1RightCanvasProgram = returnValues[1];
		returnValues = _gamePlayer.initCanvas(_gamePlayer.characterJump1LeftCanvas);
		_gamePlayer.characterJump1LeftCanvasContext = returnValues[0];
		_gamePlayer.characterJump1LeftCanvasProgram = returnValues[1];
		returnValues = _gamePlayer.initCanvas(_gamePlayer.characterJump1RightCanvas);
		_gamePlayer.characterJump1RightCanvasContext = returnValues[0];
		_gamePlayer.characterJump1RightCanvasProgram = returnValues[1];
		returnValues = _gamePlayer.initCanvas(_gamePlayer.characterWait1LeftCanvas);
		_gamePlayer.characterWait1LeftCanvasContext = returnValues[0];
		_gamePlayer.characterWait1LeftCanvasProgram = returnValues[1];
		returnValues = _gamePlayer.initCanvas(_gamePlayer.characterWait1RightCanvas);
		_gamePlayer.characterWait1RightCanvasContext = returnValues[0];
		_gamePlayer.characterWait1RightCanvasProgram = returnValues[1];
		returnValues = _gamePlayer.initCanvas(_gamePlayer.characterWalk1LeftCanvas);
		_gamePlayer.characterWalk1LeftCanvasContext = returnValues[0];
		_gamePlayer.characterWalk1LeftCanvasProgram = returnValues[1];
		returnValues = _gamePlayer.initCanvas(_gamePlayer.characterWalk1RightCanvas);
		_gamePlayer.characterWalk1RightCanvasContext = returnValues[0];
		_gamePlayer.characterWalk1RightCanvasProgram = returnValues[1];
		returnValues = _gamePlayer.initCanvas(_gamePlayer.characterWalk2LeftCanvas);
		_gamePlayer.characterWalk2LeftCanvasContext = returnValues[0];
		_gamePlayer.characterWalk2LeftCanvasProgram = returnValues[1];
		returnValues = _gamePlayer.initCanvas(_gamePlayer.characterWalk2RightCanvas);
		_gamePlayer.characterWalk2RightCanvasContext = returnValues[0];
		_gamePlayer.characterWalk2RightCanvasProgram = returnValues[1];
		returnValues = _gamePlayer.initCanvas(_gamePlayer.bomb1Canvas);
		_gamePlayer.bomb1CanvasContext = returnValues[0];
		_gamePlayer.bomb1CanvasProgram = returnValues[1];
		returnValues = _gamePlayer.initCanvas(_gamePlayer.bomb2Canvas);
		_gamePlayer.bomb2CanvasContext = returnValues[0];
		_gamePlayer.bomb2CanvasProgram = returnValues[1];
		returnValues = _gamePlayer.initCanvas(_gamePlayer.bomb3Canvas);
		_gamePlayer.bomb3CanvasContext = returnValues[0];
		_gamePlayer.bomb3CanvasProgram = returnValues[1];
		returnValues = _gamePlayer.initCanvas(_gamePlayer.bomb4Canvas);
		_gamePlayer.bomb4CanvasContext = returnValues[0];
		_gamePlayer.bomb4CanvasProgram = returnValues[1];
		returnValues = _gamePlayer.initCanvas(_gamePlayer.bomb5Canvas);
		_gamePlayer.bomb5CanvasContext = returnValues[0];
		_gamePlayer.bomb5CanvasProgram = returnValues[1];
		returnValues = _gamePlayer.initCanvas(_gamePlayer.bomb6Canvas);
		_gamePlayer.bomb6CanvasContext = returnValues[0];
		_gamePlayer.bomb6CanvasProgram = returnValues[1];
		returnValues = _gamePlayer.initCanvas(_gamePlayer.bomb7Canvas);
		_gamePlayer.bomb7CanvasContext = returnValues[0];
		_gamePlayer.bomb7CanvasProgram = returnValues[1];
		returnValues = _gamePlayer.initCanvas(_gamePlayer.bomb8Canvas);
		_gamePlayer.bomb8CanvasContext = returnValues[0];
		_gamePlayer.bomb8CanvasProgram = returnValues[1];
		returnValues = _gamePlayer.initCanvas(_gamePlayer.bomb9Canvas);
		_gamePlayer.bomb9CanvasContext = returnValues[0];
		_gamePlayer.bomb9CanvasProgram = returnValues[1];
		returnValues = _gamePlayer.initCanvas(_gamePlayer.bomb10Canvas);
		_gamePlayer.bomb10CanvasContext = returnValues[0];
		_gamePlayer.bomb10CanvasProgram = returnValues[1];
		returnValues = _gamePlayer.initCanvas(_gamePlayer.bomb11Canvas);
		_gamePlayer.bomb11CanvasContext = returnValues[0];
		_gamePlayer.bomb11CanvasProgram = returnValues[1];
		returnValues = _gamePlayer.initCanvas(_gamePlayer.bomb12Canvas);
		_gamePlayer.bomb12CanvasContext = returnValues[0];
		_gamePlayer.bomb12CanvasProgram = returnValues[1];

		_gamePlayer.wallCanvas.width = GamePlayer.BLOCK_WIDTH;
		_gamePlayer.keyCanvas.width = GamePlayer.BLOCK_WIDTH;
		_gamePlayer.backgroundCanvas.width = GamePlayer.BLOCK_WIDTH * GamePlayer.WINDOW_WIDTH * 2;
		_gamePlayer.departureCanvas.width = GamePlayer.BLOCK_WIDTH;
		_gamePlayer.trapCanvas.width = GamePlayer.BLOCK_WIDTH;
		_gamePlayer.characterFall1LeftCanvas.width = GamePlayer.CHARACTER_WIDTH * GamePlayer.BLOCK_WIDTH;
		_gamePlayer.characterFall1RightCanvas.width = GamePlayer.CHARACTER_WIDTH * GamePlayer.BLOCK_WIDTH;
		_gamePlayer.characterJump1LeftCanvas.width = GamePlayer.CHARACTER_WIDTH * GamePlayer.BLOCK_WIDTH;
		_gamePlayer.characterJump1RightCanvas.width = GamePlayer.CHARACTER_WIDTH * GamePlayer.BLOCK_WIDTH;
		_gamePlayer.characterWait1LeftCanvas.width = GamePlayer.CHARACTER_WIDTH * GamePlayer.BLOCK_WIDTH;
		_gamePlayer.characterWait1RightCanvas.width = GamePlayer.CHARACTER_WIDTH * GamePlayer.BLOCK_WIDTH;
		_gamePlayer.characterWalk1LeftCanvas.width = GamePlayer.CHARACTER_WIDTH * GamePlayer.BLOCK_WIDTH;
		_gamePlayer.characterWalk1RightCanvas.width = GamePlayer.CHARACTER_WIDTH * GamePlayer.BLOCK_WIDTH;
		_gamePlayer.characterWalk2LeftCanvas.width = GamePlayer.CHARACTER_WIDTH * GamePlayer.BLOCK_WIDTH;
		_gamePlayer.characterWalk2RightCanvas.width = GamePlayer.CHARACTER_WIDTH * GamePlayer.BLOCK_WIDTH;
		_gamePlayer.bomb1Canvas.width = GamePlayer.BLOCK_WIDTH;
		_gamePlayer.bomb2Canvas.width = GamePlayer.BLOCK_WIDTH;
		_gamePlayer.bomb3Canvas.width = GamePlayer.BLOCK_WIDTH;
		_gamePlayer.bomb4Canvas.width = GamePlayer.BLOCK_WIDTH;
		_gamePlayer.bomb5Canvas.width = GamePlayer.BLOCK_WIDTH;
		_gamePlayer.bomb6Canvas.width = GamePlayer.BLOCK_WIDTH;
		_gamePlayer.bomb7Canvas.width = GamePlayer.BLOCK_WIDTH;
		_gamePlayer.bomb8Canvas.width = GamePlayer.BLOCK_WIDTH;
		_gamePlayer.bomb9Canvas.width = GamePlayer.BLOCK_WIDTH;
		_gamePlayer.bomb10Canvas.width = GamePlayer.BLOCK_WIDTH;
		_gamePlayer.bomb11Canvas.width = GamePlayer.BLOCK_WIDTH;
		_gamePlayer.bomb12Canvas.width = GamePlayer.BLOCK_WIDTH;

		_gamePlayer.wallCanvas.height = GamePlayer.BLOCK_HEIGHT;
		_gamePlayer.keyCanvas.height = GamePlayer.BLOCK_HEIGHT;
		_gamePlayer.backgroundCanvas.height = GamePlayer.BLOCK_HEIGHT * GamePlayer.WINDOW_HEIGHT * 2;
		_gamePlayer.departureCanvas.height = GamePlayer.BLOCK_HEIGHT;
		_gamePlayer.trapCanvas.height = GamePlayer.BLOCK_HEIGHT;
		_gamePlayer.characterFall1LeftCanvas.height = GamePlayer.CHARACTER_HEIGHT * GamePlayer.BLOCK_HEIGHT;
		_gamePlayer.characterFall1RightCanvas.height = GamePlayer.CHARACTER_HEIGHT * GamePlayer.BLOCK_HEIGHT;
		_gamePlayer.characterJump1LeftCanvas.height = GamePlayer.CHARACTER_HEIGHT * GamePlayer.BLOCK_HEIGHT;
		_gamePlayer.characterJump1RightCanvas.height = GamePlayer.CHARACTER_HEIGHT * GamePlayer.BLOCK_HEIGHT;
		_gamePlayer.characterWait1LeftCanvas.height = GamePlayer.CHARACTER_HEIGHT * GamePlayer.BLOCK_HEIGHT;
		_gamePlayer.characterWait1RightCanvas.height = GamePlayer.CHARACTER_HEIGHT * GamePlayer.BLOCK_HEIGHT;
		_gamePlayer.characterWalk1LeftCanvas.height = GamePlayer.CHARACTER_HEIGHT * GamePlayer.BLOCK_HEIGHT;
		_gamePlayer.characterWalk1RightCanvas.height = GamePlayer.CHARACTER_HEIGHT * GamePlayer.BLOCK_HEIGHT;
		_gamePlayer.characterWalk2LeftCanvas.height = GamePlayer.CHARACTER_HEIGHT * GamePlayer.BLOCK_HEIGHT;
		_gamePlayer.characterWalk2RightCanvas.height = GamePlayer.CHARACTER_HEIGHT * GamePlayer.BLOCK_HEIGHT;
		_gamePlayer.bomb1Canvas.height = GamePlayer.BLOCK_HEIGHT;
		_gamePlayer.bomb2Canvas.height = GamePlayer.BLOCK_HEIGHT;
		_gamePlayer.bomb3Canvas.height = GamePlayer.BLOCK_HEIGHT;
		_gamePlayer.bomb4Canvas.height = GamePlayer.BLOCK_HEIGHT;
		_gamePlayer.bomb5Canvas.height = GamePlayer.BLOCK_HEIGHT;
		_gamePlayer.bomb6Canvas.height = GamePlayer.BLOCK_HEIGHT;
		_gamePlayer.bomb7Canvas.height = GamePlayer.BLOCK_HEIGHT;
		_gamePlayer.bomb8Canvas.height = GamePlayer.BLOCK_HEIGHT;
		_gamePlayer.bomb9Canvas.height = GamePlayer.BLOCK_HEIGHT;
		_gamePlayer.bomb10Canvas.height = GamePlayer.BLOCK_HEIGHT;
		_gamePlayer.bomb11Canvas.height = GamePlayer.BLOCK_HEIGHT;
		_gamePlayer.bomb12Canvas.height = GamePlayer.BLOCK_HEIGHT;
		
		_gamePlayer.drawImage(_gamePlayer.wallCanvasContext, _gamePlayer.wallCanvasProgram, wallImage, 0, 0);
		_gamePlayer.drawImage(_gamePlayer.keyCanvasContext, _gamePlayer.keyCanvasProgram, keyImage, 0, 0);
		_gamePlayer.drawImage(_gamePlayer.backgroundCanvasContext, _gamePlayer.backgroundCanvasProgram, backgroundImage, 0, 0);
		_gamePlayer.drawImage(_gamePlayer.departureCanvasContext, _gamePlayer.departureCanvasProgram, departureImage, 0, 0);
		_gamePlayer.drawImage(_gamePlayer.trapCanvasContext, _gamePlayer.trapCanvasProgram, trapImage, 0, 0);
		_gamePlayer.drawImage(_gamePlayer.characterFall1LeftCanvasContext, _gamePlayer.characterFall1LeftCanvasProgram, characterFall1LeftImage, 0, 0);
		_gamePlayer.drawImage(_gamePlayer.characterFall1RightCanvasContext, _gamePlayer.characterFall1RightCanvasProgram, characterFall1RightImage, 0, 0);
		_gamePlayer.drawImage(_gamePlayer.characterJump1LeftCanvasContext, _gamePlayer.characterJump1LeftCanvasProgram, characterJump1LeftImage, 0, 0);
		_gamePlayer.drawImage(_gamePlayer.characterJump1RightCanvasContext, _gamePlayer.characterJump1RightCanvasProgram, characterJump1RightImage, 0, 0);
		_gamePlayer.drawImage(_gamePlayer.characterWait1LeftCanvasContext, _gamePlayer.characterWait1LeftCanvasProgram, characterWait1LeftImage, 0, 0);
		_gamePlayer.drawImage(_gamePlayer.characterWait1RightCanvasContext, _gamePlayer.characterWait1RightCanvasProgram, characterWait1RightImage, 0, 0);
		_gamePlayer.drawImage(_gamePlayer.characterWalk1LeftCanvasContext, _gamePlayer.characterWalk1LeftCanvasProgram, characterWalk1LeftImage, 0, 0);
		_gamePlayer.drawImage(_gamePlayer.characterWalk1RightCanvasContext, _gamePlayer.characterWalk1RightCanvasProgram, characterWalk1RightImage, 0, 0);
		_gamePlayer.drawImage(_gamePlayer.characterWalk2LeftCanvasContext, _gamePlayer.characterWalk2LeftCanvasProgram, characterWalk2LeftImage, 0, 0);
		_gamePlayer.drawImage(_gamePlayer.characterWalk2RightCanvasContext, _gamePlayer.characterWalk2RightCanvasProgram, characterWalk2RightImage, 0, 0);
		_gamePlayer.drawImage(_gamePlayer.bomb1CanvasContext, _gamePlayer.bomb1CanvasProgram, bomb1Image, 0, 0);
		_gamePlayer.drawImage(_gamePlayer.bomb2CanvasContext, _gamePlayer.bomb2CanvasProgram, bomb2Image, 0, 0);
		_gamePlayer.drawImage(_gamePlayer.bomb3CanvasContext, _gamePlayer.bomb3CanvasProgram, bomb3Image, 0, 0);
		_gamePlayer.drawImage(_gamePlayer.bomb4CanvasContext, _gamePlayer.bomb4CanvasProgram, bomb4Image, 0, 0);
		_gamePlayer.drawImage(_gamePlayer.bomb5CanvasContext, _gamePlayer.bomb5CanvasProgram, bomb5Image, 0, 0);
		_gamePlayer.drawImage(_gamePlayer.bomb6CanvasContext, _gamePlayer.bomb6CanvasProgram, bomb6Image, 0, 0);
		_gamePlayer.drawImage(_gamePlayer.bomb7CanvasContext, _gamePlayer.bomb7CanvasProgram, bomb7Image, 0, 0);
		_gamePlayer.drawImage(_gamePlayer.bomb8CanvasContext, _gamePlayer.bomb8CanvasProgram, bomb8Image, 0, 0);
		_gamePlayer.drawImage(_gamePlayer.bomb9CanvasContext, _gamePlayer.bomb9CanvasProgram, bomb9Image, 0, 0);
		_gamePlayer.drawImage(_gamePlayer.bomb10CanvasContext, _gamePlayer.bomb10CanvasProgram, bomb10Image, 0, 0);
		_gamePlayer.drawImage(_gamePlayer.bomb11CanvasContext, _gamePlayer.bomb11CanvasProgram, bomb11Image, 0, 0);
		_gamePlayer.drawImage(_gamePlayer.bomb12CanvasContext, _gamePlayer.bomb12CanvasProgram, bomb12Image, 0, 0);

		_gamePlayer.bombCanvas.push(_gamePlayer.bomb1Canvas);
		_gamePlayer.bombCanvas.push(_gamePlayer.bomb2Canvas);
		_gamePlayer.bombCanvas.push(_gamePlayer.bomb3Canvas);
		_gamePlayer.bombCanvas.push(_gamePlayer.bomb4Canvas);
		_gamePlayer.bombCanvas.push(_gamePlayer.bomb5Canvas);
		_gamePlayer.bombCanvas.push(_gamePlayer.bomb6Canvas);
		_gamePlayer.bombCanvas.push(_gamePlayer.bomb7Canvas);
		_gamePlayer.bombCanvas.push(_gamePlayer.bomb8Canvas);
		_gamePlayer.bombCanvas.push(_gamePlayer.bomb9Canvas);
		_gamePlayer.bombCanvas.push(_gamePlayer.bomb10Canvas);
		_gamePlayer.bombCanvas.push(_gamePlayer.bomb11Canvas);
		_gamePlayer.bombCanvas.push(_gamePlayer.bomb12Canvas);

		_gamePlayer.startParty();

		_gamePlayer.batch = self.setInterval(doControlls, GamePlayer.FRAME_RATE);
	}

	/**
	* Start or restart a party.
	* This function converts all the index in block width and height for further features.
	* Game Cloud is supposed to implement fluid motion in the future.
	*/
	_gamePlayer.startParty = function() {
		var x = 0;
		var y = 0;
		gameMap = new Array();
		gameMap[Math.round(y / GamePlayer.BLOCK_HEIGHT)] = new Array();
		for (var i = 0; i < gameModel.length; i++) {
			if ((gameModel[i] == 'x') || (gameModel[i] == 'X')) {
				gameMap[y / GamePlayer.BLOCK_HEIGHT][Math.round(x / GamePlayer.BLOCK_WIDTH)] = GamePlayer.WALL;
				x = x + GamePlayer.BLOCK_WIDTH;
			} else if (gameModel[i] == '.') {
				gameMap[Math.round(y / GamePlayer.BLOCK_HEIGHT)][Math.round(x / GamePlayer.BLOCK_WIDTH)] = GamePlayer.VOID;
				x = x + GamePlayer.BLOCK_WIDTH;
			} else if ((gameModel[i] == 'i') || (gameModel[i] == 'I')) {
				_gamePlayer.xPosition = x;
				_gamePlayer.yPosition = y;
				gameMap[Math.round(y / GamePlayer.BLOCK_HEIGHT)][Math.round(x / GamePlayer.BLOCK_WIDTH)] = GamePlayer.START;
				x = x + GamePlayer.BLOCK_WIDTH;
			} else if ((gameModel[i] == 'o') || (gameModel[i] == 'O')) {
				gameMap[Math.round(y / GamePlayer.BLOCK_HEIGHT)][Math.round(x / GamePlayer.BLOCK_WIDTH)] = GamePlayer.EXIT;
				x = x + GamePlayer.BLOCK_WIDTH;
			} else if ((gameModel[i] == 'b') || (gameModel[i] == 'B')) {
				gameMap[Math.round(y / GamePlayer.BLOCK_HEIGHT)][Math.round(x / GamePlayer.BLOCK_WIDTH)] = GamePlayer.TRAP;
				x = x + GamePlayer.BLOCK_WIDTH;
			} else if (gameMap[Math.round(y / GamePlayer.BLOCK_HEIGHT)].length > 0) {
				// Do not start a new line if the previous line is empty.
				y = y + GamePlayer.BLOCK_HEIGHT;
				gameMap[y / GamePlayer.BLOCK_HEIGHT] = new Array();
				x = 0;
			}
		}

		if (gameMap[gameMap.length - 1].length == 0) {
			// We don't want to add a last empty line.
			gameMap.length = gameMap.length - 1;
		}

		_gamePlayer.isGameWon = false;
		_gamePlayer.isGameOver = false;
		_gamePlayer.keyUpPressed = false;
		_gamePlayer.keyRightPressed = false;
		_gamePlayer.keyLeftPressed = false;
		_gamePlayer.rKeyPressed = false;
		_gamePlayer.render();
	}

	/**
	* Draw the game at the current state.
	*/
	_gamePlayer.render = function() {
		var left = _gamePlayer.xPosition - (GamePlayer.WINDOW_WIDTH - 1) * GamePlayer.BLOCK_WIDTH / 2;
		var top = _gamePlayer.yPosition - (GamePlayer.WINDOW_HEIGHT - 1) * GamePlayer.BLOCK_HEIGHT / 2;
		var right = _gamePlayer.xPosition + (GamePlayer.WINDOW_WIDTH + 1) * GamePlayer.BLOCK_WIDTH / 2;
		var bottom = _gamePlayer.yPosition + (GamePlayer.WINDOW_HEIGHT + 1) * GamePlayer.BLOCK_HEIGHT / 2;

		_gamePlayer.canvas.width = GamePlayer.WINDOW_WIDTH * GamePlayer.BLOCK_WIDTH;
		_gamePlayer.canvas.height = GamePlayer.WINDOW_HEIGHT * GamePlayer.BLOCK_HEIGHT;

		_gamePlayer.canvasBuffer.width = GamePlayer.WINDOW_WIDTH * GamePlayer.BLOCK_WIDTH;
		_gamePlayer.canvasBuffer.height = GamePlayer.WINDOW_HEIGHT * GamePlayer.BLOCK_HEIGHT;

		// Background
		var backgroundX = ((0 - _gamePlayer.xPosition) / GamePlayer.WORLD_DEPTH) % (GamePlayer.WINDOW_WIDTH * GamePlayer.BLOCK_WIDTH);
		var backgroundY = ((0 - _gamePlayer.yPosition) / GamePlayer.WORLD_DEPTH) % (GamePlayer.WINDOW_HEIGHT * GamePlayer.BLOCK_HEIGHT);
		_gamePlayer.drawImage(_gamePlayer.canvasBufferContext, _gamePlayer.canvasBufferProgram, _gamePlayer.backgroundCanvas, backgroundX, backgroundY);

		// Place
		// We only parse indexes that are on the field of view.
		var yBeginIndex = Math.max(0, Math.round(top / GamePlayer.BLOCK_HEIGHT));
		var yEndIndex = Math.min(gameMap.length, Math.round(bottom / GamePlayer.BLOCK_HEIGHT));
		var xBeginIndex = Math.max(0, Math.round(left / GamePlayer.BLOCK_WIDTH));

		for (var j = yBeginIndex; j < yEndIndex; j++) {
			var xEndIndex = Math.min(gameMap[j].length, Math.round(right / GamePlayer.BLOCK_WIDTH));
			for (var i = xBeginIndex; i < xEndIndex; i++) {
				if (gameMap[j][i] == GamePlayer.WALL) {
					_gamePlayer.drawImage(_gamePlayer.canvasBufferContext, _gamePlayer.canvasBufferProgram, _gamePlayer.wallCanvas, (i * GamePlayer.BLOCK_WIDTH) - left, (j * GamePlayer.BLOCK_HEIGHT) - top);
				} else if (gameMap[j][i] == GamePlayer.START) {
					_gamePlayer.drawImage(_gamePlayer.canvasBufferContext, _gamePlayer.canvasBufferProgram, _gamePlayer.departureCanvas, (i * GamePlayer.BLOCK_WIDTH) - left, (j * GamePlayer.BLOCK_HEIGHT) - top);
				} else if (gameMap[j][i] == GamePlayer.EXIT) {
					_gamePlayer.drawImage(_gamePlayer.canvasBufferContext, _gamePlayer.canvasBufferProgram, _gamePlayer.keyCanvas, (i * GamePlayer.BLOCK_WIDTH) - left, (j * GamePlayer.BLOCK_HEIGHT) - top);
				} else if (gameMap[j][i] == GamePlayer.TRAP) {
					_gamePlayer.drawImage(_gamePlayer.canvasBufferContext, _gamePlayer.canvasBufferProgram, _gamePlayer.bombCanvas[Math.round(new Date().getTime() / 100) % 12], (i * GamePlayer.BLOCK_WIDTH) - left, (j * GamePlayer.BLOCK_HEIGHT) - top);
				}
			}
		}

		// Character
		var characterSprite = null;
		if (_gamePlayer.characterState.physics == GamePlayer.CHARACTER_STATE_PHYSICS_FALLING) {
			if (_gamePlayer.characterState.direction == GamePlayer.CHARACTER_STATE_DIRECTION_LEFT) {
				characterSprite = _gamePlayer.characterFall1LeftCanvas;
			} else {
				characterSprite = _gamePlayer.characterFall1RightCanvas;
			}
		} else if (_gamePlayer.characterState.physics == GamePlayer.CHARACTER_STATE_PHYSICS_WALKING) {
			// TODO Improve this code
			if (_gamePlayer.characterState.spriteCount == 0) {
				if (_gamePlayer.characterState.direction == GamePlayer.CHARACTER_STATE_DIRECTION_LEFT) {
					characterSprite = _gamePlayer.characterWalk1LeftCanvas;
				} else {
					characterSprite = _gamePlayer.characterWalk1RightCanvas;
				}
			} else {
				if (_gamePlayer.characterState.direction == GamePlayer.CHARACTER_STATE_DIRECTION_LEFT) {
					characterSprite = _gamePlayer.characterWalk2LeftCanvas;
				} else {
					characterSprite = _gamePlayer.characterWalk2RightCanvas;
				}
			}
		} else if (_gamePlayer.characterState.physics == GamePlayer.CHARACTER_STATE_PHYSICS_RAISING) {
			if (_gamePlayer.characterState.direction == GamePlayer.CHARACTER_STATE_DIRECTION_LEFT) {
				characterSprite = _gamePlayer.characterJump1LeftCanvas;
			} else {
				characterSprite = _gamePlayer.characterJump1RightCanvas;
			}
		} else {
			// Waiting
			if (_gamePlayer.characterState.direction == GamePlayer.CHARACTER_STATE_DIRECTION_LEFT) {
				characterSprite = _gamePlayer.characterWait1LeftCanvas;
			} else {
				characterSprite = _gamePlayer.characterWait1RightCanvas;
			}
		}
		_gamePlayer.drawImage(_gamePlayer.canvasBufferContext, _gamePlayer.canvasBufferProgram, characterSprite,
		_gamePlayer.xPosition - left,
		_gamePlayer.yPosition - ((GamePlayer.CHARACTER_HEIGHT - 1) * GamePlayer.BLOCK_HEIGHT) - top);

		// Message
		if (_gamePlayer.isGameWon || _gamePlayer.isGameOver) {
			if (_gamePlayer.isGameWon) {
				_gamePlayer.fillText(_gamePlayer.canvasBufferContext,
				"You win! (press R to restart)",
				(GamePlayer.WINDOW_WIDTH * GamePlayer.BLOCK_WIDTH) / 2,
				_gamePlayer.yPosition - top);
			} else if (_gamePlayer.isGameOver) {
				_gamePlayer.fillText(_gamePlayer.canvasBufferContext,
				"You lose! (press R to restart)",
				(GamePlayer.WINDOW_WIDTH * GamePlayer.BLOCK_WIDTH) / 2,
				_gamePlayer.yPosition - top);
			}
		}
		_gamePlayer.canvasContext.drawImage(_gamePlayer.canvasBuffer, 0, 0);
	}

	/**
	* Get the game editor.
	*/
	_gamePlayer.getGameEditor = function() {
		return _gamePlayer.gameEditor;
	}

	/**
	* Set the game editor.
	*/
	_gamePlayer.setGameEditor = function(newGameEditor) {
		_gamePlayer.gameEditor = newGameEditor;
	}

	/**
	* Get the context of a canvas.
	*/
	_gamePlayer.initCanvas = function(canvas) {
		return [canvas.getContext('2d'), null];
	}

	/**
	* Draw an image on a canvas.
	*/
	_gamePlayer.drawImage = function(context, program, image, x, y) {
		context.drawImage(image, x, y);
		//drawImage(context, program, image, x, y);
	}

	/**
	* Write a text on a canvas.
	*/
	_gamePlayer.fillText = function(context, message, x, y) {
		context.textAlign = "center";
		context.font = "30pt Arial";
		context.fillStyle = "black";
		context.fillText(message, x, y);
	}

	/**
	* Get the context of a canvas.
	*/
	_gamePlayer.clearRect = function(context, x, y) {
		context.clearRect(0, 0, x, y);
	}
}