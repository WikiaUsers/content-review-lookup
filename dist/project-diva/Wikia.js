// Random Page Background
function randomBg() {
    var imgs = [
    	'https://static.wikia.nocookie.net/project-diva/images/b/b4/Miku-megamix-plus.jpg/revision/latest?cb=20230830211117',
    	'https://static.wikia.nocookie.net/project-diva/images/f/f0/Rin-megamix-plus.jpg/revision/latest?cb=20230830210555',
    	'https://static.wikia.nocookie.net/project-diva/images/e/ef/Len-megamix-plus.jpg/revision/latest?cb=20230830210606',
    	'https://static.wikia.nocookie.net/project-diva/images/d/dd/Luka-megamix-plus.jpg/revision/latest?cb=20230830210628',
    	'https://static.wikia.nocookie.net/project-diva/images/a/a7/Kaito-megamix-plus.jpg/revision/latest?cb=20230830210640',
    	'https://static.wikia.nocookie.net/project-diva/images/6/63/Meiko-megamix-plus.jpg/revision/latest?cb=20230830210650'
    	];
 $('body').css('background-size', 'fix', 'cover'); 
    $('body').css('background-image', 'url(' + imgs[Math.floor((imgs.length) * Math.random())] + ')');
}

randomBg();