$(function(){
   var spans = document.getElementsByTagName("span");
   for (var index = 0; index < spans.length; index++) {
      if (spans[index].getAttribute("data-widget-id")) {
          if (spans[index].getAttribute("class")) {
              if (spans[index].getAttribute("class")=="ImageMap") {
                var workingSpan = spans[index];
                var mapName = workingSpan.getAttribute("data-widget-id");
                var target = "http://" + location.hostname + "/wiki/ImageMap:" + mapName + "?action=raw" ;
                $.getJSON(target).done(function(data){
                    if (data==null) {
                        return;
                    }
                    if (((data.src==null)||(data.link==null))||((data.alt==null)||(data.map==null))) {
                        return;
                    }
                    if ((data.width==null)||(data.height==null)) {
                        return;
                    }
                    if (data.map[0]==null) {
                        return;
                    }
                    var result = '<img src="' + data.src + '" width="' + data.width  + '" height="' + data.height + '" alt="' + data.alt + '" usemap="#' + mapName + '" /> <map name="' + mapName + '">';
                    mapProc:
                    for (var areaIndex = 0; areaIndex < data.map.length; areaIndex++) {
                        var workingArea = data.map[areaIndex];
                        if (workingArea.href==null) {
                            continue mapProc;
                        }
                        if (workingArea.alt==null) {
                            continue mapProc;
                        }
                        if (workingArea.shape==null) {
                            continue mapProc;
                        }
                        if (workingArea.coords==null) {
                            continue mapProc;
                        }
                        result = result + 
                        '<area shape="' + workingArea.shape + '" coords="' + workingArea.coords + '" href="' + workingArea.href + '" alt="' + workingArea.alt + '" />';
                    }
                    result = result + "</map>";
                    workingSpan.innerHTML = result;
                }).fail(function( badCode, status, err ){});
              }
          }
      }
   }
});