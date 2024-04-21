/* Размещённый здесь код JavaScript будет загружаться пользователям при обращении к каждой странице */
// замена img src в imagemaps для предотвращения плохого качества
const imageMap = document.querySelector('.imagemap');
if (imageMap) {
	imageMap.src = imageMap.src.replace(/scale-to-width-down.*/, '');
}