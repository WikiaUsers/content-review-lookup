// PLAYER VARIABLES

var mp3snd = "audio-file.mp3"; // MP3 FILE
var oggsnd = "https://images.wikia.nocookie.net/gamedezyner/images/5/56/Emeraldhill.ogg"; // OGG FILE

var audiowidth = "300" // WIDTH OF PLAYER
var borderw = "2" // BORDER AROUND PLAYER WIDTH
var bordcolor = "0066FF" // BORDER COLOR
var loopsong = "yes" // LOOP MUSIC | yes | no |



// -----------------------------------------------
// Created by: Allwebco Design Corporation
// No License is included. This script can be freely copied, distributed or sold
// YOU DO NOT NEED TO EDIT BELOW THIS LINE


if (loopsong == "yes") {
var looping5="loop";
var loopingE="true";
}
else{
var looping5="";
var loopingE="false";
}
document.write('<table style="border-collapse:collapse; border-spacing: 0; margin: 0; padding: 0; border: #'+bordcolor+' '+borderw+'px solid;background-color: #F0F0F0;"><tr><td style="vertical-align: middle; text-align: center; padding: 0;">');
document.write('<audio autoplay="autoplay" controls '+looping5+' style="width:'+audiowidth+'px;">');
document.write('<source src="'+oggsnd+'" type="audio/ogg">');
document.write('<object classid="CLSID:22D6F312-B0F6-11D0-94AB-0080C74C7E95" type="application/x-mplayer2" width="'+audiowidth+'" height="45">');
document.write('<param name="filename" value="'+mp3snd+'">');
document.write('<param name="autostart" value="1">');
document.write('<param name="loop" value="'+loopingE+'">');
document.write('<object>');
document.write('<audio>');
document.write('<td><tr><table>');