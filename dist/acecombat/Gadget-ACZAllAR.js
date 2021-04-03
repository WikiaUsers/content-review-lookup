$(function(){
	if(mw.config.get("wgArticleId")==1883){
		$(".mw-parser-output > h2:eq(1)").before("<h2>Toggle All</h2><p id='acz-toggle-desc'>Click the following button to toggle all of the ace details.<br><span>Please note that this may cause momentary lag in your browser while all of the details appear.</span></p><div id='acz-toggle-contain'><a id='acz-toggle-btn' class='wds-button'><svg class='wds-icon wds-icon-small'><use xlink:href='#wds-icons-eye'></use></svg><span>Toggle All</span></a></div>");
		$("#acz-toggle-btn").click(function(){
			for(i=0; i<169; i++){
				if(i<100) i="0"+i;
				if(i<10) i="0"+i;
				$("#mw-customcollapsible-"+i).toggle();
			}
		});
	}
});