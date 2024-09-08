// Adiciona a Predefinição de Imagem à página Especial:ImageUpload por meio da página [[MediaWiki:Common.js|Common.js]].

 function setSpecialUploadTemplate() {
     var editbox = document.getElementById('wpUploadDescription');
     if (!editbox)            return;
     if (editbox.value != '') return;
     editbox.value = "{"+"{Marvel Wiki:Predefinição de Imagem\n"
                   + "| Licença                 = \n"
                   + "| TipoDeImagem            = \n"
                   + "| Descrição               = \n\n"
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