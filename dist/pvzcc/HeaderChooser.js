/*
	How this works:
	1. A text list is chosen randomly from possibleTexts. Each list's probability is based on its weight.
	2. A single text is then chosen randomly from that chosen list. The chance is equally likely among the list.
	3. That one chosen text is displayed as the header community name.
	
	Note: weights of the lists don't need to add up to 100. They're all relative.
*/
var possibleTexts = [
    // Common - Weight 1000000000
    {
        texts: [
            "🎃 Boo!",
            "🎃 Aaaaaagh!",
            "🎃 The night is full of creeps and Creepes!",
            "🎃 Nothing is scarier than Creepes!",
            "🎃 Get tricked, loser!",
            "🎃 Get treated, lovely boy!",
            "🎃 Get treated, lovely girl!",
            "🎃 Get treated, lovely them!",
            "🎃 Spooky scary skeletons!",
            "🎃 The jack-o-lantern. Muahahaha!",
            "🎃 Beware the Sour Moon!",
            "🎃 A sour scare is in store!",
            "🎃 I tinted you green! You're sour!",
            "🎃 Get your scary face on!",
            "🎃 All costumed up!",
            "🎃 Don't buy chocolate with almonds!",
            "🎃 Dentures for Halloween!",
            "🎃 Lawn of Soury Doom!",
            "🎃 Awoooo!",
            "🎃 I'm turning evil!",
            "🎃 Super buff strong werewolves!",
            "🎃 Cause it's thriller! Thriller night!",
            "🎃 Fun sized candy!",
            "🎃 I got a rock.",
            "🎃 I vant to suck your blood!",
            "🎃 NOOO! THE SUN!",
            "🎃 Thursday the 31st!",
            "🎃 Go to hell.",
            "🎃 I'm throwing you into the cauldron!",
            "🎃 I'm hot to dog! What? SOUR!!!",
            "🎃 Entering the haunted mansion!",
            "🎃 Monster mash!",
            "🎃 I ate fifteen pounds of candy! I cannot feel my bones!",
            "🎃 Sour? More like... shower! You smell.",
            "🎃 Trudging through the Sour Graveyard!"
        ],
        weight: 5000000
    },
    // Staff Member 1 Star - Weight 450000
    {
        texts: [
            "🎃💚 DsFrightboy!",
            "🎃💚 DMbrainmatter!",
            "🎃💚 WiTcHcRaFt2048!",
            "🎃🩵 Dreadichoke Enjoyer!",
            "🎃🩵 Fear Animator!",
            "🎃💜 AsterWasShaken!",
            "🎃💜 GhoulphiGaming!",
            "🎃💜 Miss Tombbroke!"
        ],
        weight: 450000
    },
        // Staff Member 2 Star - Weight 300000
    {
        texts: [
            "🎃💚💚 DsFrightboy!",
            "🎃💚💚 DMbrainmatter!",
            "🎃💚💚 WiTcHcRaFt2048!",
            "🎃🩵🩵 Dreadichoke Enjoyer!",
            "🎃🩵🩵 Fear Animator!",
            "🎃💜💜 AsterWasShaken!",
            "🎃💜💜 GhoulphiGaming!",
            "🎃💜💜 Miss Tombbroke!"
        ],
        weight: 300000
    },
        // Staff Member 3 Star - Weight 15000
    {
        texts: [
            "🎃💚💚💚 DsFrightboy!",
            "🎃💚💚💚 DMbrainmatter!",
            "🎃💚💚💚 WiTcHcRaFt2048!",
            "🎃🩵🩵🩵 Dreadichoke Enjoyer!",
            "🎃🩵🩵🩵 Fear Animator!",
            "🎃💜💜💜 AsterWasShaken!",
            "🎃💜💜💜 GhoulphiGaming!",
            "🎃💜💜💜 Miss Tombbroke!"
        ],
        weight: 15000
    },
        // Featured Article 1 Star - Weight 350000
    {
        texts: [
        	"🎃🏆 Stopfright Zombie!",
            "🎃🏆 Screamchee!",
            "🎃🏆 Mecha-Slay Elf!",
            "🎃🏆 Popscare Stick!",
            "🎃🏆 Spookyrazzi!",
            "🎃🏆 Mountain Creeper Zombie!",
            "🎃🏆 Impacterror!",
            "🎃🏆 Granny Shriek!",
            "🎃🏆 Mangle-sling!",
            "🎃🏆 Touch-Me-Scream!",
            "🎃🏆 The Great Aghastkazam!",
            "🎃🏆 Plants vs. Zombies: Lost Souls!",
            "🎃🏆 Sea Serpent Ghoul!",
            "🎃🏆 Wailerberry!",
            "🎃🏆 Spookellite!",
            "🎃🏆 Wealth Wraith!",
            "🎃🏆 Plants vs. Zombies: Kingdom of Terror!",
            "🎃🏆 Armashrillimp!",
            "🎃🏆 Plants vs. Zombies: Wildfright!",
            "🎃🏆 Endoparasitic Undeadform!",
            "🎃🏆 Plants vs. Zombies: The Last Possession!",
            "🎃🏆 Mellow Malice!",
            "🎃🏆 Plants vs. Zombies: The Wicked House!",
            "🎃🏆 Scare-ian-Pult!",
            "🎃🏆 Gloom Moors!",
            "🎃🏆 Dragon Haunter Zombie!",
            "🎃🏆 Screaming Volcanoes!",
            "🎃🏆 Plants vs. Zombies: Build Your Nightmare! 2!",
            "🎃🏆 Ghostest with the Mostest!",
            "🎃🏆 Scream Catcher!",
            "🎃🏆 Downtrodden Revenant!",
            "🎃🏆 Spooky Shaker Zombie!",
            "🎃🏆 Kasa-Shriek!",
            "🎃🏆 Screecher Zombie!",
            "🎃🏆 Zompocalypse-Star!",
            "🎃🏆 Deserted Haunt!",
            "🎃🏆 Arrow-wail!",
            "🎃🏆 Scarecrop!",
            "🎃🏆 Calamity Crypt Zombie!",
            "🎃🏆 Pulpgeistverizer!",
            "🎃🏆 The Spooktuary!",
            "🎃🏆 Cursed Creepobelist!"
        ],
        weight: 350000
    },
        // Featured Article 2 Stars - Weight 200000
    {
        texts: [
        	"🎃🏆🏆 Stopfright Zombie!",
            "🎃🏆🏆 Screamchee!",
            "🎃🏆🏆 Mecha-Slay Elf!",
            "🎃🏆🏆 Popscare Stick!",
            "🎃🏆🏆 Spookyrazzi!",
            "🎃🏆🏆 Mountain Creeper Zombie!",
            "🎃🏆🏆 Impacterror!",
            "🎃🏆🏆 Granny Shriek!",
            "🎃🏆🏆 Mangle-sling!",
            "🎃🏆🏆 Touch-Me-Scream!",
            "🎃🏆🏆 The Great Aghastkazam!",
            "🎃🏆🏆 Plants vs. Zombies: Lost Souls!",
            "🎃🏆🏆 Sea Serpent Ghoul!",
            "🎃🏆🏆 Wailerberry!",
            "🎃🏆🏆 Spookellite!",
            "🎃🏆🏆 Wealth Wraith!",
            "🎃🏆🏆 Plants vs. Zombies: Kingdom of Terror!",
            "🎃🏆🏆 Armashrillimp!",
            "🎃🏆🏆 Plants vs. Zombies: Wildfright!",
            "🎃🏆🏆 Endoparasitic Undeadform!",
            "🎃🏆🏆 Plants vs. Zombies: The Last Possession!",
            "🎃🏆🏆 Mellow Malice!",
            "🎃🏆🏆 Plants vs. Zombies: The Wicked House!",
            "🎃🏆🏆 Scare-ian-Pult!",
            "🎃🏆🏆 Gloom Moors!",
            "🎃🏆🏆 Dragon Haunter Zombie!",
            "🎃🏆🏆 Screaming Volcanoes!",
            "🎃🏆🏆 Plants vs. Zombies: Build Your Nightmare! 2!",
            "🎃🏆🏆 Ghostest with the Mostest!",
            "🎃🏆🏆 Scream Catcher!",
            "🎃🏆🏆 Downtrodden Revenant!",
            "🎃🏆🏆 Spooky Shaker Zombie!",
            "🎃🏆🏆 Kasa-Shriek!",
            "🎃🏆🏆 Screecher Zombie!",
            "🎃🏆🏆 Zompocalypse-Star!",
            "🎃🏆🏆 Deserted Haunt!",
            "🎃🏆🏆 Arrow-wail!",
            "🎃🏆🏆 Scarecrop!",
            "🎃🏆🏆 Calamity Crypt Zombie!",
            "🎃🏆🏆 Pulpgeistverizer!",
            "🎃🏆🏆 The Spooktuary!",
            "🎃🏆🏆 Cursed Creepobelist!"
        ],
        weight: 200000
    },
        // Featured Article 3 Stars - Weight 5000
    {
        texts: [
        	"🎃🏆🏆🏆 Stopfright Zombie!",
            "🎃🏆🏆🏆 Screamchee!",
            "🎃🏆🏆🏆 Mecha-Slay Elf!",
            "🎃🏆🏆🏆 Popscare Stick!",
            "🎃🏆🏆🏆 Spookyrazzi!",
            "🎃🏆🏆🏆 Mountain Creeper Zombie!",
            "🎃🏆🏆🏆 Impacterror!",
            "🎃🏆🏆🏆 Granny Shriek!",
            "🎃🏆🏆🏆 Mangle-sling!",
            "🎃🏆🏆🏆 Touch-Me-Scream!",
            "🎃🏆🏆🏆 The Great Aghastkazam!",
            "🎃🏆🏆🏆 Plants vs. Zombies: Lost Souls!",
            "🎃🏆🏆🏆 Sea Serpent Ghoul!",
            "🎃🏆🏆🏆 Wailerberry!",
            "🎃🏆🏆🏆 Spookellite!",
            "🎃🏆🏆🏆 Wealth Wraith!",
            "🎃🏆🏆🏆 Plants vs. Zombies: Kingdom of Terror!",
            "🎃🏆🏆🏆 Armashrillimp!",
            "🎃🏆🏆🏆 Plants vs. Zombies: Wildfright!",
            "🎃🏆🏆🏆 Endoparasitic Undeadform!",
            "🎃🏆🏆🏆 Plants vs. Zombies: The Last Possession!",
            "🎃🏆🏆🏆 Mellow Malice!",
            "🎃🏆🏆🏆 Plants vs. Zombies: The Wicked House!",
            "🎃🏆🏆🏆 Scare-ian-Pult!",
            "🎃🏆🏆🏆 Gloom Moors!",
            "🎃🏆🏆🏆 Dragon Haunter Zombie!",
            "🎃🏆🏆🏆 Screaming Volcanoes!",
            "🎃🏆🏆🏆 Plants vs. Zombies: Build Your Nightmare! 2!",
            "🎃🏆🏆🏆 Ghostest with the Mostest!",
            "🎃🏆🏆🏆 Scream Catcher!",
            "🎃🏆🏆🏆 Downtrodden Revenant!",
            "🎃🏆🏆🏆 Spooky Shaker Zombie!",
            "🎃🏆🏆🏆 Kasa-Shriek!",
            "🎃🏆🏆🏆 Screecher Zombie!",
            "🎃🏆🏆🏆 Zompocalypse-Star!",
            "🎃🏆🏆🏆 Deserted Haunt!",
            "🎃🏆🏆🏆 Arrow-wail!",
            "🎃🏆🏆🏆 Scarecrop!",
            "🎃🏆🏆🏆 Calamity Crypt Zombie!",
            "🎃🏆🏆🏆 Pulpgeistverizer!",
            "🎃🏆🏆🏆 The Spooktuary!",
            "🎃🏆🏆🏆 Cursed Creepobelist!"
        ],
        weight: 5000
    },
    // Former Staff Member 1 Star - Weight 45000
    {
        texts: [
            "🎃👻💚 PunjiChocoScary!",
            "🎃👻💜 Creepies."
        ],
        weight: 45000
    },
    // Former Staff Member 2 Stars - Weight 30000
    {
        texts: [
            "🎃👻💚💚 PunjiChocoScary!",
            "🎃👻💜💜 Creepies."
        ],
        weight: 30000
    },
    // Former Staff Member 3 Stars - Weight 1500
    {
        texts: [
            "🎃👻💚💚💚 PunjiChocoScary!",
            "🎃👻💜💜💜 Creepies."
        ],
        weight: 1500
    },
    // Legendary 1 Star - Weight 350
    {
        texts: [
            "🎃🤪 Send Sani a screenshot of this to get 6 Sour Ponies! One-time use."
        ],
        weight: 175
    },
    // Legendary 2 Stars - Weight 200
    {
        texts: [
            "🎃🤪🤪 Send Sani a screenshot of this to get 14 Sour Ponies! One-time use."
        ],
        weight: 100
    },
    // Legendary 3 Stars - Weight 5
    {
        texts: [
            "🎃🤪🤪🤪 Send Sani a screenshot of this to get 31 Sour Ponies! One-time use."
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