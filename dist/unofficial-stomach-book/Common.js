/* Any JavaScript here will be loaded for all users on every page load. */
dev:Countdown/code.js
window.UserTagsJS = {
	modules: {},
	tags: {},
	oasisPlaceBefore: ''
};
var wiki_names = ["We're talking real dollars and cents here!" , "FUKOUNA GIRLS!" , "Just spillin' our guts!"];
var wiki_name_number = -1;
while (wiki_name_number < 0 || wiki_name_number > wiki_names.length) {
  wiki_name_number = Math.random().toFixed(2) * 100;
}
var elements = document.getElementsByClassName('fandom-community-header__community-name');
elements[0].textContent = wiki_names[wiki_name_number];
window.AddRailModule = [{prepend: true}];