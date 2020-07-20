// Checks if a div with the id "spoilers_image" is clicked and then adds a
// "display:none" style attribute to a div with the id "spoilers".

document.getElementById("spoilers_image").addEventListener("click", function() {
    $('#spoilers').fadeOut(400, function () {
        this.style.display = "none";
    });
});