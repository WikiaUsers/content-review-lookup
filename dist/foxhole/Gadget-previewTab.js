/* v1.2, By Westgrass https://terraria-zh.gamepedia.com/User:Westgrass */
$(document).ready(function (){

	if(((mw.config.get('wgAction') != 'edit')&&(mw.config.get('wgAction') != 'submit'))||(mw.config.get('wgPageContentModel')) != 'wikitext'){
		return;
	}

	//localization.
	var $text_wikitext = {
		'en': 'Wikitext',
		'zh': '维基文本',
		'zh-cn': '维基文本'
	}
	var $text_preview = {
		'en': 'Preview',
		'zh': '预览',
		'zh-cn': '预览'
	}
	var $text_changes = {
		'en': 'Changes',
		'zh': '差异',
		'zh-cn': '差异'
	}
	var $text_nochanges = {
		'en': 'No change',
		'zh': '无差异',
		'zh-cn': '无差异'
	}

	$('#editform').before('<div id="wiki-editor-tabs"><div class="wikitext">'+($text_wikitext[mw.config.get( 'wgUserLanguage' )]||'Wikitext')+'</div><div class="preview">'+($text_preview[mw.config.get( 'wgUserLanguage' )]||'Preview')+'</div><div class="changes">'+($text_changes[mw.config.get( 'wgUserLanguage' )]||'Changes')+'</div></div>');
	var $wikitext_button = $('#wiki-editor-tabs .wikitext').addClass('current');
	var $preview_button = $('#wiki-editor-tabs .preview');
	var $changes_button = $('#wiki-editor-tabs .changes');

	$('#editform').before('<div id="wiki-editor-tabs-preview"><div class="sk-fading-circle"><div class="sk-circle1 sk-circle"></div><div class="sk-circle2 sk-circle"></div><div class="sk-circle3 sk-circle"></div><div class="sk-circle4 sk-circle"></div><div class="sk-circle5 sk-circle"></div><div class="sk-circle6 sk-circle"></div><div class="sk-circle7 sk-circle"></div><div class="sk-circle8 sk-circle"></div><div class="sk-circle9 sk-circle"></div><div class="sk-circle10 sk-circle"></div><div class="sk-circle11 sk-circle"></div><div class="sk-circle12 sk-circle"></div></div><div class="contents"></div></div><div id="wiki-editor-tabs-changes"><div class="sk-fading-circle"><div class="sk-circle1 sk-circle"></div><div class="sk-circle2 sk-circle"></div><div class="sk-circle3 sk-circle"></div><div class="sk-circle4 sk-circle"></div><div class="sk-circle5 sk-circle"></div><div class="sk-circle6 sk-circle"></div><div class="sk-circle7 sk-circle"></div><div class="sk-circle8 sk-circle"></div><div class="sk-circle9 sk-circle"></div><div class="sk-circle10 sk-circle"></div><div class="sk-circle11 sk-circle"></div><div class="sk-circle12 sk-circle"></div></div><div class="contents"></div></div>');
	var $preview_loading = $('#wiki-editor-tabs-preview > div.sk-fading-circle').first();
	var $preview_content = $('#wiki-editor-tabs-preview > div.contents').first();
	var $changes_loading = $('#wiki-editor-tabs-changes > div.sk-fading-circle').first();
	var $changes_content = $('#wiki-editor-tabs-changes > div.contents').first();

	var $preview_api = new mediaWiki.Api();
	var $changes_api = new mediaWiki.Api();

	mw.loader.using( 'mediawiki.diff.styles' );

	$wikitext_button.on('click', function(){
		$preview_api.abort();
		$changes_api.abort();
		$('.wikiEditor-ui').css('display', 'block');
		$('#wiki-editor-tabs-preview').css('display', 'none');
		$('#wiki-editor-tabs-changes').css('display', 'none');
		$wikitext_button.addClass('current');
		$preview_button.removeClass('current');
		$changes_button.removeClass('current');
		$preview_loading.css('display', 'block');
		$preview_content.empty();
		$changes_loading.css('display', 'block');
		$changes_content.empty();
	});
	
	$preview_button.on('click', function(){
		$preview_api.abort();
		$changes_api.abort();
		$wikitext_button.removeClass('current');
		$preview_button.addClass('current');
		$changes_button.removeClass('current');
		$preview_loading.css('display', 'block');
		$preview_content.empty();
		$changes_loading.css('display', 'block');
		$changes_content.empty();
		var $editor = $('.wikiEditor-ui');
		$editor.css('display', 'none');
		$('#wiki-editor-tabs-preview').css('display', 'block').outerHeight($editor.outerHeight());
		$('#wiki-editor-tabs-changes').css('display', 'none');
		
		var wikitext = $('#wpTextbox1').val();
		$preview_api.post( {
			formatversion: 2,
			action: 'parse',
			title: mw.config.get( 'wgPageName' ),
			text: wikitext,
			pst: '',
			prop: 'text|modules|jsconfigvars',
			preview: true,
			disableeditsection: true,
			useskin: mw.config.get( 'skin' ),
			uselang: mw.config.get( 'wgUserLanguage' )
		} ).done( function ( data ) {
			var loadmodules, $content;
			if ( !data.parse || !data.parse.text ) {
				return;
			}
			if ( data.parse.jsconfigvars ) {
				mw.config.set( data.parse.jsconfigvars );
			}
			loadmodules = data.parse.modules.concat(
				data.parse.modulescripts,
				data.parse.modulestyles
			);
			mw.loader.load( loadmodules );
			$content = $preview_content
				.detach()
				.html( data.parse.text );
			$content.append( '<div class="visualClear"></div>' )
				.find( 'a:not([href^="#"])' )
				.click( false );
			$preview_loading.css('display', 'none');
			$('#wiki-editor-tabs-preview').append( $content );
		} );
	});

	$changes_button.on('click', function(){
		$preview_api.abort();
		$changes_api.abort();
		$wikitext_button.removeClass('current');
		$preview_button.removeClass('current');
		$changes_button.addClass('current');
		$preview_loading.css('display', 'block');
		$preview_content.empty();
		$changes_loading.css('display', 'block');
		$changes_content.empty().html( '<table class="diff"><col class="diff-marker"/><col class="diff-content"/>' +
			'<col class="diff-marker"/><col class="diff-content"/><tbody/></table>' );
		var $editor = $('.wikiEditor-ui');
		$editor.css('display', 'none');
		$('#wiki-editor-tabs-preview').css('display', 'none');
		$('#wiki-editor-tabs-changes').css('display', 'block').outerHeight($editor.outerHeight());

		mw.loader.using( 'mediawiki.diff.styles' );
		
		var wikitext = $('#wpTextbox1').val();
		var section = $( '[name="wpSection"]' ).val();
		var postdata = {
			formatversion: 2,
			action: 'query',
			prop: 'revisions',
			titles: mw.config.get( 'wgPageName' ),
			rvdifftotext: wikitext,
			rvdifftotextpst: true,
			rvprop: '',
			rvsection: section === '' ? undefined : section
		};

		$changes_api.post(postdata).done( function ( postResult ) {
			var diff;
			try {
				diff = postResult.query.pages[ 0 ]
					.revisions[ 0 ].diff.body;
				if (diff){
					$changes_content.find( 'table.diff tbody' )
					.html( diff )
					.append( '<div class="visualClear"></div>' );
				}
				else{
					$changes_content.html( '<p style="text-align:center; font-style: italic;" class="note-text">('+($text_nochanges[mw.config.get( 'wgUserLanguage' )]||'No change')+')</p>' )
					.append( '<div class="visualClear"></div>' );
				}
				$changes_loading.css('display', 'none');
			} catch ( e ) {
				// "data.blah is undefined" error, ignore
			}
		} );
	});

});