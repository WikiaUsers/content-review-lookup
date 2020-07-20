// ============================================================
//                       Archive Forums
// ============================================================
importScript('MediaWiki:Common.js/ArchiveForums.js');

// ============================================================
//                       DisplayTimer
// ============================================================
importScript('MediaWiki:Common.js/Clock.js');

// ============================================================
//                       Imports
// ============================================================
importScript('MediaWiki:Common.js/Imports.js');

// ============================================================
//                     Script for Special:Upload
// ============================================================
// BEGINNING: JavaScript for placing the fair use rationale template inside the summary box on [[Special:Upload]]. Code by "[[wikipedia:User:Pinky49]]", created and coded specifically for [[wikia:c:cdnmilitary|Duty & Valour]].
 
function FairUseRationale() {
        if((wgPageName == 'Special:Upload' || wgPageName == 'Special:MultipleUpload') && document.getElementById('wpDestFile').value == '') {
                document.getElementById('wpUploadDescription').value = '== Source ==\n\n== Licensing ==\n\n[[Category:';
        }
}
addOnloadHook(FairUseRationale);
 
// ****** END: JavaScript for [[Special:Upload]] ******