$( function() {
  'use strict';

  var $lastButton;
  
  if (!$('.ns-talk').length){
    $lastButton = $( '#ca-edit' );
  }
  else{
    $lastButton = $( '#ca-addsection' );
  }
	if ( !$lastButton.length ) {
		$lastButton = $( '#ca-viewsource' );
	}

  //Adiciona o botão de discussão
  if ( !$('.ns-talk').length && $('#ca-edit').length ) {
    var $talkEditLink;
  
    var $talkButtonBase = $( '#ca-talk' );
    
    if ($talkButtonBase.length){
      $talkEditLink = $( '<a>' )
  	    .attr( 'id', 'ca-talk-custom' )
  	    .attr( 'href',  $talkButtonBase.attr('href').replace("?action=edit&redlink=1", "") )
  	    .attr( 'title', 'Discussão' )
  	    .addClass( 'page-side-tool' )
  	    .html('<svg width="24" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>');
  	    // from Heroicons – https://heroicons.dev/
  	    
  	$talkEditLink.insertAfter( $lastButton );
  	$lastButton = $( '#ca-talk-custom' );
    }
  }
  
  //Adiciona o botão de informação
  if ( $('.mw-editable').length && ($('#ca-edit').length || $('ca-addsection').length) && !$('.action-edit').length) {
    var $infoLink;

  	var $editButtonBase = $( '#ca-edit' );
  	
  	if($('.action-info').length){
  	  $infoLink = $( '<a>' )
  	    .attr( 'id', 'ca-info-custom' )
  	    .attr( 'href',  $editButtonBase.attr('href').replace("?action=edit", "") )
  	    .attr( 'title', 'Voltar' )
  	    .addClass( 'page-side-tool' )
  	    .html('<svg width="24" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>');
  	    // from Heroicons – https://heroicons.dev/
  	}
  	else{
  	  $infoLink = $( '<a>' )
  	    .attr( 'id', 'ca-info-custom' )
  	    .attr( 'href',  $editButtonBase.attr('href').replace("action=edit", "action=info") )
  	    .attr( 'title', 'Informações da página' )
  	    .addClass( 'page-side-tool' )
  	    .html('<svg width="24" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>');
  	    // from Heroicons – https://heroicons.dev/
  	}

  	$infoLink.insertAfter( $lastButton );
  	$lastButton = $( '#ca-info-custom' );
  }
  
  //Adiciona o botão de idioma
  if ( $('.page-header__languages').length ) {
    var $langLink;

    var $idiomas = document.querySelector(".page-header__languages .wds-dropdown .wds-dropdown__content");
    

    if ($idiomas){
      var $langLink1 = $( '<button>' )
  	    .attr( 'id', 'ca-lang-custom' )
  	    .attr( 'href',  "" )
  	    .attr( 'title', 'Idiomas' )
  	    .addClass( 'page-side-tool' )
  	    .html('<svg id="ca-lang-custom" width="24" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path id="ca-lang-custom" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"></path></svg>');
  	    // from Heroicons – https://heroicons.dev/
  	    
  	    $langLink = $( '<div>' )
  	    .attr( 'style', 'position: relative;' )
  	    .html($langLink1);
  	    
  	    $langLink.html($langLink.html() + '<div id="custom-lang-box" class="toc sticky-toc wds-is-hidden">' + $idiomas.innerHTML + '</div>');
  	    
  	    
    }

    $langLink.insertAfter( $lastButton );
  	$lastButton = $( '#ca-lang-custom' );

  	window.onclick = function(ev) {
  	  if( ev.target.id !== 'custom-lang-box' && ev.target.id !== 'ca-lang-custom' ){
        if (!document.getElementById("custom-lang-box").classList.contains('wds-is-hidden')){
    	    document.getElementById("custom-lang-box").classList.add('wds-is-hidden');
    	  }
      }
  	};
  	
  	document.getElementById("ca-lang-custom").onclick = function() { 
  	  if (document.getElementById("custom-lang-box").classList.contains('wds-is-hidden')){
    	    document.getElementById("custom-lang-box").classList.remove('wds-is-hidden');
    	  }
    	  else{
    	    document.getElementById("custom-lang-box").classList.add('wds-is-hidden');
    	  }
  	};
  }
} );