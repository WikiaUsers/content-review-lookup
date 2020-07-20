/* Eyup */
$('.WikiaBarWrapper .tools').append('<li id="MagicSpells"><span id="trigger">»</span><span class="scroll-top spell" title="Scroll to top" style="display: none;">▲</span><span class="spell" id="toggle-ads" title="Hide ads" style="display: none;">●</span><span class="spell" id="hide-rail" title="Hide rail" style="display: none;">►</span><span class="scroll-bottom spell" title="Scroll to bottom" style="display: none;">▼</span><style type="text/css">#MagicSpells{font-family:Helvetica;padding:2px 5px !important}#trigger{font-size:16px;color:white !important;display:inline-block;margin-top:-1px;cursor:default;transition:transform .5s;-moz-transition:-moz-transform .5s;-webkit-transition:-webkit-transform .5s;-o-transition:-o-transform .5s}.spell{display:inline-block;color:white !important;margin:0 3px;vertical-align:top;cursor:pointer;transition:transform .5s,text-shadow .5s;-moz-transition:-moz-transform .5s,text-shadow .5s;-webkit-transition:-webkit-transform .5s,text-shadow .5s;-o-transition:-o-transform .5s,text-shadow .5s}.spell:hover{text-shadow:0 0 4px silver}</style></li>');
 
$('#MagicSpells').mouseenter(function() {
	$('.spell').toggle('slow');
	$('#trigger').css({'transform':'rotateY(180deg)','-moz-transform':'rotateY(180deg)','-webkit-transform':'rotateY(180deg)','-ms-transform':'scaleX(-1)','-o-transform':'scaleX(-1)'}); }
);
 
$('#MagicSpells').mouseleave(function() {
	$('.spell').toggle('slow');
	$('#trigger').css({'transform':'rotateY(0deg)','-moz-transform':'rotateY(0deg)','-webkit-transform':'rotateY(0deg)','-ms-transform':'scaleX(1)','-o-transform':'scaleX(1)'}); }
);
 
$('.scroll-top').click(function() {
	$('html, body').animate({scrollTop:0}, 'slow'); }
);
 
$('#toggle-ads').toggle(function() {
	$('#toggle-ads').attr('title','Show ads');
	$('.wikia-ad, .SelfServeUrl').hide('slow'); },
	function() {
		$('#toggle-ads').attr('title','Hide ads');
		$('.wikia-ad, .SelfServeUrl').show('slow');
	}
);
 
$('#hide-rail').toggle(function() {
	$('#hide-rail').css({'transform':'rotateY(180deg)','-moz-transform':'rotateY(180deg)','-webkit-transform':'rotateY(180deg)','-ms-transform':'scaleX(-1)','-o-transform':'scaleX(-1)'});
	$('#hide-rail').attr('title', 'Show rail');
	$('.WikiaRail').hide('slow');
	$('.WikiaMainContent').animate({width:'1010'}, 'slow'); },
	function() {
		$('#hide-rail').css({'transform':'rotateY(0deg)','-moz-transform':'rotateY(0deg)','-webkit-transform':'rotateY(0deg)','-ms-transform':'scaleX(1)','-o-transform':'scaleX(1)'});
		$('#hide-rail').attr('title', 'Hide rail');
		$('.WikiaRail').show('slow');
		$('.WikiaMainContent').animate({width:'670'}, 'slow');
	}
);
 
$('.scroll-bottom').click(function() {
	$('html, body').animate({scrollTop: $(document).height()}, 'slow'); }
);