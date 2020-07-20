/*For use on the following page: Titles System*/

$("#inputArea").append('<input id="searchInput" type="text" placeholder="Search..">');
 
var selectedTypes = [];
var selectedGrades = [];
var searchString = "";
 
function filterTable() {
    $(".titleTable tr:gt(0)").each(function() {
        var condition_types = true;
        var condition_grades = true;
        var condition_string = true;
 
        if (selectedTypes && selectedTypes.length) {
            condition_types = selectedTypes.includes($(this).attr("data-type"));
        }
 
        if (selectedGrades && selectedGrades.length) {
            condition_grades = selectedGrades.includes($(this).attr("data-grade"));
        }
 
        if (searchString != "") {
            condition_string = $(this).text().toLowerCase().indexOf(searchString) > -1;
        }
 
        $(this).toggle(condition_string && condition_grades && condition_types);
    });
}
 
$(".queryButton").click(function(){
    $(this).toggleClass("queryButtonActive");
 
    selectedTypes = [];
    $(".queryButtonActive").each(function(){
        selectedTypes.push($(this).attr("data-type"));
    });
 
    filterTable();
});
 
$(".queryIcon").click(function(){
    $(this).toggleClass("iconOn");
    $(this).toggleClass("iconOff");
 
    selectedGrades = [];
    $(".iconOn").each(function(){
        selectedGrades.push($(this).attr("data-grade"));
    });
 
    filterTable();
});
 
$("#searchInput").on("keyup", function() {
    searchString = $(this).val().toLowerCase();
 
    filterTable();
});