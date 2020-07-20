/**
 * The class that renders the game editor.
 */

// Constants
GameEditor.BLOCK_HEIGHT = 10;
GameEditor.BLOCK_WIDTH = 10;
GameEditor.WALL_TOOL = 1;
GameEditor.START_TOOL = 2;
GameEditor.ARRIVAL_TOOL = 3;
GameEditor.TRAP_TOOL = 4;

function GameEditor() {

	var _gameEditor = this;

	// Fields
	_gameEditor.wgEditToken = "void";
	_gameEditor.isEditorVisible = true;
	_gameEditor.gameMapWidth = null;
	_gameEditor.editorMap = null;
	_gameEditor.gamePlayer = null;
	_gameEditor.canvasBuffer = null;
	_gameEditor.canvasBufferContext = null;
	_gameEditor.tool = GameEditor.WALL_TOOL;
	_gameEditor.modified = false;
	
	// Intermediate canvas
	_gameEditor.wallCanvas = null;
	_gameEditor.keyCanvas = null;
	_gameEditor.departureCanvas = null;
	_gameEditor.trapCanvas = null;
	
	_gameEditor.wallCanvasContext = null;
	_gameEditor.keyCanvasContext = null;
	_gameEditor.departureCanvasContext = null;
	_gameEditor.trapCanvasContext = null;
	
	/**
	 * Construct the game editor.
	 */
	_gameEditor.initGameEditor = function() {
		_gameEditor.canvasBuffer = document.createElement('canvas');
		_gameEditor.canvasBufferContext = _gameEditor.canvasBuffer.getContext('2d');
		
		// Events
		var editorVisibilityButton = document.getElementById("editorVisibilityButton");
		editorVisibilityButton.onclick = _gameEditor.toggleEditorVisibility;
		
		var previewButton = document.getElementById("previewButton");
		previewButton.onclick = _gameEditor.preview;
		
		var publishButton = document.getElementById("updateButton");
		publishButton.onclick = _gameEditor.publish;
		
		var editorCanvas = document.getElementById("editorCanvas");
		editorCanvas.onclick = _gameEditor.editorCanvasClicked;
		
		var wallButton = document.getElementById("wallButton");
		wallButton.onclick = _gameEditor.wallButtonClicked;
		
		var startButton = document.getElementById("startButton");
		startButton.onclick = _gameEditor.startButtonClicked;
		
		var arrivalButton = document.getElementById("arrivalButton");
		arrivalButton.onclick = _gameEditor.arrivalButtonClicked;
		
		var trapButton = document.getElementById("trapButton");
		trapButton.onclick = _gameEditor.trapButtonClicked;
		
		var widthLessButton = document.getElementById("widthLessButton");
		widthLessButton.onclick = _gameEditor.widthLessButtonClicked;
		
		var widthMoreButton = document.getElementById("widthMoreButton");
		widthMoreButton.onclick = _gameEditor.widthMoreButtonClicked;
		
		var heightLessButton = document.getElementById("heightLessButton");
		heightLessButton.onclick = _gameEditor.heightLessButtonClicked;
		
		var heightMoreButton = document.getElementById("heightMoreButton");
		heightMoreButton.onclick = _gameEditor.heightMoreButtonClicked;
		
		_gameEditor.retrieveEditToken();
		
		// Duplicate the model
		_gameEditor.editorMap = new Array();
		_gameEditor.gameMapWidth = 0;
		for (var y = 0; y < gameMap.length; y++) {
			if (gameMap[y].length > _gameEditor.gameMapWidth) {
				_gameEditor.gameMapWidth = gameMap[y].length;
			}
			_gameEditor.editorMap[y] = gameMap[y].slice(0);
		}
		
		// Canvas of sprites
		_gameEditor.wallCanvas = document.createElement('canvas');
		_gameEditor.keyCanvas = document.createElement('canvas');
		_gameEditor.departureCanvas = document.createElement('canvas');
		_gameEditor.trapCanvas = document.createElement('canvas');
		
		_gameEditor.wallCanvasContext = _gameEditor.wallCanvas.getContext('2d');
		_gameEditor.keyCanvasContext = _gameEditor.keyCanvas.getContext('2d');
		_gameEditor.departureCanvasContext = _gameEditor.departureCanvas.getContext('2d');
		_gameEditor.trapCanvasContext = _gameEditor.trapCanvas.getContext('2d');
		
		_gameEditor.wallCanvas.width = GameEditor.BLOCK_WIDTH;
		_gameEditor.keyCanvas.width = GameEditor.BLOCK_WIDTH;
		_gameEditor.departureCanvas.width = GameEditor.BLOCK_WIDTH;
		_gameEditor.trapCanvas.width = GameEditor.BLOCK_WIDTH;
		
		_gameEditor.wallCanvas.height = GameEditor.BLOCK_HEIGHT;
		_gameEditor.keyCanvas.height = GameEditor.BLOCK_HEIGHT;
		_gameEditor.departureCanvas.height = GameEditor.BLOCK_HEIGHT;
		_gameEditor.trapCanvas.height = GameEditor.BLOCK_HEIGHT;
		
		_gameEditor.wallCanvasContext.drawImage(wallImage, 0, 0, GameEditor.BLOCK_WIDTH, GameEditor.BLOCK_HEIGHT);
		_gameEditor.keyCanvasContext.drawImage(keyImage, 0, 0, GameEditor.BLOCK_WIDTH, GameEditor.BLOCK_HEIGHT);
		_gameEditor.departureCanvasContext.drawImage(departureImage, 0, 0, GameEditor.BLOCK_WIDTH, GameEditor.BLOCK_HEIGHT);
		_gameEditor.trapCanvasContext.drawImage(trapImage, 0, 0, GameEditor.BLOCK_WIDTH, GameEditor.BLOCK_HEIGHT);
		
		_gameEditor.render();
		_gameEditor.updateTools();
	}
	
	/**
	 * The less button has been clicked.
	 */
	_gameEditor.widthLessButtonClicked = function() {
		if (_gameEditor.gameMapWidth > 1) {
			_gameEditor.gameMapWidth = _gameEditor.gameMapWidth - 1;
			for (var y = 0; y < _gameEditor.editorMap.length; y++) {
				if (_gameEditor.editorMap[y].length > _gameEditor.gameMapWidth) {
					_gameEditor.editorMap[y].length = _gameEditor.gameMapWidth;
				} else {
					for (var x = _gameEditor.editorMap[y].length; x < _gameEditor.gameMapWidth + 1; x++) {
						_gameEditor.editorMap[y].push(GamePlayer.WALL);
					}
				}
			}
			_gameEditor.render();
			
			_gameEditor.setModified(true);
		}
	}
	
	/**
	 * The more button has been clicked.
	 */
	_gameEditor.widthMoreButtonClicked = function() {
		_gameEditor.gameMapWidth = _gameEditor.gameMapWidth + 1;
		for (var y = 0; y < _gameEditor.editorMap.length; y++) {
			var lastItem = _gameEditor.editorMap[y][_gameEditor.editorMap[y].length - 1];
			for (var x = _gameEditor.editorMap[y].length; x < _gameEditor.gameMapWidth - 1; x++) {
				_gameEditor.editorMap[y].push(GamePlayer.WALL);
			}
			_gameEditor.editorMap[y].push(lastItem);
		}
		_gameEditor.render();
		
		_gameEditor.setModified(true);
	}
	
	/**
	 * The less button has been clicked.
	 */
	_gameEditor.heightLessButtonClicked = function() {
		if (_gameEditor.editorMap.length > 1) {
			_gameEditor.editorMap.length = _gameEditor.editorMap.length - 1;
			_gameEditor.render();
			
			_gameEditor.setModified(true);
		}

	}
	
	/**
	 * The more button has been clicked.
	 */
	_gameEditor.heightMoreButtonClicked = function() {
		var oldMapHeight = _gameEditor.editorMap.length;
		_gameEditor.editorMap[oldMapHeight] = new Array();
		for (var x = 0; x < _gameEditor.gameMapWidth; x++) {
			_gameEditor.editorMap[oldMapHeight][x] = _gameEditor.editorMap[oldMapHeight - 1][x];
		}
		_gameEditor.render();
		
		_gameEditor.setModified(true);
	}
	
	/**
	 * The editor canvas has been clicked.
	 */
	_gameEditor.editorCanvasClicked = function(event) {

		var totalOffsetX = 0 - document.getElementById("editorDiv").scrollLeft;
		var totalOffsetY = 0 - document.getElementById("editorDiv").scrollTop;
		var currentElement = document.getElementById("editorCanvas");

		do {
			totalOffsetX += currentElement.offsetLeft;
			totalOffsetY += currentElement.offsetTop;
		} while (currentElement = currentElement.offsetParent)

		var x = Math.floor((event.pageX - totalOffsetX) / GameEditor.BLOCK_WIDTH);
		var y = Math.floor((event.pageY - totalOffsetY) / GameEditor.BLOCK_HEIGHT);
		
		if ((y >= 0) && (y < _gameEditor.editorMap.length) && (x >= 0) && (x < _gameEditor.editorMap[y].length)) {
			if (_gameEditor.tool == GameEditor.WALL_TOOL) {
				if (_gameEditor.editorMap[y][x] == GamePlayer.WALL) {
					_gameEditor.editorMap[y][x] = GamePlayer.VOID;
				} else {
					_gameEditor.editorMap[y][x] = GamePlayer.WALL;
				}
			} else if (_gameEditor.tool == GameEditor.START_TOOL) {
				if (_gameEditor.editorMap[y][x] == GamePlayer.START) {
					_gameEditor.editorMap[y][x] = GamePlayer.VOID;
				} else {
					_gameEditor.editorMap[y][x] = GamePlayer.START;
				}
			} else if (_gameEditor.tool == GameEditor.ARRIVAL_TOOL) {
				if (_gameEditor.editorMap[y][x] == GamePlayer.EXIT) {
					_gameEditor.editorMap[y][x] = GamePlayer.VOID;
				} else {
					_gameEditor.editorMap[y][x] = GamePlayer.EXIT;
				}
			} else if (_gameEditor.tool == GameEditor.TRAP_TOOL) {
				if (_gameEditor.editorMap[y][x] == GamePlayer.TRAP) {
					_gameEditor.editorMap[y][x] = GamePlayer.VOID;
				} else {
					_gameEditor.editorMap[y][x] = GamePlayer.TRAP;
				}
			}
			
			_gameEditor.setModified(true);
		}
		_gameEditor.render();
	}
	
	/**
	 * The wall button has been clicked.
	 */
	_gameEditor.wallButtonClicked = function() {
		_gameEditor.tool = GameEditor.WALL_TOOL;
		_gameEditor.updateTools();
	}
	
	/**
	 * The start button has been clicked.
	 */
	_gameEditor.startButtonClicked = function() {
		_gameEditor.tool = GameEditor.START_TOOL;
		_gameEditor.updateTools();
	}
	
	/**
	 * The arrival button has been clicked.
	 */
	_gameEditor.arrivalButtonClicked = function() {
		_gameEditor.tool = GameEditor.ARRIVAL_TOOL;
		_gameEditor.updateTools();
	}
	
	/**
	 * The trap button has been clicked.
	 */
	_gameEditor.trapButtonClicked = function() {
		_gameEditor.tool = GameEditor.TRAP_TOOL;
		_gameEditor.updateTools();
	}
	
	/**
	 * Construct the game editor.
	 */
	_gameEditor.updateTools = function() {
		var wallButton = document.getElementById("wallButton");
		if (_gameEditor.tool == GameEditor.WALL_TOOL) {
			wallButton.style.fontWeight = "bold";
		} else {
			wallButton.style.fontWeight = "normal";
		}
		var startButton = document.getElementById("startButton");
		if (_gameEditor.tool == GameEditor.START_TOOL) {
			startButton.style.fontWeight = "bold";
		} else {
			startButton.style.fontWeight = "normal";
		}
		var arrivalButton = document.getElementById("arrivalButton");
		if (_gameEditor.tool == GameEditor.ARRIVAL_TOOL) {
			arrivalButton.style.fontWeight = "bold";
		} else {
			arrivalButton.style.fontWeight = "normal";
		}
		var trapButton = document.getElementById("trapButton");
		if (_gameEditor.tool == GameEditor.TRAP_TOOL) {
			trapButton.style.fontWeight = "bold";
		} else {
			trapButton.style.fontWeight = "normal";
		}
	}
	
	/**
	 * Retrieve the edit token for AJAX editing.
	 */
	_gameEditor.retrieveEditToken = function() {
	    $.getJSON(
	        wgScriptPath + '/api.php?',
	        {
	            action: 'query',
	            prop: 'info',
	            intoken: 'edit',
	            titles: 'Main Page',
	            indexpageids: '',
	            format: 'json'
	        },
	        function (data) {
	            if (data.query.pages && data.query.pageids) {
	                var pageid = data.query.pageids[0];
	                _gameEditor.wgEditToken = data.query.pages[pageid].edittoken;
	            }
	        }
	    )
	}
	
	/**
	 * Toggle the edit panel.
	 */
	_gameEditor.toggleEditorVisibility = function() {
		var editorVisibilityButton = document.getElementById("editorVisibilityButton");
		var editPanel = document.getElementById("editPanel");
		if (_gameEditor.isEditorVisible) {
			editorVisibilityButton.innerHTML = "Show the game editor";
			editPanel.style.display = "none";
			_gameEditor.isEditorVisible = false;
		} else {
			editorVisibilityButton.innerHTML = "Hide the game editor";
			editPanel.style.display = "block";
			_gameEditor.isEditorVisible = true;
		}
	}
	
	/**
	 * Preview the game.
	 */
	_gameEditor.preview = function() {
		// Used for feedback
		var statusMessage = document.getElementById("statusMessage");
		
		// Retrieve the data
		_gameEditor.serializeGameMap();
		
		// Restart the game
		if (_gameEditor.getGamePlayer()) {
			_gameEditor.getGamePlayer().startParty();
			statusMessage.innerHTML = "The game is restarted.";
		}
	}
	
	/**
	 * Update the game via AJAX.
	 */
	_gameEditor.publish = function() {
		// Used for feedback
		var statusMessage = document.getElementById("statusMessage");
		
		// Retrieve the data
		_gameEditor.serializeGameMap();
		
		// Send the request
		var url = wgServer
		+ wgScriptPath
		+ '/api.php?'
		+ 'action=edit'
		+ '&title='
		+ encodeURIComponent(wgPageName)
		+ '&summary=Update%20the%20game'
		+ '&token='
		+ encodeURIComponent(_gameEditor.wgEditToken);
		
		var request = sajax_init_object();
		if (request == null) {
			statusMessage.innerHTML = "Publishing impossible!";
			// Oops! We do not have XMLHttp...
			return;
		}
		request.open ('POST', url, true);
		request.onreadystatechange = function () {
			if (request.readyState != 4) {
				return;
			}
	
			if (request.status == 200) {
				if (_gameEditor.getGamePlayer()) {
					_gameEditor.getGamePlayer().startParty();
				}
				statusMessage.innerHTML = "The game has been updated!";
				
				_gameEditor.setModified(false);
			} else {
				statusMessage.innerHTML = "Publishing failed!";
			}
		};
		
		request.setRequestHeader('Pragma', 'cache=yes');
		request.setRequestHeader('Cache-Control', 'no-transform');
		request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8');
		request.send('text=' + encodeURIComponent(gameModel));
		
		statusMessage.innerHTML = "New game sending...";
	}
	
	/**
	 * Get the game player.
	 */
	_gameEditor.getGamePlayer = function() {
		return _gameEditor.gamePlayer;
	}
	
	/**
	 * Set the game player.
	 */
	_gameEditor.setGamePlayer = function(newGamePlayer) {
		_gameEditor.gamePlayer = newGamePlayer;
	}
	
	/**
	 * Encode the model.
	 */
	_gameEditor.serializeGameMap = function() {
		var localGameModel = "";
		for (var y = 0; y < _gameEditor.editorMap.length; y++) {
			if (y > 0) {
				localGameModel = localGameModel + "\n";
			}
			for (var x = 0; x < _gameEditor.editorMap[y].length; x++) {
				if (_gameEditor.editorMap[y][x] == GamePlayer.WALL) {
					localGameModel = localGameModel + "x";
				} else if (_gameEditor.editorMap[y][x] == GamePlayer.START) {
					localGameModel = localGameModel + "i";
				} else if (_gameEditor.editorMap[y][x] == GamePlayer.EXIT) {
					localGameModel = localGameModel + "o";
				} else if (_gameEditor.editorMap[y][x] == GamePlayer.VOID) {
					localGameModel = localGameModel + ".";
				} else if (_gameEditor.editorMap[y][x] == GamePlayer.TRAP) {
					localGameModel = localGameModel + "b";
				}
			}
		}
		
		gameModel = localGameModel;
	}
	
	/**
	 * Draw the game editor.
	 */
	_gameEditor.render = function() {
		var canvas = document.getElementById("editorCanvas");
		var context = canvas.getContext('2d');
	
		// Place
		_gameEditor.canvasBuffer.height = _gameEditor.editorMap.length * GameEditor.BLOCK_HEIGHT;
		_gameEditor.canvasBuffer.width = _gameEditor.gameMapWidth * GameEditor.BLOCK_WIDTH;
	
		_gameEditor.canvasBufferContext.clearRect(0, 0, _gameEditor.canvasBuffer.width, _gameEditor.canvasBuffer.height);
		for (var y = 0; y < _gameEditor.editorMap.length; y++) {
			for (var x = 0; x < _gameEditor.editorMap[y].length; x++) {
				if (_gameEditor.editorMap[y][x] == GamePlayer.WALL) {
					_gameEditor.canvasBufferContext.drawImage(_gameEditor.wallCanvas, x
							* GameEditor.BLOCK_WIDTH, y * GameEditor.BLOCK_HEIGHT);
				} else if (_gameEditor.editorMap[y][x] == GamePlayer.START) {
					_gameEditor.canvasBufferContext.drawImage(_gameEditor.departureCanvas, x
							* GameEditor.BLOCK_WIDTH, y * GameEditor.BLOCK_HEIGHT);
				} else if (_gameEditor.editorMap[y][x] == GamePlayer.EXIT) {
					_gameEditor.canvasBufferContext.drawImage(_gameEditor.keyCanvas, x
							* GameEditor.BLOCK_WIDTH, y * GameEditor.BLOCK_HEIGHT);
				} else if (_gameEditor.editorMap[y][x] == GamePlayer.TRAP) {
					_gameEditor.canvasBufferContext.drawImage(_gameEditor.trapCanvas, x
							* GameEditor.BLOCK_WIDTH, y * GameEditor.BLOCK_HEIGHT);
				}
			}
		}

		// Pattern
		_gameEditor.canvasBufferContext.fillStyle = 'grey';
		for (var y = 0; y < _gameEditor.editorMap.length; y++) {
        		_gameEditor.canvasBufferContext.fillRect(0, (y + 1) * GameEditor.BLOCK_HEIGHT - 1, _gameEditor.gameMapWidth * GameEditor.BLOCK_WIDTH, 1);
		}
		for (var x = 0; x < _gameEditor.gameMapWidth; x++) {
        		_gameEditor.canvasBufferContext.fillRect((x + 1) * GameEditor.BLOCK_WIDTH - 1, 0, 1, _gameEditor.editorMap.length * GameEditor.BLOCK_HEIGHT);
		}
		
		// Display
		canvas.width = _gameEditor.canvasBuffer.width;
		canvas.height = _gameEditor.canvasBuffer.height;
		context.drawImage(_gameEditor.canvasBuffer, 0, 0);
	}
	
	/**
	 * Getter for the game editor state.
	 */
	_gameEditor.isModified = function() {
		return _gameEditor.modified;
	}
	
	/**
	 * Setter for the game editor state.
	 */
	_gameEditor.setModified = function(isModified) {
		_gameEditor.modified = isModified;
		
		var updateButton = document.getElementById("updateButton");
		if (isModified) {
			updateButton.disabled = null;
		} else {
			updateButton.disabled = "disabled";
		}
	}
}