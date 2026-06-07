// Checks if a div with the id "OK_image" is clicked and then adds a
// "display:none" style attribute to a div with the id "notice".

document.getElementById("OK_image").addEventListener("click", function() {
    $('#notice').fadeOut(400, function () {
        this.style.display = "none";
    });
});