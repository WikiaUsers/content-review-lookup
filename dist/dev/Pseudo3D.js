/**
 * Name:		Pseudo3D
 * Version:		v1.4
 * Author:		t7ru [[User:Gabonnie]]
 * Description:	Allow pseudo3d's spritesheets to be panned.
 */
(() => {
	document.querySelectorAll('.pseudo-3d-viewport').forEach(viewport => {
		const sprite = viewport.querySelector('img');
		if (!sprite) return;
		
		const frameAmount = parseInt(viewport.dataset.frameAmount) || 24;
		const startFrame = parseInt(viewport.dataset.frameStart) || 0;
		
		viewport._currentFrame = startFrame;
		viewport._frameAmount = frameAmount;
		sprite.style.transform = `translateX(-${startFrame * 100 / frameAmount}%)`;
	});

	const drag = (e, touch) => {
		const viewport = e.target.closest('.pseudo-3d-viewport');
		const sprite = viewport ? viewport.querySelector('img') : null;
		if (!sprite) return;
		e.preventDefault();
		
		const startX = touch ? e.touches[0].pageX : e.pageX;
		const startFrame = viewport._currentFrame || 0;
		const frameAmount = viewport._frameAmount || 24;
		const piItem = window.PseudoSkybox ? viewport.closest('.pi-item') : null;
		const currentBgX = parseFloat(piItem && piItem.style.backgroundPositionX) || 50;
		
		const move = ev => {
			const x = touch ? ev.touches[0].pageX : ev.pageX;
			const delta = x - startX;

			let frame = (startFrame - Math.floor(delta / (window.PseudoSpeed || 10))) % frameAmount;
			if (frame < 0) frame += frameAmount;
			viewport._currentFrame = frame;
			sprite.style.transform = `translateX(-${frame * 100 / frameAmount}%)`;

			if (piItem) {
				const newBgX = Math.min(
					100,
					Math.max(
						0,
						currentBgX - delta * (window.PseudoSkyboxSpeed || 0.01)
					)
				);
				piItem.style.backgroundPositionX = `${newBgX}%`;
			}
		};
		
		const up = () => {
			document.removeEventListener(touch ? 'touchmove' : 'mousemove', move);
			document.removeEventListener(touch ? 'touchend' : 'mouseup', up);
		};
		
		document.addEventListener(touch ? 'touchmove' : 'mousemove', move);
		document.addEventListener(touch ? 'touchend' : 'mouseup', up);
	};

	document.addEventListener('mousedown', drag);
	document.addEventListener('touchstart', e => drag(e, 1));
})();

if (window.PseudoImportCSS !== false) {
	importArticle({
		type: 'style',
		article: 'u:dev:MediaWiki:Pseudo3D.css',
	});
}