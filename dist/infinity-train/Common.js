/* Username */
if (wgUserName != 'null') {
	$('.insertusername').html(wgUserName);
}

//User Tags
window.UserTagsJS = {modules: {}, tags: {}};
UserTagsJS.modules.inactive = 60;
UserTagsJS.modules.autoconfirmed = true;
UserTagsJS.modules.mwGroups = ['patroller', 'chatmoderator'];

/* Toolbar*/
window.BackToTopModern = true;

/* Spoiler*/
document.getElementById("spoilers_image").addEventListener("click", function() {
    $('#spoilers').fadeOut(400, function () {
        this.style.display = "none";
    });
});