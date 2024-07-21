/*
	How this works (the same algorithm as the header text chooser):
	1. An image list is chosen randomly from possibleImages. Each list's probability is based on its weight.
	2. A single image is then chosen randomly from that chosen list. The chance is equally likely among the list.
	3. That one chosen image is displayed as the header image.
	
	Note: weights of the lists don't need to add up to 100. They're all relative.
*/

// Uncomment everything below down to the end of the file to activate it.

var possibleImages = [
	{
        images: [
            "https://static.wikia.nocookie.net/pvzcc/images/0/01/Durian-pult_PvZ2_Almanac.png/revision/latest?cb=20200113090404" //DURIAN PULT
        ],
        weight: 1
    },
    {
        images: [
            "https://images.wikia.com/pvzcc/images/archive/e/e6/20230115165710%21Site-logo.png", // old wiki logo
            "https://static.wikia.nocookie.net/pvzcc/images/6/6f/Mecha-sleigh_Elf.png/revision/latest?cb=20191209081843" // mecha sleigh elf
        ],
        weight: 1
    },
    {
        images: [
            "https://static.wikia.nocookie.net/pvzcc/images/1/1d/Magical_Girl_Zombie.png/revision/latest?cb=20200309035957" // magical girl zombie
        ],
        weight: 1
    },
    {
        images: [
            "https://static.wikia.nocookie.net/pvzcc/images/e/e6/Site-logo.png/revision/latest?cb=20240612135057" // current wiki logo
        ],
        weight: 1
    }
];

var totalWeight = 0;
for (var i = 0; i < possibleImages.length; i++) {
    totalWeight += possibleImages[i].weight;
}

var targetWeightSum = Math.random() * totalWeight;


var cumulativeWeight = 0;
var selectedImageList = [];
for (var i = 0; i < possibleImages.length; i++) {
  var element = possibleImages[i];
    cumulativeWeight += element.weight;
    if (targetWeightSum < cumulativeWeight) {
      selectedImageList = element.images;
      break;
    }
}

var chosenIndex = Math.floor(Math.random() * selectedImageList.length);
var chosenImage = selectedImageList[chosenIndex];

var imgElement = document.querySelector('.fandom-community-header__image img');
imgElement.src = chosenImage;