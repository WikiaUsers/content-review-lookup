/* Das folgende JavaScript wird für alle Nutzer der mobilen Ansicht geladen. */

$(window).on('load', function(){
   //main page header.
   var $btn = $('#box-wikiheader #box-wikiheader-toggle-link');
   if($btn.length){
      var $box = $('#box-wikiheader');
      $btn.css('display', 'inline');
      if($box.innerHeight() > 180){
         $box.addClass('collapsed');
      }
      $btn.on('click', function(){
         $box.toggleClass('collapsed');
      });
   }
});

//npcinfobox
$(document).ready(function (){
	$('.infobox.npc .modetabs .tab, .infotable.npc .modetabs .tab').on('click', function(){
    	var $this = $(this);
    	if($this.hasClass('current')){
    		return;
    	}
    	$this.parent().children().removeClass('current');
    	$this.addClass('current');
    	$this.closest('.infobox, .infotable').removeClass('c-expert c-master c-normal').addClass($this.hasClass('normal')?'c-normal':($this.hasClass('expert')?'c-expert':'c-master'));
    });
});

//spoiler
$(document).ready(function (){
	$('.spoiler-content').on('click', function(){
    	$(this).toggleClass('show');
    });
});