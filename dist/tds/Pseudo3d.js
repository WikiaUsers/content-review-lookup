/**
 * Name:        Pseudo3D
 * Version:     v1.2
 * Author:		t7ru [[User:Gabonnie]]
 * Description: Allow pseudo3d's spritesheets to be panned
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
		
		const move = ev => {
			const x = touch ? ev.touches[0].pageX : ev.pageX;
			let frame = (startFrame - Math.floor((x - startX) / 10)) % frameAmount;
			if (frame < 0) frame += frameAmount;
			viewport._currentFrame = frame;
			sprite.style.transform = `translateX(-${frame * 100 / frameAmount}%)`;
		};
		
		const up = () => {
			document.removeEventListener(touch ? 'touchmove' : 'mousemove', move);
			document.removeEventListener(touch ? 'touchend' : 'mouseup', up);
		};
		
		document.addEventListener(touch ? 'touchmove' : 'mousemove', move);
		document.addEventListener(touch ? 'touchend' : 'mouseup', up);
	};

	document.addEventListener('mousedown', e => drag(e));
	document.addEventListener('touchstart', e => drag(e, 1));
})();