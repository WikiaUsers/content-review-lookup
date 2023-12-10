// append '&format=original' to the url source of specified images
$( function() {
	$('.mw-parser-output img').each( function() {
		var imagename = $(this).attr('data-image-name');
		if ((imagename.match(/^Sprite/) != null) || (imagename.match(/^NPC/) != null) || (imagename.match(/^Artifact/) != null) || (imagename.match(/^Icon/) != null) || (imagename.match(/^Equipment/) != null) || (imagename.match(/^Costume/) != null)) {
			$(this).attr('src', $(this).attr('src') + '&format=original');
		}
	});
});

// add tabindex="-1" to tooltipped itemboxes to retain focus on click
var itemboxTooltip = document.querySelectorAll('.custom-tooltip .itembox');
itemboxTooltip.forEach(function(element) {
	element.tabIndex = -1;
});

// hide LastEdited's summary and modal
if (!window.lastEdited) {
	window.lastEdited = { diffModal: false, comment: false };
}

// loop the video inside class="videoloop"
var videoLoop = document.querySelectorAll('.videoloop video');
if (videoLoop) {
	videoLoop.forEach(function(video) {
		video.loop = true;
	});
}

// add default aspect-ratio to hero illustrations to animate `aspect-ratio` states in [[Template:HeroGallery]]
var heroCard = document.querySelectorAll('.card__hero');
if (heroCard.length > 0) {
	heroCard.forEach(function(cardHero) {
		var image = cardHero.querySelector('img, video');
		image.style.setProperty('--illust-aspect-ratio', image.getAttribute('width') + ' \/ ' + image.getAttribute('height'));
	});
}

// use original image on map-edit page for lossless quality and accuracy
if (window.location.search === "?action=mapedit") {
	setTimeout(function () {
		var image = document.querySelector(".leaflet-image-layer");
		image.src += "&format=original";
	}, 5000);
}