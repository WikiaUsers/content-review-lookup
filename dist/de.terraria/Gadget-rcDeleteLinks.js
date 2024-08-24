if (mw.config.get( 'wgCanonicalSpecialPageName' ) == 'Recentchanges') {

	var $pages = $('.mw-changeslist .special li');
	
	$pages.each(function(index,value){
		var $this = $(this);
		if ($this.find('.newpage').length > 0) { 
	        var $title = $this.find('.mw-title');
	        var delLink = ' (<a href="https://terraria-de.gamepedia.com/index.php?title=' + $title.text() + '&action=delete">löschen</a>)';
	        $title.after(delLink);
	    }
	});

}