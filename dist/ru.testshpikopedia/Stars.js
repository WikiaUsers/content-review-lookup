/**
   Stars -- 25 September 2010.
   Автор: [[Участник:Edward Chernenko]].
 
   Помогает шаблону {{Звёздочка}} разместить маленький (25x25)
   значок в верхнем правом углу страницы.
*/
var known_stars = { /* Порядок звёздочек в этом массиве имеет значение */
  sprint : new Array("https://images.wikia.nocookie.net/absurdopedia/images/thumb/b/b2/Neoclassical_Velocity.JPG/25px-Neoclassical_Velocity.JPG", "Эта статья написана в рамках спринта", "Категория:Спринт-статьи"),
  vfd : new Array("https://images.wikia.nocookie.net/absurdopedia/images/thumb/9/92/The_death.png/25px-The_death.png", "Эта статья предлагается к удалению", "Абсурдопедия:К удалению"),
  fa : new Array("https://images.wikia.nocookie.net/absurdopedia/images/3/33/Small_skew_star.gif", "Это — избранная статья", "Абсурдопедия:Лучшее"),
  good : new Array("https://images.wikia.nocookie.net/absurdopedia/images/thumb/e/eb/Highlighted.gif/25px-Highlighted.gif", "Это — хорошая статья", "Категория:Абсурдопедия:Хорошие статьи"),
  vff : new Array("https://images.wikia.nocookie.net/absurdopedia/images/thumb/1/1b/Award-star-gold-3d.png/25px-Award-star-gold-3d.png", "Эта статья может стать избранной", "Абсурдопедия:Кандидаты в избранные и хорошие статьи"),
  vfg : new Array("https://images.wikia.nocookie.net/absurdopedia/images/thumb/0/09/Bronze-star-device-3d.png/25px-Bronze-star-device-3d.png", "Эта статья может быть хорошей", "Абсурдопедия:Кандидаты в избранные и хорошие статьи"),
  fij : new Array("https://images.wikia.nocookie.net/absurdopedia/images/thumb/5/52/Kremlin_star.png/25px-Kremlin_star.png", "Это — избранная шутка для посвященных", "Категория:Абсурдопедия:Избранные статьи"),
  lock : new Array("https://images.wikia.nocookie.net/absurdopedia/images/thumb/c/c1/Padlock.png/25px-Padlock.png", "Эта статья защищена", ""),
  nrv : new Array("https://images.wikia.nocookie.net/absurdopedia/images/thumb/e/e4/Glasbutton_Warnung.png/25px-Glasbutton_Warnung.png", "Эта статья не представляет общественной ценности", "Абсурдопедия:Как написать смешную и неглупую статью")
};
 
function starsMarker()
{
  if(!wgIsArticle) return;
 
  var content = document.getElementById('WikiaMainContentContainer');
  if(!content) return;
  
  var h1 = document.getElementById('WikiaArticle');
  if(!h1) return;
 
  var star_id, found;
  for(star_id in known_stars)
  {
    if(document.getElementById('star-' + star_id) == undefined)
        known_stars[star_id] = undefined;
    else
        found = 1;
  }
  if(!found) return;
 
  var box = document.createElement('div');
  box.style.zIndex = 100;
  box.id = "starbox";
  box.style.cssFloat = "right";
  box.style.marginTop = "5px";
  if(!document.getElementById('floating_object')) /* нет {{right-uppermost image}} */  
    box.style.marginRight = "15px";
 
  var desc; var e1, e2, link, img;
  for(star_id in known_stars)
  {
    desc = known_stars[star_id];
    if(desc != undefined)
    {
       e1 = document.createElement('div');
       e1.style.position = "relative";
       e1.width = 25;
       e1.height = 25;
       e1.style.overflow = "hidden";
       e1.style.cssFloat = "right";
 
       e2 = document.createElement('div');
       e2.style.position = "relative";
       e2.style.top = 0;
       e2.style.left = 0;
       e2.style.zIndex = 2;
 
       link = document.createElement('a');
       link.href = wgArticlePath.replace(/\$1/, encodeURIComponent(desc[2]));
       link.title = desc[1];
 
       var img = document.createElement('img');
       img.width = 25;
       img.src = desc[0];
 
       link.appendChild(img);
       e2.appendChild(link);
       e1.appendChild(e2);
       box.appendChild(e1);      
    }
  }
 
  content.insertBefore(box, h1);
}
addOnloadHook(starsMarker);