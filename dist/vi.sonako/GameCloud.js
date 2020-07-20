// Constants
var NB_IMAGES_TO_LOAD = 27;

// Variables
var wallImage = null;
var keyImage = null;
var backgroundImage = null;
var characterFall1LeftImage = null;
var characterFall1RightImage = null;
var characterJump1LeftImage = null;
var characterJump1RightImage = null;
var characterWait1LeftImage = null;
var characterWait1RightImage = null;
var characterWalk1LeftImage = null;
var characterWalk1RightImage = null;
var characterWalk2LeftImage = null;
var characterWalk2RightImage = null;
var departureImage = null;
var trapImage = null;
var bomb1Image = null;
var bomb2Image = null;
var bomb3Image = null;
var bomb4Image = null;
var bomb5Image = null;
var bomb6Image = null;
var bomb7Image = null;
var bomb8Image = null;
var bomb9Image = null;
var bomb10Image = null;
var bomb11Image = null;
var bomb12Image = null;
var gameModel = null;
var gameMap = new Array();
var gamePlayer = null;
var gameEditor = null;
var nbLoadedImages = 0;
 
/**
 * Execute the scripts when all the images are loaded.
 */
function onImageLoad() {
	if (++nbLoadedImages >= NB_IMAGES_TO_LOAD) {
		doInit();
	}
}

/**
 * Construct the page.
 * The used media need to be entirely loaded before.
 * Then we can init the game
 */
function doInit() {
	// Some errors are not critical. Let's hide the splashscreen anyway.
	try {
		gameModel = sourceData.innerHTML;
		sourceData.innerHTML = "";

		gamePlayer = new GamePlayer();
		document.onkeydown = gamePlayer.keyDown;
		document.onkeyup = gamePlayer.keyUp;
		gamePlayer.initGamePlayer();

		gameEditor = new GameEditor();
		gameEditor.setGamePlayer(gamePlayer);
		gameEditor.initGameEditor();
								
		gamePlayer.setGameEditor(gameEditor);
	} catch(error) {
		alert('An error has occurred:<br/>' + error);
	}
	stopSplashscreen();
}

/**
 * Load the resources.
 */
function init() {
	wallImage = new Image();
	keyImage = new Image();
	backgroundImage = new Image();
	characterFall1LeftImage = new Image();
	characterFall1RightImage = new Image();
	characterJump1LeftImage = new Image();
	characterJump1RightImage = new Image();
	characterWait1LeftImage = new Image();
	characterWait1RightImage = new Image();
	characterWalk1LeftImage = new Image();
	characterWalk1RightImage = new Image();
	characterWalk2LeftImage = new Image();
	characterWalk2RightImage = new Image();
	departureImage = new Image();
	trapImage = new Image();
	bomb1Image = new Image();
	bomb2Image = new Image();
	bomb3Image = new Image();
	bomb4Image = new Image();
	bomb5Image = new Image();
	bomb6Image = new Image();
	bomb7Image = new Image();
	bomb8Image = new Image();
	bomb9Image = new Image();
	bomb10Image = new Image();
	bomb11Image = new Image();
	bomb12Image = new Image();
	
	// Trigger
	wallImage.onload = onImageLoad;
	keyImage.onload = onImageLoad;
	backgroundImage.onload = onImageLoad;
	characterFall1LeftImage.onload = onImageLoad;
	characterFall1RightImage.onload = onImageLoad;
	characterJump1LeftImage.onload = onImageLoad;
	characterJump1RightImage.onload = onImageLoad;
	characterWait1LeftImage.onload = onImageLoad;
	characterWait1RightImage.onload = onImageLoad;
	characterWalk1LeftImage.onload = onImageLoad;
	characterWalk1RightImage.onload = onImageLoad;
	characterWalk2LeftImage.onload = onImageLoad;
	characterWalk2RightImage.onload = onImageLoad;
	departureImage.onload = onImageLoad;
	trapImage.onload = onImageLoad;
	bomb1Image.onload = onImageLoad;
	bomb2Image.onload = onImageLoad;
	bomb3Image.onload = onImageLoad;
	bomb4Image.onload = onImageLoad;
	bomb5Image.onload = onImageLoad;
	bomb6Image.onload = onImageLoad;
	bomb7Image.onload = onImageLoad;
	bomb8Image.onload = onImageLoad;
	bomb9Image.onload = onImageLoad;
	bomb10Image.onload = onImageLoad;
	bomb11Image.onload = onImageLoad;
	bomb12Image.onload = onImageLoad;

	// Image source
	trapImage.src = 'https://images.wikia.nocookie.net/__cb20120611200515/gamecloud/images/3/3b/Bomb.png';
	departureImage.src = 'https://images.wikia.nocookie.net/gamecloud/images/4/48/Parchment.png';
	characterFall1LeftImage.src = 'https://images.wikia.nocookie.net/gamecloud/images/5/58/Character_fall1_left.png';
	characterFall1RightImage.src = 'https://images.wikia.nocookie.net/gamecloud/images/9/9c/Character_fall1_right.png';
	characterJump1LeftImage.src = 'https://images.wikia.nocookie.net/gamecloud/images/c/c3/Character_jump1_left.png';
	characterJump1RightImage.src = 'https://images.wikia.nocookie.net/gamecloud/images/e/e4/Character_jump1_right.png';
	characterWait1LeftImage.src = 'https://images.wikia.nocookie.net/gamecloud/images/4/4d/Character_wait1_left.png';
	characterWait1RightImage.src = 'https://images.wikia.nocookie.net/gamecloud/images/a/ae/Character_wait1_right.png';
	characterWalk1LeftImage.src = 'https://images.wikia.nocookie.net/gamecloud/images/5/54/Character_walk1_left.png';
	characterWalk1RightImage.src = 'https://images.wikia.nocookie.net/gamecloud/images/4/48/Character_walk1_right.png';
	characterWalk2LeftImage.src = 'https://images.wikia.nocookie.net/gamecloud/images/7/7b/Character_walk2_left.png';
	characterWalk2RightImage.src = 'https://images.wikia.nocookie.net/gamecloud/images/8/8b/Character_walk2_right.png';
	backgroundImage.src = 'https://images.wikia.nocookie.net/gamecloud/images/3/3f/Game_background.png';
	keyImage.src = 'https://images.wikia.nocookie.net/gamecloud/images/5/52/Key.png';
	wallImage.src = 'https://images.wikia.nocookie.net/gamecloud/images/3/3a/Brick_wall.jpg';
	bomb1Image.src = 'https://images.wikia.nocookie.net/__cb20120611200515/gamecloud/images/3/3b/Bomb.png';
	bomb2Image.src = 'https://images.wikia.nocookie.net/__cb20120611200515/gamecloud/images/3/3b/Bomb.png';
	bomb3Image.src = 'https://images.wikia.nocookie.net/__cb20120611200515/gamecloud/images/3/3b/Bomb.png';
	bomb4Image.src = 'https://images.wikia.nocookie.net/__cb20120611200515/gamecloud/images/3/3b/Bomb.png';
	bomb5Image.src = 'https://images.wikia.nocookie.net/__cb20120611200515/gamecloud/images/3/3b/Bomb.png';
	bomb6Image.src = 'https://images.wikia.nocookie.net/__cb20120611200515/gamecloud/images/3/3b/Bomb.png';
	bomb7Image.src = 'https://images.wikia.nocookie.net/__cb20120611200515/gamecloud/images/3/3b/Bomb.png';
	bomb8Image.src = 'https://images.wikia.nocookie.net/__cb20120611200515/gamecloud/images/3/3b/Bomb.png';
	bomb9Image.src = 'https://images.wikia.nocookie.net/__cb20120611200515/gamecloud/images/3/3b/Bomb.png';
	bomb10Image.src = 'https://images.wikia.nocookie.net/__cb20120611200515/gamecloud/images/3/3b/Bomb.png';
	bomb11Image.src = 'https://images.wikia.nocookie.net/__cb20120611200515/gamecloud/images/3/3b/Bomb.png';
	bomb12Image.src = 'https://images.wikia.nocookie.net/__cb20120611200515/gamecloud/images/3/3b/Bomb.png';
}

window.onbeforeunload = function (e) {
  var e = e || window.event;
  var promptMessage = null;
 
  if (gameEditor && gameEditor.isModified()) {
      promptMessage = 'Beware! You have non-published updates of the game!';

      // For IE and Firefox
      if (e) {
        e.returnValue = promptMessage;
      }

      // For Safari
      return promptMessage;
  }
};