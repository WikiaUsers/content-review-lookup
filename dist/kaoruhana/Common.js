/* Any JavaScript here will be loaded for all users on every page load. */
/**Show random character images on Welcome Box**/
function randomWelcomeImg() {
    var imgs = [
        'https://static.wikia.nocookie.net/kaoruhana/images/0/0c/Main-Kaoruko.png/revision/latest?cb=20230723044502&format=original',
        'https://static.wikia.nocookie.net/kaoruhana/images/6/64/Main-Subaru.png/revision/latest?cb=20230723044507&format=original',
        'https://static.wikia.nocookie.net/kaoruhana/images/f/ff/Main-Rintaro.png/revision/latest?cb=20230723044506&format=original',
        'https://static.wikia.nocookie.net/kaoruhana/images/c/c3/Main-Yorita.png/revision/latest?cb=20230723044510&format=original',
        'https://static.wikia.nocookie.net/kaoruhana/images/4/40/Main-Natsusawa.png/revision/latest?cb=20230723044504&format=original'
    ];
    
    var size = [
    	'30%','35%','35%','35%','32.5%'
    	]
    	
    var pos = [
    	'95% 0%','102.5% 0%','95% 0%','102.5% 0%','100% 0%'
    	]
    	
    var random = Math.floor((imgs.length) * Math.random())

    $('.welcome').css('cssText', 'background-image: url(' + imgs[random] + ') !important; background-size: ' + size[random] + ' !important; background-position: ' + pos[random] + ' !important');
}
 
randomWelcomeImg();

/**BackToTop Button Modernization**/
window.BackToTopModern = true;

window.importArticles({
    type: 'script',
    articles: ['u:dev:MediaWiki:Countdown/code.js']
});