function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);

window.SpoilerAlertJS = {
    question: 'Are you interested to read this section? It contains spoilers!',
    yes: 'Sure, why not?',
    no: 'No, Thanks',
    fadeDelay: 1000
};