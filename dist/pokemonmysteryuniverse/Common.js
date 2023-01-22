/* NoLicenseWarning config */
window.NoLicenseWarning = {
    forceLicense: true,
    excludedGroups: [
    ]
};

/* Collapsible toggle
* Credits to MarkusRost (MarkusRost#8278)
* https://discord.com/channels/563020189604773888/601962978023047210/988801272599703562
*/

$('.collapsible-toggleAll').click(function(){
    $("th").find('.mw-collapsible-toggle').click();
});