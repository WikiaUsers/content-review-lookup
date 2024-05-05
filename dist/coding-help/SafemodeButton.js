/*
	Adds a button that says "SWITCH TO SAFE MODE" at the top left of all pages with title text 
	"Click to remove all CSS customizations" shown on hover of the button. Clicking the button adds ?usesitecss=0&ShowSafeButton=no 
	(or &usesitecss=0&ShowSafeButton=no if the url already has a ? in it) which redacts the site CSS 
	(while leaving site JS and personal JS/CSS) and removes the button from the page. IT IS SAVED TO LOCAL STORAGE, SO IT WILL 
	LOAD WHAT YOU LAST CLICKED FOR
*/

// Function to save user preference to local storage
function savePreference(pref) {
    localStorage.setItem('safeModePreference', pref);
}

// Function to load user preference from local storage
function loadPreference() {
    return localStorage.getItem('safeModePreference');
}

// Function to create the 'Switch to Safe Mode' button
function createSafeModeButton() {
    // Create the button element
    var safemodeButton = document.createElement('button');
    // Set the ID of the button
    safemodeButton.id = 'safemode';
    // Apply a specific class for styling
    safemodeButton.className = 'wds-button';
    // Set the font weight of the button text to bold
    safemodeButton.style.fontWeight = '800';
    // Set the text content of the button
    safemodeButton.textContent = 'Switch to CSS-Free Mode';

    // Add a tooltip text to the button (to inform users of button's purpose)
    safemodeButton.title = 'Click to remove all CSS customizations';

    // Add event listener for button click
    safemodeButton.addEventListener('click', function() {
        // Get the current page URL
        var currentPageURL = new URL(window.location.href);
        
        // Append the parameters 'usesitecss=0', 'ShowSafeButton=no', and 'RevertBackButton=yes' to the URL on button click
        currentPageURL.searchParams.set('usesitecss', '0');
        currentPageURL.searchParams.set('ShowSafeButton', 'no');
        currentPageURL.searchParams.set('RevertBackButton', 'yes');

        // Save the user's preference to local storage
        savePreference('no');

        // Redirect to the URL with the added parameters
        window.location.href = currentPageURL.toString();
    });

    return safemodeButton;
}

// Function to create the 'Remove Safe Mode' button
function createRemoveSafeModeButton() {
    // Create the button element
    var removeSafeModeButton = document.createElement('button');
    // Set the ID of the button
    removeSafeModeButton.id = 'removeSafeMode';
    // Apply a specific class for styling
    removeSafeModeButton.className = 'wds-button';
    // Set the font weight of the button text to bold
    removeSafeModeButton.style.fontWeight = '800';
    // Set the text content of the button
    removeSafeModeButton.textContent = 'Exit CSS-Free Mode';

    // Add a tooltip text to the button (to inform users of button's purpose)
    removeSafeModeButton.title = 'Click to revert to the original state';

    // Add event listener for button click
    removeSafeModeButton.addEventListener('click', function() {
        // Get the current page URL
        var currentPageURL = new URL(window.location.href);
        
        // Remove the parameters 'usesitecss', 'ShowSafeButton', and 'RevertBackButton' from the URL on button click
        currentPageURL.searchParams.delete('usesitecss');
        currentPageURL.searchParams.delete('ShowSafeButton');
        currentPageURL.searchParams.delete('RevertBackButton');

        // Save the user's preference to local storage
        savePreference('yes');

        // Redirect to the URL with the removed parameters
        window.location.href = currentPageURL.toString();
    });

    return removeSafeModeButton;
}

// Check the user's preference and display the appropriate button accordingly
function displayButtonBasedOnPreference() {
    // Get the user's preference from local storage
    var showSafeButtonPreference = loadPreference();

    // Add an event listener for when the content of the wiki page is loaded
    mw.hook('wikipage.content').add(function () {
        // Get the element where the button will be inserted
        var mwContentText = document.getElementById('mw-content-text');

        // Check if a button with ID 'safemode' or 'removeSafeMode' already exists in the content text
        // If it exists, remove it before inserting a new button
        var existingSafeModeButton = mwContentText.querySelector('#safemode');
        var existingRemoveSafeModeButton = mwContentText.querySelector('#removeSafeMode');
        if (existingSafeModeButton) {
            mwContentText.removeChild(existingSafeModeButton);
        }
        if (existingRemoveSafeModeButton) {
            mwContentText.removeChild(existingRemoveSafeModeButton);
        }

        // Create the appropriate button based on the user's preference
        if (showSafeButtonPreference === 'no') {
            var removeSafeModeButton = createRemoveSafeModeButton();
            mwContentText.insertBefore(removeSafeModeButton, mwContentText.firstChild);
        } else {
            var safemodeButton = createSafeModeButton();
            mwContentText.insertBefore(safemodeButton, mwContentText.firstChild);
        }

        // Get the current page URL
        var currentPageURL = new URL(window.location.href);

        // Check if 'removeSafeMode' button is displayed and parameters are not already in the URL
        if (mwContentText.querySelector('#removeSafeMode')) {
            if (!currentPageURL.searchParams.has('usesitecss') || 
                !currentPageURL.searchParams.has('ShowSafeButton') || 
                !currentPageURL.searchParams.has('RevertBackButton')) {
                // Append the parameters 'usesitecss=0', 'ShowSafeButton=no', and 'RevertBackButton=yes' to the URL
                currentPageURL.searchParams.set('usesitecss', '0');
                currentPageURL.searchParams.set('ShowSafeButton', 'no');
                currentPageURL.searchParams.set('RevertBackButton', 'yes');

                // Save the user's preference to local storage
                savePreference('no');

                // Redirect to the URL with the added parameters
                window.location.href = currentPageURL.toString();
            }
        }
    });
}

// Call the function to display the appropriate button based on the user's preference
displayButtonBasedOnPreference();