{ // block-scoping

// append '&format=original' to the src of specific image prefixes
// for circumventing lossy pixelart quality/colors
// see: https://dev.fandom.com/f/p/4400000000000020857
const allImages = document.querySelectorAll('.mw-parser-output img');
allImages.forEach(image => {
	const imageName = image.getAttribute('data-image-name');
	const nameMatch = /^(Sprite|NPC|Artifact|Icon|Equipment|Costume)/;
	if (!imageName || !nameMatch.test(imageName)) return;

	image.src += '&format=original';

	const lazyloaded = image.dataset.src;
	if (lazyloaded) image.dataset.src += '&format=original';
});

// add tabindex="-1" to tooltipped itemboxes to retain focus on click
const itemboxTooltip = document.querySelectorAll('.custom-tooltip .itembox');
itemboxTooltip.forEach(itembox => itembox.tabIndex = -1);

// hide LastEdited's summary and modal
// if (!window.lastEdited) {
//	window.lastEdited = { diffModal: false, comment: false };
// }

// loop the video inside class="videoloop"
mw.hook('wikipage.content').add($content => 
	$content.find('.videoloop').prop('loop', true)
);

// add default aspect-ratio to hero illustrations to 
// animate `aspect-ratio` states in [[Template:Hero card]]
const heroCard = document.querySelectorAll('.card__hero');
heroCard.forEach(illust => {
	const image = illust.querySelector('img, video');
	const width = image.getAttribute('width');
	const height = image.getAttribute('height');
	image.style.setProperty('--illust-aspect-ratio', `${width} / ${height}`);
});

// replace img src in imagemaps to avoid downscaled image blur
const imageMap = document.querySelector('.imagemap');
if (imageMap) {
	imageMap.src = imageMap.src.replace(/scale-to-width-down.*/, '');
}

// use original image on map-edit page to avoid tile pixel blurring
const mapEditPage = window.location.search === '?action=mapedit';
const origMapSrc = () => {
	const mapImage = document.querySelector('.leaflet-image-layer');
	mapImage.src += '&format=original';
};
if (mapEditPage) {
	setTimeout(origMapSrc, 5000);
}

// interactivity for [[Template:KamazoneTable]]
const $kmzTable = $('.kamazone-table');
if ($kmzTable.length) {
	mw.hook('wikipage.collapsibleContent').add(() => {
		$kmzTable.find('.mw-customtoggle').on('click keydown', function(e) {
			if (e.type === 'click' || e.code === 'Enter' || e.code === 'Space') {
				
				// update url hash along with toggling the description cell
				const newUrl = window.location.href.split('#')[0] + '#' + this.id;
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

	const $preloadButton = $('.preload-map');
	$preloadButton.on('click', loadJson);

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
		}).done(data => {
			const mapJson = data.query.pages[0].revisions[0].slots.main.content;
			editor.setValue(mapJson);
		});
	}

	function findAce() {
		let $ace = $('.ace_editor');
		if (!$ace.length) {
			const $toogleBtn = $('.wikiEditor-ui-toolbar [title="Toggle code editor"]');
			$toogleBtn.click();
			$ace = $('.ace_editor');
		}
		return $ace[0];
	}
})();

}