/**
 * Name:        UpdateVersionButton
 * Version:     v1.0
 * Author:      theEmeraldMinecraftM
 * Description: Adds a button below the edit dropdown to automatically update the version template
 */
(function() {
    var config = mw.config.get([  // Gets us the wgPageName variable
        'wgPageName'
    ]);
    
    function edit() {
        new mw.Api()  // Get content of Template:Current_version
            .get( {
                action: 'parse',
                page: 'Template:Current_version',
                prop: 'text'
            } ).done( function ( data ) {
                // Executes once we recieved the page content
                var version = data["parse"]["text"]["*"];  // Get the text response
                version = version.split("<p>")[1];  // Cut away the html wrapper
                version = version.split("</p>")[0];  // Cut away the html wrapper x2
                version = version.trim();  // Remove any potentional whitespace
        
                new mw.Api()  // Make an edit POST request
                    .edit( config.wgPageName, function ( revision ) {
                        return {
                            text: revision.content.replace( /(?<={{Version\|).*(?=}})/, version ),  // Replace the old version (+ any notes) with the new version
                            summary: 'Marked page as up-to-date (' + version + ')',
                            minor: true
                        };
                    } )
                    .then( function () {
                        window.location.reload();  // Reload the window so that the user sees the new changes
                } );
        } );
    }
    
    $('.page-header__contribution-buttons .wds-list, .page-header__actions .wds-list').append(
        $('<li>').append(  // Adds the button to the list of drop-down buttons
            $('<a>', {
                href: "#",  // Button link (# just so that it doesn't send the user anywhere - we want them to stay here)
                text: "Update Version",  // Button text
                id: 'ca-update-version'  // Button ID (the "ca" in the front is just the standard dropdownbutton naming thing)
            }).click(edit)  // Run the edit function on click
        )
    );
})();