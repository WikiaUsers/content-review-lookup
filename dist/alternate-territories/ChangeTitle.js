// Code was adapted from the Marvel Database.

var names = ["Making Nations Since December 27, 2019!", "The Little Place That I Call Home", "For People And Country, Not King Or General!", "For Liberty, For Peace, For Progress!", "Bow Down To Silva", "REVOLUTION 2023 JUNE!", "Even More Places to Discover!", "The White Sun Will Rise!", "I Hate Peanut Butter!", "Welcome to Our Worlds", "When You're Tired of Earth", "The Red Flame Never Dies", "Countries Formed Out of Thin Air!", "Noting the Locations Since We Were Located In 2021.", "Before Someone Else Asks, No We're Legitimately Fine", "Free the Land of the Scourge!"]; 
 
var elements=$('.fandom-community-header__community-name');
var wiki_name=elements.eq(0);

var previousIndex = -1;
 
function changeNames() {
	var currentIndex = Math.floor(Math.random() * names.length);
	  
	while (currentIndex === previousIndex) {
		currentIndex = Math.floor(Math.random() * names.length);
	}
	  
	previousIndex = currentIndex;
	var item = names[currentIndex];
	  
    wiki_name.fadeOut(500, function() {
		wiki_name.text(item);
		setTimeout(200);
		wiki_name.fadeIn(500);
	});
}
setInterval(changeNames, 5000);