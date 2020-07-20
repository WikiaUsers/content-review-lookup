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