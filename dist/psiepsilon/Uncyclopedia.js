/* Any JavaScript here will be loaded for users using the MonoBook skin */
 
 
// install [[Wikipedia:User:Cacycle/wikEd]] in-browser text editor
importScriptURI('//en.wikipedia.org/w/index.php?title=User:Cacycle/wikEd.js'
+ '&action=raw&ctype=text/javascript');
// install [[User:Cacycle/wikEdDiff]] enhanced diff view using ajax
document.write('<script type="text/javascript" src="'
+ 'http://en.wikipedia.org/w/index.php?title=User:Cacycle/wikEdDiff.js'
+ '&action=raw&ctype=text/javascript&dontcountme=s"></script>');

importArticles({
    type: 'script',
    articles: [ 
         'w:c:dev:EditIntroButton2/code.js'
    ]
});