/*
	How this works:
	1. A text list is chosen randomly from possibleTexts. Each list's probability is based on its weight.
	2. A single text is then chosen randomly from that chosen list. The chance is equally likely among the list.
	3. That one chosen text is displayed as the header community name.
	
	Note: weights of the lists don't need to add up to 100. They're all relative.
*/

var possibleTexts = [
    // Common - Weight 75000000
    {
        texts: [
			"Create your own characters!",
			"Find your own path!",
			"Make what you want to make!",
			"Where will you wander?",
			"Find solace in absurdity!",
			"Fan-made ideas since 2011!",
			"Hop on PvZCC!",
			"Don't forget to join the Discord Server!",
			"Come on down to PvZCC!",
			"We have a Discord Server!",
			"BREAK IT LIKE YOU MEAN IT, HARVEY!",
			"Defend your shins!",
			"Because I'm CRAAAZY!!!!!",
			"You have to hit him in the pancreas!",
			"The zombies are coming!",
			"The plants are growing!",
			"You are valid!",
			"You are welcome here!",
			"I'm glad you're here!",
			"Abnormal and wacky!",
			"Scroll down and start reading!",
			"Made with lots and lots of love!",
			"Everybody get up!",
			"Hotter than the sun!",
			"Rooted into the ground!",
			"Be constructive!",
			"For the gardeners in all of us!",
			"The grass is greener!",
			"Welcome to Zomburbia!",
			"Any time is zombie time!",
			"Brainz! I feel like dancing!",
			"The zombies are going!",
			"It's about time!",
			"You got this!",
			"Break it open!",
			"It's adorable!",
			"Smells like Durians...",
			"What?!",
			"I am a splash text. Notice me!",
			"Insert splash text here",
			"I burped in my helmet!",
			"The perfect crime!",
			"This is not the splash text you're looking for!",
			"Look ma, I'm on a splash text!",
			"11 herbs and spices!",
			"Historically inaccurate!",
			"Lo-fi beets to study to!",
			"Contains nuts!",
			"Hours of fun! Days, even!",
			"A brand-new splash text, just for you!",
			"Contains infinite splash texts!",
			"Send us a postcard!",
			"What did you just say?",
			"Vengeful and savage!",
			"Dressed up in fancy clothes!",
			"We've been waiting for you!",
			"Album coming soon!",
			"You've goat mail!",
			"Plenty more where that came from!",
			"Can you dig it?",
			"Can't stop, won't stop!",
			"Same day shipping!",
			"Wow, that's crazy!",
			"Don't forget to breathe!",
			"As seen on TV!",
			"Raising the moat!",
			"Bigger! Better! Bagels!",
			"Try it out!",
			"That is a fact!",
			"Run it under cold water!",
			"Are you not entertained?",
			"Take a dip in our pool!",
			"Bountiful!",
			"Under the light of a thousand stars!",
			"Food fight!",
			"The exclamation mark ran away",
			"It's a wild world out there!",
			"Say cheese!",
			"It's giving botany!",
			"Get shuffled into my deck!",
			"Making tea in the treehouse!",
			"Pickles on a sandwich!",
			"Every copy is personalized!",
			"Overwhelmingly underwhelming!",
			"Underwhelmingly overwhelming!",
			"Invisible graveyards!",
			"Drop the bomb!",
			"Excellent wiki content!",
			"Forced to be creative!",
			"On the run!",
			"Blissfully unaware!",
			"Smash attack!",
			"Rolling on the floor!",
			"Love wins!",
			"Outhouse compatible!",
			"Closed Captions: ON!",
			"Time to bring out the eggs!",
			"Morally ambiguous!",
			"PvZCC Presents: Quality Content",
			"Don't feed Chomper after midnight!",
			"Touch grass!",
			"I can see my house from here!",
			"Repeater with an eyepatch!",
			"Happy International Pizza Day!",
			"Featuring inconsistent color palettes!",
			"Aloha Fridays!",
			"Noooooooooo!",
			"ಠ_ಠ",
			"PvZCC Presents: Greg",
			"Then It Go Fart Fart Fart!",
			"My eyes are up here!",
			"Rustling my jimmies!",
			"Contains way too much syrup!",
			"Reasonable difficulty progression!",
			"Check out the Creative Hub!",
			"Tell us your stories!",
			"Snorkel gear not included!",
			"Ungh! Ungh! Ungh! Aaaah!",
			"I'm a gnome! I'm a garden gnome!",
			"OddLy PlaCed CaPitAL leTTerS!",
			"Why is it so quiet?",
			"Keep calm and plant on!",
			"Plantastic adventures await!",
			"Zomb-tastic fun!",
			"Spread your roots!",
			"Sprout your ideas!",
			"OK Bloomer!",
			"Embrace the Church of Flag!",
			"Your days are numbered!",
			"The root of all evil!",
			"Reap what you sow!",
			"A garden of possibilities!",
			"The grass is greener, as am I!",
			"Planting seeds of change!",
			"Did someone turn off the lights?",
			"What's going on out there?",
			"It's a bird, it's a plane, it's Snapdragon!",
			"Secret Sundays!",
			"What!?",
			"Let it rip!",
			"Okerdookie!",
			"Heck no!",
			"Sugar, spice, and Italian ice!",
			"Ominous splash text!",
			"It's a bad omen!",
			"Reload the page! I'm changing!",
			"Rule #1: it's never my fault!",
			"Rule #2: there is no Rule #2!",
			"Rule #3: panic!",
			"Rule #4: I'm gonna get you!",
			"This joke is beyond dead!",
			"Can you change a lightbulb!",
			"We have nothing left!",
			"Gone fishing!",
			"Add extra ketchup!",
			"Cowabunga!",
			"Making tree in the teahouse!",
			"Peace, love, and plants!",
			"People in shoe costumes are scary!",
			"Held together by duct tape and glue!",
			"This wiki can smell you! Take a shower!",
			"The sweet, sweet smell of victory!",
			"Constantly evolving!",
			"I saw what you deleted!",
			"Send first responders!",
			"Stop! Hammer time!",
			"Tell me the truth!",
			"What were you doing last night?",
			"Turn your device off and touch some grass!",
			"Cover your ears!",
			"It's time to get constructive!",
			"Melodious!",
			"YOU ARE BEING WATCHED",
			"Fanboys of the DS!",
			"It's just a fallacy...",
			"Why are you doing this?",
			"Whoops! There's nuttin' to see here!",
			"We know what you did!",
			"Approved by Tugboat!",
			"Ough...",
			"Also try HARP!",
			"Low riders!",
			"Rustling my jimmies!",
			"Too much syrup!",
			"What do you see?",
			"Plenty of time!",
			"Doggone!",
			"Oh gawrsh!",
			"Ham and the Swiss!",
			"Herding the sheep!",
			"Sheeping the herd?",
			"This is not an adequate splash.",
			"!esreveR !esreveR",
			"Vanquish Master!",
			"Heal Master!",
			"First Strike!",
			"Assist Master!",
			"Thanks, lad!",
			"Cheerio, mate!",
			"Restricted access!",
			"Hot diggity dog!",
			"No, really!",
			"The previous splash text was false!",
			"The previous splash text was true!",
			"Perpendicular lines!",
			"Picturesque Nature 1400 and 1!",
			"Have you tried thinking?"
        ],
        weight: 75000000
    },
    // Staff Member 1 Star - Weight 450000
    {
        texts: [
            "💚 DsFanboy!",
            "💚 DMdarkmatter!",
            "💚 WiLdCaRd2048!",
            "🩵 Dartichoke Enjoyer!",
            "🩵 Fun Animator!",
            "💜 AsterWasTaken!",
            "💜 DolphiGaming!",
            "💜 Miss Pembroke!"
        ],
        weight: 450000
    },
        // Staff Member 2 Star - Weight 300000
    {
        texts: [
            "💚💚 DsFanboy!",
            "💚💚 DMdarkmatter!",
            "💚💚 WiLdCaRd2048!",
            "🩵🩵 Dartichoke Enjoyer!",
            "🩵🩵 Fun Animator!",
            "💜💜 AsterWasTaken!",
            "💜💜 DolphiGaming!",
            "💜💜 Miss Pembroke!"
        ],
        weight: 300000
    },
        // Staff Member 3 Star - Weight 150000
    {
        texts: [
            "💚💚💚 DsFanboy!",
            "💚💚💚 DMdarkmatter!",
            "💚💚💚 WiLdCaRd2048!",
            "🩵🩵🩵 Dartichoke Enjoyer!",
            "🩵🩵🩵 Fun Animator!",
            "💜💜💜 AsterWasTaken!",
            "💜💜💜 DolphiGaming!",
            "💜💜💜 Miss Pembroke!"
        ],
        weight: 150000
    },
        // Featured Article 1 Star - Weight 350000
    {
        texts: [
            "🏆 Stoplight Zombie!",
            "🏆 Leechee!",
            "🏆 Mecha-Sleigh Elf!",
            "🏆 Popsicle Stick!",
            "🏆 Poppyrazzi!",
            "🏆 Mountain Climber Zombie!",
            "🏆 Impactus!",
            "🏆 Granny Smith!",
            "🏆 Mangosling!",
            "🏆 Touch-Me-Not!",
            "🏆 The Great Aloekazam!",
            "🏆 Plants vs. Zombies: Lost World!",
            "🏆 Sea Serpent Zombie!",
            "🏆 Welderberry!",
            "🏆 Satellime!",
            "🏆 Wealth Wreath!",
            "🏆 Plants vs. Zombies: Kingdom of Taco!",
            "🏆 Armadillimp!",
            "🏆 Plants vs. Zombies: Wildside!",
            "🏆 Endoparasitic Unlifeform!",
            "🏆 Plants vs. Zombies: The Last Reminiscence!",
            "🏆 Mellow Memories!",
            "🏆 Plants vs. Zombies: The Wacky House!",
            "🏆 Durian-Pult!",
            "🏆 Shroom Moors!",
            "🏆 Dragon Dancer Zombie!",
            "🏆 Active Volcanoes!",
            "🏆 Plants vs. Zombies: Build Your Lawn! 2!",
            "🏆 Ghostest With the Mostest!",
            "🏆 Dream Catcher!",
            "🏆 Downtrodden Legionary!",
            "🏆 Smoothie Shaker Zombie!",
            "🏆 Kasa-Shroom!",
            "🏆 Screamer Zombie!",
            "🏆 Zompop-Star!",
            "🏆 Deserted Canyon!",
            "🏆 Arrowwood!",
            "🏆 Scarecrop!",
            "🏆 Calamity Cone Zombie!",
            "🏆 Pulpverizer!"
        ],
        weight: 350000
    },
        // Featured Article 2 Stars - Weight 200000
    {
        texts: [
            "🏆🏆 Stoplight Zombie!",
            "🏆🏆 Leechee!",
            "🏆🏆 Mecha-Sleigh Elf!",
            "🏆🏆 Popsicle Stick!",
            "🏆🏆 Poppyrazzi!",
            "🏆🏆 Mountain Climber Zombie!",
            "🏆🏆 Impactus!",
            "🏆🏆 Granny Smith!",
            "🏆🏆 Mangosling!",
            "🏆🏆 Touch-Me-Not!",
            "🏆🏆 The Great Aloekazam!",
            "🏆🏆 Plants vs. Zombies: Lost World!",
            "🏆🏆 Sea Serpent Zombie!",
            "🏆🏆 Welderberry!",
            "🏆🏆 Satellime!",
            "🏆🏆 Wealth Wreath!",
            "🏆🏆 Plants vs. Zombies: Kingdom of Taco!",
            "🏆🏆 Armadillimp!",
            "🏆🏆 Plants vs. Zombies: Wildside!",
            "🏆🏆 Endoparasitic Unlifeform!",
            "🏆🏆 Plants vs. Zombies: The Last Reminiscence!",
            "🏆🏆 Mellow Memories!",
            "🏆🏆 Plants vs. Zombies: The Wacky House!",
            "🏆🏆 Durian-Pult!",
            "🏆🏆 Shroom Moors!",
            "🏆🏆 Dragon Dancer Zombie!",
            "🏆🏆 Active Volcanoes!",
            "🏆🏆 Plants vs. Zombies: Build Your Lawn! 2!",
            "🏆🏆 Ghostest With the Mostest!",
            "🏆🏆 Dream Catcher!",
            "🏆🏆 Downtrodden Legionary!",
            "🏆🏆 Smoothie Shaker Zombie!",
            "🏆🏆 Kasa-Shroom!",
            "🏆🏆 Screamer Zombie!",
            "🏆🏆 Zompop-Star!",
            "🏆🏆 Deserted Canyon!",
            "🏆🏆 Arrowwood!",
            "🏆🏆 Scarecrop!",
            "🏆🏆 Calamity Cone Zombie!",
            "🏆🏆 Pulpverizer!"
        ],
        weight: 200000
    },
        // Featured Article 3 Stars - Weight 50000
    {
        texts: [
            "🏆🏆🏆 Stoplight Zombie!",
            "🏆🏆🏆 Leechee!",
            "🏆🏆🏆 Mecha-Sleigh Elf!",
            "🏆🏆🏆 Popsicle Stick!",
            "🏆🏆🏆 Poppyrazzi!",
            "🏆🏆🏆 Mountain Climber Zombie!",
            "🏆🏆🏆 Impactus!",
            "🏆🏆🏆 Granny Smith!",
            "🏆🏆🏆 Mangosling!",
            "🏆🏆🏆 Touch-Me-Not!",
            "🏆🏆🏆 The Great Aloekazam!",
            "🏆🏆🏆 Plants vs. Zombies: Lost World!",
            "🏆🏆🏆 Sea Serpent Zombie!",
            "🏆🏆🏆 Welderberry!",
            "🏆🏆🏆 Satellime!",
            "🏆🏆🏆 Wealth Wreath!",
            "🏆🏆🏆 Plants vs. Zombies: Kingdom of Taco!",
            "🏆🏆🏆 Armadillimp!",
            "🏆🏆🏆 Plants vs. Zombies: Wildside!",
            "🏆🏆🏆 Endoparasitic Unlifeform!",
            "🏆🏆🏆 Plants vs. Zombies: The Last Reminiscence!",
            "🏆🏆🏆 Mellow Memories!",
            "🏆🏆🏆 Plants vs. Zombies: The Wacky House!",
            "🏆🏆🏆 Durian-Pult!",
            "🏆🏆🏆 Shroom Moors!",
            "🏆🏆🏆 Dragon Dancer Zombie!",
            "🏆🏆🏆 Active Volcanoes!",
            "🏆🏆🏆 Plants vs. Zombies: Build Your Lawn! 2!",
            "🏆🏆🏆 Ghostest With the Mostest!",
            "🏆🏆🏆 Dream Catcher!",
            "🏆🏆🏆 Downtrodden Legionary!",
            "🏆🏆🏆 Smoothie Shaker Zombie!",
            "🏆🏆🏆 Kasa-Shroom!",
            "🏆🏆🏆 Screamer Zombie!",
            "🏆🏆🏆 Zompop-Star!",
            "🏆🏆🏆 Deserted Canyon!",
            "🏆🏆🏆 Arrowwood!",
            "🏆🏆🏆 Scarecrop!",
            "🏆🏆🏆 Calamity Cone Zombie!",
            "🏆🏆🏆 Pulpverizer!"
        ],
        weight: 50000
    },
    // Former Staff Member 1 Star - Weight 45000
    {
        texts: [
            "👻💚 PunjiChocoBerry!",
            "👻💜 Creepes."
        ],
        weight: 45000
    },
    // Former Staff Member 2 Stars - Weight 30000
    {
        texts: [
            "👻💚💚 PunjiChocoBerry!",
            "👻💜💜 Creepes."
        ],
        weight: 30000
    },
    // Former Staff Member 3 Stars - Weight 15000
    {
        texts: [
            "👻💚💚💚 PunjiChocoBerry!",
            "👻💜💜💜 Creepes."
        ],
        weight: 15000
    },
    // Legendary 1 Star - Weight 350
    {
        texts: [
            "🤪 Skibidi bibidi!"
        ],
        weight: 350
    },
    // Legendary 2 Stars - Weight 200
    {
        texts: [
            "🤪🤪 Skibidi bibidi!"
        ],
        weight: 200
    },
    // Legendary 3 Stars - Weight 50
    {
        texts: [
            "🤪🤪🤪 Skibidi bibidi!"
        ],
        weight: 50
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