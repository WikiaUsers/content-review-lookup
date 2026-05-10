/*
	How this works:
	1. A text list is chosen randomly from possibleTexts. Each list's probability is based on its weight.
	2. A single text is then chosen randomly from that chosen list. The chance is equally likely among the list.
	3. That one chosen text is displayed as the header community name.
	
	Note: weights of the lists don't need to add up to 100. They're all relative.
	Credits: to PVZCC Wiki for their HeaderChooser.js script. Thank you so much to them!
*/

var possibleTexts = [
    // Greetings & lyric quotes from no na 's songs (Weight: 500000000 so it shows up)
    {
        texts: [
        	"no na wiki",
			"no na wiki | welcome, orchids!",
			"no na wiki | hello, orchids!",
			"no na wiki | springtime in the city...",
			"no na wiki | tryna bleach out the stain...",
			"no na wiki | when you come, when you come home...",
			"no na wiki | you and i were one...",
			"no na wiki | can it be? can it be done?",
			"no na wiki | kembali...",
			"no na wiki | straight for the heart!",
			"no na wiki | don't test me, you know it's POOF!",
			"no na wiki | got you right where i want you...",
			"no na wiki | how you like that, baby?",
			"no na wiki | mhm, i bet you know i do!",
			"no na wiki | your ego ain't bulletproof!",
			"no na wiki | very superstitious...",
			"no na wiki | i'm superstitious!",
			"no na wiki | that's why i'm superstitious...",
			"no na wiki | we can dance on Saturn...",
			"no na wiki | forever-lasting love of mine...",
			"no na wiki | i just say we're fallin' in love...",
			"no na wiki | stay right here and just lay with me...",
			"no na wiki | feel my heart race, and i lose it!",
			"no na wiki | :(",
			"no na wiki | sad face, mad face!",
			"no na wiki | best you never had face!",
			"no na wiki | TMI, patronizing my sanity...",
			"no na wiki | guilt-trippin' over what's her name for...",
			"no na wiki | f**k your sad, sad face!",
			"no na wiki | are you about to meet the one?",
			"no na wiki | say that you'll be the one...",
			"no na wiki | hoping it might be you!",
			"no na wiki | be my one and only...",
			"no na wiki | be the one for me...",
			"no na wiki | could you be the one for me?",
			"no na wiki | you can watch us sizzle!",
			"no na wiki | R to the I to the S to the E!",
			"no na wiki | way too hot to handle!",
			"no na wiki | now, we rise as one!",
			"no na wiki | the best team that unites!",
			"no na wiki | got that lethal touch...",
			"no na wiki | we run the beat when we unite!",
			"no na wiki | got a crew so hot, no riddles!",
			"no na wiki | zero to a hundred, no middle!",
			"no na wiki | get into it! 🔥",
			"no na wiki | put in that 🔥!",
			"no na wiki | go and put in that WORK!",
			"no na wiki | put in that, put in that WORK!",
			"no na wiki | Jakarta to L.A.",
			"no na wiki | girls, it's go time!",
			"no na wiki | pump it up, girl!",
			"no na wiki | f**k it up  girl!",
			"no na wiki | hot a*s b**ch, could be my twin!",
			"no na wiki | work!",
			"no na wiki | moisturizer, get ya eye cream and the serum!",
			"no na wiki | shopping spree, i call that a workout!",
			"no na wiki | lamborghini, how i crash out!",
			"no na wiki | hot n' sweaty, watermelon martini!",
			"no na wiki | i'm the one to call the shots!",
			"no na wiki | gamelan, gamelan, gamelan!",
			"no na wiki | rollerblade! rollerblade!",
			"no na wiki | on my rollerblades!",
			"no na wiki | on my 🛼!",
			"no na wiki | on my sepatu rodaku!",
			"no na wiki | ayy, mari bergoyang!",
			"no na wiki | demonstration, i'm the teacher!",
			"no na wiki | simon says, 'follow the leader'",
			"no na wiki | island girls from Indonesia!",
			"no na wiki | semua mata hanya tertuju padaku!",
			"no na wiki | you wanna berdansa? jangan ragu-ragu!",
			"no na wiki | hit 'em with the red light!",
			"no na wiki | udah siap belom?",
			"no na wiki | wheels on my shoes, so fresh, so baru!",
			"no na wiki | every day of the week, so keren, so asik!",
			"no na wiki | jedag jedug, tiga, dua, satu!",
			"no na wiki | grrah, grrah, grrah!",
			"no na wiki | ride on my dump truck!"
        ],
        weight: 500000000
    },


    // For halloween (Weight: is 1 so it does not show up for now)
    {
        texts: [
        	"no na wiki 🎃",
            "no na wiki | boo! 👻",
            "no na wiki | happy halloween, orchids! 🎃",
            "no na wiki | happy autumn, orchids! 🍂",
            "no na wiki | happy fall, orchids! 🍂",
            "no na wiki | happy thanksgiving month, orchids! 🦃",
            "no na wiki | no na is COMING straight for your heart... 🎃",
            "no na wiki | let, let, let me in your mind... 🎃",
            "no na wiki | i make 'em freak, freak, freak... 🌩️",
            "no na wiki | udah siap belom? 🎃", 
            "no na wiki | back up, bet ya HEAD'S BLOWN... 💀", 
            "no na wiki | what an earthquake, going so CRAYYYYY... 🧟",
            "no na wiki | f**k it up, ghosts! put in that work! 👻",
            "no na wiki | ghosts be feelin' superstitious... 👻",
        ],
        weight: 1
    },
    
    
    // For winter/christmas season (Weight: is 1 so it does not show up for now)
    {
        texts: [
            "no na wiki 🌨️",
            "no na wiki ☃️",
            "no na wiki 🎄",
            "no na wiki 🎆",
            "no na wiki | merry xmas, orchids! 🎄",
            "no na wiki | happy holidays, orchids! 🌨️",
            "no na wiki | selamat hari natal, orchids! 🎄",
            "no na wiki | selamat tahun baru, orchids! 🎆",
            "no na wiki | i see the glimpse of who i used to 'snow' 🌨️",
            "no na wiki | enemies, i watch em freeze! ❄️",
            "no na wiki | jingle bells!",
            "no na wiki | have yourself a merry little christmas! 🎄"
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