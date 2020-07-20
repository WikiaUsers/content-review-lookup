$(function(){
   var spans = document.getElementsByTagName("span");
   for (var index = 0; index < spans.length; index++) {
        if (spans[index].getAttribute("class")) {
            if (spans[index].getAttribute("class")=="injectUsername") {
                if (mw.config.get('wgUserName')) {
                    spans[index].innerHTML = ""+mw.config.get('wgUserName');
                } else {
                    spans[index].innerHTML = "Not Logged In";
                }
            }
        }
    }
});