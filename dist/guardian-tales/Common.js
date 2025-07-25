{ // block-scoping

// append '&format=original' to the url source of specified images
// const allImages = document.querySelectorAll('.mw-parser-output img');
// if (allImages.length) {
// 	allImages.forEach(function(image) {
// 		const imageName = image.getAttribute('data-image-name');
// 		const imageSrc = image.getAttribute('data-src');
// 		if (imageName === null) return;
// 		if (imageName.match(/^(Sprite|NPC|Artifact|Icon|Equipment|Costume)/)) {
// 			image.setAttribute('data-src', imageSrc + "&format=original");
// 		}
// 	});
// }

// add tabindex="-1" to tooltipped itemboxes to retain focus on click
const itemboxTooltip = document.querySelectorAll('.custom-tooltip .itembox');
itemboxTooltip.forEach(function(itembox) {
	itembox.tabIndex = -1;
});

// hide LastEdited's summary and modal
// if (!window.lastEdited) {
// 	window.lastEdited = { diffModal: false, comment: false };
// }

// loop the video inside class="videoloop"
mw.hook('wikipage.content').add(function($content) {
	const videoLoop = $content.find('.videoloop');
	if (videoLoop.length) {
		videoLoop.prop('loop', true);
	}
});

// add default aspect-ratio to hero illustrations to animate `aspect-ratio` states in [[Template:Hero card]]
const heroCard = document.querySelectorAll('.card__hero');
if (heroCard.length) {
	heroCard.forEach(function(illust) {
		const image = illust.querySelector('img, video');
		const width = image.getAttribute('width');
		const height = image.getAttribute('height');
		image.style.setProperty('--illust-aspect-ratio', width + ' / ' + height);
	});
}

// replace img src in imagemaps to avoid downscaled image blur
const imageMap = document.querySelector('.imagemap');
if (imageMap) {
	imageMap.src = imageMap.src.replace(/scale-to-width-down.*/, '');
}

// use original image on map-edit page for lossless quality and accuracy
if (window.location.search === "?action=mapedit") {
	setTimeout(function() {
		const mapImage = document.querySelector(".leaflet-image-layer");
		mapImage.src += "&format=original";
	}, 5000);
}

const $kmzTable = $('.kamazone-table');
if ($kmzTable.length) {
	mw.hook('wikipage.collapsibleContent').add(function() {
		$kmzTable.find('.mw-customtoggle').on('click keydown', function(e) {
			if (e.type === 'click' || e.code === 'Enter' || e.code === 'Space') {
				
				// update url hash along with toggling the description cell
				const newUrl = window.location.origin + window.location.pathname + window.location.search + '#' + this.id;
				history.replaceState(true, '', newUrl);

				// toggle aria-expanded on click
				// this is a fix for mediawiki's bug with mw-customtoggles
				const ariaState = $(this).attr('aria-expanded') === 'true';
				$(this).attr('aria-expanded', !ariaState);
			}
		});
	});
}

// preload [[MediaWiki:Custom-PreloadMap.json]] into editor when "Preload" button is clicked

// MediaWiki ?preload=' query doesn't work on map/json content model
// https://www.mediawiki.org/wiki/Manual:Parameters_to_index.php#Options_affecting_the_edit_form

(function() {
	if (mw.config.get('wgPageContentModel') !== 'interactivemap') return;
	if (mw.config.get('wgAction') !== 'edit') return;

	const preloadButton = document.querySelector('.preload-map');
	preloadButton.addEventListener('click', loadJson);

	function loadJson() {
		const editorElem = findAce();
		const editor = ace.edit(editorElem);

		new mw.Api().get({
			titles: "MediaWiki:Custom-PreloadMap.json",
			action: "query",
			prop: "revisions",
			rvslots: "main",
			rvprop: "content",
			format: "json",
			formatversion: 2
		}).done(function(data) {
			const json = data.query.pages[0].revisions[0].slots.main.content;
			editor.setValue(json);
		});
	}

	function findAce() {
		var ace = document.querySelector('.ace_editor');
		if (!ace) {
			document.querySelector('.wikiEditor-ui-toolbar [title="Toggle code editor"]').click();
			ace = document.querySelector('.ace_editor');
		}
		return ace;
	}
})();

}