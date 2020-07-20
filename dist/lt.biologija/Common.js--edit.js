//============================================================
//
// Įrankių juosta
//
//============================================================
 
function addCustomButton(imageFile, speedTip, tagOpen, tagClose, sampleText)
{
  if (mwCustomEditButtons) {
    mwCustomEditButtons.push(
      {"imageFile":  imageFile,
       "speedTip":   speedTip,
       "tagOpen":    tagOpen,
       "tagClose":   tagClose,
       "sampleText": sampleText});
  }
}
 
addCustomButton('http://upload.wikimedia.org/wikipedia/commons/2/23/Quotes-Lithuanian.png','Kabutės',"„","“",'');
addCustomButton('http://upload.wikimedia.org/wikipedia/commons/3/30/Btn_toolbar_rayer.png','Perbraukti',"<s>","</s>",'');
addCustomButton('http://upload.wikimedia.org/wikipedia/en/1/13/Button_enter.png','Nauja eilutė',"<br />","",'');
addCustomButton('http://upload.wikimedia.org/wikipedia/en/8/80/Button_upper_letter.png','Pakeltas tekstas',"<sup>","</sup>",'');
addCustomButton('http://upload.wikimedia.org/wikipedia/en/7/70/Button_lower_letter.png','Nuleistas tekstas',"<sub>","</sub>",'');
addCustomButton('http://upload.wikimedia.org/wikipedia/commons/8/88/Btn_toolbar_enum.png','Sąrašas',"\n# elementas 1\n# elementas 2\n# elementas 3","",'');
addCustomButton('http://upload.wikimedia.org/wikipedia/commons/1/11/Btn_toolbar_liste.png','Vardijimas',"\n* elementas A\n* elementas B\n* elementas C","",'');
addCustomButton('http://upload.wikimedia.org/wikipedia/commons/9/9e/Btn_toolbar_gallery.png','Iliustracijų galerija',"\n<gallery>\nImage:M63.jpg|[[M63]]\nImage:Mona Lisa.jpg|[[La Joconde]]\nImage:Truite arc-en-ciel.jpg|Une [[truite]]\n</gallery>","",'');
addCustomButton('http://upload.wikimedia.org/wikipedia/commons/3/37/Btn_toolbar_commentaire.png','Komentarai',"<!--","-->",'');
addCustomButton('http://upload.wikimedia.org/wikipedia/commons/1/11/Button_category.png','Kategorija','['+'[Kategorija:',"]]",'kategorijos pavadinimas');
addCustomButton('http://upload.wikimedia.org/wikipedia/en/c/c8/Button_redirect.png','Nukreipimas',"#REDIRECT [[","]]",'straipsnio pavadinimas');
addCustomButton('http://upload.wikimedia.org/wikipedia/commons/7/79/Button_reflink.png','Išnaša',"<ref>","</ref>",'');