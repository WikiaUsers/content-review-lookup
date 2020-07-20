/*For use on the following page: Past Stages*/

$("#inputArea").append('<input id="searchInput" size="30" type="text" placeholder="Search..">');
 
var searchString = "";
 
function filterTable() {
    $(".stageTable tr:gt(0)").each(function() {
        var isVisible = true;

        if (searchString != "") {
            isVisible = $(this).children().text().toLowerCase().replace("’", "'").indexOf(searchString) > -1;
        }
 
        $(this).toggle(isVisible);
    });
}

$("#searchInput").on("keyup", function() {
    searchString = $(this).val().toLowerCase();
 
    filterTable();
});

$(".showSame").click(function(){
    stageName = $(this).siblings("a").text();
    $("#searchInput").val(stageName);
    searchString = stageName.toLowerCase().replace("’", "'")
    
    filterTable();
});