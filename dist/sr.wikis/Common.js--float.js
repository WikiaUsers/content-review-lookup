/* Any JavaScript here will be loaded for all users on every page load. */
mw.loader.using( [ 'ext.popups' ], function() { //чека поп-уп прозора, да се учита
 
// Време чекања у мс пре него се појави поп-уп када је курсор. Подразумевано кошта 500.
mw.popups.render.POPUP_DELAY = 500;
 
// Време чекања у мс пре затварања искачућег прозора на де-ховер. Подразумевано 300.
mw.popups.render.POPUP_CLOSE_DELAY = 300;
 
// Време чекања у мс пре покретања захтева за АПИ на ховер, треба да буде <= POPUP_DELAY. Подразумевано 50.
// Не промените, ако не знате шта радите.
mw.popups.render.API_DELAY = 50;
 
});