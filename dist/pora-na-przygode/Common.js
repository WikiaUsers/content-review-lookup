/* Umieszczony tutaj kod JavaScript zostanie załadowany przez każdego użytkownika, podczas każdego ładowania strony. */
/* Umieszczony tutaj kod JavaScript zostanie załadowany przez każdego użytkownika, podczas każdego ładowania strony. */
///Skrypt na nazwę użytkownika
if (wgUserName != null/* && span.insertusername != undefined*/) {
 $(".insertusername").html(wgUserName);
};

 importArticles({
     type: 'script',
     articles: [
         // ...
         'u:kocka:MediaWiki:Emoticons/code.js',
         // ...
     ]
 });