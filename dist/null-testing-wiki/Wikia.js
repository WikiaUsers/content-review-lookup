//Zip Prank
window.onload = function() {
    mw.hook("wikipage.content").add(function($content) {

        if(wgPageName == "Special:ZipPrank") {
            article = $("#WikiaArticle")[0];
            article.innerHTML = "<center><h1>CONNECTING TO THE INTERWEBZ</h1></center>";

            setTimeout(function(){
                article.innerHTML = "<center><h1>FINDING UR IP</h1></center>";
            },1000);

            setTimeout(function(){
                article.innerHTML = "<center><h1>UR IP IS 192.168.0.1</h1></center>";
            },2000);
        
            setTimeout(function(){
                article.innerHTML = "<center><h1>UR ZIP IS + " + String(Math.floor((Math.random() * 999999) + 10001))  + "</h1></center>";
            },3000);
        }
    });
}