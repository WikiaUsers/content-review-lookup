// Adiciona a Predefini��o de Imagem � p�gina Especial:ImageUpload por meio da p�gina [[MediaWiki:Common.js|Common.js]].

 function setSpecialUploadTemplate() {
     var editbox = document.getElementById('wpUploadDescription');
     if (!editbox)            return;
     if (editbox.value != '') return;
     editbox.value = "{"+"{Marvel Wiki:Predefini��o de Imagem\n"
                   + "| Licen�a                 = \n"
                   + "| TipoDeImagem            = \n"
                   + "| Descri��o               = \n\n"
                   + "| Fonte                   = \n\n"
                   + "| Universo                = \n"
                   + "| Sujeito1                = \n"
                   + "| Sujeito2                = \n"
                   + "| Sujeito3                = \n"
                   + "| Sujeito4                = \n"
                   + "| Sujeito5                = \n\n"
                   + "| ArtistaDaCapa1          = \n"
                   + "| Desenhista1             = \n"
                   + "| Arte-Finalista1         = \n"
                   + "| Colorista1              = \n"
                   + "| Letrista1               = \n\n"
                   + "}"+"}";

 }
 addOnloadHook(setSpecialUploadTemplate);