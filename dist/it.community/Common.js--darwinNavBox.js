// ==============================
//       Darwin Navbox
// ==============================
// Aggiunge in template "DarwinNavBox" a "Blog:Darwin" e "Sottoforum:Darwin - Aiuto con il layout fluido"

if (mw.config.get('wgPageName') == 'Blog:Darwin' || mw.config.get('wgPageName') == 'Sottoforum:Darwin_-_Aiuto_con_il_layout_fluido') {
    // Codice HTML di "Template:DarwinNavBox"
    var DarwinHeader = '<table class="plainlinks" style="padding:5px; color:#555555; background:#f9fafc; font-size:14px; text-align:center; border:1px solid black; margin:0 auto 10px;"><tr><th rowspan="3" style="width:1px:"> <img alt="Darwin logo" src="https://images.wikia.nocookie.net/__cb20130822133313/central/images/7/75/Darwin_logo.png" width="150" height="92" data-image-name="Darwin logo.png" data-image-key="Darwin_logo.png" /></th><th style="font-size:225%; color:#02518C; padding-top:10px;"> <img alt="Project Darwin IT" src="https://images.wikia.nocookie.net/__cb20130822140233/it/images/thumb/6/6a/Project_Darwin_IT.png/200px-Project_Darwin_IT.png" width="200" height="33" data-image-name="Project Darwin IT.png" data-image-key="Project_Darwin_IT.png" /></th></tr><tr><td><table cellspacing="5" style="padding:5px; text-align:left;"><tr><th style="padding-right:10px; text-align:right;"> <i>Per approfondire</i></th><td><a href="http://it.community.wikia.com/wiki/Blog%3ADarwin" class="extiw" title="w:c:it.community:Blog:Darwin">Blog di Wikia</a> • <a href="http://community.wikia.com/wiki/Board:Darwin" class="extiw" title="w:Board:New_Features">Forum</a> • <a href="/wiki/Aiuto:Darwin" title="Aiuto:Darwin">Aiuto</a> • <a href="/wiki/it:Sottoforum:Supporto_-_Aspetto_e_personalizzazione" title="Supporto_-_Aspetto_e_personalizzazione">Aiuto layout</a></td></tr><tr><th style="padding-right:10px; text-align:right;"><i>Per provare</i></th><td><a href="http://demo.wikia.com/wiki/Darwin_Wikia_it" class="extiw" title="w:c:demo:Darwin Wikia it">Demo Wiki</a> • <a href="http://communitytest.wikia.com/wiki/" class="extiw" title="w:c:ct">Community Test Wiki</a></td></tr></table></td></tr></table>';
}

// Aggiunta del codice a "Blog:Darwin"
if (mw.config.get('wgPageName') == 'Blog:Darwin') {
    $('#WikiaArticle').prepend( DarwinHeader );
}