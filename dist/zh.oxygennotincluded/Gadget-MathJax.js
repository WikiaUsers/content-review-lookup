(function () {
  "use strict";
  if (window.MathJaxLoaded) return;
  window.MathJaxLoaded = true;
  var mathStart = "$$\\(";
  var mathEnd = "\\)$$";
  window.MathJax = {
    tex: {
      inlineMath: [[mathStart, mathEnd]],
      displayMath: [],
    },
  };

  mw.hook("wikipage.content").add(function ($content) {
    mw.loader
      .getScript("https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js")
      .then(function () {
        window.MathJax.typesetPromise()
          .then(function () {
            var math = $(
              "*[class^='mwe-math-fallback-image-']:not(.math-jax-processed)"
            );
            math.each(function (i, e) {
              var oldClass = $(e).attr("class");
              var tex = $(e).attr("alt");
              e.replaceWith(
                $("<span></span>", {
                  class: oldClass + " math-jax-processed",
                  html: mathStart + tex + mathEnd,
                  css: { // usually people add invert filter to formulas
                  	filter: 'none',
                  	color: 'inherit',
                  }, 
                })[0]
              );
            });
            window.MathJax.typesetPromise();
          })
          .catch(function (err) {
            return console.log(err.message);
          });
      });
  });
})();