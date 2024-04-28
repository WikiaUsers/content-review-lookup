/* Any JavaScript here will be loaded for all users on every page load. */

/* Function to generate a random number */
function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/* Code to randomly change site title on desktop */
	//Array of possible strings
	const wikiNames = ["Goddamnit Donut!", "You will not break me", "I will break them all", "One.", "Just little seeds here and there", "You're a bully, and nobody likes you", "You sent them all off to die in my Dungeon", "I'm going to show you what I do now.", "If you gotta lose, lose big", "HI ZEV!", "Mongo is appalled!", "YOUR LAST SPONSOR GAVE YOU A VEGETABLE", "I DON'T LIKE BEING STABBED, CARL", "Grand Champion Best in Dungeon", "I DON'T HAVE THUMBS, CARL", "There sure were a lot of babies in there", "Don't gaslight me, Jesus!", "THIS IS A BETRAYAL MOST FOUL.", "Am I a joke to you, Carl?", "Viva la revolución, Carl", "IT CAME OFF LIKE A PIECE OF CHICKEN", "Why does that cat always type in all caps?", "I will kill your mother!", "YOOHOO", "Don't call me by my special name", "Now both of you hug",  "New Achievement!", "Free Mana Toast! One per crawler!", "A champion has fallen", "The dungeon groaned", "Enthusiastic. Double. Gonorrhea.", "Chicken and Goblin recipes galore!", "Fun for the whole family!", "Imani, come touch Carl", "Keeping the best of you alive", "Blood, Tears, Taxes, and Lawyers", "Now get out there and kill, kill, kill", "I swear it, I swear it, I swear it", "Side by side we will exact our revenge", "I wish to cook a feast for the whole galaxy", "Eventual death. And eventual justice.","You are me. That is who this book finds.", "You can't save them all", "Judge. We wish for judgment", "Meadow Lark Elder Care Facility Homepage"];
	//Random array element
	const wikiNameNumber = randomIntFromInterval(0, wikiNames.length-1);
	//Set value
	const elements = document.getElementsByClassName('fandom-community-header__community-name');
	elements[0].textContent = wikiNames[wikiNameNumber];