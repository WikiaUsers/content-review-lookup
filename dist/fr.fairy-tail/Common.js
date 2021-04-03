//Importing scripts from dev.wikia.com. Remember to add new scripts within this importArticles block to reduce the times for loading and executing
// http://dev.wikia.com/wiki/RevealAnonIP This must be placed above all imports.
window.RevealAnonIP = {
    permissions: ['user']
};

//Config pour le message d'alerte des pages explicites
ExplicitAlert = {
    categories: "Articles ayant un contenu explicite",
};

//Customization for imported scripts
//PreloadFileDescription, source: http://dev.wikia.com/wiki/PreloadFileDescription
PFD_templates = [{
    label: 'Images',
    desc: '{{Documentation_Image\n|Description = \n|Source      = \n|Vu = \n|Information = }}',
}, ];

/* Magic edit intro. Copied from Wikipedia's MediaWiki:Common.js
 * Code par Emperor Jarjarkine pour pouvoir avoir les introductions  
 * Decembre 2020 : MAJ UCP par Fujimaru-kun + Partie de code prise à CategoriesSort de Celdrøn
 */
function addEditIntro(name) {
    	// Top link
        $('#ca-edit').attr('href', $('#ca-edit').attr('href') + '&editintro=' + name);
        
        //Section links
        $('span.mw-editsection > a').each(function () {
            $(this).attr('href', $(this).attr('href') + '&editintro=' + name);
        });
}


$(function () {
    if (wgNamespaceNumber === 0) {
        var categories = $('.categories')[0],            
			categList = [];
        
		function Category(name, element) {
			this.name = name;
			this.element = element;
        }
        
        //Fill an array with the category's name and the DOM element
		Array.from($(categories).children('li.category.normal')).forEach(function(category){
			categList.push( new Category( category.innerText, category ) );
		});
		
		
        for (var i = 0; i < categList.length; i++) {
            if (categList[i].name === 'Articles Vedette') {
                addEditIntro('Modèle:AV_editintro');
                break;
            } else if (categList[i].name === 'Articles de Qualité') {
                addEditIntro('Modèle:AQ_editintro');
                break;
            } else if (categList[i].name === 'Articles de Rang S') {
                addEditIntro('Modèle:ARS_editintro');
            }
        }
    }
});

//Version moderne de BackToTopModern
window.BackToTopModern = true;