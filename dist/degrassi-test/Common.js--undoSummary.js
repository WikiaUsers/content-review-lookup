// <source lang="JavaScript">
 
// Fix Edit Summary prompt for UNDO
// Fixes the fact that the UNDO function combined with the "no edit summary prompter"
// causes problems if leaving the default undo edit summary unchanged.
// Added by [[User:Deskana]], code by [[User:Tra]].
// See also [[bugzilla:8912]].
$(function () {
    if (document.location.search.indexOf("undo=") != -1 && document.getElementsByName('wpAutoSummary')[0]) {
        document.getElementsByName('wpAutoSummary')[0].value='1';
    }
});
// End Fix Edit Summary prompt for UNDO
 
// </source>