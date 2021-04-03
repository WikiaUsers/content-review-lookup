// デバッグのためのログを出力する。
console.log("Running MediaWiki:Mobile.js...");

// MathJax を読み込む。
//
// MathJax が読み込まれる条件は三つある。それらは以下の通りである。
//
// * 名前空間が Special ではない。
// * 名前空間が MediaWiki ではない。
// * 記事の本体が表示されている。つまり、表示されているのが履歴に類するものではない。
if ((mw.config.get('wgCanonicalNamespace') !== "Special") && (mw.config.get('wgCanonicalNamespace') !== "MediaWiki") && mw.config.get('wgIsArticle')) {
  // デバッグのためのログを出力する。
  console.log("Applying MathJax...");

  var script_1 = document.createElement('script');
  script_1.src = "https://polyfill.io/v3/polyfill.min.js?features=es6";
  document.head.appendChild(script_1);

  var script_2 = document.createElement('script');
  script_2.id = "MathJax-script";
  script_2.src = "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js";
  script_2.async = true;
  document.head.appendChild(script_2);
}