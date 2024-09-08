/* QUIZ */
if (wgPageName == "Bâtiments_Défensifs_(base_des_ouvriers)") {
    importScriptPage('MediaWiki:CQuiz_Défenses_BDO.js'); //Quiz corrigé
} else if (wgPageName == "Bâtiments_Ressources_(base_des_ouvriers)") { 
    importScriptPage('MediaWiki:CQuiz_Ressources_BDO.js'); //Quiz corrigé
} else if (wgPageName == "Quiz_avec_correction") {
    importScriptPage('MediaWiki:CQuiz.js'); //Quiz corrigé
} else if (wgPageName == "Quiz_sans_correction") {
    importScriptPage('MediaWiki:Quiz.js'); //Quiz non corrigé
}