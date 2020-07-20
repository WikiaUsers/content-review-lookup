// implementing an idea of [[user:Seth4564TI]]. seriously seth next time come up with a better idea for a script will u i has berry little time to waste

(function() {
	// update chat message
	function updateEmoticonRotation(node) {
		var imgs = node.querySelectorAll(".message img"),
			img,
			next,
			txt,
			re = /^\s*\%rot(\d+)/i,
			match,
			n,
			i;
		for (i = 0; i < imgs.length; i++) {
			img = imgs[i];
			next = img.nextSibling;
			try {
				txt = next.textContent;
				if (next.nodeType == 3 && re.test(txt)) {
					match = txt.match(re);
					n = Number(match[1]);
					if (!isNaN(n + n * 0) && typeof n === "number") {
						img.style.transform = "rotate(" + n + "deg)";
						img.title += " %rot" + n;
						img.alt += " %rot" + n;
						next.textContent = next.textContent.replace(re, "");
					}
				}
			} catch(err) {}
		}
	}
	// main observer
	var obs = new MutationObserver(function(ms) {
		ms.forEach(function(m) {
			for (var i = 0, node; i < m.addedNodes.length; i++) {
				node = m.addedNodes[i];
				try {
					if (node.parentNode.parentNode.classList.contains("Chat")) {
						updateEmoticonRotation(node);
					}
				} catch(err) {}
			}
		});
	});
	// for when entering chat
	for (var i = 0, imgs = document.querySelectorAll(".Chat ul li"); i < imgs.length; i++) {
		updateEmoticonRotation(imgs[i]);
	}
	// start observing
	obs.observe(document.querySelector("#WikiaPage"), {
		childList: true,
		subtree: true
	});
}());