/**
 * BannerPage
 * @version 1.0.9.1
 * @author HumanoidPikachu <deathsoulasriel@gmail.com>
 **/

if (wgCategories == 'Tests') {
    notifBanner();
}

function notifBanner() {
    new BannerNotification('Te encuentras en una de las páginas en las que se han realizado pruebas con CSS, JS, etc.', 'confirm').show();
}