var deadline_now = new Date();
if (deadline_now.getDate() >= 28 && $.cookie("HPW_CONTEST-notification-dismissed")!=="1") {
	if ($("#WikiaNotifications").length==0) {
		$("body").append('<ul id="WikiaNotifications" class="WikiaNotifications"></ul>');
	}
	$("#WikiaNotifications").append('<li><div id="contest-deadline-alert"><a class="sprite close-notification" onclick="closeContestAlert()"></a><p>The UotM, PotM and UA Unterganging contests are nearing their deadlines! Go to the <a href="/wiki/Hitler_Parody_Wiki:Unterganging_Contests">Contests Portal</a> for links and nominate before it\'s too late!</p></div></li>');
}
function closeContestAlert(){
	$.cookie("HPW_CONTEST-notification-dismissed", "1", { path:"/", expires:7 });
	$("#contest-deadline-alert").parent().remove();
}