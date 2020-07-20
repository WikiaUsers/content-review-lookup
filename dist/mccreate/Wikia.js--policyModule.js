/* <pre> */
/* Create a section on the WikiaRail to display stuff. */
if ( wgNamespaceNumber != undefined && !window.policyModule ) {
        addOnloadHook( addPolicyModule );
}
 
var policyModule = true;
 
function addPolicyModule () {
    $('<section class="PolicyModule module"><h1 style="margin-bottom: 0px !important;">Rules in a Nutshell</h1><br /><div style="font-size: 1.1em;"><img src="http://upload.wikimedia.org/wikipedia/commons/c/ce/Nutshell.png" style="width: 1.1em; height=1.1em;" title="This policy in a nutshell."> Creations must be put in the Creation namespace.<br /><br /><img src="http://upload.wikimedia.org/wikipedia/commons/c/ce/Nutshell.png" style="width: 1.1em; height=1.1em;" title="This policy in a nutshell."> Don’t overwrite existing pages if the name you  want is already taken.<br /><br /><img src="http://upload.wikimedia.org/wikipedia/commons/c/ce/Nutshell.png" style="width: 1.1em; height=1.1em;" title="This policy in a nutshell."> Use at least one image, and try to keep them organized.<br /><br /><img src="http://upload.wikimedia.org/wikipedia/commons/c/ce/Nutshell.png" style="width: 1.1em; height=1.1em;" title="This policy in a nutshell."> Add your pages to the appropriate categories.<br /><br /><img src="http://upload.wikimedia.org/wikipedia/commons/c/ce/Nutshell.png" style="width: 1.1em; height=1.1em;" title="This policy in a nutshell."> Don’t edit other's pages, admins will make changes if necessary.<br /><br /><a href="/wiki/Rules_for_Submission">◄Rules for Submission</span></a><br /><br /></div></section>').insertBefore('.WikiaActivityModule');
}
/* </pre> */