/** 
 *
 *
 * __NOWYSIWYG__
 */
SpoilerAlert = {
    question: 'This article might contain spoilers for future episodes - do you want to continue?',
    yes: 'Yes, I can handle it!',
    no: 'No, I do not want to ruin it for myself!',
    isSpoiler: function () {
        return -1 !== wgCategories.indexOf('Spoilers');
    },
    back: true
};

importArticles({
    type: "script",
    articles: ["w:dev:SpoilerAlert/code.js",
               "w:c:dev:Countdown/code.js",
              ]
});

function touchIcon() {
     for(var i = 0; i < document.getElementsByTagName("link").length; i++) {
        if(document.getElementsByTagName("link")[i].rel == 'apple-touch-icon') {
           var orig = document.getElementsByTagName("link")[i];
        }
     }
     document.getElementsByTagName("head")[0].removeChild(orig);
     var icon = document.createElement("link");
     icon.rel = "apple-touch-icon";
     icon.href = "Wiki.png";
     document.getElementsByTagName("head")[0].appendChild(icon);
  }

$wgAppleTouchIcon = "/wiki/File:Wiki.png";