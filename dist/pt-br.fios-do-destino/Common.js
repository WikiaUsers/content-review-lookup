/* Códigos JavaScript aqui colocados serão carregados por todos aqueles que acessarem alguma página deste wiki */

//Add border color to infoboxes
$('.portable-infobox').each(function () {
    var cls = $(this).attr('class').match(/pi-theme-_(\S+)/);
    if (cls) {
        $(this).css('border-color', '#' + cls[1]);
    }
});

// Pour tous les balises "IntegrationInstagram", intégrer un embed selon leur username
var elementsII = document.getElementsByClassName("IntegrationInstagram");
for (var e=0; e<elementsII.length; e++){
	var username = elementsII[e].getAttribute("data-username");
    $(elementsII[e]).append('<iframe src="https://www.instagram.com/'+username+'/embed" width=100% height=820 frameborder="0" allowfullscreen="allowfullscreen"></iframe>');
}

// Pour tous les balises "IntegrationTiktok", intégrer un embed selon leur username
var elementsIT = document.getElementsByClassName("IntegrationTiktok");
for (var e=0; e<elementsIT.length; e++){
	var username = elementsIT[e].getAttribute("data-username");
    $(elementsIT[e]).append('<blockquote class="tiktok-embed" cite="https://www.tiktok.com/@'+username+'" data-unique-id="'+username+'" data-embed-type="creator" style="max-width: 780px; min-width: 288px;" > <section> <a target="_blank" href="https://www.tiktok.com/@'+username+'?refer=creator_embed">@'+username+'</a> </section> </blockquote> <script async src="https://www.tiktok.com/embed.js"></script>');
}