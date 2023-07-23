// Icono social, por: [[Madnessfan34537]]. Usamos una imagen de es.goblinslayer para evitar subirlo de nuevo.
 
function SocialIcons() {
 
    var userArray = wgPageName.split(":");
 
    $('.WikiaRail').prepend('<div style="right:-1px; top:108px; position: absolute;"><div style="position: absolute;" class="SocialIcon"><div style="float:right;"><a href="https://twitter.com/darlifrawikies"><img src="https://vignette.wikia.nocookie.net/goblinslayer/images/e/e2/Logo_de_twitter.png/revision/latest/scale-to-width-down/35?cb=20180426020225&path-prefix=es"></a></div></div></div>');
 
}
 
        if (mw.config.get("wgNamespaceNumber") != "user") {
		addOnloadHook(SocialIcons);
 
}