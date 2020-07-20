$(document).ready(function() {
 if (document.location.href.indexOf("Special:Upload") != -1) {
  document.getElementById('wpLicense').remove(0);
  document.getElementById('wpLicense').remove(1);
  licenseSelectorCheck();
 }
}