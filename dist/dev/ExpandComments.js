(() => {
	"use strict";

	const SEL  = '[class*="ReplyList_view-all-replies__"]';
	const seen = new WeakSet();
	const fire = b => { if (!seen.has(b)) { seen.add(b); b.click(); } };
	const hit  = n => {
		if (n.nodeType !== 1) return;
		if (n.matches(SEL)) fire(n);
		for (const b of n.querySelectorAll(SEL)) fire(b);
	};

	const run = root => {
		new MutationObserver(ms => {
			for (const m of ms) for (const n of m.addedNodes) hit(n);
		}).observe(root, { childList: true, subtree: true });
		hit(root);
	};

	const existing = document.getElementById('articleComments');
	if (existing) return run(existing);
	const boot = new MutationObserver(() => {
		const root = document.getElementById('articleComments');
		if (!root) return;
		boot.disconnect();
		run(root);
	});

	boot.observe(document.body, { childList: true, subtree: true });
})();