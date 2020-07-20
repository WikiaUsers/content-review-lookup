/* Tämän sivun koodi liitetään jokaiseen sivulataukseen */
/* Skinikokeilu  */
 
 reskin = {
    "Etusivu": "Etusivu.css",
    "Luokka:Kaikki": "Luokka:Kaikki.css",
    "Foorumi:Index": "Foorumi.css",
    "Foorumi:Kahvihuone": "Foorumi.css",
    "Foorumi:Ongelmanurkka": "Foorumi.css",
    "Bee_Wiki:Mallineet": "Etusivu.css",
    "Beepedian_laita": "Laita.css",
    "Z̶͓̲̖͔̩̳Aͥ͋͏̤̻̗̼̥L̽̂̔ͅĞ̯ͯ̓̔̿͂̚̕O̬͂͠": "Kaaos.css"
 //Kaikkien muiden paitsi viimeisen rivin lopussa pitäisi olla pilkku!
 }
 var skinName;

 if (reskin[wgPageName] != undefined && wgIsArticle == true) {
     skinName = (reskin[wgPageName].length > 0) ? reskin[wgPageName] : wgPageName + '.css';
     document.write('<style type="text/css">/*<![CDATA[*/ @import "/index.php?title=MediaWiki:Skin/' + skinName + '&action=raw&ctype=text/css"; /*]]>*/</style>');
 }