/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. */

/* NOMBREUSUARIO */
$(function UserNameReplace() {
    if (wgUserName) {
        var spans = getElementsByClassName(document, "span", "insertusername");
  
        for (var i = 0; i < spans.length; i++){
            spans[i].textContent = wgUserName;
        }
    }
});

/* ShowHide */
var ShowHideConfig = {
    linkBefore: true
};

/*RailWam*/
window.railWAM = {
    logPage: "Project:WAM Log"
};

/*Usertags from Dev Wiki*/
window.UserTagsJS = {
	modules: {},
	tags: {
		fatex: { u:'Fate X'},
	}
};

/*Add Usertags for Users*/
UserTagsJS.modules.custom = {
	'Sombra386': ['fatex']
};