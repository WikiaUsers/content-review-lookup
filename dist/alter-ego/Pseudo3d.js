/**
 * Name:		pseudoxd-viewer
 * Version:		v1.0
 * Author:		t7ru [[User:Gabonnie]]
 * Description:	Allow pseudoxd's spritesheets to be panned.
 				Forked from [[w:c:dev:MediaWiki:Pseudo3D.js]]
 */
(() => {
	const isXd = (viewport) => viewport.classList.contains("pseudoxd");

	const setFrame = (viewport, sprite, frame) => {
		const frames = viewport._frameAmount || 24;
		frame = ((frame % frames) + frames) % frames;
		viewport._currentFrame = frame;

		if (viewport._isXd) {
			const col = frame % 5;
			const row = Math.floor(frame / 5);
			sprite.style.transform = `translate(-${(col / 5) * 100}%, -${(row / 5) * 100}%)`;
		} else {
			sprite.style.transform = `translateX(-${(frame * 100) / frames}%)`;
		}
	};

	Array.from(document.querySelectorAll(".pseudo-3d-viewport")).forEach(
		(viewport) => {
			const sprite = viewport.querySelector("img");
			if (!sprite) return;

			viewport._isXd = isXd(viewport);
			viewport._frameAmount = viewport._isXd
				? 24
				: parseInt(viewport.dataset.frameAmount, 10) || 24;
			const startFrame = parseInt(viewport.dataset.frameStart, 10) || 0;
			setFrame(viewport, sprite, startFrame);
		},
	);

	const drag = (e, touch) => {
		const viewport = e.target.closest(".pseudo-3d-viewport");
		const sprite = viewport ? viewport.querySelector("img") : null;
		if (!sprite) return;
		e.preventDefault();

		const startX = touch ? e.touches[0].pageX : e.pageX;
		const startFrame = viewport._currentFrame || 0;
		const frameAmount = viewport._frameAmount || 24;
		const piItem = window.PseudoSkybox
			? viewport.closest(".pi-item")
			: null;
		const currentBgX = parseFloat(
			(piItem && piItem.style.backgroundPositionX) || 50,
		);

		const move = (ev) => {
			const x = touch ? ev.touches[0].pageX : ev.pageX;
			const delta = x - startX;
			let frame =
				(startFrame - Math.floor(delta / (window.PseudoSpeed || 10))) %
				frameAmount;
			if (frame < 0) frame += frameAmount;
			setFrame(viewport, sprite, frame);

			if (piItem) {
				const newBgX = Math.min(
					100,
					Math.max(
						0,
						currentBgX - delta * (window.PseudoSkyboxSpeed || 0.01),
					),
				);
				piItem.style.backgroundPositionX = `${newBgX}%`;
			}
		};

		const up = () => {
			document.removeEventListener(
				touch ? "touchmove" : "mousemove",
				move,
			);
			document.removeEventListener(touch ? "touchend" : "mouseup", up);
		};

		document.addEventListener(touch ? "touchmove" : "mousemove", move);
		document.addEventListener(touch ? "touchend" : "mouseup", up);
	};

	document.addEventListener("mousedown", drag);
	document.addEventListener("touchstart", (e) => drag(e, 1));
})();

if (window.PseudoImportCSS !== false) {
	importArticle({
		type: "style",
		article: "u:dev:MediaWiki:Pseudo3D.css", // ./styles.css
	});
}