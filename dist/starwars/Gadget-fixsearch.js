// <pre><nowiki>
//  _________________________________________________________________________________________
// |                                                                                         |
// |                    === WARNING: GLOBAL GADGET FILE ===                                  |
// |                  Changes to this page affect many users.                                |
// |                      You probably shouldn't edit it.                                    |
// |_________________________________________________________________________________________|
//
// Fixing Wikia's search. -- [[User:Green tentacle]]

function fixGoButton()
{
    $("#searchGoButton").bind("click", function()
    {
        if ($("#searchInput").val() != "")
        {
            window.location = "//starwars.wikia.com/wiki/" + $("#searchInput").val().replace(" ", "_");
            return false;
        }
    });
}
 
addOnloadHook(fixGoButton);
 
// </nowiki></pre>