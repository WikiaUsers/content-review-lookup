/* Any JavaScript here will be loaded for all users on every page load. */
/* ================================================== */
/* ====   Reddit Widget                          ==== */
/* ================================================== */
$(document).ready(function()
{
    var enableWidget = document.getElementById("reddit-widget");
 
    if (enableWidget)
    {
        // Reddit cannot be loaded through appending script tag as homepage has scripts that interferes with reddit script
        var redditWidget = document.createElement("iframe");
        redditWidget.width = "100%";
        enableWidget.appendChild(redditWidget);
 
        // Add the script 
        redditWidget.contentWindow.document.write("<html><head></head><body><script src='https://www.reddit.com/r/TonikakuCawaii/hot/.embed?limit=4&t=all' data-height='200' type='text/javascript'></script></body></html>");
 
        // Readjust height based on how much content reddit widget has
        var tryReadjust = setInterval(function()
        {
            // Take contents of iframe out and put it on page (lol)
            // Otherwise page keeps loading (for some reason), and cannot be clicked because Reddit
            // set X-Frame-options to SAMEORIGIN
            var t = redditWidget.contentDocument.children; 
            t = t[0].getElementsByClassName("rembeddit")[0]; 
            if (t)
            {
                // Have to wait until element exists before taking it out
                document.getElementById("reddit-widget").appendChild(t);
                redditWidget.remove();
                clearInterval(tryReadjust);
            }
        }, 1000);
 
    }
 
});

window.SpoilerAlertJS = {
    question: 'This section contains spoilers. Are you sure you want to read it?',
    yes: 'Yes',
    no: 'No',
    fadeDelay: 500
};