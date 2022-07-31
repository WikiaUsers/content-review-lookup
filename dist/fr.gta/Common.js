/* JS */
/** Afficher du contenu que pour les admins **/
(function(){
	if (/sysop|content-moderator/.test(mw.config.get('wgUserGroups').join())){
		Array.from(document.querySelectorAll(".sysop")).map(function(e){
			e.style="display: inline;"
		});
	}
})();