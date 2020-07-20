// Loads the [[Template:Information|file info-template]] when uploading directly in the Description field. Is on [[MediaWiki:Common.js|Common.js]] involved.
 
 function setSpecialUploadTemplate() {
     var editbox = document.getElementById('wpUploadDescription');
     if (!editbox)            return;
     if (editbox.value != '') return;
     editbox.value = "{"+"{Information\n"
                   + "|description = \n"
                   + "|date = \n"
                   + "|author = \n"
                   + "|source = \n"
                   + "|permission = \n"
                   + "|other_versions = \n"
                   + "}"+"}";
 }
 addOnloadHook(setSpecialUploadTemplate);