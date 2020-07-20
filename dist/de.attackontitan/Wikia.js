//Nachrichten
var messageWallUserTags = {
    'RainA': 'Administrator',
    'Grizzhly': 'Administrator'
};
 
$(function($) {
    for (var name in messageWallUserTags) {
        $('a.subtle[href$="Nachrichtenseite:' + name + '"]').after('<span style="color:#eeeded;background:#0099eb;border-radius:1em;padding:1px 5px;margin-left:1px;font-size:85%;font-weight:bold;vertical-align:top;">' + messageWallUserTags[name] + '</span>');
    }
});

// Entferne auf [[Spezial:Hochladen]] „keine Vorauswahl“
 function remove_no_license_special_upload() {
   if (wgPageName != "Spezial:Hochladen")
     return;
   var license = document.getElementById("wpLicense");
   if (!license)
     return;
   var options = license.getElementsByTagName("option");
   if (!options)
     return;
   license.removeChild(options[0]);
 }
 
addOnloadHook(remove_no_license_special_upload);
 
// Entferne auf [[Spezial:Mehrere_Dateien_hochladen]] „keine Vorauswahl“
 function remove_no_license_special_multipleupload() {
   if (wgPageName != "Spezial:Mehrere_Dateien_hochladen")
     return;
   var license = document.getElementById("wpLicense");
   if (!license)
     return;
   var options = license.getElementsByTagName("option");
   if (!options)
     return;
   license.removeChild(options[0]);
 }
 
 addOnloadHook(remove_no_license_special_multipleupload);