/* == Legacy Marquee Script == */
jQuery(function($) {
    $('div.busca-contenido').replaceWith( '<marquee class="busca-contenido" id="marquesina" behavior="scroll" scrollamount="4" direction="left" >' + $('div.busca-contenido').text() + '</marquee>' );
    $('div.busca-boton1').replaceWith( '<input id="busca-boton1" type="button" value="Stop" onClick=' + "document.getElementById('marquesina').stop();" + '>' );
    $('div.busca-boton2').replaceWith( '<input id="busca-boton2" type="button" value="Start" onClick=' + "document.getElementById('marquesina').start();" + '>' );
    $('div.busca-sonido').replaceWith( '<embed src="http://www.youtube.com/v/___shQiFjOY?version=3&amp;hl=es_ES&amp;rel=0" type="application/x-shockwave-flash" width="0" height="0" allowscriptaccess="always" allowfullscreen="false" autostart="true" loop="false" hidden="true"></embed>' );
});

/* ==============================================
   === Messaging Subscription Tool ===
   ============================================== */
jQuery(function($) {
    // 1. Find the mount point
    const $root = $('#subscription-tool-root');
    
    // 2. Only run if the mount point exists AND we are on the correct page
    if (!$root.length || mw.config.get('wgPageName') !== 'Wiki_Laboratorio_de_Bola:Subscriptions') {
        return;
    }

    // --- Configuration ---
    const CONFIG = {
        LIST_PAGE: 'Wiki_Laboratorio_de_Bola:Subscriptions/List',
        CATEGORIES: [ 
            'Project News',
            'Weekly Events',
            'Technical Updates'
        ],
        USER_NAME_RAW: mw.config.get('wgUserName'), // e.g., "Antonio R. Castro"
        USER_NAME_NORMALIZED: mw.config.get('wgUserName').replace(/ /g, '_'), // e.g., "Antonio_R._Castro"
        USER_ENTRY_PREFIX: '* [[User:',
        USER_ENTRY_SUFFIX: ']]'
    };

    // 3. Build the tool's HTML
    const toolHTML = `
        <div class="subscription-tool" style="max-width: 600px; margin: auto;">
            <h2>Messaging Subscriptions</h2>
            <p>Select the topics you would like to receive messages about on your message wall.</p>
            
            <div id="sub-status" style="border: 1px solid var(--theme-border-color); padding: 10px; border-radius: 4px; margin-bottom: 15px;">
                Loading subscription status...
            </div>
            
            <div id="sub-categories" style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 15px;">
                <!-- Checkboxes will be loaded here by the script -->
            </div>
            
            <button class="wds-button" id="sub-save-button" disabled>Save Changes</button>
        </div>
    `;

    // 4. Inject the HTML and find the new elements
    $root.html(toolHTML);
    const $status = $root.find('#sub-status');
    const $categories = $root.find('#sub-categories');
    const $saveButton = $root.find('#sub-save-button');

    // 5. Check for API and Login Status
    if (typeof mw.Api === 'undefined') {
        $status.text('Error: mw.Api not available.').css('border-color', 'var(--theme-error-color)');
        return;
    }
    const API = new mw.Api();

    if (!CONFIG.USER_NAME_RAW) {
        $status.text('You must be logged in to subscribe.').css('border-color', 'var(--theme-warning-color)');
        $saveButton.prop('disabled', true);
        return;
    }

    // --- Logic ---
    let currentPageContent = '';
    let isLoading = false;
    
    // *** BUG FIX 1: Normalization ***
    // We will WRITE with spaces (canonical)
    const USER_ENTRY = `${CONFIG.USER_ENTRY_PREFIX}${CONFIG.USER_NAME_RAW}${CONFIG.USER_ENTRY_SUFFIX}`;
    
    // We will READ/REMOVE with a regex that matches BOTH spaces and underscores
    const nameRegexPart = `(${mw.util.escapeRegExp(CONFIG.USER_NAME_RAW)}|${mw.util.escapeRegExp(CONFIG.USER_NAME_NORMALIZED)})`;
    const USER_ENTRY_REGEX = new RegExp(`\\n?\\* \\[\\[User:${nameRegexPart}\\]\\]`, 'g');
    const USER_ENTRY_REGEX_NO_STAR = new RegExp(`\\n?\\[\\[User:${nameRegexPart}\\]\\]`, 'g'); // To find entries without the "*"

    /**
     * Loads the user's current subscription status from the list page
     */
    function loadSubscriptionStatus() {
        isLoading = true;
        $saveButton.prop('disabled', true);
        $status.text('Loading your subscription status...').css('border-color', 'transparent');

        API.get({
            action: 'query',
            prop: 'revisions',
            titles: CONFIG.LIST_PAGE,
            rvprop: 'content',
            formatversion: 2,
            cb: Date.now()
        }).done(data => {
            const page = data.query.pages[0];
            if (page.missing) {
                $status.text('Error: The subscription list page is missing. Please contact an admin.').css('border-color', 'var(--theme-error-color)');
                return;
            }

            currentPageContent = page.revisions[0].content || '';
            let html = '';

            CONFIG.CATEGORIES.forEach(category => {
                const isSubscribed = isUserSubscribed(currentPageContent, category);
                const categoryId = `sub-cat-${category.replace(/ /g, '_')}`;
                html += `
                    <label for="${categoryId}" class="sub-category-label" style="padding: 8px; border-radius: 4px; background-color: var(--theme-page-background-color); border: 1px solid var(--theme-border-color); cursor: pointer; display: block; margin-bottom: 5px;">
                        <input type="checkbox" id="${categoryId}" data-category="${category}" ${isSubscribed ? 'checked' : ''} style="margin-right: 8px;" />
                        ${category}
                    </label>
                `;
            });

            $categories.html(html);
            $status.text('Ready. Check the boxes to subscribe or uncheck to unsubscribe.').css('border-color', 'var(--theme-success-color)');
            $saveButton.prop('disabled', false);
            isLoading = false;
        
        }).fail(() => {
            $status.text('Error loading subscription status. Please try again.').css('border-color', 'var(--theme-error-color)');
            isLoading = false;
        });
    }

    /**
     * Helper function to check if the user is in a specific wikitext section
     * @param {string} content - The full wikitext content
     * @param {string} category - The category heading (e.g., "Project News")
     * @returns {boolean}
     */
    function isUserSubscribed(content, category) {
        // *** BUG FIX 2: Greedy Regex ***
        // This regex now properly finds the section content between two headers or end-of-file
        const sectionRegex = new RegExp(String.raw`(== ${mw.util.escapeRegExp(category)} ==)([\s\S]*?)(?=(== |$))`);
        const match = content.match(sectionRegex);
        
        if (!match || !match[2]) {
            // Section doesn't exist or is empty
            return false;
        }
        
        // Check if the user's name (with/without star, with/without underscore) is in the captured section
        return USER_ENTRY_REGEX.test(match[2]) || USER_ENTRY_REGEX_NO_STAR.test(match[2]);
    }

    /**
     * Handles the save button click
     */
    function saveSubscription() {
        if (isLoading) return;
        $saveButton.prop('disabled', true);
        $status.text('Saving...').css('border-color', 'transparent');
        isLoading = true;

        API.get({
            action: 'query',
            meta: 'tokens',
            type: 'csrf',
            prop: 'revisions',
            titles: CONFIG.LIST_PAGE,
            rvprop: 'content',
            formatversion: 2,
            cb: Date.now()
        }).then(data => {
            const page = data.query.pages[0];
            const token = data.query.tokens.csrftoken;
            let newContent = (page.revisions && page.revisions[0].content) || '';
            let changesMade = false;

            CONFIG.CATEGORIES.forEach(category => {
                const checkbox = $categories.find(`#sub-cat-${category.replace(/ /g, '_')}`);
                if (!checkbox.length) return; 

                const shouldBeSubscribed = checkbox.prop('checked');
                const isCurrentlySubscribed = isUserSubscribed(newContent, category);
                
                // *** BUG FIX 2: Greedy Regex ***
                const sectionRegex = new RegExp(String.raw`(== ${mw.util.escapeRegExp(category)} ==)([\s\S]*?)(?=(== |$))`);
                const sectionMatch = newContent.match(sectionRegex);
                
                if (!sectionMatch) {
                    // Section header doesn't exist, skip
                    console.warn(`Subscription tool: Could not find section for category "${category}"`);
                    return; 
                }
                
                const sectionHeader = sectionMatch[1]; // "== Category =="
                const sectionContent = sectionMatch[2]; // "\n* [[User:Test]]\n"

                if (shouldBeSubscribed && !isCurrentlySubscribed) {
                    // SUBSCRIBE
                    // Clean up old bad entries first
                    let cleanedContent = sectionContent.replace(USER_ENTRY_REGEX, '');
                    cleanedContent = cleanedContent.replace(USER_ENTRY_REGEX_NO_STAR, '');
                    // Add the new correct entry
                    const newSection = sectionHeader + cleanedContent.trimEnd() + `\n${USER_ENTRY}\n`;
                    newContent = newContent.replace(sectionRegex, newSection);
                    changesMade = true;

                } else if (!shouldBeSubscribed && isCurrentlySubscribed) {
                    // UNSUBSCRIBE
                    // Clean up ALL entries for this user (with/without star, with/without underscore)
                    let updatedSectionContent = sectionContent.replace(USER_ENTRY_REGEX, '');
                    updatedSectionContent = updatedSectionContent.replace(USER_ENTRY_REGEX_NO_STAR, '');
                    newContent = newContent.replace(sectionRegex, sectionHeader + updatedSectionContent);
                    changesMade = true;
                }
            });

            if (!changesMade) {
                return $.Deferred().resolve({ noChange: true }).promise();
            }

            return API.post({
                action: 'edit',
                title: CONFIG.LIST_PAGE,
                text: newContent.trim(),
                summary: `Updating subscription (via script) for ${CONFIG.USER_NAME_RAW}`,
                token: token
            });
        }).done(response => {
            if (response.noChange) {
                $status.text('No changes were made.').css('border-color', 'var(--theme-border-color)');
            } else if (response.edit && response.edit.result === 'Success') {
                $status.text('Settings saved!').css('border-color', 'var(--theme-success-color)');
            } else {
                $status.text(`Error saving: ${response.error ? response.error.info : 'unknown error'}`).css('border-color', 'var(--theme-error-color)');
            }
        }).fail(err => {
            $status.text(`API Error: ${err.error ? err.error.info : 'Unknown'}`).css('border-color', 'var(--theme-error-color)');
        }).always(() => {
            $saveButton.prop('disabled', false);
            isLoading = false;
            loadSubscriptionStatus(); 
        });
    }

    // --- Initialize ---
    loadSubscriptionStatus();
    $saveButton.on('click', saveSubscription);
});