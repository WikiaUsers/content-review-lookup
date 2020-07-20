//See http://www.mediawiki.org/wiki/Extension:WikiLove for basic documentation on configuration.
//<nowiki>

// Adding falafel to food options
$.wikiLoveOptions.types.food.subtypes.falafel = {
    fields: [ 'header', 'message' ], // fields to ask for in form
    option: 'Falafel', // option listed in the select list
    descr: 'Falafel is a popular Middle Eastern street food made from ground chickpeas or fava beans and topped with salads, vegetables, and sauces. It is typically served in a pocket of pita bread.',
    header: 'Some falafel for you!', // header that appears at the top of the talk page post (optional)
    image: 'Falafel award.png', // image for the item
    imageSize: '120px' // size to display image (optional)
};

// Adding more kitten images ^-.-^
$.wikiLoveOptions.types.kitten.gallery.imageList = ['Cucciolo gatto Bibo.jpg', 'Kitten (06) by Ron.jpg', 'Kitten-stare.jpg', 'Red Kitten 01.jpg', 'Kitten in a helmet.jpg', 'Cute grey kitten.jpg', 'Iris cat.jpg', 'Young cats.jpg', 'Youngkitten.JPG'];

//</nowiki>