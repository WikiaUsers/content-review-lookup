(() => {
	const panel = document.querySelector('#articleComments-panel');
	if (!panel) return;

	new MutationObserver(muts => {
		for (const { addedNodes } of muts)
			for (const node of addedNodes)
				if (node.querySelectorAll)
					node.querySelectorAll('[class*="Comment_repliesToggle__"][aria-expanded="false"]')
						.forEach(btn => btn.click());
	}).observe(panel, { childList: true, subtree: true });
})();