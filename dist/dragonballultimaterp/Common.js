/* Any JavaScript here will be loaded for all users on every page load. */

if (wgPageName.indexOf("Special:MovePage/File:") != -1 || (wgCanonicalNamespace == "File" && Storage)){
   LIRoptions = {
	bottomMessage: 'This appears below the buttons on Special:MovePage',
	editSummary: 'Updating file link (automatic)',
	singleButtonText: 'Rename and replace',
        queueButtonText: 'Rename and add to queue'
   }
 
   importScriptPage("FileUsageAuto-update/code.js/min.js", "dev");
}

// *********************************************
// Page background changer (courtesy of Megan)
// *********************************************
 
function BgImage() {
    if ($('#BgImage').text().length > 3 && ($('#BgImage').text().match("(((http://www)|(http://)|(www))[-a-zA-Z0-9@:%_\+.~#?&//=]+)\.(jpg|jpeg|gif|png|bmp|tiff|tga|svg)"))) {
        $('#BgImage').hide();
         $('body').css("background-image", "url(" + $('#BgImage').text() + ") !important").css("backgroundPosition", "top center").css("backgroundRepeat", "no-repeat").css("background", "none");
    }
}
 
$(document).ready(BgImage);