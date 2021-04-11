$.when( $.ready ).then(function() {
	$(function(){
		$('body').on('click', function(){
			console.log('abc');
		});
		
	});
	//首页头部开关切换。
	$(function() {
		var $btn = $('#box-wikiheader #box-wikiheader-toggle-link');
		if($btn.length){
			var $box = $('#box-wikiheader');
			$btn.css('display', 'inline-block');
			if($box.innerHeight() > 180){
				$box.addClass('collapsed');
			}
			$btn.on('click', function(){
				$box.toggleClass('collapsed');
			});
		}
	});
	
	// npc infobox 模式切换tab
	$(function() {
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
	
	//剧透模板。
	$(function() {
		$('.spoiler-content').on('click', function(){
	    	$(this).toggleClass('show');
	    });
	});
    
    //l10n subtemplate
    $(function() {
		$('.l10n-data-table th.lang').on('click', function(){
	    	var $this = $(this);
	    	var lang = $this.attr('lang');
	    	if(lang=='en'){
	    		return;
	    	}
	    	$this.closest('table.l10n-data-table').find('td.'+lang).toggleClass('shrinked');
	    	$this.toggleClass('shrinked');
	    });
		$('.l10n-data-table th.all-lang').on('click', function(){
	    	var $this = $(this);
	    	$this.toggleClass('shrinked');
	    	if($this.hasClass('shrinked')){
	    		$this.closest('table.l10n-data-table').find('td.l, th.lang').addClass('shrinked');
	    		$this.closest('table.l10n-data-table').find('td.en, th.en').removeClass('shrinked');
	    	}else{
	    		$this.closest('table.l10n-data-table').find('td.l, th.lang').removeClass('shrinked');
	    	}
	    });
	    //only expand current language 
		$('.l10n-data-table').each(function(){
			var $this = $(this);
			var lang = $this.attr('lang');
			if(lang == 'en'){
				return;
			}
			var th = $this.find('th.lang.'+lang);
			if (th.length){
				$this.find('th.all-lang').trigger('click');
				th.trigger('click');
			}
		}); 
    });
    
});