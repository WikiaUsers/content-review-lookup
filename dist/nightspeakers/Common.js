/* Any JavaScript here will be loaded for all users on every page load. */
/*Adds RailWAM*/
window.railWAM = {
    logPage:"Project:WAM Log",
    top5000mode:"false",
    doubleCheckDelay:"24"
};

/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */
$(function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").html(wgUserName);
 });
 
/* End of the {{USERNAME}} replacement */

/*Adds personalised edit tools*/
if (mwCustomEditButtons) {
 
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/central/images/1/16/Button_reflink_alternate.png",
        "speedTip": "Add a reference",
        "tagOpen": "<ref name=\"REF NAME\">",
        "tagClose": "</ref>",
        "sampleText": "{{Ref|BOOK NO|CHAPTER NO|PAGE NO}}"};
}