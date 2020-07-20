 // Lädt die [[Vorlage:Dateiinfo|Dateiinfovorlage]] beim Hochladen direkt im Beschreibungsfeld. Ist über [[MediaWiki:Common.js|Common.js]] eingebunden.

 function setSpecialUploadTemplate() {
     var editbox = document.getElementById('wpUploadDescription');
     if (!editbox)            return;
     if (editbox.value != '') return;
     editbox.value = "{"+"{檔案信息"
                   + "|描述   = \n"
                   + "|日期   = \n"
                   + "|作者   = \n"
                   + "|來源   = \n"
                   + "|許可   = \n"
                   + "}"+"}";
 }
 addOnloadHook(setSpecialUploadTemplate);