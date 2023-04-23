/* Any JavaScript here will be loaded for all users on every page load. */
function removeSpoiler(e){
	e.target.classList = [];
}
window.addEventListener('load', function(){
	var spoilers = document.getElementsByClassName("spoiler");
	if(spoilers.length > 0){
		for(var i = 0; i < spoilers.length; i++){
			spoilers[i].addEventListener("click", removeSpoiler);
		}
	}
});