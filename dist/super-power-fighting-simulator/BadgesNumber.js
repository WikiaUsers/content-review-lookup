$(function(){
   var spans = document.getElementsByTagName("span");
   for (var index = 0; index < spans.length; index++) {
      if (spans[index].getAttribute("badge-id") != null && spans[index].getAttribute("class") != null) {
        outerLoop:
        switch (spans[index].className) {
            case "badgeAwarded":
				var badge_id = spans[index].getAttribute("badge-id");
				var url = "https://badges.roblox.com/v1/badges/";
				var regex = /\"awardedCount\":([0-9]*)/g;
				var addr = new XMLHttpRequest();
				addr.open('GET', url+badge_id);
				addr.send();
				var data = addr.response;
				var extracted = regex.exec(data);
				var awardedNumber = extracted[1];
				spans[index].innerHTML = awardedNumber;
                break outerLoop;
            default:
                break outerLoop;
        }
      }
   }
});