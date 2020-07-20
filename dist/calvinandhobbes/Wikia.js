/* Opens chat in a new window for homepage */ 
$(".openchat a").click(function() {
   window.open('/wiki/Special:Chat', 'wikiachat', 'width=600,height=600,menubar=no,status=no,location=no,toolbar=no,scrollbars=no,resizable=yes');
   return false;
});


/* Social Media Buttons */
var SocialMediaButtons = { 
	position: "top",
	colorScheme: "color",
	buttonSize: "35px"
};

/* Remove SapphireSonata's Message Wall */
$('.page-Message_Wall_SapphireSonata .Wall.Board').remove();

// Remove DiscordIntegrator on rail
window.onload = function() {
    $('.DiscordIntegratorModule').remove();
}