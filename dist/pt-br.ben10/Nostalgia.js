//Switch to night button
var night_button = 'Nostalgie-se!';
 
//Switch to day button
var day_button = 'Original';
 
 
//Day and night color schemes
//Written by Foodbandlt
 
 
function addNightStyle(){
var styleElement = document.createElement('style');
 
styleElement.setAttribute("id", "night");
styleElement.innerHTML='body.ChatWindow{transition: all 3s ease;background: #FFF url("https://vignette.wikia.nocookie.net/ben10/images/5/50/Wiki-background/revision/20150208191817?path-prefix=pt") top center no-repeat !important;}#WikiaPage {transition: all 3s ease;background-color: rgba(255, 255, 255, 0.74) !important;background-color: rgba(0,0,0,0.7);border: 0 !important;border-top: 0 !important;color: #272727;}.ChatHeader {transition: all 3s ease;background-color: rgba(255, 255, 255, 0.74);border: 0;top: 0 !important;height: 40px;margin: 10px;position: relative;border-top-left-radius: 0; border-top-right-radius: 0;}.Rail {transition: all 3s ease;bottom: 0;overflow-y: auto;position: absolute;right: 0;top: -6px;width: 150px;height: auto;}.Write .message {transition: all 3s ease;margin: 0 0 0 30px;width: 100%;border-color: rgb(106,203,0) !important;background: #FFF;}.Write .message:after {transition: all 3s ease;border-style: solid;border-width: 11px;border-color: #fff #fff transparent transparent;position: absolute;top: 5px;left: -21px;}::-webkit-scrollbar-track {transition: all 3s ease;background-color: rgba(255, 255, 255, 0.7);}.ChatHeader .User {transition: all 3s ease; border-left: 0;background-color: #FFFFFF;height: 27px;padding-bottom: 2px;padding-top: 2px;float: right;position: absolute;left: initial !important;right: 0 !important;top: 0;width: 0;padding: 3px 5px 10px 32px;transition: all 1s ease;} .wordmark a{transition: all 1s ease;right: 50%;position: absolute;visibility: collapse !important;}.ChatHeader:before {transition: all 3s ease;background: url("https://vignette.wikia.nocookie.net/nostalgiadrive/images/8/89/Wiki-wordmark.png/revision/20140706020933?path-prefix=pt-br");content: " ";background-size: 153px;background-position: 0 39px;left: 0;position: absolute;z-index: 15;color: #000;width: 155px;height: 40px;bottom: 0;}.Write [name="message"] {transition: all 3s ease;background-color: transparent;border: 0;color: #000 !important;height: 100%;line-height: 1.4em;margin: 0;outline: none;padding: 0;resize: none;width: 100%;}.Rail .public .chevron {transition: all 3s ease;border-color: transparent;border-style: solid;cursor: pointer;display: none;height: 50px;left: 3px;margin: -3px;position: absolute;top: 8px !important;width: 148px;vertical-align: middle;border-width: 1px;}.Rail .public .chevron.closed {transition: all 3s ease;border-color: transparent;left: 3px;top: 8px;border-width: 1px;}.Chat .you {background: transparent !important;}.ChatHeader .User .username {text-shadow: 0px 0px 5px #FFF !important;}';
$('head').append(styleElement);
} 
 
 
function addDayNightButton(){
 
$('<div class="day-night-div" onclick="switch_view()" style="margin: 10px auto;text-align: center;cursor: pointer;position: absolute;right: 10px;bottom: 0;"><a class="day-night-button wikia-button" style="width: 107px;">'+night_button+'</a></div>').prependTo('.Rail');
if ($('style#night').size() < 1 && $('style#nightUser').size() < 1){
addDayStyle();
}
}
 
function day_night(which){
if (which == "night"){
$('style#day').remove();
$('.Rail .day-night-div .day-night-button').text(day_button);
 
addNightStyle();
 
}else{
$('style#night').remove();
$('.Rail .day-night-div .day-night-button').text(night_button);
 
addDayStyle();
}
}
 
 
function switch_view(){
if ($('.Rail .day-night-div .day-night-button').text() == night_button){
day_night("night");
}else{
day_night("day");
}
}
 
 
if ($('.Rail .day-night-button').text() == ""){
addDayNightButton();
}
 
while ($('.Rail .day-night-div').size() > 1){
$('.WikiaPage .Rail div:last-child').remove()
}