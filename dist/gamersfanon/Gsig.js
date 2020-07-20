// Retrieve the words
var text = $("p").html().split(" ");

// Empty the elment
$("p").empty();

// Iterate over the words
$.each(text, function(i, word) {
    if(i != text.length) {
        word += " "; // Add space after word 
    }
    
     // Get random color
    var colour = '#'+Math.floor(Math.random()*16777215).toString(16);
    
    $("<span>")
        .html(word)
        .css("color", colour)
        .appendTo($("p"));
});