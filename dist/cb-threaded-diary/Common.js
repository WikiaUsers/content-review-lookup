/*** Any JavaScript here will be loaded for all users on every page load. ***/

/***** The cross-domain script loading problem *****
 Simply, I need to load //dev.wikia.com/wiki/Colors/code.js AND EXECUTE it 
before I can use its objects (dev.colors.*), otherwise they are undefined.
After 2 days digging the sucking Wikia & MW & JS mess, I've come to 4 (possible) solutions:
1. Use Wikia's importScriptPages/importArticles, then WAIT....
1.1. (Wait) for document.ready: Too EARLY! dev still undefined.
1.2. (Wait) for window.load: OK, got dev.colors.*, but too LATE!
2. Use MediaWiki's ResourceLoader: Don't know how to "register" dev.colors !!!
3. Use jQuery's getScript/ajax, then wait for CALLBACK 
   ==> "done" but received script is undefined! WTF??? 
   <-- Reason is (maybe) the "same origin" policy + jQuery's fake "done" (should be "fail" insteads!)
4. Use HTML tag <script>: This can pass the "same origin" policy, but unable to get 
  when its execution is finished event with  async="false" and defer="false".
  --> still get dev undefined, or have to wait for the late window.load, like solution 1.
*****/

/* Solution 1 */
function loadDevColors_1(){
console.log(">>>>> loadDevColors_1: (Wikia).importScriptPage");
importScriptPage('Colors/code.js', 'dev');
//$(document).ready(function(){ //too early! dev still undefined.
$(window).load(function(){//OK, but too late!
    debugColors(dev.colors);
    loadCSS(dev.colors);
});
}

/* Solution 2 */
function loadDevColors_2(){
console.log(">>>>> loadDevColors_2: mw.loader");
mw.loader.addSource('dev.colors','//dev.wikia.com/wiki/Colors/code.js'); //I dont know :(
mw.loader.using('dev.colors').done(function(){
    debugColors(dev.colors);
    loadCSS(dev.colors);
  });
}

/* Solution 3 */
function loadDevColors_3(){
console.log(">>>>> loadDevColors_3: $.getScript");
$.getScript( "//dev.wikia.com/index.php?title=Colors/code.js&action=raw&ctype=text/javascript" )
.done(function( script, textStatus, jqXHR ) {
  debugGetScript(script, textStatus, jqXHR)
  debugColors(dev.colors);
  loadCSS(dev.colors);
})
.fail(function( jqXHR, settings, exception ) {
  console.log(">>>>>>> $.getScript().fail: " +exception+" ("+jqXHR.status+")");
});
}

/* Solution 4 */
function loadDevColors_4(){
console.log(">>>>> loadDevColors_4: <script src='//external.domain...'>");
$(document).ready(function() {
  scrtag = $('<script type="text/javascript" async="false" defer="false" id="devColors">');
  scrtag.attr('src', 'http://dev.wikia.com/index.php?title=Colors/code.js&action=raw&ctype=text/javascript');
  scrtag.appendTo('head');
  scrtag = $('<script type="text/javascript" async="false" defer="false" id="loadDevColors_4">');
  scrtag.text('debugColors(dev.colors);  loadCSS(dev.colors);');
  scrtag.appendTo('head');
  console.log(">>>>>> Created script tag: "+scrtag);
});
}

/////Implementations

function debugColors(dc){
  console.log('COLORS>>>>>>');
  console.log('dev.colors:'+dc.wikia.page);
  var red = dc.parse("#FF0000");
  console.log("red: " + red); // outputs: "red: #FF0000"
  console.log('<<<<<<<COLORS.');
}

function debugGetScript(script, textStatus, jqXHR){
  console.log(">>>>>>> $.getScript(dev.colors).done: " +textStatus);
  console.log(">>>>>>> script: type "+typeof script+" {"+script+"}");
  console.log("typeof dev = "+typeof dev);
  if(typeof dev ==='undefined' || dev.colors ==='undefined'){
    console.log("dev.colors extension not yet executed (even if already loaded)!");
    //alert("dev.colors extension not yet executed (even if already loaded)!");
    eval(script); //forcefully EXECUTING the script (if !== undefined)!!!
  }
}

/* Tabber extension styles */
function loadCSS(dc){
  var css =' \
ul.tabbernav li.tabberactive a { /* the active tab */ \
   color: black !important; \
   background: $page !important; \
   border-bottom: solid $page !important; \
} \
ul.tabbernav li a {  /* inactive tabs */ \
   color: black !important; \
   background: $page_dark !important; \
   border-color: black !important; \
} \
ul.tabbernav li a:hover {  /* tab hovered := active tab */ \
   background: $page !important; \
} '; 
  dc.css(css,{
    page_dark : dc.parse(dc.wikia.page).lighten(-3)
  });
}

////Execution
loadDevColors_3();