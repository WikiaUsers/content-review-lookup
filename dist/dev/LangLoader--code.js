//<syntaxhighlight lang="javascript">
$(function(){
   $(document).ready(function(){
      var scripts = document.getElementsByTagName("script");
      var langsUsed = [];
      for (var index = 0; index < scripts.length; index++) {
         if (scripts[index].getAttribute("lang")) {
            var workingLang = scripts[index].getAttribute("type");
            if (langsUsed.indexOf(workingLang)==-1) {
                switch (workingLang) {
                    case "text/javascript":
                    case "text/ecmascript":
                    case "application/javascript":
                    case "application/ecmascript":
                    case "text/vnd.wap.wml":
                    case "application/vnd.wap.wml":
                    case "application/ld+json":
                    case "text/ld+json":
                    case "application/vcard+json":
                    case "text/vcard+json":
                    case "application/json":
                    case "text/json":
                    case "text/vbscript":
                    case "application/vbscript":
                       break;
                    default:
                       langsUsed[langsUsed.length] = workingLang;
                }
            }
         }
      }
      for (var index=0; index < langsUsed.length; index++) {
          var workingLang = langsUsed[index];
          switch(workingLang) {
              case "text/coffeescript":
              case "application/coffeescript":
                  $.getScript( "https://raw.githubusercontent.com/jashkenas/coffeescript/master/extras/coffee-script.js");
                  break;
              case "text/python":
              case "application/python":
                  $.getScript( "https://raw.githubusercontent.com/brython-dev/brython/master/www/src/brython.js").done(function(){
                     brython();
                  });
              default:
                  console.err("warning: unknown language loaded");
          }
      }
   });
});
//</syntaxhighlight>