/***
 * Kod JavaScript zawarty na tej stronie jest uruchamiany przez wszech członków Administracji (poprzez import).
 ***/

/*** Przycisk do wstawienia tekstu powitalnego na tworzonych dyskusjach użytkowników ***/
$(function() {
  if ($('#ca-talk').hasClass('new') && $('body').hasClass('ns-3')) {
    var przycisk_powitania = {
      "imageFile": "http://piotrekd.wikia.com/wiki/Special:FilePath/Przycisk - powitanie.png",
      "speedTip": "Powitanie",    
      "tagOpen": "== Witamy na GTA Wiki! ==\n{{Komunikat powitanie}}\n",
      "tagClose": ("~~" + "~~"),
      "sampleText": ""
    };
    mwCustomEditButtons.push(przycisk_powitania);
  }
});