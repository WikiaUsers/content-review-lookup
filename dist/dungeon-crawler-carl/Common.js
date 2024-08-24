/* Any JavaScript here will be loaded for all users on every page load. */

/* Function to generate a random number */
function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/* Code to randomly change site title on desktop */
	//Array of possible strings
	const wikiNames = ["A champion has fallen", "Added to the Dungeon Codex", "Am I a joke to you, Carl?", "Blood, Tears, Taxes, and Lawyers", "Chicken and Goblin recipes galore!", "Don't call me by my special name", "Don't gaslight me, Jesus!", "Dungeon Crawler World Fanwiki", "Enthusiastic. Double. Gonorrhea.", "Eventual death. And eventual justice.", "Free Mana Toast! One per crawler!", "Fun for the whole family!", "Goddamnit Donut!", "Grand Champion Best in Dungeon", "HI ZEV!", "I DON'T HAVE THUMBS, CARL", "I DON'T LIKE BEING STABBED, CARL", "I swear it, I swear it, I swear it", "I will break them all", "I will kill your mother!", "I wish to cook a feast for the whole galaxy", "I'm going to show you what I do now.", "If you gotta lose, lose big", "Imani, come touch Carl", "IT CAME OFF LIKE A PIECE OF CHICKEN", "Judge. We wish for judgment", "Just little seeds here and there", "Keeping the best of you alive", "Kill them with style", "Meadow Lark Elder Care Facility Homepage", "Mongo is appalled!", "New Achievement!", "Now both of you hug", "Now get out there and kill, kill, kill", "One.", "Side by side we will exact our revenge", "The dungeon groaned", "There sure were a lot of babies in there", "THIS IS A BETRAYAL MOST FOUL.", "This is Wondercrawl", "Viva la revolución, Carl", "Welcome, Crawler", "Why does that cat always type in all caps?", "YOOHOO", "You are me. That is who this book finds.", "You can't save them all", "You sent them all off to die in my Dungeon", "You will not break me", "You're a bully, and nobody likes you", "YOUR LAST SPONSOR GAVE YOU A VEGETABLE"];
	//Random array element
	const wikiNameNumber = randomIntFromInterval(0, wikiNames.length-1);
	//Set value
	const elements = document.getElementsByClassName('fandom-community-header__community-name');
	elements[0].textContent = wikiNames[wikiNameNumber];