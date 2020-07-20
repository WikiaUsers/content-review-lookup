//Load the [[Template:File Information|File Info text]] to upload directly in the Description field. Actual about [[MediaWiki:Common.js|Common.js]] involved.

 function setSpecialUploadTemplate() {
     var editbox = document.getElementById('wpUploadDescription');
     if (!editbox)            return;
     if (editbox.value != '') return;
     editbox.value = "{"+"{File info\n"
                   + "|Description = \n"
                   + "|Date = \n"
                   + "|Author = \n"
                   + "|Source = \n"
                   + "|License = \n"
                   + "}"+"}";
 }
 addOnloadHook(setSpecialUploadTemplate);