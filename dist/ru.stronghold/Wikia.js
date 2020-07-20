/*Рандомный фон*/
function randomBg() {
    var imgs = [
        "https://images.wikia.nocookie.net/__cb20141001132057/stronghold/ru/images/f/f9/%D0%A4%D0%BE%D0%BD_%D0%BA%D1%80%D1%83%D1%81%D0%B0%D0%B4%D0%B5%D1%80_2.jpg",
 
"https://images.wikia.nocookie.net/stronghold/ru/images/5/51/%D0%A4%D0%BE%D0%BD8.jpg",
 
"https://images.wikia.nocookie.net/__cb20141001133038/stronghold/ru/images/8/8b/%D0%A4%D0%BE%D0%BD_%D0%B0%D1%81%D1%81%D0%B0%D1%81%D0%B8%D0%BD2.jpg",
 
"https://images.wikia.nocookie.net/stronghold/ru/images/d/d6/%D0%A4%D0%BE%D0%BD3.jpg",
 
"https://images.wikia.nocookie.net/stronghold/ru/images/5/55/%D0%A4%D0%BE%D0%BD4.jpg",
 
"https://images.wikia.nocookie.net/stronghold/ru/images/0/0b/%D0%A4%D0%BE%D0%BD5.jpg",
 
"https://images.wikia.nocookie.net/__cb20141001133024/stronghold/ru/images/1/14/%D0%9C%D0%B5%D1%87%D0%BD%D0%B8%D0%BA_%D0%B8_%D0%BC%D0%B5%D0%B2%D0%BB%D0%B5%D0%B2%D0%B82.jpg",
 
"https://images.wikia.nocookie.net/stronghold/ru/images/f/ff/%D0%A4%D0%BE%D0%BD9%2C5.jpg",
    ];

    $("body").css("background-size", "cover");
    $("body").css("background-image", "url(" + imgs[Math.floor((imgs.length) * Math.random())] + ")");
}
 
$(randomBg);