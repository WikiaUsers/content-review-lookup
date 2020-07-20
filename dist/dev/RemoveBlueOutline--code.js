/* <nowiki>
 * 
 * @module                  RemoveBlueOutline/code.js
 * @description             Script that removes the annoying blue outline, except when tabbing.
 * @author                  JustLeafy
 * @license                 CC-BY-SA 3.0
 * 
 */

//Import CSS
importArticles({
    type: 'style',
    articles: [
        'u:dev:RemoveBlueOutline.css'
    ]
});

//Script code
function handleFirstTab(e) {
    if (e.keyCode === 9) { // the "I am a keyboard user" key
        document.body.classList.add('user-is-tabbing');
        window.removeEventListener('keydown', handleFirstTab);
    }
}