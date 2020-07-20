(function($){
	$(function(){
		var target=$('#game_timer');
		if(target.length===0) return;
		var gametimezone = -5 * 3600000, utc=new Date();
		setInterval(function(){
            var cd = new Date(), nd = new Date(cd.getTime()+cd.getTimezoneOffset()*60000+gametimezone);
            target.text(('0'+nd.getHours()).substr(-2)+':'+('0'+nd.getMinutes()).substr(-2));
		},5000)
	});
})(jQuery);