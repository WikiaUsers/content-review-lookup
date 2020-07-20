/* Randon Wikia BG */
function RandomBkgnd()
{
  var bkgndArray = new Array(); 
  bkgndArray[0] = 'the pic vim drew that had melissa';
  bkgndArray[1] = 'that one pic of hellbent and his dog';
  bkgndArray[2] = 'insert';
  bkgndArray[3] = 'insert';
  bkgndArray[4] = 'insert';
  bkgndArray[5] = 'insert';
  bkgndArray[6] = 'insert';
  bkgndArray[7] = 'insert';
  bkgndArray[8] = 'insert';
 
  var chosenBkgnd = Math.floor( Math.random() * bkgndArray.length );
 
  $("section.WikiaPage").css("background",'linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25)), url(' + bkgndArray[chosenBkgnd] + ') fixed no-repeat center');
}
addOnloadHook(RandomBkgnd);