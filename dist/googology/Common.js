// Output console log
console.log("Running MediaWiki:Common.js...");

// hide-on-desktop-skin class imported from Japanese version
//
// When the skin is fandomdesktop, set display property of CSS with HTML element having
// hide-on-desktop-skin class as none.
if (mw.config.get('skin') === "fandomdesktop") {
	// Output log for debug
	console.log("Processing 'hide-on-desktop-skin' class");

	var elements = document.getElementsByClassName('hide-on-desktop-skin');

	for (var i = 0; i < elements.length; i++) {
		elements[i].style.display = 'none';
	}
}

// Load MathJax, originally written by Emk for Japanese Gwiki
// by adapting the code for UCP from the code by Aycabta for the classic wiki 
//
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

// Finish of code for MathJax by Emk

//Fixing out-of-alignment ol's with high numbers
var ols=document.getElementsByTagName("ol");
for(var i=0;i<ols.length;i++){
    var maxnum=ols[i].start+ols[i].childElementCount-1;
    if(maxnum>999){
        ols[i].style.paddingLeft=(-1+Math.floor(Math.log10(maxnum)*2)/4)+"em";
    }
}

//Adding page jumping for blog post listings (click the #)
var pageLocation=window.location+'';
document.getElementsByClassName("paginator-spacer")[0].innerHTML='...&nbsp;<a onclick="var pageToScrollTo=prompt(\'Page number?\');window.location=pageLocation.split(\'?page=\')[0]+\'?page=\'+pageToScrollTo;">#</a>&nbsp;...';

  // Apply MathJax to comment (not working?)
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