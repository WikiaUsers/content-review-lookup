/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página */
//créditos a la wiki de DDLC inglesa, yo solo cambié el fadeout- Mel
document.getElementById("spoilers_image").addEventListener("click", function() {
    $('#spoilers').fadeOut(330, function () {
        this.style.display = "none";
    });
});

//UserTags config.

window.UserTagsJS = {
	modules: {},
	tags: {
		bureaucrat: { u:'Burócrata' },
		Administradora: { u: 'Administradora' },
		sysop: { u:'Administrador' },
		cofun: { u:'Co-fundadora' },
		Fundador: { u:'Fundador' },		
	}
};

// Add custom groups to several users
UserTagsJS.modules.custom = {
		'MelooChan': ['bureaucrat', 'Administradora'],
		'InTheCode': ['bureaucrat', 'Administradora', 'cofun'],
		'Rey273': ['sysop'],
		'RaphaelFenix': ['Fundador']			
};