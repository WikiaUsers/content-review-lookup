/* Bất kỳ mã JavaScript ở đây sẽ được tải cho tất cả các thành viên khi tải một trang nào đó lên. */
// Output console log
console.log("Running MediaWiki:Common.js");

// Load MathJax
// Latest version of MathJax 3 is loaded when following 3 conditions are satisfied.
//
// * Namespace is not Special
// * Namespace is not MediaWiki
// * Body of the article is displayed, i.e., it is not history
if ((mw.config.get('wgCanonicalNamespace') !== "Special") && (mw.config.get('wgCanonicalNamespace') !== "MediaWiki") && mw.config.get('wgIsArticle')) {
	// Show log for debug
	console.log("Applying MathJax...");

	var script_1 = document.createElement('script');
	script_1.src = "https://polyfill.io/v3/polyfill.min.js?features=es6";
	document.head.appendChild(script_1);

	var script_2 = document.createElement('script');
	script_2.id = "MathJax-script";
	// Load the latest version of MathJax 3
	script_2.src = "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js";
	script_2.async = true;
	document.head.appendChild(script_2);

	// Apply MathJax to comment
	(function () {
		'use strict';
		// Modified a sample from https://docs.mathjax.org/en/latest/web/typeset.html
		function typeset(nodes) {
			MathJax.startup.promise = MathJax.startup.promise
				.then(function () { return MathJax.typesetPromise(nodes); })
				.catch(function (err) { console.log('Typeset failed: ' + err.message); });
			return MathJax.startup.promise;
		}
		new MutationObserver(function (mutations) {
			if (typeof MathJax === "undefined") return;
			/* global MathJax:false */
			var nodes = [];
			for (var i = 0; i < mutations.length; ++i) {
				var mutation = mutations[i];
				for (var j = 0; j < mutation.addedNodes.length; ++j) {
					var node = mutation.addedNodes[j];
					if (!node.querySelectorAll) continue;
					nodes = nodes.concat(node.querySelectorAll(".entity-content"));
				}
			}
			if (nodes.length > 0) typeset(nodes);
		}).observe(document.querySelector("#articleComments"), {
			childList: true,
			subtree: true
		});
	})();
}