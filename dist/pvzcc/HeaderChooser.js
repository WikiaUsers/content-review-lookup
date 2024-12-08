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
			"🎄Deck the lawn!",
			"🎄Have you been naughty or nice?",
			"🎄Snow much fun!",
			"🎄You're on the naughty list!",
			"🎄Jingle all the way!",
			"🎄You're on the nice list!",
			"🎄It's snowing so hard right now!",
			"🎄It's sweet! Too sweet!",
			"🎄Freeze the day!",
			"🎄Holiday cheer incoming!",
			"🎄Lights, plants, action!",
			"🎄Ho ho ho! Plants grow grow grow!",
			"🎄Frostbite fight!",
			"🎄Chill and thrill!",
			"🎄Kiss me under the mistletoe?",
			"🎄Unwrap the action! Unwrap the presents!",
			"🎄Snowball showdown! Woah!",
			"🎄Tinsel-tough plants!",
			"🎄Do you see what I did there?",
			"🎄Jolly good defense!",
			"🎄Zombies hate wrapping paper!",
			"🎄Yule love this!",
			"🎄Grinch-proof gardens!",
			"🎄Have a happy Feastivus!",
			"🎄Season's eatings!",
			"🎄Warm wishes, cool plants!",
			"🎄Peppermint power!",
			"🎄Festive firepower!",
			"🎄Holiday survival guide!",
			"🎄Merry me!",
			"🎄Sleigh the zombies!",
			"🎄It's giving festive awesomeness!",
			"🎄Sleigh, queen!",
			"🎄Sleigh, king!",
			"🎄Sleigh, monarch!",
			"🎄Keep calm and plant on!",
			"🎄Gift-wrapped victory!",
			"🎄Silent plants, deadly night!",
			"🎄Holly jolly showdown!",
			"🎄Winter plant wonderland!",
			"🎄Frosty foes fall fast!",
			"🎄Let it grow! Let it grow! Let it grow!",
			"🎄Twinkle, twinkle, little Starfruit!",
			"🎄Snowball fights and plant bites!",
			"🎄Holiday hero mode!",
			"🎄Please help me.",
			"🎄Mistletoe madness!",
			"🎄That's such an ugly sweater!",
			"🎄Eat my cookie!",
			"🎄Celebrate, then cultivate!"
        ],
        weight: 650000
    },
    // Staff Member 1 Star - Weight 450000
    {
        texts: [
            "🎄💚 DsFlanboy!",
            "🎄💚 DMdarkdonner!",
            "🎄💚 JiNgLeBelLs2048!",
            "🎄🩵 December Enjoyer!",
            "🎄🩵 Festive Animator!",
            "🎄🩵 Miss Partridge!",
            "🎄💜 AdventWasTaken!",
            "🎄💜 RudolphiGaming!",
            "🎄💜 404That'sAnEggnog!"
        ],
        weight: 450000
    },
        // Staff Member 2 Star - Weight 300000
    {
        texts: [
            "🎄💚💚 DsFlanboy!",
            "🎄💚💚 DMdarkdonner!",
            "🎄💚💚 JiNgLeBelLs2048!",
            "🎄🩵🩵 December Enjoyer!",
            "🎄🩵🩵 Festive Animator!",
            "🎄🩵🩵 Miss Partridge!",
            "🎄💜💜 AdventWasTaken!",
            "🎄💜💜 RudolphiGaming!",
            "🎄💜💜 404That'sAnEggnog!"
        ],
        weight: 300000
    },
        // Staff Member 3 Star - Weight 15000
    {
        texts: [
            "🎄💚💚💚 DsFlanboy!",
            "🎄💚💚💚 DMdarkdonner!",
            "🎄💚💚💚 JiNgLeBelLs2048!",
            "🎄🩵🩵🩵 December Enjoyer!",
            "🎄🩵🩵🩵 Festive Animator!",
            "🎄🩵🩵🩵 Miss Partridge!",
            "🎄💜💜💜 AdventWasTaken!",
            "🎄💜💜💜 RudolphiGaming!",
            "🎄💜💜💜 404That'sAnEggnog!"
        ],
        weight: 15000
    },
        // Featured Article 1 Star - Weight 350000
    {
        texts: [
            "🎄🏆 Starlight Zombie!",
            "🎄🏆 Leecheer!",
            "🎄🏆 Mecha-Sleigh Elf!",
            "🎄🏆 Popsicle Stick!",
            "🎄🏆 Jollyrazzi!",
            "🎄🏆 Impactelf!",
            "🎄🏆 Granny Snow!",
            "🎄🏆 Mangosleigh!",
            "🎄🏆 Gift-Me-Not!",
            "🎄🏆 The Generous Aloekazam!",
            "🎄🏆 Plants vs. Zombies: List World!",
            "🎄🏆 Slush Serpent Zombie!",
            "🎄🏆 Winterberry!",
            "🎄🏆 Stockinglime!",
            "🎄🏆 Wealth Wreath!",
            "🎄🏆 Plants vs. Zombies: Kingdom of Tinsel!",
            "🎄🏆 Arctillimp!",
            "🎄🏆 Plants vs. Zombies: Winterside!",
            "🎄🏆 Endopartridgeitic Unlifeform!",
            "🎄🏆 Plants vs. Zombies: The Last Reindeer!",
            "🎄🏆 Merry Memories!",
            "🎄🏆 Plants vs. Zombies: The Gingerbread House!",
            "🎄🏆 Delight-Pult!",
            "🎄🏆 Snowman Moors!",
            "🎄🏆 Advent Volcanoes!",
            "🎄🏆 Plants vs. Zombies: Deck Your Lawn! 2!",
            "🎄🏆 Giftest With the Miftest!",
            "🎄🏆 Drift Catcher!",
            "🎄🏆 Gingerbread Legionary!",
            "🎄🏆 Slushie Shaker Zombie!",
            "🎄🏆 Krampusa-Shroom!",
            "🎄🏆 Caroler Zombie!",
            "🎄🏆 Zompop-Star!",
            "🎄🏆 Desert-ed Canyon!",
            "🎄🏆 Carolwood!",
            "🎄🏆 Scarecookie!",
            "🎄🏆 Jinglamity Bell Zombie!",
            "🎄🏆 Nogverizer!",
            "🎄🏆 The Santa-tuary!",
            "🎄🏆 Crumbling Cobelisk!",
            "🎄🏆 Cozy Characters Clash!",
            "🎄🏆 3D Wrapper Zombie!",
            "🎄🏆 Doctor Zombieflake!"
        ],
        weight: 350000
    },
        // Featured Article 2 Stars - Weight 200000
    {
        texts: [
            "🎄🏆🏆 Starlight Zombie!",
            "🎄🏆🏆 Leecheer!",
            "🎄🏆🏆 Mecha-Sleigh Elf!",
            "🎄🏆🏆 Popsicle Stick!",
            "🎄🏆🏆 Jollyrazzi!",
            "🎄🏆🏆 Impactelf!",
            "🎄🏆🏆 Granny Snow!",
            "🎄🏆🏆 Mangosleigh!",
            "🎄🏆🏆 Gift-Me-Not!",
            "🎄🏆🏆 The Generous Aloekazam!",
            "🎄🏆🏆 Plants vs. Zombies: List World!",
            "🎄🏆🏆 Slush Serpent Zombie!",
            "🎄🏆🏆 Winterberry!",
            "🎄🏆🏆 Stockinglime!",
            "🎄🏆🏆 Wealth Wreath!",
            "🎄🏆🏆 Plants vs. Zombies: Kingdom of Tinsel!",
            "🎄🏆🏆 Arctillimp!",
            "🎄🏆🏆 Plants vs. Zombies: Winterside!",
            "🎄🏆🏆 Endopartridgeitic Unlifeform!",
            "🎄🏆🏆 Plants vs. Zombies: The Last Reindeer!",
            "🎄🏆🏆 Merry Memories!",
            "🎄🏆🏆 Plants vs. Zombies: The Gingerbread House!",
            "🎄🏆🏆 Delight-Pult!",
            "🎄🏆🏆 Snowman Moors!",
            "🎄🏆🏆 Advent Volcanoes!",
            "🎄🏆🏆 Plants vs. Zombies: Deck Your Lawn! 2!",
            "🎄🏆🏆 Giftest With the Miftest!",
            "🎄🏆🏆 Drift Catcher!",
            "🎄🏆🏆 Gingerbread Legionary!",
            "🎄🏆🏆 Slushie Shaker Zombie!",
            "🎄🏆🏆 Krampusa-Shroom!",
            "🎄🏆🏆 Caroler Zombie!",
            "🎄🏆🏆 Zompop-Star!",
            "🎄🏆🏆 Desert-ed Canyon!",
            "🎄🏆🏆 Carolwood!",
            "🎄🏆🏆 Scarecookie!",
            "🎄🏆🏆 Jinglamity Bell Zombie!",
            "🎄🏆🏆 Nogverizer!",
            "🎄🏆🏆 The Santa-tuary!",
            "🎄🏆🏆 Crumbling Cobelisk!",
            "🎄🏆🏆 Cozy Characters Clash!",
            "🎄🏆🏆 3D Wrapper Zombie!",
            "🎄🏆🏆 Doctor Zombieflake!"
        ],
        weight: 200000
    },
        // Featured Article 3 Stars - Weight 5000
    {
        texts: [
           "🎄🏆🏆🏆 Starlight Zombie!",
            "🎄🏆🏆🏆 Leecheer!",
            "🎄🏆🏆🏆 Mecha-Sleigh Elf!",
            "🎄🏆🏆🏆 Popsicle Stick!",
            "🎄🏆🏆🏆 Jollyrazzi!",
            "🎄🏆🏆🏆 Impactelf!",
            "🎄🏆🏆🏆 Granny Snow!",
            "🎄🏆🏆🏆 Mangosleigh!",
            "🎄🏆🏆🏆 Gift-Me-Not!",
            "🎄🏆🏆🏆 The Generous Aloekazam!",
            "🎄🏆🏆🏆 Plants vs. Zombies: List World!",
            "🎄🏆🏆🏆 Slush Serpent Zombie!",
            "🎄🏆🏆🏆 Winterberry!",
            "🎄🏆🏆🏆 Stockinglime!",
            "🎄🏆🏆🏆 Wealth Wreath!",
            "🎄🏆🏆🏆 Plants vs. Zombies: Kingdom of Tinsel!",
            "🎄🏆🏆🏆 Arctillimp!",
            "🎄🏆🏆🏆 Plants vs. Zombies: Winterside!",
            "🎄🏆🏆🏆 Endopartridgeitic Unlifeform!",
            "🎄🏆🏆🏆 Plants vs. Zombies: The Last Reindeer!",
            "🎄🏆🏆🏆 Merry Memories!",
            "🎄🏆🏆🏆 Plants vs. Zombies: The Gingerbread House!",
            "🎄🏆🏆🏆 Delight-Pult!",
            "🎄🏆🏆🏆 Snowman Moors!",
            "🎄🏆🏆🏆 Advent Volcanoes!",
            "🎄🏆🏆🏆 Plants vs. Zombies: Deck Your Lawn! 2!",
            "🎄🏆🏆🏆 Giftest With the Miftest!",
            "🎄🏆🏆🏆 Drift Catcher!",
            "🎄🏆🏆🏆 Gingerbread Legionary!",
            "🎄🏆🏆🏆 Slushie Shaker Zombie!",
            "🎄🏆🏆🏆 Krampusa-Shroom!",
            "🎄🏆🏆🏆 Caroler Zombie!",
            "🎄🏆🏆🏆 Zompop-Star!",
            "🎄🏆🏆🏆 Desert-ed Canyon!",
            "🎄🏆🏆🏆 Carolwood!",
            "🎄🏆🏆🏆 Scarecookie!",
            "🎄🏆🏆🏆 Jinglamity Bell Zombie!",
            "🎄🏆🏆🏆 Nogverizer!",
            "🎄🏆🏆🏆 The Santa-tuary!",
            "🎄🏆🏆🏆 Crumbling Cobelisk!",
            "🎄🏆🏆🏆 Cozy Characters Clash!",
            "🎄🏆🏆🏆 3D Wrapper Zombie!",
            "🎄🏆🏆🏆 Doctor Zombieflake!"
        ],
        weight: 5000
    },
    // Former Staff Member 1 Star - Weight 45000
    {
        texts: [
            "🎄👻💚 PunjiHotCocoBerry!",
            "🎄👻💜 Naughty Creepes."
        ],
        weight: 45000
    },
    // Former Staff Member 2 Stars - Weight 30000
    {
        texts: [
            "🎄👻💚💚 PunjiHotCocoBerry!",
            "🎄👻💜💜 Naughty Creepes."
        ],
        weight: 30000
    },
    // Former Staff Member 3 Stars - Weight 1500
    {
        texts: [
            "🎄👻💚💚💚 PunjiHotCocoBerry!",
            "🎄👻💜💜💜 Naughty Creepes."
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