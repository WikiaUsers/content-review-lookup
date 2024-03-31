/*
	How this works:
	1. A text list is chosen randomly from possibleTexts. Each list's probability is based on its weight.
	2. A single text is then chosen randomly from that chosen list. The chance is equally likely among the list.
	3. That one chosen text is displayed as the header community name.
	
	Note: weights of the lists don't need to add up to 100. They're all relative.
*/

var possibleTexts = [
    {
      texts: ["Create your own characters!", "Find your own path!", "Make what you want to make!", "Where will you wander?", "Find solace in absurdity!", "Smells like Durians...", "Fan-made ideas since 2011!", "Hop on PvZCC!", "Don't forget to join the Discord Server!", "What?!", "Come on down to PvZCC!", "I am a splash text. Notice me!", "Insert splash text here", "We have a Discord Server!", "BREAK IT LIKE YOU MEAN IT, HARVEY!", "Defend your shins!", "Because I'm CRAAAZY!!!!!", "You have to hit him in the pancreas!", "I burped in my helmet!", "The perfect crime!", "This is not the splash text you're looking for!", "Look ma, I'm on a splash text!", "11 herbs and spices!", "The zombies are coming!", "The plants are growing!", "Historically inaccurate!", "Lo-fi beets to study to!", "Contains nuts!", "Hours of fun! Days, even!", "Outhouse compatible!", "Closed Captions: ON!", "A brand-new splash text, just for you!", "Contains infinite splash texts!", "Noooooooooo!", "Send us a postcard!", "What did you just say?", "Time to bring out the eggs!", "You are valid!", "You are welcome here!", "I'm glad you're here!", "Vengeful and savage!", "Dressed up in fancy clothes!", "We've been waiting for you!", "Morally ambiguous!", "PvZCC Presents: Quality Content", "ಠ_ಠ", "Abnormal and wacky!", "Album coming soon!", "You've goat mail!", "Plenty more where that came from!", "Can you dig it?", "Can't stop, won't stop!", "Same day shipping!", "Don't feed Chomper after midnight!", "Scroll down and start reading!", "Wow, that's crazy!", "Don't forget to breathe!", "As seen on TV!", "Made with lots and lots of love!", "Everybody get up!", "Hotter than the sun!", "Rooted into the ground!", "Raising the moat!", "Bigger! Better! Bagels!", "Try it out!", "Touch grass!", "Be constructive!", "That is a fact!", "Run it under cold water!", "Under the light of a thousand stars!", "Food fight!", "Are you not entertained?", "Take a dip in our pool!", "Bountiful!", "For the gardeners in all of us!", "The exclamation mark ran away", "It’s a wild world out there!", "Say cheese!", "The grass is greener!", "It's giving botany!", "Get shuffled into my deck!", "Welcome to Zomburbia!", "Any time is zombie time!", "Brainz! I feel like dancing!", "The zombies are going!", "It's about time!", "Making tea in the treehouse!", "Pickles on a sandwich!", "Every copy is personalized!", "Overwhelmingly underwhelming!", "Underwhelmingly overwhelming!", "You got this!", "I can see my house from here!", "Invisible graveyards!", "Drop the bomb!", "Excellent wiki content!", "Repeater with an eyepatch!","Happy International Pizza Day!","Skibidi bibidi!","Forced to be creative!","PvZCC Presents: Greg!","On the run!","Featuring inconsistent color palettes!"],
      weight: 50
    },
    {
      texts: ["aaaaaaaaaaa", "amougue test"],
      weight: 2
    },
    {
    	texts: ["Raretext", "Somethingsomething"],
    	weight: 1
    }
  ];

var totalWeight = 0;
for (var i = 0; i < possibleTexts.length; i++) {
    totalWeight += possibleTexts[i].weight;
}

var targetWeightSum = Math.random() * totalWeight;

var cumulativeWeight = 0;
var selectedTextList = [];
for (var i = 0; i < possibleTexts.length; i++) {
  var element = possibleTexts[i];
    cumulativeWeight += element.weight;
    if (targetWeightSum < cumulativeWeight) {
      selectedTextList = element.texts;
      break;
    }
}

var chosenIndex = Math.floor(Math.random() * selectedTextList.length);
var chosenText = selectedTextList[chosenIndex];

console.log(chosenText);
var elements = document.getElementsByClassName('fandom-community-header__community-name');
var wikiName = elements[0];
wikiName.textContent = chosenText;