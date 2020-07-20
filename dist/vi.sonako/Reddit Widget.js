/* ================================================== */
/* ====   Reddit Widget                          ==== */
/* ================================================== */
$(function() {
    function Reddit() {
        if ($("#reddit-LN").length == 1) {
            var oScript = document.createElement("script");
            document.write = function(text) {
                document.getElementById("reddit-LN").innerHTML += text;
            };
            oScript.src = "https://www.reddit.com/r/LightNovels/new/.embed?limit=20&t=all&sort=new&twocolumn=true&target=blank";
            document.body.appendChild(oScript);
        } else {
            setTimeout(Reddit, 500); // in this example, the '500' is for waiting 500 milliseconds before checking again
        }
    }
    Reddit();
});