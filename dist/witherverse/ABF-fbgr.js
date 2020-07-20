/****
 ———————————————————————————————————————————————————————————————————————————
 # ABFR-fbgr v.1.0
 # Description: Allows one to embed Angry Birds Friends levels directly 
                into the content pages and right rail
 # Usage: <span class="ABF" data-level-id="[id]" 
          data-level-name="[levelname]"></span>
          data-level-id = e.g. 9-3
          data-level-name = e.g. Surf%20and%20Turf-5
 # Author: Wither
 # Notes:
    ** Height and width are not customizable without breaking 
       the widget
    ** There is no audio available.
    ** Power-ups are not included, you can't play in full screen 
       and you're limited to playing the embedded level. This is
       due to the demo nature of the iframe and can't be altered 
       in any way.
 ———————————————————————————————————————————————————————————————————————————
**/

/** Check if user has Flash 11 or greater **/

function getFlashVersion() {
  // Internet Explorer
  try {try {
      // avoid fp6 minor version lookup issues
      // see: http://blog.deconcept.com/2006/01/11/getvariable-setvariable-crash-internet-explorer-flash-6/
      var axo = new ActiveXObject('ShockwaveFlash.ShockwaveFlash.6');
      try {axo.AllowScriptAccess = 'always';}
      catch(e) {return '6,0,0';}} catch(e) {}
      return new ActiveXObject('ShockwaveFlash.ShockwaveFlash')
       .GetVariable('$version')
       .replace(/\D+/g, ',')
       .match(/^,?(.+),?$/)[1];
  // Other browsers
  } catch(e) {try {
      if(navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin){
        return (navigator.plugins["Shockwave Flash 2.0"] || 
        navigator.plugins["Shockwave Flash"])
        .description
        .replace(/\D+/g, ",")
        .match(/^,?(.+),?$/)[1];
      }} catch(e) {}} return '0,0,0';
}

var version = getFlashVersion().split(',').shift();
if (version < 11) {
    $(".ABF").text("Angry Birds Friends requires Flash 11.0 or greater to play.")
    .after("<button class='FlashDismiss' text='OK'></button>");
    $(".FlashDismiss").click($(".ABF, .FlashDismiss").remove());
}

/** Make the widget **/

else {
    $(".ABF").each(function () {
       /** Must be something like 9-1, 3-4 or whatever **/
       var levelID = $(this).attr("data-level-id"); 
       /** Eg. Surf%20and%20Turf-1, Pigini%20Beach-1 **/
       var levelName = $(this).attr("data-level-name");
       /** Prepare the widget **/
       if (levelID && levelName) {
           $(this).replaceWith(
           '<iframe width="398" height="270" scrolling="no" frameborder="0"'+
           ' src="https://angrybirds-facebook.appspot.com/embed?levelId=' +
           levelID + '&levelName=' + levelName + '"></iframe>');
       }
    });
}