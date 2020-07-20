//**************************************************
//Kindle For Web
//**************************************************
//
/*
<div class="Amazon">
[http://www.amazon.com Amazon]
</div>
 */
 
function fill_amazon() {
  $.getScript("http://kindleweb.s3.amazonaws.com/app/KindleReader-min.js", function() {
    amHTML = $("#kindleReaderDiv").html();
    $("#kindleReaderDiv").html("");
    KindleReader.LoadSample({containerID: 'kindleReaderDiv', asin: amHTML, width: '670', height: '700', assoctag: 'survivorswiki-20'});
  });
}
 
addOnloadHook( fill_amazon );
 
if (window.addEventListener) {window.addEventListener("load",onloadhookcustom,false);}
else if (window.attachEvent) {window.attachEvent("onload",onloadhookcustom);}