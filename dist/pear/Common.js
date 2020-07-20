/* Any JavaScript here will be loaded for all users on every page load. */



/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */

function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);

/* End of the {{USERNAME}} replacement */

if (wgNamespaceNumber === 2 || wgNamespaceNumber === 3) {
$(function() {
    var i, len, html, rights = {
	
        "Brainulator9": ["Bureaucrat"],
	"Ian Bush": ["Bureaucrat"],
	"QueenZeppelin": ["Bureaucrat"],
        "Darkapple": ["Bureaucrat"],
        "ELSenorTI": ["Retired"],
        
};
    rights = rights[wgTitle];
    if (typeof rights !== "undefined") {
        len = rights.length;
        html = "";
        // remove old rights
        //$('.UserProfileMasthead .masthead-info span.group').remove();
        for (i = 0; i < len; i += 1) {
            html += '<span class="group">' + rights[i] + '</span>';
        }
        $(html).appendTo('.masthead-info hgroup');
    }
});
}