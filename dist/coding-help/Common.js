/* Any JavaScript here will be loaded for all users on every page load. */
if (mw.config.get('wgPageName') === 'User:Moonwatcher_x_Qibli' && mw.config.get('wgAction') !== 'edit') {
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:SnowStorm.js',
    ]
});}


mw.hook('wikipage.content').add(function($content) {
    if (!$content) {
        return;
    }
    $content.find('.googleforms').each(function() {
        var $this = $(this),
            id = $this.attr('data-forms-id'),
            widget = $this.attr('data-widget') || true;
            css = {
                width: 'inherit',
                height: 'inherit',
                border: 0
            };
        $this.html(
            $('<iframe>', {
                src: 'https://docs.google.com/forms/d/e/' + id + '/viewform?embedded=true&hl=' + mw.config.get('wgUserLanguage'),
                css: css
            })
        );
    });
});

window.ExternalLinkWarningNamespaces = ['Message_Wall', '0', '1'];


/*
	Wiki links have a their target page stored in the title attribute, which on many browsers is displayed 
	as a tooltip when hovering over the link. The following snippet (by HumansCanWinElves) adds such 
	titles to redlinks too.
*/

mw.loader.using('mediawiki.Uri').then(function() {
    $('.main-container').on('mouseover', 'a.new:not([title])[href]', function() {
        var regExp = /(?<=\/wiki\/)([^?]+)(?=(\?.+)?)/,
            match = regExp.exec($(this).attr('href')),
            title;

        if (match) {
            title = mw.Uri.decode(match[0]).replace(/_/g, ' ');
            $(this).attr('title', title);
        }
    });   
});

//Message wall greeting for [[Mesage wall:Moonwatcher_x_Qibli]], uses [[User:Moonwatcher_x_Qibli/MWG]]
//Coded by User:Sophiedp
if (mw.config.get('profileUserName') === 'Moonwatcher_x_Qibli' && mw.config.get('profileIsMessageWallPage')) {
    mw.loader.using('mediawiki.api').then(function () {
        new mw.Api().get({
            action: 'parse',
            format: 'json',
            page: 'User:Moonwatcher_x_Qibli/MWG',
            prop: 'text',
            wrapoutputclass: 'greeting',
            disablelimitreport: 1,
            formatversion: '2'
        }).done(function (data) {
            $('#MessageWall').prepend(data.parse.text).find('.greeting').css('margin-bottom', '20px');
        });
    });
}

/*
	Adds a button that says "SWITCH TO SAFE MODE" at the top left of all pages with title text 
	"Click to remove all CSS customizations" shown on hover of the button. Clicking the button adds ?usesitecss=0&ShowSafeButton=no 
	(or &usesitecss=0&ShowSafeButton=no if the url already has a ? in it) which redacts the site CSS 
	(while leaving site JS and personal JS/CSS) and removes the button from the page.
*/
// Function to check if a specific parameter exists in the URL
function urlParamExists(param) {
    // Parse the query string of the URL
    var urlParams = new URLSearchParams(window.location.search);
    // Check if the specified parameter exists in the URL
    return urlParams.has(param);
}

// Check if the URL does not contain the parameter 'ShowSafeButton' with value 'no'
// If the parameter is absent or its value is not 'no', execute the following code
if (!urlParamExists('ShowSafeButton') || (urlParamExists('ShowSafeButton') && urlParams.get('ShowSafeButton') !== 'no')) {
    // Add an event listener for when the content of the wiki page is loaded
    mw.hook('wikipage.content').add(function () {
        // Get the element where the button will be inserted
        var mwContentText = document.getElementById('mw-content-text');
        
        // Check if a button with ID 'safemode' already exists in the content text
        // If it exists, return early and do not insert another button
        // To prevent accidentally adding many buttons at once
        if (mwContentText.querySelector('#safemode')) {
            return;
        }

        // Create the button element
        var safemodeButton = document.createElement('button');
        // Set the ID of the button
        safemodeButton.id = 'safemode';
        // Apply a specific class for styling
        safemodeButton.className = 'wds-button';
        // Set the font weight of the button text to bold
        safemodeButton.style.fontWeight = '800';
        // Set the text content of the button
        safemodeButton.textContent = 'Switch to Safe Mode';

        // Add a tooltip text to the button (to inform users of buttons purpose)
        safemodeButton.title = 'Click to remove all CSS customizations';

        // Add event listener for button click
        safemodeButton.addEventListener('click', function() {
            // Get the current page URL
            var currentPageURL = window.location.href;
            // Append or add the parameters 'usesitecss=0' and 'ShowSafeButton=no' to the URL on button click
            if (currentPageURL.includes('?')) {
                currentPageURL += '&usesitecss=0&ShowSafeButton=no';
            } else {
                currentPageURL += '?usesitecss=0&ShowSafeButton=no';
            }

            // Redirect to the URL with the added parameters
            window.location.href = currentPageURL;
        });

        // Insert the button into the mw-content-text element as the first child
        mwContentText.insertBefore(safemodeButton, mwContentText.firstChild);
    });
}