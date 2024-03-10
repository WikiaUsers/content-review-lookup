// <nowiki>
// jshint jquery:true, esversion:5
/* globals require, module, mediaWiki, mw, OO */
'use strict';

if (
	mw.user.options.get( 'showtoolbar' ) &&
	!mw.user.options.get( 'usebetatoolbar' ) &&
	$.inArray( mw.config.get( 'wgAction' ), [ 'edit', 'submit' ] ) > -1
) {
	mw.loader.using( 'mediawiki.toolbar', function() {
		$.each( [
			[
				'//upload.wikimedia.org/wikipedia/commons/c/c8/Button_redirect.png',
				'転送',
				'#転送 [[',
				']]',
				'転送先のページ名'
			],
			[
				'//upload.wikimedia.org/wikipedia/commons/c/c9/Button_strike.png',
				'打ち消し線',
				'<s>',
				'</s>',
				'打ち消し文'
			],
			[
				'//upload.wikimedia.org/wikipedia/commons/1/13/Button_enter.png',
				'改行',
				'<br>'
			],
			[
				'//upload.wikimedia.org/wikipedia/commons/6/6a/Button_sup_letter.png',
				'上付き',
				'<sup>',
				'</sup>',
				'上付き文字'
			],
			[
				'//upload.wikimedia.org/wikipedia/commons/a/aa/Button_sub_letter.png',
				'下付き',
				'<sub>',
				'</sub>',
				'下付き文字'
			],
			[
				'//upload.wikimedia.org/wikipedia/commons/d/d5/Button_small_text.png',
				'小',
				'<small>',
				'</small>',
				'小さなテキスト'
			],
			[
				'//upload.wikimedia.org/wikipedia/commons/3/34/Button_hide_comment.png',
				'コメントアウト',
				'<!-- ',
				' -->',
				'コメントアウトしたいテキスト'
			],
			[
				'//upload.wikimedia.org/wikipedia/commons/1/12/Button_gallery.png',
				'画像ギャラリー',
				'\n<gallery>\n',
				'\n</gallery>',
				'ファイル:Example.jpg|キャプション1\nファイル:Example.jpg|キャプション2'
			],
			[
				'//upload.wikimedia.org/wikipedia/commons/f/fd/Button_blockquote.png',
				'引用文',
				'<blockquote>\n',
				'\n</blockquote>',
				'引用したテキスト'
			],
			[
				'//upload.wikimedia.org/wikipedia/commons/6/60/Button_insert_table.png',
				'表',
				'{| class="wikitable"\n|',
				'\n|}',
				'-\n! 見出し1\n! 見出し2\n! 見出し3\n|-\n| 行1, セル1\n| 行1, セル2\n| 行1, セル3\n|-\n| 行2, セル1\n| 行2, セル2\n| 行2, セル3'
			],
			[
				'//upload.wikimedia.org/wikipedia/commons/7/79/Button_reflink.png',
				'脚注',
				'<ref>',
				'</ref>',
				'脚注'
			]
		], function() {
			mw.toolbar.addButton.apply( null, this );
		} );
	} );
}

// </nowiki>