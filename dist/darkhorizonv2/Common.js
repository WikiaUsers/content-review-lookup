/* Any JavaScript here will be loaded for all users on every page load. */
$(document).ready(function() {
	$("#OnlineChat").html("<object id='chatbox' width='100%' height='450' data='http://tlkdh.chatango.com/group' type='application/x-shockwave-flash'><param name='movie' value='http://tlkdh.chatango.com/group' /><param name='wmode' value='transparent' /><param name='AllowScriptAccess' value='always' /><param name='AllowNetworking' value='all' /><param name='AllowFullScreen' value='true' /><param name='flashvars' value='cid=1333310103077&amp;b=0&amp;c=AEABA3&amp;d=AEABA3&amp;f=75&amp;h=525151&amp;j=AEABA3&amp;m=525151&amp;n=AEABA3&amp;r=0&amp;v=0'/><embed id='emb_1333310103077' src='http://tlkdh.chatango.com/group' width='100%' height='450' wmode='transparent' allowScriptAccess='always' allowNetworking='all' type='application/x-shockwave-flash' allowFullScreen='true' flashvars='cid=1333310103077&amp;b=0&amp;f=75&amp;l=999999&amp;r=0&amp;v=0' /></object>");

	var navbox = $(".navbox-custom");
	//navbox.find("table").hide();
	navbox.find("th").append(
		$("<a href='#' class='navboxExpandCollapse'>[show]</a>")
		.on("click", function(e) {
			var state = $(this).html();
			if(state === "[hide]") {
				$(this).html("[show]");
			}
			else {
				$(this).html("[hide]");
			}
			$(this).parent().parent().next().find("table").toggle();
			e.preventDefault();
		})
	);
});