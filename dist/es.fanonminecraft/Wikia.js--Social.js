// Iconos sociales, creditos a la wiki ben10

function SocialIcons() {
 
    var userArray = wgPageName.split(":");
 
    $('.WikiaRail').prepend('<div style="right:-1px; top:108px; position: absolute;"><div style="position: absolute;" class="SocialIcon"><div style="float:right;"><a href="https://www.facebook.com/fanonminecraft"><img src="https://images.wikia.nocookie.net/destinypedia/images/8/8f/Facebook_Icon.png"></a></div></div></div></div>');
 
}
 
        if (mw.config.get("wgNamespaceNumber") != "user") {
		addOnloadHook(SocialIcons);
 
}

// Redes Sociales

function OpenFacebook() {
$.showCustomModal( 'Facebook', '<iframe src="//www.facebook.com/plugins/likebox.php?href=https%3A%2F%2Fwww.facebook.com%2Ffanonminecraft&width=270&height=290&colorscheme=light&show_faces=true&header=true&stream=false&show_border=true" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:270px; height:290px;" allowTransparency="true"></iframe><div style="margin-left: 275px; margin-top: -295px; ">¡¡Minecraft Fanon Wiki ya está en Facebook!!<br>Ya tenemos nuestra pagina de Minecraft Fanon Wiki en Facebook, ve a echarle un vistazo a nuestra pagina oficial y aprieta el botón Me gusta y comparte para que los demás se unan!</div>', {
	    id: "FacebookWindow",
	    width: 600,
            height: 430
	});
}
 
function OpenTwitter() {
$.showCustomModal( 'Twitter', '<center><img src="https://images.wikia.nocookie.net/__cb20140714224215/fanonminecraft/es/images/6/64/Logo_minecraft_wiki.png" alt="Wiki Minecraft Fanon"><h2>Próximamente<br />En construcción</h2></center>', {
	    id: "TwitterWindow",
	    width: 600,
            height: 430
	});
}