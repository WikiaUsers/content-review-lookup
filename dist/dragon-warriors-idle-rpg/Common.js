/* Any JavaScript here will be loaded for all users on every page load. */

//24h Countdown timer for stage rankings
setInterval(function stageRanking(){
  var d = new Date();
  var hours = d.getUTCHours();
  var rhours = 23 - d.getUTCHours();
  var min = 59 - d.getUTCMinutes();
  if(hours >= 15){
    rhours = rhours + 15;
  }
  else{
    rhours = rhours - 9;
  }
  if((min + '').length == 1){
    min = '0' + min;
  }
  var sec = 59 - d.getUTCSeconds();
  if((sec + '').length == 1){
        sec = '0' + sec;
  }
  jQuery('#stageranking').html(rhours+'h '+min+'m '+sec+'s')
}, 1000);

//24h Countdown timer for arena rankings
setInterval(function arenaRanking(){
  var d = new Date();
  var hours = d.getUTCHours();
  var rhours = 23 - d.getUTCHours();
  var min = d.getUTCMinutes();
  var rmin = 44 - d.getUTCMinutes();
  if(hours >= 15){
    rhours = rhours + 15;
  }
  else{
   rhours = rhours - 9;
  }
  if(min > 44){
   rhours = rhours - 1;
   rmin = rmin + 60;
  }
  if((rmin + '').length == 1){
   rmin = '0' + rmin;
  }
  var sec = 59 - d.getUTCSeconds();
  if((sec + '').length == 1){
        sec = '0' + sec;
  }
  jQuery('#arenaranking').html(rhours+'h '+rmin+'m '+sec+'s')
}, 1000);

//24h Countdown timer for dungeon reset
setInterval(function dungeonReset(){
  var d = new Date();
  var hours = d.getUTCHours();
  var rhours = 23 - d.getUTCHours();
  var min = d.getUTCMinutes();
  var rmin = 59 - d.getUTCMinutes();
  if(hours >= 16){
    rhours = rhours + 4;
  }
  else{
    rhours = rhours - 20;
  }
  if((rmin + '').length == 1){
    rmin = '0' + rmin;
  }
  var sec = 59 - d.getUTCSeconds();
  if((sec + '').length == 1){
        sec = '0' + sec;
  }
  jQuery('#dungeonreset').html(rhours+'h '+rmin+'m '+sec+'s')
}, 1000);

//12h Countdown timer for purple roulette
setInterval(function purpRoulette(){
  var d = new Date();
  var hours = d.getUTCHours();
  var rhours = 23 - d.getUTCHours();
  var min = d.getUTCMinutes();
  var rmin = 29 - d.getUTCMinutes();
  //If hours are between 17 and midnight
  if(hours > 17 && hours <= 24){
    rhours = rhours + 6;
  }
  //If hours are between midnight and 5
  else if(hours <= 5){
    rhours = rhours - 18; 
  }
  //If hours are between 5 and 17
  else{
    rhours = rhours - 6;
  }
  if(min > 29){
   rhours = rhours - 1;
   rmin = rmin + 60;
  }
  if((rmin + '').length == 1){
    rmin = '0' + rmin;
  }
  var sec = 59 - d.getUTCSeconds();
  if((sec + '').length == 1){
        sec = '0' + sec;
  }
  jQuery('#purproulette').html(rhours+'h '+rmin+'m '+sec+'s')
}, 1000);