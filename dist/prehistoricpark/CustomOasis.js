function HeaderLink() {
  if(((document.URL).indexOf("action=edit")) == -1 ) {
    $('#WikiHeader').prepend('<div style="position: absolute; left: 0px; width:1024px; height: 96px; top: 0px"><a href="/wiki/Prehistoric_Park_Wiki"><img src="https://images.wikia.nocookie.net/__cb20141012121240/prehistoricpark/images/5/57/CustomOasisBackground.png"></a></div>');
  }
}
addOnloadHook(HeaderLink);