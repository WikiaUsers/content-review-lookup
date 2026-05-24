(function() {
	const stylesheet = new CSSStyleSheet();
	document.adoptedStyleSheets.push(stylesheet);
	stylesheet.replaceSync(`
	.DblClickImg {
		cursor:pointer;
		transition:0.5s;
	}
	.DblClickImg:hover {
		opacity:50%;
	}
	`);
	
	const e = document.querySelectorAll('.StaffBoxStyling');
	const l = e.length;
	for (let j = 0; j < l; j++) {
		const e_0 = e[j].querySelectorAll('img');
		const l_1 = e_0.length;
		for (let i = 0; i < l_1; i++) {
			e_0[i].classList.add('DblClickImg');
			e_0[i].addEventListener('dblclick', function() {
				window.open(this.src);
			});
		};
	};
})();