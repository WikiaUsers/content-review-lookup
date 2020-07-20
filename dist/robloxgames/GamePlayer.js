/**
 * The class that renders the game player.
 */
 
	// Constants
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
GamePlayer.WORLD_DEPTH = 5;
 
function GamePlayer() {
 
	var _gamePlayer = this;
 
	// Fields
	_gamePlayer.xPosition = 7;
	_gamePlayer.yPosition = 7;
	_gamePlayer.isGameWon = false;
	_gamePlayer.isGameOver = false;
	_gamePlayer.jumpPower = 0;
	_gamePlayer.batch = null;
	_gamePlayer.canvasBuffer = null;
	_gamePlayer.canvasBufferContext = null;
	_gamePlayer.keyUpPressed = false;
	_gamePlayer.keyLeftPressed = false;
	_gamePlayer.keyRightPressed = false;
	_gamePlayer.gameEditor = null;
 
	/**
	 * The event trigger. It operates any player operation.
	 */
	_gamePlayer.keyDown = function(event) {
		// Debug("keyDown");
		if (!_gamePlayer.isGameWon && !_gamePlayer.isGameOver) {
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
		// Debug("keyUp");
		if (!_gamePlayer.isGameWon && !_gamePlayer.isGameOver) {
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
	 * Calculate the new position of the character due to gravity. It is a very
	 * simple calculation.
	 */
	function calculateGravity() {
		if (!_gamePlayer.isGameWon && !_gamePlayer.isGameOver) {
			doControlls();
			var hasNewMove = false;
			if (_gamePlayer.jumpPower > 0) {
				if (_gamePlayer.isMovePossible(_gamePlayer.xPosition, _gamePlayer.yPosition - GamePlayer.BLOCK_HEIGHT)) {
					_gamePlayer.jumpPower = _gamePlayer.jumpPower - 1;
					_gamePlayer.yPosition = _gamePlayer.yPosition - GamePlayer.BLOCK_HEIGHT;
					hasNewMove = true;
				} else {
					_gamePlayer.jumpPower = 0;
				}
			} else if (_gamePlayer.isMovePossible(_gamePlayer.xPosition, _gamePlayer.yPosition + GamePlayer.BLOCK_HEIGHT)) {
				_gamePlayer.yPosition = _gamePlayer.yPosition + GamePlayer.BLOCK_HEIGHT;
				hasNewMove = true;
			}
 
			if (hasNewMove) {
				if (_gamePlayer.isArrival(_gamePlayer.xPosition, _gamePlayer.yPosition)) {
					_gamePlayer.isGameWon = true;
				} else if (_gamePlayer.isOnTrap(_gamePlayer.xPosition, _gamePlayer.yPosition)) {
					_gamePlayer.isGameOver = true;
				}
				_gamePlayer.render();
			}
		}
	};
 
	function doControlls() {
		if (!_gamePlayer.isGameWon && !_gamePlayer.isGameOver) {
 
			var hasNewMove = false;
			var newXPosition = _gamePlayer.xPosition;
			var newYPosition = _gamePlayer.yPosition;
 
			if (_gamePlayer.keyLeftPressed) {
				newXPosition = _gamePlayer.xPosition - GamePlayer.BLOCK_WIDTH;
				hasNewMove = true;
			} else if (_gamePlayer.keyRightPressed) {
				newXPosition = _gamePlayer.xPosition + GamePlayer.BLOCK_WIDTH;
				hasNewMove = true;
			}
 
			if (hasNewMove && _gamePlayer.isMovePossible(newXPosition, newYPosition)) {
				_gamePlayer.xPosition = newXPosition;
				_gamePlayer.yPosition = newYPosition;
 
				if (_gamePlayer.isArrival(_gamePlayer.xPosition, _gamePlayer.yPosition)) {
					_gamePlayer.isGameWon = true;
				} else if (_gamePlayer.isOnTrap(_gamePlayer.xPosition, _gamePlayer.yPosition)) {
					_gamePlayer.isGameOver = true;
				}
				_gamePlayer.render();
			}
 
			if ((_gamePlayer.keyUpPressed)
					&& !_gamePlayer.isMovePossible(_gamePlayer.xPosition, _gamePlayer.yPosition + GamePlayer.BLOCK_HEIGHT)) {
				_gamePlayer.jumpPower = 5;
			}
		}
	}
 
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
						|| (j > gameMap.length)
						|| (i < 0)
						|| (i > gameMap[j].length)
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
		_gamePlayer.canvasBuffer = document.createElement('canvas');
		_gamePlayer.canvasBufferContext = _gamePlayer.canvasBuffer.getContext('2d');
		var canvas = document.createElement("canvas");
		canvas.id = "playerCanvas";
		var canvasContainer = document.createElement("div");
		var center = document.createElement("center");
		center.appendChild(canvas);
		canvasContainer.appendChild(center);
 
		var explanation = document.createElement("div");
		explanation.width = "100%";
		// TODO Move the code reliated to the editor to the game editor script
		explanation.innerHTML = "<p>It's your turn, now!</p>"
			+ '<ul>'
			+ '<li>You have to reach the exit avoiding the bombs,</li>'
			+ '<li>Press the <b>left arrow</b> to go to the left,</li>'
			+ '<li>Press the <b>right arrow</b> to go to the right,</li>'
			+ '<li>Press the <b>J</b> to jump.</li>'
			+ '</ul>'
			+ '<br/>'
			+ ''
			+ '<button type="button" id="editorVisibilityButton">Hide the game editor</button>'
			+ '<br/>'
			+ ''
			+ '<div id="editPanel">'
			+ '<h2>Game editor</h2>'
			+ ''
			+ 'This section lets you edit the game. You have several tools to draw the game map:'
			+ '<ul>'
			+ '<li><b>The wall</b>: it is an obstacle,</li>'
			+ '<li><b>The bomb</b>: the bomb kills you,</li>'
			+ '<li><b>The beginning</b>: where the character starts the game (only one),</li>'
			+ '<li><b>The exit</b>: where the character should go (several permitted).</li>'
			+ '</ul>'
			+ '<p>Remember the character can go on the left and the right and can jump up to 5 squares.</p>'
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
			+ '<button type="button" id="previewButton">Preview</button>'
			+ '&nbsp;'
// TODO Restore disabled="disabled"
			+ '<button type="button" id="updateButton">Publish</button>'
			+ '<br/>'
			+ '<span id="statusMessage">'
			+ '</span>'
			+ '</div>'
			+ '<br/>';
 
		// Add the game and the explanation at the top of the content area
		gameMarkup.innerHTML = canvasContainer.innerHTML + explanation.innerHTML + gameMarkup.innerHTML;
 
		_gamePlayer.startParty();
 
		_gamePlayer.batch = self.setInterval(calculateGravity, 100);
	}
 
	/**
	 * Start or restart a party.
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
 
		var canvas = document.getElementById("playerCanvas");
		var context = canvas.getContext('2d');
 
		canvas.width = GamePlayer.WINDOW_WIDTH * GamePlayer.BLOCK_WIDTH;
		canvas.height = GamePlayer.WINDOW_HEIGHT * GamePlayer.BLOCK_HEIGHT;
 
		_gamePlayer.canvasBuffer.width = GamePlayer.WINDOW_WIDTH * GamePlayer.BLOCK_WIDTH;
		_gamePlayer.canvasBuffer.height = GamePlayer.WINDOW_HEIGHT * GamePlayer.BLOCK_HEIGHT;
 
		_gamePlayer.canvasBufferContext.clearRect(0, 0, canvas.width, canvas.height);
 
		// Background
		var backgroundX = ((0 - _gamePlayer.xPosition) / GamePlayer.WORLD_DEPTH) % (GamePlayer.WINDOW_WIDTH * GamePlayer.BLOCK_WIDTH);
		var backgroundY = ((0 - _gamePlayer.yPosition) / GamePlayer.WORLD_DEPTH) % (GamePlayer.WINDOW_HEIGHT * GamePlayer.BLOCK_HEIGHT);
		_gamePlayer.canvasBufferContext.drawImage(backgroundImage, backgroundX, backgroundY);
 
		// Place
		// We only parse indexes that are on the field of view.
		var yBeginIndex = Math.max(0, Math.round(top / GamePlayer.BLOCK_HEIGHT));
		var yEndIndex = Math.min(gameMap.length, Math.round(bottom / GamePlayer.BLOCK_HEIGHT));
		var xBeginIndex = Math.max(0, Math.round(left / GamePlayer.BLOCK_WIDTH));
 
		for (var j = yBeginIndex; j < yEndIndex; j++) {
			var xEndIndex = Math.min(gameMap[j].length, Math.round(right / GamePlayer.BLOCK_WIDTH));
			for (var i = xBeginIndex; i < xEndIndex; i++) {
				if (gameMap[j][i] == GamePlayer.WALL) {
					_gamePlayer.canvasBufferContext.drawImage(wallImage, (i * GamePlayer.BLOCK_WIDTH) - left, (j * GamePlayer.BLOCK_HEIGHT) - top);
				} else if (gameMap[j][i] == GamePlayer.START) {
					_gamePlayer.canvasBufferContext.drawImage(departureImage, (i * GamePlayer.BLOCK_WIDTH) - left, (j * GamePlayer.BLOCK_HEIGHT) - top);
				} else if (gameMap[j][i] == GamePlayer.EXIT) {
					_gamePlayer.canvasBufferContext.drawImage(keyImage, (i * GamePlayer.BLOCK_WIDTH) - left, (j * GamePlayer.BLOCK_HEIGHT) - top);
				} else if (gameMap[j][i] == GamePlayer.TRAP) {
					_gamePlayer.canvasBufferContext.drawImage(trapImage, (i * GamePlayer.BLOCK_WIDTH) - left, (j * GamePlayer.BLOCK_HEIGHT) - top);
				}
			}
		}
 
		// Character
		_gamePlayer.canvasBufferContext.drawImage(characterImage,
				_gamePlayer.xPosition - left,
				_gamePlayer.yPosition - ((GamePlayer.CHARACTER_HEIGHT - 1) * GamePlayer.BLOCK_HEIGHT) - top);
 
		// Message
		if (_gamePlayer.isGameWon || _gamePlayer.isGameOver) {
			if (_gamePlayer.isGameWon) {
				var message = "You win!";
			} else if (_gamePlayer.isGameOver) {
				var message = "You lose!";
			}
			_gamePlayer.canvasBufferContext.font = "30pt Arial";
 
			_gamePlayer.canvasBufferContext.fillStyle = "black";
			var textOffset = -60;
			_gamePlayer.canvasBufferContext.fillText(message,
					_gamePlayer.xPosition - left + textOffset,
					_gamePlayer.yPosition - top);
		}
		context.drawImage(_gamePlayer.canvasBuffer, 0, 0);
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
}