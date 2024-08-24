window.UserTagsJS = {
	modules: {},
	tags: {
		// groupe: { tag associé },
		'grand moniteur': { u:'Grand Moniteur' }
	}
};
UserTagsJS.modules.custom = { 
        'Skieur Fou': ['grand moniteur']
 };
importScriptPage('UserTags/code.js', 'dev');

//Widget de twhit20.fr
$( document ).ready( function() {
      $('#twhit20').html('<iframe src="http://twhit20.fr/widget/twhit20/stations-de-ski-france" scrolling="yes" frameborder="0" height="500" width="500"></iframe>');
});