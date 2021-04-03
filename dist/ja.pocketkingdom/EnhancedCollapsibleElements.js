// <source lang="javascript">
 
/************************************************************************/
// ja> = ECE : 拡張型折りたたみ可能要素 =
//   > NavFrameのように折りたたみ可能な要素を利用可能にする
//   > ;作者: 青子守歌
//   > ;URL: //ja.wikipedia.org/wiki/User:aokomoriuta
//   > 
//   > 詳しい使い方は、[[ヘルプ:拡張型折りたたみ可能要素]]を参照してください。
//   > 
//   > == ライセンス ==
//   > このスクリプトは、複数ライセンスで利用可能です。
//   > 選択可能なライセンスは次の通り：
//   > * クリエイティブ・コモンズ 表示-継承 3.0 非移植
//   > * クリエイティブ・コモンズ 表示-非営利 3.0 非移植
//   > * GNU一般公衆利用許諾書 バージョン3.0以降
/************************************************************************/
// en> = ECE: Enhanced Collapsible Elements =
//   > This script enables collapsible elements like NavFrame.
//   > ;author: 青子守歌
//   > ;URL: //ja.wikipedia.org/wiki/User:aokomoriuta
//   > 
//   > Documentation is available at [[Help:拡張型折りたたみ可能要素]].
//   >
//   > == License ==
//   > This script is multi-licensed.
//   > You can select the license of your choice from as following:
//   > * Creative Commons Attribution-ShareAlike 3.0 Unported
//   > * Creative Commons Attribution-Noncommercial 3.0 Unported
//   > * GNU General Public License v3.0 or later
/************************************************************************/
(function($, mw, undefined)
{
 
var ece = function()
{
 
	// 全ECEボタンについて
	$("span.ece-button").each(function()
	{
		// ボタンを取得
		$this = $(this);
 
		// 対象ID、折りたたみ＆展開ラベル、状態、本体を取得
		var targettext = $this.find("span.ece-target").text();
		var etext = $this.find("span.ece-etext").html();
		var ctext = $this.find("span.ece-ctext").html();
		var state = $this.find("span.ece-state").text();
		var $body = $this.find("span.ece-body");
 
 
		// 本体がなかったら
		if($body.length == 0)
		{
			// 新しく作成し、追加
			$body = $(document.createElement("span")).addClass("ece-body");
			$(this).append($body);
		}
 
 
		// 情報が取得出来たら
		if((targettext.length != 0)&&(etext.length != 0)&&(ctext.length != 0)&&(state.length != 0))
		{
			// ボタンを作成
			var $button = $("<a>").attr({href: '#'}).click(function(e){ e.preventDefault(); });
 
			// クリック時に
			$button.click(function()
			{
				// 表示・非表示を逆転
				state = (state == "e") ? "c" : "e";
 
				// 折りたたみ状態に応じてラベルを変更
				$button.html((state == "e") ? ctext : etext)
 
				 // 対象の要素について
				mw.util.$content.find(targettext).each(function()
				{
					// 表示と非表示を実行、
					$(this)[(state == "e") ? "show" : "hide"]();
				});
			});
 
			// 折りたたみ状態を逆転して、クリック
			state = (state == "e") ? "c" : "e";
			$button.click();
 
			// 本体の中身をボタンに置き換え
			$body.empty();
			$body.append($button);
		}
	});
}; // var ece
 
mw.loader.using(['mediawiki.util'], function() {
  ece();
});
 
})(jQuery, mediaWiki);
 
// </source>