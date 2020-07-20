/* Any JavaScript here will be loaded for all users on every page load. */

// ============================================================
// wikiSidething
// from Brickipedia
// Function: Adds a new sidebar element 
//
// Version 1.5 modified by [[user:452]]
// ============================================================
 


$(function() {
	if(skin == "oasis") {
		$('#WikiaRail').bind('DOMNodeInserted', function(event) { //fires after lazy-loading takes place.  
			var $sidebar = $('.ChatModule.module');
			var comboString ='<div style="background:none!important;margin-top:20px"><a class="twitter-timeline" href="https://twitter.com/SIDONIA_anime" data-widget-id="580075360106123264">Tweets by @SIDONIA_anime</a></div>' +
'<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>';

			if ($sidebar.size()) { //check that the target has been loaded
				if (!$('.twitter-timeline').size()) { //check to make sure it hasn't already been added. 
					$sidebar.append(comboString);
				}
			}

			//var $sidebar = $('.activity-heading');
			var comboString2 = "<div id='mosbox' style='margin-top:0px;'><ul><li><a href='http://ja.es-5678sty.wikia.com/wiki/%E7%89%B9%E5%88%A5:Forum'>掲示板 (フォーラム)</a><ul><li><a href='http://ja.es-5678sty.wikia.com/wiki/%E3%83%9C%E3%83%BC%E3%83%89:%E3%80%8E%E3%82%B7%E3%83%89%E3%83%8B%E3%82%A2%E3%81%AE%E9%A8%8E%E5%A3%AB%E3%80%8F%E3%81%AE%E6%84%9F%E6%83%B3'>『シドニアの騎士』感想ボード</a></li><li><a href='http://ja.es-5678sty.wikia.com/wiki/%E3%83%9C%E3%83%BC%E3%83%89:%E3%80%8E%E3%82%B7%E3%83%89%E3%83%8B%E3%82%A2%E3%81%AE%E9%A8%8E%E5%A3%AB%E3%80%8F%E4%BA%88%E6%83%B3%EF%BC%86%E8%AC%8E%E8%A7%A3%E3%81%8D'>『シドニアの騎士』予想&謎解きボード</a></li><li><a href='http://ja.es-5678sty.wikia.com/wiki/%E3%83%9C%E3%83%BC%E3%83%89:%E3%80%8E%E3%82%B7%E3%83%89%E3%83%8B%E3%82%A2%E3%81%AE%E9%A8%8E%E5%A3%AB%E3%80%8F%E6%9C%80%E6%96%B0%E6%83%85%E5%A0%B1'>『シドニアの騎士』最新情報ボード</a></li><li><a href='http://ja.es-5678sty.wikia.com/wiki/%E3%83%9C%E3%83%BC%E3%83%89:%E3%80%8E%E3%82%B7%E3%83%89%E3%83%8B%E3%82%A2%E3%81%AE%E9%A8%8E%E5%A3%AB%E3%80%8F%E3%82%A6%E3%82%A3%E3%82%AD%E3%82%A2%E7%B7%A8%E9%9B%86%E3%81%AB%E9%96%A2%E3%81%99%E3%82%8B%E8%B3%AA%E5%95%8F%E3%81%A8%E5%9B%9E%E7%AD%94'>このウィキアの編集に関する質問と回答</a></li></ul></li><li><a href='http://app-colle.jp/%E3%82%A6%E3%82%A3%E3%82%AD%E3%82%A2%EF%BC%9A%E3%82%B7%E3%83%89%E3%83%8B%E3%82%A2%E3%81%AE%E9%A8%8E%E5%A3%AB%E3%80%80%E3%83%95%E3%82%A1%E3%83%B3%E3%82%A2%E3%83%97%E3%83%AA-android%E3%81%AE%E3%82%A2%E3%83%97%E3%83%AA/android/jp/detail?id=com.wikia.singlewikia.knightsofsidonia'>『シドニアの騎士』ファンアプリ (Android)</a></li></ul></div>";

			if ($sidebar.size()) { //check that the target has been loaded
				if (!$('#mosbox').size()) { //check to make sure it hasn't already been added. 
					$sidebar.append(comboString2);
				}
			}
		}); //end of DOMNodeInserted block

	} else if(skin == "monobook") {
		var $sidebar = $('#n-wikicitieshome');
		var comboString = "<div id='mosbox'><div style='background-color:transparent !important;line-height:100%'><hr> <hr> Al<hr></a></div></div>";
		$sidebar.prepend(comboString);
	}
});