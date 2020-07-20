// Adds the Image Template to the Special:ImageUpload page via the [[MediaWiki:Common.js|Common.js]] page.

 function setSpecialUploadTemplate() {
     var editbox = document.getElementById('wpUploadDescription');
     if (!editbox)            return;
     if (editbox.value != '') return;
     editbox.value = "{"+"{Marvel Database:Image Template\n"
                   + "| License                 = \n"
                   + "| ImageType               = \n"
                   + "| Description             = \n"
                   + "| GalleryDescription      = \n\n"
                   + "| Source                  = \n"
                   + "| Permission              = \n"
                   + "| Issue                   = \n\n"
                   + "| Universe                = \n"
                   + "| Subject1                = \n"
                   + "| Subject2                = \n"
                   + "| Subject3                = \n"
                   + "| Subject4                = \n"
                   + "| Subject5                = \n\n"
                   + "| CoverArtist1            = \n"
                   + "| Penciler1               = \n"
                   + "| Inker1                  = \n"
                   + "| Colourist1              = \n"
                   + "| Letterer1               = \n\n"
                   + "| Notes                   = \n"
                   + "| Trivia                  = \n"
                   + "}"+"}";

 }
 addOnloadHook(setSpecialUploadTemplate);