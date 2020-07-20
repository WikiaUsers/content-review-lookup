function HeaderLink() {
  if(((document.URL).indexOf("action=edit")) == -1 ) {
    $('#WikiHeader').prepend('<div style="position: absolute; left: 0px; width:1024px; height: 96px; top: 0px"><a href="/wiki/Casualty_Wiki"><img src="https://images.wikia.nocookie.net/__cb20141025210255/casualtybbc/images/5/56/Casualty_Wiki_Custom_Oasis_Wordmark.png"></a></div>');
  }
}
addOnloadHook(HeaderLink);