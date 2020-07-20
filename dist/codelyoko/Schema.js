//<syntaxhighlight lang="javascript">
$(function(){
    function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i=0; i<ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1);
            if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
        }
        return "";
    }
   $(".schema").css("display","none");
    var loader = function(){
        var schemaValue = getCookie("insertSchema");
        if (schemaValue !== "") {
            console.log(schemaValue);
            if (document.getElementById("wpTextbox1")) {
                document.getElementById("wpTextbox1").value = decodeURIComponent(schemaValue);
                document.cookie ="tempSchema=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
                document.getElementById("wpSave").click();
            }
        }
    };
    loader();
   $('<link>').appendTo('head').attr({type : 'text/css', rel : 'stylesheet'}).attr('href',
'https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/themes/smoothness/jquery-ui.css');
   $.getScript("https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js", function(){
        if (mw.config.get("wgPageName") == "Special:SchemaEditor") {
            document.title = "Special:SchemaEditor";
            
            var html= '<span id="templateSet" style="vertical-align: top; display: inline-block; height: 60em; width: 39%; background-color: #000000;"></span>\
            <textarea style="height: 60em; width: 60%;" id="schemaEditorBox" autofocus="autofocus">\
<span class="schema"><script type="application/ld+json">\n\
{\n\
  "@context": "https://schema.org",\n\
  "@type": "",\n\
  "name": "",\n\
  "description": "",\n\
  "image": ""\n\
}\n\
</script></span></textarea>';
            $("#WikiaArticle").ready(function(){
                $("#WikiaArticle").html(html);
            });
            $("#bodyContent").ready(function(){
               $("#bodyContent").html(html);
            });
            $("#firstHeading").ready(function(){
                $("#firstHeading").html("Special:SchemaEditor");
            });
            $("#article").ready(function(){
               $("#article").html(html);
            });
            $("#templateSet").append('<span style="color: #00FF00;">Title:</span><input id="schemaName" type="text" style="height: 1.25em; width: 10em;"></input><br/>');
            $("#templateSet").append('<button id="importJson" class="injector">Import</button>');
            $("#templateSet").append('<button id="exportJson" class="injector">Export</button>');
            $("#templateSet").append('<button id="injectPerson" class="injector">Person</button>');
            $("#templateSet").append('<button id="injectPostalAddress" class="injector">PostalAddress</button>');
            $("#templateSet").append('<button id="injectThing" class="injector">Thing</button>');
            $("#exportJson").click(function(){
                var date = new Date();
                date.setTime(date.getTime()+(10000));
                var expires = "; expires="+date.toGMTString();
                var cookieString= "insertSchema=" + encodeURIComponent(document.getElementById("schemaEditorBox").value) + expires ;
                document.cookie=cookieString;
                console.log(cookieString);
                var tab = window.open(mw.config.get("wgServer") + "/wiki/MediaWiki:Schemas/" + document.getElementById("schemaName").value + "?action=edit&useskin=monobook", "_blank");
            });
            $("#importJson").click(function(){
                var replaced = document.getElementById("schemaName").value;
                /*while (replaced.indexOf(" ") > -1) {
                    replaced = replaced.replace("_", " ");
                }*/
                $.get("/wiki/MediaWiki:Schemas/" + replaced + "?action=raw", function(data){
                    document.getElementById("schemaEditorBox").value = data;
                });
            });
        }
   });
});
//</syntaxhighlight>