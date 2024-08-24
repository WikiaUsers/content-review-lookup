/*
    Spotlight for Wikia

    Putting focus on Stuff that (really) matters.
    
    CC-BY-SA Spycrab0, 2015
*/

var version = "r0";
var newCPDiv = $("#new-cp");

var sortBy = [
    "author",
    "released",
    "rating",
    "title"
];

var tableHeader = ["Titel","Bewertung","Autor","Veröffentlicht"];

var exampleTable = [
    {
        title: "Gruselige Geschichte",
        rating: 5.0,
        author: "Batman",
        released: "N/A"
    }
];

function buildTable(header,table,sortBy) {
    var table = $("<table/>");
    var tableHeader = $("<thead/>").appendTo(table);
    var tableBody = $("<tbody/>").appendTo(table);
    for (var i = 0;i < header.length;i++) {
        tableHeader.append($("<td/>",{text: header[i]}).append(
            $("<a/>",{href: "javascript:return;", text: "/\\"}))
        );
    }
    return table;
}