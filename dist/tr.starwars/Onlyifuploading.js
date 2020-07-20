 // Kaynak: jedipedia.de

 function setSpecialUploadTemplate() {
     var editbox = document.getElementById('wpUploadDescription');
     if (!editbox)            return;
     if (editbox.value != '') return;
     editbox.value = "{"+"{Yükle\n"
                   + "|Tanımlama    = \n"
                   + "|Kaynak       = \n"
                   + "|Yaratıcı     = \n"
                   + "|Kategoriler  = \n"
                   + "}"+"}";
 }
 addOnloadHook(setSpecialUploadTemplate);