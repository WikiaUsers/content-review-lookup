// デバッグのためのログを出力する。
console.log("Running MediaWiki:Common.js...");

// wgCanonicalNamespace を取得する。
var wgCanonicalNamespace = mw.config.get('wgCanonicalNamespace');
// デバッグのためのログを出力する。
console.log("wgCanonicalNamespace is " + wgCanonicalNamespace + ".");
// wgIsArticle を取得する。
var wgIsArticle = mw.config.get('wgIsArticle');
// デバッグのためのログを出力する。
console.log("wgIsArticle is " + wgIsArticle + ".");

// MathJax を読み込む。
//
// MathJax が読み込まれる条件は三つある。それらは以下の通りである。
//
// * 名前空間が Special ではない。
// * 名前空間が MediaWiki ではない。
// * 記事の本体が表示されている。つまり、表示されているのが履歴に類するものではない。
if ((wgCanonicalNamespace !== "Special") && (wgCanonicalNamespace !== "MediaWiki") && wgIsArticle) {
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

// hide-on-oasis-skin クラスについての特殊な処理を行う。
//
// スキンが Oasis であるならば hide-on-oasis-skin クラスを持つ HTML 要素の CSS の display プロパティの値を none にセットする。
if (mw.config.get('skin') === "oasis") {
	// デバッグのためのログを出力する。
	console.log("Processing 'hide-on-oasis-skin' class");

	var elements = document.getElementsByClassName('hide-on-oasis-skin');

	for (var i = 0; i < elements.length; i++) {
		elements[i].style.display = 'none';
	}
}