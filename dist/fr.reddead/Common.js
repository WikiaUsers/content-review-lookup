/* JS */
/** Afficher du contenu que pour les admins **/
(function(){
	if (/sysop|content-moderator/.test(mw.config.get('wgUserGroups').join())){
		Array.from(document.querySelectorAll(".sysop")).map(function(e){
			e.style="display: inline;"
		});
	}
})();
/** N'afficher l'option "Image du wiki" que pour les admins **/
(function(){
	if (!/sysop/.test(mw.config.get('wgUserGroups').join())){
		document.querySelector("#quoiBox > option:nth-child(6)").style="display: none;";
	}
})();