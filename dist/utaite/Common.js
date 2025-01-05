/* Any JavaScript here will be loaded for all users on every page load. */
//importScriptPage('ShowHide/code.js', 'dev');

(function() {
    // Check if we're on the correct page
    var currentTitle = mw.config.get('wgTitle');
    var currentNamespace = mw.config.get('wgNamespaceNumber');
    
    // Check for admin rights (sysop and higher)
    var userGroups = mw.config.get('wgUserGroups') || [];
    var isAdmin = userGroups.some(function(group) {
        return ['sysop', 'bureaucrat'].indexOf(group) !== -1;
    });
    
    if (isAdmin && currentNamespace === 4 && currentTitle === 'Tutorial') {
        // Find existing div with c-edit-link class
        var editDiv = document.querySelector('.c-edit-link');
        
        if (editDiv) {
            // Simply change the href if there's already a link
            if (editDiv.querySelector('a')) {
                editDiv.querySelector('a').href = 'https://utaite.fandom.com/wiki/User:Makudoumee/blog/1';
            } else {
                // If no link exists, create one
                editDiv.innerHTML = '<h3 style="font-weight: bold;"><i class="fa-solid fa-lock"></i><a href="https://utaite.fandom.com/wiki/User:Makudoumee/blog/1" target="_blank">&nbsp;Section Edit Pages</a></h3><br/>';
            }
        }
    }
})();