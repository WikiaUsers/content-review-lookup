/* Розміщений тут код JavaScript буде завантажений всім користувачам при зверненні до будь-якої сторінки */

var img =  {};
img["Адмирал Вуллф Юларен"] = ['<img src="https://upload.wikimedia.org/wikipedia/commons/a/ae/Lesser_Coat_of_Arms_of_Russian_Empire.svg?uselang=ru" width="110px" height="150px">'];
if (typeof img[wgTitle] != "undefined") {
$('<div style="position:absolute; left:630px; top: 38px;">' + img[wgTitle] + '</div>').appendTo('.masthead-info');
}