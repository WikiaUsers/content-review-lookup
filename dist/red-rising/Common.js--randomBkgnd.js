/* Any JavaScript here will be loaded for all users on every page load. */
/**function RandomBkgnd()
{
  var bkgndArray = new Array(); 
  bkgndArray[0] = 'https://vignette.wikia.nocookie.net/red-rising/images/f/f4/Starry-night_mini.jpg/revision/latest?cb=20150312002342';
  bkgndArray[1] = 'https://vignette.wikia.nocookie.net/red-rising/images/3/3a/Bg.png/revision/latest?cb=20150312001235';
  bkgndArray[2] = 'https://vignette.wikia.nocookie.net/red-rising/images/4/48/Wikia-hero-image/revision/latest?cb=20150310220452';
  bkgndArray[3] = 'https://vignette.wikia.nocookie.net/red-rising/images/2/2d/Golden.jpg/revision/latest?cb=20150128203440';

  var chosenBkgnd = Math.floor( Math.random() * bkgndArray.length );

  $("body").css("background-image",'url(' + bkgndArray[chosenBkgnd] + ')');
}
addOnloadHook(RandomBkgnd);