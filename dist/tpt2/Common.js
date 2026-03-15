// NoLicenseWarning script by Roblox Wiki (Credits to them)
window.NoLicenseWarning = {
    forceLicense: true,
    excludedGroups: [
        'sysop']}
    
window.MedalsPage = 'Theme Park Tycoon 2 Wiki:Medals';
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:Medals.js'
    ]
});
/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires Template:USERNAME. USE APPROPRIATELY!!*/
function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);