/* swy: try to get rid of the Wikia/Oasis image lazy-loading behavior; fight JS with more JS */
document.addEventListener('DOMContentLoaded', function()
{
    console.log("[swy] Loading the lazy-loader prevention thingie.");
 
    var query = document.querySelectorAll(".lzyPlcHld");
 
    for (var i in query)
    {
        var e = query[i];
 
        if (!e.attributes)
            continue;
 
        if (!e.attributes["data-src"])
            continue;
 
        e.src = e.attributes["data-src"].textContent;
 
        e.classList.remove("lzy");
        e.classList.remove("lzyPlcHld");
        e.classList.remove("lzyTrns");
        e.classList.remove("lzyLoaded");
 
        e.removeAttribute("onload");
        e.onload = null;
 
        console.log("  [i] fixing img", e);
    }
});