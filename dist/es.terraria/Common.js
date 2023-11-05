importArticle({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:CustomTools.js'
    ]
});

// Para la Portada, scroll horizontal
$(document).ready(function() {
  var isDragging = false;
  var initialX, containerX;

  $(".afiliados-link").on("mousedown", function(e) {
    isDragging = true;
    initialX = e.clientX;
    containerX = $(this).scrollLeft();
    $(this).css("cursor", "grabbing");
  });

  $(document).on("mousemove", function(e) {
    if (isDragging) {
      var diffX = e.clientX - initialX;
      $(".afiliados-link").scrollLeft(containerX - diffX);
    }
  });

  $(document).on("mouseup", function() {
    isDragging = false;
    $(".afiliados-link").css("cursor", "grab");
  });
});

// NPC Infobox
$(function(){
	/* mode tabs switch for [[Template:npcinfobox]] and [[Template:npcinfobtable]] and so on */
	$('.modesbox .modetabs .tab').on('click', function(){
		var $this = $(this);
		if($this.hasClass('current')){
			return;
		}
		$this.parent().children().removeClass('current');
		$this.addClass('current');
		$this.closest('.modesbox').removeClass('c-expert c-master c-normal').addClass($this.hasClass('normal')?'c-normal':($this.hasClass('expert')?'c-expert':'c-master'));
	});
});

// Modo de Rendimiento
var performanceModeActive = false;

function togglePerformanceMode() {
    if (performanceModeActive) {
        var styleSheet = document.getElementById('performance-mode-stylesheet');
        if (styleSheet) {
            styleSheet.parentNode.removeChild(styleSheet);
        }
    } else {
        var styleSheet = document.createElement('link');
        styleSheet.type = 'text/css';
        styleSheet.rel = 'stylesheet';
        styleSheet.href = 'https://terraria.fandom.com/es/load.php?mode=articles&articles=MediaWiki:Gadget-performanceMode.css&only=styles';
        styleSheet.id = 'performance-mode-stylesheet';
        document.head.appendChild(styleSheet);
    }
    performanceModeActive = !performanceModeActive;
}

mw.hook('dev.ct').add(function(addButtons) {
    addButtons([
        {
            icon: 'controls',
            classes: 'performance-mode-button',
            click: togglePerformanceMode,
            placement: 'page-tools-left',
            position: -1,
            text: 'Modo de Rendimiento',
        }
    ]);
});


// Cerrar Upperbox
mw.hook( 'dev.wds' ).add( function( wds ) {
    $( '.upperbox' ).append( wds.icon( 'close-small', { class: 'upperbox-close' } ) );
	$( '.upperbox-close' ).click( function() {
        $( this ).parent().remove()
    } )
} );