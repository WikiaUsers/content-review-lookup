/* Wiki Names */
var wiki_names = ["Welcome to Dorthpeck", "Do not oversleep.", "Just this once, I hope you'll listen.", "Enjoy your stay!", "Rest easy", "Manage your time.", "Stanley walked through the red door.", "Talk to everyone. They know more than you do.", "Try not to miss anything before you sleep.", "...", "FREEDOM AT LAST", "Don't make this difficult.", "Collect my pages.", "ZOMG!!!", "CHEATER.", "Over 15 messages! Can you find them all?"];
var wiki_name_number = -1;
while (wiki_name_number < 0 || wiki_name_number > wiki_names.length) {
  wiki_name_number = Math.random().toFixed(2) * 100;
}
var elements = document.getElementsByClassName('fandom-community-header__community-name');
elements[0].textContent = wiki_names[wiki_name_number];