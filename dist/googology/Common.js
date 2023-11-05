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

//Adding page jumping for blog post listings (click the #)
var pageLocation=window.location+'';
document.getElementsByClassName("paginator-spacer")[0].innerHTML='...&nbsp;<a onclick="var pageToScrollTo=prompt(\'Page number?\');window.location=pageLocation.split(\'?page=\')[0]+\'?page=\'+pageToScrollTo;">#</a>&nbsp;...';

//Fixing out-of-alignment ol's with high numbers
var ols=document.getElementsByTagName("ol");
for(var i=0;i<ols.length;i++){
    var maxnum=ols[i].start+ols[i].childElementCount-1;
    if(maxnum>999){
        ols[i].style.paddingLeft=(-1+Math.floor(Math.log10(maxnum)*2)/4)+"em";
    }
}

// MathJax code by Hexirp which works for preview and comments

$(function () {
	console.log('MathJaxRunner: 処理を開始します。');
	
	var flag_is_non_special_namespace = mw.config.get('wgCanonicalNamespace') != 'Special';
	var flag_is_non_interface_namespace = mw.config.get('wgCanonicalNamespace') != 'MediaWiki';
	var flag_contain_content_main = mw.config.get('wgIsArticle');
	var flag_is_mode_edit = mw.config.get('wgAction') == 'edit';
	
	// その名前空間が Special か MediaWiki かであるページ以外で MathJax を読み込む。
	// Special 名前空間と MediaWiki 名前空間は MediaWiki システムにアクセスするため、
	// そこで MathJax が動くことによって変なことが起こらないように予防する。
	if (flag_is_non_special_namespace && flag_is_non_interface_namespace) {
		console.log('MathJaxRunner: MathJax の実行が可能です。');
		
		console.log('MathJaxRunner: Polyfill の読み込みを開始します。');
		
		var element_script_polyfill = document.createElement('script');
		element_script_polyfill.src = 'https://polyfill.io/v3/polyfill.min.js?features=es6';
		document.head.appendChild(element_script_polyfill);
		
		console.log('MathJaxRunner: Polyfill の読み込みを終了しました。');
		
		console.log('MathJaxRunner: MathJax の設定を開始します。');
		
		// メインコンテンツを含むページの場合、そのメインコンテンツおよびコメントだけに MathJax を適用する。
		// コメントの内部の数式をレンダリングするために 'MathJax.startup.ready' を変更する。
		// 'MathJax.startup.ready' のタイミングじゃないと 'MathJax.startup.promise' が空となる。
		if (flag_contain_content_main) {
			MathJax = {
				startup: {
					elements: [
						'.mw-parser-output',
						'.entity-content'
					],
					ready: function () {
						console.log('MathJaxRunner: MathJax の準備を開始します。');
						
						MathJax.startup.defaultReady();
						
						var promise = MathJax.startup.promise;
						
						var typeset = function (list_node) {
							promise = promise
								.then(function () {
									console.log('MathJaxRunner: MathJax の実行が完了しました。');
									
									return MathJax.typesetPromise(list_node);
								})
								.catch(function () {
									console.log('MathJaxRunner: MathJax の実行が失敗しました。');
								});
						};
						
						var observer_comment = new MutationObserver(function (list_mutation) {
							console.log('MathJaxRunner: オブサーバーの処理を開始します。');
							
							var list_node = [];
							
							for (var i = 0; i < list_mutation.length; i = i + 1) {
								var list_node_added = list_mutation[i].addedNodes;
								
								for (var j = 0; j < list_node_added.length; j = j + 1) {
									var node = list_node_added[j];
									
									if (node.querySelectorAll != null) {
										var list_content = node.querySelectorAll('.entity-content');
										
										list_node = list_node.concat(list_content);
									}
								}
							}
							
							typeset(list_node);
							
							console.log('MathJaxRunner: オブサーバーの処理が終了しました。');
						});
						
						var element_comment = document.querySelector("#articleComments");
						
						if (element_comment != null) {
							observer_comment.observe(element_comment, { childList: true, subtree: true });
						}
						
						console.log('MathJaxRunner: MathJax の準備が終了しました。');
					}
				}
			};
		}
		
		// 編集中のページの場合、そのプレビューだけに MathJax を適用する。
		// プレビューの内部の数式をレンダリングするために 'MathJax.startup.ready' を変更する。
		// 'MathJax.startup.ready' のタイミングじゃないと 'MathJax.startup.promise' が空となる。
		// '.wikiPreview .mw-parser-output' はソースエディターのプレビューのため。
		// '.ve-ui-mwSaveDialog-preview .mw-parser-output .mw-parser-output' はビジュアルエディタ―のソースモードのプレビューのため。
		if (flag_is_mode_edit) {
			MathJax = {
				startup: {
					elements: [
						'.wikiPreview .mw-parser-output, .ve-ui-mwSaveDialog-preview .mw-parser-output .mw-parser-output'
					],
					ready: function () {
						console.log('MathJaxRunner: MathJax の準備を開始します。');
						
						MathJax.startup.defaultReady();
						
						var promise = MathJax.startup.promise;
						
						var typeset = function (list_node) {
							promise = promise
								.then(function () {
									console.log('MathJaxRunner: MathJax の実行が完了しました。');
									
									return MathJax.typesetPromise(list_node);
								})
								.catch(function () {
									console.log('MathJaxRunner: MathJax の実行が失敗しました。');
								});
						};
						
						// 数式のレンダリングは重いので一回だけで済むようにする。
						var flag_is_not_rendered = true;
						
						// Mutation Observer では、それが検知した変更内容が空だったりと上手く行かないため、
						// その代わりに 'setInterval' 関数を使う。
						setInterval(
							function () {
								var list_element_content_preview = document.querySelectorAll('.wikiPreview .mw-parser-output, .ve-ui-mwSaveDialog-preview .mw-parser-output .mw-parser-output');
								
								if (0 < list_element_content_preview.length) {
									if (flag_is_not_rendered) {
										typeset(list_element_content_preview);
										
										flag_is_not_rendered = false;
									}
								} else {
									flag_is_not_rendered = true;
								}
							},
							1000
						);
						
						console.log('MathJaxRunner: MathJax の準備が終了しました。');
					}
				}
			};
		}
		
		console.log('MathJaxRunner: MathJax の設定が終了しました。');
		
		console.log('MathJaxRunner: MathJax の読み込みを開始します。');
		
		var element_script_math_jax = document.createElement('script');
		element_script_math_jax.id = 'MathJax-script';
		element_script_math_jax.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js';
		element_script_math_jax.async = true;
		document.head.appendChild(element_script_math_jax);
		
		console.log('MathJaxRunner: MathJax の読み込みが終了しました。');
	}
	
	console.log('MathJaxRunner: 処理を終了しました。');
});