/* Cualquier c�digo JavaScript escrito aqu� se cargar� para todos los usuarios en cada carga de p�gina */
//cr�ditos a la wiki de DDLC inglesa, yo solo cambi� el fadeout- Mel
document.getElementById("spoilers_image").addEventListener("click", function() {
    $('#spoilers').fadeOut(330, function () {
        this.style.display = "none";
    });
});

//UserTags config.

window.UserTagsJS = {
	modules: {},
	tags: {
		bureaucrat: { u:'Bur�crata' },
		Administradora: { u: 'Administradora' },
		sysop: { u:'Administrador' },
		cofun: { u:'Co-fundadora' },
		Fundador: { u:'Fundador' },	
		rollback: { u:'Reversor' },			
	}
};

// Add custom groups to several users
UserTagsJS.modules.custom = {
		'MelooChan': ['bureaucrat', 'Administradora'],
		'InTheCode': ['bureaucrat', 'Administradora', 'cofun'],
		'Rey273': ['sysop'],
		'RaphaelFenix': ['Fundador'],
		'Sora896': ['rollback'],	
};