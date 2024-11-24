/*
	How this works:
	1. A text list is chosen randomly from possibleTexts. Each list's probability is based on its weight.
	2. A single text is then chosen randomly from that chosen list. The chance is equally likely among the list.
	3. That one chosen text is displayed as the header community name.
	
	Note: weights of the lists don't need to add up to 100. They're all relative.
*/

var possibleTexts = [
    // Common - Weight 50000000
    {
        texts: [
			"👹 Shrek wants you to submit to the Crafties!",
			"👹 Get outta my swamp!",
			"👹 Layers like an onion!",
			"👹 What are you doin' in my wiki?",
			"👹 Better out than in, I always say!",
			"👹 Live like an ogre!",
			"👹 Wow! Let's do that again!",
			"👹 I like that boulder! That is a nice boulder!",
			"👹 Wake up and smell the pheromones!",
			"👹 It ain't over 'til it's ogre!",
			"👹 Oh! Pick me! Pick me! Me! Me! Meeee!",
			"👹 There's an arrow in your butt!",
			"👹 Some of you may die, but it's a sacrifice I'm willing to make!",
			"👹 Don't mess wit' me. I'm the Stair Master. I've mastered the stairs. I wish I had a step right here, I could step here and here and here and step all over it.",
			"👹 Check yourself before you Shrek yourself!"
        ],
        weight: 500000
    },
    // Staff Member 1 Star - Weight 450000
    {
        texts: [
            "👹💚 DsFarquaad!",
            "👹💚 DMgingerbread!",
            "👹💚 rUmPeLsTiLtSkIn2048!",
            "👹🩵 Dragon Enjoyer!",
            "👹🩵 Fiona Animator!",
            "👹💜 OgrewasTaken!",
            "👹💜 DonkeyGaming!",
            "👹💜 Pussbroke In Boots!"
        ],
        weight: 450000
    },
        // Staff Member 2 Star - Weight 300000
    {
        texts: [
            "👹💚💚 DsFarquaad!",
            "👹💚💚 DMgingerbread!",
            "👹💚💚 rUmPeLsTiLtSkIn2048!",
            "👹🩵🩵 Dragon Enjoyer!",
            "👹🩵🩵 Fiona Animator!",
            "👹💜💜 OgrewasTaken!",
            "👹💜💜 DonkeyGaming!",
            "👹💜💜 Pussbroke In Boots!"
        ],
        weight: 300000
    },
        // Staff Member 3 Star - Weight 15000
    {
        texts: [
            "👹💚💚💚 DsFarquaad!",
            "👹💚💚💚 DMgingerbread!",
            "👹💚💚💚 rUmPeLsTiLtSkIn2048!",
            "👹🩵🩵🩵 Dragon Enjoyer!",
            "👹🩵🩵🩵 Fiona Animator!",
            "👹💜💜💜 OgrewasTaken!",
            "👹💜💜💜 DonkeyGaming!",
            "👹💜💜💜 Pussbroke In Boots!"
        ],
        weight: 15000
    },
        // Featured Article 1 Star - Weight 350000
    {
        texts: [
            "👹🏆 Shreklight Zombie!",
            "👹🏆 Ogreechee!",
            "👹🏆 Mecha-Sleigh Ogre!",
            "👹🏆 Shreksicle Stick!",
            "👹🏆 Donkeyrazzi!",
            "👹🏆 Swampland Climber Zombie!",
            "👹🏆 Swampactus!",
            "👹🏆 Granny Witch!",
            "👹🏆 Mangogre!",
            "👹🏆 Peel-Me-Not!",
            "👹🏆 The Green Aloekazam!",
            "👹🏆 Plants vs. Zombies: Lost Swamp!",
            "👹🏆 Sea Dragon Zombie!",
            "👹🏆 Gingerberry Man!",
            "👹🏆 Donkellime!",
            "👹🏆 Shrek Shreath!",
            "👹🏆 Plants vs. Zombies: Kingdom Far Far Away!",
            "👹🏆 Armadillio!",
            "👹🏆 Plants vs. Zombies: Wildswamp!",
            "👹🏆 Endoparasitic Unlifefiona!",
            "👹🏆 Plants vs. Zombies: The Fairy Tale Reminiscence!",
            "👹🏆 Merlin Memories!",
            "👹🏆 Plants vs. Zombies: The Wacky Shack!",
            "👹🏆 Ogrean-Pult!",
            "👹🏆 Shroom Marsh!",
            "👹🏆 Actively Stinkin' Swamps!",
            "👹🏆 Plants vs. Zombies: Build Yer Bog! 2!",
            "👹🏆 Ghostest with the Grossest!",
            "👹🏆 Donkey Catcher!",
            "👹🏆 Mudtrodden Legionary!",
            "👹🏆 Muddy Smoothie Shaker Ogre!",
            "👹🏆 Shrekaka-shroom!",
            "👹🏆 Howler Zombie!",
            "👹🏆 Zomp-Swamp Star!",
            "👹🏆 Flooded Canyon!",
            "👹🏆 Onionwood!",
            "👹🏆 Sir Scarecropalot!",
            "👹🏆 Calamity Cone Zombie!",
            "👹🏆 Swampverizer!",
            "👹🏆 The Shrektuary!",
            "👹🏆 Cursed Logbelisk!",
            "👹🏆 Creatures Clash!",
            "👹🏆 Shrek Sculptor Zombie!",
            "👹🏆 King Zombiestein!"
        ],
        weight: 350000
    },
        // Featured Article 2 Stars - Weight 200000
    {
        texts: [
            "👹🏆🏆 Shreklight Zombie!",
            "👹🏆🏆 Ogreechee!",
            "👹🏆🏆 Mecha-Sleigh Ogre!",
            "👹🏆🏆 Shreksicle Stick!",
            "👹🏆🏆 Donkeyrazzi!",
            "👹🏆🏆 Swampland Climber Zombie!",
            "👹🏆🏆 Swampactus!",
            "👹🏆🏆 Granny Witch!",
            "👹🏆🏆 Mangogre!",
            "👹🏆🏆 Peel-Me-Not!",
            "👹🏆🏆 The Green Aloekazam!",
            "👹🏆🏆 Plants vs. Zombies: Lost Swamp!",
            "👹🏆🏆 Sea Dragon Zombie!",
            "👹🏆🏆 Gingerberry Man!",
            "👹🏆🏆 Donkellime!",
            "👹🏆🏆 Shrek Shreath!",
            "👹🏆🏆 Plants vs. Zombies: Kingdom Far Far Away!",
            "👹🏆🏆 Armadillio!",
            "👹🏆🏆 Plants vs. Zombies: Wildswamp!",
            "👹🏆🏆 Endoparasitic Unlifefiona!",
            "👹🏆🏆 Plants vs. Zombies: The Fairy Tale Reminiscence!",
            "👹🏆🏆 Merlin Memories!",
            "👹🏆🏆 Plants vs. Zombies: The Wacky Shack!",
            "👹🏆🏆 Ogrean-Pult!",
            "👹🏆🏆 Shroom Marsh!",
            "👹🏆🏆 Actively Stinkin' Swamps!",
            "👹🏆🏆 Plants vs. Zombies: Build Yer Bog! 2!",
            "👹🏆🏆 Ghostest with the Grossest!",
            "👹🏆🏆 Donkey Catcher!",
            "👹🏆🏆 Mudtrodden Legionary!",
            "👹🏆🏆 Muddy Smoothie Shaker Ogre!",
            "👹🏆🏆 Shrekaka-shroom!",
            "👹🏆🏆 Howler Zombie!",
            "👹🏆🏆 Zomp-Swamp Star!",
            "👹🏆🏆 Flooded Canyon!",
            "👹🏆🏆 Onionwood!",
            "👹🏆🏆 Sir Scarecropalot!",
            "👹🏆🏆 Calamity Cone Zombie!",
            "👹🏆🏆 Swampverizer!",
            "👹🏆🏆 The Shrektuary!",
            "👹🏆🏆 Cursed Logbelisk!",
            "👹🏆🏆 Creatures Clash!",
            "👹🏆🏆 Shrek Sculptor Zombie!",
            "👹🏆🏆 King Zombiestein!"
        ],
        weight: 200000
    },
        // Featured Article 3 Stars - Weight 5000
    {
        texts: [
            "👹🏆🏆🏆 Shreklight Zombie!",
            "👹🏆🏆🏆 Ogreechee!",
            "👹🏆🏆🏆 Mecha-Sleigh Ogre!",
            "👹🏆🏆🏆 Shreksicle Stick!",
            "👹🏆🏆🏆 Donkeyrazzi!",
            "👹🏆🏆🏆 Swampland Climber Zombie!",
            "👹🏆🏆🏆 Swampactus!",
            "👹🏆🏆🏆 Granny Witch!",
            "👹🏆🏆🏆 Mangogre!",
            "👹🏆🏆🏆 Peel-Me-Not!",
            "👹🏆🏆🏆 The Green Aloekazam!",
            "👹🏆🏆🏆 Plants vs. Zombies: Lost Swamp!",
            "👹🏆🏆🏆 Sea Dragon Zombie!",
            "👹🏆🏆🏆 Gingerberry Man!",
            "👹🏆🏆🏆 Donkellime!",
            "👹🏆🏆🏆 Shrek Shreath!",
            "👹🏆🏆🏆 Plants vs. Zombies: Kingdom Far Far Away!",
            "👹🏆🏆🏆 Armadillio!",
            "👹🏆🏆🏆 Plants vs. Zombies: Wildswamp!",
            "👹🏆🏆🏆 Endoparasitic Unlifefiona!",
            "👹🏆🏆🏆 Plants vs. Zombies: The Fairy Tale Reminiscence!",
            "👹🏆🏆🏆 Merlin Memories!",
            "👹🏆🏆🏆 Plants vs. Zombies: The Wacky Shack!",
            "👹🏆🏆🏆 Ogrean-Pult!",
            "👹🏆🏆🏆 Shroom Marsh!",
            "👹🏆🏆🏆 Actively Stinkin' Swamps!",
            "👹🏆🏆🏆 Plants vs. Zombies: Build Yer Bog! 2!",
            "👹🏆🏆🏆 Ghostest with the Grossest!",
            "👹🏆🏆🏆 Donkey Catcher!",
            "👹🏆🏆🏆 Mudtrodden Legionary!",
            "👹🏆🏆🏆 Muddy Smoothie Shaker Ogre!",
            "👹🏆🏆🏆 Shrekaka-shroom!",
            "👹🏆🏆🏆 Howler Zombie!",
            "👹🏆🏆🏆 Zomp-Swamp Star!",
            "👹🏆🏆🏆 Flooded Canyon!",
            "👹🏆🏆🏆 Onionwood!",
            "👹🏆🏆🏆 Sir Scarecropalot!",
            "👹🏆🏆🏆 Calamity Cone Zombie!",
            "👹🏆🏆🏆 Swampverizer!",
            "👹🏆🏆🏆 The Shrektuary!",
            "👹🏆🏆🏆 Cursed Logbelisk!",
            "👹🏆🏆🏆 Creatures Clash!",
            "👹🏆🏆🏆 Shrek Sculptor Zombie!",
            "👹🏆🏆🏆 King Zombiestein!"
        ],
        weight: 5000
    },
    // Former Staff Member 1 Star - Weight 45000
    {
        texts: [
            "👹👻💚 DonkeyMongoFairy!",
            "👹👻💜 Shreepes."
        ],
        weight: 45000
    },
    // Former Staff Member 2 Stars - Weight 30000
    {
        texts: [
            "👹👻💚💚 DonkeyMongoFairy!",
            "👹👻💜💜 Shreepes."
        ],
        weight: 30000
    },
    // Former Staff Member 3 Stars - Weight 1500
    {
        texts: [
            "👹👻💚💚💚 DonkeyMongoFairy!",
            "👹👻💜💜💜 Shreepes."
        ],
        weight: 1500
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