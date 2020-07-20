//****** JavaScripts by user Sorunome ******/

//* Make infoboxes hidable */
document.getElementById("InfoboxHidableContent").style = "display:block;";
document.getElementById("InfoboxHideButton") = "[Hide]";
HideInfobox=false;
function InfoboxHide()
{
if (HideInfobox)
{
document.getElementById("InfoboxHidableContent").style = "display:block;";
document.getElementById("InfoboxHideButton") = "[Hide]";
} else {
document.getElementById("InfoboxHidableContent").style = "display:none;";
document.getElementById("InfoboxHideButton") = "[Show]";
}
InfoboxHide=!InfoboxHide;
}