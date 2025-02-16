// MathJax
if ((mw.config.get('wgCanonicalNamespace') !== "Special") && (mw.config.get('wgCanonicalNamespace') !== "MediaWiki") && mw.config.get('wgIsArticle')) {
  // Output a log for debugging.
	  console.log("Applying MathJax...");
	  var script_1 = document.createElement('script');
	  script_1.src = "https://polyfill.io/v3/polyfill.min.js?features=es6";
	  document.head.appendChild(script_1);
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
(function () {
    const eles = document.querySelectorAll('.js-action-play');
    eles.forEach(function (e) {
        const targetId = e.getAttribute('data-media-id');
        if (!targetId) {
            console.error('No data-media-id present on element', e);
            return;
        }
        const target = document.getElementsByClassName('media-id-' + targetId)[0];
        if (!target) {
            console.error('No element found with .media-id-' + targetId, e);
            return;
        }
        e.addEventListener('click', function () {
            console.log(target);
            if (target.paused || target.ended) {
                target.play();
            } else {
                target.pause();
            }
        });
    });
})();

mw.loader.load(["mediawiki.util", "mediawiki.Title"]);
mw.hook("wikipage.content").add(function () {
    $("span.import-css").each(function () {
    	mw.util.addCSS($(this).attr("data-css"));
    });
    
    $(".sitenotice-tab-container").each(function() {
		var container = $(this);
		function switchTab(offset) {
			return function() {
				var tabs = container.children(".sitenotice-tab").toArray();
				var no = Number(container.find(".sitenotice-tab-no")[0].innerText) + offset;
				var count = tabs.length;
				if (no < 1) no = count;
				else if (no > count) no = 1;
				for (var i = 0; i < count; i++)
					tabs[i].style.display = (i + 1 == no ? null : "none");
				container.find(".sitenotice-tab-no")[0].innerText = no;
			};
		}
		container.find(".sitenotice-tab-arrow.prev").click(switchTab(-1));
		container.find(".sitenotice-tab-arrow.next").click(switchTab(1));
	});
});

$.getJSON(mw.util.wikiScript("index"), {
    title: "MediaWiki:Custom-import-scripts.json",
    action: "raw"
}).done(function (result, status) {
    if (status != "success" || typeof (result) != "object") return;
    var scripts = result[mw.config.get("wgPageName")];
    if (scripts) {
        if (typeof (scripts) == "string") scripts = [scripts];
        importArticles({ type: "script", articles: scripts });
    }
});
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:WallGreeting.js',
    ]
});