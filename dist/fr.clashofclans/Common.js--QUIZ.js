/* QUIZ */
if (wgPageName == "B�timents_D�fensifs_(base_des_ouvriers)") {
    importScriptPage('MediaWiki:CQuiz_D�fenses_BDO.js'); //Quiz corrig�
} else if (wgPageName == "B�timents_Ressources_(base_des_ouvriers)") { 
    importScriptPage('MediaWiki:CQuiz_Ressources_BDO.js'); //Quiz corrig�
} else if (wgPageName == "Quiz_avec_correction") {
    importScriptPage('MediaWiki:CQuiz.js'); //Quiz corrig�
} else if (wgPageName == "Quiz_sans_correction") {
    importScriptPage('MediaWiki:Quiz.js'); //Quiz non corrig�
}