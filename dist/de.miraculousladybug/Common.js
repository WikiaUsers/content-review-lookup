/* Jedes JavaScript hier wird für alle Benutzer für jede Seite geladen. */
 
// Entferne auf [[Spezial:Hochladen]] „keine Vorauswahl“
$(function remove_no_license_special_upload() {
   if (mw.config.get('wgPageName') != "Spezial:Hochladen" && mw.config.get('wgPageName') != "Spezial:Mehrere_Dateien_hochladen")
     return;
   var license = document.getElementById("wpLicense");
   if (!license)
     return;
   var options = license.getElementsByTagName("option");
   if (!options)
     return;
   license.removeChild(options[0]);
 });

/*AbuseLogRC*/
abuseLogRC_showTo = [ 'content-moderator' ];