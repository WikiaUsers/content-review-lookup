/* Any JavaScript here will be loaded for sysops only */


//Live modules--calls being made here to prevent loading for normal users.
importArticles({
    type: 'script',
    articles: [

//__Edit_Modules_________________________________________________________________
        //Purge Button:
        'u:dev:PurgeButton/code.js',
        
        //List Files: For those really large Batch deletes...
        'u:dev:ListFiles/code.js',
        
//__Management_Modules___________________________________________________________
        //Add Nuclear Option--USE WITH EXTREME CAUTION
        'u:dev:Nuke/code.js'
    ]
});

/*
This displays an on-page warning if a lua module returns a custom error message.

This requires the the error message have the ID #error for custom errors, and that the hidden message is already on the page, with visibility:hidden set.

Also detects the class .scribunto-error, included on generic lua errors.  

If the error message ID is found on the page, the warning is set to be visible.
In order to minimize impact on regular users, this message will only be shown to admins.

A 2 second delay has been include to allow time for the page to fully load before checking. Without this, detection will always fail.
*/
window.setTimeout(function () {if (document.getElementById("error") !== null || document.getElementsByClassName("scribunto-error").length !== 0) document.getElementById("warn_lua").classList.add("show");}, 3000);