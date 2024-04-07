//-------------------------------------------------------------------------------------function replaceusername() {
var spantags = document.getElementsByTagName("span");
for (i=0; i<spantags.length; i++) {
if (spantags[i].className=="insertusername") {
if (mw.config.get('wgUserName')==null) {
        spantags[i].innerHTML="...";
      }else {
        spantags[i].innerHTML=mw.config.get('wgUserName');
      }
    }
  }
}
$(replaceusername);

//-------------------------------------------------------------------------------------