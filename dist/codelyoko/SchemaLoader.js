$(function(){
        var spans = document.getElementsByTagName("span");
        for (var index = 0; index < spans.length; index++) {
            if (spans[index].getAttribute("class")) {
                if (spans[index].getAttribute("class")=="schema") {
                    if (spans[index].getAttribute("data-widget-id")) {
                        var workingSpan = spans[index];
                        var schemaName = spans[index].getAttribute("data-widget-id");
                        var target = wgServer + "/wiki/Schema:" + schemaName + "?action=raw";
                        $.getJSON(target).done(function(data){
                            var schema = document.createElement('script');
                                schema.setAttribute('type', 'application/ld+json');
                                schema.textContent = JSON.stringify(data);
 
                            workingSpan.appendChild(schema);
                        }).fail(function( badCode, status, err ){});
                    }   
                }
            }
        }
    }); 
$("span.schema").css("display", "none");