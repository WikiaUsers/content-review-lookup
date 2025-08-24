/* Community Header Name */
var wiki_names = [/* Games */
"POINT OF NO RETURN. Wiki",
"The Beginning And The End Wiki",
"ESCAPE EVIL HOSPITAL OBBY!! Wiki",
/* Scrapped POINT NO RETURN. Titles */
"DON'T MAKE THIS DIFFICULT Wiki", 
"ONE MAN'S FINAL EFFORT Wiki", 
"TICKING TIME Wiki", 
"DEVIL'S ADVOCATE Wiki", 
"START ANEW Wiki", 
"PLEASE, LEAVE ME BE Wiki", 
/* Development Team */
"Wasted Time Studios Wiki",
/* Thumbnail Messages */
"Welcome to Dorthpeck", 
"Enjoy your stay!", 
"Rest easy", 
/* Character Messages */
"Don't make this difficult.",
"FREEDOM AT LAST",
"ZOMG!!!",
"Just this once, I hope you'll listen.",
"Collect my pages.",
"...",
"CHEATER.",
/* Narrator & Loading Screens Messages */
"Don't go into weird pages.",
"These messages are kinda useless.",
"Try not to miss anything before you sleep.",
"Manage your time.",
"Talk to everyone. They know more than you do.",
"Dude. I'm just the narrator. Don't ask me.",
"Stanley walked through the red door.",
"Do not oversleep.",
"More will come in the future!",
"Stuck? Maybe trying again will help.",
"Stay radical.",
"Over 31 messages! Can you find them all?"];
var wiki_name_number = Math.floor(Math.random() * wiki_names.length);
var elements = document.getElementsByClassName('fandom-community-header__community-name');
elements[0].textContent = wiki_names[wiki_name_number];