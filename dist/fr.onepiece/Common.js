/* Version du JS revue par @John Trololo, @Think D. Solucer et @CaptainDisfiking*/
    
/*****************************************************************
** S'il vous plait, ne mettez aucun code JS avant les imports ****
*********** !!! TOUJOURS APRES les imports !!! *******************
******************************************************************/

/* Version du JS revue par @Think D. Solucer */
// Page JS concernant les IHM du wiki

//retirer la raison par défaut sur spécial:supprimer
$(function() {
    if(mw.config.get('wgAction') === 'delete') {
        $("#wpReason").val("");
    }
});

// Tout afficher (Vivre Card)
var expandAllFlag = 0;
var $expandAll = $('.expandAll a');
$('.expandAll a').click(function(){
    if (expandAllFlag === 0){
        $('.mw-collapsible .mw-collapsible-toggle-collapsed').click();
        expandAllFlag = 1;
        $expandAll.text('Tout refermer');
    } else {
        $('.mw-collapsible .mw-collapsible-toggle-expanded').click();
        expandAllFlag = 0;
        $expandAll.text('Tout afficher');
    }
});    
 //End of Expand All

/* Version du JS revue par @Captain Disfiking */
// =====================================
//        Variables pour les fonctions
// =====================================
// ArchiveTool
ArchiveToolConfig = { 
   archiveListTemplate: 'Archived Talk Tabs',	// Modèle à utiliser sur la page principale de discussion
   archivePageTemplate: 'Archived Talk Tabs',	//Modèle à utiliser sur la pages de discussion archivées
   archiveSubpage: 'Archive',					// Nom de base à utiliser sur les pages de discussion archivées
   userLang: true
};

// BackToTopButton
window.BackToTopModern = true;

// Modèle:Onglets
$(function() {
	// Si un sous-onglet est "sélectionné", rend aussi les onglets parents "sélectionnés"
	$('.at-selected').parents('.article-tabs li').each(function () {
		$(this).addClass('at-selected');
	});

	// Fixe les marges
	$('.article-tabs .at-selected .article-tabs').each(function () {
		// Obtenir la hauteur des sous-onglets
		var $TabsHeight = $(this).height();

		// Augmente la marge inférieure des onglets principaux
		$(this).parents('.article-tabs').last().css('margin-bottom' , '+=' + $TabsHeight);
	});
});
// Fin de Modèle:Onglets

   /* Fin JS */