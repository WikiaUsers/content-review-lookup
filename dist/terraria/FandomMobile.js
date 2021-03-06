/* Any JavaScript here will be loaded for users using the mobile site */

$(window).on('load', function(){
	
   // Collapse/expand function for the header(versions) section for main page (/Terraria Wiki)
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

// modes(classic/expert/master) tabs switch for npc infoboxes.
$(document).ready(function (){
	$('.infobox .modetabs .tab, .infotable.npc .modetabs .tab').on('click', function(){
    	var $this = $(this);
    	if($this.hasClass('current')){
    		return;
    	}
    	$this.parent().children().removeClass('current');
    	$this.addClass('current');
    	$this.closest('.infobox, .infotable').removeClass('c-expert c-master c-normal').addClass($this.hasClass('normal')?'c-normal':($this.hasClass('expert')?'c-expert':'c-master'));
    });
});

//spoiler function (see Template:spoiler)
$(document).ready(function (){
	$('.spoiler-content').on('click', function(){
    	$(this).toggleClass('show');
    });
});