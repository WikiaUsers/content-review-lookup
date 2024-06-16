/*
	How this works:
	1. A text list is chosen randomly from possibleTexts. Each list's probability is based on its weight.
	2. A single text is then chosen randomly from that chosen list. The chance is equally likely among the list.
	3. That one chosen text is displayed as the header community name.
	
	Note: weights of the lists don't need to add up to 100. They're all relative.
*/

var possibleTexts = [
    // Common - Weight 17500
    {
        texts: [
            "🟥 Create your own characters!",
            "🟥 Find your own path!",
            "🟥 Make what you want to make!",
            "🟥 Where will you wander?",
            "🟥 Find solace in absurdity!",
            "🟥 Fan-made ideas since 2011!",
            "🟥 Hop on PvZCC!",
            "🟥 Don't forget to join the Discord Server!",
            "🟥 Come on down to PvZCC!",
            "🟥 We have a Discord Server!",
            "🟥 BREAK IT LIKE YOU MEAN IT, HARVEY!",
            "🟥 Defend your shins!",
            "🟥 Because I'm CRAAAZY!!!!!",
            "🟥 You have to hit him in the pancreas!",
            "🟥 The zombies are coming!",
            "🟥 The plants are growing!",
            "🟥 You are valid!",
            "🟥 You are welcome here!",
            "🟥 I'm glad you're here!",
            "🟥 Abnormal and wacky!",
            "🟥 Scroll down and start reading!",
            "🟥 Made with lots and lots of love!",
            "🟥 Everybody get up!",
            "🟥 Hotter than the sun!",
            "🟥 Rooted into the ground!",
            "🟥 Be constructive!",
            "🟥 For the gardeners in all of us!",
            "🟥 The grass is greener!",
            "🟥 Welcome to Zomburbia!",
            "🟥 Any time is zombie time!",
            "🟥 Brainz! I feel like dancing!",
            "🟥 The zombies are going!",
            "🟥 It's about time!",
            "🟥 You got this!",
            "🟥 Break it open!",
            "🟥 It's adorable!",
            "🟥 Smells like Durians...",
            "🟥 What?!",
            "🟥 I am a splash text. Notice me!",
            "🟥 Insert splash text here"
        ],
        weight: 17500
    },
    // Rare - Weight 10000
    {
        texts: [
            "🟧 I burped in my helmet!",
            "🟧 The perfect crime!",
            "🟧 This is not the splash text you're looking for!",
            "🟧 Look ma, I'm on a splash text!",
            "🟧 11 herbs and spices!",
            "🟧 Historically inaccurate!",
            "🟧 Lo-fi beets to study to!",
            "🟧 Contains nuts!",
            "🟧 Hours of fun! Days, even!",
            "🟧 A brand-new splash text, just for you!",
            "🟧 Contains infinite splash texts!",
            "🟧 Send us a postcard!",
            "🟧 What did you just say?",
            "🟧 Vengeful and savage!",
            "🟧 Dressed up in fancy clothes!",
            "🟧 We've been waiting for you!",
            "🟧 Album coming soon!",
            "🟧 You've goat mail!",
            "🟧 Plenty more where that came from!",
            "🟧 Can you dig it?",
            "🟧 Can't stop, won't stop!",
            "🟧 Same day shipping!",
            "🟧 Wow, that's crazy!",
            "🟧 Don't forget to breathe!",
            "🟧 As seen on TV!",
            "🟧 Raising the moat!",
            "🟧 Bigger! Better! Bagels!",
            "🟧 Try it out!",
            "🟧 That is a fact!",
            "🟧 Run it under cold water!",
            "🟧 Are you not entertained?",
            "🟧 Take a dip in our pool!",
            "🟧 Bountiful!"
        ],
        weight: 10000
    },
    // Super Rare - Weight 7000
    {
        texts: [
            "🟨 Under the light of a thousand stars!",
            "🟨 Food fight!",
            "🟨 The exclamation mark ran away",
            "🟨 It’s a wild world out there!",
            "🟨 Say cheese!",
            "🟨 It's giving botany!",
            "🟨 Get shuffled into my deck!",
            "🟨 Making tea in the treehouse!",
            "🟨 Pickles on a sandwich!",
            "🟨 Every copy is personalized!",
            "🟨 Overwhelmingly underwhelming!",
            "🟨 Underwhelmingly overwhelming!",
            "🟨 Invisible graveyards!",
            "🟨 Drop the bomb!",
            "🟨 Excellent wiki content!",
            "🟨 Forced to be creative!",
            "🟨 On the run!",
            "🟨 Blissfully unaware!",
            "🟨 Smash attack!",
            "🟨 Rolling on the floor!",
            "🟨 Love wins!"
        ],
        weight: 7000
    },
    // Epic - Weight 3000
    {
        texts: [
            "🟩 Outhouse compatible!",
            "🟩 Closed Captions: ON!",
            "🟩 Time to bring out the eggs!",
            "🟩 Morally ambiguous!",
            "🟩 PvZCC Presents: Quality Content",
            "🟩 Don't feed Chomper after midnight!",
            "🟩 Touch grass!",
            "🟩 I can see my house from here!",
            "🟩 Repeater with an eyepatch!",
            "🟩 Happy International Pizza Day!",
            "🟩 Featuring inconsistent color palettes!",
            "🟩 Aloha Fridays!"
        ],
        weight: 3000
    },
    // Epic - Weight 800
    {
        texts: [
            "🟦 Noooooooooo!",
            "🟦 ಠ_ಠ",
            "🟦 PvZCC Presents: Greg!",
            "🟦 Then It Go Fart Fart Fart!"
        ],
        weight: 800
    },
    // Legendary - Weight 100
    {
        texts: [
            "🟪 Skibidi bibidi!"
        ],
        weight: 100
    },
    // Rainbow - Weight 1
    {
        texts: [
            "🌈 You found the Rainbow Splash! Love wins. Message a staff member for your reward! 😏"
        ],
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