(() => {
	function addStyleSheet() {
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
	};
	
	const e = document.querySelectorAll('.StaffBoxStyling img');
	const l = e.length;
	if (l > 0) addStyleSheet();
	for (let j = 0; j < l; j++) {
		const n = e[j];
		n.classList.add('DblClickImg');
		n.addEventListener('dblclick', ()=>window.open(n.src));
	};
})();