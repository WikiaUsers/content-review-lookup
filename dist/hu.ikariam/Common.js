function loadLangSelector(){
  var se = document.getElementsByTagName('span');
  for (var i = 0; i < se.length; i++){
    if ((' '+se[i].className+' ').indexOf(' langselect ') != -1){
      var le = se[i].getElementsByTagName('span');
      var matched = false;
      var def = false;
      for (var j = 0; j < le.length; j++){
        if (le[j].lang == wgUserLanguage){
          le[j].style.display = 'inline';
          matched = true;
        }else{
          le[j].style.display = 'none';
          if (le[j].lang == '') def = le[j];
        }
      }
      if (!matched && def)
        def.style.display = 'inline';
    }
  }
  dc = document.getElementById('content');
  if (!dc) return;
  se = dc.getElementsByTagName('div');
  for (var i = 0; i < se.length; i++){
    if ((' '+se[i].className+' ').indexOf(' langselect ') != -1){
      var le = se[i].getElementsByTagName('div');
      var matched = false;
      var def = false;
      for (var j = 0; j < le.length; j++){
        if (le[j].lang == wgUserLanguage){
          le[j].style.display = 'block';
          matched = true;
        }else{
          le[j].style.display = 'none';
          if (le[j].lang == '') def = le[j];
        }
      }
      if (!matched && def)
        def.style.display = 'block';
    }
  }
}

/* Az ide elhelyezett JavaScript kód minden felhasználó számára lefut az oldalak betöltésekor. */