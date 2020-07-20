// This allows the inserting of Category:New article templates
// TODO: Known bug is that if text area has been clicked prior to inserting the template it will not work.

$(document).ready(function() {
    // Check for the source editor
    if (document.body.classList.contains("editor")) {
        // Brickfilms
        document.getElementById("new-template-btn-brickfilms").addEventListener("click", function() {
            insertWikiTextFromPage("Template:Brickfilms_article_template");
        });
        // Brickfilmers
        document.getElementById("new-template-btn-brickfilmers").addEventListener("click", function() {
            insertWikiTextFromPage("Template:Brickfilmer_article_template");
        });
        // Contests
        document.getElementById("new-template-btn-contests").addEventListener("click", function() {
            insertWikiTextFromPage("Template:Contest_article_template");
        });
    }
});

/**
 * Fetch a page's contents in Wiki Text and insert into the editor window's text area
 * @param {String} pageName The name of the page to insert
 */
function insertWikiTextFromPage(pageName) {
    $.get("/api.php?action=parse&page=" + pageName + "&prop=wikitext&format=xmlfm")
        .done(function(data){
        console.log("Successfully fetched " + pageName + "'s contents!");

        var check = confirm("The contents of the text area below will be replaced with that of " + pageName);
        if (check) {
            // Parse as xml
            data = $.parseXML(data);

            // Convert the XML to text
            var xmlText = new XMLSerializer().serializeToString(data);

            // Get the useful bit of the XML
            var start_pos = xmlText.indexOf('{');
            var end_pos = xmlText.indexOf('<span', xmlText.indexOf('references'));
            xmlText = xmlText.substring(start_pos, end_pos);

            // Remove html tags and fix < and > symbols
            var cleanText = xmlText.replace(/<\/?[^>]+(>|$)/g, "").replace(/&amp;lt;/g, "<").replace(/&amp;gt;/g, ">");

            // Output to text area
            document.querySelector("#wpTextbox1").innerHTML = cleanText;
        }
    })
        .fail(function(){
        alert("Something went wrong!");
    });
}