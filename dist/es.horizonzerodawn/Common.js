importArticles({
    type: "script",
    articles: [
        "w:c:dev:MediaWiki:Countdown/code.js",
        "u:dev:MediaWiki:GlobalEditcount/code.js",
    ]
});

//Fondo cambiante al recargar o cambiar de pagina
    var wallpaper = ["http://i.imgur.com/3vOG9ey.jpg","http://i.imgur.com/ZlTlSMS.jpg","http://i.imgur.com/ud9ZItU.jpg","http://i.imgur.com/PNwsJNF.jpg","http://i.imgur.com/nOjnD89.jpg","http://i.imgur.com/Va7wiR0.jpg","http://i.imgur.com/mTs4Qsw.jpg","http://i.imgur.com/YW2jhVD.jpg","http://i.imgur.com/qkm8EJN.jpg","http://i.imgur.com/f5ZeirT.jpg","https://i.imgur.com/luzUiaf.jpg","https://i.imgur.com/NAE81oS.jpg","https://i.imgur.com/nMWZErl.jpg","https://i.imgur.com/UiNjogu.jpg","https://i.imgur.com/v6FDiGu.jpg","https://i.imgur.com/YoDEgb4.jpg"];
    var min = 0;
    var max = 10;
    var number = Math.floor(Math.random() * (max - min)) + min;
    var background = wallpaper[number];
        $(".mediawiki").css("background-image", "url('"+ background +"')");
        $(".mediawiki").css("background-color", "#000");
        $(".mediawiki").css("background-size", "100%");
        $(".mediawiki").css("background-attachment", "fixed");
        $(".mediawiki").css("background-repeat", "no-repeat");

//Invitacion para usar discusiones
$(window).load(function() {
$('<p style="color: #fff; font-size: 15px; display: block; text-align: center; margin-top: 10px; margin-bottom: 10px;">Hola si quieres hacer alguna pregunta sobre el juego en general o sobre otros temas, te invitamos a usar <a href="http://es.horizon-zero-dawn.wikia.com/d/f">discusiones</a>.</p>').insertBefore('.WikiaPage .article-comments');
});