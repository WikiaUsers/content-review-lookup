/* ==========================================================================
   Beginning of Common.js
   ========================================================================== */
/**
 * Last Updated: 2025/01/25
 * 
 * This file contains scripts for some functionalities:
 * 1. Quick Access Blog Link for Tutorial Sections Editing
 * 2. Custom Tailwind CSS Configuration (using tw- prefix to prevent clash with Fandom (Wikia) global css.
 */

/* ==========================================================================
   Script 1: Admin Tutorial Page Access
   Description: Adds a quick access link for admins to edit tutorial section content
   ========================================================================== */

(function() {
    'use strict';
    
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

/* ==========================================================================
   Script 2: Custom Tailwind Configuration
   Description: Configures Tailwind CSS with a custom prefix to prevent conflicts
   with Fandom's global CSS styles
   ========================================================================== */

(function() {
    'use strict';

    // Only proceed if MediaWiki is available
    if (typeof mw === 'undefined') {
        console.error('MediaWiki not found. Tailwind initialization aborted.');
        return;
    }

    /**
     * Initialize Tailwind CSS
     * @returns {Promise} A promise that resolves when Tailwind is loaded
     */
    function initializeTailwind() {
        console.log('Loading Tailwind CSS...');
        
        return mw.loader.getScript('https://cdn.tailwindcss.com')
            .then(function() {
                console.log('Tailwind CSS loaded successfully');
                
                // Configure Tailwind
                window.tailwind.config = {
                    important: true,
                    corePlugins: {
                        preflight: false
                    },
                    prefix: 'tw-',
                    darkMode: ['class', '[data-theme="dark"]'],
                    theme: {
                        extend: {}
                    }
                };
            })
            .catch(function(error) {
                console.error('Failed to load Tailwind:', error);
                throw error;
            });
    }

    // Initialize Tailwind when the document is ready
    $(document).ready(function() {
        initializeTailwind();
    });
})();


/* ==========================================================================

============================================================================= */

window.pPreview = $.extend(true, window.pPreview, {RegExp: (window.pPreview || {}).RegExp || {} });
window.pPreview.noimage = 'https://static.wikia.nocookie.net/nicodougasingers/images/d/d8/404simple.png/revision/latest?cb=20241007164241';
window.pPreview.tlen = 1000;
window.pPreview.RegExp.noinclude = ['.blacklist-pPreview'];


/* ==========================================================================
   End of Common.js
   ========================================================================== */