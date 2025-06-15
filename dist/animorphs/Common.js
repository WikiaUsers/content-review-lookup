/****** JavaScripts by user Sorunome ******/

/* Make infoboxes hidable */
/*
document.getElementById("InfoboxHidableContent").style = "display:block;";
document.getElementById("InfoboxHideButton").innerHTML = "[Hide]";
HideInfobox=false;
function InfoboxHide()
{
if (InfoboxHide)
{
document.getElementById("InfoboxHidableContent").style = "display:block;";
document.getElementById("InfoboxHideButton").innerHTML = "[Hide]";
} else {
document.getElementById("InfoboxHidableContent").style = "display:none;";
document.getElementById("InfoboxHideButton").innerHTML = "[Show]";
}
InfoboxHide=!InfoboxHide;
}
*/

// Checks if a div with the id "OK_image" is clicked and then adds a
// "display:none" style attribute to a div with the id "notice".

document.getElementById("OK_image").addEventListener("click", function() {
    $('#notice').fadeOut(400, function () {
        this.style.display = "none";
    });
});