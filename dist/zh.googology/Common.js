// The code is applied in order to display mathematical formulae. 
// This is copied from MediaWiki:Common.js in Japanese Googology Wiki.

// Output a log for debugging.
console.log("Running MediaWiki:Common.js...");

// Loading MathJax.
//
// MathJax will be loaded in the following cases:
//
// * The namespace is not Special.
// * The namespace is not MediaWiki.
if ((mw.config.get('wgCanonicalNamespace') !== "Special") && (mw.config.get('wgCanonicalNamespace') !== "MediaWiki")) {
  // Output a log for debugging.
  console.log("Applying MathJax...");

  var script_2 = document.createElement('script');
  script_2.id = "MathJax-script";
  script_2.src = "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js";
  script_2.async = true;
  document.head.appendChild(script_2);

  // Function to apply MathJax to comments.
  (function() {
    'use strict';
    // Modified a sample from https://docs.mathjax.org/en/latest/web/typeset.html
    function typeset(nodes) {
        MathJax.startup.promise = MathJax.startup.promise
            .then(function() {return MathJax.typesetPromise(nodes);})
            .catch(function(err) {console.log('Typeset failed: ' + err.message);});
        return MathJax.startup.promise;
    }
    new MutationObserver(function(mutations) {
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

// Special process for hide-on-oasis-skin class.
//
// If the skin is Oasis, then set the value of the display property of CSS of HTML element with hide-on-oasis-skin class as none.
if (mw.config.get('skin') === "oasis") {
	// Output a log for debugging.
	console.log("Processing 'hide-on-oasis-skin' class");

	var elements = document.getElementsByClassName('hide-on-oasis-skin');

	for (var i = 0; i < elements.length; i++) {
		elements[i].style.display = 'none';
	}
}