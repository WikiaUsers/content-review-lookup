/* Размещённый здесь код JavaScript будет загружаться пользователям при обращении к каждой странице */
var cat = mw.config.get('wgCategories')
var name = "Five Nights at Freddy's Universes:The Game Вики"
if(cat.indexOf(name) !== -1){
    $('.fandom-community-header__community-name').text(name)
    $('.fandom-community-header__background').css({"background": "url(https://static.wikia.nocookie.net/fnaf-fanon-animatronics/images/d/d9/Backgroundcurrent.png/revision/latest?cb=20221123090729&path-prefix=ru)"});
}